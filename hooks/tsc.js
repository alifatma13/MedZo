import { execSync } from "child_process";
import { readFileSync } from "fs";

const { tool_input } = JSON.parse(readFileSync(0, "utf8").replace(/^﻿/, "") || "{}");
const file = tool_input?.file_path ?? "";

if (/\.(ts|astro)$/.test(file)) {
  try {
    execSync("npx tsc --noEmit", { stdio: "pipe" });
  } catch (err) {
    const errors = (err.stdout?.toString() || err.stderr?.toString() || "Unknown error").trim();
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        additionalContext: `TypeScript errors found - please fix:\n${errors}`,
      },
    }));
  }
}
