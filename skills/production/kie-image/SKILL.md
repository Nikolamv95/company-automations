---
name: kie-image
version: 1.2.0
description: >
  Generate images via Kie.ai API using AI models.
  Triggers: create image, generate image, image creative, kie image,
  image for brand, generate ad image, image generation, AI image, image asset.
---

# Kie Image Generator

## ⚠️ Verified API Reference (Do Not Change Without Testing)

Confirmed from live test on 2026-03-25. Use these exact values — do not guess alternatives.

| What | Correct value | Wrong values (404) |
|------|--------------|-------------------|
| Create task | `POST https://api.kie.ai/api/v1/jobs/createTask` | — |
| Poll status | `GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=` | `taskDetail`, `result`, `status`, `queryTask`, `getTaskDetail` |
| State field | `data.state` | `data.status` |
| Success value | `"success"` | `"completed"`, `"succeed"` |
| Fail value | `"fail"` | `"failed"` |
| Result URL | `JSON.parse(data.resultJson).resultUrls[0]` | `data.works`, `data.images` |
| Auth header | `Authorization: Bearer $KIE_KEY` | — |
| Key from env | `grep '^KIE_AI_API_KEY' .env \| cut -d'=' -f2 \| tr -d '[:space:]'` | — |
| JSON parser | `node -e` (python3 not available on this machine) | `python3 -c` |

---

## Brand Context

Load `projects/{brand}/brand.md` before building the prompt.
Brand voice, visual style, tone, and restrictions shape the image prompt.
If `brand.md` doesn't exist → use system defaults and note it.

**Brand context informs:**
- Visual style (clean vs. bold, colors, mood)
- Restrictions (e.g., no competitor references, no health claims)
- Audience (age group, demographics affect visual direction)

---

## Clarifying Questions

**Ask all questions in ONE message, not one by one.**

If brand and product are already known from context, skip questions 1–2.

```
За да генерирам изображението, нужна ми е следната информация:

1. Бранд? (или пропусни ако няма)
2. Продукт? (или пропусни ако няма)
3. Описание — какво да се вижда на изображението?
4. Aspect ratio? [auto / 1:1 / 16:9 / 9:16 / 4:5 / 4:3 / 3:2 / 2:3 / 21:9] (default: auto)
5. Резолюция? [1K / 2K / 4K] (default: 1K)
6. Reference image URL? (optional — за style reference или img2img)
7. Друг модел? (default: nano-banana-2 | поддържаме всеки модел от kie.ai/market)
```

---

## Rules

### 1. Prompt Building

Build the prompt from:
- User's description (required)
- Brand visual guidelines from `brand.md` (if exists)
- Product name and category context

Keep prompt under 20,000 chars. Write in English for best results.

### 2. API Call

Load API key (must not be empty — check before proceeding):
```bash
KIE_KEY=$(grep '^KIE_AI_API_KEY' .env | cut -d'=' -f2 | tr -d '[:space:]')
if [ -z "$KIE_KEY" ]; then echo "ERROR: KIE_AI_API_KEY not found in .env"; exit 1; fi
```

Submit task:
```bash
RESPONSE=$(curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer $KIE_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"$MODEL\",
    \"input\": {
      \"prompt\": \"$PROMPT\",
      \"image_input\": $IMAGE_INPUT,
      \"aspect_ratio\": \"$ASPECT_RATIO\",
      \"resolution\": \"$RESOLUTION\",
      \"output_format\": \"jpg\"
    }
  }")
```

Where:
- `$MODEL` = user-specified or `nano-banana-2`
- `$PROMPT` = built prompt (JSON-escaped)
- `$IMAGE_INPUT` = `[]` or `["url1"]` if reference image provided
- `$ASPECT_RATIO` = user choice or `auto`
- `$RESOLUTION` = user choice or `1K`

Check for API error before proceeding:
```bash
API_CODE=$(echo "$RESPONSE" | node -e "let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{ try{console.log(JSON.parse(d).code||0)}catch(e){console.log(0)} })")
if [ "$API_CODE" != "200" ]; then
  API_MSG=$(echo "$RESPONSE" | node -e "let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{ try{console.log(JSON.parse(d).msg||'unknown')}catch(e){console.log('unknown')} })")
  echo "API ERROR: $API_MSG"
  exit 1
fi
```

