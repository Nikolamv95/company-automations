---
name: analytics-tracking
version: 1.0.0
description: "Set up or improve analytics tracking for a marketing site or product. Use when the user wants to track events, set up GA4, implement UTM parameters, measure conversions, or understand what's happening on their site. Triggers on: analytics, tracking, GA4, Google Tag Manager, UTM, conversion tracking, events, measure, what's working."
---

# Analytics Tracking

Track for decisions, not data. Every event should answer a business question.

## Initial Assessment

Before setting up anything, answer:
1. What decisions do you need to make?
2. What are the 3 most important actions a visitor can take?
3. What tools are you using (GA4, GTM, Mixpanel, etc.)?
4. Who owns implementation — dev, marketing, or you?
5. Any privacy/compliance requirements (GDPR, CCPA)?

---

## Core Principles

**Work backwards from questions:**
"We need to know if our new headline increases trial signups"
→ Track: page view + CTA click + trial signup complete

**Consistent naming (object-action format):**
```
signup_completed      ✓
user_signed_up        ✗ (inconsistent verb tense)
SignupDone            ✗ (inconsistent case)
```

**Data quality over quantity:**
10 accurate events > 100 unreliable ones. Audit before adding new tracking.

---

## Essential Events for Marketing Sites

```javascript
// Page engagement
page_view             // built-in GA4
scroll_depth          // 25%, 50%, 75%, 100%
time_on_page          // > 30s, > 60s, > 3min

// Lead generation
cta_click             // { cta_text, cta_location, page_url }
form_start            // user begins filling form
form_submit           // successful submission
form_error            // validation failure

// Content engagement
video_play            // { video_title, video_duration }
video_complete        // 25%, 50%, 75%, 100% watched

// Purchase / conversion
trial_start
purchase_complete     // { value, currency, product_name }
```

---

## GA4 Setup

```javascript
// Google Tag Manager — Custom Event tag
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'cta_click',
  cta_text: 'Start Free Trial',
  cta_location: 'hero',
  page_url: window.location.href
});
```

**GTM Container structure:**
- 1 trigger per event type
- 1 tag per event + GA4 destination
- Variables for shared properties (user_id, page_type)

---

## UTM Parameters

```
utm_source    = traffic source (facebook, google, newsletter)
utm_medium    = channel (cpc, email, social)
utm_campaign  = campaign name (summer_sale, product_launch)
utm_content   = ad variant (hook_a, hook_b) ← for A/B testing
utm_term      = keyword (for search ads)
```

**Naming convention:**
```
✓  facebook / cpc / weight_loss_q1 / hook_a
✗  Facebook / CPC / Weight Loss Q1 / Hook A   (inconsistent case)
```

Use a UTM builder spreadsheet. Enforce lowercase. Always use underscores.

---

## Debugging & Validation

```bash
# GA4 DebugView: enable debug mode
gtag('config', 'G-XXXXXXXX', { debug_mode: true });

# GTM Preview mode: test tags before publishing
# GA4 Realtime report: verify events firing live
```

**Validation checklist:**
- [ ] Events fire on correct actions only
- [ ] No duplicate events
- [ ] Parameters have correct values
- [ ] No PII in event data (email, name)
- [ ] Cross-device tracking configured

---

## Key Reports to Build

| Report | Question it answers |
|--------|-------------------|
| Conversion funnel | Where do people drop off? |
| Traffic source → conversion | Which channel drives paying customers? |
| Content → lead | Which posts/pages generate leads? |
| UTM → revenue | Which campaign ROI is highest? |
| Cohort retention | Do users from channel X retain better? |

## Self-Check

Before presenting output, verify:
- [ ] Essential events implemented: page_view, cta_click, form_submit at minimum
- [ ] All event names use object_action format with consistent lowercase and underscores
- [ ] UTM parameters follow the naming convention (lowercase, underscores, all 5 fields documented)
- [ ] No PII in event parameters — no email, name, or personal identifiers
- [ ] GA4 DebugView or GTM Preview mode step included to confirm events fire correctly

If any check fails → fix it before presenting.
