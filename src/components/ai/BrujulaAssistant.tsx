import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Settings,
  X,
  Minus,
  TrendingUp,
  MapPin,
  Calendar,
  Lightbulb,
  ChevronRight,
  Send,
} from "lucide-react";

const BrujulaAssistant = () => {
  const [activeTab, setActiveTab] = useState("consultas");
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    // Aquí iría la lógica para enviar el mensaje al backend
    console.log("Mensaje enviado:", inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          className="rounded-full w-14 h-14 bg-blue-700 hover:bg-blue-800 flex items-center justify-center"
          onClick={() => setIsExpanded(true)}
        >
          <MapPin className="w-6 h-6 text-yellow-300" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-[700px] shadow-xl border-0 rounded-xl overflow-hidden z-50">
      {/* Header */}
      <div className="bg-blue-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-300 rounded-full p-2">
            <MapPin className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Brújula</h2>
            <p className="text-sm text-blue-100">
              Guía experta del mercado colombiano
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-600"
            onClick={() => setIsExpanded(false)}
          >
            <Minus className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-600"
          >
            <Settings className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-600"
            onClick={() => setIsExpanded(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 rounded-none bg-white border-b">
          <TabsTrigger
            value="consultas"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-none py-3 text-base"
          >
            Consultas
          </TabsTrigger>
          <TabsTrigger
            value="sugerencias"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none py-3 text-base"
          >
            Sugerencias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="consultas" className="p-0 mt-0">
          <ScrollArea className="h-[400px]">
            <div className="p-4 space-y-4">
              {/* Aquí irían los mensajes de la conversación */}
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p>
                    ¿Cómo puedo adaptar mi estrategia de marketing para el
                    mercado colombiano?
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-700 text-white rounded-lg p-3 max-w-[80%]">
                  <p>
                    Para el mercado colombiano, te recomiendo enfocarte en estos
                    aspectos clave:
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Destacar ingredientes y materiales locales</li>
                    <li>Adaptar el tono de comunicación según la región</li>
                    <li>
                      Considerar fechas especiales locales como el Día del Amor
                      y la Amistad
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Pregunta sobre el mercado colombiano..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-blue-700 hover:bg-blue-800"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-blue-700 mt-2">
              Brújula está optimizada para consultas sobre el mercado colombiano
              y estrategias locales
            </p>
          </div>
        </TabsContent>

        <TabsContent value="sugerencias" className="p-0 mt-0">
          <ScrollArea className="h-[400px]">
            <div className="p-4 space-y-4">
              {/* Sugerencia 1 */}
              <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-amber-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-amber-800">
                      Tendencia: Revalorización de lo colombiano
                    </h3>
                    <p className="text-gray-700 mt-1">
                      Las marcas que destacan ingredientes, materiales y talento
                      local están ganando preferencia entre consumidores urbanos
                      de 25-45 años.
                    </p>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 h-auto mt-2 flex items-center"
                    >
                      Adaptar mi ADN de marca{" "}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Sugerencia 2 */}
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-blue-800">
                      Oportunidad regional: Costa Caribe
                    </h3>
                    <p className="text-gray-700 mt-1">
                      Si tu público objetivo incluye esta región, considera que
                      el tono de comunicación formal tiene menor efectividad que
                      mensajes cálidos y cercanos.
                    </p>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 h-auto mt-2 flex items-center"
                    >
                      Crear piezas adaptadas{" "}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Sugerencia 3 */}
              <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-purple-800">
                      Fechas clave: Amor y Amistad
                    </h3>
                    <p className="text-gray-700 mt-1">
                      A diferencia de San Valentín, en Colombia esta fecha
                      celebra también amistades. Amplía tu propuesta más allá de
                      parejas para aumentar relevancia.
                    </p>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 h-auto mt-2 flex items-center"
                    >
                      Planificar contenidos{" "}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Sugerencia 4 */}
              <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-green-800">
                      Insight: Consumo consciente
                    </h3>
                    <p className="text-gray-700 mt-1">
                      El 68% de los consumidores colombianos millennials
                      prefieren marcas con prácticas sostenibles y
                      responsabilidad social visible.
                    </p>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 h-auto mt-2 flex items-center"
                    >
                      Destacar sostenibilidad{" "}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default BrujulaAssistant;
