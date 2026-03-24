import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import NearbyCoachingMap from "@/components/NearbyCoachingMap";

const CoachingCentres = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-12 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> Nearby Coaching Centres
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Find top NEET coaching institutes near you
          </p>
        </motion.div>
      </div>

      <div className="px-5">
        <NearbyCoachingMap />
      </div>

      <BottomNav />
    </div>
  );
};

export default CoachingCentres;
