export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export type SuggestionType = 'trend' | 'regional' | 'date' | 'insight' | 'opportunity' | 'optimization';

export interface Suggestion {
  id: string;
  type: SuggestionType;
  title: string;
  description: string;
  action?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface AIContext {
  userId?: string;
  organizationId?: string;
  region?: string;
  industry?: string;
  preferences?: Record<string, any>;
}

export interface AIRequest {
  id: string;
  userId: string;
  prompt: string;
  model: string;
  context?: AIContext;
  timestamp: string;
}

export interface AIResponse {
  id: string;
  requestId: string;
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AIGeneratedImage {
  id: string;
  userId: string;
  prompt: string;
  imageUrl: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface SavedContent {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: 'text' | 'image' | 'campaign' | 'other';
  timestamp: string;
  tags?: string[];
  metadata?: Record<string, any>;
}
