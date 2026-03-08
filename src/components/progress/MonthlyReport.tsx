import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, BookOpen, FileCheck, Award, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const weeklyTrend = [
  { week: "W1", hours: 14 },
  { week: "W2", hours: 18 },
  { week: "W3", hours: 16 },
  { week: "W4", hours: 20 },
];

const monthlyStats = [
  { label: "Total Study Hours", value: "68 hrs", icon: Clock, trend: "+12%" },
  { label: "Lessons Completed", value: "42", icon: BookOpen, trend: "+8" },
  { label: "Tests Taken", value: "18", icon: FileCheck, trend: "+5" },
  { label: "Score Improvement", value: "+15%", icon: Award, trend: "↑" },
];

const insights = [
  { text: "Your study consistency improved by 20% this month! 🎯", positive: true },
  { text: "Biology is your strongest subject with 82% avg score.", positive: true },
  { text: "Physics needs more attention — try 30 min extra daily.", positive: false },
  { text: "You completed 3 more tests than last month! 🏆", positive: true },
];

const topicStrength = [
  { topic: "Cell Biology", strength: 88, strong: true },
  { topic: "Organic Chemistry", strength: 72, strong: true },
  { topic: "Mechanics", strength: 45, strong: false },
  { topic: "Human Physiology", strength: 80, strong: true },
  { topic: "Thermodynamics", strength: 38, strong: false },
];

const MonthlyReport = () => {
  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground mb-1">
        📅 March 2026 Report
      </motion.div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 gap-3">
        {monthlyStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="elevated-card rounded-xl p-3.5"
          >
            <stat.icon className="w-4 h-4 text-primary mb-1.5" />
            <p className="text-lg font-bold text-card-foreground font-display">{stat.value}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <span className="text-[10px] font-semibold text-success">{stat.trend}</span>
          </motion.div>
        ))}
      </div>

      {/* Weekly Trend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="elevated-card rounded-xl p-4"
      >
        <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Weekly Trend</h3>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyTrend} barSize={32}>
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="hours" fill="hsl(152 60% 45%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Topic Strength */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="elevated-card rounded-xl p-4"
      >
        <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Topic Strength</h3>
        <div className="space-y-2.5">
          {topicStrength.map((t) => (
            <div key={t.topic}>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  {t.strong ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  {t.topic}
                </span>
                <span className="text-xs font-semibold text-card-foreground">{t.strength}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.strength}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full rounded-full ${t.strong ? "bg-success" : "bg-destructive"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="elevated-card rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-accent" />
          <h3 className="font-display font-bold text-sm text-card-foreground">AI Insights</h3>
        </div>
        <div className="space-y-2">
          {insights.map((insight, i) => (
            <div key={i} className={`text-xs p-2.5 rounded-lg ${insight.positive ? "bg-success/10 text-success" : "bg-accent/10 text-accent-foreground"}`}>
              {insight.text}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MonthlyReport;
