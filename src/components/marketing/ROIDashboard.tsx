import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  BarChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Search,
  MousePointerClick,
  Users,
  ShoppingCart,
} from "lucide-react";

interface ChannelData {
  name: string;
  icon: React.ReactNode;
  spend: number;
  revenue: number;
  roi: number;
  conversions: number;
  cpa: number;
  trend: "up" | "down" | "neutral";
  change: number;
}

interface CampaignData {
  id: string;
  name: string;
  channel: string;
  spend: number;
  revenue: number;
  roi: number;
  conversions: number;
  cpa: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "completed" | "paused";
}

const mockChannels: ChannelData[] = [
  {
    name: "Google Ads",
    icon: <Search className="w-5 h-5 text-red-500" />,
    spend: 12500,
    revenue: 45000,
    roi: 260,
    conversions: 150,
    cpa: 83.33,
    trend: "up",
    change: 12.5,
  },
  {
    name: "Facebook",
    icon: <Facebook className="w-5 h-5 text-blue-600" />,
    spend: 8000,
    revenue: 22000,
    roi: 175,
    conversions: 95,
    cpa: 84.21,
    trend: "down",
    change: 5.2,
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-5 h-5 text-pink-600" />,
    spend: 7500,
    revenue: 28500,
    roi: 280,
    conversions: 110,
    cpa: 68.18,
    trend: "up",
    change: 18.3,
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5 text-blue-700" />,
    spend: 5000,
    revenue: 15000,
    roi: 200,
    conversions: 45,
    cpa: 111.11,
    trend: "up",
    change: 3.7,
  },
  {
    name: "Email",
    icon: <Mail className="w-5 h-5 text-gray-600" />,
    spend: 2000,
    revenue: 18000,
    roi: 800,
    conversions: 120,
    cpa: 16.67,
    trend: "up",
    change: 25.8,
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-5 h-5 text-blue-400" />,
    spend: 3500,
    revenue: 9000,
    roi: 157,
    conversions: 35,
    cpa: 100,
    trend: "down",
    change: 8.1,
  },
];

const mockCampaigns: CampaignData[] = [
  {
    id: "1",
    name: "Remarketing Q2",
    channel: "Google Ads",
    spend: 5500,
    revenue: 22000,
    roi: 300,
    conversions: 75,
    cpa: 73.33,
    startDate: new Date(2024, 3, 1),
    endDate: new Date(2024, 5, 30),
    status: "active",
  },
  {
    id: "2",
    name: "Promoción Verano",
    channel: "Facebook",
    spend: 4500,
    revenue: 13500,
    roi: 200,
    conversions: 60,
    cpa: 75,
    startDate: new Date(2024, 4, 15),
    endDate: new Date(2024, 6, 15),
    status: "active",
  },
  {
    id: "3",
    name: "Lanzamiento Producto",
    channel: "Instagram",
    spend: 6000,
    revenue: 24000,
    roi: 300,
    conversions: 90,
    cpa: 66.67,
    startDate: new Date(2024, 3, 10),
    endDate: new Date(2024, 4, 10),
    status: "completed",
  },
  {
    id: "4",
    name: "Captación B2B",
    channel: "LinkedIn",
    spend: 4000,
    revenue: 12000,
    roi: 200,
    conversions: 35,
    cpa: 114.29,
    startDate: new Date(2024, 3, 1),
    endDate: new Date(2024, 5, 30),
    status: "active",
  },
  {
    id: "5",
    name: "Newsletter Mayo",
    channel: "Email",
    spend: 1200,
    revenue: 10800,
    roi: 800,
    conversions: 72,
    cpa: 16.67,
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 31),
    status: "completed",
  },
  {
    id: "6",
    name: "Campaña Awareness",
    channel: "Twitter",
    spend: 2500,
    revenue: 5000,
    roi: 100,
    conversions: 25,
    cpa: 100,
    startDate: new Date(2024, 3, 15),
    endDate: new Date(2024, 5, 15),
    status: "paused",
  },
];

const ROIDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("quarter");
  const [sortBy, setSortBy] = useState("roi");

  // Calculate totals
  const totalSpend = mockChannels.reduce(
    (sum, channel) => sum + channel.spend,
    0,
  );
  const totalRevenue = mockChannels.reduce(
    (sum, channel) => sum + channel.revenue,
    0,
  );
  const totalROI = ((totalRevenue - totalSpend) / totalSpend) * 100;
  const totalConversions = mockChannels.reduce(
    (sum, channel) => sum + channel.conversions,
    0,
  );
  const totalCPA = totalSpend / totalConversions;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: CampaignData["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activa</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completada</Badge>;
      case "paused":
        return <Badge variant="destructive">Pausada</Badge>;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: ChannelData["trend"], change: number) => {
    if (trend === "up") {
      return <ArrowUpRight className="w-4 h-4 text-green-500" />;
    } else if (trend === "down") {
      return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const sortedChannels = [...mockChannels].sort((a, b) => {
    if (sortBy === "roi") return b.roi - a.roi;
    if (sortBy === "spend") return b.spend - a.spend;
    if (sortBy === "revenue") return b.revenue - a.revenue;
    if (sortBy === "conversions") return b.conversions - a.conversions;
    return 0;
  });

  const sortedCampaigns = [...mockCampaigns].sort((a, b) => {
    if (sortBy === "roi") return b.roi - a.roi;
    if (sortBy === "spend") return b.spend - a.spend;
    if (sortBy === "revenue") return b.revenue - a.revenue;
    if (sortBy === "conversions") return b.conversions - a.conversions;
    return 0;
  });

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Dashboard de ROI
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Último mes</SelectItem>
                <SelectItem value="quarter">Último trimestre</SelectItem>
                <SelectItem value="year">Último año</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="channels" className="flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Canales
              </TabsTrigger>
              <TabsTrigger
                value="campaigns"
                className="flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Campañas
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Inversión Total</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(totalSpend)}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Ingresos Generados</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(totalRevenue)}
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">ROI</p>
                    <p className="text-2xl font-bold">{totalROI.toFixed(0)}%</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Conversiones</p>
                    <p className="text-2xl font-bold">{totalConversions}</p>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <MousePointerClick className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">ROI por Canal</h3>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roi">ROI</SelectItem>
                      <SelectItem value="spend">Inversión</SelectItem>
                      <SelectItem value="revenue">Ingresos</SelectItem>
                      <SelectItem value="conversions">Conversiones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {sortedChannels.map((channel, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {channel.icon}
                            <span className="font-medium">{channel.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">
                              {channel.roi}%
                            </span>
                            {getTrendIcon(channel.trend, channel.change)}
                          </div>
                        </div>
                        <Progress value={channel.roi / 10} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>
                            Inversión: {formatCurrency(channel.spend)}
                          </span>
                          <span>
                            Ingresos: {formatCurrency(channel.revenue)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">
                  Distribución de Inversión
                </h3>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="w-64 h-64 text-gray-300" />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {mockChannels.map((channel, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary opacity-${Math.floor((index + 1) * 20)}"></div>
                      <span className="text-xs">{channel.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Tendencia de ROI</h3>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
              </div>
              <div className="h-[300px] flex items-center justify-center">
                <BarChart className="w-full h-64 text-gray-300" />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="channels" className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Rendimiento por Canal</h3>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roi">ROI</SelectItem>
                    <SelectItem value="spend">Inversión</SelectItem>
                    <SelectItem value="revenue">Ingresos</SelectItem>
                    <SelectItem value="conversions">Conversiones</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {sortedChannels.map((channel, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                    <div className="md:col-span-2 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gray-100">
                        {channel.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{channel.name}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          {getTrendIcon(channel.trend, channel.change)}
                          <span
                            className={
                              channel.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {channel.change}% vs período anterior
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">Inversión</p>
                      <p className="font-semibold">
                        {formatCurrency(channel.spend)}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">Ingresos</p>
                      <p className="font-semibold">
                        {formatCurrency(channel.revenue)}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">ROI</p>
                      <p className="font-semibold">{channel.roi}%</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">Conversiones</p>
                      <p className="font-semibold">{channel.conversions}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">CPA</p>
                      <p className="font-semibold">
                        {formatCurrency(channel.cpa)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Rendimiento por Campaña</h3>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roi">ROI</SelectItem>
                    <SelectItem value="spend">Inversión</SelectItem>
                    <SelectItem value="revenue">Ingresos</SelectItem>
                    <SelectItem value="conversions">Conversiones</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {sortedCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{campaign.name}</h4>
                            {getStatusBadge(campaign.status)}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <span>{campaign.channel}</span>
                            <span>•</span>
                            <Calendar className="w-3 h-3" />
                            <span>
                              {formatDate(campaign.startDate)} -{" "}
                              {formatDate(campaign.endDate)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {campaign.roi}%
                          </div>
                          <div className="text-sm text-gray-500">ROI</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Inversión</p>
                          <p className="font-semibold">
                            {formatCurrency(campaign.spend)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Ingresos</p>
                          <p className="font-semibold">
                            {formatCurrency(campaign.revenue)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Conversiones</p>
                          <p className="font-semibold">
                            {campaign.conversions}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">CPA</p>
                          <p className="font-semibold">
                            {formatCurrency(campaign.cpa)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>ROI</span>
                          <span>{campaign.roi}%</span>
                        </div>
                        <Progress value={campaign.roi / 10} className="h-1.5" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ROIDashboard;
