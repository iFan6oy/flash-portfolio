# Flash Portfolio

Personal engineering portfolio for Jaylon Malone, deployed at
**https://www.flashaisolutions.org/work/**.

The site is a hiring surface first. It presents production work, professional
experience, and open-source evidence with a restrained editorial UI instead of a
product-dashboard or sci-fi aesthetic.

## Stack

- Astro 5, static output
- Tailwind 4 via `@tailwindcss/vite`
- Astro content collections with Zod validation
- `@astrojs/sitemap`
- Minimal inline JavaScript only for navigation and progressive reveal

## Run

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Architecture

```text
src/
  content/projects/*.md   structured project content
  content.config.ts       typed project schema
  lib/categories.ts       semantic project labels
  lib/diagrams.ts         architecture diagrams as data
  lib/openSource.ts       curated public repositories
  components/
    FlowDiagram.astro     restrained semantic architecture renderer
    Nav.astro             accessible desktop/mobile navigation
    Footer.astro          contact/footer shell
  pages/
    index.astro           recruiter-first portfolio homepage
    [slug].astro          generated editorial case studies
    audit.astro           workflow-audit funnel
    filter.astro          side-hustle filter
  layouts/Base.astro      SEO, JSON-LD, accessibility, reveal observer
  styles/global.css       neutral design tokens and shared accessibility rules
```

## Portfolio design rules

The portfolio should sell the engineering work, not the visual theme.

- One restrained brand accent. Projects do not get rainbow category identities.
- Real screenshots and artifacts are preferred over decorative generated artwork.
- No aura blobs, neon glows, sci-fi framing, fake terminals, skill meters, or logo walls.
- Avoid walls of cards and pill tags. Use typography, whitespace, dividers, and hierarchy.
- Flashpoint is the flagship; selected projects get editorial treatment; supporting work uses compact rows.
- Professional experience appears before the long-tail project and open-source indexes.
- Technology lists stay quiet. The project narrative should prove the skill.
- Do not render a "what this demonstrates" section. The case study itself should demonstrate it.
- No invented metrics, revenue, uptime, performance claims, users, or outcomes.
- Private systems remain explicitly private and never expose credentials or personal infrastructure.
- No em dashes.

## Content model

Each project lives in `src/content/projects/`. Frontmatter is validated by
`src/content.config.ts`; invalid content fails the Astro build.

Strong case studies may include:

- `problem`
- `constraints`
- `architecture`
- `diagram`
- `decisions`
- `hardProblems`
- `result`
- `links`
- `cover`

The page renderer skips empty sections rather than manufacturing filler.

## Accessibility and performance baseline

Do not regress:

- visible keyboard focus
- skip link
- semantic navigation
- Escape-to-close mobile menu
- 44px mobile navigation target
- `prefers-reduced-motion`
- readable contrast for all text tokens
- no horizontal overflow at 375px
- no JavaScript framework bundle

Project imagery should be compressed and responsive wherever practical. Avoid adding
large PNGs when a WebP/AVIF asset can carry the same evidence.

## Deployment

The source lives in this repository. The production `/work/` directory currently
lives in `iFan6oy/flash-ai-solutions` and is deployed by Vercel.

Current manual publish flow:

```bash
npm run build
rm -rf ../flash-ai-solutions/work
mkdir ../flash-ai-solutions/work
cp -r dist/. ../flash-ai-solutions/work/
cd ../flash-ai-solutions
git add work
git commit -m "site: update /work portfolio"
git push
```

The destination directory must be replaced rather than overlaid so deleted routes do
not linger. CI verifies that the source portfolio still builds before changes merge.
