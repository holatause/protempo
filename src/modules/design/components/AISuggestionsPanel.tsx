import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Wand2, Lightbulb, Palette, Layout, Target, Users, TrendingUp, Image as ImageIcon } from "lucide-react";

interface Suggestion {
  id: string;
  type: "layout" | "color" | "content" | "audience" | "trend" | "image";
  title: string;
  description: string;
  example?: string;
  confidence?: number;
}

const colombianMarketSuggestions: Suggestion[] = [
  {
    id: "1",
    type: "layout",
    title: "Mejora la jerarquía visual",
    description: "Destaca el mensaje principal aumentando su tamaño y posición",
    confidence: 0.92,
  },
  {
    id: "2",
    type: "color",
    title: "Paleta colombiana",
    description: "Prueba con colores inspirados en la bandera colombiana para mayor conexión local",
    example: "#FCD116,#003893,#CE1126",
    confidence: 0.89,
  },
  {
    id: "3",
    type: "content",
    title: "Mensaje directo",
    description: "Los colombianos prefieren mensajes directos y claros. Reduce el texto a lo esencial.",
    confidence: 0.85,
  },
  {
    id: "4",
    type: "audience",
    title: "Enfoque juvenil",
    description: "El público colombiano joven responde mejor a diseños modernos y dinámicos",
    confidence: 0.87,
  },
  {
    id: "5",
    type: "trend",
    title: "Tendencia actual",
    description: "Los diseños con elementos de naturaleza están ganando popularidad en Colombia",
    confidence: 0.82,
  },
  {
    id: "6",
    type: "image",
    title: "Imágenes locales",
    description: "Utiliza fotografías que muestren paisajes o personas colombianas para mayor identificación",
    confidence: 0.94,
  },
];

interface AISuggestionsPanelProps {
  onApplySuggestion?: (suggestion: Suggestion) => void;
  context?: {
    network?: string;
    format?: string;
    campaign?: string;
  };
  loading?: boolean;
}

const AISuggestionsPanel = ({ onApplySuggestion, context, loading = false }: AISuggestionsPanelProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  
  // Cargar sugerencias basadas en el contexto
  useEffect(() => {
    // En una implementación real, aquí se llamaría a la API para obtener sugerencias
    // basadas en el contexto proporcionado (red social, formato, campaña, etc.)
    setSuggestions(colombianMarketSuggestions);
  }, [context]);
  const getIcon = (type: Suggestion["type"]) => {
    switch (type) {
      case "layout":
        return <Layout className="w-4 h-4" />;
      case "color":
        return <Palette className="w-4 h-4" />;
      case "content":
        return <Lightbulb className="w-4 h-4" />;
      case "audience":
        return <Users className="w-4 h-4" />;
      case "trend":
        return <TrendingUp className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <Wand2 className="w-4 h-4" />;
    }
  };
  
  // Renderizar esqueletos durante la carga
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, i) => (
      <Card key={`skeleton-${i}`} className="p-3">
        <div className="flex items-start gap-3">
          <Skeleton className="w-5 h-5 rounded-full mt-1" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-8 w-full mt-2" />
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <Card className="w-[300px] h-full bg-white shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Sugerencias de Diseño</h2>
          </div>
          <Badge variant="outline" className="text-xs">
            <Target className="w-3 h-3 mr-1" />
            Colombia
          </Badge>
        </div>
        {context?.network && (
          <p className="text-xs text-muted-foreground mt-1">
            Optimizado para {context.network} {context.format || ''}
          </p>
        )}
      </div>

      <ScrollArea className="h-[calc(100%-57px)]">
        <div className="p-4 space-y-4">
          {loading ? (
            renderSkeletons()
          ) : (
            suggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onApplySuggestion?.(suggestion)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">{getIcon(suggestion.type)}</div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {suggestion.type}
                      </Badge>
                      {suggestion.confidence && (
                        <span className="text-xs text-muted-foreground">
                          {Math.round(suggestion.confidence * 100)}%
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium">{suggestion.title}</h3>
                    <p className="text-sm text-gray-600">
                      {suggestion.description}
                    </p>
                    {suggestion.example && (
                      <div className="mt-2 p-2 bg-muted rounded-md text-xs">
                        <span className="font-medium">Ejemplo: </span>
                        {suggestion.type === "color" ? (
                          <div className="flex gap-1 mt-1">
                            {suggestion.example.split(',').map((color, i) => (
                              <div 
                                key={i} 
                                className="w-5 h-5 rounded-full border" 
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        ) : suggestion.example}
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      Aplicar Sugerencia
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default AISuggestionsPanel;
