import React, { useState, useEffect } from "react";
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
  FileText,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Save,
  Download,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  Loader2,
  Trash2,
  Plus,
  Pencil,
  MessageSquare,
  Image,
  Megaphone,
  Palette,
} from "lucide-react";

interface ContentTemplate {
  id: string;
  title: string;
  description: string;
  category: "social" | "email" | "blog" | "ad";
  platform?:
    | "instagram"
    | "facebook"
    | "twitter"
    | "linkedin"
    | "email"
    | "web";
  fields: {
    name: string;
    label: string;
    type: "text" | "textarea" | "select";
    placeholder: string;
    options?: string[];
    required?: boolean;
  }[];
}

interface SavedContent {
  id: string;
  title: string;
  content: string;
  category: string;
  platform?: string;
  createdAt: Date;
}

const mockTemplates: ContentTemplate[] = [
  {
    id: "t1",
    title: "Post para Instagram",
    description: "Crea un post atractivo para Instagram",
    category: "social",
    platform: "instagram",
    fields: [
      {
        name: "topic",
        label: "Tema",
        type: "text",
        placeholder: "Ej: Lanzamiento de producto, Promoción, Evento",
        required: true,
      },
      {
        name: "tone",
        label: "Tono",
        type: "select",
        placeholder: "Selecciona un tono",
        options: [
          "Casual",
          "Profesional",
          "Divertido",
          "Inspirador",
          "Informativo",
        ],
        required: true,
      },
      {
        name: "keywords",
        label: "Palabras clave",
        type: "text",
        placeholder: "Ej: moda, verano, tendencias",
      },
      {
        name: "callToAction",
        label: "Llamada a la acción",
        type: "text",
        placeholder: "Ej: Compra ahora, Regístrate, Más información",
      },
    ],
  },
  {
    id: "t2",
    title: "Email de Campaña",
    description: "Crea un email efectivo para tu campaña",
    category: "email",
    platform: "email",
    fields: [
      {
        name: "subject",
        label: "Asunto",
        type: "text",
        placeholder: "Ej: Descubre nuestras novedades",
        required: true,
      },
      {
        name: "audience",
        label: "Audiencia",
        type: "text",
        placeholder: "Ej: Clientes actuales, Leads, Suscriptores",
        required: true,
      },
      {
        name: "purpose",
        label: "Propósito",
        type: "select",
        placeholder: "Selecciona un propósito",
        options: [
          "Promoción",
          "Informativo",
          "Bienvenida",
          "Recordatorio",
          "Agradecimiento",
        ],
        required: true,
      },
      {
        name: "details",
        label: "Detalles adicionales",
        type: "textarea",
        placeholder:
          "Incluye cualquier detalle específico que quieras mencionar",
      },
    ],
  },
  {
    id: "t3",
    title: "Artículo para Blog",
    description: "Genera un artículo informativo para tu blog",
    category: "blog",
    platform: "web",
    fields: [
      {
        name: "title",
        label: "Título",
        type: "text",
        placeholder: "Ej: 10 Estrategias de Marketing Digital para 2024",
        required: true,
      },
      {
        name: "topic",
        label: "Tema principal",
        type: "text",
        placeholder: "Ej: Marketing Digital, SEO, Redes Sociales",
        required: true,
      },
      {
        name: "audience",
        label: "Audiencia objetivo",
        type: "text",
        placeholder: "Ej: Emprendedores, Marketers, Pequeñas empresas",
      },
      {
        name: "keyPoints",
        label: "Puntos clave a cubrir",
        type: "textarea",
        placeholder: "Enumera los puntos principales que quieres incluir",
      },
      {
        name: "tone",
        label: "Tono",
        type: "select",
        placeholder: "Selecciona un tono",
        options: [
          "Educativo",
          "Conversacional",
          "Formal",
          "Técnico",
          "Inspirador",
        ],
      },
    ],
  },
  {
    id: "t4",
    title: "Anuncio para Facebook",
    description: "Crea un anuncio persuasivo para Facebook",
    category: "ad",
    platform: "facebook",
    fields: [
      {
        name: "product",
        label: "Producto o servicio",
        type: "text",
        placeholder: "Ej: Curso online, Producto físico, Servicio",
        required: true,
      },
      {
        name: "mainBenefit",
        label: "Beneficio principal",
        type: "text",
        placeholder: "Ej: Ahorra tiempo, Mejora tu salud, Aumenta tus ventas",
        required: true,
      },
      {
        name: "audience",
        label: "Audiencia objetivo",
        type: "text",
        placeholder: "Ej: Profesionales 25-45 años, Madres, Estudiantes",
      },
      {
        name: "offer",
        label: "Oferta o promoción",
        type: "text",
        placeholder: "Ej: 20% descuento, Prueba gratuita, 2x1",
      },
      {
        name: "callToAction",
        label: "Llamada a la acción",
        type: "select",
        placeholder: "Selecciona una CTA",
        options: [
          "Comprar ahora",
          "Saber más",
          "Registrarse",
          "Contactar",
          "Descargar",
        ],
      },
    ],
  },
  {
    id: "t5",
    title: "Tweet Promocional",
    description: "Crea un tweet efectivo para promocionar tu marca",
    category: "social",
    platform: "twitter",
    fields: [
      {
        name: "topic",
        label: "Tema",
        type: "text",
        placeholder: "Ej: Lanzamiento, Evento, Promoción",
        required: true,
      },
      {
        name: "hashtags",
        label: "Hashtags",
        type: "text",
        placeholder: "Ej: #marketing #digital #tendencias",
      },
      {
        name: "includeLink",
        label: "¿Incluir enlace?",
        type: "select",
        placeholder: "Selecciona una opción",
        options: ["Sí", "No"],
      },
    ],
  },
];

