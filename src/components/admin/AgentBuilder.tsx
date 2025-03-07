import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  Plus,
  Save,
  Trash2,
  Copy,
  Edit,
  Play,
  Sparkles,
  MessageSquare,
  Upload,
  Database,
  Settings,
  Code,
  Zap,
  FileText,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  role: string;
  personality: string;
  knowledgeBase: string[];
  systemPrompt: string;
  capabilities: string[];
  isActive: boolean;
  createdAt: Date;
  lastModified: Date;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Marketing Assistant",
    description: "Asistente especializado en estrategias de marketing digital",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Marketing",
    role: "marketing",
    personality: "Profesional, creativo y orientado a resultados",
    knowledgeBase: ["marketing_digital.pdf", "social_media_trends.pdf"],
    systemPrompt: "Eres un asistente de marketing digital especializado en el mercado colombiano. Tu objetivo es proporcionar estrategias efectivas, contenido persuasivo y recomendaciones basadas en las mejores prácticas de la industria.",
    capabilities: ["content_generation", "campaign_planning", "analytics_interpretation"],
    isActive: true,
    createdAt: new Date(2024, 2, 15),
    lastModified: new Date(2024, 4, 10),
  },
  {
    id: "2",
    name: "Content Creator",
    description: "Especialista en creación de contenido para redes sociales",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Content",
    role: "content",
    personality: "Creativo, actual y con conocimiento de tendencias",
    knowledgeBase: ["content_best_practices.pdf", "copywriting_guide.pdf"],
    systemPrompt: "Eres un creador de contenido especializado en redes sociales. Tu objetivo es generar textos atractivos, ideas para posts y estrategias de contenido que generen engagement.",
    capabilities: ["social_media_content", "copywriting", "hashtag_research"],
    isActive: true,
    createdAt: new Date(2024, 3, 5),
    lastModified: new Date(2024, 4, 12),
  },
  {
    id: "3",
    name: "Analytics Expert",
    description: "Experto en análisis de datos y métricas de marketing",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Analytics",
    role: "analytics",
    personality: "Analítico, preciso y orientado a datos",
    knowledgeBase: ["marketing_metrics.pdf", "data_analysis.pdf"],
    systemPrompt: "Eres un analista de datos especializado en marketing digital. Tu objetivo es interpretar métricas, identificar tendencias y proporcionar recomendaciones accionables para optimizar campañas.",
    capabilities: ["data_analysis", "performance_reporting", "trend_identification"],
    isActive: false,
    createdAt: new Date(2024, 1, 20),
    lastModified: new Date(2024, 3, 15),
  },
];

const AgentBuilder = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("configuration");
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: "",
    description: "",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=New",
    role: "general",
    personality: "",
    knowledgeBase: [],
    systemPrompt: "",
    capabilities: [],
    isActive: true,
  });

  const handleCreateAgent = () => {
    // Validar campos
    if (!newAgent.name || !newAgent.description || !new