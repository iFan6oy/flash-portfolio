/**
 * Public repositories, curated. These are the ones where the code IS the
 * argument: each was extracted from a system that shipped, then genericized so
 * none of it depends on my infrastructure, branding, or data sources.
 *
 * Order is deliberate: strongest engineering signal first.
 */
export interface OssRepo {
  name: string;
  repo: string;
  lang: string;
  blurb: string;
}

export const OSS: OssRepo[] = [
  {
    name: 'tv-focus-navigation-kit',
    repo: 'https://github.com/iFan6oy/tv-focus-navigation-kit',
    lang: 'Kotlin',
    blurb:
      'D-pad focus for Jetpack Compose for TV: deterministic bring-into-view, a hero scroll-race guard, cross-zone focus resolution, and restore-on-back. Library module plus a runnable demo app.',
  },
  {
    name: 'cross-device-continuity-playbook',
    repo: 'https://github.com/iFan6oy/cross-device-continuity-playbook',
    lang: 'Docs',
    blurb:
      'How to replace a tangle of disagreeing state stores with one authority while the system stays live: frozen contracts, shadow deployment, and a cutover gated on divergence data.',
  },
  {
    name: 'term-hunter-lite',
    repo: 'https://github.com/iFan6oy/term-hunter-lite',
    lang: 'JavaScript',
    blurb:
      'A multi-stage LLM pipeline that knows when not to trust the model: fail-closed gates, deterministic filters bracketing the model call, and three-state RDAP domain checks.',
  },
  {
    name: 'esports-media-metadata-schema',
    repo: 'https://github.com/iFan6oy/esports-media-metadata-schema',
    lang: 'TypeScript',
    blurb:
      'JSON Schemas plus matching TypeScript types for players, teams, matches, and prop lines, and an adapter pattern that folds two differently-shaped upstreams into one canonical model.',
  },
  {
    name: 'flash-props-mcp',
    repo: 'https://github.com/iFan6oy/flash-props-mcp',
    lang: 'MCP',
    blurb:
      'The connector for the hosted Flash Props MCP server: 12 tools over player-prop lines, market metadata, projections, evidence, and line movement, tier-gated by API key.',
  },
  {
    name: 'ai-agent-project-template',
    repo: 'https://github.com/iFan6oy/ai-agent-project-template',
    lang: 'Docs',
    blurb:
      'The working agreement I use to run AI coding agents on a repo without collisions, invented progress, or leaked secrets. Agent contracts, a project router, and handoff discipline.',
  },
  {
    name: 'express-monitor-starter',
    repo: 'https://github.com/iFan6oy/express-monitor-starter',
    lang: 'JavaScript',
    blurb:
      'The reusable skeleton behind a family of monitoring services: pluggable pollers, SQLite state in WAL mode, webhook alerts, SSRF-guarded egress, and a live dashboard.',
  },
  {
    name: 'cinematic-media-ui-lab',
    repo: 'https://github.com/iFan6oy/cinematic-media-ui-lab',
    lang: 'JavaScript',
    blurb:
      'Four components proving a media UI approach: heroes that dissolve into the page, one accent color driving a whole section, and an ambient backdrop that cleans up after itself.',
  },
  {
    name: 'adb-tv-watchdog-lite',
    repo: 'https://github.com/iFan6oy/adb-tv-watchdog-lite',
    lang: 'JavaScript',
    blurb:
      'A CLI that watches an Android TV over network adb: what is focused, what is playing, is it alive, plus filtered logcat. The debugging tool I wanted while chasing TV freezes.',
  },
  {
    name: 'media-app-performance-checklist',
    repo: 'https://github.com/iFan6oy/media-app-performance-checklist',
    lang: 'Docs',
    blurb:
      'A performance checklist for media-heavy, animation-heavy apps that still have to stay smooth on a cheap TV stick rather than a flagship laptop.',
  },
  {
    name: 'flash-props-discord-bot',
    repo: 'https://github.com/iFan6oy/flash-props-discord-bot',
    lang: 'TypeScript',
    blurb:
      'A reference consumer of the Flash Props API: a Discord bot that posts live player props. Fork it, add a key, deploy. Doubles as the integration example in the API docs.',
  },
];
