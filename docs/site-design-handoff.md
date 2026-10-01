# Marketing site: design implementation notes

Source: Claude Design project "Landing page and docs prototype"
(`https://claude.ai/design/p/a953810b-4df9-49f3-97b1-dfc8bfb9184f`).

## Design authority

| Page | Reference | Implemented |
| --- | --- | --- |
| `/` (Home) | `Home v3.dc.html` | 2026-10-01 |
| `/docs/*` | `Docs.dc.html` (content), with Home v3's shared typography, nav and footer | 2026-09-28, typography 2026-10-01 |
| Header, footer, announcement | `SiteNav.dc.html`, `SiteFooter.dc.html`, Home v3 | 2026-10-01 |

This covers the public marketing site only. It does not replace design references for the authenticated
Crado application.

`Home v3.dc.html` supersedes `Home.dc.html`, `Home v2.dc.html` and every `Home v3 (before …)` snapshot.
Those files, `uploads/` and `screenshots/` are historical and are not shipped. The earlier implementation
(2026-09-28) followed `Home.dc.html`.

### Home v3 implementation (2026-10-01)

- Typography: Funnel Display replaces Space Grotesk as the display face site-wide (`--font-display`), with
  IBM Plex Sans and Mono unchanged. The Home page uses `line-height: normal` as a base, matching the design.
- Sections, in order: hero, Approach (Rev B tested / Rev D enclosure changed), System ("Every finding needs
  context"), Workbench (four stages), Mechanism, Evidence (Observed / Known / Inferred / Missing), Direction
  (engineering-record terminal, "In development"), Pilot. The interactive evidence map from `Home.dc.html`
  is gone; `nodeData` in Home v3's script is unused leftover code and was not ported.
- SVG artwork is copied from Home v3 (`src/components/home/art.tsx`).
- Terminal (`Direction.tsx`): the design's timeline (lines at 250, 900, 1450, 2000 and 2700 ms, complete
  record held to 8700 ms, 9100 ms loop). It runs only while at least half of it is visible and the tab is
  visible, using a single interval that exists only while running. Under reduced motion it starts paused
  on the complete record. Focus inside the record holds it complete. Pause and Play resume from the
  complete record. All lines stay rendered, so the height never changes, and the no-JS render shows the
  full record.
- Announcement and CTAs: "Book a 30-minute call" and "Discuss a pilot", all opening the same Cal.com
  event. The footer adds "© 2026 Crado".
- The booking module is unchanged. The design's `cal-booking.js` leaves the scroll lock entirely to Cal;
  `src/lib/booking.ts` also locks `<html>`, which the regression tests cover. Both are one behaviour, owned by
  `booking.ts`.

### Deliberate deviations from Home v3 (product accuracy)

1. Mechanism, model-assisted layer: the design says "Extract information and propose explanations from the
   available material." It keeps "Interpret the available material and propose explanations." because report
   extraction is deterministic (correction 2 below).
2. Workbench retest checklist: the design lists Cable layout. It keeps Frequency, because cable arrangement
   is not a gated comparison condition (correction 3 below). The Rev B and Rev C record cards keep "Cables",
   which is a recorded field, not a gate.

## Routes

| Route | Content |
| --- | --- |
| `/` | Home: hero, Approach, System, Workbench (application), Mechanism, Evidence, Direction (terminal), Pilot |
| `/docs` | Get started (Introduction, First investigation, Scope and limitations) |
| `/docs/core-concepts` | Products and revisions, requirements, evidence, observations, reviews |
| `/docs/evaluation` | Report confirmation, rule evaluation, comparisons, missing conditions |
| `/docs/reference` | Regulatory coverage, evidence packages, worked examples |
| `/docs/trust` | Workspace access, data handling, security status |

The design shows the five docs groups as hash views of one page. They are real routes here so each has
its own title, description, canonical URL and structured data. `/docs/get-started` redirects to `/docs`.
Old `/docs#…` anchors (`overview`, `regulatory-standards`, `verification-trace`, `tenant-isolation`, etc.)
and the design's aliases are redirected client-side to the page that now holds them (`src/lib/docs.ts`).
Old home anchors (`#thesis`, `#pipeline`, `#specifications`, `#architecture`, `#faq`) scroll to their
closest replacement section.

## Booking

