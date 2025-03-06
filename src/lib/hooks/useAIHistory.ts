import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Inicializar cliente de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AIHistoryItem {
  id: string;
  prompt: string;
  response: string;
  type: string;
  created_at: string;
  metadata?: Record<string, any>;
}

interface UseAIHistoryProps {
  type?: string;
  limit?: number;
  autoRefresh?: boolean;
}

export function useAIHistory({
  type,
  limit = 10,
  autoRefresh = false,
}: UseAIHistoryProps = {}) {
  const [history, setHistory] = useState<AIHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("ai_history")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (type) {
        query = query.eq("type", type);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;
      setHistory(data || []);
    } catch (err) {
      console.error("Error fetching AI history:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();

    // Set up real-time subscription if autoRefresh is enabled
    if (autoRefresh) {
      const subscription = supabase
        .channel("ai_history_changes")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "ai_history" },
          (payload) => {
            // Only add to history if it matches the type filter
            if (!type || payload.new.type === type) {
              setHistory((current) => [
                payload.new as AIHistoryItem,
                ...current.slice(0, limit - 1),
              ]);
            }
          },
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [type, limit, autoRefresh]);

  return { history, loading, error, refresh: fetchHistory };
}

export default useAIHistory;
