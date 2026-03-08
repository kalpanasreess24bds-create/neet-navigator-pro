import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
import { studyData, type Subject, type Chapter } from "@/data/studyContent";
import type { PlannedChapter } from "@/types/studyPlanner";

interface ChapterPickerProps {
  existingIds: string[];
  onAdd: (chapter: PlannedChapter) => void;
  onClose: () => void;
}

const subjectFilter = ["All", "Biology", "Physics", "Chemistry"] as const;

const ChapterPicker = ({ existingIds, onAdd, onClose }: ChapterPickerProps) => {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const allChapters = studyData.flatMap((cls) =>
    cls.subjects.flatMap((subj) =>
      subj.chapters.map((ch) => ({
        ...ch,
        subjectId: subj.id,
        subjectName: subj.name,
        subjectColor: subj.color,
        subjectIcon: subj.icon,
        className: cls.name,
      }))
    )
  );

  const filtered = allChapters.filter((ch) => {
    if (existingIds.includes(ch.id)) return false;
    if (filter !== "All" && !ch.subjectName.includes(filter)) return false;
    if (search && !ch.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="bg-card border border-border rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-display font-bold text-foreground">Add Chapter</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chapters..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
          </div>
        </div>

        {/* Subject Filter */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {subjectFilter.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No chapters found</p>
          )}
          {filtered.map((ch) => (
            <button
              key={ch.id}
              onClick={() =>
                onAdd({
                  id: crypto.randomUUID(),
                  chapterId: ch.id,
                  chapterName: ch.name,
                  subjectId: ch.subjectId,
                  subjectName: ch.subjectName,
                  subjectColor: ch.subjectColor,
                  subjectIcon: ch.subjectIcon,
                  completed: false,
                  videoId: ch.videoId,
                })
              }
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
            >
              <span className="text-lg">{ch.subjectIcon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">{ch.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {ch.className} • {ch.subjectName}
                </p>
              </div>
              <Plus className="w-4 h-4 text-primary shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterPicker;
