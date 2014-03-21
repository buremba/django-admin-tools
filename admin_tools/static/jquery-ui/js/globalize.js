(function (e, t) {
    var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N;
    n = function (e) {
        return new n.prototype.init(e)
    };
    if (typeof require !== "undefined" && typeof exports !== "undefined" && typeof module !== "undefined") {
        module.exports = n
    } else {
        e.Globalize = n
    }
    n.cultures = {};
    n.prototype = {constructor: n, init: function (e) {
        this.cultures = n.cultures;
        this.cultureSelector = e;
        return this
    }};
    n.prototype.init.prototype = n.prototype;
    n.cultures["default"] = {name: "en", englishName: "English", nativeName: "English", isRTL: false, language: "en", numberFormat: {pattern: ["-n"], decimals: 2, ",": ",", ".": ".", groupSizes: [3], "+": "+", "-": "-", NaN: "NaN", negativeInfinity: "-Infinity", positiveInfinity: "Infinity", percent: {pattern: ["-n %", "n %"], decimals: 2, groupSizes: [3], ",": ",", ".": ".", symbol: "%"}, currency: {pattern: ["($n)", "$n"], decimals: 2, groupSizes: [3], ",": ",", ".": ".", symbol: "$"}}, calendars: {standard: {name: "Gregorian_USEnglish", "/": "/", ":": ":", firstDay: 0, days: {names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}, months: {names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""], namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]}, AM: ["AM", "am", "AM"], PM: ["PM", "pm", "PM"], eras: [
        {name: "A.D.", start: null, offset: 0}
    ], twoDigitYearMax: 2029, patterns: {d: "M/d/yyyy", D: "dddd, MMMM dd, yyyy", t: "h:mm tt", T: "h:mm:ss tt", f: "dddd, MMMM dd, yyyy h:mm tt", F: "dddd, MMMM dd, yyyy h:mm:ss tt", M: "MMMM dd", Y: "yyyy MMMM", S: "yyyy'-'MM'-'dd'T'HH':'mm':'ss"}}}, messages: {}};
    n.cultures["default"].calendar = n.cultures["default"].calendars.standard;
    n.cultures.en = n.cultures["default"];
    n.cultureSelector = "en";
    r = /^0x[a-f0-9]+$/i;
    i = /^[+\-]?infinity$/i;
    s = /^[+\-]?\d*\.?\d*(e[+\-]?\d+)?$/;
    o = /^\s+|\s+$/g;
    u = function (e, t) {
        if (e.indexOf) {
            return e.indexOf(t)
        }
        for (var n = 0, r = e.length; n < r; n++) {
            if (e[n] === t) {
                return n
            }
        }
        return-1
    };
    a = function (e, t) {
        return e.substr(e.length - t.length) === t
    };
    f = function () {
        var e, n, r, i, s, o, u = arguments[0] || {}, a = 1, p = arguments.length, d = false;
        if (typeof u === "boolean") {
            d = u;
            u = arguments[1] || {};
            a = 2
        }
        if (typeof u !== "object" && !c(u)) {
            u = {}
        }
        for (; a < p; a++) {
            if ((e = arguments[a]) != null) {
                for (n in e) {
                    r = u[n];
                    i = e[n];
                    if (u === i) {
                        continue
                    }
                    if (d && i && (h(i) || (s = l(i)))) {
                        if (s) {
                            s = false;
                            o = r && l(r) ? r : []
                        } else {
                            o = r && h(r) ? r : {}
                        }
                        u[n] = f(d, o, i)
                    } else if (i !== t) {
                        u[n] = i
                    }
                }
            }
        }
        return u
    };
    l = Array.isArray || function (e) {
        return Object.prototype.toString.call(e) === "[object Array]"
    };
    c = function (e) {
        return Object.prototype.toString.call(e) === "[object Function]"
    };
    h = function (e) {
        return Object.prototype.toString.call(e) === "[object Object]"
    };
    p = function (e, t) {
        return e.indexOf(t) === 0
    };
    d = function (e) {
        return(e + "").replace(o, "")
    };
    v = function (e) {
        if (isNaN(e)) {
            return NaN
        }
        return Math[e < 0 ? "ceil" : "floor"](e)
    };
    m = function (e, t, n) {
        var r;
        for (r = e.length; r < t; r += 1) {
            e = n ? "0" + e : e + "0"
        }
        return e
    };
    g = function (e, t) {
        var n = 0, r = false;
        for (var i = 0, s = e.length; i < s; i++) {
            var o = e.charAt(i);
            switch (o) {
                case"'":
                    if (r) {
                        t.push("'")
                    } else {
                        n++
                    }
                    r = false;
                    break;
                case"\\":
                    if (r) {
                        t.push("\\")
                    }
                    r = !r;
                    break;
                default:
                    t.push(o);
                    r = false;
                    break
            }
        }
        return n
    };
    y = function (e, t) {
        t = t || "F";
        var n, r = e.patterns, i = t.length;
        if (i === 1) {
            n = r[t];
            if (!n) {
                throw"Invalid date format string '" + t + "'."
            }
            t = n
        } else if (i === 2 && t.charAt(0) === "%") {
            t = t.charAt(1)
        }
        return t
    };
    b = function (e, t, n) {
        function T(e, t) {
            var n, r = e + "";
            if (t > 1 && r.length < t) {
                n = c[t - 2] + r;
                return n.substr(n.length - t, t)
            } else {
                n = r
            }
            return n
        }

        function N() {
            if (h || p) {
                return h
            }
            h = d.test(t);
            p = true;
            return h
        }

        function C(e, t) {
            if (w) {
                return w[t]
            }
            switch (t) {
                case 0:
                    return e.getFullYear();
                case 1:
                    return e.getMonth();
                case 2:
                    return e.getDate();
                default:
                    throw"Invalid part value " + t
            }
        }

        var r = n.calendar, i = r.convert, s;
        if (!t || !t.length || t === "i") {
            if (n && n.name.length) {
                if (i) {
                    s = b(e, r.patterns.F, n)
                } else {
                    var o = new Date(e.getTime()), u = S(e, r.eras);
                    o.setFullYear(x(e, r, u));
                    s = o.toLocaleString()
                }
            } else {
                s = e.toString()
            }
            return s
        }
        var a = r.eras, f = t === "s";
        t = y(r, t);
        s = [];
        var l, c = ["0", "00", "000"], h, p, d = /([^d]|^)(d|dd)([^d]|$)/g, v = 0, m = E(), w;
        if (!f && i) {
            w = i.fromGregorian(e)
        }
        for (; ;) {
            var k = m.lastIndex, L = m.exec(t);
            var A = t.slice(k, L ? L.index : t.length);
            v += g(A, s);
            if (!L) {
                break
            }
            if (v % 2) {
                s.push(L[0]);
                continue
            }
            var O = L[0], M = O.length;
            switch (O) {
                case"ddd":
                case"dddd":
                    var _ = M === 3 ? r.days.namesAbbr : r.days.names;
                    s.push(_[e.getDay()]);
                    break;
                case"d":
                case"dd":
                    h = true;
                    s.push(T(C(e, 2), M));
                    break;
                case"MMM":
                case"MMMM":
                    var D = C(e, 1);
                    s.push(r.monthsGenitive && N() ? r.monthsGenitive[M === 3 ? "namesAbbr" : "names"][D] : r.months[M === 3 ? "namesAbbr" : "names"][D]);
                    break;
                case"M":
                case"MM":
                    s.push(T(C(e, 1) + 1, M));
                    break;
                case"y":
                case"yy":
                case"yyyy":
                    D = w ? w[0] : x(e, r, S(e, a), f);
                    if (M < 4) {
                        D = D % 100
                    }
                    s.push(T(D, M));
                    break;
                case"h":
                case"hh":
                    l = e.getHours() % 12;
                    if (l === 0)l = 12;
                    s.push(T(l, M));
                    break;
                case"H":
                case"HH":
                    s.push(T(e.getHours(), M));
                    break;
                case"m":
                case"mm":
                    s.push(T(e.getMinutes(), M));
                    break;
                case"s":
                case"ss":
                    s.push(T(e.getSeconds(), M));
                    break;
                case"t":
                case"tt":
                    D = e.getHours() < 12 ? r.AM ? r.AM[0] : " " : r.PM ? r.PM[0] : " ";
                    s.push(M === 1 ? D.charAt(0) : D);
                    break;
                case"f":
                case"ff":
                case"fff":
                    s.push(T(e.getMilliseconds(), 3).substr(0, M));
                    break;
                case"z":
                case"zz":
                    l = e.getTimezoneOffset() / 60;
                    s.push((l <= 0 ? "+" : "-") + T(Math.floor(Math.abs(l)), M));
                    break;
                case"zzz":
                    l = e.getTimezoneOffset() / 60;
                    s.push((l <= 0 ? "+" : "-") + T(Math.floor(Math.abs(l)), 2) + ":" + T(Math.abs(e.getTimezoneOffset() % 60), 2));
                    break;
                case"g":
                case"gg":
                    if (r.eras) {
                        s.push(r.eras[S(e, a)].name)
                    }
                    break;
                case"/":
                    s.push(r["/"]);
                    break;
                default:
                    throw"Invalid date format pattern '" + O + "'."
            }
        }
        return s.join("")
    };
    (function () {
        var e;
        e = function (e, t, n) {
            var r = n.groupSizes, i = r[0], s = 1, o = Math.pow(10, t), u = Math.round(e * o) / o;
            if (!isFinite(u)) {
                u = e
            }
            e = u;
            var a = e + "", f = "", l = a.split(/e/i), c = l.length > 1 ? parseInt(l[1], 10) : 0;
            a = l[0];
            l = a.split(".");
            a = l[0];
            f = l.length > 1 ? l[1] : "";
            if (c > 0) {
                f = m(f, c, false);
                a += f.slice(0, c);
                f = f.substr(c)
            } else if (c < 0) {
                c = -c;
                a = m(a, c + 1, true);
                f = a.slice(-c, a.length) + f;
                a = a.slice(0, -c)
            }
            if (t > 0) {
                f = n["."] + (f.length > t ? f.slice(0, t) : m(f, t))
            } else {
                f = ""
            }
            var h = a.length - 1, p = n[","], d = "";
            while (h >= 0) {
                if (i === 0 || i > h) {
                    return a.slice(0, h + 1) + (d.length ? p + d + f : f)
                }
                d = a.slice(h - i + 1, h + 1) + (d.length ? p + d : "");
                h -= i;
                if (s < r.length) {
                    i = r[s];
                    s++
                }
            }
            return a.slice(0, h + 1) + p + d + f
        };
        w = function (t, n, r) {
            if (!isFinite(t)) {
                if (t === Infinity) {
                    return r.numberFormat.positiveInfinity
                }
                if (t === -Infinity) {
                    return r.numberFormat.negativeInfinity
                }
                return r.numberFormat.NaN
            }
            if (!n || n === "i") {
                return r.name.length ? t.toLocaleString() : t.toString()
            }
            n = n || "D";
            var i = r.numberFormat, s = Math.abs(t), o = -1, u;
            if (n.length > 1)o = parseInt(n.slice(1), 10);
            var a = n.charAt(0).toUpperCase(), f;
            switch (a) {
                case"D":
                    u = "n";
                    s = v(s);
                    if (o !== -1) {
                        s = m("" + s, o, true)
                    }
                    if (t < 0)s = "-" + s;
                    break;
                case"N":
                    f = i;
                case"C":
                    f = f || i.currency;
                case"P":
                    f = f || i.percent;
                    u = t < 0 ? f.pattern[0] : f.pattern[1] || "n";
                    if (o === -1)o = f.decimals;
                    s = e(s * (a === "P" ? 100 : 1), o, f);
                    break;
                default:
                    throw"Bad number format specifier: " + a
            }
            var l = /n|\$|-|%/g, c = "";
            for (; ;) {
                var h = l.lastIndex, p = l.exec(u);
                c += u.slice(h, p ? p.index : u.length);
                if (!p) {
                    break
                }
                switch (p[0]) {
                    case"n":
                        c += s;
                        break;
                    case"$":
                        c += i.currency.symbol;
                        break;
                    case"-":
                        if (/[1-9]/.test(s)) {
                            c += i["-"]
                        }
                        break;
                    case"%":
                        c += i.percent.symbol;
                        break
                }
            }
            return c
        }
    })();
    E = function () {
        return/\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g
    };
    S = function (e, t) {
        if (!t)return 0;
        var n, r = e.getTime();
        for (var i = 0, s = t.length; i < s; i++) {
            n = t[i].start;
            if (n === null || r >= n) {
                return i
            }
        }
        return 0
    };
    x = function (e, t, n, r) {
        var i = e.getFullYear();
        if (!r && t.eras) {
            i -= t.eras[n].offset
        }
        return i
    };
    (function () {
        var e, t, n, r, i, s, o;
        e = function (e, t) {
            if (t < 100) {
                var n = new Date, r = S(n), i = x(n, e, r), s = e.twoDigitYearMax;
                s = typeof s === "string" ? (new Date).getFullYear() % 100 + parseInt(s, 10) : s;
                t += i - i % 100;
                if (t > s) {
                    t -= 100
                }
            }
            return t
        };
        t = function (e, t, n) {
            var r, i = e.days, a = e._upperDays;
            if (!a) {
                e._upperDays = a = [o(i.names), o(i.namesAbbr), o(i.namesShort)]
            }
            t = s(t);
            if (n) {
                r = u(a[1], t);
                if (r === -1) {
                    r = u(a[2], t)
                }
            } else {
                r = u(a[0], t)
            }
            return r
        };
        n = function (e, t, n) {
            var r = e.months, i = e.monthsGenitive || e.months, a = e._upperMonths, f = e._upperMonthsGen;
            if (!a) {
                e._upperMonths = a = [o(r.names), o(r.namesAbbr)];
                e._upperMonthsGen = f = [o(i.names), o(i.namesAbbr)]
            }
            t = s(t);
            var l = u(n ? a[1] : a[0], t);
            if (l < 0) {
                l = u(n ? f[1] : f[0], t)
            }
            return l
        };
        r = function (e, t) {
            var n = e._parseRegExp;
            if (!n) {
                e._parseRegExp = n = {}
            } else {
                var r = n[t];
                if (r) {
                    return r
                }
            }
            var i = y(e, t).replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1"), s = ["^"], o = [], u = 0, a = 0, f = E(), l;
            while ((l = f.exec(i)) !== null) {
                var c = i.slice(u, l.index);
                u = f.lastIndex;
                a += g(c, s);
                if (a % 2) {
                    s.push(l[0]);
                    continue
                }
                var h = l[0], p = h.length, d;
                switch (h) {
                    case"dddd":
                    case"ddd":
                    case"MMMM":
                    case"MMM":
                    case"gg":
                    case"g":
                        d = "(\\D+)";
                        break;
                    case"tt":
                    case"t":
                        d = "(\\D*)";
                        break;
                    case"yyyy":
                    case"fff":
                    case"ff":
                    case"f":
                        d = "(\\d{" + p + "})";
                        break;
                    case"dd":
                    case"d":
                    case"MM":
                    case"M":
                    case"yy":
                    case"y":
                    case"HH":
                    case"H":
                    case"hh":
                    case"h":
                    case"mm":
                    case"m":
                    case"ss":
                    case"s":
                        d = "(\\d\\d?)";
                        break;
                    case"zzz":
                        d = "([+-]?\\d\\d?:\\d{2})";
                        break;
                    case"zz":
                    case"z":
                        d = "([+-]?\\d\\d?)";
                        break;
                    case"/":
                        d = "(\\/)";
                        break;
                    default:
                        throw"Invalid date format pattern '" + h + "'."
                }
                if (d) {
                    s.push(d)
                }
                o.push(l[0])
            }
            g(i.slice(u), s);
            s.push("$");
            var v = s.join("").replace(/\s+/g, "\\s+"), m = {regExp: v, groups: o};
            return n[t] = m
        };
        i = function (e, t, n) {
            return e < t || e > n
        };
        s = function (e) {
            return e.split(" ").join(" ").toUpperCase()
        };
        o = function (e) {
            var t = [];
            for (var n = 0, r = e.length; n < r; n++) {
                t[n] = s(e[n])
            }
            return t
        };
        T = function (s, o, u) {
            s = d(s);
            var a = u.calendar, f = r(a, o), l = (new RegExp(f.regExp)).exec(s);
            if (l === null) {
                return null
            }
            var c = f.groups, h = null, v = null, m = null, g = null, y = null, b = 0, w, E = 0, S = 0, x = 0, T = null, N = false;
            for (var C = 0, k = c.length; C < k; C++) {
                var L = l[C + 1];
                if (L) {
                    var A = c[C], O = A.length, M = parseInt(L, 10);
                    switch (A) {
                        case"dd":
                        case"d":
                            g = M;
                            if (i(g, 1, 31))return null;
                            break;
                        case"MMM":
                        case"MMMM":
                            m = n(a, L, O === 3);
                            if (i(m, 0, 11))return null;
                            break;
                        case"M":
                        case"MM":
                            m = M - 1;
                            if (i(m, 0, 11))return null;
                            break;
                        case"y":
                        case"yy":
                        case"yyyy":
                            v = O < 4 ? e(a, M) : M;
                            if (i(v, 0, 9999))return null;
                            break;
                        case"h":
                        case"hh":
                            b = M;
                            if (b === 12)b = 0;
                            if (i(b, 0, 11))return null;
                            break;
                        case"H":
                        case"HH":
                            b = M;
                            if (i(b, 0, 23))return null;
                            break;
                        case"m":
                        case"mm":
                            E = M;
                            if (i(E, 0, 59))return null;
                            break;
                        case"s":
                        case"ss":
                            S = M;
                            if (i(S, 0, 59))return null;
                            break;
                        case"tt":
                        case"t":
                            N = a.PM && (L === a.PM[0] || L === a.PM[1] || L === a.PM[2]);
                            if (!N && (!a.AM || L !== a.AM[0] && L !== a.AM[1] && L !== a.AM[2]))return null;
                            break;
                        case"f":
                        case"ff":
                        case"fff":
                            x = M * Math.pow(10, 3 - O);
                            if (i(x, 0, 999))return null;
                            break;
                        case"ddd":
                        case"dddd":
                            y = t(a, L, O === 3);
                            if (i(y, 0, 6))return null;
                            break;
                        case"zzz":
                            var _ = L.split(/:/);
                            if (_.length !== 2)return null;
                            w = parseInt(_[0], 10);
                            if (i(w, -12, 13))return null;
                            var D = parseInt(_[1], 10);
                            if (i(D, 0, 59))return null;
                            T = w * 60 + (p(L, "-") ? -D : D);
                            break;
                        case"z":
                        case"zz":
                            w = M;
                            if (i(w, -12, 13))return null;
                            T = w * 60;
                            break;
                        case"g":
                        case"gg":
                            var P = L;
                            if (!P || !a.eras)return null;
                            P = d(P.toLowerCase());
                            for (var H = 0, B = a.eras.length; H < B; H++) {
                                if (P === a.eras[H].name.toLowerCase()) {
                                    h = H;
                                    break
                                }
                            }
                            if (h === null)return null;
                            break
                    }
                }
            }
            var j = new Date, F, I = a.convert;
            F = I ? I.fromGregorian(j)[0] : j.getFullYear();
            if (v === null) {
                v = F
            } else if (a.eras) {
                v += a.eras[h || 0].offset
            }
            if (m === null) {
                m = 0
            }
            if (g === null) {
                g = 1
            }
            if (I) {
                j = I.toGregorian(v, m, g);
                if (j === null)return null
            } else {
                j.setFullYear(v, m, g);
                if (j.getDate() !== g)return null;
                if (y !== null && j.getDay() !== y) {
                    return null
                }
            }
            if (N && b < 12) {
                b += 12
            }
            j.setHours(b, E, S, x);
            if (T !== null) {
                var q = j.getMinutes() - (T + j.getTimezoneOffset());
                j.setHours(j.getHours() + parseInt(q / 60, 10), q % 60)
            }
            return j
        }
    })();
    N = function (e, t, n) {
        var r = t["-"], i = t["+"], s;
        switch (n) {
            case"n -":
                r = " " + r;
                i = " " + i;
            case"n-":
                if (a(e, r)) {
                    s = ["-", e.substr(0, e.length - r.length)]
                } else if (a(e, i)) {
                    s = ["+", e.substr(0, e.length - i.length)]
                }
                break;
            case"- n":
                r += " ";
                i += " ";
            case"-n":
                if (p(e, r)) {
                    s = ["-", e.substr(r.length)]
                } else if (p(e, i)) {
                    s = ["+", e.substr(i.length)]
                }
                break;
            case"(n)":
                if (p(e, "(") && a(e, ")")) {
                    s = ["-", e.substr(1, e.length - 2)]
                }
                break
        }
        return s || ["", e]
    };
    n.prototype.findClosestCulture = function (e) {
        return n.findClosestCulture.call(this, e)
    };
    n.prototype.format = function (e, t, r) {
        return n.format.call(this, e, t, r)
    };
    n.prototype.localize = function (e, t) {
        return n.localize.call(this, e, t)
    };
    n.prototype.parseInt = function (e, t, r) {
        return n.parseInt.call(this, e, t, r)
    };
    n.prototype.parseFloat = function (e, t, r) {
        return n.parseFloat.call(this, e, t, r)
    };
    n.prototype.culture = function (e) {
        return n.culture.call(this, e)
    };
    n.addCultureInfo = function (e, t, n) {
        var r = {}, i = false;
        if (typeof e !== "string") {
            n = e;
            e = this.culture().name;
            r = this.cultures[e]
        } else if (typeof t !== "string") {
            n = t;
            i = this.cultures[e] == null;
            r = this.cultures[e] || this.cultures["default"]
        } else {
            i = true;
            r = this.cultures[t]
        }
        this.cultures[e] = f(true, {}, r, n);
        if (i) {
            this.cultures[e].calendar = this.cultures[e].calendars.standard
        }
    };
    n.findClosestCulture = function (e) {
        var t;
        if (!e) {
            return this.findClosestCulture(this.cultureSelector) || this.cultures["default"]
        }
        if (typeof e === "string") {
            e = e.split(",")
        }
        if (l(e)) {
            var n, r = this.cultures, i = e, s, o = i.length, u = [];
            for (s = 0; s < o; s++) {
                e = d(i[s]);
                var a, f = e.split(";");
                n = d(f[0]);
                if (f.length === 1) {
                    a = 1
                } else {
                    e = d(f[1]);
                    if (e.indexOf("q=") === 0) {
                        e = e.substr(2);
                        a = parseFloat(e);
                        a = isNaN(a) ? 0 : a
                    } else {
                        a = 1
                    }
                }
                u.push({lang: n, pri: a})
            }
            u.sort(function (e, t) {
                if (e.pri < t.pri) {
                    return 1
                } else if (e.pri > t.pri) {
                    return-1
                }
                return 0
            });
            for (s = 0; s < o; s++) {
                n = u[s].lang;
                t = r[n];
                if (t) {
                    return t
                }
            }
            for (s = 0; s < o; s++) {
                n = u[s].lang;
                do {
                    var c = n.lastIndexOf("-");
                    if (c === -1) {
                        break
                    }
                    n = n.substr(0, c);
                    t = r[n];
                    if (t) {
                        return t
                    }
                } while (1)
            }
            for (s = 0; s < o; s++) {
                n = u[s].lang;
                for (var h in r) {
                    var p = r[h];
                    if (p.language === n) {
                        return p
                    }
                }
            }
        } else if (typeof e === "object") {
            return e
        }
        return t || null
    };
    n.format = function (e, t, n) {
        var r = this.findClosestCulture(n);
        if (e instanceof Date) {
            e = b(e, t, r)
        } else if (typeof e === "number") {
            e = w(e, t, r)
        }
        return e
    };
    n.localize = function (e, t) {
        return this.findClosestCulture(t).messages[e] || this.cultures["default"].messages[e]
    };
    n.parseDate = function (e, t, n) {
        n = this.findClosestCulture(n);
        var r, i, s;
        if (t) {
            if (typeof t === "string") {
                t = [t]
            }
            if (t.length) {
                for (var o = 0, u = t.length; o < u; o++) {
                    var a = t[o];
                    if (a) {
                        r = T(e, a, n);
                        if (r) {
                            break
                        }
                    }
                }
            }
        } else {
            s = n.calendar.patterns;
            for (i in s) {
                r = T(e, s[i], n);
                if (r) {
                    break
                }
            }
        }
        return r || null
    };
    n.parseInt = function (e, t, r) {
        return v(n.parseFloat(e, t, r))
    };
    n.parseFloat = function (e, t, n) {
        if (typeof t !== "number") {
            n = t;
            t = 10
        }
        var o = this.findClosestCulture(n);
        var u = NaN, a = o.numberFormat;
        if (e.indexOf(o.numberFormat.currency.symbol) > -1) {
            e = e.replace(o.numberFormat.currency.symbol, "");
            e = e.replace(o.numberFormat.currency["."], o.numberFormat["."])
        }
        if (e.indexOf(o.numberFormat.percent.symbol) > -1) {
            e = e.replace(o.numberFormat.percent.symbol, "")
        }
        e = e.replace(/ /g, "");
        if (i.test(e)) {
            u = parseFloat(e)
        } else if (!t && r.test(e)) {
            u = parseInt(e, 16)
        } else {
            var f = N(e, a, a.pattern[0]), l = f[0], c = f[1];
            if (l === "" && a.pattern[0] !== "(n)") {
                f = N(e, a, "(n)");
                l = f[0];
                c = f[1]
            }
            if (l === "" && a.pattern[0] !== "-n") {
                f = N(e, a, "-n");
                l = f[0];
                c = f[1]
            }
            l = l || "+";
            var h, p, d = c.indexOf("e");
            if (d < 0)d = c.indexOf("E");
            if (d < 0) {
                p = c;
                h = null
            } else {
                p = c.substr(0, d);
                h = c.substr(d + 1)
            }
            var v, m, g = a["."], y = p.indexOf(g);
            if (y < 0) {
                v = p;
                m = null
            } else {
                v = p.substr(0, y);
                m = p.substr(y + g.length)
            }
            var b = a[","];
            v = v.split(b).join("");
            var w = b.replace(/\u00A0/g, " ");
            if (b !== w) {
                v = v.split(w).join("")
            }
            var E = l + v;
            if (m !== null) {
                E += "." + m
            }
            if (h !== null) {
                var S = N(h, a, "-n");
                E += "e" + (S[0] || "+") + S[1]
            }
            if (s.test(E)) {
                u = parseFloat(E)
            }
        }
        return u
    };
    n.culture = function (e) {
        if (typeof e !== "undefined") {
            this.cultureSelector = e
        }
        return this.findClosestCulture(e) || this.cultures["default"]
    }
})(this)