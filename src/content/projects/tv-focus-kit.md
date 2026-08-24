---
title: TV Focus Navigation Kit
tagline: The D-pad focus problems that make Android TV apps feel broken, solved as a reusable Jetpack Compose library extracted from a shipped app.
category: tv
group: selected
role: Solo Developer
year: 2026
status: Shipped
featured: true
order: 5
private: false
stack:
  - Kotlin
  - Jetpack Compose for TV
  - Gradle
highlights:
  - Deterministic bring-into-view with no fixed delay and no layout race
  - A scroll guard for the hero focus race that clips titles under the nav during screen transitions
  - Explicit cross-zone focus resolution instead of relying on geometric focus search
  - Restore-on-back that lands focus on the exact card a detail screen was opened from
links:
  repo: https://github.com/iFan6oy/tv-focus-navigation-kit
problem: >-
  D-pad focus is the hardest part of building a TV app in Compose. The framework
  gives you focusable modifiers, focus requesters, and a geometric focus search, then
  leaves you to discover that geometric search is the wrong tool at almost every
  screen boundary, that scrolling to an item does not mean it has been laid out yet,
  and that pressing Back has an implicit contract about where focus lands that nobody
  wrote down.
constraints:
  - Everything happens on a remote control. There is no pointer to recover from a mistake, so a focus dead end strands the user.
  - The hardware is slow. Anything that depends on a layout pass finishing within a fixed timeout will race on a cheaper device.
  - It has to be liftable. Extracted from a real app, it can carry no dependency on that app's backend, navigation stack, or branding.
architecture: >-
  A single focus controller is provided at the navigation graph root and holds the
  registry of how to focus each zone. Screens register their focusable regions with
  it rather than reaching for each other directly, which is what makes cross-zone
  movement explicit instead of geometric. Around that sit the four specific fixes:
  the bring-into-view helper, the hero scroll guard, cross-zone resolution, and focus
  restoration on back navigation. Ships as a library module plus a three-screen demo
  app that runs on hardcoded data with no backend.
decisions:
  - title: Resolve focus explicitly, stop trusting geometry
    body: >-
      Geometric focus search picks whatever is nearest in the direction pressed,
      which is right in the middle of a grid and wrong at every boundary between a
      nav bar, a hero, and a content row. Declaring those transitions explicitly is
      more code and far fewer surprises.
  - title: Separate focused from selected
    body: >-
      Guess-based navigation code usually conflates the item the remote is currently
      on with the item that is chosen. Keeping them distinct is what makes a TV
      interface legible from a couch, and it is the bug most often behind a row that
      feels wrong to scroll.
  - title: No fixed delays anywhere
    body: >-
      Every timing problem here has a version that works on a fast device and races
      on a cheap one. The kit waits on the actual condition instead of guessing at a
      duration, because the target hardware is the cheap one.
hardProblems:
  - title: The hero scroll-race
    body: >-
      A hero's auto-focused button and the lazy list's bring-into-view behavior fight
      each other during a screen's enter transition, and the visible result is a
      clipped title jammed under the nav. It reproduces intermittently, which is the
      worst kind. The guard pins the list while the hero holds focus rather than
      trying to win a race.
result:
  - Public Kotlin library module plus a runnable demo app exercising every pattern.
  - Documented as four problem write-ups and a doctrine file stating the five rules the design follows.
  - Extracted from a Fire TV app in active use, then genericized to remove all app-specific dependencies.
demonstrates:
  - Native Android and Kotlin development with Jetpack Compose
  - Debugging timing and layout races on constrained hardware
  - Designing an API for other developers rather than for one codebase
  - Writing documentation that explains the problem, not just the usage
---

This is the most directly reusable thing I have published. Every one of these four
problems cost me real debugging time on a Fire TV app, and none of them are covered
well by the official documentation.

I kept it deliberately narrow. It is focus and navigation only, with no playback, no
networking layer, and no opinion about your color palette, because a kit that tries
to own the whole screen is one nobody can adopt.
