import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, FlaskConical, Atom, TrendingUp, Play, Clock, BarChart3, Crown, Shield, LogOut, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ProgressRing from "@/components/ProgressRing";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const recentlyWatched = [
  { title: "Cell: The Unit of Life", subject: "Biology", progress: 0, icon: "🧬" },
  { title: "Chemical Bonding", subject: "Chemistry", progress: 0, icon: "⚗️" },
  { title: "Laws of Motion", subject: "Physics", progress: 0, icon: "⚛️" },
];

const quickActions = [
  { label: "Biology", icon: "🧬", count: 38, color: "hsl(152 60% 45%)" },
  { label: "Chemistry", icon: "⚗️", count: 30, color: "hsl(243 75% 55%)" },
  { label: "Physics", icon: "⚛️", count: 29, color: "hsl(38 92% 55%)" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user: authUser, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const localUser = JSON.parse(localStorage.getItem("neet-user") || '{"name":"Student"}');

  // Check for unread notifications
  useEffect(() => {
    if (!authUser) return;
    const checkNotifications = async () => {
      const { data: notifications } = await supabase
        .from("notifications" as any)
        .select("*")
        .eq("user_id", authUser.id)
        .eq("read", false)
        .order("created_at", { ascending: false });

      if (notifications && notifications.length > 0) {
        for (const notif of notifications as any[]) {
          if (notif.type === "success") {
            toast.success(notif.title, { description: notif.message, duration: 8000 });
          } else if (notif.type === "error") {
            toast.error(notif.title, { description: notif.message, duration: 8000 });
          } else {
            toast(notif.title, { description: notif.message, duration: 8000 });
          }
          // Mark as read
          await supabase
            .from("notifications" as any)
            .update({ read: true } as any)
            .eq("id", notif.id);
        }
      }
    };
    checkNotifications();

    const checkAdmin = async () => {
      const { data } = await supabase
        .from("user_roles" as any)
        .select("role")
        .eq("user_id", authUser.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    };
    checkAdmin();
  }, [authUser]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-hero px-5 pt-12 pb-8 rounded-b-3xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/70 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold text-primary-foreground font-display">
              {localUser.name || "Student"} 👋
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => navigate("/neet-admin-x9k2")}
                className="w-9 h-9 rounded-xl bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <Shield className="w-4 h-4 text-primary-foreground/70" />
              </button>
            )}
            <button
              onClick={() => navigate("/subscription")}
              className="w-9 h-9 rounded-xl bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
            >
              <Crown className="w-5 h-5 text-yellow-300" />
            </button>
            <button
              onClick={async () => {
                await signOut();
                localStorage.removeItem("neet-user");
                navigate("/auth");
              }}
              className="w-9 h-9 rounded-xl bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
            >
              <LogOut className="w-4 h-4 text-primary-foreground/70" />
            </button>
          </div>
        </motion.div>

        {/* Daily Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5 rounded-2xl p-4 bg-card text-card-foreground shadow-sm border border-border"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-muted-foreground">Daily Progress</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground font-display">0%</p>
              <p className="text-xs text-muted-foreground mt-0.5">0 of 7 tasks done today</p>
            </div>
            <ProgressRing progress={0} size={64} strokeWidth={5} />
          </div>
        </motion.div>
      </div>

      {/* Progress Dashboard Link */}
      <div className="px-5 mt-4">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => navigate("/progress")}
          className="w-full rounded-2xl p-4 bg-primary flex items-center gap-3 hover:scale-[1.01] transition-transform shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-primary-foreground">Progress Dashboard</p>
            <p className="text-xs text-primary-foreground/60">View reports & parent access</p>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          onClick={() => navigate("/coaching-centres")}
          className="w-full rounded-2xl p-4 bg-accent flex items-center gap-3 hover:scale-[1.01] transition-transform shadow-md mt-3"
        >
          <div className="w-10 h-10 rounded-xl bg-accent-foreground/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-accent-foreground">Nearby Coaching Centres</p>
            <p className="text-xs text-accent-foreground/60">Find top NEET institutes near you</p>
          </div>
        </motion.button>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Subject Quick Access */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display font-bold text-base text-foreground mb-3">Subjects</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((subj) => (
              <button
                key={subj.label}
                onClick={() => navigate("/study")}
                className="elevated-card rounded-2xl p-4 text-center hover:scale-[1.02] transition-transform"
              >
                <span className="text-2xl">{subj.icon}</span>
                <p className="text-sm font-semibold text-card-foreground mt-2">{subj.label}</p>
                <p className="text-xs text-muted-foreground">{subj.count} chapters</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recently Watched */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display font-bold text-base text-foreground mb-3">Continue Learning</h2>
          <div className="space-y-3">
            {recentlyWatched.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="elevated-card rounded-xl p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform cursor-pointer"
                onClick={() => navigate("/study")}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-card-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subject}</p>
                  <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                <Play className="w-5 h-5 text-primary shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
