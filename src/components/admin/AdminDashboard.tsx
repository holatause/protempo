import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  CreditCard,
  Settings,
  BarChart,
  Bell,
  Search,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  UserPlus,
  Activity,
  Package,
} from "lucide-react";
import UserManagement from "./UserManagement";
import SubscriptionPlans from "./SubscriptionPlans";
import SystemSettings from "./SystemSettings";
import AnalyticsDashboard from "./AnalyticsDashboard";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    growthRate: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // En una implementación real, esto vendría de la API
        // Simulamos una carga de datos
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStats({
          totalUsers: 256,
          activeSubscriptions: 187,
          monthlyRevenue: 12580,
          growthRate: 12.5,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Panel de Administración
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="plans" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Planes
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configuración
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Activity className="w-8 h-8 animate-pulse mx-auto text-primary mb-2" />
                  <p className="text-sm text-gray-500">Cargando datos...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Usuarios</p>
                        <p className="text-2xl font-bold">{stats.totalUsers}</p>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs">
                      <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+12%</span>
                      <span className="text-gray-500 ml-1">
                        vs. mes anterior
                      </span>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          Suscripciones Activas
                        </p>
                        <p className="text-2xl font-bold">
                          {stats.activeSubscriptions}
                        </p>
                      </div>
                      <div className="p-2 bg-green-100 rounded-full">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs">
                      <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+8%</span>
                      <span className="text-gray-500 ml-1">
                        vs. mes anterior
                      </span>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          Ingresos Mensuales
                        </p>
                        <p className="text-2xl font-bold">
                          {formatCurrency(stats.monthlyRevenue)}
                        </p>
                      </div>
                      <div className="p-2 bg-purple-100 rounded-full">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs">
                      <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+15%</span>
                      <span className="text-gray-500 ml-1">
                        vs. mes anterior
                      </span>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          Tasa de Crecimiento
                        </p>
                        <p className="text-2xl font-bold">
                          {stats.growthRate}%
                        </p>
                      </div>
                      <div className="p-2 bg-amber-100 rounded-full">
                        <Activity className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs">
                      <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+2.5%</span>
                      <span className="text-gray-500 ml-1">
                        vs. mes anterior
                      </span>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Distribución de Planes</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Plan Básico
                          </span>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Plan Profesional
                          </span>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Plan Empresarial
                          </span>
                          <span className="text-sm font-medium">18%</span>
                        </div>
                        <Progress value={18} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Plan Personalizado
                          </span>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                        <Progress value={5} className="h-2" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Actividad Reciente</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <UserPlus className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Nuevo usuario registrado
                          </p>
                          <p className="text-xs text-gray-500">
                            Juan Pérez se unió con plan Profesional
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Hace 2 horas
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <CreditCard className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Suscripción actualizada
                          </p>
                          <p className="text-xs text-gray-500">
                            María López cambió a plan Empresarial
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Hace 5 horas
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <Bell className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Alerta de sistema
                          </p>
                          <p className="text-xs text-gray-500">
                            Pico de uso de API detectado
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Hace 12 horas
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <AnalyticsDashboard />
              </div>
            )}
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="plans">
            <SubscriptionPlans />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
