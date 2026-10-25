import { A, H2, Lead, P } from "../ui";

/** /docs/trust with NEXT_PUBLIC_FF_DOCS_SPEC on: workspace isolation, the AI boundary and engineer authority. */
export default function Security() {
  return (
    <>
      <Lead>
        Each customer works in an isolated workspace. Uploaded sources, revision records and outputs are scoped to that workspace.
      </Lead>

      <H2 id="workspace-isolation">Workspace isolation</H2>
      <P>Reports, product facts, revisions and investigation notes stay inside the workspace they were created in. Access is arranged per workspace.</P>

      <H2 id="no-cross-customer-training">No cross-customer training</H2>
      <P>
        Crado does not use your schematics, product facts or test reports to train models for other customers. Workspace checks learn only from your own
        revision history inside your workspace.
      </P>

      <H2 id="public-library">Public precedent library</H2>
      <P>The precedent library contains only public regulatory filings. No customer data is added to it.</P>

      <H2 id="engineer-authority">Engineer authority</H2>
      <P>
        Nothing extracted from a document becomes known until an engineer confirms it. Engineers record the hardware fix, evaluate the retest delta and sign
        the derived result, which is not a certification. Crado never issues compliance verdicts or replaces accredited laboratories.
      </P>

      <H2 id="data-handling">Data handling</H2>
      <P>
        Provide only reports and product information you are authorized to share. The data in scope for a pilot, its retention and the model services used to
        process it are agreed during pilot scoping.
      </P>
      <P>
        See the <A to="/privacy">Privacy policy</A> and <A to="/terms">Terms</A>.
      </P>

      <H2 id="security-status">Security status</H2>
      <P>
        Crado does not claim a security certification or audit report on this site. Security documentation and current status are shared during pilot scoping.
      </P>
      <P>
        Questions: <A to="mailto:hello@crado.io">hello@crado.io</A>
      </P>
    </>
  );
}
