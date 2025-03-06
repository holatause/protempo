-- Create tables for AI functionality

-- Table for storing AI requests
CREATE TABLE IF NOT EXISTS ai_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  prompt TEXT NOT NULL,
  type TEXT NOT NULL,
  options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing AI responses
CREATE TABLE IF NOT EXISTS ai_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID REFERENCES ai_requests(id),
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing saved content
CREATE TABLE IF NOT EXISTS saved_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ai_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_content ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_requests
DROP POLICY IF EXISTS "Users can view their own requests" ON ai_requests;
CREATE POLICY "Users can view their own requests"
  ON ai_requests FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own requests" ON ai_requests;
CREATE POLICY "Users can insert their own requests"
  ON ai_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for ai_responses
DROP POLICY IF EXISTS "Users can view their own responses" ON ai_responses;
CREATE POLICY "Users can view their own responses"
  ON ai_responses FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own responses" ON ai_responses;
CREATE POLICY "Users can insert their own responses"
  ON ai_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for saved_content
DROP POLICY IF EXISTS "Users can view their own saved content" ON saved_content;
CREATE POLICY "Users can view their own saved content"
  ON saved_content FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own saved content" ON saved_content;
CREATE POLICY "Users can insert their own saved content"
  ON saved_content FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own saved content" ON saved_content;
CREATE POLICY "Users can update their own saved content"
  ON saved_content FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own saved content" ON saved_content;
CREATE POLICY "Users can delete their own saved content"
  ON saved_content FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime for these tables
alter publication supabase_realtime add table ai_requests;
alter publication supabase_realtime add table ai_responses;
alter publication supabase_realtime add table saved_content;
