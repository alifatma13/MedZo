// deploy.mjs — uploads dist/ to Hostinger via FTP.
// Run via: npm run deploy  (which first builds, then calls this script)
// Requires FTP_SERVER, FTP_USERNAME, FTP_PASSWORD in .env

import * as ftp from "basic-ftp";
import { readdirSync } from "fs";
import { join } from "path";

const required = ["FTP_SERVER", "FTP_USERNAME", "FTP_PASSWORD"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(", ")}`);
  console.error("Add them to your .env file and try again.");
  process.exit(1);
}

const client = new ftp.Client();
client.ftp.verbose = false;

try {
  await client.access({
    host: process.env.FTP_SERVER,
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    secure: true,
    secureOptions: { rejectUnauthorized: false },
  });

  console.log("Connected. Uploading dist/ → public_html/ ...");

  await client.uploadFromDir("./dist", "/public_html");

  console.log("Deploy complete.");
} catch (err) {
  console.error("Deploy failed:", err.message);
  process.exit(1);
} finally {
  client.close();
}
