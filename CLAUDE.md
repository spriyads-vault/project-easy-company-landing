@AGENTS.md

# Project conventions

- Package manager: npm (`package-lock.json`). Do not switch to pnpm or yarn.
- Theme: the v8 dark homepage (Claude Design "Crado_Landing_v8") is the homepage design going forward, behind
  NEXT_PUBLIC_FF_HOMEPAGE_V8 (default off; when on it wins over v6). Code in src/home/v8 and src/components/home-v8,
  copy in src/content/home-v8.ts. The v3 (dark) and v6 (light, tokens in docs/design/system/DESIGN.md) homepages stay
  until v8 is switched on and checked; with v8 on, docs, legal pages and the 404 keep the v3 design. No theme toggle.
  Design-prototype tweak panels (accent/theme tweaks) never ship to production.
- Design tokens live in `src/styles/design-system.css` (v6 tokens are prefixed `v6-`, v8 tokens `v8-`). Add new tokens there rather than
  hard-coding values.
- Capability statuses (LIVE / EARLY ACCESS / ROADMAP) on the v6 and v8 homepages and llms.txt come from
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
