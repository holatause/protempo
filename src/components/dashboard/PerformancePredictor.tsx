import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  TrendingUp,
  Users,
  Target,
  Clock,
  Zap,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

interface PredictionResult {
  overallScore: number;
  metrics: {
    engagement: number;
    clickThrough: number;
    conversion: number;
    reach: number;
    roi: number;
  };
  audienceMatch: number;
  strengths: string[];
  improvements: string[];
  audienceInsights: {
    age: string[];
    interests: string[];
    behavior: string[];
  };
  bestTimeToPost: string[];
}

const mockPrediction: PredictionResult = {
  overallScore: 78,
  metrics: {
    engagement: 82,
    clickThrough: 75,
    conversion: 68,
    reach: 85,
    roi: 79,
  },
  audienceMatch: 73,
  strengths: [
    "Mensaje claro y conciso",
    "Llamada a la acción efectiva",
    "Imágenes de alta calidad",
    "Propuesta de valor bien definida",
  ],
  improvements: [
    "Añadir más elementos visuales para aumentar engagement",
    "Personalizar el mensaje para diferentes segmentos",
    "Incluir testimonios o prueba social",
    "Optimizar para dispositivos móviles",
  ],
  audienceInsights: {
    age: ["25-34", "35-44"],
    interests: [
      "Marketing digital",
      "Tecnología",
      "Emprendimiento",
      "Productividad",
    ],
    behavior: [
      "Consumidores de contenido educativo",
      "Tomadores de decisiones",
      "Profesionales en crecimiento",
    ],
  },
  bestTimeToPost: ["Martes 10:00 AM", "Jueves 2:00 PM", "Miércoles 6:00 PM"],
};

const PerformancePredictor = () => {
  const [loading, setLoading] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [predicted, setPredicted] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "metrics",
  ]);

  const handlePredict = () => {
    if (!campaignTitle || !campaignDescription) return;

    setLoading(true);
    // Simulación de predicción
    setTimeout(() => {
      setLoading(false);
      setPredicted(true);
      setPrediction(mockPrediction);
    }, 2000);
  };

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    return "text-amber-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-blue-100";
    return "bg-amber-100";
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5 text-primary" />
          Predictor de Rendimiento
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 space-y-6">
          {!predicted ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-title">Título de la campaña</Label>
                <Input
                  id="campaign-title"
                  placeholder="Ej: Lanzamiento de nueva plataforma de marketing con IA"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-description">
                  Descripción de la campaña
                </Label>
                <Textarea
                  id="campaign-description"
                  placeholder="Describe tu campaña, objetivos, canales, etc."
                  value={campaignDescription}
                  onChange={(e) => setCampaignDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-audience">Audiencia objetivo</Label>
                <Textarea
                  id="target-audience"
                  placeholder="Describe tu audiencia objetivo (edad, intereses, comportamiento, etc.)"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="pt-4">
                <Button
                  onClick={handlePredict}
                  disabled={loading || !campaignTitle || !campaignDescription}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Predecir rendimiento
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : prediction ? (
            <ScrollArea className="h-[700px] pr-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    Predicción de rendimiento
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Score general:</span>
                    <Badge
                      className={`${getScoreBg(prediction.overallScore)} ${getScoreColor(prediction.overallScore)}`}
                    >
                      {prediction.overallScore}/100
                    </Badge>
                  </div>
                </div>

                <Card className="p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("metrics")}
                  >
                    <h3 className="font-semibold flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-primary" />
                      Métricas predichas
                    </h3>
                    {expandedSections.includes("metrics") ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>

                  {expandedSections.includes("metrics") && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Engagement</span>
                          <span
                            className={`text-sm font-medium ${getScoreColor(prediction.metrics.engagement)}`}
                          >
                            {prediction.metrics.engagement}%
                          </span>
                        </div>
                        <Progress value={prediction.metrics.engagement} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Click-through rate</span>
                          <span
                            className={`text-sm font-medium ${getScoreColor(prediction.metrics.clickThrough)}`}
                          >
                            {prediction.metrics.clickThrough}%
                          </span>
                        </div>
                        <Progress value={prediction.metrics.clickThrough} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Conversión</span>
                          <span
                            className={`text-sm font-medium ${getScoreColor(prediction.metrics.conversion)}`}
                          >
                            {prediction.metrics.conversion}%
                          </span>
                        </div>
                        <Progress value={prediction.metrics.conversion} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Alcance</span>
                          <span
                            className={`text-sm font-medium ${getScoreColor(prediction.metrics.reach)}`}
                          >
                            {prediction.metrics.reach}%
                          </span>
                        </div>
                        <Progress value={prediction.metrics.reach} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">ROI estimado</span>
                          <span
                            className={`text-sm font-medium ${getScoreColor(prediction.metrics.roi)}`}
                          >
                            {prediction.metrics.roi}%
                          </span>
                        </div>
                        <Progress value={prediction.metrics.roi} />
                      </div>
                    </div>
                  )}
                </Card>

                <Card className="p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("audience")}
                  >
                    <h3 className="font-semibold flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Análisis de audiencia
                    </h3>
                    {expandedSections.includes("audience") ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>

                  {expandedSections.includes("audience") && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            Coincidencia con audiencia objetivo
                          </span>
                          <span
                            className={`text-sm font-medium ${getScoreColor(prediction.audienceMatch)}`}
                          >
                            {prediction.audienceMatch}%
                          </span>
                        </div>
                        <Progress value={prediction.audienceMatch} />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                          Grupos de edad más receptivos
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {prediction.audienceInsights.age.map((age, index) => (
                            <Badge key={index} variant="outline">
                              {age}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                          Intereses principales
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {prediction.audienceInsights.interests.map(
                            (interest, index) => (
                              <Badge key={index} variant="outline">
                                {interest}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Comportamiento</h4>
                        <div className="flex flex-wrap gap-2">
                          {prediction.audienceInsights.behavior.map(
                            (behavior, index) => (
                              <Badge key={index} variant="outline">
                                {behavior}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                <Card className="p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("timing")}
                  >
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Timing óptimo
                    </h3>
                    {expandedSections.includes("timing") ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>

                  {expandedSections.includes("timing") && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                          Mejores momentos para publicar
                        </h4>
                        <div className="space-y-2">
                          {prediction.bestTimeToPost.map((time, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                                {index + 1}
                              </div>
                              <span>{time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                <Card className="p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("insights")}
                  >
                    <h3 className="font-semibold flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Insights y recomendaciones
                    </h3>
                    {expandedSections.includes("insights") ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>

                  {expandedSections.includes("insights") && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                          </div>
                          Fortalezas
                        </h4>
                        <ul className="space-y-1">
                          {prediction.strengths.map((strength, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-green-500">✓</span>{" "}
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                          </div>
                          Áreas de mejora
                        </h4>
                        <ul className="space-y-1">
                          {prediction.improvements.map((improvement, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-amber-500">!</span>{" "}
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </Card>

                <div className="pt-4 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPredicted(false)}
                    className="flex-1"
                  >
                    Editar campaña
                  </Button>
                  <Button className="flex-1">
                    <Target className="w-4 h-4 mr-2" />
                    Aplicar optimizaciones
                  </Button>
                </div>
              </div>
            </ScrollArea>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformancePredictor;
