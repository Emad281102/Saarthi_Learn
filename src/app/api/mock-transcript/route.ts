// app/api/mock-transcript/route.ts
import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/db";
import { uploadToFilebase } from "@/lib/filebase";

export async function POST(req: NextRequest) {
  const { lectureId } = await req.json();

  const lecture = await prisma.lecture.findUnique({ where: { id: lectureId } });
  if (!lecture) return NextResponse.json({ error: "Lecture not found" }, { status: 404 });

  // Fake transcript
  const transcriptText = `Transcript for lecture ${lectureId}\n\n- Intro\n- Main Content\n- Conclusion`;
  const transcriptBuffer = Buffer.from(transcriptText, "utf-8");
  const key = `transcripts/${lectureId}.txt`;

  const transcriptUrl = await uploadToFilebase(
    process.env.FILEBASE_BUCKET!,
    key,
    transcriptBuffer,
    "text/plain"
  );

  await prisma.lecture.update({
    where: { id: lectureId },
    data: { transcriptUrl },
  });

  return NextResponse.json({ transcriptUrl });
}
