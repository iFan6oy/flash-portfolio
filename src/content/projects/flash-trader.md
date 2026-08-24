---
title: Flash Trader
tagline: An autonomous decision engine that argues a bull case against a bear case and only escalates to an LLM when the cheap rules cannot settle it.
cover: /covers/flash-trader.png
category: trading
group: engineering
role: Solo Developer
year: 2025 to present
status: Live
featured: false
order: 12
private: true
stack:
  - Node.js
  - Anthropic and multi-provider LLM APIs
  - Solana web3.js
  - ethers
  - PM2 / Linux
highlights:
  - Deterministic rule-based debate runs first; a model is only called when the decision is genuinely close
  - Model cascade tries cheap and fast providers before expensive ones, so cost tracks difficulty
  - Runs unattended on a short loop with layered position protection and retry handling
  - Deploys behind a branch-and-review gate rather than automatically, because it moves real money
links: {}
demonstrates:
  - Cost-aware LLM orchestration under a latency budget
  - Designing autonomous systems with explicit safety boundaries
  - Long-running unattended services with failure recovery
---

Flash Trader is where the debate pattern I reuse elsewhere came from. Every candidate
decision is argued by a bull and a bear and ruled on by a judge, but the important
engineering is the escalation policy rather than the metaphor: deterministic
heuristics resolve the clear cases instantly and for free, and a model is only
consulted when the rules genuinely disagree.

That ordering is the whole point. Calling a model on every decision is both slower and
more expensive than the decision is worth most of the time, and it makes the system
harder to reason about because nothing is reproducible.

It handles real money, which changes how it is operated. It sits outside the
auto-deploy lane and every change goes through review before it reaches the running
process.

> Presented as a sanitized case study. No credentials, wallet addresses, or live
> trading parameters are shown.
