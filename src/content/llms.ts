import { CAPABILITIES, statusOf } from "./capability-status";
import { AGENTS, COVERAGE, FAQ_V6, PRINCIPLES, SOURCES_NOTE, STACK, V6_CATEGORY, V6_H1, V6_INTRO } from "./home-v6";

const DOCS = `## Docs
- [Introduction](https://www.crado.io/docs): what Crado does and how it reaches a result
- [Concepts](https://www.crado.io/docs/concepts): revisions, requirements, evidence, evidence states, agents, rules and review
- [Evaluation](https://www.crado.io/docs/evaluation): report confirmation, rule evaluation, measurement comparisons, blocked checks
- [Reference](https://www.crado.io/docs/reference): regulatory coverage and glossary
- [Trust](https://www.crado.io/docs/trust): workspace access, data handling and security status
- [Changelog](https://www.crado.io/docs/changelog)`;

/** llms.txt for the v6 homepage: the v6 copy, with every status generated from capability-status.ts. */
export function llmsTxtV6(): string {
  const statuses = Object.values(CAPABILITIES)
    .map((c) => `- ${c.name}: ${c.status}`)
    .join("\n");
  return `# Crado

> ${V6_H1}

${V6_INTRO}

${V6_CATEGORY}: one record between your engineering team and the regulations your product must meet.

## How it works
${STACK.map((l) => `- ${l.title}: ${l.body}`).join("\n")}
- ${SOURCES_NOTE.live} ${SOURCES_NOTE.next}: ${statusOf(SOURCES_NOTE.capability)}.

${PRINCIPLES.map((p) => `${p.title} ${p.body}`).join("\n\n")}

## Agents
${AGENTS.map((a) => `- ${a.name} (${statusOf(a.capability)}): ${a.body}`).join("\n")}

## Coverage
${COVERAGE.map((r) => `- ${r.regulation}, ${r.scope}, ${r.measurement}: ${statusOf(r.capability)}`).join("\n")}

## Status
${statuses}

## FAQ
${FAQ_V6.map((f) => `- ${f.q} ${f.a}`).join("\n")}

${DOCS}

Contact: hello@crado.io
`;
}
