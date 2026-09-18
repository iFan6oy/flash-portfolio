---
title: Flashpoint
tagline: A personal media platform I use every day on my desktop, iPhone, Fire TV, and Samsung TV. The same library and playback follow me from screen to screen, and each app is built natively for its device.
description: Flashpoint is a cross-device media platform with native desktop, iPhone, Fire TV, and Samsung TV apps sharing one library and one playback session. Case study by Jaylon Malone.
cover: /covers/flashpoint-firetv.webp
category: media
group: flagship
role: Architect and sole developer
year: 2025 to present
status: Active
featured: true
order: 1
private: true
diagram: flashpoint
stack:
  - TypeScript
  - Python
  - Kotlin / Jetpack Compose
  - React Native / Expo
  - Preact / Vite (Tizen)
  - Electron
  - Linux / PM2 / Caddy
overview: >-
  Flashpoint is where I watch shows and movies, listen to music, follow live
  sports and news, and pick up where I left off, on whatever screen is closest.
  Start something on the desktop, move it to the living-room TV, and keep the
  music going on the phone. It is a real product in daily use, not a demo, and it
  is the project where I have learned the most about building software that has
  to behave the same way on very different devices.
highlights:
  - Four apps, one library. Desktop, iPhone, Fire TV, and Samsung TV share the same history, favorites, and what is playing right now.
  - Home adapts to the moment. A game day, breaking news, or a late night gets a different layout instead of the same fixed grid.
  - Music search finds the real artist and their official releases, even when the catalog lists lookalike duplicates first.
  - The TV apps are built for a remote. Every screen works with a D-pad from across the room, and focus never gets stuck.
  - One device owns playback at a time, and an idle laptop or a sleeping TV can no longer hold onto the session.
  - When a video buffers, the system diagnoses why instead of blindly jumping to a different source.
engineering:
  - "Four client runtimes over one Python backend: Electron on desktop, React Native with Expo on iPhone (over-the-air updates), Kotlin with Jetpack Compose on Fire TV, and Preact compiled for Samsung Tizen."
  - Contextual Home chooses between five layout recipes from real signals (time of day, live games for followed teams, news, what changed since the last visit), replacing a home screen that fired roughly 45 requests per open.
  - Canonical music search ranks artist candidates by catalog evidence and personal listening history, then renders artist pages progressively so the header appears before the heavier catalog data loads.
  - Episode continuation has one authority on the server with a Kotlin port on Fire TV, replacing nine separate code paths that could each decide an episode had ended.
  - "Playback Fortress: every buffering watchdog routes through one gate, so a stall is treated as evidence to diagnose rather than permission to replace the source. It shipped with 246 new tests."
  - The Samsung build runs spatial-navigation and platform checks that fail the build on focus regressions.
links: {}
related:
  - slug: session-brain
    label: "Deep dive: keeping playback in sync across four devices"
  - slug: tv-focus-kit
    label: The TV remote-navigation library extracted from the Fire TV app
problem: >-
  I wanted one place for everything I watch and listen to, on every screen I own,
  where the session follows me instead of restarting. Nothing off the shelf does
  that well. The catalog is not the hard part. The hard part is that a phone, a
  desktop, and two very different televisions each have their own idea of what is
  playing right now, and each can be slightly wrong.
constraints:
  - A Fire TV stick and a Samsung television are slow, memory-constrained devices. Something that feels fine on a laptop can stutter there.
  - Televisions are driven by a remote, not a mouse. Focus has to be obvious from across a room and can never dead-end.
  - Outside metadata and media sources are inconsistent and change without warning, so the app has to degrade gracefully instead of failing.
  - I build it alone. Four apps means every shared piece has to earn its keep, or it becomes four times the maintenance.
architecture: >-
  A Python service on a Linux server owns the shared work: finding playable
  sources, matching titles and artists to the right identity, per-profile library
  state, and an event log that other tools read. Four clients sit on top of it.
  Fast, short-lived presence (which device is here, what is playing this second)
  moves over a lightweight channel that is allowed to be briefly wrong. Anything
  that must survive a refresh, like resume position and history, goes to durable
  storage. Ownership rules decide which device controls playback when those two
  views disagree.
decisions:
  - title: A native app per platform, not one wrapped web page
    body: >-
      The TVs are the reason. Remote-control focus and memory behavior on a Fire
      TV stick or a Samsung panel are platform problems, not styling problems. One
      shared web view would have made all four apps equally mediocre on the two
      screens that matter most in a living room.
  - title: Freeze the shared message format before changing the clients
    body: >-
      The four apps update on different schedules: an app store, a TV store, and
      side-loaded builds. Freezing the heartbeat message at a fixed set of fields
      lets the backend evolve without forcing every app to update in lockstep.
  - title: Decide the source once, then protect that decision
    body: >-
      Playback used to react to any buffering by swapping to another source,
      which hid the real bug and punished good sources. Now the source is chosen
      once, and recovery keeps that choice unless the evidence actually blames it.
  - title: The server decides what plays next
    body: >-
      A television is the worst place to hold logic. With continuation on the
      server, the TV asks what is next and renders the answer instead of each app
      reimplementing the same ordering rules slightly differently.
hardProblems:
  - title: Lookalike artists in music search
    body: >-
      The music catalog lists fake duplicates of famous artists ahead of the real
      ones, such as a Drake page with 158 fans. Searching by name alone picked the
      impostor. The new search scores candidates by the size of their real catalog
      and by what I actually listen to. While fixing it I found that the server's
      artist-identity code had been lost in an earlier repository rewrite and
      restored it with tests.
  - title: The TV that would not let go
    body: >-
      A Fire TV that had gone to sleep kept reporting itself as idle forever, so
      the cleanup for silent devices never removed it. It held the session for
      almost three hours and routed phone audio to a TV that was off. A related
      fix made device priority a tie-breaker only, so a paused laptop can no
      longer outrank a device that is actually playing.
  - title: Buffering that was really three server bugs
    body: >-
      Investigating stalls instead of swapping sources surfaced real defects: a
      file still being transcoded claimed it supported seeking, so a jump to
      minute 40 returned the start of the file; a range parser could return a
      negative length; and unattended pauses were recorded as stalls, quietly
      damaging a good source's reputation.
  - title: The hero scroll race on TV
    body: >-
      On the Fire TV app, a hero banner's auto-focused button fought the list's
      scroll behavior during screen transitions, so the title landed clipped under
      the nav. The fix pins the list while the hero holds focus instead of relying
      on a fixed delay, and that pattern is now a public library.
result:
  - In daily use across desktop, iPhone, Fire TV, and Samsung TV.
  - "Recent work shipped in September 2026: the adaptive desktop Home, canonical music search with real artist pages, a sports home with live game state, live local news on Home, and the playback-reliability work."
  - A new session authority is built and running in shadow mode next to the existing system. It does not control playback yet; see the Session Brain deep dive.
  - Several reusable pieces have been extracted and published as open source, including the TV focus kit and the cross-device continuity playbook.
---

Flashpoint is the largest system I have built and the one I use every day. The
source stays private because it is wired into my own accounts and home setup. The
parts that generalize have been pulled out, documented, and published on their
own, which is where most of the public repositories on this site came from.

> Presented as a sanitized case study. No personal data, credentials, or private
> integrations are shown. The screenshot is the Fire TV app's home screen with
> remote focus on the first Continue Watching card.
