import { useEffect, useState } from 'react';
import { useAIStore } from '@/store/ai-store';
import { Message, Suggestion, SuggestionType } from '@/types/ai';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipos para el motor proactivo
interface UserContext {
  recentTopics: string[];
  interests: string[];
  industry?: string;
  region?: string;
  lastActivity: Date;
  interactionCount: number;
}

interface ProactiveState {
  userContext: UserContext;
  conversationHistory: {
    topic: string;
    frequency: number;
    lastDiscussed: Date;
  }[];
  updateUserContext: (context: Partial<UserContext>) => void;
  addToConversationHistory: (topic: string) => void;
  resetContext: () => void;
}

// Store para el motor proactivo
export const useProactiveStore = create<ProactiveState>()(
  persist(
    (set) => ({
      userContext: {
        recentTopics: [],
        interests: [],
        lastActivity: new Date(),
        interactionCount: 0,
      },
      conversationHistory: [],
      updateUserContext: (context) => 
        set((state) => ({
          userContext: { ...state.userContext, ...context },
        })),
      addToConversationHistory: (topic) =>
        set((state) => {
          const existingTopic = state.conversationHistory.find(
            (t) => t.topic.toLowerCase() === topic.toLowerCase()
          );

          if (existingTopic) {
            return {
              conversationHistory: state.conversationHistory.map((t) =>
                t.topic.toLowerCase() === topic.toLowerCase()
                  ? { ...t, frequency: t.frequency + 1, lastDiscussed: new Date() }
                  : t
              ),
            };
          } else {
            return {
              conversationHistory: [
                ...state.conversationHistory,
                { topic, frequency: 1, lastDiscussed: new Date() },
              ],
            };
          }
        }),
      resetContext: () =>
        set({
          userContext: {
            recentTopics: [],
            interests: [],
            lastActivity: new Date(),
            interactionCount: 0,
          },
          conversationHistory: [],
        }),
    }),
    {
      name: 'tausepro-proactive-storage',
    }
  )
);

// Palabras clave del mercado colombiano para análisis de contexto
const colombianMarketKeywords = {
  regions: [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
    'Cundinamarca', 'Antioquia', 'Valle del Cauca', 'Atlántico', 'Bolívar',
    'Santander', 'Bucaramanga', 'Eje Cafetero', 'Caribe', 'Pacífico', 'Andina'
  ],
  industries: [
    'tecnología', 'café', 'moda', 'turismo', 'alimentos', 'belleza', 
    'construcción', 'educación', 'salud', 'fintech', 'retail', 'ecommerce'
  ],
  events: [
    'Día de la Madre', 'Día del Padre', 'Amor y Amistad', 'Navidad', 
    'Black Friday', 'CyberLunes', 'Día sin IVA', 'Colombiamoda'
  ],
  trends: [
    'sostenibilidad', 'local', 'artesanal', 'digital', 'emprendimiento',
    'innovación', 'experiencia', 'personalización', 'inclusión'
  ]
};

// Función para extraer temas de un mensaje
const extractTopics = (message: string): string[] => {
  const topics: string[] = [];
  
  // Extraer regiones
  colombianMarketKeywords.regions.forEach(region => {
    if (message.toLowerCase().includes(region.toLowerCase())) {
      topics.push(region);
    }
  });
  
  // Extraer industrias
  colombianMarketKeywords.industries.forEach(industry => {
    if (message.toLowerCase().includes(industry.toLowerCase())) {
      topics.push(industry);
    }
  });
  
  // Extraer eventos
  colombianMarketKeywords.events.forEach(event => {
    if (message.toLowerCase().includes(event.toLowerCase())) {
      topics.push(event);
    }
  });
  
  // Extraer tendencias
  colombianMarketKeywords.trends.forEach(trend => {
    if (message.toLowerCase().includes(trend.toLowerCase())) {
      topics.push(trend);
    }
  });
  
  return [...new Set(topics)]; // Eliminar duplicados
};

