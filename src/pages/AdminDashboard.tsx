import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, XCircle, Clock, RefreshCw, ArrowLeft, Users, IndianRupee, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SubRecord {
  id: string;
  user_id: string;
  email: string;
  amount: number;
  status: string;
  payment_reference: string | null;
  created_at: string;
  activated_at: string | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subs, setSubs] = useState<SubRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchSubscriptions();
  }, [user]);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await supabase.functions.invoke("admin-subscriptions");

      if (res.error) throw res.error;
      if (res.data?.error === "Forbidden: admin only") {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      if (res.data?.error) throw new Error(res.data.error);

      setIsAdmin(true);
      setSubs(res.data || []);
    } catch (err: any) {
      if (err?.message?.includes("Forbidden") || err?.context?.status === 403) {
        setIsAdmin(false);
      } else {
        toast.error("Failed to load data");
      }
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await supabase.functions.invoke("admin-subscriptions", {
        body: { id, status },
      });
      if (res.error) throw res.error;
      toast.success(`Subscription ${status === "active" ? "activated" : "rejected"}`);
      fetchSubscriptions();
    } catch {
      toast.error("Failed to update");
    }
    setUpdating(null);
  };

  const pending = subs.filter(s => s.status === "pending");
  const active = subs.filter(s => s.status === "active");
  const rejected = subs.filter(s => s.status === "rejected");
  const totalRevenue = active.reduce((s, a) => s + a.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
          <h1 className="text-lg font-bold text-foreground">Access Denied</h1>
          <p className="text-sm text-muted-foreground">You don't have admin privileges.</p>
          <button onClick={() => navigate("/dashboard")} className="text-sm text-primary font-medium hover:underline">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/dashboard")} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex items-center gap-2 flex-1">
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold font-display text-foreground">Admin Panel</h1>
        </div>
        <button onClick={fetchSubscriptions} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
          <RefreshCw className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="px-5 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="elevated-card rounded-xl p-3 text-center">
            <Users className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{subs.length}</p>
            <p className="text-[10px] text-muted-foreground">Total Users</p>
          </div>
          <div className="elevated-card rounded-xl p-3 text-center">
            <CheckCircle className="w-4 h-4 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{active.length}</p>
            <p className="text-[10px] text-muted-foreground">Active</p>
          </div>
          <div className="elevated-card rounded-xl p-3 text-center">
            <IndianRupee className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">₹{totalRevenue}</p>
            <p className="text-[10px] text-muted-foreground">Revenue</p>
          </div>
        </div>

        {/* Pending Approvals */}
        {pending.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" /> Pending Approvals ({pending.length})
            </h2>
            {pending.map((sub) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="elevated-card rounded-xl p-4 border-l-4 border-yellow-500"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{sub.email}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      ₹{sub.amount} • {new Date(sub.created_at).toLocaleDateString()}
                    </p>
                    {sub.payment_reference && (
                      <p className="text-[10px] text-muted-foreground">Ref: {sub.payment_reference}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={updating === sub.id}
                      onClick={() => updateStatus(sub.id, "active")}
                      className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </button>
                    <button
                      disabled={updating === sub.id}
                      onClick={() => updateStatus(sub.id, "rejected")}
                      className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                    >
                      <XCircle className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Active Subscriptions */}
        <div className="space-y-2">
          <h2 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" /> Active ({active.length})
          </h2>
          {active.length === 0 && (
            <p className="text-xs text-muted-foreground py-4 text-center">No active subscriptions yet</p>
          )}
          {active.map((sub) => (
            <div key={sub.id} className="elevated-card rounded-xl p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{sub.email}</p>
                  <p className="text-[10px] text-muted-foreground">
                    ₹{sub.amount} • Activated {sub.activated_at ? new Date(sub.activated_at).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-green-500/10 text-green-500">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rejected */}
        {rejected.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" /> Rejected ({rejected.length})
            </h2>
            {rejected.map((sub) => (
              <div key={sub.id} className="elevated-card rounded-xl p-4 border-l-4 border-destructive opacity-60">
                <p className="text-sm font-semibold text-card-foreground">{sub.email}</p>
                <p className="text-[10px] text-muted-foreground">₹{sub.amount} • {new Date(sub.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
