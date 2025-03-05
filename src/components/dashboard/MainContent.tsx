import React from "react";
import ProjectHeader from "./ProjectHeader";
import TaskBoard from "./TaskBoard";
import ContentGenerator from "./ContentGenerator";

interface MainContentProps {
  project?: {
    title: string;
    status: "active" | "completed" | "on-hold";
    startDate: string;
    teamSize: number;
    progress: number;
  };
}

const MainContent = ({
  project = {
    title: "Marketing Campaign 2024",
    status: "active",
    startDate: "2024-03-01",
    teamSize: 5,
    progress: 65,
  },
}: MainContentProps) => {
  return (
    <div className="space-y-6 w-full">
      <ProjectHeader
        title={project.title}
        status={project.status}
        startDate={project.startDate}
        teamSize={project.teamSize}
        progress={project.progress}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TaskBoard />
        </div>
        <div>
          <ContentGenerator />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
