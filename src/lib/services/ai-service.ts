import { supabase } from '../supabase';
import { Database } from '@/types/supabase';

export class AIService {
  /**
   * Crea una nueva solicitud de IA
   */
  async createRequest(
    userId: string,
    prompt: string,
    model: string,
    context: any = null
  ) {
    const { data, error } = await supabase
      .from('ai_requests')
      .insert({
        user_id: userId,
        prompt,
        model,
        context,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Guarda una respuesta de IA
   */
  async saveResponse(
    requestId: string,
    content: string,
    model: string,
    tokensUsed: number | null = null
  ) {
    const { data, error } = await supabase
      .from('ai_responses')
      .insert({
        request_id: requestId,
        content,
        model,
        tokens_used: tokensUsed,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Actualiza el estado de una solicitud de IA
   */
  async updateRequestStatus(requestId: string, status: string) {
    const { data, error } = await supabase
      .from('ai_requests')
      .update({ status })
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene el historial de solicitudes de IA de un usuario
   */
  async getUserRequestHistory(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from('ai_requests')
      .select(`
        *,
        ai_responses (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  /**
   * Guarda contenido generado por IA
   */
  async saveContent(
    userId: string,
    title: string,
    content: string,
    contentType: string,
    tags: string[] | null = null
  ) {
    const { data, error } = await supabase
      .from('saved_content')
      .insert({
        user_id: userId,
        title,
        content,
        content_type: contentType,
        tags,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene el contenido guardado de un usuario
   */
  async getUserSavedContent(userId: string, contentType: string | null = null) {
    let query = supabase
      .from('saved_content')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (contentType) {
      query = query.eq('content_type', contentType);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  /**
   * Guarda una imagen generada por IA
   */
  async saveGeneratedImage(
    userId: string,
    prompt: string,
    imageUrl: string,
    model: string
  ) {
    const { data, error } = await supabase
      .from('ai_generated_images')
      .insert({
        user_id: userId,
        prompt,
        image_url: imageUrl,
        model,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene las imágenes generadas por un usuario
   */
  async getUserGeneratedImages(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from('ai_generated_images')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }
}

// Exportar una instancia del servicio
export const aiService = new AIService();
