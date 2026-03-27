# /create-video

Generate an AI video via Kie.ai.

## Usage

```
/create-video [description] [brand=slug] [product=slug] [duration=5] [sound=no] [ratio=1:1] [model=auto] [img=url]
```

**Examples:**
```
/create-video Stoitchkov running with energy brand=stoitchkov-nutrition product=water-goal-6
/create-video product dissolving in water close-up brand=stoitchkov-nutrition duration=10 ratio=9:16
/create-video img=https://example.com/bottle.png animated bottle floating brand=stoitchkov-nutrition
```

## Step 0: Brand Detection

1. Parse `brand=` from arguments if present.
2. Parse `product=` from arguments if present.
3. If brand not in arguments and not obvious from description → ask: "За кой бранд е това видео?"
4. Load `projects/{brand}/brand.md` if it exists.

## Step 1: Parse Arguments

Extract from `$ARGUMENTS`:
- **description** — everything that isn't a `key=value` pair
- **brand** — from `brand={slug}` or inferred
- **product** — from `product={slug}` (optional)
- **img** — from `img={url}` (optional reference image → triggers image-to-video)
- **duration** — from `duration={5|10}` (default: 5)
- **sound** — from `sound={yes|no}` (default: no)
- **ratio** — from `ratio={1:1|16:9|9:16}` (default: 1:1, text-to-video only)
- **model** — from `model={value}` (default: auto-detect)

## Step 2: Auto-Detect Model

- `img=` provided → model = `kling-2.6/image-to-video`
- No `img=` → model = `kling-2.6/text-to-video`
- `model=` explicitly set → use that (overrides auto-detect)

## Step 3: Fill Missing Info

If description is empty → ask: "Какво да се случва във видеото? Опиши сцената."

Do NOT ask for parameters that already have defaults (duration, sound, ratio, model).

## Step 4: Execute

Load `skills/production/kie-video/SKILL.md` and execute with the parsed parameters.
