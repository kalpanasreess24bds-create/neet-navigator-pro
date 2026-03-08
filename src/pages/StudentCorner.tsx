import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Heart, Wind, Gamepad2, Timer, StickyNote, Shield, SmilePlus, Zap, Bell,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MotivationBoost from "@/components/student-corner/MotivationBoost";
import RelaxationTools from "@/components/student-corner/RelaxationTools";
import BrainBreak from "@/components/student-corner/BrainBreak";
import PomodoroTimer from "@/components/student-corner/PomodoroTimer";
import PositiveWall from "@/components/student-corner/PositiveWall";
import MoodTracker from "@/components/student-corner/MoodTracker";
import StressSupport from "@/components/student-corner/StressSupport";
import EmergencyMotivation from "@/components/student-corner/EmergencyMotivation";
import NTAUpdates from "@/components/student-corner/NTAUpdates";

type Section =
  | "motivation"
  | "relax"
  | "brain"
  | "pomodoro"
  | "wall"
  | "mood"
  | "stress"
  | "nta";

const sections: { id: Section; label: string; icon: React.ReactNode; emoji: string; gradient: string }[] = [
  { id: "nta", label: "NTA Updates", icon: <Bell className="w-4 h-4" />, emoji: "📢", gradient: "from-blue-400 to-cyan-400" },
  { id: "motivation", label: "Motivation", icon: <Sparkles className="w-4 h-4" />, emoji: "✨", gradient: "from-amber-400 to-orange-400" },
  { id: "relax", label: "Relax", icon: <Wind className="w-4 h-4" />, emoji: "🧘", gradient: "from-sky-400 to-indigo-400" },
  { id: "brain", label: "Brain Break", icon: <Gamepad2 className="w-4 h-4" />, emoji: "🧠", gradient: "from-violet-400 to-purple-400" },
  { id: "pomodoro", label: "Study Timer", icon: <Timer className="w-4 h-4" />, emoji: "⏰", gradient: "from-red-400 to-orange-400" },
  { id: "wall", label: "My Goals", icon: <StickyNote className="w-4 h-4" />, emoji: "🎯", gradient: "from-yellow-400 to-amber-400" },
  { id: "mood", label: "Mood", icon: <SmilePlus className="w-4 h-4" />, emoji: "😊", gradient: "from-fuchsia-400 to-pink-400" },
  { id: "stress", label: "Stress Help", icon: <Shield className="w-4 h-4" />, emoji: "💚", gradient: "from-teal-400 to-emerald-400" },
];

const StudentCorner = () => {
  const [activeSection, setActiveSection] = useState<Section>("nta");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
            Student Corner <span className="text-lg">🌟</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Your space to relax, recharge & stay motivated</p>
        </motion.div>
      </div>

      {/* Emergency Motivate Button */}
      <div className="px-5 mb-4">
        <EmergencyMotivation />
      </div>

      {/* Section Chips */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {sections.map((section, i) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                activeSection === section.id
                  ? `bg-gradient-to-r ${section.gradient} text-white shadow-sm`
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              <span>{section.emoji}</span>
              {section.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-5">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeSection === "motivation" && <MotivationBoost />}
          {activeSection === "relax" && <RelaxationTools />}
          {activeSection === "brain" && <BrainBreak />}
          {activeSection === "pomodoro" && <PomodoroTimer />}
          {activeSection === "wall" && <PositiveWall />}
          {activeSection === "mood" && <MoodTracker />}
          {activeSection === "stress" && <StressSupport />}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default StudentCorner;
