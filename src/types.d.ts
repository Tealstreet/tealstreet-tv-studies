class TvWidget<T> {
  constructor(public readonly TvWidgetClass: new () => T) {}
}

class UDFCompatibleDatafeed<T> {
  constructor(public readonly UDFCompatibleDatafeedClass: new () => T) {}
}

interface Window {
  TradingView: {
    widget: TvWidget;
  };
  Datafeeds: {
    UDFCompatibleDatafeed: UDFCompatibleDatafeed;
  };
}
