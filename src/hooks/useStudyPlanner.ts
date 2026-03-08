import { useState, useCallback, useMemo } from "react";
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import type { PlannedChapter, DayPlan } from "@/types/studyPlanner";
import { studyData } from "@/data/studyContent";

const STORAGE_KEY = "neet-study-planner";

function loadPlans(): Record<string, PlannedChapter[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePlans(plans: Record<string, PlannedChapter[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function useStudyPlanner() {
  const [plans, setPlans] = useState<Record<string, PlannedChapter[]>>(loadPlans);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const allSubjects = useMemo(() => {
    return studyData.flatMap((cls) =>
      cls.subjects.map((s) => ({
        ...s,
        className: cls.name,
        classId: cls.id,
      }))
    );
  }, []);

  const dateKey = useCallback((d: Date) => format(d, "yyyy-MM-dd"), []);

  const getChaptersForDate = useCallback(
    (d: Date): PlannedChapter[] => plans[dateKey(d)] || [],
    [plans, dateKey]
  );

  const addChapterToDate = useCallback(
    (d: Date, chapter: PlannedChapter) => {
      const key = dateKey(d);
      const existing = plans[key] || [];
      if (existing.some((c) => c.chapterId === chapter.chapterId)) return;
      const updated = { ...plans, [key]: [...existing, chapter] };
      setPlans(updated);
      savePlans(updated);
    },
    [plans, dateKey]
  );

  const removeChapterFromDate = useCallback(
    (d: Date, chapterId: string) => {
      const key = dateKey(d);
      const existing = plans[key] || [];
      const updated = { ...plans, [key]: existing.filter((c) => c.chapterId !== chapterId) };
      setPlans(updated);
      savePlans(updated);
    },
    [plans, dateKey]
  );

  const toggleComplete = useCallback(
    (d: Date, chapterId: string) => {
      const key = dateKey(d);
      const existing = plans[key] || [];
      const updated = {
        ...plans,
        [key]: existing.map((c) =>
          c.chapterId === chapterId ? { ...c, completed: !c.completed } : c
        ),
      };
      setPlans(updated);
      savePlans(updated);
    },
    [plans, dateKey]
  );

  const updateTimeSlot = useCallback(
    (d: Date, chapterId: string, timeSlot: string) => {
      const key = dateKey(d);
      const existing = plans[key] || [];
      const updated = {
        ...plans,
        [key]: existing.map((c) =>
          c.chapterId === chapterId ? { ...c, timeSlot } : c
        ),
      };
      setPlans(updated);
      savePlans(updated);
    },
    [plans, dateKey]
  );

  const moveToNextDay = useCallback(
    (fromDate: Date, chapterId: string) => {
      const fromKey = dateKey(fromDate);
      const toDate = addDays(fromDate, 1);
      const toKey = dateKey(toDate);
      const fromChapters = plans[fromKey] || [];
      const chapter = fromChapters.find((c) => c.chapterId === chapterId);
      if (!chapter) return;
      const toChapters = plans[toKey] || [];
      if (toChapters.some((c) => c.chapterId === chapterId)) return;
      const updated = {
        ...plans,
        [fromKey]: fromChapters.filter((c) => c.chapterId !== chapterId),
        [toKey]: [...toChapters, { ...chapter, completed: false, timeSlot: undefined }],
      };
      setPlans(updated);
      savePlans(updated);
    },
    [plans, dateKey]
  );

  const getWeekDays = useCallback(
    (refDate: Date) => {
      const start = startOfWeek(refDate, { weekStartsOn: 1 });
      return Array.from({ length: 7 }, (_, i) => {
        const d = addDays(start, i);
        return { date: d, chapters: getChaptersForDate(d) };
      });
    },
    [getChaptersForDate]
  );

  const getMonthDays = useCallback(
    (refDate: Date) => {
      const start = startOfMonth(refDate);
      const end = endOfMonth(refDate);
      return eachDayOfInterval({ start, end }).map((d) => ({
        date: d,
        chapters: getChaptersForDate(d),
      }));
    },
    [getChaptersForDate]
  );

  const getProgress = useCallback((chapters: PlannedChapter[]) => {
    if (chapters.length === 0) return 0;
    return Math.round((chapters.filter((c) => c.completed).length / chapters.length) * 100);
  }, []);

  return {
    plans,
    selectedDate,
    setSelectedDate,
    allSubjects,
    dateKey,
    getChaptersForDate,
    addChapterToDate,
    removeChapterFromDate,
    toggleComplete,
    updateTimeSlot,
    moveToNextDay,
    getWeekDays,
    getMonthDays,
    getProgress,
  };
}
