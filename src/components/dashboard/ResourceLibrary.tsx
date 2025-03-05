import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Image as ImageIcon,
  Video,
  FileText,
  Folder,
  Search,
  Upload,
  Plus,
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  Copy,
  Filter,
  Grid,
  List,
} from "lucide-react";

interface ResourceItem {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "template";
  url: string;
  thumbnail: string;
  size: string;
  dimensions?: string;
  dateAdded: Date;
  tags: string[];
  folder: string;
}

const mockResources: ResourceItem[] = [
  {
    id: "1",
    name: "banner-principal.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    size: "1.2 MB",
    dimensions: "1920x1080",
    dateAdded: new Date(2024, 5, 15),
    tags: ["banner", "marketing", "principal"],
    folder: "Banners",
  },
  {
    id: "2",
    name: "logo-empresa.png",
    type: "image",
    url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    size: "0.5 MB",
    dimensions: "512x512",
    dateAdded: new Date(2024, 5, 10),
    tags: ["logo", "branding"],
    folder: "Logos",
  },
  {
    id: "3",
    name: "presentacion-servicios.pdf",
    type: "document",
    url: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    size: "3.5 MB",
    dateAdded: new Date(2024, 5, 20),
    tags: ["presentación", "servicios", "ventas"],
    folder: "Documentos",
  },
  {
    id: "4",
    name: "tutorial-plataforma.mp4",
    type: "video",
    url: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    size: "24.8 MB",
    dimensions: "1920x1080",
    dateAdded: new Date(2024, 6, 5),
    tags: ["tutorial", "onboarding", "video"],
    folder: "Videos",
  },
  {
    id: "5",
    name: "plantilla-email.html",
    type: "template",
    url: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
    size: "0.8 MB",
    dateAdded: new Date(2024, 6, 10),
    tags: ["email", "plantilla", "newsletter"],
    folder: "Plantillas",
  },
  {
    id: "6",
    name: "infografia-datos.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    size: "1.8 MB",
    dimensions: "1200x1800",
    dateAdded: new Date(2024, 6, 12),
    tags: ["infografía", "datos", "estadísticas"],
    folder: "Infografías",
  },
  {
    id: "7",
    name: "post-instagram.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    size: "0.9 MB",
    dimensions: "1080x1080",
    dateAdded: new Date(2024, 6, 15),
    tags: ["instagram", "post", "social media"],
    folder: "Social Media",
  },
  {
    id: "8",
    name: "plantilla-post.psd",
    type: "template",
    url: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    size: "15.2 MB",
    dateAdded: new Date(2024, 6, 18),
    tags: ["plantilla", "post", "diseño"],
    folder: "Plantillas",
  },
];

const ResourceLibrary = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredResources = mockResources.filter((resource) => {
    // Filter by tab
    if (activeTab !== "all" && resource.type !== activeTab) return false;

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.name.toLowerCase().includes(query) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        resource.folder.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const getTypeIcon = (type: string, size = 5) => {
    switch (type) {
      case "image":
        return <ImageIcon className={`w-${size} h-${size}`} />;
      case "video":
        return <Video className={`w-${size} h-${size}`} />;
      case "document":
        return <FileText className={`w-${size} h-${size}`} />;
      case "template":
        return <Folder className={`w-${size} h-${size}`} />;
      default:
        return null;
    }
  };

  const handleSelectResource = (resource: ResourceItem) => {
    setSelectedResource(resource);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            Biblioteca de Recursos
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-secondary" : ""}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-secondary" : ""}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Buscar recursos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            <Button className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Subir
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="flex items-center gap-2">
                Todos
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Imágenes
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="document" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="template" className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                Plantillas
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 h-[700px]">
            <div className="md:col-span-2 border-r">
              <ScrollArea className="h-[700px]">
                <div className="p-6">
                  {filteredResources.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No se encontraron recursos
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredResources.map((resource) => (
                        <Card
                          key={resource.id}
                          className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${selectedResource?.id === resource.id ? "ring-2 ring-primary" : ""}`}
                          onClick={() => handleSelectResource(resource)}
                        >
                          <div className="aspect-square relative bg-gray-100">
                            {resource.type === "image" ? (
                              <img
                                src={resource.thumbnail}
                                alt={resource.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                {getTypeIcon(resource.type, 8)}
                              </div>
                            )}
                            <Badge
                              className="absolute top-2 right-2 bg-black/70 text-white"
                              variant="outline"
                            >
                              {resource.type}
                            </Badge>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium truncate">
                              {resource.name}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>{resource.size}</span>
                              <span>{formatDate(resource.dateAdded)}</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredResources.map((resource) => (
                        <div
                          key={resource.id}
                          className={`flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer ${selectedResource?.id === resource.id ? "bg-gray-50 border border-primary" : ""}`}
                          onClick={() => handleSelectResource(resource)}
                        >
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                            {resource.type === "image" ? (
                              <img
                                src={resource.thumbnail}
                                alt={resource.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              getTypeIcon(resource.type, 5)
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">
                              {resource.name}
                            </h3>
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="truncate">
                                {resource.folder}
                              </span>
                              <span className="mx-1">•</span>
                              <span>{resource.size}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 whitespace-nowrap ml-4">
                            {formatDate(resource.dateAdded)}
                          </div>
                          <Button variant="ghost" size="icon" className="ml-2">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <div>
              {selectedResource ? (
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b">
                    <h3 className="font-semibold truncate">
                      {selectedResource.name}
                    </h3>
                  </div>

                  <ScrollArea className="flex-1">
                    <div className="p-6 space-y-6">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        {selectedResource.type === "image" ? (
                          <img
                            src={selectedResource.url}
                            alt={selectedResource.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            {getTypeIcon(selectedResource.type, 12)}
                            <span className="mt-4 text-gray-500">
                              {selectedResource.type.charAt(0).toUpperCase() +
                                selectedResource.type.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm text-gray-500">
                            Información
                          </Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="text-sm">
                              <span className="text-gray-500">Tipo:</span>{" "}
                              {selectedResource.type}
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Tamaño:</span>{" "}
                              {selectedResource.size}
                            </div>
                            {selectedResource.dimensions && (
                              <div className="text-sm">
                                <span className="text-gray-500">
                                  Dimensiones:
                                </span>{" "}
                                {selectedResource.dimensions}
                              </div>
                            )}
                            <div className="text-sm">
                              <span className="text-gray-500">Fecha:</span>{" "}
                              {formatDate(selectedResource.dateAdded)}
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Carpeta:</span>{" "}
                              {selectedResource.folder}
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-500">
                            Etiquetas
                          </Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedResource.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Descargar
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center justify-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center justify-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            Copiar URL
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6 text-center">
                  <div className="space-y-4">
                    <Folder className="w-12 h-12 text-gray-300 mx-auto" />
                    <h3 className="text-lg font-medium">
                      Selecciona un recurso
                    </h3>
                    <p className="text-gray-500 max-w-xs mx-auto">
                      Selecciona un recurso para ver sus detalles o sube un
                      nuevo archivo a tu biblioteca.
                    </p>
                    <Button className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Subir archivo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResourceLibrary;
