---
title: Flash Odds
tagline: A sports props and odds aggregator with a real data pipeline, embedded live inside the media hub.
category: data
group: experiments
role: Solo Developer
year: 2026
status: Live
featured: false
order: 36
private: false
stack:
  - SvelteKit 2 / Svelte 5
  - Tailwind 4
  - Vite 6
  - better-sqlite3
highlights:
  - Aggregates Underdog Fantasy and The Odds API with a graceful fallback chain
  - Per-player picks pages with real linkage resolution
  - Deployed as a service and reverse-proxied into the hub
links:
  caseStudy: /work/flash-odds
---

A sports props and odds aggregator built on SvelteKit + Svelte 5. It pulls live lines
from Underdog Fantasy and The Odds API with a resilient fallback chain, renders
per-player picks pages, and runs as its own service reverse-proxied into the media
hub. Modern frontend over a real, messy data pipeline.
