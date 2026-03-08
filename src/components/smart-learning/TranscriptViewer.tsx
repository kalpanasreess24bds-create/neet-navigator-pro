import { motion } from "framer-motion";
import type { VideoSegment } from "@/types/smartLearning";
import { Lightbulb, BookOpen } from "lucide-react";

interface TranscriptViewerProps {
  segment: VideoSegment | null;
}

const TranscriptViewer = ({ segment }: TranscriptViewerProps) => {
  if (!segment) {
    return (
      <div className="rounded-xl bg-card border border-border/50 p-6 text-center">
        <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Select a segment to view transcript & key points</p>
      </div>
    );
  }

  return (
    <motion.div
      key={segment.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Summary */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
        <h4 className="font-display font-bold text-sm text-foreground mb-1">{segment.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{segment.summary}</p>
      </div>

      {/* Key Points */}
      {segment.keyPoints.length > 0 && (
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-accent" />
            <h4 className="font-display font-bold text-sm text-foreground">Key Points</h4>
          </div>
          <ul className="space-y-2">
            {segment.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-card-foreground">
                <span className="w-5 h-5 rounded-full bg-accent/10 text-accent-foreground flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Transcript */}
      {segment.transcript && (
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <h4 className="font-display font-bold text-sm text-foreground mb-2">Transcript</h4>
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {segment.transcript}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TranscriptViewer;
