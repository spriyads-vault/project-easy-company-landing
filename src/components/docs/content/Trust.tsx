import Link from "next/link";
import { Article, H1, H2, P, Section } from "../ui";

export default function Trust() {
  return (
    <Article kicker="TRUST">
      <Section id="workspace-access" title="Workspace access">
        <h1 className={H1}>Workspace access</h1>
        <p className="m-0 text-[17px] leading-[1.7]">
          Each customer works in an isolated workspace. Uploaded sources, revision records and outputs are scoped to that
          workspace. Access for pilot participants is arranged during pilot scoping.
        </p>
      </Section>

      <Section id="data-handling" title="Data handling">
        <h2 className={H2}>Data handling</h2>
        <p className={P}>
          Provide only reports and product information you are authorized to share. The data in scope for a pilot, its
          retention and the model services used to process it are agreed during pilot scoping.
        </p>
        <p className="m-0 text-[17px] leading-[1.7]">
          See the <Link href="/privacy">Privacy policy</Link> and <Link href="/terms">Terms</Link>.
        </p>
      </Section>

      <Section id="security-status" title="Security status">
        <h2 className={H2}>Security status</h2>
        <p className={P}>
          Crado does not claim a security certification or audit report on this site. Security documentation and current
          status are shared during pilot scoping.
        </p>
        <p className="m-0 text-[17px] leading-[1.7]">
          Questions: <a href="mailto:hello@crado.io">hello@crado.io</a>
        </p>
      </Section>
    </Article>
  );
}
