
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

const unlockPremiumTool: FunctionDeclaration = {
  name: "unlock_premium",
  parameters: {
    type: Type.OBJECT,
    description: "Desbloqueia as funcionalidades premium do terminal quando um comprovativo de 5€ ou mais é detetado.",
    properties: {
      valor_detetado: {
        type: Type.NUMBER,
        description: "O valor em euros encontrado no comprovativo."
      },
      tipo_comprovativo: {
        type: Type.STRING,
        description: "MB WAY, Transferência Bancária, etc."
      }
    },
    required: ["valor_detetado"]
  }
};

export async function getAssistantResponse(messages: Message[]): Promise<{ 
  text: string; 
  sources?: Message['sources'];
  shouldUnlock?: boolean;
}> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const lastMsg = messages[messages.length - 1];

    const parts: any[] = [{ text: lastMsg.content }];
    
    if (lastMsg.image) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: lastMsg.image.split(',')[1]
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [
          { googleSearch: {} },
          { functionDeclarations: [unlockPremiumTool] }
        ]
      },
    });

    let shouldUnlock = false;
    if (response.functionCalls) {
      const call = response.functionCalls.find(f => f.name === 'unlock_premium');
      if (call) {
        const val = (call.args as any).valor_detetado;
        if (val >= 5) shouldUnlock = true;
      }
    }

    const text = response.text || "O Tuga está a processar os dados...";
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web.title || "Fonte de Notícias",
        uri: chunk.web.uri
      }));

    return { text, sources, shouldUnlock };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "FALHA NO TERMINAL: O núcleo neural não responde. Tenta novamente." 
    };
  }
}
