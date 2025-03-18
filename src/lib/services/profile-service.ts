import { supabase } from '../supabase';
import { Database } from '@/types/supabase';

export class ProfileService {
  /**
   * Obtiene el perfil de un usuario
   */
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Crea o actualiza el perfil de un usuario
   */
  async upsertProfile(
    userId: string,
    fullName: string | null = null,
    avatarUrl: string | null = null,
    role: string = 'user',
    organizationId: string | null = null,
    preferences: any = null
  ) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        user_id: userId,
        full_name: fullName,
        avatar_url: avatarUrl,
        role,
        organization_id: organizationId,
        preferences,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Actualiza las preferencias de un usuario
   */
  async updateUserPreferences(userId: string, preferences: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ preferences })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene la organización de un usuario
   */
  async getUserOrganization(userId: string) {
    // Primero obtenemos el perfil para saber a qué organización pertenece
    const { data: profile, error: profileError } = await this.getUserProfile(userId);
    if (profileError) throw profileError;

    if (!profile.organization_id) {
      return null;
    }

    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', profile.organization_id)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Crea una nueva organización
   */
  async createOrganization(
    name: string,
    ownerId: string,
    logoUrl: string | null = null,
    settings: any = null,
    subscriptionTier: string = 'free',
    subscriptionStatus: string = 'active'
  ) {
    const { data, error } = await supabase
      .from('organizations')
      .insert({
        name,
        owner_id: ownerId,
        logo_url: logoUrl,
        settings,
        subscription_tier: subscriptionTier,
        subscription_status: subscriptionStatus,
      })
      .select()
      .single();

    if (error) throw error;

    // Actualizamos el perfil del propietario para vincularlo a esta organización
    await this.upsertProfile(
      ownerId,
      null, // No cambiamos el nombre
      null, // No cambiamos el avatar
      'admin', // El creador es admin por defecto
      data.id, // ID de la organización creada
      null // No cambiamos las preferencias
    );

    return data;
  }

  /**
   * Actualiza una organización
   */
  async updateOrganization(
    organizationId: string,
    updates: Partial<Database['public']['Tables']['organizations']['Update']>
  ) {
    const { data, error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', organizationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene los miembros de una organización
   */
  async getOrganizationMembers(organizationId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', organizationId);

    if (error) throw error;
    return data;
  }

  /**
   * Invita a un usuario a una organización (esto requeriría un sistema de invitaciones)
   * Esta es una implementación simplificada
   */
  async addUserToOrganization(userId: string, organizationId: string, role: string = 'user') {
    // Verificamos que el usuario exista
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(userId);
    if (userError) throw userError;

    // Actualizamos su perfil para vincularlo a la organización
    const { data, error } = await this.upsertProfile(
      userId,
      null, // No cambiamos el nombre
      null, // No cambiamos el avatar
      role, // Rol asignado
      organizationId, // ID de la organización
      null // No cambiamos las preferencias
    );

    if (error) throw error;
    return data;
  }

  /**
   * Elimina a un usuario de una organización
   */
  async removeUserFromOrganization(userId: string, organizationId: string) {
    // Obtenemos el perfil actual
    const { data: profile, error: profileError } = await this.getUserProfile(userId);
    if (profileError) throw profileError;

    // Verificamos que pertenezca a la organización correcta
    if (profile.organization_id !== organizationId) {
      throw new Error('El usuario no pertenece a esta organización');
    }

    // Actualizamos el perfil para desvincularlo
    const { data, error } = await supabase
      .from('profiles')
      .update({ organization_id: null })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Cambia el rol de un usuario en una organización
   */
  async changeUserRole(userId: string, organizationId: string, newRole: string) {
    // Obtenemos el perfil actual
    const { data: profile, error: profileError } = await this.getUserProfile(userId);
    if (profileError) throw profileError;

    // Verificamos que pertenezca a la organización correcta
    if (profile.organization_id !== organizationId) {
      throw new Error('El usuario no pertenece a esta organización');
    }

    // Actualizamos el rol
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// Exportar una instancia del servicio
export const profileService = new ProfileService();
