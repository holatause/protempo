import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Package,
  DollarSign,
  Users,
  Clock,
  Save,
} from "lucide-react";

interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
  limit?: number;
  description?: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  features: PlanFeature[];
  isPopular: boolean;
  isActive: boolean;
  userCount: number;
}

const defaultFeatures: PlanFeature[] = [
  { id: "f1", name: "Usuarios", included: true, limit: 1 },
  { id: "f2", name: "Proyectos", included: true, limit: 3 },
  {
    id: "f3",
    name: "Almacenamiento",
    included: true,
    limit: 5,
    description: "GB",
  },
  { id: "f4", name: "Campañas mensuales", included: true, limit: 2 },
  { id: "f5", name: "Generación de contenido IA", included: true, limit: 50 },
  { id: "f6", name: "Generación de imágenes IA", included: false },
  { id: "f7", name: "Analíticas avanzadas", included: false },
  { id: "f8", name: "Soporte prioritario", included: false },
  { id: "f9", name: "API Access", included: false },
  { id: "f10", name: "Marca personalizada", included: false },
];

const mockPlans: Plan[] = [
  {
    id: "p1",
    name: "Básico",
    description: "Ideal para emprendedores y pequeños negocios",
    price: 29900,
    billingPeriod: "monthly",
    features: [
      { id: "f1", name: "Usuarios", included: true, limit: 1 },
      { id: "f2", name: "Proyectos", included: true, limit: 3 },
      {
        id: "f3",
        name: "Almacenamiento",
        included: true,
        limit: 5,
        description: "GB",
      },
      { id: "f4", name: "Campañas mensuales", included: true, limit: 2 },
      {
        id: "f5",
        name: "Generación de contenido IA",
        included: true,
        limit: 50,
      },
      { id: "f6", name: "Generación de imágenes IA", included: false },
      { id: "f7", name: "Analíticas avanzadas", included: false },
      { id: "f8", name: "Soporte prioritario", included: false },
      { id: "f9", name: "API Access", included: false },
      { id: "f10", name: "Marca personalizada", included: false },
    ],
    isPopular: false,
    isActive: true,
    userCount: 128,
  },
  {
    id: "p2",
    name: "Profesional",
    description: "Para equipos y agencias en crecimiento",
    price: 79900,
    billingPeriod: "monthly",
    features: [
      { id: "f1", name: "Usuarios", included: true, limit: 5 },
      { id: "f2", name: "Proyectos", included: true, limit: 10 },
      {
        id: "f3",
        name: "Almacenamiento",
        included: true,
        limit: 20,
        description: "GB",
      },
      { id: "f4", name: "Campañas mensuales", included: true, limit: 10 },
      {
        id: "f5",
        name: "Generación de contenido IA",
        included: true,
        limit: 200,
      },
      {
        id: "f6",
        name: "Generación de imágenes IA",
        included: true,
        limit: 100,
      },
      { id: "f7", name: "Analíticas avanzadas", included: true },
      { id: "f8", name: "Soporte prioritario", included: false },
      { id: "f9", name: "API Access", included: false },
      { id: "f10", name: "Marca personalizada", included: false },
    ],
    isPopular: true,
    isActive: true,
    userCount: 87,
  },
  {
    id: "p3",
    name: "Empresarial",
    description: "Solución completa para empresas y agencias establecidas",
    price: 199900,
    billingPeriod: "monthly",
    features: [
      { id: "f1", name: "Usuarios", included: true, limit: 20 },
      { id: "f2", name: "Proyectos", included: true, limit: 50 },
      {
        id: "f3",
        name: "Almacenamiento",
        included: true,
        limit: 100,
        description: "GB",
      },
      { id: "f4", name: "Campañas mensuales", included: true, limit: 50 },
      {
        id: "f5",
        name: "Generación de contenido IA",
        included: true,
        limit: 1000,
      },
      {
        id: "f6",
        name: "Generación de imágenes IA",
        included: true,
        limit: 500,
      },
      { id: "f7", name: "Analíticas avanzadas", included: true },
      { id: "f8", name: "Soporte prioritario", included: true },
      { id: "f9", name: "API Access", included: true },
      { id: "f10", name: "Marca personalizada", included: true },
    ],
    isPopular: false,
    isActive: true,
    userCount: 42,
  },
];

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    name: "",
    description: "",
    price: 0,
    billingPeriod: "monthly",
    features: JSON.parse(JSON.stringify(defaultFeatures)),
    isPopular: false,
    isActive: true,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddPlan = () => {
    // Validar campos
    if (!newPlan.name || !newPlan.description || !newPlan.price) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    // Crear nuevo plan
    const plan: Plan = {
      id: Date.now().toString(),
      name: newPlan.name,
      description: newPlan.description,
      price: newPlan.price,
      billingPeriod: newPlan.billingPeriod as "monthly" | "yearly",
      features: newPlan.features as PlanFeature[],
      isPopular: newPlan.isPopular || false,
      isActive: newPlan.isActive || true,
      userCount: 0,
    };

    setPlans([...plans, plan]);
    setIsAddPlanOpen(false);
    setNewPlan({
      name: "",
      description: "",
      price: 0,
      billingPeriod: "monthly",
      features: JSON.parse(JSON.stringify(defaultFeatures)),
      isPopular: false,
      isActive: true,
    });
  };

  const handleFeatureChange = (
    featureId: string,
    field: string,
    value: any,
  ) => {
    setNewPlan({
      ...newPlan,
      features: newPlan.features?.map((feature) =>
        feature.id === featureId ? { ...feature, [field]: value } : feature,
      ),
    });
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm("¿Estás seguro de eliminar este plan?")) {
      setPlans(plans.filter((plan) => plan.id !== planId));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Planes de Suscripción</h2>
        <Button onClick={() => setIsAddPlanOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Crear Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.isPopular ? "border-primary" : ""}`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <Badge className="bg-primary">Más Popular</Badge>
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-gray-500 mb-1">
                    /{plan.billingPeriod === "monthly" ? "mes" : "año"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-gray-300" />
                        )}
                        <span
                          className={feature.included ? "" : "text-gray-500"}
                        >
                          {feature.name}
                          {feature.included && feature.limit && (
                            <span className="ml-1 text-sm text-gray-500">
                              ({feature.limit}
                              {feature.description
                                ? ` ${feature.description}`
                                : ""}
                              )
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{plan.userCount} usuarios</span>
                  </div>
                  <Switch checked={plan.isActive} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Plan *</Label>
                <Input
                  id="name"
                  value={newPlan.name}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, name: e.target.value })
                  }
                  placeholder="Ej: Plan Premium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio Mensual (COP) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="price"
                    type="number"
                    className="pl-8"
                    value={newPlan.price || ""}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, price: Number(e.target.value) })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={newPlan.description}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, description: e.target.value })
                }
                placeholder="Describe brevemente este plan"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="popular"
                checked={newPlan.isPopular}
                onCheckedChange={(checked) =>
                  setNewPlan({ ...newPlan, isPopular: checked })
                }
              />
              <Label htmlFor="popular">Marcar como plan más popular</Label>
            </div>

            <Separator />

            <h3 className="font-medium">Características del Plan</h3>

            <div className="space-y-4">
              {newPlan.features?.map((feature) => (
                <div key={feature.id} className="flex items-center gap-4">
                  <Switch
                    id={`feature-${feature.id}`}
                    checked={feature.included}
                    onCheckedChange={(checked) =>
                      handleFeatureChange(feature.id, "included", checked)
                    }
                  />
                  <div className="flex-1">
                    <Label htmlFor={`feature-${feature.id}`}>
                      {feature.name}
                    </Label>
                  </div>
                  {feature.included && feature.limit !== undefined && (
                    <div className="w-24">
                      <Input
                        type="number"
                        value={feature.limit}
                        onChange={(e) =>
                          handleFeatureChange(
                            feature.id,
                            "limit",
                            Number(e.target.value),
                          )
                        }
                        placeholder="Límite"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPlanOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddPlan}>
              <Save className="w-4 h-4 mr-2" /> Guardar Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionPlans;
