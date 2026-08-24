---
title: Debate Engine SDK
tagline: "The escalation pattern I reuse across projects, extracted into an installable package: cheap rules first, a model only when the call is close."
category: ai
group: engineering
role: Solo Developer
year: 2026
status: Active
featured: false
order: 21
private: false
stack:
  - Python
  - LLM provider APIs
  - pytest
highlights:
  - Packages an opposing-positions decision primitive as a reusable dependency
  - "Escalation policy is the contract: deterministic rules resolve clear cases, a model handles ambiguity"
  - Tested and exampled rather than a copied snippet, so the pattern stays consistent across projects
links: {}
demonstrates:
  - Extracting a reusable primitive out of production code
  - Cost-aware model orchestration
  - Library packaging and testing
---

This is the decision pattern from my trading engine, pulled out so I stop
reimplementing it slightly differently in every project that needs it. You define a
decision, two opposing positions argue it, and a judge rules.

The value is not the metaphor, it is the escalation policy that comes with it. Cheap
deterministic reasoning handles cases where the answer is not actually in doubt, which
in practice is most of them, and a model is only spent on the genuinely close calls.
Applying that consistently is the difference between an LLM feature that costs
predictably and one that scales its bill with traffic regardless of difficulty.
