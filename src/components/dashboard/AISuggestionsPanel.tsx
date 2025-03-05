import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";

interface Suggestion {
  id: string;
  type: "content" | "audience" | "timing" | "strategy";
  title: string;
  description: string;
  confidence: number;
}

const mockSuggestions: Suggestion[] = [
  {
    id: "1",
    type: "content",
    title: "Más contenido visual",
    description:
      "Aumenta el engagement añadiendo más imágenes y videos a tus publicaciones.",
    confidence: 0.92,
  },
  {
    id: "2",
    type: "timing",
    title: "Mejor horario de publicación",
    description:
      "Tus seguidores están más activos entre 6-8 PM. Programa tus publicaciones en ese horario.",
    confidence: 0.87,
  },
  {
    id: "3",
    type: "audience",
    title: "Segmento desatendido",
    description:
      "Hay una oportunidad de conectar con usuarios de 25-34 años que no estás aprovechando.",
    confidence: 0.78,
  },
  {
    id: "4",
    type: "strategy",
    title: "Campaña de remarketing",
    description:
      "Implementa una campaña de remarketing para recuperar visitantes que no completaron una conversión.",
    confidence: 0.85,
  },
];

const AISuggestionsPanel = () => {
  const getTypeIcon = (type: Suggestion["type"]) => {
    switch (type) {
      case "content":
        return <Sparkles className="w-4 h-4" />;
      case "audience":
        return <Target className="w-4 h-4" />;
      case "timing":
        return <TrendingUp className="w-4 h-4" />;
      case "strategy":
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Suggestion["type"]) => {
    switch (type) {
      case "content":
        return "bg-purple-100 text-purple-800";
      case "audience":
        return "bg-blue-100 text-blue-800";
      case "timing":
        return "bg-green-100 text-green-800";
      case "strategy":
        return "bg-amber-100 text-amber-800";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600";
    if (confidence >= 0.8) return "text-blue-600";
    return "text-amber-600";
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Sugerencias de IA
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[800px]">
          <div className="p-6 space-y-4">
            {mockSuggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className="p-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge className={getTypeColor(suggestion.type)}>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(suggestion.type)}
                        <span className="capitalize">{suggestion.type}</span>
                      </div>
                    </Badge>
                    <span
                      className={`text-xs font-medium ${getConfidenceColor(suggestion.confidence)}`}
                    >
                      {Math.round(suggestion.confidence * 100)}% confianza
                    </span>
                  </div>
                  <h3 className="font-semibold">{suggestion.title}</h3>
                  <p className="text-sm text-gray-600">
                    {suggestion.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between"
                  >
                    Aplicar sugerencia
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AISuggestionsPanel;
