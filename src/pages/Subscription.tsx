import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check, ArrowLeft, Star, Zap, BookOpen, ClipboardList, Upload, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { usePremium } from "@/hooks/usePremium";
import BottomNav from "@/components/BottomNav";

const UPI_ID = "aaruthreshrk@okaxis";
const AMOUNT = 79;
const UPI_DEEP_LINK = `upi://pay?pa=${UPI_ID}&pn=NEET%20Navigator&am=${AMOUNT}&cu=INR&tn=Premium%20Subscription`;

const premiumFeatures = [
  { icon: BookOpen, text: "All subjects — Bio, Phys, Chem" },
  { icon: ClipboardList, text: "Full mock test series" },
  { icon: Zap, text: "AI-powered Smart Learning" },
  { icon: Crown, text: "Detailed performance analytics" },
];

const Subscription = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, loading: premiumLoading } = usePremium();
  const [submitting, setSubmitting] = useState(false);

  const handlePaymentDone = async () => {
    if (!user) {
      toast({ title: "Please sign in first", description: "You need to be logged in to activate premium." });
      navigate("/auth");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("subscriptions").upsert({
      user_id: user.id,
      amount: AMOUNT,
      status: "pending",
      payment_reference: `UPI-${Date.now()}`,
    }, { onConflict: "user_id" });

    setSubmitting(false);

    if (error) {
      toast({ title: "Error", description: "Could not submit payment. Try again." });
    } else {
      toast({
        title: "Payment submitted!",
        description: "Your premium access will be activated after verification (within 24 hours).",
      });
    }
  };

  // If already premium, show premium dashboard
  if (!premiumLoading && isPremium) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="gradient-hero px-5 pt-12 pb-8 rounded-b-3xl">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-foreground/70 mb-4">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground font-display">Premium Active ✨</h1>
                <p className="text-primary-foreground/70 text-sm">You have full access to all features</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="px-5 mt-6 space-y-4">
          {[
            { label: "All Subjects", desc: "Biology, Physics, Chemistry — full access", icon: "🧬", path: "/study" },
            { label: "Smart Learning", desc: "AI-powered video analysis & revision", icon: "🤖", path: "/smart-learning" },
            { label: "Full Test Series", desc: "Mock, weekly & monthly tests", icon: "📝", path: "/tests" },
            { label: "Progress Analytics", desc: "Detailed performance & reports", icon: "📊", path: "/progress" },
            { label: "Study Planner", desc: "AI-generated personalized plans", icon: "📅", path: "/study?view=planner" },
          ].map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(item.path)}
              className="w-full elevated-card rounded-2xl p-4 flex items-center gap-4 text-left hover:scale-[1.01] transition-transform"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-card-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-hero px-5 pt-12 pb-8 rounded-b-3xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-foreground/70 mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground font-display">Go Premium</h1>
              <p className="text-primary-foreground/70 text-sm">Unlock all NEET preparation features</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-5 -mt-4 space-y-6">
        {/* Price Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-6 border-primary bg-primary/5 ring-2 ring-primary/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Premium Plan</span>
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-4xl font-bold text-primary">₹{AMOUNT}</span>
              <span className="text-sm text-muted-foreground">/lifetime</span>
            </div>
            <p className="text-xs text-muted-foreground">One-time payment, full access forever</p>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-5 bg-card border-border/50">
            <h3 className="font-semibold text-foreground mb-3">What you get</h3>
            <ul className="space-y-2.5">
              {premiumFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  {f.text}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* QR Code Payment */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="p-5 bg-card border-border/50">
            <h3 className="font-semibold text-foreground mb-2 text-center">Scan & Pay ₹{AMOUNT}</h3>
            <p className="text-xs text-muted-foreground text-center mb-4">
              Scan the QR code below using any UPI app
            </p>
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <QRCodeSVG
                  value={UPI_DEEP_LINK}
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border mb-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">UPI ID</p>
                <p className="font-mono font-semibold text-foreground text-sm">{UPI_ID}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(UPI_ID);
                  toast({ title: "Copied!", description: "UPI ID copied to clipboard" });
                }}
              >
                Copy
              </Button>
            </div>

            <Button
              className="w-full"
              onClick={handlePaymentDone}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              I've Completed Payment
            </Button>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              After clicking, your premium access will be activated within 24 hours after verification.
            </p>
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Subscription;
