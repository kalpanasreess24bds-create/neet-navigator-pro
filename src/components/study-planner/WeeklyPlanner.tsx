import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addWeeks, subWeeks, startOfWeek, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, ArrowRight, Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import ChapterPicker from "./ChapterPicker";
import type { PlannedChapter } from "@/types/studyPlanner";
import { useNavigate } from "react-router-dom";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface WeeklyPlannerProps {
  weekRef: Date;
  onWeekChange: (d: Date) => void;
  getChaptersForDate: (d: Date) => PlannedChapter[];
  getProgress: (chapters: PlannedChapter[]) => number;
  onAdd: (d: Date, ch: PlannedChapter) => void;
  onToggle: (d: Date, chapterId: string) => void;
  onMoveToNext: (d: Date, chapterId: string) => void;
}

const WeeklyPlanner = ({
  weekRef,
  onWeekChange,
  getChaptersForDate,
  getProgress,
  onAdd,
  onToggle,
  onMoveToNext,
}: WeeklyPlannerProps) => {
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [pickerDay, setPickerDay] = useState<Date | null>(null);

  const weekStart = startOfWeek(weekRef, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const allWeekChapters = days.flatMap((d) => getChaptersForDate(d));
  const weekProgress = getProgress(allWeekChapters);

  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => onWeekChange(subWeeks(weekRef, 1))} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="text-center">
          <p className="font-display font-bold text-foreground text-sm">
            {format(weekStart, "MMM d")} – {format(addDays(weekStart, 6), "MMM d, yyyy")}
          </p>
        </div>
        <button onClick={() => onWeekChange(addWeeks(weekRef, 1))} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Weekly Progress */}
      {allWeekChapters.length > 0 && (
        <div className="elevated-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground">Weekly Progress</p>
            <span className="text-sm font-bold text-primary">{weekProgress}%</span>
          </div>
          <Progress value={weekProgress} className="h-2" />
          <p className="text-[10px] text-muted-foreground mt-1.5">
            {allWeekChapters.filter((c) => c.completed).length}/{allWeekChapters.length} chapters
          </p>
        </div>
      )}

      {/* Day Cards */}
      <div className="space-y-2">
        {days.map((d, i) => {
          const chapters = getChaptersForDate(d);
          const dayProgress = getProgress(chapters);
          const isExpanded = expandedDay === i;
          const isToday = format(d, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
          const incomplete = chapters.filter((c) => !c.completed);

          return (
            <motion.div
              key={i}
              className={`elevated-card rounded-xl overflow-hidden ${isToday ? "ring-1 ring-primary/30" : ""}`}
            >
              <button
                onClick={() => setExpandedDay(isExpanded ? null : i)}
                className="w-full flex items-center gap-3 p-3 text-left"
              >
                <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center text-xs font-bold ${isToday ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                  <span className="text-[9px] font-medium opacity-70">{dayLabels[i]}</span>
                  <span>{format(d, "d")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">
                    {chapters.length === 0 ? "No chapters" : `${chapters.length} chapter${chapters.length > 1 ? "s" : ""}`}
                  </p>
                  {chapters.length > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${dayProgress}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{dayProgress}%</span>
                    </div>
                  )}
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 space-y-2">
                      {chapters.map((ch) => (
                        <div
                          key={ch.id}
                          className={`flex items-center gap-2 p-2 rounded-lg bg-secondary/50 ${!ch.completed ? "" : "opacity-50"}`}
                        >
                          <Checkbox checked={ch.completed} onCheckedChange={() => onToggle(d, ch.chapterId)} />
                          <span className="text-sm">{ch.subjectIcon}</span>
                          <p className={`text-xs flex-1 min-w-0 truncate text-card-foreground ${ch.completed ? "line-through" : ""}`}>
                            {ch.chapterName}
                          </p>
                          {ch.videoId && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/smart-learning?v=${ch.videoId}&title=${encodeURIComponent(ch.chapterName)}`);
                              }}
                              className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center"
                            >
                              <Play className="w-3 h-3 text-primary ml-0.5" />
                            </button>
                          )}
                          {!ch.completed && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMoveToNext(d, ch.chapterId);
                              }}
                              title="Move to next day"
                              className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center"
                            >
                              <ArrowRight className="w-3 h-3 text-accent-foreground" />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={() => setPickerDay(d)}
                        className="w-full text-xs text-primary font-medium py-2 hover:underline"
                      >
                        + Add Chapter
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {pickerDay && (
          <ChapterPicker
            existingIds={getChaptersForDate(pickerDay).map((c) => c.chapterId)}
            onAdd={(ch) => {
              onAdd(pickerDay, ch);
              setPickerDay(null);
            }}
            onClose={() => setPickerDay(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeeklyPlanner;
