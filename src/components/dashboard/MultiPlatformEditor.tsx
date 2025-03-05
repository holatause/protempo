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
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Wand2,
  RefreshCw,
  Image as ImageIcon,
  Type,
  Clock,
  Calendar,
} from "lucide-react";

interface PlatformContent {
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  title: string;
  content: string;
  imageUrl: string;
  hashtags: string[];
  characterCount: number;
  maxLength: number;
  bestTimeToPost: string;
}

const mockContent: PlatformContent[] = [
  {
    platform: "instagram",
    title: "Optimiza tu marketing con IA",
    content:
      "¿Cansado de pasar horas creando contenido? Nuestra plataforma de IA genera posts, imágenes y estrategias personalizadas para tu marca en segundos. ¡Pruébala hoy! 🚀 #MarketingIA #Automatización",
    imageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    hashtags: [
      "MarketingIA",
      "Automatización",
      "ContentCreation",
      "DigitalMarketing",
    ],
    characterCount: 215,
    maxLength: 2200,
    bestTimeToPost: "Jueves, 6:00 PM",
  },
  {
    platform: "facebook",
    title: "Revoluciona tu estrategia de marketing con IA",
    content:
      "La inteligencia artificial está transformando el marketing digital. Nuestra plataforma te permite crear campañas personalizadas, analizar datos en tiempo real y optimizar tu ROI automáticamente. Descubre cómo puedes ahorrar tiempo y aumentar tus conversiones con nuestra solución todo en uno. ¡Solicita una demo gratuita hoy mismo!",
    imageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    hashtags: [
      "MarketingIA",
      "InteligenciaArtificial",
      "TransformaciónDigital",
    ],
    characterCount: 342,
    maxLength: 63206,
    bestTimeToPost: "Miércoles, 12:00 PM",
  },
  {
    platform: "twitter",
    title: "",
    content:
      "🚀 La IA está revolucionando el marketing. Nuestra plataforma genera contenido, optimiza campañas y analiza resultados automáticamente. Ahorra tiempo, aumenta conversiones. #MarketingIA #IA",
    imageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    hashtags: ["MarketingIA", "IA"],
    characterCount: 180,
    maxLength: 280,
    bestTimeToPost: "Martes, 9:00 AM",
  },
  {
    platform: "linkedin",
    title: "Potencia tu estrategia de marketing con inteligencia artificial",
    content:
      "En el competitivo panorama actual, las empresas que aprovechan la IA están superando a su competencia. Nuestra plataforma integra las últimas tecnologías de inteligencia artificial para automatizar la creación de contenido, optimizar campañas publicitarias y proporcionar insights accionables basados en datos. Los resultados hablan por sí solos: nuestros clientes han experimentado un aumento promedio del 47% en engagement y un 32% en conversiones. ¿Estás listo para transformar tu estrategia de marketing?",
    imageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    hashtags: [
      "MarketingDigital",
      "InteligenciaArtificial",
      "Innovación",
      "TransformaciónDigital",
    ],
    characterCount: 523,
    maxLength: 3000,
    bestTimeToPost: "Martes, 10:00 AM",
  },
];

const MultiPlatformEditor = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [activePlatform, setActivePlatform] = useState<string>("instagram");
  const [content, setContent] = useState<PlatformContent[]>(mockContent);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerateContent = () => {
    if (!prompt) return;

    setLoading(true);
    // Simulación de generación de contenido
    setTimeout(() => {
      setLoading(false);
      // En una implementación real, aquí se llamaría a la API para generar contenido
    }, 2000);
  };

  const handleCopy = (platform: string) => {
    setCopied(platform);
    setTimeout(() => setCopied(null), 2000);
  };

  const getPlatformIcon = (platform: string, size = 5) => {
    switch (platform) {
      case "instagram":
        return <Instagram className={`w-${size} h-${size}`} />;
      case "facebook":
        return <Facebook className={`w-${size} h-${size}`} />;
      case "twitter":
        return <Twitter className={`w-${size} h-${size}`} />;
      case "linkedin":
        return <Linkedin className={`w-${size} h-${size}`} />;
      default:
        return null;
    }
  };

  const activeContent = content.find((c) => c.platform === activePlatform);

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" />
          Editor Multiplataforma
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content-prompt">Describe tu contenido</Label>
              <Textarea
                id="content-prompt"
                placeholder="Ej: Anuncio sobre nuestra plataforma de marketing con IA, destacando la automatización y ahorro de tiempo"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleGenerateContent}
              disabled={loading || !prompt}
              className="w-full"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generando contenido...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generar contenido para todas las plataformas
                </>
              )}
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <Tabs value={activePlatform} onValueChange={setActivePlatform}>
              <TabsList className="w-full">
                {content.map((platform) => (
                  <TabsTrigger
                    key={platform.platform}
                    value={platform.platform}
                    className={
                      activePlatform === platform.platform
                        ? "bg-primary text-white"
                        : ""
                    }
                  >
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(platform.platform, 4)}
                      <span className="capitalize">{platform.platform}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {activeContent && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(activeContent.platform)}
                    <h3 className="text-lg font-semibold capitalize">
                      {activeContent.platform}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>Mejor hora: {activeContent.bestTimeToPost}</span>
                    </div>
                    <Badge
                      variant={
                        activeContent.characterCount > activeContent.maxLength
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {activeContent.characterCount}/{activeContent.maxLength}
                    </Badge>
                  </div>
                </div>

                {activeContent.platform !== "twitter" && (
                  <div className="space-y-2">
                    <Label htmlFor={`${activeContent.platform}-title`}>
                      Título
                    </Label>
                    <Input
                      id={`${activeContent.platform}-title`}
                      value={activeContent.title}
                      onChange={(e) => {
                        const updatedContent = content.map((c) =>
                          c.platform === activeContent.platform
                            ? { ...c, title: e.target.value }
                            : c,
                        );
                        setContent(updatedContent);
                      }}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor={`${activeContent.platform}-content`}>
                    Contenido
                  </Label>
                  <Textarea
                    id={`${activeContent.platform}-content`}
                    value={activeContent.content}
                    onChange={(e) => {
                      const updatedContent = content.map((c) =>
                        c.platform === activeContent.platform
                          ? {
                              ...c,
                              content: e.target.value,
                              characterCount: e.target.value.length,
                            }
                          : c,
                      );
                      setContent(updatedContent);
                    }}
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${activeContent.platform}-hashtags`}>
                    Hashtags
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {activeContent.hashtags.map((hashtag, index) => (
                      <Badge key={index} variant="secondary">
                        #{hashtag}
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id={`${activeContent.platform}-hashtags`}
                    placeholder="Añadir hashtag (presiona Enter)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        const newHashtag = e.currentTarget.value.replace(
                          /^#/,
                          "",
                        );
                        const updatedContent = content.map((c) =>
                          c.platform === activeContent.platform
                            ? {
                                ...c,
                                hashtags: [...c.hashtags, newHashtag],
                              }
                            : c,
                        );
                        setContent(updatedContent);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imagen</Label>
                  <div className="aspect-video relative rounded-md overflow-hidden">
                    <img
                      src={activeContent.imageUrl}
                      alt="Content preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute bottom-2 right-2"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Cambiar imagen
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleCopy(activeContent.platform)}
                  >
                    {copied === activeContent.platform ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar contenido
                      </>
                    )}
                  </Button>
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Programar publicación
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

export default MultiPlatformEditor;
