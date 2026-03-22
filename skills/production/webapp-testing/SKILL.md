---
name: webapp-testing
version: 1.0.0
description: "Test a web application or landing page using Playwright. Use when the user wants to verify a page works, check UI functionality, capture screenshots, or debug browser behavior."
---

# Web Application Testing

Test local web apps and landing pages using Playwright with Python.

## Decision Tree

```
Is it static HTML?
  YES → Read the file directly to identify selectors → run Playwright
  NO  → Is a server already running?
          YES → Connect to it
          NO  → Start server, then connect
```

## Critical Rule

**Always call `page.wait_for_load_state('networkidle')` before inspecting DOM on dynamic apps.**
Skipping this causes incomplete element discovery.

## Basic Playwright Script

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')

    # Screenshot
    page.screenshot(path='screenshot.png')

    # Check element exists
    assert page.locator('h1').is_visible()

    # Check text content
    heading = page.locator('h1').text_content()
    print(f"Heading: {heading}")

    # Click CTA
    page.click('a.cta-primary')
    page.wait_for_load_state('networkidle')

    browser.close()
```

## Landing Page Test Checklist

```python
# Above-fold elements
assert page.locator('h1').is_visible()          # headline visible
assert page.locator('.cta-primary').is_visible() # CTA visible
assert page.locator('.cta-primary').is_enabled() # CTA clickable

# Page performance
assert page.evaluate("() => document.readyState") == 'complete'

# No console errors
errors = []
page.on('console', lambda msg: errors.append(msg) if msg.type == 'error' else None)
page.reload()
assert len(errors) == 0, f"Console errors: {errors}"
```

## Console Log Capture

```python
page.on('console', lambda msg: print(f"[{msg.type}] {msg.text}"))
```

## Installation

```bash
pip install playwright
playwright install chromium
```

## Self-Check

Before presenting output, verify:
- [ ] `page.wait_for_load_state('networkidle')` called before DOM inspection on dynamic pages
- [ ] Screenshot captured and path reported
- [ ] Console errors captured and reported (even if the result is "0 errors")
- [ ] All assertions report Pass/Fail explicitly — not just silence on success
- [ ] Test covers the 3 most important user actions on the page, not just element visibility

If any check fails → fix it before presenting.
