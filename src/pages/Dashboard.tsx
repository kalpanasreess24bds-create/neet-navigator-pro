import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, FlaskConical, Atom, TrendingUp, Play, Clock, BarChart3, Crown, Shield, LogOut, MapPin, FileText, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ProgressRing from "@/components/ProgressRing";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const recentlyWatched = [
  { title: "Cell: The Unit of Life", subject: "Botany", progress: 0, icon: "🌿" },
  { title: "Chemical Bonding", subject: "Chemistry", progress: 0, icon: "⚗️" },
  { title: "Laws of Motion", subject: "Physics", progress: 0, icon: "⚛️" },
];

const subjects = [
  { label: "Physics", icon: "⚛️", count: 29, tint: "tint-physics", accent: "text-sky-700" },
  { label: "Chemistry", icon: "⚗️", count: 30, tint: "tint-chemistry", accent: "text-violet-700" },
  { label: "Botany", icon: "🌿", count: 19, tint: "tint-botany", accent: "text-emerald-700" },
  { label: "Zoology", icon: "🦋", count: 19, tint: "tint-zoology", accent: "text-orange-700" },
];

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

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
    <div className="min-h-screen bg-background pb-24">
      {/* Header — airy, calm */}
      <div className="px-6 pt-12 pb-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">{getGreeting()},</p>
            <h1 className="text-2xl font-semibold text-slate-800 mt-0.5">
              {localUser.name || "Student"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">Let's make gentle progress today.</p>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => navigate("/neet-admin-x9k2")}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <Shield className="w-4 h-4 text-slate-600" />
              </button>
            )}
            <button
              onClick={() => navigate("/subscription")}
              className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center hover:bg-sky-100 transition-colors"
            >
              <Crown className="w-5 h-5 text-amber-400" />
            </button>
            <button
              onClick={async () => {
                await signOut();
                localStorage.removeItem("neet-user");
                navigate("/auth");
              }}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <LogOut className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="px-6 space-y-8">
        {/* HERO — Resume Last Topic, gentle blue gradient */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/study")}
          className="w-full gradient-resume rounded-2xl p-6 text-left shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/85 uppercase tracking-wider">Continue where you left off</p>
              <h2 className="text-xl font-semibold text-white mt-2">Cell: The Unit of Life</h2>
              <p className="text-sm text-white/85 mt-1">Botany · Chapter 8</p>
              <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Play className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Resume</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-3xl shrink-0">
              🌿
            </div>
          </div>
        </motion.button>

        {/* DAILY GOALS — sage green progress rings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-800">Today's Goals</h2>
            <span className="text-xs text-slate-500">0 of 7 done</span>
          </div>
          <div className="elevated-card p-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Study", value: 0, icon: BookOpen },
                { label: "Practice", value: 0, icon: Target },
                { label: "Revise", value: 0, icon: TrendingUp },
              ].map((g) => (
                <div key={g.label} className="flex flex-col items-center gap-2">
                  <ProgressRing progress={g.value} size={64} strokeWidth={6} />
                  <div className="text-center">
                    <p className="text-xs font-medium text-slate-700">{g.label}</p>
                    <p className="text-[11px] text-slate-500">{g.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* MOCK TEST CTA — soft sage */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          onClick={() => navigate("/tests")}
          className="w-full rounded-2xl p-5 bg-emerald-50 border border-emerald-100 flex items-center gap-4 text-left hover:bg-emerald-100/70 transition-colors"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-400 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-emerald-900">Today's Mock Test</p>
            <p className="text-xs text-emerald-700/80 mt-0.5">A gentle 30-minute check-in</p>
          </div>
        </motion.button>

        {/* SUBJECTS — 4 pastel tinted cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-base font-semibold text-slate-800 mb-4">Syllabus</h2>
          <div className="grid grid-cols-2 gap-4">
            {subjects.map((subj) => (
              <button
                key={subj.label}
                onClick={() => navigate("/study")}
                className={`${subj.tint} rounded-2xl p-5 text-left hover:shadow-md transition-shadow border border-white/60 min-h-[120px] flex flex-col justify-between`}
              >
                <span className="text-3xl">{subj.icon}</span>
                <div>
                  <p className={`text-base font-semibold ${subj.accent}`}>{subj.label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{subj.count} chapters</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recently Studied */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-base font-semibold text-slate-800 mb-4">Recently Studied</h2>
          <div className="space-y-3">
            {recentlyWatched.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="elevated-card p-5 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate("/study")}
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-slate-800 truncate">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.subject}</p>
                  <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                <Play className="w-5 h-5 text-sky-500 shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Secondary nav */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate("/progress")}
            className="rounded-2xl p-5 bg-white border border-slate-200 flex flex-col gap-3 hover:shadow-md transition-shadow text-left min-h-[100px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Analytics</p>
              <p className="text-xs text-slate-500 mt-0.5">Track your progress</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/coaching-centres")}
            className="rounded-2xl p-5 bg-white border border-slate-200 flex flex-col gap-3 hover:shadow-md transition-shadow text-left min-h-[100px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Coaching Centres</p>
              <p className="text-xs text-slate-500 mt-0.5">Find institutes nearby</p>
            </div>
          </button>
        </motion.div>

      </div>


      <BottomNav />
    </div>
  );
};

export default Dashboard;
