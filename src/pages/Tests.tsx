import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { sampleQuiz, type QuizQuestion } from "@/data/studyContent";

type QuizState = "intro" | "active" | "review";

interface QuizResult {
  questionId: string;
  selected: number | null;
  correct: boolean;
}

const NEET_CORRECT = 4;
const NEET_INCORRECT = -1;
const NEET_UNANSWERED = 0;
const QUIZ_TIME_SECONDS = 15 * 60;

const Tests = () => {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);

  useEffect(() => {
    if (quizState !== "active") return;
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [quizState, timeLeft]);

  const startQuiz = () => {
    setQuizState("active");
    setCurrentQ(0);
    setSelected(null);
    setResults([]);
    setTimeLeft(QUIZ_TIME_SECONDS);
  };

  const submitAnswer = () => {
    const q = sampleQuiz[currentQ];
    const result: QuizResult = {
      questionId: q.id,
      selected,
      correct: selected === q.correctAnswer,
    };
    const newResults = [...results, result];
    setResults(newResults);

    if (currentQ < sampleQuiz.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setQuizState("review");
    }
  };

  const finishQuiz = useCallback(() => {
    // Fill remaining with unanswered
    const remaining = sampleQuiz.slice(results.length).map((q) => ({
      questionId: q.id,
      selected: null,
      correct: false,
    }));
    setResults((prev) => [...prev, ...remaining]);
    setQuizState("review");
  }, [results.length]);

  const calculateScore = () => {
    let score = 0;
    results.forEach((r) => {
      if (r.selected === null) score += NEET_UNANSWERED;
      else if (r.correct) score += NEET_CORRECT;
      else score += NEET_INCORRECT;
    });
    return score;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const correctCount = results.filter((r) => r.correct).length;
  const incorrectCount = results.filter((r) => r.selected !== null && !r.correct).length;
  const unanswered = results.filter((r) => r.selected === null).length;

  // Subject-wise analysis
  const subjectAnalysis = () => {
    const subjects: Record<string, { correct: number; total: number }> = {};
    results.forEach((r, i) => {
      const q = sampleQuiz[i];
      if (!subjects[q.subject]) subjects[q.subject] = { correct: 0, total: 0 };
      subjects[q.subject].total++;
      if (r.correct) subjects[q.subject].correct++;
    });
    return subjects;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-xl font-bold font-display text-foreground">Assessment</h1>
      </div>

      <div className="px-5">
        <AnimatePresence mode="wait">
          {/* Intro */}
          {quizState === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="elevated-card rounded-2xl p-6 text-center"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display font-bold text-xl text-card-foreground">NEET Mock Test</h2>
              <p className="text-sm text-muted-foreground mt-2">
                {sampleQuiz.length} MCQs • 15 minutes • NEET pattern
              </p>
              <div className="grid grid-cols-3 gap-3 mt-5 text-center">
                <div className="bg-secondary rounded-xl p-3">
                  <p className="text-lg font-bold text-success">+{NEET_CORRECT}</p>
                  <p className="text-[10px] text-muted-foreground">Correct</p>
                </div>
                <div className="bg-secondary rounded-xl p-3">
                  <p className="text-lg font-bold text-destructive">{NEET_INCORRECT}</p>
                  <p className="text-[10px] text-muted-foreground">Wrong</p>
                </div>
                <div className="bg-secondary rounded-xl p-3">
                  <p className="text-lg font-bold text-muted-foreground">{NEET_UNANSWERED}</p>
                  <p className="text-[10px] text-muted-foreground">Skipped</p>
                </div>
              </div>
              <Button
                onClick={startQuiz}
                className="w-full mt-6 gradient-primary text-primary-foreground border-0 rounded-xl h-12 font-semibold gap-2"
              >
                Start Test <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Active Quiz */}
          {quizState === "active" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Timer + Progress */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${timeLeft < 60 ? "text-destructive" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-mono font-bold ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {currentQ + 1}/{sampleQuiz.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-muted rounded-full mb-5 overflow-hidden">
                <motion.div
                  className="h-full gradient-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQ + 1) / sampleQuiz.length) * 100}%` }}
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
                      {sampleQuiz[currentQ].subject} • {sampleQuiz[currentQ].chapter}
                    </span>
                    <p className="font-semibold text-card-foreground mt-2 leading-relaxed">
                      {sampleQuiz[currentQ].question}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {sampleQuiz[currentQ].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-sm ${
                          selected === i
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border bg-card text-card-foreground hover:border-primary/30"
                        }`}
                      >
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-xs font-bold mr-3">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-5">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelected(null);
                        submitAnswer();
                      }}
                      className="flex-1 rounded-xl h-12 border-border"
                    >
                      Skip
                    </Button>
                    <Button
                      onClick={submitAnswer}
                      disabled={selected === null}
                      className="flex-1 gradient-primary text-primary-foreground border-0 rounded-xl h-12 font-semibold"
                    >
                      {currentQ === sampleQuiz.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* Review */}
          {quizState === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Score Card */}
              <div className="elevated-card rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-4xl font-bold font-display text-foreground">
                  {calculateScore()}/{sampleQuiz.length * NEET_CORRECT}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Total Score (NEET Pattern)</p>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-secondary rounded-xl p-3">
                    <CheckCircle2 className="w-4 h-4 text-success mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{correctCount}</p>
                    <p className="text-[10px] text-muted-foreground">Correct</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-3">
                    <XCircle className="w-4 h-4 text-destructive mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{incorrectCount}</p>
                    <p className="text-[10px] text-muted-foreground">Wrong</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-3">
                    <Clock className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{unanswered}</p>
                    <p className="text-[10px] text-muted-foreground">Skipped</p>
                  </div>
                </div>
              </div>

              {/* Subject Analysis */}
              <div className="elevated-card rounded-2xl p-5">
                <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Subject Analysis</h3>
                {Object.entries(subjectAnalysis()).map(([subj, data]) => (
                  <div key={subj} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm text-card-foreground font-medium">{subj}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-primary rounded-full"
                          style={{ width: `${(data.correct / data.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {data.correct}/{data.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Question Review */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm text-foreground">Question Review</h3>
                {results.map((r, i) => {
                  const q = sampleQuiz[i];
                  return (
                    <div key={q.id} className="elevated-card rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        {r.correct ? (
                          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{q.question}</p>
                          <p className="text-xs text-success mt-1">
                            Correct: {String.fromCharCode(65 + q.correctAnswer)}) {q.options[q.correctAnswer]}
                          </p>
                          {r.selected !== null && !r.correct && (
                            <p className="text-xs text-destructive">
                              Your answer: {String.fromCharCode(65 + r.selected)}) {q.options[r.selected]}
                            </p>
                          )}
                          {r.selected === null && (
                            <p className="text-xs text-muted-foreground">Unanswered</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1 italic">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={startQuiz}
                className="w-full gradient-primary text-primary-foreground border-0 rounded-xl h-12 font-semibold gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Retake Test
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};

export default Tests;
