import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Target,
  Plus,
  Calendar,
  Users,
  BarChart,
  Globe,
  Edit,
  Trash2,
  Copy,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Filter,
  Search,
  SlidersHorizontal,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";

// Tipos para las campañas
interface Campaign {
  id: string;
  name: string;
  description: string;
  status: "active" | "draft" | "scheduled" | "completed" | "paused";
  startDate: string;
  endDate: string;
  budget: number;
  platforms: string[];
  audience: string[];
  goals: {
    type: string;
    target: number;
    current: number;
  }[];
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    roi: number;
  };
  region: string;
}

// Datos de ejemplo para el MVP
const sampleCampaigns: Campaign[] = [
  {
    id: "camp-001",
    name: "Lanzamiento Colección Verano",
    description: "Campaña para promocionar la nueva colección de verano con enfoque en productos de temporada.",
    status: "active",
    startDate: "2024-06-01",
    endDate: "2024-07-15",
    budget: 1500000,
    platforms: ["Instagram", "Facebook", "Google Ads"],
    audience: ["18-35", "Interesados en moda", "Compradores frecuentes"],
    goals: [
      { type: "Alcance", target: 100000, current: 68000 },
      { type: "Conversiones", target: 2000, current: 1250 },
      { type: "Engagement", target: 5000, current: 3800 }
    ],
    performance: {
      impressions: 68000,
      clicks: 4200,
      conversions: 1250,
      ctr: 6.18,
      cpc: 3500,
      roi: 215
    },
    region: "BOG"
  },
  {
    id: "camp-002",
    name: "Promoción Día sin IVA",
    description: "Campaña especial para el día sin IVA con descuentos exclusivos en productos seleccionados.",
    status: "scheduled",
    startDate: "2024-06-28",
    endDate: "2024-06-30",
    budget: 800000,
    platforms: ["Instagram", "Facebook", "Email", "WhatsApp"],
    audience: ["Todos los segmentos", "Compradores anteriores"],
    goals: [
      { type: "Ventas", target: 5000000, current: 0 },
      { type: "Nuevos clientes", target: 500, current: 0 }
    ],
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
      roi: 0
    },
    region: "NAC"
  },
  {
    id: "camp-003",
    name: "Webinar Tendencias 2024",
    description: "Webinar gratuito sobre las tendencias del mercado para el segundo semestre de 2024.",
    status: "draft",
    startDate: "2024-07-15",
    endDate: "2024-07-15",
    budget: 300000,
    platforms: ["LinkedIn", "Email", "YouTube"],
    audience: ["Profesionales", "Gerentes", "Emprendedores"],
    goals: [
      { type: "Registros", target: 1000, current: 0 },
      { type: "Asistencia", target: 500, current: 0 },
      { type: "Leads", target: 200, current: 0 }
    ],
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
      roi: 0
    },
    region: "MED"
  },
  {
    id: "camp-004",
    name: "Campaña Fidelización Clientes",
    description: "Programa de fidelización para clientes recurrentes con beneficios exclusivos.",
    status: "completed",
    startDate: "2024-04-01",
    endDate: "2024-05-31",
    budget: 1200000,
    platforms: ["Email", "SMS", "WhatsApp", "App"],
    audience: ["Clientes Premium", "Compradores frecuentes"],
    goals: [
      { type: "Retención", target: 85, current: 92 },
      { type: "Upsell", target: 30, current: 35 },
      { type: "NPS", target: 8.5, current: 9.2 }
    ],
    performance: {
      impressions: 45000,
      clicks: 12500,
      conversions: 3800,
      ctr: 27.8,
      cpc: 1200,
      roi: 320
    },
    region: "NAC"
  },
  {
    id: "camp-005",
    name: "Promoción Día de la Madre",
    description: "Campaña especial para el Día de la Madre con descuentos y promociones exclusivas.",
    status: "paused",
    startDate: "2024-05-01",
    endDate: "2024-05-14",
    budget: 1000000,
    platforms: ["Instagram", "Facebook", "Google Ads", "Email"],
    audience: ["Mujeres 25-55", "Interesados en regalos"],
    goals: [
      { type: "Ventas", target: 3000000, current: 1800000 },
      { type: "Tráfico web", target: 20000, current: 15600 }
    ],
    performance: {
      impressions: 85000,
      clicks: 15600,
      conversions: 2200,
      ctr: 18.35,
      cpc: 2800,
      roi: 180
    },
    region: "NAC"
  }
];

