import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWeeklyTestQuestions } from "@/data/testQuestions";
import QuizEngine from "./QuizEngine";
import TestResults from "./TestResults";
import { TestQuestion, TestResult } from "@/types/testDashboard";

type WeeklyState = "intro" | "quiz" | "results";

const WeeklyTestSection = ({ onBack }: { onBack: () => void }) => {
  const [state, setState] = useState<WeeklyState>("intro");
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [results, setResults] = useState<TestResult[]>([]);

  const startTest = () => {
    const qs = getFullTestQuestions(45);
    setQuestions(qs);
    setState("quiz");
  };

  if (state === "quiz" && questions.length > 0) {
    return (
      <QuizEngine
        questions={questions}
        timeMinutes={180}
        title="Weekly Test"
        onComplete={(r) => { setResults(r); setState("results"); }}
        onBack={onBack}
      />
    );
  }

  if (state === "results") {
    return (
      <TestResults
        questions={questions}
        results={results}
        title="Weekly Test"
        onRetake={startTest}
        onBack={onBack}
        showDetailedReport
      />
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="p-2 rounded-xl bg-secondary">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h2 className="font-display font-bold text-lg text-foreground">Weekly Test</h2>
      </div>

      <div className="elevated-card rounded-2xl p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-display font-bold text-xl text-card-foreground">NEET Weekly Test</h3>
        <p className="text-sm text-muted-foreground mt-2">Full NEET pattern • 180 questions • 3 hours</p>

        <div className="grid grid-cols-2 gap-3 mt-5">
          {[
            { label: "Botany", icon: "🌿", count: 45 },
            { label: "Zoology", icon: "🦠", count: 45 },
            { label: "Physics", icon: "⚛️", count: 45 },
            { label: "Chemistry", icon: "⚗️", count: 45 },
          ].map(s => (
            <div key={s.label} className="bg-secondary rounded-xl p-3 text-center">
              <span className="text-lg">{s.icon}</span>
              <p className="text-xs font-semibold text-card-foreground mt-1">{s.label}</p>
              <p className="text-[10px] text-muted-foreground">{s.count} Qs</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 3 hours</span>
          <span>+4 / -1 marking</span>
        </div>

        <Button onClick={startTest} className="w-full mt-6 gradient-primary text-primary-foreground border-0 rounded-xl h-12 font-semibold gap-2">
          Start Weekly Test <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default WeeklyTestSection;
