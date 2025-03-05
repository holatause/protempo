import React from "react";
import DesignEditor from "@/modules/design/DesignEditor";
import Navigation from "@/components/layout/Navigation";

const DesignPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 pb-0">
        <Navigation />
      </div>
      <DesignEditor />
    </div>
  );
};

export default DesignPage;
