// Compile-time check that the v6 site modules can stand in for the v3 ones behind @crado/site-active: every export
// v3 has, v6 has with a compatible type. Imported by nothing; tsc checks it.
import type * as V3 from "./v3";
import type * as V6 from "./v6";

type Exports<T> = { [K in keyof T]: T[K] };
export type SiteContract = Exports<typeof V6> extends Exports<typeof V3> ? true : never;
export const siteContract: SiteContract = true;
