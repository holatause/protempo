import { create } from "zustand";
import { taskService, type Task as SupabaseTask } from "@/lib/services";
import type { Column, TaskState } from "@/types/task";
import { v4 as uuidv4 } from "uuid";

// Función para convertir tareas de Supabase al formato de la aplicación
const mapSupabaseTaskToAppTask = (task: SupabaseTask) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  dueDate: task.due_date || undefined,
  priority: task.priority,
  comments: task.comments_count,
  aiSuggestions: [],
});

// Columnas predefinidas
const defaultColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-gray-100",
    tasks: [],
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
];

export const useTaskStore = create<TaskState>((set, get) => ({
  columns: [...defaultColumns],
  isLoading: false,
  error: null,
  currentProjectId: null,

  // Cargar tareas desde Supabase
  fetchTasks: async (projectId: string) => {
    try {
      set({ isLoading: true, error: null, currentProjectId: projectId });

      const tasks = await taskService.getTasks(projectId);

      // Agrupar tareas por estado
      const columns = [...defaultColumns];

      tasks.forEach((task) => {
        const column = columns.find((col) => col.id === task.status);
        if (column) {
          column.tasks.push(mapSupabaseTaskToAppTask(task));
        }
      });

      set({ columns, isLoading: false });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      set({ error: "Failed to load tasks", isLoading: false });
    }
  },

  // Mover tarea entre columnas
  moveTask: async (sourceCol, destCol, sourceIndex, destIndex) => {
    // Optimistic update
    set((state) => {
      const newColumns = [...state.columns];
      const sourceColumn = newColumns.find((col) => col.id === sourceCol);
      const destColumn = newColumns.find((col) => col.id === destCol);

      if (!sourceColumn || !destColumn) return state;

      const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
      destColumn.tasks.splice(destIndex, 0, movedTask);

      return { columns: newColumns };
    });

    // Update in Supabase
    try {
      const state = get();
      const task = state.columns.find((col) => col.id === destCol)?.tasks[
        destIndex
      ];

      if (task && state.currentProjectId) {
        await taskService.moveTask(task.id, destCol);
      }
    } catch (error) {
      console.error("Error moving task:", error);
      // Revert on error
      get().fetchTasks(get().currentProjectId!);
    }
  },

  // Añadir tarea
  addTask: async (columnId, task) => {
    const projectId = get().currentProjectId;
    if (!projectId) return;

    // Optimistic update
    const newTask = {
      ...task,
      id: task.id || uuidv4(),
    };

    set((state) => {
      const newColumns = [...state.columns];
      const column = newColumns.find((col) => col.id === columnId);
      if (!column) return state;

      column.tasks.push(newTask);
      return { columns: newColumns };
    });

    // Update in Supabase
    try {
      await taskService.createTask({
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        due_date: newTask.dueDate || null,
        priority: newTask.priority,
        status: columnId,
        comments_count: 0,
        project_id: projectId,
        user_id: "current-user-id", // TODO: Get from auth
      });
    } catch (error) {
      console.error("Error adding task:", error);
      // Revert on error
      get().fetchTasks(projectId);
    }
  },

  // Actualizar tarea
  updateTask: async (columnId, taskId, updates) => {
    // Optimistic update
    set((state) => {
      const newColumns = [...state.columns];
      const column = newColumns.find((col) => col.id === columnId);
      if (!column) return state;

      const task = column.tasks.find((t) => t.id === taskId);
      if (!task) return state;

      Object.assign(task, updates);
      return { columns: newColumns };
    });

    // Update in Supabase
    try {
      await taskService.updateTask(taskId, {
        title: updates.title,
        description: updates.description,
        due_date: updates.dueDate || null,
        priority: updates.priority,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      // Revert on error
      const projectId = get().currentProjectId;
      if (projectId) get().fetchTasks(projectId);
    }
  },

  // Eliminar tarea
  deleteTask: async (columnId, taskId) => {
    // Optimistic update
    set((state) => {
      const newColumns = [...state.columns];
      const column = newColumns.find((col) => col.id === columnId);
      if (!column) return state;

      column.tasks = column.tasks.filter((t) => t.id !== taskId);
      return { columns: newColumns };
    });

    // Update in Supabase
    try {
      await taskService.deleteTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
      // Revert on error
      const projectId = get().currentProjectId;
      if (projectId) get().fetchTasks(projectId);
    }
  },
}));
