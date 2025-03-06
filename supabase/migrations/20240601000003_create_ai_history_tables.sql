-- Tabla para almacenar el historial de prompts y respuestas de IA
CREATE TABLE IF NOT EXISTS ai_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'assistant', 'image', 'content', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Tabla para almacenar feedback sobre las respuestas de IA
CREATE TABLE IF NOT EXISTS ai_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  response_id UUID REFERENCES ai_history(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para almacenar imágenes generadas por IA
CREATE TABLE IF NOT EXISTS ai_generated_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  style VARCHAR(50),
  aspect_ratio VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title VARCHAR(255),
  is_favorite BOOLEAN DEFAULT FALSE
);

-- Tabla para almacenar contenido generado por IA
CREATE TABLE IF NOT EXISTS ai_generated_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50), -- 'social', 'email', 'blog', etc.
  platform VARCHAR(50), -- 'instagram', 'facebook', 'email', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_favorite BOOLEAN DEFAULT FALSE
);

-- Políticas de seguridad
ALTER TABLE ai_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_content ENABLE ROW LEVEL SECURITY;

-- Políticas para ai_history
DROP POLICY IF EXISTS "Users can view their own history" ON ai_history;
CREATE POLICY "Users can view their own history"
  ON ai_history FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own history" ON ai_history;
CREATE POLICY "Users can insert their own history"
  ON ai_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Políticas para ai_feedback
DROP POLICY IF EXISTS "Users can view their own feedback" ON ai_feedback;
CREATE POLICY "Users can view their own feedback"
  ON ai_feedback FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own feedback" ON ai_feedback;
CREATE POLICY "Users can insert their own feedback"
  ON ai_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Políticas para ai_generated_images
DROP POLICY IF EXISTS "Users can view their own images" ON ai_generated_images;
CREATE POLICY "Users can view their own images"
  ON ai_generated_images FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own images" ON ai_generated_images;
CREATE POLICY "Users can insert their own images"
  ON ai_generated_images FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own images" ON ai_generated_images;
CREATE POLICY "Users can update their own images"
  ON ai_generated_images FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own images" ON ai_generated_images;
CREATE POLICY "Users can delete their own images"
  ON ai_generated_images FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas para ai_generated_content
DROP POLICY IF EXISTS "Users can view their own content" ON ai_generated_content;
CREATE POLICY "Users can view their own content"
  ON ai_generated_content FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own content" ON ai_generated_content;
CREATE POLICY "Users can insert their own content"
  ON ai_generated_content FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own content" ON ai_generated_content;
CREATE POLICY "Users can update their own content"
  ON ai_generated_content FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own content" ON ai_generated_content;
CREATE POLICY "Users can delete their own content"
  ON ai_generated_content FOR DELETE
  USING (auth.uid() = user_id);

-- Habilitar publicación en tiempo real para estas tablas
ALTER PUBLICATION supabase_realtime ADD TABLE ai_history;
ALTER PUBLICATION supabase_realtime ADD TABLE ai_generated_images;
ALTER PUBLICATION supabase_realtime ADD TABLE ai_generated_content;
