import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointerClick,
  Share2,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface MetricCard {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

interface PlatformMetric {
  platform: string;
  followers: number;
  engagement: number;
  reach: number;
  clicks: number;
  posts: number;
}

const mockMetrics: MetricCard[] = [
  {
    title: "Alcance Total",
    value: "45,782",
    change: 12.3,
    trend: "up",
    icon: <Eye className="w-5 h-5 text-blue-500" />
  },
  {
    title: "Engagement",
    value: "8.7%",
    change: 2.1,
    trend: "up",
    icon: <MousePointerClick className="w-5 h-5 text-green-500" />
  },
  {
    title: "Conversiones",
    value: "1,243",
    change: -3.5,
    trend: "down",
    icon: <Share2 className="w-5 h-5 text-purple-500" />
  },
  {
    title: "Nuevos Seguidores",
    value: "2,891",
    change: 8.4,
    trend: "up",
    icon: <Users className="w-5 h-5 text-amber-500" />
  }
];

const mockPlatforms: PlatformMetric[] = [
  {
    platform: "instagram",
    followers: 12500,
    engagement: 4.2,
    reach: 28000,
    clicks: 1850,
    posts: 24
  },
  {
    platform: "facebook",
    followers: 8700,
    engagement: 2.8,
    reach: 15000,
    clicks: 950,
    posts: 18
  },
  {
    platform: "twitter",
    followers: 5200,
    engagement: 3.1,
    reach: 9500,
    clicks: 620,
    posts: 32
  },
  {
    platform: "linkedin",
    followers: 3800,
    engagement: 5.7,
    reach: 7200,
    clicks: 890,
    posts: 12
  }
];

const AnalyticsReports = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("last30");
  
  const getTrendIcon = (trend: string, value: number) => {
    if (trend === "up") {
      return <ArrowUpRight className="w-4 h-4 text-green-500" />;
    } else if (trend === "down") {
      return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    }
    return null;
  };
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">IG</div>;
      case "facebook":
        return <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">FB</div>;
      case "twitter":
        return <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">TW</div>;
      case "linkedin":
        return <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">LI</div>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-primary" />
            Reportes y Analíticas
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Últimos 30 días
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="platforms" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Plataformas
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <LineChart className="w-4 h-4" />
                Contenido
              </TabsTrigger>
              <TabsTrigger value="audience" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Audiencia
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockMetrics.map((metric, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{metric.title}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <div className="flex items-center">
                          {getTrendIcon(metric.trend, metric.change)}
                          <span className={`text-xs font-medium ${metric.trend === "up" ? "text-green-500" : metric.trend === "down" ? "text-red-500" : "text-gray-500"}`}>
                            {metric.change > 0 ? "+" : ""}{metric.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-gray-100 rounded-full">
                      {metric.icon}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Rendimiento por Plataforma</h3>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    Ver detalles <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {mockPlatforms.map((platform, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(platform.platform)}
                          <span className="font-medium capitalize">{platform.platform}</span>
                        </div>
                        <span className="text-sm">{platform.engagement}% engagement</span>
                      </div>
                      <Progress value={platform.engagement * 10} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Distribución de Audiencia</h3>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    Ver detalles <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
                <div className="h-[250px] flex items-center justify-center">
                  <PieChart className="w-48 h-48 text-gray-300" />
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Tendencia de Engagement</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    Ver detalles <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="h-[300px] flex items-center justify-center">
                <LineChart className="w-full h-64 text-gray-300" />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="platforms" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockPlatforms.map((platform, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {getPlatformIcon(platform.platform)}
                    <h3 className="font-semibold capitalize">{platform.platform}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Seguidores</p>
                      <p className="text-lg font-semibold">{platform.followers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Engagement</p>
                      <p className="text-lg font-semibold">{platform.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Alcance</p>
                      <p className="text-lg font-semibold">{platform.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Publicaciones</p>
                      <p className="text-lg font-semibold">{platform.posts}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3 gap-1">
                    Ver análisis detallado <ArrowRight className="w-3 h-3" />
                  </Button>
                </Card>
              ))}
            </div>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Comparativa de Plataformas</h3>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-[400px] flex items-center justify-center">
                <BarChart className="w-full h-80 text-gray-300" />
              </div>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Mejores Horas para Publicar</h3>
                <div className="space-y-4">
                  {mockPlatforms.map((platform, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {getPlatformIcon(platform.platform)}
                      <div className="flex-1">
                        <p className="font-medium capitalize">{platform.platform}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">Lun 18:00</Badge>
                          <Badge variant="outline">Mié 12:00</Badge>
                          <Badge variant="outline">Jue 20:00</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Recomendaciones</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Aumenta tu presencia en LinkedIn</p>
                        <p className="text-sm text-gray-600">Tu audiencia en LinkedIn tiene el mayor engagement (5.7%). Considera publicar más contenido en esta plataforma.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Optimiza tu estrategia en Facebook</p>
                        <p className="text-sm text-gray-600">El engagement en Facebook (2.8%) está por debajo del promedio. Prueba diferentes formatos de contenido.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Tipos de Contenido</h3>
                <div className="h-[200px] flex items-center justify-center">
                  <PieChart className="w-40 h-40 text-gray-300" />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Imágenes (45%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Videos (30%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Carruseles (15%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Texto (10%)</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Rendimiento por Formato</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Videos</span>
                      <span className="text-sm">8.2%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Carruseles</span>
                      <span className="text-sm">6.7%</span>
                    </div>
                    <Progress value={67} className="h-2"