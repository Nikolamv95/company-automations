Show the pipeline status for a product (or all products if no argument given): $ARGUMENTS

1. If a product name is given (with or without brand): check `output/{brand}/{product}/` and list which output files exist (✓) and which are missing (✗). Also show `.pipeline-state-{brand_slug}-{product_slug}.json` if present — including any `failed_steps` or `skipped_steps`. Slugs = name lowercased, spaces → hyphens.

2. If no product name: list all brand folders in `output/`, then for each show their product subfolders with a summary: `X/12 steps complete`.

Output format (with brand):
```
stoitchkov-nutrition / Water Goal 6 — 12/12 steps complete
  ✓ 01_awareness.md
  ✓ 02_competitor.md
  ✓ 03_avatar.md
  ✓ 04_master_doc.md
  ✓ 05_desire_extraction.md
  ✓ 06_desire_validation.md
  ✓ 07_hooks.md
  ✓ 08_desire_testing_copy.md
  ✓ 09_marketing_angles.md
  ✓ 10_angle_testing_copy.md
  ✓ 11a_advertorial.md
  ✓ 11b_advertorial.md
```

Output format (no argument — all brands/products):
```
stoitchkov-nutrition/
  Water Goal 6 — 12/12 steps complete
  Water Out — 3/12 steps complete
thegreenbear/
  Slim Body — 9/12 steps complete
```

If `.pipeline-state-{brand_slug}-{product_slug}.json` has failed or skipped steps, show them:
```
  ⚠ Step 3 — skipped (no avatar data)
  ✗ Step 5 — failed (empty output) → run /deep-research "Brand" "Product" to retry from Step 5
```
