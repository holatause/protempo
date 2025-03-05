import React, { useState } from "react";
import * as fabric from "fabric";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import AIGenerator from "./components/AIGenerator";
import AISuggestionsPanel from "./components/AISuggestionsPanel";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const DesignEditor = () => {
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(
    null,
  );
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);

  const handleAddShape = (type: "rect" | "circle") => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const fabricCanvas = fabric.Canvas.getActiveCanvas();
    if (!fabricCanvas) return;

    if (type === "rect") {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "#000000",
        width: 100,
        height: 100,
      });
      fabricCanvas.add(rect);
    } else {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        fill: "#000000",
        radius: 50,
      });
      fabricCanvas.add(circle);
    }
  };

  const handleAddText = () => {
    const canvas = fabric.Canvas.getActiveCanvas();
    if (!canvas) return;

    const text = new fabric.Text("Texto", {
      left: 100,
      top: 100,
      fontSize: 24,
    });
    canvas.add(text);
  };

  const handleAddImage = (url?: string) => {
    const canvas = fabric.Canvas.getActiveCanvas();
    if (!canvas) return;

    const imageUrl =
      url ||
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200";

    fabric.Image.fromURL(imageUrl, (img) => {
      img.scale(0.5);
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Toolbar
        onAddShape={handleAddShape}
        onAddText={handleAddText}
        onAddImage={handleAddImage}
        onGenerateAI={() => setIsAIDialogOpen(true)}
      />
      <div className="flex-1 p-8 flex overflow-hidden">
        <div className="flex-1 flex justify-center items-start overflow-auto">
          <Canvas width={800} height={600} onSelect={setSelectedObject} />
        </div>
        <AISuggestionsPanel
          onApplySuggestion={(suggestion) => {
            // TODO: Implementar aplicación de sugerencias
            console.log("Applying suggestion:", suggestion);
          }}
        />
      </div>

      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogContent>
          <AIGenerator
            onGenerate={(image) => {
              handleAddImage(image);
              setIsAIDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DesignEditor;
