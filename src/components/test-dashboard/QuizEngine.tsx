import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestQuestion, TestResult } from "@/types/testDashboard";

interface QuizEngineProps {
  questions: TestQuestion[];
  timeMinutes: number;
  title: string;
  onComplete: (results: TestResult[]) => void;
  onBack: () => void;
  instantFeedback?: boolean; // For worksheets
}

const NEET_CORRECT = 4;
const NEET_INCORRECT = -1;

const QuizEngine = ({ questions, timeMinutes, title, onComplete, onBack, instantFeedback = false }: QuizEngineProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeMinutes * 60);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  useEffect(() => {
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const finishQuiz = useCallback(() => {
    const remaining = questions.slice(results.length).map(q => ({
      questionId: q.id,
      selected: null,
      correct: false,
      timeTaken: 0,
    }));
    const finalResults = [...results, ...remaining];
    onComplete(finalResults);
  }, [results, questions, onComplete]);

  const submitAnswer = () => {
    const q = questions[currentQ];
    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    const result: TestResult = {
      questionId: q.id,
      selected,
      correct: selected === q.correctAnswer,
      timeTaken,
    };

    if (instantFeedback && selected !== null) {
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        proceedToNext(result);
      }, 1500);
    } else {
      proceedToNext(result);
    }
  };

  const proceedToNext = (result: TestResult) => {
    const newResults = [...results, result];
    setResults(newResults);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setQuestionStartTime(Date.now());
    } else {
      onComplete(newResults);
    }
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const q = questions[currentQ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 rounded-xl bg-secondary hover:bg-secondary/80">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{title}</p>
          <p className="text-xs text-muted-foreground">{currentQ + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary rounded-xl px-3 py-1.5">
          <Clock className={`w-3.5 h-3.5 ${timeLeft < 60 ? "text-destructive" : "text-muted-foreground"}`} />
          <span className={`text-sm font-mono font-bold ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-muted rounded-full mb-5 overflow-hidden">
        <motion.div
          className="h-full gradient-primary rounded-full"
          animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          <div className="elevated-card rounded-2xl p-5 mb-4">
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
              {q.subject} • {q.chapter}
            </span>
            <p className="font-semibold text-card-foreground mt-2 leading-relaxed">{q.question}</p>
          </div>

          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              let borderClass = "border-border bg-card text-card-foreground hover:border-primary/30";
              if (showFeedback && instantFeedback) {
                if (i === q.correctAnswer) borderClass = "border-green-500 bg-green-50 dark:bg-green-950 text-foreground";
                else if (i === selected && i !== q.correctAnswer) borderClass = "border-destructive bg-red-50 dark:bg-red-950 text-foreground";
              } else if (selected === i) {
                borderClass = "border-primary bg-primary/5 text-foreground";
              }

              return (
                <button
                  key={i}
                  onClick={() => !showFeedback && setSelected(i)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-sm ${borderClass}`}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-xs font-bold mr-3">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                  {showFeedback && i === q.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-green-500 inline ml-2" />
                  )}
                  {showFeedback && i === selected && i !== q.correctAnswer && (
                    <XCircle className="w-4 h-4 text-destructive inline ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {showFeedback && instantFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-secondary text-sm text-muted-foreground"
            >
              {q.explanation}
            </motion.div>
          )}

          {!showFeedback && (
            <div className="flex gap-3 mt-5">
              <Button
                variant="outline"
                onClick={() => { setSelected(null); submitAnswer(); }}
                className="flex-1 rounded-xl h-12 border-border"
              >
                Skip
              </Button>
              <Button
                onClick={submitAnswer}
                disabled={selected === null}
                className="flex-1 gradient-primary text-primary-foreground border-0 rounded-xl h-12 font-semibold"
              >
                {currentQ === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizEngine;
