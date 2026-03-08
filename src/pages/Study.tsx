import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, FileText, Layers, Play, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { studyData, type ClassData, type Subject, type Chapter } from "@/data/studyContent";

const Study = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleBack = () => {
    if (selectedSubject) setSelectedSubject(null);
    else if (selectedClass) setSelectedClass(null);
  };

  const title = selectedSubject
    ? selectedSubject.name
    : selectedClass
    ? selectedClass.name
    : "Study Material";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        {(selectedClass || selectedSubject) && (
          <button onClick={handleBack} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
        )}
        <h1 className="text-xl font-bold font-display text-foreground">{title}</h1>
      </div>

      <div className="px-5">
        <AnimatePresence mode="wait">
          {/* Class Selection */}
          {!selectedClass && (
            <motion.div
              key="classes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {studyData.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls)}
                  className="w-full elevated-card rounded-2xl p-5 flex items-center justify-between hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground font-display">{cls.id}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-display font-bold text-card-foreground">{cls.name}</p>
                      <p className="text-xs text-muted-foreground">{cls.subjects.length} subjects</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </motion.div>
          )}

          {/* Subject Selection */}
          {selectedClass && !selectedSubject && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-3"
            >
              {selectedClass.subjects.map((subj) => {
                const avgProgress = Math.round(
                  subj.chapters.reduce((s, c) => s + c.progress, 0) / subj.chapters.length
                );
                return (
                  <button
                    key={subj.id}
                    onClick={() => setSelectedSubject(subj)}
                    className="w-full elevated-card rounded-2xl p-5 flex items-center justify-between hover:scale-[1.01] transition-transform"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: subj.color + "20" }}
                      >
                        {subj.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-display font-bold text-card-foreground">{subj.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {subj.chapters.length} chapters • {avgProgress}% complete
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* Chapter List */}
          {selectedSubject && (
            <motion.div
              key="chapters"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-3"
            >
              {selectedSubject.chapters.map((ch, i) => (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="elevated-card rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        backgroundColor: selectedSubject.color + "15",
                        color: selectedSubject.color,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-card-foreground">{ch.name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="flex items-center gap-1 text-xs text-primary font-medium">
                          <Play className="w-3.5 h-3.5" /> Video
                        </button>
                        {ch.hasPdf && (
                          <button className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <FileText className="w-3.5 h-3.5" /> Notes
                          </button>
                        )}
                        {ch.hasFlashcards && (
                          <button className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <Layers className="w-3.5 h-3.5" /> Cards
                          </button>
                        )}
                      </div>
                      {ch.progress > 0 && (
                        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${ch.progress}%`,
                              backgroundColor: selectedSubject.color,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};

export default Study;
