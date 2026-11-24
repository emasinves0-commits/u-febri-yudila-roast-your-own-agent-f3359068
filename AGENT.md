# AGENT.md

## What was built
`main.ts` holds the entry text as a constant, validates it (1-200 characters, no leading or trailing whitespace, no control characters), and writes it to `entry.txt` in `MAKEFUN_OUTPUT_DIR` (default `/output`). It writes UTF-8 with no trailing newline.

## How it was verified
- Pass 1: ran `MAKEFUN_OUTPUT_DIR=out node main.ts`. The output was byte-identical to the entry text, 107 characters (109 bytes), with no trailing newline.
- Pass 2: moved the limits and the output path into named constants. Length is now counted in code points, and the control-character check also covers C1 controls (U+0080-U+009F). Re-ran it; the output was identical, with the same sha256 `7ead8a89c9c9f9e40f7cceb33eb7e64066626be113b763d271eeab0f6722f3aa`.
- Pass 3: re-ran `main.ts` from scratch into a fresh directory under `/tmp`, outside the build directory. The output was byte-identical, 107 characters, no trailing newline, and the sha256 was unchanged.

## Judge fit
A roast of my own agent, with a twist on the last word. It is specific to real agent behaviour (long reasoning, destructive edits, narrating the aftermath) and fits in one 107-character sentence.
