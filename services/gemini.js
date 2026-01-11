
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants.js";

/**
 * Comunicação com o núcleo neural Gemini
 */
export async function getAssistantResponse(messages) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Pegamos na última interação do utilizador
    const lastMsg = messages.filter(m => m.role === 'user').pop()?.content || "";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: lastMsg,
      config: { 
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }] 
      },
    });

    const text = response.text || "O Investigador não conseguiu processar esta consulta.";
    
    // Extração de fontes para transparência
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = grounding
      .filter(g => g.web)
      .map(g => ({ title: g.web.title || "Fonte", uri: g.web.uri }));

    return { text, sources };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "FALHA DE PROTOCOLO: Ligação ao núcleo neural interrompida." };
  }
}
