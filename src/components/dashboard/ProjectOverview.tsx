import React from "react";
import MainContent from "./MainContent";
import AIAssistantPanel from "./AIAssistantPanel";

interface ProjectOverviewProps {
  project?: {
    title: string;
    status: "active" | "completed" | "on-hold";
    startDate: string;
    teamSize: number;
    progress: number;
  };
  showAIPanel?: boolean;
}

import { useTaskStore } from "@/store/tasks";

const ProjectOverview = ({
  project = {
    title: "Marketing Campaign 2024",
    status: "active",
    startDate: "2024-03-01",
    teamSize: 5,
    progress: 65,
  },
  showAIPanel = true,
}: ProjectOverviewProps) => {
  const [isAIPanelOpen, setIsAIPanelOpen] = React.useState(showAIPanel);
  const { columns } = useTaskStore();

  const allTasks = React.useMemo(() => {
    return columns.flatMap((col) => col.tasks);
  }, [columns]);

  const context = React.useMemo(() => {
    return {
      project,
      tasks: allTasks,
      taskCount: allTasks.length,
      highPriorityCount: allTasks.filter((t) => t.priority === "high").length,
    };
  }, [allTasks, project]);

  return (
    <div className="bg-gray-50 min-h-screen w-full p-6 relative">
      <div
        className={`transition-all duration-300 ${isAIPanelOpen ? "mr-[400px]" : "mr-0"}`}
      >
        <MainContent project={project} />
      </div>

      <AIAssistantPanel
        isOpen={isAIPanelOpen}
        onClose={() => setIsAIPanelOpen(false)}
        context={context}
      />
    </div>
  );
};

export default ProjectOverview;
