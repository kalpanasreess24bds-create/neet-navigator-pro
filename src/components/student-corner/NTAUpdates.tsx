import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, ExternalLink, RefreshCw, Calendar, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

interface NTAUpdate {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: "exam" | "result" | "registration" | "notice" | "syllabus";
  important: boolean;
  link?: string;
}

const ntaUpdates: NTAUpdate[] = [
  {
    id: "1",
    title: "NEET UG 2026 Registration Opens",
    summary: "NTA has opened the registration window for NEET UG 2026. Students can apply on the official NTA website. Last date to register without late fee is approaching.",
    date: "2026-03-01",
    type: "registration",
    important: true,
    link: "https://neet.nta.nic.in",
  },
  {
    id: "2",
    title: "NEET 2026 Exam Date Announced",
    summary: "NEET UG 2026 is scheduled to be held in the first week of May 2026. Admit cards will be released 15 days before the exam.",
    date: "2026-02-20",
    type: "exam",
    important: true,
  },
  {
    id: "3",
    title: "Revised Syllabus Clarification",
    summary: "NTA confirms NEET 2026 will follow the revised NCERT syllabus. Chapters removed from NCERT will not be asked in the exam.",
    date: "2026-02-15",
    type: "syllabus",
    important: false,
  },
  {
    id: "4",
    title: "Correction Window for Application Form",
    summary: "The correction window for NEET UG 2026 application form is now open. Students can edit their details including photo, signature, and category.",
    date: "2026-03-05",
    type: "notice",
    important: false,
  },
  {
    id: "5",
    title: "NEET 2025 Final Answer Key Released",
    summary: "NTA has released the final answer key for NEET UG 2025. Students can download it from the official website.",
    date: "2026-01-28",
    type: "result",
    important: false,
  },
  {
    id: "6",
    title: "City Intimation Slip Available Soon",
    summary: "NTA will release city intimation slips for NEET UG 2026 one month before the exam date. Check your registered email.",
    date: "2026-03-07",
    type: "exam",
    important: true,
  },
];

const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  exam: { icon: <Calendar className="w-3.5 h-3.5" />, color: "text-primary", bg: "bg-primary/10", label: "Exam" },
  result: { icon: <CheckCircle2 className="w-3.5 h-3.5" />, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Result" },
  registration: { icon: <Bell className="w-3.5 h-3.5" />, color: "text-amber-500", bg: "bg-amber-500/10", label: "Registration" },
  notice: { icon: <Info className="w-3.5 h-3.5" />, color: "text-sky-500", bg: "bg-sky-500/10", label: "Notice" },
  syllabus: { icon: <AlertTriangle className="w-3.5 h-3.5" />, color: "text-violet-500", bg: "bg-violet-500/10", label: "Syllabus" },
};

const NTAUpdates = () => {
  const [filter, setFilter] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);

  const filtered = filter === "all" ? ntaUpdates : ntaUpdates.filter((u) => u.type === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "exam", label: "Exam" },
    { id: "registration", label: "Registration" },
    { id: "result", label: "Results" },
    { id: "syllabus", label: "Syllabus" },
    { id: "notice", label: "Notices" },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="elevated-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground text-sm">NTA Updates</h3>
            <p className="text-[10px] text-muted-foreground">Latest NEET exam notifications</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-muted-foreground ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap shrink-0 transition-all ${
              filter === f.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Updates List */}
      <div className="space-y-3">
        {sorted.map((update, i) => {
          const config = typeConfig[update.type];
          return (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`elevated-card rounded-xl p-4 space-y-2 ${
                update.important ? "ring-1 ring-primary/20" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center shrink-0 ${config.color}`}>
                    {config.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-foreground truncate">{update.title}</p>
                      {update.important && (
                        <span className="shrink-0 px-1.5 py-0.5 bg-destructive/10 text-destructive text-[9px] font-bold rounded-md">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-medium ${config.color}`}>{config.label}</span>
                      <span className="text-[10px] text-muted-foreground">• {formatDate(update.date)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{update.summary}</p>

              {update.link && (
                <a
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                >
                  Visit NTA Website <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No updates in this category</p>
        </div>
      )}
    </div>
  );
};

export default NTAUpdates;
