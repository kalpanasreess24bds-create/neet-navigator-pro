import { motion } from "framer-motion";
import { Crown, Check, Copy, ArrowLeft, Star, Zap, BookOpen, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const UPI_ID = "kalpanasreess150920@oksbi";

const plans = [
  {
    name: "Monthly",
    price: "₹199",
    period: "/month",
    features: [
      "All subjects — Biology, Physics, Chemistry",
      "Chapter-wise mock tests",
      "Weekly & Monthly tests",
      "Smart Study Planner",
      "Basic progress tracking",
    ],
    popular: false,
  },
  {
    name: "6 Months",
    price: "₹899",
    period: "/6 months",
    features: [
      "Everything in Monthly plan",
      "AI-powered Smart Learning",
      "Detailed performance analytics",
      "Priority doubt resolution",
      "Worksheets with explanations",
    ],
    popular: true,
    save: "Save 25%",
  },
  {
    name: "Yearly",
    price: "₹1499",
    period: "/year",
    features: [
      "Everything in 6 Months plan",
      "Full NEET mock test series",
      "Personalized weak topic analysis",
      "Revision scheduler",
      "Lifetime access to current year content",
    ],
    popular: false,
    save: "Save 37%",
  },
];

const Subscription = () => {
  const navigate = useNavigate();

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast({
      title: "UPI ID Copied!",
      description: `${UPI_ID} copied to clipboard. Pay using any UPI app.`,
    });
  };

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
        {/* Features highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5 bg-card border-border/50">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              Why Go Premium?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BookOpen, text: "600+ NEET MCQs" },
                { icon: ClipboardList, text: "Full Mock Tests" },
                { icon: Zap, text: "Smart AI Planner" },
                { icon: Crown, text: "Detailed Analytics" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  {item.text}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Plans */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Choose a Plan</h2>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
            >
              <Card
                className={`p-5 relative overflow-hidden ${
                  plan.popular
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border/50 bg-card"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs">
                    Most Popular
                  </Badge>
                )}
                {plan.save && (
                  <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
                    {plan.popular ? "" : plan.save}
                  </Badge>
                )}
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.save && plan.popular && (
                    <span className="text-xs text-primary font-medium">{plan.save}</span>
                  )}
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={copyUPI}
                  className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Pay via UPI
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* UPI Payment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-5 bg-card border-border/50">
            <h3 className="font-semibold text-foreground mb-3">Pay via UPI</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Copy the UPI ID below and pay using any UPI app (Google Pay, PhonePe, Paytm, etc.)
            </p>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">UPI ID</p>
                <p className="font-mono font-semibold text-foreground">{UPI_ID}</p>
              </div>
              <Button size="sm" variant="outline" onClick={copyUPI} className="gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              After payment, send the screenshot to our support for activation within 24 hours.
            </p>
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Subscription;
