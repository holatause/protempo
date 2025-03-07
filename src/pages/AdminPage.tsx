import React from "react";
import Navigation from "@/components/layout/Navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminPage;
