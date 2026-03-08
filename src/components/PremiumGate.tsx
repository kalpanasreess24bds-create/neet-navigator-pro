import { motion } from "framer-motion";
import { Crown, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePremium } from "@/hooks/usePremium";

interface PremiumGateProps {
  children: React.ReactNode;
  featureName?: string;
}

const PremiumGate = ({ children, featureName = "This feature" }: PremiumGateProps) => {
  const { isPremium, loading } = usePremium();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="gradient-hero px-5 pt-12 pb-6 rounded-b-3xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-foreground/70 mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-5 max-w-xs"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto relative">
            <Crown className="w-9 h-9 text-primary" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-muted flex items-center justify-center border-2 border-background">
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground font-display">Premium Feature</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {featureName} is available for premium members. Upgrade to unlock full access.
            </p>
          </div>

          <div className="space-y-3 w-full pt-2">
            <Button className="w-full h-12 text-base font-semibold gap-2" onClick={() => navigate("/subscription")}>
              <Crown className="w-5 h-5" />
              Unlock for ₹79
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate("/")}>
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumGate;
