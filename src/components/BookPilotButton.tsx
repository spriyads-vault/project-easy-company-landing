import type { ComponentPropsWithoutRef } from "react";
import { CAL_CONFIG, CAL_LINK, CAL_NAMESPACE } from "@/lib/cal";

type Props = Omit<ComponentPropsWithoutRef<"button">, "type">;

export default function BookPilotButton({ children, ...rest }: Props) {
  return (
    <button
      type="button"
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config={CAL_CONFIG}
      {...rest}
    >
      {children}
    </button>
  );
}
