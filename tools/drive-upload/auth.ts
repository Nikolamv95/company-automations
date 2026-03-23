import { google } from "googleapis";
import type { drive_v3 } from "googleapis";

export function createDriveClient(): drive_v3.Drive {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  );

  auth.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN });

  return google.drive({ version: "v3", auth });
}
