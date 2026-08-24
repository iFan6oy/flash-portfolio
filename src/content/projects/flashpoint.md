---
title: Flashpoint
tagline: A personal media platform with four native clients sharing one session, built across Electron, React Native, Kotlin for Fire TV, and Preact for Samsung Tizen.
cover: /covers/flash-media-hub.png
category: media
group: selected
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
  - Preact / Vite
  - Electron
  - Linux / PM2 / Caddy
highlights:
  - Four client runtimes over one backend, each native to its platform rather than a wrapped web view
  - Playback resolution ranks candidate sources by measured audio language, not by filename guessing
  - Server-side episode lifespan engine drives continuation, so the TV never has to invent what plays next
  - Build gates on the Tizen client fail the build on spatial-navigation and platform-baseline regressions
links: {}
problem: >-
  I wanted one place for everything I watch and listen to, on every screen I own,
  where the session follows me instead of restarting. Nothing off the shelf does
  that, because the hard part is not the catalog. It is that a phone, a desktop,
  and two very different televisions each have their own idea of what is playing
  right now, and they are all slightly wrong.
constraints:
  - A Fire TV stick and a Samsung television are weak, memory-constrained devices. Anything that feels fine on a laptop can stutter there.
  - Televisions are driven by a D-pad, not a pointer. Focus has to be unmistakable from across a room and can never dead-end.
  - Upstream metadata and media sources are inconsistent and change without warning, so resolution has to degrade rather than fail.
  - Solo project. Four clients means every abstraction has to earn its keep or it becomes four times the maintenance.
architecture: >-
  A Python service on a Linux VPS owns backend concerns: playback resolution,
  metadata identity, per-profile library state, and the event firehose. Four
  clients sit on top of it. Ephemeral presence (who is here, what is playing this
  second) moves over a fast, deliberately lossy mesh with a frozen heartbeat
  payload. Anything that has to survive a refresh, like resume position and
  history, goes to a durable store instead. A session authority sits between them
  and decides who owns the session when the two disagree.
decisions:
  - title: Native clients per platform, not one wrapped web view
    body: >-
      The TV clients are the reason. Fire TV runs Kotlin with Jetpack Compose and
      Samsung runs Preact compiled for Tizen, because D-pad focus and
      memory behavior on those devices are platform problems, not CSS problems. A
      shared web view would have made all four clients equally mediocre on the two
      that matter most.
  - title: Freeze the wire contract before touching the clients
    body: >-
      With four clients on different release cadences, a change to the shared
      payload means a coordinated release across an app store, a TV store, and two
      side-loaded builds. Freezing the heartbeat contract at a fixed field set
      meant the backend could evolve without every client upgrading in lockstep.
  - title: Rank playback sources by measured audio language
    body: >-
      Choosing a sub or dub used to mean picking a track inside one already-chosen
      file, which quietly failed whenever the chosen release did not carry the
      wanted language. Moving the language decision up into source ranking made the
      preference change which release wins, so the request is satisfied by
      selection rather than hoped for after the fact.
  - title: Episode continuation lives on the server
    body: >-
      A television is the worst place to hold state. Putting the lifespan engine
      server-side means the TV asks what plays next and renders the answer, instead
      of each client reimplementing the same ordering rules slightly differently.
hardProblems:
  - title: The hero scroll-race
    body: >-
      On the TV client, a hero's auto-focused button fought the list's
      bring-into-view behavior during the screen's enter transition, so the title
      landed clipped under the nav. The fix was a scroll guard that pins the list
      while the hero holds focus, rather than the usual fixed delay that works on
      one device and races on another. That pattern is now extracted and public.
  - title: Mid-play language switching without dropping the picture
    body: >-
      Switching audio mid-episode tries the cheap path first. If the open file
      already carries the wanted language it is an in-place track switch and
      playback never stops. Only when it does not does the system re-resolve, and
      the re-resolve carries the live position forward so it does not snap back to
      the server's last checkpoint.
  - title: Four clients, one truth
    body: >-
      Presence, playback, and resume were spread across several overlapping stores
      that each had a partial claim on being right. Consolidating them is the
      Session Brain work, which is a case study of its own because the migration
      was harder than the design.
result:
  - Daily-driver software across desktop, phone, and two televisions, in continuous use rather than demo state.
  - Fire TV client shipping as a native Compose app; Samsung client shipping as a Tizen package with build-time regression gates.
  - Four reusable pieces extracted and published as standalone open source, including the TV focus kit and the continuity playbook.
demonstrates:
  - Owning a system end to end across four runtimes and three languages
  - Designing for constrained hardware instead of assuming a fast machine
  - Contract-first thinking when clients cannot ship together
  - Extracting general patterns out of specific production code
---

Flashpoint is the largest system I have built and the one I use every day. It is a
personal media platform, but the interesting engineering is not the catalog. It is
that four different client runtimes have to agree about a single session while
running on hardware that ranges from a desktop to a television stick.

The source stays private because it is wired into my own accounts and home
infrastructure. The parts that generalize have been pulled out, documented, and
published on their own, which is where most of the public repositories on this site
came from.

> Presented as a sanitized case study. No personal data, credentials, or private
> integrations are shown.
