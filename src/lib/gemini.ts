import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateChatResponse(messages: { role: 'user' | 'model', parts: {text: string}[] }[], newMessage: string) {
  if (!genAI) {
    throw new Error("API key is missing. Please add VITE_GEMINI_API_KEY to your .env file and restart the server.");
  }
  
  // Use gemini-2.5-flash (the 503 error means it's just busy, but it is available for your account)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const chat = model.startChat({
    history: messages,
  });

  const result = await chat.sendMessage(newMessage);
  return result.response.text();
}
