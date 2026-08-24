---
title: Flash Props
tagline: A commercial sports and esports props API where an OpenAPI REST surface and an MCP server for AI agents are two interfaces over the same normalized data.
category: api
group: selected
role: Solo Developer
year: 2026
status: Live
featured: true
order: 3
private: false
logo: ../../assets/logos/flash-props.svg
diagram: flashProps
stack:
  - TypeScript
  - Hono
  - "@hono/zod-openapi"
  - Drizzle ORM
  - SQLite
  - Model Context Protocol
  - Stripe
  - SvelteKit
highlights:
  - REST and MCP are generated from the same Zod schemas, so the agent interface and the HTTP interface cannot drift
  - Twelve MCP tools spanning games, props, player context, evidence, line history, and movers
  - API keys are HMAC-hashed at rest, with per-tier rate limits and usage counters
  - Anonymous access is allowed for capability discovery so an agent can see what exists before it has a key
links:
  live: https://api.flashodds.live/
  repo: https://github.com/iFan6oy/flash-props-mcp
problem: >-
  Sports and esports prop data is scattered across providers that all model the same
  concepts differently, and almost none of it is shaped for a program to consume.
  I wanted a single clean feed of player props across traditional sports and esports,
  and I wanted an AI agent to be able to query it directly rather than scraping a
  page or being handed a CSV.
constraints:
  - Upstreams disagree on entity shapes, naming, and identifiers, and they change without notice.
  - It has to cost effectively nothing to run, which rules out paid data feeds and forces free upstreams plus careful caching.
  - Anything sold has to be metered, billed, and rate limited, which means auth and usage accounting from the start rather than bolted on.
  - Data quality is the product. A wrong line is worse than a missing one.
architecture: >-
  Provider adapters normalize each upstream into canonical entities: games, players,
  prop lines, and market metadata. A projection and evidence layer sits above that,
  deriving Flash lines, recent form, sample strength, and line movement. Two
  interfaces are then generated over the same models. The REST surface is defined
  with Zod schemas that produce an OpenAPI 3.1 spec and an interactive reference,
  and the MCP server exposes the same capabilities as typed tools over streamable
  HTTP. Keys, tiers, and usage live in SQLite through Drizzle, with Stripe driving
  the subscription lifecycle by webhook.
decisions:
  - title: Schema-first, with both interfaces downstream of it
    body: >-
      Routes are declared with Zod schemas and the OpenAPI document is generated from
      them rather than maintained by hand. Because the MCP tools are built over the
      same models, there is no drift between what the docs promise, what the API
      returns, and what an agent sees. A hand-written spec goes stale within weeks.
  - title: Treat AI agents as a first-class client, not an add-on
    body: >-
      The MCP server is not a wrapper over the REST API. Tools are shaped around
      questions an agent actually asks, like resolve these team names to an event or
      give me the full story behind this one prop, instead of forcing it to chain
      four generic endpoints and do the joins itself.
  - title: Allow anonymous capability discovery
    body: >-
      Listing sports and market metadata works without a key. An agent connecting for
      the first time can discover what the server can do before authentication,
      which removes the dead end where a tool call fails and the model has no way to
      learn why.
  - title: Hash keys, meter everything
    body: >-
      Keys are HMAC-hashed at rest, so the database never holds anything that can be
      replayed if it leaks. Tiers differ by request volume, scan size, and sport
      breadth, and usage counters are part of the same store rather than an
      afterthought.
hardProblems:
  - title: Entity linkage across providers
    body: >-
      The obvious identifier fields in these payloads are frequently null or
      inconsistent, so the real linkage between a prop line and the player and event
      it belongs to has to be resolved from the fields that are actually populated.
      Getting this wrong does not error, it silently attaches a line to the wrong
      player.
  - title: An open stat taxonomy that does not break on a new game
    body: >-
      Stat types are an open, documented taxonomy rather than a closed enum, so
      adding a game or a new stat does not require a breaking schema change. The
      pattern is published separately as a standalone schema repository.
  - title: Upstream fragility
    body: >-
      Providers go dark, get blocked, or return empty. The system carries multiple
      adapters and degrades to what is actually available rather than presenting a
      broken board, and coverage is described honestly per sport instead of claimed
      uniformly.
result:
  - Live in production at api.flashodds.live with an interactive reference, an OpenAPI spec, agent-discovery files, and self-serve key provisioning.
  - Public board site shipping on SvelteKit, plus a public Discord bot as a reference consumer of the API.
  - "Three pieces published as open source: the MCP connector, the metadata schema pattern, and the bot."
demonstrates:
  - Designing and shipping an API as a product, not just an endpoint
  - Schema-first contracts with generated documentation
  - Model Context Protocol server design for real agent consumption
  - Normalizing messy multi-provider data into a canonical model
  - Auth, metering, rate limiting, and billing lifecycle
---

Flash Props is the project that best shows what I mean by building a system end to
end. It is data engineering at the bottom, API product design in the middle, and
agent tooling at the top, and every layer had to be right for the one above it to be
worth anything.

The part I would point at first is the MCP work. Most MCP servers are a thin wrapper
that re-exposes existing endpoints and leaves the model to figure out the joins.
These tools are shaped around the questions rather than the tables, which is the
difference between an agent that can answer something useful in one call and one that
burns its context assembling the answer itself.

The hosted API is a paid product with a free tier. The connector, the schema pattern,
and a reference bot are all public.
