import React from "react";
import CampaignManager from "@/components/campaigns/CampaignManager";
import Navigation from "@/components/layout/Navigation";
import TauseProAssistant from "@/components/ai/TauseProAssistant";

const CampaignManagerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-8 mr-[400px]">
        <div className="max-w-7xl mx-auto">
          <Navigation />
          <div className="mt-8">
            <CampaignManager />
          </div>
        </div>
      </div>
      
      {/* Asistente de Tause Pro */}
      <TauseProAssistant />
    </div>
  );
};

export default CampaignManagerPage;
