import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Crear el cliente de Supabase con configuración mejorada
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'protempo_auth_token',
    storage: {
      getItem: (key) => {
        try {
          const value = localStorage.getItem(key);
          return value;
        } catch (error) {
          console.error('Error al recuperar la sesión:', error);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          console.error('Error al guardar la sesión:', error);
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error('Error al eliminar la sesión:', error);
        }
      }
    },
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
});

// Clase para manejar la autenticación
export class AuthService {
  private client: SupabaseClient<Database>;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  async getSession() {
    try {
      const { data, error } = await this.client.auth.getSession();
      if (error) {
        console.warn('Error al obtener la sesión:', error.message);
        return { session: null };
      }
      return data;
    } catch (error) {
      console.error('Error inesperado al obtener la sesión:', error);
      return { session: null };
    }
  }

  async getUser() {
    try {
      const { data, error } = await this.client.auth.getUser();
      if (error) {
        console.warn('Error al obtener el usuario:', error.message);
        return null;
      }
      return data.user;
    } catch (error) {
      console.error('Error inesperado al obtener el usuario:', error);
      return null;
    }
  }
  
  // Verificar si el usuario está autenticado sin lanzar errores
  isAuthenticated = async () => {
    try {
      const { session } = await this.getSession();
      return !!session;
    } catch {
      return false;
    }
  }
}

// Exportar una instancia del servicio de autenticación
export const authService = new AuthService(supabase);
