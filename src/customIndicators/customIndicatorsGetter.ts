import { PVSRA } from "./PVSRA";

export function customIndicatorsGetter(PineJS: unknown) {
  return Promise.resolve([
    PVSRA(PineJS),
    //...
  ]);
}
