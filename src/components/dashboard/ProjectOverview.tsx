import React from "react";
import ProjectHeader from "./ProjectHeader";
import TaskBoard from "./TaskBoard";
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

import {
  generateProjectSuggestions,
  generateTaskSuggestions,
  AISuggestion,
} from "@/lib/ai-suggestions";
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

  const suggestions = React.useMemo(() => {
    const projectSuggestions = generateProjectSuggestions(allTasks);
    const taskSuggestions = allTasks.flatMap((task) =>
      generateTaskSuggestions(task),
    );
    return [...projectSuggestions, ...taskSuggestions];
  }, [allTasks]);

  const handleSuggestionClick = (suggestion: AISuggestion) => {
    // Si la sugerencia está relacionada con una tarea específica
    if (suggestion.taskId) {
      // Encuentra la columna y la tarea
      const column = columns.find((col) =>
        col.tasks.some((task) => task.id === suggestion.taskId),
      );
      if (column) {
        const task = column.tasks.find((t) => t.id === suggestion.taskId);
        if (task) {
          // Aquí podrías abrir el diálogo de edición de tarea
          console.log("Abrir tarea:", task);
        }
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full p-6 relative">
      <div
        className={`transition-all duration-300 ${isAIPanelOpen ? "mr-[400px]" : "mr-0"}`}
      >
        <div className="space-y-6">
          <ProjectHeader
            title={project.title}
            status={project.status}
            startDate={project.startDate}
            teamSize={project.teamSize}
            progress={project.progress}
          />

          <TaskBoard />
        </div>
      </div>

      <AIAssistantPanel
        isOpen={isAIPanelOpen}
        onClose={() => setIsAIPanelOpen(false)}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
};

export default ProjectOverview;
