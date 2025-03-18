import React, { useEffect } from 'react';
import BrujulaAssistant from './BrujulaAssistant';
import ProactiveEngine from './ProactiveEngine';
import MarketInsights from './MarketInsights';
import { useAIStore } from '@/store/ai-store';
import { useProactiveStore } from './ProactiveEngine';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart2, Zap } from 'lucide-react';

// Componente que integra Brújula con el motor proactivo y análisis de mercado
const BrujulaIntegration: React.FC = () => {
  const { messages, suggestions } = useAIStore();
  const { userContext } = useProactiveStore();
  const [showInsights, setShowInsights] = React.useState(false);
  const [selectedRegion, setSelectedRegion] = React.useState('bogota');
  
  // Detectar menciones de regiones en los mensajes para mostrar insights relevantes
  useEffect(() => {
    if (messages.length === 0) return;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') return;
    
    const content = lastMessage.content.toLowerCase();
    
    // Detectar menciones de regiones colombianas
    const regions = {
      bogota: ['bogotá', 'bogota', 'cundinamarca'],
      medellin: ['medellín', 'medellin', 'antioquia'],
      cali: ['cali', 'valle', 'valle del cauca'],
      barranquilla: ['barranquilla', 'atlántico', 'atlantico'],
      cartagena: ['cartagena', 'bolívar', 'bolivar']
    };
    
    for (const [region, keywords] of Object.entries(regions)) {
      if (keywords.some(keyword => content.includes(keyword))) {
        setSelectedRegion(region);
        setShowInsights(true);
        return;
      }
    }
    
    // Detectar palabras clave relacionadas con análisis de mercado
    const marketKeywords = [
      'mercado', 'análisis', 'analisis', 'tendencias', 'estadísticas', 'estadisticas',
      'datos', 'consumidor', 'comportamiento', 'ventas', 'crecimiento'
    ];
    
    if (marketKeywords.some(keyword => content.includes(keyword))) {
      setShowInsights(true);
    }
  }, [messages]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Columna principal con Brújula */}
      <div className="md:col-span-2">
        {/* Motor proactivo (sin renderizado visible) */}
        <ProactiveEngine />
        
        {/* Asistente Brújula */}
        <BrujulaAssistant />
      </div>
      
      {/* Columna lateral con insights y análisis */}
      <AnimatePresence>
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3">
                <h3 className="text-white font-medium flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Análisis de Mercado Colombiano
                </h3>
              </div>
              
              <div className="p-4">
                <Tabs defaultValue="insights">
                  <TabsList className="mb-4">
                    <TabsTrigger value="insights" className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>Insights</span>
                    </TabsTrigger>
                    <TabsTrigger value="data" className="flex items-center">
                      <BarChart2 className="h-3 w-3 mr-1" />
                      <span>Datos</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="insights">
                    <MarketInsights region={selectedRegion} />
                  </TabsContent>
                  
                  <TabsContent value="data">
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Datos actualizados en tiempo real</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Estos datos son específicos para el mercado colombiano y se actualizan regularmente.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Selecciona una región:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            className={`text-sm p-2 rounded-md transition-colors ${
                              selectedRegion === 'bogota' 
                                ? 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200' 
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-50'
                            }`}
                            onClick={() => setSelectedRegion('bogota')}
                          >
                            Bogotá
                          </button>
                          <button 
                            className={`text-sm p-2 rounded-md transition-colors ${
                              selectedRegion === 'medellin' 
                                ? 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200' 
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-50'
                            }`}
                            onClick={() => setSelectedRegion('medellin')}
                          >
                            Medellín
                          </button>
                          <button 
                            className={`text-sm p-2 rounded-md transition-colors ${
                              selectedRegion === 'cali' 
                                ? 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200' 
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-50'
                            }`}
                            onClick={() => setSelectedRegion('cali')}
                          >
                            Cali
                          </button>
                          <button 
                            className={`text-sm p-2 rounded-md transition-colors ${
                              selectedRegion === 'barranquilla' 
                                ? 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200' 
                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-50'
                            }`}
                            onClick={() => setSelectedRegion('barranquilla')}
                          >
                            Barranquilla
                          </button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrujulaIntegration;
