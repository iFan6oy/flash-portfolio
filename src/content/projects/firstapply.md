---
title: FirstApply
tagline: A job discovery pipeline that refuses to create a match until it has verified the role is really remote and the application path is really free.
category: automation
group: engineering
role: Solo Developer
year: 2026
status: Active
featured: false
order: 15
private: true
stack:
  - TypeScript
  - Node.js
  - Supabase / PostgreSQL
  - LLM matching
highlights:
  - "Two hard gates before a match exists: verified remote, and a verified free application path"
  - Redirect and outbound discovery links are resolved to a real employer or applicant tracking destination
  - Board integrations fetch each company board once per sweep and match locally, which fixed a recall bug that exact-phrase search caused
  - Generated application material may reorder claims from a fixed truth bank but can never invent an employer, date, or metric
links: {}
demonstrates:
  - Pipeline design with explicit quality gates
  - Data provenance and verification over raw ingestion volume
  - Constraining generated output against fabrication
---

This started as a personal job monitor and became an exercise in data quality. The
first version aggregated a lot of listings and most of them were junk: roles marked
remote that were hybrid, and apply links that led to a paywalled reposting service
rather than the employer.

The rewrite moved it from "a source returned a job" to a verified conveyor belt.
Nothing becomes a match until both gates pass. Hybrid and onsite language in the
posting overrides sloppy upstream remote metadata, and discovery URLs are resolved
through their redirects to an actual employer or applicant tracking system before
anything becomes an apply button.

The other fix worth naming is recall. Matching by exact phrase against individual
listings meant a search for one title could silently miss the same job posted under a
slightly different one. Fetching each company board once per sweep and matching
locally removed that whole class of miss.

The generation side is deliberately constrained. It can select and reorder claims
from a fixed set of true statements, and it cannot invent employers, dates, metrics,
or skills, because a fabricated detail in a job application is worse than a generic
one.
