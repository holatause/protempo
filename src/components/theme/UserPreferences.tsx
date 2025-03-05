import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Bell, Eye, Layout, Save } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

const UserPreferences = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: true,
      mentions: true,
      approvals: true,
    },
    display: {
      compactMode: false,
      animationsReduced: false,
      defaultView: "dashboard",
      language: "es",
    },
  });

  const handleNotificationToggle = (
    key: keyof typeof preferences.notifications,
  ) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key],
      },
    });
  };

  const handleDisplayToggle = (key: "compactMode" | "animationsReduced") => {
    setPreferences({
      ...preferences,
      display: {
        ...preferences.display,
        [key]: !preferences.display[key],
      },
    });
  };

  const handleSelectChange = (
    key: "defaultView" | "language",
    value: string,
  ) => {
    setPreferences({
      ...preferences,
      display: {
        ...preferences.display,
        [key]: value,
      },
    });
  };

  const handleSavePreferences = () => {
    // In a real app, this would save to a backend
    alert("Preferencias guardadas correctamente");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Preferencias de Usuario
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="appearance"
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Apariencia
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Notificaciones
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="appearance" className="p-6 space-y-6">
            <ThemeSelector />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  Opciones de Visualización
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">Modo Compacto</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce el espaciado y tamaño de elementos
                    </p>
                  </div>
                  <Switch
                    id="compact-mode"
                    checked={preferences.display.compactMode}
                    onCheckedChange={() => handleDisplayToggle("compactMode")}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduced-animations">
                      Reducir Animaciones
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Minimiza las animaciones de la interfaz
                    </p>
                  </div>
                  <Switch
                    id="reduced-animations"
                    checked={preferences.display.animationsReduced}
                    onCheckedChange={() =>
                      handleDisplayToggle("animationsReduced")
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="default-view">Vista Predeterminada</Label>
                  <Select
                    value={preferences.display.defaultView}
                    onValueChange={(value) =>
                      handleSelectChange("defaultView", value)
                    }
                  >
                    <SelectTrigger id="default-view">
                      <SelectValue placeholder="Selecciona una vista" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Panel Principal</SelectItem>
                      <SelectItem value="campaigns">Campañas</SelectItem>
                      <SelectItem value="content">Contenido</SelectItem>
                      <SelectItem value="analytics">Analítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={preferences.display.language}
                    onValueChange={(value) =>
                      handleSelectChange("language", value)
                    }
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Configuración de Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">
                      Notificaciones por Email
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe actualizaciones importantes por correo
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferences.notifications.email}
                    onCheckedChange={() => handleNotificationToggle("email")}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">
                      Notificaciones Push
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe alertas en tiempo real
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={preferences.notifications.push}
                    onCheckedChange={() => handleNotificationToggle("push")}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mention-notifications">
                      Notificaciones de Menciones
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe alertas cuando te mencionan en comentarios
                    </p>
                  </div>
                  <Switch
                    id="mention-notifications"
                    checked={preferences.notifications.mentions}
                    onCheckedChange={() => handleNotificationToggle("mentions")}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="approval-notifications">
                      Notificaciones de Aprobaciones
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe alertas sobre solicitudes de aprobación
                    </p>
                  </div>
                  <Switch
                    id="approval-notifications"
                    checked={preferences.notifications.approvals}
                    onCheckedChange={() =>
                      handleNotificationToggle("approvals")
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="p-6 border-t flex justify-end">
          <Button onClick={handleSavePreferences}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Preferencias
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPreferences;
