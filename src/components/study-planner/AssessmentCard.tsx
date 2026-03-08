import { motion } from "framer-motion";
import { ClipboardCheck, ArrowRight, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import type { PlannedChapter } from "@/types/studyPlanner";

interface AssessmentCardProps {
  chapter: PlannedChapter;
  onToggle: () => void;
  compact?: boolean;
}

const AssessmentCard = ({ chapter, onToggle, compact = false }: AssessmentCardProps) => {
  const navigate = useNavigate();
  const isMonthly = chapter.assessmentType === "monthly";

  const handleTakeTest = () => {
    // Navigate to the Tests page — it will show the test dashboard
    navigate("/tests");
  };

  if (compact) {
    return (
      <div
        className={`flex items-center gap-2 p-2 rounded-lg ${
          isMonthly
            ? "bg-destructive/5 border border-destructive/20"
            : "bg-accent/5 border border-accent/20"
        } ${chapter.completed ? "opacity-50" : ""}`}
      >
        <Checkbox checked={chapter.completed} onCheckedChange={onToggle} />
        <span className="text-sm">{isMonthly ? "🏆" : "📋"}</span>
        <p className={`text-xs flex-1 min-w-0 truncate font-semibold ${
          isMonthly ? "text-destructive" : "text-accent-foreground"
        } ${chapter.completed ? "line-through" : ""}`}>
          {chapter.chapterName}
        </p>
        {!chapter.completed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTakeTest();
            }}
            className={`text-[10px] font-bold px-2 py-1 rounded-md ${
              isMonthly
                ? "bg-destructive/10 text-destructive"
                : "bg-accent/10 text-accent-foreground"
            }`}
          >
            Take Test
          </button>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`elevated-card rounded-xl p-4 border-l-4 ${
        isMonthly ? "border-l-destructive" : "border-l-accent"
      } ${chapter.completed ? "opacity-50" : ""}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={chapter.completed}
          onCheckedChange={onToggle}
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {isMonthly ? (
              <Trophy className="w-4 h-4 text-destructive" />
            ) : (
              <ClipboardCheck className="w-4 h-4 text-accent-foreground" />
            )}
            <p className={`text-sm font-bold ${
              isMonthly ? "text-destructive" : "text-accent-foreground"
            } ${chapter.completed ? "line-through" : ""}`}>
              {chapter.chapterName}
            </p>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            {isMonthly
              ? "Full NEET mock test • 180 questions • 3 hours"
              : "Weekly assessment • All subjects • 45 min"}
          </p>
        </div>

        {!chapter.completed && (
          <button
            onClick={handleTakeTest}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
              isMonthly
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "bg-accent/10 text-accent-foreground hover:bg-accent/20"
            }`}
          >
            Take Test <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AssessmentCard;
