import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, Calendar, CalendarDays, Shield, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ProgressOverview from "@/components/progress/ProgressOverview";
import WeeklyReport from "@/components/progress/WeeklyReport";
import MonthlyReport from "@/components/progress/MonthlyReport";
import ParentView from "@/components/progress/ParentView";
import DailyActivity from "@/components/progress/DailyActivity";

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "weekly", label: "Weekly", icon: Calendar },
  { id: "monthly", label: "Monthly", icon: CalendarDays },
  { id: "daily", label: "Daily", icon: Activity },
  { id: "parent", label: "Parent", icon: Shield },
] as const;

type TabId = typeof tabs[number]["id"];

const ProgressDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-hero px-5 pt-12 pb-6 rounded-b-3xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground font-display">Progress Dashboard</h1>
            <p className="text-xs text-primary-foreground/60">Track your learning journey</p>
          </div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="px-5 mt-4">
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 mt-4">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === "overview" && <ProgressOverview />}
          {activeTab === "weekly" && <WeeklyReport />}
          {activeTab === "monthly" && <MonthlyReport />}
          {activeTab === "daily" && <DailyActivity />}
          {activeTab === "parent" && <ParentView />}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProgressDashboard;
