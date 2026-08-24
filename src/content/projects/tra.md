---
title: TRA
tagline: The district travel reimbursement system I built and ran in production, rebuilt as multi-tenant B2B SaaS on a modern stack.
category: power
group: selected
role: Founder and Developer
year: 2026 to present
status: Active
featured: true
order: 6
private: false
stack:
  - TypeScript
  - Next.js 16
  - React 19
  - Prisma
  - PostgreSQL
  - WorkOS AuthKit
  - Tailwind
highlights:
  - Rebuild of a system I owned in production, so the domain model comes from operating it rather than guessing at it
  - Enterprise SSO through WorkOS, with multi-level approval routing and role-scoped access
  - "Full workflow surface: requests, estimates, approvals, reimbursement, administration, and reporting"
  - Relational schema replacing a list-based backend that could not express the relationships the process actually has
links:
  repo: https://github.com/iFan6oy/tra
problem: >-
  Travel reimbursement in a large public organization is a long, branching approval
  process with real financial consequences and an audit requirement at the end of it.
  I spent nearly two years building and supporting exactly this for a school district
  on the Microsoft stack. The workflow logic was sound and the platform was the
  limiting factor, so the rebuild keeps the domain model and replaces everything
  underneath it.
constraints:
  - The approval chain is not linear. Routing depends on the current approver level, cost center, and the amounts involved.
  - Reimbursement is financial, so a correction has to be auditable rather than an in-place edit.
  - Multi-tenant from the start, because the whole point is that it is not locked to one organization or to Microsoft.
  - Organizations expect SSO, not another password.
architecture: >-
  A Next.js application over PostgreSQL through Prisma, with WorkOS handling
  authentication and directory-backed identity. The core is a relational model of the
  actual process: a request moves through estimate, approval stages, actual expense
  entry, final approval, and reimbursement, with the approval chain expressed as data
  rather than as conditionals in the UI. Role-based access is scoped by organization
  and cost center, so what someone can see and approve falls out of their position in
  the directory.
decisions:
  - title: Model the approval chain as data
    body: >-
      In the original system, approval stages were largely expressed through
      conditional UI, which is workable but means the process lives in the interface.
      Making the chain a first-class relational concept means routing rules can change
      without touching screens, and the current state of any request is a query rather
      than an inference.
  - title: Buy the identity layer
    body: >-
      Enterprise SSO, directory sync, and organization management are a genuine
      product on their own. Using WorkOS for that was the difference between shipping
      the domain logic that I actually have expertise in and spending months on
      authentication plumbing.
  - title: Corrections are records, not edits
    body: >-
      Anything touching money needs to be able to answer what changed, when, and who
      approved it. Treating a correction as a new auditable record rather than an
      update in place is the difference between a system a finance office trusts and
      one it does not.
hardProblems:
  - title: Carrying domain knowledge across a platform change
    body: >-
      The genuinely valuable part of the original system was not the code, it was
      knowing which edge cases in a reimbursement process actually happen: partial
      approvals, mileage disputes, corrections after submission, cost centers that
      split. Re-encoding that knowledge in a relational schema was most of the design
      work.
result:
  - Working multi-tenant application covering the full request lifecycle with SSO.
  - Domain model derived from a system that ran in production for a public school district.
  - Public repository.
demonstrates:
  - Full-stack TypeScript application development on a current stack
  - Relational data modeling for a real business process
  - Enterprise authentication and multi-tenancy
  - Converting operational domain expertise into product
---

TRA is the bridge between my professional work and the products I build now. The
original ran on the Microsoft stack inside a school district and I owned it end to
end, including the part nobody enjoys, which is supporting it while people use it to
get paid back.

That support work is where the value is. Almost every design decision here traces to
a specific thing that went wrong or a specific question a finance office asked, which
is knowledge you can only get by operating a system rather than shipping one.
