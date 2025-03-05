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
} from "lucide-react";

const Navigation = () => {
  return (
    <Card className="p-4 mb-8 flex justify-center gap-4">
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
    </Card>
  );
};

export default Navigation;
