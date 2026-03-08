import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { anxietyTips } from "@/data/studentCornerData";

const StressSupport = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <Shield className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-bold text-foreground">Managing Exam Stress</h3>
      </div>

      <p className="text-[10px] text-muted-foreground">
        It's completely normal to feel stressed. Here are quick techniques to help you feel better 💚
      </p>

      <div className="space-y-2">
        {anxietyTips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl p-3 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border border-teal-200/50 dark:border-teal-800/30"
          >
            <p className="text-xs font-bold text-teal-800 dark:text-teal-200 mb-1">{tip.title}</p>
            <p className="text-[10px] text-teal-600 dark:text-teal-400 leading-relaxed">{tip.tip}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StressSupport;
