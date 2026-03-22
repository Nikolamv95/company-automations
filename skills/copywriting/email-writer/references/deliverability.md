# Email Deliverability Guide

Rules that keep emails out of spam and in the primary inbox.

---

## Spam Trigger Words — Avoid These

These words increase spam score. Never use in subject lines. Minimize in body.

**High risk (avoid entirely):**
```
free, FREE, F.R.E.E.
guaranteed, guarantee
act now, act immediately
limited time offer
buy now, order now
click here
you have been selected
winner, you've won
earn money, make money
no cost, no risk, no obligation
once in a lifetime
this is not spam
```

**Medium risk (minimize in body, never in subject):**
```
discount, save $, off
bonus
cash, profit, income
offer expires, expires soon
hurry, don't delay
satisfaction guaranteed
results may vary
```

**Safe alternatives:**
```
❌ "Free guide"     → ✅ "Short breakdown I wrote"
❌ "Guaranteed"     → ✅ "Works or you get your money back"
❌ "Act now"        → ✅ "This closes tonight"
❌ "Limited time"   → ✅ "Through [specific date]"
❌ "Buy now"        → ✅ "Claim your spot" / "Get started"
```

---

## From Name and Address

**From name:** Use a real person's name, not a brand name.
- ✅ "Sarah from [Brand]"
- ✅ "Mark at [Brand]"
- ❌ "[Brand Name] Team"
- ❌ "noreply@..."

**From address:** Use a real domain email, not Gmail/Yahoo.
- ✅ sarah@yourbrand.com
- ❌ yourbrand@gmail.com

**Consistency:** Use the same from name and address across the sequence. Switching from names mid-sequence drops open rates and increases unsubscribes.

---

## Send Times

| Day | Performance | Notes |
|-----|-------------|-------|
| Tuesday | Best | Highest open rates across most niches |
| Wednesday | Best | Second highest |
| Thursday | Good | Drop-off toward end of week |
| Monday | Moderate | Inbox congestion after weekend |
| Friday | Low | Pre-weekend mindset |
| Saturday/Sunday | Low | Unless you have data showing otherwise |

**Best send times:**
- 9-11am (recipient's local time) — morning inbox check
- 1-2pm — post-lunch check
- Avoid: 6-8am (too early) and 8pm+ (too late)

**For re-engagement sequences:** Test off-peak times (early morning or evening) to break the pattern.

---

## List Hygiene

A clean list improves deliverability for everyone on it. Clean monthly.

**Remove or suppress:**
- Hard bounces immediately (bad address — removes permanently)
- Soft bounces after 3+ attempts
- Unopens after 90 days of normal sends → move to re-engagement sequence
- Unsubscribers immediately and permanently
- Spam complaints immediately

**Do NOT:**
- Send to purchased or rented lists — destroys sender reputation
- Keep subscribers who have never opened a single email after 180 days
- Re-add unsubscribers "just this once"

**Engagement threshold rule:**
If a subscriber hasn't opened in 60 days → flag
If no open in 90 days → trigger re-engagement sequence (3 emails)
If no open after re-engagement → suppress permanently

---

## HTML vs Plain Text

| Format | Best for | Deliverability |
|--------|----------|----------------|
| Plain text | Story, nurture, re-engagement | Highest — looks personal |
| Minimal HTML (no images) | Educational, value | Good |
| Heavy HTML (banners, columns) | Promotional | Lower — spam filters flag heavy design |

**Rule:** For DR email to cold/warm audience → plain text or minimal HTML only.
Heavy design signals "marketing email" and gets filtered to Promotions tab.

**Plain text email still needs:**
- Hyperlinked CTA (not raw URL)
- Unsubscribe link at the bottom
- Physical mailing address (CAN-SPAM / GDPR requirement)

---

## Technical Setup (Domain Requirements)

These must be configured by whoever manages the email domain. Flag if not in place:

| Setting | What it does | Status to check |
|---------|--------------|-----------------|
| SPF record | Verifies sender domain | Required |
| DKIM signature | Proves email wasn't tampered | Required |
| DMARC policy | Prevents spoofing | Strongly recommended |
| Custom tracking domain | Avoids shared link reputation | Recommended |
| Dedicated sending IP | Isolates reputation | For high-volume senders |

---

## Warm-Up Protocol (New Domain or IP)

When starting fresh with a new domain or email service:

```
Week 1: 50-100 emails/day — to most engaged subscribers only
Week 2: 200-500 emails/day — expand to recently active
Week 3: 1,000-2,000 emails/day — normal active list
Week 4+: Full list — monitor bounce rate and spam complaints
```

**Abort if:**
- Bounce rate exceeds 2%
- Spam complaint rate exceeds 0.1%
- Open rate drops below 15% consistently

---

## Inbox Placement Test

Before major sends (launch sequences), test inbox placement:

**Tools:**
- Mail-Tester.com — free spam score check
- GlockApps — inbox vs. spam vs. promotional tab placement
- Litmus — rendering across email clients

**Goal:** Primary inbox placement in Gmail and Outlook. Promotions tab is not spam, but primary inbox gets 3-5x more opens.
