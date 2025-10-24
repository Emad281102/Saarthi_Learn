import { NextRequest, NextResponse } from "next/server";
import { transcribeGeminiAudio } from "@/lib/gemini";

interface STTRequestBody {
  audioBase64?: string;
  mimeType?: string;
  lang?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: STTRequestBody = await request.json();
    const { audioBase64, mimeType, lang } = body || {};

    if (!audioBase64 || !mimeType) {
      return NextResponse.json({ error: "audioBase64 and mimeType are required" }, { status: 400 });
    }

    const transcript = await transcribeGeminiAudio({ audioBase64, mimeType, langHint: lang });
    return NextResponse.json({ success: true, transcript });
  } catch (error) {
    console.error("STT POST Error:", error);
    const message = error instanceof Error ? error.message : "Failed to transcribe audio";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}