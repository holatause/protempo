import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";

interface Message {
  type: "bot" | "user";
  content: string;
  action?: {
    type: string;
    data?: any;
  };
}

interface CompanyInfo {
  name: string;
  industry: string;
  targetAudience: string;
}

const INITIAL_MESSAGE = {
  type: "bot" as const,
  content:
    "¡Hola! Soy tu asistente de marketing con IA. Para empezar, ¿cuál es el nombre de tu empresa o marca?",
};

const INDUSTRY_SUGGESTIONS = [
  "Tecnología",
  "Comercio",
  "Servicios",
  "Manufactura",
  "Salud",
  "Educación",
  "Otro",
];

import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/store/onboarding";

const AIAgent = () => {
  const navigate = useNavigate();
  const setCompanyData = useOnboardingStore((state) => state.setCompanyData);
  const [companyInfo, setCompanyInfo] = React.useState({
    name: "",
    industry: "",
    targetAudience: "",
  });
  const [messages, setMessages] = React.useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = React.useState("");
  const [step, setStep] = React.useState(1);

  const validateCompanyName = (name: string) => {
    return name.length >= 2;
  };

  const validateIndustry = (industry: string) => {
    return industry.length >= 3;
  };

  const validateTargetAudience = (audience: string) => {
    return audience.length >= 5;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user" as const, content: input };
    let botResponse: Message;

    switch (step) {
      case 1:
        if (!validateCompanyName(input)) {
          botResponse = {
            type: "bot",
            content:
              "Por favor ingresa un nombre válido para tu empresa (mínimo 2 caracteres)",
          };
          break;
        }
        setCompanyInfo((prev) => ({ ...prev, name: input }));
        botResponse = {
          type: "bot",
          content: `Gracias. ¿En qué industria opera ${input}? Algunas opciones son: ${INDUSTRY_SUGGESTIONS.join(", ")}`,
        };
        setStep(2);
        break;

      case 2:
        if (!validateIndustry(input)) {
          botResponse = {
            type: "bot",
            content:
              "Por favor describe tu industria con más detalle (mínimo 3 caracteres)",
          };
          break;
        }
        setCompanyInfo((prev) => ({ ...prev, industry: input }));
        botResponse = {
          type: "bot",
          content:
            "Excelente. ¿Podrías describir tu público objetivo principal? Por ejemplo: edad, ubicación, intereses, etc.",
        };
        setStep(3);
        break;

      case 3:
        if (!validateTargetAudience(input)) {
          botResponse = {
            type: "bot",
            content:
              "Por favor describe tu público objetivo con más detalle (mínimo 5 caracteres)",
          };
          break;
        }
        const finalData = { ...companyInfo, targetAudience: input };
        setCompanyInfo(finalData);
        setCompanyData(finalData);
        botResponse = {
          type: "bot",
          content: `¡Perfecto! Basado en tu información:

Empresa: ${finalData.name}
Industria: ${finalData.industry}
Público: ${finalData.targetAudience}

Te llevaré a tu panel personalizado donde podremos comenzar a trabajar en tu estrategia de marketing.`,
        };
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
        setStep(4);
        break;

      default:
        botResponse = {
          type: "bot",
          content:
            "Entiendo. ¿Te gustaría que te ayude a desarrollar esa idea más a fondo?",
        };
    }

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInput("");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col bg-white shadow-xl border-0">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${message.type === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "bot" ? "bg-primary" : "bg-gray-700"}`}
              >
                {message.type === "bot" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 max-w-[80%] ${message.type === "bot" ? "bg-secondary" : "bg-primary text-white"}`}
              >
                {message.content.split("\n").map((line, i) => (
                  <p key={i} className="mb-1 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1"
        />
        <Button onClick={handleSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default AIAgent;
