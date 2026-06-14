---
title: OpenClaw
tagline: A 24/7 autonomous AI agent that thinks every 30 minutes, plans its own tool calls, and gates risky actions behind human approval.
cover: /covers/openclaw.png
category: ai
group: featured
role: Solo Developer
year: 2026 — Present
status: Active
featured: true
order: 3
private: false
stack:
  - Node.js
  - Anthropic API
  - Telegram Bot API
  - PM2 / Hetzner
highlights:
  - Self-directed think loop reads its own memory, plans, and executes safe tool calls
  - Classifies every action safe vs. risky; risky ones queue for Telegram approval
  - Citation-grounding mechanism prevents hallucinated "wins"
links:
  repo: https://github.com/iFan6oy/openclaw
  caseStudy: /work/openclaw
---

OpenClaw is an autonomous agent that runs unattended on a VPS. On every cycle it
reads its own persistent memory, calls Claude to plan, classifies the planned
actions as safe or risky, executes the safe ones, and queues the risky ones for
approval over Telegram.

## The hard lesson, encoded

An earlier "architect mode" hallucinated progress — it claimed wins that never
happened. The current design fixes that with a **grounding rule**: no observation
gets posted without a citation back to a real event log line. That single constraint
is what makes an autonomous agent trustworthy enough to leave running.

This is the cleanest public window into how I think about agentic systems — safety
classification, human-in-the-loop escalation, and grounding over vibes.
