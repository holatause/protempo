import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Clock,
  MessageCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface TaskCardProps {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  comments?: number;
  aiSuggestions?: string[];
  expanded?: boolean;
  onToggleExpand?: () => void;
  onEdit?: () => void;
}

const TaskCard = ({
  title = "Sample Task",
  description = "This is a sample task description that shows the basic layout of the task card.",
  dueDate = "2024-04-15",
  priority = "medium",
  comments = 3,
  aiSuggestions = [
    "Consider adding more visual content",
    "Optimize for mobile devices",
  ],
  expanded = false,
  onToggleExpand = () => {},
  onEdit,
}: TaskCardProps) => {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <Card className="w-[280px] bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader
        className="pb-2"
        onClick={onEdit}
        style={{ cursor: "pointer" }}
      >
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className={priorityColors[priority]}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Priority Level</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{comments}</span>
          </div>
        </div>
        {expanded && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">AI Suggestions</span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {aiSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center gap-2"
          onClick={onToggleExpand}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
