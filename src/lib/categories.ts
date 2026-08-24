/**
 * Canonical category identity — accent color + label + RGB triplet.
 * Categories are CAPABILITIES, not product types: what does this project prove?
 * Mirrors the hub's per-vertical color discipline. Edit HERE, never at the callsite.
 */
export type Category =
  | 'systems'
  | 'ai'
  | 'api'
  | 'media'
  | 'tv'
  | 'mobile'
  | 'data'
  | 'automation'
  | 'power'
  | 'trading';

export const CATEGORY: Record<
  Category,
  { label: string; accent: string; rgb: string }
> = {
  systems: { label: 'Distributed Systems', accent: '#00d4ff', rgb: '0 212 255' },
  ai: { label: 'AI & Agents', accent: '#7c5cfa', rgb: '124 92 250' },
  api: { label: 'APIs & Data Products', accent: '#10b981', rgb: '16 185 129' },
  media: { label: 'Media Infrastructure', accent: '#ff6b35', rgb: '255 107 53' },
  tv: { label: 'TV & Native Clients', accent: '#0ea5e9', rgb: '14 165 233' },
  mobile: { label: 'Mobile', accent: '#ff2d7b', rgb: '255 45 123' },
  data: { label: 'Data Systems', accent: '#f59e0b', rgb: '245 158 11' },
  automation: { label: 'Automation', accent: '#84cc16', rgb: '132 204 22' },
  power: { label: 'Power Platform', accent: '#3b82f6', rgb: '59 130 246' },
  trading: { label: 'Autonomous Systems', accent: '#22c55e', rgb: '34 197 94' },
};

/**
 * Engineering areas shown on the homepage. These are hand-authored capability
 * groupings, evidence-led: each one names real systems rather than listing tools.
 */
export const AREAS = [
  {
    title: 'AI & Agent Engineering',
    accent: '#7c5cfa',
    body:
      'Multi-stage LLM pipelines with fail-closed gates, cost-aware model cascades that only escalate on close calls, and autonomous agents whose claims have to cite evidence before they post.',
    proof: ['Chalkline', 'Term Hunter', 'OpenClaw', 'Debate Engine'],
  },
  {
    title: 'APIs & Data Products',
    accent: '#10b981',
    body:
      'A commercial REST API with an OpenAPI 3.1 contract, HMAC-hashed keys, tiered rate limits, Stripe billing, and an MCP server over the same models so AI agents are a first-class client.',
    proof: ['Flash Props API', 'Flash Props MCP', 'Metadata Schema'],
  },
  {
    title: 'Cross-Device & TV',
    accent: '#0ea5e9',
    body:
      'Four clients (Electron, React Native, Kotlin Compose on Fire TV, Preact on Samsung Tizen) sharing playback and presence state through one authority, plus D-pad focus engineering on constrained hardware.',
    proof: ['Flashpoint', 'Session Brain', 'TV Focus Kit'],
  },
  {
    title: 'Backend & Application',
    accent: '#00d4ff',
    body:
      'Node and Python services behind Caddy on a Linux VPS, Next.js and SvelteKit app surfaces, Postgres and SQLite data layers, and enterprise workflow systems on the Microsoft stack.',
    proof: ['TRA', 'Chalkline', 'MCPSS Suite'],
  },
  {
    title: 'Data Modeling & Normalization',
    accent: '#f59e0b',
    body:
      'Reconciling differently-shaped upstream providers into one canonical model, evidence-backed records that can cite where every value came from, and identity resolution across messy sources.',
    proof: ['Rebid Radar', 'Media Brain', 'Flash Props'],
  },
  {
    title: 'Infrastructure & Operations',
    accent: '#84cc16',
    body:
      'A single Hetzner box running roughly 30 supervised services, Caddy TLS, tailnet-only SSH, scheduled backups, and monitoring services built on one reusable Express skeleton.',
    proof: ['VPS estate', 'Express Monitor Starter', 'ADB TV Watchdog'],
  },
] as const;

export const GROUPS = {
  engineering: {
    title: 'More systems',
    kicker: 'Depth behind the headline projects',
    blurb:
      'Autonomous agents, data pipelines, automation, and the professional work underneath it all.',
  },
} as const;
