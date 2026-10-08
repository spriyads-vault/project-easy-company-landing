@AGENTS.md

# Project conventions

- Package manager: npm (`package-lock.json`). Do not switch to pnpm or yarn.
- Theme: dark only. The site defines one dark theme; do not add a light theme or a theme toggle. Design-prototype
  tweak panels (accent/theme tweaks) never ship to production.
- Design tokens live in `src/styles/design-system.css`. Add new tokens there rather than hard-coding values.

# Copy rules

- Present tense describes only what is live today: radiated-emissions investigation, report confirmation, revision
  records, retest comparison, and the evaluation engine for 47 CFR 15.109(a).
- Anything else (change review, email/Slack filing, background agents, other standards) carries an EARLY ACCESS or
  ROADMAP label, or is phrased as "In early access, …". Never drop an existing label.
- Banned words: AI-powered, leverage, unlock, transform, empower, revolutionary, cutting-edge, game-changing, seamless.
- No invented names, metrics, customer logos or integration logos. Mockups use roles ("EMC engineer"), not people.
- No em dashes in copy or metadata; page titles use " | ".
- If design copy breaks these rules, flag it; don't silently rewrite it.
