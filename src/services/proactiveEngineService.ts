import { Message, Suggestion, AIContext } from '@/types/ai';
import { MarketTrend, ProactiveAnalysis, RegionData, BusinessOpportunity } from '@/types/market';
import marketDataService from './marketDataService';

// Palabras clave para detectar intenciones del usuario
const INTENT_KEYWORDS = {
  region: {
    BOG: ['bogotá', 'bogota', 'capital', 'cundinamarca'],
    MED: ['medellín', 'medellin', 'antioquia', 'paisa'],
    CAL: ['cali', 'valle del cauca', 'valluno'],
    BAR: ['barranquilla', 'atlántico', 'costa caribe', 'costa atlántica']
  },
  industry: {
    tecnologia: ['tecnología', 'tecnologia', 'software', 'apps', 'aplicaciones', 'digital', 'tech'],
    comercio: ['comercio', 'retail', 'tiendas', 'ventas', 'ecommerce', 'e-commerce'],
    turismo: ['turismo', 'viajes', 'hoteles', 'turístico', 'turistico', 'viajeros'],
    agroindustria: ['agroindustria', 'agricultura', 'agro', 'cultivos', 'alimentos']
  },
  action: {
    analyze: ['analizar', 'análisis', 'analisis', 'estudiar', 'investigar', 'entender'],
    compare: ['comparar', 'comparación', 'comparacion', 'contrastar', 'versus', 'vs'],
    recommend: ['recomendar', 'recomendación', 'recomendacion', 'sugerir', 'sugerencia', 'aconsejar'],
    forecast: ['pronosticar', 'pronóstico', 'pronostico', 'predecir', 'predicción', 'prediccion', 'tendencia']
  }
};

// Servicio del motor proactivo
class ProactiveEngineServiceClass {
  // Analizar mensajes para detectar intenciones
  analyzeUserIntent(messages: Message[]): { 
    regions: string[], 
    industries: string[], 
    actions: string[] 
  } {
    // Solo analizamos los últimos 5 mensajes para mantener relevancia
    const recentMessages = messages.slice(-5);
    const combinedText = recentMessages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content.toLowerCase())
      .join(' ');
    
    // Detectar regiones mencionadas
    const regions = Object.entries(INTENT_KEYWORDS.region)
      .filter(([_, keywords]) => 
        keywords.some(keyword => combinedText.includes(keyword))
      )
      .map(([code]) => code);
    
    // Detectar industrias mencionadas
    const industries = Object.entries(INTENT_KEYWORDS.industry)
      .filter(([_, keywords]) => 
        keywords.some(keyword => combinedText.includes(keyword))
      )
      .map(([code]) => code);
    
    // Detectar acciones mencionadas
    const actions = Object.entries(INTENT_KEYWORDS.action)
      .filter(([_, keywords]) => 
        keywords.some(keyword => combinedText.includes(keyword))
      )
      .map(([code]) => code);
    
    return { regions, industries, actions };
  }
  
  // Generar sugerencias basadas en el contexto y mensajes
  generateProactiveSuggestions(
    context: AIContext,
    messages: Message[]
  ): Suggestion[] {
    const userIntent = this.analyzeUserIntent(messages);
    const suggestions: Suggestion[] = [];
    
    // Si no hay regiones detectadas, usar la del contexto o default
    const targetRegions = userIntent.regions.length > 0 
      ? userIntent.regions 
      : [(context.region || 'BOG')];
    
    // Obtener tendencias relevantes para las regiones detectadas
    targetRegions.forEach(regionCode => {
      const regionData = marketDataService.getRegionData(regionCode);
      if (!regionData) return;
      
      // Añadir sugerencia sobre la región
      suggestions.push({
        id: `region-${regionCode}-${Date.now()}`,
        type: 'regional',
        title: `Análisis de ${regionData.name}`,
        description: `${regionData.name} tiene una población de ${regionData.population} millones con un crecimiento del PIB de ${regionData.gdpGrowth}%. Las industrias principales incluyen ${regionData.topIndustries.slice(0, 3).join(', ')}.`,
        action: `Explorar oportunidades en ${regionData.name}`,
        tags: ['regional', regionCode, 'análisis']
      });
      
      // Añadir tendencias de consumo destacadas
      if (regionData.topTrends && regionData.topTrends.length > 0) {
        const topTrend = regionData.topTrends[0];
        suggestions.push({
          id: `trend-${regionCode}-${Date.now()}`,
          type: 'trend',
          title: `Tendencia destacada: ${topTrend.name}`,
          description: `${topTrend.name} está creciendo a un ${topTrend.growthRate}% anual en ${regionData.name}, con un nivel de confianza del ${Math.round(topTrend.confidence * 100)}%.`,
          action: `Analizar tendencia ${topTrend.name}`,
          tags: ['tendencia', regionCode, topTrend.name]
        });
      }
      
      // Añadir oportunidades de negocio para la región
      const opportunities = marketDataService.getOpportunitiesForRegion(regionCode);
      if (opportunities && opportunities.length > 0) {
        const topOpportunity = opportunities[0];
        suggestions.push({
          id: `opportunity-${regionCode}-${Date.now()}`,
          type: 'opportunity',
          title: `Oportunidad: ${topOpportunity.title}`,
          description: `${topOpportunity.description} ROI potencial: ${topOpportunity.potentialROI}%.`,
          action: `Explorar oportunidad`,
          tags: ['oportunidad', regionCode, topOpportunity.industry]
        });
      }
    });
    
    // Añadir tendencias generales del mercado colombiano si no hay muchas sugerencias específicas
    if (suggestions.length < 3) {
      const topMarketTrends = marketDataService.getAllTrends()
        .sort((a, b) => b.growthRate - a.growthRate)
        .slice(0, 2);
      
      topMarketTrends.forEach(trend => {
        suggestions.push({
          id: `market-trend-${trend.id}-${Date.now()}`,
          type: 'trend',
          title: trend.name,
          description: `${trend.description}. Crecimiento anual del ${trend.growthRate}%.`,
          action: `Analizar tendencia ${trend.name}`,
          tags: ['tendencia', 'mercado', 'colombia']
        });
      });
    }
    
    // Añadir sugerencias de optimización basadas en acciones detectadas
    if (userIntent.actions.includes('analyze') || userIntent.actions.includes('recommend')) {
      suggestions.push({
        id: `optimization-${Date.now()}`,
        type: 'optimization',
        title: 'Optimización de estrategia',
        description: 'Te puedo ayudar a optimizar tu estrategia de marketing basada en datos actualizados del mercado colombiano.',
        action: 'Optimizar estrategia',
        tags: ['optimización', 'estrategia', 'marketing']
      });
    }
    
    // Limitar a máximo 4 sugerencias para no sobrecargar la interfaz
    return suggestions.slice(0, 4);
  }
  
  // Generar un análisis proactivo basado en el contexto y mensajes
  generateProactiveAnalysis(
    context: AIContext,
    messages: Message[]
  ): ProactiveAnalysis {
    const userIntent = this.analyzeUserIntent(messages);
    
    // Determinar la región objetivo
    const targetRegion = userIntent.regions.length > 0 
      ? userIntent.regions[0] 
      : (context.region || 'BOG');
    
    // Obtener análisis proactivo del servicio de datos de mercado
    return marketDataService.generateProactiveAnalysis(targetRegion);
  }
}

// Exportar una instancia única del servicio
const proactiveEngineService = new ProactiveEngineServiceClass();
export default proactiveEngineService;
