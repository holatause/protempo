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
      baseStyle = "border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800";
      break;
    case "regional":
      baseStyle = "border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800";
      break;
    case "date":
      baseStyle = "border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800";
      break;
    case "insight":
      baseStyle = "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800";
      break;
    case "opportunity":
      baseStyle = "border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800";
      break;
    case "optimization":
      baseStyle = "border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-800";
      break;
    default:
      baseStyle = "border-gray-200 bg-gray-50 dark:bg-gray-800/20 dark:border-gray-700";
  }
  
  // Añadir efecto de brillo para sugerencias con alta confianza
  if (confidence && confidence > 0.85) {
    baseStyle += " shadow-sm hover:shadow-md transition-shadow duration-200";
  }
  
  return baseStyle;
};

const getSuggestionTitleStyle = (type: SuggestionType): string => {
  switch (type) {
    case "trend":
      return "text-amber-800 dark:text-amber-300";
    case "regional":
      return "text-blue-800 dark:text-blue-300";
    case "date":
      return "text-purple-800 dark:text-purple-300";
    case "insight":
      return "text-green-800 dark:text-green-300";
    case "opportunity":
      return "text-blue-800 dark:text-blue-300";
    case "optimization":
      return "text-indigo-800 dark:text-indigo-300";
    default:
      return "text-gray-800 dark:text-gray-300";
  }
};

const getSuggestionIcon = (type: SuggestionType, confidence?: number) => {
  // Base de estilos para íconos
  const baseClasses = "w-5 h-5 mt-1 transition-all duration-200";
  
  // Clases adicionales para íconos de alta confianza
  const confidenceClasses = confidence && confidence > 0.9 ? "animate-pulse" : "";
  
  switch (type) {
    case "trend":
      return <TrendingUp className={`${baseClasses} ${confidenceClasses} text-amber-600 dark:text-amber-400`} />;
    case "regional":
      return <MapPin className={`${baseClasses} ${confidenceClasses} text-blue-600 dark:text-blue-400`} />;
    case "date":
      return <Calendar className={`${baseClasses} ${confidenceClasses} text-purple-600 dark:text-purple-400`} />;
    case "insight":
      return <Lightbulb className={`${baseClasses} ${confidenceClasses} text-green-600 dark:text-green-400`} />;
    case "opportunity":
      return <Target className={`${baseClasses} ${confidenceClasses} text-blue-600 dark:text-blue-400`} />;
    case "optimization":
      return <Zap className={`${baseClasses} ${confidenceClasses} text-indigo-600 dark:text-indigo-400`} />;
    default:
      return <Lightbulb className={`${baseClasses} text-gray-600 dark:text-gray-400`} />;
  }
};

// Función para mostrar el nivel de confianza
const getConfidenceBadge = (confidence?: number) => {
  if (!confidence) return null;
  
  let color = "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  let label = "Confianza media";
  
  if (confidence >= 0.9) {
    color = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    label = "Alta confianza";
  } else if (confidence >= 0.7) {
    color = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    label = "Buena confianza";
  } else if (confidence < 0.7) {
    color = "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    label = "Confianza moderada";
  }
  
  return (
    <Badge variant="outline" className={`text-xs px-1.5 py-0 ${color}`}>
      {label}
    </Badge>
  );
};

