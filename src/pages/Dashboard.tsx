import React, { useState } from "react";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import ProjectList from "@/components/dashboard/ProjectList";
import Navigation from "@/components/layout/Navigation";
import { useTaskStore } from "@/store/tasks";

const Dashboard = () => {
  const { currentProjectId } = useTaskStore();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Navigation />
        {currentProjectId ? <ProjectOverview /> : <ProjectList />}
      </div>
    </div>
  );
};

export default Dashboard;