// Función para generar sugerencias proactivas basadas en el contexto
const generateProactiveSuggestions = (
  userContext: UserContext,
  conversationHistory: ProactiveState['conversationHistory'],
  currentMessages: Message[]
): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  const currentDate = new Date();
  
  // Extraer temas de los últimos mensajes
  const lastUserMessage = currentMessages.filter(m => m.role === 'user').pop();
  const recentTopics = lastUserMessage ? extractTopics(lastUserMessage.content) : [];
  
  // Sugerencia basada en región si se detecta en la conversación
  const detectedRegion = recentTopics.find(topic => 
    colombianMarketKeywords.regions.includes(topic)
  );
  
  if (detectedRegion) {
    suggestions.push({
      id: `region-${Date.now()}`,
      type: 'regional',
      title: `Análisis de mercado: ${detectedRegion}`,
      description: `Obten datos específicos sobre comportamiento del consumidor, competencia y oportunidades en ${detectedRegion}.`,
      action: 'Ver análisis',
      tags: [detectedRegion, 'Mercado local', 'Análisis'],
    });
  }
  
  // Sugerencia basada en industria si se detecta en la conversación
  const detectedIndustry = recentTopics.find(topic => 
    colombianMarketKeywords.industries.includes(topic)
  );
  
  if (detectedIndustry) {
    suggestions.push({
      id: `industry-${Date.now()}`,
      type: 'trend',
      title: `Tendencias en ${detectedIndustry}`,
      description: `Descubre las últimas tendencias y oportunidades en el sector de ${detectedIndustry} en el mercado colombiano.`,
      action: 'Explorar tendencias',
      tags: [detectedIndustry, 'Tendencias', 'Sector'],
    });
  }
  
  // Sugerencia basada en próximos eventos relevantes
  const upcomingEvents = getUpcomingEvents(currentDate);
  if (upcomingEvents.length > 0) {
    const nextEvent = upcomingEvents[0];
    suggestions.push({
      id: `event-${Date.now()}`,
      type: 'date',
      title: `Próximo evento: ${nextEvent.name}`,
      description: `Prepárate para ${nextEvent.name} (${nextEvent.date}). Este evento representa una oportunidad de crecimiento del ${nextEvent.growthPotential}% en ventas.`,
      action: 'Planificar campaña',
      tags: [nextEvent.name, 'Calendario', 'Oportunidad'],
    });
  }
  
  // Sugerencia basada en oportunidades de optimización
  if (userContext.interactionCount > 5) {
    suggestions.push({
      id: `optimization-${Date.now()}`,
      type: 'optimization',
      title: 'Optimización personalizada',
      description: 'Basado en tu historial de interacciones, hemos identificado oportunidades para mejorar tu estrategia de marketing digital.',
      action: 'Ver recomendaciones',
      tags: ['Optimización', 'Personalizado', 'Estrategia'],
    });
  }
  
  // Limitar a 3 sugerencias máximo
  return suggestions.slice(0, 3);
};

// Función para obtener próximos eventos relevantes
const getUpcomingEvents = (currentDate: Date) => {
  // Fechas importantes en Colombia (simplificado)
  const events = [
    { name: 'Día de la Madre', date: '2025-05-11', growthPotential: 35 },
    { name: 'Día del Padre', date: '2025-06-15', growthPotential: 28 },
    { name: 'Día sin IVA', date: '2025-07-11', growthPotential: 45 },
    { name: 'Amor y Amistad', date: '2025-09-20', growthPotential: 25 },
    { name: 'Black Friday', date: '2025-11-28', growthPotential: 50 },
    { name: 'Navidad', date: '2025-12-25', growthPotential: 60 }
  ];
  
  // Convertir fechas de string a Date
  const eventsWithDates = events.map(event => ({
    ...event,
    dateObj: new Date(event.date)
  }));
  
  // Filtrar eventos futuros y ordenar por proximidad
  return eventsWithDates
    .filter(event => event.dateObj > currentDate)
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .map(({ name, date, growthPotential }) => ({ name, date, growthPotential }));
};

// Componente principal del motor proactivo
const ProactiveEngine = () => {
  const { messages, suggestions, setSuggestions } = useAIStore();
  const { 
    userContext, 
    conversationHistory, 
    updateUserContext, 
    addToConversationHistory 
  } = useProactiveStore();
  
  // Actualizar contexto cuando cambian los mensajes
  useEffect(() => {
    if (messages.length === 0) return;
    
    // Obtener el último mensaje del usuario
    const lastUserMessage = [...messages]
      .reverse()
      .find(m => m.role === 'user');
      
    if (lastUserMessage) {
      // Extraer temas del mensaje
      const topics = extractTopics(lastUserMessage.content);
      
      // Actualizar contexto del usuario
      updateUserContext({
        recentTopics: [...new Set([...userContext.recentTopics, ...topics])].slice(-5),
        lastActivity: new Date(),
        interactionCount: userContext.interactionCount + 1
      });
      
      // Actualizar historial de conversación
      topics.forEach(topic => {
        addToConversationHistory(topic);
      });
      
      // Generar sugerencias proactivas
      const newSuggestions = generateProactiveSuggestions(
        userContext,
        conversationHistory,
        messages
      );
      
      // Actualizar sugerencias en el store
      if (newSuggestions.length > 0) {
        setSuggestions(newSuggestions);
      }
    }
  }, [messages]);
  
  // Este componente no renderiza nada, solo maneja la lógica
  return null;
};

export default ProactiveEngine;
