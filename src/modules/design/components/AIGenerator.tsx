import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Image as ImageIcon, Type, Layout, Palette, Globe, Upload, Loader2, Sparkles } from "lucide-react";
import { aiService, RecraftDesignTemplate } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface AIGeneratorProps {
  onGenerate?: (image: string) => void;
  campaignId?: string;
  websiteUrl?: string;
}

const AIGenerator = ({ onGenerate, campaignId, websiteUrl }: AIGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("modern");
  const [format, setFormat] = useState("social");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("prompt");
  const [templates, setTemplates] = useState<RecraftDesignTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [brandIdentity, setBrandIdentity] = useState<{logo?: string; colors: string[]; fonts: string[]}>();
  const [loadingBrand, setLoadingBrand] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("instagram");
  const [selectedSize, setSelectedSize] = useState("1080x1080");

  // Cargar plantillas al iniciar
  useEffect(() => {
    const loadTemplates = async () => {
      setLoadingTemplates(true);
      try {
        const templates = await aiService.getDesignTemplates(format);
        setTemplates(templates);
        if (templates.length > 0) {
          setSelectedTemplate(templates[0].id);
        }
      } catch (error) {
        console.error("Error al cargar plantillas:", error);
      } finally {
        setLoadingTemplates(false);
      }
    };
    
    loadTemplates();
  }, [format]);

  // Extraer identidad de marca si se proporciona una URL
  useEffect(() => {
    if (websiteUrl) {
      const extractBrand = async () => {
        setLoadingBrand(true);
        try {
          const identity = await aiService.extractBrandIdentity(websiteUrl);
          setBrandIdentity(identity);
        } catch (error) {
          console.error("Error al extraer identidad de marca:", error);
        } finally {
          setLoadingBrand(false);
        }
      };
      
      extractBrand();
    }
  }, [websiteUrl]);

  // Obtener dimensiones según la red social y formato seleccionados
  const getDimensions = () => {
    const sizes = {
      instagram: {
        "1080x1080": { width: 1080, height: 1080 },
        "1080x1350": { width: 1080, height: 1350 },
        "1080x1920": { width: 1080, height: 1920 }
      },
      facebook: {
        "1200x630": { width: 1200, height: 630 },
        "820x312": { width: 820, height: 312 },
        "1080x1080": { width: 1080, height: 1080 }
      },
      twitter: {
        "1600x900": { width: 1600, height: 900 },
        "1500x500": { width: 1500, height: 500 }
      }
    };
    
    return sizes[selectedNetwork]?.[selectedSize] || { width: 1080, height: 1080 };
  };

  const handleGenerate = async () => {
    if (activeTab === "prompt" && !prompt) return;
    if (activeTab === "template" && !selectedTemplate) return;

    try {
      setLoading(true);
      setError("");
      
      // Enriquecer el prompt con información de marca si está disponible
      let enhancedPrompt = prompt;
      if (brandIdentity) {
        const colorInfo = brandIdentity.colors.length > 0 ? 
          `using brand colors ${brandIdentity.colors.join(", ")}` : "";
        const fontInfo = brandIdentity.fonts.length > 0 ? 
          `with fonts ${brandIdentity.fonts.join(", ")}` : "";
        
        enhancedPrompt = `${prompt} ${colorInfo} ${fontInfo}`.trim();
      }
      
      // Añadir contexto de la campaña si está disponible
      if (campaignId) {
        enhancedPrompt = `${enhancedPrompt} for marketing campaign #${campaignId}`;
      }
      
      const dimensions = getDimensions();
      
      const imageUrl = await aiService.generateImage(enhancedPrompt, {
        style,
        format: `${selectedNetwork} ${format}`,
        dimensions,
      });
      
      onGenerate?.(imageUrl);
    } catch (error) {
      console.error("Error al generar diseño:", error);
      setError("Error al generar el diseño. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            Generador de Diseños para Redes Sociales
          </DialogTitle>
          <DialogDescription>
            Crea diseños profesionales para tus campañas en redes sociales
          </DialogDescription>
        </motion.div>
      </DialogHeader>

      {/* Información de marca si está disponible */}
      <AnimatePresence>
        {brandIdentity && (
          <motion.div 
            className="p-4 bg-muted rounded-lg mb-4 relative overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Identidad de marca detectada
              </h3>
              <div className="flex items-center gap-3">
                {brandIdentity.logo ? (
                  <motion.img 
                    src={brandIdentity.logo} 
                    alt="Logo" 
                    className="w-8 h-8 object-contain" 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.3 }}
                  />
                ) : loadingBrand ? (
                  <Skeleton className="w-8 h-8 rounded-full" />
                ) : null}
                <div className="flex gap-1">
                  {brandIdentity.colors.map((color, i) => (
                    <motion.div 
                      key={i} 
                      className="w-5 h-5 rounded-full border cursor-pointer hover:scale-110 transition-transform" 
                      style={{ backgroundColor: color }}
                      title={color}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      whileHover={{ y: -2 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Indicador de calidad */}
            <div className="absolute top-2 right-2 text-xs bg-background/80 px-2 py-1 rounded-full text-primary-foreground">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                99% coincidencia
              </span>
            </div>
          </motion.div>
        )}
        {loadingBrand && !brandIdentity && (
          <motion.div 
            className="p-4 bg-muted rounded-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              Analizando identidad de marca...
            </h3>
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex gap-1">
                {[1,2,3,4].map((i) => (
                  <Skeleton key={i} className="w-5 h-5 rounded-full" />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pestañas para diferentes métodos de generación */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="prompt" className="relative overflow-hidden group">
            <span className="relative z-10">Crear con Prompt</span>
            <motion.span 
              className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"
              layoutId="tabBackground"
              transition={{ type: "spring", bounce: 0.2 }}
            />
          </TabsTrigger>
          <TabsTrigger value="template" className="relative overflow-hidden group">
            <span className="relative z-10">Usar Plantilla</span>
            <motion.span 
              className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"
              layoutId="tabBackground"
              transition={{ type: "spring", bounce: 0.2 }}
            />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="space-y-4">
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label>Descripción del diseño</Label>
            <Textarea
              placeholder="Describe el diseño que quieres crear..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] transition-all duration-300 focus:shadow-md focus:border-primary"
            />
            {prompt.length > 0 && (
              <motion.div 
                className="text-xs text-muted-foreground flex justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span>{prompt.length} caracteres</span>
                <span className={prompt.length < 20 ? "text-destructive" : "text-primary"}>
                  {prompt.length < 20 ? "Descripción muy corta" : "Buena descripción"}
                </span>
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Red Social</Label>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona red social" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tamaño</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tamaño" />
                </SelectTrigger>
                <SelectContent>
                  {selectedNetwork === "instagram" && (
                    <>
                      <SelectItem value="1080x1080">Cuadrado (1080x1080)</SelectItem>
                      <SelectItem value="1080x1350">Vertical (1080x1350)</SelectItem>
                      <SelectItem value="1080x1920">Story (1080x1920)</SelectItem>
                    </>
                  )}
                  {selectedNetwork === "facebook" && (
                    <>
                      <SelectItem value="1200x630">Post (1200x630)</SelectItem>
                      <SelectItem value="820x312">Cover (820x312)</SelectItem>
                      <SelectItem value="1080x1080">Cuadrado (1080x1080)</SelectItem>
                    </>
                  )}
                  {selectedNetwork === "twitter" && (
                    <>
                      <SelectItem value="1600x900">Post (1600x900)</SelectItem>
                      <SelectItem value="1500x500">Header (1500x500)</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Label>Estilo</Label>
            <div className="grid grid-cols-2 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant={style === "modern" ? "default" : "outline"}
                        onClick={() => setStyle("modern")}
                        className="justify-start w-full relative overflow-hidden group"
                      >
                        <motion.span 
                          className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"
                          animate={style === "modern" ? { scale: 1 } : { scale: 0 }}
                        />
                        <Layout className="w-4 h-4 mr-2 relative z-10" />
                        <span className="relative z-10">Moderno</span>
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Diseño limpio y contemporáneo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant={style === "minimal" ? "default" : "outline"}
                        onClick={() => setStyle("minimal")}
                        className="justify-start w-full relative overflow-hidden group"
                      >
                        <motion.span 
                          className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"
                          animate={style === "minimal" ? { scale: 1 } : { scale: 0 }}
                        />
                        <Type className="w-4 h-4 mr-2 relative z-10" />
                        <span className="relative z-10">Minimalista</span>
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Estilo simple y elegante</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant={style === "corporate" ? "default" : "outline"}
                        onClick={() => setStyle("corporate")}
                        className="justify-start w-full relative overflow-hidden group"
                      >
                        <motion.span 
                          className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"
                          animate={style === "corporate" ? { scale: 1 } : { scale: 0 }}
                        />
                        <Palette className="w-4 h-4 mr-2 relative z-10" />
                        <span className="relative z-10">Corporativo</span>
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Aspecto profesional y formal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant={style === "playful" ? "default" : "outline"}
                        onClick={() => setStyle("playful")}
                        className="justify-start w-full relative overflow-hidden group"
                      >
                        <motion.span 
                          className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"
                          animate={style === "playful" ? { scale: 1 } : { scale: 0 }}
                        />
                        <ImageIcon className="w-4 h-4 mr-2 relative z-10" />
                        <span className="relative z-10">Dinámico</span>
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Colorido y llamativo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="template" className="space-y-4">
          <AnimatePresence mode="wait">
            {loadingTemplates ? (
              <motion.div 
                className="flex flex-col items-center justify-center p-8 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="loading"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Cargando plantillas...</p>
              </motion.div>
            ) : (
            <>
              <div className="space-y-2">
                <Label>Plantillas disponibles</Label>
                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-1">
                  {templates.map((template, index) => (
                    <motion.div 
                      key={template.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedTemplate(template.id)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img 
                        src={template.previewUrl} 
                        alt={template.name} 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-xs font-medium truncate">{template.name}</p>
                        <div className="flex gap-1 mt-1">
                          {template.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Personalizar plantilla</Label>
                <Textarea
                  placeholder="Describe cómo personalizar la plantilla..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </>
          )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      <AnimatePresence>
        {error && (
          <motion.div 
            className="text-sm text-destructive mt-2 p-2 border border-destructive/20 rounded bg-destructive/10 flex items-start gap-2"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-destructive">⚠️</span>
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="pt-4 flex gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full relative overflow-hidden group"
            variant="outline"
          >
            <motion.span 
              className="absolute inset-0 bg-muted scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"
            />
            <Upload className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Subir imagen</span>
          </Button>
        </motion.div>
        
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full relative overflow-hidden group"
            onClick={handleGenerate}
            disabled={loading || (activeTab === "prompt" && !prompt) || (activeTab === "template" && !selectedTemplate)}
          >
            <motion.span 
              className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-sm"
            />
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin relative z-10" />
                <span className="relative z-10">Generando...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Generar Diseño</span>
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Indicador de progreso */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="mt-4 p-3 bg-muted rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Generando diseño...</span>
                <span className="text-primary">75%</span>
              </div>
              <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
              <p className="text-xs text-muted-foreground italic">Aplicando estilo {style} al diseño...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIGenerator;
