﻿import { NextRequest, NextResponse } from "next/server";
import { generateGeminiAnswer } from "@/lib/gemini";

interface StoredMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  subject?: string;
  timestamp: string;
  updatedAt?: string;
}

const messagesStore: StoredMessage[] = [];

export async function GET() {
  try {
    return NextResponse.json({ success: true, messages: messagesStore, count: messagesStore.length });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, subject } = body || {};

    if (!message || !String(message).trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const userMessage: StoredMessage = {
      id: Date.now().toString(),
      content: String(message),
      sender: "user",
      subject: subject || undefined,
      timestamp: new Date().toISOString(),
    };
    messagesStore.push(userMessage);

    // Build a concise context from recent chat for better continuity
    const recent = messagesStore.slice(-10)
      .map((m) => `${m.sender === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");

    const prompt = [
      // System-style guidance for Gemini
      "You are Saarthi Buddy, an educational assistant for the Saarthi-Learn platform.",
      "Answer all study-related questions with clear, step-by-step explanations, concise examples, and simple language suitable for students.",
      "If the question is about the website, provide helpful navigation guidance referencing these pages when relevant: /dashboard, /courses, /saarthi-buddy, /saarthi-notes, /help, /community, /contact.",
      "Avoid hallucinations and keep answers compact but helpful.",
      subject ? `Subject hint: ${subject}` : undefined,
      recent ? `Chat History:\n${recent}` : undefined,
      `Question: ${String(message)}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    // Gracefully handle AI errors, including missing env, by returning a helpful fallback
    let aiText: string;
    try {
      aiText = await generateGeminiAnswer(prompt);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn("Gemini error, responding with fallback:", msg);
      aiText = "I’m unable to reach the AI service right now. Please try again later. If you’re an admin, set GOOGLE_AI_API_KEY in .env.local.";
    }

    const aiMessage: StoredMessage = {
      id: (Date.now() + 1).toString(),
      content: aiText,
      sender: "ai",
      subject: subject || undefined,
      timestamp: new Date().toISOString(),
    };
    messagesStore.push(aiMessage);

    return NextResponse.json({ success: true, userMessage, aiMessage });
  } catch (error) {
    console.error("POST Error:", error);
    const message = error instanceof Error ? error.message : "Failed to process message";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, content } = body;

    const message = messagesStore.find((m) => m.id === id);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    message.content = content;
    message.updatedAt = new Date().toISOString();

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const message = messagesStore.find((m) => m.id === id);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    Object.assign(message, updates);
    message.updatedAt = new Date().toISOString();

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    }

    const index = messagesStore.findIndex((m) => m.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    messagesStore.splice(index, 1);

    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
