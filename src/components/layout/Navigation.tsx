import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard,
  Wand2,
  User,
  Home,
  Layout,
  Users,
  Settings,
  Megaphone,
  Sparkles,
  Trophy,
  Shield,
  Bot,
} from "lucide-react";

const Navigation = () => {
  return (
    <Card className="p-4 mb-8 flex flex-wrap justify-center gap-4 bg-white/90 backdrop-blur shadow-lg border-none">
      <Link to="/">
        <Button variant="outline" className="flex gap-2">
          <Home className="w-4 h-4" />
          Home
        </Button>
      </Link>
      <Link to="/dashboard">
        <Button variant="outline" className="flex gap-2">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Button>
      </Link>
      <Link to="/unified-dashboard">
        <Button variant="outline" className="flex gap-2">
          <Layout className="w-4 h-4" />
          Dashboard Unificado
        </Button>
      </Link>
      <Link to="/collaboration">
        <Button variant="outline" className="flex gap-2">
          <Users className="w-4 h-4" />
          Colaboración
        </Button>
      </Link>
      <Link to="/marketing-tools">
        <Button variant="outline" className="flex gap-2">
          <Megaphone className="w-4 h-4" />
          Marketing
        </Button>
      </Link>
      <Link to="/ai-tools">
        <Button variant="outline" className="flex gap-2">
          <Sparkles className="w-4 h-4" />
          IA
        </Button>
      </Link>
      <Link to="/design">
        <Button variant="outline" className="flex gap-2">
          <Wand2 className="w-4 h-4" />
          Design Editor
        </Button>
      </Link>
      <Link to="/profile">
        <Button variant="outline" className="flex gap-2">
          <User className="w-4 h-4" />
          Mi Perfil
        </Button>
      </Link>
      <Link to="/preferences">
        <Button variant="outline" className="flex gap-2">
          <Settings className="w-4 h-4" />
          Preferencias
        </Button>
      </Link>
      <Link to="/gamification">
        <Button
          variant="outline"
          className="flex gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-none"
        >
          <Trophy className="w-4 h-4" />
          Gamificación
        </Button>
      </Link>
      <Link to="/agent-builder">
        <Button variant="outline" className="flex gap-2">
          <Bot className="w-4 h-4" />
          Agentes IA
        </Button>
      </Link>
      <Link to="/admin">
        <Button variant="outline" className="flex gap-2">
          <Shield className="w-4 h-4" />
          Admin
        </Button>
      </Link>
    </Card>
  );
};

export default Navigation;