Extract task ID:
```bash
TASK_ID=$(echo "$RESPONSE" | node -e "let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{ try{console.log(JSON.parse(d).data.taskId)}catch(e){} })")
```

### 3. Poll for Completion

**Endpoint: `/api/v1/jobs/recordInfo` — this is the ONLY correct polling endpoint.**

Poll every 5 seconds, max 36 attempts (3 minutes):
```bash
for i in $(seq 1 36); do
  sleep 5
  STATUS_RESP=$(curl -s \
    -H "Authorization: Bearer $KIE_KEY" \
    "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=$TASK_ID")

  STATUS=$(echo "$STATUS_RESP" | node -e "let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{ try{console.log(JSON.parse(d).data?.state||'pending')}catch(e){console.log('pending')} })")

  echo "[$i/36] Status: $STATUS"

  if [ "$STATUS" = "success" ]; then
    break
  elif [ "$STATUS" = "fail" ]; then
    FAIL_MSG=$(echo "$STATUS_RESP" | node -e "let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{ try{console.log(JSON.parse(d).data?.failMsg||'unknown')}catch(e){} })")
    echo "ERROR: Generation failed — $FAIL_MSG"
    exit 1
  fi
done

if [ "$STATUS" != "success" ]; then
  echo "TIMEOUT: Generation took over 3 minutes. TaskId: $TASK_ID — check manually at https://kie.ai/logs"
  exit 1
fi
```

### 4. Extract Result URL

**Result is in `data.resultJson` (a JSON string) → parse it → `resultUrls[0]`.**

```bash
RESULT_URL=$(echo "$STATUS_RESP" | node -e "let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{ try{ const r=JSON.parse(d); const urls=JSON.parse(r.data.resultJson).resultUrls; console.log(urls[0]) }catch(e){console.log('')} })")

if [ -z "$RESULT_URL" ]; then
  echo "ERROR: Could not extract result URL. Full response: $STATUS_RESP"
  exit 1
fi
```

### 5. Save Output

Determine output directory:
- Brand + product known → `output/{brand}/{product}/creatives/images/`
- Brand only → `output/{brand}/creatives/images/`
- Neither → `output/untracked-creatives/images/`

Create dir and download:
```bash
mkdir -p "$OUTPUT_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SLUG=$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | cut -c1-30 | sed 's/-$//')
FILENAME="${MODEL}_${TIMESTAMP}_${SLUG}.jpg"
curl -L "$RESULT_URL" -o "$OUTPUT_DIR/$FILENAME"
echo "Saved: $OUTPUT_DIR/$FILENAME"
```

### 6. Error Handling

| Code | Action |
|------|--------|
| 401 | Stop. "KIE_AI_API_KEY is invalid. Check your .env file." |
| 402 | Stop. "Insufficient credits on kie.ai." |
| 422 | Stop. "Invalid parameters: {msg}. Check model ID and prompt." |
| 429 | Wait 30s, retry once. If fails again → stop. |
| 500/501 | Ask user: retry or abort? |
| Timeout (36 polls) | "Generation took over 3 minutes. TaskId: {id} — check manually at kie.ai/logs" |

---

## Output Format

After saving, report:
```
✅ Image generated successfully!

📁 File: output/{brand}/{product}/creatives/images/{filename}
🤖 Model: {model}
🆔 Task ID: {taskId}
📐 Aspect ratio: {ratio} | Resolution: {resolution}
```

If brand context was missing:
```
⚠️ brand.md for {brand} not found — using system defaults.
```

---

## Self-Check

Before executing, verify:
- [ ] API key loaded from `.env` — not empty, not hardcoded?
- [ ] Model ID taken from user input — never hardcoded to a fixed value?
- [ ] Polling uses `/api/v1/jobs/recordInfo` — not any other endpoint?
- [ ] JSON parsing uses `node -e` (not python3 — not available on this machine)?
- [ ] Output directory matches brand/product context (not always untracked)?

If any check fails → fix before proceeding.
