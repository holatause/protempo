import React from "react";
import Navigation from "@/components/layout/Navigation";
import AgentBuilder from "@/components/ai/AgentBuilder";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

const AgentBuilderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Constructor de Agentes IA
            </CardTitle>
          </CardHeader>
        </Card>

        <AgentBuilder />
      </div>
    </div>
  );
};

export default AgentBuilderPage;
