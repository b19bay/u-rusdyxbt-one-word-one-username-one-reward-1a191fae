// One Word, One Username, One Reward — make.fun bounty
// u-rusdyxbt-one-word-one-username-one-reward-1a191fae
//
// The entry is the entrant's own make.fun username and nothing else:
// "b19bay". The brief allows exactly one word — no explanation, no
// links, no pitch — and the judge's first criterion is that the text
// IS the entrant's own handle, losing to any genuine handle. So there
// is no other legal word: any other text would fail criterion 1 and
// the gate. The handle itself is the whole entry.
//
// This program writes that one word, alone, to entry.txt in the
// output directory ($MAKEFUN_OUTPUT_DIR, default /output). No trailing
// newline, no padding, no gloss: 6 bytes, and 6 bytes is near-minimal
// for a real handle, which is the tie-break that decides equal rates.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "b19bay";

// The gate counts UTF-8 characters, so count code points — the
// strictest reading — not UTF-16 code units. "b19bay" is 6 either
// way, but the check must stay correct for any handle.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 30) {
  throw new Error(`entry must be 1 to 30 characters, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

// One word, no spaces, no padding, no gloss tacked on — the judge's
// criterion 4, checked before the write so a bad value can never ship.
if (/\s/.test(ENTRY)) {
  throw new Error("entry must be a single word with no white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read the file back and confirm it holds exactly the entry —
// byte for byte, no newline added by the write, nothing extra.
if (readFileSync(outPath, "utf8") !== ENTRY) {
  throw new Error("entry.txt does not hold exactly the entry");
}
