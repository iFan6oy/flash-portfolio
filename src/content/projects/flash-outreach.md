---
title: Flash Outreach
tagline: An end-to-end AI cold-email pipeline — pull leads, personalize, send with human pacing, and track replies.
category: ai
group: ai
role: Solo Developer
year: 2026
status: Active
featured: false
order: 20
private: true
stack:
  - Node.js (ESM)
  - Anthropic API
  - better-sqlite3
  - nodemailer
  - imapflow
highlights:
  - LLM-personalized emails with anti-slop guards (rejects em-dashes / filler)
  - Natural send pacing for deliverability, IMAP reply classification
  - Closes the loop with Lead Scraper and pushes status to the hub
links:
  caseStudy: /work/flash-outreach
---

Flash Outreach is the full cold-email loop for my consulting business: it selects
fresh leads from the scraper DB, personalizes each message with an LLM, sends with
human-like pacing for deliverability, then polls IMAP to classify replies and push
status back to the hub. Quality controls reject AI-tell phrasing before anything
goes out.
