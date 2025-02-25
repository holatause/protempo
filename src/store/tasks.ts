import { create } from "zustand";
import type { TaskState } from "@/types/task";

export const useTaskStore = create<TaskState>((set) => ({
  columns: [
    {
      id: "todo",
      title: "To Do",
      color: "bg-gray-100",
      tasks: [
        {
          id: "1",
          title: "Create social media campaign",
          description: "Design and plan Q2 social media campaign for client",
          dueDate: "2024-04-15",
          priority: "high",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "bg-blue-50",
      tasks: [],
    },
    {
      id: "review",
      title: "Review",
      color: "bg-yellow-50",
      tasks: [],
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-50",
      tasks: [],
    },
  ],
  moveTask: (sourceCol, destCol, sourceIndex, destIndex) =>
    set((state) => {
      const newColumns = [...state.columns];
      const sourceColumn = newColumns.find((col) => col.id === sourceCol);
      const destColumn = newColumns.find((col) => col.id === destCol);

      if (!sourceColumn || !destColumn) return state;

      const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
      destColumn.tasks.splice(destIndex, 0, movedTask);

      return { columns: newColumns };
    }),
  addTask: (columnId, task) =>
    set((state) => {
      const newColumns = [...state.columns];
      const column = newColumns.find((col) => col.id === columnId);
      if (!column) return state;

      column.tasks.push(task);
      return { columns: newColumns };
    }),
  updateTask: (columnId, taskId, updates) =>
    set((state) => {
      const newColumns = [...state.columns];
      const column = newColumns.find((col) => col.id === columnId);
      if (!column) return state;

      const task = column.tasks.find((t) => t.id === taskId);
      if (!task) return state;

      Object.assign(task, updates);
      return { columns: newColumns };
    }),
}));
