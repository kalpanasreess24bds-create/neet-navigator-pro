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

  // Pick the right store based on mode
  const store = planMode === "smart-plan" ? planner.smart : planner.manual;

  const dailyChapters = store.getChaptersForDate(planner.selectedDate);
  const dailyProgress = planner.getProgress(dailyChapters);

  const handleSmartGenerate = async (
    plans: { date: Date; chapters: PlannedChapter[] }[]
  ) => {
    // Clear old smart plan before generating new one
    await planner.smart.clearAllPlans();
    for (const plan of plans) {
      for (const ch of plan.chapters) {
        await planner.smart.addChapterToDate(plan.date, ch);
      }
    }
    // Stay on smart-plan mode and switch to daily view
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

      {planMode === "smart-plan" && Object.keys(planner.smart.plans).length === 0 ? (
        <motion.div
          key="smart-generator"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SmartPlanGenerator
            onGenerate={handleSmartGenerate}
            existingPlanDates={Object.keys(planner.smart.plans)}
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

          {/* Regenerate button for smart plan */}
          {planMode === "smart-plan" && (
            <SmartPlanGenerator
              onGenerate={handleSmartGenerate}
              existingPlanDates={Object.keys(planner.smart.plans)}
            />
          )}

          {/* Content */}
          <motion.div
            key={`${planMode}-${activeTab}`}
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
                onAdd={(ch) => store.addChapterToDate(planner.selectedDate, ch)}
                onRemove={(id) => store.removeChapterFromDate(planner.selectedDate, id)}
                onToggle={(id) => store.toggleComplete(planner.selectedDate, id)}
                onTimeSlot={(id, slot) => store.updateTimeSlot(planner.selectedDate, id, slot)}
              />
            )}
            {activeTab === "weekly" && (
              <WeeklyPlanner
                weekRef={planner.selectedDate}
                onWeekChange={planner.setSelectedDate}
                getChaptersForDate={store.getChaptersForDate}
                getProgress={planner.getProgress}
                onAdd={(d, ch) => store.addChapterToDate(d, ch)}
                onToggle={(d, id) => store.toggleComplete(d, id)}
                onMoveToNext={(d, id) => store.moveToNextDay(d, id)}
              />
            )}
            {activeTab === "monthly" && (
              <MonthlyPlanner
                monthRef={planner.selectedDate}
                onMonthChange={planner.setSelectedDate}
                getChaptersForDate={store.getChaptersForDate}
                getProgress={planner.getProgress}
                onAdd={(d, ch) => store.addChapterToDate(d, ch)}
                onToggle={(d, id) => store.toggleComplete(d, id)}
              />
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default StudyPlannerSection;
