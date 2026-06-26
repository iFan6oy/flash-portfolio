/**
 * Canonical category identity — accent color + label + RGB triplet.
 * Mirrors the hub's per-vertical color map. Edit HERE, never at the callsite.
 */
export type Category =
  | 'ai'
  | 'business'
  | 'mobile'
  | 'media'
  | 'trading'
  | 'data'
  | 'power'
  | 'lab';

export const CATEGORY: Record<
  Category,
  { label: string; accent: string; rgb: string }
> = {
  ai: { label: 'AI / Agents', accent: '#7c5cfa', rgb: '124 92 250' },
  business: { label: 'Business Systems', accent: '#10b981', rgb: '16 185 129' },
  mobile: { label: 'Mobile', accent: '#ff2d7b', rgb: '255 45 123' },
  media: { label: 'Media', accent: '#ff6b35', rgb: '255 107 53' },
  trading: { label: 'Trading', accent: '#22c55e', rgb: '34 197 94' },
  data: { label: 'Data / Reporting', accent: '#f59e0b', rgb: '245 158 11' },
  power: { label: 'Power Platform', accent: '#3b82f6', rgb: '59 130 246' },
  lab: { label: 'Labs', accent: '#34d399', rgb: '52 211 153' },
};

export const GROUPS = {
  business: {
    title: 'Business Systems',
    kicker: 'Enterprise workflows, productized',
    blurb:
      'Production systems that move real work: approvals, reimbursements, leads. The track record under the rest.',
  },
  ai: {
    title: 'AI & Automation',
    kicker: 'Agents, pipelines, orchestration',
    blurb:
      'Autonomous agents and LLM pipelines built with a cost-aware, grounded discipline, not demos.',
  },
  experiments: {
    title: 'Experiments & Labs',
    kicker: 'Range, frontier stacks, game-feel',
    blurb:
      'Where I stretch: raw GPU compute, modern TS frontiers, and tight interaction engineering.',
  },
} as const;
