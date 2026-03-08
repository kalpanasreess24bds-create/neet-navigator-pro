import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function fetchYouTubeTranscript(videoId: string): Promise<string> {
  // Try fetching transcript via YouTube's timedtext API
  try {
    const videoPageResp = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const html = await videoPageResp.text();

    // Extract captions player response
    const captionMatch = html.match(/"captionTracks":\s*(\[.*?\])/);
    if (captionMatch) {
      const tracks = JSON.parse(captionMatch[1]);
      const track = tracks.find((t: any) => t.languageCode === "en") || tracks[0];
      if (track?.baseUrl) {
        const transcriptResp = await fetch(track.baseUrl + "&fmt=json3");
        const data = await transcriptResp.json();
        if (data.events) {
          return data.events
            .filter((e: any) => e.segs)
            .map((e: any) => {
              const time = Math.floor((e.tStartMs || 0) / 1000);
              const text = e.segs.map((s: any) => s.utf8 || "").join("");
              return `[${formatTime(time)}] ${text.trim()}`;
            })
            .filter((l: string) => l.length > 10)
            .join("\n");
        }
      }
    }
  } catch (e) {
    console.error("Transcript fetch error:", e);
  }
  return "";
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { videoId, title, durationMinutes } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Try to get real transcript
    let transcript = await fetchYouTubeTranscript(videoId);
    const hasRealTranscript = transcript.length > 100;

    const systemPrompt = `You are an expert educational content analyzer. Given information about a YouTube lecture video, create a comprehensive structured learning breakdown.

You MUST respond with valid JSON only, no markdown, no code blocks. Use this exact structure:
{
  "segments": [
    {
      "id": "seg-1",
      "title": "Introduction",
      "startTime": 0,
      "endTime": 300,
      "type": "introduction",
      "summary": "Brief 2-3 line summary",
      "keyPoints": ["point1", "point2"],
      "tags": ["Introduction"],
      "transcript": "Detailed transcript or reconstructed content for this segment"
    }
  ],
  "miniChapters": [
    {
      "id": "ch-1",
      "title": "Chapter title",
      "startTime": 0,
      "endTime": 420,
      "description": "What this chunk covers"
    }
  ],
  "quickRevision": {
    "title": "5-Minute Revision",
    "points": ["Key concept 1", "Key concept 2", "Important formula", "Critical definition"]
  },
  "totalDuration": 3600,
  "breakPoints": [900, 1800, 2700]
}

Rules:
- Segment types: "introduction", "concept", "example", "definition", "important", "exam_point", "summary"
- Tags can be: "Introduction", "Definition", "Example", "Important Concept", "Exam Point", "Formula", "Diagram", "Practice"
- miniChapters should be 5-10 minute chunks
- breakPoints should be every 15-20 minutes (in seconds)
- Make content educationally relevant and accurate for NEET/medical entrance exam preparation
- totalDuration in seconds`;

    const userPrompt = hasRealTranscript
      ? `Analyze this YouTube lecture video and create a structured learning breakdown.

Video Title: "${title}"
Video ID: ${videoId}
Approximate Duration: ${durationMinutes || 60} minutes

Transcript:
${transcript.substring(0, 12000)}

Create detailed segments based on the actual transcript content.`
      : `Analyze this YouTube lecture video and create a structured learning breakdown.

Video Title: "${title}"
Video ID: ${videoId}
Approximate Duration: ${durationMinutes || 60} minutes

No transcript available. Based on the title and typical NEET lecture structure, create an intelligent breakdown with realistic segments, key points, and educational content.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) throw new Error("No content in AI response");

    // Parse JSON from response (handle potential markdown wrapping)
    let parsed;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      throw new Error("Failed to parse AI response as JSON");
    }

    return new Response(JSON.stringify({ ...parsed, hasTranscript: hasRealTranscript }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-video error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
