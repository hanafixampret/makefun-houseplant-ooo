import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Out of office: the cactus filed for workers' comp after someone hugged it. Direct all complaints to the thorns.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== ENTRY) throw new Error("round-trip mismatch");
if (ENTRY.length < 1 || ENTRY.length > 120) {
  throw new Error(`entry length ${ENTRY.length} outside 1-120`);
}
if (ENTRY.trim().length === 0) throw new Error("entry is blank");
if (ENTRY !== ENTRY.trim()) throw new Error("entry has leading/trailing space");
if (ENTRY.includes("\n")) throw new Error("entry must be one line");
if (ENTRY.includes("  ")) throw new Error("entry has double space");
console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
