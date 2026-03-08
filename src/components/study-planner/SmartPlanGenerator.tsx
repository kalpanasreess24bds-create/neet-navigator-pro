import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Loader2, RotateCcw, CheckCircle2, ClipboardCheck } from "lucide-react";
import { format, addDays, differenceInDays, getDay } from "date-fns";
import { studyData } from "@/data/studyContent";
import type { PlannedChapter } from "@/types/studyPlanner";
import { toast } from "sonner";

interface SmartPlanGeneratorProps {
  onGenerate: (plans: { date: Date; chapters: PlannedChapter[] }[]) => Promise<void>;
  existingPlanDates: string[];
}

const SmartPlanGenerator = ({ onGenerate, existingPlanDates }: SmartPlanGeneratorProps) => {
  const [examDate, setExamDate] = useState("");
  const [chaptersPerDay, setChaptersPerDay] = useState(3);
  const [includeRevision, setIncludeRevision] = useState(true);
  const [includeAssessments, setIncludeAssessments] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

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

  const totalChapters = allChapters.length;

  const handleGenerate = async () => {
    if (!examDate) {
      toast.error("Please set your NEET exam date");
      return;
    }

    const exam = new Date(examDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysLeft = differenceInDays(exam, today);

    if (daysLeft < 7) {
      toast.error("Exam date must be at least 7 days away");
      return;
    }

    setGenerating(true);

    try {
      // Sort chapters: weak ones first (lower progress), then by subject for balance
      const sorted = [...allChapters].sort((a, b) => {
        if (a.progress !== b.progress) return a.progress - b.progress;
        return 0;
      });

      // Interleave subjects for balanced daily study
      const subjectBuckets: Record<string, typeof sorted> = {};
      sorted.forEach((ch) => {
        if (!subjectBuckets[ch.subjectName]) subjectBuckets[ch.subjectName] = [];
        subjectBuckets[ch.subjectName].push(ch);
      });

      const subjects = Object.keys(subjectBuckets);
      const interleaved: typeof sorted = [];
      let maxLen = Math.max(...subjects.map((s) => subjectBuckets[s].length));

      for (let i = 0; i < maxLen; i++) {
        for (const subj of subjects) {
          if (i < subjectBuckets[subj].length) {
            interleaved.push(subjectBuckets[subj][i]);
          }
        }
      }

      // Calculate available study days (leave last 10% for revision)
      const studyDays = includeRevision ? Math.floor(daysLeft * 0.85) : daysLeft;
      const revisionDays = daysLeft - studyDays;

      // Distribute chapters across study days
      const dailyPlans: { date: Date; chapters: PlannedChapter[] }[] = [];
      let chapterIndex = 0;

      const timeSlots = ["8:00 AM", "10:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"];

      // Track weeks and months for assessments
      let weekCounter = 0;
      let lastMonthSeen = -1;

      for (let day = 0; day < studyDays && chapterIndex < interleaved.length; day++) {
        const date = addDays(today, day + 1);
        const dayChapters: PlannedChapter[] = [];
        const dayOfWeek = getDay(date); // 0=Sun, 6=Sat

        for (let j = 0; j < chaptersPerDay && chapterIndex < interleaved.length; j++) {
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

        // Add weekly assessment on Saturdays
        if (includeAssessments && dayOfWeek === 6) {
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

        // Add monthly assessment on the last day of each month
        if (includeAssessments) {
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
        }

        if (dayChapters.length > 0) {
          dailyPlans.push({ date, chapters: dayChapters });
        }
      }

      // Add revision days — revisit weak chapters (progress < 50%)
      if (includeRevision && revisionDays > 0) {
        const weakChapters = allChapters.filter((ch) => ch.progress < 50);
        let revIdx = 0;

        for (let day = 0; day < revisionDays; day++) {
          const date = addDays(today, studyDays + day + 1);
          const dayChapters: PlannedChapter[] = [];

          for (let j = 0; j < chaptersPerDay && revIdx < weakChapters.length; j++) {
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

      await onGenerate(dailyPlans);
      setGenerated(true);

      const weeklyCount = dailyPlans.reduce(
        (acc, p) => acc + p.chapters.filter((c) => c.assessmentType === "weekly").length,
        0
      );
      const monthlyCount = dailyPlans.reduce(
        (acc, p) => acc + p.chapters.filter((c) => c.assessmentType === "monthly").length,
        0
      );

      toast.success(
        `Smart plan created! ${dailyPlans.length} days planned${
          includeAssessments ? ` with ${weeklyCount} weekly & ${monthlyCount} monthly assessments` : ""
        }.`
      );
    } catch (e) {
      toast.error("Failed to generate plan");
    } finally {
      setGenerating(false);
    }
  };

  const daysUntilExam = examDate
    ? Math.max(0, differenceInDays(new Date(examDate), new Date()))
    : 0;

  const estimatedDays = Math.ceil(totalChapters / chaptersPerDay);

  return (
    <div className="space-y-4">
      {generated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="elevated-card rounded-2xl p-6 text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground text-lg">Plan Generated!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your smart study plan with assessments has been created. Switch to Daily, Weekly, or Monthly view to see it.
            </p>
          </div>
          <button
            onClick={() => setGenerated(false)}
            className="flex items-center gap-2 mx-auto text-sm text-primary font-medium hover:underline"
          >
            <RotateCcw className="w-4 h-4" /> Regenerate Plan
          </button>
        </motion.div>
      ) : (
        <>
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="elevated-card rounded-2xl p-5 space-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground">Smart Study Plan</h3>
                <p className="text-xs text-muted-foreground">AI-optimized schedule for NEET</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automatically distributes {totalChapters} chapters across your available days with built-in weekly & monthly assessments.
            </p>
          </motion.div>

          {/* Exam Date */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="elevated-card rounded-xl p-4 space-y-3"
          >
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> NEET Exam Date
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              min={format(addDays(new Date(), 7), "yyyy-MM-dd")}
              className="w-full bg-secondary rounded-lg px-3 py-2.5 text-sm text-foreground outline-none border-none"
            />
            {daysUntilExam > 0 && (
              <p className="text-xs text-primary font-medium">{daysUntilExam} days remaining</p>
            )}
          </motion.div>

          {/* Chapters Per Day */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="elevated-card rounded-xl p-4 space-y-3"
          >
            <label className="text-xs font-medium text-muted-foreground">Chapters per day</label>
            <div className="flex gap-2">
              {[2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setChaptersPerDay(n)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    chaptersPerDay === n
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">
              ~{estimatedDays} days needed to cover all chapters
            </p>
          </motion.div>

          {/* Include Revision */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="elevated-card rounded-xl p-4"
          >
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-foreground">Include revision sessions</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Reserve ~15% of days for revising weak chapters
                </p>
              </div>
              <div
                onClick={() => setIncludeRevision(!includeRevision)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  includeRevision ? "bg-primary" : "bg-secondary"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-primary-foreground shadow-sm absolute top-0.5 transition-transform ${
                    includeRevision ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </label>
          </motion.div>

          {/* Include Assessments */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="elevated-card rounded-xl p-4"
          >
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <ClipboardCheck className="w-3.5 h-3.5 text-primary" /> Include assessments
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Weekly tests every Saturday + monthly mock tests
                </p>
              </div>
              <div
                onClick={() => setIncludeAssessments(!includeAssessments)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  includeAssessments ? "bg-primary" : "bg-secondary"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-primary-foreground shadow-sm absolute top-0.5 transition-transform ${
                    includeAssessments ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </label>
          </motion.div>

          {/* Summary */}
          {examDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="elevated-card rounded-xl p-4"
            >
              <p className="text-xs font-medium text-muted-foreground mb-2">Plan Summary</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary rounded-lg p-2.5 text-center">
                  <p className="text-lg font-bold text-foreground font-display">{totalChapters}</p>
                  <p className="text-[9px] text-muted-foreground">Total Chapters</p>
                </div>
                <div className="bg-secondary rounded-lg p-2.5 text-center">
                  <p className="text-lg font-bold text-foreground font-display">{daysUntilExam}</p>
                  <p className="text-[9px] text-muted-foreground">Days Left</p>
                </div>
                <div className="bg-secondary rounded-lg p-2.5 text-center">
                  <p className="text-lg font-bold text-foreground font-display">{chaptersPerDay}</p>
                  <p className="text-[9px] text-muted-foreground">Per Day</p>
                </div>
                <div className="bg-secondary rounded-lg p-2.5 text-center">
                  <p className="text-lg font-bold text-foreground font-display">
                    {includeAssessments ? Math.floor(daysUntilExam / 7) : 0}
                  </p>
                  <p className="text-[9px] text-muted-foreground">Assessments</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Generate Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleGenerate}
            disabled={generating || !examDate}
            className="w-full gradient-primary text-primary-foreground font-display font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Smart Plan
              </>
            )}
          </motion.button>
        </>
      )}
    </div>
  );
};

export default SmartPlanGenerator;
