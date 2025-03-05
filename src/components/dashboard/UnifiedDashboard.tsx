import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  BarChart,
  Wand2,
  Target,
  Bell,
  Settings,
  Plus,
  ChevronRight,
} from "lucide-react";

// Import components
import ProjectHeader from "./ProjectHeader";
import TaskBoard from "./TaskBoard";
import ContentGenerator from "./ContentGenerator";
import AIAssistantPanel from "./AIAssistantPanel";
import ContentPlanner from "./ContentPlanner";
import CampaignBuilder from "./CampaignBuilder";
import MultiPlatformEditor from "./MultiPlatformEditor";
import PerformancePredictor from "./PerformancePredictor";
import AISuggestionsPanel from "./AISuggestionsPanel";
import OptimizationPanel from "./OptimizationPanel";
import CollaborationHub from "./CollaborationHub";

const UnifiedDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAIPanel, setShowAIPanel] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div
        className={`flex-1 p-6 ${showAIPanel ? "mr-[400px]" : ""} transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Marketing Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Nuevo Proyecto
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Contenido
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Campañas
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendario
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Analítica
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              IA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ProjectHeader
              title="Campaña de Marketing Q3 2024"
              status="active"
              startDate="2024-07-01"
              teamSize={5}
              progress={65}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TaskBoard />
              </div>
              <div>
                <ContentGenerator />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MultiPlatformEditor />
              <CollaborationHub />
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CampaignBuilder />
              <OptimizationPanel />
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <ContentPlanner />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformancePredictor />
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle>Reportes y Analíticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Selecciona un reporte para visualizar métricas detalladas
                      de tus campañas.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">
                              Rendimiento de Campañas
                            </h3>
                            <p className="text-sm text-gray-500">
                              Métricas de todas las campañas activas
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </Card>
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">
                              Engagement por Plataforma
                            </h3>
                            <p className="text-sm text-gray-500">
                              Comparativa entre redes sociales
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </Card>
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Conversiones</h3>
                            <p className="text-sm text-gray-500">
                              Análisis de embudos de conversión
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </Card>
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">ROI por Canal</h3>
                            <p className="text-sm text-gray-500">
                              Retorno de inversión por canal
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AISuggestionsPanel />
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle>Centro de IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-gray-500">
                      Utiliza nuestras herramientas de IA para optimizar tu
                      estrategia de marketing.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-2">
                          <Wand2 className="h-8 w-8 text-primary" />
                          <h3 className="font-medium">
                            Generador de Contenido
                          </h3>
                          <p className="text-sm text-gray-500">
                            Crea contenido para múltiples plataformas
                          </p>
                          <Badge className="w-fit">Popular</Badge>
                        </div>
                      </Card>
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-2">
                          <Target className="h-8 w-8 text-primary" />
                          <h3 className="font-medium">Análisis de Audiencia</h3>
                          <p className="text-sm text-gray-500">
                            Identifica segmentos y preferencias
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-2">
                          <BarChart className="h-8 w-8 text-primary" />
                          <h3 className="font-medium">
                            Predictor de Rendimiento
                          </h3>
                          <p className="text-sm text-gray-500">
                            Estima el éxito de tus campañas
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-2">
                          <Calendar className="h-8 w-8 text-primary" />
                          <h3 className="font-medium">
                            Planificador Inteligente
                          </h3>
                          <p className="text-sm text-gray-500">
                            Optimiza tu calendario editorial
                          </p>
                          <Badge variant="outline" className="w-fit">
                            Nuevo
                          </Badge>
                        </div>
                      </Card>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-4">Historial de IA</h3>
                      <ScrollArea className="h-[200px]">
                        <div className="space-y-2">
                          {[
                            "Generación de contenido para campaña Q3",
                            "Análisis de competidores en sector tecnología",
                            "Optimización de horarios de publicación",
                            "Predicción de rendimiento para campaña de email",
                            "Generación de ideas para contenido de blog",
                            "Análisis de sentimiento de comentarios",
                            "Recomendaciones para mejorar engagement",
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md"
                            >
                              <span className="text-sm">{item}</span>
                              <span className="text-xs text-gray-500">
                                Hace {index + 1}h
                              </span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant Panel */}
      {showAIPanel && (
        <AIAssistantPanel
          isOpen={showAIPanel}
          onClose={() => setShowAIPanel(false)}
          context={{ activeTab }}
        />
      )}

      {/* Toggle AI Panel Button */}
      {!showAIPanel && (
        <Button
          className="fixed right-6 bottom-6 rounded-full h-12 w-12 p-0"
          onClick={() => setShowAIPanel(true)}
        >
          <Wand2 className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default UnifiedDashboard;
