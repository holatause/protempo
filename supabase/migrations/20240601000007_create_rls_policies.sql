-- Habilitar RLS en todas las tablas
ALTER TABLE ai_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE utm_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Función para verificar si un usuario es administrador de una organización
CREATE OR REPLACE FUNCTION is_org_admin(user_id UUID, org_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE user_id = $1 AND organization_id = $2;
  RETURN user_role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para verificar si un usuario es superadmin
CREATE OR REPLACE FUNCTION is_superadmin(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE user_id = $1;
  RETURN user_role = 'superadmin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener la organización de un usuario
CREATE OR REPLACE FUNCTION get_user_org_id(user_id UUID)
RETURNS UUID AS $$
DECLARE
  org_id UUID;
BEGIN
  SELECT organization_id INTO org_id FROM profiles WHERE user_id = $1;
  RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para verificar si dos usuarios están en la misma organización
CREATE OR REPLACE FUNCTION same_organization(user_id1 UUID, user_id2 UUID)
RETURNS BOOLEAN AS $$
DECLARE
  org_id1 UUID;
  org_id2 UUID;
BEGIN
  SELECT organization_id INTO org_id1 FROM profiles WHERE user_id = $1;
  SELECT organization_id INTO org_id2 FROM profiles WHERE user_id = $2;
  RETURN org_id1 = org_id2 AND org_id1 IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Políticas para ai_requests
CREATE POLICY "Usuarios pueden ver sus propias solicitudes" ON ai_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden ver solicitudes de su organización" ON ai_requests
  FOR SELECT USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden ver todas las solicitudes" ON ai_requests
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden crear sus propias solicitudes" ON ai_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar sus propias solicitudes" ON ai_requests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden actualizar solicitudes de su organización" ON ai_requests
  FOR UPDATE USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden actualizar todas las solicitudes" ON ai_requests
  FOR UPDATE USING (is_superadmin(auth.uid()));

-- Políticas para ai_responses
CREATE POLICY "Usuarios pueden ver respuestas a sus solicitudes" ON ai_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ai_requests 
      WHERE ai_requests.id = ai_responses.request_id 
      AND ai_requests.user_id = auth.uid()
    )
  );

CREATE POLICY "Administradores pueden ver respuestas de su organización" ON ai_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ai_requests 
      WHERE ai_requests.id = ai_responses.request_id 
      AND is_org_admin(auth.uid(), get_user_org_id(ai_requests.user_id))
      AND same_organization(auth.uid(), ai_requests.user_id)
    )
  );

CREATE POLICY "Superadmins pueden ver todas las respuestas" ON ai_responses
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Sistema puede crear respuestas" ON ai_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM ai_requests 
      WHERE ai_requests.id = ai_responses.request_id
    )
  );

-- Políticas para saved_content
CREATE POLICY "Usuarios pueden ver su contenido guardado" ON saved_content
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden ver contenido de su organización" ON saved_content
  FOR SELECT USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden ver todo el contenido" ON saved_content
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden crear su propio contenido" ON saved_content
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar su propio contenido" ON saved_content
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden actualizar contenido de su organización" ON saved_content
  FOR UPDATE USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden actualizar todo el contenido" ON saved_content
  FOR UPDATE USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden eliminar su propio contenido" ON saved_content
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden eliminar contenido de su organización" ON saved_content
  FOR DELETE USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden eliminar todo el contenido" ON saved_content
  FOR DELETE USING (is_superadmin(auth.uid()));

-- Políticas para ai_generated_images
CREATE POLICY "Usuarios pueden ver sus propias imágenes" ON ai_generated_images
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden ver imágenes de su organización" ON ai_generated_images
  FOR SELECT USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden ver todas las imágenes" ON ai_generated_images
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden crear sus propias imágenes" ON ai_generated_images
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para campaigns
CREATE POLICY "Usuarios pueden ver sus propias campañas" ON campaigns
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden ver campañas de su organización" ON campaigns
  FOR SELECT USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden ver todas las campañas" ON campaigns
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden crear sus propias campañas" ON campaigns
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar sus propias campañas" ON campaigns
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden actualizar campañas de su organización" ON campaigns
  FOR UPDATE USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden actualizar todas las campañas" ON campaigns
  FOR UPDATE USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden eliminar sus propias campañas" ON campaigns
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden eliminar campañas de su organización" ON campaigns
  FOR DELETE USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden eliminar todas las campañas" ON campaigns
  FOR DELETE USING (is_superadmin(auth.uid()));

-- Políticas para campaign_metrics
CREATE POLICY "Usuarios pueden ver métricas de sus campañas" ON campaign_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_metrics.campaign_id 
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Administradores pueden ver métricas de su organización" ON campaign_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_metrics.campaign_id 
      AND is_org_admin(auth.uid(), get_user_org_id(campaigns.user_id))
      AND same_organization(auth.uid(), campaigns.user_id)
    )
  );

CREATE POLICY "Superadmins pueden ver todas las métricas" ON campaign_metrics
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden crear métricas para sus campañas" ON campaign_metrics
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_metrics.campaign_id 
      AND campaigns.user_id = auth.uid()
    )
  );

-- Políticas para utm_links
CREATE POLICY "Usuarios pueden ver sus propios enlaces UTM" ON utm_links
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden ver enlaces UTM de su organización" ON utm_links
  FOR SELECT USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden ver todos los enlaces UTM" ON utm_links
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden crear sus propios enlaces UTM" ON utm_links
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar sus propios enlaces UTM" ON utm_links
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden actualizar enlaces UTM de su organización" ON utm_links
  FOR UPDATE USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden actualizar todos los enlaces UTM" ON utm_links
  FOR UPDATE USING (is_superadmin(auth.uid()));

