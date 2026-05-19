import { Home, BookOpen, ClipboardList, MessageCircle, Smile } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Home" },
  { path: "/study", icon: BookOpen, label: "Study" },
  { path: "/tests", icon: ClipboardList, label: "Tests" },
  { path: "/student-corner", icon: Smile, label: "Corner" },
  { path: "/chat", icon: MessageCircle, label: "Chat" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-slate-200/80">
      <div className="flex items-center justify-around px-2 py-2.5 max-w-lg mx-auto safe-area-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-colors min-w-[56px]"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-2xl bg-sky-50"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                className={`w-5 h-5 transition-colors relative z-10 ${
                  isActive ? "text-sky-600" : "text-slate-400"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors relative z-10 ${
                  isActive ? "text-sky-700" : "text-slate-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
