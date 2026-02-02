"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function runAgent() {
    const res = await fetch("/api/run-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input })
    });

    const data = await res.json();
    setOutput(data.output_text);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Private Product Description Agent</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste product info here..."
        style={{ width: "100%", height: 120 }}
      />

      <button onClick={runAgent} style={{ marginTop: 20 }}>
        Generate Description
      </button>

      {output && (
        <pre style={{ marginTop: 40, whiteSpace: "pre-wrap" }}>
          {output}
        </pre>
      )}
    </div>
  );
}
