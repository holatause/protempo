-- Tabla para almacenar imágenes generadas por IA movida al archivo 20240601000005_create_ai_generated_images.sql

-- Tabla para almacenar contenido generado por IA
CREATE TABLE IF NOT EXISTS ai_generated_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  platform TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar realtime para las tablas (comentado para evitar errores si ya existe)
-- ALTER PUBLICATION supabase_realtime ADD TABLE ai_generated_content;

-- Políticas de seguridad para imágenes generadas movidas al archivo 20240601000005_create_ai_generated_images.sql

-- Políticas de seguridad para contenido generado
CREATE POLICY "Users can view their own generated content"
  ON ai_generated_content
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generated content"
  ON ai_generated_content
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generated content"
  ON ai_generated_content
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generated content"
  ON ai_generated_content
  FOR DELETE
  USING (auth.uid() = user_id);
