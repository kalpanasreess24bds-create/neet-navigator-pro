import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Sparkles, BookOpen, Layers, Zap, AlertCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";

import SmartVideoPlayer from "@/components/smart-learning/SmartVideoPlayer";
import SegmentList from "@/components/smart-learning/SegmentList";
import TranscriptViewer from "@/components/smart-learning/TranscriptViewer";
import MiniChapters from "@/components/smart-learning/MiniChapters";
import QuickRevision from "@/components/smart-learning/QuickRevision";
import BreakReminder from "@/components/smart-learning/BreakReminder";
import { useVideoAnalysis } from "@/hooks/useVideoAnalysis";
import type { VideoSegment, MiniChapter } from "@/types/smartLearning";

type Tab = "segments" | "chapters" | "revision";

const SmartLearning = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const videoId = params.get("v") || "";
  const videoTitle = params.get("title") || "Lecture";

  const { analysis, loading, error, analyzeVideo } = useVideoAnalysis();
  const [activeTab, setActiveTab] = useState<Tab>("segments");
  const [activeSegment, setActiveSegment] = useState<VideoSegment | null>(null);
  const [seekTime, setSeekTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [showBreak, setShowBreak] = useState(false);
  const [lastBreakTime, setLastBreakTime] = useState(0);
  const [watchedSeconds, setWatchedSeconds] = useState(0);

  // Auto-analyze on mount
  useEffect(() => {
    if (videoId) analyzeVideo(videoId, videoTitle);
  }, [videoId]);

  // Track active segment based on current time
  useEffect(() => {
    if (!analysis) return;
    const seg = analysis.segments.find((s) => currentTime >= s.startTime && currentTime < s.endTime);
    if (seg && seg.id !== activeSegment?.id) setActiveSegment(seg);
  }, [currentTime, analysis]);

  // Study break logic
  useEffect(() => {
    setWatchedSeconds((p) => p + 1);
    if (analysis && watchedSeconds - lastBreakTime >= 900) {
      // 15 min
      setShowBreak(true);
    }
  }, [Math.floor(currentTime)]);

  const handleTimeUpdate = useCallback((t: number) => setCurrentTime(t), []);

  const handleSegmentSelect = (seg: VideoSegment) => {
    setActiveSegment(seg);
    setSeekTime(seg.startTime);
    setTimeout(() => setSeekTime(null), 100);
  };

  const handleChapterSelect = (ch: MiniChapter) => {
    setSeekTime(ch.startTime);
    setTimeout(() => setSeekTime(null), 100);
  };

  const handleResumeBreak = () => {
    setShowBreak(false);
    setLastBreakTime(watchedSeconds);
  };

  const progress = analysis ? Math.min(100, Math.round((currentTime / analysis.totalDuration) * 100)) : 0;

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: "segments", label: "Segments", icon: BookOpen },
    { id: "chapters", label: "Cards", icon: Layers },
    { id: "revision", label: "Revision", icon: Zap },
  ];

  return (
    <PremiumGate featureName="Smart Learning">
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 pt-10 pb-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold font-display text-foreground truncate">{videoTitle}</h1>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Smart Learning Mode
          </p>
        </div>
      </div>

      {/* Video Player */}
      <div className="px-4 mb-4">
        <SmartVideoPlayer
          videoId={videoId}
          title={videoTitle}
          onTimeUpdate={handleTimeUpdate}
          seekTo={seekTime}
        />
        {/* Progress bar */}
        {analysis && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-muted-foreground">{progress}% watched</span>
              <span className="text-[10px] text-muted-foreground">
                {Math.floor(currentTime / 60)}m / {Math.floor(analysis.totalDuration / 60)}m
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground font-medium">Analyzing video with AI...</p>
            <p className="text-xs text-muted-foreground">This may take 15-30 seconds</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-destructive">Analysis failed</p>
              <p className="text-xs text-muted-foreground mt-1">{error}</p>
              <button
                onClick={() => analyzeVideo(videoId, videoTitle)}
                className="mt-2 text-xs font-medium text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {analysis && !loading && (
          <>
            {/* Tabs */}
            <div className="flex gap-1 bg-muted rounded-xl p-1 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-card text-card-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "segments" && (
              <div className="space-y-4">
                <SegmentList
                  segments={analysis.segments}
                  activeSegmentId={activeSegment?.id || null}
                  onSelectSegment={handleSegmentSelect}
                />
                <TranscriptViewer segment={activeSegment} />
              </div>
            )}

            {activeTab === "chapters" && (
              <MiniChapters chapters={analysis.miniChapters} onSelect={handleChapterSelect} />
            )}

            {activeTab === "revision" && <QuickRevision revision={analysis.quickRevision} />}
          </>
        )}
      </div>

      <BreakReminder show={showBreak} onResume={handleResumeBreak} />
      <BottomNav />
    </div>
    </PremiumGate>
  );
};

export default SmartLearning;
