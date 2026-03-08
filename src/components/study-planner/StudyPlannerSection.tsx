import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, CalendarRange, Calendar } from "lucide-react";
import { useStudyPlanner } from "@/hooks/useStudyPlanner";
import DailyPlanner from "./DailyPlanner";
import WeeklyPlanner from "./WeeklyPlanner";
import MonthlyPlanner from "./MonthlyPlanner";

type PlannerTab = "daily" | "weekly" | "monthly";

const tabs: { id: PlannerTab; label: string; icon: React.ReactNode }[] = [
  { id: "daily", label: "Daily", icon: <CalendarDays className="w-3.5 h-3.5" /> },
  { id: "weekly", label: "Weekly", icon: <CalendarRange className="w-3.5 h-3.5" /> },
  { id: "monthly", label: "Monthly", icon: <Calendar className="w-3.5 h-3.5" /> },
];

const StudyPlannerSection = () => {
  const [activeTab, setActiveTab] = useState<PlannerTab>("daily");
  const planner = useStudyPlanner();

  const dailyChapters = planner.getChaptersForDate(planner.selectedDate);
  const dailyProgress = planner.getProgress(dailyChapters);

  return (
    <div className="space-y-4">
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
          />
        )}
      </motion.div>
    </div>
  );
};

export default StudyPlannerSection;
