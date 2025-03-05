import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wand2, Image as ImageIcon, Type, Layout } from "lucide-react";
import { aiService } from "@/lib/api";

interface AIGeneratorProps {
  onGenerate?: (image: string) => void;
}

const AIGenerator = ({ onGenerate }: AIGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("modern");
  const [format, setFormat] = useState("social");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt) return;

    try {
      setLoading(true);
      setError("");
      const imageUrl = await aiService.generateImage(prompt, {
        style,
        format,
        dimensions: { width: 800, height: 600 },
      });
      onGenerate?.(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Error generating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <DialogHeader>
        <DialogTitle>AI Design Generator</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Textarea
            placeholder="Describe what you want to create..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Format</Label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              variant={format === "social" ? "default" : "outline"}
              onClick={() => setFormat("social")}
              className="justify-start"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Social Media
            </Button>
            <Button
              variant={format === "banner" ? "default" : "outline"}
              onClick={() => setFormat("banner")}
              className="justify-start"
            >
              <Layout className="w-4 h-4 mr-2" />
              Banner
            </Button>
          </div>

          <Label>Style</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={style === "modern" ? "default" : "outline"}
              onClick={() => setStyle("modern")}
              className="justify-start"
            >
              <Layout className="w-4 h-4 mr-2" />
              Modern
            </Button>
            <Button
              variant={style === "minimal" ? "default" : "outline"}
              onClick={() => setStyle("minimal")}
              className="justify-start"
            >
              <Type className="w-4 h-4 mr-2" />
              Minimal
            </Button>
          </div>
        </div>

        <div className="pt-4">
          <Button
            className="w-full"
            onClick={handleGenerate}
            disabled={!prompt || loading}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {loading ? "Generating..." : "Generate Design"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
