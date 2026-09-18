---
title: Session Brain
tagline: Keeping playback in sync across four devices without letting an idle laptop steal the session. A Flashpoint deep dive on replacing disagreeing state with one decision-maker, on a live system.
description: How Flashpoint's session authority replaces several disagreeing sources of playback state with one, using frozen contracts, a shadow deployment, and a cutover gated on measured agreement.
category: systems
group: supporting
capability: Systems design and safe migrations
role: Solo developer
year: 2026
status: Active
featured: false
order: 10
private: true
diagram: sessionBrain
stack:
  - Python
  - Frozen schema contracts
  - Shadow deployment
  - pytest
overview: >-
  Flashpoint runs on a desktop, an iPhone, a Fire TV, and a Samsung TV. Each one
  had its own idea of what was playing and which device was in charge, and they
  did not always agree. The symptoms were familiar to anyone who has used a
  casting app: a device listed as active that was really asleep, the wrong song
  showing as now playing, a resume point that jumped backward. This is the work to
  give the system one decision-maker without breaking the product I use every day.
highlights:
  - One service decides which device owns playback, instead of every device guessing.
  - The four apps update on different schedules, so the change had to work without updating them all at once.
  - The new system runs quietly next to the old one and is compared against it before it is trusted.
  - The switch-over waits on measured agreement between old and new, not on the code feeling done.
engineering:
  - "Three layers with one job each: a fast presence channel that may be briefly wrong, a durable store that must never be wrong, and an authority that resolves conflicts between them."
  - A contract module freezes the wire format at a fixed field set, so clients on an app store, a TV store, and side-loaded builds can lag behind the backend safely.
  - Conflict resolution lives in a rulebook of named, separately tested guard rules instead of conditionals scattered through the code.
  - The authority runs in shadow mode on real traffic with no production readers, so a bug in the new code cannot affect playback while it is being found.
links:
  repo: https://github.com/iFan6oy/cross-device-continuity-playbook
  repoLabel: Read the public playbook
related:
  - slug: flashpoint
    label: Back to the Flashpoint case study
problem: >-
  Flashpoint grew from one app to four. Each new app brought its own notion of
  what was playing and which device was active, and the system ended up with
  several overlapping stores that each had a partial claim on being right. Every
  new feature made it worse, because there was no single place that was correct.
constraints:
  - The system is live and in daily use. A migration that needs downtime or a big-bang switch is not acceptable.
  - The four apps ship on different schedules and cannot be upgraded in lockstep.
  - The failure mode is silent. Wrong state does not crash; it just quietly disagrees, so correctness has to be measured rather than assumed.
architecture: >-
  A live presence channel carries who is here and what is playing, and is allowed
  to be slightly stale because it is fast. A durable store holds anything that
  must survive a refresh. The authority sits above both, decides who owns the
  session, and resolves the cases where the two contradict each other. Clients
  talk to it through a frozen contract so they can update on their own schedule.
decisions:
  - title: Freeze the contract before writing the authority
    body: >-
      The message format was frozen first. That one decision is what makes the
      rest survivable: the backend can change how it computes state without a
      synchronized release across four apps and two stores.
  - title: Deploy with zero production readers
    body: >-
      The authority runs fully deployed on real traffic, with nothing in
      production reading its output. That turns "is the new model correct" from
      an argument into a measurement, and a bug in the new code hurts nothing.
  - title: Gate the switch on agreement, not confidence
    body: >-
      Cutover waits on data showing how often the old and new systems disagree,
      and on understanding every disagreement that remains. You flip when that
      number is boring.
  - title: Conflict rules are named guards
    body: >-
      Reconciliation logic rots when every incident adds another special case in
      the middle of a function. A small, separately tested rulebook keeps each
      rule reviewable on its own.
hardProblems:
  - title: The first agreement test failed, usefully
    body: >-
      The gate that must pass before the authority gets any control failed on its
      first run in September 2026. It had named a paused laptop with no media as
      the owner of a session. The root cause was code that took the first match
      from a list that could hold several sessions, so it followed a dead one and
      ignored the live one. The agreement check itself had the same bug, which
      meant an earlier pass could have been luck. Both were fixed, and the old
      and new systems then agreed on who owns playback.
  - title: Deciding what is even true
    body: >-
      Before any code, the work was diagnostic: listing every store that claimed
      to know about presence or playback, what wrote to it, and what read from it.
      Several were written but never meaningfully read, which is its own finding.
  - title: Making silence a bug
    body: >-
      A state system that goes quiet looks identical to one that is idle.
      Treating unexpected silence as a defect is what turned vague flakiness into
      a list of specific, fixable causes, including a sleeping TV that kept
      reporting itself as idle and held the session for hours.
result:
  - The authority, contracts, rulebook, and tests are built and running in shadow mode in production.
  - It does not control playback yet. The existing system still owns the session, and recent ownership fixes were made there.
  - The next step is a full day of real multi-device use with the two systems agreeing before any control is handed over.
  - The migration pattern is published as a public playbook, with the specific infrastructure abstracted out.
---

This is the piece of work I would most want to be asked about in an interview.
Not because the end design is exotic, but because the migration is the hard part,
and that is the part most portfolio projects skip.

> The linked repository is the public write-up of the pattern. The implementation
> is part of a private system.
