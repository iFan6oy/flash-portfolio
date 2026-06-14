# Flash Portfolio — jaylonmalone.dev

Personal portfolio for Jaylon Malone. Cinematic, content-driven, built to position
across hiring **and** consulting.

## Stack

- **Astro 5** (static, ships ~zero JS)
- **Tailwind 4** (CSS-first `@theme` tokens, via `@tailwindcss/vite`)
- **Content Collections** — projects are typed markdown data, never hardcoded markup
- `@astrojs/sitemap`

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
```

## Architecture

- `src/content/projects/*.md` — one file per project. Frontmatter (typed in
  `src/content.config.ts`) drives cards + detail pages; the markdown body is the
  case study. **To add a project: drop a new `.md` here.**
- `src/lib/categories.ts` — the single source of truth for category accent colors
  and homepage section copy. Edit accents HERE, never at the callsite (mirrors the
  hub's per-vertical color discipline).
- `src/pages/index.astro` — homepage: hero → featured + Flashpoint spotlight →
  Business / AI / Experiments → About + Skills → Contact.
- `src/pages/work/[slug].astro` — generated case-study page per project.
- `src/layouts/Base.astro` — head, fonts, grain, reveal-on-scroll observer.

## Project taxonomy

- `group`: `featured` | `business` | `ai` | `experiments` (homepage section)
- `featured: true` — promoted into the top grid (the hub renders as a spotlight)
- `category` — drives accent (see `categories.ts`)
- `private: true` — flags repos that can't go public (shown as "Private", no repo link)

## TODO (assets + content, deferred)

- Real screenshots / recordings per project (covers are generated gradients for now)
- READMEs on the source repos: flash-trader, cutt-it, lead-scraper, tra
- Confirm final domain + Vercel deploy
- Optional: OG images per project, contact form backend

## Deploy

Static output in `dist/`. Drop on Vercel (framework preset: Astro) or any static host.
Set `site` in `astro.config.mjs` to the final domain (currently `jaylonmalone.dev`).
