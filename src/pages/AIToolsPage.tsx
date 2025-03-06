import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import AIAssistant from "@/components/ai/AIAssistant";
import ContentGenerator from "@/components/ai/ContentGenerator";
import ImageGenerator from "@/components/ai/ImageGenerator";
import { Sparkles, FileText, Image as ImageIcon } from "lucide-react";

const AIToolsPage = () => {
  const [activeTab, setActiveTab] = useState("assistant");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Herramientas de IA</CardTitle>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="assistant" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Asistente de Marketing
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generador de Contenido
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Generador de Imágenes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assistant">
            <AIAssistant />
          </TabsContent>

          <TabsContent value="content">
            <ContentGenerator />
          </TabsContent>

          <TabsContent value="images">
            <ImageGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIToolsPage;
