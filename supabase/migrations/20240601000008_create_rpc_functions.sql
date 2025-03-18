-- Función para obtener el resumen de métricas de campañas
CREATE OR REPLACE FUNCTION get_campaign_metrics_summary(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  WITH user_campaigns AS (
    SELECT id, name
    FROM campaigns
    WHERE user_id = p_user_id
  ),
  campaign_metrics_summary AS (
    SELECT 
      c.id AS campaign_id,
      c.name AS campaign_name,
      jsonb_object_agg(cm.metric_name, SUM(cm.metric_value)) AS metrics
    FROM user_campaigns c
    LEFT JOIN campaign_metrics cm ON c.id = cm.campaign_id
    GROUP BY c.id, c.name
  )
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', campaign_id,
      'name', campaign_name,
      'metrics', metrics
    )
  ) INTO result
  FROM campaign_metrics_summary;

  RETURN COALESCE(result, '[]'::JSONB);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener el tablero de líderes por puntos de logros
CREATE OR REPLACE FUNCTION get_leaderboard(p_limit INTEGER DEFAULT 10)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  WITH user_points AS (
    SELECT 
      ua.user_id,
      SUM(a.points) AS total_points
    FROM user_achievements ua
    JOIN achievements a ON ua.achievement_id = a.id
    GROUP BY ua.user_id
    ORDER BY total_points DESC
    LIMIT p_limit
  ),
  leaderboard AS (
    SELECT 
      up.user_id,
      up.total_points,
      p.full_name,
      p.avatar_url,
      p.organization_id
    FROM user_points up
    JOIN profiles p ON up.user_id = p.user_id
  )
  SELECT jsonb_agg(
    jsonb_build_object(
      'user_id', user_id,
      'points', total_points,
      'full_name', full_name,
      'avatar_url', avatar_url,
      'organization_id', organization_id
    )
  ) INTO result
  FROM leaderboard;

  RETURN COALESCE(result, '[]'::JSONB);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para verificar si un usuario es elegible para un logro
CREATE OR REPLACE FUNCTION check_achievement_eligibility(p_user_id UUID, p_achievement_id UUID)
RETURNS JSONB AS $$
DECLARE
  achievement RECORD;
  requirements JSONB;
  progress JSONB;
  is_eligible BOOLEAN := FALSE;
