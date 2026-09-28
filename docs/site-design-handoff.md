# Marketing site: design implementation notes

Source: Claude Design project "Landing page and docs prototype" (`Home.dc.html`, `Docs.dc.html`,
`SiteNav.dc.html`, `SiteFooter.dc.html`, `cal-booking.js`, `HANDOFF.md`), implemented 2026-09-28.

## Routes

| Route | Content |
| --- | --- |
| `/` | Home: hero, Approach, System, Workbench (application), Mechanism, Evidence, Direction, Pilot |
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
