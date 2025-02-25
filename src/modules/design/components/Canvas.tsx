import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

interface CanvasProps {
  width?: number;
  height?: number;
  onSelect?: (obj: fabric.Object | null) => void;
}

const Canvas = ({ width = 800, height = 600, onSelect }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width,
        height,
        backgroundColor: "#ffffff",
      });

      canvas.on("selection:created", (e) => onSelect?.(e.target || null));
      canvas.on("selection:cleared", () => onSelect?.(null));

      fabricRef.current = canvas;
    }

    return () => {
      fabricRef.current?.dispose();
    };
  }, [width, height, onSelect]);

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
