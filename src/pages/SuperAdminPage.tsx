import React from "react";
import SuperAdminSetup from "@/components/auth/SuperAdminSetup";
import Navigation from "@/components/layout/Navigation";

const SuperAdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Navigation />
        <div className="mt-8">
          <SuperAdminSetup />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPage;
