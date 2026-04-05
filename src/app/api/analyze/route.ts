import { NextRequest, NextResponse } from "next/server";
import { fetchRepoCode } from "@/lib/github";

export async function POST(req: NextRequest) {
  try {
    const { owner, repo, path } = await req.json();
    
    if (!owner || !repo) {
      return NextResponse.json({ error: "Owner and Repo are required" }, { status: 400 });
    }
    
    const data = await fetchRepoCode(owner, repo, path || "README.md");
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
