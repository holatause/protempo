import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Users,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Calendar,
  ArrowRight,
  Eye,
  MessageSquare,
} from "lucide-react";

interface ApprovalStep {
  id: string;
  name: string;
  approver: {
    id: string;
    name: string;
    avatar: string;
  };
  status: "pending" | "approved" | "rejected" | "not_started";
  comments?: string;
  timestamp?: Date;
}

interface ApprovalWorkflowItem {
  id: string;
  title: string;
  description: string;
  type: "campaign" | "content" | "design" | "budget";
  status: "in_progress" | "approved" | "rejected" | "draft";
  progress: number;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: Date;
  dueDate?: Date;
  steps: ApprovalStep[];
  attachments: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
}

const mockWorkflows: ApprovalWorkflowItem[] = [
  {
    id: "w1",
    title: "Campaña de Redes Sociales - Mayo 2024",
    description:
      "Aprobación para la campaña completa de redes sociales para mayo",
    type: "campaign",
    status: "in_progress",
    progress: 66,
    creator: {
      id: "2",
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    steps: [
      {
        id: "s1",
        name: "Revisión de Contenido",
        approver: {
          id: "3",
          name: "Elena Díaz",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        },
        status: "approved",
        comments:
          "Contenido aprobado con ajustes menores en tono de comunicación",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        id: "s2",
        name: "Revisión de Diseño",
        approver: {
          id: "4",
          name: "Miguel Torres",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
        },
        status: "approved",
        comments: "Diseños aprobados, excelente trabajo",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      },
      {
        id: "s3",
        name: "Aprobación Final",
        approver: {
          id: "1",
          name: "Ana García",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        },
        status: "pending",
      },
    ],
    attachments: [
      {
        id: "a1",
        name: "plan-campana-mayo.pdf",
        type: "document",
        url: "#",
      },
      {
        id: "a2",
        name: "disenos-instagram.zip",
        type: "archive",
        url: "#",
      },
    ],
  },
  {
    id: "w2",
    title: "Presupuesto Q2 - Marketing Digital",
    description: "Aprobación del presupuesto para el segundo trimestre",
    type: "budget",
    status: "approved",
    progress: 100,
    creator: {
      id: "2",
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    steps: [
      {
        id: "s1",
        name: "Revisión Financiera",
        approver: {
          id: "5",
          name: "Laura Sánchez",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
        },
        status: "approved",
        comments: "Presupuesto alineado con objetivos financieros",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
      },
      {
        id: "s2",
        name: "Aprobación Final",
        approver: {
          id: "1",
          name: "Ana García",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        },
        status: "approved",
        comments: "Presupuesto aprobado para Q2",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      },
    ],
    attachments: [
      {
        id: "a1",
        name: "presupuesto-q2-2024.xlsx",
        type: "spreadsheet",
        url: "#",
      },
    ],
  },
  {
    id: "w3",
    title: "Contenido Blog - Tendencias Marketing 2024",
    description:
      "Artículo sobre tendencias de marketing para el blog corporativo",
    type: "content",
    status: "draft",
    progress: 0,
    creator: {
      id: "3",
      name: "Elena Díaz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    steps: [
      {
        id: "s1",
        name: "Revisión de Contenido",
        approver: {
          id: "2",
          name: "Carlos Ruiz",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
        },
        status: "not_started",
      },
      {
        id: "s2",
        name: "Aprobación Final",
        approver: {
          id: "1",
          name: "Ana García",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        },
        status: "not_started",
      },
    ],
    attachments: [
      {
        id: "a1",
        name: "tendencias-marketing-2024.docx",
        type: "document",
        url: "#",
      },
    ],
  },
];

const ApprovalWorkflow = () => {
  const [workflows, setWorkflows] =
    useState<ApprovalWorkflowItem[]>(mockWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] =
    useState<ApprovalWorkflowItem | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  const [comment, setComment] = useState("");

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "campaign":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case "content":
        return <FileText className="w-4 h-4 text-purple-500" />;
      case "design":
        return <Eye className="w-4 h-4 text-green-500" />;
      case "budget":
        return <FileText className="w-4 h-4 text-amber-500" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            En Progreso
          </Badge>
        );
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Aprobado</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rechazado</Badge>;
      case "draft":
        return <Badge variant="outline">Borrador</Badge>;
      default:
        return null;
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "not_started":
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const toggleExpandStep = (stepId: string) => {
    if (expandedSteps.includes(stepId)) {
      setExpandedSteps(expandedSteps.filter((id) => id !== stepId));
    } else {
      setExpandedSteps([...expandedSteps, stepId]);
    }
  };

  const handleApproveStep = (workflowId: string, stepId: string) => {
    if (!comment.trim()) {
      alert("Por favor añade un comentario para esta aprobación");
      return;
    }

    const updatedWorkflows = workflows.map((workflow) => {
      if (workflow.id === workflowId) {
        const updatedSteps = workflow.steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              status: "approved" as const,
              comments: comment,
              timestamp: new Date(),
            };
          }
          return step;
        });

        // Check if all steps are approved
        const allApproved = updatedSteps.every(
          (step) => step.status === "approved",
        );

        return {
          ...workflow,
          steps: updatedSteps,
          status: allApproved ? ("approved" as const) : workflow.status,
          progress: Math.round(
            (updatedSteps.filter((s) => s.status === "approved").length /
              updatedSteps.length) *
              100,
          ),
        };
      }
      return workflow;
    });

    setWorkflows(updatedWorkflows);
    setComment("");

    // Update selected workflow if it's the one being modified
    if (selectedWorkflow && selectedWorkflow.id === workflowId) {
      const updated = updatedWorkflows.find((w) => w.id === workflowId);
      if (updated) setSelectedWorkflow(updated);
    }
  };

  const handleRejectStep = (workflowId: string, stepId: string) => {
    if (!comment.trim()) {
      alert("Por favor añade un comentario para este rechazo");
      return;
    }

    const updatedWorkflows = workflows.map((workflow) => {
      if (workflow.id === workflowId) {
        const updatedSteps = workflow.steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              status: "rejected" as const,
              comments: comment,
              timestamp: new Date(),
            };
          }
          return step;
        });

        return {
          ...workflow,
          steps: updatedSteps,
          status: "rejected" as const,
          progress: Math.round(
            (updatedSteps.filter((s) => s.status === "approved").length /
              updatedSteps.length) *
              100,
          ),
        };
      }
      return workflow;
    });

    setWorkflows(updatedWorkflows);
    setComment("");

    // Update selected workflow if it's the one being modified
    if (selectedWorkflow && selectedWorkflow.id === workflowId) {
      const updated = updatedWorkflows.find((w) => w.id === workflowId);
      if (updated) setSelectedWorkflow(updated);
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Flujos de Aprobación
          </CardTitle>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" /> Nuevo Flujo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
          <div className="border-r">
            <div className="p-4 border-b">
              <Input placeholder="Buscar flujos de aprobación..." />
            </div>
            <ScrollArea className="h-[calc(600px-57px)]">
              <div className="p-4 space-y-4">
                {workflows.map((workflow) => (
                  <Card
                    key={workflow.id}
                    className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${selectedWorkflow?.id === workflow.id ? "border-primary" : ""}`}
                    onClick={() => setSelectedWorkflow(workflow)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(workflow.type)}
                          <h3 className="font-semibold">{workflow.title}</h3>
                        </div>
                        {getStatusBadge(workflow.status)}
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {workflow.description}
                      </p>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Progreso</span>
                          <span>{workflow.progress}%</span>
                        </div>
                        <Progress value={workflow.progress} />
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={workflow.creator.avatar} />
                            <AvatarFallback>
                              {workflow.creator.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{workflow.creator.name}</span>
                        </div>
                        <span>{formatTime(workflow.createdAt)}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="md:col-span-2">
            {selectedWorkflow ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(selectedWorkflow.type)}
                      <h2 className="font-semibold">
                        {selectedWorkflow.title}
                      </h2>
                    </div>
                    {getStatusBadge(selectedWorkflow.status)}
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Descripción
                      </h3>
                      <p className="text-gray-700">
                        {selectedWorkflow.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Creado por
                        </h3>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src={selectedWorkflow.creator.avatar}
                            />
                            <AvatarFallback>
                              {selectedWorkflow.creator.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {selectedWorkflow.creator.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatTime(selectedWorkflow.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {selectedWorkflow.dueDate && (
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-gray-500">
                            Fecha límite
                          </h3>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <span>
                              {selectedWorkflow.dueDate.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-500">
                        Pasos de Aprobación
                      </h3>

                      {selectedWorkflow.steps.map((step, index) => (
                        <Card key={step.id} className="p-4">
                          <div className="space-y-3">
                            <div
                              className="flex items-center justify-between cursor-pointer"
                              onClick={() => toggleExpandStep(step.id)}
                            >
                              <div className="flex items-center gap-3">
                                {getStepStatusIcon(step.status)}
                                <div>
                                  <h4 className="font-medium">{step.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    Aprobador: {step.approver.name}
                                  </p>
                                </div>
                              </div>
                              {expandedSteps.includes(step.id) ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              )}
                            </div>

                            {expandedSteps.includes(step.id) && (
                              <div className="pt-2">
                                <div className="flex items-center gap-2 mb-3">
                                  <Avatar>
                                    <AvatarImage src={step.approver.avatar} />
                                    <AvatarFallback>
                                      {step.approver.name.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {step.approver.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {step.status === "approved"
                                        ? "Aprobado"
                                        : step.status === "rejected"
                                          ? "Rechazado"
                                          : step.status === "pending"
                                            ? "Pendiente"
                                            : "No iniciado"}
                                      {step.timestamp &&
                                        ` • ${formatTime(step.timestamp)}`}
                                    </p>
                                  </div>
                                </div>

                                {step.comments && (
                                  <div className="bg-gray-50 p-3 rounded-md mb-3">
                                    <p className="text-sm text-gray-700">
                                      "{step.comments}"
                                    </p>
                                  </div>
                                )}

                                {step.status === "pending" &&
                                  step.approver.id === "1" && (
                                    <div className="space-y-3">
                                      <Textarea
                                        placeholder="Añade un comentario..."
                                        value={comment}
                                        onChange={(e) =>
                                          setComment(e.target.value)
                                        }
                                      />
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            handleRejectStep(
                                              selectedWorkflow.id,
                                              step.id,
                                            )
                                          }
                                        >
                                          <XCircle className="w-4 h-4 mr-2" />{" "}
                                          Rechazar
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handleApproveStep(
                                              selectedWorkflow.id,
                                              step.id,
                                            )
                                          }
                                        >
                                          <CheckCircle className="w-4 h-4 mr-2" />{" "}
                                          Aprobar
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-500">
                        Archivos Adjuntos
                      </h3>

                      <div className="space-y-2">
                        {selectedWorkflow.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-blue-500" />
                              <span>{attachment.name}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-2" /> Ver
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium">
                    Selecciona un flujo de aprobación
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Selecciona un flujo de la lista para ver sus detalles y
                    gestionar las aprobaciones
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalWorkflow;
