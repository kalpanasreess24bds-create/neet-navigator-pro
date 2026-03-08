import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, Plus, X, Target } from "lucide-react";

interface Note {
  id: string;
  text: string;
  color: string;
  createdAt: number;
}

const noteColors = [
  "from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/30 border-yellow-300/50 dark:border-yellow-700/30",
  "from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/30 border-pink-300/50 dark:border-pink-700/30",
  "from-blue-100 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/30 border-blue-300/50 dark:border-blue-700/30",
  "from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/30 border-green-300/50 dark:border-green-700/30",
  "from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/30 border-purple-300/50 dark:border-purple-700/30",
];

const PositiveWall = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("positive-wall-notes");
    if (saved) setNotes(JSON.parse(saved));
    else {
      // Default starter notes
      setNotes([
        { id: "1", text: "I will become a doctor 🩺", color: noteColors[0], createdAt: Date.now() },
        { id: "2", text: "I will crack NEET 💪", color: noteColors[1], createdAt: Date.now() },
        { id: "3", text: "My hard work will pay off ✨", color: noteColors[2], createdAt: Date.now() },
      ]);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("positive-wall-notes", JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: crypto.randomUUID(),
      text: newNote.trim(),
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
      createdAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setNewNote("");
    setShowInput(false);
  };

  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">My Goals & Affirmations</h3>
        </div>
        <button
          onClick={() => setShowInput(!showInput)}
          className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 text-primary" />
        </button>
      </div>

      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNote()}
                placeholder="Write your goal or affirmation..."
                className="flex-1 bg-secondary rounded-xl px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              <button
                onClick={addNote}
                className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold"
              >
                Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-2 gap-3">
        {notes.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -1 : 1 }}
            transition={{ delay: i * 0.03 }}
            className={`relative rounded-xl p-3 border bg-gradient-to-br ${note.color} shadow-sm`}
            style={{ minHeight: "80px" }}
          >
            <button
              onClick={() => removeNote(note.id)}
              className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center opacity-50 hover:opacity-100"
            >
              <X className="w-3 h-3" />
            </button>
            <StickyNote className="w-3.5 h-3.5 text-foreground/30 mb-1.5" />
            <p className="text-xs font-medium text-foreground/80 leading-relaxed pr-4">{note.text}</p>
          </motion.div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-8">
          <StickyNote className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Add your first goal or affirmation!</p>
        </div>
      )}
    </div>
  );
};

export default PositiveWall;