`src/lib/booking.ts` ports `cal-booking.js` and is the only owner of the scroll lock. `BookingManager`
installs it once in the root layout and dismisses any open booking on client-side navigation. Every Pilot
CTA is a real link to `https://cal.com/crado-a7dbr4/30min`, so it still works without JavaScript or with a
modified click. `@calcom/embed-react` was removed; the official loader snippet is inlined.

Regression coverage: `tests/landing.spec.ts` ("Pilot booking").

## Factual corrections to the design copy

Checked against the product repository (`project-easy-company`, HEAD 34029c0).

1. **Margin sign.** The product computes `margin = measured - limit`, positive when the level is over the
   limit (`src/lib/regulatory/limit-evaluation.ts`). The design used `limit - measured`. The docs formula,
   its explanation and worked example A now follow the product (`47.0 − 46.0 = +1.0 dB`).
2. **Report extraction is not model-assisted.** Report fields are proposed deterministically from the
   report text (`src/lib/regulatory/report-extraction.ts`: "no model call"). Docs now say values are
   "proposed from the report text". The home Mechanism line reads "Interpret the available material and
   propose explanations." Models are used for candidate explanations and questions.
3. **Comparison conditions.** The product gates comparisons on frequency, detector, distance,
   polarization, operating mode, equipment class and unit (`comparison-eligibility.ts`). Cable arrangement,
   resolution bandwidth, height search and test site are not checked. The docs now say so under
   Measurement comparisons; worked example B uses a missing operating mode instead of a missing cable
   arrangement; the home retest checklist lists Frequency instead of Cable layout; the evidence map's
   "Conditions to match" lists operating mode instead of cables.
4. **Coverage row.** The 15.109(a) conditions now name all required inputs (frequency, level, unit,
   detector, 3 m distance, stated class, unintentional radiator). 15.109(b) (Class A, 10 m) is also
   implemented in source but its availability was not confirmed, so it is not listed.
5. The old "customer data is not used to train models" claim is not in the new copy and is not stated in
   the product repository.

## Release checks (2026-09-28)

- **Privacy policy.** Replit references replaced with Vercel, the verified host (GitHub deployments are
  created by the Vercel integration). The analytics sentence now states no analytics trackers are used:
  the repository has no analytics package and the live site loads no `/_vercel/insights` script. The Cal.com
  entry notes the embed script loads in the background. No retention, location or training commitments
  were added. Last updated: 28 September 2026.
- **Worked example A.** Checked against the eCFR: 15.109(a) Class B at 3 m, 216 to 960 MHz is 200 µV/m,
  which is 20·log10(200) = 46.02 dBµV/m, shown rounded as 46.0; 15.35(a) bases limits at or below 1000 MHz
  on the CISPR quasi-peak detector. The margin `47.0 − 46.0 = +1.0 dB` follows the product convention. The
  example stays labelled as illustrative, fictional data.
- **NVIDIA Inception badge.** Detailed badge specifications are published in NVIDIA's member brand portal,
  which is not publicly readable. Public NVIDIA pages state that members receive official badges for use on
  their websites. The site uses the supplied artwork unmodified, at its original proportions, on a light
  background, with the wording "Member of NVIDIA Inception" and no partnership, endorsement or investment
  language. Confirm against the member portal or inceptionprogram@nvidia.com if in doubt.

## Open items

- The design's open gaps remain: full logo lockup and light/SVG variants.
- Run the Schema.org validator, Rich Results Test and Lighthouse on the deployed pages; submit the sitemap
  in Search Console after deploy.

## Structured data and Lighthouse (2026-09-28)

- Schema.org validator: 0 errors, 0 warnings on `/` and all five docs routes, after removing an invalid
  `breadcrumb` property from TechArticle.
- Lighthouse 12 against the production build served locally (the Vercel preview requires Vercel
  Authentication): accessibility 100 and SEO 100 on every page, CLS 0, desktop performance 100, mobile
  performance 93 to 100. Fixes made: logo and badge images now request display-size variants, the docs
  search `aria-controls` is only set when results exist, evidence-map nodes are named by their visible text,
  and a skipped heading level on `/docs/reference` was corrected.
- Best practices is 78 to 79 because Cal.com's `embed.js` sets a Cloudflare `__cf_bm` cookie. That comes
  with the approved embed (the previous site loaded Cal.com the same way) and was left as is.
