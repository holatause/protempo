import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Wand2, Lightbulb, Palette, Layout } from "lucide-react";

interface Suggestion {
  id: string;
  type: "layout" | "color" | "content";
  title: string;
  description: string;
}

const mockSuggestions: Suggestion[] = [
  {
    id: "1",
    type: "layout",
    title: "Improve Hierarchy",
    description:
      "Try moving the main heading higher for better visual hierarchy",
  },
  {
    id: "2",
    type: "color",
    title: "Color Harmony",
    description:
      "The current color scheme could be more cohesive. Try using complementary colors.",
  },
  {
    id: "3",
    type: "content",
    title: "Content Balance",
    description: "Consider adding more whitespace around the text elements.",
  },
];

interface AISuggestionsPanelProps {
  onApplySuggestion?: (suggestion: Suggestion) => void;
}

const AISuggestionsPanel = ({ onApplySuggestion }: AISuggestionsPanelProps) => {
  const getIcon = (type: Suggestion["type"]) => {
    switch (type) {
      case "layout":
        return <Layout className="w-4 h-4" />;
      case "color":
        return <Palette className="w-4 h-4" />;
      case "content":
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <Wand2 className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-[300px] h-full bg-white shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Design Suggestions</h2>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-57px)]">
        <div className="p-4 space-y-4">
          {mockSuggestions.map((suggestion) => (
            <Card
              key={suggestion.id}
              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onApplySuggestion?.(suggestion)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIcon(suggestion.type)}</div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.type}
                    </Badge>
                  </div>
                  <h3 className="font-medium">{suggestion.title}</h3>
                  <p className="text-sm text-gray-600">
                    {suggestion.description}
                  </p>
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    Apply Suggestion
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default AISuggestionsPanel;
