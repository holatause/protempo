import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-white border-r p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">S</span>
        </div>
        <span className="text-xl font-semibold">StellarEngage</span>
      </div>

      <nav className="space-y-2 flex-1">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LayoutDashboard className="w-5 h-5" />
            Panel Principal
          </Button>
        </Link>
        <Link to="/usuarios">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Users className="w-5 h-5" />
            Usuarios
          </Button>
        </Link>
        <Link to="/planes">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Package className="w-5 h-5" />
            Planes
          </Button>
        </Link>
      </nav>

      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="w-5 h-5" />
          Configuración
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
