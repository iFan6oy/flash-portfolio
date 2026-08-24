---
title: Chalkline
tagline: A teaching-materials studio where an LLM writes one part of the job and a verification harness makes sure the printed worksheet is actually correct.
category: ai
group: selected
role: Solo Developer
year: 2026
status: Active
featured: true
order: 4
private: true
stack:
  - TypeScript
  - Next.js 16
  - React 19
  - Zod
  - Postgres
  - Vitest
highlights:
  - Structured generation validated against schemas, so malformed model output is caught before it reaches a teacher
  - A torture suite with answer-integrity, metamorphic, fuzz, repair, persistence, and concurrency cases
  - Eight of nine derived materials cost nothing to produce because they rearrange the teacher's own content instead of regenerating it
  - Works without an API key by opening a complete sample lesson, so the product is evaluable before it costs anything
links: {}
problem: >-
  Teachers do not need another chatbot. They need the finished package: an
  explanation, graded practice, an activity, an exit ticket, homework, and an answer
  key, in a form they can print and hand out this morning. The generic tools produce
  a wall of text that still needs an hour of formatting, and worse, they produce
  answer keys that are subtly wrong.
constraints:
  - A wrong answer key is a classroom failure, not a bad response. Correctness has to be enforced, not hoped for.
  - Model calls cost money on every generation, and the users are teachers, so the unit economics have to work at a low price.
  - Output has to survive printing. Page breaks, paper size, and orientation are product features, not styling afterthoughts.
  - Three subjects with genuinely different correctness rules, since checking a maths answer and checking a grammar exercise are not the same problem.
architecture: >-
  A Next.js application with a generation layer that produces structured, schema
  validated material rather than prose. Generated material becomes an editable
  document that autosaves, and separate routes render the same document for print and
  for projection. Derived materials, like turning a lesson into a bingo set or a quiz
  or a differentiated version, are transformations over content that already exists,
  so they are close to free. Only the small number of derivations that genuinely
  require new writing spend a model call.
decisions:
  - title: Structured output with schema validation, not free text
    body: >-
      Everything the model produces is parsed into a validated shape before it is
      allowed to become material. That turns an entire class of failure, the model
      returning something almost-right, into a caught error rather than a worksheet
      with a broken part C.
  - title: Derive rather than regenerate
    body: >-
      Most of what a teacher wants next is a rearrangement of what they already have.
      Building those as transformations rather than fresh generations makes them
      instant and free, which is both better product behavior and the reason the
      pricing works.
  - title: Test it like a system, not like a prompt
    body: >-
      The test suite includes metamorphic cases, where a change to the input has to
      produce a correspondingly changed output, and mutation-style answer-integrity
      cases that deliberately corrupt content to confirm the checks catch it. Prompt
      quality is not something you can eyeball at scale.
  - title: Useful with no key configured
    body: >-
      With no API key the app opens a complete sample lesson that can still be
      edited, printed, and presented. The whole product surface is reachable without
      spending anything, which matters for evaluation and for development.
hardProblems:
  - title: Verifying correctness across three different subjects
    body: >-
      Checking that a maths answer key is right is arithmetic. Checking a grammar
      exercise is not. The verification layer has to be subject-aware rather than one
      generic validator, which is most of why the test suite is organized by failure
      mode instead of by feature.
  - title: Print is a real target
    body: >-
      Getting a document to break across pages correctly, with the student copy, the
      teacher copy, and the answer key each laying out properly at different paper
      sizes, took more iteration than the generation logic did.
result:
  - Working product across three subjects with generation, editing, print, and present surfaces.
  - Dedicated evaluation and torture tooling, including corpus and quality evaluations and a long-running overnight suite.
  - Costs controlled by making the majority of user-visible actions free to serve.
demonstrates:
  - LLM product engineering with enforced structured outputs
  - Treating model correctness as a testable property
  - Cost-aware system design where the economics shape the architecture
  - Full-stack application work on a current React and Next.js codebase
---

Chalkline is where I think hardest about the difference between using a model and
engineering with one. The model writes original content, which it is good at. It is
not trusted to be right, which it is not reliably good at, so everything it produces
passes through validation before a teacher ever sees it.

The most useful idea in the codebase is that most of what a user wants next is a
rearrangement of something they already have. Recognizing that turned the majority of
the feature list from expensive model calls into instant local transformations.
