---
name: kie-video
version: 1.2.0
description: >
  Generate videos via Kie.ai API using AI models.
  Triggers: create video, generate video, video creative, kie video,
  video for brand, text to video, image to video, AI video, video asset, video generation.
---

# Kie Video Generator

## ⚠️ Verified API Reference (Do Not Change Without Testing)

Confirmed from live test on 2026-03-25. Use these exact values — do not guess alternatives.

| What | Correct value | Wrong values (404) |
|------|--------------|-------------------|
| Create task | `POST https://api.kie.ai/api/v1/jobs/createTask` | — |
| Poll status | `GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=` | `taskDetail`, `result`, `status`, `queryTask`, `getTaskDetail` |
| State field | `data.state` | `data.status` |
| Success value | `"success"` | `"completed"`, `"succeed"` |
| Fail value | `"fail"` | `"failed"` |
| Result URL | `JSON.parse(data.resultJson).resultUrls[0]` | `data.works`, `data.videos` |
| Auth header | `Authorization: Bearer $KIE_KEY` | — |
| Key from env | `grep '^KIE_AI_API_KEY' .env \| cut -d'=' -f2 \| tr -d '[:space:]'` | — |
| JSON parser | `node -e` (python3 not available on this machine) | `python3 -c` |

---

## Brand Context

Load `projects/{brand}/brand.md` before building the prompt.
Brand tone, visual style, and restrictions shape the video prompt and scene description.
If `brand.md` doesn't exist → use system defaults and note it.

**Brand context informs:**
- Scene mood and visual style
- On-screen text, messaging tone
- Restrictions (e.g., no competitor comparisons)

---

## Clarifying Questions

**Ask all questions in ONE message, not one by one.**

Auto-detect mode: if user provides an image URL → default to `image-to-video`. Otherwise → `text-to-video`.

If brand and product are already known from context, skip questions 1–2.

```
За да генерирам видеото, нужна ми е следната информация:

1. Бранд? (или пропусни ако няма)
2. Продукт? (или пропусни ако няма)
3. Описание — какво да се случва във видеото? (сцена, действие, текст)
4. Reference image URL? (ако предоставиш → ще се използва image-to-video автоматично)
5. Продължителност? [5s / 10s] (default: 5s)
6. Sound? [да / не] (default: не)
7. Aspect ratio? [1:1 / 16:9 / 9:16] (default: 1:1) — само при text-to-video
8. Друг модел? (default: kling-2.6/text-to-video или kling-2.6/image-to-video)
   (поддържаме всеки модел от kie.ai/market)
```

---

## Rules

### 1. Model Auto-Detection

```
IF image URL provided:
  model = "kling-2.6/image-to-video"
ELSE:
  model = "kling-2.6/text-to-video"

IF user specified a model → use that instead (overrides auto-detect)
```

### 2. Prompt Building

Build the prompt from:
- User's scene description (required)
- Brand visual guidelines from `brand.md` (if exists)
- Product context

Keep prompt under 1,000 chars (Kling limit). Write in English for best results.
Structure: `[Setting]. [Character/subject action]. [Mood/atmosphere]. [Camera movement if relevant].`

### 3. API Call

Load API key (must not be empty — check before proceeding):
```bash
KIE_KEY=$(grep '^KIE_AI_API_KEY' .env | cut -d'=' -f2 | tr -d '[:space:]')
if [ -z "$KIE_KEY" ]; then echo "ERROR: KIE_AI_API_KEY not found in .env"; exit 1; fi
```

**Text-to-Video:**
```bash
RESPONSE=$(curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer $KIE_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"$MODEL\",
    \"input\": {
      \"prompt\": \"$PROMPT\",
      \"sound\": $SOUND,
      \"aspect_ratio\": \"$ASPECT_RATIO\",
      \"duration\": \"$DURATION\"
    }
  }")
```

**Image-to-Video:**
```bash
RESPONSE=$(curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer $KIE_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"$MODEL\",
    \"input\": {
      \"prompt\": \"$PROMPT\",
      \"image_urls\": [\"$IMAGE_URL\"],
      \"sound\": $SOUND,
      \"duration\": \"$DURATION\"
    }
  }")
```

