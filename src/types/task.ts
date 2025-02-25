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
  moveTask: (
    sourceCol: string,
    destCol: string,
    sourceIndex: number,
    destIndex: number,
  ) => void;
  addTask: (columnId: string, task: Task) => void;
  updateTask: (
    columnId: string,
    taskId: string,
    updates: Partial<Task>,
  ) => void;
};
