import { motion } from "framer-motion";
import { Clock, PlayCircle, FileCheck, Target, BookOpen } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Study Time", value: "12.5 hrs", icon: Clock, color: "hsl(243 75% 55%)" },
  { label: "Videos Watched", value: "18", icon: PlayCircle, color: "hsl(152 60% 45%)" },
  { label: "Tests Done", value: "7", icon: FileCheck, color: "hsl(38 92% 55%)" },
  { label: "Avg Score", value: "76%", icon: Target, color: "hsl(0 72% 55%)" },
  { label: "Topics Covered", value: "14", icon: BookOpen, color: "hsl(263 70% 60%)" },
];

const pieData = [
  { name: "Biology", value: 42, color: "hsl(152 60% 45%)" },
  { name: "Chemistry", value: 33, color: "hsl(243 75% 55%)" },
  { name: "Physics", value: 25, color: "hsl(38 92% 55%)" },
];

const subjectProgress = [
  { name: "Biology", progress: 65, color: "bg-success" },
  { name: "Chemistry", progress: 45, color: "bg-primary" },
  { name: "Physics", progress: 55, color: "bg-accent" },
];

const ProgressOverview = () => {
  return (
    <div className="space-y-5">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.slice(0, 4).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="elevated-card rounded-xl p-3.5"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-lg font-bold text-card-foreground font-display">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Study Distribution Pie */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="elevated-card rounded-xl p-4"
      >
        <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Study Distribution</h3>
        <div className="flex items-center gap-4">
          <div className="w-28 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={28} outerRadius={50} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground flex-1">{item.name}</span>
                <span className="text-xs font-semibold text-card-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Subject Progress Bars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="elevated-card rounded-xl p-4"
      >
        <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Subject Progress</h3>
        <div className="space-y-3">
          {subjectProgress.map((subj) => (
            <div key={subj.name}>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">{subj.name}</span>
                <span className="text-xs font-semibold text-card-foreground">{subj.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subj.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`h-full rounded-full ${subj.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressOverview;
