import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1", // Filebase default
  endpoint: "https://s3.filebase.com",
  credentials: {
    accessKeyId: process.env.FILEBASE_ACCESS_KEY!,
    secretAccessKey: process.env.FILEBASE_SECRET_KEY!,
  },
});

export async function uploadToFilebase(bucket: string, key: string, file: Buffer, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: contentType,
  });
  await s3.send(command);

  return `${process.env.FILEBASE_ENDPOINT}/${bucket}/${key}`;
}