const BrujulaAssistant = () => {
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
          content: "¿Cómo puedo adaptar mi estrategia de marketing para el mercado colombiano?",
          timestamp: new Date().toISOString(),
        },
        {
          id: "2",
          role: "assistant",
          content: "Para el mercado colombiano, te recomiendo enfocarte en estos aspectos clave:\n\n- Destacar ingredientes y materiales locales\n- Adaptar el tono de comunicación según la región\n- Considerar fechas especiales locales como el Día del Amor y la Amistad (septiembre)\n- Utilizar referencias culturales que resuenen con el público local",
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
            title: "Tendencia: Revalorización de lo colombiano",
            description: "Las marcas que destacan ingredientes, materiales y talento local están ganando preferencia entre consumidores urbanos de 25-45 años.",
            action: "Adaptar mi ADN de marca",
            tags: ["Tendencia", "Branding"],
          },
          {
            id: "2",
            type: "opportunity",
            title: "Oportunidad regional: Costa Caribe",
            description: "El consumo en Barranquilla y Cartagena ha aumentado un 18% en el último trimestre, especialmente en categorías de bienestar y tecnología.",
            tags: ["Barranquilla", "Cartagena", "Q3 2023"],
          },
          {
            id: "3",
            type: "date",
            title: "Próxima fecha: Día de la Madre (Mayo)",
            description: "Es momento de planificar tu campaña. En Colombia, esta fecha genera un incremento del 35% en ventas de categorías como belleza, tecnología y experiencias.",
            action: "Crear campaña",
          },
          {
            id: "4",
            type: "optimization",
            title: "Optimización: Mejora tu tasa de conversión",
            description: "Basado en tu historial, podrías aumentar conversiones un 12% implementando testimonios de clientes colombianos en tus páginas de producto.",
            action: "Ver análisis completo",
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
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Agregar mensaje del usuario
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    addMessage(newUserMessage);
    setInputValue("");
    setIsTyping(true);
    
    // Procesar el mensaje con el motor proactivo
    const allMessages = [...messages, newUserMessage];
    setIsProcessing(true);
    
    // Generar análisis proactivo basado en el mensaje
    const userIntent = ProactiveEngineService.analyzeUserIntent(allMessages);
    
    // Si se detectó una región, actualizar el contexto
    if (userIntent.regions.length > 0) {
      updateContext({ region: userIntent.regions[0] });
    }
    
    // Generar análisis proactivo
    const analysis = ProactiveEngineService.generateProactiveAnalysis(context, allMessages);
    setProactiveAnalysis(analysis);
    
    // Generar nuevas sugerencias basadas en el mensaje
    const newSuggestions = ProactiveEngineService.generateProactiveSuggestions(context, allMessages);
    
    // Actualizar sugerencias (mantener algunas existentes si son relevantes)
    const existingSuggestions = suggestions.slice(0, 1);
    setSuggestions([...newSuggestions, ...existingSuggestions].slice(0, 4));
    
    // Simular respuesta de Brújula después de un breve retraso
    setTimeout(() => {
      // Construir respuesta basada en el análisis proactivo
      let responseContent = "Basado en mi análisis del mercado colombiano:";
      
      // Añadir insights del análisis proactivo
      if (analysis.insights && analysis.insights.length > 0) {
        responseContent += "\n\n📊 Datos relevantes:\n";
        analysis.insights.forEach(insight => {
          responseContent += `- ${insight}\n`;
        });
      }
      
      // Añadir recomendaciones
      if (analysis.recommendations && analysis.recommendations.length > 0) {
        responseContent += "\n💡 Recomendaciones:\n";
        analysis.recommendations.forEach(recommendation => {
          responseContent += `- ${recommendation}\n`;
        });
      }
      
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date().toISOString(),
      };
      
      addMessage(newAssistantMessage);
      setIsTyping(false);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  // Componente para los mensajes individuales
  const MessageBubble = ({ message }: { message: Message }) => {
    const isUser = message.role === "user";
    const [isHovered, setIsHovered] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopy = () => {
      navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isUser && (
          <motion.div 
            className="mr-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800">
              <motion.div
                animate={{ rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <MapPin className="h-4 w-4 text-white" />
              </motion.div>
            </Avatar>
          </motion.div>
        )}
        
        <motion.div 
          className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
            isUser 
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white dark:from-blue-700 dark:to-blue-600" 
              : "bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700"
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="whitespace-pre-line">{message.content}</p>
          
          {!isUser && (
            <motion.div 
              className="flex items-center justify-end mt-2 space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      onClick={handleCopy}
                    >
                      {isCopied ? (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Check className="h-3 w-3 text-green-500" />
                        </motion.div>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isCopied ? "¡Copiado!" : "Copiar mensaje"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Me gusta esta respuesta</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>No me gusta esta respuesta</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  };
  
  // Componente para las sugerencias
  const SuggestionCard = ({ suggestion }: { suggestion: Suggestion }) => {
    const getIconByType = () => {
      switch (suggestion.type) {
        case "trend":
          return <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
        case "opportunity":
          return <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
        case "date":
          return <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />;
        case "optimization":
          return <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
        default:
          return <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      }
    };
    
    const getColorsByType = () => {
      switch (suggestion.type) {
        case "trend":
          return "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30";
        case "opportunity":
          return "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30";
        case "date":
          return "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30";
        case "optimization":
          return "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/30";
        default:
          return "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30";
      }
    };
    
    const getTextColorByType = () => {
      switch (suggestion.type) {
        case "trend":
          return "text-amber-800 dark:text-amber-300";
        case "opportunity":
          return "text-blue-800 dark:text-blue-300";
        case "date":
          return "text-green-800 dark:text-green-300";
        case "optimization":
          return "text-purple-800 dark:text-purple-300";
        default:
          return "text-gray-800 dark:text-gray-300";
      }
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`border rounded-xl p-4 shadow-sm ${getColorsByType()}`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 rounded-full bg-white/80 dark:bg-gray-800/80">
            {getIconByType()}
          </div>
          <div className="flex-1">
            <h3 className={`text-base font-medium ${getTextColorByType()}`}>
              {suggestion.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {suggestion.description}
            </p>
            
            {suggestion.tags && suggestion.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestion.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {suggestion.action && (
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 dark:text-blue-400 p-0 h-8 mt-2 hover:bg-transparent hover:text-blue-700 dark:hover:text-blue-300"
              >
                {suggestion.action}
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 h-6 w-6 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            onClick={() => dismissSuggestion(suggestion.id)}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </motion.div>
    );
  };
  
  // Componente para el indicador de escritura
  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center text-sm text-gray-500 dark:text-gray-400 ml-10 mb-4"
    >
      <div className="flex space-x-1 mr-2">
        <motion.span
          animate={{ y: [0, -5, 0], backgroundColor: ["#2563eb", "#60a5fa", "#2563eb"] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
          className="h-2 w-2 rounded-full"
        />
        <motion.span
          animate={{ y: [0, -5, 0], backgroundColor: ["#2563eb", "#60a5fa", "#2563eb"] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
          className="h-2 w-2 rounded-full"
        />
        <motion.span
          animate={{ y: [0, -5, 0], backgroundColor: ["#2563eb", "#60a5fa", "#2563eb"] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
          className="h-2 w-2 rounded-full"
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Brújula está analizando el mercado colombiano...
      </motion.span>
    </motion.div>
  );
  
  // Componente para el indicador de procesamiento
  const ProcessingIndicator = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center py-4"
    >
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="text-blue-600 dark:text-blue-400"
        >
          <BarChart2 className="w-5 h-5" />
        </motion.div>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Analizando datos del mercado colombiano...
        </p>
      </div>
    </motion.div>
  );
  
  // Renderizado condicional para el botón flotante cuando está colapsado
  if (!isExpanded) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button
            className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg flex items-center justify-center"
            onClick={() => setIsExpanded(true)}
          >
            <motion.div
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 5, duration: 1 }}
            >
              <MapPin className="w-6 h-6 text-white" />
            </motion.div>
          </Button>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Clase condicional para el tamaño de la tarjeta
  const cardSizeClass = isFullscreen 
    ? "fixed inset-4 h-auto max-h-[calc(100vh-32px)] w-auto" 
    : "fixed bottom-4 right-4 w-[400px] md:w-[600px] lg:w-[700px] max-h-[600px]";

  // Renderizado condicional basado en si está expandido o minimizado
  if (!isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700 rounded-full p-4 shadow-lg"
          onClick={() => setIsExpanded(true)}
        >
          <MapPin className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="brujula-assistant"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", damping: 20 }}
      className="z-50"
    >
      <Card className={`${cardSizeClass} shadow-xl border-0 rounded-xl overflow-hidden`}>
        {/* Header */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-4 flex items-center justify-between"
          whileHover={{ backgroundColor: "rgba(37, 99, 235, 1)" }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="bg-white dark:bg-blue-900 rounded-full p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold text-white">Brújula</h2>
              <p className="text-sm text-blue-100">
                Asistente inteligente para marketing en Colombia
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-600 dark:hover:bg-blue-800"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-600 dark:hover:bg-blue-800"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-600 dark:hover:bg-blue-800"
              onClick={() => setIsExpanded(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-none bg-white dark:bg-gray-900 border-b dark:border-gray-800">
            <TabsTrigger
              value="consultas"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-none py-3 text-base"
            >
              Consultas
            </TabsTrigger>
            <TabsTrigger
              value="sugerencias"
              className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-none py-3 text-base"
            >
              Sugerencias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultas" className="p-0 mt-0">
            <ScrollArea className="h-[400px] lg:h-[500px]">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                
                <AnimatePresence>
                  {isTyping && <TypingIndicator />}
                </AnimatePresence>
                
                <AnimatePresence>
                  {isProcessing && !isTyping && <ProcessingIndicator />}
                </AnimatePresence>
                
                {/* Div invisible para hacer scroll al final */}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t dark:border-gray-800">
              <div className="flex gap-2">
                <motion.div
                  className="flex-1 relative"
                  whileTap={{ scale: 0.995 }}
                >
                  <Input
                    placeholder="Pregunta sobre el mercado colombiano..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-white dark:bg-gray-800 pr-8 transition-all duration-200 border-blue-100 focus:border-blue-300 dark:border-gray-700 dark:focus:border-blue-700"
                  />
                  {inputValue.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        onClick={() => setInputValue("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
                <div className="flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white dark:bg-gray-800"
                        >
                          <Mic className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enviar mensaje de voz</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white dark:bg-gray-800"
                        >
                          <Image className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Adjuntar imagen</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-700 dark:to-blue-600 dark:hover:from-blue-800 dark:hover:to-blue-700 shadow-sm hover:shadow transition-all duration-200"
                      disabled={!inputValue.trim() || isTyping}
                    >
                      <motion.div
                        animate={isTyping ? { x: [0, 5, 0] } : { x: 0 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Brújula está optimizada para consultas sobre el mercado colombiano y estrategias locales
              </p>
            </div>
          </TabsContent>

          <TabsContent value="sugerencias" className="p-0 mt-0">
            <ScrollArea className="h-[400px] lg:h-[500px]">
              <div className="p-4 space-y-4">
                {/* Mostrar análisis proactivo si existe */}
                {proactiveAnalysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 mb-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-full bg-white/80 dark:bg-gray-800/80">
                        <LineChart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">
                            Análisis de mercado
                          </h3>
                          {getConfidenceBadge(proactiveAnalysis.confidence)}
                        </div>
                        
                        <div className="mt-3 space-y-3">
                          {proactiveAnalysis.insights.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Datos relevantes:
                              </h4>
                              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                {proactiveAnalysis.insights.map((insight, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                                    <span>{insight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {proactiveAnalysis.recommendations.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Recomendaciones:
                              </h4>
                              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                {proactiveAnalysis.recommendations.map((recommendation, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                                    <span>{recommendation}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              
                {/* Selector de región */}
                {regions.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Región:</span>
                    <div className="flex flex-wrap gap-2">
                      {regions.map((region) => (
                        <Badge 
                          key={region.code}
                          variant={context.region === region.code ? "default" : "outline"}
                          className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                          onClick={() => updateContext({ region: region.code })}
                        >
                          {region.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              
                {/* Sugerencias con animaciones */}
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 ${getSuggestionStyle(suggestion.type, suggestion.metadata?.confidence)}`}
                    whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  >
                    <div className="flex items-start gap-3">
                      {getSuggestionIcon(suggestion.type, suggestion.metadata?.confidence)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-lg font-medium ${getSuggestionTitleStyle(suggestion.type)}`}>
                            {suggestion.title}
                          </h3>
                          {suggestion.metadata?.confidence && getConfidenceBadge(suggestion.metadata.confidence)}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">
                          {suggestion.description}
                        </p>
                        {suggestion.tags && suggestion.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {suggestion.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        )}
                        {suggestion.action && (
                          <Button
                            variant="link"
                            className="text-blue-600 dark:text-blue-400 p-0 h-auto mt-2 flex items-center group"
                          >
                            {suggestion.action}{" "}
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        )}
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                              onClick={() => dismissSuggestion(suggestion.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Descartar sugerencia</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </motion.div>
                ))}

                {/* Mensaje cuando no hay sugerencias */}
                {suggestions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-3">
                      <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                      No hay sugerencias disponibles
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                      Realiza consultas sobre el mercado colombiano para recibir sugerencias personalizadas
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default BrujulaAssistant;
