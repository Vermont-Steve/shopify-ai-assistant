import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: "You are an internal assistant for managing a Shopify store.",
          },
          {
            role: "user",
            content: body.message,
          },
        ],
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      reply: data.choices[0].message.content,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    );
  }
}
