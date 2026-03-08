import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, GraduationCap, User, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    targetYear: "2026",
    classLevel: "",
    medium: "english",
  });

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else {
      localStorage.setItem("neet-user", JSON.stringify(formData));
      navigate("/dashboard");
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-hero">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm mb-4">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
          <span className="text-sm font-semibold text-primary-foreground">NEET Mastery</span>
        </div>
        <h1 className="text-3xl font-bold text-primary-foreground font-display">
          Your NEET Journey<br />Starts Here
        </h1>
      </motion.div>

      <div className="w-full max-w-sm">
        {/* Step indicators */}
        <div className="flex gap-2 mb-6 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-8 gradient-accent" : i < step ? "w-4 bg-primary/40" : "w-4 bg-primary-foreground/20"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="elevated-card rounded-2xl p-6"
          >
            {step === 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-card-foreground">Create Account</h2>
                    <p className="text-xs text-muted-foreground">Enter your credentials</p>
                  </div>
                </div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-secondary border-0"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-secondary border-0"
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-card-foreground">Profile Setup</h2>
                    <p className="text-xs text-muted-foreground">Tell us about yourself</p>
                  </div>
                </div>
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-secondary border-0"
                />
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">I am a</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Class 11", "Class 12", "Dropper"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFormData({ ...formData, classLevel: level })}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                          formData.classLevel === level
                            ? "gradient-primary text-primary-foreground shadow-md"
                            : "bg-secondary text-secondary-foreground hover:bg-muted"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-card-foreground">Preferences</h2>
                    <p className="text-xs text-muted-foreground">Customize your learning</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Target Year</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["2025", "2026", "2027"].map((year) => (
                      <button
                        key={year}
                        onClick={() => setFormData({ ...formData, targetYear: year })}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                          formData.targetYear === year
                            ? "gradient-primary text-primary-foreground shadow-md"
                            : "bg-secondary text-secondary-foreground hover:bg-muted"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Language Medium</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "english", label: "English" },
                      { value: "hindi", label: "हिंदी" },
                    ].map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => setFormData({ ...formData, medium: lang.value })}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                          formData.medium === lang.value
                            ? "gradient-accent text-accent-foreground shadow-md"
                            : "bg-secondary text-secondary-foreground hover:bg-muted"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleNext}
              className="w-full mt-6 gradient-primary text-primary-foreground border-0 rounded-xl h-12 font-semibold text-sm gap-2"
            >
              {step === 2 ? "Start Learning" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
