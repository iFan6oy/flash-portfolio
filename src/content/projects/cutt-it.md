---
title: Cutt It
tagline: A barbershop booking app with real payments and a real client, built as a React Native front end over a Node and PostgreSQL backend.
category: mobile
group: engineering
role: Co-founder and Lead Developer
year: 2025 to present
status: Active
featured: false
order: 20
private: true
stack:
  - React Native / Expo
  - Reanimated
  - Express
  - PostgreSQL
  - Square SDK
  - JWT
highlights:
  - Real payments through Square with live catalog sync, not a mocked checkout
  - Token auth, booking lifecycle, and push notifications against a hosted backend
  - Built for an actual barbershop under a signed partnership rather than as a portfolio exercise
links: {}
demonstrates:
  - Mobile application development with a production backend
  - Payment provider integration and money-handling flows
  - Building to someone else's requirements rather than your own
---

Cutt It is a booking app for a real barbershop, built with a partner and a signed
agreement rather than as a demo. That distinction shows up everywhere in the code,
because a real business has opinions about how its scheduling works and those
opinions do not always match what is convenient to build.

The technically interesting part is the payment integration. Booking, catalog, and
checkout have to stay consistent with what Square holds, which means the app cannot
treat its own database as the only truth about what a service costs or whether a slot
is still available.

> Presented as a sanitized case study. No client or customer data is shown.
