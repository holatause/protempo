import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart,
  Target,
  Users,
  Zap,
} from "lucide-react";

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  description: string;
}

interface Optimization {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  progress: number;
}

const mockMetrics: MetricCard[] = [
  {
    id: "1",
    title: "Engagement Rate",
    value: "4.8%",
    change: 0.7,
    trend: "up",
    description: "Promedio de interacciones por publicación",
  },
  {
    id: "2",
    title: "Reach",
    value: "12.4K",
    change: 1.2,
    trend: "up",
    description: "Personas alcanzadas en los últimos 7 días",
  },
  {
    id: "3",
    title: "Conversion Rate",
    value: "2.1%",
    change: -0.3,
    trend: "down",
    description: "Porcentaje de visitantes que convierten",
  },
  {
    id: "4",
    title: "ROI",
    value: "3.2x",
    change: 0.5,
    trend: "up",
    description: "Retorno sobre la inversión de marketing",
  },
];

const mockOptimizations: Optimization[] = [
  {
    id: "1",
    title: "Optimizar horarios de publicación",
    description: "Ajustar horarios basados en actividad de la audiencia",
    impact: "high",
    effort: "low",
    progress: 75,
  },
  {
    id: "2",
    title: "Mejorar copy de anuncios",
    description: "Revisar y optimizar textos para mayor conversión",
    impact: "medium",
    effort: "medium",
    progress: 30,
  },
  {
    id: "3",
    title: "Segmentación de audiencia",
    description: "Refinar segmentos para campañas más personalizadas",
    impact: "high",
    effort: "high",
    progress: 10,
  },
];

const OptimizationPanel = () => {
  const getImpactColor = (impact: Optimization["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEffortColor = (effort: Optimization["effort"]) => {
    switch (effort) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
    }
  };

  const getTrendIcon = (trend: MetricCard["trend"]) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case "down":
        return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Panel de Optimización
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[800px]">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Métricas Clave</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockMetrics.map((metric) => (
                  <Card key={metric.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{metric.title}</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold">{metric.value}</p>
                          <div className="flex items-center">
                            {getTrendIcon(metric.trend)}
                            <span
                              className={`text-xs font-medium ${metric.trend === "up" ? "text-green-500" : metric.trend === "down" ? "text-red-500" : "text-gray-500"}`}
                            >
                              {metric.change > 0 ? "+" : ""}
                              {metric.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-100 rounded-full">
                        {metric.title === "Engagement Rate" ? (
                          <Users className="w-5 h-5 text-blue-500" />
                        ) : metric.title === "Reach" ? (
                          <Target className="w-5 h-5 text-purple-500" />
                        ) : metric.title === "Conversion Rate" ? (
                          <Zap className="w-5 h-5 text-amber-500" />
                        ) : (
                          <BarChart className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {metric.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Oportunidades de Optimización
              </h3>
              <div className="space-y-4">
                {mockOptimizations.map((opt) => (
                  <Card key={opt.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{opt.title}</h4>
                          <p className="text-sm text-gray-600">
                            {opt.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getImpactColor(opt.impact)}>
                            Impacto: {opt.impact}
                          </Badge>
                          <Badge className={getEffortColor(opt.effort)}>
                            Esfuerzo: {opt.effort}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progreso</span>
                          <span>{opt.progress}%</span>
                        </div>
                        <Progress value={opt.progress} />
                      </div>
                      <Button className="w-full">
                        Implementar Optimización
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OptimizationPanel;
