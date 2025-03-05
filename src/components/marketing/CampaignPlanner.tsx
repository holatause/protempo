import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  Plus,
  Target,
  Users,
  BarChart,
  Megaphone,
  Calendar as CalendarIcon2,
  Clock,
  ArrowRight,
  Trash2,
  Edit,
  Copy,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  objective: string;
  targetAudience: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  status: "draft" | "active" | "scheduled" | "completed" | "paused";
  progress: number;
  channels: {
    name: string;
    icon: React.ReactNode;
    contentCount: number;
  }[];
  kpis: {
    name: string;
    target: number;
    current: number;
    unit: string;
  }[];
  seasonality: "regular" | "holiday" | "event" | "promotion";
  tags: string[];
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Campaña Verano 2024",
    description: "Promoción de productos para la temporada de verano",
    objective: "Aumentar ventas de productos de temporada en un 30%",
    targetAudience: "Adultos 25-45 años, interesados en moda y viajes",
    startDate: new Date(2024, 5, 1), // June 1, 2024
    endDate: new Date(2024, 7, 31), // August 31, 2024
    budget: 5000,
    status: "scheduled",
    progress: 0,
    channels: [
      {
        name: "Instagram",
        icon: <Instagram className="w-4 h-4" />,
        contentCount: 12,
      },
      {
        name: "Facebook",
        icon: <Facebook className="w-4 h-4" />,
        contentCount: 8,
      },
      { name: "Email", icon: <Mail className="w-4 h-4" />, contentCount: 4 },
    ],
    kpis: [
      { name: "Ventas", target: 50000, current: 0, unit: "USD" },
      { name: "Engagement", target: 15000, current: 0, unit: "interacciones" },
      { name: "Nuevos clientes", target: 500, current: 0, unit: "clientes" },
    ],
    seasonality: "holiday",
    tags: ["verano", "moda", "promoción"],
  },
  {
    id: "2",
    title: "Lanzamiento Producto Nuevo",
    description: "Campaña de lanzamiento para nuestro nuevo producto estrella",
    objective: "Generar awareness y primeras ventas del nuevo producto",
    targetAudience: "Clientes actuales y potenciales interesados en tecnología",
    startDate: new Date(2024, 3, 15), // April 15, 2024
    endDate: new Date(2024, 4, 30), // May 30, 2024
    budget: 12000,
    status: "active",
    progress: 45,
    channels: [
      {
        name: "Instagram",
        icon: <Instagram className="w-4 h-4" />,
        contentCount: 20,
      },
      {
        name: "Facebook",
        icon: <Facebook className="w-4 h-4" />,
        contentCount: 15,
      },
      {
        name: "Twitter",
        icon: <Twitter className="w-4 h-4" />,
        contentCount: 25,
      },
      {
        name: "LinkedIn",
        icon: <Linkedin className="w-4 h-4" />,
        contentCount: 10,
      },
      { name: "Email", icon: <Mail className="w-4 h-4" />, contentCount: 5 },
    ],
    kpis: [
      { name: "Ventas", target: 100000, current: 42000, unit: "USD" },
      {
        name: "Awareness",
        target: 1000000,
        current: 450000,
        unit: "impresiones",
      },
      { name: "Registros", target: 5000, current: 2100, unit: "usuarios" },
    ],
    seasonality: "event",
    tags: ["lanzamiento", "tecnología", "innovación"],
  },
  {
    id: "3",
    title: "Campaña Fidelización Q2",
    description: "Programa de fidelización para clientes existentes",
    objective: "Aumentar retención y valor de vida del cliente",
    targetAudience: "Clientes actuales con al menos 6 meses de antigüedad",
    startDate: new Date(2024, 3, 1), // April 1, 2024
    endDate: new Date(2024, 5, 30), // June 30, 2024
    budget: 3500,
    status: "active",
    progress: 65,
    channels: [
      { name: "Email", icon: <Mail className="w-4 h-4" />, contentCount: 12 },
      {
        name: "Instagram",
        icon: <Instagram className="w-4 h-4" />,
        contentCount: 6,
      },
      {
        name: "Facebook",
        icon: <Facebook className="w-4 h-4" />,
        contentCount: 6,
      },
    ],
    kpis: [
      { name: "Retención", target: 85, current: 78, unit: "%" },
      { name: "Valor promedio", target: 150, current: 125, unit: "USD" },
      { name: "NPS", target: 75, current: 68, unit: "puntos" },
    ],
    seasonality: "regular",
    tags: ["fidelización", "retención", "clientes"],
  },
];

