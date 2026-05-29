/**
 * OpenNext Cloudflare build wrapper.
 *
 * Node.js 24 on Windows has a bug where `fs.cpSync` silently copies
 * nothing.  We replace it with a manual recursive copy that works.
 */

import fs from "node:fs";
import path from "node:path";

// ── Reliable recursive copy ─────────────────────────────────────
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    const st = fs.lstatSync(s);
    if (st.isDirectory()) {
      copyDir(s, d);
    } else if (st.isFile()) {
      fs.copyFileSync(s, d);
    }
  }
}

// Override cpSync with our working version
fs.cpSync = function cpSyncOverride(src, dest, opts) {
  copyDir(path.resolve(src), path.resolve(dest));
};

// ── Error handlers ──────────────────────────────────────────────
process.on("unhandledRejection", (r) => {
  console.error("UNHANDLED REJECTION:", r);
  process.exit(1);
});
process.on("uncaughtException", (e) => {
  console.error("UNCAUGHT EXCEPTION:", e);
  process.exit(1);
});

// ── Run OpenNext build ──────────────────────────────────────────
import { pathToFileURL } from "node:url";
const buildJs = path.join(
  process.cwd(),
  "node_modules/@opennextjs/cloudflare/dist/cli/commands/build.js",
);
const { buildCommand } = await import(pathToFileURL(buildJs).href);

try {
  await buildCommand({
    _: ["build"],
    args: [],
    skipNextBuild: ["1", "true", "yes"].includes(
      String(process.env.SKIP_NEXT_APP_BUILD),
    ),
    dangerouslyUseUnsupportedNextVersion: true,
    skipWranglerConfigCheck: true,
    wranglerConfigPath: undefined,
    wranglerArgs: [],
  });
} catch (err) {
  console.error("Build failed:", err);
  process.exit(1);
}
