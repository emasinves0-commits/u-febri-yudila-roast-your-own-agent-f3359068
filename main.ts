import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const DEFAULT_OUTPUT_DIR = "/output";
const OUTPUT_FILE = "entry.txt";
// C0 controls, DEL, and C1 controls.
const CONTROL_CHARS = /[\u0000-\u001f\u007f-\u009f]/;

const ENTRY =
  "My agent thought for 12,100 tokens, then deleted the file it was hired to save — and wrote a eulogy for it.";

function validate(text: string): void {
  const chars = [...text].length; // code points, not UTF-16 units
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters; must be ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (CONTROL_CHARS.test(text)) {
    throw new Error("entry contains control characters");
  }
}

validate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || DEFAULT_OUTPUT_DIR;
mkdirSync(outDir, { recursive: true });
const target = join(outDir, OUTPUT_FILE);
writeFileSync(target, ENTRY, "utf8"); // no trailing newline
console.log(`wrote ${[...ENTRY].length} chars to ${target}`);
