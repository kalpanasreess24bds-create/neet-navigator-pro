import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, RotateCcw, CheckCircle2 } from "lucide-react";
import { format, addDays, getDay } from "date-fns";
import { studyData } from "@/data/studyContent";
import type { PlannedChapter } from "@/types/studyPlanner";
import { toast } from "sonner";

interface SmartPlanGeneratorProps {
  onGenerate: (plans: { date: Date; chapters: PlannedChapter[] }[]) => Promise<void>;
  existingPlanDates: string[];
}

const CHAPTERS_PER_DAY = 3;
const PLAN_DAYS = 90; // 3-month rolling schedule

function buildSmartPlan(): { date: Date; chapters: PlannedChapter[] }[] {
  const allChapters = studyData.flatMap((cls) =>
    cls.subjects.flatMap((subj) =>
      subj.chapters.map((ch) => ({
        ...ch,
        subjectId: subj.id,
        subjectName: subj.name,
        subjectColor: subj.color,
        subjectIcon: subj.icon,
      }))
    )
  );

  // Sort by progress (weak first), then interleave subjects
  const sorted = [...allChapters].sort((a, b) => a.progress - b.progress);

  const subjectBuckets: Record<string, typeof sorted> = {};
  sorted.forEach((ch) => {
    if (!subjectBuckets[ch.subjectName]) subjectBuckets[ch.subjectName] = [];
    subjectBuckets[ch.subjectName].push(ch);
  });

  const subjects = Object.keys(subjectBuckets);
  const interleaved: typeof sorted = [];
  const maxLen = Math.max(...subjects.map((s) => subjectBuckets[s].length));

  for (let i = 0; i < maxLen; i++) {
    for (const subj of subjects) {
      if (i < subjectBuckets[subj].length) {
        interleaved.push(subjectBuckets[subj][i]);
      }
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const studyDays = Math.floor(PLAN_DAYS * 0.85);
  const revisionDays = PLAN_DAYS - studyDays;
  const timeSlots = ["8:00 AM", "10:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"];
  const dailyPlans: { date: Date; chapters: PlannedChapter[] }[] = [];

  let chapterIndex = 0;
  let weekCounter = 0;
  let lastMonthSeen = -1;

  for (let day = 0; day < studyDays && chapterIndex < interleaved.length; day++) {
    const date = addDays(today, day + 1);
    const dayChapters: PlannedChapter[] = [];
    const dayOfWeek = getDay(date);

    for (let j = 0; j < CHAPTERS_PER_DAY && chapterIndex < interleaved.length; j++) {
      const ch = interleaved[chapterIndex];
      dayChapters.push({
        id: crypto.randomUUID(),
        chapterId: ch.id,
        chapterName: ch.name,
        subjectId: ch.subjectId,
        subjectName: ch.subjectName,
        subjectColor: ch.subjectColor,
        subjectIcon: ch.subjectIcon,
        timeSlot: timeSlots[j % timeSlots.length],
        completed: false,
        videoId: ch.videoId,
      });
      chapterIndex++;
    }

    // Weekly assessment on Saturdays
    if (dayOfWeek === 6) {
      weekCounter++;
      dayChapters.push({
        id: crypto.randomUUID(),
        chapterId: `assessment-weekly-${weekCounter}`,
        chapterName: `📋 Weekly Assessment #${weekCounter}`,
        subjectId: "assessment",
        subjectName: "Assessment",
        subjectColor: "hsl(38 92% 55%)",
        subjectIcon: "📝",
        timeSlot: "6:00 PM",
        completed: false,
        assessmentType: "weekly",
      });
    }

    // Monthly mock test
    const currentMonth = date.getMonth();
    const tomorrow = addDays(date, 1);
    if (tomorrow.getMonth() !== currentMonth && lastMonthSeen !== currentMonth) {
      lastMonthSeen = currentMonth;
      dayChapters.push({
        id: crypto.randomUUID(),
        chapterId: `assessment-monthly-${currentMonth}`,
        chapterName: `🏆 Monthly Mock Test — ${format(date, "MMMM")}`,
        subjectId: "assessment",
        subjectName: "Assessment",
        subjectColor: "hsl(340 65% 50%)",
        subjectIcon: "🏆",
        timeSlot: "10:00 AM",
        completed: false,
        assessmentType: "monthly",
      });
    }

    if (dayChapters.length > 0) {
      dailyPlans.push({ date, chapters: dayChapters });
    }
  }

  // Revision days
  if (revisionDays > 0) {
    const weakChapters = allChapters.filter((ch) => ch.progress < 50);
    let revIdx = 0;

    for (let day = 0; day < revisionDays && weakChapters.length > 0; day++) {
      const date = addDays(today, studyDays + day + 1);
      const dayChapters: PlannedChapter[] = [];

      for (let j = 0; j < CHAPTERS_PER_DAY; j++) {
        const ch = weakChapters[revIdx % weakChapters.length];
        dayChapters.push({
          id: crypto.randomUUID(),
          chapterId: `rev-${ch.id}-${day}`,
          chapterName: `📝 Revision: ${ch.name}`,
          subjectId: ch.subjectId,
          subjectName: ch.subjectName,
          subjectColor: ch.subjectColor,
          subjectIcon: ch.subjectIcon,
          timeSlot: timeSlots[j % timeSlots.length],
          completed: false,
          videoId: ch.videoId,
        });
        revIdx++;
      }

      if (dayChapters.length > 0) {
        dailyPlans.push({ date, chapters: dayChapters });
      }
    }
  }

  return dailyPlans;
}

const SmartPlanGenerator = ({ onGenerate, existingPlanDates }: SmartPlanGeneratorProps) => {
  const [generating, setGenerating] = useState(false);
  const autoGenerated = useRef(false);

  // Auto-generate on first mount when no existing plans
  useEffect(() => {
    if (existingPlanDates.length === 0 && !autoGenerated.current) {
      autoGenerated.current = true;
      handleGenerate();
    }
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const dailyPlans = buildSmartPlan();
      await onGenerate(dailyPlans);

      const weeklyCount = dailyPlans.reduce(
        (acc, p) => acc + p.chapters.filter((c) => c.assessmentType === "weekly").length,
        0
      );
      const monthlyCount = dailyPlans.reduce(
        (acc, p) => acc + p.chapters.filter((c) => c.assessmentType === "monthly").length,
        0
      );

      toast.success(
        `Smart plan created! ${dailyPlans.length} days with ${weeklyCount} weekly & ${monthlyCount} monthly assessments.`
      );
    } catch {
      toast.error("Failed to generate plan");
    } finally {
      setGenerating(false);
    }
  };

  // If plans already exist, show regenerate option
  if (existingPlanDates.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="elevated-card rounded-2xl p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Smart Plan Active</p>
            <p className="text-[10px] text-muted-foreground">{existingPlanDates.length} days scheduled</p>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline disabled:opacity-50"
        >
          {generating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RotateCcw className="w-3.5 h-3.5" />
          )}
          {generating ? "Generating..." : "Regenerate"}
        </button>
      </motion.div>
    );
  }

  // Loading state during auto-generation
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="elevated-card rounded-2xl p-6 text-center space-y-3"
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
        {generating ? (
          <Loader2 className="w-7 h-7 text-primary animate-spin" />
        ) : (
          <Sparkles className="w-7 h-7 text-primary" />
        )}
      </div>
      <div>
        <h3 className="font-display font-bold text-foreground">
          {generating ? "Creating Your Schedule..." : "Smart Plan"}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {generating
            ? "Distributing chapters across 90 days with assessments"
            : "Auto-generating your personalized study schedule"}
        </p>
      </div>
    </motion.div>
  );
};

export default SmartPlanGenerator;
