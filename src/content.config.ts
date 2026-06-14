import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects are DATA, never hardcoded markup. Each project is one markdown file
 * in src/content/projects/. Frontmatter is typed + validated below; the body
 * (markdown) becomes the long-form case study on the detail page.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    // one of the canonical categories (drives accent + grouping)
    category: z.enum([
      'ai',
      'business',
      'mobile',
      'media',
      'trading',
      'data',
      'power',
      'lab',
    ]),
    // narrative grouping shown on the homepage
    group: z.enum([
      'featured',
      'business',
      'ai',
      'experiments',
    ]),
    role: z.string().default('Solo Developer'),
    year: z.coerce.string().default('2026'),
    status: z.enum(['Live', 'Active', 'Shipped', 'Prototype', 'Archived']),
    stack: z.array(z.string()),
    // outcome bullets surfaced on the card / detail header
    highlights: z.array(z.string()).default([]),
    links: z
      .object({
        live: z.string().url().optional(),
        repo: z.string().url().optional(),
        caseStudy: z.string().optional(),
      })
      .default({}),
    cover: z.string().optional(), // /covers/x.jpg — placeholder ok
    featured: z.boolean().default(false),
    order: z.number().default(50), // lower = earlier
    // honesty flags from CLAUDE.md guardrails
    private: z.boolean().default(false), // raw repo can't be public
  }),
});

export const collections = { projects };
