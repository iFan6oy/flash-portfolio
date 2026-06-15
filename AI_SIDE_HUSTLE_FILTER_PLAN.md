# Implementation Plan — AI Side Hustle Filter (for Sonnet)

**Goal:** an interactive lead-magnet tool that asks 5 questions and returns which AI
income paths actually fit the user, with honest "bullshit ratings" on every result.
It is a free magnet for Flash AI Solutions, the email-capture top of the funnel, and
a build-in-public proof piece all at once.

**Model note:** architecture and all content are decided. This is implementation only.
Do NOT redesign the matching, rewrite the path copy, or add a frontend framework.
If something is genuinely ambiguous, pick the choice that matches the existing
`flash-portfolio` conventions and keep moving.

---

## 1. Where it lives

- New page: `src/pages/filter.astro` in `flash-portfolio`.
- Deploys at `flashaisolutions.org/work/filter` (the site mounts at `BASE_URL = /work/`).
- Content + matching data already authored: **`src/lib/filterData.ts`** — treat it as
  source of truth. Import `QUESTIONS`, `PATHS`, `WEIGHTS`, `RATING_LEGEND` and types.

## 2. Stack + hard constraints

- **No new dependencies.** Astro 5.8 + Tailwind 4.1 only. The interactive logic is a
  single vanilla `<script>` in `filter.astro` (same pattern as the reveal observer in
  `Base.astro`). No React/Svelte/Preact island for a 5-question quiz.
- **Fully static, no backend.** Everything computes client-side.
- **Reuse the design system** from `src/styles/global.css`: tokens (`--color-bg`,
  `--color-ink`, etc.), `.aura` blobs, `.reveal`, `.grain` (already on `<body>` via
  `Base.astro`), fonts (Space Grotesk display, Inter body, JetBrains Mono for the
  rating numbers). Wrap the page in `Base.astro`.
- **Accent color:** primary `#7c5cfa` (AI cosmic purple, per the canonical vertical
  map). Use emerald `#10b981` for positive / money signals (low BS, good fit) and a
  warning red `#ef4444` for the high-BS badge. Set `--accent: #7c5cfa` on the page root.
- **Mobile-first.** Most traffic arrives from X/LinkedIn on a phone. Single column,
  big tap targets (min 44px), thumb-reachable Next button.
- **No fabrication.** Ratings come straight from `filterData.ts`. Do not invent extra
  stats, counts, or "X people took this."
- **No em dashes** anywhere in any copy you add.
- **Accessibility:** real `<button>`s, keyboard navigable, visible focus ring,
  contrast >= 4.5:1, honor `prefers-reduced-motion` (the existing `.reveal` already does).
- **Self-cleaning:** any listeners/observers you add must not leak. Page is static so
  this is minor, but follow the `Base.astro` IntersectionObserver precedent.
- **No-JS fallback:** in `<noscript>` (or a default-visible block the script hides),
  show the headline + a one-line description + a direct link to the Gumroad product, so
  scripts-off users and crawlers still get value and the CTA.

## 3. Screens (single page, JS-swapped sections)

