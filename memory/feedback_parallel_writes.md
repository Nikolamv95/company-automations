---
name: Parallel tool calls for independent operations
description: Always run independent file writes (and other independent operations) in parallel, not sequentially
type: feedback
---

Always batch independent tool calls into a single parallel block — especially file writes where there are no dependencies between files.

**Why:** User noticed that 7 file writes were executed one by one instead of in parallel, making the operation ~7x slower than necessary.

**How to apply:** Any time multiple Write, Read, or other tool calls have no dependencies on each other, send them all in one parallel block. This applies to: batch file translations, pipeline step outputs, multi-file reads at the start of a task.
