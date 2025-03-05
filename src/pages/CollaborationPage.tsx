import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import CollaborationPanel from "@/components/collaboration/CollaborationPanel";
import RealTimeEditor from "@/components/collaboration/RealTimeEditor";
import ApprovalWorkflow from "@/components/collaboration/ApprovalWorkflow";
import { MessageSquare, FileText, CheckCircle } from "lucide-react";

const CollaborationPage = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Centro de Colaboración</CardTitle>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat y Comentarios
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documentos Colaborativos
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Flujos de Aprobación
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <CollaborationPanel />
          </TabsContent>

          <TabsContent value="documents">
            <RealTimeEditor />
          </TabsContent>

          <TabsContent value="approvals">
            <ApprovalWorkflow />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CollaborationPage;
