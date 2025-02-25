import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Task } from "@/store/tasks";

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  count: number;
  color: string;
  onEditTask?: (task: Task) => void;
}

const TaskColumn = ({
  id,
  title,
  tasks,
  count,
  color,
  onEditTask,
}: TaskColumnProps) => {
  return (
    <Card className={`${color} p-4 w-[300px] h-[700px] flex flex-col`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Badge variant="secondary">{count}</Badge>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  opacity: snapshot.isDragging ? 0.8 : 1,
                }}
              >
                <TaskCard
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                  priority={task.priority}
                  comments={task.comments}
                  aiSuggestions={task.aiSuggestions}
                  onEdit={() => onEditTask?.(task)}
                />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </Card>
  );
};

export default TaskColumn;
