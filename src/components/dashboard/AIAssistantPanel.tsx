import React, { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Wand2,
  X,
  MessageSquare,
  BrainCircuit,
  ChevronRight,
  Send,
} from "lucide-react";

import { aiService } from "@/lib/api";
import type { AIResponse } from "@/lib/api";

interface AIAssistantPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  context?: Record<string, any>;
}

const AIAssistantPanel = ({
  isOpen = true,
  onClose = () => {},
  context = {},
}: AIAssistantPanelProps) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<AIResponse[]>([]);

  const loadSuggestions = useCallback(async () => {
    try {
      setLoading(true);
      const newSuggestions = await aiService.getSuggestions(context);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Error loading suggestions:", error);
    } finally {
      setLoading(false);
    }
  }, [context]);

  const handleSendPrompt = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const response = await aiService.generateContent({
        prompt: input,
        context,
        type: "text",
      });
      setSuggestions((prev) => [response, ...prev]);
      setInput("");
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      className={`fixed right-0 top-0 h-screen w-[400px] bg-white shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)] p-4">
        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Generate Ideas
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Get Feedback
              </Button>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              AI Suggestions
            </h3>
            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="mb-2">
                        {suggestion.type}
                      </Badge>
                      <p className="text-sm text-gray-600">
                        {suggestion.content}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Learning & Improvement
            </h3>
            <Card className="p-4 bg-blue-50">
              <p className="text-sm text-blue-700">
                Based on your recent campaigns, the AI has identified patterns
                that could improve your content strategy.
              </p>
              <Button variant="link" className="mt-2 p-0 h-auto text-blue-600">
                View Analysis
              </Button>
            </Card>
          </section>
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Assistant..."
            onKeyPress={(e) => e.key === "Enter" && handleSendPrompt()}
            disabled={loading}
          />
          <Button
            onClick={handleSendPrompt}
            disabled={loading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIAssistantPanel;
