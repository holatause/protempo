import { createClient } from "@supabase/supabase-js";

// Inicializar cliente de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CampaignMetric {
  campaign_id: string;
  metric_type: "impression" | "click" | "conversion" | "engagement" | "reach";
  value: number;
  source?: string;
  timestamp?: string;
}

export interface CampaignPerformance {
  campaign_id: string;
  impressions: number;
  clicks: number;
  conversions: number;
  engagement: number;
  reach: number;
  start_date: string;
  end_date: string;
}

/**
 * Registra una métrica individual para una campaña
 */
export async function trackCampaignMetric(metric: CampaignMetric) {
  try {
    const { data, error } = await supabase.from("campaign_metrics").insert({
      ...metric,
      timestamp: metric.timestamp || new Date().toISOString(),
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error tracking campaign metric:", error);
    throw error;
  }
}

/**
 * Registra múltiples métricas para una campaña
 */
export async function trackCampaignMetrics(metrics: CampaignMetric[]) {
  try {
    const { data, error } = await supabase.from("campaign_metrics").insert(
      metrics.map((metric) => ({
        ...metric,
        timestamp: metric.timestamp || new Date().toISOString(),
      })),
    );

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error tracking campaign metrics:", error);
    throw error;
  }
}

/**
 * Obtiene el rendimiento de una campaña específica
 */
export async function getCampaignPerformance(
  campaignId: string,
  startDate?: string,
  endDate?: string,
): Promise<CampaignPerformance> {
  try {
    let query = supabase
      .from("campaign_metrics")
      .select("*")
      .eq("campaign_id", campaignId);

    if (startDate) {
      query = query.gte("timestamp", startDate);
    }

    if (endDate) {
      query = query.lte("timestamp", endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Calcular métricas agregadas
    const performance: CampaignPerformance = {
      campaign_id: campaignId,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      engagement: 0,
      reach: 0,
      start_date: startDate || "",
      end_date: endDate || "",
    };

    data.forEach((metric) => {
      switch (metric.metric_type) {
        case "impression":
          performance.impressions += metric.value;
          break;
        case "click":
          performance.clicks += metric.value;
          break;
        case "conversion":
          performance.conversions += metric.value;
          break;
        case "engagement":
          performance.engagement += metric.value;
          break;
        case "reach":
          performance.reach += metric.value;
          break;
      }
    });

    return performance;
  } catch (error) {
    console.error("Error getting campaign performance:", error);
    throw error;
  }
}

/**
 * Obtiene el rendimiento de todas las campañas
 */
export async function getAllCampaignsPerformance(
  startDate?: string,
  endDate?: string,
): Promise<Record<string, CampaignPerformance>> {
  try {
    let query = supabase.from("campaign_metrics").select("*");

    if (startDate) {
      query = query.gte("timestamp", startDate);
    }

    if (endDate) {
      query = query.lte("timestamp", endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Agrupar por campaign_id
    const performanceByCampaign: Record<string, CampaignPerformance> = {};

    data.forEach((metric) => {
      const campaignId = metric.campaign_id;

      if (!performanceByCampaign[campaignId]) {
        performanceByCampaign[campaignId] = {
          campaign_id: campaignId,
          impressions: 0,
          clicks: 0,
          conversions: 0,
          engagement: 0,
          reach: 0,
          start_date: startDate || "",
          end_date: endDate || "",
        };
      }

      switch (metric.metric_type) {
        case "impression":
          performanceByCampaign[campaignId].impressions += metric.value;
          break;
        case "click":
          performanceByCampaign[campaignId].clicks += metric.value;
          break;
        case "conversion":
          performanceByCampaign[campaignId].conversions += metric.value;
          break;
        case "engagement":
          performanceByCampaign[campaignId].engagement += metric.value;
          break;
        case "reach":
          performanceByCampaign[campaignId].reach += metric.value;
          break;
      }
    });

    return performanceByCampaign;
  } catch (error) {
    console.error("Error getting all campaigns performance:", error);
    throw error;
  }
}
