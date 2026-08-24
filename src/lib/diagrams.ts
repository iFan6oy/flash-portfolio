/**
 * Architecture diagrams, as data.
 *
 * Each diagram is a stack of layers rendered top-to-bottom by
 * components/FlowDiagram.astro as responsive HTML (not a raster image), so it
 * reflows on a phone, inherits the page accent, and stays readable to a screen
 * reader. Every diagram below is derived from the real system, not decoration.
 */
export interface DiagramLayer {
  /** layer role, shown as the left-hand rail label */
  rail?: string;
  /** boxes on this row */
  nodes: { label: string; note?: string }[];
}

export interface Diagram {
  caption: string;
  layers: DiagramLayer[];
}

export const DIAGRAMS: Record<string, Diagram> = {
  flashpoint: {
    caption:
      'Four client runtimes share one session authority. Presence is fast and lossy, durable state is exact, and the authority resolves the two when they disagree.',
    layers: [
      {
        rail: 'Clients',
        nodes: [
          { label: 'Desktop', note: 'Electron + web' },
          { label: 'iOS', note: 'React Native' },
          { label: 'Fire TV', note: 'Kotlin / Compose' },
          { label: 'Samsung TV', note: 'Preact / Tizen' },
        ],
      },
      {
        rail: 'Coordination',
        nodes: [
          { label: 'Presence mesh', note: 'frozen 12-field heartbeat' },
          { label: 'Session authority', note: 'ownership + conflict rules' },
          { label: 'Durable store', note: 'resume, history' },
        ],
      },
      {
        rail: 'Services',
        nodes: [
          { label: 'Playback resolver', note: 'source ranking' },
          { label: 'Metadata spine', note: 'identity resolution' },
          { label: 'Library + profiles', note: 'per-profile state' },
        ],
      },
      {
        rail: 'Upstream',
        nodes: [{ label: 'External metadata and media providers' }],
      },
    ],
  },

  flashProps: {
    caption:
      'One normalization pass feeds every consumer. REST and MCP are two interfaces over the same canonical models, so an AI agent and a dashboard cannot drift apart.',
    layers: [
      {
        rail: 'Ingest',
        nodes: [
          { label: 'Props upstreams', note: 'multiple providers' },
          { label: 'Market metadata', note: 'stat vocabulary' },
        ],
      },
      {
        rail: 'Normalize',
        nodes: [
          { label: 'Per-provider adapters', note: 'canHandle / normalize' },
          { label: 'Identity resolution', note: 'player, team, event' },
        ],
      },
      {
        rail: 'Model',
        nodes: [
          { label: 'Canonical entities', note: 'game, player, prop line' },
          { label: 'Projection + evidence', note: 'form, movement, gaps' },
        ],
      },
      {
        rail: 'Interfaces',
        nodes: [
          { label: 'REST API', note: 'OpenAPI 3.1, tiered keys' },
          { label: 'MCP server', note: '12 tools, streamable HTTP' },
        ],
      },
      {
        rail: 'Consumers',
        nodes: [
          { label: 'AI agents' },
          { label: 'Discord bot' },
          { label: 'Web board' },
        ],
      },
    ],
  },

  sessionBrain: {
    caption:
      'The migration pattern, not just the end state. The new authority runs with zero production readers until the divergence data says a cutover is safe.',
    layers: [
      {
        rail: 'Before',
        nodes: [
          { label: 'Five overlapping presence stores', note: 'no owner, all disagree' },
        ],
      },
      {
        rail: 'Step 1',
        nodes: [
          { label: 'Freeze the contracts', note: 'clients stop upgrading in lockstep' },
        ],
      },
      {
        rail: 'Step 2',
        nodes: [
          { label: 'Shadow authority', note: 'writes nothing clients read' },
          { label: 'Guard rulebook', note: 'conflict resolution rules' },
        ],
      },
      {
        rail: 'Step 3',
        nodes: [
          { label: 'Measure divergence', note: 'how often do old and new disagree' },
        ],
      },
      {
        rail: 'Step 4',
        nodes: [
          { label: 'Gated cutover', note: 'flip only when the number is boring' },
        ],
      },
    ],
  },

  termHunter: {
    caption:
      'Every stage where a model can fail has a defined safe default. Deterministic checks bracket the LLM so the model only does the part that needs a model.',
    layers: [
      {
        rail: 'Source',
        nodes: [{ label: 'Feed ingestion', note: 'RSS, Atom, arXiv' }],
      },
      {
        rail: 'Extract',
        nodes: [
          { label: 'LLM extraction', note: 'candidate terms' },
          { label: 'Deterministic gates', note: 'cheap, un-foolable' },
        ],
      },
      {
        rail: 'Validate',
        nodes: [
          { label: 'Skeptical LLM pass', note: 'FAILS CLOSED on error' },
          { label: 'Brand-safety filter', note: 'deterministic' },
        ],
      },
      {
        rail: 'Verify',
        nodes: [
          { label: 'RDAP availability', note: 'three-state: taken / free / unknown' },
        ],
      },
      {
        rail: 'Act',
        nodes: [
          { label: 'Scored alert', note: 'human makes every purchase' },
        ],
      },
    ],
  },
};