const CampaignPlanner = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCreating, setIsCreating] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    title: "",
    description: "",
    objective: "",
    targetAudience: "",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    budget: 0,
    status: "draft",
    tags: [],
  });

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Borrador</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Programada</Badge>;
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

  const getSeasonalityBadge = (seasonality: Campaign["seasonality"]) => {
    switch (seasonality) {
      case "regular":
        return <Badge variant="outline">Regular</Badge>;
      case "holiday":
        return (
          <Badge className="bg-purple-100 text-purple-800">Temporada</Badge>
        );
      case "event":
        return <Badge className="bg-amber-100 text-amber-800">Evento</Badge>;
      case "promotion":
        return <Badge className="bg-blue-100 text-blue-800">Promoción</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCreateCampaign = () => {
    // Validate required fields
    if (
      !newCampaign.title ||
      !newCampaign.description ||
      !newCampaign.objective
    ) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    const campaign: Campaign = {
      id: Date.now().toString(),
      title: newCampaign.title || "",
      description: newCampaign.description || "",
      objective: newCampaign.objective || "",
      targetAudience: newCampaign.targetAudience || "",
      startDate: newCampaign.startDate || new Date(),
      endDate: newCampaign.endDate || new Date(),
      budget: newCampaign.budget || 0,
      status: "draft",
      progress: 0,
      channels: [],
      kpis: [],
      seasonality: "regular",
      tags: newCampaign.tags || [],
    };

    setCampaigns([...campaigns, campaign]);
    setSelectedCampaign(campaign);
    setIsCreating(false);
    setNewCampaign({
      title: "",
      description: "",
      objective: "",
      targetAudience: "",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      budget: 0,
      status: "draft",
      tags: [],
    });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      const newTag = e.currentTarget.value.trim();
      if (isCreating) {
        setNewCampaign({
          ...newCampaign,
          tags: [...(newCampaign.tags || []), newTag],
        });
      } else if (selectedCampaign) {
        const updatedCampaign = {
          ...selectedCampaign,
          tags: [...selectedCampaign.tags, newTag],
        };
        setSelectedCampaign(updatedCampaign);
        setCampaigns(
          campaigns.map((c) =>
            c.id === updatedCampaign.id ? updatedCampaign : c,
          ),
        );
      }
      e.currentTarget.value = "";
    }
  };

  const handleRemoveTag = (tag: string) => {
    if (isCreating) {
      setNewCampaign({
        ...newCampaign,
        tags: (newCampaign.tags || []).filter((t) => t !== tag),
      });
    } else if (selectedCampaign) {
      const updatedCampaign = {
        ...selectedCampaign,
        tags: selectedCampaign.tags.filter((t) => t !== tag),
      };
      setSelectedCampaign(updatedCampaign);
      setCampaigns(
        campaigns.map((c) =>
          c.id === updatedCampaign.id ? updatedCampaign : c,
        ),
      );
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-primary" />
            Planificador de Campañas
          </CardTitle>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" /> Nueva Campaña
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[700px]">
          <div className="border-r">
            <div className="p-4 border-b">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <ScrollArea className="h-[calc(700px-350px)]">
              <div className="p-4 space-y-4">
                {campaigns.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${selectedCampaign?.id === campaign.id ? "border-primary" : ""}`}
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      setIsCreating(false);
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{campaign.title}</h3>
                        {getStatusBadge(campaign.status)}
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {campaign.description}
                      </p>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Progreso</span>
                          <span>{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} />
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{formatDate(campaign.startDate)}</span>
                        </div>
                        <span>{formatCurrency(campaign.budget)}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="md:col-span-2">
            {isCreating ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="font-semibold text-lg">Nueva Campaña</h2>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="campaign-title">
                          Título de la campaña *
                        </Label>
                        <Input
                          id="campaign-title"
                          value={newCampaign.title}
                          onChange={(e) =>
                            setNewCampaign({
                              ...newCampaign,
                              title: e.target.value,
                            })
                          }
                          placeholder="Ej: Campaña Verano 2024"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="campaign-description">
                          Descripción *
                        </Label>
                        <Textarea
                          id="campaign-description"
                          value={newCampaign.description}
                          onChange={(e) =>
                            setNewCampaign({
                              ...newCampaign,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe brevemente el propósito de esta campaña"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="campaign-objective">Objetivo *</Label>
                        <Textarea
                          id="campaign-objective"
                          value={newCampaign.objective}
                          onChange={(e) =>
                            setNewCampaign({
                              ...newCampaign,
                              objective: e.target.value,
                            })
                          }
                          placeholder="¿Qué quieres lograr con esta campaña?"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="campaign-audience">
                          Audiencia objetivo
                        </Label>
                        <Textarea
                          id="campaign-audience"
                          value={newCampaign.targetAudience}
                          onChange={(e) =>
                            setNewCampaign({
                              ...newCampaign,
                              targetAudience: e.target.value,
                            })
                          }
                          placeholder="Describe tu audiencia ideal para esta campaña"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="campaign-start">
                            Fecha de inicio
                          </Label>
                          <Input
                            id="campaign-start"
                            type="date"
                            value={
                              newCampaign.startDate?.toISOString().split("T")[0]
                            }
                            onChange={(e) =>
                              setNewCampaign({
                                ...newCampaign,
                                startDate: new Date(e.target.value),
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="campaign-end">
                            Fecha de finalización
                          </Label>
                          <Input
                            id="campaign-end"
                            type="date"
                            value={
                              newCampaign.endDate?.toISOString().split("T")[0]
                            }
                            onChange={(e) =>
                              setNewCampaign({
                                ...newCampaign,
                                endDate: new Date(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="campaign-budget">
                          Presupuesto (COP)
                        </Label>
                        <Input
                          id="campaign-budget"
                          type="number"
                          value={newCampaign.budget || ""}
                          onChange={(e) =>
                            setNewCampaign({
                              ...newCampaign,
                              budget: Number(e.target.value),
                            })
                          }
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="campaign-tags">Etiquetas</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {newCampaign.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <button
                                onClick={() => handleRemoveTag(tag)}
                                className="ml-1 text-xs hover:text-gray-700"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <Input
                          placeholder="Añadir etiqueta (presiona Enter)"
                          onKeyDown={handleAddTag}
                        />
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
                  <Button onClick={handleCreateCampaign}>Crear Campaña</Button>
                </div>
              </div>
            ) : selectedCampaign ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-lg">
                        {selectedCampaign.title}
                      </h2>
                      {getStatusBadge(selectedCampaign.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" /> Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" /> Duplicar
                      </Button>
                    </div>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Descripción
                      </h3>
                      <p className="text-gray-700">
                        {selectedCampaign.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">
                          Objetivo
                        </h3>
                        <div className="flex items-start gap-2">
                          <Target className="w-5 h-5 text-primary mt-0.5" />
                          <p className="text-gray-700">
                            {selectedCampaign.objective}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">
                          Audiencia objetivo
                        </h3>
                        <div className="flex items-start gap-2">
                          <Users className="w-5 h-5 text-primary mt-0.5" />
                          <p className="text-gray-700">
                            {selectedCampaign.targetAudience}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Fechas
                        </h3>
                        <div className="flex items-center gap-2">
                          <CalendarIcon2 className="w-4 h-4 text-gray-500" />
                          <span>
                            {formatDate(selectedCampaign.startDate)} -{" "}
                            {formatDate(selectedCampaign.endDate)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Presupuesto
                        </h3>
                        <p className="font-semibold">
                          {formatCurrency(selectedCampaign.budget)}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Tipo
                        </h3>
                        <div>
                          {getSeasonalityBadge(selectedCampaign.seasonality)}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-500">
                          Progreso
                        </h3>
                        <span className="text-sm font-medium">
                          {selectedCampaign.progress}%
                        </span>
                      </div>
                      <Progress
                        value={selectedCampaign.progress}
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-500">
                        Canales
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedCampaign.channels.map((channel, index) => (
                          <Card key={index} className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {channel.icon}
                                <span>{channel.name}</span>
                              </div>
                              <Badge variant="outline">
                                {channel.contentCount}
                              </Badge>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-500">
                        KPIs
                      </h3>
                      <div className="space-y-3">
                        {selectedCampaign.kpis.map((kpi, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {kpi.name}
                              </span>
                              <div className="text-sm">
                                <span className="font-medium">
                                  {kpi.current.toLocaleString()}
                                </span>
                                <span className="text-gray-500">
                                  {" "}
                                  / {kpi.target.toLocaleString()} {kpi.unit}
                                </span>
                              </div>
                            </div>
                            <Progress
                              value={(kpi.current / kpi.target) * 100}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Etiquetas
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCampaign.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                        <Input
                          placeholder="Añadir etiqueta (presiona Enter)"
                          className="w-48 h-7 text-xs"
                          onKeyDown={handleAddTag}
                        />
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="p-4 border-t flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                  </Button>

                  <div className="flex gap-2">
                    {selectedCampaign.status === "draft" && (
                      <Button>
                        <CheckCircle className="w-4 h-4 mr-2" /> Activar Campaña
                      </Button>
                    )}
                    {selectedCampaign.status === "active" && (
                      <Button variant="outline">
                        <Clock className="w-4 h-4 mr-2" /> Pausar
                      </Button>
                    )}
                    <Button>
                      <BarChart className="w-4 h-4 mr-2" /> Ver Analíticas
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Megaphone className="w-12 h-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium">
                    Selecciona una campaña
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Selecciona una campaña existente para ver sus detalles o
                    crea una nueva campaña
                  </p>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Nueva Campaña
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

export default CampaignPlanner;
