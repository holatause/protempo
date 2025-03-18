import { supabase } from '../supabase';
import { Database } from '@/types/supabase';

export class GamificationService {
  /**
   * Obtiene todos los logros disponibles
   */
  async getAllAchievements() {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('points', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene los logros de un usuario
   */
  async getUserAchievements(userId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievements (*)
      `)
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Otorga un logro a un usuario
   */
  async awardAchievement(
    userId: string,
    achievementId: string,
    metadata: any = null
  ) {
    // Verificamos si el usuario ya tiene este logro
    const { data: existingAchievement, error: checkError } = await supabase
      .from('user_achievements')
      .select('id')
      .eq('user_id', userId)
      .eq('achievement_id', achievementId)
      .maybeSingle();

    if (checkError) throw checkError;

    // Si ya tiene el logro, no hacemos nada
    if (existingAchievement) {
      return existingAchievement;
    }

    // Otorgamos el nuevo logro
    const { data, error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_id: achievementId,
        earned_at: new Date().toISOString(),
        metadata,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Verifica si un usuario cumple con los requisitos para un logro
   */
  async checkAchievementEligibility(userId: string, achievementId: string) {
    // Primero obtenemos el logro para ver sus requisitos
    const { data: achievement, error: achievementError } = await supabase
      .from('achievements')
      .select('*')
      .eq('id', achievementId)
      .single();

    if (achievementError) throw achievementError;

    // Aquí implementaríamos la lógica para verificar si el usuario cumple con los requisitos
    // Esto dependerá de los tipos de requisitos que definamos para los logros
    // Por ejemplo, podría ser un número de campañas creadas, contenido generado, etc.

    // Por ahora, retornamos un objeto con la información del logro y un flag de elegibilidad
    return {
      achievement,
      eligible: false, // Esto se determinaría según la lógica específica
      currentProgress: 0, // Progreso actual hacia el logro
      requiredProgress: 100, // Progreso requerido para obtener el logro
    };
  }

  /**
   * Obtiene el ranking de usuarios por puntos de logros
   */
  async getUsersLeaderboard(limit = 10) {
    // Esta consulta es más compleja y podría requerir una función RPC en Supabase
    // Por ahora, hacemos una implementación básica

    // Obtenemos todos los logros de usuarios
    const { data: userAchievements, error: achievementsError } = await supabase
      .from('user_achievements')
      .select(`
        user_id,
        achievements (points)
      `);

    if (achievementsError) throw achievementsError;

    // Calculamos los puntos totales por usuario
    const userPoints = {};
    userAchievements.forEach(ua => {
      const userId = ua.user_id;
      const points = ua.achievements?.points || 0;
      
      if (!userPoints[userId]) {
        userPoints[userId] = 0;
      }
      
      userPoints[userId] += points;
    });

    // Convertimos a array y ordenamos
    const leaderboard = Object.entries(userPoints)
      .map(([userId, points]) => ({ userId, points }))
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);

    // Obtenemos la información de perfil de los usuarios
    const userIds = leaderboard.map(entry => entry.userId);
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('user_id, full_name, avatar_url')
      .in('user_id', userIds);

    if (profilesError) throw profilesError;

    // Combinamos la información
    return leaderboard.map(entry => {
      const profile = profiles.find(p => p.user_id === entry.userId) || {};
      return {
        userId: entry.userId,
        points: entry.points,
        fullName: profile.full_name,
        avatarUrl: profile.avatar_url,
      };
    });
  }

  /**
   * Crea un nuevo logro en el sistema
   * (Función administrativa)
   */
  async createAchievement(
    name: string,
    description: string,
    points: number,
    requirements: any,
    category: string,
    iconUrl: string | null = null
  ) {
    const { data, error } = await supabase
      .from('achievements')
      .insert({
        name,
        description,
        points,
        requirements,
        category,
        icon_url: iconUrl,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// Exportar una instancia del servicio
export const gamificationService = new GamificationService();
