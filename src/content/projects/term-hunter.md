---
title: Term Hunter
tagline: A multi-stage LLM pipeline built around the assumption that the model will fail, with a defined safe default at every gate.
category: ai
group: engineering
role: Solo Developer
year: 2026
status: Active
featured: false
order: 14
private: false
diagram: termHunter
stack:
  - Node.js
  - LLM extraction and validation
  - RDAP
  - SQLite
highlights:
  - Every model-dependent stage fails closed, so a timeout or malformed response cannot be read as approval
  - Deterministic filters run before and after the model, leaving it only the part that needs judgment
  - Domain availability is treated as three states, because "I do not know right now" is not the same as "available"
  - Pipeline stages are idempotent, so a failed batch is automatically eligible for retry with no special-cased recovery
links:
  repo: https://github.com/iFan6oy/term-hunter-lite
demonstrates:
  - Multi-stage LLM pipeline design with explicit failure handling
  - Hybrid deterministic and model-based filtering
  - Idempotent, retry-safe batch processing
---

Most example code for LLM pipelines stops at the happy path: call the model, parse
the JSON, continue. This one is about the other path, because in an unattended
pipeline the other path is most of the runtime.

Two ideas carry it. First, every gate where a model call can fail has a defined safe
default chosen for that specific gate, so a timeout produces a known conservative
outcome instead of an undefined one. Second, cheap deterministic checks bracket the
model on both sides, which means the model only has to be good at the part that
actually needs a model rather than at things plain code already does better and
faster.

The three-state availability check is a small thing I would defend at length. A
registry lookup can return taken, free, or currently unknown, and collapsing that
third state into either of the first two is a bug that only shows up as bad decisions
much later.

A dependency-light version of the pattern is published as open source. The full
system, which runs unattended with spending caps and requires a human for every
purchase, stays private.
