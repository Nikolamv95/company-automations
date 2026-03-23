import { createReadStream, readdirSync } from "fs";
import { join } from "path";
import type { drive_v3 } from "googleapis";

export function getMdFiles(localDir: string): string[] {
  const files = readdirSync(localDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (files.length === 0) {
    throw new Error(`No .md files found in ${localDir}`);
  }

  return files;
}

export async function uploadFile(
  drive: drive_v3.Drive,
  filePath: string,
  fileName: string,
  folderId: string
): Promise<drive_v3.Schema$File> {
  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType: "text/plain",
      body: createReadStream(filePath),
    },
    fields: "id, name",
  });

  return res.data;
}