BEGIN
  -- Obtener el logro y sus requisitos
  SELECT * INTO achievement FROM achievements WHERE id = p_achievement_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'error', 'Achievement not found',
      'eligible', FALSE
    );
  END IF;
  
  requirements := achievement.requirements;
  
  -- Verificar si el usuario ya tiene este logro
  IF EXISTS (SELECT 1 FROM user_achievements WHERE user_id = p_user_id AND achievement_id = p_achievement_id) THEN
    RETURN jsonb_build_object(
      'achievement', to_jsonb(achievement),
      'eligible', FALSE,
      'already_earned', TRUE
    );
  END IF;
  
  -- Calcular el progreso según el tipo de logro
  CASE
    -- Logro basado en campañas creadas
    WHEN requirements->>'type' = 'campaigns_created' THEN
      DECLARE
        required_count INTEGER := (requirements->>'count')::INTEGER;
        current_count INTEGER;
      BEGIN
        SELECT COUNT(*) INTO current_count 
        FROM campaigns 
        WHERE user_id = p_user_id;
        
        is_eligible := current_count >= required_count;
        
        progress := jsonb_build_object(
          'current', current_count,
          'required', required_count,
          'percentage', LEAST(100, (current_count::FLOAT / required_count::FLOAT) * 100)
        );
      END;
      
    -- Logro basado en contenido generado
    WHEN requirements->>'type' = 'content_generated' THEN
      DECLARE
        required_count INTEGER := (requirements->>'count')::INTEGER;
        current_count INTEGER;
      BEGIN
        SELECT COUNT(*) INTO current_count 
        FROM saved_content 
        WHERE user_id = p_user_id;
        
        is_eligible := current_count >= required_count;
        
        progress := jsonb_build_object(
          'current', current_count,
          'required', required_count,
          'percentage', LEAST(100, (current_count::FLOAT / required_count::FLOAT) * 100)
        );
      END;
      
    -- Logro basado en imágenes generadas
    WHEN requirements->>'type' = 'images_generated' THEN
      DECLARE
        required_count INTEGER := (requirements->>'count')::INTEGER;
        current_count INTEGER;
      BEGIN
        SELECT COUNT(*) INTO current_count 
        FROM ai_generated_images 
        WHERE user_id = p_user_id;
        
        is_eligible := current_count >= required_count;
        
        progress := jsonb_build_object(
          'current', current_count,
          'required', required_count,
          'percentage', LEAST(100, (current_count::FLOAT / required_count::FLOAT) * 100)
        );
      END;
      
    -- Logro basado en UTMs creados
    WHEN requirements->>'type' = 'utm_links_created' THEN
      DECLARE
        required_count INTEGER := (requirements->>'count')::INTEGER;
        current_count INTEGER;
      BEGIN
        SELECT COUNT(*) INTO current_count 
        FROM utm_links 
        WHERE user_id = p_user_id;
        
        is_eligible := current_count >= required_count;
        
        progress := jsonb_build_object(
          'current', current_count,
          'required', required_count,
          'percentage', LEAST(100, (current_count::FLOAT / required_count::FLOAT) * 100)
        );
      END;
      
    -- Tipo de logro no reconocido
    ELSE
      progress := jsonb_build_object(
        'error', 'Unknown achievement type',
        'type', requirements->>'type'
      );
  END CASE;
  
  RETURN jsonb_build_object(
    'achievement', to_jsonb(achievement),
    'eligible', is_eligible,
    'progress', progress
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para otorgar un logro a un usuario si es elegible
CREATE OR REPLACE FUNCTION award_achievement_if_eligible(p_user_id UUID, p_achievement_id UUID)
RETURNS JSONB AS $$
DECLARE
  eligibility JSONB;
  is_eligible BOOLEAN;
  result JSONB;
BEGIN
  -- Verificar elegibilidad
  eligibility := check_achievement_eligibility(p_user_id, p_achievement_id);
  is_eligible := eligibility->>'eligible';
  
  -- Si ya tiene el logro, retornar esa información
  IF eligibility->>'already_earned' = 'true' THEN
    RETURN jsonb_build_object(
      'success', FALSE,
      'message', 'Achievement already earned',
      'achievement', eligibility->'achievement'
    );
  END IF;
  
  -- Si es elegible, otorgar el logro
  IF is_eligible THEN
    INSERT INTO user_achievements (user_id, achievement_id, earned_at)
    VALUES (p_user_id, p_achievement_id, NOW())
    RETURNING to_jsonb(*) INTO result;
    
    RETURN jsonb_build_object(
      'success', TRUE,
      'message', 'Achievement awarded',
      'user_achievement', result,
      'achievement', eligibility->'achievement'
    );
  ELSE
    -- No es elegible
    RETURN jsonb_build_object(
      'success', FALSE,
      'message', 'Not eligible for achievement',
      'progress', eligibility->'progress'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para verificar y otorgar todos los logros para los que un usuario es elegible
CREATE OR REPLACE FUNCTION check_and_award_all_achievements(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  achievement RECORD;
  awarded JSONB := '[]'::JSONB;
BEGIN
  FOR achievement IN SELECT * FROM achievements LOOP
    DECLARE
      award_result JSONB;
    BEGIN
      award_result := award_achievement_if_eligible(p_user_id, achievement.id);
      
      IF award_result->>'success' = 'true' THEN
        awarded := awarded || award_result;
      END IF;
    END;
  END LOOP;
  
  RETURN jsonb_build_object(
    'awarded_count', jsonb_array_length(awarded),
    'awarded', awarded
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener métricas de una campaña en un formato para gráficos
CREATE OR REPLACE FUNCTION get_campaign_metrics_for_chart(p_campaign_id UUID, p_metric_name TEXT, p_days INTEGER DEFAULT 30)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  WITH date_series AS (
    SELECT generate_series(
      CURRENT_DATE - (p_days || ' days')::INTERVAL,
      CURRENT_DATE,
      '1 day'
    )::DATE AS date
  ),
  metrics AS (
    SELECT 
      date_recorded::DATE AS date,
      SUM(metric_value) AS value
    FROM campaign_metrics
    WHERE 
      campaign_id = p_campaign_id AND
      metric_name = p_metric_name AND
      date_recorded >= CURRENT_DATE - (p_days || ' days')::INTERVAL
    GROUP BY date_recorded::DATE
  ),
  combined AS (
    SELECT 
      ds.date,
      COALESCE(m.value, 0) AS value
    FROM date_series ds
    LEFT JOIN metrics m ON ds.date = m.date
    ORDER BY ds.date
  )
  SELECT jsonb_agg(
    jsonb_build_object(
      'date', to_char(date, 'YYYY-MM-DD'),
      'value', value
    )
  ) INTO result
  FROM combined;

  RETURN COALESCE(result, '[]'::JSONB);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener mensajes no leídos por un usuario
CREATE OR REPLACE FUNCTION get_unread_messages_count(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  count_result INTEGER;
BEGIN
  WITH user_rooms AS (
    SELECT id
    FROM chat_rooms
    WHERE p_user_id = ANY(members)
  )
  SELECT COUNT(*) INTO count_result
  FROM chat_messages cm
  JOIN user_rooms ur ON cm.room_id = ur.id
  WHERE 
    cm.user_id != p_user_id AND
    (cm.read_by IS NULL OR NOT p_user_id = ANY(cm.read_by));
    
  RETURN count_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para marcar todos los mensajes de una sala como leídos
CREATE OR REPLACE FUNCTION mark_room_messages_as_read(p_user_id UUID, p_room_id UUID)
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  WITH messages_to_update AS (
    SELECT id, read_by
    FROM chat_messages
    WHERE 
      room_id = p_room_id AND
      user_id != p_user_id AND
      (read_by IS NULL OR NOT p_user_id = ANY(read_by))
  ),
  updated AS (
    UPDATE chat_messages
    SET read_by = 
      CASE 
        WHEN read_by IS NULL THEN ARRAY[p_user_id]
        ELSE read_by || p_user_id
      END
    FROM messages_to_update
    WHERE chat_messages.id = messages_to_update.id
    RETURNING chat_messages.id
  )
  SELECT COUNT(*) INTO updated_count FROM updated;
  
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
