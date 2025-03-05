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
  Image as ImageIcon,
  Type,
  Video,
  Wand2,
  Copy,
  Check,
  RefreshCw,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  Layers,
} from "lucide-react";

interface AdVariation {
  id: string;
  headline: string;
  description: string;
  imageUrl: string;
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  format: "square" | "portrait" | "landscape";
  predictedScore: number;
}

const mockVariations: AdVariation[] = [
  {
    id: "1",
    headline: "Descubre el poder de la IA en tu marketing",
    description:
      "Automatiza tus campañas y aumenta tus conversiones con nuestra plataforma de IA",
    imageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    platform: "facebook",
    format: "square",
    predictedScore: 8.7,
  },
  {
    id: "2",
    headline: "Marketing con IA: El futuro es ahora",
    description:
      "Optimiza tus campañas con inteligencia artificial y supera a tu competencia",
    imageUrl:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    platform: "instagram",
    format: "square",
    predictedScore: 9.2,
  },
  {
    id: "3",
    headline: "Transforma tu estrategia digital",
    description:
      "Nuestra plataforma de IA analiza tu audiencia y crea contenido personalizado",
    imageUrl:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    platform: "linkedin",
    format: "landscape",
    predictedScore: 7.9,
  },
];

const AdCreator = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [variations, setVariations] = useState<AdVariation[]>(mockVariations);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "facebook",
    "instagram",
  ]);
  const [copied, setCopied] = useState<string | null>(null);

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

  const handleGenerateAds = () => {
    if (!prompt) return;

    setLoading(true);
    // Simulación de generación de anuncios
    setTimeout(() => {
      setLoading(false);
      setActiveTab("variations");
    }, 2000);
  };

  const handleCopy = (id: string) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" />
          Creador de Anuncios con IA
        </CardTitle>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Crear
            </TabsTrigger>
            <TabsTrigger value="variations" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Variaciones
            </TabsTrigger>
            <TabsTrigger value="competitor" className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Análisis de Competencia
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="create" className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ad-prompt">Describe tu anuncio</Label>
                <Textarea
                  id="ad-prompt"
                  placeholder="Ej: Anuncio para una plataforma de marketing con IA dirigida a pequeñas empresas que quieren automatizar sus campañas"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Plataformas</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={
                      selectedPlatforms.includes("facebook")
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => togglePlatform("facebook")}
                    className="flex items-center gap-2"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button
                    variant={
                      selectedPlatforms.includes("instagram")
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => togglePlatform("instagram")}
                    className="flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Button>
                  <Button
                    variant={
                      selectedPlatforms.includes("twitter")
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => togglePlatform("twitter")}
                    className="flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button
                    variant={
                      selectedPlatforms.includes("linkedin")
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => togglePlatform("linkedin")}
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de contenido</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Imagen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Type className="w-4 h-4" />
                    Texto
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    Video
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleGenerateAds}
                  disabled={!prompt || loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generando anuncios...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generar anuncios
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="variations" className="p-0">
          <ScrollArea className="h-[700px]">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Variaciones generadas</h3>
                <Button size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generar más
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {variations.map((variation) => (
                  <Card key={variation.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={variation.imageUrl}
                        alt={variation.headline}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Badge className="bg-white/80 text-black hover:bg-white/70">
                          {getPlatformIcon(variation.platform)}
                        </Badge>
                        <Badge className="bg-white/80 text-black hover:bg-white/70">
                          Score: {variation.predictedScore}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-semibold">{variation.headline}</h4>
                        <p className="text-sm text-gray-600">
                          {variation.description}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(variation.id)}
                        >
                          {copied === variation.id ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copiado
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copiar
                            </>
                          )}
                        </Button>
                        <Button size="sm">Usar anuncio</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="competitor" className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="competitor-url">URL del competidor</Label>
                <div className="flex gap-2">
                  <Input
                    id="competitor-url"
                    placeholder="https://www.competidor.com"
                    className="flex-1"
                  />
                  <Button>Analizar</Button>
                </div>
              </div>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Análisis de competencia</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Ingresa la URL de tu competidor para analizar sus anuncios y
                  obtener ideas para mejorar tus campañas.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Características que puedes analizar:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Estilo visual y tono de comunicación</li>
                      <li>Propuestas de valor destacadas</li>
                      <li>Llamados a la acción efectivos</li>
                      <li>Segmentación de audiencia</li>
                      <li>Frecuencia y horarios de publicación</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AdCreator;
