---
title: Flash Odds
tagline: A sports stats and player-props site. Search any player in a supported sport, check their recent games, compare players, and see today's lines next to Flash projections and the evidence behind them.
description: Flash Odds is a live consumer sports intelligence site with cross-sport player search, player, team, and match pages, comparisons, visual leaderboards, and Flash projections with evidence. Case study by Jaylon Malone.
category: web
group: selected
role: Product, design, and engineering
year: 2026
status: Live
featured: true
order: 2
private: true
screenshots:
  - src: ../../assets/screens/flash-odds-home.png
    alt: Flash Odds homepage showing sport status chips, the headline "See the line. Get another opinion.", a featured NFL game with three player lines compared against Flash projections, and a cross-sport player search.
    caption: The homepage. Sports carry live or offseason status, a featured game shows posted lines beside Flash projections, and search works across every supported sport. Captured from the live site, September 2026.
  - src: ../../assets/screens/flash-odds-player.png
    alt: Flash Odds player page for Kevin Durant with a Stat Explorer showing points in each of his last 10 games, and free season stat previews for points, rebounds, assists, and combined stats.
    caption: A player page in the offseason. Recorded results are free and kept visually separate from Flash's model output; deeper projections and splits are Pro.
  - src: ../../assets/screens/flash-odds-stats.png
    alt: Flash Odds NFL Analytics page with a histogram of Flash projections versus sportsbook lines, sample-strength bars, projection basis, and market coverage bars.
    caption: The NFL analytics page visualizes the whole board, including how many games stand behind each projection and which markets Flash actually models.
overview: >-
  Flash Odds is a sports site for people who follow player stats and player props.
  Search for a player in any supported sport, see how they have actually played
  recently, compare two players side by side, and look at today's posted lines next
  to what Flash projects, with the evidence behind each projection one click away.
  Real recorded stats are free. Flash's deeper model output is the paid layer. It
  runs on the Flash Props API, which I also built.
highlights:
  - Cross-sport player search from anywhere on the site, with player pages that stay useful even when a sport is in its offseason.
  - Player pages with a Stat Explorer, recent game results for every tracked stat, and season trend charts.
  - Team pages, match pages, and head-to-head player comparisons.
  - Visual leaderboards and analytics pages that show the whole board at a glance, not just a table.
  - Recorded facts and Flash model output are always labeled and kept separate, so a reader knows which numbers are history and which are predictions.
  - Free and Pro tiers, with locked content trimmed on the server so it never leaks into free pages or leaderboards.
engineering:
  - SvelteKit 2 with Svelte 5, TypeScript, Tailwind 4, and ECharts loaded only on pages that draw charts.
  - Reads everything through the Flash Props API with a server-side key. The web app never touches the API's database directly, which keeps a single writer on a table of more than 13 million line snapshots.
  - A stale-while-revalidate cache shares one upstream call between concurrent requests, never caches a failed read, and keeps the last good value through an upstream blip. A warm NFL board went from 2.1 seconds to 0.32.
  - Each sport is an adapter that declares whether its pages are public, preview, or hidden, so an unfinished sport shows an honest empty state instead of a broken board.
  - Structured data for players, teams, events, and datasets, with sitemap entries only for pages that have real archive depth behind them.
  - Continuous deployment from main. A VPS timer builds the verified commit into its own release folder, runs tests, type checks, and the build, swaps a symlink, runs smoke checks, and rolls back automatically on failure.
  - Roughly 690 Vitest cases, including tests that a locked player can never appear in a free leaderboard and a scan that keeps betting-advice language out of the copy.
stack:
  - TypeScript
  - SvelteKit 2 / Svelte 5
  - Tailwind CSS 4
  - ECharts
  - better-sqlite3
  - Stripe
  - Vitest
  - Linux / PM2 / systemd
links:
  live: https://flashodds.live/
related:
  - slug: flash-props
    label: Flash Props, the data API underneath this site
problem: >-
  Most prop sites are a wall of numbers: a line, a pick, and a reason to trust it
  that you cannot inspect. And when a sport goes into its offseason the board goes
  dark, so the site has nothing useful to say. I wanted the opposite: a site where
  a fan can look up any player at any time of year, see real history first, and
  then decide how much weight to give the model.
constraints:
  - The data comes from outside providers that go quiet, get rate limited, or change shape. Pages have to stay honest when data is missing instead of showing something that looks complete.
  - Factual stats and model predictions must never blur together. A reader should always know which numbers happened and which are projections.
  - Free visitors need something genuinely useful, but the paid layer has to stay paid, including in charts and leaderboards that summarize it.
  - No betting advice. The site describes evidence; it does not tell anyone what to bet.
architecture: >-
  A SvelteKit app with server-side loaders. Each sport plugs in through an adapter
  that defines its board, markets, and visibility. Loaders read the Flash Props
  API for live boards, projections, line history, and page-sized archive reads,
  through a shared caching layer. A trimming step shapes every row to the page's
  contract before it reaches the browser, which is where Free and Pro diverge.
  The app keeps its own small database for accounts, saved players, and alerts.
decisions:
  - title: Facts first, model second
    body: >-
      Player pages lead with what the player actually did and put Flash's model
      in its own clearly labeled section below. That ordering is the product's
      credibility, and it also makes the free tier useful on its own.
  - title: Gate on the server, not in the browser
    body: >-
      Locked values are removed before the page is rendered, and summaries like
      leaderboards are computed only from rows the reader is allowed to see. A
      paywall enforced only by CSS leaks through the page source and through any
      chart built from the full data.
  - title: Make incomplete data visible
    body: >-
      If a board fetch might have missed rows, the page says the board is
      incomplete instead of presenting a partial list as the whole thing.
  - title: Ship small, deploy continuously, roll back automatically
    body: >-
      Main is always deployable. Every merge is built, tested, and smoke-checked
      on the server, and a failed check restores the previous release on its own
      and posts an alert.
hardProblems:
  - title: Boards that silently dropped rows
    body: >-
      Walking a paginated board could lose rows when the upstream refreshed
      mid-walk. Any sign of a short walk, such as a repeated cursor, a changed
      snapshot id, or hitting the page ceiling, now marks the board incomplete,
      and a walk that straddles a refresh is retried once.
  - title: Slow player pages
    body: >-
      Player pages were slow because a movement query pulled up to 50,000 rows
      into a synchronous database call, and because a sort order dropped the
      newest moves. Player lookups were also a four-step sequential chain, and
      missing archive entries were re-fetched on every view. The fixes moved the
      grouping into the database, cached misses for five minutes, and fixed search
      ranking so a search for "durant" returns Kevin Durant first.
  - title: A free tier that did not look credible
    body: >-
      The "top differences" list was computed after the free-tier row limit, so
      it was led by stale outliers. Computing it across the full board with
      quality floors (a real line, enough games behind the projection, and a
      projection within a sane range of the book) made the free view trustworthy.
result:
  - Live at flashodds.live and deployed continuously from main.
  - Public boards for NFL, NBA, MLB, WNBA, Call of Duty, CS2, Valorant, Dota 2, and League of Legends. NCAAF, NHL, soccer, and tennis run as honest previews.
  - A full season and career facts panel with game logs is built and merged, and turns on when its API endpoint ships. It is not claimed here as live.
  - Features waiting on data rights or the next season, such as NBA shot charts and multi-book market consensus, are built but switched off in production.
---

Flash Odds is the project that ties product thinking to data engineering most
directly. Every page is a question a fan actually asks (how has this player been
playing, how does he compare, is this line out of step with his history) answered
with real data first and the model second.

> Screenshots were captured from the live site. The source is private.
