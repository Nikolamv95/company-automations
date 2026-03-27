# /create-image

Generate an AI image via Kie.ai.

## Usage

```
/create-image [description] [brand=slug] [product=slug] [ratio=1:1] [res=1K] [model=nano-banana-2]
```

**Examples:**
```
/create-image Stoitchkov holding the water bottle brand=stoitchkov-nutrition product=water-goal-6
/create-image bold supplement ad dark background brand=stoitchkov-nutrition ratio=4:5 res=2K
/create-image product hero shot brand=stoitchkov-nutrition product=water-goal-6 model=nano-banana-2
```

## Step 0: Brand Detection

1. Parse `brand=` from arguments if present.
2. Parse `product=` from arguments if present.
3. If brand not in arguments and not obvious from description → ask: "За кой бранд е това изображение?"
4. Load `projects/{brand}/brand.md` if it exists.

## Step 1: Parse Arguments

Extract from `$ARGUMENTS`:
- **description** — everything that isn't a `key=value` pair
- **brand** — from `brand={slug}` or inferred
- **product** — from `product={slug}` (optional)
- **ratio** — from `ratio={value}` (default: auto)
- **res** — from `res={value}` (default: 1K)
- **model** — from `model={value}` (default: nano-banana-2)
- **ref** — from `ref={url}` (optional reference image)

## Step 2: Fill Missing Info

If description is empty → ask: "Какво да се вижда на изображението?"

If any parameter is missing and has no default, ask before proceeding.
Do NOT ask for parameters that already have defaults (ratio, res, model).

## Step 3: Execute

Load `skills/production/kie-image/SKILL.md` and execute with the parsed parameters.
