import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Bot, Clock, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    isAI?: boolean;
  };
  content: string;
  timestamp: string;
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
    timestamp: "10:30 AM",
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
    timestamp: "10:32 AM",
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
    timestamp: "10:35 AM",
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
    timestamp: "10:36 AM",
  },
];

const CollaborationHub = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

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
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
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
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle>Centro de Colaboración</CardTitle>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat del Equipo
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Miembros del Equipo
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="p-0 flex flex-col h-[500px]">
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
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.sender.name}</span>
                      {message.sender.isAI && (
                        <Badge variant="outline" className="text-xs py-0 h-5">
                          <Bot className="w-3 h-3 mr-1" /> AI
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
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

        <TabsContent value="team" className="p-6">
          <div className="space-y-4">
            {mockTeamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.name}</span>
                      {member.isAI && (
                        <Badge variant="outline" className="text-xs py-0 h-5">
                          <Bot className="w-3 h-3 mr-1" /> AI
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${member.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <span className="text-xs text-gray-500">
                    {member.status === "online" ? "En línea" : "Desconectado"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CollaborationHub;
