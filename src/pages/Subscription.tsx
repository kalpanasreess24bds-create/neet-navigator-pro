import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, ArrowLeft, Star, Zap, BookOpen, ClipboardList, Loader2, CheckCircle2, Copy, Smartphone, QrCode, CircleDot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { usePremium } from "@/hooks/usePremium";
import BottomNav from "@/components/BottomNav";

const UPI_ID = "8754619672@ibl";
const AMOUNT = 79;
const UPI_QR_LINK = `upi://pay?pa=${UPI_ID}&pn=NEET%20Navigator`;
const UPI_DEEP_LINK = `upi://pay?pa=${UPI_ID}&pn=NEET%20Navigator&am=${AMOUNT}&cu=INR&tn=Premium%20Monthly%20Subscription`;

const premiumFeatures = [
  { icon: BookOpen, text: "All subjects — Bio, Phys, Chem", detail: "Class 11 & 12 full access" },
  { icon: ClipboardList, text: "Full mock test series", detail: "Weekly, monthly & grand tests" },
  { icon: Zap, text: "AI-powered Smart Learning", detail: "Video analysis & revision tools" },
  { icon: Crown, text: "Detailed performance analytics", detail: "Track your NEET journey" },
];

const steps = [
  { num: 1, label: "Scan QR or copy UPI ID", icon: QrCode },
  { num: 2, label: "Pay ₹79 using any UPI app", icon: Smartphone },
  { num: 3, label: "Tap 'I've Paid' below", icon: CheckCircle2 },
];

const Subscription = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, loading: premiumLoading } = usePremium();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast({ title: "Copied!", description: "UPI ID copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

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
      setSubmitted(true);
    }
  };

  // Premium active view
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

  // Success state after submitting payment
  if (submitted) {
    return (
      <div className="min-h-screen bg-background pb-24 flex flex-col">
        <div className="gradient-hero px-5 pt-12 pb-8 rounded-b-3xl">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-foreground/70 mb-4">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
          </motion.div>
        </div>
        <div className="flex-1 flex items-center justify-center px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 max-w-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>
            <h2 className="text-xl font-bold text-foreground font-display">Payment Submitted! 🎉</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your payment is being verified. Premium access will be activated within <strong className="text-foreground">24 hours</strong>.
            </p>
            <p className="text-xs text-muted-foreground">
              You'll get full access to all subjects, tests & smart learning features once verified.
            </p>
            <Button onClick={() => navigate("/")} className="w-full mt-4">
              Back to Dashboard
            </Button>
          </motion.div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-hero px-5 pt-12 pb-10 rounded-b-3xl">
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

      <div className="px-5 -mt-6 space-y-5">
        {/* Price Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-5 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 ring-2 ring-primary/20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
              MONTHLY
            </div>
            <div className="flex items-center justify-center gap-2 mb-2 mt-1">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary">Premium Plan</span>
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-4xl font-bold text-primary">₹{AMOUNT}</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <p className="text-xs text-muted-foreground">Cancel anytime • Full access to all features</p>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-4 bg-card border-border/50">
            <h3 className="font-semibold text-foreground mb-3 text-sm">What you unlock</h3>
            <div className="grid grid-cols-2 gap-3">
              {premiumFeatures.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl bg-muted/30 border border-border/30">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-foreground leading-tight">{f.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{f.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* How to Pay - Step by Step */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-4 bg-card border-border/50">
            <h3 className="font-semibold text-foreground mb-3 text-sm">How to pay — 3 easy steps</h3>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={step.num} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{step.num}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <step.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-foreground">{step.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* QR Code & Payment */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="p-5 bg-card border-border/50 space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-foreground text-base">Scan & Pay ₹{AMOUNT}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Use Google Pay, PhonePe, Paytm or any UPI app
              </p>
              <p className="text-xs font-medium text-primary mt-1">
                ⚠️ Enter ₹{AMOUNT} manually after scanning
              </p>
            </div>

            {/* QR Code - without amount to avoid UPI app restrictions */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-md border border-border/20">
                <QRCodeSVG
                  value={UPI_QR_LINK}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>

            {/* UPI ID with copy */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">UPI ID</p>
                <p className="font-mono font-semibold text-foreground text-sm truncate">{UPI_ID}</p>
              </div>
              <Button
                size="sm"
                variant={copied ? "default" : "outline"}
                onClick={handleCopyUPI}
                className="shrink-0 gap-1.5"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            {/* Pay on mobile button */}
            <a
              href={UPI_DEEP_LINK}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-muted/50 border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Smartphone className="w-4 h-4" />
              Open UPI App on this device
            </a>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs text-muted-foreground">After payment</span>
              </div>
            </div>

            {/* Confirm button */}
            <Button
              className="w-full h-12 text-base font-semibold gap-2"
              onClick={handlePaymentDone}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
              {submitting ? "Submitting..." : "I've Paid ₹79"}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              Premium activates within <strong>24 hours</strong> after we verify your payment. No extra charges.
            </p>
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Subscription;
