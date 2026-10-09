@AGENTS.md

# Project conventions

- Package manager: npm (`package-lock.json`). Do not switch to pnpm or yarn.
- Theme: light theme (v6 design system); tokens in docs/design/system/DESIGN.md. No theme toggle. Until
  NEXT_PUBLIC_FF_HOMEPAGE_V6 ships, the flag-off homepage, docs and legal pages keep the dark v3 tokens. Design-prototype
  tweak panels (accent/theme tweaks) never ship to production.
- Design tokens live in `src/styles/design-system.css` (v6 tokens are prefixed `v6-`). Add new tokens there rather than
  hard-coding values.
- Capability statuses (LIVE / EARLY ACCESS / ROADMAP) on the v6 homepage and llms.txt come from
  `src/content/capability-status.ts`; components never write a status (a unit test enforces it).

# Workflow

- The owner merges. Agents never merge, deploy, change Vercel settings or write to the hosted Supabase database
  without the owner's typed approval.
- New features sit behind a flag.
- One Jira ticket (SCRUM), one PR.

# Copy rules

- Present tense describes only what is live today: radiated-emissions investigation, report confirmation, revision
  records, retest comparison, and the evaluation engine for 47 CFR 15.109(a).
- Anything else (change review, email/Slack filing, background agents, other standards) carries an EARLY ACCESS or
  ROADMAP label, or is phrased as "In early access, …". Never drop an existing label.
- Banned words: AI-powered, leverage, unlock, transform, empower, revolutionary, cutting-edge, game-changing, seamless.
- No invented names, metrics, customer logos or integration logos. Mockups use roles ("EMC engineer"), not people.
- No em dashes in copy or metadata; page titles use " | ".
- If design copy breaks these rules, flag it; don't silently rewrite it.
