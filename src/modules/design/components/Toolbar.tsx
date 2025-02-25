import React from "react";
import { Button } from "@/components/ui/button";
import { Image, Square, Circle, Type, Wand2 } from "lucide-react";

interface ToolbarProps {
  onAddShape?: (type: "rect" | "circle") => void;
  onAddText?: () => void;
  onAddImage?: () => void;
  onGenerateAI?: () => void;
}

const Toolbar = ({
  onAddShape,
  onAddText,
  onAddImage,
  onGenerateAI,
}: ToolbarProps) => {
  return (
    <div className="p-4 border-b flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onAddShape?.("rect")}
        title="Add Rectangle"
      >
        <Square className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onAddShape?.("circle")}
        title="Add Circle"
      >
        <Circle className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onAddText}
        title="Add Text"
      >
        <Type className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onAddImage}
        title="Add Image"
      >
        <Image className="h-4 w-4" />
      </Button>

      <div className="h-6 w-px bg-border mx-2" />

      <Button variant="outline" className="gap-2" onClick={onGenerateAI}>
        <Wand2 className="h-4 w-4" />
        Generate with AI
      </Button>
    </div>
  );
};

export default Toolbar;
