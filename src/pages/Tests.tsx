import { useState } from "react";
import BottomNav from "@/components/BottomNav";

import TestDashboardHome from "@/components/test-dashboard/TestDashboardHome";
import MockTestSection from "@/components/test-dashboard/MockTestSection";
import WorksheetSection from "@/components/test-dashboard/WorksheetSection";
import WeeklyTestSection from "@/components/test-dashboard/WeeklyTestSection";
import MonthlyTestSection from "@/components/test-dashboard/MonthlyTestSection";
import { TestCategory } from "@/types/testDashboard";

const Tests = () => {
  const [activeCategory, setActiveCategory] = useState<TestCategory | null>(null);

  const renderContent = () => {
    switch (activeCategory) {
      case "mock":
        return <MockTestSection onBack={() => setActiveCategory(null)} />;
      case "worksheet":
        return <WorksheetSection onBack={() => setActiveCategory(null)} />;
      case "weekly":
        return <WeeklyTestSection onBack={() => setActiveCategory(null)} />;
      case "monthly":
        return <MonthlyTestSection onBack={() => setActiveCategory(null)} />;
      default:
        return <TestDashboardHome onSelect={setActiveCategory} />;
    }
  };

  return (
    <PremiumGate featureName="Full Test Series">
      <div className="min-h-screen bg-background pb-20">
        <div className="px-5 pt-12 pb-4">
          {renderContent()}
        </div>
        <BottomNav />
      </div>
    </PremiumGate>
  );
};

export default Tests;
