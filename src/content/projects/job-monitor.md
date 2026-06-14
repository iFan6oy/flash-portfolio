---
title: Job Monitor
tagline: Polls nine job sources and delivers a daily AI report with a tailored cover letter per role.
category: ai
group: ai
role: Solo Developer
year: 2026
status: Live
featured: false
order: 22
private: false
stack:
  - Node.js / Express
  - better-sqlite3
  - Anthropic API
  - APNs / Discord
highlights:
  - Aggregates nine job sources with title-gated relevance filtering
  - Phone push (APNs) + Discord alerts + an 8am daily digest
  - LLM-written cover letter generated per matched role
links:
  caseStudy: /work/job-monitor
---

A multi-source job aggregator that polls nine boards, filters for automatable /
AI-leverage remote roles, and pushes matches to my phone and Discord. Each morning it
generates a digest with an AI-written cover letter tailored to every new role. Runs
live on a VPS.
