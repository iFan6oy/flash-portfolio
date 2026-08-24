---
title: Session Brain
tagline: Replacing five disagreeing state stores with one authority, on a live system, using frozen contracts, a shadow deployment, and a cutover gated on divergence data.
category: systems
group: selected
role: Solo Developer
year: 2026
status: Active
featured: true
order: 2
private: true
diagram: sessionBrain
stack:
  - Python
  - Frozen schema contracts
  - Shadow deployment
  - pytest
highlights:
  - Roughly 2,800 lines of Python across the authority, the frozen contracts, the guard rulebook, and its tests
  - Contract module defines the wire format once so four clients on different release cadences never break each other
  - Six guard rules decide who owns a session when clients disagree, instead of last-write-wins
  - Runs shadow-live with zero production readers until the divergence numbers justify a cutover
links:
  repo: https://github.com/iFan6oy/cross-device-continuity-playbook
  repoLabel: Read the public playbook
problem: >-
  Flashpoint grew from one client to four. Each new client brought its own notion of
  what was playing and which device was active, so the system ended up with several
  overlapping stores that all had a partial claim on being right. The visible
  symptoms were the usual ones: a device listed as present that was not really
  there, a wrong now-playing, a resume position that jumped backward. Every new
  feature made it worse because there was no single place that was correct.
constraints:
  - The system is live and in daily use. A migration that requires downtime or a big-bang switch is not acceptable.
  - Four clients ship on different cadences, including an app store and a TV store. They cannot be upgraded in lockstep.
  - The failure mode is silent. Wrong state does not throw, it just quietly disagrees, so correctness has to be measured rather than assumed.
architecture: >-
  Three layers, each with exactly one job. A live mesh carries ephemeral presence
  and is allowed to be slightly wrong, because it is fast and lossy by design. A
  durable store holds anything that must survive a refresh and is never lossy. An
  authority sits above both, decides who owns the session, and resolves the cases
  where the mesh and the store contradict each other. The contract module pins the
  wire format so clients can lag behind the backend safely, and a rulebook holds the
  conflict-resolution rules as named, testable guards.
decisions:
  - title: Freeze the contract before writing the authority
    body: >-
      The wire format was frozen at a fixed field set first. That single decision is
      what makes the rest survivable: the backend can change its mind about how it
      computes state without forcing a synchronized release across four clients and
      two app stores.
  - title: Deploy the new authority with zero production readers
    body: >-
      The authority ran shadow-live: fully deployed, computing real answers on real
      traffic, with nothing in production reading its output. That converts "is the
      new model correct" from an argument into a measurement, and it means a bug in
      the new code cannot hurt anything while it is being found.
  - title: Gate the cutover on divergence, not on confidence
    body: >-
      Cutover waits on data showing how often the old and new models actually
      disagree, and on understanding every disagreement that remains. The rule is
      that you flip when that number is boring, not when the code feels done.
  - title: Conflict rules are named guards, not inline conditionals
    body: >-
      Reconciliation logic is where this kind of system rots, because every incident
      adds one more special case somewhere in the middle of a function. Keeping the
      rules as a small, separately tested rulebook means each one can be reasoned
      about and regression-tested on its own.
hardProblems:
  - title: Deciding what is even true
    body: >-
      Before any code, the work was diagnostic: enumerating every store that held a
      claim about presence or playback, what wrote to it, what read from it, and
      which ones were load-bearing. Several turned out to be written but never
      meaningfully read, which is its own kind of finding.
  - title: Making silence a bug
    body: >-
      A state system that goes quiet looks identical to one that is idle. Treating
      an unexpected silence as a defect worth writing down, rather than as normal,
      is what turned vague flakiness into a list of specific, fixable causes.
result:
  - The authority, contracts, guard rulebook, and test suite are built and running shadow-live in production.
  - The migration pattern is published as a public playbook, written so the patterns transfer with the infrastructure abstracted out.
  - Cutover remains gated on the divergence acceptance data rather than shipped early.
demonstrates:
  - Distributed state reconciliation across heterogeneous clients
  - Shipping a risky migration on a live system without downtime
  - Contract-first API design under real versioning pressure
  - Measuring correctness rather than asserting it
---

This is the piece of work I would most want to be asked about in an interview. Not
because the end design is exotic, but because the migration was the hard part, and
that is the part most portfolio projects skip entirely.

The source lives inside Flashpoint and stays private, so the patterns have been
written up separately and published as an open playbook. It documents the five-store
problem, frozen contracts, shadow authority, divergence-gated cutover, the conflict
rulebook, and the incident ledger, with the specific infrastructure abstracted out.

> The linked repository is the public write-up of the pattern. The implementation
> itself is part of a private system.
