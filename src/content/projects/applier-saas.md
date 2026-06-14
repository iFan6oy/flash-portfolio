---
title: Flash Applier
tagline: A multi-tenant SaaS backend that auto-tailors and submits job applications from a user-scoped answer store.
category: business
group: business
role: Solo Developer
year: 2026
status: Prototype
featured: false
order: 12
private: false
stack:
  - Node.js / Express
  - Supabase
  - PostgreSQL
  - helmet / rate-limit
highlights:
  - User-scoped answer store, resume storage, and an LLM Q&A proxy
  - Multi-tenant auth and row-level data isolation
  - Productization of a working job-monitor automation
links:
  caseStudy: /work/applier-saas
---

Flash Applier is the SaaS productization of my personal job-monitor: a multi-tenant
backend with per-user answer banks, resume storage, and an LLM proxy that drafts
tailored application material. Currently a backend-first v0.1 with auth, profile,
resume, story-bank, and apply-pack routes on Supabase.
