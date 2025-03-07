import React from "react";
import Navigation from "@/components/layout/Navigation";
import GamificationSystem from "@/components/gamification/GamificationSystem";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const GamificationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <Card className="mb-6 bg-white/80 backdrop-blur border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Sistema de Gamificación
            </CardTitle>
          </CardHeader>
        </Card>

        <GamificationSystem />
      </div>
    </div>
  );
};

export default GamificationPage;
