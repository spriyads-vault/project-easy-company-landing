# Crado design system (v6, light)

Source: Claude Design project 91bbe927, `Crado Homepage v6.dc.html`, frames **Design system**, **States** and
**Waitlist states**. Implemented as `v6-*` tokens in `src/styles/design-system.css` (Tailwind utilities such as
`bg-v6-page`, `text-v6-ink`, `rounded-v6-card`) and used by the v6 homepage (`src/home/v6`, `src/components/home-v6`),
which is behind `NEXT_PUBLIC_FF_HOMEPAGE_V6`. Docs and legal pages still use the dark v3 tokens.

## Colour

### Neutrals, dark bands, primary

| Token | Hex | Use |
|---|---|---|
| `v6-page` | `#F8F7F6` | Page background, footer card |
| `v6-alt` | `#F1EFEA` | Alternate band (How it works), table head, hover tint, disabled fields |
| `v6-card` | `#FFFFFF` | Cards, inputs, product views |
| `v6-line` | `#E2E0DA` | Hairlines |
| `v6-line-strong` | `#CFCBC2` | Secondary button and card outlines |
| `v6-line-input` | `#D1CFC8` | Input borders |
| `v6-ink` | `#141821` | Text, hover borders |
| `v6-muted` | `#5C6270` | Secondary text |
| `v6-forest` | `#12302A` | Dark band: commitments, agents, footer surround |
| `v6-rust` | `#6E2B12` | Dark band: closing; product and commitment cards |
| `v6-primary` | `#1430B8` | Primary buttons, links, focus ring, FAQ numbers |
| `v6-primary-hover` | `#0F2696` | Primary hover and active |
| `v6-on-dark` | `#F8F7F6` | Text and focus ring on dark bands |
| `v6-on-dark-muted` | `#C9C4BA` | Secondary text on dark bands |
| `v6-dark-line` | `rgb(248 247 246 / 0.14)` | Hairlines on dark bands |
| `v6-missing-ink` | `#8A2E2E` | Errors (email, rate limit, server) |

### Bright colours and evidence mapping (text is always Ink)

| Evidence state | Colour | Hex |
|---|---|---|
| OBSERVED | Sky | `#AFD9FA` |
| KNOWN | Mint | `#C7EBCF` |
| INFERRED | Sunshine | `#FFE36E` |
| MISSING | Lilac | `#F2C4FF` |
| ROADMAP tag | Tag grey | `#E2E0DA` (Muted text) |

Status tags read from `src/content/capability-status.ts`: LIVE mint, ROADMAP tag grey, EARLY ACCESS sunshine. A
unit test fails if a component writes a status itself.

### Colour rhythm (top to bottom)

1. Announcement: sunshine
2. Hero and evidence cards: page
3. Commitments: forest
4. Essay: page
5. Where Crado sits (How it works): alt
6. Product: page, with sunshine, lilac and rust cards
7. Agents: forest
8. Coverage: page
9. Commitment cards: page, with sky, rust, card and lilac cards
10. FAQ: page, hairline above
11. Closing: rust
12. Footer: page card on forest

## Contrast (WCAG AA 4.5:1)

| Pair | Ratio | AA |
|---|---|---|
| Ink on page / alt / card | 16.60 / 15.46 / 17.76 | Pass |
| Ink on sunshine | 13.93 | Pass |
| Ink on lilac | 11.94 | Pass |
| Ink on sky | 11.95 | Pass |
| Ink on mint | 13.71 | Pass |
| Ink on hairline grey | 13.45 | Pass |
| Muted on page / alt / card | 5.71 / 5.32 / 6.11 | Pass |
| Muted on ROADMAP grey | 4.63 | Pass |
| Text / muted on forest | 13.24 / 8.16 | Pass |
| Text / muted on rust | 9.73 / 5.99 | Pass |
| White on rust | 10.41 | Pass |
| White on primary / hover | 9.79 / 12.08 | Pass |
| Primary on page (links, FAQ numbers) | 9.15 | Pass |
| Primary on sunshine (announcement link) | 7.68 | Pass |
| Ok ink `#1D6B3A` on card / page / alt (docs status text) | 6.53 / 6.10 / 5.68 | Pass |
| Warn ink `#7A5600` on card / page / alt (docs status text) | 6.65 / 6.21 / 5.79 | Pass |
| Missing ink on card / page (docs "Exceeds limit", "Blocked") | 8.36 / 7.82 | Pass |

## Type

IBM Plex, self-hosted by `next/font` with size-adjusted fallbacks (`src/app/fonts-v6.ts`, preloaded on every page
while the flag is on): Serif 400, Sans 400/500, Mono 500. Sizes are CSS variables that change at the breakpoints (`--v6-h1` etc.).

| Style | Face | Desktop | Tablet (≤1023) | Mobile (≤640) |
|---|---|---|---|---|
| H1 | Plex Serif 400, −0.02em | 68/74.8 | 52/57.2 | 40/44 |
| H2 | Plex Serif 400, −0.02em | 60/66 | 46/50.6 | 34/38 |
| H3 | Plex Serif 400 | 26/36.4 | 26/36.4 | 22/30 |
| Intro | Plex Sans 400 | 24/31.2 | 24/31.2 | 19/27 |
| Body | Plex Sans 400 | 17/27 | 17/27 | 16/25 |
| Small | Plex Sans 400 | 14/21 | 14/21 | 14/21 |
| Label | Plex Mono 500, 0.06em (uppercase for tags and eyebrows) | 12/16 | 12/16 | 12/16 |

Notes, captions, quotes and numbers use Plex Mono 500 12/16 without tracking.

