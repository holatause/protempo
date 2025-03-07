import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  Plus,
  Save,
  Trash2,
  Copy,
  Edit,
  Play,
  Sparkles,
  MessageSquare,
  Upload,
  Database,
  Settings,
  Code,
  Zap,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  role: string;
  personality: string;
  knowledgeBase: string[];
  systemPrompt: string;
  capabilities: string[];
  isActive: boolean;
  createdAt: Date;
  lastModified: Date;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Marketing Assistant",
    description: "Asistente especializado en estrategias de marketing digital",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Marketing",
    role: "marketing",
    personality: "Profesional, creativo y orientado a resultados",
    knowledgeBase: ["marketing_digital.pdf", "social_media_trends.pdf"],
    systemPrompt:
      "Eres un asistente de marketing digital especializado en el mercado colombiano. Tu objetivo es proporcionar estrategias efectivas, contenido persuasivo y recomendaciones basadas en las mejores prácticas de la industria.",
    capabilities: [
      "content_generation",
      "campaign_planning",
      "analytics_interpretation",
    ],
    isActive: true,
    createdAt: new Date(2024, 2, 15),
    lastModified: new Date(2024, 4, 10),
  },
  {
    id: "2",
    name: "Content Creator",
    description: "Especialista en creación de contenido para redes sociales",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Content",
    role: "content",
    personality: "Creativo, actual y con conocimiento de tendencias",
    knowledgeBase: ["content_best_practices.pdf", "copywriting_guide.pdf"],
    systemPrompt:
      "Eres un creador de contenido especializado en redes sociales. Tu objetivo es generar textos atractivos, ideas para posts y estrategias de contenido que generen engagement.",
    capabilities: ["social_media_content", "copywriting", "hashtag_research"],
    isActive: true,
    createdAt: new Date(2024, 3, 5),
    lastModified: new Date(2024, 4, 12),
  },
  {
    id: "3",
    name: "Analytics Expert",
    description: "Experto en análisis de datos y métricas de marketing",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Analytics",
    role: "analytics",
    personality: "Analítico, preciso y orientado a datos",
    knowledgeBase: ["marketing_metrics.pdf", "data_analysis.pdf"],
    systemPrompt:
      "Eres un analista de datos especializado en marketing digital. Tu objetivo es interpretar métricas, identificar tendencias y proporcionar recomendaciones accionables para optimizar campañas.",
    capabilities: [
      "data_analysis",
      "performance_reporting",
      "trend_identification",
    ],
    isActive: false,
    createdAt: new Date(2024, 1, 20),
    lastModified: new Date(2024, 3, 15),
  },
];