Where:
- `$MODEL` = auto-detected or user-specified
- `$PROMPT` = built prompt (JSON-escaped)
- `$SOUND` = `false` or `true`
- `$ASPECT_RATIO` = `1:1` (default), `16:9`, or `9:16` — text-to-video only
- `$DURATION` = `"5"` (default) or `"10"`
- `$IMAGE_URL` = user-provided URL — image-to-video only

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

### 4. Poll for Completion

**Endpoint: `/api/v1/jobs/recordInfo` — this is the ONLY correct polling endpoint.**

Videos take longer than images. Poll every 5 seconds, max 72 attempts (6 minutes):
```bash
for i in $(seq 1 72); do
  sleep 5
  STATUS_RESP=$(curl -s \
    -H "Authorization: Bearer $KIE_KEY" \
    "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=$TASK_ID")

  STATUS=$(echo "$STATUS_RESP" | node -e "let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{ try{console.log(JSON.parse(d).data?.state||'pending')}catch(e){console.log('pending')} })")

  echo "[$i/72] Status: $STATUS"

  if [ "$STATUS" = "success" ]; then
    break
  elif [ "$STATUS" = "fail" ]; then
    FAIL_MSG=$(echo "$STATUS_RESP" | node -e "let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{ try{console.log(JSON.parse(d).data?.failMsg||'unknown')}catch(e){} })")
    echo "ERROR: Video generation failed — $FAIL_MSG"
    exit 1
  fi
done

if [ "$STATUS" != "success" ]; then
  echo "TIMEOUT: Generation took over 6 minutes. TaskId: $TASK_ID — check manually at https://kie.ai/logs"
  exit 1
fi
```

### 5. Extract Result URL

**Result is in `data.resultJson` (a JSON string) → parse it → `resultUrls[0]`.**

```bash
RESULT_URL=$(echo "$STATUS_RESP" | node -e "let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{ try{ const r=JSON.parse(d); const urls=JSON.parse(r.data.resultJson).resultUrls; console.log(urls[0]) }catch(e){console.log('')} })")

if [ -z "$RESULT_URL" ]; then
  echo "ERROR: Could not extract result URL. Full response: $STATUS_RESP"
  exit 1
fi
```

### 6. Save Output

Determine output directory:
- Brand + product known → `output/{brand}/{product}/creatives/videos/`
- Brand only → `output/{brand}/creatives/videos/`
- Neither → `output/untracked-creatives/videos/`

Create dir and download:
```bash
mkdir -p "$OUTPUT_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
MODEL_SLUG=$(echo "$MODEL" | tr '/' '-')
SLUG=$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | cut -c1-30 | sed 's/-$//')
FILENAME="${MODEL_SLUG}_${TIMESTAMP}_${SLUG}.mp4"
curl -L "$RESULT_URL" -o "$OUTPUT_DIR/$FILENAME"
echo "Saved: $OUTPUT_DIR/$FILENAME"
```

### 7. Error Handling

| Code | Action |
|------|--------|
| 401 | Stop. "KIE_AI_API_KEY is invalid. Check your .env file." |
| 402 | Stop. "Insufficient credits on kie.ai." |
| 422 | Stop. "Invalid parameters: {msg}. Check model ID and prompt." |
| 429 | Wait 30s, retry once. If fails again → stop. |
| 500/501 | Ask user: retry or abort? |
| Timeout (72 polls) | "Generation took over 6 minutes. TaskId: {id} — check manually at kie.ai/logs" |

---

## Output Format

After saving, report:
```
✅ Video generated successfully!

📁 File: output/{brand}/{product}/creatives/videos/{filename}
🤖 Model: {model}
🆔 Task ID: {taskId}
⏱️ Duration: {duration}s | Aspect ratio: {ratio}
🔊 Sound: {yes/no}
```

If brand context was missing:
```
⚠️ brand.md for {brand} not found — using system defaults.
```

---

## Self-Check

Before executing, verify:
- [ ] API key loaded from `.env` — not empty, not hardcoded?
- [ ] Model auto-detected correctly: image URL given → `kling-2.6/image-to-video`, no image → `kling-2.6/text-to-video` (unless user overrode)?
- [ ] Polling uses `/api/v1/jobs/recordInfo` — not any other endpoint?
- [ ] JSON parsing uses `node -e` (not python3 — not available on this machine)?
- [ ] Output directory matches brand/product context (not always untracked)?

If any check fails → fix before proceeding.
