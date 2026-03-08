import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Calendar, Clock, PlayCircle, FileCheck, Trophy, Download, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const dailyActivity = [
  { day: "Mon", videos: 1.5, notes: 0.5, tests: 0.5 },
  { day: "Tue", videos: 1.0, notes: 0.3, tests: 0.5 },
  { day: "Wed", videos: 2.0, notes: 0.5, tests: 0.5 },
  { day: "Thu", videos: 1.5, notes: 0.2, tests: 0.5 },
  { day: "Fri", videos: 0.5, notes: 0.5, tests: 0.5 },
  { day: "Sat", videos: 2.5, notes: 0.5, tests: 0.5 },
  { day: "Sun", videos: 1.0, notes: 0.5, tests: 0.5 },
];

const subjectPie = [
  { name: "Biology", value: 42, color: "hsl(152 60% 45%)" },
  { name: "Chemistry", value: 33, color: "hsl(243 75% 55%)" },
  { name: "Physics", value: 25, color: "hsl(38 92% 55%)" },
];

const ParentView = () => {
  const [tab, setTab] = useState<"weekly" | "monthly">("weekly");

  const handleDownload = () => {
    const reportContent = `
STUDENT PROGRESS REPORT
=======================
${tab === "weekly" ? "Weekly Report: Mar 1-7, 2026" : "Monthly Report: March 2026"}

Study Summary:
- Total Study Hours: ${tab === "weekly" ? "16.5" : "68"} hours
- Videos Watched: ${tab === "weekly" ? "12" : "42"}
- Tests Completed: ${tab === "weekly" ? "5" : "18"}
- Average Score: ${tab === "weekly" ? "78%" : "76%"}

Subject Distribution:
- Biology: 42%
- Chemistry: 33%
- Physics: 25%

Key Observations:
- Study consistency improved by 20%
- Biology is the strongest subject (82% avg)
- Physics needs additional practice

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `student-report-${tab}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Parent Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="elevated-card rounded-xl p-4 flex items-center gap-3 border-l-4 border-primary"
      >
        <Shield className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm font-semibold text-card-foreground">Parent Access</p>
          <p className="text-xs text-muted-foreground">View your child's learning progress</p>
        </div>
      </motion.div>

      {/* Tab Toggle */}
      <div className="flex gap-2 bg-muted rounded-xl p-1">
        {(["weekly", "monthly"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === t ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t === "weekly" ? "Weekly" : "Monthly"}
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Study Hours", value: tab === "weekly" ? "16.5 hrs" : "68 hrs", icon: Clock },
          { label: "Videos", value: tab === "weekly" ? "12" : "42", icon: PlayCircle },
          { label: "Tests", value: tab === "weekly" ? "5" : "18", icon: FileCheck },
          { label: "Avg Score", value: tab === "weekly" ? "78%" : "76%", icon: Trophy },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="elevated-card rounded-xl p-3.5"
          >
            <stat.icon className="w-4 h-4 text-primary mb-1" />
            <p className="text-lg font-bold text-card-foreground font-display">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Daily Activity Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="elevated-card rounded-xl p-4"
      >
        <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Daily Activity</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyActivity} barSize={16}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="videos" stackId="a" fill="hsl(243 75% 55%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="notes" stackId="a" fill="hsl(152 60% 45%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="tests" stackId="a" fill="hsl(38 92% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {[
            { label: "Videos", color: "bg-primary" },
            { label: "Notes", color: "bg-success" },
            { label: "Tests", color: "bg-accent" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${l.color}`} />
              <span className="text-[10px] text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Subject Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="elevated-card rounded-xl p-4"
      >
        <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Subject Breakdown</h3>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={subjectPie} cx="50%" cy="50%" innerRadius={24} outerRadius={44} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                  {subjectPie.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {subjectPie.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground flex-1">{item.name}</span>
                <span className="text-xs font-semibold text-card-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Download Report */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={handleDownload}
        className="w-full elevated-card rounded-xl p-4 flex items-center gap-3 hover:scale-[1.01] transition-transform"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-card-foreground">Download Report</p>
          <p className="text-xs text-muted-foreground">Save {tab} report as file</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </motion.button>
    </div>
  );
};

export default ParentView;
