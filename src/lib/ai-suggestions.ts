import { Task } from "@/types/task";

export type SuggestionType = "content" | "optimization" | "strategy";

export interface AISuggestion {
  id: string;
  type: SuggestionType;
  content: string;
  taskId?: string;
  confidence: number;
}

export const generateTaskSuggestions = (task: Task): AISuggestion[] => {
  // Simulación de IA - En producción esto llamaría a una API de IA
  const suggestions: AISuggestion[] = [];

  if (task.title.toLowerCase().includes("social media")) {
    suggestions.push({
      id: crypto.randomUUID(),
      type: "content",
      content:
        "Considera usar más contenido visual para aumentar el engagement",
      taskId: task.id,
      confidence: 0.85,
    });
  }

  if (task.priority === "high") {
    suggestions.push({
      id: crypto.randomUUID(),
      type: "strategy",
      content:
        "Basado en análisis previos, las publicaciones a las 3PM tienen mejor engagement",
      taskId: task.id,
      confidence: 0.92,
    });
  }

  return suggestions;
};

export const generateProjectSuggestions = (tasks: Task[]): AISuggestion[] => {
  const suggestions: AISuggestion[] = [];

  const highPriorityTasks = tasks.filter((t) => t.priority === "high").length;
  if (highPriorityTasks > 3) {
    suggestions.push({
      id: crypto.randomUUID(),
      type: "optimization",
      content:
        "Hay muchas tareas de alta prioridad. Considera redistribuir la carga de trabajo.",
      confidence: 0.88,
    });
  }

  return suggestions;
};
