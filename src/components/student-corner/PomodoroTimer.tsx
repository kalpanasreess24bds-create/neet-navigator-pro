import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Timer, Play, Pause, RotateCcw, Coffee, BookOpen } from "lucide-react";
import { studyTips } from "@/data/studentCornerData";

const PomodoroTimer = () => {
  const [mode, setMode] = useState<"study" | "break">("study");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const studyTime = 25 * 60;
  const breakTime = 5 * 60;

  useEffect(() => {
    setTipIndex(Math.floor(Math.random() * studyTips.length));
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (mode === "study") {
            setSessions((s) => s + 1);
            setMode("break");
            return breakTime;
          } else {
            setMode("study");
            return studyTime;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode]);

  const reset = () => {
    setIsRunning(false);
    setMode("study");
    setTimeLeft(studyTime);
  };

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const totalTime = mode === "study" ? studyTime : breakTime;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="space-y-4">
      {/* Pomodoro */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-5 border ${
          mode === "study"
            ? "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/20 border-red-200/50 dark:border-red-800/30"
            : "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20 border-green-200/50 dark:border-green-800/30"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Timer className={`w-4 h-4 ${mode === "study" ? "text-red-500" : "text-green-500"}`} />
            <span className={`text-xs font-bold uppercase tracking-wider ${mode === "study" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
              {mode === "study" ? "Study Time" : "Break Time"}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">Sessions: {sessions}</span>
        </div>

        {/* Timer Circle */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" strokeWidth="4"
                className={mode === "study" ? "stroke-red-200 dark:stroke-red-900" : "stroke-green-200 dark:stroke-green-900"} />
              <circle cx="50" cy="50" r="45" fill="none" strokeWidth="5" strokeLinecap="round"
                className={mode === "study" ? "stroke-red-500" : "stroke-green-500"}
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-display text-foreground">
                {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                {mode === "study" ? <><BookOpen className="w-3 h-3" /> Focus</> : <><Coffee className="w-3 h-3" /> Relax</>}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white ${
                mode === "study"
                  ? "bg-gradient-to-r from-red-500 to-orange-500"
                  : "bg-gradient-to-r from-green-500 to-emerald-500"
              }`}
            >
              {isRunning ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> {timeLeft === totalTime ? "Start" : "Resume"}</>}
            </button>
            <button onClick={reset} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Daily Tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/20 border border-yellow-200/50 dark:border-yellow-800/30"
      >
        <p className="text-xs font-bold text-yellow-700 dark:text-yellow-400 mb-2">💡 Study Tip of the Day</p>
        <p className="text-sm text-yellow-900 dark:text-yellow-100 font-medium">{studyTips[tipIndex]}</p>
        <button
          onClick={() => setTipIndex((prev) => (prev + 1) % studyTips.length)}
          className="text-[10px] text-yellow-600 mt-2 font-medium hover:underline"
        >
          Next tip →
        </button>
      </motion.div>
    </div>
  );
};

export default PomodoroTimer;
