import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Copy, Check, RefreshCw } from "lucide-react";
import { aiService } from "@/lib/api";

const ContentGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [contentType, setContentType] = useState("social");

  const handleGenerate = async () => {
    if (!prompt) return;

    try {
      setLoading(true);
      const response = await aiService.generateContent({
        prompt,
        context: { type: contentType },
        type: "text",
      });
      setGeneratedContent(response.content);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" />
          Generador de Contenido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="social" onValueChange={setContentType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="social">Redes Sociales</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Tema</Label>
              <Input
                placeholder="Ej: Lanzamiento de producto, evento, promoción..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Asunto</Label>
              <Input
                placeholder="Ej: Newsletter, promoción, actualización..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                placeholder="Ej: Guía, tutorial, análisis..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="flex-1"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generar Contenido
              </>
            )}
          </Button>
        </div>

        {generatedContent && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Contenido Generado</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8"
              >
                {copied ? (
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
            </div>
            <Textarea
              value={generatedContent}
              readOnly
              className="min-h-[200px]"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentGenerator;
