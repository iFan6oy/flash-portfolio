---
title: Lead and Outreach Stack
tagline: "Two services that form one pipeline: multi-source lead collection with contact enrichment, feeding a personalized email sender with reply classification."
category: automation
group: engineering
role: Solo Developer
year: 2026
status: Active
featured: false
order: 18
private: true
stack:
  - Node.js
  - SQLite
  - IMAP / SMTP
  - LLM personalization
highlights:
  - Collection, enrichment, scoring, and export as separate stages over one store, so any stage can be rerun independently
  - Generated copy is rejected before sending if it trips filler and AI-tell checks
  - Sends are paced rather than batched, because deliverability is a function of behavior and not just content
  - Replies are pulled back over IMAP and classified, which closes the loop instead of leaving sends unaccounted for
links: {}
demonstrates:
  - Multi-stage data pipeline with independently rerunnable stages
  - Resilient ingestion from sources that actively resist it
  - Quality gates on generated content before it reaches a person
---

These are two services that only make sense together. The first collects local
business leads from several sources, enriches each with contact details and
technology detection, scores them, and exports clean spreadsheets. The second selects
from that store, personalizes a message, sends it at human pace, then watches the
inbox and classifies what comes back.

The engineering worth pointing at is the staging. Collection, enrichment, scoring, and
export are separate passes over a shared store rather than one long script, which
means an enrichment provider failing does not cost the collection work, and any stage
can be rerun without redoing the others.

The quality gate on the outbound copy is the part I would defend hardest. Generated
messages are checked for filler phrasing and the usual model tells before they are
allowed to send. An obviously machine-written cold email is worse than no email,
because it costs the reply and the sender reputation at the same time.

I have been deliberate about the boundaries here. Outreach goes through a dedicated
sending domain rather than a personal mailbox, sends respect daytime hours, and the
scraping side stays within what the sources permit. I have watched projects die from
getting this wrong.
