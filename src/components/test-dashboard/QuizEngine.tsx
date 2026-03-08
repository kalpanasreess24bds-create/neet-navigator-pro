import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowLeft, CheckCircle2, XCircle, Flag, Grid3X3, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestQuestion, TestResult } from "@/types/testDashboard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface QuizEngineProps {
  questions: TestQuestion[];
  timeMinutes: number;
  title: string;
  onComplete: (results: TestResult[]) => void;
  onBack: () => void;
  instantFeedback?: boolean;
}

const NEET_CORRECT = 4;
const NEET_INCORRECT = -1;

type QuestionStatus = "not-visited" | "not-answered" | "answered" | "marked" | "marked-answered";

const QuizEngine = ({ questions, timeMinutes, title, onComplete, onBack, instantFeedback = false }: QuizEngineProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [statuses, setStatuses] = useState<QuestionStatus[]>(
    () => {
      const arr: QuestionStatus[] = new Array(questions.length).fill("not-visited");
      arr[0] = "not-answered"; // First question is visited
      return arr;
    }
  );
  const [timeLeft, setTimeLeft] = useState(timeMinutes * 60);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeTaken, setTimeTaken] = useState<number[]>(() => new Array(questions.length).fill(0));
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const recordTime = () => {
    const elapsed = Math.round((Date.now() - questionStartTime) / 1000);
    setTimeTaken(prev => {
      const copy = [...prev];
      copy[currentQ] += elapsed;
      return copy;
    });
  };

  const finishQuiz = useCallback(() => {
    const finalResults: TestResult[] = questions.map((q, i) => ({
      questionId: q.id,
      selected: selectedOptions[i],
      correct: selectedOptions[i] === q.correctAnswer,
      timeTaken: timeTaken[i],
    }));
    onComplete(finalResults);
  }, [selectedOptions, timeTaken, questions, onComplete]);

  const navigateToQuestion = (index: number) => {
    recordTime();
    // Update status of current question before leaving
    updateCurrentStatus();
    setCurrentQ(index);
    setQuestionStartTime(Date.now());
    setShowPalette(false);
    // Mark new question as visited if not-visited
    setStatuses(prev => {
      const copy = [...prev];
      if (copy[index] === "not-visited") copy[index] = "not-answered";
      return copy;
    });
  };

  const updateCurrentStatus = () => {
    setStatuses(prev => {
      const copy = [...prev];
      const hasAnswer = selectedOptions[currentQ] !== null;
      const isMarked = copy[currentQ] === "marked" || copy[currentQ] === "marked-answered";
      if (isMarked) {
        copy[currentQ] = hasAnswer ? "marked-answered" : "marked";
      } else {
        copy[currentQ] = hasAnswer ? "answered" : "not-answered";
      }
      return copy;
    });
  };

  const handleOptionSelect = (optIndex: number) => {
    if (showFeedback) return;
    setSelectedOptions(prev => {
      const copy = [...prev];
      copy[currentQ] = optIndex;
      return copy;
    });
  };

  const handleClearResponse = () => {
    setSelectedOptions(prev => {
      const copy = [...prev];
      copy[currentQ] = null;
      return copy;
    });
  };

  const handleMarkForReview = () => {
    setStatuses(prev => {
      const copy = [...prev];
      const hasAnswer = selectedOptions[currentQ] !== null;
      const isMarked = copy[currentQ] === "marked" || copy[currentQ] === "marked-answered";
      if (isMarked) {
        copy[currentQ] = hasAnswer ? "answered" : "not-answered";
      } else {
        copy[currentQ] = hasAnswer ? "marked-answered" : "marked";
      }
      return copy;
    });
  };

  const handleSaveNext = () => {
    if (instantFeedback && selectedOptions[currentQ] !== null) {
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        goNext();
      }, 1500);
    } else {
      goNext();
    }
  };

  const goNext = () => {
    recordTime();
    updateCurrentStatus();
    if (currentQ < questions.length - 1) {
      const nextIdx = currentQ + 1;
      setCurrentQ(nextIdx);
      setQuestionStartTime(Date.now());
      setStatuses(prev => {
        const copy = [...prev];
        if (copy[nextIdx] === "not-visited") copy[nextIdx] = "not-answered";
        return copy;
      });
    }
  };

  const goPrev = () => {
    if (currentQ > 0) {
      recordTime();
      updateCurrentStatus();
      setCurrentQ(currentQ - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const statusCounts = {
    answered: statuses.filter(s => s === "answered" || s === "marked-answered").length,
    notAnswered: statuses.filter(s => s === "not-answered").length,
    notVisited: statuses.filter(s => s === "not-visited").length,
    marked: statuses.filter(s => s === "marked").length,
    markedAnswered: statuses.filter(s => s === "marked-answered").length,
  };

  const getStatusColor = (status: QuestionStatus, index: number) => {
    if (index === currentQ) return "ring-2 ring-foreground";
    switch (status) {
      case "answered": return "bg-[hsl(142,71%,35%)] text-white"; // NTA Green
      case "not-answered": return "bg-[hsl(0,84%,50%)] text-white"; // NTA Red
      case "marked": return "bg-[hsl(271,76%,53%)] text-white"; // NTA Purple
      case "marked-answered": return "bg-[hsl(271,76%,53%)] text-white ring-2 ring-[hsl(142,71%,35%)]";
      case "not-visited":
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusBg = (status: QuestionStatus) => {
    switch (status) {
      case "answered": return "bg-[hsl(142,71%,35%)]";
      case "not-answered": return "bg-[hsl(0,84%,50%)]";
      case "marked": return "bg-[hsl(271,76%,53%)]";
      case "marked-answered": return "bg-[hsl(271,76%,53%)]";
      case "not-visited":
      default: return "bg-muted";
    }
  };

  const q = questions[currentQ];
  const isMarked = statuses[currentQ] === "marked" || statuses[currentQ] === "marked-answered";

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* NTA-style Header */}
      <div className="bg-card border-b border-border px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80">
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
            <div>
              <p className="text-xs font-bold text-foreground leading-tight">{title}</p>
              <p className="text-[10px] text-muted-foreground">{q.subject}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${timeLeft < 300 ? "bg-destructive/10" : "bg-secondary"}`}>
              <Clock className={`w-3 h-3 ${timeLeft < 300 ? "text-destructive" : "text-muted-foreground"}`} />
              <span className={`text-xs font-mono font-bold ${timeLeft < 300 ? "text-destructive" : "text-foreground"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <Sheet open={showPalette} onOpenChange={setShowPalette}>
              <SheetTrigger asChild>
                <button className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 relative">
                  <Grid3X3 className="w-4 h-4 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <QuestionPalette
                  statuses={statuses}
                  currentQ={currentQ}
                  statusCounts={statusCounts}
                  getStatusColor={getStatusColor}
                  onNavigate={navigateToQuestion}
                  onSubmit={() => { recordTime(); updateCurrentStatus(); finishQuiz(); }}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Status Legend Bar */}
        <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
          <StatusBadge color="bg-[hsl(142,71%,35%)]" label="Answered" count={statusCounts.answered} />
          <StatusBadge color="bg-[hsl(0,84%,50%)]" label="Not Answered" count={statusCounts.notAnswered} />
          <StatusBadge color="bg-muted" label="Not Visited" count={statusCounts.notVisited} />
          <StatusBadge color="bg-[hsl(271,76%,53%)]" label="Marked" count={statusCounts.marked + statusCounts.markedAnswered} />
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15 }}
          >
            {/* Question Number & Subject Tag */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                  {currentQ + 1}
                </span>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">
                  {q.subject} • {q.chapter}
                </span>
              </div>
              {isMarked && (
                <span className="text-[10px] font-semibold text-[hsl(271,76%,53%)] bg-[hsl(271,76%,53%)]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Flag className="w-3 h-3" /> Marked
                </span>
              )}
            </div>

            {/* Question Text */}
            <div className="bg-card border border-border rounded-xl p-4 mb-4">
              <p className="font-medium text-card-foreground leading-relaxed text-sm">{q.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isSelected = selectedOptions[currentQ] === i;
                let optionClass = "border-border bg-card text-card-foreground hover:border-primary/40";
                
                if (showFeedback && instantFeedback) {
                  if (i === q.correctAnswer) optionClass = "border-[hsl(142,71%,35%)] bg-[hsl(142,71%,35%)]/10 text-foreground";
                  else if (isSelected && i !== q.correctAnswer) optionClass = "border-destructive bg-destructive/10 text-foreground";
                } else if (isSelected) {
                  optionClass = "border-primary bg-primary/10 text-foreground";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    disabled={showFeedback}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all text-sm ${optionClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
                        isSelected && !showFeedback
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {showFeedback && i === q.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-[hsl(142,71%,35%)] shrink-0" />
                      )}
                      {showFeedback && isSelected && i !== q.correctAnswer && (
                        <XCircle className="w-4 h-4 text-destructive shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Explanation */}
            {showFeedback && instantFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-xl bg-secondary text-sm text-muted-foreground"
              >
                {q.explanation}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NTA-style Bottom Action Bar */}
      {!showFeedback && (
        <div className="bg-card border-t border-border px-3 py-2.5 space-y-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkForReview}
              className={`flex-1 rounded-lg h-9 text-xs gap-1 ${
                isMarked ? "border-[hsl(271,76%,53%)] text-[hsl(271,76%,53%)]" : "border-border"
              }`}
            >
              <Flag className="w-3 h-3" />
              {isMarked ? "Unmark" : "Mark for Review"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearResponse}
              disabled={selectedOptions[currentQ] === null}
              className="flex-1 rounded-lg h-9 text-xs border-border"
            >
              Clear Response
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goPrev}
              disabled={currentQ === 0}
              className="rounded-lg h-10 px-3 border-border"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSaveNext}
              size="sm"
              className="flex-1 gradient-primary text-primary-foreground border-0 rounded-lg h-10 font-semibold text-xs"
            >
              {currentQ === questions.length - 1 ? "Save" : "Save & Next"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { if (currentQ < questions.length - 1) navigateToQuestion(currentQ + 1); }}
              disabled={currentQ === questions.length - 1}
              className="rounded-lg h-10 px-3 border-border"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ color, label, count }: { color: string; label: string; count: number }) => (
  <div className="flex items-center gap-1 shrink-0">
    <span className={`w-3 h-3 rounded-sm ${color}`} />
    <span className="text-[9px] text-muted-foreground whitespace-nowrap">{count} {label}</span>
  </div>
);

// Question Palette Component
const QuestionPalette = ({
  statuses,
  currentQ,
  statusCounts,
  getStatusColor,
  onNavigate,
  onSubmit,
}: {
  statuses: QuestionStatus[];
  currentQ: number;
  statusCounts: { answered: number; notAnswered: number; notVisited: number; marked: number; markedAnswered: number };
  getStatusColor: (status: QuestionStatus, index: number) => string;
  onNavigate: (index: number) => void;
  onSubmit: () => void;
}) => (
  <div className="flex flex-col h-full">
    <div className="bg-primary px-4 py-3">
      <h3 className="font-bold text-sm text-primary-foreground">Question Palette</h3>
    </div>

    {/* Legend */}
    <div className="grid grid-cols-2 gap-2 px-4 py-3 border-b border-border">
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-md bg-[hsl(142,71%,35%)]" />
        <span className="text-[10px] text-muted-foreground">{statusCounts.answered} Answered</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-md bg-[hsl(0,84%,50%)]" />
        <span className="text-[10px] text-muted-foreground">{statusCounts.notAnswered} Not Answered</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-md bg-muted" />
        <span className="text-[10px] text-muted-foreground">{statusCounts.notVisited} Not Visited</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-md bg-[hsl(271,76%,53%)]" />
        <span className="text-[10px] text-muted-foreground">{statusCounts.marked + statusCounts.markedAnswered} Marked</span>
      </div>
    </div>

    {/* Grid */}
    <div className="flex-1 overflow-y-auto px-4 py-3">
      <div className="grid grid-cols-5 gap-2">
        {statuses.map((status, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${getStatusColor(status, i)} ${
              i === currentQ ? "scale-110 shadow-md" : "hover:scale-105"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>

    {/* Submit */}
    <div className="px-4 py-3 border-t border-border">
      <Button
        onClick={onSubmit}
        className="w-full gradient-primary text-primary-foreground border-0 rounded-xl h-11 font-semibold text-sm"
      >
        Submit Test
      </Button>
    </div>
  </div>
);

export default QuizEngine;
