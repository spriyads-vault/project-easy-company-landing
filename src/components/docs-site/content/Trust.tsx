import { A, H2, Lead, P } from "../ui";

/** Copy carried over verbatim from the previous Trust page (src/components/docs/content/Trust.tsx). */
export default function Trust() {
  return (
    <>
      <Lead>
        Each customer works in an isolated workspace. Uploaded sources, revision records and outputs are scoped to that workspace. Access for pilot participants
        is arranged during pilot scoping.
      </Lead>

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
