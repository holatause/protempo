import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';

interface LiveDemoProps {
  onComplete?: () => void;
}

const LiveDemo: React.FC<LiveDemoProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const demoSteps = [
    {
      instruction: 'Solicita a la IA una campaña para...',
      placeholder: 'Escribe tu solicitud aquí...',
      defaultInput: 'Crear una campaña para una cafetería colombiana que destaque el café de origen',
      response: 'Generando campaña "Raíces de Colombia" con 3 piezas gráficas, copy adaptado al mercado local y estrategia de redes sociales optimizada para aumentar visitas en tienda.'
    },
    {
      instruction: 'Pide a la IA que optimice para...',
      placeholder: 'Especifica tu objetivo...',
      defaultInput: 'Optimizar para Instagram y aumentar engagement',
      response: 'Campaña optimizada para Instagram con formato 1:1, paleta inspirada en los paisajes cafeteros colombianos, y copy adaptado con expresiones locales para aumentar engagement en un 32% según datos históricos.'
    },
    {
      instruction: 'Solicita análisis de rendimiento...',
      placeholder: 'Especifica métricas...',
      defaultInput: 'Analizar rendimiento esperado vs competidores locales',
      response: 'Análisis completado: La campaña proyecta un ROI 27% superior al promedio del sector en Colombia. Recomendaciones: Incrementar frecuencia en horarios de 7-9am y 4-6pm para maximizar conversiones.'
    }
  ];

  const handleNext = () => {
    if (step < demoSteps.length) {
      setLoading(true);
      
      // Simular procesamiento de IA
      setTimeout(() => {
        setResult(demoSteps[step].response);
        setLoading(false);
      }, 1500);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handleAdvance = () => {
    if (step < demoSteps.length - 1) {
      setStep(step + 1);
      setInput('');
      setResult('');
    } else {
      // Completar demostración
      if (onComplete) {
        onComplete();
      }
    }
  };

  useEffect(() => {
    setInput(demoSteps[step]?.defaultInput || '');
  }, [step]);

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-900 p-4 text-white">
        <h3 className="text-xl font-bold flex items-center">
          <Sparkles className="mr-2 h-5 w-5" />
          Demostración en vivo de tause Pro
        </h3>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">{demoSteps[step]?.instruction}</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={demoSteps[step]?.placeholder}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button 
              onClick={handleNext}
              disabled={loading || !input}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Procesando...' : 'Generar'}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <AnimatePresence>
          {loading && (
            <motion.div 
              className="bg-gray-50 rounded-md p-4 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse"></div>
                <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse delay-150"></div>
                <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse delay-300"></div>
                <span className="text-gray-500 ml-2">La IA está procesando tu solicitud...</span>
              </div>
            </motion.div>
          )}
          
          {result && (
            <motion.div 
              className="bg-blue-50 border-l-4 border-blue-500 rounded-md p-4 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <Check className="text-blue-500 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-gray-800">{result}</p>
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAdvance}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      {step < demoSteps.length - 1 ? 'Continuar' : 'Finalizar demostración'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            {demoSteps.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full ${i === step ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Paso {step + 1} de {demoSteps.length}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveDemo;