### Docs and legal pages (SCRUM-296)

Fixed at every width (`--v6-doc-*`): H1 Plex Serif 52/58, H2 34/40, H3 24/32, body Plex Sans 17/28, code Plex Mono
500 14/22. Lead paragraphs Plex Sans 20/30 in Muted.

## Docs layout and components (SCRUM-296)

- Layout: from 1280px (`v6w:`) a 240px sidebar, a 72ch content column and a 200px "On this page" rail. 1024 to 1279:
  sidebar and content, the list above the content. Below 1024: one column, a 48px contents bar (`--v6-docs-bar`)
  under the header opens the contents drawer (search and page index); the list above the content is open from
  641px and collapsed at 640 and below. Anchors land 24px below the header (and the bar).
- Drawer: page background, hairline, radius 20, over an Ink scrim at 32% (`v6-scrim`); focus moves in and back.
- Code blocks: white card, hairline, radius 8; highlighted tokens in Primary. Copy button: hairline outline, Ink
  outline on hover, primary ring on focus, Mint with a check for 1.5s when copied.
- Tables: the coverage style: white panel, radius 20, Alt header with mono labels, row hairlines, horizontal scroll
  in a focusable region, first column held while scrolling.
- Callouts (radius 8, Ink text): Sky note, Sunshine caution, grey Roadmap, Mint Live.
- Evidence badges as on the homepage: sky observed, mint known/confirmed, sun inferred, lilac missing.
- The shared docs content keeps its v3 utility classes; inside `[data-site-v6]` the v3 tokens resolve to the v6
  palette and Plex (`src/site/v6/site.css`).
- Legal pages: one 72ch column, the section list at the top; print hides the announcement, header, list and footer.
- 404: H1, Intro line, primary and secondary buttons, a small still record block (Ink dashes on the page colour).

## Radius, spacing, layout

- Radius: 6 buttons and inputs (`rounded-v6-button`), 8 cards (`rounded-v6-card`), 20 tables and the footer card
  (`rounded-v6-panel`), 9999 pills.
- Spacing base 4px: 4 8 12 16 20 24 28 32 36 40 48 64 100 136.
- Section padding 136 / 100 / 64 (`--v6-section`). Container 1200, side padding 40 / 32 / 20 (`--v6-gutter`), 12
  columns, 24px gutters. Breakpoints: tablet from 641px (`v6t:`), desktop from 1024px (`v6d:`).
- Header 64px, sticky; anchors land 64px below the top (`scroll-padding-top`).

## Motion

- 150ms `cubic-bezier(0.4, 0, 0.2, 1)` for hover and colour (`ease-v6-ui`).
- 300ms `cubic-bezier(0, 0, 0.2, 1)` for entrances (`animate-v6-in`: fade up 4px).
- Hero record block: dashed cube with ultramarine streams on a canvas; runs only on screen with the tab visible;
  still with reduced motion. The agents block is a still frame.
- Reduced motion: no transitions, no entrances, instant anchor jumps.

## States

| Element | Default | Hover | Focus-visible | Active | Disabled |
|---|---|---|---|---|---|
| Primary button | Primary fill, white | Primary hover | 2px primary ring, 2px offset | Primary hover, translateY(1px) | 40% opacity |
| Secondary button | Line-strong outline, Ink | Ink outline | Ring | Ink outline, translateY(1px) | 40% opacity |
| Outline on dark | On-dark outline | Fills on-dark, rust text | On-dark ring | Filled, translateY(1px) | 40% opacity |
| Nav link | Ink | Muted | Ring, radius 6 | Primary underline (current section) | 40% opacity |
| Card | Hairline | Ink border (no shadow, no scale) | Ring | | |
| FAQ row | Hairlines | Alt tint, Ink sign | Ring, radius 6 | translateY(1px); open shows the answer with the 300ms entrance | |

Rings are `#F8F7F6` on dark bands (`data-band="dark"`).

### Waitlist

| Element | Default | Hover | Focus-visible | Disabled | Error / loading |
|---|---|---|---|---|---|
| Email input | Card, input border | Ink border | Ring | Alt fill | Missing-ink border and message "Enter a valid email address." |
| Role select | Card | Ink border | Ring | Alt fill, muted, "Enter your email first" | Missing-ink border |
| Button | Primary | Primary hover | Ring | Alt fill, muted text | Spinner and "Joining…" |
| Checkbox | 18px, unticked | Ink border | Ring | Read-only at 40% | Ticked: primary |

- Personal email: soft hint "A work email helps us prioritise engineering teams." Advisory, never blocks submit.
- Success replaces the form row: mint panel, "You're on the list.", links to the optional step 2 and to book a case
  review.
- Rate limit: "Too many attempts from this network. Try again in an hour."
- Server error: "Something went wrong. Try again, or email us."

Behaviour and accessibility:

1. Visible labels on every field ("Work email", "Your role"); the placeholder is never the only label.
2. The email field's `aria-describedby` points to the error or the personal-email hint; `aria-invalid` is set when
   the error shows.
3. The error shows only after the email field loses focus.
4. Role is disabled until the email is valid, described by "Enter your email first", enabling with a 150ms fade.
5. The button is disabled until there is a valid email and a chosen role; while loading, fields are read-only.
6. Success, rate-limit and server-error messages sit in a `role="status"` `aria-live="polite"` region.
7. Keyboard order: email, role, checkbox, button (DOM order; the grid puts the button on the first row from 641px).
8. Inputs use 16px text so iOS does not zoom; every target is at least 44px; the mobile button is 52px.

Role options, consent text and step 2 fields come from the live waitlist code (`src/lib/waitlist/schema.ts`), not
from the design.
