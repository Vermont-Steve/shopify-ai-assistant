"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input) return;

    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages([
      ...messages,
      { user: input, ai: data.reply || "Error" },
    ]);

    setInput("");
    setLoading(false);
  }

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "auto" }}>
      <h1>Shopify Internal AI Assistant</h1>

      <div style={{ marginBottom: 30 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <b>You:</b> {m.user}
            <br />
            <b>AI:</b> {m.ai}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "75%",
          padding: 10,
          fontSize: 16,
        }}
        placeholder="Ask something..."
      />

      <button
        onClick={send}
        disabled={loading}
        style={{
          padding: "10px 20px",
          marginLeft: 10,
          fontSize: 16,
        }}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </main>
  );
}
