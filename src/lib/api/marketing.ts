import { createClient } from "@supabase/supabase-js";

// Inicializar cliente de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interfaces para campañas
export interface Campaign {
  id?: string;
  title: string;
  description: string;
  objective: string;
  target_audience: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: "draft" | "active" | "scheduled" | "completed" | "paused";
  progress: number;
  channels?: CampaignChannel[];
  kpis?: CampaignKPI[];
  seasonality?: "regular" | "holiday" | "event" | "promotion";
  tags?: string[];
  user_id?: string;
}

export interface CampaignChannel {
  id?: string;
  campaign_id?: string;
  name: string;
  content_count: number;
  icon?: string;
}

export interface CampaignKPI {
  id?: string;
  campaign_id?: string;
  name: string;
  target: number;
  current: number;
  unit: string;
}

// Interfaces para UTMs
export interface UTM {
  id?: string;
  name: string;
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
  user_id?: string;
  created_at?: string;
}

// Funciones para gestionar campañas
export async function createCampaign(campaign: Campaign) {
  try {
    // Obtener el ID del usuario actual
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // Crear la campaña
    const { data, error } = await supabase
      .from("campaigns")
      .insert({
        ...campaign,
        user_id: user.id,
        channels: undefined, // Eliminar para inserción
        kpis: undefined, // Eliminar para inserción
        tags: undefined, // Eliminar para inserción
      })
      .select()
      .single();

    if (error) throw error;

    // Insertar canales si existen
    if (campaign.channels && campaign.channels.length > 0) {
      const { error: channelsError } = await supabase
        .from("campaign_channels")
        .insert(
          campaign.channels.map((channel) => ({
            ...channel,
            campaign_id: data.id,
            user_id: user.id,
          })),
        );

      if (channelsError) throw channelsError;
    }

    // Insertar KPIs si existen
    if (campaign.kpis && campaign.kpis.length > 0) {
      const { error: kpisError } = await supabase.from("campaign_kpis").insert(
        campaign.kpis.map((kpi) => ({
          ...kpi,
          campaign_id: data.id,
          user_id: user.id,
        })),
      );

      if (kpisError) throw kpisError;
    }

    // Insertar tags si existen
    if (campaign.tags && campaign.tags.length > 0) {
      const { error: tagsError } = await supabase.from("campaign_tags").insert(
        campaign.tags.map((tag) => ({
          tag,
          campaign_id: data.id,
          user_id: user.id,
        })),
      );

      if (tagsError) throw tagsError;
    }

    return data;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
}

export async function getCampaigns() {
  try {
    // Obtener el ID del usuario actual
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // Obtener campañas
    const { data: campaigns, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Para cada campaña, obtener canales, KPIs y tags
    const campaignsWithDetails = await Promise.all(
      campaigns.map(async (campaign) => {
        // Obtener canales
        const { data: channels } = await supabase
          .from("campaign_channels")
          .select("*")
          .eq("campaign_id", campaign.id);

        // Obtener KPIs
        const { data: kpis } = await supabase
          .from("campaign_kpis")
          .select("*")
          .eq("campaign_id", campaign.id);

        // Obtener tags
        const { data: tagRows } = await supabase
          .from("campaign_tags")
          .select("tag")
          .eq("campaign_id", campaign.id);

        const tags = tagRows?.map((row) => row.tag) || [];

        return {
          ...campaign,
          channels: channels || [],
          kpis: kpis || [],
          tags,
        };
      }),
    );

    return campaignsWithDetails;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
}

// Funciones para gestionar UTMs
export async function createUTM(utm: UTM) {
  try {
    // Obtener el ID del usuario actual
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("utms")
      .insert({
        ...utm,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating UTM:", error);
    throw error;
  }
}

export async function getUTMs() {
  try {
    // Obtener el ID del usuario actual
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("utms")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching UTMs:", error);
    throw error;
  }
}

export async function deleteUTM(id: string) {
  try {
    const { error } = await supabase.from("utms").delete().eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting UTM:", error);
    throw error;
  }
}
