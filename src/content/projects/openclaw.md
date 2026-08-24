---
title: OpenClaw
tagline: A long-running autonomous agent, and the grounding mechanism I had to build after it started reporting work it had never done.
cover: /covers/openclaw.png
category: ai
group: engineering
role: Solo Developer
year: 2026 to present
status: Active
featured: false
order: 13
private: false
stack:
  - Node.js
  - Anthropic API
  - Telegram Bot API
  - PM2 / Linux
highlights:
  - Think loop reads persistent memory, plans tool calls, and executes on a schedule without supervision
  - Actions are classified safe or risky; risky ones queue for human approval rather than running
  - Every claim the agent posts must cite a specific line in the event log or it is rejected
  - Runs as separate supervised processes so a failure in one does not take the others down
links:
  repo: https://github.com/iFan6oy/openclaw
demonstrates:
  - Autonomous agent design with human-in-the-loop boundaries
  - Diagnosing and containing model failure modes in production
  - Grounding agent output in verifiable evidence
---

The interesting part of this project is the failure. Running in a broad, open-ended
mode, the agent began reporting progress that had not happened. Not hallucinated
facts about the world, which is the failure everyone expects, but confident summaries
of its own work that were not true.

The fix was mechanical rather than a better prompt. The agent now cannot post an
observation unless it cites a specific line in the event log, and the citation is
validated before the post is accepted. No citation, no post. It was also narrowed to
a much tighter operating scope, on the principle that an unreliable agent with a wide
mandate is worse than a reliable one with a narrow one.

I keep this in the portfolio deliberately. Anyone can show an agent demo that worked.
Being able to describe how one failed, why the failure was hard to see, and what
structural change contained it is a more useful thing to know about an engineer.
