import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Sparkles, Heart, ChevronRight, Star } from "lucide-react";
import { dailyQuotes, positiveAffirmations, topperStories } from "@/data/studentCornerData";

const MotivationBoost = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  useEffect(() => {
    // Rotate based on day
    const day = new Date().getDate();
    setQuoteIndex(day % dailyQuotes.length);
    setAffirmationIndex(day % positiveAffirmations.length);
  }, []);

  return (
    <div className="space-y-4">
      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/50 dark:border-amber-800/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center">
            <Quote className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Quote of the Day</span>
        </div>
        <p className="text-base font-medium text-amber-900 dark:text-amber-100 leading-relaxed italic">
          "{dailyQuotes[quoteIndex].text}"
        </p>
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">— {dailyQuotes[quoteIndex].author}</p>
      </motion.div>

      {/* Positive Affirmation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20 border border-pink-200/50 dark:border-pink-800/30 text-center"
      >
        <Heart className="w-5 h-5 text-pink-500 mx-auto mb-2" fill="currentColor" />
        <p className="text-sm font-bold text-pink-800 dark:text-pink-200">
          {positiveAffirmations[affirmationIndex]}
        </p>
      </motion.div>

      {/* NEET Topper Stories */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-primary" fill="currentColor" />
          <h3 className="text-sm font-bold text-foreground">NEET Topper Stories</h3>
        </div>
        <div className="space-y-2">
          {topperStories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-card border border-border overflow-hidden"
            >
              <button
                onClick={() => setExpandedStory(expandedStory === i ? null : i)}
                className="w-full flex items-center gap-3 p-3 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg shrink-0">
                  🩺
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-card-foreground">{story.name}</p>
                  <p className="text-[10px] text-muted-foreground">{story.rank} • Score: {story.score}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedStory === i ? "rotate-90" : ""}`} />
              </button>
              <AnimatePresence>
                {expandedStory === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 space-y-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">{story.story}</p>
                      <div className="bg-primary/5 rounded-lg p-2">
                        <p className="text-[10px] font-bold text-primary">💡 Tip: {story.tip}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivationBoost;
