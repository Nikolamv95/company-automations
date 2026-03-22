#!/usr/bin/env node
/**
 * Pipeline continuation hook (ralph-wiggum pattern).
 *
 * Claude Code calls this script on every Stop event.
 * If there are incomplete pipeline steps tracked in .pipeline-state.json,
 * this script prints instructions that force Claude to continue.
 *
 * How it works:
 * 1. Claude writes .pipeline-state.json during deep-research pipeline
 * 2. On Stop, this script reads that file
 * 3. If incomplete steps exist, it exits with code 2 + a prompt message
 *    → Claude Code re-prompts Claude with the message instead of stopping
 * 4. When all steps complete, Claude deletes .pipeline-state.json
 *    → Script exits 0 → Claude stops normally
 *
 * Exit codes:
 *   0 = allow Claude to stop (no active pipeline or pipeline complete)
 *   2 = block stop, send message to Claude (pipeline incomplete)
 */

const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(process.cwd(), '.pipeline-state.json');

// No active pipeline — let Claude stop
if (!fs.existsSync(STATE_FILE)) {
  process.exit(0);
}

let state;
try {
  state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
} catch {
  // Corrupt state file — let Claude stop
  process.exit(0);
}

const { product, steps, completed_steps = [] } = state;

if (!product || !steps) {
  process.exit(0);
}

const remaining = steps.filter(s => !completed_steps.includes(s));

if (remaining.length === 0) {
  // All steps complete — clean up and let Claude stop
  fs.unlinkSync(STATE_FILE);
  process.exit(0);
}

// Incomplete pipeline — block stop and tell Claude what to do next
const next = remaining[0];
const progress = `${completed_steps.length}/${steps.length}`;

console.log(
  `[Pipeline: ${product}] ${progress} steps complete. ` +
  `Next step: ${next}. ` +
  `Continue the pipeline — run step "${next}" for product "${product}". ` +
  `Read the existing output files in output/${product}/ as context.`
);

process.exit(2);
