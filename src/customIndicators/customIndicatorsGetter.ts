import { PVSRA_Combined } from "./PVSRA_Combined";
import { PVSRA_Candles } from "./PVSRA_Candles";
import { PVSRA_Histogram } from "./PVSRA_Histogram";
import { Smoothed_VWAP } from "./Smoothed_VWAP";
import { EMA_Ribbon } from "./EMA_Ribbon";
import { BTC_OI } from "./BTC_OI";

export function customIndicatorsGetter(PineJS: any) {
  return Promise.resolve([
    PVSRA_Combined(PineJS),
    PVSRA_Candles(PineJS),
    PVSRA_Histogram(PineJS),
    Smoothed_VWAP(PineJS),
    EMA_Ribbon(PineJS),
    BTC_OI(PineJS)
    //...
  ]);
}
