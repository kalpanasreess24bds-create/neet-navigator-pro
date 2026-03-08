import { motion } from "framer-motion";
import { BookOpen, FileText, Zap, Award, ArrowRight } from "lucide-react";
import { TestCategory } from "@/types/testDashboard";

interface TestDashboardHomeProps {
  onSelect: (category: TestCategory) => void;
}

const categories = [
  {
    id: "mock" as TestCategory,
    title: "Mock Test",
    description: "Chapter-wise • 50 MCQs • 60 min",
    icon: BookOpen,
    gradient: "from-primary to-primary/70",
    badge: "Chapter-wise",
  },
  {
    id: "worksheet" as TestCategory,
    title: "Worksheet",
    description: "25 MCQs • Instant feedback",
    icon: FileText,
    gradient: "from-accent to-accent/70",
    badge: "Practice",
  },
  {
    id: "weekly" as TestCategory,
    title: "Weekly Test",
    description: "180 Qs • NEET pattern • 3 hrs",
    icon: Zap,
    gradient: "from-orange-500 to-amber-500",
    badge: "Full Test",
  },
  {
    id: "monthly" as TestCategory,
    title: "Monthly Test",
    description: "180 Qs • Detailed report • 3 hrs",
    icon: Award,
    gradient: "from-purple-500 to-pink-500",
    badge: "Full NEET",
  },
];

const TestDashboardHome = ({ onSelect }: TestDashboardHomeProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-5">
        <h1 className="text-xl font-bold font-display text-foreground">Test Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Practice & assess your NEET preparation</p>
      </div>

      {/* Subject overview */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { icon: "🌿", label: "Botany" },
          { icon: "🦠", label: "Zoology" },
          { icon: "⚛️", label: "Physics" },
          { icon: "⚗️", label: "Chemistry" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-secondary rounded-xl p-2.5 text-center"
          >
            <span className="text-lg">{s.icon}</span>
            <p className="text-[10px] font-medium text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Test categories */}
      <div className="space-y-3">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            onClick={() => onSelect(cat.id)}
            className="w-full elevated-card rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform text-left"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shrink-0`}>
              <cat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-card-foreground">{cat.title}</p>
                <span className="text-[9px] bg-primary/10 text-primary font-semibold px-1.5 py-0.5 rounded-full">
                  {cat.badge}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TestDashboardHome;
