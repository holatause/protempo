import React from "react";
import Navigation from "@/components/layout/Navigation";
import UserPreferences from "@/components/theme/UserPreferences";

const PreferencesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <UserPreferences />
      </div>
    </div>
  );
};

export default PreferencesPage;
