import { supabase } from '../supabase';
import { Database } from '@/types/supabase';

export class MarketingService {
  /**
   * Crea una nueva campaña de marketing
   */
  async createCampaign(
    userId: string,
    name: string,
    description: string | null = null,
    startDate: string | null = null,
    endDate: string | null = null,
    budget: number | null = null,
    targetAudience: any = null,
    goals: any = null
  ) {
    const { data, error } = await supabase
      .from('campaigns')
      .insert({
        user_id: userId,
        name,
        description,
        start_date: startDate,
        end_date: endDate,
        status: 'draft',
        budget,
        target_audience: targetAudience,
        goals,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Actualiza una campaña existente
   */
  async updateCampaign(
    campaignId: string,
    updates: Partial<Database['public']['Tables']['campaigns']['Update']>
  ) {
    const { data, error } = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', campaignId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene las campañas de un usuario
   */
  async getUserCampaigns(userId: string) {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene una campaña específica con sus métricas
   */
  async getCampaignWithMetrics(campaignId: string) {
    const { data, error } = await supabase
      .from('campaigns')
      .select(`
        *,
        campaign_metrics (*)
      `)
      .eq('id', campaignId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Registra una métrica para una campaña
   */
  async recordCampaignMetric(
    campaignId: string,
    metricName: string,
    metricValue: number,
    dateRecorded: string,
    source: string | null = null
  ) {
    const { data, error } = await supabase
      .from('campaign_metrics')
      .insert({
        campaign_id: campaignId,
        metric_name: metricName,
        metric_value: metricValue,
        date_recorded: dateRecorded,
        source,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Crea un enlace UTM
   */
  async createUtmLink(
    campaignId: string,
    userId: string,
    baseUrl: string,
    utmSource: string,
    utmMedium: string,
    utmCampaign: string,
    utmTerm: string | null = null,
    utmContent: string | null = null,
    shortUrl: string | null = null
  ) {
    const { data, error } = await supabase
      .from('utm_links')
      .insert({
        campaign_id: campaignId,
        user_id: userId,
        base_url: baseUrl,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        short_url: shortUrl,
        clicks: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene los enlaces UTM de una campaña
   */
  async getCampaignUtmLinks(campaignId: string) {
    const { data, error } = await supabase
      .from('utm_links')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Registra un clic en un enlace UTM
   */
  async recordUtmClick(utmLinkId: string) {
    const { data, error } = await supabase.rpc('increment_utm_clicks', {
      link_id: utmLinkId,
    });

    if (error) {
      // Si la función RPC no existe, hacemos un update manual
      const { data: linkData, error: linkError } = await supabase
        .from('utm_links')
        .select('clicks')
        .eq('id', utmLinkId)
        .single();

      if (linkError) throw linkError;

      const currentClicks = linkData?.clicks || 0;
      const { data: updateData, error: updateError } = await supabase
        .from('utm_links')
        .update({ clicks: currentClicks + 1 })
        .eq('id', utmLinkId)
        .select()
        .single();

      if (updateError) throw updateError;
      return updateData;
    }

    return data;
  }

  /**
   * Obtiene un resumen de las métricas de todas las campañas de un usuario
   */
  async getUserCampaignsMetricsSummary(userId: string) {
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('id, name')
      .eq('user_id', userId);

    if (campaignsError) throw campaignsError;

    const campaignIds = campaigns.map(campaign => campaign.id);
    
    const { data: metrics, error: metricsError } = await supabase
      .from('campaign_metrics')
      .select('campaign_id, metric_name, metric_value')
      .in('campaign_id', campaignIds);

    if (metricsError) throw metricsError;

    // Agrupar métricas por campaña
    const summary = campaigns.map(campaign => {
      const campaignMetrics = metrics.filter(metric => metric.campaign_id === campaign.id);
      
      // Calcular totales por tipo de métrica
      const metricSummary = {};
      campaignMetrics.forEach(metric => {
        if (!metricSummary[metric.metric_name]) {
          metricSummary[metric.metric_name] = 0;
        }
        metricSummary[metric.metric_name] += metric.metric_value;
      });

      return {
        id: campaign.id,
        name: campaign.name,
        metrics: metricSummary
      };
    });

    return summary;
  }
}

// Exportar una instancia del servicio
export const marketingService = new MarketingService();
