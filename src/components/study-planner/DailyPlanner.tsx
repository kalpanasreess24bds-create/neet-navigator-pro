import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Play, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import ChapterPicker from "./ChapterPicker";
import AssessmentCard from "./AssessmentCard";
import type { PlannedChapter } from "@/types/studyPlanner";
import { isAssessment } from "@/types/studyPlanner";
import { useNavigate } from "react-router-dom";

interface DailyPlannerProps {
  date: Date;
  chapters: PlannedChapter[];
  progress: number;
  onDateChange: (d: Date) => void;
  onAdd: (ch: PlannedChapter) => void;
  onRemove: (chapterId: string) => void;
  onToggle: (chapterId: string) => void;
  onTimeSlot: (chapterId: string, slot: string) => void;
  readOnly?: boolean;
}

const timeSlots = ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM", "10:00 PM"];

const DailyPlanner = ({
  date,
  chapters,
  progress,
  onDateChange,
  onAdd,
  onRemove,
  onToggle,
  onTimeSlot,
  readOnly = false,
}: DailyPlannerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const navigate = useNavigate();
  const isToday = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

  const studyChapters = chapters.filter((c) => !isAssessment(c));
  const assessmentChapters = chapters.filter((c) => isAssessment(c));

  return (
    <div className="space-y-4">
      {/* Date Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => onDateChange(subDays(date, 1))} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="text-center">
          <p className="font-display font-bold text-foreground">
            {isToday ? "Today" : format(date, "EEEE")}
          </p>
          <p className="text-xs text-muted-foreground">{format(date, "MMM d, yyyy")}</p>
        </div>
        <button onClick={() => onDateChange(addDays(date, 1))} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Progress */}
      {chapters.length > 0 && (
        <div className="elevated-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground">Daily Progress</p>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-[10px] text-muted-foreground mt-1.5">
            {chapters.filter((c) => c.completed).length}/{chapters.length} items completed
          </p>
        </div>
      )}

      {/* Assessment Cards */}
      {assessmentChapters.length > 0 && (
        <div className="space-y-2">
          {assessmentChapters.map((ch) => (
            <AssessmentCard
              key={ch.id}
              chapter={ch}
              onToggle={() => onToggle(ch.chapterId)}
            />
          ))}
        </div>
      )}

      {/* Study Chapter List */}
      <div className="space-y-2">
        <AnimatePresence>
          {studyChapters.map((ch, i) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: i * 0.03 }}
              className={`elevated-card rounded-xl p-3 transition-opacity ${ch.completed ? "opacity-60" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={ch.completed}
                  onCheckedChange={() => onToggle(ch.chapterId)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{ch.subjectIcon}</span>
                    <p className={`text-sm font-medium text-card-foreground ${ch.completed ? "line-through" : ""}`}>
                      {ch.chapterName}
                    </p>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{ch.subjectName}</p>

                  {/* Time Slot */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <select
                      value={ch.timeSlot || ""}
                      onChange={(e) => onTimeSlot(ch.chapterId, e.target.value)}
                      className="text-[10px] bg-secondary rounded-md px-2 py-1 text-foreground outline-none border-none"
                    >
                      <option value="">Set time</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {ch.videoId && (
                    <button
                      onClick={() => navigate(`/smart-learning?v=${ch.videoId}&title=${encodeURIComponent(ch.chapterName)}`)}
                      className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-primary ml-0.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onRemove(ch.chapterId)}
                    className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowPicker(true)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <Plus className="w-4 h-4" /> Add Chapter
      </button>

      {/* Empty State */}
      {chapters.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">No chapters planned for this day</p>
          <p className="text-muted-foreground text-xs mt-1">Tap "Add Chapter" to start planning</p>
        </div>
      )}

      <AnimatePresence>
        {showPicker && (
          <ChapterPicker
            existingIds={chapters.map((c) => c.chapterId)}
            onAdd={(ch) => {
              onAdd(ch);
              setShowPicker(false);
            }}
            onClose={() => setShowPicker(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyPlanner;
