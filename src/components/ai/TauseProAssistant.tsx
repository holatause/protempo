import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/components/theme/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useAIStore } from "@/store/ai-store";
import { Message, Suggestion, SuggestionType } from "@/types/ai";
import { ProactiveAnalysis } from "@/types/market";
import MarketDataService from "@/services/marketDataService";
import ProactiveEngineService from "@/services/proactiveEngineService";
import {
  Settings,
  X,
  Minimize2,
  Maximize2,
  TrendingUp,
  MapPin,
  Calendar,
  Lightbulb,
  ChevronRight,
  Send,
  BarChart2,
  UserPlus,
  Clock,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Sparkles,
  Mic,
  Image,
  PanelRight,
  LineChart,
  PieChart,
  Target,
  Zap,
  Check
} from "lucide-react";

// Funciones auxiliares para las sugerencias
const getSuggestionStyle = (type: SuggestionType, confidence?: number): string => {
  // Base de estilos por tipo
  let baseStyle = "";
  switch (type) {
    case "trend":
      baseStyle = "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/40 dark:to-blue-900/30 dark:border-blue-800";
      break;
    case "opportunity":
      baseStyle = "bg-gradient-to-r from-green-50 to-green-100 border-green-200 dark:from-green-950/40 dark:to-green-900/30 dark:border-green-800";
      break;
    case "date":
      baseStyle = "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 dark:from-amber-950/40 dark:to-amber-900/30 dark:border-amber-800";
      break;
    case "optimization":
      baseStyle = "bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950/40 dark:to-purple-900/30 dark:border-purple-800";
      break;
    case "insight":
      baseStyle = "bg-gradient-to-r from-red-50 to-red-100 border-red-200 dark:from-red-950/40 dark:to-red-900/30 dark:border-red-800";
      break;
    default:
      baseStyle = "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 dark:from-gray-900/40 dark:to-gray-800/30 dark:border-gray-700";
  }
  
  // Añadir estilos comunes
  return `${baseStyle} p-4 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md`;
};

const getSuggestionTitleStyle = (type: SuggestionType): string => {
  switch (type) {
    case "trend": return "text-blue-700 dark:text-blue-400";
    case "opportunity": return "text-green-700 dark:text-green-400";
    case "date": return "text-amber-700 dark:text-amber-400";
    case "optimization": return "text-purple-700 dark:text-purple-400";
    case "insight": return "text-red-700 dark:text-red-400";
    default: return "text-gray-700 dark:text-gray-300";
  }
};

const getSuggestionIcon = (type: SuggestionType, confidence?: number) => {
  switch (type) {
    case "trend":
      return <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    case "opportunity":
      return <Target className="h-5 w-5 text-green-600 dark:text-green-400" />;
    case "date":
      return <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
    case "optimization":
      return <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
    case "insight":
      return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
    default:
      return <Lightbulb className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
  }
};

// Función para mostrar el nivel de confianza
const getConfidenceBadge = (confidence?: number) => {
  if (!confidence) return null;
  
  let color = "";
  let label = "";
  
  if (confidence >= 90) {
    color = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    label = "Alta confianza";
  } else if (confidence >= 70) {
    color = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    label = "Confianza media";
  } else {
    color = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    label = "Confianza baja";
  }
  
  return (
    <Badge variant="outline" className={`ml-2 ${color}`}>
      {label} ({confidence}%)
    </Badge>
  );
};

interface TauseProAssistantProps {
  initialContext?: {
    module: string;
    userIntent: {
      action: string;
      entity: string;
      region: string;
    };
  };
}

