import { RegionData, MarketTrend, BusinessOpportunity, ProactiveAnalysis, ConsumerTrend } from "../types/market";

/**
 * Servicio de datos de mercado colombiano
 * Proporciona información sobre regiones, tendencias y oportunidades
 * adaptadas al contexto colombiano
 */
class MarketDataService {
  // Datos de regiones colombianas con información actualizada
  private regions: Record<string, RegionData> = {
    "BOG": {
      id: "BOG",
      name: "Bogotá",
      population: 7.4,
      gdpGrowth: 3.8,
      topIndustries: ["Tecnología", "Servicios financieros", "Comercio"],
      consumerProfile: {
        ageGroups: ["25-34", "35-44"],
        interests: ["Tecnología", "Gastronomía", "Entretenimiento"],
        spendingHabits: ["Compras online", "Suscripciones digitales", "Experiencias"]
      },
      topTrends: [
        {
          id: "BOG-T1",
          name: "Comercio electrónico",
          growthRate: 24.5,
          confidence: 0.92,
          relevantIndustries: ["Retail", "Tecnología", "Logística"],
          regions: ["BOG"],
          insightSummary: "El comercio electrónico en Bogotá ha experimentado un crecimiento acelerado, con un aumento significativo en la adopción de plataformas locales y modelos de entrega rápida."
        },
        {
          id: "BOG-T2",
          name: "Servicios de streaming",
          growthRate: 18.7,
          confidence: 0.89,
          relevantIndustries: ["Entretenimiento", "Tecnología", "Telecomunicaciones"],
          regions: ["BOG"],
          insightSummary: "Los bogotanos lideran el consumo de contenido en streaming en Colombia, con preferencia por producciones locales y regionales."
        },
        {
          id: "BOG-T3",
          name: "Fintech y pagos digitales",
          growthRate: 32.1,
          confidence: 0.94,
          relevantIndustries: ["Finanzas", "Tecnología", "Banca"],
          regions: ["BOG"],
          insightSummary: "Las soluciones fintech están transformando rápidamente el panorama financiero en Bogotá, con un aumento en la adopción de billeteras digitales y servicios bancarios alternativos."
        }
      ]
    },
    "MED": {
      id: "MED",
      name: "Medellín",
      population: 2.5,
      gdpGrowth: 4.2,
      topIndustries: ["Textil", "Tecnología", "Turismo"],
      consumerProfile: {
        ageGroups: ["18-24", "25-34"],
        interests: ["Moda", "Turismo", "Tecnología"],
        spendingHabits: ["Experiencias", "Moda sostenible", "Gastronomía"]
      },
      topTrends: [
        {
          id: "MED-T1",
          name: "Moda sostenible",
          growthRate: 16.8,
          confidence: 0.87,
          relevantIndustries: ["Textil", "Retail", "Diseño"],
          regions: ["MED"],
          insightSummary: "Medellín se posiciona como líder en la industria de moda sostenible en Colombia, con un creciente número de diseñadores y marcas enfocadas en prácticas responsables."
        },
        {
          id: "MED-T2",
          name: "Turismo experiencial",
          growthRate: 22.4,
          confidence: 0.91,
          relevantIndustries: ["Turismo", "Entretenimiento", "Gastronomía"],
          regions: ["MED"],
          insightSummary: "El turismo experiencial en Medellín ha crecido significativamente, con visitantes buscando experiencias auténticas relacionadas con la transformación social y cultural de la ciudad."
        }
      ]
    },
    "CAL": {
      id: "CAL",
      name: "Cali",
      population: 2.2,
      gdpGrowth: 3.6,
      topIndustries: ["Agroindustria", "Entretenimiento", "Manufactura"],
      consumerProfile: {
        ageGroups: ["25-34", "35-44"],
        interests: ["Gastronomía", "Música", "Deportes"],
        spendingHabits: ["Productos locales", "Entretenimiento", "Gastronomía"]
      },
      topTrends: [
        {
          id: "CAL-T1",
          name: "Productos orgánicos",
          growthRate: 14.2,
          confidence: 0.85,
          relevantIndustries: ["Agroindustria", "Alimentos", "Retail"],
          regions: ["CAL"],
          insightSummary: "Cali está experimentando un aumento en la demanda de productos orgánicos y sostenibles, impulsado por consumidores más conscientes de la salud y el medio ambiente."
        },
        {
          id: "CAL-T2",
          name: "Entretenimiento digital",
          growthRate: 20.8,
          confidence: 0.89,
          relevantIndustries: ["Entretenimiento", "Tecnología", "Medios"],
          regions: ["CAL"],
          insightSummary: "El sector de entretenimiento digital en Cali está creciendo rápidamente, con un enfoque en contenido local y experiencias inmersivas."
        }
      ]
    },
    "BAR": {
      id: "BAR",
      name: "Barranquilla",
      population: 1.2,
      gdpGrowth: 4.1,
      topIndustries: ["Logística portuaria", "Turismo", "Energías renovables"],
      consumerProfile: {
        ageGroups: ["25-34", "45-54"],
        interests: ["Turismo", "Deportes acuáticos", "Gastronomía"],
        spendingHabits: ["Turismo local", "Compras online", "Entretenimiento"]
      },
      topTrends: [
        {
          id: "BAR-T1",
          name: "Turismo de cruceros",
          growthRate: 18.3,
          confidence: 0.84,
          relevantIndustries: ["Turismo", "Logística", "Hospitalidad"],
          regions: ["BAR"],
          insightSummary: "Barranquilla está aprovechando su ubicación estratégica para desarrollar el turismo de cruceros, con un aumento en la infraestructura portuaria y servicios relacionados."
        },
        {
          id: "BAR-T2",
          name: "Comercio electrónico",
          growthRate: 22.1,
          confidence: 0.86,
          relevantIndustries: ["Retail", "Logística", "Tecnología"],
          regions: ["BAR"],
          insightSummary: "El comercio electrónico en Barranquilla ha experimentado un crecimiento acelerado, impulsado por la mejora en la infraestructura logística y la adopción digital."
        }
      ]
    }
  };

