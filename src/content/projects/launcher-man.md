---
title: Launcher-Man
tagline: A finished 2D Unity platformer in C#, where the engineering is in how the movement feels rather than in the level.
category: mobile
group: engineering
role: Solo Developer
year: 2026
status: Shipped
featured: false
order: 24
private: false
stack:
  - C#
  - Unity
  - HLSL
highlights:
  - Coyote time, jump buffering, and variable jump height, which are the details that separate responsive movement from stiff movement
  - Dash and wall-jump with cooldown tuning
  - Complete and playable rather than an abandoned prototype
links:
  repo: https://github.com/iFan6oy/Launcher-Man
demonstrates:
  - C# and a compiled game engine outside my usual stack
  - Interaction engineering measured in frames
---

A small, finished platformer. It is on this site for two honest reasons: it is my C#
work, and it is the clearest example of tuning interaction at the frame level.

The details that matter are invisible when they work. Coyote time lets a jump register
for a few frames after you leave a ledge, jump buffering accepts the input slightly
before you land, and variable jump height ties the arc to how long the button is held.
Without them the controls are technically correct and feel broken, which is a lesson
that transfers well beyond games.
