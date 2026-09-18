---
title: Chalkline
tagline: Teachers describe what they are teaching and get a finished, printable lesson package, while the system checks the answer keys before a teacher ever sees them.
description: Chalkline turns a teacher's topic into editable, printable lessons, worksheets, and activities with verified answer keys, account privacy, and print-ready output. Case study by Jaylon Malone.
category: ai
group: selected
role: Solo developer
year: 2026
status: Live
featured: true
order: 4
private: true
logo: ../../assets/logos/chalkline.png
overview: >-
  Chalkline is a web app for teachers of English as a second language, English
  language arts, and math. A teacher types what they are teaching and gets a
  complete package they can edit and print: an explanation, guided practice, a
  worksheet, an exit ticket, homework, and an answer key. Any finished material can
  be turned into another format, like a bingo set, a quiz, or an easier version,
  in a click. The AI writes the content, but it is not trusted to be right: answers
  are checked before they reach the teacher, and math answers are computed by code.
highlights:
  - Finished classroom materials in the format teachers actually use, not a chat reply that still needs an hour of formatting.
  - Answer keys are checked independently, and every math answer is calculated by code instead of by the model.
  - Most follow-up formats (quizzes, bingo sets, alternate versions) are rearrangements of the teacher's own content, so they are instant and free to produce.
  - Print-ready output with correct page breaks, paper sizes, and separate student and teacher copies, plus a projector view for class.
  - Private by default. A teacher's work is visible only to their account unless they create a read-only share link.
  - Live with accounts, email verification, and subscription billing.
engineering:
  - Next.js 16 and React 19 with TypeScript and Zod 4. Model output is parsed and validated item by item against schemas, with one targeted repair round before an item is rejected.
  - "Three tiers of checks: deterministic rules in code, checks against curated reference data, and a review model from a different vendor that answers named yes-or-no criteria."
  - For closed questions, the reviewer never sees the stored answer. It solves the question cold, and code classifies the result as no valid answer, a mismatch, or more than one valid answer.
  - Math answers use exact fraction arithmetic, so the model never supplies a number. The teacher sees which checks ran, and a check that did not run is never shown as a pass.
  - "Account data is scoped per owner on every read, so another teacher's material id behaves exactly like one that does not exist. Share links are opt-in, read-only, stripped for public view, and die with the material."
  - Accounts use scrypt password hashing and signed session cookies. Private routes are excluded from crawlers and marked noindex.
  - Server-side PDF export with headless Chrome, and a test that keeps the print route outside the app shell so navigation never lands in a printout.
  - "A Vitest suite of roughly 1,900 tests plus an offline torture lab: injected wrong answers, fuzzing, concurrency, and persistence cases. A quick version runs in CI."
stack:
  - TypeScript
  - Next.js 16
  - React 19
  - Zod 4
  - Tailwind CSS 4
  - Puppeteer
  - Stripe
  - Vitest
links:
  live: https://chalkline.flashodds.live/
problem: >-
  Teachers do not need another chatbot. They need the finished package: an
  explanation, graded practice, an activity, an exit ticket, homework, and an answer
  key, ready to print this morning. Generic AI tools produce a wall of text that
  still needs formatting, and worse, they produce answer keys that are subtly wrong.
  A wrong answer key is not a bad response. It is a classroom failure.
constraints:
  - Correctness has to be enforced, not hoped for. Checking a math answer and checking a grammar exercise are different problems.
  - Every model call costs money and the customers are teachers, so the price has to stay low and most actions have to be cheap to serve.
  - Output has to survive a printer. Page breaks, paper size, and orientation are product features.
  - Teacher content is private work. Sharing must be deliberate, and nothing private should be indexed.
architecture: >-
  Code plans the structure of each material first, and the model only writes the
  words that go in each slot. Generated items are validated, checked, and saved as
  an editable document. Separate routes render the same document for print, for
  PDF, and for a projector. Follow-up formats are transformations of content that
  already exists, and only the few that need genuinely new writing spend a model
  call.
decisions:
  - title: Structure from code, words from the model
    body: >-
      Letting code decide the shape of a worksheet and asking the model only for
      the content of each slot removes a whole class of failure: the model
      returning something almost-right that breaks the page.
  - title: Derive instead of regenerate
    body: >-
      Eight of nine follow-up formats are rearrangements of what the teacher
      already has. Building them in code makes them instant and free, which is
      better for the teacher and is why the pricing works.
  - title: Test it like a system, not like a prompt
    body: >-
      The test suite deliberately corrupts answers to confirm the checks catch
      them, and runs repeated and concurrent generations to find state bugs. Prompt
      quality is not something you can eyeball at scale.
  - title: Show receipts, not reassurance
    body: >-
      Teachers see which checks ran and what they found, never model prose
      claiming the work is correct. A check that did not run can never display as
      passed.
hardProblems:
  - title: Verifying three different subjects
    body: >-
      Math can be computed. Grammar and reading cannot. The verification layer is
      subject-aware rather than one generic validator, which is why the tests are
      organized by failure mode instead of by feature.
  - title: Edited answer keys drifting from the print
    body: >-
      When a teacher edits an answer, the printed key has to follow. Answer keys
      are re-read from their source field on every read, so the printout cannot
      drift from what the teacher changed.
  - title: Print is a real target
    body: >-
      Getting student copies, teacher copies, and answer keys to paginate cleanly
      across paper sizes took more iteration than the generation logic did.
result:
  - Live at chalkline.flashodds.live with sign-up, email verification, subscription billing, sharing, print, PDF, and projector views.
  - Three subjects supported. Math is limited on purpose to the topic families the code can verify exactly, and science and history are gated until their checks exist.
  - Early stage. It is a working product, not one with a large user base yet.
---

Chalkline is where I think hardest about the difference between using a model and
engineering with one. The model writes original content, which it is good at. It
is not trusted to be right, so everything it produces passes through checks before
a teacher sees it.
