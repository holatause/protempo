import React from "react";
import AIAgent from "./chat/AIAgent";
import Navigation from "./layout/Navigation";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Navigation />
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Asistente de Marketing con IA</h1>
          <p className="text-lg text-gray-600">
            Tu socio inteligente para crear y gestionar campañas de marketing
            efectivas
          </p>
        </div>
        <AIAgent />
      </div>
    </div>
  );
};

export default Home;
