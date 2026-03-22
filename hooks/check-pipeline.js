#!/usr/bin/env node
/**
 * Pipeline continuation hook (ralph-wiggum pattern).
 *
 * Claude Code calls this script on every Stop event.
 * If there are incomplete pipeline steps tracked in .pipeline-state-{product}.json,
 * this script prints instructions that force Claude to continue.
 *
 * How it works:
 * 1. Claude writes .pipeline-state-{product_slug}.json during deep-research pipeline
 * 2. On Stop, this script finds all .pipeline-state-*.json files
 * 3. If any have incomplete steps, it exits with code 2 + a prompt message
 *    → Claude Code re-prompts Claude with the message instead of stopping
 * 4. When all steps complete, Claude deletes the state file
 *    → Script exits 0 → Claude stops normally
 *
 * Exit codes:
 *   0 = allow Claude to stop (no active pipeline or pipeline complete)
 *   2 = block stop, send message to Claude (pipeline incomplete)
 */

const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

// Find all .pipeline-state-*.json files in project root
const stateFiles = fs.readdirSync(cwd).filter(f =>
  f.startsWith('.pipeline-state-') && f.endsWith('.json')
);

if (stateFiles.length === 0) {
  process.exit(0);
}

for (const filename of stateFiles) {
  const filePath = path.join(cwd, filename);

  let state;
  try {
    state = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    // Corrupt state file — skip it
    continue;
  }

  const { product, steps, completed_steps = [] } = state;

  if (!product || !steps) {
    continue;
  }

  const remaining = steps.filter(s => !completed_steps.includes(s));

  if (remaining.length === 0) {
    // All steps complete — clean up
    fs.unlinkSync(filePath);
    continue;
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
}

// All state files were complete or corrupt
process.exit(0);
