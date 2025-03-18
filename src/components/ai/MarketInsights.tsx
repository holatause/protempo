import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShoppingBag, Calendar, MapPin } from 'lucide-react';

// Datos del mercado colombiano por región
const regionalData = {
  bogota: {
    name: 'Bogotá',
    population: 7.4,
    gdp: 108.2,
    industries: ['Tecnología', 'Servicios', 'Finanzas', 'Educación'],
    growthRate: 3.2,
    digitalAdoption: 78,
    consumerTrends: [
      { name: 'Comercio electrónico', value: 42 },
      { name: 'Sostenibilidad', value: 28 },
      { name: 'Experiencias', value: 18 },
      { name: 'Productos locales', value: 12 }
    ]
  },
  medellin: {
    name: 'Medellín',
    population: 2.5,
    gdp: 42.7,
    industries: ['Textil', 'Tecnología', 'Turismo', 'Salud'],
    growthRate: 3.8,
    digitalAdoption: 72,
    consumerTrends: [
      { name: 'Innovación', value: 38 },
      { name: 'Moda', value: 32 },
      { name: 'Tecnología', value: 18 },
      { name: 'Cultura', value: 12 }
    ]
  },
  cali: {
    name: 'Cali',
    population: 2.2,
    gdp: 31.5,
    industries: ['Agroindustria', 'Servicios', 'Manufactura'],
    growthRate: 2.9,
    digitalAdoption: 65,
    consumerTrends: [
      { name: 'Entretenimiento', value: 35 },
      { name: 'Gastronomía', value: 30 },
      { name: 'Deportes', value: 20 },
      { name: 'Tecnología', value: 15 }
    ]
  },
  barranquilla: {
    name: 'Barranquilla',
    population: 1.2,
    gdp: 18.3,
    industries: ['Logística', 'Comercio', 'Turismo'],
    growthRate: 3.5,
    digitalAdoption: 62,
    consumerTrends: [
      { name: 'Comercio', value: 40 },
      { name: 'Cultura', value: 25 },
      { name: 'Gastronomía', value: 20 },
      { name: 'Tecnología', value: 15 }
    ]
  },
  cartagena: {
    name: 'Cartagena',
    population: 1.0,
    gdp: 15.2,
    industries: ['Turismo', 'Servicios', 'Logística'],
    growthRate: 3.1,
    digitalAdoption: 60,
    consumerTrends: [
      { name: 'Turismo', value: 45 },
      { name: 'Gastronomía', value: 25 },
      { name: 'Cultura', value: 20 },
      { name: 'Tecnología', value: 10 }
    ]
  }
};

// Datos de tendencias del mercado colombiano
const marketTrends = [
  { 
    name: 'Comercio electrónico', 
    growth: 32, 
    adoption: 68,
    opportunity: 'Alta',
    segments: [
      { name: 'Moda', value: 28 },
      { name: 'Tecnología', value: 25 },
      { name: 'Alimentos', value: 18 },
      { name: 'Hogar', value: 15 },
      { name: 'Otros', value: 14 }
    ]
  },
  { 
    name: 'Sostenibilidad', 
    growth: 24, 
    adoption: 52,
    opportunity: 'Alta',
    segments: [
      { name: 'Productos eco', value: 35 },
      { name: 'Empaques', value: 30 },
      { name: 'Energía', value: 20 },
      { name: 'Transporte', value: 15 }
    ]
  },
  { 
    name: 'Experiencias personalizadas', 
    growth: 28, 
    adoption: 45,
    opportunity: 'Media',
    segments: [
      { name: 'Entretenimiento', value: 40 },
      { name: 'Turismo', value: 30 },
      { name: 'Gastronomía', value: 20 },
      { name: 'Educación', value: 10 }
    ]
  },
  { 
    name: 'Productos locales', 
    growth: 18, 
    adoption: 62,
    opportunity: 'Media',
    segments: [
      { name: 'Alimentos', value: 45 },
      { name: 'Artesanías', value: 25 },
      { name: 'Moda', value: 20 },
      { name: 'Hogar', value: 10 }
    ]
  }
];

// Componente para mostrar análisis de mercado
interface MarketInsightsProps {
  region?: string;
  industry?: string;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ 
  region = 'bogota',
  industry
}) => {
  const regionData = regionalData[region as keyof typeof regionalData] || regionalData.bogota;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Análisis de Mercado: {regionData.name}
            </CardTitle>
            <Badge variant="outline" className="bg-blue-50">
              <MapPin className="h-3 w-3 mr-1" />
              Datos actualizados
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Visión General</TabsTrigger>
              <TabsTrigger value="trends">Tendencias</TabsTrigger>
              <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-700 mb-1">Población</div>
                  <div className="text-2xl font-semibold">{regionData.population}M</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-green-700 mb-1">PIB</div>
                  <div className="text-2xl font-semibold">${regionData.gdp}B</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="text-sm text-amber-700 mb-1">Crecimiento</div>
                  <div className="text-2xl font-semibold">{regionData.growthRate}%</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-sm text-purple-700 mb-1">Adopción Digital</div>
                  <div className="text-2xl font-semibold">{regionData.digitalAdoption}%</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Principales Industrias</h4>
                <div className="flex flex-wrap gap-2">
                  {regionData.industries.map((ind, index) => (
                    <Badge key={index} variant="secondary">{ind}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Tendencias del Consumidor</h4>
                <div className="h-64">
                  <PieChart 
                    data={regionData.consumerTrends}
                    colors={['#3b82f6', '#10b981', '#f59e0b', '#6366f1']}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketTrends.map((trend, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className={`h-1 ${
                      trend.opportunity === 'Alta' 
                        ? 'bg-green-500' 
                        : trend.opportunity === 'Media' 
                          ? 'bg-amber-500' 
                          : 'bg-blue-500'
                    }`} />
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{trend.name}</h3>
                        <Badge variant="outline">+{trend.growth}%</Badge>
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        Adopción: {trend.adoption}% | Oportunidad: {trend.opportunity}
                      </div>
                      <div className="h-32">
                        <BarChart 
                          data={trend.segments}
                          colors={['#3b82f6']}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="opportunities" className="space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-3">Oportunidades Estratégicas</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-green-100 p-1 rounded text-green-700 mr-2 mt-0.5">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-medium">Crecimiento en e-commerce</span>
                        <p className="text-sm text-gray-600">
                          El comercio electrónico en {regionData.name} ha crecido un 32% en el último año, 
                          con oportunidades especiales en moda y tecnología.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded text-blue-700 mr-2 mt-0.5">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-medium">Segmento joven urbano</span>
                        <p className="text-sm text-gray-600">
                          Los consumidores entre 25-35 años representan el segmento de mayor crecimiento, 
                          con preferencia por experiencias digitales integradas.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-100 p-1 rounded text-amber-700 mr-2 mt-0.5">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-medium">Temporadas clave</span>
                        <p className="text-sm text-gray-600">
                          Además de las fechas tradicionales, eventos como el Día sin IVA y Amor y Amistad 
                          (septiembre) son oportunidades únicas en Colombia.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 p-1 rounded text-purple-700 mr-2 mt-0.5">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-medium">Productos locales</span>
                        <p className="text-sm text-gray-600">
                          Las marcas que destacan ingredientes y materiales colombianos tienen un 18% más 
                          de engagement y lealtad del consumidor.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarketInsights;
