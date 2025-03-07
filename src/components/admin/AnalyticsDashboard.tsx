import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Calendar,
  Download,
  TrendingUp,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const AnalyticsDashboard = () => {
  // Datos simulados para el gráfico
  const monthlyData = [
    { month: "Ene", users: 120, revenue: 4500 },
    { month: "Feb", users: 145, revenue: 5200 },
    { month: "Mar", users: 165, revenue: 6100 },
    { month: "Abr", users: 190, revenue: 7300 },
    { month: "May", users: 210, revenue: 8500 },
    { month: "Jun", users: 235, revenue: 9800 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calcular el máximo para normalizar las barras
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));
  const maxUsers = Math.max(...monthlyData.map((d) => d.users));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Análisis de Rendimiento</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" /> Últimos 6 meses
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Gráfico de barras simplificado */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Crecimiento Mensual</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">Usuarios</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Ingresos</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2 h-64">
              {monthlyData.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-end h-full gap-2"
                >
                  <div className="w-full flex flex-col items-center gap-1">
                    <div
                      className="w-8 bg-green-500 rounded-t-sm"
                      style={{
                        height: `${(data.revenue / maxRevenue) * 180}px`,
                      }}
                    ></div>
                    <div
                      className="w-8 bg-primary rounded-t-sm"
                      style={{ height: `${(data.users / maxUsers) * 180}px` }}
                    ></div>
                  </div>
                  <span className="text-xs">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Métricas clave */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tasa de Conversión</p>
                    <div className="flex items-center gap-1">
                      <p className="text-2xl font-bold">8.2%</p>
                      <Badge className="bg-green-100 text-green-800">
                        +1.2%
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Retención de Usuarios
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-2xl font-bold">76%</p>
                      <Badge className="bg-green-100 text-green-800">+3%</Badge>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Valor Promedio</p>
                    <div className="flex items-center gap-1">
                      <p className="text-2xl font-bold">
                        {formatCurrency(85000)}
                      </p>
                      <Badge className="bg-green-100 text-green-800">
                        +5.4%
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Churn Rate</p>
                    <div className="flex items-center gap-1">
                      <p className="text-2xl font-bold">3.2%</p>
                      <Badge className="bg-red-100 text-red-800">+0.5%</Badge>
                    </div>
                  </div>
                  <div className="p-2 bg-red-100 rounded-full">
                    <Activity className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Objetivos */}
          <div className="space-y-4">
            <h3 className="font-medium">Objetivos Trimestrales</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Nuevos usuarios (objetivo: 500)
                  </span>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Ingresos (objetivo: {formatCurrency(50000000)})
                  </span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Retención (objetivo: 85%)</span>
                  <span className="text-sm font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsDashboard;
