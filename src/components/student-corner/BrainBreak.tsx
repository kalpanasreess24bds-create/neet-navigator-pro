import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Zap, RotateCcw } from "lucide-react";
import { scienceFacts } from "@/data/studentCornerData";

const emojis = ["🧬", "⚛️", "⚗️", "🔬", "🧪", "💊", "🩺", "🫀"];

const BrainBreak = () => {
  const [gameMode, setGameMode] = useState<"cards" | "facts">("cards");

  // Memory card game
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const [factIndex, setFactIndex] = useState(0);

  const startGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setGameStarted(true);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    const card = cards[id];
    if (card.flipped || card.matched) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (newCards[first].emoji === newCards[second].emoji) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  const allMatched = gameStarted && cards.length > 0 && cards.every((c) => c.matched);

  return (
    <div className="space-y-4">
      {/* Tab */}
      <div className="flex gap-1 p-1 bg-secondary rounded-xl">
        <button
          onClick={() => setGameMode("cards")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
            gameMode === "cards" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" /> Memory Game
        </button>
        <button
          onClick={() => setGameMode("facts")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
            gameMode === "facts" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          <Zap className="w-3.5 h-3.5" /> Science Facts
        </button>
      </div>

      {gameMode === "cards" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl p-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 border border-violet-200/50 dark:border-violet-800/30"
        >
          {!gameStarted ? (
            <div className="text-center py-6">
              <span className="text-4xl mb-3 block">🧠</span>
              <h3 className="text-sm font-bold text-violet-800 dark:text-violet-200 mb-1">Memory Card Game</h3>
              <p className="text-[10px] text-violet-500 mb-4">Match science emoji pairs to exercise your memory!</p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-bold"
              >
                Start Game
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-violet-700 dark:text-violet-300">Moves: {moves}</p>
                <button onClick={startGame} className="text-[10px] text-violet-500 flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Restart
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square rounded-xl text-xl flex items-center justify-center transition-all ${
                      card.flipped || card.matched
                        ? "bg-white dark:bg-white/10 shadow-sm"
                        : "bg-violet-300/50 dark:bg-violet-700/30 hover:bg-violet-300/70"
                    } ${card.matched ? "opacity-50" : ""}`}
                  >
                    {card.flipped || card.matched ? card.emoji : "❓"}
                  </motion.button>
                ))}
              </div>
              {allMatched && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-xl"
                >
                  <p className="text-sm font-bold text-green-700 dark:text-green-300">🎉 You won in {moves} moves!</p>
                  <button onClick={startGame} className="text-xs text-green-600 mt-1 underline">Play Again</button>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl p-5 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/20 border border-cyan-200/50 dark:border-cyan-800/30"
        >
          <div className="text-center mb-4">
            <span className="text-3xl mb-2 block">🔬</span>
            <h3 className="text-sm font-bold text-cyan-800 dark:text-cyan-200">Fun Science Fact</h3>
          </div>

          <motion.div
            key={factIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/60 dark:bg-white/5 rounded-xl p-4 text-center mb-4"
          >
            <p className="text-sm font-medium text-cyan-900 dark:text-cyan-100 leading-relaxed">
              {scienceFacts[factIndex].fact}
            </p>
            <span className="inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-cyan-200/50 dark:bg-cyan-800/50 text-cyan-700 dark:text-cyan-300">
              {scienceFacts[factIndex].subject}
            </span>
          </motion.div>

          <button
            onClick={() => setFactIndex((prev) => (prev + 1) % scienceFacts.length)}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold"
          >
            Next Fact ✨
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BrainBreak;
