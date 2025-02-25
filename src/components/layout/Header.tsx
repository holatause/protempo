import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 border-b bg-white px-8 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">Panel de Control</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
