import React from "react";
import UnifiedDashboard from "@/components/dashboard/UnifiedDashboard";
import Navigation from "@/components/layout/Navigation";

const UnifiedDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <UnifiedDashboard />
    </div>
  );
};

export default UnifiedDashboardPage;
