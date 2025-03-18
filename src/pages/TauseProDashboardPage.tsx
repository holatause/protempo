import React from "react";
import TauseProDashboard from "@/components/dashboard/TauseProDashboard";
import Navigation from "@/components/layout/Navigation";

const TauseProDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <TauseProDashboard />
    </div>
  );
};

export default TauseProDashboardPage;
