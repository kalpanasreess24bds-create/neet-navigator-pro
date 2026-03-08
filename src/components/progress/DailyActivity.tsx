import { motion } from "framer-motion";
import { PlayCircle, BookOpen, FileCheck, Coffee, Clock } from "lucide-react";

const activities = [
  { time: "9:00 AM", type: "video", label: "Cell Biology - Chapter 3", duration: "25 min", icon: PlayCircle, color: "bg-primary/10 text-primary" },
  { time: "9:30 AM", type: "notes", label: "Reviewed Cell Division Notes", duration: "15 min", icon: BookOpen, color: "bg-success/10 text-success" },
  { time: "9:45 AM", type: "break", label: "Study Break", duration: "5 min", icon: Coffee, color: "bg-accent/10 text-accent" },
  { time: "10:00 AM", type: "test", label: "Cell Biology MCQ Test", duration: "20 min", icon: FileCheck, color: "bg-destructive/10 text-destructive" },
  { time: "10:30 AM", type: "video", label: "Chemical Bonding - Part 1", duration: "30 min", icon: PlayCircle, color: "bg-primary/10 text-primary" },
  { time: "11:05 AM", type: "break", label: "Study Break", duration: "5 min", icon: Coffee, color: "bg-accent/10 text-accent" },
  { time: "11:10 AM", type: "notes", label: "Ionic Bond Summary", duration: "10 min", icon: BookOpen, color: "bg-success/10 text-success" },
];

const todaySummary = [
  { label: "Videos", value: "55 min", icon: PlayCircle },
  { label: "Notes", value: "25 min", icon: BookOpen },
  { label: "Tests", value: "20 min", icon: FileCheck },
  { label: "Breaks", value: "10 min", icon: Coffee },
];

const DailyActivity = () => {
  return (
    <div className="space-y-5">
      {/* Today's Summary */}
      <div className="grid grid-cols-4 gap-2">
        {todaySummary.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="elevated-card rounded-xl p-2.5 text-center"
          >
            <item.icon className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-card-foreground">{item.value}</p>
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Total time */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="elevated-card rounded-xl p-3.5 flex items-center gap-3"
      >
        <Clock className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm font-semibold text-card-foreground">Total Active Time Today</p>
          <p className="text-xs text-muted-foreground">1 hr 50 min</p>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Today's Timeline</h3>
        <div className="space-y-1">
          {activities.map((act, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <span className="text-[10px] text-muted-foreground w-14 shrink-0">{act.time}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${act.color}`}>
                <act.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-card-foreground truncate">{act.label}</p>
                <p className="text-[10px] text-muted-foreground">{act.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DailyActivity;
