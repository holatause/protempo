import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Bot,
  Sparkles,
  Lightbulb,
  Wand2,
  Image,
  FileText,
  MessageSquare,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  PenTool,
  BarChart,
  Megaphone,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  attachments?: {
    id: string;
    type: "image" | "document";
    url: string;
  }[];
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: "content" | "design" | "strategy" | "analytics";
  icon: React.ReactNode;
}

const mockSuggestions: Suggestion[] = [
  {
    id: "s1",
    title: "Generar ideas para campaña",
    description: "Crea ideas de contenido para tu próxima campaña de marketing",
    category: "content",
    icon: <PenTool className="w-4 h-4" />,
  },
  {
    id: "s2",
    title: "Analizar rendimiento",
    description: "Analiza el rendimiento de tus campañas actuales",
    category: "analytics",
    icon: <BarChart className="w-4 h-4" />,
  },
  {
    id: "s3",
    title: "Optimizar copy",
    description: "Mejora tus textos para mayor engagement",
    category: "content",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "s4",
    title: "Estrategia de canales",
    description: "Recomienda los mejores canales para tu audiencia",
    category: "strategy",
    icon: <Megaphone className="w-4 h-4" />,
  },
  {
    id: "s5",
    title: "Generar imágenes",
    description: "Crea imágenes para tus campañas con IA",
    category: "design",
    icon: <Image className="w-4 h-4" />,
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "¡Hola! Soy tu asistente de marketing con IA. ¿En qué puedo ayudarte hoy?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
];

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [suggestions] = useState<Suggestion[]>(mockSuggestions);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    const scrollArea = document.getElementById("message-scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    // Add loading message from assistant
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages([...messages, userMessage, loadingMessage]);
    setInputValue("");
    setIsGenerating(true);

    // Simulate AI response after delay
    setTimeout(() => {
      // Remove loading message and add real response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: generateResponse(inputValue),
            timestamp: new Date(),
          },
        ];
      });
      setIsGenerating(false);
    }, 2000);
  };

  const generateResponse = (input: string): string => {
    // Simple response generation logic
    if (
      input.toLowerCase().includes("campaña") ||
      input.toLowerCase().includes("campaign")
    ) {
      return "Para crear una campaña efectiva, te recomiendo seguir estos pasos:\n\n1. Define claramente tu audiencia objetivo\n2. Establece objetivos medibles (KPIs)\n3. Crea un mensaje claro y convincente\n4. Selecciona los canales adecuados\n5. Establece un presupuesto realista\n6. Implementa un calendario de contenidos\n7. Mide y optimiza constantemente\n\n¿Te gustaría que profundice en alguno de estos puntos?";
    }

    if (
      input.toLowerCase().includes("contenido") ||
      input.toLowerCase().includes("content")
    ) {
      return "Para generar contenido de alto impacto, considera estas ideas:\n\n• Historias de clientes y casos de éxito\n• Tutoriales y guías paso a paso\n• Infografías con datos relevantes del sector\n• Webinars y eventos virtuales\n• Entrevistas con expertos de la industria\n• Contenido generado por usuarios\n• Preguntas frecuentes y respuestas detalladas\n\n¿Qué tipo de contenido te interesa más para tu estrategia?";
    }

    if (
      input.toLowerCase().includes("analítica") ||
      input.toLowerCase().includes("analytics")
    ) {
      return "Para analizar el rendimiento de tus campañas, deberías enfocarte en estas métricas clave:\n\n• Tasa de conversión\n• Costo por adquisición (CPA)\n• Retorno de inversión (ROI)\n• Engagement (CTR, tiempo en página)\n• Alcance y impresiones\n• Tasa de rebote\n• Valor de vida del cliente (LTV)\n\nPuedo ayudarte a interpretar estos datos y sugerir optimizaciones basadas en ellos.";
    }

    // Default response
    return "Gracias por tu mensaje. Estoy aquí para ayudarte con tus necesidades de marketing. Puedo asistirte con estrategias de contenido, análisis de datos, optimización de campañas, y mucho más. ¿Hay algo específico en lo que estés trabajando?";
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    // Add suggestion as user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: suggestion.title,
      timestamp: new Date(),
    };

    // Add loading message from assistant
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages([...messages, userMessage, loadingMessage]);
    setIsGenerating(true);

    // Simulate AI response after delay
    setTimeout(() => {
      // Remove loading message and add real response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: generateSuggestionResponse(suggestion),
            timestamp: new Date(),
          },
        ];
      });
      setIsGenerating(false);
    }, 2000);
  };

  const generateSuggestionResponse = (suggestion: Suggestion): string => {
    switch (suggestion.category) {
      case "content":
        return "Aquí tienes algunas ideas de contenido para tu próxima campaña:\n\n1. **Serie de posts educativos** sobre tu industria\n2. **Testimonios visuales** de clientes satisfechos\n3. **Contenido interactivo** como encuestas o cuestionarios\n4. **Tutoriales en video** mostrando el uso de tus productos\n5. **Infografías** con estadísticas relevantes\n6. **Entrevistas** con líderes de opinión\n7. **Contenido generado por usuarios** destacando experiencias reales\n\n¿Alguna de estas ideas te interesa particularmente?";

      case "analytics":
        return "Para analizar el rendimiento de tus campañas actuales, te recomiendo revisar:\n\n• **Tasa de conversión por canal** - Identifica qué plataformas están generando más resultados\n• **Engagement por tipo de contenido** - Determina qué formatos resuenan mejor con tu audiencia\n• **ROI por campaña** - Evalúa qué iniciativas están generando mejor retorno\n• **Segmentación de audiencia** - Analiza qué grupos demográficos responden mejor\n• **Análisis de embudo** - Identifica dónde están los cuellos de botella en tu proceso de conversión\n\n¿Te gustaría que profundice en alguno de estos análisis?";

      case "strategy":
        return "Basado en las tendencias actuales, estos son los canales más efectivos según el tipo de audiencia:\n\n• **Millennials y Gen Z**: TikTok, Instagram, YouTube\n• **Profesionales B2B**: LinkedIn, Email, Webinars\n• **Audiencia general**: Facebook, Google Ads\n• **Nichos específicos**: Comunidades en Reddit, Grupos de Facebook, Newsletters especializadas\n\nPara determinar la mejor estrategia de canales para tu negocio específico, considera:\n\n1. Dónde está realmente tu audiencia\n2. Qué tipo de contenido puedes crear consistentemente\n3. Tu presupuesto y recursos disponibles\n4. Tus objetivos de marketing (awareness, conversión, retención)\n\n¿Quieres que te ayude a crear una estrategia personalizada?";

      case "design":
        return "Para generar imágenes efectivas para tus campañas, considera estos principios de diseño:\n\n1. **Simplicidad** - Menos es más, evita el desorden visual\n2. **Consistencia de marca** - Mantén colores, fuentes y estilo coherentes\n3. **Jerarquía visual** - Guía la mirada del espectador hacia los elementos importantes\n4. **Contraste** - Asegura legibilidad y destaca elementos clave\n5. **Espacio en blanco** - Da respiro a tus diseños\n\nPuedo ayudarte a generar conceptos visuales basados en tu brief de campaña. ¿Te gustaría proporcionarme más detalles sobre tu campaña actual?";

      default:
        return "Estoy listo para ayudarte con esta solicitud. Por favor, proporciona más detalles sobre lo que necesitas y podré ofrecerte recomendaciones personalizadas.";
    }
  };

  const handleCopyResponse = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatMessageContent = (content: string) => {
    // Handle line breaks
    const paragraphs = content.split("\n\n");

    return paragraphs.map((paragraph, i) => {
      // Handle bullet points
      if (paragraph.includes("\n•")) {
        const [title, ...bullets] = paragraph.split("\n•");
        return (
          <div key={i} className="mb-3">
            {title && <p>{title}</p>}
            <ul className="list-disc pl-5 space-y-1 mt-1">
              {bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          </div>
        );
      }

      // Handle numbered lists
      if (paragraph.includes("\n1.")) {
        const [title, ...items] = paragraph.split("\n");
        return (
          <div key={i} className="mb-3">
            {title && <p>{title}</p>}
            <ol className="list-decimal pl-5 space-y-1 mt-1">
              {items
                .map((item, j) => {
                  // Extract the number and text
                  const match = item.match(/^(\d+\.)\s(.+)$/);
                  if (match) {
                    return <li key={j}>{match[2]}</li>;
                  }
                  return null;
                })
                .filter(Boolean)}
            </ol>
          </div>
        );
      }

      // Handle bold text with **
      if (paragraph.includes("**")) {
        const parts = paragraph.split(/\*\*(.+?)\*\*/g);
        return (
          <p key={i} className="mb-3">
            {parts.map((part, j) =>
              j % 2 === 0 ? part : <strong key={j}>{part}</strong>,
            )}
          </p>
        );
      }

      // Regular paragraph
      return (
        <p key={i} className="mb-3">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Asistente de Marketing IA
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="suggestions"
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Sugerencias
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 p-6" id="message-scroll-area">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar
                        className={
                          message.role === "user"
                            ? "bg-primary"
                            : "bg-secondary"
                        }
                      >
                        {message.role === "user" ? (
                          <AvatarFallback>TÚ</AvatarFallback>
                        ) : (
                          <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=AI" />
                        )}
                      </Avatar>
                      <div
                        className={`space-y-2 ${message.role === "user" ? "text-right" : ""}`}
                      >
                        <div
                          className={`p-3 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          {message.isLoading ? (
                            <div className="flex items-center justify-center h-8">
                              <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                          ) : (
                            <div className="prose-sm">
                              {formatMessageContent(message.content)}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 gap-2">
                          <span>
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {message.role === "assistant" &&
                            !message.isLoading && (
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    handleCopyResponse(message.content)
                                  }
                                >
                                  {copied ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isGenerating}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isGenerating || !inputValue.trim()}
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <Bot className="w-3 h-3 mr-1" />
                <span>Asistente de IA para marketing • Powered by AI</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Sugerencias Rápidas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestions.map((suggestion) => (
                    <Card
                      key={suggestion.id}
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          {suggestion.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{suggestion.title}</h4>
                          <p className="text-sm text-gray-600">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Capacidades del Asistente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <PenTool className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-medium">Creación de Contenido</h4>
                    <p className="text-sm text-gray-600">
                      Genera ideas, optimiza textos y crea estrategias de
                      contenido
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <BarChart className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-medium">Análisis de Datos</h4>
                    <p className="text-sm text-gray-600">
                      Interpreta métricas y ofrece recomendaciones basadas en
                      datos
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <Wand2 className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-medium">Optimización de Campañas</h4>
                    <p className="text-sm text-gray-600">
                      Mejora el rendimiento de tus campañas con sugerencias
                      inteligentes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
