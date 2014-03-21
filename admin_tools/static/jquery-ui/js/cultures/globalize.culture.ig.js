/*
 * Globalize Culture ig
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * This file was generated by the Globalize Culture Generator
 * Translation: bugs found in this file need to be fixed in the generator
 */

(function (window, undefined) {

    var Globalize;

    if (typeof require !== "undefined" &&
        typeof exports !== "undefined" &&
        typeof module !== "undefined") {
        // Assume CommonJS
        Globalize = require("globalize");
    } else {
        // Global variable
        Globalize = window.Globalize;
    }

    Globalize.addCultureInfo("ig", "default", {
        name: "ig",
        englishName: "Igbo",
        nativeName: "Igbo",
        language: "ig",
        numberFormat: {
            currency: {
                pattern: ["$-n", "$ n"],
                symbol: "N"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Aiku", "Aje", "Isegun", "Ojo'ru", "Ojo'bo", "Eti", "Abameta"],
                    namesAbbr: ["Aik", "Aje", "Ise", "Ojo", "Ojo", "Eti", "Aba"],
                    namesShort: ["A", "A", "I", "O", "O", "E", "A"]
                },
                months: {
                    names: ["Onwa mbu", "Onwa ibua", "Onwa ato", "Onwa ano", "Onwa ise", "Onwa isi", "Onwa asa", "Onwa asato", "Onwa itolu", "Onwa iri", "Onwa iri n'ofu", "Onwa iri n'ibua", ""],
                    namesAbbr: ["mbu.", "ibu.", "ato.", "ano.", "ise", "isi", "asa", "asa.", "ito.", "iri.", "n'of.", "n'ib.", ""]
                },
                AM: ["Ututu", "ututu", "UTUTU"],
                PM: ["Efifie", "efifie", "EFIFIE"],
                eras: [
                    {"name": "AD", "start": null, "offset": 0}
                ],
                patterns: {
                    d: "d/M/yyyy"
                }
            }
        }
    });

}(this));
