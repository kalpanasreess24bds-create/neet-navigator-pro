import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Play } from "lucide-react";

interface BreakReminderProps {
  show: boolean;
  onResume: () => void;
}

const BreakReminder = ({ show, onResume }: BreakReminderProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-card border border-border shadow-lg rounded-2xl px-6 py-4 flex items-center gap-4 max-w-sm">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Coffee className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-sm text-card-foreground">
                Take a 2 minute break ☕
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                You've been studying for 15+ minutes!
              </p>
            </div>
            <button
              onClick={onResume}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BreakReminder;
