import type { ReactNode } from "react";
import Label from "@/components/ui/Label";

export interface AgentCardProps {
  name: string;
  description: string;
  prompt: string;
  icon: ReactNode;
  label?: string;
}

const SWAP = "transition-opacity duration-250 ease-[ease]";

/**
 * Agent card (design: agentH()). On hover or keyboard focus the description swaps for an example prompt and the
 * arrow nudges 3px; the card lifts 2px. On devices without hover the prompt sits under the description instead,
 * so nothing is hidden behind a hover. Pure CSS, so this stays a server component.
 */
export default function AgentCard({ name, description, prompt, icon, label }: AgentCardProps) {
  return (
    <div className="group relative flex min-h-[168px] flex-col rounded-lg border border-line-2 bg-surface-1b p-6 transition-[transform,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-5 focus-within:-translate-y-0.5 focus-within:border-line-5">
      {label ? <Label className="absolute top-6 right-6">{label}</Label> : null}
      {icon}
      <h3 className="m-0 mt-3.5 text-base leading-[1.55] font-medium tracking-[-0.01em]">{name}</h3>
      <div className="mt-1.5 grid">
        <p
          className={`m-0 text-sm leading-normal text-pretty text-fg-muted ${SWAP} [@media(hover:hover)]:[grid-area:1/1] [@media(hover:hover)]:group-hover:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-0`}
        >
          {description}
        </p>
        <p
          className={`m-0 font-mono text-xs leading-[1.55] text-pretty text-fg-3 ${SWAP} [@media(hover:hover)]:[grid-area:1/1] [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:mt-2`}
        >
          {prompt}
        </p>
      </div>
      <a href="mailto:hello@crado.io" aria-label={`Try prompts: ${name}`} className="mt-auto inline-flex gap-1.5 pt-3 text-[13.5px] font-medium">
        Try prompts
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-250 ease-out-expo group-hover:translate-x-[3px] group-focus-within:translate-x-[3px]"
        >
          →
        </span>
      </a>
    </div>
  );
}
