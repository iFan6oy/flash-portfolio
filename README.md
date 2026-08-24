# Flash Portfolio

Personal engineering portfolio for Jaylon Malone. Deployed at
**[flashaisolutions.org/work](https://www.flashaisolutions.org/work/)**.

Positioning: application developer and systems builder. The site argues that through
evidence (case studies with real architecture and real tradeoffs) rather than through
adjectives. It deliberately mirrors the GitHub profile README so the two never
contradict each other.

## Stack

- **Astro 5**, static output, zero client-side framework
- **Tailwind 4** via `@tailwindcss/vite`, CSS-first `@theme` tokens
- **Content collections**: projects are typed markdown data, never hardcoded markup
- `@astrojs/sitemap`

## Run

```bash
npm install
npm run dev      # http://localhost:4321/work/
npm run build    # -> dist/
npm run preview
```

## Architecture

```
src/
  content/projects/*.md   one file per project; frontmatter drives everything
  content.config.ts       the typed schema (this is the contract)
  lib/categories.ts       category accents + the Engineering Areas copy
  lib/diagrams.ts         architecture diagrams, as data
  lib/openSource.ts       the curated public-repo list
  components/
    FlowDiagram.astro     renders lib/diagrams.ts as responsive HTML
    ProjectCard.astro     grid card
    Nav.astro             includes the accessible mobile disclosure menu
  pages/
    index.astro           hero, selected systems, areas, more, OSS, experience, about, contact
    [slug].astro          generated case study per project
    audit.astro           consulting funnel (Workflow Audit)
    filter.astro          lead-magnet page
  layouts/Base.astro      head, SEO, JSON-LD Person schema, skip link, reveal observer
```

### Adding or editing a project

Drop a `.md` file in `src/content/projects/`. Frontmatter is validated by
`src/content.config.ts`, so a typo fails the build rather than rendering wrong.

Everything below `tagline` is optional. The strongest projects fill in the structured
case-study fields and the detail page renders them as real sections; lighter entries
just use the markdown body. A section with no content renders nothing rather than an
empty heading.

| Field | Purpose |
|---|---|
| `group` | `selected` (homepage headline grid) or `engineering` (secondary grid) |
| `category` | drives the accent color, see `lib/categories.ts` |
| `order` | lower sorts earlier within a group |
| `private: true` | shows a "Private source" badge and omits any source link |
| `problem` / `constraints` / `architecture` | the top of the case study |
| `decisions` / `hardProblems` | arrays of `{ title, body }` |
| `result` / `demonstrates` | closing sections |
| `diagram` | key into `lib/diagrams.ts` |
| `links.repoLabel` | override the repo button label, e.g. when the link is a public write-up of a pattern rather than the private implementation |

**YAML gotcha:** any frontmatter string containing `": "` must be quoted, or the
parser reads it as a map and the build fails with `bad indentation of a mapping entry`.

### Content rules

These are enforced by review, not by code:

- **No invented numbers.** No users, revenue, uptime, latency, or percentages unless
  the repository, logs, or documentation support them. Every figure on the site is
  countable from the work itself.
- **Private stays private.** A private system can be featured, but it is labeled
  "Private source" and never links to closed source. No credentials, no infrastructure
  detail, no client or personal data.
- **No em dashes.**

## Accessibility and performance baseline

Do not regress these:

- Zero JavaScript bundles. The only scripts are the nav toggle, the reveal observer,
  and analytics, all inline and tiny.
- All body and label text clears 4.5:1 against the page background. `--color-ink-faint`
  is the floor at 4.61:1, so do not darken the bottom of the ink ramp.
- Focus rings are never removed; `:focus-visible` picks up the page accent.
- `prefers-reduced-motion` disables the reveal animation and smooth scrolling.
- No horizontal overflow at 375px. Diagrams reflow to a single column.

## Deploy

The site is served from `flashaisolutions.org/work/`, as a static build committed
inside the `flash-ai-solutions` repo (which is what Vercel deploys). `base: '/work'`
in `astro.config.mjs` prefixes every internal link and asset via
`import.meta.env.BASE_URL`.

`site` is set to the **www** host because the apex 301s to it, so canonical URLs and
the sitemap must point at the final destination.

```bash
npm run build
rm -rf ../flash-ai-solutions/work && mkdir ../flash-ai-solutions/work
cp -r dist/. ../flash-ai-solutions/work/
cd ../flash-ai-solutions && git add work && git commit -m "site: update /work portfolio" && git push
```

The `work` folder must be wiped rather than overwritten, otherwise pages for removed
projects linger in the deployed output.
