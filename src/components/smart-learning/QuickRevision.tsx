import { motion } from "framer-motion";
import { Zap, CheckCircle } from "lucide-react";
import type { QuickRevision as QR } from "@/types/smartLearning";

interface QuickRevisionProps {
  revision: QR;
}

const QuickRevision = ({ revision }: QuickRevisionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="font-display font-bold text-base text-foreground">{revision.title}</h3>
      </div>
      <ul className="space-y-3">
        {revision.points.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-2.5 text-sm text-card-foreground"
          >
            <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
            <span className="leading-relaxed">{point}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default QuickRevision;
