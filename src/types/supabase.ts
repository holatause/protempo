export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Tablas de IA
      ai_requests: {
        Row: {
          id: string
          created_at: string
          user_id: string
          prompt: string
          context: Json | null
          model: string
          status: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          prompt: string
          context?: Json | null
          model: string
          status?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          prompt?: string
          context?: Json | null
          model?: string
          status?: string
          metadata?: Json | null
        }
      }
      ai_responses: {
        Row: {
          id: string
          created_at: string
          request_id: string
          content: string
          model: string
          tokens_used: number | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          request_id: string
          content: string
          model: string
          tokens_used?: number | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          request_id?: string
          content?: string
          model?: string
          tokens_used?: number | null
          metadata?: Json | null
        }
      }
      saved_content: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          content: string
          content_type: string
          tags: string[] | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          content: string
          content_type: string
          tags?: string[] | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          content?: string
          content_type?: string
          tags?: string[] | null
          metadata?: Json | null
        }
      }
      ai_generated_images: {
        Row: {
          id: string
          created_at: string
          user_id: string
          prompt: string
          image_url: string
          model: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          prompt: string
          image_url: string
          model: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          prompt?: string
          image_url?: string
          model?: string
          metadata?: Json | null
        }
      }
      
      // Tablas de Marketing
      campaigns: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          description: string | null
          start_date: string | null
          end_date: string | null
          status: string
          budget: number | null
          target_audience: Json | null
          goals: Json | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          status?: string
          budget?: number | null
          target_audience?: Json | null
          goals?: Json | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          status?: string
          budget?: number | null
          target_audience?: Json | null
          goals?: Json | null
          metadata?: Json | null
        }
      }
      campaign_metrics: {
        Row: {
          id: string
          created_at: string
          campaign_id: string
          metric_name: string
          metric_value: number
          date_recorded: string
          source: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          campaign_id: string
          metric_name: string
          metric_value: number
          date_recorded: string
          source?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          campaign_id?: string
          metric_name?: string
          metric_value?: number
          date_recorded?: string
          source?: string | null
          metadata?: Json | null
        }
      }
      utm_links: {
        Row: {
          id: string
          created_at: string
          campaign_id: string
          user_id: string
          base_url: string
          utm_source: string
          utm_medium: string
          utm_campaign: string
          utm_term: string | null
          utm_content: string | null
          short_url: string | null
          clicks: number
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          campaign_id: string
          user_id: string
          base_url: string
          utm_source: string
          utm_medium: string
          utm_campaign: string
          utm_term?: string | null
          utm_content?: string | null
          short_url?: string | null
          clicks?: number
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          campaign_id?: string
          user_id?: string
          base_url?: string
          utm_source?: string
          utm_medium?: string
          utm_campaign?: string
          utm_term?: string | null
          utm_content?: string | null
          short_url?: string | null
          clicks?: number
          metadata?: Json | null
        }
      }
      
      // Tablas de Colaboración
      chat_messages: {
        Row: {
          id: string
          created_at: string
          user_id: string
          room_id: string
          content: string
          attachments: Json[] | null
          read_by: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          room_id: string
          content: string
          attachments?: Json[] | null
          read_by?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          room_id?: string
          content?: string
          attachments?: Json[] | null
          read_by?: string[] | null
        }
      }
      chat_rooms: {
        Row: {
          id: string
          created_at: string
          name: string
          created_by: string
          members: string[]
          is_direct: boolean
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          created_by: string
          members: string[]
          is_direct: boolean
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          created_by?: string
          members?: string[]
          is_direct?: boolean
          metadata?: Json | null
        }
      }
      
      // Tablas de Gamificación
      achievements: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          points: number
          icon_url: string | null
          requirements: Json
          category: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          points: number
          icon_url?: string | null
          requirements: Json
          category: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          points?: number
          icon_url?: string | null
          requirements?: Json
          category?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          created_at: string
          user_id: string
          achievement_id: string
          earned_at: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          achievement_id: string
          earned_at: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
          metadata?: Json | null
        }
      }
      
      // Tablas de Perfiles y Configuración
      profiles: {
        Row: {
          id: string
          created_at: string
          user_id: string
          full_name: string | null
          avatar_url: string | null
          role: string
          organization_id: string | null
          preferences: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          organization_id?: string | null
          preferences?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          organization_id?: string | null
          preferences?: Json | null
        }
      }
      organizations: {
        Row: {
          id: string
          created_at: string
          name: string
          logo_url: string | null
          owner_id: string
          settings: Json | null
          subscription_tier: string
          subscription_status: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          logo_url?: string | null
          owner_id: string
          settings?: Json | null
          subscription_tier?: string
          subscription_status?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          logo_url?: string | null
          owner_id?: string
          settings?: Json | null
          subscription_tier?: string
          subscription_status?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
