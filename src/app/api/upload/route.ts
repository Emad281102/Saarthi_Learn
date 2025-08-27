import { NextRequest, NextResponse } from "next/server";
import { uploadToFilebase } from "@/lib/filebase";
import  prisma  from "@/lib/db";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `videos/${Date.now()}-${file.name}`;
  
  // Upload to Filebase
  const videoUrl = await uploadToFilebase(process.env.FILEBASE_BUCKET!, key, buffer, file.type);

  // Save URL in MongoDB via Prisma
  const lecture = await prisma.lecture.create({
    data: { videoUrl },
  });

  return NextResponse.json({ lecture });
}
