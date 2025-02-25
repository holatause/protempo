import React from "react";

interface AIGeneratorProps {
  onGenerate?: (image: string) => void;
}

const AIGenerator = ({ onGenerate }: AIGeneratorProps) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Generador AI</h3>
      <p className="mt-2 text-gray-600">
        Esta funcionalidad estará disponible próximamente
      </p>
    </div>
  );
};

export default AIGenerator;
