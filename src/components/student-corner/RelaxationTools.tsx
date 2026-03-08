import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Wind, Pause, Play, Volume2 } from "lucide-react";

const breathingPhases = [
  { label: "Breathe In", duration: 4, color: "from-sky-400 to-blue-500" },
  { label: "Hold", duration: 4, color: "from-blue-500 to-indigo-500" },
  { label: "Breathe Out", duration: 4, color: "from-indigo-500 to-purple-500" },
  { label: "Hold", duration: 4, color: "from-purple-500 to-sky-400" },
];

const calmingSounds = [
  { id: "rain", label: "🌧️ Rain", emoji: "🌧️" },
  { id: "ocean", label: "🌊 Ocean Waves", emoji: "🌊" },
  { id: "forest", label: "🌳 Forest", emoji: "🌳" },
  { id: "fire", label: "🔥 Fireplace", emoji: "🔥" },
];

const RelaxationTools = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!breathingActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        const phase = breathingPhases[currentPhase];
        if (prev + 1 >= phase.duration) {
          setCurrentPhase((p) => {
            const next = (p + 1) % breathingPhases.length;
            if (next === 0) setCycles((c) => c + 1);
            return next;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [breathingActive, currentPhase]);

  const startBreathing = () => {
    setBreathingActive(true);
    setCurrentPhase(0);
    setSeconds(0);
    setCycles(0);
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    setCurrentPhase(0);
    setSeconds(0);
  };

  const phase = breathingPhases[currentPhase];
  const progress = breathingActive ? (seconds / phase.duration) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Breathing Exercise */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/20 border border-sky-200/50 dark:border-sky-800/30"
      >
        <div className="flex items-center gap-2 mb-4">
          <Wind className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">Box Breathing</span>
          <span className="text-[10px] text-sky-500 ml-auto">~2 min exercise</span>
        </div>

        <div className="flex flex-col items-center">
          {/* Breathing Circle */}
          <div className="relative w-36 h-36 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-sky-200 dark:text-sky-800" />
              {breathingActive && (
                <motion.circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="url(#breathGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="transition-all duration-1000"
                />
              )}
              <defs>
                <linearGradient id="breathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
                  <stop offset="100%" stopColor="hsl(243, 75%, 59%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {breathingActive ? (
                <>
                  <motion.p
                    key={phase.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-sm font-bold text-sky-800 dark:text-sky-200"
                  >
                    {phase.label}
                  </motion.p>
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400 font-display">
                    {phase.duration - seconds}
                  </p>
                </>
              ) : (
                <p className="text-xs text-sky-500 text-center px-4">Tap start for a calming breathing exercise</p>
              )}
            </div>
          </div>

          {breathingActive && (
            <p className="text-[10px] text-sky-500 mb-3">Cycle {cycles + 1} of 5</p>
          )}

          <button
            onClick={breathingActive ? stopBreathing : startBreathing}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${
              breathingActive
                ? "bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-200"
                : "bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
            }`}
          >
            {breathingActive ? <><Pause className="w-4 h-4" /> Stop</> : <><Play className="w-4 h-4" /> Start Breathing</>}
          </button>
        </div>
      </motion.div>

      {/* Calming Sounds */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-800/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Calming Sounds</span>
        </div>
        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mb-3">Tap to play ambient sounds while you study or relax</p>
        <div className="grid grid-cols-4 gap-2">
          {calmingSounds.map((sound) => (
            <button
              key={sound.id}
              onClick={() => setActiveSound(activeSound === sound.id ? null : sound.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                activeSound === sound.id
                  ? "bg-emerald-500 text-white scale-105 shadow-lg shadow-emerald-500/30"
                  : "bg-white/60 dark:bg-white/5 text-emerald-700 dark:text-emerald-300 hover:bg-white dark:hover:bg-white/10"
              }`}
            >
              <span className="text-2xl">{sound.emoji}</span>
              <span className="text-[9px] font-medium">{sound.id}</span>
            </button>
          ))}
        </div>
        {activeSound && (
          <p className="text-[10px] text-emerald-500 text-center mt-2 animate-pulse">🎵 Playing {activeSound} sounds...</p>
        )}
      </motion.div>
    </div>
  );
};

export default RelaxationTools;
