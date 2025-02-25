import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, BarChart } from "lucide-react";

interface ProjectHeaderProps {
  title?: string;
  status?: "active" | "completed" | "on-hold";
  startDate?: string;
  teamSize?: number;
  progress?: number;
}

const ProjectHeader = ({
  title = "Marketing Campaign 2024",
  status = "active",
  startDate = "2024-03-01",
  teamSize = 5,
  progress = 65,
}: ProjectHeaderProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    "on-hold": "bg-yellow-100 text-yellow-800",
  };

  return (
    <Card className="w-full bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{title}</h1>
            <Badge className={statusColors[status]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Started: {startDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">{teamSize} team members</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="text-sm">{progress}% completed</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Edit Project</Button>
          <Button>Add Task</Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectHeader;
