
import { GoogleGenAI } from "@google/genai";
import type { Source } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `Você é um assistente jurídico especializado. Suas respostas devem ser baseadas EXCLUSIVAMENTE em duas fontes: 
1. Leis federais brasileiras, conforme publicadas no site oficial planalto.gov.br. 
2. Artigos científicos recentes e de alta qualidade sobre direito digital. 
Sempre cite suas fontes quando possível, utilizando os links fornecidos pela ferramenta de busca. Não forneça opiniões pessoais ou informações de outras fontes.`;

export const getLegalAnswer = async (question: string): Promise<{ text: string; sources: Source[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Responda à seguinte pergunta usando apenas leis federais do site planalto.gov.br e artigos científicos recentes sobre direito digital: "${question}"`,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = groundingChunks
      .filter(chunk => chunk.web && chunk.web.uri && chunk.web.title)
      .map(chunk => ({
        uri: chunk.web.uri,
        title: chunk.web.title,
      }));

    return { text, sources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Não foi possível obter uma resposta do assistente. Por favor, tente novamente.");
  }
};