-- Políticas para chat_rooms
CREATE POLICY "Usuarios pueden ver salas de chat donde son miembros" ON chat_rooms
  FOR SELECT USING (auth.uid() = ANY(members));

CREATE POLICY "Administradores pueden ver todas las salas de chat de su organización" ON chat_rooms
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = ANY(chat_rooms.members) 
      AND is_org_admin(auth.uid(), profiles.organization_id)
      AND profiles.organization_id = get_user_org_id(auth.uid())
    )
  );

CREATE POLICY "Superadmins pueden ver todas las salas de chat" ON chat_rooms
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden crear salas de chat" ON chat_rooms
  FOR INSERT WITH CHECK (auth.uid() = created_by AND auth.uid() = ANY(members));

CREATE POLICY "Usuarios pueden actualizar salas de chat que crearon" ON chat_rooms
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Administradores pueden actualizar salas de chat de su organización" ON chat_rooms
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = chat_rooms.created_by 
      AND is_org_admin(auth.uid(), profiles.organization_id)
      AND profiles.organization_id = get_user_org_id(auth.uid())
    )
  );

CREATE POLICY "Superadmins pueden actualizar todas las salas de chat" ON chat_rooms
  FOR UPDATE USING (is_superadmin(auth.uid()));

-- Políticas para chat_messages
CREATE POLICY "Usuarios pueden ver mensajes en salas donde son miembros" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chat_rooms 
      WHERE chat_rooms.id = chat_messages.room_id 
      AND auth.uid() = ANY(chat_rooms.members)
    )
  );

CREATE POLICY "Administradores pueden ver todos los mensajes de su organización" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chat_rooms 
      JOIN profiles ON profiles.user_id = ANY(chat_rooms.members)
      WHERE chat_rooms.id = chat_messages.room_id 
      AND is_org_admin(auth.uid(), profiles.organization_id)
      AND profiles.organization_id = get_user_org_id(auth.uid())
    )
  );

CREATE POLICY "Superadmins pueden ver todos los mensajes" ON chat_messages
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden enviar mensajes en salas donde son miembros" ON chat_messages
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM chat_rooms 
      WHERE chat_rooms.id = chat_messages.room_id 
      AND auth.uid() = ANY(chat_rooms.members)
    )
  );

CREATE POLICY "Usuarios pueden actualizar sus propios mensajes" ON chat_messages
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden actualizar mensajes de su organización" ON chat_messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = chat_messages.user_id 
      AND is_org_admin(auth.uid(), profiles.organization_id)
      AND profiles.organization_id = get_user_org_id(auth.uid())
    )
  );

CREATE POLICY "Superadmins pueden actualizar todos los mensajes" ON chat_messages
  FOR UPDATE USING (is_superadmin(auth.uid()));

-- Políticas para achievements
CREATE POLICY "Todos pueden ver los logros disponibles" ON achievements
  FOR SELECT USING (true);

CREATE POLICY "Solo superadmins pueden crear logros" ON achievements
  FOR INSERT WITH CHECK (is_superadmin(auth.uid()));

CREATE POLICY "Solo superadmins pueden actualizar logros" ON achievements
  FOR UPDATE USING (is_superadmin(auth.uid()));

CREATE POLICY "Solo superadmins pueden eliminar logros" ON achievements
  FOR DELETE USING (is_superadmin(auth.uid()));

-- Políticas para user_achievements
CREATE POLICY "Usuarios pueden ver sus propios logros" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden ver logros de su organización" ON user_achievements
  FOR SELECT USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden ver todos los logros de usuarios" ON user_achievements
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Sistema puede otorgar logros" ON user_achievements
  FOR INSERT WITH CHECK (true);

-- Políticas para profiles
CREATE POLICY "Usuarios pueden ver su propio perfil" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden ver perfiles de su organización" ON profiles
  FOR SELECT USING (same_organization(auth.uid(), user_id));

CREATE POLICY "Superadmins pueden ver todos los perfiles" ON profiles
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden crear su propio perfil" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Administradores pueden actualizar perfiles de su organización" ON profiles
  FOR UPDATE USING (
    is_org_admin(auth.uid(), get_user_org_id(user_id)) AND 
    same_organization(auth.uid(), user_id)
  );

CREATE POLICY "Superadmins pueden actualizar todos los perfiles" ON profiles
  FOR UPDATE USING (is_superadmin(auth.uid()));

-- Políticas para organizations
CREATE POLICY "Usuarios pueden ver su propia organización" ON organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.organization_id = organizations.id
    )
  );

CREATE POLICY "Superadmins pueden ver todas las organizaciones" ON organizations
  FOR SELECT USING (is_superadmin(auth.uid()));

CREATE POLICY "Usuarios pueden crear organizaciones" ON organizations
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Administradores pueden actualizar su organización" ON organizations
  FOR UPDATE USING (
    is_org_admin(auth.uid(), id) AND 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.organization_id = organizations.id
    )
  );

CREATE POLICY "Superadmins pueden actualizar todas las organizaciones" ON organizations
  FOR UPDATE USING (is_superadmin(auth.uid()));

-- Función para incrementar clics en enlaces UTM
CREATE OR REPLACE FUNCTION increment_utm_clicks(link_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE utm_links
  SET clicks = clicks + 1
  WHERE id = link_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
