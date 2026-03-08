import { useState, useCallback, useMemo, useEffect } from "react";
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import type { PlannedChapter } from "@/types/studyPlanner";
import { studyData } from "@/data/studyContent";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function useStudyPlanner() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Record<string, PlannedChapter[]>>({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Fetch all plans from DB
  useEffect(() => {
    if (!user) {
      setPlans({});
      return;
    }

    const fetchPlans = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Failed to fetch plans:", error);
        setLoading(false);
        return;
      }

      const grouped: Record<string, PlannedChapter[]> = {};
      for (const row of data || []) {
        const key = row.plan_date;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push({
          id: row.id,
          chapterId: row.chapter_id,
          chapterName: row.chapter_name,
          subjectId: row.subject_id,
          subjectName: row.subject_name,
          subjectColor: row.subject_color,
          subjectIcon: row.subject_icon,
          timeSlot: row.time_slot ?? undefined,
          completed: row.completed,
          videoId: row.video_id ?? undefined,
        });
      }
      setPlans(grouped);
      setLoading(false);
    };

    fetchPlans();
  }, [user]);

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
    async (d: Date, chapter: PlannedChapter) => {
      if (!user) return;
      const key = dateKey(d);
      const existing = plans[key] || [];
      if (existing.some((c) => c.chapterId === chapter.chapterId)) return;

      const { data, error } = await supabase
        .from("study_plans")
        .insert({
          user_id: user.id,
          plan_date: key,
          chapter_id: chapter.chapterId,
          chapter_name: chapter.chapterName,
          subject_id: chapter.subjectId,
          subject_name: chapter.subjectName,
          subject_color: chapter.subjectColor,
          subject_icon: chapter.subjectIcon,
          time_slot: chapter.timeSlot || null,
          completed: false,
          video_id: chapter.videoId || null,
        })
        .select()
        .single();

      if (error) {
        toast.error("Failed to add chapter");
        return;
      }

      const newChapter: PlannedChapter = { ...chapter, id: data.id };
      setPlans((prev) => ({ ...prev, [key]: [...(prev[key] || []), newChapter] }));
    },
    [plans, dateKey, user]
  );

  const removeChapterFromDate = useCallback(
    async (d: Date, chapterId: string) => {
      if (!user) return;
      const key = dateKey(d);
      const existing = plans[key] || [];
      const item = existing.find((c) => c.chapterId === chapterId);
      if (!item) return;

      const { error } = await supabase
        .from("study_plans")
        .delete()
        .eq("id", item.id);

      if (error) {
        toast.error("Failed to remove chapter");
        return;
      }

      setPlans((prev) => ({
        ...prev,
        [key]: (prev[key] || []).filter((c) => c.chapterId !== chapterId),
      }));
    },
    [plans, dateKey, user]
  );

  const toggleComplete = useCallback(
    async (d: Date, chapterId: string) => {
      if (!user) return;
      const key = dateKey(d);
      const existing = plans[key] || [];
      const item = existing.find((c) => c.chapterId === chapterId);
      if (!item) return;

      const { error } = await supabase
        .from("study_plans")
        .update({ completed: !item.completed })
        .eq("id", item.id);

      if (error) {
        toast.error("Failed to update");
        return;
      }

      setPlans((prev) => ({
        ...prev,
        [key]: (prev[key] || []).map((c) =>
          c.chapterId === chapterId ? { ...c, completed: !c.completed } : c
        ),
      }));
    },
    [plans, dateKey, user]
  );

  const updateTimeSlot = useCallback(
    async (d: Date, chapterId: string, timeSlot: string) => {
      if (!user) return;
      const key = dateKey(d);
      const existing = plans[key] || [];
      const item = existing.find((c) => c.chapterId === chapterId);
      if (!item) return;

      const { error } = await supabase
        .from("study_plans")
        .update({ time_slot: timeSlot })
        .eq("id", item.id);

      if (error) {
        toast.error("Failed to update time slot");
        return;
      }

      setPlans((prev) => ({
        ...prev,
        [key]: (prev[key] || []).map((c) =>
          c.chapterId === chapterId ? { ...c, timeSlot } : c
        ),
      }));
    },
    [plans, dateKey, user]
  );

  const moveToNextDay = useCallback(
    async (fromDate: Date, chapterId: string) => {
      if (!user) return;
      const fromKey = dateKey(fromDate);
      const toDate = addDays(fromDate, 1);
      const toKey = dateKey(toDate);
      const fromChapters = plans[fromKey] || [];
      const chapter = fromChapters.find((c) => c.chapterId === chapterId);
      if (!chapter) return;
      const toChapters = plans[toKey] || [];
      if (toChapters.some((c) => c.chapterId === chapterId)) return;

      const { error } = await supabase
        .from("study_plans")
        .update({ plan_date: toKey, completed: false, time_slot: null })
        .eq("id", chapter.id);

      if (error) {
        toast.error("Failed to move chapter");
        return;
      }

      setPlans((prev) => ({
        ...prev,
        [fromKey]: (prev[fromKey] || []).filter((c) => c.chapterId !== chapterId),
        [toKey]: [...(prev[toKey] || []), { ...chapter, completed: false, timeSlot: undefined }],
      }));
    },
    [plans, dateKey, user]
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
    loading,
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