// Componente para mostrar el estado de la campaña
const CampaignStatusBadge = ({ status }: { status: Campaign["status"] }) => {
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", label: "Activa" },
    draft: { color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", label: "Borrador" },
    scheduled: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", label: "Programada" },
    completed: { color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", label: "Completada" },
    paused: { color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400", label: "Pausada" }
  };
  
  return (
    <Badge className={statusConfig[status].color}>
      {statusConfig[status].label}
    </Badge>
  );
};

// Componente para mostrar las plataformas
const PlatformBadge = ({ platform }: { platform: string }) => {
  const platformConfig: Record<string, { color: string, icon: React.ReactNode }> = {
    "Instagram": { 
      color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400", 
      icon: <Globe className="h-3 w-3 mr-1" /> 
    },
    "Facebook": { 
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", 
      icon: <Globe className="h-3 w-3 mr-1" /> 
    },
    "Google Ads": { 
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", 
      icon: <Globe className="h-3 w-3 mr-1" /> 
    },
    "LinkedIn": { 
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400", 
      icon: <Globe className="h-3 w-3 mr-1" /> 
    },
    "Email": { 
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", 
      icon: <Globe className="h-3 w-3 mr-1" /> 
    },
    "SMS": { 
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", 
      icon: <Globe className="h-3 w-3 mr-1" /> 
    },
    "WhatsApp": { 
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", 
      icon: <Globe className="h-3 w-3 mr-1" /> 
    },
    "App": { 
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", 
      icon: <Globe className="h-3 w-3 mr-1" /> 
    },
    "YouTube": { 
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", 
      icon: <Globe className="h-3 w-3 mr-1" /> 
    }
  };
  
  const config = platformConfig[platform] || { 
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", 
    icon: <Globe className="h-3 w-3 mr-1" /> 
  };
  
  return (
    <Badge variant="outline" className={`${config.color} mr-1 mb-1 flex items-center`}>
      {config.icon} {platform}
    </Badge>
  );
};

// Componente para la tarjeta de campaña
const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{campaign.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {campaign.description}
            </CardDescription>
          </div>
          <CampaignStatusBadge status={campaign.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Fechas</p>
            <p className="text-sm font-medium">
              {new Date(campaign.startDate).toLocaleDateString('es-CO')} - {new Date(campaign.endDate).toLocaleDateString('es-CO')}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Presupuesto</p>
            <p className="text-sm font-medium">
              ${campaign.budget.toLocaleString('es-CO')} COP
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Plataformas</p>
          <div className="flex flex-wrap">
            {campaign.platforms.map((platform, index) => (
              <PlatformBadge key={index} platform={platform} />
            ))}
          </div>
        </div>
        
        {campaign.status !== 'draft' && campaign.status !== 'scheduled' && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Progreso de objetivos</p>
            {campaign.goals.map((goal, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center text-xs">
                  <span>{goal.type}</span>
                  <span>{goal.current} / {goal.target}</span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-1" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4 mr-1" /> Editar
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Componente para el formulario de nueva campaña
const NewCampaignForm = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="name">Nombre de la campaña</Label>
          <Input id="name" placeholder="Ej: Lanzamiento Producto Nuevo" />
        </div>
        
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" placeholder="Describe el objetivo y detalles de la campaña" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Fecha de inicio</Label>
            <Input id="startDate" type="date" />
          </div>
          <div>
            <Label htmlFor="endDate">Fecha de finalización</Label>
            <Input id="endDate" type="date" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="budget">Presupuesto (COP)</Label>
          <Input id="budget" type="number" placeholder="Ej: 1000000" />
        </div>
        
        <div>
          <Label htmlFor="region">Región</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una región" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BOG">Bogotá</SelectItem>
              <SelectItem value="MED">Medellín</SelectItem>
              <SelectItem value="CAL">Cali</SelectItem>
              <SelectItem value="BAR">Barranquilla</SelectItem>
              <SelectItem value="NAC">Nacional</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Plataformas</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["Instagram", "Facebook", "Google Ads", "LinkedIn", "Email", "WhatsApp"].map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Switch id={`platform-${platform}`} />
                <Label htmlFor={`platform-${platform}`}>{platform}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label>Objetivos de la campaña</Label>
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <Input placeholder="Tipo de objetivo" className="flex-1" />
              <Input type="number" placeholder="Meta" className="w-32" />
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button>
          <CheckCircle2 className="h-4 w-4 mr-2" /> Guardar Campaña
        </Button>
      </div>
    </div>
  );
};

// Componente principal de gestión de campañas
const CampaignManager = () => {
  const [activeTab, setActiveTab] = useState("todas");
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrar campañas según la pestaña activa y término de búsqueda
  const filteredCampaigns = sampleCampaigns.filter(campaign => {
    // Filtro por estado
    if (activeTab !== "todas" && campaign.status !== activeTab) {
      return false;
    }
    
    // Filtro por término de búsqueda
    if (searchTerm && !campaign.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Campañas</h1>
          <p className="text-muted-foreground">Crea, gestiona y optimiza tus campañas de marketing</p>
        </div>
        
        <Button onClick={() => setShowNewCampaignForm(true)} disabled={showNewCampaignForm}>
          <Plus className="h-4 w-4 mr-2" /> Nueva Campaña
        </Button>
      </div>
      
      {showNewCampaignForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Nueva Campaña</CardTitle>
            <CardDescription>Completa la información para crear una nueva campaña</CardDescription>
          </CardHeader>
          <CardContent>
            <NewCampaignForm onCancel={() => setShowNewCampaignForm(false)} />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar campañas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" /> Filtros
              </Button>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Ordenar
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="active">Activas</TabsTrigger>
              <TabsTrigger value="scheduled">Programadas</TabsTrigger>
              <TabsTrigger value="draft">Borradores</TabsTrigger>
              <TabsTrigger value="completed">Completadas</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {filteredCampaigns.length > 0 ? (
                <ScrollArea className="h-[calc(100vh-320px)]">
                  <div className="pr-4">
                    {filteredCampaigns.map((campaign) => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Target className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No se encontraron campañas</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    {searchTerm 
                      ? `No hay campañas que coincidan con "${searchTerm}"`
                      : "No hay campañas en esta categoría. Crea una nueva campaña para comenzar."}
                  </p>
                  <Button onClick={() => setShowNewCampaignForm(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Nueva Campaña
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default CampaignManager;
