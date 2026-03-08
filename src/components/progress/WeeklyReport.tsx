import { motion } from "framer-motion";
import { Calendar, Clock, PlayCircle, FileCheck, Trophy, BookOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const dailyHours = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.0 },
  { day: "Thu", hours: 2.2 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 2.0 },
];

const subjectDistribution = [
  { name: "Biology", value: 40, color: "hsl(152 60% 45%)" },
  { name: "Chemistry", value: 35, color: "hsl(243 75% 55%)" },
  { name: "Physics", value: 25, color: "hsl(38 92% 55%)" },
];

const weeklyStats = [
  { label: "Total Hours", value: "16.5 hrs", icon: Clock },
  { label: "Videos Watched", value: "12", icon: PlayCircle },
  { label: "Tests Taken", value: "5", icon: FileCheck },
  { label: "Avg Score", value: "78%", icon: Trophy },
  { label: "Most Studied", value: "Biology", icon: BookOpen },
];

const WeeklyReport = () => {
  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-1">
        <Calendar className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground">Mar 1 – Mar 7, 2026</span>
      </motion.div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 gap-3">
        {weeklyStats.slice(0, 4).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="elevated-card rounded-xl p-3.5"
          >
            <stat.icon className="w-4 h-4 text-primary mb-1.5" />
            <p className="text-lg font-bold text-card-foreground font-display">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Most Studied Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="elevated-card rounded-xl p-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-success" />
        </div>
        <div>
          <p className="text-sm font-semibold text-card-foreground">Most Studied: Biology</p>
          <p className="text-xs text-muted-foreground">6.6 hours this week</p>
        </div>
      </motion.div>

      {/* Daily Study Hours Bar Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="elevated-card rounded-xl p-4"
      >
        <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Daily Study Hours</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyHours} barSize={24}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="hours" fill="hsl(243 75% 55%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Subject Distribution Pie */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="elevated-card rounded-xl p-4"
      >
        <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Subject Distribution</h3>
        <div className="flex items-center gap-4">
          <div className="w-28 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={subjectDistribution} cx="50%" cy="50%" innerRadius={28} outerRadius={50} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {subjectDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground flex-1">{item.name}</span>
                <span className="text-xs font-semibold text-card-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeeklyReport;