  // Tendencias de mercado colombiano
  private trends: MarketTrend[] = [
    {
      id: "TREND-1",
      name: "Revalorización de lo colombiano",
      description: "Las marcas que destacan ingredientes, materiales y talento local están ganando preferencia entre consumidores urbanos de 25-45 años.",
      growthRate: 18.5,
      regions: ["BOG", "MED", "CAL", "BAR"],
      confidence: 0.92
    },
    {
      id: "TREND-2",
      name: "Comercio electrónico móvil",
      description: "Las compras a través de dispositivos móviles están creciendo a un ritmo acelerado, especialmente en categorías de moda, tecnología y alimentación.",
      growthRate: 32.7,
      regions: ["BOG", "MED"],
      confidence: 0.88
    },
    {
      id: "TREND-3",
      name: "Sostenibilidad como diferenciador",
      description: "Los consumidores colombianos están dispuestos a pagar hasta un 15% más por productos que demuestren compromiso con la sostenibilidad ambiental.",
      growthRate: 22.3,
      regions: ["BOG", "MED"],
      confidence: 0.85
    },
    {
      id: "TREND-4",
      name: "Experiencias sobre productos",
      description: "El gasto en experiencias (viajes, gastronomía, entretenimiento) está creciendo más rápido que el gasto en bienes físicos.",
      growthRate: 16.8,
      regions: ["MED", "CAL", "BAR"],
      confidence: 0.78
    }
  ];

  // Oportunidades de negocio
  private opportunities: BusinessOpportunity[] = [
    {
      id: "OPP-1",
      title: "Desarrollo de soluciones fintech para pequeñas empresas",
      description: "Las pequeñas empresas en Colombia necesitan soluciones financieras adaptadas a sus necesidades específicas y con bajas barreras de entrada.",
      region: "BOG",
      industry: "Tecnología",
      potentialROI: 22.5,
      confidence: 0.87
    },
    {
      id: "OPP-2",
      title: "Moda sostenible con materiales locales",
      description: "Existe una creciente demanda de moda ética y sostenible que utilice materiales y técnicas artesanales colombianas.",
      region: "MED",
      industry: "Textil",
      potentialROI: 18.2,
      confidence: 0.82
    },
    {
      id: "OPP-3",
      title: "Exportación de productos orgánicos certificados",
      description: "El mercado internacional valora cada vez más los productos orgánicos colombianos, especialmente en categorías como café, cacao y frutas exóticas.",
      region: "CAL",
      industry: "Agroindustria",
      potentialROI: 21.3,
      confidence: 0.79
    },
    {
      id: "OPP-4",
      title: "Soluciones de energía solar para zonas costeras",
      description: "Las zonas costeras colombianas tienen un gran potencial para la implementación de energía solar, con alta radiación y demanda creciente.",
      region: "BAR",
      industry: "Energías renovables",
      potentialROI: 25.7,
      confidence: 0.84
    }
  ];

  /**
   * Obtiene datos de una región específica
   * @param regionCode Código de la región (BOG, MED, CAL, BAR)
   * @returns Datos de la región o null si no existe
   */
  public getRegionData(regionCode: string): RegionData | null {
    return this.regions[regionCode] || null;
  }