const AgentBuilder = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("configuration");
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: "",
    description: "",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=New",
    role: "general",
    personality: "",
    knowledgeBase: [],
    systemPrompt: "",
    capabilities: [],
    isActive: true,
  });

  const handleCreateAgent = () => {
    // Validar campos
    if (!newAgent.name || !newAgent.description || !newAgent.systemPrompt) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    // Crear nuevo agente
    const agent: Agent = {
      id: Date.now().toString(),
      name: newAgent.name,
      description: newAgent.description,
      avatar:
        newAgent.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=New",
      role: newAgent.role || "general",
      personality: newAgent.personality || "",
      knowledgeBase: newAgent.knowledgeBase || [],
      systemPrompt: newAgent.systemPrompt,
      capabilities: newAgent.capabilities || [],
      isActive: newAgent.isActive || true,
      createdAt: new Date(),
      lastModified: new Date(),
    };

    setAgents([...agents, agent]);
    setSelectedAgent(agent);
    setIsCreating(false);
    setNewAgent({
      name: "",
      description: "",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=New",
      role: "general",
      personality: "",
      knowledgeBase: [],
      systemPrompt: "",
      capabilities: [],
      isActive: true,
    });
  };

  const handleTestAgent = async () => {
    if (!selectedAgent || !testMessage.trim()) return;

    setIsLoading(true);
    setTestResponse("");

    try {
      // Simulamos una respuesta del agente después de un breve retraso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generamos una respuesta basada en el rol del agente
      let response = "";

      if (selectedAgent.role === "marketing") {
        response = `Basado en mi análisis, te recomendaría enfocarte en una estrategia de contenido que resalte los beneficios únicos de tu producto. Considerando las tendencias actuales, el video corto y contenido interactivo están generando mayor engagement. Podríamos desarrollar una campaña que combine ambos formatos para maximizar el alcance y las conversiones.`;
      } else if (selectedAgent.role === "content") {
        response = `He analizado tu solicitud y te propongo el siguiente copy para tu post de Instagram:\n\n"✨ ¡Descubre la revolución en [tu producto]! 🚀\n\nNuestra nueva colección no solo transforma tu experiencia, sino que redefine los estándares de la industria. Diseñado para quienes buscan excelencia sin compromisos.\n\n👉 Disponible ahora con 15% de descuento por lanzamiento\n\n#InnovaciónConstante #CalidadSuprema #NuevaColección"`;
      } else if (selectedAgent.role === "analytics") {
        response = `Analizando los datos de tu última campaña, observo que tuviste un CTR de 3.2%, un 0.8% por encima del benchmark de la industria. Sin embargo, la tasa de conversión (1.5%) está por debajo del objetivo (2.3%). Recomiendo optimizar las páginas de destino y revisar el proceso de checkout para reducir la fricción. Los segmentos que mejor respondieron fueron mujeres de 25-34 años interesadas en tecnología y bienestar.`;
      } else {
        response = `He procesado tu mensaje y, basado en mi configuración actual, puedo ayudarte con esta solicitud. ¿Necesitas información adicional o prefieres que profundice en algún aspecto específico?`;
      }

      setTestResponse(response);
    } catch (error) {
      console.error("Error testing agent:", error);
      setTestResponse(
        "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAgent = (agentId: string) => {
    if (confirm("¿Estás seguro de eliminar este agente?")) {
      setAgents(agents.filter((agent) => agent.id !== agentId));
      if (selectedAgent?.id === agentId) {
        setSelectedAgent(null);
      }
    }
  };

  const handleToggleActive = (agent: Agent) => {
    const updatedAgent = { ...agent, isActive: !agent.isActive };
    setAgents(agents.map((a) => (a.id === agent.id ? updatedAgent : a)));
    if (selectedAgent?.id === agent.id) {
      setSelectedAgent(updatedAgent);
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Constructor de Agentes IA
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[700px]">
          {/* Lista de Agentes */}
          <div className="border-r">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Mis Agentes</h3>
              <Button size="sm" onClick={() => setIsCreating(true)}>
                <Plus className="w-4 h-4 mr-2" /> Nuevo
              </Button>
            </div>
            <ScrollArea className="h-[calc(700px-57px)]">
              <div className="p-4 space-y-4">
                {agents.map((agent) => (
                  <Card
                    key={agent.id}
                    className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${selectedAgent?.id === agent.id ? "border-primary" : ""}`}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setIsCreating(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${agent.isActive ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{agent.name}</h4>
                        <p className="text-xs text-gray-500 truncate">
                          {agent.description}
                        </p>
                      </div>
                      <Badge variant="outline">{agent.role}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Detalles del Agente */}
          <div className="md:col-span-2">
            {isCreating ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="font-semibold text-lg">Nuevo Agente</h2>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="agent-name">Nombre *</Label>
                        <Input
                          id="agent-name"
                          value={newAgent.name}
                          onChange={(e) =>
                            setNewAgent({
                              ...newAgent,
                              name: e.target.value,
                            })
                          }
                          placeholder="Ej: Asistente de Marketing"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agent-description">Descripción *</Label>
                        <Textarea
                          id="agent-description"
                          value={newAgent.description}
                          onChange={(e) =>
                            setNewAgent({
                              ...newAgent,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe brevemente la función de este agente"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agent-role">Rol</Label>
                        <Select
                          value={newAgent.role}
                          onValueChange={(value) =>
                            setNewAgent({ ...newAgent, role: value })
                          }
                        >
                          <SelectTrigger id="agent-role">
                            <SelectValue placeholder="Selecciona un rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="content">Contenido</SelectItem>
                            <SelectItem value="analytics">Analítica</SelectItem>
                            <SelectItem value="sales">Ventas</SelectItem>
                            <SelectItem value="support">Soporte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agent-personality">Personalidad</Label>
                        <Textarea
                          id="agent-personality"
                          value={newAgent.personality}
                          onChange={(e) =>
                            setNewAgent({
                              ...newAgent,
                              personality: e.target.value,
                            })
                          }
                          placeholder="Describe la personalidad del agente (ej: profesional, amigable, técnico)"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agent-prompt">
                          Prompt del Sistema *
                        </Label>
                        <Textarea
                          id="agent-prompt"
                          value={newAgent.systemPrompt}
                          onChange={(e) =>
                            setNewAgent({
                              ...newAgent,
                              systemPrompt: e.target.value,
                            })
                          }
                          placeholder="Instrucciones detalladas sobre cómo debe comportarse el agente"
                          className="min-h-[150px]"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="agent-active"
                          checked={newAgent.isActive}
                          onCheckedChange={(checked) =>
                            setNewAgent({ ...newAgent, isActive: checked })
                          }
                        />
                        <Label htmlFor="agent-active">Activar agente</Label>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="p-4 border-t flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateAgent}>Crear Agente</Button>
                </div>
              </div>
            ) : selectedAgent ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="configuration">
                        <Settings className="w-4 h-4 mr-2" /> Configuración
                      </TabsTrigger>
                      <TabsTrigger value="knowledge">
                        <Database className="w-4 h-4 mr-2" /> Base de
                        Conocimiento
                      </TabsTrigger>
                      <TabsTrigger value="test">
                        <Play className="w-4 h-4 mr-2" /> Probar
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6">
                    <TabsContent
                      value="configuration"
                      className="space-y-6 mt-0"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedAgent.avatar}
                          alt={selectedAgent.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h2 className="text-xl font-semibold">
                            {selectedAgent.name}
                          </h2>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {selectedAgent.role}
                            </Badge>
                            <Badge
                              variant={
                                selectedAgent.isActive ? "default" : "secondary"
                              }
                              className={
                                selectedAgent.isActive
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : ""
                              }
                            >
                              {selectedAgent.isActive ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Descripción
                          </h3>
                          <p className="mt-1">{selectedAgent.description}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Personalidad
                          </h3>
                          <p className="mt-1">{selectedAgent.personality}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Prompt del Sistema
                          </h3>
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm font-mono whitespace-pre-wrap">
                            {selectedAgent.systemPrompt}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Capacidades
                          </h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {selectedAgent.capabilities.map(
                              (capability, index) => (
                                <Badge key={index} variant="outline">
                                  {capability.replace("_", " ")}
                                </Badge>
                              ),
                            )}
                            {selectedAgent.capabilities.length === 0 && (
                              <span className="text-sm text-gray-500">
                                No hay capacidades definidas
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="knowledge" className="space-y-6 mt-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Base de Conocimiento</h3>
                        <Button size="sm">
                          <Upload className="w-4 h-4 mr-2" /> Subir Archivo
                        </Button>
                      </div>

                      {selectedAgent.knowledgeBase.length > 0 ? (
                        <div className="space-y-2">
                          {selectedAgent.knowledgeBase.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-500" />
                                <span>{file}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border rounded-md">
                          <Database className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">
                            No hay archivos en la base de conocimiento
                          </p>
                          <Button variant="outline" size="sm" className="mt-4">
                            <Plus className="w-4 h-4 mr-2" /> Añadir Archivos
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="test" className="space-y-6 mt-0">
                      <div className="border rounded-md p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={selectedAgent.avatar}
                            alt={selectedAgent.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h3 className="font-medium">
                              {selectedAgent.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {selectedAgent.role}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4 p-4 bg-gray-50 rounded-md min-h-[200px]">
                          {testResponse ? (
                            <p className="whitespace-pre-line">
                              {testResponse}
                            </p>
                          ) : (
                            <p className="text-gray-400 text-center mt-12">
                              Las respuestas del agente aparecerán aquí
                            </p>
                          )}
                          {isLoading && (
                            <div className="flex justify-center mt-4">
                              <div className="animate-pulse flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Escribe un mensaje para probar el agente..."
                            value={testMessage}
                            onChange={(e) => setTestMessage(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            onClick={handleTestAgent}
                            disabled={isLoading || !testMessage.trim()}
                            className="self-end"
                          >
                            {isLoading ? (
                              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                              <Zap className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Mensajes de Ejemplo</h3>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal h-auto py-2"
                            onClick={() =>
                              setTestMessage(
                                "¿Puedes ayudarme a crear una estrategia de marketing para el lanzamiento de un nuevo producto?",
                              )
                            }
                          >
                            ¿Puedes ayudarme a crear una estrategia de marketing
                            para el lanzamiento de un nuevo producto?
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal h-auto py-2"
                            onClick={() =>
                              setTestMessage(
                                "Necesito un copy para un post de Instagram sobre nuestra nueva colección",
                              )
                            }
                          >
                            Necesito un copy para un post de Instagram sobre
                            nuestra nueva colección
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal h-auto py-2"
                            onClick={() =>
                              setTestMessage(
                                "Analiza los resultados de mi última campaña y dame recomendaciones para mejorar",
                              )
                            }
                          >
                            Analiza los resultados de mi última campaña y dame
                            recomendaciones para mejorar
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </ScrollArea>

                <div className="p-4 border-t flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteAgent(selectedAgent.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleToggleActive(selectedAgent)}
                    >
                      {selectedAgent.isActive ? "Desactivar" : "Activar"}
                    </Button>
                    <Button>
                      <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Bot className="w-12 h-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium">Selecciona un agente</h3>
                  <p className="text-gray-500 max-w-md">
                    Selecciona un agente existente para ver sus detalles o crea
                    un nuevo agente personalizado
                  </p>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Nuevo Agente
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentBuilder;
