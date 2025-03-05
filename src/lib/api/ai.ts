import { apiClient } from "./client";

export interface AIResponse {
  content: string;
  confidence: number;
  type: "text" | "image" | "suggestion";
}

export interface AIRequest {
  prompt: string;
  context?: Record<string, any>;
  type?: "text" | "image" | "suggestion";
  style?: "modern" | "minimal" | "corporate" | "playful";
  format?: "social" | "banner" | "logo" | "icon";
  dimensions?: { width: number; height: number };
}

export const aiService = {
  generateContent: async (data: AIRequest): Promise<AIResponse> => {
    // TODO: Reemplazar con llamada real a la API
    // const response = await apiClient.post('/ai/generate', data);
    // return response.data;

    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          content: `Respuesta generada para: ${data.prompt}`,
          confidence: 0.85,
          type: data.type || "text",
        });
      }, 1000);
    });
  },

  generateImage: async (
    prompt: string,
    options?: {
      style?: string;
      format?: string;
      dimensions?: { width: number; height: number };
    },
  ): Promise<string> => {
    // TODO: Reemplazar con llamada real a la API
    // const response = await apiClient.post('/ai/image', { prompt, ...options });
    // return response.data.url;

    // Mock responses basadas en el estilo
    const mockImages = {
      modern:
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
      minimal:
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
      corporate:
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
      playful:
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockImages[options?.style || "modern"]);
      }, 1500);
    });
  },

  getSuggestions: async (
    context: Record<string, any>,
  ): Promise<AIResponse[]> => {
    // TODO: Reemplazar con llamada real a la API
    // const response = await apiClient.post('/ai/suggestions', { context });
    // return response.data;

    // Mock responses
    return [
      {
        content: "Considera usar más contenido visual",
        confidence: 0.92,
        type: "suggestion",
      },
      {
        content: "El tono podría ser más conversacional",
        confidence: 0.85,
        type: "suggestion",
      },
    ];
  },
};
