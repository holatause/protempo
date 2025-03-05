import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import CampaignPlanner from "@/components/marketing/CampaignPlanner";
import UTMBuilder from "@/components/marketing/UTMBuilder";
import ROIDashboard from "@/components/marketing/ROIDashboard";
import { Megaphone, Link2, DollarSign } from "lucide-react";

const MarketingToolsPage = () => {
  const [activeTab, setActiveTab] = useState("campaigns");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Herramientas de Marketing</CardTitle>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              Planificador de Campañas
            </TabsTrigger>
            <TabsTrigger value="utm" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Generador de UTMs
            </TabsTrigger>
            <TabsTrigger value="roi" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Dashboard de ROI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <CampaignPlanner />
          </TabsContent>

          <TabsContent value="utm">
            <UTMBuilder />
          </TabsContent>

          <TabsContent value="roi">
            <ROIDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketingToolsPage;
