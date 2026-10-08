/**
 * Landing page FAQ. The visible accordion and the FAQPage JSON-LD both render from this list, so they always
 * match word for word (SEO hand-off). `link` turns the given phrase inside the answer into a link.
 */
export interface FaqItem {
  q: string;
  a: string;
  link?: { text: string; href: string };
}

export const FAQ: FaqItem[] = [
  {
    q: "What is Crado?",
    a: "Crado connects product revisions, regulatory requirements and test evidence. Its agents trace design changes to the tests and certifications they affect, and keep every result tied to the revision it was measured on.",
  },
  {
    q: "Does Crado certify products or replace a test lab?",
    a: "No. Crado does not issue certifications, replace accredited test reports or make regulatory determinations. It helps engineers investigate findings and decide what to test next.",
  },
  {
    q: "Which regulations does Crado support today?",
    a: "Today Crado evaluates radiated emissions against 47 CFR 15.109(a) Class B limits for supported inputs. Other standards are on the roadmap and listed in the documentation.",
    link: { text: "documentation", href: "/docs/reference#coverage" },
  },
  {
    q: "How does Crado reach a result?",
    a: "Agents investigate. Rules evaluate. Engineers decide. Agents propose; a rule-based evaluation engine checks confirmed values against versioned rules; engineers confirm and approve.",
  },
  {
    q: "What happens to our data?",
    a: "Each customer works in an isolated workspace. Data in scope, retention and any third-party processors are agreed in writing during pilot scoping.",
  },
  {
    q: "What does early access include?",
    a: "A scoped pilot on one product with a recent emissions finding, reviewed against your own test history. Change review and communications features are available to early-access teams.",
  },
];

export const FAQ_PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
