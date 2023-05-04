import React, { useEffect } from "react";
import { IChartingLibraryWidget } from "../../interfaces/IChartingLibraryWidget";
import { createWidgetOptions } from "../../utils/createWidgetOptions";
import "./TradingViewWrapperBody.css";

export const TradingViewWrapperBody: React.FC<{}> = (props) => {
  const containerId = "tv";
  const tvWidget = React.useRef<IChartingLibraryWidget | null>(null);

  useEffect(() => {
    const widgetOptions = {
      ...createWidgetOptions(containerId),
      // ...{
      //   custom_indicators_getter: customIndicatorsGetter,
      // },
    };

    (tvWidget as { current: any }).current = new window.TradingView.widget(
      widgetOptions
    );
  }, []);

  return (
    <>
      <div className="TradingViewWrapperBody" id={containerId}></div>
    </>
  );
};
