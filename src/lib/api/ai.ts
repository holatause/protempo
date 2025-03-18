import { apiClient } from "./client";

// API Key de Recraft.ai
const RECRAFT_API_KEY = "dpNWylGpjK1ZCixb6xT8Vatn7vanQqVek8LMGry0S4JyZRnSQ7kNRh6VNncDCjJL";
const RECRAFT_API_URL = "https://api.recraft.ai";

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

// Interfaces específicas para Recraft.ai
export interface RecraftGenerateRequest {
  prompt: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  style?: string;
  num_images?: number;
  guidance_scale?: number;
}

export interface RecraftGenerateResponse {
  id: string;
  images: string[];
  status: string;
}

export interface RecraftDesignTemplate {
  id: string;
  name: string;
  category: string;
  tags: string[];
  previewUrl: string;
  dimensions: { width: number; height: number };
}

export interface RecraftDesignElement {
  id: string;
  type: "shape" | "text" | "image" | "group";
  properties: Record<string, any>;
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

  // Integración con Recraft.ai para generación de imágenes
  generateImage: async (
    prompt: string,
    options?: {
      style?: string;
      format?: string;
      dimensions?: { width: number; height: number };
    },
  ): Promise<string> => {
    try {
      const width = options?.dimensions?.width || 1024;
      const height = options?.dimensions?.height || 1024;
      const style = options?.style || "modern";
      
      const response = await fetch(`${RECRAFT_API_URL}/v1/generation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RECRAFT_API_KEY}`
        },
        body: JSON.stringify({
          prompt: `${prompt}, ${style} style, high quality, ${options?.format || "social media"} design`,
          negative_prompt: "low quality, blurry, distorted",
          width,
          height,
          num_images: 1,
          guidance_scale: 7.5
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la API de Recraft: ${response.statusText}`);
      }

      const data = await response.json() as RecraftGenerateResponse;
      return data.images[0]; // Retorna la URL de la primera imagen generada
    } catch (error) {
      console.error("Error al generar imagen con Recraft:", error);
      
      // Fallback a imágenes de muestra en caso de error
      const mockImages = {
        modern: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
        minimal: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
        corporate: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
        playful: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
      };
      
      return mockImages[options?.style || "modern"];
    }
  },

  // Obtener plantillas de diseño de Recraft.ai
  getDesignTemplates: async (category?: string): Promise<RecraftDesignTemplate[]> => {
    try {
      const response = await fetch(`${RECRAFT_API_URL}/v1/templates${category ? `?category=${category}` : ""}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${RECRAFT_API_KEY}`
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener plantillas: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al obtener plantillas de Recraft:", error);
      
      // Plantillas de muestra en caso de error
      return [
        {
          id: "template-1",
          name: "Instagram Post Moderno",
          category: "social",
          tags: ["instagram", "moderno"],
          previewUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
          dimensions: { width: 1080, height: 1080 }
        },
        {
          id: "template-2",
          name: "Facebook Cover Corporativo",
          category: "social",
          tags: ["facebook", "corporativo"],
          previewUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=200",
          dimensions: { width: 820, height: 312 }
        },
      ];
    }
  },

  // Analizar sitio web para extraer identidad de marca
  extractBrandIdentity: async (url: string): Promise<{
    logo?: string;
    colors: string[];
    fonts: string[];
  }> => {
    // En una implementación real, esto se conectaría a un servicio que analiza el sitio web
    // Por ahora, simulamos la respuesta
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          logo: "https://via.placeholder.com/150",
          colors: ["#3B82F6", "#1E3A8A", "#FFFFFF", "#111827"],
          fonts: ["Inter", "Roboto", "Montserrat"]
        });
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
