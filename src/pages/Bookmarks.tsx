import { motion } from "framer-motion";
import { Bookmark, BookOpen, FileText, Layers } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const savedItems = [
  { id: "1", title: "Cell: The Unit of Life", type: "Video", subject: "Biology", icon: "🧬" },
  { id: "2", title: "Chemical Bonding Notes", type: "PDF", subject: "Chemistry", icon: "⚗️" },
  { id: "3", title: "Newton's Laws Flashcards", type: "Flashcards", subject: "Physics", icon: "⚛️" },
  { id: "4", title: "Biological Classification", type: "Video", subject: "Biology", icon: "🧬" },
];

const typeIcons: Record<string, typeof BookOpen> = {
  Video: BookOpen,
  PDF: FileText,
  Flashcards: Layers,
};

const Bookmarks = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-xl font-bold font-display text-foreground">Saved Content</h1>
        <p className="text-sm text-muted-foreground mt-1">Your bookmarked study materials</p>
      </div>

      <div className="px-5 space-y-3">
        {savedItems.map((item, i) => {
          const Icon = typeIcons[item.type] || BookOpen;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="elevated-card rounded-xl p-4 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-lg shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-card-foreground truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Icon className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item.type} • {item.subject}</span>
                </div>
              </div>
              <Bookmark className="w-4 h-4 text-accent shrink-0" fill="currentColor" />
            </motion.div>
          );
        })}

        {savedItems.length === 0 && (
          <div className="text-center py-16">
            <Bookmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No saved items yet</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Bookmarks;
