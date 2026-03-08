import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import type { MiniChapter } from "@/types/smartLearning";

interface MiniChaptersProps {
  chapters: MiniChapter[];
  onSelect: (chapter: MiniChapter) => void;
}

function formatDuration(start: number, end: number) {
  const mins = Math.round((end - start) / 60);
  return `${mins} min`;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

const MiniChapters = ({ chapters, onSelect }: MiniChaptersProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-display font-bold text-sm text-foreground">Learning Cards</h3>
      <div className="grid grid-cols-2 gap-2">
        {chapters.map((ch, i) => (
          <motion.button
            key={ch.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(ch)}
            className="text-left rounded-xl bg-card border border-border/50 p-3 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {formatDuration(ch.startTime, ch.endTime)}
              </span>
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Play className="w-3 h-3 text-primary ml-0.5" />
              </div>
            </div>
            <p className="font-semibold text-xs text-card-foreground line-clamp-2">{ch.title}</p>
            <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{ch.description}</p>
            <p className="text-[9px] text-muted-foreground mt-1">
              {formatTime(ch.startTime)} – {formatTime(ch.endTime)}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MiniChapters;
