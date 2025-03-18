import { supabase } from '../supabase';
import { Database } from '@/types/supabase';

export class CollaborationService {
  /**
   * Crea una nueva sala de chat
   */
  async createChatRoom(
    name: string,
    createdBy: string,
    members: string[],
    isDirect: boolean = false,
    metadata: any = null
  ) {
    const { data, error } = await supabase
      .from('chat_rooms')
      .insert({
        name,
        created_by: createdBy,
        members,
        is_direct: isDirect,
        metadata,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene las salas de chat de un usuario
   */
  async getUserChatRooms(userId: string) {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .contains('members', [userId])
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Envía un mensaje a una sala de chat
   */
  async sendChatMessage(
    userId: string,
    roomId: string,
    content: string,
    attachments: any[] | null = null
  ) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        room_id: roomId,
        content,
        attachments,
        read_by: [userId],
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene los mensajes de una sala de chat
   */
  async getChatMessages(roomId: string, limit = 50) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data.reverse(); // Invertimos para mostrar en orden cronológico
  }

  /**
   * Marca un mensaje como leído por un usuario
   */
  async markMessageAsRead(messageId: string, userId: string) {
    // Primero obtenemos el mensaje actual para ver quién ya lo ha leído
    const { data: message, error: messageError } = await supabase
      .from('chat_messages')
      .select('read_by')
      .eq('id', messageId)
      .single();

    if (messageError) throw messageError;

    // Añadimos el usuario a la lista de lectores si no está ya
    const readBy = message.read_by || [];
    if (!readBy.includes(userId)) {
      readBy.push(userId);

      const { data, error } = await supabase
        .from('chat_messages')
        .update({ read_by: readBy })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    return message;
  }

  /**
   * Obtiene los mensajes no leídos de un usuario
   */
  async getUnreadMessages(userId: string) {
    // Obtenemos las salas de chat del usuario
    const { data: rooms, error: roomsError } = await this.getUserChatRooms(userId);
    if (roomsError) throw roomsError;

    const roomIds = rooms.map(room => room.id);

    // Consultamos los mensajes que no han sido leídos por el usuario
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .in('room_id', roomIds)
      .not('read_by', 'cs', `{${userId}}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Añade un miembro a una sala de chat
   */
  async addMemberToChatRoom(roomId: string, userId: string) {
    // Primero obtenemos la sala para ver los miembros actuales
    const { data: room, error: roomError } = await supabase
      .from('chat_rooms')
      .select('members')
      .eq('id', roomId)
      .single();

    if (roomError) throw roomError;

    // Añadimos el usuario a la lista de miembros si no está ya
    const members = room.members || [];
    if (!members.includes(userId)) {
      members.push(userId);

      const { data, error } = await supabase
        .from('chat_rooms')
        .update({ members })
        .eq('id', roomId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    return room;
  }

  /**
   * Elimina un miembro de una sala de chat
   */
  async removeMemberFromChatRoom(roomId: string, userId: string) {
    // Primero obtenemos la sala para ver los miembros actuales
    const { data: room, error: roomError } = await supabase
      .from('chat_rooms')
      .select('members')
      .eq('id', roomId)
      .single();

    if (roomError) throw roomError;

    // Eliminamos el usuario de la lista de miembros
    const members = room.members || [];
    const updatedMembers = members.filter(member => member !== userId);

    const { data, error } = await supabase
      .from('chat_rooms')
      .update({ members: updatedMembers })
      .eq('id', roomId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// Exportar una instancia del servicio
export const collaborationService = new CollaborationService();