1. **Intro / hero** — cinematic. Oversized display headline ("Most AI side hustles are
   garbage. Find the few that fit you."), one-line subhead, a single "Start" button.
   `.aura` blobs in purple + emerald, gradient headline via `.text-gradient`. Merge the
   hero edges into the bg per the house style (no hard rectangle). Include a small
   honest line: "5 questions. No email required to see your results."
2. **Quiz** — one question at a time from `QUESTIONS`. Progress indicator (e.g. "2 / 5"
   + a thin progress bar in accent). Single-select advances on click; the multi-select
   question (`edge`, `multi: true`) shows a "Next" button and allows 0+ selections.
   Provide Back. Selected options get an accent border + glow.
3. **Results** — computed instantly (see scoring). Layout:
   - Headline: "Your top matches" + a one-line read of their answer profile.
   - **Top 3 paths** as cards. Each card: name, blurb, the four rating bars
     (difficulty / startupCost / timeToFirstDollar / bsFactor) rendered as 1-5 pip/bar
     meters using `RATING_LEGEND` for tooltips/labels, the `bestFor`, the `realTalk`
     ("The catch:"), and the `firstStep` ("Start here:"). Show a **BS badge**: green
     "Legit" for bsFactor <= 2, amber "Mixed" for 3, red "High hype" for >= 4.
   - **"Skip these (for your situation)"** — reality-check section. Pick up to 2 paths
     where `hype === true` AND the path is a weak fit (low score) for this user. Frame:
     "You will see these pushed everywhere. Here is why they are a trap for you right
     now." Show name + one-line `realTalk`. This honesty is the brand; keep it.
   - **CTA block:** "Get the full breakdown + the starter playbook" → Gumroad link
     (placeholder const `GUMROAD_URL = 'https://gumroad.com/REPLACE_ME'` near the top of
     the script; Jaylon fills it). Secondary **Share** button: `navigator.share` if
     available, else copy a prefilled string to clipboard
     ("I just filtered the AI side hustles actually worth doing → <page url>") with a
     toast/inline confirm. Also a "Start over" button.

## 4. Scoring (implement exactly)

For the user's answers `{ time, budget, edge: string[], speed, goal }`, score each path:

```
score = 0
if (answers.time   in path.timeFit)   score += WEIGHTS.time      // 2
if (answers.budget in path.budgetFit) score += WEIGHTS.budget    // 2
score += WEIGHTS.edgePerMatch * count(answers.edge ∩ path.edgeFit)  // 3 each
if (answers.speed  in path.speedFit)  score += WEIGHTS.speed     // 2
if (answers.goal   in path.goalFit)   score += WEIGHTS.goal      // 2
```

- Rank all paths by `score` descending. Tie-break by **lower `bsFactor`** first, then
  **lower `difficulty`** (reward the more legit / more accessible path on ties).
- **Top matches** = the top 3 by rank.
- **Reality check ("Skip these")** = from paths NOT in the top 3, take those with
  `hype === true`, sort by `score` ascending (worst fit first), take up to 2. If none
  qualify, omit the section entirely (do not show an empty box).
- Edge case: if the user selected only `cold` (no real edge) or skipped the multi-select,
  scoring still works (edge term contributes 0). Make sure top 3 always renders something
  sensible (it will, since time/budget/speed/goal still score).

## 5. Visual / motion polish (cheap, GPU-friendly)

- Transitions between screens: opacity + small translateY only (transform/opacity, no
  layout thrash). Respect `prefers-reduced-motion`.
- Rating bars animate width on results reveal (cheap), accent-colored, with the bsFactor
  bar colored by severity (green/amber/red).
- Keep particle/aura counts modest. No `backdrop-filter` on anything heavy.
- One signature touch: the accent aura subtly shifts toward emerald as results render
  (you matched, here is the money), purely via opacity/color of existing `.aura` divs.

## 6. Acceptance criteria

- [ ] Loads at `/work/filter`, works fully with JS on.
- [ ] No-JS users see headline + description + Gumroad link (no blank page).
- [ ] 5 questions, single + multi select both work, Back/Next + progress all function.
- [ ] Results compute correctly per the scoring spec (spot-check: heavy `code` + `sell`
      edge, fast `cash`, low budget → `productized-ai-audit` / `ai-automation-services`
      rank high; `selling-prompts` never ranks top for anyone with a real edge).
- [ ] Top 3 cards show all four honest rating meters + BS badge + realTalk + firstStep.
- [ ] "Skip these" shows hype paths only when they are a weak fit; hidden otherwise.
- [ ] Gumroad CTA + working Share/copy + Start over.
- [ ] Matches portfolio design system (tokens, fonts, aura, reveal, cinematic hero,
      merged edges). Mobile-first, looks right at 380px and on desktop.
- [ ] No console errors. No new npm deps. `npm run build` succeeds.
- [ ] No em dashes in any added copy.

## 7. Deploy (after build passes)

```bash
cd flash-portfolio && npm run build
# then copy the built output into the main site's /work per the existing pipeline
# (same step used for every portfolio deploy)
```

Optional follow-up (not required for v1): a clean vanity URL `flashaisolutions.org/filter`
via a redirect/copy at the main-site level. Ship `/work/filter` first.

## 8. Out of scope (leave for Jaylon / a later pass)

- The real Gumroad product + email sequence (content, lives in Gumroad).
- The full expansion of `PATHS` beyond the current set (data is expandable; the UI must
  not hardcode a count — render whatever `PATHS` contains).
- Analytics wiring.
