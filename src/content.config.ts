import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects are DATA, never hardcoded markup. Each project is one markdown file in
 * src/content/projects/. Frontmatter is typed + validated below.
 *
 * The strongest projects fill in the structured case-study fields (problem,
 * constraints, architecture, decisions, hardProblems, result, demonstrates) and the
 * detail page renders them as real sections. Lighter entries just use the markdown
 * body. Everything below `tagline` is optional on purpose: a half-filled case study
 * renders cleanly rather than leaving empty headings on the page.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.enum([
      'systems',
      'ai',
      'api',
      'media',
      'tv',
      'mobile',
      'data',
      'automation',
      'power',
      'trading',
      'web',
      'games',
    ]),
    // homepage placement: flagship and selected get editorial treatment,
    // supporting gets a compact row, archive keeps its case study route but
    // stays off the homepage.
    group: z.enum(['flagship', 'selected', 'supporting', 'archive']),
    /** plain-English capability this project proves, shown on supporting rows */
    capability: z.string().optional(),
    /** optional search/social description; falls back to tagline */
    description: z.string().optional(),
    role: z.string().default('Solo Developer'),
    year: z.coerce.string().default('2026'),
    status: z.enum(['Live', 'Active', 'Shipped', 'Prototype', 'Archived']),
    stack: z.array(z.string()),
    highlights: z.array(z.string()).default([]),
    links: z
      .object({
        live: z.string().url().optional(),
        repo: z.string().url().optional(),
        /** override the repo button label, e.g. when the link is a public
         *  write-up of a pattern rather than the private implementation */
        repoLabel: z.string().optional(),
        docs: z.string().url().optional(),
      })
      .default({}),
    cover: z.string().optional(),
    /** brand mark for the project, resolved + optimized by astro:assets.
     *  Path is relative to this markdown file. Optional: projects without a
     *  logo simply render the title on its own. */
    logo: image().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(50), // lower = earlier
    private: z.boolean().default(false), // source can't be public; no repo link

    // ---- structured case study (all optional) ----
    /** plain-English "what it is", rendered before any engineering detail */
    overview: z.string().optional(),
    /** real product screenshots, resolved and optimized by astro:assets */
    screenshots: z
      .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
      .default([]),
    /** technical evidence, rendered as "Under the hood" after the plain story */
    engineering: z.array(z.string()).default([]),
    /** links to related case studies, by slug */
    related: z.array(z.object({ slug: z.string(), label: z.string() })).default([]),
    problem: z.string().optional(),
    constraints: z.array(z.string()).default([]),
    architecture: z.string().optional(),
    /** key id of a diagram defined in src/lib/diagrams.ts */
    diagram: z.string().optional(),
    decisions: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .default([]),
    hardProblems: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .default([]),
    result: z.array(z.string()).default([]),
    demonstrates: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
