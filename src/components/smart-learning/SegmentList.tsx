import { motion } from "framer-motion";
import { Clock, Tag, ChevronRight } from "lucide-react";
import type { VideoSegment } from "@/types/smartLearning";

const tagColors: Record<string, string> = {
  Introduction: "bg-primary/10 text-primary",
  Definition: "bg-accent/10 text-accent-foreground",
  Example: "bg-success/10 text-success",
  "Important Concept": "bg-destructive/10 text-destructive",
  "Exam Point": "bg-warning/10 text-warning-foreground",
  Formula: "bg-primary/10 text-primary",
  Diagram: "bg-muted text-muted-foreground",
  Practice: "bg-success/10 text-success",
};

interface SegmentListProps {
  segments: VideoSegment[];
  activeSegmentId: string | null;
  onSelectSegment: (segment: VideoSegment) => void;
}

function formatSeconds(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

const SegmentList = ({ segments, activeSegmentId, onSelectSegment }: SegmentListProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-display font-bold text-sm text-foreground px-1">Video Segments</h3>
      {segments.map((seg, i) => (
        <motion.button
          key={seg.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          onClick={() => onSelectSegment(seg)}
          className={`w-full text-left rounded-xl p-3 transition-all ${
            activeSegmentId === seg.id
              ? "bg-primary/10 border border-primary/30"
              : "bg-card border border-border/50 hover:border-primary/20"
          }`}
        >
          <div className="flex items-start gap-2">
            <div className="shrink-0 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs text-card-foreground truncate">{seg.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {formatSeconds(seg.startTime)} – {formatSeconds(seg.endTime)}
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {seg.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                      tagColors[tag] || "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Tag className="w-2 h-2" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1" />
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default SegmentList;
