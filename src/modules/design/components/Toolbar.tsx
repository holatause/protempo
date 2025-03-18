import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Image,
  Square,
  Circle,
  Type,
  Wand2,
  Undo2,
  Redo2,
  Save,
  Download,
  Palette,
  Copy,
  Trash2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  BringToFront,
  SendToBack,
  Layers,
  Grid,
  RotateCcw,
  Crop,
  Sparkles,
  PenTool,
  Zap,
  LayoutGrid,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ToolbarProps {
  onAddShape?: (type: "rect" | "circle") => void;
  onAddText?: () => void;
  onAddImage?: () => void;
  onGenerateAI?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onExport?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onBringToFront?: () => void;
  onSendToBack?: () => void;
  onAlignText?: (align: "left" | "center" | "right" | "justify") => void;
  onChangeColor?: (color: string) => void;
  onToggleGrid?: () => void;
  onRotate?: () => void;
  onCrop?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  hasSelection?: boolean;
  isTextSelected?: boolean;
}

const Toolbar = ({
  onAddShape,
  onAddText,
  onAddImage,
  onGenerateAI,
  onUndo,
  onRedo,
  onSave,
  onExport,
  onDelete,
  onDuplicate,
  onBringToFront,
  onSendToBack,
  onAlignText,
  onChangeColor,
  onToggleGrid,
  onRotate,
  onCrop,
  canUndo = false,
  canRedo = false,
  hasSelection = false,
  isTextSelected = false,
}: ToolbarProps) => {
  const [activeTab, setActiveTab] = useState("insertar");
  const [showGrid, setShowGrid] = useState(false);
  const [color, setColor] = useState("#000000");
  
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChangeColor?.(newColor);
  };
  
  const handleToggleGrid = () => {
    setShowGrid(!showGrid);
    onToggleGrid?.();
  };
  // Efecto para mostrar un tooltip de ayuda después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      // Aquí podríamos mostrar un tooltip de ayuda contextual
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  // Controlador de animación para efectos especiales
  const controls = useAnimation();
  
  // Efecto para mostrar animación de "pulso" en el botón de IA
  useEffect(() => {
    const pulseAnimation = async () => {
      await controls.start({
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 0 0 0 rgba(59, 130, 246, 0)",
          "0 0 0 4px rgba(59, 130, 246, 0.3)",
          "0 0 0 0 rgba(59, 130, 246, 0)"
        ],
        transition: { duration: 2, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 3 }
      });
    };
    
    pulseAnimation();
  }, [controls]);

  return (
    <motion.div 
      className="p-2 border-b bg-white shadow-sm rounded-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}    
      style={{
        background: "linear-gradient(to right, #ffffff, #f9fafb)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-2 relative overflow-hidden rounded-lg bg-gray-50/80 p-1">
          <TabsTrigger value="insertar" className="relative z-10 transition-all duration-300 hover:bg-primary/10">
            <span className="relative">Insertar</span>
          </TabsTrigger>
          <TabsTrigger value="editar" className="relative z-10 transition-all duration-300 hover:bg-primary/10">
            <span className="relative">Editar</span>
          </TabsTrigger>
          <TabsTrigger value="formato" className="relative z-10 transition-all duration-300 hover:bg-primary/10">
            <span className="relative">Formato</span>
          </TabsTrigger>
          <TabsTrigger value="avanzado" className="relative z-10 transition-all duration-300 hover:bg-primary/10">
            <span className="relative">Avanzado</span>
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <TabsContent value="insertar" className="flex items-center gap-2 flex-wrap p-1 bg-white/50 rounded-lg">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onAddShape?.("rect")}
                  className="relative overflow-hidden group"
                >
                  <Square className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                  <span className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Añadir rectángulo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onAddShape?.("circle")}
                  className="relative overflow-hidden group"
                >
                  <Circle className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                  <span className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Añadir círculo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onAddText}
                  className="relative overflow-hidden group"
                >
                  <Type className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                  <span className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Añadir texto</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onAddImage}
                  className="relative overflow-hidden group"
                >
                  <Image className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                  <span className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Añadir imagen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="h-6" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div animate={controls}>
                  <Button 
                    variant="outline" 
                    className="gap-2 relative overflow-hidden group bg-gradient-to-r from-blue-500 to-indigo-600 border-0 text-white hover:from-blue-600 hover:to-indigo-700" 
                    onClick={onGenerateAI}
                  >
                    <Sparkles className="h-4 w-4 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                    <Wand2 className="h-4 w-4 text-white relative z-10 group-active:rotate-12 transition-transform duration-200" />
                    <span className="text-sm font-medium relative z-10">Generar con IA</span>
                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generador de IA</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <TabsContent value="editar" className="flex items-center gap-2 flex-wrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onUndo}
                  disabled={!canUndo}
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Deshacer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onRedo}
                  disabled={!canRedo}
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rehacer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Separator orientation="vertical" className="h-6" />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onDuplicate}
                  disabled={!hasSelection}
                >
                  <Copy className="h-4 w-4" />
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
                  variant="outline"
                  size="icon"
                  onClick={onDelete}
                  disabled={!hasSelection}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Eliminar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Separator orientation="vertical" className="h-6" />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onBringToFront}
                  disabled={!hasSelection}
                >
                  <BringToFront className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Traer al frente</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onSendToBack}
                  disabled={!hasSelection}
                >
                  <SendToBack className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enviar atrás</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <TabsContent value="formato" className="flex items-center gap-2 flex-wrap">
          {isTextSelected && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onAlignText?.('left')}
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Alinear a la izquierda</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onAlignText?.('center')}
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Centrar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onAlignText?.('right')}
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Alinear a la derecha</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onAlignText?.('justify')}
                    >
                      <AlignJustify className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Justificar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Separator orientation="vertical" className="h-6" />
            </>
          )}
          
          <Popover>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" disabled={!hasSelection}>
                      <Palette className="h-4 w-4" style={{ color }} />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Color</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <PopoverContent className="w-64">
              <div className="space-y-2">
                <h4 className="font-medium">Seleccionar color</h4>
                <div className="grid grid-cols-8 gap-2">
                  {[
                    "#000000", "#5E5E5E", "#0066CC", "#00A651", "#FCD116", "#FF0000", "#FF6600", "#9900CC",
                    "#FFFFFF", "#CCCCCC", "#66CCFF", "#00CC99", "#FFFF00", "#FF6666", "#FFCC33", "#CC99FF"
                  ].map((c) => (
                    <div
                      key={c}
                      className={`w-6 h-6 rounded-md cursor-pointer border ${color === c ? 'ring-2 ring-primary' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => handleColorChange(c)}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Label htmlFor="custom-color">Personalizado:</Label>
                  <Input
                    id="custom-color"
                    type="color"
                    value={color}
                    className="w-8 h-8 p-0"
                    onChange={(e) => handleColorChange(e.target.value)}
                  />
                  <Input
                    value={color}
                    className="w-24"
                    onChange={(e) => handleColorChange(e.target.value)}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onRotate}
                  disabled={!hasSelection}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <TabsContent value="avanzado" className="flex items-center gap-2 flex-wrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleToggleGrid}
                >
                  <Grid className={`h-4 w-4 ${showGrid ? 'text-primary' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mostrar cuadrícula</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onCrop}
                  disabled={!hasSelection}
                >
                  <Crop className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Recortar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onSave}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Guardar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onExport}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exportar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
      
      {/* Indicador de ayuda flotante */}
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground opacity-70 pointer-events-none">
        <p className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          Tip: Usa las pestañas para acceder a más herramientas
        </p>
      </div>
    </motion.div>
  );
};

export default Toolbar;
