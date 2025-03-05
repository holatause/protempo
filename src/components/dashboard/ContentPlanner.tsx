import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Calendar as CalendarIcon,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Wand2,
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  date: Date;
  platforms: ("instagram" | "facebook" | "twitter" | "linkedin")[];
  status: "draft" | "scheduled" | "published";
  type: "post" | "story" | "reel" | "video";
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Lanzamiento de producto",
    description:
      "Anuncio del nuevo servicio de consultoría de marketing digital",
    date: new Date(2024, 3, 15, 14, 30),
    platforms: ["instagram", "facebook", "linkedin"],
    status: "scheduled",
    type: "post",
  },
  {
    id: "2",
    title: "Testimonios de clientes",
    description: "Serie de historias con testimonios de clientes satisfechos",
    date: new Date(2024, 3, 16, 10, 0),
    platforms: ["instagram"],
    status: "draft",
    type: "story",
  },
  {
    id: "3",
    title: "Tutorial de marketing",
    description: "Video tutorial sobre estrategias de SEO básicas",
    date: new Date(2024, 3, 18, 16, 0),
    platforms: ["youtube", "facebook"],
    status: "draft",
    type: "video",
  },
  {
    id: "4",
    title: "Infografía de tendencias",
    description: "Infografía sobre tendencias de marketing para 2024",
    date: new Date(2024, 3, 12, 9, 0),
    platforms: ["instagram", "linkedin"],
    status: "published",
    type: "post",
  },
];

const ContentPlanner = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("calendar");

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "facebook":
        return <Facebook className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ContentItem["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "published":
        return "bg-green-100 text-green-800";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const filteredContent = date
    ? mockContent.filter(
        (item) =>
          item.date.getDate() === date.getDate() &&
          item.date.getMonth() === date.getMonth() &&
          item.date.getFullYear() === date.getFullYear(),
      )
    : mockContent;

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Planificador de Contenido</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Nuevo Contenido
          </Button>
        </div>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Calendario
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Generador de Contenido
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="calendar" className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            <div className="p-6 border-r">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="md:col-span-2">
              <ScrollArea className="h-[600px]">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {date?.toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>

                  {filteredContent.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No hay contenido programado para este día
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredContent.map((item) => (
                        <Card key={item.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">{item.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {item.description}
                                </p>
                              </div>
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4 text-gray-500" />
                                <span>{formatTime(item.date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {item.platforms.map((platform) => (
                                  <div
                                    key={platform}
                                    className="text-gray-500"
                                    title={platform}
                                  >
                                    {getPlatformIcon(platform)}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Generador de Ideas</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Genera ideas de contenido basadas en tu audiencia y objetivos
                </p>
                <Button className="w-full">
                  <Wand2 className="w-4 h-4 mr-2" /> Generar Ideas
                </Button>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">Calendario Editorial</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Crea un calendario editorial completo para el próximo mes
                </p>
                <Button className="w-full">
                  <CalendarIcon className="w-4 h-4 mr-2" /> Crear Calendario
                </Button>
              </Card>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4">Contenido Reciente</h3>
              <div className="space-y-3">
                {mockContent.slice(0, 3).map((item) => (
                  <Card key={item.id} className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{item.date.toLocaleDateString()}</span>
                          <div className="flex items-center gap-1">
                            {item.platforms.map((platform) => (
                              <span key={platform}>
                                {getPlatformIcon(platform)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ContentPlanner;
