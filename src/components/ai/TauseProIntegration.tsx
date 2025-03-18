import React, { useEffect } from 'react';
import TauseProAssistant from './TauseProAssistant';
import ProactiveEngine from './ProactiveEngine';
import MarketInsights from './MarketInsights';
import { useAIStore } from '@/store/ai-store';
import { useProactiveStore } from './ProactiveEngine';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart2, Zap, LineChart, PieChart, Target } from 'lucide-react';

// Componente que integra Tause Pro con el motor proactivo y análisis de mercado
const TauseProIntegration: React.FC = () => {
  const { messages, suggestions } = useAIStore();
  const { userContext } = useProactiveStore();
  const [showInsights, setShowInsights] = React.useState(false);
  const [selectedRegion, setSelectedRegion] = React.useState('bogota');
  const [activeTab, setActiveTab] = React.useState('insights');
  
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
      'datos', 'consumidor', 'comportamiento', 'ventas', 'crecimiento', 'campaña', 'campañas',
      'marketing', 'digital', 'redes sociales', 'publicidad', 'roi', 'conversión', 'conversiones'
    ];
    
    if (marketKeywords.some(keyword => content.includes(keyword))) {
      setShowInsights(true);
    }
  }, [messages]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Columna principal con Tause Pro */}
      <div className="md:col-span-2">
        {/* Motor proactivo (sin renderizado visible) */}
        <ProactiveEngine />
        
        {/* Asistente Tause Pro */}
        <TauseProAssistant />
      </div>
      
      {/* Columna lateral con insights y análisis */}
      <AnimatePresence>
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="insights" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Insights
                </TabsTrigger>
                <TabsTrigger value="metrics" className="text-xs">
                  <BarChart2 className="w-3 h-3 mr-1" />
                  Métricas
                </TabsTrigger>
                <TabsTrigger value="opportunities" className="text-xs">
                  <Target className="w-3 h-3 mr-1" />
                  Oportunidades
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="insights" className="mt-0">
                <MarketInsights region={selectedRegion} />
              </TabsContent>
              
              <TabsContent value="metrics" className="mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <LineChart className="w-4 h-4 mr-2 text-blue-500" />
                    Métricas de Rendimiento
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-xs text-blue-600 dark:text-blue-400">CTR Promedio</p>
                      <p className="text-xl font-bold">3.2%</p>
                      <p className="text-xs text-green-600 dark:text-green-400">+0.5% vs mes anterior</p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-xs text-green-600 dark:text-green-400">Tasa de Conversión</p>
                      <p className="text-xl font-bold">2.8%</p>
                      <p className="text-xs text-green-600 dark:text-green-400">+0.3% vs mes anterior</p>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                      <p className="text-xs text-purple-600 dark:text-purple-400">CPA</p>
                      <p className="text-xl font-bold">$12.50</p>
                      <p className="text-xs text-red-600 dark:text-red-400">+$0.75 vs mes anterior</p>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                      <p className="text-xs text-amber-600 dark:text-amber-400">ROI</p>
                      <p className="text-xl font-bold">245%</p>
                      <p className="text-xs text-green-600 dark:text-green-400">+15% vs mes anterior</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <PieChart className="w-3 h-3 mr-1 text-purple-500" />
                      Distribución de Conversiones
                    </h4>
                    <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Gráfico de distribución</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="opportunities" className="mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-amber-500" />
                    Oportunidades Detectadas
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-700 dark:text-blue-400">Optimización de Segmentación</h4>
                      <p className="text-sm mt-1">Refinar la segmentación por edad podría mejorar el CTR en un 18% según datos históricos.</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-green-700 dark:text-green-400">Nuevos Canales</h4>
                      <p className="text-sm mt-1">El público objetivo muestra alta actividad en TikTok, representa una oportunidad de expansión.</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                      <h4 className="font-medium text-amber-700 dark:text-amber-400">Próxima Temporada</h4>
                      <p className="text-sm mt-1">Preparar campaña para temporada escolar podría generar un incremento del 25% en ventas.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TauseProIntegration;
