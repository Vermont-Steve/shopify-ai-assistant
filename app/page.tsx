"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function runAgent() {
    const res = await fetch("/api/run-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input_text: input,
        image_base64: imageBase64
      })
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

      <div style={{ marginTop: 20 }}>
        <input type="file" accept="image/*" onChange={handleFile} />
      </div>

      {imageBase64 && (
        <div style={{ marginTop: 20 }}>
          <img
            src={imageBase64}
            alt="preview"
            style={{ maxWidth: 200, borderRadius: 8 }}
          />
        </div>
      )}

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
