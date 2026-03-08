import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X } from "lucide-react";
import { dailyQuotes, positiveAffirmations, topperStories } from "@/data/studentCornerData";

const EmergencyMotivation = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<{ quote: string; author: string; story: typeof topperStories[0]; affirmation: string } | null>(null);

  const handleMotivate = () => {
    const quote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
    const story = topperStories[Math.floor(Math.random() * topperStories.length)];
    const affirmation = positiveAffirmations[Math.floor(Math.random() * positiveAffirmations.length)];
    setContent({ quote: quote.text, author: quote.author, story, affirmation });
    setShowModal(true);
  };

  return (
    <>
      <motion.button
        onClick={handleMotivate}
        whileTap={{ scale: 0.95 }}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
      >
        <Zap className="w-5 h-5" fill="currentColor" />
        Motivate Me! 🚀
      </motion.button>

      <AnimatePresence>
        {showModal && content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-5"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-card rounded-3xl p-5 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground font-display flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" fill="currentColor" /> Your Motivation Boost
                </h3>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Quote */}
              <div className="rounded-xl p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/30">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100 italic">"{content.quote}"</p>
                <p className="text-[10px] text-amber-600 mt-1">— {content.author}</p>
              </div>

              {/* Affirmation */}
              <div className="rounded-xl p-3 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20 border border-pink-200/30 text-center">
                <p className="text-sm font-bold text-pink-800 dark:text-pink-200">{content.affirmation}</p>
              </div>

              {/* Topper Story */}
              <div className="rounded-xl p-4 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20 border border-sky-200/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🩺</span>
                  <div>
                    <p className="text-xs font-bold text-sky-800 dark:text-sky-200">{content.story.name}</p>
                    <p className="text-[9px] text-sky-500">{content.story.rank}</p>
                  </div>
                </div>
                <p className="text-[10px] text-sky-700 dark:text-sky-300 leading-relaxed">{content.story.story}</p>
              </div>

              <button
                onClick={handleMotivate}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-bold"
              >
                More Motivation ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmergencyMotivation;
