import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import TaskDialog from "./TaskDialog";
import { useTaskStore } from "@/store/tasks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "@/types/task";

const TaskBoard = () => {
  const { columns, moveTask, addTask, updateTask } = useTaskStore();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<{
    task: Task;
    columnId: string;
  } | null>(null);

  const handleCreateTask = (data: Partial<Task>) => {
    if (selectedTask) {
      updateTask(selectedTask.columnId, selectedTask.task.id, data);
      setSelectedTask(null);
    } else {
      const newTask = {
        id: uuidv4(),
        ...data,
        comments: 0,
        aiSuggestions: [],
      } as Task;
      addTask("todo", newTask);
    }
  };

  const handleEditTask = (task: Task, columnId: string) => {
    setSelectedTask({ task, columnId });
    setDialogOpen(true);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveTask(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="bg-white p-6 rounded-lg shadow-sm w-full h-[700px] overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Task
          </Button>
        </div>
        <div className="flex gap-6 h-full">
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskColumn
                    id={column.id}
                    title={column.title}
                    tasks={column.tasks}
                    count={column.tasks.length}
                    color={column.color}
                    onEditTask={(task) => handleEditTask(task, column.id)}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
      <TaskDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelectedTask(null);
        }}
        onSubmit={handleCreateTask}
        task={selectedTask?.task}
      />
    </DragDropContext>
  );
};

export default TaskBoard;
