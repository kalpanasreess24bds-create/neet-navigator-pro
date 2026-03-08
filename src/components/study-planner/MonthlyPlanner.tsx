import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, BookOpen, Clock4, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ChapterPicker from "./ChapterPicker";
import type { PlannedChapter } from "@/types/studyPlanner";

interface MonthlyPlannerProps {
  monthRef: Date;
  onMonthChange: (d: Date) => void;
  getChaptersForDate: (d: Date) => PlannedChapter[];
  getProgress: (chapters: PlannedChapter[]) => number;
  onAdd: (d: Date, ch: PlannedChapter) => void;
}

const dayHeaders = ["M", "T", "W", "T", "F", "S", "S"];

const MonthlyPlanner = ({
  monthRef,
  onMonthChange,
  getChaptersForDate,
  getProgress,
  onAdd,
}: MonthlyPlannerProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [pickerDay, setPickerDay] = useState<Date | null>(null);

  const monthStart = startOfMonth(monthRef);
  const monthEnd = endOfMonth(monthRef);
  const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Offset for first day (Mon=0 based)
  const firstDayOffset = (getDay(monthStart) + 6) % 7;

  // Stats
  const stats = useMemo(() => {
    let totalChapters = 0;
    let completed = 0;
    const subjectMap: Record<string, { total: number; done: number; color: string; icon: string }> = {};

    allDays.forEach((d) => {
      const chs = getChaptersForDate(d);
      chs.forEach((ch) => {
        totalChapters++;
        if (ch.completed) completed++;
        if (!subjectMap[ch.subjectName]) {
          subjectMap[ch.subjectName] = { total: 0, done: 0, color: ch.subjectColor, icon: ch.subjectIcon };
        }
        subjectMap[ch.subjectName].total++;
        if (ch.completed) subjectMap[ch.subjectName].done++;
      });
    });

    return { totalChapters, completed, subjects: subjectMap };
  }, [allDays, getChaptersForDate]);

  const todayStr = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => onMonthChange(subMonths(monthRef, 1))} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <p className="font-display font-bold text-foreground">{format(monthRef, "MMMM yyyy")}</p>
        <button onClick={() => onMonthChange(addMonths(monthRef, 1))} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="elevated-card rounded-xl p-3 text-center">
          <BookOpen className="w-4 h-4 mx-auto text-primary mb-1" />
          <p className="text-lg font-bold text-foreground font-display">{stats.completed}</p>
          <p className="text-[9px] text-muted-foreground">Completed</p>
        </div>
        <div className="elevated-card rounded-xl p-3 text-center">
          <TrendingUp className="w-4 h-4 mx-auto text-primary mb-1" />
          <p className="text-lg font-bold text-foreground font-display">{stats.totalChapters}</p>
          <p className="text-[9px] text-muted-foreground">Planned</p>
        </div>
        <div className="elevated-card rounded-xl p-3 text-center">
          <Clock4 className="w-4 h-4 mx-auto text-primary mb-1" />
          <p className="text-lg font-bold text-foreground font-display">{stats.totalChapters * 2}h</p>
          <p className="text-[9px] text-muted-foreground">Est. Hours</p>
        </div>
      </div>

      {/* Subject-wise Progress */}
      {Object.keys(stats.subjects).length > 0 && (
        <div className="elevated-card rounded-xl p-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Subject-wise Progress</p>
          {Object.entries(stats.subjects).map(([name, data]) => (
            <div key={name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-card-foreground flex items-center gap-1.5">
                  {data.icon} {name}
                </span>
                <span className="text-[10px] text-muted-foreground">{data.done}/{data.total}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${data.total > 0 ? (data.done / data.total) * 100 : 0}%`,
                    backgroundColor: data.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar Grid */}
      <div className="elevated-card rounded-xl p-3">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayHeaders.map((h, i) => (
            <div key={i} className="text-center text-[10px] font-medium text-muted-foreground py-1">
              {h}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {allDays.map((d) => {
            const chapters = getChaptersForDate(d);
            const isToday = format(d, "yyyy-MM-dd") === todayStr;
            const isSelected = selectedDay && format(d, "yyyy-MM-dd") === format(selectedDay, "yyyy-MM-dd");
            const hasChapters = chapters.length > 0;
            const allDone = hasChapters && chapters.every((c) => c.completed);

            return (
              <button
                key={format(d, "yyyy-MM-dd")}
                onClick={() => setSelectedDay(isSelected ? null : d)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs relative transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isToday
                    ? "bg-primary/10 text-primary font-bold"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                {format(d, "d")}
                {hasChapters && (
                  <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${allDone ? "bg-green-500" : isSelected ? "bg-primary-foreground" : "bg-primary"}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Detail */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="elevated-card rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-display font-bold text-foreground">
                {format(selectedDay, "EEEE, MMM d")}
              </p>
              <button
                onClick={() => setPickerDay(selectedDay)}
                className="text-xs text-primary font-medium hover:underline"
              >
                + Add
              </button>
            </div>
            {getChaptersForDate(selectedDay).length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">No chapters planned</p>
            ) : (
              getChaptersForDate(selectedDay).map((ch) => (
                <div key={ch.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                  <span className="text-sm">{ch.subjectIcon}</span>
                  <p className={`text-xs flex-1 text-card-foreground ${ch.completed ? "line-through opacity-50" : ""}`}>
                    {ch.chapterName}
                  </p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${ch.completed ? "bg-green-500/10 text-green-600" : "bg-accent/10 text-accent-foreground"}`}>
                    {ch.completed ? "Done" : "Pending"}
                  </span>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

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

export default MonthlyPlanner;
