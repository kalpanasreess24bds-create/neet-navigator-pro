import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, ExternalLink, RefreshCw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NTAUpdate {
  id: string;
  title: string;
  summary: string;
  date: string;
  link: string;
  source: string;
}

const NTAUpdates = () => {
  const [updates, setUpdates] = useState<NTAUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUpdates = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("nta-updates");

      if (fnError) throw new Error(fnError.message);
      if (!data?.success) throw new Error(data?.error || "Failed to fetch");

      setUpdates(data.data || []);
    } catch (err: any) {
      console.error("Failed to fetch NTA updates:", err);
      setError(err.message || "Could not load updates");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="elevated-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground text-sm">NTA Updates</h3>
            <p className="text-[10px] text-muted-foreground">Live NEET exam news & notifications</p>
          </div>
        </div>
        <button
          onClick={() => fetchUpdates(true)}
          disabled={refreshing}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-muted-foreground ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Fetching latest NTA updates...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="elevated-card rounded-xl p-4 text-center space-y-2">
          <p className="text-sm text-destructive font-medium">Failed to load updates</p>
          <p className="text-xs text-muted-foreground">{error}</p>
          <button
            onClick={() => fetchUpdates()}
            className="text-xs text-primary font-medium hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Updates List */}
      {!loading && !error && (
        <div className="space-y-3">
          {updates.map((update, i) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="elevated-card rounded-xl p-4 space-y-2"
            >
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Bell className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground leading-snug">{update.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {update.source && (
                      <span className="text-[10px] font-medium text-primary">{update.source}</span>
                    )}
                    <span className="text-[10px] text-muted-foreground">• {formatDate(update.date)}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{update.summary}</p>

              {update.link && (
                <a
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                >
                  Read full article <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}

          {updates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No updates found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NTAUpdates;
