---
title: Flash Props
tagline: A commercial sports and esports data API. Developers call it over the web, AI assistants call it directly, and both get the same games, player props, history, and projections.
description: Flash Props is a paid sports and esports data API with a REST interface for developers and an MCP server for AI agents, covering games, player props, line history, projections, and evidence. Case study by Jaylon Malone.
category: api
group: selected
role: Solo developer
year: 2026
status: Live
featured: true
order: 3
private: true
logo: ../../assets/logos/flash-props.svg
diagram: flashProps
overview: >-
  Flash Props is a data product. It collects player-prop lines (the numbers
  sportsbooks post for things like a player's points or passing yards) across
  traditional sports and esports, cleans them into one consistent format, and adds
  history, projections, and the evidence behind them. Developers use it through a
  normal web API with docs and self-serve keys. AI assistants use it through the
  Model Context Protocol, so an agent can ask a question and get structured data
  back instead of scraping a web page. My own consumer site, Flash Odds, runs on
  the same API.
highlights:
  - One system serves developers, AI agents, and my own Flash Odds site, so every consumer sees the same games, players, and lines.
  - Covers the major US leagues, college football, and esports titles such as CS2, Dota 2, Valorant, and Call of Duty, with coverage stated honestly per sport.
  - Keeps line history, so a caller can see how a number moved, not just where it sits now, and graded results once games finish.
  - Free tier plus paid plans, with self-serve keys, usage limits, and subscription billing built in from day one.
engineering:
  - "Hono on Node with routes declared as Zod schemas. The OpenAPI 3.1 document and the interactive reference are generated from those schemas, and 15 documented REST paths cover sports, markets, games, props, player props, history, movement, changes, player context, evidence, leaders, and visuals."
  - A remote MCP server with 12 tools, listed in the official MCP Registry. Tools are shaped around the questions an agent asks, such as finding a game from two team names, rather than mirroring tables. Two discovery tools work without a key, so an agent can learn what exists before authenticating.
  - "API keys are stored as HMAC-SHA256 hashes with only a short prefix in plaintext. REST and MCP share one authentication path, so expiry and tier limits behave the same on both."
  - "Two processes: a data worker is the only thing allowed to call outside providers, and the API serves only local data. An upstream outage cannot stall request handling."
  - A historical archive of more than 14 million line snapshots, graded into results after games settle, powering history and movement endpoints.
  - "Data Foundry: versioned, immutable data packs with pointer-based rollback and a per-source rights policy enforced in code. Sources without cleared data rights fail closed."
  - Around 2,300 Vitest tests, including a check that the list of anonymous MCP tools matches what the server actually registers.
stack:
  - TypeScript
  - Hono
  - "@hono/zod-openapi"
  - Model Context Protocol SDK
  - Zod 4
  - Drizzle ORM
  - SQLite (better-sqlite3)
  - Stripe
  - Vitest
links:
  live: https://api.flashodds.live/
  repo: https://github.com/iFan6oy/flash-props-mcp
  repoLabel: View the public MCP connector
related:
  - slug: flash-odds
    label: Flash Odds, the consumer site built on this API
problem: >-
  Sports and esports prop data is scattered across providers that describe the
  same things differently, and almost none of it is shaped for a program to use. I
  wanted one clean feed of player props across sports and esports that a developer
  could build on in an afternoon, and that an AI agent could query directly instead
  of scraping a page or being handed a spreadsheet.
constraints:
  - Providers disagree on names, shapes, and identifiers, and change without notice. A line attached to the wrong player is worse than a missing line.
  - It had to be cheap to run, which means free or low-cost upstreams, careful caching, and a database that stays fast on one server.
  - Anything sold has to be metered, rate limited, and billed, so authentication and usage accounting were designed in from the start.
  - Model output has to earn its place. A new projection model does not serve customers until it beats the current one on held-out data.
architecture: >-
  A data worker pulls from each provider through adapters that translate its
  format into shared entities: games, players, prop lines, and market metadata.
  Above that sits the history and projection layer: line snapshots, graded
  results, recent form, sample strength, and movement. Two interfaces are then
  generated over the same models, a REST API with generated OpenAPI docs and an
  MCP server for agents. Keys, tiers, and usage live in the same database, and
  Stripe drives the subscription lifecycle by webhook.
decisions:
  - title: Schema first, with both interfaces downstream
    body: >-
      Routes are declared as Zod schemas and the OpenAPI document is generated
      from them. Because the MCP tools are built over the same models, the docs,
      the API responses, and what an agent sees cannot drift apart. A hand-written
      spec goes stale within weeks.
  - title: AI agents are a first-class customer
    body: >-
      The MCP server is not a thin wrapper over REST. Tools answer whole
      questions, like the full story behind one prop, so an agent gets a useful
      answer in one call instead of spending its context joining four generic
      endpoints.
  - title: A new model earns production on a one-look holdout
    body: >-
      Challenger projection models are frozen and registered before they are
      judged, every look at the held-out data is recorded, and a spent holdout
      forces a new version. The September NFL, college football, and NBA
      challengers are running in shadow under this rule and are not serving yet.
  - title: Build it dark when the rights are not clear
    body: >-
      Multi-book market consensus is built and deployed, but switched off, until
      a data provider and resale terms are in place. Shipping the code without
      shipping the claim keeps the product honest.
hardProblems:
  - title: One slow query froze every request
    body: >-
      The movement endpoint pulled up to 50,000 rows into Node through a
      synchronous SQLite driver, which blocked the entire API for 10 to 16
      seconds, and its row cap kept the oldest moves instead of the newest. A
      separate index put the timestamp last, so time filters scanned about 11
      million rows. The fix moved the grouping into SQLite and replaced the scans
      with indexed seeks, with large indexes built by hand-run scripts rather than
      at boot so a deploy never stalls on a multi-million-row index build.
  - title: Matching lines to the right player and game
    body: >-
      The obvious identifier fields in provider payloads are often empty or
      inconsistent. Linkage only accepts exact name and market matches, events are
      keyed by real start time (one date had two All-Star games), and a game with
      no date is skipped rather than graded as zero.
  - title: Migrating live data without changing answers
    body: >-
      Every move onto the new data packs had to reproduce the old output exactly
      first. The NFL migration matched 290 players and 956 markets with zero
      differences before it was allowed to proceed.
result:
  - Live at api.flashodds.live with an interactive reference, an OpenAPI spec, agent discovery files, self-serve keys, and a free tier.
  - Paid plans are live and billed through Stripe. Flash Odds runs on the same API.
  - The historical line archive, history and movement endpoints, and the Call of Duty player visuals endpoint are live.
  - New projection models for the NFL, college football, and the NBA, plus market consensus and NBA shot data, are deployed in shadow or switched off pending evaluation, data rights, or the season. They are not claimed as live.
  - "Published as open source: the MCP connector, the esports metadata schema pattern, and a reference Discord bot."
---

Flash Props is the project that best shows what I mean by owning a system end to
end. It is data engineering at the bottom, API product design in the middle, and
agent tooling at the top, and every layer had to be right for the one above it to
be worth anything.

The hosted API is a paid product with a free tier. The implementation is private;
the MCP connector, the schema pattern, and the reference bot are public.
