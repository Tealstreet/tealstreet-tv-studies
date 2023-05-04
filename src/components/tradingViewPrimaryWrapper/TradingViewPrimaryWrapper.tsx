import { useEffect } from "react";
import { BUY_COLOR, SELL_COLOR } from "../../constants";
import { TradingViewWrapperBody } from "../tradingViewWrapperBody/TradingViewWrapperBody";

// local storage key for checking if TV custom settings override loaded
const LOCAL_STORAGE_SETTINGS_KEY = "tradingViewChartDefaultsLoaded2";

export function TradingViewPrimaryWrapper() {
  // MAJOR HACKS
  // this is basically how we init our default color template / settings
  useEffect(() => {
    localStorage.setItem(
      "tradingview.trading.chart.property",
      JSON.stringify({
        showSellBuyButtons: 0,
        noConfirmEnabled: 1,
        qweqrq: 0,
        showPricesWithZeroVolume: 1,
        showSpread: 1,
        orderExecutedSoundParams: '{"enabled":0,"name":"alert/alarm_clock"}',
      })
    );
    localStorage.setItem(
      "tradingview.trading.chart.proterty",
      JSON.stringify({
        showSellBuyButtons: 0,
        noConfirmEnabled: 1,
        qweqrq: 0,
        showPricesWithZeroVolume: 1,
        showSpread: 1,
        orderExecutedSoundParams: '{"enabled":0,"name":"alert/alarm_clock"}',
      })
    );
    const tvChartDefaultsLoaded = localStorage.getItem(
      LOCAL_STORAGE_SETTINGS_KEY
    );
    if (!tvChartDefaultsLoaded) {
      localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, "true");
      const interval = setInterval(() => {
        const chartPropertiesMainSeriesProperties = JSON.parse(
          `${
            localStorage.getItem(
              "tradingview.chartproperties.mainSeriesProperties"
            ) || null
          }`
        );
        const chartProperties = JSON.parse(
          `${localStorage.getItem("tradingview.chartproperties")}`
        );
        if (chartProperties && chartPropertiesMainSeriesProperties) {
          localStorage.setItem(
            "tradingview.chartproperties",
            JSON.stringify({
              ...chartProperties,
              paneProperties: {
                backgroundType: "solid",
                background: "rgba(35, 35, 46, 1)",
                backgroundGradientStartColor: "#181C27",
                backgroundGradientEndColor: "rgba(77, 182, 172, 1)",
                vertGridProperties: {
                  color: "rgba(240, 243, 250, 0.06)",
                  style: 0,
                },
                horzGridProperties: {
                  color: "rgba(240, 243, 250, 0.06)",
                  style: 0,
                },
                crossHairProperties: {
                  color: "#9598A1",
                  style: 2,
                  transparency: 0,
                  width: 1,
                  "color:": "#9598A1",
                },
              },
            })
          );
          localStorage.setItem(
            "tradingview.chartproperties.mainSeriesProperties",
            JSON.stringify({
              ...chartPropertiesMainSeriesProperties,
              candleStyle: {
                upColor: BUY_COLOR,
                downColor: SELL_COLOR,
                drawWick: true,
                drawBorder: true,
                borderColor: "#378658",
                borderUpColor: BUY_COLOR,
                borderDownColor: SELL_COLOR,
                wickColor: "#B5B5B8",
                wickUpColor: "rgba(11, 167, 218, 1)",
                wickDownColor: "rgba(250, 107, 103, 1)",
                barColorsOnPrevClose: false,
                drawBody: true,
              },
            })
          );

          clearInterval(interval);
        }
      }, 300);
    }
  }, []);

  return <TradingViewWrapperBody />;
}
