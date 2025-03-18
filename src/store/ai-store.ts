import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Suggestion, AIContext } from '@/types/ai';

interface AIState {
  messages: Message[];
  suggestions: Suggestion[];
  isTyping: boolean;
  conversationHistory: Record<string, Message[]>;
  context: AIContext;
  
  // Acciones
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setIsTyping: (isTyping: boolean) => void;
  dismissSuggestion: (id: string) => void;
  saveSuggestion: (id: string) => void;
  updateContext: (context: Partial<AIContext>) => void;
  setMessages: (messages: Message[]) => void;
  setSuggestions: (suggestions: Suggestion[]) => void;
}

export const useAIStore = create<AIState>()(
  persist(
    (set) => ({
      messages: [],
      suggestions: [],
      isTyping: false,
      conversationHistory: {},
      context: {
        region: 'Colombia',
        preferences: {}
      },
      
      addMessage: (message) => 
        set((state) => ({ 
          messages: [...state.messages, message] 
        })),
        
      clearMessages: () => 
        set({ messages: [] }),
        
      setIsTyping: (isTyping) => 
        set({ isTyping }),
        
      dismissSuggestion: (id) =>
        set((state) => ({
          suggestions: state.suggestions.filter(s => s.id !== id)
        })),
        
      saveSuggestion: (id) =>
        set((state) => {
          // Aquí podríamos guardar la sugerencia en la base de datos
          // Por ahora solo la marcamos como guardada en el estado local
          return {
            suggestions: state.suggestions.map(s => 
              s.id === id ? { ...s, metadata: { ...s.metadata, saved: true } } : s
            )
          };
        }),
        
      updateContext: (contextUpdate) =>
        set((state) => ({
          context: { ...state.context, ...contextUpdate }
        })),
        
      setMessages: (messages) =>
        set({ messages }),
        
      setSuggestions: (suggestions) =>
        set({ suggestions }),
    }),
    {
      name: 'tausepro-storage',
    }
  )
);
