import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import type { drive_v3 } from "googleapis";

export async function listFiles(
  drive: drive_v3.Drive,
  folderId: string
): Promise<drive_v3.Schema$File[]> {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: "files(id, name, mimeType, size, modifiedTime)",
    orderBy: "name",
  });

  return res.data.files ?? [];
}

export async function downloadFile(
  drive: drive_v3.Drive,
  fileId: string,
  destPath: string
): Promise<void> {
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  await pipeline(res.data as NodeJS.ReadableStream, createWriteStream(destPath));
}
