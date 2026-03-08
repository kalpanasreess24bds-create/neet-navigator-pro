import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, CalendarRange, Calendar, Sparkles, PenLine } from "lucide-react";
import { useStudyPlanner } from "@/hooks/useStudyPlanner";
import DailyPlanner from "./DailyPlanner";
import WeeklyPlanner from "./WeeklyPlanner";
import MonthlyPlanner from "./MonthlyPlanner";
import SmartPlanGenerator from "./SmartPlanGenerator";
import type { PlannedChapter } from "@/types/studyPlanner";

type PlannerTab = "daily" | "weekly" | "monthly";
type PlanMode = "my-plan" | "smart-plan";

const tabs: { id: PlannerTab; label: string; icon: React.ReactNode }[] = [
  { id: "daily", label: "Daily", icon: <CalendarDays className="w-3.5 h-3.5" /> },
  { id: "weekly", label: "Weekly", icon: <CalendarRange className="w-3.5 h-3.5" /> },
  { id: "monthly", label: "Monthly", icon: <Calendar className="w-3.5 h-3.5" /> },
];

const StudyPlannerSection = () => {
  const [activeTab, setActiveTab] = useState<PlannerTab>("daily");
  const [planMode, setPlanMode] = useState<PlanMode>("my-plan");
  const planner = useStudyPlanner();

  const dailyChapters = planner.getChaptersForDate(planner.selectedDate);
  const dailyProgress = planner.getProgress(dailyChapters);

  const handleSmartGenerate = async (
    plans: { date: Date; chapters: PlannedChapter[] }[]
  ) => {
    for (const plan of plans) {
      for (const ch of plan.chapters) {
        await planner.addChapterToDate(plan.date, ch);
      }
    }
    // Auto-switch to My Plan daily view after generation
    setPlanMode("my-plan");
    setActiveTab("daily");
  };

  return (
    <div className="space-y-4">
      {/* Plan Mode Toggle */}
      <div className="flex gap-1 p-1 bg-secondary rounded-xl">
        <button
          onClick={() => setPlanMode("my-plan")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
            planMode === "my-plan"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <PenLine className="w-3.5 h-3.5" /> My Plan
        </button>
        <button
          onClick={() => setPlanMode("smart-plan")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
            planMode === "smart-plan"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Smart Plan
        </button>
      </div>

      {planMode === "smart-plan" ? (
        <motion.div
          key="smart"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SmartPlanGenerator
            onGenerate={handleSmartGenerate}
            existingPlanDates={Object.keys(planner.plans)}
          />
        </motion.div>
      ) : (
        <>
          {/* Tab Selector */}
          <div className="flex gap-1 p-1 bg-secondary rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "daily" && (
              <DailyPlanner
                date={planner.selectedDate}
                chapters={dailyChapters}
                progress={dailyProgress}
                onDateChange={planner.setSelectedDate}
                onAdd={(ch) => planner.addChapterToDate(planner.selectedDate, ch)}
                onRemove={(id) => planner.removeChapterFromDate(planner.selectedDate, id)}
                onToggle={(id) => planner.toggleComplete(planner.selectedDate, id)}
                onTimeSlot={(id, slot) => planner.updateTimeSlot(planner.selectedDate, id, slot)}
              />
            )}
            {activeTab === "weekly" && (
              <WeeklyPlanner
                weekRef={planner.selectedDate}
                onWeekChange={planner.setSelectedDate}
                getChaptersForDate={planner.getChaptersForDate}
                getProgress={planner.getProgress}
                onAdd={(d, ch) => planner.addChapterToDate(d, ch)}
                onToggle={(d, id) => planner.toggleComplete(d, id)}
                onMoveToNext={(d, id) => planner.moveToNextDay(d, id)}
              />
            )}
            {activeTab === "monthly" && (
              <MonthlyPlanner
                monthRef={planner.selectedDate}
                onMonthChange={planner.setSelectedDate}
                getChaptersForDate={planner.getChaptersForDate}
                getProgress={planner.getProgress}
                onAdd={(d, ch) => planner.addChapterToDate(d, ch)}
                onToggle={(d, id) => planner.toggleComplete(d, id)}
              />
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default StudyPlannerSection;
