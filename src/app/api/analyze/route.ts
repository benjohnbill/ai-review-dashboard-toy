import { NextRequest, NextResponse } from "next/server";
import { fetchRepoCode } from "@/lib/github";
import { generateCodeReview } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { owner, repo, path } = await req.json();
    
    if (!owner || !repo) {
      return NextResponse.json({ error: "Owner and Repo are required" }, { status: 400 });
    }
    
    const githubData = await fetchRepoCode(owner, repo, path || "README.md");
    
    let review = "No content to review.";
    if (githubData.content) {
      review = await generateCodeReview(githubData.content);
    }
    
    return NextResponse.json({
      file: githubData.name,
      content: githubData.content,
      review: review
    });
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
