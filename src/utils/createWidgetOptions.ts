// TV widget options
// see TV documentation

import { BUY_COLOR, SELL_COLOR } from "../constants";

// https://github.com/tradingview/charting_library/wiki
export function createWidgetOptions(containerId: string) {
  const libraryPath = "/charting_library/";
  const favorites = {
    intervals: ["15S", "30S", "1", "5", "30", "60", "240"],
    chartTypes: ["Area", "Line"],
  };
  const fullscreen = false;
  const autosize = true;

  return {
    debug: false,
    theme: "Dark",
    favorites: favorites,
    symbol: `AAPL`,
    interval: "D",
    container: containerId,
    datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
      "https://demo-feed-data.tradingview.com"
    ),
    library_path: libraryPath,
    locale: "en",
    loading_screen: {
      backgroundColor: "#30303d",
      foregroundColor: "#30303d",
    },
    // https://github.com/tradingview/charting_library/issues/6254
    // add 'seconds_resolution' for seconds support and check datafeed for correct multipliers
    enabled_features: [
      "study_templates",
      "hide_left_toolbar_by_default",
      "seconds_resolution",
    ],
    disabled_features: [
      // 'header_symbol_search', // disables and hides the search input field,
      "trading_account_manager",
      "trading_notifications",
      "order_panel",
      "show_object_tree",
      "buy_sell_button",
      "timeframes_toolbar",
      "support_multicharts",
      "header_layouttoggle",
    ],
    // only support chart saving / loading if logged in
    client_id: "tealstreet_web",
    load_last_chart: true,
    auto_save_delay: 5,
    fullscreen: fullscreen,
    autosize: autosize,
    studies_overrides: {
      "volume.volume.color.0": SELL_COLOR,
      "volume.volume.color.1": BUY_COLOR,
    },
    overrides: {
      "mainSeriesProperties.showCountdown": true,
      "paneProperties.background": "#23232e",
      "paneProperties.vertGridProperties.color": "#363c4e",
      "paneProperties.horzGridProperties.color": "#363c4e",
      // 'symbolWatermarkProperties.transparency': 90,
      "scalesProperties.textColor": "#AAA",
      // 'mainSeriesProperties.candleStyle.upColor': '#0ba7da',
      // 'mainSeriesProperties.candleStyle.wickUpColor': '#018ebb',
      // 'mainSeriesProperties.candleStyle.borderUpColor': '#018ebb',
      // 'mainSeriesProperties.candleStyle.downColor': '#fa6b67',
      // 'mainSeriesProperties.candleStyle.wickDownColor': '#fa6b67',
      // 'mainSeriesProperties.candleStyle.borderDownColor': '#fa6b67',
      "tradingProperties.lineStyle": 2,
      "tradingProperties.lineLength": 80,
      // 'mainSeriesProperties.bidAsk.askLineColor': '#e80cc7',
    },
    broker_config: {
      customUI: {
        showOrderDialog: () => console.log("Order Dialog not supported."),
        showPositionDialog: () => console.log("Position Dialog not supported."),
      },
      configFlags: {
        calculatePLUsingLast: true,
        supportBottomWidget: true,
        supportCloseOrder: false,
        supportPLUpdate: false,
        supportLevel2Data: false,
        showQuantityInsteadOfAmount: false,
        supportEditAmount: false,
        supportModifyDuration: true,
        supportModifyOrderPrice: true,
        supportOrdersHistory: false,
        supportTradeBrackets: false,
        supportMarketBrackets: false,
        supportAddBracketsToExistingOrder: true,
        supportTrailingStop: false,
      },
      durations: [
        { name: "DAY", value: "DAY" },
        { name: "GTC", value: "GTC" },
      ],
    },
  };
}
