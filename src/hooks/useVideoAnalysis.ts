import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { VideoAnalysis } from "@/types/smartLearning";

export function useVideoAnalysis() {
  const [analysis, setAnalysis] = useState<VideoAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeVideo = async (videoId: string, title: string, durationMinutes?: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-video", {
        body: { videoId, title, durationMinutes },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      setAnalysis(data as VideoAnalysis);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to analyze video";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { analysis, loading, error, analyzeVideo };
}
