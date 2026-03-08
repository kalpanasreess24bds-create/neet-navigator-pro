import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden: admin only" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let body: any = null;
    try {
      body = await req.json();
    } catch {
      // No body = GET/list request
    }

    // If body has id + status, it's an update request
    if (body && body.id && body.status) {
      const updateData: any = { status: body.status };
      if (body.status === "active") {
        updateData.activated_at = new Date().toISOString();
      }
      const { error } = await adminClient
        .from("subscriptions")
        .update(updateData)
        .eq("id", body.id);

      if (error) throw error;

      // Send notification to user when subscription is activated or rejected
      if (body.status === "active" || body.status === "rejected") {
        // Get the subscription to find user_id
        const { data: sub } = await adminClient
          .from("subscriptions")
          .select("user_id")
          .eq("id", body.id)
          .single();

        if (sub) {
          const isActive = body.status === "active";
          // Insert in-app notification
          await adminClient.from("notifications").insert({
            user_id: sub.user_id,
            title: isActive ? "Subscription Activated! 🎉" : "Subscription Update",
            message: isActive
              ? "Your premium subscription has been confirmed and activated. Enjoy unlimited access to all features!"
              : "Your subscription request was not approved. Please contact support for more details.",
            type: isActive ? "success" : "error",
          });

          // Send email notification
          const { data: { user: subUser } } = await adminClient.auth.admin.getUserById(sub.user_id);
          if (subUser?.email) {
            try {
              const resendKey = Deno.env.get("RESEND_API_KEY");
              if (resendKey) {
                await fetch("https://api.resend.com/emails", {
                  method: "POST",
                  headers: {
                    "Authorization": `Bearer ${resendKey}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    from: "NEET Navigator <onboarding@resend.dev>",
                    to: subUser.email,
                    subject: isActive
                      ? "✅ Your Subscription is Active!"
                      : "Subscription Update",
                    html: isActive
                      ? `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
                          <h2 style="color:#16a34a;">🎉 Subscription Confirmed!</h2>
                          <p>Hi there,</p>
                          <p>Great news! Your premium subscription (₹79/month) has been <strong>activated</strong>.</p>
                          <p>You now have full access to all premium features including:</p>
                          <ul>
                            <li>Smart Learning with AI-powered video analysis</li>
                            <li>Complete test dashboard with mock tests</li>
                            <li>Detailed progress tracking</li>
                            <li>AI study planner</li>
                          </ul>
                          <p>Happy studying! 🚀</p>
                          <p style="color:#888;font-size:12px;">— NEET Navigator Team</p>
                        </div>`
                      : `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
                          <h2>Subscription Update</h2>
                          <p>Hi there,</p>
                          <p>Unfortunately, your subscription request could not be approved at this time.</p>
                          <p>If you believe this is an error, please try again or contact support.</p>
                          <p style="color:#888;font-size:12px;">— NEET Navigator Team</p>
                        </div>`,
                  }),
                });
              }
            } catch (emailErr) {
              console.error("Email send failed:", emailErr);
              // Don't fail the whole request if email fails
            }
          }
        }
      }

      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Default: list all subscriptions
    const { data: subs, error } = await adminClient
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const usersWithEmails = [];
    for (const sub of subs || []) {
      const { data: { user: u } } = await adminClient.auth.admin.getUserById(sub.user_id);
      usersWithEmails.push({ ...sub, email: u?.email || "unknown" });
    }

    return new Response(JSON.stringify(usersWithEmails), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
