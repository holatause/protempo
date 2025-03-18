// Tipos para datos de mercado colombiano

// Perfil de consumidor por región
export interface ConsumerProfile {
  ageGroups: string[];
  interests: string[];
  spendingHabits: string[];
}

// Tendencia de consumo
export interface ConsumerTrend {
  id: string;
  name: string;
  description?: string;
  growthRate: number; // Porcentaje de crecimiento anual
  confidence: number; // Nivel de confianza (0-1)
  relevantIndustries: string[];
  regions: string[];
  relevanceScore?: number; // Puntuación de relevancia (0-1)
  insightSummary?: string; // Resumen del insight
}

// Datos de región
export interface RegionData {
  id: string;
  name: string;
  population: number; // En millones
  gdpGrowth: number; // Porcentaje
  topIndustries: string[];
  consumerProfile?: ConsumerProfile; // Perfil de consumidor
  topTrends: ConsumerTrend[];
}

// Tendencia de mercado
export interface MarketTrend {
  id: string;
  name: string;
  description: string;
  growthRate: number;
  regions: string[];
  confidence: number; // Nivel de confianza (0-1)
}

// Oportunidad de negocio
export interface BusinessOpportunity {
  id: string;
  title: string;
  description: string;
  region: string;
  industry: string;
  potentialROI: number; // Porcentaje
  confidence: number; // Nivel de confianza (0-1)
}

// Análisis proactivo
export interface ProactiveAnalysis {
  id?: string;
  timestamp?: string;
  regionCode?: string;
  industry?: string;
  insights: string[];
  recommendations: string[];
  confidence: number; // Nivel de confianza (0-1)
  contextualData?: any; // Datos contextuales adicionales
}
