/**
 * Copyright 2023 https://github.com/lmvdz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// import { PineJS } from "../charting_library";

/**
 * BINANCE:BTCUSDT.P_OI Indicator
 * @author Lmvdzande
 * @param PineJS
 * @returns BINANCE:BTCUSDT.P_OI Indicator for Trading View Charting Library
 */

export function BTC_OI(PineJS: any) {
    return {
        name: "BTC Open Interest",
        metainfo: {
            name: "BTC Open Interest",
            _metainfoVersion: 52,
            id: "btc-open-interest-1.0.0@tv-basicstudies-1",
            description: "BTC Open Interest",
            shortDescription: "BTC Open Interest",
            is_hidden_study: false,
            is_price_study: false,
            isTVScript: false,
            isTVScriptStub: false,
            format: {
                type: "price",
                precision: 2,
            },
            ohlcPlots: {
                plot_candle: {
                    title: 'Candles',
                },
            },
            plots: [
                {
                    id: 'plot_ema',
                    type: 'line',
                },
                {
                    id: 'plot_open',
                    type: 'ohlc_open',
                    target: 'plot_candle',
                },
                {
                    id: 'plot_high',
                    type: 'ohlc_high',
                    target: 'plot_candle',
                },
                {
                    id: 'plot_low',
                    type: 'ohlc_low',
                    target: 'plot_candle',
                },
                {
                    id: 'plot_close',
                    type: 'ohlc_close',
                    target: 'plot_candle',
                },
                {
                    id: 'plot_bar_color',
                    type: 'ohlc_colorer',
                    palette: 'palette_bar',
                    target: 'plot_candle',
                },
                {
                    id: 'plot_wick_color',
                    type: 'wick_colorer',
                    palette: 'palette_wick',
                    target: 'plot_candle',
                },
                {
                    id: 'plot_border_color',
                    type: 'border_colorer',
                    palette: 'palette_border',
                    target: 'plot_candle',
                },
            ],
            defaults: {
                ohlcPlots: {
                    plot_candle: {
                        borderColor: '#000000',
                        color: '#000000',
                        drawBorder: true,
                        drawWick: true,
                        plottype: 'ohlc_candles',
                        visible: true,
                        wickColor: '#000000',
                    },
                },
                palettes: {
                    palette_bar: {
                        colors: [
                            { color: "#999999", style: 0, width: 1 },
                            { color: "#4d4d4d", style: 0, width: 1 },
                        ]
                    },
                    palette_wick: {
                        colors: [
                            { color: "#999999", style: 0, width: 1 },
                            { color: "#4d4d4d", style: 0, width: 1 },
                        ],
                    },
                    palette_border: {
                        colors: [
                            { color: "#999999", style: 0, width: 1 },
                            { color: "#4d4d4d", style: 0, width: 1 },
                        ],
                    },
                },
                styles: {
                    // histogram: {
                    //     linestyle: 0,
                    //     plottype: 5,
                    //     visible: true,
                    //     linewidth: 10,
                    //     color: "#000000",
                    // },
                },
                inputs: {
                    ema_enabled: false,
                    ema_length: 21
                },
            },
            palettes: {
                palette_wick: {
                    colors: [
                        { name: "Candle Up Wick Color" },
                        { name: "Candle Down Wick Color" },
                    ],

                    valToIndex: {
                        0: 0,
                        1: 1
                    },
                },
                palette_border: {
                    colors: [
                        { name: "Candle Up Border Color" },
                        { name: "Candle Down Border Color" },
                    ],

                    valToIndex: {
                        0: 0,
                        1: 1,
                    },
                },
                palette_bar: {
                    colors: [
                        { name: "Cand Up Color" },
                        { name: "Candle Down Color" }
                    ],
                    valToIndex: {
                        0: 0,
                        1: 1
                    },
                },
            },
            styles: {
                ema: {
                    title: "EMA Color",
                    color: "#FFFFFF",
                    linewidth: 1,
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    transparency: 0
                }
            },
            inputs: [
                {
                    id: "ema_enabled",
                    name: "EMA Enabled",
                    defval: false,
                    type: "bool"
                },
                {
                    id: "ema_length",
                    name: "Length",
                    defval: 21,
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
            ],
        },
        constructor: function () {
            this.init = function (context, inputCallback) {
                this._context = context;
                this._input = inputCallback;

                // Define the symbol to be plotted.
                // Symbol should be a string.
                // You can use PineJS.Std.ticker(this._context) to get the selected symbol's ticker.
                // For example,
                //    var symbol = 'AAPL';
                //    var symbol = '#EQUITY';
                //    var symbol = PineJS.Std.ticker(this._context) + '#TEST';
                this._context.new_sym(
                    "BINANCE:BTCUSDT.P",
                    PineJS.Std.period(this._context)
                )
                this._context.new_sym(
                    "BINANCE:BTCUSDT.P_OI",
                    PineJS.Std.period(this._context)
                );
            };

            this.main = function (context, inputCallback) {
                this._context = context;
                this._input = inputCallback;

                const ema_enabled = this._input(0);
                const ema_length = this._input(1);
                this._context.setMinimumAdditionalDepth(ema_length);

                this._context.select_sym(1);
                const btc_low = PineJS.Std.low(this._context);
                const btc_high = PineJS.Std.high(this._context);
                const btc_open = PineJS.Std.open(this._context);
                const btc_close = PineJS.Std.close(this._context);

                this._context.select_sym(2);

                const oi_low = PineJS.Std.low(this._context);
                const oi_high = PineJS.Std.high(this._context);
                const oi_open = PineJS.Std.open(this._context);
                const oi_close = PineJS.Std.close(this._context);

                const btc_oi_open = (oi_open * btc_open)
                const btc_oi_high = (btc_high * oi_high)
                const btc_oi_low = (btc_low * oi_low)
                const btc_oi_close = (btc_close * oi_close)

                const color = btc_oi_close > btc_oi_open ? 0 : 1

                let ema = NaN;
                if (ema_enabled) {
                    const btc_oi_ohlc = this._cintext.new_var((btc_oi_open + btc_oi_high + btc_oi_low + btc_oi_close) / 4)
                    ema = PineJS.Std.ema(btc_oi_ohlc, ema_length, this._context);
                }

                return [
                    ema, btc_oi_open, btc_oi_high, btc_oi_low, btc_oi_close, color, color, color
                ];
            };
        },
    };
}
