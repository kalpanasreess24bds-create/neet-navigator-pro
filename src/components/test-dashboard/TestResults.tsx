import { motion } from "framer-motion";
import { Trophy, CheckCircle2, XCircle, Clock, ArrowLeft, RotateCcw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestQuestion, TestResult, TestReport } from "@/types/testDashboard";

interface TestResultsProps {
  questions: TestQuestion[];
  results: TestResult[];
  title: string;
  onRetake: () => void;
  onBack: () => void;
  showDetailedReport?: boolean;
}

const NEET_CORRECT = 4;
const NEET_INCORRECT = -1;

function generateReport(questions: TestQuestion[], results: TestResult[]): TestReport {
  let correct = 0, incorrect = 0, unanswered = 0, score = 0, totalTime = 0;
  const subjectWise: TestReport["subjectWise"] = {};

  results.forEach((r, i) => {
    const q = questions[i];
    if (!q) return;
    totalTime += r.timeTaken;

    if (!subjectWise[q.subject]) {
      subjectWise[q.subject] = { correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0, timeTaken: 0, weakTopics: [] };
    }
    subjectWise[q.subject].total++;
    subjectWise[q.subject].timeTaken += r.timeTaken;

    if (r.selected === null) {
      unanswered++;
      subjectWise[q.subject].unanswered++;
    } else if (r.correct) {
      correct++;
      score += NEET_CORRECT;
      subjectWise[q.subject].correct++;
      subjectWise[q.subject].score += NEET_CORRECT;
    } else {
      incorrect++;
      score += NEET_INCORRECT;
      subjectWise[q.subject].incorrect++;
      subjectWise[q.subject].score += NEET_INCORRECT;
    }
  });

  // Identify weak topics
  const chapterPerformance: Record<string, Record<string, { correct: number; total: number }>> = {};
  results.forEach((r, i) => {
    const q = questions[i];
    if (!q) return;
    if (!chapterPerformance[q.subject]) chapterPerformance[q.subject] = {};
    if (!chapterPerformance[q.subject][q.chapter]) chapterPerformance[q.subject][q.chapter] = { correct: 0, total: 0 };
    chapterPerformance[q.subject][q.chapter].total++;
    if (r.correct) chapterPerformance[q.subject][q.chapter].correct++;
  });

  Object.entries(chapterPerformance).forEach(([subject, chapters]) => {
    Object.entries(chapters).forEach(([chapter, data]) => {
      if (data.correct / data.total < 0.5) {
        subjectWise[subject]?.weakTopics.push(chapter);
      }
    });
  });

  const maxScore = questions.length * NEET_CORRECT;
  const accuracy = results.filter(r => r.selected !== null).length > 0
    ? (correct / results.filter(r => r.selected !== null).length) * 100
    : 0;

  return { score, maxScore, correct, incorrect, unanswered, accuracy, totalTime, subjectWise };
}

const TestResults = ({ questions, results, title, onRetake, onBack, showDetailedReport = false }: TestResultsProps) => {
  const report = generateReport(questions, results);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl bg-secondary">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h2 className="font-display font-bold text-lg text-foreground">{title} - Results</h2>
      </div>

      {/* Score Card */}
      <div className="elevated-card rounded-2xl p-6 text-center">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
          <Trophy className="w-8 h-8 text-primary-foreground" />
        </div>
        <p className="text-4xl font-bold font-display text-foreground">
          {report.score}/{report.maxScore}
        </p>
        <p className="text-sm text-muted-foreground mt-1">Total Score (NEET Pattern)</p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-secondary rounded-xl p-3">
            <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{report.accuracy.toFixed(1)}%</p>
            <p className="text-[10px] text-muted-foreground">Accuracy</p>
          </div>
          <div className="bg-secondary rounded-xl p-3">
            <Clock className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{formatTime(report.totalTime)}</p>
            <p className="text-[10px] text-muted-foreground">Time Taken</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-secondary rounded-xl p-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{report.correct}</p>
            <p className="text-[10px] text-muted-foreground">Correct</p>
          </div>
          <div className="bg-secondary rounded-xl p-3">
            <XCircle className="w-4 h-4 text-destructive mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{report.incorrect}</p>
            <p className="text-[10px] text-muted-foreground">Wrong</p>
          </div>
          <div className="bg-secondary rounded-xl p-3">
            <Clock className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{report.unanswered}</p>
            <p className="text-[10px] text-muted-foreground">Skipped</p>
          </div>
        </div>
      </div>

      {/* Subject-wise Analysis */}
      {Object.keys(report.subjectWise).length > 1 && (
        <div className="elevated-card rounded-2xl p-5">
          <h3 className="font-display font-bold text-sm text-card-foreground mb-3">Subject-wise Analysis</h3>
          {Object.entries(report.subjectWise).map(([subject, data]) => (
            <div key={subject} className="py-3 border-b border-border/50 last:border-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-card-foreground">{subject}</span>
                <span className="text-xs font-semibold text-primary">
                  {data.score}/{data.total * NEET_CORRECT}
                </span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                <div
                  className="h-full gradient-primary rounded-full"
                  style={{ width: `${data.total > 0 ? (data.correct / data.total) * 100 : 0}%` }}
                />
              </div>
              <div className="flex gap-3 text-[10px] text-muted-foreground">
                <span>✅ {data.correct}</span>
                <span>❌ {data.incorrect}</span>
                <span>⏭️ {data.unanswered}</span>
                <span>⏱️ {formatTime(data.timeTaken)}</span>
              </div>
              {showDetailedReport && data.weakTopics.length > 0 && (
                <div className="mt-1.5">
                  <p className="text-[10px] text-destructive font-medium">Weak: {data.weakTopics.join(", ")}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Question Review */}
      <div className="space-y-3">
        <h3 className="font-display font-bold text-sm text-foreground">Question Review</h3>
        {results.map((r, i) => {
          const q = questions[i];
          if (!q) return null;
          return (
            <div key={i} className="elevated-card rounded-xl p-4">
              <div className="flex items-start gap-2">
                {r.correct ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                ) : r.selected === null ? (
                  <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{q.subject} • {q.chapter}</p>
                  <p className="text-sm font-medium text-card-foreground mt-0.5">{q.question}</p>
                  <p className="text-xs text-green-600 mt-1">
                    ✓ {String.fromCharCode(65 + q.correctAnswer)}) {q.options[q.correctAnswer]}
                  </p>
                  {r.selected !== null && !r.correct && (
                    <p className="text-xs text-destructive">
                      ✗ {String.fromCharCode(65 + r.selected)}) {q.options[r.selected]}
                    </p>
                  )}
                  {r.selected === null && <p className="text-xs text-muted-foreground">Unanswered</p>}
                  <p className="text-xs text-muted-foreground mt-1 italic">{q.explanation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button onClick={onRetake} className="w-full gradient-primary text-primary-foreground border-0 rounded-xl h-12 font-semibold gap-2">
        <RotateCcw className="w-4 h-4" /> Retake Test
      </Button>
    </motion.div>
  );
};

export default TestResults;
