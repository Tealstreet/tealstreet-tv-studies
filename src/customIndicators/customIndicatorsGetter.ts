import { PineJS } from "../charting_library";
// import { KeyLevels } from "./KeyLevels";
import { PVSRA_Combined } from "./PVSRA_Combined";
import { PVSRA_Candles } from "./PVSRA_Candles";
import { PVSRA_Histogram } from "./PVSRA_Histogram";
import { SmoothedVWAP } from "./VWAP";

export function customIndicatorsGetter(PineJS: PineJS) {
  return Promise.resolve([
    PVSRA_Combined(PineJS),
    PVSRA_Candles(PineJS),
    PVSRA_Histogram(PineJS),
    SmoothedVWAP(PineJS),
    // KeyLevels(PineJS)
    //...
  ]);
}
