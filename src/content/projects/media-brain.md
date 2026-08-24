---
title: Media Brain
tagline: A taste and memory engine over a media event firehose, where every score can cite the exact signals that produced it.
category: data
group: engineering
role: Solo Developer
year: 2026
status: Active
featured: false
order: 16
private: true
stack:
  - TypeScript
  - Hono
  - SQLite
  - Event ingestion
highlights:
  - Reads its source system strictly read-only over a public API, and never touches that system's code, data files, or deploy lanes
  - Source plugins share one cursor-based contract, so adding a new provider does not change the ingestion loop
  - Affinity scoring is rule-based with time decay, with no model in the loop and no black box
  - Signals can be re-derived from raw stored events after any change to the normalization rules
links: {}
demonstrates:
  - Event ingestion and normalization pipeline design
  - Deriving a graph from behavioral signals with explainable scoring
  - Strict architectural boundaries between a sidecar and its source system
---

Media Brain is a sidecar over Flashpoint's event stream that builds a picture of
taste over time. The design constraint that shaped everything is that it is a
genuinely separate system. It reads the hub's public API read-only and is not allowed
to touch hub code, hub data, or the hub's deploy path, because a taste engine failing
should never be able to affect the thing people are actually using.

Two design choices carry it. Raw events are stored before normalization, so the rules
that turn an event into a weighted signal can be changed and every historical signal
re-derived rather than lost. And scoring is deliberately rule-based with exponential
time decay rather than learned, because the contract is that any score can produce
the exact list of signals behind it. A recommendation you cannot explain is one you
cannot debug.

Ingestion is a small plugin contract: each source implements the same cursor-based
pull, which is what let a live event feed and a historical archive backfill share the
same loop despite covering completely different time ranges.
