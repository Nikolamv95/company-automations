Show the pipeline status for a product (or all products if no argument given): $ARGUMENTS

1. If a product name is given: check `output/{product}/` and list which output files exist (✓) and which are missing (✗). Also show `.pipeline-state.json` if present — including any `failed_steps` or `skipped_steps`.

2. If no product name: list all subdirectories in `output/` and for each show a summary: `X/12 steps complete`.

Output format:
```
Slim Body — 9/12 steps complete
  ✓ 01_awareness.md
  ✓ 02_competitor.md
  ✓ 03_avatar.md
  ✓ 04_master_doc.md
  ✓ 05_desire_extraction.md
  ✓ 06_desire_validation.md
  ✓ 07_hooks.md
  ✓ 08_desire_testing_copy.md
  ✗ 09_marketing_angles.md
  ✗ 10_angle_testing_copy.md
  ✗ 11a_advertorial.md
  ✗ 11b_advertorial.md

Next steps ready: Step 9 (Marketing Angles)
Run /write-copy "Slim Body" to continue.
```

If `.pipeline-state.json` has failed or skipped steps, show them:
```
  ⚠ Step 3 — skipped (no avatar data)
  ✗ Step 5 — failed (empty output) → run /deep-research "Slim Body" to retry from Step 5
```
