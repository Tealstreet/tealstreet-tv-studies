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


// import { PineJS, IContext } from "../charting_library";

/**
 * Port of PVSRA from Trader's Reality to PineJS
 * @author Lmvdzande
 * @param PineJS
 * @returns PVSRA Indicator for Trading View Charting Library
 */

export function SmoothedVWAP(PineJS: any) {
    return {
        name: "Smoothed VWAP",
        metainfo: {
            name: "Smoothed VWAP",
            _metainfoVersion: 52,
            id: "smoothed-vwap-1.0.0@tv-basicstudies-1",
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
                { id: "vwap", type: "line" },
                { id: "vwap_stdev_inner_upper", type: "line" },
                { id: "vwap_stdev_outer_upper", type: "line" },
                { id: "vwap_stdev_inner_lower", type: "line" },
                { id: "vwap_stdev_outer_lower", type: "line" },

            ],
            defaults: {

                styles: {
                    vwap: {
                        linestyle: 0,
                        plottype: 0,
                        visible: true,
                        linewidth: 1,
                        color: "#0000FF",
                    },
                    vwap_stdev_inner_upper: {
                        linestyle: 0,
                        plottype: 0,
                        visible: true,
                        linewidth: 1,
                        color: "#00FFFF",
                    },
                    vwap_stdev_outer_upper: {
                        linestyle: 0,
                        plottype: 0,
                        visible: true,
                        linewidth: 1,
                        color: "#FF00FF",
                    },
                    vwap_stdev_inner_lower: {
                        linestyle: 0,
                        plottype: 0,
                        visible: true,
                        linewidth: 1,
                        color: "#00FFFF",
                    },
                    vwap_stdev_outer_lower: {
                        linestyle: 0,
                        plottype: 0,
                        visible: true,
                        linewidth: 1,
                        color: "#FF00FF",
                    },
                },
                inputs: {
                    smoothing: 'ema',
                    smoothing_length: 21,
                    source: 'hlc3',
                    stdev_enable: true,
                    inner_channel_stdev_factor: 1,
                    outter_channel_stdev_factor: 2,
                    stdev_length: 20
                },
            },
            styles: {
                vwap: {
                    title: "VWAP Color"
                },
                vwap_stdev_inner_upper: {
                    title: "VWAP Standard Deviation Inner Upper Color"
                },
                vwap_stdev_outer_upper: {
                    title: "VWAP Standard Deviation Outer Upper Color"
                },
                vwap_stdev_inner_lower: {
                    title: "VWAP Standard Deviation Inner Lower Color"
                },
                vwap_stdev_outer_lower: {
                    title: "VWAP Standard Deviation Outer Lower Color"
                }
            },
            inputs: [
                {
                    id: "smoothing",
                    name: "Smoothing",
                    type: "text",
                    defval: 'ema',
                    options: [
                        'none',
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
                {
                    id: 'stdev_enable',
                    name: "Use Standard Deviation",
                    type: "bool",
                    defval: true
                },
                {
                    id: 'inner_channel_stdev_factor',
                    name: "Standard Deviation Inner Channel Factor",
                    type: "float",
                    defval: 1, //
                    min: 0.1,
                    max: 10000
                },
                {
                    id: 'outter_channel_stdev_factor',
                    name: "Standard Deviation Outer Channel Factor",
                    type: "float",
                    defval: 2, //
                    min: 0.1,
                    max: 10000
                },
                {
                    id: 'stdev_length',
                    name: "Standard Deviation Length",
                    type: "integer",
                    defval: 20, //
                    min: 1,
                    max: 10000
                }

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

            this.add_hist = function (variable: any) {
                variable.hist = null;
                variable.add_hist();
            }

            this.main = function (context, inputCallback) {
                this._context = context;
                this._input = inputCallback;

                // const vwap_length = this._input(0);

                const smoothing = this._input(0);
                const smoothing_length = this._input(1);

                const source = this._input(2);

                const stdev_enable = this._input(3)
                const inner_channel_stdev_factor = this._input(4);
                const outter_channel_stdev_factor = this._input(5);
                const stdev_length = this._input(4)

                // this._context.setMinimumAdditionalDepth(PineJS.Std.max(smoothing_length, vwap_length));
                this._context.select_sym(1);

                const time = this._context.symbol.time;
                const vwap_numerator = this._context.new_var()
                const vwap_denominator = this._context.new_var()
                let std_inner_upper_numerator = null;
                let std_outter_upper_denominator = null;
                let std_inner_lower_numerator = null;
                let std_outter_lower_denominator = null;

                if (stdev_enable) {
                    std_inner_upper_numerator = this._context.new_var()
                    std_outter_upper_denominator = this._context.new_var()
                    std_inner_lower_numerator = this._context.new_var()
                    std_outter_lower_denominator = this._context.new_var()
                }

                // when new session append to history
                if (time && PineJS.Std.createNewSessionCheck(this._context)(time)) {
                    this.add_hist(vwap_numerator)
                    this.add_hist(vwap_denominator)
                    if (stdev_enable) {
                        this.add_hist(std_inner_upper_numerator)
                        this.add_hist(std_outter_upper_denominator)
                        this.add_hist(std_inner_lower_numerator)
                        this.add_hist(std_outter_lower_denominator)
                    }
                }

                const volume = PineJS.Std.volume(this._context);
                // const volumeHistory = this._context.new_var(volume);
                const source_data = PineJS.Std[source](this._context);
                const sourceHistory = this._context.new_var(source_data);
                const smoothedSource = smoothing !== 'none' ? (PineJS.Std[smoothing])(sourceHistory, smoothing_length, this._context) : source_data;

                // const cumVolume = PineJS.Std.sum(volumeHistory, vwap_length, this._context);

                vwap_numerator.set(PineJS.Std.nz(vwap_numerator.get(1), 0) + (volume * smoothedSource))
                vwap_denominator.set(PineJS.Std.nz(vwap_denominator.get(1), 0) + volume)
                const vwap = vwap_numerator.get(0) / vwap_denominator.get(0)
                const vwapHistory = this._context.new_var(vwap);

                if (stdev_enable) {
                    let stdev = PineJS.Std.stdev(vwapHistory, stdev_length, this._context);

                    let stdDevInnerUpper = vwap + (inner_channel_stdev_factor * stdev)
                    let stdDevOuterUpper = vwap + (outter_channel_stdev_factor * stdev)

                    let stdDevInnerLower = vwap - (inner_channel_stdev_factor * stdev)
                    let stdDevOuterLower = vwap - (outter_channel_stdev_factor * stdev)

                    std_inner_upper_numerator.set(PineJS.Std.nz(std_inner_upper_numerator.get(1), 0) + (volume * stdDevInnerUpper))
                    std_outter_upper_denominator.set(PineJS.Std.nz(std_outter_upper_denominator.get(1), 0) + (volume * stdDevOuterUpper))
                    std_inner_lower_numerator.set(PineJS.Std.nz(std_inner_lower_numerator.get(1), 0) + (volume * stdDevInnerLower))
                    std_outter_lower_denominator.set(PineJS.Std.nz(std_outter_lower_denominator.get(1), 0) + (volume * stdDevOuterLower))
                }

                let vwapStdDevInnerUpper = NaN
                let vwapStdDevOuterUpper = NaN
                let vwapStdDevInnerLower = NaN
                let vwapStdDevOuterLower = NaN

                if (stdev_enable) {
                    vwapStdDevInnerUpper = std_inner_upper_numerator.get(0) / vwap_denominator.get(0)
                    vwapStdDevOuterUpper = std_outter_upper_denominator.get(0) / vwap_denominator.get(0)
                    vwapStdDevInnerLower = std_inner_lower_numerator.get(0) / vwap_denominator.get(0)
                    vwapStdDevOuterLower = std_outter_lower_denominator.get(0) / vwap_denominator.get(0)
                }

                return [vwap, vwapStdDevInnerUpper, vwapStdDevOuterUpper, vwapStdDevInnerLower, vwapStdDevOuterLower]

            };
        },
    };
}
