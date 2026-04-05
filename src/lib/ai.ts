import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function generateCodeReview(code: string) {
  const { text } = await generateText({
    model: google("gemini-1.5-pro-latest"),
    system: "You are an expert software engineer. Review the provided code for bugs, security issues, performance bottlenecks, and adherence to best practices. Be concise and provide actionable suggestions.",
    prompt: `Review this code:\n\n${code}`,
  });
  
  return text;
}
