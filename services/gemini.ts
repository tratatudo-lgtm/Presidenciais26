import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

const unlockPremiumTool: FunctionDeclaration = {
  name: "unlock_premium",
  parameters: {
    type: Type.OBJECT,
    description: "Ativa o acesso premium se o comprovativo enviado pelo utilizador for válido (valor >= 5€).",
    properties: {
      valor_detetado: {
        type: Type.NUMBER,
        description: "O valor total em euros encontrado no comprovativo."
      },
      confirmacao: {
        type: Type.STRING,
        description: "Breve descrição do que foi validado (ex: MB WAY 5€)."
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
      model: 'gemini-2.5-flash-lite-latest',
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
    const functionCalls = response.candidates?.[0]?.content?.parts?.filter(p => p.functionCall);
    
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0].functionCall;
      if (call && call.name === 'unlock_premium') {
        const val = (call.args as any).valor_detetado;
        if (val >= 5) {
          shouldUnlock = true;
        }
      }
    }

    const text = response.text || "O Investigador está a analisar os dados...";
    
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = grounding
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || "Fonte Verificada",
        uri: chunk.web?.uri || "#"
      }));

    return { text, sources, shouldUnlock };

  } catch (error) {
    console.error("Erro Gemini:", error);
    return { 
      text: "FALHA NO TERMINAL: O núcleo neural não responde. Verifique a ligação." 
    };
  }
}