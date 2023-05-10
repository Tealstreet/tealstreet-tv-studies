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

import { PineJS, IContext } from "../charting_library";

/**
 * Port of PVSRA from Trader's Reality to PineJS
 * @author Lmvdzande
 * @param PineJS
 * @returns PVSRA Indicator for Trading View Charting Library
 */

export function SmoothedVWAP(PineJS: PineJS) {
    return {
        name: "Smoothed VWAP",
        metainfo: {
            name: "Smoothed VWAP",
            _metainfoVersion: 52,
            id: "smoothed-vwap@tv-basicstudies-1",
            description: "Smoothed VWAP",
            shortDescription: "Smoothed VWAP",
            is_hidden_study: false,
            is_price_study: true,
            isTVScript: false,
            isTVScriptStub: false,
            format: {
                type: "price",
                precision: 2,
            },
            plots: [
                // vwap
                { id: "vwap", type: "line", palette: "palette_0" },
                // vwap color
                {
                    id: "vwapColor",
                    type: "colorer",
                    target: "vwap",
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
                                color: "#0000FF",
                                style: 0,
                                width: 1,
                            }
                        ]
                    },
                },
                styles: {
                    vwap: {
                        linestyle: 0,
                        plottype: 0,
                        visible: true,
                        linewidth: 1,
                        color: "#0000FF",
                    },
                },
                inputs: {
                    // vwap_length: 60 * 24,
                    smoothing: 'ema',
                    smoothing_length: 21,
                    source: 'hlc3'
                },
            },
            styles: {
                vwap: {
                    title: "VWAP Color"
                }
            },
            inputs: [
                // {
                //     id: "vwap_length",
                //     name: "VWAP Bars Length",
                //     defval: 60 * 24, // 1 day
                //     type: "integer",
                //     min: 1,
                //     max: 10000,
                // },
                {
                    id: "smoothing",
                    name: "Smoothing",
                    type: "text",
                    defval: 'ema',
                    options: [
                        'sma',
                        'rma',
                        'ema',
                        'wma',
                        'vwma',
                        'swma'
                    ]
                },
                {
                    id: "smoothing_length",
                    name: "Source Bars Length",
                    defval: 21, //
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "source",
                    name: "Source",
                    type: "source",
                    defval: 'hlc3',
                    options: [
                        'open',
                        'high',
                        'low',
                        'close',
                        'hl2',
                        'hlc3',
                        'ohlc4'
                    ]
                },

            ],
        },
        constructor: function () {
            this.init = function (context, inputCallback) {
                this._context = context;
                this._input = inputCallback;
                this._isNewSession = null;

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

            this.add_hist = function (variable: any) {
                variable.hist = null;
                variable.add_hist();
            }

            this.main = function (context: IContext, inputCallback) {
                this._context = context;
                this._input = inputCallback;

                // const vwap_length = this._input(0);

                const smoothing = this._input(0);
                const smoothing_length = this._input(1);

                const source = this._input(2);

                // this._context.setMinimumAdditionalDepth(PineJS.Std.max(smoothing_length, vwap_length));
                this._context.select_sym(1);

                const time = this._context.symbol.time;
                const numerator = this._context.new_var()
                const denominator = this._context.new_var()

                // setup new session check function
                if (time && this._isNewSession === null) {
                    this._isNewSession = PineJS.Std.createNewSessionCheck(this._context)
                }

                // when new session append to history
                if (this._isNewSession(time)) {
                    this.add_hist(numerator)
                    this.add_hist(denominator)
                }

                const volume = PineJS.Std.volume(this._context);
                // const volumeHistory = this._context.new_var(volume);
                const source_data = PineJS.Std[source](this._context);
                const sourceHistory = this._context.new_var(source_data);
                const smoothedSource = (PineJS.Std[smoothing])(sourceHistory, smoothing_length, this._context)
                // const cumVolume = PineJS.Std.sum(volumeHistory, vwap_length, this._context);

                // set the numerator to: previous numerator value + (volume * smoothedSource)
                numerator.set(PineJS.Std.nz(numerator.get(1), 0) + (volume * smoothedSource))
                // set the denominator to: previous denominator value + volume
                // cumulative volume
                denominator.set(PineJS.Std.nz(denominator.get(1), 0) + volume)

                const vwap = numerator.get() / denominator.get(0)

                return [vwap]

            };
        },
    };
}
