/**
 * Public repositories, curated. Each one backs up a claim made elsewhere on the
 * page, and each was extracted from a system that shipped, then genericized so
 * none of it depends on my infrastructure, branding, or data sources. The full
 * list lives on GitHub; this is not meant to mirror it.
 *
 * Order is deliberate: strongest engineering signal first.
 */
export interface OssRepo {
  name: string;
  repo: string;
  lang: string;
  blurb: string;
  /** which project on this site the repo backs up */
  proves?: string;
}

export const OSS: OssRepo[] = [
  {
    name: 'tv-focus-navigation-kit',
    repo: 'https://github.com/iFan6oy/tv-focus-navigation-kit',
    lang: 'Kotlin',
    proves: 'Flashpoint on Fire TV',
    blurb:
      'Remote-control navigation for Android TV apps built with Jetpack Compose: reliable scrolling to the focused item, a fix for titles clipping under the nav, and Back that returns you to the card you came from. Library plus a runnable demo app.',
  },
  {
    name: 'cross-device-continuity-playbook',
    repo: 'https://github.com/iFan6oy/cross-device-continuity-playbook',
    lang: 'Docs',
    proves: 'Session Brain',
    blurb:
      'How to replace several disagreeing sources of state with one authority while a system stays live: frozen contracts, a shadow deployment, and a cutover gated on measured agreement.',
  },
  {
    name: 'flash-props-mcp',
    repo: 'https://github.com/iFan6oy/flash-props-mcp',
    lang: 'MCP',
    proves: 'Flash Props',
    blurb:
      'The connector and docs for the hosted Flash Props MCP server: 12 tools that let an AI assistant query games, player props, projections, evidence, and line movement.',
  },
  {
    name: 'esports-media-metadata-schema',
    repo: 'https://github.com/iFan6oy/esports-media-metadata-schema',
    lang: 'TypeScript',
    proves: 'Flash Props',
    blurb:
      'JSON Schemas and matching TypeScript types for players, teams, matches, and prop lines, plus the adapter pattern that folds differently shaped providers into one model.',
  },
  {
    name: 'ai-agent-project-template',
    repo: 'https://github.com/iFan6oy/ai-agent-project-template',
    lang: 'Docs',
    blurb:
      'The working agreement I use to run AI coding agents on a real repository without collisions, invented progress, or leaked secrets: agent contracts, a project router, and handoff discipline.',
  },
  {
    name: 'express-monitor-starter',
    repo: 'https://github.com/iFan6oy/express-monitor-starter',
    lang: 'JavaScript',
    blurb:
      'The skeleton behind a family of monitoring services I run: pluggable pollers, SQLite state, webhook alerts, guarded outbound requests, and a live dashboard.',
  },
];
