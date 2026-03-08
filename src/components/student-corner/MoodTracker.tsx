import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SmilePlus, PenLine } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700" },
  { emoji: "💪", label: "Motivated", color: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700" },
  { emoji: "😰", label: "Stressed", color: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700" },
  { emoji: "😴", label: "Tired", color: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700" },
  { emoji: "🤔", label: "Confused", color: "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700" },
  { emoji: "😌", label: "Calm", color: "bg-teal-100 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700" },
];

interface MoodEntry {
  date: string;
  mood: string;
  gratitude: string;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [gratitude, setGratitude] = useState("");
  const [todaySaved, setTodaySaved] = useState(false);
  const [history, setHistory] = useState<MoodEntry[]>([]);

  const todayKey = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = localStorage.getItem("mood-tracker");
    if (saved) {
      const entries: MoodEntry[] = JSON.parse(saved);
      setHistory(entries);
      const today = entries.find((e) => e.date === todayKey);
      if (today) {
        setSelectedMood(today.mood);
        setGratitude(today.gratitude);
        setTodaySaved(true);
      }
    }
  }, []);

  const saveMood = () => {
    if (!selectedMood) return;
    const entry: MoodEntry = { date: todayKey, mood: selectedMood, gratitude };
    const updated = [...history.filter((e) => e.date !== todayKey), entry];
    setHistory(updated);
    localStorage.setItem("mood-tracker", JSON.stringify(updated));
    setTodaySaved(true);
  };

  const recentHistory = history
    .filter((e) => e.date !== todayKey)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 7);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/30 dark:to-pink-950/20 border border-fuchsia-200/50 dark:border-fuchsia-800/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <SmilePlus className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
          <span className="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-400 uppercase tracking-wider">
            {todaySaved ? "Today's Mood ✓" : "How are you feeling today?"}
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2 mb-4">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => { if (!todaySaved) setSelectedMood(mood.label); }}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                selectedMood === mood.label
                  ? `${mood.color} scale-110 shadow-sm border-2`
                  : "bg-white/40 dark:bg-white/5 border-transparent hover:bg-white/60"
              }`}
            >
              <span className="text-xl">{mood.emoji}</span>
              <span className="text-[8px] font-medium text-foreground/70">{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Gratitude */}
        <div className="mb-3">
          <label className="text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-400 flex items-center gap-1 mb-1.5">
            <PenLine className="w-3 h-3" /> One thing I'm grateful for today
          </label>
          <input
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            disabled={todaySaved}
            placeholder="e.g. My supportive family..."
            className="w-full bg-white/60 dark:bg-white/5 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
          />
        </div>

        {!todaySaved ? (
          <button
            onClick={saveMood}
            disabled={!selectedMood}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-sm font-bold disabled:opacity-40"
          >
            Save Today's Entry
          </button>
        ) : (
          <p className="text-[10px] text-fuchsia-500 text-center">✅ Today's mood saved! Come back tomorrow.</p>
        )}
      </motion.div>

      {/* History */}
      {recentHistory.length > 0 && (
        <div>
          <p className="text-xs font-bold text-foreground mb-2">Recent Moods</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {recentHistory.map((entry) => {
              const moodData = moods.find((m) => m.label === entry.mood);
              return (
                <div key={entry.date} className="flex flex-col items-center gap-1 shrink-0">
                  <span className="text-lg">{moodData?.emoji || "😐"}</span>
                  <span className="text-[8px] text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
