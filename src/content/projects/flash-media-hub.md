---
title: Flash Media Hub
tagline: A self-built personal media OS — one app for streaming, music, manga, live sports, an AI tutor, and finance.
cover: /covers/flash-media-hub.png
category: media
group: featured
role: Architect & Solo Developer
year: 2025 — Present
status: Active
featured: true
order: 1
private: true
stack:
  - Vanilla JS
  - Python
  - Electron
  - React Native / Expo
  - Kotlin / Compose (Fire TV)
  - Service Workers
  - Plaid
highlights:
  - One cohesive shell across desktop, iOS, and Fire TV — no third-party launchers
  - ~43K-line single-file hub with a cinematic, per-vertical design system
  - Live finance, music scrobbling, watch history, and recommendations, all per-profile
links:
  caseStudy: /work/flash-media-hub
---

Flash Media Hub ("Flashpoint") is the most ambitious thing I've built and my daily
driver. It collapses a dozen separate apps — streaming, music, books, comics and
manga, live NBA / WNBA / CDL, news, an AI tutor, and personal finance — into a
single, cohesive, cinematic environment that runs on the desktop (Electron), iOS
(React Native), and a native Fire TV client (Compose).

## What makes it hard

- **One design language across three runtimes.** A per-vertical color identity and
  motif system keeps every section feeling like its own "world" while staying part
  of one app.
- **Real data, never faked.** Counts, durations, and progress are wired to real
  sources or omitted — a hard guardrail throughout the codebase.
- **Production plumbing.** A Python HTTP server streams cached audio, proxies APIs,
  and gates owner-only finance endpoints (Plaid) behind signed sessions.

> Private repo — it contains scrapers and live financial plumbing, so it ships as a
> curated case study with sanitized screens, not a public link.
