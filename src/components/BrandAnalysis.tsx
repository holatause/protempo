import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Radar, Target, Palette, MessageSquare, Users, TrendingUp, Check } from 'lucide-react';
import { Button } from './ui/button';

interface BrandMetric {
  name: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const BrandAnalysis: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('default');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const brands = [
    { id: 'default', name: 'Tu marca' },
    { id: 'brand1', name: 'Café Colombiano' },
    { id: 'brand2', name: 'Moda Medellín' },
    { id: 'brand3', name: 'Tech Bogotá' }
  ];

  const metrics: BrandMetric[] = [
    {
      name: 'Reconocimiento',
      value: 78,
      icon: <Target className="h-5 w-5" />,
      color: 'bg-blue-600',
      description: 'Nivel de reconocimiento de marca en el mercado objetivo'
    },
    {
      name: 'Consistencia',
      value: 85,
      icon: <Palette className="h-5 w-5" />,
      color: 'bg-blue-700',
      description: 'Coherencia visual y de mensajes en todos los canales'
    },
    {
      name: 'Engagement',
      value: 62,
      icon: <MessageSquare className="h-5 w-5" />,
      color: 'bg-blue-800',
      description: 'Nivel de interacción y compromiso con la audiencia'
    },
    {
      name: 'Relevancia',
      value: 73,
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-900',
      description: 'Conexión con las necesidades del mercado colombiano'
    }
  ];

  const recommendations = [
    'Optimizar la paleta de colores para mayor reconocimiento en el mercado colombiano',
    'Adaptar el tono de comunicación para resonar mejor con la audiencia local',
    'Incrementar la consistencia visual en redes sociales',
    'Desarrollar una estrategia de contenido más enfocada en valores culturales colombianos'
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const handleReset = () => {
    setShowResults(false);
    setSelectedBrand('default');
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-900 p-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <PieChart className="mr-2 h-5 w-5" />
          Análisis de Marca
        </h3>
      </div>
      
      <div className="p-6">
        {!showResults ? (
          <>
            <p className="text-gray-700 mb-4">
              Analiza la presencia de marca en el mercado colombiano y recibe recomendaciones personalizadas.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona una marca para analizar
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isAnalyzing ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Analizando marca...
                </div>
              ) : (
                <>Analizar Marca</>
              )}
            </Button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Métricas de Marca</h4>
              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-50 rounded-lg p-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`${metric.color} p-2 rounded-full text-white mr-3`}>
                          {metric.icon}
                        </div>
                        <span className="font-medium text-gray-800">{metric.name}</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div 
                        className={`h-2.5 rounded-full ${metric.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      ></motion.div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{metric.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Recomendaciones</h4>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                <ul className="space-y-2">
                  {recommendations.map((recommendation, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <Check className="text-blue-500 mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                      <span className="text-gray-700">{recommendation}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-blue-600">
                <TrendingUp className="mr-1 h-5 w-5" />
                <span className="font-medium">Potencial de mejora: 28%</span>
              </div>
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Analizar otra marca
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrandAnalysis;
