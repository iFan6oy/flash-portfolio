---
title: Rebid Radar
tagline: A contract intelligence pipeline built on public federal data, where every asserted fact carries evidence and "we checked and it is absent" is a recorded state.
category: data
group: engineering
role: Solo Developer
year: 2026
status: Prototype
featured: false
order: 17
private: true
stack:
  - Python
  - SQLite
  - Entity resolution
  - pytest
highlights:
  - Facts are stored with evidence, and an explicitly checked-and-absent value is recorded rather than left null
  - Entity resolution across agencies and vendors using official identifiers plus name aliases
  - Personal contact details are stripped from the corpus by policy, since the product sells entity data and not personal data
  - Quality gates must all pass before anything can be sent to a paying reader
links: {}
demonstrates:
  - Data modeling with provenance and explicit unknowns
  - Identity resolution across inconsistent public sources
  - Building verification gates into a data product
---

Rebid Radar tracks technology contract renewals for public school districts using
official federal filing data. The engineering interest is entirely in the data
model rather than the delivery, which is just an email.

The idea I would carry into any data role is that a null is ambiguous. In most
schemas an empty field could mean nobody looked, the source did not have it, or it
was checked and genuinely is not there. Those are three different facts, and
collapsing them makes downstream confidence impossible to compute. Here, a checked
and absent value is stored explicitly and separately from never-checked, which is
what lets the briefing distinguish a signal it is confident about from one it is
guessing at.

Entity resolution was the other real problem. The same agency and vendor appear under
several names across filings, so resolution leans on official registry identifiers
where they exist and a curated alias set where they do not.

I am reporting this one honestly: the pipeline is built, tested, and running on real
data, and it has no paying customers. It is in the portfolio for the data engineering,
not as a business result.
