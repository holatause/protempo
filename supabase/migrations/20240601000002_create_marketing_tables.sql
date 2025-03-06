-- Create tables for marketing functionality

-- Table for campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  objective TEXT,
  target_audience TEXT,
  start_date DATE,
  end_date DATE,
  budget NUMERIC(10, 2),
  status TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  seasonality TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for campaign channels
CREATE TABLE IF NOT EXISTS campaign_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  content_count INTEGER DEFAULT 0,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for campaign KPIs
CREATE TABLE IF NOT EXISTS campaign_kpis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  target NUMERIC(10, 2),
  current NUMERIC(10, 2) DEFAULT 0,
  unit TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for campaign tags
CREATE TABLE IF NOT EXISTS campaign_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for UTMs
CREATE TABLE IF NOT EXISTS utms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  source TEXT NOT NULL,
  medium TEXT NOT NULL,
  campaign TEXT NOT NULL,
  term TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE utms ENABLE ROW LEVEL SECURITY;

-- Create policies for campaigns
DROP POLICY IF EXISTS "Users can view their own campaigns" ON campaigns;
CREATE POLICY "Users can view their own campaigns"
  ON campaigns FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own campaigns" ON campaigns;
CREATE POLICY "Users can insert their own campaigns"
  ON campaigns FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own campaigns" ON campaigns;
CREATE POLICY "Users can update their own campaigns"
  ON campaigns FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own campaigns" ON campaigns;
CREATE POLICY "Users can delete their own campaigns"
  ON campaigns FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for campaign_channels
DROP POLICY IF EXISTS "Users can view their own campaign channels" ON campaign_channels;
CREATE POLICY "Users can view their own campaign channels"
  ON campaign_channels FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own campaign channels" ON campaign_channels;
CREATE POLICY "Users can insert their own campaign channels"
  ON campaign_channels FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own campaign channels" ON campaign_channels;
CREATE POLICY "Users can update their own campaign channels"
  ON campaign_channels FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own campaign channels" ON campaign_channels;
CREATE POLICY "Users can delete their own campaign channels"
  ON campaign_channels FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for campaign_kpis
DROP POLICY IF EXISTS "Users can view their own campaign KPIs" ON campaign_kpis;
CREATE POLICY "Users can view their own campaign KPIs"
  ON campaign_kpis FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own campaign KPIs" ON campaign_kpis;
CREATE POLICY "Users can insert their own campaign KPIs"
  ON campaign_kpis FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own campaign KPIs" ON campaign_kpis;
CREATE POLICY "Users can update their own campaign KPIs"
  ON campaign_kpis FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own campaign KPIs" ON campaign_kpis;
CREATE POLICY "Users can delete their own campaign KPIs"
  ON campaign_kpis FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for campaign_tags
DROP POLICY IF EXISTS "Users can view their own campaign tags" ON campaign_tags;
CREATE POLICY "Users can view their own campaign tags"
  ON campaign_tags FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own campaign tags" ON campaign_tags;
CREATE POLICY "Users can insert their own campaign tags"
  ON campaign_tags FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own campaign tags" ON campaign_tags;
CREATE POLICY "Users can delete their own campaign tags"
  ON campaign_tags FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for utms
DROP POLICY IF EXISTS "Users can view their own UTMs" ON utms;
CREATE POLICY "Users can view their own UTMs"
  ON utms FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own UTMs" ON utms;
CREATE POLICY "Users can insert their own UTMs"
  ON utms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own UTMs" ON utms;
CREATE POLICY "Users can update their own UTMs"
  ON utms FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own UTMs" ON utms;
CREATE POLICY "Users can delete their own UTMs"
  ON utms FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime for these tables
alter publication supabase_realtime add table campaigns;
alter publication supabase_realtime add table campaign_channels;
alter publication supabase_realtime add table campaign_kpis;
alter publication supabase_realtime add table campaign_tags;
alter publication supabase_realtime add table utms;