const TauseProAssistant = ({ initialContext }: TauseProAssistantProps = {}) => {
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Estados locales
  const [activeTab, setActiveTab] = useState("consultas");
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [proactiveAnalysis, setProactiveAnalysis] = useState<ProactiveAnalysis | null>(null);
  const [showMicrointeractions, setShowMicrointeractions] = useState(true);
  const [regions, setRegions] = useState<{code: string, name: string}[]>([]);
  const [activeModule, setActiveModule] = useState("asistente");
  
  // Estados de Zustand
  const { 
    messages, 
    suggestions, 
    isTyping, 
    addMessage, 
    setIsTyping,
    dismissSuggestion,
    saveSuggestion,
    setMessages,
    setSuggestions,
    context,
    updateContext
  } = useAIStore();
  
  // Efecto para cargar mensajes iniciales de demostración si no hay mensajes
  useEffect(() => {
    if (messages.length === 0) {
      // Mensajes de ejemplo para demostración
      setMessages([
        {
          id: "1",
          role: "user",
          content: "¿Cómo puedo mejorar el rendimiento de mis campañas de marketing digital?",
          timestamp: new Date().toISOString(),
        },
        {
          id: "2",
          role: "assistant",
          content: "Para mejorar el rendimiento de tus campañas de marketing digital, te recomiendo estas estrategias clave:\n\n- Segmentar tu audiencia con mayor precisión\n- Optimizar tus anuncios para dispositivos móviles\n- Implementar pruebas A/B para tus creatividades\n- Revisar y ajustar tus pujas según el rendimiento\n- Utilizar remarketing para reconectar con visitantes previos",
          timestamp: new Date().toISOString(),
        }
      ]);
      
      // Generar sugerencias iniciales usando el motor proactivo
      const initialContext = { region: 'BOG' };
      const initialSuggestions = ProactiveEngineService.generateProactiveSuggestions(
        initialContext,
        []
      );
      
      // Si no hay sugerencias del motor proactivo, usar ejemplos predefinidos
      if (initialSuggestions.length === 0) {
        setSuggestions([
          {
            id: "1",
            type: "trend",
            title: "Tendencia: Marketing conversacional",
            description: "Las marcas que implementan chatbots y asistentes virtuales están viendo un aumento del 35% en engagement y un 15% en conversiones.",
            action: "Implementar en mi estrategia",
            tags: ["Tendencia", "Conversión"],
            metadata: { confidence: 92 }
          },
          {
            id: "2",
            type: "opportunity",
            title: "Oportunidad: Optimización de campañas",
            description: "Basado en tus datos actuales, podrías mejorar el ROI de tus campañas en un 22% ajustando la segmentación por edad y ubicación.",
            tags: ["Optimización", "ROI", "Segmentación"],
            metadata: { confidence: 87 }
          },
          {
            id: "3",
            type: "date",
            title: "Próxima fecha: Día sin IVA (Julio)",
            description: "Prepara tu estrategia para el próximo Día sin IVA. Las marcas que planifican con 30 días de anticipación ven un incremento del 45% en ventas.",
            action: "Crear campaña",
            metadata: { confidence: 95 }
          },
          {
            id: "4",
            type: "optimization",
            title: "Optimización: Contenido de video",
            description: "Tus publicaciones con video tienen un 78% más de engagement. Recomendamos aumentar la frecuencia de este formato en tu calendario de contenido.",
            action: "Ver análisis completo",
            metadata: { confidence: 89 }
          }
        ]);
      } else {
        setSuggestions(initialSuggestions);
      }
    }
  }, []);
  
  // Efecto para cargar las regiones disponibles
  useEffect(() => {
    // Obtener códigos de regiones desde el servicio de datos de mercado
    const regionCodes = MarketDataService.getRegionCodes();
    const regionData = regionCodes.map(code => {
      const region = MarketDataService.getRegionData(code);
      return { code, name: region?.name || code };
    });
    setRegions(regionData);
  }, []);
  
  // Efecto para hacer scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);
  
  // Manejador para enviar mensaje
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    addMessage(userMessage);
    setInputValue("");
    setIsTyping(true);
    setIsProcessing(true);
    
    try {
      // Analizar la intención del usuario para generar respuestas contextuales
      const userIntent = ProactiveEngineService.analyzeUserIntent([...messages, userMessage]);
      
      // Actualizar el contexto con la intención detectada
      updateContext({
        ...context,
        ...userIntent
      });
      
      // Simular tiempo de procesamiento (en producción, aquí iría la llamada a la API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generar análisis proactivo basado en la intención del usuario
      let analysis = null;
      const targetRegion = userIntent.regions && userIntent.regions.length > 0 ? userIntent.regions[0] : context.region;
      if (targetRegion) {
        const regionData = MarketDataService.getRegionData(targetRegion);
        if (regionData) {
          analysis = ProactiveEngineService.generateProactiveAnalysis(
            { region: targetRegion },
            messages
          );
          setProactiveAnalysis(analysis);
        }
      }
      
      // Generar respuesta del asistente (simulada para el MVP)
      const assistantContent = "He analizado tu consulta y tengo algunas recomendaciones basadas en los datos del mercado colombiano. " +
        "Puedes ver las sugerencias en la pestaña de 'Sugerencias' para obtener insights específicos para tu estrategia.";
      
      // Añadir mensaje del asistente
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date().toISOString(),
      };
      
      addMessage(assistantMessage);
      
      // Generar nuevas sugerencias basadas en el contexto actualizado
      const newSuggestions = ProactiveEngineService.generateProactiveSuggestions(
        { region: targetRegion || 'BOG' },
        [...messages, userMessage, assistantMessage]
      );
      
      if (newSuggestions.length > 0) {
        setSuggestions(newSuggestions);
      }
      
    } catch (error) {
      console.error("Error al procesar mensaje:", error);
      
      // Mensaje de error en caso de fallo
      addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: "Lo siento, he tenido un problema al procesar tu solicitud. Por favor, intenta de nuevo.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  };
  
  // Manejador para tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Manejador para copiar texto
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aquí podrías mostrar una notificación de éxito
  };
  
  // Renderizado de mensajes
  const renderMessages = () => {
    return messages.map((message, index) => (
      <div 
        key={message.id} 
        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
      >
        <div 
          className={`max-w-[80%] ${
            message.role === "user" 
              ? "bg-primary text-primary-foreground rounded-t-lg rounded-bl-lg" 
              : "bg-muted rounded-t-lg rounded-br-lg"
          } p-3 shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex items-start mb-1">
            {message.role === "assistant" && (
              <Avatar className="h-6 w-6 mr-2">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-full w-full flex items-center justify-center text-white text-xs font-bold">
                  TP
                </div>
              </Avatar>
            )}
            <div className="flex-1">
              <div className="text-sm whitespace-pre-line">{message.content}</div>
              <div className="text-xs opacity-50 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopyText(message.content)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copiar texto</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    ));
  };
  
  // Renderizado de sugerencias
  const renderSuggestions = () => {
    return suggestions.map(suggestion => (
      <motion.div
        key={suggestion.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <div className={`${getSuggestionStyle(suggestion.type, suggestion.metadata?.confidence as number | undefined)} group`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              {getSuggestionIcon(suggestion.type, suggestion.metadata?.confidence as number | undefined)}
              <h3 className={`ml-2 font-medium ${getSuggestionTitleStyle(suggestion.type)}`}>
                {suggestion.title}
                {suggestion.metadata?.confidence && getConfidenceBadge(suggestion.metadata.confidence as number)}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => dismissSuggestion(suggestion.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {suggestion.description}
          </p>
          
          {suggestion.tags && suggestion.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {suggestion.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {suggestion.action && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-xs flex items-center"
              onClick={() => saveSuggestion(suggestion.id)}
            >
              {suggestion.action}
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          )}
        </div>
      </motion.div>
    ));
  };
  
  // Renderizado del componente principal
  return (
    <Card 
      key="tausepro-assistant"
      className={`fixed transition-all duration-300 ease-in-out ${
        isFullscreen 
          ? "inset-0 rounded-none" 
          : isExpanded 
            ? "bottom-4 right-4 w-[400px] h-[600px]" 
            : "bottom-4 right-4 w-[350px] h-12"
      } shadow-lg overflow-hidden z-50`}
    >
      {/* Barra de título */}
      <div className="bg-primary text-primary-foreground p-2 flex justify-between items-center">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 mr-2" />
          <h2 className="text-sm font-medium">Tause Pro</h2>
        </div>
        <div className="flex items-center space-x-1">
          {isExpanded && !isFullscreen && (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsFullscreen(true)}>
              <Maximize2 className="h-3 w-3" />
            </Button>
          )}
          {isFullscreen && (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsFullscreen(false)}>
              <Minimize2 className="h-3 w-3" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
        </div>
      </div>
      
      {/* Contenido principal (solo visible si está expandido) */}
      {isExpanded && (
        <CardContent className="p-0 flex flex-col h-[calc(100%-36px)]">
          {/* Tabs de navegación */}
          <Tabs defaultValue="asistente" className="w-full" onValueChange={setActiveModule}>
            <TabsList className="w-full justify-start px-2 pt-2">
              <TabsTrigger value="asistente" className="text-xs">Asistente</TabsTrigger>
              <TabsTrigger value="campanas" className="text-xs">Campañas</TabsTrigger>
              <TabsTrigger value="contenido" className="text-xs">Contenido</TabsTrigger>
              <TabsTrigger value="analisis" className="text-xs">Análisis</TabsTrigger>
            </TabsList>
            
            {/* Contenido del módulo Asistente */}
            <TabsContent value="asistente" className="m-0 flex flex-col h-[calc(100%-40px)]">
              <Tabs defaultValue="consultas" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start px-2">
                  <TabsTrigger value="consultas" className="text-xs">Consultas</TabsTrigger>
                  <TabsTrigger value="sugerencias" className="text-xs">
                    Sugerencias
                    {suggestions.length > 0 && (
                      <Badge variant="default" className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                        {suggestions.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="consultas" className="flex-1 flex flex-col m-0 p-0">
                  <ScrollArea className="flex-1 p-4">
                    {renderMessages()}
                    
                    {/* Indicador de escritura */}
                    {isTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-muted p-3 rounded-t-lg rounded-br-lg shadow-sm max-w-[80%]">
                          <div className="flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Referencia para scroll automático */}
                    <div ref={messagesEndRef} />
                  </ScrollArea>
                  
                  {/* Área de entrada de texto */}
                  <div className="p-4 border-t">
                    <div className="flex items-center">
                      <Input
                        placeholder="Escribe tu mensaje..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isProcessing}
                        className="flex-1"
                      />
                      <Button 
                        size="icon" 
                        className="ml-2" 
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isProcessing}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Botones adicionales */}
                    <div className="flex justify-between mt-2">
                      <div className="flex space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" className="h-7 w-7">
                                <Mic className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Entrada de voz</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" className="h-7 w-7">
                                <Image className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Adjuntar imagen</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-7 w-7">
                              <Settings className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Configuración</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="sugerencias" className="flex-1 m-0 p-4 overflow-auto">
                  <AnimatePresence>
                    {suggestions.length > 0 ? (
                      renderSuggestions()
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <Lightbulb className="h-8 w-8 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium mb-1">No hay sugerencias activas</h3>
                        <p className="text-sm text-muted-foreground">
                          Las sugerencias aparecerán basadas en tus consultas y actividad en la plataforma.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            {/* Contenido del módulo Campañas (placeholder) */}
            <TabsContent value="campanas" className="m-0 p-4 h-[calc(100%-40px)] flex flex-col items-center justify-center">
              <BarChart2 className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Gestión de Campañas</h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Aquí podrás crear, monitorear y optimizar tus campañas de marketing digital con asistencia de IA.
              </p>
              <Button className="mt-4">Crear nueva campaña</Button>
            </TabsContent>
            
            {/* Contenido del módulo Contenido (placeholder) */}
            <TabsContent value="contenido" className="m-0 p-4 h-[calc(100%-40px)] flex flex-col items-center justify-center">
              <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Calendario de Contenido</h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Planifica y programa tu contenido para múltiples canales con recomendaciones inteligentes.
              </p>
              <Button className="mt-4">Planificar contenido</Button>
            </TabsContent>
            
            {/* Contenido del módulo Análisis (placeholder) */}
            <TabsContent value="analisis" className="m-0 p-4 h-[calc(100%-40px)] flex flex-col items-center justify-center">
              <PieChart className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Análisis y Reportes</h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Visualiza el rendimiento de tus estrategias de marketing con métricas detalladas y reportes personalizados.
              </p>
              <Button className="mt-4">Ver dashboard</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default TauseProAssistant;
