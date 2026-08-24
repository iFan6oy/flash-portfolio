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
  schema: z.object({
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
    ]),
    // homepage placement
    group: z.enum(['selected', 'engineering']),
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
    featured: z.boolean().default(false),
    order: z.number().default(50), // lower = earlier
    private: z.boolean().default(false), // source can't be public; no repo link

    // ---- structured case study (all optional) ----
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
