
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export async function getAssistantResponse(messages: Message[]): Promise<{ text: string; sources?: Message['sources'] }> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Pegamos na última mensagem do utilizador
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || "";

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: lastUserMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }]
      },
    });

    const text = response.text || "O Investigador não conseguiu formular uma resposta neste momento.";
    
    // Extração de fontes do grounding
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web.title || "Fonte de Notícias",
        uri: chunk.web.uri
      }));

    return { text, sources };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "ERRO DE PROTOCOLO: Falha na ligação ao núcleo neural. Verifique a conectividade do terminal." 
    };
  }
}
