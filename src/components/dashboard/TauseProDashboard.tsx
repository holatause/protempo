import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
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
  Users,
  Globe,
  TrendingUp,
  AlertCircle,
  LineChart,
  PieChart,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles
} from "lucide-react";

// Importar TauseProAssistant
import TauseProAssistant from "@/components/ai/TauseProAssistant";

// Componentes temporales para el MVP
const MarketingMetrics = () => (
  <Card className="w-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">Métricas de Marketing</CardTitle>
      <CardDescription>Rendimiento general de tus campañas</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Engagement</p>
            <p className="text-2xl font-bold">8.4%</p>
          </div>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" /> 12%
          </Badge>
        </div>
        <Progress value={84} className="h-2" />
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-sm text-muted-foreground">Conversiones</p>
            <p className="text-2xl font-bold">3.2%</p>
          </div>
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 flex items-center">
            <ArrowDownRight className="h-3 w-3 mr-1" /> 2%
          </Badge>
        </div>
        <Progress value={32} className="h-2" />
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-sm text-muted-foreground">ROI</p>
            <p className="text-2xl font-bold">215%</p>
          </div>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" /> 8%
          </Badge>
        </div>
        <Progress value={72} className="h-2" />
      </div>
    </CardContent>
  </Card>
);

const RegionalInsights = () => (
  <Card className="w-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">Insights Regionales</CardTitle>
      <CardDescription>Rendimiento por región en Colombia</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">BOG</Badge>
            <span className="text-sm font-medium">Bogotá</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">42%</span>
            <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
          </div>
        </div>
        <Progress value={42} className="h-2" />
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">MED</Badge>
            <span className="text-sm font-medium">Medellín</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">28%</span>
            <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
          </div>
        </div>
        <Progress value={28} className="h-2" />
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Badge className="mr-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">CAL</Badge>
            <span className="text-sm font-medium">Cali</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">18%</span>
            <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
          </div>
        </div>
        <Progress value={18} className="h-2" />
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Badge className="mr-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">BAR</Badge>
            <span className="text-sm font-medium">Barranquilla</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">12%</span>
            <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
          </div>
        </div>
        <Progress value={12} className="h-2" />
      </div>
    </CardContent>
  </Card>
);

const UpcomingCampaigns = () => (
  <Card className="w-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">Próximas Campañas</CardTitle>
      <CardDescription>Campañas programadas para los próximos 30 días</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <a href="/campanas" className="block">
          <div className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/10 cursor-pointer transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Lanzamiento Colección Verano</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Inicia en 5 días</span>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Lista
              </Badge>
            </div>
          </div>
        </a>
        
        <a href="/campanas" className="block">
          <div className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/10 cursor-pointer transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Promoción Día sin IVA</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Inicia en 12 días</span>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                En preparación
              </Badge>
            </div>
          </div>
        </a>
        
        <a href="/campanas" className="block">
          <div className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/10 cursor-pointer transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Webinar Tendencias 2024</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Inicia en 18 días</span>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                Planificación
              </Badge>
            </div>
          </div>
        </a>
      </div>
      
      <Button variant="ghost" className="w-full mt-4 text-primary" asChild>
        <a href="/campanas">
          Ver todas las campañas
          <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </Button>
    </CardContent>
  </Card>
);

const ContentCalendar = () => (
  <Card className="w-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">Calendario de Contenido</CardTitle>
      <CardDescription>Próximas publicaciones programadas</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/10 cursor-pointer transition-colors">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md mr-3">
            <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Post: Beneficios del producto</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Hoy, 15:00</span>
            </div>
          </div>
          <Badge>Instagram</Badge>
        </div>
        
        <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/10 cursor-pointer transition-colors">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md mr-3">
            <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Video: Tutorial de uso</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Mañana, 10:00</span>
            </div>
          </div>
          <Badge>YouTube</Badge>
        </div>
        
        <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/10 cursor-pointer transition-colors">
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md mr-3">
            <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Blog: Tendencias del sector</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Viernes, 12:00</span>
            </div>
          </div>
          <Badge>Web</Badge>
        </div>
      </div>
      
      <Button variant="ghost" className="w-full mt-4 text-primary" asChild>
        <a href="/calendario">
          Ver calendario completo
          <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </Button>
    </CardContent>
  </Card>
);

