import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  TrendingUp,
  BarChart,
  Users,
  MessageSquare,
  Clock,
  Target,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

interface CompetitorData {
  name: string;
  url: string;
  logo: string;
  metrics: {
    engagement: number;
    postFrequency: number;
    audienceSize: number;
    contentQuality: number;
    visualConsistency: number;
  };
  topKeywords: string[];
  topPosts: {
    id: string;
    title: string;
    engagement: number;
    type: "image" | "video" | "carousel";
    url: string;
  }[];
  insights: string[];
}

const mockCompetitor: CompetitorData = {
  name: "MarketingPro AI",
  url: "marketingpro.ai",
  logo: "https://api.dicebear.com/7.x/initials/svg?seed=MP",
  metrics: {
    engagement: 78,
    postFrequency: 65,
    audienceSize: 82,
    contentQuality: 90,
    visualConsistency: 85,
  },
  topKeywords: [
    "marketing automation",
    "AI tools",
    "content strategy",
    "ROI",
    "analytics",
    "campaign optimization",
  ],
  topPosts: [
    {
      id: "1",
      title: "5 formas en que la IA está transformando el marketing digital",
      engagement: 92,
      type: "carousel",
      url: "#",
    },
    {
      id: "2",
      title: "Caso de éxito: Cómo aumentamos conversiones en un 45%",
      engagement: 87,
      type: "image",
      url: "#",
    },
    {
      id: "3",
      title: "Tutorial: Automatiza tu estrategia de contenido con IA",
      engagement: 81,
      type: "video",
      url: "#",
    },
  ],
  insights: [
    "Publican contenido educativo 3 veces por semana, con mayor engagement los martes y jueves",
    "Utilizan una combinación de contenido generado por IA y testimonios de clientes reales",
    "Su audiencia principal son profesionales de marketing entre 28-45 años",
    "Destacan casos de éxito con métricas específicas y resultados medibles",
    "Mantienen una paleta de colores consistente en todas sus publicaciones",
  ],
};

const CompetitorAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [competitor, setCompetitor] = useState<CompetitorData | null>(null);

  const handleAnalyze = () => {
    if (!competitorUrl) return;

    setLoading(true);
    // Simulación de análisis
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
      setCompetitor(mockCompetitor);
    }, 2000);
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-blue-600";
    return "text-amber-600";
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Análisis de Competencia
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="competitor-url">URL del competidor</Label>
              <div className="flex gap-2">
                <Input
                  id="competitor-url"
                  placeholder="https://www.competidor.com"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !competitorUrl}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    "Analizar"
                  )}
                </Button>
              </div>
            </div>

            {!analyzed ? (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Análisis de competencia</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Ingresa la URL de tu competidor para analizar su estrategia de
                  marketing y obtener insights valiosos para mejorar tus
                  campañas.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Información que obtendrás:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>
                        Métricas de engagement y frecuencia de publicación
                      </li>
                      <li>Análisis de contenido y tono de comunicación</li>
                      <li>Palabras clave más utilizadas</li>
                      <li>Publicaciones con mayor engagement</li>
                      <li>Insights accionables para tu estrategia</li>
                    </ul>
                  </div>
                </div>
              </Card>
            ) : competitor ? (
              <ScrollArea className="h-[700px] pr-4">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={competitor.logo}
                        alt={competitor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {competitor.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {competitor.url}
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 p-0">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Métricas clave
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">
                              Engagement
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${getMetricColor(competitor.metrics.engagement)}`}
                          >
                            {competitor.metrics.engagement}%
                          </span>
                        </div>
                        <Progress value={competitor.metrics.engagement} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium">
                              Frecuencia de publicación
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${getMetricColor(competitor.metrics.postFrequency)}`}
                          >
                            {competitor.metrics.postFrequency}%
                          </span>
                        </div>
                        <Progress value={competitor.metrics.postFrequency} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium">
                              Tamaño de audiencia
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${getMetricColor(competitor.metrics.audienceSize)}`}
                          >
                            {competitor.metrics.audienceSize}%
                          </span>
                        </div>
                        <Progress value={competitor.metrics.audienceSize} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BarChart className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-medium">
                              Calidad de contenido
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${getMetricColor(competitor.metrics.contentQuality)}`}
                          >
                            {competitor.metrics.contentQuality}%
                          </span>
                        </div>
                        <Progress value={competitor.metrics.contentQuality} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Palabras clave principales
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {competitor.topKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Publicaciones con mayor engagement
                    </h3>
                    <div className="space-y-3">
                      {competitor.topPosts.map((post) => (
                        <Card key={post.id} className="p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{post.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {post.type}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  Engagement: {post.engagement}%
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Insights y recomendaciones
                    </h3>
                    <div className="space-y-3">
                      {competitor.insights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-sm text-gray-700">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Generar estrategia para superar a la competencia
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
