-- Create campaign metrics table
CREATE TABLE IF NOT EXISTS campaign_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id TEXT NOT NULL,
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL DEFAULT 0,
  source TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- Enable row level security
ALTER TABLE campaign_metrics ENABLE ROW LEVEL SECURITY;

-- Create policy for users to select their own metrics
DROP POLICY IF EXISTS "Users can view their own metrics" ON campaign_metrics;
CREATE POLICY "Users can view their own metrics"
  ON campaign_metrics FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own metrics
DROP POLICY IF EXISTS "Users can insert their own metrics" ON campaign_metrics;
CREATE POLICY "Users can insert their own metrics"
  ON campaign_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create index on campaign_id for faster lookups
CREATE INDEX IF NOT EXISTS campaign_metrics_campaign_id_idx ON campaign_metrics(campaign_id);

-- Create index on timestamp for date range queries
CREATE INDEX IF NOT EXISTS campaign_metrics_timestamp_idx ON campaign_metrics(timestamp);

-- Enable realtime for this table (comentado para evitar errores si ya existe)
-- ALTER PUBLICATION supabase_realtime ADD TABLE campaign_metrics;
