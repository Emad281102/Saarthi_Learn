import { GoogleGenerativeAI } from "@google/generative-ai";

interface ListModelsResponse {
  models?: Array<{
    name?: string;
    supportedGenerationMethods?: string[];
  }>;
  error?: { message?: string };
}

function isPreviewOrExp(name: string): boolean {
  const n = name.toLowerCase();
  return n.includes("preview") || n.includes("-exp") || n.includes("experimental");
}

async function listAvailableModels(apiKey: string): Promise<string[]> {
  try {
    const resp = await fetch("https://generativelanguage.googleapis.com/v1beta/models", {
      method: "GET",
      headers: {
        "x-goog-api-key": apiKey,
      },
    });
    const data: ListModelsResponse = await resp.json().catch(() => ({} as ListModelsResponse));
    if (!resp.ok) {
      const msg = data?.error?.message || `ListModels failed: ${resp.status} ${resp.statusText}`;
      throw new Error(msg);
    }
    const models = Array.isArray(data.models) ? data.models : [];
    return models
      .filter((m) => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes("generateContent"))
      .map((m) => (m.name ?? "").replace(/^models\//, "").trim())
      .filter((n) => n.length > 0);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`ListModels network error: ${msg}`);
  }
}

export async function generateGeminiAnswer(prompt: string): Promise<string> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_AI_API_KEY in environment. Set it in .env.local");
  }

  const envModel = (process.env.GOOGLE_GEMINI_MODEL || "").trim();
  const envIsPreview = !!envModel && isPreviewOrExp(envModel);
  const basePrefs = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
    "gemini-1.0-pro",
    "gemini-1.0-pro-latest",
    "gemini-1.0-pro-002",
    "gemini-1.0-pro-001",
    "gemini-pro",
  ];
  const preferenceOrder = envModel && !envIsPreview ? [envModel, ...basePrefs] : [...basePrefs];

  const genAI = new GoogleGenerativeAI(apiKey);

  // Build candidate list: env -> preferences -> available (excluding preview/exp), de-duped
  let available: string[] = [];
  try {
    available = await listAvailableModels(apiKey);
  } catch {
    available = [];
  }
  const stableAvailable = available.filter((m) => !isPreviewOrExp(m));
  const previewAvailable = available.filter((m) => isPreviewOrExp(m));
  const candidates: string[] = Array.from(new Set([
    ...preferenceOrder,
    ...stableAvailable,
    ...(envIsPreview && envModel ? [envModel] : []),
    ...previewAvailable,
  ]));

  const errors: { model: string; message: string }[] = [];

  for (const modelName of candidates) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text && text.trim()) {
        console.log(`[Gemini] Using model: ${modelName}`);
        return text.trim();
      }
      throw new Error("Empty response");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      const retryable = /Too Many Requests|quota|429|404|Not Found|403/.test(msg);
      errors.push({ model: modelName, message: msg });
      if (!retryable) {
        break;
      }
      continue;
    }
  }

  const tried = candidates.join(", ");
  const details = errors.map((e) => `${e.model}: ${e.message}`).join(" | ");
  const allRetryable = errors.length > 0 && errors.every((e) => /Too Many Requests|quota|429|404|Not Found|403/.test(e.message));
  if (allRetryable) {
    console.error(`[Gemini] Rate-limited or unavailable across candidates. Tried: ${tried}. Details: ${details}`);
    return "I’m currently at capacity. Please retry in a minute.";
  }
  console.error(`[Gemini] All candidates failed. Tried: ${tried}. Details: ${details}`);
  throw new Error(`All Gemini candidates failed. Tried: ${tried}. Details: ${details}`);
}

export async function transcribeGeminiAudio({ audioBase64, mimeType, langHint }: { audioBase64: string; mimeType: string; langHint?: string }): Promise<string> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_AI_API_KEY in environment. Set it in .env.local");
  }

  const envModel = (process.env.GOOGLE_GEMINI_MODEL || "").trim();
  const envIsPreview = !!envModel && isPreviewOrExp(envModel);
  const basePrefs = [
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
  ];
  const preferenceOrder = envModel && !envIsPreview ? [envModel, ...basePrefs] : [...basePrefs];

  const genAI = new GoogleGenerativeAI(apiKey);

  let available: string[] = [];
  try {
    available = await listAvailableModels(apiKey);
  } catch {
    available = [];
  }
  const stableAvailable = available.filter((m) => !isPreviewOrExp(m));
  const previewAvailable = available.filter((m) => isPreviewOrExp(m));
  const candidates: string[] = Array.from(new Set([
    ...preferenceOrder,
    ...stableAvailable,
    ...(envIsPreview && envModel ? [envModel] : []),
    ...previewAvailable,
  ]));

  const instructions = [
    "Transcribe the following audio to plain text.",
    "Return only the transcript without extra commentary.",
    langHint ? `Language hint: ${langHint}` : undefined,
  ].filter(Boolean).join("\n");

  const errors: { model: string; message: string }[] = [];

  for (const modelName of candidates) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent([
        { text: instructions },
        { inlineData: { data: audioBase64, mimeType } },
      ]);
      const text = result.response.text();
      if (text && text.trim()) {
        console.log(`[Gemini STT] Using model: ${modelName}`);
        return text.trim();
      }
      throw new Error("Empty transcription response");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      const retryable = /Too Many Requests|quota|429|404|Not Found|403/.test(msg);
      errors.push({ model: modelName, message: msg });
      if (!retryable) {
        break;
      }
      continue;
    }
  }

  const tried = candidates.join(", ");
  const details = errors.map((e) => `${e.model}: ${e.message}`).join(" | ");
  const allRetryable = errors.length > 0 && errors.every((e) => /Too Many Requests|quota|429|404|Not Found|403/.test(e.message));
  if (allRetryable) {
    console.error(`[Gemini STT] Rate-limited or unavailable across candidates. Tried: ${tried}. Details: ${details}`);
    return "I’m currently at capacity. Please retry in a minute.";
  }
  console.error(`[Gemini STT] All candidates failed. Tried: ${tried}. Details: ${details}`);
  throw new Error(`All Gemini STT candidates failed. Tried: ${tried}. Details: ${details}`);
}