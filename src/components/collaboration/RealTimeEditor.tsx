import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Users,
  FileText,
  Clock,
  History,
  Edit,
  Eye,
  Lock,
  Unlock,
  Copy,
  Download,
  Share2,
} from "lucide-react";

interface EditorUser {
  id: string;
  name: string;
  avatar: string;
  status: "viewing" | "editing" | "idle";
  lastActive: Date;
}

interface DocumentVersion {
  id: string;
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: Date;
  comment: string;
}

const mockActiveUsers: EditorUser[] = [
  {
    id: "1",
    name: "Ana García",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    status: "editing",
    lastActive: new Date(),
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    status: "viewing",
    lastActive: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
  },
  {
    id: "3",
    name: "Elena Díaz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    status: "idle",
    lastActive: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
];

const mockVersions: DocumentVersion[] = [
  {
    id: "v3",
    createdBy: {
      id: "1",
      name: "Ana García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    comment: "Actualización final para la campaña de mayo",
  },
  {
    id: "v2",
    createdBy: {
      id: "2",
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    comment: "Revisión de textos y ajustes menores",
  },
  {
    id: "v1",
    createdBy: {
      id: "3",
      name: "Elena Díaz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    comment: "Primera versión del documento",
  },
];

const RealTimeEditor = () => {
  const [content, setContent] = useState(
    "# Campaña de Marketing - Mayo 2024\n\n## Objetivos\n- Aumentar engagement en redes sociales en un 25%\n- Generar 500 leads cualificados\n- Incrementar conversiones en un 15%\n\n## Canales\n- Instagram\n- Facebook\n- Email Marketing\n\n## Presupuesto\n$5,000 USD\n\n## Cronograma\n- Semana 1: Preparación de contenidos\n- Semana 2: Lanzamiento en redes sociales\n- Semana 3: Campaña de email marketing\n- Semana 4: Análisis y optimización",
  );
  const [isEditing, setIsEditing] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [saveComment, setSaveComment] = useState("");
  const [activeUsers, setActiveUsers] = useState<EditorUser[]>(mockActiveUsers);
  const [versions, setVersions] = useState<DocumentVersion[]>(mockVersions);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    return `Hace ${diffDays} d`;
  };

  const handleSaveVersion = () => {
    if (!saveComment.trim()) {
      alert("Por favor añade un comentario para esta versión");
      return;
    }

    const newVersion: DocumentVersion = {
      id: `v${versions.length + 1}`,
      createdBy: {
        id: "1", // Current user
        name: "Ana García",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      },
      timestamp: new Date(),
      comment: saveComment,
    };

    setVersions([newVersion, ...versions]);
    setSaveComment("");
    alert("Versión guardada correctamente");
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleToggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Documento Colaborativo
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleToggleLock}>
              {isLocked ? (
                <>
                  <Lock className="w-4 h-4 mr-2" /> Bloqueado
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 mr-2" /> Desbloqueado
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" /> Compartir
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" /> Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4 h-[600px]">
          <div className="md:col-span-3 border-r">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                  Campaña de Marketing - Mayo 2024
                </h3>
                <Badge variant="outline">Documento</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleEdit}
                  disabled={isLocked}
                >
                  {isEditing ? (
                    <>
                      <Edit className="w-4 h-4 mr-2" /> Editando
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" /> Visualizando
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="p-6">
              {isEditing ? (
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[450px] font-mono"
                  disabled={isLocked}
                />
              ) : (
                <div className="prose max-w-none">
                  {content.split("\n").map((line, index) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1
                          key={index}
                          className="text-2xl font-bold mt-4 mb-2"
                        >
                          {line.substring(2)}
                        </h1>
                      );
                    } else if (line.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="text-xl font-semibold mt-3 mb-2"
                        >
                          {line.substring(3)}
                        </h2>
                      );
                    } else if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="ml-5">
                          {line.substring(2)}
                        </li>
                      );
                    } else if (line === "") {
                      return <br key={index} />;
                    } else {
                      return (
                        <p key={index} className="my-2">
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              )}
            </div>

            {isEditing && !isLocked && (
              <div className="p-4 border-t flex items-center gap-3">
                <Input
                  placeholder="Añade un comentario para esta versión..."
                  value={saveComment}
                  onChange={(e) => setSaveComment(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSaveVersion}>
                  <Save className="w-4 h-4 mr-2" /> Guardar Versión
                </Button>
              </div>
            )}
          </div>

          <div>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Colaboradores</h3>
            </div>
            <ScrollArea className="h-[calc(600px-57px)]">
              <div className="p-4 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">
                    Usuarios Activos
                  </h4>
                  {activeUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === "editing" ? "bg-green-500" : user.status === "viewing" ? "bg-blue-500" : "bg-gray-400"}`}
                          ></div>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">
                            {user.status === "editing"
                              ? "Editando"
                              : user.status === "viewing"
                                ? "Visualizando"
                                : "Inactivo"}{" "}
                            • {formatTime(user.lastActive)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">
                    Historial de Versiones
                  </h4>
                  {versions.map((version) => (
                    <div key={version.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{version.id}</Badge>
                        <span className="text-xs text-gray-500">
                          {formatTime(version.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={version.createdBy.avatar} />
                          <AvatarFallback>
                            {version.createdBy.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {version.createdBy.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        "{version.comment}"
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 px-2"
                        >
                          <Eye className="w-3 h-3 mr-1" /> Ver
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 px-2"
                        >
                          <History className="w-3 h-3 mr-1" /> Restaurar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 px-2"
                        >
                          <Copy className="w-3 h-3 mr-1" /> Duplicar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeEditor;
