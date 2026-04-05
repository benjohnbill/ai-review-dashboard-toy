export async function fetchRepoCode(owner: string, repo: string, path: string = "") {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "AI-Code-Review-Dashboard",
    },
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch repo contents: ${res.statusText}`);
  }
  
  const data = await res.json();
  
  // Base64 decoding if it's a single file
  if (!Array.isArray(data) && data.encoding === "base64") {
    return {
      ...data,
      content: Buffer.from(data.content, "base64").toString("utf-8"),
    };
  }
  
  return data;
}
