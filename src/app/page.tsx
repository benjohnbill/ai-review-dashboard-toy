"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // Basic URL parser (assuming https://github.com/owner/repo format)
      const parts = url.replace("https://github.com/", "").split("/");
      const owner = parts[0];
      const repo = parts[1];

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error analyzing repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">AI Code Review Dashboard</h1>
          <p className="text-gray-600">Enter a GitHub repository URL to get an instant AI-powered code review.</p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="https://github.com/owner/repo"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              id="repo-url-input"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !url}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              id="analyze-button"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">File: {result.file}</h2>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto max-h-60">
                <pre><code>{result.content}</code></pre>
              </div>
            </section>

            <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">AI Review</h2>
              <div className="prose prose-blue max-w-none text-blue-800 whitespace-pre-wrap">
                {result.review}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
