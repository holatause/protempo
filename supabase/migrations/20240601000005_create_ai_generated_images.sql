-- Create table for AI generated images
CREATE TABLE IF NOT EXISTS ai_generated_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  style TEXT,
  aspect_ratio TEXT,
  title TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE ai_generated_images ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE ai_generated_images;