const MarketTrends = () => (
  <Card className="w-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">Tendencias del Mercado</CardTitle>
      <CardDescription>Tendencias actuales en Colombia</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="p-3 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="font-medium text-blue-700 dark:text-blue-400">Marketing conversacional</h3>
          </div>
          <p className="text-sm mt-2">Las marcas que implementan chatbots y asistentes virtuales están viendo un aumento del 35% en engagement.</p>
          <div className="flex justify-between items-center mt-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              Alta confianza (92%)
            </Badge>
            <Button variant="ghost" size="sm" className="text-blue-700 dark:text-blue-400">
              Explorar
            </Button>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/30 border-green-200 dark:border-green-800">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <h3 className="font-medium text-green-700 dark:text-green-400">Contenido generado por IA</h3>
          </div>
          <p className="text-sm mt-2">Las empresas que utilizan IA para generar contenido están reduciendo costos en un 45% y aumentando producción en un 60%.</p>
          <div className="flex justify-between items-center mt-2">
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Alta confianza (95%)
            </Badge>
            <Button variant="ghost" size="sm" className="text-green-700 dark:text-green-400">
              Explorar
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const TauseProDashboard = () => {
  const [activeTab, setActiveTab] = useState("resumen");
  const [showAssistant, setShowAssistant] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Contenido Principal */}
      <div
        className={`flex-1 p-6 ${showAssistant ? "mr-[400px]" : ""} transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Tause Pro</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Nueva Campaña
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-7 mb-6">
            <TabsTrigger value="resumen" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="campanas" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Campañas
            </TabsTrigger>
            <TabsTrigger value="contenido" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Contenido
            </TabsTrigger>
            <TabsTrigger value="calendario" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendario
            </TabsTrigger>
            <TabsTrigger value="audiencia" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Audiencia
            </TabsTrigger>
            <TabsTrigger value="analisis" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Análisis
            </TabsTrigger>
            <TabsTrigger value="canales" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Canales
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Campañas Activas</p>
                      <p className="text-3xl font-bold">12</p>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 dark:text-green-400 font-medium">+3</span>
                    <span className="text-muted-foreground ml-1">desde el mes pasado</span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
                    <a href="/campanas">
                      <span className="flex items-center">
                        Ver campañas <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Contenidos Publicados</p>
                      <p className="text-3xl font-bold">47</p>
                    </div>
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 dark:text-green-400 font-medium">+12</span>
                    <span className="text-muted-foreground ml-1">desde el mes pasado</span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
                    <a href="/calendario">
                      <span className="flex items-center">
                        Ver contenidos <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Alcance Total</p>
                      <p className="text-3xl font-bold">125K</p>
                    </div>
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 dark:text-green-400 font-medium">+18%</span>
                    <span className="text-muted-foreground ml-1">desde el mes pasado</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversiones</p>
                      <p className="text-3xl font-bold">3.8K</p>
                    </div>
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                      <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 dark:text-green-400 font-medium">+7%</span>
                    <span className="text-muted-foreground ml-1">desde el mes pasado</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rendimiento de Campañas</CardTitle>
                    <CardDescription>Análisis de las últimas 4 semanas</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">Gráfico de rendimiento (datos simulados para el MVP)</p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MarketingMetrics />
                  <RegionalInsights />
                </div>
              </div>
              
              <div className="space-y-6">
                <MarketTrends />
                <UpcomingCampaigns />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="campanas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Campañas</CardTitle>
                <CardDescription>Crea y optimiza tus campañas de marketing</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Target className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-medium mb-2">Módulo de Campañas</p>
                  <p className="text-muted-foreground mb-6">Gestiona todas tus campañas de marketing desde un solo lugar</p>
                  <Button asChild>
                    <a href="/campanas">
                      <Target className="h-4 w-4 mr-2" /> Ir a Gestión de Campañas
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contenido" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Contenido</CardTitle>
                <CardDescription>Crea y gestiona tu contenido para múltiples plataformas</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-medium mb-2">Módulo de Contenido</p>
                  <p className="text-muted-foreground mb-6">Este módulo estará disponible en la próxima fase del MVP</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Nuevo Contenido
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendario" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendario de Contenido</CardTitle>
                <CardDescription>Planifica y programa tu contenido</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 h-80 flex items-center justify-center border rounded-lg">
                    <div className="text-center">
                      <Calendar className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                      <p className="text-xl font-medium mb-2">Módulo de Calendario</p>
                      <p className="text-muted-foreground mb-6">Planifica y gestiona tu contenido en todas las plataformas</p>
                      <Button asChild>
                        <a href="/calendario">
                          <Calendar className="h-4 w-4 mr-2" /> Ir al Calendario de Contenido
                        </a>
                      </Button>
                    </div>
                  </div>
                  <ContentCalendar />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audiencia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Audiencia</CardTitle>
                <CardDescription>Segmentación y análisis de tu audiencia</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-medium mb-2">Módulo de Audiencia</p>
                  <p className="text-muted-foreground mb-6">Este módulo estará disponible en la próxima fase del MVP</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Nuevo Segmento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analisis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análisis y Reportes</CardTitle>
                <CardDescription>Métricas detalladas de tus campañas y contenidos</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-medium mb-2">Módulo de Análisis</p>
                  <p className="text-muted-foreground mb-6">Este módulo estará disponible en la próxima fase del MVP</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Nuevo Reporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="canales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integración Multicanal</CardTitle>
                <CardDescription>Gestiona todos tus canales de marketing desde un solo lugar</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-medium mb-2">Módulo de Canales</p>
                  <p className="text-muted-foreground mb-6">Este módulo estará disponible en la próxima fase del MVP</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Conectar Canal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Asistente de Tause Pro */}
      {showAssistant && <TauseProAssistant />}
    </div>
  );
};

export default TauseProDashboard;
