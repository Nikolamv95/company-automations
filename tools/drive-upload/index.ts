/**
 * Usage:
 *   npx tsx tools/drive-upload/index.ts <brand-slug> <product-slug> <drive-folder-id>
 *
 * Example:
 *   npx tsx tools/drive-upload/index.ts stoitchkov-nutrition water-goal-6 1UEQThhVmXsmwvPvNkMS_zCcUtgZuVBih
 */

import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { createDriveClient } from "./auth.js";
import { findOrCreateFolder } from "./folders.js";
import { getMdFiles, uploadFile } from "./uploader.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
config({ path: join(ROOT, ".env") });

const [brandSlug, productSlug, parentFolderId] = process.argv.slice(2);

if (!brandSlug || !productSlug || !parentFolderId) {
  process.stderr.write(
    "Usage: npx tsx tools/drive-upload/index.ts <brand-slug> <product-slug> <drive-folder-id>\n"
  );
  process.exit(1);
}

const localDir = join(ROOT, "output", brandSlug, productSlug);
const drive    = createDriveClient();
const files    = getMdFiles(localDir);

process.stdout.write(`\nUploading ${files.length} files → output/${brandSlug}/${productSlug}/\n\n`);

const { id: folderId, created } = await findOrCreateFolder(drive, productSlug, parentFolderId);
process.stdout.write(`${created ? "Created" : "Using"} folder: ${productSlug} (${folderId})\n\n`);

for (const file of files) {
  process.stdout.write(`  ${file} ... `);
  await uploadFile(drive, join(localDir, file), file, folderId);
  process.stdout.write("done\n");
}

process.stdout.write(`\nhttps://drive.google.com/drive/folders/${folderId}\n`);
