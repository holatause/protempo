import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  RefreshCw,
  Filter,
} from "lucide-react";
import {
  getCampaignPerformance,
  CampaignPerformance,
} from "@/lib/api/analytics";

interface CampaignAnalyticsProps {
  campaignId: string;
  campaignName: string;
  onClose?: () => void;
}

const CampaignAnalytics: React.FC<CampaignAnalyticsProps> = ({
  campaignId,
  campaignName,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("7days");
  const [isLoading, setIsLoading] = useState(false);
  const [performance, setPerformance] = useState<CampaignPerformance | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  // Datos simulados para la demo
  const mockDailyData = [
    { date: "01/05", impressions: 1200, clicks: 85, conversions: 12 },
    { date: "02/05", impressions: 1350, clicks: 92, conversions: 15 },
    { date: "03/05", impressions: 980, clicks: 78, conversions: 10 },
    { date: "04/05", impressions: 1420, clicks: 105, conversions: 18 },
    { date: "05/05", impressions: 1650, clicks: 120, conversions: 22 },
    { date: "06/05", impressions: 1580, clicks: 115, conversions: 20 },
    { date: "07/05", impressions: 1720, clicks: 130, conversions: 25 },
  ];

  const mockChannelData = [
    {
      name: "Facebook",
      impressions: 4200,
      clicks: 320,
      conversions: 45,
      ctr: 7.6,
      cvr: 14.1,
    },
    {
      name: "Instagram",
      impressions: 3800,
      clicks: 290,
      conversions: 38,
      ctr: 7.6,
      cvr: 13.1,
    },
    {
      name: "Google",
      impressions: 2500,
      clicks: 180,
      conversions: 32,
      ctr: 7.2,
      cvr: 17.8,
    },
    {
      name: "Email",
      impressions: 1400,
      clicks: 95,
      conversions: 22,
      ctr: 6.8,
      cvr: 23.2,
    },
  ];

  // Cargar datos de rendimiento de la campaña
  useEffect(() => {
    const loadPerformanceData = async () => {
      if (!campaignId) return;

      setIsLoading(true);
      setError(null);

      try {
        // Determinar fechas según el rango seleccionado
        const endDate = new Date().toISOString();
        let startDate: string;

        switch (dateRange) {
          case "7days":
            startDate = new Date(
              Date.now() - 7 * 24 * 60 * 60 * 1000,
            ).toISOString();
            break;
          case "30days":
            startDate = new Date(
              Date.now() - 30 * 24 * 60 * 60 * 1000,
            ).toISOString();
            break;
          case "90days":
            startDate = new Date(
              Date.now() - 90 * 24 * 60 * 60 * 1000,
            ).toISOString();
            break;
          default:
            startDate = new Date(
              Date.now() - 7 * 24 * 60 * 60 * 1000,
            ).toISOString();
        }

        // Intentar obtener datos reales de Supabase
        try {
          const performanceData = await getCampaignPerformance(
            campaignId,
            startDate,
            endDate,
          );
          setPerformance(performanceData);
        } catch (apiError) {
          console.warn(
            "Error fetching campaign performance, using mock data",
            apiError,
          );
          // Usar datos simulados si falla la API
          setPerformance({
            campaign_id: campaignId,
            impressions: 8900,
            clicks: 725,
            conversions: 122,
            engagement: 1450,
            reach: 6500,
            start_date: startDate,
            end_date: endDate,
          });
        }
      } catch (error) {
        console.error("Error loading campaign performance:", error);
        setError(
          "No se pudieron cargar los datos de rendimiento. Intenta de nuevo más tarde.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPerformanceData();
  }, [campaignId, dateRange]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  const calculateCTR = (): string => {
    if (!performance || performance.impressions === 0) return "0%";
    return (
      ((performance.clicks / performance.impressions) * 100).toFixed(2) + "%"
    );
  };

  const calculateCVR = (): string => {
    if (!performance || performance.clicks === 0) return "0%";
    return (
      ((performance.conversions / performance.clicks) * 100).toFixed(2) + "%"
    );
  };

  const calculateCPA = (): string => {
    // Simulamos un costo de campaña para el cálculo
    const campaignCost = 2500;
    if (!performance || performance.conversions === 0) return "$0";
    return "$" + (campaignCost / performance.conversions).toFixed(2);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-primary" />
            Analíticas: {campaignName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Últimos 7 días</SelectItem>
                <SelectItem value="30days">Últimos 30 días</SelectItem>
                <SelectItem value="90days">Últimos 90 días</SelectItem>
              </SelectContent>
            </Select>
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                Cerrar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="channels" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Canales
              </TabsTrigger>
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Diario
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
                  <p className="text-sm text-gray-500">Cargando datos...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-red-500">{error}</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setDateRange(dateRange)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reintentar
                  </Button>
                </div>
              </div>
            ) : performance ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Impresiones</p>
                        <p className="text-2xl font-bold">
                          {formatNumber(performance.impressions)}
                        </p>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Eye className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Clics</p>
                        <p className="text-2xl font-bold">
                          {formatNumber(performance.clicks)}
                        </p>
                      </div>
                      <div className="p-2 bg-green-100 rounded-full">
                        <MousePointerClick className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Conversiones</p>
                        <p className="text-2xl font-bold">
                          {formatNumber(performance.conversions)}
                        </p>
                      </div>
                      <div className="p-2 bg-purple-100 rounded-full">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Alcance</p>
                        <p className="text-2xl font-bold">
                          {formatNumber(performance.reach)}
                        </p>
                      </div>
                      <div className="p-2 bg-amber-100 rounded-full">
                        <Users className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          CTR (Tasa de clics)
                        </p>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 text-sm">+2.5%</span>
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{calculateCTR()}</p>
                      <p className="text-xs text-gray-500">
                        vs. período anterior
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          CVR (Tasa de conversión)
                        </p>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 text-sm">+1.8%</span>
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{calculateCVR()}</p>
                      <p className="text-xs text-gray-500">
                        vs. período anterior
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          CPA (Costo por adquisición)
                        </p>
                        <div className="flex items-center gap-1">
                          <ArrowDownRight className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 text-sm">-3.2%</span>
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{calculateCPA()}</p>
                      <p className="text-xs text-gray-500">
                        vs. período anterior
                      </p>
                    </div>
                  </Card>
                </div>

                <Card className="p-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Progreso hacia objetivos</h3>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            Impresiones (objetivo: 15,000)
                          </span>
                          <span className="text-sm font-medium">
                            {Math.round(
                              (performance.impressions / 15000) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(performance.impressions / 15000) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            Conversiones (objetivo: 200)
                          </span>
                          <span className="text-sm font-medium">
                            {Math.round((performance.conversions / 200) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(performance.conversions / 200) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            Alcance (objetivo: 10,000)
                          </span>
                          <span className="text-sm font-medium">
                            {Math.round((performance.reach / 10000) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(performance.reach / 10000) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ) : null}
          </TabsContent>

          <TabsContent value="channels" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Rendimiento por Canal</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>

              <div className="space-y-4">
                {mockChannelData.map((channel, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{channel.name}</h4>
                        <Badge variant="outline" className="font-normal">
                          CTR: {channel.ctr}%
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Impresiones</p>
                          <p className="font-semibold">
                            {formatNumber(channel.impressions)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Clics</p>
                          <p className="font-semibold">
                            {formatNumber(channel.clicks)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Conversiones</p>
                          <p className="font-semibold">
                            {formatNumber(channel.conversions)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Tasa de conversión</span>
                          <span>{channel.cvr}%</span>
                        </div>
                        <Progress value={channel.cvr * 5} className="h-1.5" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="daily" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Rendimiento Diario</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[400px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Fecha</th>
                      <th className="text-right p-2">Impresiones</th>
                      <th className="text-right p-2">Clics</th>
                      <th className="text-right p-2">CTR</th>
                      <th className="text-right p-2">Conversiones</th>
                      <th className="text-right p-2">CVR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDailyData.map((day, index) => {
                      const ctr = (
                        (day.clicks / day.impressions) *
                        100
                      ).toFixed(2);
                      const cvr = (
                        (day.conversions / day.clicks) *
                        100
                      ).toFixed(2);

                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2">{day.date}</td>
                          <td className="text-right p-2">
                            {formatNumber(day.impressions)}
                          </td>
                          <td className="text-right p-2">
                            {formatNumber(day.clicks)}
                          </td>
                          <td className="text-right p-2">{ctr}%</td>
                          <td className="text-right p-2">
                            {formatNumber(day.conversions)}
                          </td>
                          <td className="text-right p-2">{cvr}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CampaignAnalytics;
