import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Globe,
  Mail,
  Shield,
  Bell,
  Palette,
  Key,
  RefreshCw,
  Database,
  Server,
  FileCode,
  Webhook,
} from "lucide-react";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "StellarEngage",
    siteDescription: "Plataforma de marketing con IA para agencias",
    supportEmail: "soporte@stellarengage.com",
    contactPhone: "+57 300 123 4567",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    maintenanceMode: false,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@stellarengage.com",
    smtpPassword: "********",
    senderName: "StellarEngage",
    senderEmail: "no-reply@stellarengage.com",
    enableEmailNotifications: true,
  });

  const [apiSettings, setApiSettings] = useState({
    openaiApiKey: "sk-*************************************",
    googleApiKey: "AIza*************************************",
    facebookAppId: "1234567890123456",
    instagramAppId: "1234567890123456",
    twitterApiKey: "*************************************",
    enableRateLimiting: true,
    requestsPerMinute: 60,
  });

  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactor: true,
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    passwordRequireNumbers: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableCaptcha: true,
  });

  const handleSaveSettings = (settingsType: string) => {
    // En una implementación real, esto enviaría los datos al backend
    alert(`Configuración de ${settingsType} guardada correctamente`);
  };

  return (
    <div className="p-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            API & Integraciones
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nombre del Sitio</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        siteName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Email de Soporte</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        supportEmail: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descripción del Sitio</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      siteDescription: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
                  <Input
                    id="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        contactPhone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">URL del Logo</Label>
                  <Input
                    id="logoUrl"
                    value={generalSettings.logoUrl}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        logoUrl: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setGeneralSettings({
                      ...generalSettings,
                      maintenanceMode: checked,
                    })
                  }
                />
                <Label htmlFor="maintenanceMode">
                  Activar modo mantenimiento
                </Label>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("general")}>
                  <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalización</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tema Principal</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 bg-primary rounded-md cursor-pointer border-2 border-primary"></div>
                    <div className="h-10 bg-blue-600 rounded-md cursor-pointer"></div>
                    <div className="h-10 bg-green-600 rounded-md cursor-pointer"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Modo</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Palette className="w-4 h-4 mr-2" /> Claro
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Palette className="w-4 h-4 mr-2" /> Oscuro
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("personalización")}>
                  <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">Servidor SMTP</Label>
                  <Input
                    id="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        smtpServer: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Puerto SMTP</Label>
                  <Input
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        smtpPort: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">Usuario SMTP</Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        smtpUsername: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">Contraseña SMTP</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        smtpPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Nombre del Remitente</Label>
                  <Input
                    id="senderName"
                    value={emailSettings.senderName}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        senderName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Email del Remitente</Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        senderEmail: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableEmailNotifications"
                  checked={emailSettings.enableEmailNotifications}
                  onCheckedChange={(checked) =>
                    setEmailSettings({
                      ...emailSettings,
                      enableEmailNotifications: checked,
                    })
                  }
                />
                <Label htmlFor="enableEmailNotifications">
                  Habilitar notificaciones por email
                </Label>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" /> Enviar Email de Prueba
                </Button>
                <Button onClick={() => handleSaveSettings("email")}>
                  <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Bell className="w-4 h-4 mr-2" /> Bienvenida
                </Button>
                <Button variant="outline" className="justify-start">
                  <Bell className="w-4 h-4 mr-2" /> Restablecimiento de
                  Contraseña
                </Button>
                <Button variant="outline" className="justify-start">
                  <Bell className="w-4 h-4 mr-2" /> Confirmación de Compra
                </Button>
                <Button variant="outline" className="justify-start">
                  <Bell className="w-4 h-4 mr-2" /> Recordatorio de Facturación
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Claves de API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="openaiApiKey"
                    type="password"
                    value={apiSettings.openaiApiKey}
                    onChange={(e) =>
                      setApiSettings({
                        ...apiSettings,
                        openaiApiKey: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleApiKey">Google API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="googleApiKey"
                    type="password"
                    value={apiSettings.googleApiKey}
                    onChange={(e) =>
                      setApiSettings({
                        ...apiSettings,
                        googleApiKey: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebookAppId">Facebook App ID</Label>
                  <Input
                    id="facebookAppId"
                    value={apiSettings.facebookAppId}
                    onChange={(e) =>
                      setApiSettings({
                        ...apiSettings,
                        facebookAppId: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagramAppId">Instagram App ID</Label>
                  <Input
                    id="instagramAppId"
                    value={apiSettings.instagramAppId}
                    onChange={(e) =>
                      setApiSettings({
                        ...apiSettings,
                        instagramAppId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableRateLimiting">
                    Limitar Tasa de Peticiones
                  </Label>
                  <Switch
                    id="enableRateLimiting"
                    checked={apiSettings.enableRateLimiting}
                    onCheckedChange={(checked) =>
                      setApiSettings({
                        ...apiSettings,
                        enableRateLimiting: checked,
                      })
                    }
                  />
                </div>
                {apiSettings.enableRateLimiting && (
                  <div className="pl-6 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="requestsPerMinute">
                        Peticiones por minuto
                      </Label>
                      <Input
                        id="requestsPerMinute"
                        type="number"
                        value={apiSettings.requestsPerMinute}
                        onChange={(e) =>
                          setApiSettings({
                            ...apiSettings,
                            requestsPerMinute: Number(e.target.value),
                          })
                        }
                        className="w-24"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("API")}>
                  <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Webhook className="w-4 h-4 mr-2" /> Configurar Webhooks
                  </Button>
                  <p className="text-sm text-gray-500">
                    Configura webhooks para recibir notificaciones en tiempo
                    real cuando ocurran eventos en tu plataforma.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logs de API</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <FileCode className="w-4 h-4 mr-2" /> Ver Logs de API
                  </Button>
                  <p className="text-sm text-gray-500">
                    Revisa los logs de las llamadas a la API para solucionar
                    problemas y monitorear el uso.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableTwoFactor">
                    Autenticación de dos factores
                  </Label>
                  <p className="text-sm text-gray-500">
                    Requiere que los usuarios confirmen su identidad con un
                    segundo método
                  </p>
                </div>
                <Switch
                  id="enableTwoFactor"
                  checked={securitySettings.enableTwoFactor}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      enableTwoFactor: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Política de Contraseñas</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Longitud mínima</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordMinLength: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">
                      Intentos máximos de inicio de sesión
                    </Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          maxLoginAttempts: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="passwordRequireSpecialChars"
                    checked={securitySettings.passwordRequireSpecialChars}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        passwordRequireSpecialChars: checked,
                      })
                    }
                  />
                  <Label htmlFor="passwordRequireSpecialChars">
                    Requerir caracteres especiales
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="passwordRequireNumbers"
                    checked={securitySettings.passwordRequireNumbers}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        passwordRequireNumbers: checked,
                      })
                    }
                  />
                  <Label htmlFor="passwordRequireNumbers">
                    Requerir números
                  </Label>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Sesiones</h3>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Tiempo de expiración de sesión (minutos)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableCaptcha"
                    checked={securitySettings.enableCaptcha}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        enableCaptcha: checked,
                      })
                    }
                  />
                  <Label htmlFor="enableCaptcha">
                    Habilitar CAPTCHA en formularios
                  </Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("seguridad")}>
                  <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Copias de Seguridad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" /> Configurar Backups
                  </Button>
                  <p className="text-sm text-gray-500">
                    Programa copias de seguridad automáticas de tu base de datos
                    y archivos.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registros de Auditoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Server className="w-4 h-4 mr-2" /> Ver Logs de Auditoría
                  </Button>
                  <p className="text-sm text-gray-500">
                    Revisa un registro detallado de todas las acciones
                    administrativas realizadas en el sistema.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
