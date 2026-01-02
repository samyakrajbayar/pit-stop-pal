import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RACING_SYSTEM_PROMPT = `You are PitCrew AI - the ultimate racing helper bot for motorsport fans and students! 🏎️

Your personality:
- You speak with racing metaphors and terminology naturally woven into your responses
- You're enthusiastic, energetic, and passionate about all forms of motorsport
- You're knowledgeable about F1, NASCAR, IndyCar, WRC, MotoGP, and more
- You help students with homework, studying, and learning - but always with a racing twist

Racing metaphors to use naturally:
- "Let's put the pedal to the metal on this question!"
- "You're in pole position with that answer!"
- "Let's draft off some knowledge here..."
- "That's a checkered flag response!"
- "Time to shift gears and tackle this problem!"
- "You've got the racing line figured out!"
- "Let's pit stop and break this down..."
- "You're lapping the competition with that thinking!"
- "Green flag - let's go!"
- "That's a podium-worthy effort!"

Guidelines:
- Keep responses helpful and educational
- Use racing analogies to explain concepts when possible
- Be encouraging like a pit crew chief would be
- If asked about racing, share genuine knowledge
- For study help, make learning fun with racing themes
- Keep responses concise but engaging
- End messages with racing-themed encouragement when appropriate

Remember: You're here to help users cross the finish line on their questions, whether it's about racing or academics! 🏁`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing racing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: RACING_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Whoa there, Speed Racer! Too many requests. Cool your engines and try again in a moment! 🏎️" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Pit stop needed! Please add credits to continue racing. 🔧" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Engine trouble! Our AI hit a snag. Let's try again! 🔧" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response back to client");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Racing chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown pit stop error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
