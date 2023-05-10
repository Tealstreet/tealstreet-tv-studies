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
 * Port of PVSRA from Trader's Reality to PineJS
 * @author Lmvdzande
 * @param PineJS
 * @returns PVSRA Indicator for Trading View Charting Library
 */

export function PVSRA_Histogram(PineJS: any) {
    return {
        name: "PVSRA Histogram",
        metainfo: {
            name: "PVSRA Histogram",
            _metainfoVersion: 52,
            id: "pvsra-histogram@tv-basicstudies-1",
            description: "PVSRA Histogram",
            shortDescription: "PVSRA Histogram",
            is_hidden_study: false,
            is_price_study: false,
            isTVScript: false,
            isTVScriptStub: false,
            format: {
                type: "volume",
                precision: 2,
            },
            ohlcPlots: {
                plot_candle: {
                    title: 'Candles',
                },
            },
            plots: [
                // histogram
                { id: "histogram", type: "line", palette: "palette_0" },
                // histogram color
                {
                    id: "hColor",
                    type: "colorer",
                    target: "histogram",
                    palette: "palette_0",
                },
            ],
            defaults: {

                palettes: {

                    palette_0: {
                        // palette colors
                        // change it to the default colors that you prefer,
                        // but note that the user can change them in the Style tab
                        // of indicator properties
                        colors: [
                            {
                                color: "#FF0000",
                                style: 0,
                                width: 1,
                            },
                            { color: "#00FF00", style: 0, width: 1 },
                            { color: "#7F00FF", style: 0, width: 1 },
                            { color: "#0000FF", style: 0, width: 1 },
                            { color: "#999999", style: 0, width: 1 },
                            { color: "#4d4d4d", style: 0, width: 1 },
                        ]
                    },
                },
                styles: {
                    histogram: {
                        linestyle: 0,
                        plottype: 5,
                        visible: true,
                        linewidth: 10,
                        color: "#000000",
                    },
                },
                inputs: {
                    length: 10,
                },
            },
            palettes: {
                palette_0: {
                    colors: [
                        { name: "Red Vector Histogram Color" },
                        { name: "Green Vector Histogram Color" },
                        { name: "Violet Vector Histogram Color" },
                        { name: "Blue Vector Histogram Color" },
                        { name: "Regular Candle Up Histogram Color" },
                        { name: "Regular Candle Down Histogram Color" },
                    ],
                    valToIndex: {
                        0: 0,
                        1: 1,
                        2: 2,
                        3: 3,
                        4: 4,
                        5: 5,
                    },
                },
            },
            styles: {
                histogram: {
                    title: "Volume Colors",
                    histogramBase: 0,
                },
                hColorer: {
                    title: "Histogram Colors",
                },
            },
            inputs: [
                {
                    id: "length",
                    name: "Length",
                    defval: 10,
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
                    PineJS.Std.ticker(this._context),
                    PineJS.Std.period(this._context)
                );
            };

            this.main = function (context, inputCallback) {
                this._context = context;
                this._input = inputCallback;

                const length = this._input(0);
                this._context.setMinimumAdditionalDepth(length);
                this._context.select_sym(1);

                // var time0 = this._context.new_var(this._context.symbol.time);

                const volume = PineJS.Std.volume(this._context);
                const low = PineJS.Std.low(this._context);
                const high = PineJS.Std.high(this._context);
                const volumeSpread = volume * (high - low);

                const volumeSeries = this._context.new_var(volume);
                const volumeSpreadSeries = this._context.new_var(volumeSpread);

                const open = PineJS.Std.open(this._context);
                const close = PineJS.Std.close(this._context);

                const averageVolume =
                    PineJS.Std.sum(volumeSeries, length, this._context) / length;
                const highestVolumeSpread = PineJS.Std.highest(
                    volumeSpreadSeries,
                    length,
                    this._context
                );

                const color =
                    volume >= 2 * averageVolume || volumeSpread >= highestVolumeSpread
                        ? close > open
                            ? 1
                            : 0
                        : volume >= 1.5 * averageVolume
                            ? close > open
                                ? 3
                                : 2
                            : close > open
                                ? 4
                                : 5;

                return [
                    PineJS.Std.abs(volumeSeries),
                    color
                ];
            };
        },
    };
}
