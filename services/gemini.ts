
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export async function getAssistantResponse(messages: Message[], isPremium: boolean = false): Promise<{ text: string; sources?: Message['sources'] }> {
  const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
  const API_KEY = "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";

  // Prepara o conteúdo da última mensagem do utilizador para o campo {{input1}}
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || "";

  const payload = {
    "model": "mistralai/mistral-7b-instruct", 
    "messages": [
      { 
        "role": "system", 
        "content": SYSTEM_PROMPT 
      },
      { 
        "role": "user", 
        "content": lastUserMessage 
      }
    ]
  };

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Portugal 2026 Auditoria'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Falha na comunicação com o terminal');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Resposta vazia do Investigador');
    }

    return { 
      text: content,
      sources: [] 
    };

  } catch (error) {
    console.error("OpenRouter/Investigador Error:", error);
    return { 
      text: "ERRO DE PROTOCOLO: O Investigador não conseguiu processar esta auditoria. Verifique a conectividade do terminal ou tente mais tarde." 
    };
  }
}
