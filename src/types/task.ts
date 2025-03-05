export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  comments?: number;
  aiSuggestions?: string[];
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
};

export type TaskState = {
  columns: Column[];
  isLoading: boolean;
  error: string | null;
  currentProjectId: string | null;
  fetchTasks: (projectId: string) => Promise<void>;
  moveTask: (
    sourceCol: string,
    destCol: string,
    sourceIndex: number,
    destIndex: number,
  ) => Promise<void>;
  addTask: (columnId: string, task: Task) => Promise<void>;
  updateTask: (
    columnId: string,
    taskId: string,
    updates: Partial<Task>,
  ) => Promise<void>;
  deleteTask: (columnId: string, taskId: string) => Promise<void>;
};
