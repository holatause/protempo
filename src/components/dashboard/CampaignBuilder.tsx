import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  Users,
  Calendar,
  BarChart,
  Megaphone,
  Wand2,
  Plus,
  ChevronRight,
  Check,
} from "lucide-react";

interface CampaignTemplate {
  id: string;
  title: string;
  description: string;
  objective: string;
  audience: string;
  duration: string;
  channels: string[];
  difficulty: "easy" | "medium" | "advanced";
}

const mockTemplates: CampaignTemplate[] = [
  {
    id: "1",
    title: "Lanzamiento de Producto",
    description:
      "Campaña completa para introducir un nuevo producto al mercado",
    objective: "Awareness y ventas iniciales",
    audience: "Clientes actuales y nuevos prospectos",
    duration: "4 semanas",
    channels: ["Social Media", "Email", "Paid Ads"],
    difficulty: "medium",
  },
  {
    id: "2",
    title: "Campaña de Remarketing",
    description: "Recupera clientes que visitaron tu sitio pero no compraron",
    objective: "Conversión",
    audience: "Visitantes previos sin conversión",
    duration: "2 semanas",
    channels: ["Paid Ads", "Email"],
    difficulty: "easy",
  },
  {
    id: "3",
    title: "Campaña de Fidelización",
    description: "Fortalece la relación con clientes existentes",
    objective: "Retención y lealtad",
    audience: "Clientes actuales",
    duration: "Continua",
    channels: ["Email", "Social Media", "Loyalty Program"],
    difficulty: "medium",
  },
  {
    id: "4",
    title: "Campaña Omnicanal",
    description: "Estrategia integrada a través de múltiples canales",
    objective: "Awareness, consideración y conversión",
    audience: "Audiencia general y segmentada",
    duration: "8 semanas",
    channels: ["Social Media", "Email", "Paid Ads", "Content Marketing", "SEO"],
    difficulty: "advanced",
  },
];

const CampaignBuilder = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] =
    useState<CampaignTemplate | null>(null);

  const getDifficultyColor = (difficulty: CampaignTemplate["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
    }
  };

  const handleSelectTemplate = (template: CampaignTemplate) => {
    setSelectedTemplate(template);
    setActiveTab("customize");
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-primary" />
          Constructor de Campañas
        </CardTitle>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Plantillas
            </TabsTrigger>
            <TabsTrigger value="customize" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Personalizar
            </TabsTrigger>
            <TabsTrigger value="launch" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Lanzar
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="templates" className="p-0">
          <ScrollArea className="h-[700px]">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleSelectTemplate(template)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{template.title}</h3>
                      <Badge
                        className={getDifficultyColor(template.difficulty)}
                      >
                        {template.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span>{template.objective}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{template.audience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{template.duration}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-between"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      Seleccionar plantilla
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="customize" className="p-6">
          {selectedTemplate ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Personalizar: {selectedTemplate.title}
                </h3>
                <Badge
                  className={getDifficultyColor(selectedTemplate.difficulty)}
                >
                  {selectedTemplate.difficulty}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Nombre de la campaña</Label>
                  <Input
                    id="campaign-name"
                    defaultValue={selectedTemplate.title}
                    placeholder="Nombre de tu campaña"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-description">Descripción</Label>
                  <Textarea
                    id="campaign-description"
                    defaultValue={selectedTemplate.description}
                    placeholder="Describe tu campaña"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-objective">Objetivo</Label>
                    <Input
                      id="campaign-objective"
                      defaultValue={selectedTemplate.objective}
                      placeholder="Objetivo principal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaign-audience">Audiencia</Label>
                    <Input
                      id="campaign-audience"
                      defaultValue={selectedTemplate.audience}
                      placeholder="Audiencia objetivo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaign-duration">Duración</Label>
                    <Input
                      id="campaign-duration"
                      defaultValue={selectedTemplate.duration}
                      placeholder="Duración de la campaña"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaign-budget">Presupuesto</Label>
                    <Input
                      id="campaign-budget"
                      placeholder="Presupuesto estimado"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Canales</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedTemplate.channels.map((channel) => (
                      <div
                        key={channel}
                        className="flex items-center p-2 border rounded-md"
                      >
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>{channel}</span>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Añadir canal
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("templates")}
                >
                  Volver
                </Button>
                <Button onClick={() => setActiveTab("launch")}>
                  Continuar
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p>Selecciona una plantilla primero</p>
              <Button variant="link" onClick={() => setActiveTab("templates")}>
                Ver plantillas
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="launch" className="p-6">
          <div className="space-y-6">
            <div className="text-center py-8">
              <Megaphone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                ¡Tu campaña está lista para lanzarse!
              </h3>
              <p className="text-gray-600 mb-6">
                Revisa los detalles finales y lanza tu campaña cuando estés
                listo.
              </p>
              <Button size="lg">
                <Wand2 className="w-5 h-5 mr-2" />
                Lanzar Campaña
              </Button>
            </div>

            {selectedTemplate && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Resumen de la campaña</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nombre</p>
                      <p className="font-medium">{selectedTemplate.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Objetivo</p>
                      <p className="font-medium">
                        {selectedTemplate.objective}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Audiencia</p>
                      <p className="font-medium">{selectedTemplate.audience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duración</p>
                      <p className="font-medium">{selectedTemplate.duration}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Canales</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.channels.map((channel) => (
                        <Badge key={channel} variant="secondary">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CampaignBuilder;
