import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image as ImageIcon,
  Sparkles,
  Download,
  Copy,
  Check,
  RefreshCw,
  Save,
  Trash2,
  Loader2,
  Plus,
  Palette,
  Layers,
  Maximize2,
  Star,
  Grid,
  Wand2,
  Lightbulb,
  Pencil,
  Megaphone,
  ShoppingBag,
} from "lucide-react";

interface ImageTemplate {
  id: string;
  title: string;
  description: string;
  category: "social" | "ad" | "banner" | "product";
  prompt: string;
  previewImage: string;
}

interface SavedImage {
  id: string;
  title: string;
  prompt: string;
  imageUrl: string;
  style: string;
  ratio: string;
  createdAt: Date;
}

const mockTemplates: ImageTemplate[] = [
  {
    id: "t1",
    title: "Post para Instagram",
    description: "Imagen cuadrada ideal para feed de Instagram",
    category: "social",
    prompt: "Una imagen atractiva para Instagram mostrando [tu producto/servicio] en un entorno moderno y minimalista",
    previewImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
  },
  {
    id: "t2",
    title: "Banner para Web",
    description: "Banner horizontal para encabezado de sitio web",
    category: "banner",
    prompt: "Un banner horizontal profesional mostrando [tu producto/servicio] con un diseño limpio y moderno, ideal para sitio web",
    previewImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
  },
  {
    id: "t3",
    title: "Anuncio para Facebook",
    description: "Imagen optimizada para anuncios en Facebook",
    category: "ad",
    prompt: "Una imagen publicitaria impactante para Facebook mostrando [tu producto/servicio] con un llamado a la acción claro",
    previewImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  },
  {
    id: "t4",
    title: "Fotografía de Producto",
    description: "Imagen de producto sobre fondo neutro",
    category: "product",
    prompt: "Una fotografía profesional de [tu producto] sobre un fondo neutro con iluminación perfecta, estilo de catálogo",
    previewImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
  {
    id: "t5",
    title: "Historia para Instagram",
    description: "Imagen vertical para historias de Instagram",
    category: "social",
    prompt: "Una imagen vertical vibrante y llamativa para historia de Instagram relacionada con [tu tema], con espacio para texto",
    previewImage: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=600&q=80",
  },
  {
    id: "t6",
    title: "Promoción de Temporada",
    description: "Imagen para promocionar ofertas estacionales",
    category: "ad",
    prompt: "Una imagen promocional atractiva para [temporada/evento] mostrando [tu producto/servicio] con elementos estacionales y texto de oferta",
    previewImage: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&q=80",
  },
];

const mockSavedImages: SavedImage[] = [
  {
    id: "i1",
    title: "Banner Promoción Verano",
    prompt: "Un banner colorido para promoción de verano con productos de playa, colores vibrantes y sensación de frescura",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    style: "Fotorrealista",
    ratio: "16:9",
    createdAt: new Date(2024, 4, 10),
  },
  {
    id: "i2",
    title: "Producto Estrella - Zapatillas",
    prompt: "Zapatillas deportivas modernas sobre fondo degradado, iluminación profesional, estilo de catálogo",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    style: "Producto",
    ratio: "1:1",
    createdAt: new Date(2024, 4, 5),
  },
];

const ImageGenerator = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState<ImageTemplate | null>(null);
  const [prompt, setPrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("Fotorrealista");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const [savedImages, setSavedImages] = useState<SavedImage[]>(mockSavedImages);
  const [copied, setCopied] = useState(false);

  const handleTemplateSelect = (template: ImageTemplate) => {
    setSelectedTemplate(template);
    setPrompt(template.prompt);
    // Set appropriate aspect ratio based on template category
    if (template.category === "social" && template.title.includes("Historia")) {
      setAspectRatio("9:16");
    } else if (template.category === "banner") {
      setAspectRatio("16:9");
    } else {
      setAspectRatio("1:1");
    }
  };

  const handleGenerateImage = () => {
    if (!prompt.trim()) {
      alert("Por favor, ingresa un prompt para generar la imagen");
      return;
    }

    setIsGenerating(true);
    setGeneratedImageUrl("");

    // Simulate image generation with a delay
    setTimeout(() => {
      // In a real app, this would call an AI image generation API
      // For now, we'll use a placeholder image based on the aspect ratio
      let placeholderUrl = "";
      
      if (aspectRatio === "1:1") {
        const squareImages = [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
        ];
        placeholderUrl = squareImages[Math.floor(Math.random() * squareImages.length)];
      } else if (aspectRatio === "16:9") {
        const wideImages = [
          "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
          "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&q=80",
          "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
        ];
        placeholderUrl = wideImages[Math.floor(Math.random() * wideImages.length)];
      } else if (aspectRatio === "9:16") {
        const tallImages = [
          "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=600&q=80",
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
        ];
        placeholderUrl = tallImages[Math.floor(Math.random() * tallImages.length)];
      }
      
      setGeneratedImageUrl(placeholderUrl);
      setIsGenerating(false);
    }, 3000);
  };

  const handleSaveImage = () => {
    if (!imageTitle.trim()) {
      alert("Por favor, añade un título para guardar la imagen");
      return;
    }

    if (!generatedImageUrl) {
      alert("No hay imagen para guardar");
      return;
    }

    const newImage: SavedImage = {
      id: Date.now().toString(),
      title: imageTitle,
      prompt: prompt,
      imageUrl: generatedImageUrl,
      style: imageStyle,
      ratio: aspectRatio,
      createdAt: new Date()
    };

    setSavedImages([newImage, ...savedImages]);
    setImageTitle("");
    alert("Imagen guardada correctamente");
  };

  const handleDeleteSavedImage = (id: string) => {
    setSavedImages(savedImages.filter(image => image.id !== id));
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "social":
        return <Pencil className="w-4 h-4" />;
      case "ad":
        return <Megaphone className="w-4 h-4" />;
      case "banner":
        return <Layers className="w-4 h-4" />;
      case "product":
        return <ShoppingBag className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          Generador de Imágenes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Crear
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Grid className="w-4 h-4" />
                Plantillas
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Guardadas
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="create" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Prompt de Imagen</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe la imagen que quieres generar..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500">
                      Sé específico con detalles como objetos, estilo, colores, ambiente, etc.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="style">Estilo</Label>
                      <Select value={imageStyle} onValueChange={setImageStyle}>
                        <SelectTrigger id="style">
                          <SelectValue placeholder="Selecciona un estilo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fotorrealista">Fotorrealista</SelectItem>
                          <SelectItem value="Ilustración">Ilustración</SelectItem>
                          <SelectItem value="3D">3D</SelectItem>
                          <SelectItem value="Minimalista">Minimalista</SelectItem>
                          <SelectItem value="Acuarela">Acuarela</SelectItem>
                          <SelectItem value="Producto">Producto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ratio">Proporción</Label>
                      <Select value={aspectRatio} onValueChange={setAspectRatio}>
                        <SelectTrigger id="ratio">
                          <SelectValue placeholder="Selecciona proporción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:1">Cuadrada (1:1)</SelectItem>
                          <SelectItem value="16:9">Horizontal (16:9)</SelectItem>
                          <SelectItem value="9:16">Vertical (9:16)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerateImage} 
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generar Imagen
                      </>
                    )}
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Sugerencias de Prompt</h3>
                  <div className="space-y-2">
                    <div 
                      className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setPrompt("Fotografía profesional de producto mostrando [tu producto] sobre fondo blanco con sombras suaves y detalles nítidos")}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-primary" />
                        <span className="font-medium">Fotografía de Producto</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Ideal para catálogos y tiendas online
                      </p>
                    </div>

                    <div 
                      className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setPrompt("Banner promocional para [tu evento/campaña] con colores vibrantes, elementos gráficos modernos y texto destacado")}
                    >
                      <div className="flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-primary" />
                        <span className="font-medium">Banner Promocional</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Perfecto para campañas y anuncios
                      </p>
                    </div>

                    <div 
                      className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setPrompt("Imagen para redes sociales mostrando [tu producto/servicio] en un contexto de uso real con personas interactuando, estilo lifestyle")}
                    >
                      <div className="flex items-center gap-2">
                        <Pencil className="w-4 h-4 text-primary" />
                        <span className="font-medium">Contenido Social</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Optimizado para engagement en redes sociales
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Vista Previa</h3>
                
                {isGenerating ? (
                  <div className={`flex items-center justify-center border rounded-md ${aspectRatio === "1:1" ? "aspect-square" : aspectRatio === "16:9" ? "aspect-video" : "aspect-[9/16]"}`}>
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
                      <p className="text-sm text-gray-500">Generando imagen...</p>
                    </div>
                  </div>
                ) : generatedImageUrl ? (
                  <div className="space-y-4">
                    <div className="relative group">
                      <img 
                        src={generatedImageUrl} 
                        alt="Generated image" 
                        className={`w-full rounded-md object-cover ${aspectRatio === "1:1" ? "aspect-square" : aspectRatio === "16:9" ? "aspect-video" : "aspect-[9/16]"}`} 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button variant="secondary" size="sm" className="mr-2">
                          <Maximize2 className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopyPrompt(prompt)}
                        className="flex-1"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Prompt Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar Prompt
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleGenerateImage}
                        disabled={isGenerating}
                        className="flex-1"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerar
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="image-title">Título para guardar</Label>
                      <div className="flex gap-2">
                        <Input
                          id="image-title"
                          placeholder="Ej: Banner Promoción Verano"
                          value={imageTitle}
                          onChange={(e) => setImageTitle(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleSaveImage}>
                          <Save className="w-4 h-4 mr-2" />
                          Guardar
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`flex items-center justify-center border rounded-md ${aspectRatio === "1:1" ? "aspect-square" : aspectRatio === "16:9" ? "aspect-video" : "aspect-[9/16]"}`}>
                    <div className="text-center p-6">
                      <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">La imagen generada aparecerá aquí</p>
                      <p className="text-xs text-gray-400 mt-1">Escribe un prompt y haz clic en "Generar Imagen"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTemplates.map(template => (
                  <Card 
                    key={template.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      handleTemplateSelect(template);
                      setActiveTab("create");
                    }}
                  >
                    <div className="relative">
                      <img 
                        src={template.previewImage} 
                        alt={template.title} 
                        className="w-full h-40 object-cover" 
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">{template.category}</Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{template.title}</h3>
                        {getCategoryIcon(template.category)}
                      </div>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      <Button 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTemplateSelect(template);
                          setActiveTab("create");
                        }}
                      >
                        Usar Plantilla
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Imágenes Guardadas</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Todas
                </Button>
              </div>

              {savedImages.length === 0 ? (
                <div className="text-center py-12">
                  <Save className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No hay imágenes guardadas</h3>
                  <p className="text-gray-500 max-w-md mx-auto mt-2">
                    Genera imágenes y guárdalas para acceder fácilmente más tarde
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab("create")}
                  >
                    Crear Imagen
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedImages.map(image => (
                    <Card key={image.id} className="overflow-hidden">
                      <div className="relative group">
                        <img 
                          src={image.imageUrl} 
                          alt={image.title} 
                          className="w-full h-48 object-cover" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button variant="secondary" size="sm" className="mr-2">
                            <Maximize2 className="w-4 h-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="secondary" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold">{image.title}</h3>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{image.style}</Badge>
                          <Badge variant="outline">{image.ratio}</Badge>
                        </div>
                        
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {image.prompt}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-gray-500">
                            {image.createdAt.toLocaleDateString()}
                          </span>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteSavedImage(image.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setPrompt(image.prompt);
                                setImageStyle(image.style);
                                setAspectRatio(image.ratio);
                                setGeneratedImageUrl(image.imageUrl);
                                setActiveTab("create");
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCopyPrompt(image.prompt)}
                              className="h-8 w-8 p-0"
                            >
                              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
