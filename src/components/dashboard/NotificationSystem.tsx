import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  MessageSquare,
  Clock,
  ChevronRight,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "alert" | "optimization" | "reminder" | "update";
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Oportunidad de optimización",
    message:
      "Hemos detectado que tus publicaciones en Instagram tendrían mejor rendimiento si las programas entre 6-8 PM.",
    type: "optimization",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionUrl: "/optimization",
  },
  {
    id: "2",
    title: "Recordatorio de publicación",
    message:
      "Tienes una publicación programada para hoy a las 3:00 PM en Facebook.",
    type: "reminder",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    read: false,
    actionUrl: "/calendar",
  },
  {
    id: "3",
    title: "Alerta de rendimiento",
    message:
      "Tu campaña 'Promoción Verano' está teniendo un rendimiento por debajo de lo esperado. Revisa las métricas.",
    type: "alert",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    actionUrl: "/analytics",
  },
  {
    id: "4",
    title: "Actualización de IA",
    message:
      "Hemos mejorado nuestro algoritmo de generación de contenido. Prueba las nuevas funcionalidades.",
    type: "update",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionUrl: "/ai-tools",
  },
  {
    id: "5",
    title: "Tendencia detectada",
    message:
      "Estamos viendo un aumento en conversaciones sobre #MarketingIA en tu sector. Considera crear contenido relacionado.",
    type: "optimization",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    read: true,
    actionUrl: "/trends",
  },
];

interface NotificationSystemProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const NotificationSystem = ({
  isOpen = false,
  onClose = () => {},
}: NotificationSystemProps) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<string>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const getTypeIcon = (type: string, className = "w-5 h-5") => {
    switch (type) {
      case "optimization":
        return <TrendingUp className={`${className} text-blue-500`} />;
      case "reminder":
        return <Calendar className={`${className} text-purple-500`} />;
      case "alert":
        return <AlertCircle className={`${className} text-red-500`} />;
      case "update":
        return <MessageSquare className={`${className} text-green-500`} />;
      default:
        return <Bell className={className} />;
    }
  };

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

  return (
    <Card
      className={`fixed right-0 top-0 h-screen w-[400px] bg-white shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <CardHeader className="p-4 flex flex-row items-center justify-between border-b">
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <span>Notificaciones</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>

      <div className="p-4 border-b">
        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Todas
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            No leídas
          </Button>
          <Button
            variant={filter === "optimization" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("optimization")}
          >
            Optimizaciones
          </Button>
          <Button
            variant={filter === "alert" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("alert")}
          >
            Alertas
          </Button>
        </div>
      </div>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-4 space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No hay notificaciones
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getTypeIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                      {notification.actionUrl && (
                        <Button variant="link" className="p-0 h-auto text-sm">
                          Ver detalles <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <div className="p-4 border-t">
        <Button variant="outline" className="w-full" onClick={markAllAsRead}>
          <CheckCircle className="w-4 h-4 mr-2" />
          Marcar todas como leídas
        </Button>
      </div>
    </Card>
  );
};

export default NotificationSystem;
