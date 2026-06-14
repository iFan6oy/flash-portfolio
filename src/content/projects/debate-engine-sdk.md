---
title: Debate Engine SDK
tagline: My signature bull / bear / judge multi-agent pattern, packaged as an installable Python SDK.
category: ai
group: ai
role: Solo Developer
year: 2026
status: Active
featured: false
order: 24
private: false
stack:
  - Python
  - Anthropic API
  - pyproject / pytest
highlights:
  - Reusable multi-agent debate primitive extracted from Flash Trader
  - Cheap-models-first cascade with LLM escalation only on close calls
  - Clean package with tests and examples
links:
  caseStudy: /work/debate-engine-sdk
---

The debate pattern that powers Flash Trader, extracted into a reusable Python package:
spin up a bull and a bear, let them argue a decision, and have a judge rule. It
encodes the cost-aware cascade — rule-based first, LLM only when the call is close —
that I reuse across six projects.
