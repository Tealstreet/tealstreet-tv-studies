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
 * EMA Ribbon displays 10 EMAs of different lengths in one indicator for ease of management
 * @author Lmvdzande
 * @param PineJS
 * @returns EMA Ribbon for Trading View Charting Library
 */

export function EMA_Ribbon(PineJS: any) {
    return {
        name: "EMA Ribbon",
        metainfo: {
            name: "EMA Ribbon",
            _metainfoVersion: 52,
            id: "ema-ribbon-1.0.0@tv-basicstudies-1",
            description: "EMA Ribbon",
            shortDescription: "EMA Ribbon",
            is_hidden_study: false,
            is_price_study: true,
            isTVScript: false,
            isTVScriptStub: false,
            format: {
                type: "price",
                precision: 2,
            },
            plots: [
                { id: "ema1", type: "line" },
                { id: "ema2", type: "line" },
                { id: "ema3", type: "line" },
                { id: "ema4", type: "line" },
                { id: "ema5", type: "line" },
                { id: "ema6", type: "line" },
                { id: "ema7", type: "line" },
                { id: "ema8", type: "line" },
                { id: "ema9", type: "line" },
                { id: "ema10", type: "line" },

            ],
            defaults: {
                inputs: {
                    source: "hlc3",
                    ema1_length: 8,
                    ema2_length: 14,
                    ema3_length: 21,
                    ema4_length: 25,
                    ema5_length: 30,
                    ema6_length: 35,
                    ema7_length: 40,
                    ema8_length: 45,
                    ema9_length: 50,
                    ema10_length: 55,
                },
            },
            styles: {
                ema1: {
                    title: "EMA 1",
                    linestyle: 0,
                    plottype: 0,
                    visible: true,
                    linewidth: 1,
                    color: "#f5eb5d",
                    transparency: 0
                },
                ema2: {
                    title: "EMA 2",
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    linewidth: 1,
                    color: "#f5b771",
                    transparency: 0
                },
                ema3: {
                    title: "EMA 3",
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    linewidth: 1,
                    color: "#f5b056",
                    transparency: 0
                },
                ema4: {
                    title: "EMA 4",
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    linewidth: 1,
                    color: "#f57b4e",
                    transparency: 0
                },
                ema5: {
                    title: "EMA 5",
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    linewidth: 1,
                    color: "#f56d58",
                    transparency: 0
                },
                ema6: {
                    title: "EMA 6",
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    linewidth: 2,
                    color: "#f55151",
                    transparency: 0
                },
                ema7: {
                    title: "EMA 7",
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    linewidth: 2,
                    color: "#f55151",
                    transparency: 0
                },
                ema8: {
                    title: "EMA 8",
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    linewidth: 2,
                    color: "#aa2707",
                    transparency: 0
                },
                ema9: {
                    title: "EMA 9",
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    linewidth: 2,
                    color: "#c32500",
                    transparency: 0
                },
                ema10: {
                    title: "EMA 10",
                    linestyle: 0,
                    plotstyle: 0,
                    visible: true,
                    linewidth: 2,
                    color: "#cc0000",
                    transparency: 0
                },
            },
            inputs: [
                {
                    id: "source",
                    name: "Source",
                    type: "source"
                },
                {
                    id: "ema1_length",
                    name: "EMA 1 Length",
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "ema2_length",
                    name: "EMA 2 Length",
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "ema3_length",
                    name: "EMA 3 Length",
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "ema4_length",
                    name: "EMA 4 Length",
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "ema5_length",
                    name: "EMA 5 Length",
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "ema6_length",
                    name: "EMA 6 Length",
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "ema7_length",
                    name: "EMA 7 Length",
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "ema8_length",
                    name: "EMA 8 Length",
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "ema9_length",
                    name: "EMA 9 Length",
                    type: "integer",
                    min: 1,
                    max: 10000,
                },
                {
                    id: "ema10_length",
                    name: "EMA 10 Length",
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

                this._context.select_sym(1);
                var source = this._context.new_unlimited_var(PineJS.Std[this._input(0)](this._context))

                return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => PineJS.Std.ema(source, this._input(index), this._context))

            };
        },
    };
}