const mockSavedContent: SavedContent[] = [
  {
    id: "c1",
    title: "Post Instagram - Lanzamiento Verano",
    content:
      "✨ ¡NUEVA COLECCIÓN DE VERANO! ✨\n\nEstamos emocionados de presentar nuestra colección Verano 2024. Diseños frescos, colores vibrantes y la mejor calidad que ya conoces. 🌞👙🕶️\n\n¿Listo para renovar tu armario? Haz clic en el link en bio para descubrir todas las novedades.\n\n#ModaVerano #NuevaColección #Tendencias2024",
    category: "social",
    platform: "instagram",
    createdAt: new Date(2024, 4, 10),
  },
  {
    id: "c2",
    title: "Email - Descuento Clientes",
    content:
      "Asunto: 🎁 ¡Un regalo especial solo para ti!\n\nHola [Nombre],\n\nQuisimos agradecerte por ser parte de nuestra comunidad con un regalo especial: 25% de descuento en tu próxima compra.\n\nSimplemente usa el código GRACIAS25 al finalizar tu compra. Esta oferta es exclusiva para clientes como tú y expira en 7 días.\n\n¡No dejes pasar esta oportunidad!\n\nAtentamente,\nEl equipo de [Tu Marca]",
    category: "email",
    platform: "email",
    createdAt: new Date(2024, 4, 5),
  },
];

const ContentGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] =
    useState<ContentTemplate | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentTitle, setContentTitle] = useState("");
  const [savedContent, setSavedContent] =
    useState<SavedContent[]>(mockSavedContent);
  const [copied, setCopied] = useState(false);
  const [historyContent, setHistoryContent] = useState<any[]>([]);

  // Cargar historial al iniciar
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { getPromptHistory } = await import("@/lib/api/ai");
        const history = await getPromptHistory("content", 10);
        setHistoryContent(history);
      } catch (error) {
        console.error("Error loading history:", error);
      }
    };

    loadHistory();
  }, []);

  const handleTemplateSelect = (template: ContentTemplate) => {
    setSelectedTemplate(template);
    setFormValues({});
    setGeneratedContent("");
  };

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateContent = async () => {
    // Validate required fields
    const missingFields = selectedTemplate?.fields
      .filter((field) => field.required && !formValues[field.name])
      .map((field) => field.label);

    if (missingFields && missingFields.length > 0) {
      alert(
        `Por favor completa los siguientes campos: ${missingFields.join(", ")}`,
      );
      return;
    }

    setIsGenerating(true);

    try {
      // Intentar usar la API real
      let content = "";

      try {
        const { generateAIContent, savePromptHistory } = await import(
          "@/lib/api/ai"
        );

        // Crear un prompt estructurado para la IA
        const promptData = {
          template: selectedTemplate?.title,
          category: selectedTemplate?.category,
          platform: selectedTemplate?.platform,
          fields: formValues,
        };

        const response = await generateAIContent({
          prompt: JSON.stringify(promptData),
          type: "text",
          options: { category: selectedTemplate?.category },
        });

        content = response.content;

        // Guardar en historial
        await savePromptHistory(JSON.stringify(promptData), content, "content");

        // Actualizar historial local
        const { getPromptHistory } = await import("@/lib/api/ai");
        const history = await getPromptHistory("content", 10);
        setHistoryContent(history);
      } catch (apiError) {
        console.warn("API call failed, using fallback content", apiError);
        // Simulamos la respuesta para la demo
        await new Promise((resolve) => setTimeout(resolve, 2000));
        content = generateContentBasedOnTemplate();
      }

      setGeneratedContent(content);
    } catch (error) {
      console.error("Error generating content:", error);
      alert(
        "Ha ocurrido un error al generar el contenido. Por favor, intenta de nuevo.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContentBasedOnTemplate = (): string => {
    if (!selectedTemplate) return "";

    // This is a simplified mock implementation
    // In a real app, this would call an AI service
    switch (selectedTemplate.category) {
      case "social":
        if (selectedTemplate.platform === "instagram") {
          return `✨ ${formValues.topic?.toUpperCase() || "NUEVO POST"} ✨\n\n${getRandomSocialIntro()} ${formValues.keywords ? `#${formValues.keywords.split(",").join(" #")}` : ""}\n\n${formValues.callToAction || "¡Haz clic en el link en bio para más información!"}`;
        } else if (selectedTemplate.platform === "twitter") {
          return `${getRandomTwitterIntro(formValues.topic || "Novedades")} ${formValues.hashtags || "#marketing #socialmedia"}${formValues.includeLink === "Sí" ? "\n\n🔗 [Enlace a tu sitio web]" : ""}`;
        }
        return `Contenido para redes sociales sobre ${formValues.topic || "tu marca"}.`;

      case "email":
        return `Asunto: ${formValues.subject || "Novedades importantes"}\n\nHola [Nombre],\n\n${getRandomEmailIntro(formValues.purpose || "Informativo")}\n\n${formValues.details || "Nos encantaría saber tu opinión. No dudes en responder a este email con tus comentarios."}\n\nAtentamente,\nEl equipo de [Tu Marca]`;

      case "blog":
        return `# ${formValues.title || "Título del Artículo"}\n\n## Introducción\n${getRandomBlogIntro(formValues.topic || "marketing digital")}\n\n## Puntos Principales\n${formValues.keyPoints || "- Punto clave 1\n- Punto clave 2\n- Punto clave 3"}\n\n## Conclusión\nEsperamos que este artículo te haya proporcionado información valiosa sobre ${formValues.topic || "este tema"}. Si tienes alguna pregunta, déjanos un comentario abajo.`;

      case "ad":
        return `🔥 ${formValues.mainBenefit || "OFERTA ESPECIAL"} 🔥\n\nDescubre nuestro ${formValues.product || "producto"} ideal para ${formValues.audience || "ti"}.\n\n${formValues.offer ? `Aprovecha: ${formValues.offer}` : ""}\n\n👉 ${formValues.callToAction || "Comprar ahora"}`;

      default:
        return "Contenido generado basado en tus especificaciones.";
    }
  };

  const getRandomSocialIntro = (): string => {
    const intros = [
      "Estamos emocionados de compartir con ustedes esta increíble noticia.",
      "¿Sabías que nuestros productos pueden transformar tu experiencia?",
      "Hoy queremos contarte algo que cambiará tu perspectiva.",
      "Descubre cómo nuestros clientes están aprovechando al máximo nuestros servicios.",
      "La espera ha terminado. ¡Por fin podemos revelarlo!",
    ];
    return intros[Math.floor(Math.random() * intros.length)];
  };

  const getRandomTwitterIntro = (topic: string): string => {
    const intros = [
      `¡Atención! 🚨 Novedades sobre ${topic} que no te puedes perder:`,
      `Acabamos de lanzar algo increíble relacionado con ${topic}.`,
      `¿Interesado en ${topic}? Esto te va a encantar:`,
      `Descubre cómo estamos revolucionando ${topic} con nuestra última innovación.`,
      `Lo prometido es deuda. ¡Aquí está nuestra actualización sobre ${topic}!`,
    ];
    return intros[Math.floor(Math.random() * intros.length)];
  };

  const getRandomEmailIntro = (purpose: string): string => {
    switch (purpose) {
      case "Promoción":
        return "Nos complace ofrecerte una promoción exclusiva que hemos preparado especialmente para nuestros suscriptores más valiosos.";
      case "Informativo":
        return "Queremos mantenerte al día con las últimas novedades y actualizaciones de nuestra empresa.";
      case "Bienvenida":
        return "¡Bienvenido a nuestra comunidad! Estamos encantados de tenerte con nosotros y queremos asegurarnos de que aproveches al máximo tu experiencia.";
      case "Recordatorio":
        return "Te escribimos para recordarte sobre un evento importante que se aproxima y no queremos que te lo pierdas.";
      case "Agradecimiento":
        return "Queremos expresar nuestro más sincero agradecimiento por tu continuo apoyo y confianza en nuestra marca.";
      default:
        return "Esperamos que este mensaje te encuentre bien. Nos ponemos en contacto contigo para compartir información importante.";
    }
  };

  const getRandomBlogIntro = (topic: string): string => {
    const intros = [
      `En el mundo actual, ${topic} se ha convertido en un aspecto fundamental para el éxito de cualquier negocio. En este artículo, exploraremos las mejores estrategias y prácticas.`,
      `¿Te has preguntado cómo optimizar tus resultados en ${topic}? Hoy compartiremos consejos expertos y técnicas probadas que te ayudarán a alcanzar tus objetivos.`,
      `El panorama de ${topic} está en constante evolución. Mantenerse actualizado con las últimas tendencias es crucial, y aquí te explicamos por qué.`,
      `Dominar ${topic} puede parecer abrumador al principio, pero con el enfoque correcto, cualquiera puede lograr resultados impresionantes. Descubre cómo en este artículo.`,
      `La importancia de ${topic} no puede ser subestimada en el entorno competitivo actual. A continuación, analizamos su impacto y cómo aprovecharlo al máximo.`,
    ];
    return intros[Math.floor(Math.random() * intros.length)];
  };

  const handleSaveContent = async () => {
    if (!contentTitle.trim()) {
      alert("Por favor, añade un título para guardar el contenido");
      return;
    }

    if (!generatedContent.trim()) {
      alert("No hay contenido para guardar");
      return;
    }

    try {
      // Intentar guardar en la base de datos
      const { createClient } = await import("@supabase/supabase-js");
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Guardar en la tabla ai_generated_content
      const { error } = await supabase.from("ai_generated_content").insert({
        title: contentTitle,
        content: generatedContent,
        category: selectedTemplate?.category || "other",
        platform: selectedTemplate?.platform,
        is_favorite: false,
      });

      if (error) {
        console.error("Error guardando en base de datos:", error);
        throw error;
      }
    } catch (dbError) {
      console.warn(
        "Error al guardar en la base de datos, guardando localmente",
        dbError,
      );
      // Si falla la BD, guardar localmente
      const newContent: SavedContent = {
        id: Date.now().toString(),
        title: contentTitle,
        content: generatedContent,
        category: selectedTemplate?.category || "other",
        platform: selectedTemplate?.platform,
        createdAt: new Date(),
      };

      setSavedContent([newContent, ...savedContent]);
    }

    setContentTitle("");
    alert("Contenido guardado correctamente");
  };

  const handleDeleteSavedContent = (id: string) => {
    setSavedContent(savedContent.filter((content) => content.id !== id));
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "facebook":
        return <Facebook className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "web":
        return <Globe className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "social":
        return <MessageSquare className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "blog":
        return <FileText className="w-4 h-4" />;
      case "ad":
        return <Megaphone className="w-4 h-4" />;
      default:
        return <Pencil className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Generador de Contenido
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="templates"
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Plantillas
              </TabsTrigger>
              <TabsTrigger
                value="generator"
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generador
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Guardados
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="templates" className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${selectedTemplate?.id === template.id ? "border-primary" : ""}`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(template.platform)}
                          <h3 className="font-semibold">{template.title}</h3>
                        </div>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {template.description}
                      </p>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTemplateSelect(template);
                          setActiveTab("generator");
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

          <TabsContent value="generator" className="flex flex-col h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="border-r p-6 overflow-auto">
                {selectedTemplate ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {selectedTemplate.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedTemplate.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {selectedTemplate.fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label htmlFor={field.name}>
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-red-500">*</span>
                            )}
                          </Label>

                          {field.type === "text" && (
                            <Input
                              id={field.name}
                              placeholder={field.placeholder}
                              value={formValues[field.name] || ""}
                              onChange={(e) =>
                                handleInputChange(field.name, e.target.value)
                              }
                            />
                          )}

                          {field.type === "textarea" && (
                            <Textarea
                              id={field.name}
                              placeholder={field.placeholder}
                              value={formValues[field.name] || ""}
                              onChange={(e) =>
                                handleInputChange(field.name, e.target.value)
                              }
                              className="min-h-[100px]"
                            />
                          )}

                          {field.type === "select" && field.options && (
                            <Select
                              value={formValues[field.name] || ""}
                              onValueChange={(value) =>
                                handleInputChange(field.name, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handleGenerateContent}
                      disabled={isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generando...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generar Contenido
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <FileText className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium">
                      Selecciona una plantilla
                    </h3>
                    <p className="text-gray-500 max-w-xs mt-2">
                      Elige una plantilla de la pestaña "Plantillas" para
                      comenzar a generar contenido
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setActiveTab("templates")}
                    >
                      Ver Plantillas
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-6 overflow-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Contenido Generado
                    </h3>
                    {generatedContent && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyContent(generatedContent)}
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateContent}
                          disabled={isGenerating}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerar
                        </Button>
                      </div>
                    )}
                  </div>

                  {isGenerating ? (
                    <div className="flex items-center justify-center h-40 border rounded-md">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
                        <p className="text-sm text-gray-500">
                          Generando contenido...
                        </p>
                      </div>
                    </div>
                  ) : generatedContent ? (
                    <div className="border rounded-md p-4 whitespace-pre-line min-h-[200px]">
                      {generatedContent}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-40 border rounded-md">
                      <p className="text-sm text-gray-500">
                        El contenido generado aparecerá aquí
                      </p>
                    </div>
                  )}

                  {generatedContent && (
                    <div className="pt-4 space-y-4">
                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="content-title">
                          Título para guardar
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="content-title"
                            placeholder="Ej: Post Instagram - Lanzamiento Verano"
                            value={contentTitle}
                            onChange={(e) => setContentTitle(e.target.value)}
                            className="flex-1"
                          />
                          <Button onClick={handleSaveContent}>
                            <Save className="w-4 h-4 mr-2" />
                            Guardar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Contenido Guardado</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Todo
                </Button>
              </div>

              {savedContent.length === 0 && historyContent.length === 0 ? (
                <div className="text-center py-12">
                  <Save className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">
                    No hay contenido guardado
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto mt-2">
                    Genera contenido usando las plantillas y guárdalo para
                    acceder fácilmente más tarde
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab("templates")}
                  >
                    Crear Contenido
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Contenido guardado localmente */}
                  {savedContent.map((content) => (
                    <Card key={content.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(content.category)}
                            <h3 className="font-semibold">{content.title}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            {content.platform && (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                {getPlatformIcon(content.platform)}
                                <span className="ml-1">{content.platform}</span>
                              </Badge>
                            )}
                            <Badge>{content.category}</Badge>
                          </div>
                        </div>

                        <div className="border rounded-md p-3 whitespace-pre-line text-sm">
                          {content.content.length > 200
                            ? `${content.content.substring(0, 200)}...`
                            : content.content}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Creado: {content.createdAt.toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteSavedContent(content.id)
                              }
                              className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyContent(content.content)}
                              className="h-8 px-2"
                            >
                              {copied ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                            <Button variant="outline" size="sm" className="h-8">
                              <Pencil className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Contenido del historial de Supabase */}
                  {historyContent.length > 0 && (
                    <>
                      <Separator />
                      <h3 className="text-md font-semibold">Historial</h3>

                      {historyContent.map((item) => (
                        <Card key={item.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold">
                                  Contenido generado
                                </h3>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(item.created_at).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="border rounded-md p-3 whitespace-pre-line text-sm">
                              {item.response.length > 200
                                ? `${item.response.substring(0, 200)}...`
                                : item.response}
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyContent(item.response)}
                                className="h-8 px-2"
                              >
                                {copied ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentGenerator;