  /**
   * Obtiene todas las regiones disponibles
   * @returns Array con todas las regiones
   */
  public getAllRegions(): RegionData[] {
    return Object.values(this.regions);
  }

  /**
   * Obtiene los códigos de todas las regiones
   * @returns Array con los códigos de regiones
   */
  public getRegionCodes(): string[] {
    return Object.keys(this.regions);
  }

  /**
   * Obtiene todas las tendencias de mercado
   * @returns Array con todas las tendencias
   */
  public getAllTrends(): MarketTrend[] {
    return this.trends;
  }

  /**
   * Obtiene tendencias específicas para una región
   * @param regionCode Código de la región
   * @returns Array con tendencias relevantes para la región
   */
  public getTrendsForRegion(regionCode: string): MarketTrend[] {
    return this.trends.filter(trend => 
      trend.regions.includes(regionCode)
    );
  }

  /**
   * Obtiene todas las oportunidades de negocio
   * @returns Array con todas las oportunidades
   */
  public getAllOpportunities(): BusinessOpportunity[] {
    return this.opportunities;
  }

  /**
   * Obtiene oportunidades específicas para una región
   * @param regionCode Código de la región
   * @returns Array con oportunidades para la región
   */
  public getOpportunitiesForRegion(regionCode: string): BusinessOpportunity[] {
    return this.opportunities.filter(opp => opp.region === regionCode);
  }

  /**
   * Obtiene oportunidades específicas para una industria
   * @param industry Nombre de la industria
   * @returns Array con oportunidades para la industria
   */
  public getOpportunitiesForIndustry(industry: string): BusinessOpportunity[] {
    return this.opportunities.filter(opp => opp.industry === industry);
  }

  /**
   * Genera recomendaciones personalizadas basadas en una región
   * @param regionCode Código de la región
   * @returns Array de recomendaciones en formato texto
   */
  public generateRecommendations(regionCode: string): string[] {
    const region = this.getRegionData(regionCode);
    const trends = this.getTrendsForRegion(regionCode);
    const opportunities = this.getOpportunitiesForRegion(regionCode);
    
    if (!region) return [];
    
    return [
      `Adapta tu comunicación al contexto cultural de ${region.name}.`,
      `Considera las tendencias como ${trends[0]?.name || 'comercio electrónico'} en tu estrategia.`,
      `Explora oportunidades en sectores clave como ${region.topIndustries[0] || 'tecnología'}.`,
      `Analiza el potencial de crecimiento del ${region.gdpGrowth}% en esta región.`,
      opportunities[0] ? `Evalúa oportunidades como: ${opportunities[0].title}` : ''
    ].filter(Boolean);
  }

  /**
   * Genera un análisis proactivo basado en datos de región y tendencias
   * @param regionCode Código de la región
   * @returns Objeto con análisis proactivo completo
   */
  public generateProactiveAnalysis(regionCode: string): ProactiveAnalysis {
    const region = this.getRegionData(regionCode);
    const trends = this.getTrendsForRegion(regionCode);
    const opportunities = this.getOpportunitiesForRegion(regionCode);
    
    if (!region || trends.length === 0) {
      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        insights: ["No hay suficientes datos para generar un análisis completo."],
        recommendations: ["Considera explorar otras regiones con más datos disponibles."],
        confidence: 0.5
      };
    }
    
    // Calcular nivel de confianza promedio
    const confidenceValues = [
      ...trends.map(t => t.confidence),
      ...opportunities.map(o => o.confidence)
    ];
    const avgConfidence = confidenceValues.length > 0 
      ? confidenceValues.reduce((sum, val) => sum + val, 0) / confidenceValues.length 
      : 0.7;
    
    return {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      insights: [
        `${region.name} muestra un crecimiento del ${region.gdpGrowth}% con enfoque en ${region.topIndustries.join(', ')}.`,
        `Las tendencias principales incluyen ${trends.map(t => t.name).join(', ')}.`,
        `El potencial de mercado es de aproximadamente ${(region.population * 0.8).toFixed(1)} millones de consumidores.`
      ],
      recommendations: [
        `Adapta tu estrategia para aprovechar el crecimiento en ${trends[0]?.name || 'comercio electrónico'}.`,
        `Considera expandir tu presencia en ${region.name} enfocándote en ${region.topIndustries[0]}.`,
        opportunities[0] ? `Explora la oportunidad: ${opportunities[0].title}` : 'Busca alianzas con empresas locales para aumentar tu relevancia.',
        `Desarrolla contenido que resuene con la cultura local de ${region.name}.`
      ],
      confidence: avgConfidence
    };
  }
}

// Exportar una instancia única del servicio
const marketDataService = new MarketDataService();
export default marketDataService;
