---
title: Flash Trader
tagline: An autonomous trading engine that runs a bull-vs-bear-vs-judge debate before it ever moves real money.
cover: /covers/flash-trader.png
category: trading
group: featured
role: Solo Developer
year: 2025 — Present
status: Live
featured: true
order: 2
private: true
stack:
  - Node.js
  - "@solana/web3.js"
  - ethers
  - Anthropic API
  - discord.js
  - PM2 / Hetzner
highlights:
  - Rule-based heuristic debate first; LLM escalation only on close calls (cost-aware)
  - Multi-market — Solana DEX, pump.fun, forex, and equities — with slippage + retry logic
  - 15s trade loop with 4-layer position protection running live on a VPS
links:
  caseStudy: /work/flash-trader
---

Flash Trader is a real-money autonomous trading system built around a signature
pattern: every candidate trade is argued by a **bull** and a **bear**, then ruled on
by a **judge**. Cheap rule-based heuristics handle the obvious calls; only genuinely
close decisions escalate to an LLM, which keeps cost and latency in check.

## Architecture

- **Signal pipeline** aggregates social sentiment, whale-wallet monitoring, news, and
  technical indicators into a single scoring system.
- **Execution layer** integrates Jupiter, PumpPortal, and broker APIs across crypto,
  forex, and stocks, with slippage protection, retries, and orphan recovery.
- **Fast Lane** handles newly graduated Solana tokens with trailing stops and
  automated position management.
- **Live dashboard** tracks positions, P&L, and sentiment in real time.

Deployed on a Hetzner VPS under PM2 with Nginx and a hardened firewall. The same
debate engine has since been packaged as a reusable SDK.
