// Función Edge para proxear solicitudes a OpenAI
// Esto permite mantener la API key segura en el servidor

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  prompt: string;
  type: "text" | "image" | "marketing" | "analytics";
  options?: Record<string, any>;
}

Deno.serve(async (req) => {
  // Manejar solicitudes OPTIONS para CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Verificar autenticación
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Verificar que el usuario está autenticado
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Obtener datos de la solicitud
    const { prompt, type, options } = (await req.json()) as RequestBody;

    // Validar datos
    if (!prompt || !type) {
      return new Response(
        JSON.stringify({ error: "Faltan parámetros requeridos" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Registrar la solicitud en Supabase
    await supabaseClient.from("ai_requests").insert({
      prompt,
      type,
      options,
      user_id: user.id,
    });

    // En una implementación real, aquí se llamaría a la API de OpenAI
    // const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    // let openaiResponse

    // if (type === 'image') {
    //   // Llamada a DALL-E para generar imágenes
    //   const response = await fetch('https://api.openai.com/v1/images/generations', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${openaiApiKey}`
    //     },
    //     body: JSON.stringify({
    //       prompt,
    //       n: 1,
    //       size: options?.size || '1024x1024',
    //       response_format: 'url'
    //     })
    //   })
    //   const data = await response.json()
    //   openaiResponse = data.data[0].url
    // } else {
    //   // Llamada a GPT para generar texto
    //   const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${openaiApiKey}`
    //     },
    //     body: JSON.stringify({
    //       model: 'gpt-4',
    //       messages: [
    //         {
    //           role: 'system',
    //           content: getSystemPrompt(type)
    //         },
    //         {
    //           role: 'user',
    //           content: prompt
    //         }
    //       ],
    //       temperature: 0.7
    //     })
    //   })
    //   const data = await response.json()
    //   openaiResponse = data.choices[0].message.content
    // }

    // Para la demo, simulamos una respuesta
    let content = "";
    switch (type) {
      case "text":
        content = `Contenido generado para: ${prompt}\n\nEste es un ejemplo de texto generado por IA basado en tu solicitud. En una implementación real, este contenido sería generado por un modelo de lenguaje como GPT-4.`;
        break;
      case "image":
        content =
          "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80";
        break;
      case "marketing":
        content = `# Estrategia de Marketing para: ${prompt}\n\n## Puntos clave\n1. Identificar audiencia objetivo\n2. Establecer KPIs claros\n3. Desarrollar mensajes persuasivos\n4. Seleccionar canales adecuados\n5. Implementar y medir resultados`;
        break;
      case "analytics":
        content = `Análisis para: ${prompt}\n\nBasado en los datos disponibles, se recomienda:\n- Aumentar inversión en canales con mejor ROI\n- Optimizar la tasa de conversión en la página de destino\n- Segmentar campañas por comportamiento de usuario`;
        break;
    }

    // Registrar la respuesta en Supabase
    const { data: requestData } = await supabaseClient
      .from("ai_requests")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1);

    await supabaseClient.from("ai_responses").insert({
      content,
      type,
      request_id: requestData?.[0]?.id,
      user_id: user.id,
    });

    // Devolver la respuesta
    return new Response(
      JSON.stringify({
        content,
        type,
        metadata: {
          model: "gpt-4-simulation",
          timestamp: new Date().toISOString(),
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Función para obtener el prompt de sistema según el tipo de solicitud
function getSystemPrompt(type: string): string {
  switch (type) {
    case "marketing":
      return "Eres un experto en marketing digital especializado en el mercado colombiano. Tu objetivo es proporcionar estrategias efectivas, contenido persuasivo y recomendaciones basadas en las mejores prácticas de la industria. Adapta tus respuestas al contexto latinoamericano y utiliza ejemplos relevantes para Colombia.";
    case "analytics":
      return "Eres un analista de datos especializado en marketing digital. Tu objetivo es interpretar métricas, identificar tendencias y proporcionar recomendaciones accionables para optimizar campañas. Utiliza un enfoque basado en datos y explica tus conclusiones de manera clara y concisa.";
    default:
      return "Eres un asistente de marketing digital útil y profesional. Proporciona respuestas claras, concisas y útiles a las preguntas sobre marketing, publicidad, contenido y estrategias digitales.";
  }
}
