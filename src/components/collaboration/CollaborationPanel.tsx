import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Users,
  Bot,
  Clock,
  MessageSquare,
  FileText,
  ThumbsUp,
  History,
  PenTool,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    isAI?: boolean;
  };
  content: string;
  timestamp: Date;
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
  reactions?: {
    type: string;
    count: number;
    userReacted: boolean;
  }[];
}

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  elementId: string;
  resolved: boolean;
}

interface ApprovalRequest {
  id: string;
  title: string;
  description: string;
  requestedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  requestedFrom: {
    id: string;
    name: string;
    avatar: string;
  };
  status: "pending" | "approved" | "rejected";
  timestamp: Date;
  dueDate?: Date;
}

interface ChangeHistoryItem {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  action: string;
  element: string;
  timestamp: Date;
  canRevert: boolean;
}

const mockTeamMembers = [
  {
    id: "1",
    name: "Ana García",
    role: "Marketing Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    status: "online",
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    role: "Content Creator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    status: "offline",
  },
  {
    id: "3",
    name: "Elena Díaz",
    role: "Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    status: "online",
  },
  {
    id: "ai",
    name: "AI Assistant",
    role: "Virtual Assistant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AI",
    status: "online",
    isAI: true,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    sender: {
      id: "1",
      name: "Ana García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    content:
      "Hola equipo, ¿cómo va el progreso con la campaña de redes sociales?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    sender: {
      id: "2",
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    content:
      "Estoy terminando los textos para Instagram. Los tendré listos hoy.",
    timestamp: new Date(Date.now() - 1000 * 60 * 28), // 28 minutes ago
    attachments: [
      {
        id: "a1",
        name: "textos-instagram.docx",
        type: "document",
        url: "#",
      },
    ],
    reactions: [
      { type: "👍", count: 2, userReacted: true },
      { type: "🔥", count: 1, userReacted: false },
    ],
  },
  {
    id: "3",
    sender: {
      id: "3",
      name: "Elena Díaz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    content:
      "Los diseños están casi listos, solo falta ajustar algunos detalles de color.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
  },
  {
    id: "4",
    sender: {
      id: "ai",
      name: "AI Assistant",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AI",
      isAI: true,
    },
    content:
      "Basado en campañas anteriores, sugiero publicar el contenido entre las 6-8 PM para mayor engagement.",
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
  },
];

const mockComments: Comment[] = [
  {
    id: "c1",
    user: {
      id: "1",
      name: "Ana García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    content: "Podríamos usar un tono más casual en esta sección",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    elementId: "post-1",
    resolved: false,
  },
  {
    id: "c2",
    user: {
      id: "3",
      name: "Elena Díaz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    content: "El contraste de colores podría mejorarse aquí",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
    elementId: "image-2",
    resolved: true,
  },
  {
    id: "c3",
    user: {
      id: "2",
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    content: "¿Podemos incluir más datos sobre el ROI en esta parte?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    elementId: "slide-5",
    resolved: false,
  },
];

const mockApprovals: ApprovalRequest[] = [
  {
    id: "a1",
    title: "Campaña de Instagram - Mayo 2024",
    description:
      "Necesito aprobación para el conjunto de publicaciones de mayo",
    requestedBy: {
      id: "2",
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    requestedFrom: {
      id: "1",
      name: "Ana García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    status: "pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
  },
  {
    id: "a2",
    title: "Diseños para Facebook Ads",
    description: "Revisión de los diseños para la campaña de productos nuevos",
    requestedBy: {
      id: "3",
      name: "Elena Díaz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    requestedFrom: {
      id: "1",
      name: "Ana García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    status: "approved",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "a3",
    title: "Textos para Newsletter",
    description: "Contenido para el newsletter mensual de mayo",
    requestedBy: {
      id: "2",
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    requestedFrom: {
      id: "1",
      name: "Ana García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    status: "rejected",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
];

const mockHistory: ChangeHistoryItem[] = [
  {
    id: "h1",
    user: {
      id: "2",
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    action: "edited",
    element: "Instagram Post #3",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    canRevert: true,
  },
  {
    id: "h2",
    user: {
      id: "3",
      name: "Elena Díaz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    action: "uploaded",
    element: "Banner Image for Facebook",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    canRevert: true,
  },
  {
    id: "h3",
    user: {
      id: "1",
      name: "Ana García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    action: "approved",
    element: "Facebook Ad Campaign",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    canRevert: false,
  },
  {
    id: "h4",
    user: {
      id: "ai",
      name: "AI Assistant",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AI",
    },
    action: "generated",
    element: "Content Ideas for Twitter",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    canRevert: true,
  },
];

const CollaborationPanel = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(mockApprovals);
  const [history, setHistory] = useState<ChangeHistoryItem[]>(mockHistory);

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

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        id: "1", // Current user
        name: "Ana García",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      },
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        sender: {
          id: "ai",
          name: "AI Assistant",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AI",
          isAI: true,
        },
        content:
          "Gracias por tu mensaje. Estoy analizando la información y te responderé en breve.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleResolveComment = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, resolved: true } : comment,
      ),
    );
  };

  const handleApproval = (id: string, status: "approved" | "rejected") => {
    setApprovals(
      approvals.map((approval) =>
        approval.id === id ? { ...approval, status } : approval,
      ),
    );
  };

  const handleRevertChange = (id: string) => {
    // In a real app, this would revert the change
    alert(`Revirtiendo cambio ${id}`);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle>Centro de Colaboración</CardTitle>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat del Equipo
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Comentarios
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Aprobaciones
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Historial
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="p-0 flex flex-col h-[600px]">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>
                      {message.sender.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.sender.name}</span>
                      {message.sender.isAI && (
                        <Badge variant="outline" className="text-xs py-0 h-5">
                          <Bot className="w-3 h-3 mr-1" /> AI
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2">
                        {message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center gap-2 p-2 bg-gray-50 rounded-md text-sm"
                          >
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span>{attachment.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto h-6 px-2"
                            >
                              Ver
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {message.reactions.map((reaction, idx) => (
                          <Badge
                            key={idx}
                            variant={
                              reaction.userReacted ? "default" : "outline"
                            }
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            {reaction.type} {reaction.count}
                          </Badge>
                        ))}
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="comments" className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Comentarios y Feedback</h3>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" /> Nuevo Comentario
              </Button>
            </div>

            <div className="space-y-4">
              {comments.map((comment) => (
                <Card
                  key={comment.id}
                  className={`p-4 ${comment.resolved ? "bg-gray-50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="mt-1">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>
                        {comment.user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {comment.user.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTime(comment.timestamp)}
                          </span>
                        </div>
                        <Badge
                          variant={comment.resolved ? "secondary" : "outline"}
                        >
                          {comment.resolved ? "Resuelto" : "Pendiente"}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mt-1">{comment.content}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <PenTool className="w-4 h-4" />
                        <span>En: {comment.elementId}</span>
                      </div>

                      {!comment.resolved && (
                        <div className="flex justify-end mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResolveComment(comment.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" /> Marcar como
                            resuelto
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="approvals" className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Solicitudes de Aprobación
              </h3>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" /> Nueva Solicitud
              </Button>
            </div>

            <div className="space-y-4">
              {approvals.map((approval) => (
                <Card key={approval.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{approval.title}</h4>
                      {approval.status === "pending" ? (
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800"
                        >
                          Pendiente
                        </Badge>
                      ) : approval.status === "approved" ? (
                        <Badge className="bg-green-100 text-green-800">
                          Aprobado
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Rechazado</Badge>
                      )}
                    </div>

                    <p className="text-gray-700">{approval.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>Solicitado por:</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={approval.requestedBy.avatar} />
                            <AvatarFallback>
                              {approval.requestedBy.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{approval.requestedBy.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(approval.timestamp)}</span>
                      </div>
                    </div>

                    {approval.dueDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span>
                          Fecha límite: {approval.dueDate.toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {approval.status === "pending" && (
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleApproval(approval.id, "rejected")
                          }
                        >
                          <XCircle className="w-4 h-4 mr-2" /> Rechazar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleApproval(approval.id, "approved")
                          }
                        >
                          <CheckCircle className="w-4 h-4 mr-2" /> Aprobar
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Historial de Cambios</h3>

            <div className="space-y-3">
              {history.map((item) => (
                <Card key={item.id} className="p-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="mt-1">
                      <AvatarImage src={item.user.avatar} />
                      <AvatarFallback>
                        {item.user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.user.name}</span>
                          <span className="text-xs text-gray-500">
                            {formatTime(item.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-1">
                        <span className="font-medium">{item.action}</span>{" "}
                        {item.element}
                      </p>

                      {item.canRevert && (
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevertChange(item.id)}
                            className="h-8 px-2 text-sm"
                          >
                            <History className="w-3 h-3 mr-1" /> Revertir
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CollaborationPanel;
