/**
 * Render runs only "npm install" by default. Compile TypeScript after install on Render/CI.
 */
const { execSync } = require("node:child_process");
const { existsSync } = require("node:fs");
const { join } = require("node:path");

const shouldBuild =
  process.env.RENDER === "true" ||
  process.env.CI === "true" ||
  process.env.FORCE_POSTINSTALL_BUILD === "1";

if (!shouldBuild) {
  process.exit(0);
}

const entry = join(__dirname, "..", "dist", "server.js");
if (existsSync(entry)) {
  process.exit(0);
}

execSync("npm run build", { stdio: "inherit" });
