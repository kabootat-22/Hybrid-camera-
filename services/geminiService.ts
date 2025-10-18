
import { GoogleGenAI, Modality } from "@google/genai";

export async function editImageWithGemini(base64Image: string, mimeType: string, prompt: string): Promise<string> {
  // It's crucial to create a new instance right before the API call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    throw new Error("No image data returned from Gemini API.");

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
        // This specific error suggests an API key issue.
        // The UI component will handle prompting the user to re-select the key.
        throw new Error("API key not found. Please select your API key again.");
    }
    throw new Error("Failed to edit image. Please try again.");
  }
}
