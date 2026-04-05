import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function generateCodeReview(code: string) {
  // IMPROVEMENT: Added structured formatting instructions
  const { text } = await generateText({
    model: google("gemini-1.5-pro-latest"),
    system: `You are an expert software engineer. 
    Review the code and provide results in the following format:
    1. SUMMARY: High-level overview
    2. BUGS: Potential logic errors
    3. SECURITY: Security vulnerabilities
    4. SUGGESTIONS: Actionable improvements`,
    prompt: `Review this code:\n\n${code}`,
  });
  
  return text;
}
