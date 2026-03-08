import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Play } from "lucide-react";
import { TEST_SUBJECTS } from "@/types/testDashboard";
import { getChaptersWithQuestions, getMockTestQuestions } from "@/data/testQuestions";
import QuizEngine from "./QuizEngine";
import TestResults from "./TestResults";
import { TestQuestion, TestResult } from "@/types/testDashboard";

type MockState = "subjects" | "chapters" | "quiz" | "results";

const MockTestSection = ({ onBack }: { onBack: () => void }) => {
  const [state, setState] = useState<MockState>("subjects");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [results, setResults] = useState<TestResult[]>([]);

  const startMockTest = (chapter: string) => {
    setSelectedChapter(chapter);
    const qs = getMockTestQuestions(chapter, 50);
    setQuestions(qs);
    setState("quiz");
  };

  const handleComplete = (r: TestResult[]) => {
    setResults(r);
    setState("results");
  };

  if (state === "quiz" && questions.length > 0) {
    return (
      <QuizEngine
        questions={questions}
        timeMinutes={60}
        title={`Mock Test: ${selectedChapter}`}
        onComplete={handleComplete}
        onBack={() => setState("chapters")}
      />
    );
  }

  if (state === "results") {
    return (
      <TestResults
        questions={questions}
        results={results}
        title={`Mock Test: ${selectedChapter}`}
        onRetake={() => startMockTest(selectedChapter)}
        onBack={() => setState("chapters")}
      />
    );
  }

  if (state === "chapters") {
    const chapters = getChaptersWithQuestions(selectedSubject);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => setState("subjects")} className="p-2 rounded-xl bg-secondary">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h2 className="font-display font-bold text-lg text-foreground">{selectedSubject} - Chapters</h2>
        </div>
        <div className="space-y-2.5">
          {chapters.map((ch, i) => (
            <motion.button
              key={ch.chapter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => startMockTest(ch.chapter)}
              className="w-full elevated-card rounded-xl p-4 flex items-center gap-3 text-left hover:scale-[1.01] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground truncate">{ch.chapter}</p>
                <p className="text-xs text-muted-foreground">{ch.count} questions available • 50 MCQs</p>
              </div>
              <Play className="w-4 h-4 text-primary shrink-0" />
            </motion.button>
          ))}
          {chapters.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No questions available for this subject yet.</p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="p-2 rounded-xl bg-secondary">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div>
          <h2 className="font-display font-bold text-lg text-foreground">Mock Test</h2>
          <p className="text-xs text-muted-foreground">Chapter-wise • 50 MCQs • 60 minutes</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {TEST_SUBJECTS.map((subj, i) => (
          <motion.button
            key={subj.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => { setSelectedSubject(subj.name); setState("chapters"); }}
            className="elevated-card rounded-2xl p-5 text-center hover:scale-[1.02] transition-transform"
          >
            <span className="text-3xl">{subj.icon}</span>
            <p className="text-sm font-semibold text-card-foreground mt-2">{subj.name}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MockTestSection;
