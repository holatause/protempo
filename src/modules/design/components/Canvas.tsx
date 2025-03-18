import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Layers, ChevronUp, ChevronDown, Trash2, Copy, Lock, Unlock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CanvasProps {
  width?: number;
  height?: number;
  onSelect?: (obj: fabric.Object | null) => void;
  showLayers?: boolean;
}

const Canvas = ({ width = 800, height = 600, onSelect, showLayers = true }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [layers, setLayers] = useState<fabric.Object[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<fabric.Object | null>(null);
  const [showLayersPanel, setShowLayersPanel] = useState<boolean>(true);
  const [hoveredLayer, setHoveredLayer] = useState<fabric.Object | null>(null);

  useEffect(() => {
    // Limpiar cualquier canvas existente antes de crear uno nuevo
    if (fabricRef.current) {
      fabricRef.current.dispose();
      fabricRef.current = null;
    }
    
    if (canvasRef.current) {
      // Asegurarse de que el elemento canvas esté limpio
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      
      // Crear un nuevo canvas de Fabric
      const canvas = new fabric.Canvas(canvasRef.current, {
        width,
        height,
        backgroundColor: "#ffffff",
        preserveObjectStacking: true,
      });

      // Configurar los eventos
      canvas.on("selection:created", (e: any) => {
        onSelect?.(e.selected?.[0] || null);
        setSelectedLayer(e.selected?.[0] || null);
      });
      
      canvas.on("selection:updated", (e: any) => {
        onSelect?.(e.selected?.[0] || null);
        setSelectedLayer(e.selected?.[0] || null);
      });
      
      canvas.on("selection:cleared", () => {
        onSelect?.(null);
        setSelectedLayer(null);
      });
      
      // Actualizar capas cuando se agregan o eliminan objetos
      canvas.on("object:added", () => updateLayers());
      canvas.on("object:removed", () => updateLayers());
      canvas.on("object:modified", () => updateLayers());

      // Añadir elementos de ejemplo para demostración
      // Fondo con gradiente
      const bgRect = new fabric.Rect({
        left: 0,
        top: 0,
        width: width,
        height: height,
        fill: 'white',
        selectable: false,
        evented: false,
        excludeFromExport: true,
      });
      
      // Rectángulo principal con sombra
      const rect = new fabric.Rect({
        left: width / 2 - 200,
        top: height / 2 - 120,
        fill: '#0F52BA', // Azul más tecnológico
        width: 400,
        height: 240,
        rx: 16,
        ry: 16,
        objectCaching: false,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.2)',
          blur: 15,
          offsetX: 0,
          offsetY: 8
        }),
      });
      
      // Texto principal
      const text = new fabric.Text('tause Pro', {
        left: width / 2 - 180,
        top: height / 2 - 100,
        fontFamily: 'Arial',
        fontSize: 48,
        fontWeight: 'bold',
        fill: 'white'
      });
      
      // Subtítulo
      const subtext = new fabric.Text('Soluciones tecnológicas avanzadas', {
        left: width / 2 - 180,
        top: height / 2 - 40,
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 'rgba(255,255,255,0.8)'
      });
      
      // Círculo decorativo
      const circle = new fabric.Circle({
        left: width / 2 + 100,
        top: height / 2 - 80,
        radius: 60,
        fill: '#1E3A8A', // Azul oscuro más tecnológico
        opacity: 0.8,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.1)',
          blur: 10,
          offsetX: 0,
          offsetY: 5
        }),
      });
      
      // Icono dentro del círculo (simulado con texto)
      const icon = new fabric.Text('✨', {
        left: width / 2 + 130,
        top: height / 2 - 50,
        fontSize: 40,
        fontFamily: 'Arial',
        fill: 'white'
      });
      
      canvas.add(bgRect);
      canvas.add(rect);
      canvas.add(text);
      canvas.add(subtext);
      canvas.add(circle);
      canvas.add(icon);
      canvas.renderAll();
      
      // Añadir animación sutil a los elementos
      let angle = 0;
      const animate = () => {
        angle += 0.2;
        if (circle && icon) {
          try {
            circle.set({ top: height / 2 - 80 + Math.sin(angle/10) * 5 });
            icon.set({ top: height / 2 - 50 + Math.sin(angle/10) * 5 });
            canvas.renderAll();
          } catch (error) {
            console.error("Error en animación:", error);
          }
        }
        fabricRef.current && requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      
      fabricRef.current = canvas;
      updateLayers();
    }

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, [width, height, onSelect]);
  
  // Función para actualizar la lista de capas
  const updateLayers = () => {
    if (fabricRef.current) {
      try {
        const objects = fabricRef.current.getObjects();
        setLayers([...objects].reverse()); // Invertimos para mostrar las capas en orden visual
      } catch (error) {
        console.error("Error al actualizar capas:", error);
        setLayers([]);
      }
    }
  };
  
  // Funciones para manipular capas
  const moveLayerUp = (layer: fabric.Object) => {
    if (fabricRef.current) {
      // @ts-ignore - bringForward existe en fabric.js pero no está en los tipos
      fabricRef.current.bringForward(layer);
      updateLayers();
    }
  };
  
  const moveLayerDown = (layer: fabric.Object) => {
    if (fabricRef.current) {
      // @ts-ignore - sendBackwards existe en fabric.js pero no está en los tipos
      fabricRef.current.sendBackwards(layer);
      updateLayers();
    }
  };
  
  const removeLayer = (layer: fabric.Object) => {
    if (fabricRef.current) {
      fabricRef.current.remove(layer);
      updateLayers();
    }
  };
  
  const duplicateLayer = (layer: fabric.Object) => {
    if (fabricRef.current) {
      // @ts-ignore - clone tiene una firma diferente en los tipos
      layer.clone((cloned: fabric.Object) => {
        cloned.set({
          left: layer.left! + 10,
          top: layer.top! + 10,
          evented: true,
        });
        fabricRef.current!.add(cloned);
        fabricRef.current!.setActiveObject(cloned);
        updateLayers();
      });
    }
  };
  
  const toggleLock = (layer: fabric.Object) => {
    if (fabricRef.current) {
      const isLocked = layer.lockMovementX && layer.lockMovementY;
      layer.set({
        lockMovementX: !isLocked,
        lockMovementY: !isLocked,
        selectable: isLocked,
        evented: isLocked,
      });
      fabricRef.current.renderAll();
      updateLayers();
    }
  };
  
  // Función para obtener el nombre de la capa
  const getLayerName = (layer: fabric.Object) => {
    if (layer.type === 'text') {
      return `Texto: "${(layer as fabric.Text).text?.substring(0, 10)}${(layer as fabric.Text).text!.length > 10 ? '...' : ''}"`;  
    } else if (layer.type === 'image') {
      return 'Imagen';
    } else if (layer.type === 'rect') {
      return 'Rectángulo';
    } else if (layer.type === 'circle') {
      return 'Círculo';
    } else if (layer.type === 'group') {
      return 'Grupo';
    }
    return `Capa ${layer.type || ''}`;
  };

  return (
    <div className="flex gap-4 relative">
      <motion.div 
        className="border rounded-lg shadow-sm overflow-hidden bg-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <canvas ref={canvasRef} />
      </motion.div>
      
      {showLayers && (
        <motion.div 
          className="w-64 border rounded-lg shadow-sm bg-white overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-3 border-b flex items-center justify-between bg-gradient-to-r from-white to-primary/5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-medium">Capas</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{layers.length} elementos</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => setShowLayersPanel(!showLayersPanel)}
              >
                {showLayersPanel ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100%-41px)]">
            <AnimatePresence>
              {showLayersPanel && (
                <motion.div 
                  className="p-2 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                {layers.map((layer, index) => {
                  const isLocked = layer.lockMovementX && layer.lockMovementY;
                  const isSelected = selectedLayer === layer;
                  
                  return (
                  <motion.div 
                    key={index}
                    className={`p-2 rounded-md flex items-center justify-between ${isSelected ? 'bg-primary/10' : 'hover:bg-muted'} cursor-pointer transition-colors relative overflow-hidden`}
                    onClick={() => {
                      if (fabricRef.current && !isLocked) {
                        try {
                          fabricRef.current.setActiveObject(layer);
                          fabricRef.current.renderAll();
                        } catch (error) {
                          console.error("Error al seleccionar capa:", error);
                        }
                      }
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ backgroundColor: isSelected ? 'rgba(var(--primary), 0.15)' : 'rgba(0,0,0,0.05)' }}
                    onMouseEnter={() => setHoveredLayer(layer)}
                    onMouseLeave={() => setHoveredLayer(null)}
                  >
                    {hoveredLayer === layer && (
                      <motion.div 
                        className="absolute inset-0 bg-primary/5" 
                        layoutId="hoverHighlight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <div className="flex items-center gap-2 overflow-hidden relative z-10">
                      {isLocked ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Lock className="w-3 h-3 text-muted-foreground" />
                        </motion.div>
                      ) : (
                        <div className="w-3" />
                      )}
                      <span className="text-sm truncate">{getLayerName(layer)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 relative z-10">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 relative overflow-hidden group" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLock(layer);
                              }}
                            >
                              <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"></span>
                              <AnimatePresence mode="wait" initial={false}>
                                {isLocked ? (
                                  <motion.div
                                    key="locked"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Lock className="h-3 w-3 relative z-10" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="unlocked"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Unlock className="h-3 w-3 relative z-10" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isLocked ? 'Desbloquear' : 'Bloquear'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateLayer(layer);
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Duplicar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={(e) => {
                                e.stopPropagation();
                                moveLayerUp(layer);
                              }}
                              disabled={index === 0}
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mover arriba</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={(e) => {
                                e.stopPropagation();
                                moveLayerDown(layer);
                              }}
                              disabled={index === layers.length - 1}
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mover abajo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-destructive hover:text-destructive" 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeLayer(layer);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </motion.div>
                  );
                })}
              
                {layers.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground text-sm">
                    No hay elementos en el diseño.
                    <p className="text-xs mt-1">Añade formas, texto o imágenes desde la barra de herramientas.</p>
                  </div>
                )}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </motion.div>
      )}
      
      {/* Indicador flotante de ayuda */}
      <div className="absolute bottom-4 right-4 text-xs bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm border text-muted-foreground pointer-events-none opacity-80">
        <p className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          Tip: Usa el panel de capas para organizar tu diseño
        </p>
      </div>
    </div>
  );
};

export default Canvas;
