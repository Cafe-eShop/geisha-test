/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */

/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Licensed under the MIT license.
 * http://jquery.org/license
 */

//     Backbone.js 1.0.0
//     (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

//     Underscore.js 1.5.1
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

/**
 * jQuery bxSlider v3.0
 * http://bxslider.com
 *
 * Copyright 2010, Steven Wanderski
 * http://bxcreative.com
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */

//  EJS 1.0
//
//  http://embeddedjs.com/
//
//  Released under the MIT license
//  http://opensource.org/licenses/MIT

/*
 jQuery JavaScript Library v1.9.1
 http://jquery.com/

 Includes Sizzle.js
 http://sizzlejs.com/

 Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 Released under the MIT license
 http://jquery.org/license

 Date: 2013-2-4
 //@ sourceMappingURL=jquery.min.map
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(m, n, h) {
    m instanceof String && (m = String(m));
    for (var w = m.length, y = 0; y < w; y++) {
        var C = m[y];
        if (n.call(h, C, y, m))
            return {
                i: y,
                v: C
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(m, n, h) {
    m != Array.prototype && m != Object.prototype && (m[n] = h.value)
}
;
$jscomp.getGlobal = function(m) {
    return "undefined" != typeof window && window === m ? m : "undefined" != typeof global && null != global ? global : m
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(m, n, h, w) {
    if (n) {
        h = $jscomp.global;
        m = m.split(".");
        for (w = 0; w < m.length - 1; w++) {
            var y = m[w];
            y in h || (h[y] = {});
            h = h[y]
        }
        m = m[m.length - 1];
        w = h[m];
        n = n(w);
        n != w && null != n && $jscomp.defineProperty(h, m, {
            configurable: !0,
            writable: !0,
            value: n
        })
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(m) {
    return m ? m : function(m, h) {
        return $jscomp.findInternal(this, m, h).v
    }
}, "es6", "es3");
$jscomp.arrayIteratorImpl = function(m) {
    var n = 0;
    return function() {
        return n < m.length ? {
            done: !1,
            value: m[n++]
        } : {
            done: !0
        }
    }
}
;
$jscomp.arrayIterator = function(m) {
    return {
        next: $jscomp.arrayIteratorImpl(m)
    }
}
;
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}
    ;
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
;
$jscomp.SymbolClass = function(m, n) {
    this.$jscomp$symbol$id_ = m;
    $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: n
    })
}
;
$jscomp.SymbolClass.prototype.toString = function() {
    return this.$jscomp$symbol$id_
}
;
$jscomp.Symbol = function() {
    function m(h) {
        if (this instanceof m)
            throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (h || "") + "_" + n++,h)
    }
    var n = 0;
    return m
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var m = $jscomp.global.Symbol.iterator;
    m || (m = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[m] && $jscomp.defineProperty(Array.prototype, m, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function() {}
}
;
$jscomp.initSymbolAsyncIterator = function() {
    $jscomp.initSymbol();
    var m = $jscomp.global.Symbol.asyncIterator;
    m || (m = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function() {}
}
;
$jscomp.iteratorPrototype = function(m) {
    $jscomp.initSymbolIterator();
    m = {
        next: m
    };
    m[$jscomp.global.Symbol.iterator] = function() {
        return this
    }
    ;
    return m
}
;
$jscomp.iteratorFromArray = function(m, n) {
    $jscomp.initSymbolIterator();
    m instanceof String && (m += "");
    var h = 0
      , w = {
        next: function() {
            if (h < m.length) {
                var y = h++;
                return {
                    value: n(y, m[y]),
                    done: !1
                }
            }
            w.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ;
            return w.next()
        }
    };
    w[Symbol.iterator] = function() {
        return w
    }
    ;
    return w
}
;
$jscomp.polyfill("Array.prototype.keys", function(m) {
    return m ? m : function() {
        return $jscomp.iteratorFromArray(this, function(m) {
            return m
        })
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function(m) {
    return m ? m : function() {
        return $jscomp.iteratorFromArray(this, function(m, h) {
            return h
        })
    }
}, "es8", "es3");
(function(m, n) {
    function h(a) {
        var b = a.length
          , l = e.type(a);
        return e.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === l || "function" !== l && (0 === b || "number" == typeof b && 0 < b && b - 1 in a)
    }
    function w(a) {
        var b = Ya[a] = {};
        return e.each(a.match(ha) || [], function(a, e) {
            b[e] = !0
        }),
        b
    }
    function y(a, b, l, p) {
        if (e.acceptData(a)) {
            var u, c, d = e.expando, k = "string" == typeof b, g = a.nodeType, r = g ? e.cache : a, f = g ? a[d] : a[d] && d;
            if (f && r[f] && (p || r[f].data) || !k || l !== n)
                return f || (g ? a[d] = f = ta.pop() || e.guid++ : f = d),
                r[f] || (r[f] = {},
                g || (r[f].toJSON = e.noop)),
                ("object" == typeof b || "function" == typeof b) && (p ? r[f] = e.extend(r[f], b) : r[f].data = e.extend(r[f].data, b)),
                u = r[f],
                p || (u.data || (u.data = {}),
                u = u.data),
                l !== n && (u[e.camelCase(b)] = l),
                k ? (c = u[b],
                null == c && (c = u[e.camelCase(b)])) : c = u,
                c
        }
    }
    function C(a, b, l) {
        if (e.acceptData(a)) {
            var p, u, c = a.nodeType, d = c ? e.cache : a, k = c ? a[e.expando] : e.expando;
            if (d[k]) {
                if (b && (u = l ? d[k] : d[k].data)) {
                    e.isArray(b) ? b = b.concat(e.map(b, e.camelCase)) : b in u ? b = [b] : (b = e.camelCase(b),
                    b = b in u ? [b] : b.split(" "));
                    var g = 0;
                    for (p = b.length; p > g; g++)
                        delete u[b[g]];
                    if (!(l ? q : e.isEmptyObject)(u))
                        return
                }
                (l || (delete d[k].data,
                q(d[k]))) && (c ? e.cleanData([a], !0) : e.support.deleteExpando || d != d.window ? delete d[k] : d[k] = null)
            }
        }
    }
    function t(a, b, l) {
        if (l === n && 1 === a.nodeType) {
            var p = "data-" + b.replace(zb, "-$1").toLowerCase();
            if (l = a.getAttribute(p),
            "string" == typeof l) {
                try {
                    l = "true" === l ? !0 : "false" === l ? !1 : "null" === l ? null : +l + "" === l ? +l : Ab.test(l) ? e.parseJSON(l) : l
                } catch (u) {}
                e.data(a, b, l)
            } else
                l = n
        }
        return l
    }
    function q(a) {
        for (var b in a)
            if (("data" !== b || !e.isEmptyObject(a[b])) && "toJSON" !== b)
                return !1;
        return !0
    }
    function E() {
        return !0
    }
    function N() {
        return !1
    }
    function B(a, b) {
        do
            a = a[b];
        while (a && 1 !== a.nodeType);
        return a
    }
    function U(a, b, l) {
        if (b = b || 0,
        e.isFunction(b))
            return e.grep(a, function(a, e) {
                return !!b.call(a, e, a) === l
            });
        if (b.nodeType)
            return e.grep(a, function(a) {
                return a === b === l
            });
        if ("string" == typeof b) {
            var p = e.grep(a, function(a) {
                return 1 === a.nodeType
            });
            if (Bb.test(b))
                return e.filter(b, p, !l);
            b = e.filter(b, p)
        }
        return e.grep(a, function(a) {
            return 0 <= e.inArray(a, b) === l
        })
    }
    function Q(a) {
        var b = Za.split("|");
        a = a.createDocumentFragment();
        if (a.createElement)
            for (; b.length; )
                a.createElement(b.pop());
        return a
    }
    function ca(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
    }
    function R(a) {
        var b = a.getAttributeNode("type");
        return a.type = (b && b.specified) + "/" + a.type,
        a
    }
    function S(a) {
        var b = Cb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"),
        a
    }
    function X(a, b) {
        for (var l, p = 0; null != (l = a[p]); p++)
            e._data(l, "globalEval", !b || e._data(b[p], "globalEval"))
    }
    function T(a, b) {
        if (1 === b.nodeType && e.hasData(a)) {
            var l, p;
            var u = e._data(a);
            a = e._data(b, u);
            var c = u.events;
            if (c)
                for (l in delete a.handle,
                a.events = {},
                c)
                    for (u = 0,
                    p = c[l].length; p > u; u++)
                        e.event.add(b, l, c[l][u]);
            a.data && (a.data = e.extend({}, a.data))
        }
    }
    function M(a, b) {
        var l, p, u = 0, c = typeof a.getElementsByTagName !== W ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== W ? a.querySelectorAll(b || "*") : n;
        if (!c)
            for (c = [],
            l = a.childNodes || a; null != (p = l[u]); u++)
                !b || e.nodeName(p, b) ? c.push(p) : e.merge(c, M(p, b));
        return b === n || b && e.nodeName(a, b) ? e.merge([a], c) : c
    }
    function aa(a) {
        Ia.test(a.type) && (a.defaultChecked = a.checked)
    }
    function V(a, b) {
        if (b in a)
            return b;
        for (var e = b.charAt(0).toUpperCase() + b.slice(1), p = b, u = $a.length; u--; )
            if (b = $a[u] + e,
            b in a)
                return b;
        return p
    }
    function f(a, b) {
        return a = b || a,
        "none" === e.css(a, "display") || !e.contains(a.ownerDocument, a)
    }
    function z(a, b) {
        for (var l, p, u, c = [], d = 0, k = a.length; k > d; d++)
            p = a[d],
            p.style && (c[d] = e._data(p, "olddisplay"),
            l = p.style.display,
            b ? (c[d] || "none" !== l || (p.style.display = ""),
            "" === p.style.display && f(p) && (c[d] = e._data(p, "olddisplay", ba(p.nodeName)))) : c[d] || (u = f(p),
            (l && "none" !== l || !u) && e._data(p, "olddisplay", u ? l : e.css(p, "display"))));
        for (d = 0; k > d; d++)
            p = a[d],
            p.style && (b && "none" !== p.style.display && "" !== p.style.display || (p.style.display = b ? c[d] || "" : "none"));
        return a
    }
    function L(a, b, e) {
        return (a = Db.exec(b)) ? Math.max(0, a[1] - (e || 0)) + (a[2] || "px") : b
    }
    function I(a, b, l, p, u) {
        b = l === (p ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
        for (var c = 0; 4 > b; b += 2)
            "margin" === l && (c += e.css(a, l + ia[b], !0, u)),
            p ? ("content" === l && (c -= e.css(a, "padding" + ia[b], !0, u)),
            "margin" !== l && (c -= e.css(a, "border" + ia[b] + "Width", !0, u))) : (c += e.css(a, "padding" + ia[b], !0, u),
            "padding" !== l && (c += e.css(a, "border" + ia[b] + "Width", !0, u)));
        return c
    }
    function J(a, b, l) {
        var p = !0
          , u = "width" === b ? a.offsetWidth : a.offsetHeight
          , c = ja(a)
          , d = e.support.boxSizing && "border-box" === e.css(a, "boxSizing", !1, c);
        if (0 >= u || null == u) {
            if (u = oa(a, b, c),
            (0 > u || null == u) && (u = a.style[b]),
            Ca.test(u))
                return u;
            p = d && (e.support.boxSizingReliable || u === a.style[b]);
            u = parseFloat(u) || 0
        }
        return u + I(a, b, l || (d ? "border" : "content"), p, c) + "px"
    }
    function ba(a) {
        var b = A
          , l = ab[a];
        return l || (l = O(a, b),
        "none" !== l && l || (ua = (ua || e("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement),
        b = (ua[0].contentWindow || ua[0].contentDocument).document,
        b.write("<!doctype html><html><body>"),
        b.close(),
        l = O(a, b),
        ua.detach()),
        ab[a] = l),
        l
    }
    function O(a, b) {
        a = e(b.createElement(a)).appendTo(b.body);
        b = e.css(a[0], "display");
        return a.remove(),
        b
    }
    function F(a, b, l, p) {
        var c;
        if (e.isArray(b))
            e.each(b, function(b, e) {
                l || Eb.test(a) ? p(a, e) : F(a + "[" + ("object" == typeof e ? b : "") + "]", e, l, p)
            });
        else if (l || "object" !== e.type(b))
            p(a, b);
        else
            for (c in b)
                F(a + "[" + c + "]", b[c], l, p)
    }
    function ea(a) {
        return function(b, l) {
            "string" != typeof b && (l = b,
            b = "*");
            var p = 0
              , c = b.toLowerCase().match(ha) || [];
            if (e.isFunction(l))
                for (; b = c[p++]; )
                    "+" === b[0] ? (b = b.slice(1) || "*",
                    (a[b] = a[b] || []).unshift(l)) : (a[b] = a[b] || []).push(l)
        }
    }
    function ma(a, b, l, p) {
        function c(u) {
            var D;
            return d[u] = !0,
            e.each(a[u] || [], function(a, e) {
                a = e(b, l, p);
                return "string" != typeof a || k || d[a] ? k ? !(D = a) : n : (b.dataTypes.unshift(a),
                c(a),
                !1)
            }),
            D
        }
        var d = {}
          , k = a === Ja;
        return c(b.dataTypes[0]) || !d["*"] && c("*")
    }
    function Y(a, b) {
        var l, p, c = e.ajaxSettings.flatOptions || {};
        for (p in b)
            b[p] !== n && ((c[p] ? a : l || (l = {}))[p] = b[p]);
        return l && e.extend(!0, a, l),
        a
    }
    function d() {
        try {
            return new m.XMLHttpRequest
        } catch (a) {}
    }
    function g() {
        return setTimeout(function() {
            va = n
        }),
        va = e.now()
    }
    function v(a, b) {
        e.each(b, function(b, e) {
            for (var l = (Aa[b] || []).concat(Aa["*"]), p = 0, c = l.length; c > p && !l[p].call(a, b, e); p++)
                ;
        })
    }
    function x(a, b, l) {
        var p, u = 0, d = Da.length, k = e.Deferred().always(function() {
            delete r.elem
        }), r = function() {
            if (p)
                return !1;
            var b = va || g();
            b = Math.max(0, f.startTime + f.duration - b);
            for (var e = 1 - (b / f.duration || 0), l = 0, c = f.tweens.length; c > l; l++)
                f.tweens[l].run(e);
            return k.notifyWith(a, [f, e, b]),
            1 > e && c ? b : (k.resolveWith(a, [f]),
            !1)
        }, f = k.promise({
            elem: a,
            props: e.extend({}, b),
            opts: e.extend(!0, {
                specialEasing: {}
            }, l),
            originalProperties: b,
            originalOptions: l,
            startTime: va || g(),
            duration: l.duration,
            tweens: [],
            createTween: function(b, l) {
                b = e.Tween(a, f.opts, b, l, f.opts.specialEasing[b] || f.opts.easing);
                return f.tweens.push(b),
                b
            },
            stop: function(b) {
                var e = 0
                  , l = b ? f.tweens.length : 0;
                if (p)
                    return this;
                for (p = !0; l > e; e++)
                    f.tweens[e].run(1);
                return b ? k.resolveWith(a, [f, b]) : k.rejectWith(a, [f, b]),
                this
            }
        });
        l = f.props;
        for (c(l, f.opts.specialEasing); d > u; u++)
            if (b = Da[u].call(f, a, l, f.opts))
                return b;
        return v(f, l),
        e.isFunction(f.opts.start) && f.opts.start.call(a, f),
        e.fx.timer(e.extend(r, {
            elem: a,
            anim: f,
            queue: f.opts.queue
        })),
        f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }
    function c(a, b) {
        var l, p, c, d, k;
        for (c in a)
            if (p = e.camelCase(c),
            d = b[p],
            l = a[c],
            e.isArray(l) && (d = l[1],
            l = a[c] = l[0]),
            c !== p && (a[p] = l,
            delete a[c]),
            k = e.cssHooks[p],
            k && "expand"in k)
                for (c in l = k.expand(l),
                delete a[p],
                l)
                    c in a || (a[c] = l[c],
                    b[c] = d);
            else
                b[p] = d
    }
    function k(a, b, e, p, c) {
        return new k.prototype.init(a,b,e,p,c)
    }
    function r(a, b) {
        var e = {
            height: a
        }
          , p = 0;
        for (b = b ? 1 : 0; 4 > p; p += 2 - b) {
            var c = ia[p];
            e["margin" + c] = e["padding" + c] = a
        }
        return b && (e.opacity = e.width = a),
        e
    }
    function G(a) {
        return e.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var P, W = typeof n, A = m.document, ka = m.location, Ea = m.jQuery, Ka = m.$, za = {}, ta = [], bb = ta.concat, La = ta.push, pa = ta.slice, cb = ta.indexOf, Fb = za.toString, Ba = za.hasOwnProperty, Ma = "1.9.1".trim, e = function(a, b) {
        return new e.fn.init(a,b,Gb)
    }, Fa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ha = /\S+/g, Hb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, Ib = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, db = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Jb = /^[\],:{}\s]*$/, Kb = /(?:^|:|,)(?:\s*\[)+/g, Lb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, Mb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, Nb = /^-ms-/, Ob = /-([\da-z])/gi, Pb = function(a, b) {
        return b.toUpperCase()
    }, da = function(a) {
        (A.addEventListener || "load" === a.type || "complete" === A.readyState) && (eb(),
        e.ready())
    }, eb = function() {
        A.addEventListener ? (A.removeEventListener("DOMContentLoaded", da, !1),
        m.removeEventListener("load", da, !1)) : (A.detachEvent("onreadystatechange", da),
        m.detachEvent("onload", da))
    };
    e.fn = e.prototype = {
        jquery: "1.9.1",
        constructor: e,
        init: function(a, b, l) {
            var p, c;
            if (!a)
                return this;
            if ("string" == typeof a) {
                if (p = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : Ib.exec(a),
                !p || !p[1] && b)
                    return !b || b.jquery ? (b || l).find(a) : this.constructor(b).find(a);
                if (p[1]) {
                    if (b = b instanceof e ? b[0] : b,
                    e.merge(this, e.parseHTML(p[1], b && b.nodeType ? b.ownerDocument || b : A, !0)),
                    db.test(p[1]) && e.isPlainObject(b))
                        for (p in b)
                            e.isFunction(this[p]) ? this[p](b[p]) : this.attr(p, b[p]);
                    return this
                }
                if (c = A.getElementById(p[2]),
                c && c.parentNode) {
                    if (c.id !== p[2])
                        return l.find(a);
                    this.length = 1;
                    this[0] = c
                }
                return this.context = A,
                this.selector = a,
                this
            }
            return a.nodeType ? (this.context = this[0] = a,
            this.length = 1,
            this) : e.isFunction(a) ? l.ready(a) : (a.selector !== n && (this.selector = a.selector,
            this.context = a.context),
            e.makeArray(a, this))
        },
        selector: "",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return pa.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a) {
            a = e.merge(this.constructor(), a);
            return a.prevObject = this,
            a.context = this.context,
            a
        },
        each: function(a, b) {
            return e.each(this, a, b)
        },
        ready: function(a) {
            return e.ready.promise().done(a),
            this
        },
        slice: function() {
            return this.pushStack(pa.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length;
            a = +a + (0 > a ? b : 0);
            return this.pushStack(0 <= a && b > a ? [this[a]] : [])
        },
        map: function(a) {
            return this.pushStack(e.map(this, function(b, e) {
                return a.call(b, e, b)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: La,
        sort: [].sort,
        splice: [].splice
    };
    e.fn.init.prototype = e.fn;
    e.extend = e.fn.extend = function() {
        var a, b, l, p, c = arguments[0] || {}, d = 1, k = arguments.length, g = !1;
        "boolean" == typeof c && (g = c,
        c = arguments[1] || {},
        d = 2);
        "object" == typeof c || e.isFunction(c) || (c = {});
        for (k === d && (c = this,
        --d); k > d; d++)
            if (null != (l = arguments[d]))
                for (b in l) {
                    var f = c[b];
                    var r = l[b];
                    c !== r && (g && r && (e.isPlainObject(r) || (a = e.isArray(r))) ? (a ? (a = !1,
                    p = f && e.isArray(f) ? f : []) : p = f && e.isPlainObject(f) ? f : {},
                    c[b] = e.extend(g, p, r)) : r !== n && (c[b] = r))
                }
        return c
    }
    ;
    e.extend({
        noConflict: function(a) {
            return m.$ === e && (m.$ = Ka),
            a && m.jQuery === e && (m.jQuery = Ea),
            e
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? e.readyWait++ : e.ready(!0)
        },
        ready: function(a) {
            if (!0 === a ? !--e.readyWait : !e.isReady) {
                if (!A.body)
                    return setTimeout(e.ready);
                e.isReady = !0;
                !0 !== a && 0 < --e.readyWait || (P.resolveWith(A, [e]),
                e.fn.trigger && e(A).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" === e.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === e.type(a)
        }
        ,
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? za[Fb.call(a)] || "object" : typeof a
        },
        isPlainObject: function(a) {
            if (!a || "object" !== e.type(a) || a.nodeType || e.isWindow(a))
                return !1;
            try {
                if (a.constructor && !Ba.call(a, "constructor") && !Ba.call(a.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (l) {
                return !1
            }
            for (var b in a)
                ;
            return b === n || Ba.call(a, b)
        },
        isEmptyObject: function(a) {
            for (var b in a)
                return !1;
            return !0
        },
        error: function(a) {
            throw Error(a);
        },
        parseHTML: function(a, b, l) {
            if (!a || "string" != typeof a)
                return null;
            "boolean" == typeof b && (l = b,
            b = !1);
            b = b || A;
            var c = db.exec(a);
            l = !l && [];
            return c ? [b.createElement(c[1])] : (c = e.buildFragment([a], b, l),
            l && e(l).remove(),
            e.merge([], c.childNodes))
        },
        parseJSON: function(a) {
            return m.JSON && m.JSON.parse ? m.JSON.parse(a) : null === a ? a : "string" == typeof a && (a = e.trim(a),
            a && Jb.test(a.replace(Lb, "@").replace(Mb, "]").replace(Kb, ""))) ? Function("return " + a)() : (e.error("Invalid JSON: " + a),
            n)
        },
        parseXML: function(a) {
            var b, l;
            if (!a || "string" != typeof a)
                return null;
            try {
                m.DOMParser ? (l = new DOMParser,
                b = l.parseFromString(a, "text/xml")) : (b = new ActiveXObject("Microsoft.XMLDOM"),
                b.async = "false",
                b.loadXML(a))
            } catch (p) {
                b = n
            }
            return b && b.documentElement && !b.getElementsByTagName("parsererror").length || e.error("Invalid XML: " + a),
            b
        },
        noop: function() {},
        globalEval: function(a) {
            a && e.trim(a) && (m.execScript || function(a) {
                m.eval.call(m, a)
            }
            )(a)
        },
        camelCase: function(a) {
            return a.replace(Nb, "ms-").replace(Ob, Pb)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, e) {
            var l, c = 0, d = a.length, k = h(a);
            if (e)
                if (k)
                    for (; d > c && (l = b.apply(a[c], e),
                    !1 !== l); c++)
                        ;
                else
                    for (c in a) {
                        if (l = b.apply(a[c], e),
                        !1 === l)
                            break
                    }
            else if (k)
                for (; d > c && (l = b.call(a[c], c, a[c]),
                !1 !== l); c++)
                    ;
            else
                for (c in a)
                    if (l = b.call(a[c], c, a[c]),
                    !1 === l)
                        break;
            return a
        },
        trim: Ma && !Ma.call("\ufeff\u00a0") ? function(a) {
            return null == a ? "" : Ma.call(a)
        }
        : function(a) {
            return null == a ? "" : (a + "").replace(Hb, "")
        }
        ,
        makeArray: function(a, b) {
            b = b || [];
            return null != a && (h(Object(a)) ? e.merge(b, "string" == typeof a ? [a] : a) : La.call(b, a)),
            b
        },
        inArray: function(a, b, e) {
            if (b) {
                if (cb)
                    return cb.call(b, a, e);
                var l = b.length;
                for (e = e ? 0 > e ? Math.max(0, l + e) : e : 0; l > e; e++)
                    if (e in b && b[e] === a)
                        return e
            }
            return -1
        },
        merge: function(a, b) {
            var e = b.length
              , c = a.length
              , u = 0;
            if ("number" == typeof e)
                for (; e > u; u++)
                    a[c++] = b[u];
            else
                for (; b[u] !== n; )
                    a[c++] = b[u++];
            return a.length = c,
            a
        },
        grep: function(a, b, e) {
            var l = []
              , c = 0
              , d = a.length;
            for (e = !!e; d > c; c++) {
                var k = !!b(a[c], c);
                e !== k && l.push(a[c])
            }
            return l
        },
        map: function(a, b, e) {
            var l = 0
              , c = a.length
              , d = [];
            if (h(a))
                for (; c > l; l++) {
                    var k = b(a[l], l, e);
                    null != k && (d[d.length] = k)
                }
            else
                for (l in a)
                    k = b(a[l], l, e),
                    null != k && (d[d.length] = k);
            return bb.apply([], d)
        },
        guid: 1,
        proxy: function(a, b) {
            var l, c, u;
            return "string" == typeof b && (u = a[b],
            b = a,
            a = u),
            e.isFunction(a) ? (l = pa.call(arguments, 2),
            c = function() {
                return a.apply(b || this, l.concat(pa.call(arguments)))
            }
            ,
            c.guid = a.guid = a.guid || e.guid++,
            c) : n
        },
        access: function(a, b, l, c, u, d, k) {
            var p = 0
              , D = a.length
              , g = null == l;
            if ("object" === e.type(l))
                for (p in u = !0,
                l)
                    e.access(a, b, p, l[p], !0, d, k);
            else if (c !== n && (u = !0,
            e.isFunction(c) || (k = !0),
            g && (k ? (b.call(a, c),
            b = null) : (g = b,
            b = function(a, b, l) {
                return g.call(e(a), l)
            }
            )),
            b))
                for (; D > p; p++)
                    b(a[p], l, k ? c : c.call(a[p], p, b(a[p], l)));
            return u ? a : g ? b.call(a) : D ? b(a[0], l) : d
        },
        now: function() {
            return (new Date).getTime()
        }
    });
    e.ready.promise = function(a) {
        if (!P)
            if (P = e.Deferred(),
            "complete" === A.readyState)
                setTimeout(e.ready);
            else if (A.addEventListener)
                A.addEventListener("DOMContentLoaded", da, !1),
                m.addEventListener("load", da, !1);
            else {
                A.attachEvent("onreadystatechange", da);
                m.attachEvent("onload", da);
                var b = !1;
                try {
                    b = null == m.frameElement && A.documentElement
                } catch (l) {}
                b && b.doScroll && function p() {
                    if (!e.isReady) {
                        try {
                            b.doScroll("left")
                        } catch (u) {
                            return setTimeout(p, 50)
                        }
                        eb();
                        e.ready()
                    }
                }()
            }
        return P.promise(a)
    }
    ;
    e.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        za["[object " + b + "]"] = b.toLowerCase()
    });
    var Gb = e(A);
    var Ya = {};
    e.Callbacks = function(a) {
        a = "string" == typeof a ? Ya[a] || w(a) : e.extend({}, a);
        var b, l, c, u, d, k, g = [], f = !a.once && [], r = function(e) {
            l = a.memory && e;
            c = !0;
            d = k || 0;
            k = 0;
            u = g.length;
            for (b = !0; g && u > d; d++)
                if (!1 === g[d].apply(e[0], e[1]) && a.stopOnFalse) {
                    l = !1;
                    break
                }
            b = !1;
            g && (f ? f.length && r(f.shift()) : l ? g = [] : v.disable())
        }, v = {
            add: function() {
                if (g) {
                    var c = g.length;
                    (function Qb(b) {
                        e.each(b, function(b, l) {
                            b = e.type(l);
                            "function" === b ? a.unique && v.has(l) || g.push(l) : l && l.length && "string" !== b && Qb(l)
                        })
                    }
                    )(arguments);
                    b ? u = g.length : l && (k = c,
                    r(l))
                }
                return this
            },
            remove: function() {
                return g && e.each(arguments, function(a, l) {
                    for (var c; -1 < (c = e.inArray(l, g, c)); )
                        g.splice(c, 1),
                        b && (u >= c && u--,
                        d >= c && d--)
                }),
                this
            },
            has: function(a) {
                return a ? -1 < e.inArray(a, g) : !(!g || !g.length)
            },
            empty: function() {
                return g = [],
                this
            },
            disable: function() {
                return g = f = l = n,
                this
            },
            disabled: function() {
                return !g
            },
            lock: function() {
                return f = n,
                l || v.disable(),
                this
            },
            locked: function() {
                return !f
            },
            fireWith: function(a, e) {
                return e = e || [],
                e = [a, e.slice ? e.slice() : e],
                !g || c && !f || (b ? f.push(e) : r(e)),
                this
            },
            fire: function() {
                return v.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!c
            }
        };
        return v
    }
    ;
    e.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", e.Callbacks("once memory"), "resolved"], ["reject", "fail", e.Callbacks("once memory"), "rejected"], ["notify", "progress", e.Callbacks("memory")]]
              , l = "pending"
              , c = {
                state: function() {
                    return l
                },
                always: function() {
                    return u.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var a = arguments;
                    return e.Deferred(function(l) {
                        e.each(b, function(b, p) {
                            var d = p[0]
                              , k = e.isFunction(a[b]) && a[b];
                            u[p[1]](function() {
                                var a = k && k.apply(this, arguments);
                                a && e.isFunction(a.promise) ? a.promise().done(l.resolve).fail(l.reject).progress(l.notify) : l[d + "With"](this === c ? l.promise() : this, k ? [a] : arguments)
                            })
                        });
                        a = null
                    }).promise()
                },
                promise: function(a) {
                    return null != a ? e.extend(a, c) : c
                }
            }
              , u = {};
            return c.pipe = c.then,
            e.each(b, function(a, e) {
                var p = e[2]
                  , d = e[3];
                c[e[1]] = p.add;
                d && p.add(function() {
                    l = d
                }, b[1 ^ a][2].disable, b[2][2].lock);
                u[e[0]] = function() {
                    return u[e[0] + "With"](this === u ? c : this, arguments),
                    this
                }
                ;
                u[e[0] + "With"] = p.fireWith
            }),
            c.promise(u),
            a && a.call(u, u),
            u
        },
        when: function(a) {
            var b = 0, l = pa.call(arguments), c = l.length, u = 1 !== c || a && e.isFunction(a.promise) ? c : 0, d = 1 === u ? a : e.Deferred(), k = function(a, b, e) {
                return function(l) {
                    b[a] = this;
                    e[a] = 1 < arguments.length ? pa.call(arguments) : l;
                    e === f ? d.notifyWith(b, e) : --u || d.resolveWith(b, e)
                }
            }, g;
            if (1 < c) {
                var f = Array(c);
                var r = Array(c);
                for (g = Array(c); c > b; b++)
                    l[b] && e.isFunction(l[b].promise) ? l[b].promise().done(k(b, g, l)).fail(d.reject).progress(k(b, r, f)) : --u
            }
            return u || d.resolveWith(g, l),
            d.promise()
        }
    });
    e.support = function() {
        var a, b, l, c, d = A.createElement("div");
        if (d.setAttribute("className", "t"),
        d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        a = d.getElementsByTagName("*"),
        b = d.getElementsByTagName("a")[0],
        !a || !b || !a.length)
            return {};
        var k = A.createElement("select");
        var g = k.appendChild(A.createElement("option"));
        a = d.getElementsByTagName("input")[0];
        b.style.cssText = "top:1px;float:left;opacity:.5";
        var f = {
            getSetAttribute: "t" !== d.className,
            leadingWhitespace: 3 === d.firstChild.nodeType,
            tbody: !d.getElementsByTagName("tbody").length,
            htmlSerialize: !!d.getElementsByTagName("link").length,
            style: /top/.test(b.getAttribute("style")),
            hrefNormalized: "/a" === b.getAttribute("href"),
            opacity: /^0.5/.test(b.style.opacity),
            cssFloat: !!b.style.cssFloat,
            checkOn: !!a.value,
            optSelected: g.selected,
            enctype: !!A.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== A.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === A.compatMode,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        };
        a.checked = !0;
        f.noCloneChecked = a.cloneNode(!0).checked;
        k.disabled = !0;
        f.optDisabled = !g.disabled;
        try {
            delete d.test
        } catch (wc) {
            f.deleteExpando = !1
        }
        a = A.createElement("input");
        a.setAttribute("value", "");
        f.input = "" === a.getAttribute("value");
        a.value = "t";
        a.setAttribute("type", "radio");
        f.radioValue = "t" === a.value;
        a.setAttribute("checked", "t");
        a.setAttribute("name", "t");
        b = A.createDocumentFragment();
        b.appendChild(a);
        f.appendChecked = a.checked;
        f.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked;
        d.attachEvent && (d.attachEvent("onclick", function() {
            f.noCloneEvent = !1
        }),
        d.cloneNode(!0).click());
        for (c in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            d.setAttribute(b = "on" + c, "t"),
            f[c + "Bubbles"] = b in m || !1 === d.attributes[b].expando;
        return d.style.backgroundClip = "content-box",
        d.cloneNode(!0).style.backgroundClip = "",
        f.clearCloneStyle = "content-box" === d.style.backgroundClip,
        e(function() {
            var a, b, e, c = A.getElementsByTagName("body")[0];
            c && (a = A.createElement("div"),
            a.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",
            c.appendChild(a).appendChild(d),
            d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            e = d.getElementsByTagName("td"),
            e[0].style.cssText = "padding:0;margin:0;border:0;display:none",
            l = 0 === e[0].offsetHeight,
            e[0].style.display = "",
            e[1].style.display = "none",
            f.reliableHiddenOffsets = l && 0 === e[0].offsetHeight,
            d.innerHTML = "",
            d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
            f.boxSizing = 4 === d.offsetWidth,
            f.doesNotIncludeMarginInBodyOffset = 1 !== c.offsetTop,
            m.getComputedStyle && (f.pixelPosition = "1%" !== (m.getComputedStyle(d, null) || {}).top,
            f.boxSizingReliable = "4px" === (m.getComputedStyle(d, null) || {
                width: "4px"
            }).width,
            b = d.appendChild(A.createElement("div")),
            b.style.cssText = d.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
            b.style.marginRight = b.style.width = "0",
            d.style.width = "1px",
            f.reliableMarginRight = !parseFloat((m.getComputedStyle(b, null) || {}).marginRight)),
            typeof d.style.zoom !== W && (d.innerHTML = "",
            d.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1",
            f.inlineBlockNeedsLayout = 3 === d.offsetWidth,
            d.style.display = "block",
            d.innerHTML = "<div></div>",
            d.firstChild.style.width = "5px",
            f.shrinkWrapBlocks = 3 !== d.offsetWidth,
            f.inlineBlockNeedsLayout && (c.style.zoom = 1)),
            c.removeChild(a),
            d = null)
        }),
        a = k = b = g = b = a = null,
        f
    }();
    var Ab = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
      , zb = /([A-Z])/g;
    e.extend({
        cache: {},
        expando: "jQuery" + ("1.9.1" + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? e.cache[a[e.expando]] : a[e.expando],
            !!a && !q(a)
        },
        data: function(a, b, e) {
            return y(a, b, e)
        },
        removeData: function(a, b) {
            return C(a, b)
        },
        _data: function(a, b, e) {
            return y(a, b, e, !0)
        },
        _removeData: function(a, b) {
            return C(a, b, !0)
        },
        acceptData: function(a) {
            if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType)
                return !1;
            var b = a.nodeName && e.noData[a.nodeName.toLowerCase()];
            return !b || !0 !== b && a.getAttribute("classid") === b
        }
    });
    e.fn.extend({
        data: function(a, b) {
            var l, c = this[0], d = 0, k = null;
            if (a === n) {
                if (this.length && (k = e.data(c),
                1 === c.nodeType && !e._data(c, "parsedAttrs"))) {
                    for (l = c.attributes; l.length > d; d++) {
                        var g = l[d].name;
                        g.indexOf("data-") || (g = e.camelCase(g.slice(5)),
                        t(c, g, k[g]))
                    }
                    e._data(c, "parsedAttrs", !0)
                }
                return k
            }
            return "object" == typeof a ? this.each(function() {
                e.data(this, a)
            }) : e.access(this, function(b) {
                return b === n ? c ? t(c, a, e.data(c, a)) : null : (this.each(function() {
                    e.data(this, a, b)
                }),
                n)
            }, null, b, 1 < arguments.length, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                e.removeData(this, a)
            })
        }
    });
    e.extend({
        queue: function(a, b, l) {
            var c;
            return a ? (b = (b || "fx") + "queue",
            c = e._data(a, b),
            l && (!c || e.isArray(l) ? c = e._data(a, b, e.makeArray(l)) : c.push(l)),
            c || []) : n
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var l = e.queue(a, b)
              , c = l.length
              , d = l.shift()
              , k = e._queueHooks(a, b)
              , g = function() {
                e.dequeue(a, b)
            };
            "inprogress" === d && (d = l.shift(),
            c--);
            (k.cur = d) && ("fx" === b && l.unshift("inprogress"),
            delete k.stop,
            d.call(a, g, k));
            !c && k && k.empty.fire()
        },
        _queueHooks: function(a, b) {
            var l = b + "queueHooks";
            return e._data(a, l) || e._data(a, l, {
                empty: e.Callbacks("once memory").add(function() {
                    e._removeData(a, b + "queue");
                    e._removeData(a, l)
                })
            })
        }
    });
    e.fn.extend({
        queue: function(a, b) {
            var l = 2;
            return "string" != typeof a && (b = a,
            a = "fx",
            l--),
            l > arguments.length ? e.queue(this[0], a) : b === n ? this : this.each(function() {
                var l = e.queue(this, a, b);
                e._queueHooks(this, a);
                "fx" === a && "inprogress" !== l[0] && e.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                e.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = e.fx ? e.fx.speeds[a] || a : a,
            b = b || "fx",
            this.queue(b, function(b, e) {
                var l = setTimeout(b, a);
                e.stop = function() {
                    clearTimeout(l)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var l, c = 1, d = e.Deferred(), k = this, g = this.length, f = function() {
                --c || d.resolveWith(k, [k])
            };
            "string" != typeof a && (b = a,
            a = n);
            for (a = a || "fx"; g--; )
                (l = e._data(k[g], a + "queueHooks")) && l.empty && (c++,
                l.empty.add(f));
            return f(),
            d.promise(b)
        }
    });
    var wa, Na = /[\t\r\n]/g, Rb = /\r/g, Sb = /^(?:input|select|textarea|button|object)$/i, Tb = /^(?:a|area)$/i, gb = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, Oa = /^(?:checked|selected)$/i, qa = e.support.getSetAttribute, Pa = e.support.input;
    e.fn.extend({
        attr: function(a, b) {
            return e.access(this, e.attr, a, b, 1 < arguments.length)
        },
        removeAttr: function(a) {
            return this.each(function() {
                e.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return e.access(this, e.prop, a, b, 1 < arguments.length)
        },
        removeProp: function(a) {
            return a = e.propFix[a] || a,
            this.each(function() {
                try {
                    this[a] = n,
                    delete this[a]
                } catch (b) {}
            })
        },
        addClass: function(a) {
            var b, l, c, d, k = 0, g = this.length;
            var f = "string" == typeof a && a;
            if (e.isFunction(a))
                return this.each(function(b) {
                    e(this).addClass(a.call(this, b, this.className))
                });
            if (f)
                for (f = (a || "").match(ha) || []; g > k; k++)
                    if (b = this[k],
                    l = 1 === b.nodeType && (b.className ? (" " + b.className + " ").replace(Na, " ") : " ")) {
                        for (d = 0; c = f[d++]; )
                            0 > l.indexOf(" " + c + " ") && (l += c + " ");
                        b.className = e.trim(l)
                    }
            return this
        },
        removeClass: function(a) {
            var b, l, c, d, k = 0, g = this.length;
            var f = 0 === arguments.length || "string" == typeof a && a;
            if (e.isFunction(a))
                return this.each(function(b) {
                    e(this).removeClass(a.call(this, b, this.className))
                });
            if (f)
                for (f = (a || "").match(ha) || []; g > k; k++)
                    if (b = this[k],
                    l = 1 === b.nodeType && (b.className ? (" " + b.className + " ").replace(Na, " ") : "")) {
                        for (d = 0; c = f[d++]; )
                            for (; 0 <= l.indexOf(" " + c + " "); )
                                l = l.replace(" " + c + " ", " ");
                        b.className = a ? e.trim(l) : ""
                    }
            return this
        },
        toggleClass: function(a, b) {
            var l = typeof a
              , c = "boolean" == typeof b;
            return e.isFunction(a) ? this.each(function(l) {
                e(this).toggleClass(a.call(this, l, this.className, b), b)
            }) : this.each(function() {
                if ("string" === l)
                    for (var d, p = 0, k = e(this), g = b, f = a.match(ha) || []; d = f[p++]; )
                        g = c ? g : !k.hasClass(d),
                        k[g ? "addClass" : "removeClass"](d);
                else
                    (l === W || "boolean" === l) && (this.className && e._data(this, "__className__", this.className),
                    this.className = this.className || !1 === a ? "" : e._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var b = 0, e = this.length; e > b; b++)
                if (1 === this[b].nodeType && 0 <= (" " + this[b].className + " ").replace(Na, " ").indexOf(a))
                    return !0;
            return !1
        },
        val: function(a) {
            var b, l, c, d = this[0];
            if (arguments.length)
                return c = e.isFunction(a),
                this.each(function(b) {
                    var d, p = e(this);
                    1 === this.nodeType && (d = c ? a.call(this, b, p.val()) : a,
                    null == d ? d = "" : "number" == typeof d ? d += "" : e.isArray(d) && (d = e.map(d, function(a) {
                        return null == a ? "" : a + ""
                    })),
                    l = e.valHooks[this.type] || e.valHooks[this.nodeName.toLowerCase()],
                    l && "set"in l && l.set(this, d, "value") !== n || (this.value = d))
                });
            if (d)
                return l = e.valHooks[d.type] || e.valHooks[d.nodeName.toLowerCase()],
                l && "get"in l && (b = l.get(d, "value")) !== n ? b : (b = d.value,
                "string" == typeof b ? b.replace(Rb, "") : null == b ? "" : b)
        }
    });
    e.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    for (var b, l = a.options, c = a.selectedIndex, d = "select-one" === a.type || 0 > c, k = d ? null : [], g = d ? c + 1 : l.length, f = 0 > c ? g : d ? c : 0; g > f; f++)
                        if (b = l[f],
                        !(!b.selected && f !== c || (e.support.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && e.nodeName(b.parentNode, "optgroup"))) {
                            if (a = e(b).val(),
                            d)
                                return a;
                            k.push(a)
                        }
                    return k
                },
                set: function(a, b) {
                    var l = e.makeArray(b);
                    return e(a).find("option").each(function() {
                        this.selected = 0 <= e.inArray(e(this).val(), l)
                    }),
                    l.length || (a.selectedIndex = -1),
                    l
                }
            }
        },
        attr: function(a, b, l) {
            var c, d, k, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g)
                return typeof a.getAttribute === W ? e.prop(a, b, l) : (d = 1 !== g || !e.isXMLDoc(a),
                d && (b = b.toLowerCase(),
                c = e.attrHooks[b] || (gb.test(b) ? Ub : wa)),
                l === n ? c && d && "get"in c && null !== (k = c.get(a, b)) ? k : (typeof a.getAttribute !== W && (k = a.getAttribute(b)),
                null == k ? n : k) : null !== l ? c && d && "set"in c && (k = c.set(a, l, b)) !== n ? k : (a.setAttribute(b, l + ""),
                l) : (e.removeAttr(a, b),
                n))
        },
        removeAttr: function(a, b) {
            var c = 0
              , d = b && b.match(ha);
            if (d && 1 === a.nodeType)
                for (; b = d[c++]; ) {
                    var k = e.propFix[b] || b;
                    gb.test(b) ? !qa && Oa.test(b) ? a[e.camelCase("default-" + b)] = a[k] = !1 : a[k] = !1 : e.attr(a, b, "");
                    a.removeAttribute(qa ? b : k)
                }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!e.support.radioValue && "radio" === b && e.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b),
                        c && (a.value = c),
                        b
                    }
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, b, c) {
            var l, d, k, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g)
                return k = 1 !== g || !e.isXMLDoc(a),
                k && (b = e.propFix[b] || b,
                d = e.propHooks[b]),
                c !== n ? d && "set"in d && (l = d.set(a, c, b)) !== n ? l : a[b] = c : d && "get"in d && null !== (l = d.get(a, b)) ? l : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = a.getAttributeNode("tabindex");
                    return b && b.specified ? parseInt(b.value, 10) : Sb.test(a.nodeName) || Tb.test(a.nodeName) && a.href ? 0 : n
                }
            }
        }
    });
    var Ub = {
        get: function(a, b) {
            var c = e.prop(a, b)
              , d = "boolean" == typeof c && a.getAttribute(b);
            return (a = "boolean" == typeof c ? Pa && qa ? null != d : Oa.test(b) ? a[e.camelCase("default-" + b)] : !!d : a.getAttributeNode(b)) && !1 !== a.value ? b.toLowerCase() : n
        },
        set: function(a, b, c) {
            return !1 === b ? e.removeAttr(a, c) : Pa && qa || !Oa.test(c) ? a.setAttribute(!qa && e.propFix[c] || c, c) : a[e.camelCase("default-" + c)] = a[c] = !0,
            c
        }
    };
    Pa && qa || (e.attrHooks.value = {
        get: function(a, b) {
            b = a.getAttributeNode(b);
            return e.nodeName(a, "input") ? a.defaultValue : b && b.specified ? b.value : n
        },
        set: function(a, b, c) {
            return e.nodeName(a, "input") ? (a.defaultValue = b,
            n) : wa && wa.set(a, b, c)
        }
    });
    qa || (wa = e.valHooks.button = {
        get: function(a, b) {
            return (a = a.getAttributeNode(b)) && ("id" === b || "name" === b || "coords" === b ? "" !== a.value : a.specified) ? a.value : n
        },
        set: function(a, b, e) {
            var c = a.getAttributeNode(e);
            return c || a.setAttributeNode(c = a.ownerDocument.createAttribute(e)),
            c.value = b += "",
            "value" === e || b === a.getAttribute(e) ? b : n
        }
    },
    e.attrHooks.contenteditable = {
        get: wa.get,
        set: function(a, b, e) {
            wa.set(a, "" === b ? !1 : b, e)
        }
    },
    e.each(["width", "height"], function(a, b) {
        e.attrHooks[b] = e.extend(e.attrHooks[b], {
            set: function(a, e) {
                return "" === e ? (a.setAttribute(b, "auto"),
                e) : n
            }
        })
    }));
    e.support.hrefNormalized || (e.each(["href", "src", "width", "height"], function(a, b) {
        e.attrHooks[b] = e.extend(e.attrHooks[b], {
            get: function(a) {
                a = a.getAttribute(b, 2);
                return null == a ? n : a
            }
        })
    }),
    e.each(["href", "src"], function(a, b) {
        e.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    }));
    e.support.style || (e.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || n
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    });
    e.support.optSelected || (e.propHooks.selected = e.extend(e.propHooks.selected, {
        get: function(a) {
            a = a.parentNode;
            return a && (a.selectedIndex,
            a.parentNode && a.parentNode.selectedIndex),
            null
        }
    }));
    e.support.enctype || (e.propFix.enctype = "encoding");
    e.support.checkOn || e.each(["radio", "checkbox"], function() {
        e.valHooks[this] = {
            get: function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    });
    e.each(["radio", "checkbox"], function() {
        e.valHooks[this] = e.extend(e.valHooks[this], {
            set: function(a, b) {
                return e.isArray(b) ? a.checked = 0 <= e.inArray(e(a).val(), b) : n
            }
        })
    });
    var Qa = /^(?:input|select|textarea)$/i
      , Vb = /^key/
      , Wb = /^(?:mouse|contextmenu)|click/
      , hb = /^(?:focusinfocus|focusoutblur)$/
      , ib = /^([^.]*)(?:\.(.+)|)$/;
    e.event = {
        global: {},
        add: function(a, b, c, d, k) {
            var l, p, g, u, f, r;
            if (p = e._data(a)) {
                c.handler && (g = c,
                c = g.handler,
                k = g.selector);
                c.guid || (c.guid = e.guid++);
                (l = p.events) || (l = p.events = {});
                (u = p.handle) || (u = p.handle = function(a) {
                    return typeof e === W || a && e.event.triggered === a.type ? n : e.event.dispatch.apply(u.elem, arguments)
                }
                ,
                u.elem = a);
                b = (b || "").match(ha) || [""];
                for (p = b.length; p--; ) {
                    var v = ib.exec(b[p]) || [];
                    var m = f = v[1];
                    var h = (v[2] || "").split(".").sort();
                    v = e.event.special[m] || {};
                    m = (k ? v.delegateType : v.bindType) || m;
                    v = e.event.special[m] || {};
                    f = e.extend({
                        type: m,
                        origType: f,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: k,
                        needsContext: k && e.expr.match.needsContext.test(k),
                        namespace: h.join(".")
                    }, g);
                    (r = l[m]) || (r = l[m] = [],
                    r.delegateCount = 0,
                    v.setup && !1 !== v.setup.call(a, d, h, u) || (a.addEventListener ? a.addEventListener(m, u, !1) : a.attachEvent && a.attachEvent("on" + m, u)));
                    v.add && (v.add.call(a, f),
                    f.handler.guid || (f.handler.guid = c.guid));
                    k ? r.splice(r.delegateCount++, 0, f) : r.push(f);
                    e.event.global[m] = !0
                }
                a = null
            }
        },
        remove: function(a, b, c, d, k) {
            var l, p, g, u, f, r, v, m, h = e.hasData(a) && e._data(a);
            if (h && (f = h.events)) {
                b = (b || "").match(ha) || [""];
                for (u = b.length; u--; )
                    if (p = ib.exec(b[u]) || [],
                    r = m = p[1],
                    v = (p[2] || "").split(".").sort(),
                    r) {
                        var G = e.event.special[r] || {};
                        r = (d ? G.delegateType : G.bindType) || r;
                        var x = f[r] || [];
                        p = p[2] && RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        for (g = l = x.length; l--; ) {
                            var n = x[l];
                            !k && m !== n.origType || c && c.guid !== n.guid || p && !p.test(n.namespace) || d && d !== n.selector && ("**" !== d || !n.selector) || (x.splice(l, 1),
                            n.selector && x.delegateCount--,
                            G.remove && G.remove.call(a, n))
                        }
                        g && !x.length && (G.teardown && !1 !== G.teardown.call(a, v, h.handle) || e.removeEvent(a, r, h.handle),
                        delete f[r])
                    } else
                        for (r in f)
                            e.event.remove(a, r + b[u], c, d, !0);
                e.isEmptyObject(f) && (delete h.handle,
                e._removeData(a, "events"))
            }
        },
        trigger: function(a, b, c, d) {
            var l, p, k, g, f = [c || A], r = Ba.call(a, "type") ? a.type : a;
            var v = Ba.call(a, "namespace") ? a.namespace.split(".") : [];
            if (k = l = c = c || A,
            3 !== c.nodeType && 8 !== c.nodeType && !hb.test(r + e.event.triggered) && (0 <= r.indexOf(".") && (v = r.split("."),
            r = v.shift(),
            v.sort()),
            p = 0 > r.indexOf(":") && "on" + r,
            a = a[e.expando] ? a : new e.Event(r,"object" == typeof a && a),
            a.isTrigger = !0,
            a.namespace = v.join("."),
            a.namespace_re = a.namespace ? RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            a.result = n,
            a.target || (a.target = c),
            b = null == b ? [a] : e.makeArray(b, [a]),
            g = e.event.special[r] || {},
            d || !g.trigger || !1 !== g.trigger.apply(c, b))) {
                if (!d && !g.noBubble && !e.isWindow(c)) {
                    var h = g.delegateType || r;
                    for (hb.test(h + r) || (k = k.parentNode); k; k = k.parentNode)
                        f.push(k),
                        l = k;
                    l === (c.ownerDocument || A) && f.push(l.defaultView || l.parentWindow || m)
                }
                for (v = 0; (k = f[v++]) && !a.isPropagationStopped(); )
                    a.type = 1 < v ? h : g.bindType || r,
                    (l = (e._data(k, "events") || {})[a.type] && e._data(k, "handle")) && l.apply(k, b),
                    (l = p && k[p]) && e.acceptData(k) && l.apply && !1 === l.apply(k, b) && a.preventDefault();
                if (a.type = r,
                !(d || a.isDefaultPrevented() || g._default && !1 !== g._default.apply(c.ownerDocument, b) || "click" === r && e.nodeName(c, "a")) && e.acceptData(c) && p && c[r] && !e.isWindow(c)) {
                    (l = c[p]) && (c[p] = null);
                    e.event.triggered = r;
                    try {
                        c[r]()
                    } catch (yc) {}
                    e.event.triggered = n;
                    l && (c[p] = l)
                }
                return a.result
            }
        },
        dispatch: function(a) {
            a = e.event.fix(a);
            var b, c, d, k, g = pa.call(arguments);
            var f = (e._data(this, "events") || {})[a.type] || [];
            var r = e.event.special[a.type] || {};
            if (g[0] = a,
            a.delegateTarget = this,
            !r.preDispatch || !1 !== r.preDispatch.call(this, a)) {
                var v = e.event.handlers.call(this, a, f);
                for (f = 0; (d = v[f++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = d.elem,
                    k = 0; (c = d.handlers[k++]) && !a.isImmediatePropagationStopped(); )
                        a.namespace_re && !a.namespace_re.test(c.namespace) || (a.handleObj = c,
                        a.data = c.data,
                        b = ((e.event.special[c.origType] || {}).handle || c.handler).apply(d.elem, g),
                        b === n || !1 !== (a.result = b) || (a.preventDefault(),
                        a.stopPropagation()));
                return r.postDispatch && r.postDispatch.call(this, a),
                a.result
            }
        },
        handlers: function(a, b) {
            var c, d = [], k = b.delegateCount, g = a.target;
            if (k && g.nodeType && (!a.button || "click" !== a.type))
                for (; g != this; g = g.parentNode || this)
                    if (1 === g.nodeType && (!0 !== g.disabled || "click" !== a.type)) {
                        var f = [];
                        for (c = 0; k > c; c++) {
                            var r = b[c];
                            var v = r.selector + " ";
                            f[v] === n && (f[v] = r.needsContext ? 0 <= e(v, this).index(g) : e.find(v, this, null, [g]).length);
                            f[v] && f.push(r)
                        }
                        f.length && d.push({
                            elem: g,
                            handlers: f
                        })
                    }
            return b.length > k && d.push({
                elem: this,
                handlers: b.slice(k)
            }),
            d
        },
        fix: function(a) {
            if (a[e.expando])
                return a;
            var b = a.type;
            var c = a
              , d = this.fixHooks[b];
            d || (this.fixHooks[b] = d = Wb.test(b) ? this.mouseHooks : Vb.test(b) ? this.keyHooks : {});
            var k = d.props ? this.props.concat(d.props) : this.props;
            a = new e.Event(c);
            for (b = k.length; b--; ) {
                var g = k[b];
                a[g] = c[g]
            }
            return a.target || (a.target = c.srcElement || A),
            3 === a.target.nodeType && (a.target = a.target.parentNode),
            a.metaKey = !!a.metaKey,
            d.filter ? d.filter(a, c) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var e, c, d, k = b.button, g = b.fromElement;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || A,
                d = c.documentElement,
                e = c.body,
                a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0),
                a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)),
                !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g),
                a.which || k === n || (a.which = 1 & k ? 1 : 2 & k ? 3 : 4 & k ? 2 : 0),
                a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                trigger: function() {
                    return e.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                    !1) : n
                }
            },
            focus: {
                trigger: function() {
                    if (this !== A.activeElement && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === A.activeElement && this.blur ? (this.blur(),
                    !1) : n
                },
                delegateType: "focusout"
            },
            beforeunload: {
                postDispatch: function(a) {
                    a.result !== n && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            a = e.extend(new e.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? e.event.trigger(a, null, b) : e.event.dispatch.call(b, a);
            a.isDefaultPrevented() && c.preventDefault()
        }
    };
    e.removeEvent = A.removeEventListener ? function(a, b, e) {
        a.removeEventListener && a.removeEventListener(b, e, !1)
    }
    : function(a, b, e) {
        b = "on" + b;
        a.detachEvent && (typeof a[b] === W && (a[b] = null),
        a.detachEvent(b, e))
    }
    ;
    e.Event = function(a, b) {
        return this instanceof e.Event ? (a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? E : N) : this.type = a,
        b && e.extend(this, b),
        this.timeStamp = a && a.timeStamp || e.now(),
        this[e.expando] = !0,
        n) : new e.Event(a,b)
    }
    ;
    e.Event.prototype = {
        isDefaultPrevented: N,
        isPropagationStopped: N,
        isImmediatePropagationStopped: N,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = E;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = E;
            a && (a.stopPropagation && a.stopPropagation(),
            a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = E;
            this.stopPropagation()
        }
    };
    e.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        e.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, l = a.relatedTarget, d = a.handleObj;
                return (!l || l !== this && !e.contains(this, l)) && (a.type = d.origType,
                c = d.handler.apply(this, arguments),
                a.type = b),
                c
            }
        }
    });
    e.support.submitBubbles || (e.event.special.submit = {
        setup: function() {
            return e.nodeName(this, "form") ? !1 : (e.event.add(this, "click._submit keypress._submit", function(a) {
                a = a.target;
                (a = e.nodeName(a, "input") || e.nodeName(a, "button") ? a.form : n) && !e._data(a, "submitBubbles") && (e.event.add(a, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }),
                e._data(a, "submitBubbles", !0))
            }),
            n)
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble,
            this.parentNode && !a.isTrigger && e.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return e.nodeName(this, "form") ? !1 : (e.event.remove(this, "._submit"),
            n)
        }
    });
    e.support.changeBubbles || (e.event.special.change = {
        setup: function() {
            return Qa.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (e.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }),
            e.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1);
                e.event.simulate("change", this, a, !0)
            })),
            !1) : (e.event.add(this, "beforeactivate._change", function(a) {
                a = a.target;
                Qa.test(a.nodeName) && !e._data(a, "changeBubbles") && (e.event.add(a, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || e.event.simulate("change", this.parentNode, a, !0)
                }),
                e._data(a, "changeBubbles", !0))
            }),
            n)
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : n
        },
        teardown: function() {
            return e.event.remove(this, "._change"),
            !Qa.test(this.nodeName)
        }
    });
    e.support.focusinBubbles || e.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = 0
          , d = function(a) {
            e.event.simulate(b, a.target, e.event.fix(a), !0)
        };
        e.event.special[b] = {
            setup: function() {
                0 === c++ && A.addEventListener(a, d, !0)
            },
            teardown: function() {
                0 === --c && A.removeEventListener(a, d, !0)
            }
        }
    });
    e.fn.extend({
        on: function(a, b, c, d, k) {
            var l, p;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b,
                b = n);
                for (l in a)
                    this.on(l, b, c, a[l], k);
                return this
            }
            if (null == c && null == d ? (d = b,
            c = b = n) : null == d && ("string" == typeof b ? (d = c,
            c = n) : (d = c,
            c = b,
            b = n)),
            !1 === d)
                d = N;
            else if (!d)
                return this;
            return 1 === k && (p = d,
            d = function(a) {
                return e().off(a),
                p.apply(this, arguments)
            }
            ,
            d.guid = p.guid || (p.guid = e.guid++)),
            this.each(function() {
                e.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, e, c) {
            return this.on(a, b, e, c, 1)
        },
        off: function(a, b, c) {
            var d, l;
            if (a && a.preventDefault && a.handleObj)
                return d = a.handleObj,
                e(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler),
                this;
            if ("object" == typeof a) {
                for (l in a)
                    this.off(l, b, a[l]);
                return this
            }
            return (!1 === b || "function" == typeof b) && (c = b,
            b = n),
            !1 === c && (c = N),
            this.each(function() {
                e.event.remove(this, a, c, b)
            })
        },
        bind: function(a, b, e) {
            return this.on(a, null, b, e)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, e, c) {
            return this.on(b, a, e, c)
        },
        undelegate: function(a, b, e) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", e)
        },
        trigger: function(a, b) {
            return this.each(function() {
                e.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? e.event.trigger(a, b, c, !0) : n
        }
    });
    (function(a, b) {
        function c() {
            var a, b = [];
            return a = function(e, c) {
                return b.push(e += " ") > H.cacheLength && delete a[b.shift()],
                a[e] = c
            }
        }
        function d(a) {
            return a[B] = !0,
            a
        }
        function k(a) {
            var b = t.createElement("div");
            try {
                return a(b)
            } catch (K) {
                return !1
            } finally {}
        }
        function g(a, b, e, c) {
            var d, l, k, g, p;
            if ((b ? b.ownerDocument || b : Q) !== t && fa(b),
            b = b || t,
            e = e || [],
            !a || "string" != typeof a)
                return e;
            if (1 !== (g = b.nodeType) && 9 !== g)
                return [];
            if (!C && !c) {
                if (d = oa.exec(a))
                    if (k = d[1])
                        if (9 === g) {
                            if (l = b.getElementById(k),
                            !l || !l.parentNode)
                                return e;
                            if (l.id === k)
                                return e.push(l),
                                e
                        } else {
                            if (b.ownerDocument && (l = b.ownerDocument.getElementById(k)) && ba(b, l) && l.id === k)
                                return e.push(l),
                                e
                        }
                    else {
                        if (d[2])
                            return Y.apply(e, T.call(b.getElementsByTagName(a), 0)),
                            e;
                        if ((k = d[3]) && F.getByClassName && b.getElementsByClassName)
                            return Y.apply(e, T.call(b.getElementsByClassName(k), 0)),
                            e
                    }
                if (F.qsa && !O.test(a)) {
                    if (d = !0,
                    l = B,
                    k = b,
                    p = 9 === g && a,
                    1 === g && "object" !== b.nodeName.toLowerCase()) {
                        g = h(a);
                        (d = b.getAttribute("id")) ? l = d.replace(sa, "\\$&") : b.setAttribute("id", l);
                        l = "[id='" + l + "'] ";
                        for (k = g.length; k--; )
                            g[k] = l + G(g[k]);
                        k = ia.test(a) && b.parentNode || b;
                        p = g.join(",")
                    }
                    if (p)
                        try {
                            return Y.apply(e, T.call(k.querySelectorAll(p), 0)),
                            e
                        } catch (Ac) {} finally {
                            d || b.removeAttribute("id")
                        }
                }
            }
            var f;
            a: {
                a = a.replace(aa, "$1");
                var r, u;
                l = h(a);
                if (!c && 1 === l.length) {
                    if (f = l[0] = l[0].slice(0),
                    2 < f.length && "ID" === (r = f[0]).type && 9 === b.nodeType && !C && H.relative[f[1].type]) {
                        if (b = H.find.ID(r.matches[0].replace(xa, ya), b)[0],
                        !b) {
                            f = e;
                            break a
                        }
                        a = a.slice(f.shift().value.length)
                    }
                    for (g = da.needsContext.test(a) ? 0 : f.length; g-- && (r = f[g],
                    !H.relative[d = r.type]); )
                        if ((u = H.find[d]) && (c = u(r.matches[0].replace(xa, ya), ia.test(f[0].type) && b.parentNode || b))) {
                            if (f.splice(g, 1),
                            a = c.length && G(f),
                            !a) {
                                f = (Y.apply(e, T.call(c, 0)),
                                e);
                                break a
                            }
                            break
                        }
                }
                f = (ua(a, l)(c, b, C, e, ia.test(a)),
                e)
            }
            return f
        }
        function f(a, b) {
            var e = b && a
              , c = e && (~b.sourceIndex || -2147483648) - (~a.sourceIndex || -2147483648);
            if (c)
                return c;
            if (e)
                for (; e = e.nextSibling; )
                    if (e === b)
                        return -1;
            return a ? 1 : -1
        }
        function r(a) {
            return function(b) {
                return "input" === b.nodeName.toLowerCase() && b.type === a
            }
        }
        function v(a) {
            return function(b) {
                var e = b.nodeName.toLowerCase();
                return ("input" === e || "button" === e) && b.type === a
            }
        }
        function m(a) {
            return d(function(b) {
                return b = +b,
                d(function(e, c) {
                    for (var d, l = a([], e.length, b), k = l.length; k--; )
                        e[d = l[k]] && (e[d] = !(c[d] = e[d]))
                })
            })
        }
        function h(a, b) {
            var e, c, d, l, k;
            if (l = Ea[a + " "])
                return b ? 0 : l.slice(0);
            l = a;
            var p = [];
            for (k = H.preFilter; l; ) {
                f && !(e = Ka.exec(l)) || (e && (l = l.slice(e[0].length) || l),
                p.push(c = []));
                var f = !1;
                (e = za.exec(l)) && (f = e.shift(),
                c.push({
                    value: f,
                    type: e[0].replace(aa, " ")
                }),
                l = l.slice(f.length));
                for (d in H.filter)
                    !(e = da[d].exec(l)) || k[d] && !(e = k[d](e)) || (f = e.shift(),
                    c.push({
                        value: f,
                        type: d,
                        matches: e
                    }),
                    l = l.slice(f.length));
                if (!f)
                    break
            }
            return b ? l.length : l ? g.error(a) : Ea(a, p).slice(0)
        }
        function G(a) {
            for (var b = 0, e = a.length, c = ""; e > b; b++)
                c += a[b].value;
            return c
        }
        function x(a, b, e) {
            var c = b.dir
              , d = e && "parentNode" === c
              , l = ea++;
            return b.first ? function(b, e, l) {
                for (; b = b[c]; )
                    if (1 === b.nodeType || d)
                        return a(b, e, l)
            }
            : function(b, e, k) {
                var g, p, f, r = N + " " + l;
                if (k)
                    for (; b = b[c]; ) {
                        if ((1 === b.nodeType || d) && a(b, e, k))
                            return !0
                    }
                else
                    for (; b = b[c]; )
                        if (1 === b.nodeType || d)
                            if (f = b[B] || (b[B] = {}),
                            (p = f[c]) && p[0] === r) {
                                if (!0 === (g = p[1]) || g === J)
                                    return !0 === g
                            } else if (p = f[c] = [r],
                            p[1] = a(b, e, k) || J,
                            !0 === p[1])
                                return !0
            }
        }
        function n(a) {
            return 1 < a.length ? function(b, e, c) {
                for (var d = a.length; d--; )
                    if (!a[d](b, e, c))
                        return !1;
                return !0
            }
            : a[0]
        }
        function w(a, b, e, c, d) {
            for (var l, k = [], g = 0, p = a.length, f = null != b; p > g; g++)
                (l = a[g]) && (!e || e(l, c, d)) && (k.push(l),
                f && b.push(g));
            return k
        }
        function A(a, b, e, c, l, k) {
            return c && !c[B] && (c = A(c)),
            l && !l[B] && (l = A(l, k)),
            d(function(d, k, p, f) {
                var r, u = [], v = [], ra = k.length, m;
                if (!(m = d)) {
                    m = b || "*";
                    for (var K = p.nodeType ? [p] : p, h = [], D = 0, G = K.length; G > D; D++)
                        g(m, K[D], h);
                    m = h
                }
                m = !a || !d && b ? m : w(m, u, a, p, f);
                K = e ? l || (d ? a : ra || c) ? [] : k : m;
                if (e && e(m, K, p, f),
                c) {
                    var x = w(K, v);
                    c(x, [], p, f);
                    for (p = x.length; p--; )
                        (r = x[p]) && (K[v[p]] = !(m[v[p]] = r))
                }
                if (d) {
                    if (l || a) {
                        if (l) {
                            x = [];
                            for (p = K.length; p--; )
                                (r = K[p]) && x.push(m[p] = r);
                            l(null, K = [], x, f)
                        }
                        for (p = K.length; p--; )
                            (r = K[p]) && -1 < (x = l ? X.call(d, r) : u[p]) && (d[x] = !(k[x] = r))
                    }
                } else
                    K = w(K === k ? K.splice(ra, K.length) : K),
                    l ? l(null, k, K, f) : Y.apply(k, K)
            })
        }
        function W(a) {
            var b, e, c = a.length, d = H.relative[a[0].type];
            var l = d || H.relative[" "];
            for (var k = d ? 1 : 0, g = x(function(a) {
                return a === b
            }, l, !0), p = x(function(a) {
                return -1 < X.call(b, a)
            }, l, !0), f = [function(a, e, c) {
                return !d && (c || e !== L) || ((b = e).nodeType ? g(a, e, c) : p(a, e, c))
            }
            ]; c > k; k++)
                if (l = H.relative[a[k].type])
                    f = [x(n(f), l)];
                else {
                    if (l = H.filter[a[k].type].apply(null, a[k].matches),
                    l[B]) {
                        for (e = ++k; c > e && !H.relative[a[e].type]; e++)
                            ;
                        return A(1 < k && n(f), 1 < k && G(a.slice(0, k - 1)).replace(aa, "$1"), l, e > k && W(a.slice(k, e)), c > e && W(a = a.slice(e)), c > e && G(a))
                    }
                    f.push(l)
                }
            return n(f)
        }
        function P(a, b) {
            var e = 0
              , c = 0 < b.length
              , l = 0 < a.length
              , k = function(d, k, p, f, r) {
                var u, v, m = [], ra = 0, K = "0", h = d && [], D = null != r, x = L, G = d || l && H.find.TAG("*", r && k.parentNode || k), n = N += null == x ? 1 : Math.random() || .1;
                for (D && (L = k !== t && k,
                J = e); null != (r = G[K]); K++) {
                    if (l && r) {
                        for (u = 0; v = a[u++]; )
                            if (v(r, k, p)) {
                                f.push(r);
                                break
                            }
                        D && (N = n,
                        J = ++e)
                    }
                    c && ((r = !v && r) && ra--,
                    d && h.push(r))
                }
                if (ra += K,
                c && K !== ra) {
                    for (u = 0; v = b[u++]; )
                        v(h, m, k, p);
                    if (d) {
                        if (0 < ra)
                            for (; K--; )
                                h[K] || m[K] || (m[K] = V.call(f));
                        m = w(m)
                    }
                    Y.apply(f, m);
                    D && !d && 0 < m.length && 1 < ra + b.length && g.uniqueSort(f)
                }
                return D && (N = n,
                L = x),
                h
            };
            return c ? d(k) : k
        }
        function q() {}
        var z, J, y, L, t, I, C, O, ka, E, ba, ca, B = "sizzle" + -new Date, Q = a.document, F = {}, N = 0, ea = 0, M = c(), Ea = c(), S = c(), U = typeof b, R = [], V = R.pop, Y = R.push, T = R.slice, X = R.indexOf || function(a) {
            for (var b = 0, e = this.length; e > b; b++)
                if (this[b] === a)
                    return b;
            return -1
        }
        ;
        R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#");
        var ma = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + R + ")|)|)[\\x20\\t\\r\\n\\f]*\\]"
          , Z = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ma.replace(3, 8) + ")*)|.*)\\)|)"
          , aa = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g
          , Ka = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/
          , za = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/
          , ha = RegExp(Z)
          , ta = RegExp("^" + R + "$")
          , da = {
            ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
            CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
            NAME: /^\[name=['"]?((?:\\.|[\w-]|[^\x00-\xa0])+)['"]?\]/,
            TAG: RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
            ATTR: RegExp("^" + ma),
            PSEUDO: RegExp("^" + Z),
            CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
            needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
        }
          , ia = /[\x20\t\r\n\f]*[+~]/
          , ja = /^[^{]+\{\s*\[native code/
          , oa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/
          , pa = /^(?:input|select|textarea|button)$/i
          , qa = /^h\d$/i
          , sa = /'|\\/g
          , va = /=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g
          , xa = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g
          , ya = function(a, b) {
            a = "0x" + b - 65536;
            return a !== a ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(55296 | a >> 10, 56320 | 1023 & a)
        };
        try {
            T.call(Q.documentElement.childNodes, 0)[0].nodeType
        } catch (ra) {
            T = function(a) {
                for (var b, e = []; b = this[a++]; )
                    e.push(b);
                return e
            }
        }
        var wa = g.isXML = function(a) {
            return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
        }
        ;
        var fa = g.setDocument = function(a) {
            var e = a ? a.ownerDocument || a : Q;
            return e !== t && 9 === e.nodeType && e.documentElement ? (t = e,
            I = e.documentElement,
            C = wa(e),
            F.tagNameNoComments = k(function(a) {
                return a.appendChild(e.createComment("")),
                !a.getElementsByTagName("*").length
            }),
            F.attributes = k(function(a) {
                a.innerHTML = "<select></select>";
                a = typeof a.lastChild.getAttribute("multiple");
                return "boolean" !== a && "string" !== a
            }),
            F.getByClassName = k(function(a) {
                return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
                a.getElementsByClassName && a.getElementsByClassName("e").length ? (a.lastChild.className = "e",
                2 === a.getElementsByClassName("e").length) : !1
            }),
            F.getByName = k(function(a) {
                a.id = B + 0;
                a.innerHTML = "<a name='" + B + "'></a><div name='" + B + "'></div>";
                I.insertBefore(a, I.firstChild);
                var b = e.getElementsByName && e.getElementsByName(B).length === 2 + e.getElementsByName(B + 0).length;
                return F.getIdNotName = !e.getElementById(B),
                I.removeChild(a),
                b
            }),
            H.attrHandle = k(function(a) {
                return a.innerHTML = "<a href='#'></a>",
                a.firstChild && typeof a.firstChild.getAttribute !== U && "#" === a.firstChild.getAttribute("href")
            }) ? {} : {
                href: function(a) {
                    return a.getAttribute("href", 2)
                },
                type: function(a) {
                    return a.getAttribute("type")
                }
            },
            F.getIdNotName ? (H.find.ID = function(a, b) {
                if (typeof b.getElementById !== U && !C)
                    return (a = b.getElementById(a)) && a.parentNode ? [a] : []
            }
            ,
            H.filter.ID = function(a) {
                var b = a.replace(xa, ya);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }
            ) : (H.find.ID = function(a, e) {
                if (typeof e.getElementById !== U && !C)
                    return (e = e.getElementById(a)) ? e.id === a || typeof e.getAttributeNode !== U && e.getAttributeNode("id").value === a ? [e] : b : []
            }
            ,
            H.filter.ID = function(a) {
                var b = a.replace(xa, ya);
                return function(a) {
                    return (a = typeof a.getAttributeNode !== U && a.getAttributeNode("id")) && a.value === b
                }
            }
            ),
            H.find.TAG = F.tagNameNoComments ? function(a, e) {
                return typeof e.getElementsByTagName !== U ? e.getElementsByTagName(a) : b
            }
            : function(a, b) {
                var e = []
                  , c = 0;
                b = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; a = b[c++]; )
                        1 === a.nodeType && e.push(a);
                    return e
                }
                return b
            }
            ,
            H.find.NAME = F.getByName && function(a, e) {
                return typeof e.getElementsByName !== U ? e.getElementsByName(name) : b
            }
            ,
            H.find.CLASS = F.getByClassName && function(a, e) {
                return typeof e.getElementsByClassName === U || C ? b : e.getElementsByClassName(a)
            }
            ,
            ka = [],
            O = [":focus"],
            (F.qsa = ja.test(e.querySelectorAll + "")) && (k(function(a) {
                a.innerHTML = "<select><option selected=''></option></select>";
                a.querySelectorAll("[selected]").length || O.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
                a.querySelectorAll(":checked").length || O.push(":checked")
            }),
            k(function(a) {
                a.innerHTML = "<input type='hidden' i=''/>";
                a.querySelectorAll("[i^='']").length && O.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");
                a.querySelectorAll(":enabled").length || O.push(":enabled", ":disabled");
                a.querySelectorAll("*,:x");
                O.push(",.*:")
            })),
            (F.matchesSelector = ja.test((E = I.matchesSelector || I.mozMatchesSelector || I.webkitMatchesSelector || I.oMatchesSelector || I.msMatchesSelector) + "")) && k(function(a) {
                F.disconnectedMatch = E.call(a, "div");
                E.call(a, "[s!='']:x");
                ka.push("!=", Z)
            }),
            O = RegExp(O.join("|")),
            ka = RegExp(ka.join("|")),
            ba = ja.test(I.contains + "") || I.compareDocumentPosition ? function(a, b) {
                var e = 9 === a.nodeType ? a.documentElement : a;
                b = b && b.parentNode;
                return a === b || !(!b || 1 !== b.nodeType || !(e.contains ? e.contains(b) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(b)))
            }
            : function(a, b) {
                if (b)
                    for (; b = b.parentNode; )
                        if (b === a)
                            return !0;
                return !1
            }
            ,
            ca = I.compareDocumentPosition ? function(a, b) {
                var c;
                return a === b ? (y = !0,
                0) : (c = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) ? 1 & c || a.parentNode && 11 === a.parentNode.nodeType ? a === e || ba(Q, a) ? -1 : b === e || ba(Q, b) ? 1 : 0 : 4 & c ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
            }
            : function(a, b) {
                var c = 0
                  , d = a.parentNode
                  , l = b.parentNode
                  , k = [a]
                  , g = [b];
                if (a === b)
                    return y = !0,
                    0;
                if (!d || !l)
                    return a === e ? -1 : b === e ? 1 : d ? -1 : l ? 1 : 0;
                if (d === l)
                    return f(a, b);
                for (; a = a.parentNode; )
                    k.unshift(a);
                for (a = b; a = a.parentNode; )
                    g.unshift(a);
                for (; k[c] === g[c]; )
                    c++;
                return c ? f(k[c], g[c]) : k[c] === Q ? -1 : g[c] === Q ? 1 : 0
            }
            ,
            y = !1,
            [0, 0].sort(ca),
            F.detectDuplicates = y,
            t) : t
        }
        ;
        g.matches = function(a, b) {
            return g(a, null, null, b)
        }
        ;
        g.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== t && fa(a),
            b = b.replace(va, "='$1']"),
            !(!F.matchesSelector || C || ka && ka.test(b) || O.test(b)))
                try {
                    var e = E.call(a, b);
                    if (e || F.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                        return e
                } catch (zc) {}
            return 0 < g(b, t, null, [a]).length
        }
        ;
        g.contains = function(a, b) {
            return (a.ownerDocument || a) !== t && fa(a),
            ba(a, b)
        }
        ;
        g.attr = function(a, b) {
            var e;
            return (a.ownerDocument || a) !== t && fa(a),
            C || (b = b.toLowerCase()),
            (e = H.attrHandle[b]) ? e(a) : C || F.attributes ? a.getAttribute(b) : ((e = a.getAttributeNode(b)) || a.getAttribute(b)) && !0 === a[b] ? b : e && e.specified ? e.value : null
        }
        ;
        g.error = function(a) {
            throw Error("Syntax error, unrecognized expression: " + a);
        }
        ;
        g.uniqueSort = function(a) {
            var b, e = [], c = 1, d = 0;
            if (y = !F.detectDuplicates,
            a.sort(ca),
            y) {
                for (; b = a[c]; c++)
                    b === a[c - 1] && (d = e.push(c));
                for (; d--; )
                    a.splice(e[d], 1)
            }
            return a
        }
        ;
        var na = g.getText = function(a) {
            var b, e = "", c = 0;
            if (b = a.nodeType)
                if (1 === b || 9 === b || 11 === b) {
                    if ("string" == typeof a.textContent)
                        return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)
                        e += na(a)
                } else {
                    if (3 === b || 4 === b)
                        return a.nodeValue
                }
            else
                for (; b = a[c]; c++)
                    e += na(b);
            return e
        }
        ;
        var H = g.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: da,
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(xa, ya),
                    a[3] = (a[4] || a[5] || "").replace(xa, ya),
                    "~=" === a[2] && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    "nth" === a[1].slice(0, 3) ? (a[3] || g.error(a[0]),
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])),
                    a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && g.error(a[0]),
                    a
                },
                PSEUDO: function(a) {
                    var b, e = !a[5] && a[2];
                    return da.CHILD.test(a[0]) ? null : (a[4] ? a[2] = a[4] : e && ha.test(e) && (b = h(e, !0)) && (b = e.indexOf(")", e.length - b) - e.length) && (a[0] = a[0].slice(0, b),
                    a[2] = e.slice(0, b)),
                    a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    return "*" === a ? function() {
                        return !0
                    }
                    : (a = a.replace(xa, ya).toLowerCase(),
                    function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a
                    }
                    )
                },
                CLASS: function(a) {
                    var b = M[a + " "];
                    return b || (b = RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && M(a, function(a) {
                        return b.test(a.className || typeof a.getAttribute !== U && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, e) {
                    return function(c) {
                        c = g.attr(c, a);
                        return null == c ? "!=" === b : b ? (c += "",
                        "=" === b ? c === e : "!=" === b ? c !== e : "^=" === b ? e && 0 === c.indexOf(e) : "*=" === b ? e && -1 < c.indexOf(e) : "$=" === b ? e && c.slice(-e.length) === e : "~=" === b ? -1 < (" " + c + " ").indexOf(e) : "|=" === b ? c === e || c.slice(0, e.length + 1) === e + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, e, c, d) {
                    var l = "nth" !== a.slice(0, 3)
                      , k = "last" !== a.slice(-4)
                      , g = "of-type" === b;
                    return 1 === c && 0 === d ? function(a) {
                        return !!a.parentNode
                    }
                    : function(b, e, p) {
                        var f;
                        e = l !== k ? "nextSibling" : "previousSibling";
                        var r = b.parentNode
                          , u = g && b.nodeName.toLowerCase();
                        p = !p && !g;
                        if (r) {
                            if (l) {
                                for (; e; ) {
                                    for (f = b; f = f[e]; )
                                        if (g ? f.nodeName.toLowerCase() === u : 1 === f.nodeType)
                                            return !1;
                                    var v = e = "only" === a && !v && "nextSibling"
                                }
                                return !0
                            }
                            if (v = [k ? r.firstChild : r.lastChild],
                            k && p) {
                                p = r[B] || (r[B] = {});
                                var m = p[a] || [];
                                var h = m[0] === N && m[1];
                                var D = m[0] === N && m[2];
                                for (f = h && r.childNodes[h]; f = ++h && f && f[e] || (D = h = 0) || v.pop(); )
                                    if (1 === f.nodeType && ++D && f === b) {
                                        p[a] = [N, h, D];
                                        break
                                    }
                            } else if (p && (m = (b[B] || (b[B] = {}))[a]) && m[0] === N)
                                D = m[1];
                            else
                                for (; (f = ++h && f && f[e] || (D = h = 0) || v.pop()) && ((g ? f.nodeName.toLowerCase() !== u : 1 !== f.nodeType) || !++D || (p && ((f[B] || (f[B] = {}))[a] = [N, D]),
                                f !== b)); )
                                    ;
                            return D -= d,
                            D === c || 0 === D % c && 0 <= D / c
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var e, c = H.pseudos[a] || H.setFilters[a.toLowerCase()] || g.error("unsupported pseudo: " + a);
                    return c[B] ? c(b) : 1 < c.length ? (e = [a, a, "", b],
                    H.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, e) {
                        for (var d, l = c(a, b), k = l.length; k--; )
                            d = X.call(a, l[k]),
                            a[d] = !(e[d] = l[k])
                    }) : function(a) {
                        return c(a, 0, e)
                    }
                    ) : c
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = []
                      , e = []
                      , c = ua(a.replace(aa, "$1"));
                    return c[B] ? d(function(a, b, e, d) {
                        var l;
                        e = c(a, null, d, []);
                        for (d = a.length; d--; )
                            (l = e[d]) && (a[d] = !(b[d] = l))
                    }) : function(a, d, l) {
                        return b[0] = a,
                        c(b, null, l, e),
                        !e.pop()
                    }
                }),
                has: d(function(a) {
                    return function(b) {
                        return 0 < g(a, b).length
                    }
                }),
                contains: d(function(a) {
                    return function(b) {
                        return -1 < (b.textContent || b.innerText || na(b)).indexOf(a)
                    }
                }),
                lang: d(function(a) {
                    return ta.test(a || "") || g.error("unsupported lang: " + a),
                    a = a.replace(xa, ya).toLowerCase(),
                    function(b) {
                        var e;
                        do
                            if (e = C ? b.getAttribute("xml:lang") || b.getAttribute("lang") : b.lang)
                                return e = e.toLowerCase(),
                                e === a || 0 === e.indexOf(a + "-");
                        while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }),
                target: function(b) {
                    var e = a.location && a.location.hash;
                    return e && e.slice(1) === b.id
                },
                root: function(a) {
                    return a === I
                },
                focus: function(a) {
                    return a === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return !1 === a.disabled
                },
                disabled: function(a) {
                    return !0 === a.disabled
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    !0 === a.selected
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if ("@" < a.nodeName || 3 === a.nodeType || 4 === a.nodeType)
                            return !1;
                    return !0
                },
                parent: function(a) {
                    return !H.pseudos.empty(a)
                },
                header: function(a) {
                    return qa.test(a.nodeName)
                },
                input: function(a) {
                    return pa.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
                },
                first: m(function() {
                    return [0]
                }),
                last: m(function(a, b) {
                    return [b - 1]
                }),
                eq: m(function(a, b, e) {
                    return [0 > e ? e + b : e]
                }),
                even: m(function(a, b) {
                    for (var e = 0; b > e; e += 2)
                        a.push(e);
                    return a
                }),
                odd: m(function(a, b) {
                    for (var e = 1; b > e; e += 2)
                        a.push(e);
                    return a
                }),
                lt: m(function(a, b, e) {
                    for (b = 0 > e ? e + b : e; 0 <= --b; )
                        a.push(b);
                    return a
                }),
                gt: m(function(a, b, e) {
                    for (e = 0 > e ? e + b : e; b > ++e; )
                        a.push(e);
                    return a
                })
            }
        };
        for (z in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            H.pseudos[z] = r(z);
        for (z in {
            submit: !0,
            reset: !0
        })
            H.pseudos[z] = v(z);
        var ua = g.compile = function(a, b) {
            var e, c = [], d = [], l = S[a + " "];
            if (!l) {
                b || (b = h(a));
                for (e = b.length; e--; )
                    l = W(b[e]),
                    l[B] ? c.push(l) : d.push(l);
                l = S(a, P(d, c))
            }
            return l
        }
        ;
        H.pseudos.nth = H.pseudos.eq;
        H.filters = q.prototype = H.pseudos;
        H.setFilters = new q;
        fa();
        g.attr = e.attr;
        e.find = g;
        e.expr = g.selectors;
        e.expr[":"] = e.expr.pseudos;
        e.unique = g.uniqueSort;
        e.text = g.getText;
        e.isXMLDoc = g.isXML;
        e.contains = g.contains
    }
    )(m);
    var Yb = /Until$/
      , Zb = /^(?:parents|prev(?:Until|All))/
      , Bb = /^.[^:#\[\.,]*$/
      , kb = e.expr.match.needsContext
      , $b = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    e.fn.extend({
        find: function(a) {
            var b, c, d = this.length;
            if ("string" != typeof a)
                return c = this,
                this.pushStack(e(a).filter(function() {
                    for (b = 0; d > b; b++)
                        if (e.contains(c[b], this))
                            return !0
                }));
            var k = [];
            for (b = 0; d > b; b++)
                e.find(a, this[b], k);
            return k = this.pushStack(1 < d ? e.unique(k) : k),
            k.selector = (this.selector ? this.selector + " " : "") + a,
            k
        },
        has: function(a) {
            var b, c = e(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++)
                    if (e.contains(this, c[b]))
                        return !0
            })
        },
        not: function(a) {
            return this.pushStack(U(this, a, !1))
        },
        filter: function(a) {
            return this.pushStack(U(this, a, !0))
        },
        is: function(a) {
            return !!a && ("string" == typeof a ? kb.test(a) ? 0 <= e(a, this.context).index(this[0]) : 0 < e.filter(a, this).length : 0 < this.filter(a).length)
        },
        closest: function(a, b) {
            for (var c, d = 0, k = this.length, g = [], f = kb.test(a) || "string" != typeof a ? e(a, b || this.context) : 0; k > d; d++)
                for (c = this[d]; c && c.ownerDocument && c !== b && 11 !== c.nodeType; ) {
                    if (f ? -1 < f.index(c) : e.find.matchesSelector(c, a)) {
                        g.push(c);
                        break
                    }
                    c = c.parentNode
                }
            return this.pushStack(1 < g.length ? e.unique(g) : g)
        },
        index: function(a) {
            return a ? "string" == typeof a ? e.inArray(this[0], e(a)) : e.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            a = "string" == typeof a ? e(a, b) : e.makeArray(a && a.nodeType ? [a] : a);
            a = e.merge(this.get(), a);
            return this.pushStack(e.unique(a))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    e.fn.andSelf = e.fn.addBack;
    e.each({
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        },
        parents: function(a) {
            return e.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return e.dir(a, "parentNode", c)
        },
        next: function(a) {
            return B(a, "nextSibling")
        },
        prev: function(a) {
            return B(a, "previousSibling")
        },
        nextAll: function(a) {
            return e.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return e.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return e.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return e.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return e.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return e.sibling(a.firstChild)
        },
        contents: function(a) {
            return e.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : e.merge([], a.childNodes)
        }
    }, function(a, b) {
        e.fn[a] = function(c, d) {
            var l = e.map(this, b, c);
            return Yb.test(a) || (d = c),
            d && "string" == typeof d && (l = e.filter(d, l)),
            l = 1 < this.length && !$b[a] ? e.unique(l) : l,
            1 < this.length && Zb.test(a) && (l = l.reverse()),
            this.pushStack(l)
        }
    });
    e.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"),
            1 === b.length ? e.find.matchesSelector(b[0], a) ? [b[0]] : [] : e.find.matches(a, b)
        },
        dir: function(a, b, c) {
            var d = [];
            for (a = a[b]; a && 9 !== a.nodeType && (c === n || 1 !== a.nodeType || !e(a).is(c)); )
                1 === a.nodeType && d.push(a),
                a = a[b];
            return d
        },
        sibling: function(a, b) {
            for (var e = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && e.push(a);
            return e
        }
    });
    var Za = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , ac = / jQuery\d+="(?:null|\d+)"/g
      , lb = RegExp("<(?:" + Za + ")[\\s/>]", "i")
      , Ra = /^\s+/
      , mb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , nb = /<([\w:]+)/
      , ob = /<tbody/i
      , bc = /<|&#?\w+;/
      , cc = /<(?:script|style|link)/i
      , Ia = /^(?:checkbox|radio)$/i
      , dc = /checked\s*(?:[^=]|=\s*.checked.)/i
      , pb = /^$|\/(?:java|ecma)script/i
      , Cb = /^true\/(.*)/
      , ec = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , Z = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: e.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }
      , Sa = Q(A).appendChild(A.createElement("div"));
    Z.optgroup = Z.option;
    Z.tbody = Z.tfoot = Z.colgroup = Z.caption = Z.thead;
    Z.th = Z.td;
    e.fn.extend({
        text: function(a) {
            return e.access(this, function(a) {
                return a === n ? e.text(this) : this.empty().append((this[0] && this[0].ownerDocument || A).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function(a) {
            if (e.isFunction(a))
                return this.each(function(b) {
                    e(this).wrapAll(a.call(this, b))
                });
            if (this[0]) {
                var b = e(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; )
                        a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return e.isFunction(a) ? this.each(function(b) {
                e(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = e(this)
                  , c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = e.isFunction(a);
            return this.each(function(c) {
                e(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                e.nodeName(this, "body") || e(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            return this.domManip(arguments, !1, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, !1, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = 0; null != (c = this[d]); d++)
                (!a || 0 < e.filter(a, [c]).length) && (b || 1 !== c.nodeType || e.cleanData(M(c)),
                c.parentNode && (b && e.contains(c.ownerDocument, c) && X(M(c, "script")),
                c.parentNode.removeChild(c)));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && e.cleanData(M(a, !1)); a.firstChild; )
                    a.removeChild(a.firstChild);
                a.options && e.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a,
            b = null == b ? a : b,
            this.map(function() {
                return e.clone(this, a, b)
            })
        },
        html: function(a) {
            return e.access(this, function(a) {
                var b = this[0] || {}
                  , c = 0
                  , d = this.length;
                if (a === n)
                    return 1 === b.nodeType ? b.innerHTML.replace(ac, "") : n;
                if (!("string" != typeof a || cc.test(a) || !e.support.htmlSerialize && lb.test(a) || !e.support.leadingWhitespace && Ra.test(a) || Z[(nb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(mb, "<$1></$2>");
                    try {
                        for (; d > c; c++)
                            b = this[c] || {},
                            1 === b.nodeType && (e.cleanData(M(b, !1)),
                            b.innerHTML = a);
                        b = 0
                    } catch (D) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function(a) {
            return e.isFunction(a) || "string" == typeof a || (a = e(a).not(this).detach()),
            this.domManip([a], !0, function(a) {
                var b = this.nextSibling
                  , c = this.parentNode;
                c && (e(this).remove(),
                c.insertBefore(a, b))
            })
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b, c) {
            a = bb.apply([], a);
            var d, l, k, g = 0, f = this.length, r = this, v = f - 1, m = a[0], h = e.isFunction(m);
            if (h || !(1 >= f || "string" != typeof m || e.support.checkClone) && dc.test(m))
                return this.each(function(e) {
                    var d = r.eq(e);
                    h && (a[0] = m.call(this, e, b ? d.html() : n));
                    d.domManip(a, b, c)
                });
            if (f && (k = e.buildFragment(a, this[0].ownerDocument, !1, this),
            d = k.firstChild,
            1 === k.childNodes.length && (k = d),
            d)) {
                b = b && e.nodeName(d, "tr");
                var x = e.map(M(k, "script"), R);
                for (l = x.length; f > g; g++)
                    d = k,
                    g !== v && (d = e.clone(d, !0, !0),
                    l && e.merge(x, M(d, "script"))),
                    c.call(b && e.nodeName(this[g], "table") ? ca(this[g], "tbody") : this[g], d, g);
                if (l)
                    for (k = x[x.length - 1].ownerDocument,
                    e.map(x, S),
                    g = 0; l > g; g++)
                        d = x[g],
                        pb.test(d.type || "") && !e._data(d, "globalEval") && e.contains(k, d) && (d.src ? e.ajax({
                            url: d.src,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            "throws": !0
                        }) : e.globalEval((d.text || d.textContent || d.innerHTML || "").replace(ec, "")));
                k = d = null
            }
            return this
        }
    });
    e.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        e.fn[a] = function(a) {
            for (var c = 0, d = [], l = e(a), k = l.length - 1; k >= c; c++)
                a = c === k ? this : this.clone(!0),
                e(l[c])[b](a),
                La.apply(d, a.get());
            return this.pushStack(d)
        }
    });
    e.extend({
        clone: function(a, b, c) {
            var d, l, k, g = e.contains(a.ownerDocument, a);
            if (e.support.html5Clone || e.isXMLDoc(a) || !lb.test("<" + a.nodeName + ">") ? l = a.cloneNode(!0) : (Sa.innerHTML = a.outerHTML,
            Sa.removeChild(l = Sa.firstChild)),
            !(e.support.noCloneEvent && e.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || e.isXMLDoc(a))) {
                var f = M(l);
                var r = M(a);
                for (k = 0; null != (d = r[k]); ++k)
                    if (f[k]) {
                        var v = void 0, m, h = d, x = f[k];
                        if (1 === x.nodeType) {
                            if (m = x.nodeName.toLowerCase(),
                            !e.support.noCloneEvent && x[e.expando]) {
                                d = e._data(x);
                                for (v in d.events)
                                    e.removeEvent(x, v, d.handle);
                                x.removeAttribute(e.expando)
                            }
                            "script" === m && x.text !== h.text ? (R(x).text = h.text,
                            S(x)) : "object" === m ? (x.parentNode && (x.outerHTML = h.outerHTML),
                            e.support.html5Clone && h.innerHTML && !e.trim(x.innerHTML) && (x.innerHTML = h.innerHTML)) : "input" === m && Ia.test(h.type) ? (x.defaultChecked = x.checked = h.checked,
                            x.value !== h.value && (x.value = h.value)) : "option" === m ? x.defaultSelected = x.selected = h.defaultSelected : ("input" === m || "textarea" === m) && (x.defaultValue = h.defaultValue)
                        }
                    }
            }
            if (b)
                if (c)
                    for (r = r || M(a),
                    f = f || M(l),
                    k = 0; null != (d = r[k]); k++)
                        T(d, f[k]);
                else
                    T(a, l);
            return f = M(l, "script"),
            0 < f.length && X(f, !g && M(a, "script")),
            l
        },
        buildFragment: function(a, b, c, d) {
            for (var l, k, g, f, p, r, v, m = a.length, h = Q(b), x = [], G = 0; m > G; G++)
                if (k = a[G],
                k || 0 === k)
                    if ("object" === e.type(k))
                        e.merge(x, k.nodeType ? [k] : k);
                    else if (bc.test(k)) {
                        f = f || h.appendChild(b.createElement("div"));
                        p = (nb.exec(k) || ["", ""])[1].toLowerCase();
                        v = Z[p] || Z._default;
                        f.innerHTML = v[1] + k.replace(mb, "<$1></$2>") + v[2];
                        for (l = v[0]; l--; )
                            f = f.lastChild;
                        if (!e.support.leadingWhitespace && Ra.test(k) && x.push(b.createTextNode(Ra.exec(k)[0])),
                        !e.support.tbody)
                            for (l = (k = "table" !== p || ob.test(k) ? "<table>" !== v[1] || ob.test(k) ? 0 : f : f.firstChild) && k.childNodes.length; l--; )
                                e.nodeName(r = k.childNodes[l], "tbody") && !r.childNodes.length && k.removeChild(r);
                        e.merge(x, f.childNodes);
                        for (f.textContent = ""; f.firstChild; )
                            f.removeChild(f.firstChild);
                        f = h.lastChild
                    } else
                        x.push(b.createTextNode(k));
            f && h.removeChild(f);
            e.support.appendChecked || e.grep(M(x, "input"), aa);
            for (G = 0; k = x[G++]; )
                if ((!d || -1 === e.inArray(k, d)) && (g = e.contains(k.ownerDocument, k),
                f = M(h.appendChild(k), "script"),
                g && X(f),
                c))
                    for (l = 0; k = f[l++]; )
                        pb.test(k.type || "") && c.push(k);
            return h
        },
        cleanData: function(a, b) {
            for (var c, d, k, g, f = 0, r = e.expando, v = e.cache, m = e.support.deleteExpando, h = e.event.special; null != (c = a[f]); f++)
                if ((b || e.acceptData(c)) && (k = c[r],
                g = k && v[k])) {
                    if (g.events)
                        for (d in g.events)
                            h[d] ? e.event.remove(c, d) : e.removeEvent(c, d, g.handle);
                    v[k] && (delete v[k],
                    m ? delete c[r] : typeof c.removeAttribute !== W ? c.removeAttribute(r) : c[r] = null,
                    ta.push(k))
                }
        }
    });
    var ua, ja, oa, Ta = /alpha\([^)]*\)/i, fc = /opacity\s*=\s*([^)]*)/, gc = /^(top|right|bottom|left)$/, hc = /^(none|table(?!-c[ea]).+)/, qb = /^margin/, Db = RegExp("^(" + Fa + ")(.*)$", "i"), Ca = RegExp("^(" + Fa + ")(?!px)[a-z%]+$", "i"), ic = RegExp("^([+-])=(" + Fa + ")", "i"), ab = {
        BODY: "block"
    }, jc = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, rb = {
        letterSpacing: 0,
        fontWeight: 400
    }, ia = ["Top", "Right", "Bottom", "Left"], $a = ["Webkit", "O", "Moz", "ms"];
    e.fn.extend({
        css: function(a, b) {
            return e.access(this, function(a, b, c) {
                var d = {}
                  , l = 0;
                if (e.isArray(b)) {
                    var k = ja(a);
                    for (c = b.length; c > l; l++)
                        d[b[l]] = e.css(a, b[l], !1, k);
                    return d
                }
                return c !== n ? e.style(a, b, c) : e.css(a, b)
            }, a, b, 1 < arguments.length)
        },
        show: function() {
            return z(this, !0)
        },
        hide: function() {
            return z(this)
        },
        toggle: function(a) {
            var b = "boolean" == typeof a;
            return this.each(function() {
                (b ? a : f(this)) ? e(this).show() : e(this).hide()
            })
        }
    });
    e.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b)
                        return a = oa(a, "opacity"),
                        "" === a ? "1" : a
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": e.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var l, k, g, f = e.camelCase(b), p = a.style;
                if (b = e.cssProps[f] || (e.cssProps[f] = V(p, f)),
                g = e.cssHooks[b] || e.cssHooks[f],
                c === n)
                    return g && "get"in g && (l = g.get(a, !1, d)) !== n ? l : p[b];
                if (k = typeof c,
                "string" === k && (l = ic.exec(c)) && (c = (l[1] + 1) * l[2] + parseFloat(e.css(a, b)),
                k = "number"),
                !(null == c || "number" === k && isNaN(c) || ("number" !== k || e.cssNumber[f] || (c += "px"),
                e.support.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (p[b] = "inherit"),
                g && "set"in g && (c = g.set(a, c, d)) === n)))
                    try {
                        p[b] = c
                    } catch (xc) {}
            }
        },
        css: function(a, b, c, d) {
            var k, l, g, f = e.camelCase(b);
            return b = e.cssProps[f] || (e.cssProps[f] = V(a.style, f)),
            g = e.cssHooks[b] || e.cssHooks[f],
            g && "get"in g && (l = g.get(a, !0, c)),
            l === n && (l = oa(a, b, d)),
            "normal" === l && b in rb && (l = rb[b]),
            "" === c || c ? (k = parseFloat(l),
            !0 === c || e.isNumeric(k) ? k || 0 : l) : l
        },
        swap: function(a, b, e, c) {
            var d, k = {};
            for (d in b)
                k[d] = a.style[d],
                a.style[d] = b[d];
            e = e.apply(a, c || []);
            for (d in b)
                a.style[d] = k[d];
            return e
        }
    });
    m.getComputedStyle ? (ja = function(a) {
        return m.getComputedStyle(a, null)
    }
    ,
    oa = function(a, b, c) {
        var d, k, l, g = (c = c || ja(a)) ? c.getPropertyValue(b) || c[b] : n, f = a.style;
        return c && ("" !== g || e.contains(a.ownerDocument, a) || (g = e.style(a, b)),
        Ca.test(g) && qb.test(b) && (d = f.width,
        k = f.minWidth,
        l = f.maxWidth,
        f.minWidth = f.maxWidth = f.width = g,
        g = c.width,
        f.width = d,
        f.minWidth = k,
        f.maxWidth = l)),
        g
    }
    ) : A.documentElement.currentStyle && (ja = function(a) {
        return a.currentStyle
    }
    ,
    oa = function(a, b, e) {
        var c, d, k;
        e = (e = e || ja(a)) ? e[b] : n;
        var l = a.style;
        return null == e && l && l[b] && (e = l[b]),
        Ca.test(e) && !gc.test(b) && (c = l.left,
        d = a.runtimeStyle,
        k = d && d.left,
        k && (d.left = a.currentStyle.left),
        l.left = "fontSize" === b ? "1em" : e,
        e = l.pixelLeft + "px",
        l.left = c,
        k && (d.left = k)),
        "" === e ? "auto" : e
    }
    );
    e.each(["height", "width"], function(a, b) {
        e.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? 0 === a.offsetWidth && hc.test(e.css(a, "display")) ? e.swap(a, jc, function() {
                    return J(a, b, d)
                }) : J(a, b, d) : n
            },
            set: function(a, c, d) {
                var k = d && ja(a);
                return L(a, c, d ? I(a, b, d, e.support.boxSizing && "border-box" === e.css(a, "boxSizing", !1, k), k) : 0)
            }
        }
    });
    e.support.opacity || (e.cssHooks.opacity = {
        get: function(a, b) {
            return fc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style;
            a = a.currentStyle;
            var d = e.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : ""
              , k = a && a.filter || c.filter || "";
            c.zoom = 1;
            (1 <= b || "" === b) && "" === e.trim(k.replace(Ta, "")) && c.removeAttribute && (c.removeAttribute("filter"),
            "" === b || a && !a.filter) || (c.filter = Ta.test(k) ? k.replace(Ta, d) : k + " " + d)
        }
    });
    e(function() {
        e.support.reliableMarginRight || (e.cssHooks.marginRight = {
            get: function(a, b) {
                return b ? e.swap(a, {
                    display: "inline-block"
                }, oa, [a, "marginRight"]) : n
            }
        });
        !e.support.pixelPosition && e.fn.position && e.each(["top", "left"], function(a, b) {
            e.cssHooks[b] = {
                get: function(a, c) {
                    return c ? (c = oa(a, b),
                    Ca.test(c) ? e(a).position()[b] + "px" : c) : n
                }
            }
        })
    });
    e.expr && e.expr.filters && (e.expr.filters.hidden = function(a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !e.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || e.css(a, "display"))
    }
    ,
    e.expr.filters.visible = function(a) {
        return !e.expr.filters.hidden(a)
    }
    );
    e.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        e.cssHooks[a + b] = {
            expand: function(e) {
                var c = 0
                  , d = {};
                for (e = "string" == typeof e ? e.split(" ") : [e]; 4 > c; c++)
                    d[a + ia[c] + b] = e[c] || e[c - 2] || e[0];
                return d
            }
        };
        qb.test(a) || (e.cssHooks[a + b].set = L)
    });
    var kc = /%20/g
      , Eb = /\[\]$/
      , sb = /\r?\n/g
      , lc = /^(?:submit|button|image|reset|file)$/i
      , mc = /^(?:input|select|textarea|keygen)/i;
    e.fn.extend({
        serialize: function() {
            return e.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = e.prop(this, "elements");
                return a ? e.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !e(this).is(":disabled") && mc.test(this.nodeName) && !lc.test(a) && (this.checked || !Ia.test(a))
            }).map(function(a, b) {
                a = e(this).val();
                return null == a ? null : e.isArray(a) ? e.map(a, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(sb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: a.replace(sb, "\r\n")
                }
            }).get()
        }
    });
    e.param = function(a, b) {
        var c, d = [], k = function(a, b) {
            b = e.isFunction(b) ? b() : null == b ? "" : b;
            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (b === n && (b = e.ajaxSettings && e.ajaxSettings.traditional),
        e.isArray(a) || a.jquery && !e.isPlainObject(a))
            e.each(a, function() {
                k(this.name, this.value)
            });
        else
            for (c in a)
                F(c, a[c], b, k);
        return d.join("&").replace(kc, "+")
    }
    ;
    e.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        e.fn[b] = function(a, e) {
            return 0 < arguments.length ? this.on(b, null, a, e) : this.trigger(b)
        }
    });
    e.fn.hover = function(a, b) {
        return this.mouseenter(a).mouseleave(b || a)
    }
    ;
    var Ua = e.now()
      , Va = /\?/
      , nc = /#.*$/
      , tb = /([?&])_=[^&]*/
      , oc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
      , pc = /^(?:GET|HEAD)$/
      , qc = /^\/\//
      , ub = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/
      , vb = e.fn.load
      , wb = {}
      , Ja = {}
      , xb = "*/".concat("*");
    try {
        var sa = ka.href
    } catch (a) {
        sa = A.createElement("a"),
        sa.href = "",
        sa = sa.href
    }
    var fa = ub.exec(sa.toLowerCase()) || [];
    e.fn.load = function(a, b, c) {
        if ("string" != typeof a && vb)
            return vb.apply(this, arguments);
        var d, k, l, g = this, f = a.indexOf(" ");
        return 0 <= f && (d = a.slice(f, a.length),
        a = a.slice(0, f)),
        e.isFunction(b) ? (c = b,
        b = n) : b && "object" == typeof b && (l = "POST"),
        0 < g.length && e.ajax({
            url: a,
            type: l,
            dataType: "html",
            data: b
        }).done(function(a) {
            k = arguments;
            g.html(d ? e("<div>").append(e.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, k || [a.responseText, b, a])
        }
        ),
        this
    }
    ;
    e.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        e.fn[b] = function(a) {
            return this.on(b, a)
        }
    });
    e.each(["get", "post"], function(a, b) {
        e[b] = function(a, c, d, k) {
            return e.isFunction(c) && (k = k || d,
            d = c,
            c = n),
            e.ajax({
                url: a,
                type: b,
                dataType: k,
                data: c,
                success: d
            })
        }
    });
    e.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: sa,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(fa[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": xb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": m.String,
                "text html": !0,
                "text json": e.parseJSON,
                "text xml": e.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Y(Y(a, e.ajaxSettings), b) : Y(e.ajaxSettings, a)
        },
        ajaxPrefilter: ea(wb),
        ajaxTransport: ea(Ja),
        ajax: function(a, b) {
            function c(a, b, c, d) {
                var k, l = b;
                if (2 !== z) {
                    z = 2;
                    f && clearTimeout(f);
                    v = n;
                    g = d || "";
                    t.readyState = 0 < a ? 4 : 0;
                    if (c) {
                        var p = h;
                        d = t;
                        var m, u, P, q = p.contents, D = p.dataTypes, y = p.responseFields;
                        for (P in y)
                            P in c && (d[y[P]] = c[P]);
                        for (; "*" === D[0]; )
                            D.shift(),
                            u === n && (u = p.mimeType || d.getResponseHeader("Content-Type"));
                        if (u)
                            for (P in q)
                                if (q[P] && q[P].test(u)) {
                                    D.unshift(P);
                                    break
                                }
                        if (D[0]in c)
                            var L = D[0];
                        else {
                            for (P in c) {
                                if (!D[0] || p.converters[P + " " + D[0]]) {
                                    L = P;
                                    break
                                }
                                m || (m = P)
                            }
                            L = L || m
                        }
                        p = L ? (L !== D[0] && D.unshift(L),
                        c[L]) : n
                    }
                    if (200 <= a && 300 > a || 304 === a)
                        if (h.ifModified && (k = t.getResponseHeader("Last-Modified"),
                        k && (e.lastModified[J] = k),
                        k = t.getResponseHeader("etag"),
                        k && (e.etag[J] = k)),
                        204 === a) {
                            var I = !0;
                            l = "nocontent"
                        } else if (304 === a)
                            I = !0,
                            l = "notmodified";
                        else {
                            a: {
                                c = h;
                                var la = p;
                                var C, B;
                                l = {};
                                m = 0;
                                u = c.dataTypes.slice();
                                L = u[0];
                                if (c.dataFilter && (la = c.dataFilter(la, c.dataType)),
                                u[1])
                                    for (C in c.converters)
                                        l[C.toLowerCase()] = c.converters[C];
                                for (; k = u[++m]; )
                                    if ("*" !== k) {
                                        if ("*" !== L && L !== k) {
                                            if (C = l[L + " " + k] || l["* " + k],
                                            !C)
                                                for (F in l)
                                                    if (B = F.split(" "),
                                                    B[1] === k && (C = l[L + " " + B[0]] || l["* " + B[0]])) {
                                                        !0 === C ? C = l[F] : !0 !== l[F] && (k = B[0],
                                                        u.splice(m--, 0, k));
                                                        break
                                                    }
                                            if (!0 !== C)
                                                if (C && c["throws"])
                                                    la = C(la);
                                                else
                                                    try {
                                                        la = C(la)
                                                    } catch (Xb) {
                                                        var F = {
                                                            state: "parsererror",
                                                            error: C ? Xb : "No conversion from " + L + " to " + k
                                                        };
                                                        break a
                                                    }
                                        }
                                        L = k
                                    }
                                F = {
                                    state: "success",
                                    data: la
                                }
                            }
                            I = F;
                            l = I.state;
                            la = I.data;
                            var O = I.error;
                            I = !O
                        }
                    else
                        O = l,
                        (a || !l) && (l = "error",
                        0 > a && (a = 0));
                    t.status = a;
                    t.statusText = (b || l) + "";
                    I ? w.resolveWith(x, [la, l, t]) : w.rejectWith(x, [t, l, O]);
                    t.statusCode(W);
                    W = n;
                    r && G.trigger(I ? "ajaxSuccess" : "ajaxError", [t, h, I ? la : O]);
                    A.fireWith(x, [t, l]);
                    r && (G.trigger("ajaxComplete", [t, h]),
                    --e.active || e.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof a && (b = a,
            a = n);
            b = b || {};
            var d, k, g, f, r, v, m, h = e.ajaxSetup({}, b), x = h.context || h, G = h.context && (x.nodeType || x.jquery) ? e(x) : e.event, w = e.Deferred(), A = e.Callbacks("once memory"), W = h.statusCode || {}, P = {}, q = {}, z = 0, y = "canceled", t = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === z) {
                        if (!m)
                            for (m = {}; b = oc.exec(g); )
                                m[b[1].toLowerCase()] = b[2];
                        b = m[a.toLowerCase()]
                    }
                    return null == b ? null : b
                },
                getAllResponseHeaders: function() {
                    return 2 === z ? g : null
                },
                setRequestHeader: function(a, b) {
                    var e = a.toLowerCase();
                    return z || (a = q[e] = q[e] || a,
                    P[a] = b),
                    this
                },
                overrideMimeType: function(a) {
                    return z || (h.mimeType = a),
                    this
                },
                statusCode: function(a) {
                    var b;
                    if (a)
                        if (2 > z)
                            for (b in a)
                                W[b] = [W[b], a[b]];
                        else
                            t.always(a[t.status]);
                    return this
                },
                abort: function(a) {
                    a = a || y;
                    return v && v.abort(a),
                    c(0, a),
                    this
                }
            };
            if (w.promise(t).complete = A.add,
            t.success = t.done,
            t.error = t.fail,
            h.url = ((a || h.url || sa) + "").replace(nc, "").replace(qc, fa[1] + "//"),
            h.type = b.method || b.type || h.method || h.type,
            h.dataTypes = e.trim(h.dataType || "*").toLowerCase().match(ha) || [""],
            null == h.crossDomain && (d = ub.exec(h.url.toLowerCase()),
            h.crossDomain = !(!d || d[1] === fa[1] && d[2] === fa[2] && (d[3] || ("http:" === d[1] ? 80 : 443)) == (fa[3] || ("http:" === fa[1] ? 80 : 443)))),
            h.data && h.processData && "string" != typeof h.data && (h.data = e.param(h.data, h.traditional)),
            ma(wb, h, b, t),
            2 === z)
                return t;
            (r = h.global) && 0 === e.active++ && e.event.trigger("ajaxStart");
            h.type = h.type.toUpperCase();
            h.hasContent = !pc.test(h.type);
            var J = h.url;
            h.hasContent || (h.data && (J = h.url += (Va.test(J) ? "&" : "?") + h.data,
            delete h.data),
            !1 === h.cache && (h.url = tb.test(J) ? J.replace(tb, "$1_=" + Ua++) : J + (Va.test(J) ? "&" : "?") + "_=" + Ua++));
            h.ifModified && (e.lastModified[J] && t.setRequestHeader("If-Modified-Since", e.lastModified[J]),
            e.etag[J] && t.setRequestHeader("If-None-Match", e.etag[J]));
            (h.data && h.hasContent && !1 !== h.contentType || b.contentType) && t.setRequestHeader("Content-Type", h.contentType);
            t.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + xb + "; q=0.01" : "") : h.accepts["*"]);
            for (k in h.headers)
                t.setRequestHeader(k, h.headers[k]);
            if (h.beforeSend && (!1 === h.beforeSend.call(x, t, h) || 2 === z))
                return t.abort();
            y = "abort";
            for (k in {
                success: 1,
                error: 1,
                complete: 1
            })
                t[k](h[k]);
            if (v = ma(Ja, h, b, t)) {
                t.readyState = 1;
                r && G.trigger("ajaxSend", [t, h]);
                h.async && 0 < h.timeout && (f = setTimeout(function() {
                    t.abort("timeout")
                }, h.timeout));
                try {
                    z = 1,
                    v.send(P, c)
                } catch (jb) {
                    if (!(2 > z))
                        throw jb;
                    c(-1, jb)
                }
            } else
                c(-1, "No Transport");
            return t
        },
        getScript: function(a, b) {
            return e.get(a, n, b, "script")
        },
        getJSON: function(a, b, c) {
            return e.get(a, b, c, "json")
        }
    });
    e.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return e.globalEval(a),
                a
            }
        }
    });
    e.ajaxPrefilter("script", function(a) {
        a.cache === n && (a.cache = !1);
        a.crossDomain && (a.type = "GET",
        a.global = !1)
    });
    e.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = A.head || e("head")[0] || A.documentElement;
            return {
                send: function(e, d) {
                    b = A.createElement("script");
                    b.async = !0;
                    a.scriptCharset && (b.charset = a.scriptCharset);
                    b.src = a.url;
                    b.onload = b.onreadystatechange = function(a, e) {
                        (e || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null,
                        b.parentNode && b.parentNode.removeChild(b),
                        b = null,
                        e || d(200, "success"))
                    }
                    ;
                    c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(n, !0)
                }
            }
        }
    });
    var yb = []
      , Wa = /(=)\?(?=&|$)|\?\?/;
    e.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = yb.pop() || e.expando + "_" + Ua++;
            return this[a] = !0,
            a
        }
    });
    e.ajaxPrefilter("json jsonp", function(a, b, c) {
        var d, k, l, g = !1 !== a.jsonp && (Wa.test(a.url) ? "url" : "string" == typeof a.data && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && Wa.test(a.data) && "data");
        return g || "jsonp" === a.dataTypes[0] ? (d = a.jsonpCallback = e.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback,
        g ? a[g] = a[g].replace(Wa, "$1" + d) : !1 !== a.jsonp && (a.url += (Va.test(a.url) ? "&" : "?") + a.jsonp + "=" + d),
        a.converters["script json"] = function() {
            return l || e.error(d + " was not called"),
            l[0]
        }
        ,
        a.dataTypes[0] = "json",
        k = m[d],
        m[d] = function() {
            l = arguments
        }
        ,
        c.always(function() {
            m[d] = k;
            a[d] && (a.jsonpCallback = b.jsonpCallback,
            yb.push(d));
            l && e.isFunction(k) && k(l[0]);
            l = k = n
        }),
        "script") : n
    });
    var na, rc = 0, Xa = m.ActiveXObject && function() {
        for (var a in na)
            na[a](n, !0)
    }
    ;
    e.ajaxSettings.xhr = m.ActiveXObject ? function() {
        var a;
        if (!(a = !this.isLocal && d()))
            a: {
                try {
                    a = new m.ActiveXObject("Microsoft.XMLHTTP");
                    break a
                } catch (b) {}
                a = void 0
            }
        return a
    }
    : d;
    var Ga = e.ajaxSettings.xhr();
    e.support.cors = !!Ga && "withCredentials"in Ga;
    (Ga = e.support.ajax = !!Ga) && e.ajaxTransport(function(a) {
        if (!a.crossDomain || e.support.cors) {
            var b;
            return {
                send: function(c, d) {
                    var k, l, g = a.xhr();
                    if (a.username ? g.open(a.type, a.url, a.async, a.username, a.password) : g.open(a.type, a.url, a.async),
                    a.xhrFields)
                        for (l in a.xhrFields)
                            g[l] = a.xhrFields[l];
                    a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType);
                    a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (l in c)
                            g.setRequestHeader(l, c[l])
                    } catch (vc) {}
                    g.send(a.hasContent && a.data || null);
                    b = function(c, l) {
                        try {
                            if (b && (l || 4 === g.readyState))
                                if (b = n,
                                k && (g.onreadystatechange = e.noop,
                                Xa && delete na[k]),
                                l)
                                    4 !== g.readyState && g.abort();
                                else {
                                    var f = {};
                                    var r = g.status;
                                    var p = g.getAllResponseHeaders();
                                    "string" == typeof g.responseText && (f.text = g.responseText);
                                    try {
                                        var h = g.statusText
                                    } catch (fb) {
                                        h = ""
                                    }
                                    r || !a.isLocal || a.crossDomain ? 1223 === r && (r = 204) : r = f.text ? 200 : 404
                                }
                        } catch (fb) {
                            l || d(-1, fb)
                        }
                        f && d(r, h, f, p)
                    }
                    ;
                    a.async ? 4 === g.readyState ? setTimeout(b) : (k = ++rc,
                    Xa && (na || (na = {},
                    e(m).unload(Xa)),
                    na[k] = b),
                    g.onreadystatechange = b) : b()
                },
                abort: function() {
                    b && b(n, !0)
                }
            }
        }
    });
    var va, Ha, sc = /^(?:toggle|show|hide)$/, tc = RegExp("^(?:([+-])=|)(" + Fa + ")([a-z%]*)$", "i"), uc = /queueHooks$/, Da = [function(a, b, c) {
        var d, k, l, g, r, h = this, v = a.style, m = {}, x = [], G = a.nodeType && f(a);
        c.queue || (g = e._queueHooks(a, "fx"),
        null == g.unqueued && (g.unqueued = 0,
        r = g.empty.fire,
        g.empty.fire = function() {
            g.unqueued || r()
        }
        ),
        g.unqueued++,
        h.always(function() {
            h.always(function() {
                g.unqueued--;
                e.queue(a, "fx").length || g.empty.fire()
            })
        }));
        1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [v.overflow, v.overflowX, v.overflowY],
        "inline" === e.css(a, "display") && "none" === e.css(a, "float") && (e.support.inlineBlockNeedsLayout && "inline" !== ba(a.nodeName) ? v.zoom = 1 : v.display = "inline-block"));
        c.overflow && (v.overflow = "hidden",
        e.support.shrinkWrapBlocks || h.always(function() {
            v.overflow = c.overflow[0];
            v.overflowX = c.overflow[1];
            v.overflowY = c.overflow[2]
        }));
        for (k in b)
            (l = b[k],
            sc.exec(l)) && (delete b[k],
            d = d || "toggle" === l,
            l !== (G ? "hide" : "show")) && x.push(k);
        if (b = x.length)
            for (l = e._data(a, "fxshow") || e._data(a, "fxshow", {}),
            ("hidden"in l) && (G = l.hidden),
            d && (l.hidden = !G),
            G ? e(a).show() : h.done(function() {
                e(a).hide()
            }),
            h.done(function() {
                var b;
                e._removeData(a, "fxshow");
                for (b in m)
                    e.style(a, b, m[b])
            }),
            k = 0; b > k; k++) {
                d = x[k];
                var n = h.createTween(d, G ? l[d] : 0);
                m[d] = l[d] || e.style(a, d);
                d in l || (l[d] = n.start,
                G && (n.end = n.start,
                n.start = "width" === d || "height" === d ? 1 : 0))
            }
    }
    ], Aa = {
        "*": [function(a, b) {
            var c, d = this.createTween(a, b), k = tc.exec(b), g = d.cur(), f = +g || 0, r = 1, h = 20;
            if (k) {
                if (b = +k[2],
                c = k[3] || (e.cssNumber[a] ? "" : "px"),
                "px" !== c && f) {
                    f = e.css(d.elem, a, !0) || b || 1;
                    do
                        r = r || ".5",
                        f /= r,
                        e.style(d.elem, a, f + c);
                    while (r !== (r = d.cur() / g) && 1 !== r && --h)
                }
                d.unit = c;
                d.start = f;
                d.end = k[1] ? f + (k[1] + 1) * b : b
            }
            return d
        }
        ]
    };
    e.Animation = e.extend(x, {
        tweener: function(a, b) {
            e.isFunction(a) ? (b = a,
            a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, k = a.length; k > d; d++)
                c = a[d],
                Aa[c] = Aa[c] || [],
                Aa[c].unshift(b)
        },
        prefilter: function(a, b) {
            b ? Da.unshift(a) : Da.push(a)
        }
    });
    e.Tween = k;
    k.prototype = {
        constructor: k,
        init: function(a, b, c, d, k, g) {
            this.elem = a;
            this.prop = c;
            this.easing = k || "swing";
            this.options = b;
            this.start = this.now = this.cur();
            this.end = d;
            this.unit = g || (e.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = k.propHooks[this.prop];
            return a && a.get ? a.get(this) : k.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = k.propHooks[this.prop];
            return this.pos = b = this.options.duration ? e.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a,
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : k.propHooks._default.set(this),
            this
        }
    };
    k.prototype.init.prototype = k.prototype;
    k.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = e.css(a.elem, a.prop, ""),
                b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                e.fx.step[a.prop] ? e.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[e.cssProps[a.prop]] || e.cssHooks[a.prop]) ? e.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    };
    k.propHooks.scrollTop = k.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    };
    e.each(["toggle", "show", "hide"], function(a, b) {
        var c = e.fn[b];
        e.fn[b] = function(a, e, d) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(r(b, !0), a, e, d)
        }
    });
    e.fn.extend({
        fadeTo: function(a, b, e, c) {
            return this.filter(f).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, e, c)
        },
        animate: function(a, b, c, d) {
            var k = e.isEmptyObject(a)
              , l = e.speed(b, c, d)
              , g = function() {
                var b = x(this, e.extend({}, a), l);
                g.finish = function() {
                    b.stop(!0)
                }
                ;
                (k || e._data(this, "finish")) && b.stop(!0)
            };
            return g.finish = g,
            k || !1 === l.queue ? this.each(g) : this.queue(l.queue, g)
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop;
                b(c)
            };
            return "string" != typeof a && (c = b,
            b = a,
            a = n),
            b && !1 !== a && this.queue(a || "fx", []),
            this.each(function() {
                var b = !0
                  , k = null != a && a + "queueHooks"
                  , l = e.timers
                  , g = e._data(this);
                if (k)
                    g[k] && g[k].stop && d(g[k]);
                else
                    for (k in g)
                        g[k] && g[k].stop && uc.test(k) && d(g[k]);
                for (k = l.length; k--; )
                    l[k].elem !== this || null != a && l[k].queue !== a || (l[k].anim.stop(c),
                    b = !1,
                    l.splice(k, 1));
                !b && c || e.dequeue(this, a)
            })
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"),
            this.each(function() {
                var b = e._data(this)
                  , c = b[a + "queue"];
                var d = b[a + "queueHooks"];
                var k = e.timers
                  , g = c ? c.length : 0;
                b.finish = !0;
                e.queue(this, a, []);
                d && d.cur && d.cur.finish && d.cur.finish.call(this);
                for (d = k.length; d--; )
                    k[d].elem === this && k[d].queue === a && (k[d].anim.stop(!0),
                    k.splice(d, 1));
                for (d = 0; g > d; d++)
                    c[d] && c[d].finish && c[d].finish.call(this);
                delete b.finish
            })
        }
    });
    e.each({
        slideDown: r("show"),
        slideUp: r("hide"),
        slideToggle: r("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        e.fn[a] = function(a, e, c) {
            return this.animate(b, a, e, c)
        }
    });
    e.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? e.extend({}, a) : {
            complete: c || !c && b || e.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !e.isFunction(b) && b
        };
        return d.duration = e.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in e.fx.speeds ? e.fx.speeds[d.duration] : e.fx.speeds._default,
        (null == d.queue || !0 === d.queue) && (d.queue = "fx"),
        d.old = d.complete,
        d.complete = function() {
            e.isFunction(d.old) && d.old.call(this);
            d.queue && e.dequeue(this, d.queue)
        }
        ,
        d
    }
    ;
    e.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    };
    e.timers = [];
    e.fx = k.prototype.init;
    e.fx.tick = function() {
        var a = e.timers
          , b = 0;
        for (va = e.now(); a.length > b; b++) {
            var c = a[b];
            c() || a[b] !== c || a.splice(b--, 1)
        }
        a.length || e.fx.stop();
        va = n
    }
    ;
    e.fx.timer = function(a) {
        a() && e.timers.push(a) && e.fx.start()
    }
    ;
    e.fx.interval = 13;
    e.fx.start = function() {
        Ha || (Ha = setInterval(e.fx.tick, e.fx.interval))
    }
    ;
    e.fx.stop = function() {
        clearInterval(Ha);
        Ha = null
    }
    ;
    e.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    e.fx.step = {};
    e.expr && e.expr.filters && (e.expr.filters.animated = function(a) {
        return e.grep(e.timers, function(b) {
            return a === b.elem
        }).length
    }
    );
    e.fn.offset = function(a) {
        if (arguments.length)
            return a === n ? this : this.each(function(b) {
                e.offset.setOffset(this, a, b)
            });
        var b, c, d = {
            top: 0,
            left: 0
        }, k = this[0], g = k && k.ownerDocument;
        if (g)
            return b = g.documentElement,
            e.contains(b, k) ? (typeof k.getBoundingClientRect !== W && (d = k.getBoundingClientRect()),
            c = G(g),
            {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d
    }
    ;
    e.offset = {
        setOffset: function(a, b, c) {
            var d = e.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var k = e(a), g = k.offset(), l = e.css(a, "top"), f = e.css(a, "left"), r = {}, h = {}, v, m;
            ("absolute" === d || "fixed" === d) && -1 < e.inArray("auto", [l, f]) ? (h = k.position(),
            v = h.top,
            m = h.left) : (v = parseFloat(l) || 0,
            m = parseFloat(f) || 0);
            e.isFunction(b) && (b = b.call(a, c, g));
            null != b.top && (r.top = b.top - g.top + v);
            null != b.left && (r.left = b.left - g.left + m);
            "using"in b ? b.using.call(a, r) : k.css(r)
        }
    };
    e.fn.extend({
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                }, d = this[0];
                return "fixed" === e.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(),
                b = this.offset(),
                e.nodeName(a[0], "html") || (c = a.offset()),
                c.top += e.css(a[0], "borderTopWidth", !0),
                c.left += e.css(a[0], "borderLeftWidth", !0)),
                {
                    top: b.top - c.top - e.css(d, "marginTop", !0),
                    left: b.left - c.left - e.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || A.documentElement; a && !e.nodeName(a, "html") && "static" === e.css(a, "position"); )
                    a = a.offsetParent;
                return a || A.documentElement
            })
        }
    });
    e.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        e.fn[a] = function(d) {
            return e.access(this, function(a, d, k) {
                var g = G(a);
                return k === n ? g ? b in g ? g[b] : g.document.documentElement[d] : a[d] : (g ? g.scrollTo(c ? e(g).scrollLeft() : k, c ? k : e(g).scrollTop()) : a[d] = k,
                n)
            }, a, d, arguments.length, null)
        }
    });
    e.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        e.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            e.fn[d] = function(d, k) {
                var g = arguments.length && (c || "boolean" != typeof d)
                  , l = c || (!0 === d || !0 === k ? "margin" : "border");
                return e.access(this, function(b, c, d) {
                    var k;
                    return e.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (k = b.documentElement,
                    Math.max(b.body["scroll" + a], k["scroll" + a], b.body["offset" + a], k["offset" + a], k["client" + a])) : d === n ? e.css(b, c, l) : e.style(b, c, d, l)
                }, b, g ? d : n, g, null)
            }
        })
    });
    m.jQuery = m.$ = e;
    "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return e
    })
}
)(window);
/*
 jQuery Templates Plugin 1.0.0pre
 http://github.com/jquery/jquery-tmpl
 Requires jQuery 1.4.2

 Copyright 2011, Software Freedom Conservancy, Inc.
 Licensed under the MIT license.
 http://jquery.org/license
*/
(function(m) {
    function n(h, n, w, q) {
        q = {
            data: q || 0 === q || !1 === q ? q : n ? n.data : {},
            _wrap: n ? n._wrap : null,
            tmpl: null,
            parent: n || null,
            nodes: [],
            calls: E,
            nest: N,
            wrap: B,
            html: U,
            update: Q
        };
        h && m.extend(q, h, {
            nodes: [],
            parent: n
        });
        w && (q.tmpl = w,
        q._ctnt = q._ctnt || q.tmpl(m, q),
        q.key = ++aa,
        (f.length ? X : S)[aa] = q);
        return q
    }
    function h(f, n, t) {
        var z;
        t = t ? m.map(t, function(m) {
            return "string" === typeof m ? f.key ? m.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, '$1 _tmplitem="' + f.key + '" $2') : m : h(m, f, m._ctnt)
        }) : f;
        if (n)
            return t;
        t = t.join("");
        t.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(f, h, n, t) {
            z = m(n).get();
            q(z);
            h && (z = w(h).concat(z));
            t && (z = z.concat(w(t)))
        });
        return z ? z : w(t)
    }
    function w(f) {
        var h = document.createElement("div");
        h.innerHTML = f;
        return m.makeArray(h.childNodes)
    }
    function y(f) {
        return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + m.trim(f).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(f, h, n, w, q, z, y) {
            f = m.tmpl.tag[n];
            if (!f)
                throw "Unknown template tag: " + n;
            n = f._default || [];
            z && !/\w$/.test(q) && (q += z,
            z = "");
            q ? (q = t(q),
            y = y ? "," + t(y) + ")" : z ? ")" : "",
            y = z ? -1 < q.indexOf(".") ? q + t(z) : "(" + q + ").call($item" + y : q,
            z = z ? y : "(typeof(" + q + ")==='function'?(" + q + ").call($item):(" + q + "))") : z = y = n.$1 || "null";
            w = t(w);
            return "');" + f[h ? "close" : "open"].split("$notnull_1").join(q ? "typeof(" + q + ")!=='undefined' && (" + q + ")!=null" : "true").split("$1a").join(z).split("$1").join(y).split("$2").join(w || n.$2 || "") + "__.push('"
        }) + "');}return __;")
    }
    function C(f, n) {
        f._wrap = h(f, !0, m.isArray(n) ? n : [R.test(n) ? n : m(n).html()]).join("")
    }
    function t(f) {
        return f ? f.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }
    function q(f) {
        function h(f) {
            function d(c) {
                c += q;
                x = t[c] = t[c] || n(x, S[x.parent.key + q] || x.parent)
            }
            var g, h = f, x, c;
            if (c = f.getAttribute("_tmplitem")) {
                for (; h.parentNode && 1 === (h = h.parentNode).nodeType && !(g = h.getAttribute("_tmplitem")); )
                    ;
                g !== c && (h = h.parentNode ? 11 === h.nodeType ? 0 : h.getAttribute("_tmplitem") || 0 : 0,
                (x = S[c]) || (x = X[c],
                x = n(x, S[h] || X[h]),
                x.key = ++aa,
                S[aa] = x),
                V && d(c));
                f.removeAttribute("_tmplitem")
            } else
                V && (x = m.data(f, "tmplItem")) && (d(x.key),
                S[x.key] = x,
                h = (h = m.data(f.parentNode, "tmplItem")) ? h.key : 0);
            if (x) {
                for (g = x; g && g.key != h; )
                    g.nodes.push(f),
                    g = g.parent;
                delete x._ctnt;
                delete x._wrap;
                m.data(f, "tmplItem", x)
            }
        }
        var q = "_" + V, w, t = {}, z, y;
        var C = 0;
        for (z = f.length; C < z; C++)
            if (1 === (w = f[C]).nodeType) {
                var B = w.getElementsByTagName("*");
                for (y = B.length - 1; 0 <= y; y--)
                    h(B[y]);
                h(w)
            }
    }
    function E(h, m, n, q) {
        if (!h)
            return f.pop();
        f.push({
            _: h,
            tmpl: m,
            item: this,
            data: n,
            options: q
        })
    }
    function N(f, h, n) {
        return m.tmpl(m.template(f), h, n, this)
    }
    function B(f, h) {
        var n = f.options || {};
        n.wrapped = h;
        return m.tmpl(m.template(f.tmpl), f.data, n, f.item)
    }
    function U(f, h) {
        var n = this._wrap;
        return m.map(m(m.isArray(n) ? n.join("") : n).filter(f || "*"), function(f) {
            if (h)
                f = f.innerText || f.textContent;
            else {
                var m;
                (m = f.outerHTML) || (m = document.createElement("div"),
                m.appendChild(f.cloneNode(!0)),
                m = m.innerHTML);
                f = m
            }
            return f
        })
    }
    function Q() {
        var f = this.nodes;
        m.tmpl(null, null, null, this).insertBefore(f[0]);
        m(f).remove()
    }
    var ca = m.fn.domManip, R = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{! /, S = {}, X = {}, T, M = {
        key: 0,
        data: {}
    }, aa = 0, V = 0, f = [];
    m.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(f, h) {
        m.fn[f] = function(n) {
            var q = [];
            n = m(n);
            var w;
            var t = 1 === this.length && this[0].parentNode;
            T = S || {};
            if (t && 11 === t.nodeType && 1 === t.childNodes.length && 1 === n.length)
                n[h](this[0]),
                q = this;
            else {
                var y = 0;
                for (w = n.length; y < w; y++)
                    V = y,
                    t = (0 < y ? this.clone(!0) : this).get(),
                    m(n[y])[h](t),
                    q = q.concat(t);
                V = 0;
                q = this.pushStack(q, f, n.selector)
            }
            n = T;
            T = null;
            m.tmpl.complete(n);
            return q
        }
    });
    m.fn.extend({
        tmpl: function(f, h, n) {
            return m.tmpl(this[0], f, h, n)
        },
        tmplItem: function() {
            return m.tmplItem(this[0])
        },
        template: function(f) {
            return m.template(f, this[0])
        },
        domManip: function(f, h, n) {
            if (f[0] && m.isArray(f[0])) {
                for (var q = m.makeArray(arguments), w = f[0], t = w.length, y = 0, z; y < t && !(z = m.data(w[y++], "tmplItem")); )
                    ;
                z && V && (q[2] = function(f) {
                    m.tmpl.afterManip(this, f, n)
                }
                );
                ca.apply(this, q)
            } else
                ca.apply(this, arguments);
            V = 0;
            !T && m.tmpl.complete(S);
            return this
        }
    });
    m.extend({
        tmpl: function(f, q, w, t) {
            var y = !t;
            if (y)
                t = M,
                f = m.template[f] || m.template(null, f),
                X = {};
            else if (!f)
                return f = t.tmpl,
                S[t.key] = t,
                t.nodes = [],
                t.wrapped && C(t, t.wrapped),
                m(h(t, null, t.tmpl(m, t)));
            if (!f)
                return [];
            "function" === typeof q && (q = q.call(t || {}));
            w && w.wrapped && C(w, w.wrapped);
            q = m.isArray(q) ? m.map(q, function(h) {
                return h ? n(w, t, f, h) : null
            }) : [n(w, t, f, q)];
            return y ? m(h(t, null, q)) : q
        },
        tmplItem: function(f) {
            var h;
            for (f instanceof m && (f = f[0]); f && 1 === f.nodeType && !(h = m.data(f, "tmplItem")) && (f = f.parentNode); )
                ;
            return h || M
        },
        template: function(f, h) {
            return h ? ("string" === typeof h ? h = y(h) : h instanceof m && (h = h[0] || {}),
            h.nodeType && (h = m.data(h, "tmpl") || m.data(h, "tmpl", y(h.innerHTML))),
            "string" === typeof f ? m.template[f] = h : h) : f ? "string" !== typeof f ? m.template(null, f) : m.template[f] || m.template(null, R.test(f) ? f : m(f)) : null
        },
        encode: function(f) {
            return ("" + f).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    });
    m.extend(m.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function() {
            S = {}
        },
        afterManip: function(f, h, n) {
            var w = 11 === h.nodeType ? m.makeArray(h.childNodes) : 1 === h.nodeType ? [h] : [];
            n.call(f, h);
            q(w);
            V++
        }
    })
}
)(jQuery);
(function(m, n) {
    function h(h, m) {
        h = decodeURI(h);
        m = q[m ? "strict" : "loose"].exec(h);
        var n = {
            attr: {},
            param: {},
            seg: {}
        };
        for (h = 14; h--; )
            n.attr[C[h]] = m[h] || "";
        n.param.query = {};
        n.param.fragment = {};
        n.attr.query.replace(E, function(h, m, q) {
            m && (n.param.query[m] = q)
        });
        n.attr.fragment.replace(N, function(h, m, q) {
            m && (n.param.fragment[m] = q)
        });
        n.seg.path = n.attr.path.replace(/^\/+|\/+$/g, "").split("/");
        n.seg.fragment = n.attr.fragment.replace(/^\/+|\/+$/g, "").split("/");
        n.attr.base = n.attr.host ? n.attr.protocol + "://" + n.attr.host + (n.attr.port ? ":" + n.attr.port : "") : "";
        return n
    }
    function w(h) {
        h = h.tagName;
        return h !== n ? y[h.toLowerCase()] : h
    }
    var y = {
        a: "href",
        img: "src",
        form: "action",
        base: "href",
        script: "src",
        iframe: "src",
        link: "href"
    }
      , C = "source protocol authority userInfo user password host port relative path directory file query fragment".split(" ")
      , t = {
        anchor: "fragment"
    }
      , q = {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
      , E = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g
      , N = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g;
    m.fn.url = function(h) {
        var n = "";
        this.length && (n = m(this).attr(w(this[0])) || "");
        return m.url({
            url: n,
            strict: h
        })
    }
    ;
    m.url = function(m) {
        var q = ""
          , w = !1;
        "string" === typeof m ? q = m : (m = m || {},
        w = m.strict || w,
        q = m.url === n ? window.location.toString() : m.url);
        return {
            data: h(q, w),
            attr: function(h) {
                h = t[h] || h;
                return h !== n ? this.data.attr[h] : this.data.attr
            },
            param: function(h) {
                return h !== n ? this.data.param.query[h] : this.data.param.query
            },
            fparam: function(h) {
                return h !== n ? this.data.param.fragment[h] : this.data.param.fragment
            },
            segment: function(h) {
                if (h === n)
                    return this.data.seg.path;
                h = 0 > h ? this.data.seg.path.length + h : h - 1;
                return this.data.seg.path[h]
            },
            fsegment: function(h) {
                if (h === n)
                    return this.data.seg.fragment;
                h = 0 > h ? this.data.seg.fragment.length + h : h - 1;
                return this.data.seg.fragment[h]
            }
        }
    }
}
)(jQuery);
!function() {
    var m = this
      , n = m._
      , h = {}
      , w = Array.prototype
      , y = Object.prototype
      , C = w.push
      , t = w.slice
      , q = w.concat
      , E = y.toString
      , N = y.hasOwnProperty
      , B = w.forEach
      , U = w.map
      , Q = w.reduce
      , ca = w.reduceRight
      , R = w.filter
      , S = w.every
      , X = w.some
      , T = w.indexOf
      , M = w.lastIndexOf;
    y = Array.isArray;
    var aa = Object.keys
      , V = Function.prototype.bind
      , f = function(c) {
        return c instanceof f ? c : this instanceof f ? (this._wrapped = c,
        void 0) : new f(c)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = f),
    exports._ = f) : m._ = f;
    f.VERSION = "1.5.1";
    var z = f.each = f.forEach = function(c, d, g) {
        if (null != c)
            if (B && c.forEach === B)
                c.forEach(d, g);
            else if (c.length === +c.length)
                for (var k = 0, r = c.length; r > k && d.call(g, c[k], k, c) !== h; k++)
                    ;
            else
                for (k in c)
                    if (f.has(c, k) && d.call(g, c[k], k, c) === h)
                        break
    }
    ;
    f.map = f.collect = function(c, d, f) {
        var k = [];
        return null == c ? k : U && c.map === U ? c.map(d, f) : (z(c, function(c, g, h) {
            k.push(d.call(f, c, g, h))
        }),
        k)
    }
    ;
    f.reduce = f.foldl = f.inject = function(c, d, g, h) {
        var k = 2 < arguments.length;
        if (null == c && (c = []),
        Q && c.reduce === Q)
            return h && (d = f.bind(d, h)),
            k ? c.reduce(d, g) : c.reduce(d);
        if (z(c, function(c, f, r) {
            k ? g = d.call(h, g, c, f, r) : (g = c,
            k = !0)
        }),
        !k)
            throw new TypeError("Reduce of empty array with no initial value");
        return g
    }
    ;
    f.reduceRight = f.foldr = function(c, d, g, h) {
        var k = 2 < arguments.length;
        if (null == c && (c = []),
        ca && c.reduceRight === ca)
            return h && (d = f.bind(d, h)),
            k ? c.reduceRight(d, g) : c.reduceRight(d);
        var r = c.length;
        if (r !== +r) {
            var m = f.keys(c);
            r = m.length
        }
        if (z(c, function(f, v, n) {
            v = m ? m[--r] : --r;
            k ? g = d.call(h, g, c[v], v, n) : (g = c[v],
            k = !0)
        }),
        !k)
            throw new TypeError("Reduce of empty array with no initial value");
        return g
    }
    ;
    f.find = f.detect = function(c, d, f) {
        var k;
        return L(c, function(c, g, h) {
            return d.call(f, c, g, h) ? (k = c,
            !0) : void 0
        }),
        k
    }
    ;
    f.filter = f.select = function(c, d, f) {
        var k = [];
        return null == c ? k : R && c.filter === R ? c.filter(d, f) : (z(c, function(c, g, h) {
            d.call(f, c, g, h) && k.push(c)
        }),
        k)
    }
    ;
    f.reject = function(c, d, g) {
        return f.filter(c, function(c, k, f) {
            return !d.call(g, c, k, f)
        }, g)
    }
    ;
    f.every = f.all = function(c, d, g) {
        d || (d = f.identity);
        var k = !0;
        return null == c ? k : S && c.every === S ? c.every(d, g) : (z(c, function(c, f, r) {
            return (k = k && d.call(g, c, f, r)) ? void 0 : h
        }),
        !!k)
    }
    ;
    var L = f.some = f.any = function(c, d, g) {
        d || (d = f.identity);
        var k = !1;
        return null == c ? k : X && c.some === X ? c.some(d, g) : (z(c, function(c, f, r) {
            return k || (k = d.call(g, c, f, r)) ? h : void 0
        }),
        !!k)
    }
    ;
    f.contains = f.include = function(c, d) {
        return null == c ? !1 : T && c.indexOf === T ? -1 != c.indexOf(d) : L(c, function(c) {
            return c === d
        })
    }
    ;
    f.invoke = function(c, d) {
        var k = t.call(arguments, 2)
          , g = f.isFunction(d);
        return f.map(c, function(c) {
            return (g ? d : c[d]).apply(c, k)
        })
    }
    ;
    f.pluck = function(c, d) {
        return f.map(c, function(c) {
            return c[d]
        })
    }
    ;
    f.where = function(c, d, g) {
        return f.isEmpty(d) ? g ? void 0 : [] : f[g ? "find" : "filter"](c, function(c) {
            for (var k in d)
                if (d[k] !== c[k])
                    return !1;
            return !0
        })
    }
    ;
    f.findWhere = function(c, d) {
        return f.where(c, d, !0)
    }
    ;
    f.max = function(c, d, g) {
        if (!d && f.isArray(c) && c[0] === +c[0] && 65535 > c.length)
            return Math.max.apply(Math, c);
        if (!d && f.isEmpty(c))
            return -1 / 0;
        var k = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return z(c, function(c, f, h) {
            f = d ? d.call(g, c, f, h) : c;
            f > k.computed && (k = {
                value: c,
                computed: f
            })
        }),
        k.value
    }
    ;
    f.min = function(c, d, g) {
        if (!d && f.isArray(c) && c[0] === +c[0] && 65535 > c.length)
            return Math.min.apply(Math, c);
        if (!d && f.isEmpty(c))
            return 1 / 0;
        var k = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return z(c, function(c, f, h) {
            f = d ? d.call(g, c, f, h) : c;
            f < k.computed && (k = {
                value: c,
                computed: f
            })
        }),
        k.value
    }
    ;
    f.shuffle = function(c) {
        var d, g = 0, h = [];
        return z(c, function(c) {
            d = f.random(g++);
            h[g - 1] = h[d];
            h[d] = c
        }),
        h
    }
    ;
    var I = function(c) {
        return f.isFunction(c) ? c : function(d) {
            return d[c]
        }
    };
    f.sortBy = function(c, d, g) {
        var k = I(d);
        return f.pluck(f.map(c, function(c, d, f) {
            return {
                value: c,
                index: d,
                criteria: k.call(g, c, d, f)
            }
        }).sort(function(c, d) {
            var k = c.criteria
              , f = d.criteria;
            if (k !== f) {
                if (k > f || void 0 === k)
                    return 1;
                if (f > k || void 0 === f)
                    return -1
            }
            return c.index < d.index ? -1 : 1
        }), "value")
    }
    ;
    var J = function(c, d, g, h) {
        var k = {}
          , r = I(null == d ? f.identity : d);
        return z(c, function(d, f) {
            f = r.call(g, d, f, c);
            h(k, f, d)
        }),
        k
    };
    f.groupBy = function(c, d, g) {
        return J(c, d, g, function(c, d, k) {
            (f.has(c, d) ? c[d] : c[d] = []).push(k)
        })
    }
    ;
    f.countBy = function(c, d, g) {
        return J(c, d, g, function(c, d) {
            f.has(c, d) || (c[d] = 0);
            c[d]++
        })
    }
    ;
    f.sortedIndex = function(c, d, g, h) {
        g = null == g ? f.identity : I(g);
        d = g.call(h, d);
        for (var k = 0, r = c.length; r > k; ) {
            var m = k + r >>> 1;
            g.call(h, c[m]) < d ? k = m + 1 : r = m
        }
        return k
    }
    ;
    f.toArray = function(c) {
        return c ? f.isArray(c) ? t.call(c) : c.length === +c.length ? f.map(c, f.identity) : f.values(c) : []
    }
    ;
    f.size = function(c) {
        return null == c ? 0 : c.length === +c.length ? c.length : f.keys(c).length
    }
    ;
    f.first = f.head = f.take = function(c, d, f) {
        return null == c ? void 0 : null == d || f ? c[0] : t.call(c, 0, d)
    }
    ;
    f.initial = function(c, d, f) {
        return t.call(c, 0, c.length - (null == d || f ? 1 : d))
    }
    ;
    f.last = function(c, d, f) {
        return null == c ? void 0 : null == d || f ? c[c.length - 1] : t.call(c, Math.max(c.length - d, 0))
    }
    ;
    f.rest = f.tail = f.drop = function(c, d, f) {
        return t.call(c, null == d || f ? 1 : d)
    }
    ;
    f.compact = function(c) {
        return f.filter(c, f.identity)
    }
    ;
    var ba = function(c, d, g) {
        return d && f.every(c, f.isArray) ? q.apply(g, c) : (z(c, function(c) {
            f.isArray(c) || f.isArguments(c) ? d ? C.apply(g, c) : ba(c, d, g) : g.push(c)
        }),
        g)
    };
    f.flatten = function(c, d) {
        return ba(c, d, [])
    }
    ;
    f.without = function(c) {
        return f.difference(c, t.call(arguments, 1))
    }
    ;
    f.uniq = f.unique = function(c, d, g, h) {
        f.isFunction(d) && (h = g,
        g = d,
        d = !1);
        g = g ? f.map(c, g, h) : c;
        var k = []
          , r = [];
        return z(g, function(g, h) {
            (d ? h && r[r.length - 1] === g : f.contains(r, g)) || (r.push(g),
            k.push(c[h]))
        }),
        k
    }
    ;
    f.union = function() {
        return f.uniq(f.flatten(arguments, !0))
    }
    ;
    f.intersection = function(c) {
        var d = t.call(arguments, 1);
        return f.filter(f.uniq(c), function(c) {
            return f.every(d, function(d) {
                return 0 <= f.indexOf(d, c)
            })
        })
    }
    ;
    f.difference = function(c) {
        var d = q.apply(w, t.call(arguments, 1));
        return f.filter(c, function(c) {
            return !f.contains(d, c)
        })
    }
    ;
    f.zip = function() {
        for (var c = f.max(f.pluck(arguments, "length").concat(0)), d = Array(c), g = 0; c > g; g++)
            d[g] = f.pluck(arguments, "" + g);
        return d
    }
    ;
    f.object = function(c, d) {
        if (null == c)
            return {};
        for (var k = {}, g = 0, f = c.length; f > g; g++)
            d ? k[c[g]] = d[g] : k[c[g][0]] = c[g][1];
        return k
    }
    ;
    f.indexOf = function(c, d, g) {
        if (null == c)
            return -1;
        var k = 0
          , h = c.length;
        if (g) {
            if ("number" != typeof g)
                return k = f.sortedIndex(c, d),
                c[k] === d ? k : -1;
            k = 0 > g ? Math.max(0, h + g) : g
        }
        if (T && c.indexOf === T)
            return c.indexOf(d, g);
        for (; h > k; k++)
            if (c[k] === d)
                return k;
        return -1
    }
    ;
    f.lastIndexOf = function(c, d, g) {
        if (null == c)
            return -1;
        var k = null != g;
        if (M && c.lastIndexOf === M)
            return k ? c.lastIndexOf(d, g) : c.lastIndexOf(d);
        for (g = k ? g : c.length; g--; )
            if (c[g] === d)
                return g;
        return -1
    }
    ;
    f.range = function(c, d, g) {
        1 >= arguments.length && (d = c || 0,
        c = 0);
        g = arguments[2] || 1;
        for (var k = Math.max(Math.ceil((d - c) / g), 0), f = 0, h = Array(k); k > f; )
            h[f++] = c,
            c += g;
        return h
    }
    ;
    var O = function() {};
    f.bind = function(c, d) {
        var k, g;
        if (V && c.bind === V)
            return V.apply(c, t.call(arguments, 1));
        if (!f.isFunction(c))
            throw new TypeError;
        return k = t.call(arguments, 2),
        g = function() {
            if (!(this instanceof g))
                return c.apply(d, k.concat(t.call(arguments)));
            O.prototype = c.prototype;
            var f = new O;
            O.prototype = null;
            var h = c.apply(f, k.concat(t.call(arguments)));
            return Object(h) === h ? h : f
        }
    }
    ;
    f.partial = function(c) {
        var d = t.call(arguments, 1);
        return function() {
            return c.apply(this, d.concat(t.call(arguments)))
        }
    }
    ;
    f.bindAll = function(c) {
        var d = t.call(arguments, 1);
        if (0 === d.length)
            throw Error("bindAll must be passed function names");
        return z(d, function(d) {
            c[d] = f.bind(c[d], c)
        }),
        c
    }
    ;
    f.memoize = function(c, d) {
        var k = {};
        return d || (d = f.identity),
        function() {
            var g = d.apply(this, arguments);
            return f.has(k, g) ? k[g] : k[g] = c.apply(this, arguments)
        }
    }
    ;
    f.delay = function(c, d) {
        var k = t.call(arguments, 2);
        return setTimeout(function() {
            return c.apply(null, k)
        }, d)
    }
    ;
    f.defer = function(c) {
        return f.delay.apply(f, [c, 1].concat(t.call(arguments, 1)))
    }
    ;
    f.throttle = function(c, d, g) {
        var k, f, h, m = null, v = 0;
        g || (g = {});
        var r = function() {
            v = !1 === g.leading ? 0 : new Date;
            m = null;
            h = c.apply(k, f)
        };
        return function() {
            var n = new Date;
            v || !1 !== g.leading || (v = n);
            var x = d - (n - v);
            return k = this,
            f = arguments,
            0 >= x ? (clearTimeout(m),
            m = null,
            v = n,
            h = c.apply(k, f)) : m || !1 === g.trailing || (m = setTimeout(r, x)),
            h
        }
    }
    ;
    f.debounce = function(c, d, g) {
        var k, f = null;
        return function() {
            var h = this
              , m = arguments
              , v = g && !f;
            return clearTimeout(f),
            f = setTimeout(function() {
                f = null;
                g || (k = c.apply(h, m))
            }, d),
            v && (k = c.apply(h, m)),
            k
        }
    }
    ;
    f.once = function(c) {
        var d, g = !1;
        return function() {
            return g ? d : (g = !0,
            d = c.apply(this, arguments),
            c = null,
            d)
        }
    }
    ;
    f.wrap = function(c, d) {
        return function() {
            var g = [c];
            return C.apply(g, arguments),
            d.apply(this, g)
        }
    }
    ;
    f.compose = function() {
        var c = arguments;
        return function() {
            for (var d = arguments, g = c.length - 1; 0 <= g; g--)
                d = [c[g].apply(this, d)];
            return d[0]
        }
    }
    ;
    f.after = function(c, d) {
        return function() {
            return 1 > --c ? d.apply(this, arguments) : void 0
        }
    }
    ;
    f.keys = aa || function(c) {
        if (c !== Object(c))
            throw new TypeError("Invalid object");
        var d = [], g;
        for (g in c)
            f.has(c, g) && d.push(g);
        return d
    }
    ;
    f.values = function(c) {
        var d = [], g;
        for (g in c)
            f.has(c, g) && d.push(c[g]);
        return d
    }
    ;
    f.pairs = function(c) {
        var d = [], g;
        for (g in c)
            f.has(c, g) && d.push([g, c[g]]);
        return d
    }
    ;
    f.invert = function(c) {
        var d = {}, g;
        for (g in c)
            f.has(c, g) && (d[c[g]] = g);
        return d
    }
    ;
    f.functions = f.methods = function(c) {
        var d = [], g;
        for (g in c)
            f.isFunction(c[g]) && d.push(g);
        return d.sort()
    }
    ;
    f.extend = function(c) {
        return z(t.call(arguments, 1), function(d) {
            if (d)
                for (var g in d)
                    c[g] = d[g]
        }),
        c
    }
    ;
    f.pick = function(c) {
        var d = {}
          , g = q.apply(w, t.call(arguments, 1));
        return z(g, function(g) {
            g in c && (d[g] = c[g])
        }),
        d
    }
    ;
    f.omit = function(c) {
        var d = {}, g = q.apply(w, t.call(arguments, 1)), h;
        for (h in c)
            f.contains(g, h) || (d[h] = c[h]);
        return d
    }
    ;
    f.defaults = function(c) {
        return z(t.call(arguments, 1), function(d) {
            if (d)
                for (var g in d)
                    void 0 === c[g] && (c[g] = d[g])
        }),
        c
    }
    ;
    f.clone = function(c) {
        return f.isObject(c) ? f.isArray(c) ? c.slice() : f.extend({}, c) : c
    }
    ;
    f.tap = function(c, d) {
        return d(c),
        c
    }
    ;
    var F = function(c, d, g, h) {
        if (c === d)
            return 0 !== c || 1 / c == 1 / d;
        if (null == c || null == d)
            return c === d;
        c instanceof f && (c = c._wrapped);
        d instanceof f && (d = d._wrapped);
        var k = E.call(c);
        if (k != E.call(d))
            return !1;
        switch (k) {
        case "[object String]":
            return c == String(d);
        case "[object Number]":
            return c != +c ? d != +d : 0 == c ? 1 / c == 1 / d : c == +d;
        case "[object Date]":
        case "[object Boolean]":
            return +c == +d;
        case "[object RegExp]":
            return c.source == d.source && c.global == d.global && c.multiline == d.multiline && c.ignoreCase == d.ignoreCase
        }
        if ("object" != typeof c || "object" != typeof d)
            return !1;
        for (var m = g.length; m--; )
            if (g[m] == c)
                return h[m] == d;
        m = c.constructor;
        var v = d.constructor;
        if (m !== v && !(f.isFunction(m) && m instanceof m && f.isFunction(v) && v instanceof v))
            return !1;
        g.push(c);
        h.push(d);
        m = 0;
        v = !0;
        if ("[object Array]" == k) {
            if (m = c.length,
            v = m == d.length)
                for (; m-- && (v = F(c[m], d[m], g, h)); )
                    ;
        } else {
            for (var n in c)
                if (f.has(c, n) && (m++,
                !(v = f.has(d, n) && F(c[n], d[n], g, h))))
                    break;
            if (v) {
                for (n in d)
                    if (f.has(d, n) && !m--)
                        break;
                v = !m
            }
        }
        return g.pop(),
        h.pop(),
        v
    };
    f.isEqual = function(c, d) {
        return F(c, d, [], [])
    }
    ;
    f.isEmpty = function(c) {
        if (null == c)
            return !0;
        if (f.isArray(c) || f.isString(c))
            return 0 === c.length;
        for (var d in c)
            if (f.has(c, d))
                return !1;
        return !0
    }
    ;
    f.isElement = function(c) {
        return !(!c || 1 !== c.nodeType)
    }
    ;
    f.isArray = y || function(c) {
        return "[object Array]" == E.call(c)
    }
    ;
    f.isObject = function(c) {
        return c === Object(c)
    }
    ;
    z("Arguments Function String Number Date RegExp".split(" "), function(c) {
        f["is" + c] = function(d) {
            return E.call(d) == "[object " + c + "]"
        }
    });
    f.isArguments(arguments) || (f.isArguments = function(c) {
        return !(!c || !f.has(c, "callee"))
    }
    );
    "function" != typeof /./ && (f.isFunction = function(c) {
        return "function" == typeof c
    }
    );
    f.isFinite = function(c) {
        return isFinite(c) && !isNaN(parseFloat(c))
    }
    ;
    f.isNaN = function(c) {
        return f.isNumber(c) && c != +c
    }
    ;
    f.isBoolean = function(c) {
        return !0 === c || !1 === c || "[object Boolean]" == E.call(c)
    }
    ;
    f.isNull = function(c) {
        return null === c
    }
    ;
    f.isUndefined = function(c) {
        return void 0 === c
    }
    ;
    f.has = function(c, d) {
        return N.call(c, d)
    }
    ;
    f.noConflict = function() {
        return m._ = n,
        this
    }
    ;
    f.identity = function(c) {
        return c
    }
    ;
    f.times = function(c, d, g) {
        for (var f = Array(Math.max(0, c)), k = 0; c > k; k++)
            f[k] = d.call(g, k);
        return f
    }
    ;
    f.random = function(c, d) {
        return null == d && (d = c,
        c = 0),
        c + Math.floor(Math.random() * (d - c + 1))
    }
    ;
    var ea = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    ea.unescape = f.invert(ea.escape);
    var ma = {
        escape: new RegExp("[" + f.keys(ea.escape).join("") + "]","g"),
        unescape: new RegExp("(" + f.keys(ea.unescape).join("|") + ")","g")
    };
    f.each(["escape", "unescape"], function(c) {
        f[c] = function(d) {
            return null == d ? "" : ("" + d).replace(ma[c], function(d) {
                return ea[c][d]
            })
        }
    });
    f.result = function(c, d) {
        if (null != c)
            return d = c[d],
            f.isFunction(d) ? d.call(c) : d
    }
    ;
    f.mixin = function(c) {
        z(f.functions(c), function(d) {
            var g = f[d] = c[d];
            f.prototype[d] = function() {
                var c = [this._wrapped];
                return C.apply(c, arguments),
                x.call(this, g.apply(f, c))
            }
        })
    }
    ;
    var Y = 0;
    f.uniqueId = function(c) {
        var d = ++Y + "";
        return c ? c + d : d
    }
    ;
    f.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var d = /(.)^/
      , g = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\t": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , v = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    f.template = function(c, k, h) {
        h = f.defaults({}, h, f.templateSettings);
        var m = new RegExp([(h.escape || d).source, (h.interpolate || d).source, (h.evaluate || d).source].join("|") + "|$","g")
          , n = 0
          , x = "__p+='";
        c.replace(m, function(d, f, k, h, m) {
            return x += c.slice(n, m).replace(v, function(c) {
                return "\\" + g[c]
            }),
            f && (x += "'+\n((__t=(" + f + "))==null?'':_.escape(__t))+\n'"),
            k && (x += "'+\n((__t=(" + k + "))==null?'':__t)+\n'"),
            h && (x += "';\n" + h + "\n__p+='"),
            n = m + d.length,
            d
        });
        x += "';\n";
        h.variable || (x = "with(obj||{}){\n" + x + "}\n");
        x = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + x + "return __p;\n";
        try {
            var r = new Function(h.variable || "obj","_",x)
        } catch (ka) {
            throw ka.source = x,
            ka;
        }
        if (k)
            return r(k, f);
        k = function(c) {
            return r.call(this, c, f)
        }
        ;
        return k.source = "function(" + (h.variable || "obj") + "){\n" + x + "}",
        k
    }
    ;
    f.chain = function(c) {
        return f(c).chain()
    }
    ;
    var x = function(c) {
        return this._chain ? f(c).chain() : c
    };
    f.mixin(f);
    z("pop push reverse shift sort splice unshift".split(" "), function(c) {
        var d = w[c];
        f.prototype[c] = function() {
            var g = this._wrapped;
            return d.apply(g, arguments),
            "shift" != c && "splice" != c || 0 !== g.length || delete g[0],
            x.call(this, g)
        }
    });
    z(["concat", "join", "slice"], function(c) {
        var d = w[c];
        f.prototype[c] = function() {
            return x.call(this, d.apply(this._wrapped, arguments))
        }
    });
    f.extend(f.prototype, {
        chain: function() {
            return this._chain = !0,
            this
        },
        value: function() {
            return this._wrapped
        }
    })
}
.call(this);
(function() {
    var m = this
      , n = m.Backbone
      , h = []
      , w = h.push
      , y = h.slice
      , C = h.splice;
    var t = "undefined" !== typeof exports ? exports : m.Backbone = {};
    t.VERSION = "1.0.0";
    var q = m._;
    q || "undefined" === typeof require || (q = require("underscore"));
    t.$ = m.jQuery || m.Zepto || m.ender || m.$;
    t.noConflict = function() {
        m.Backbone = n;
        return this
    }
    ;
    t.emulateHTTP = !1;
    t.emulateJSON = !1;
    var E = t.Events = {
        on: function(d, g, f) {
            if (!B(this, "on", d, [g, f]) || !g)
                return this;
            this._events || (this._events = {});
            (this._events[d] || (this._events[d] = [])).push({
                callback: g,
                context: f,
                ctx: f || this
            });
            return this
        },
        once: function(d, g, f) {
            if (!B(this, "once", d, [g, f]) || !g)
                return this;
            var h = this
              , c = q.once(function() {
                h.off(d, c);
                g.apply(this, arguments)
            });
            c._callback = g;
            return this.on(d, c, f)
        },
        off: function(d, g, f) {
            var h, c, k, m;
            if (!this._events || !B(this, "off", d, [g, f]))
                return this;
            if (!d && !g && !f)
                return this._events = {},
                this;
            var v = d ? [d] : q.keys(this._events);
            var n = 0;
            for (k = v.length; n < k; n++)
                if (d = v[n],
                c = this._events[d]) {
                    this._events[d] = h = [];
                    if (g || f) {
                        var w = 0;
                        for (m = c.length; w < m; w++) {
                            var t = c[w];
                            (g && g !== t.callback && g !== t.callback._callback || f && f !== t.context) && h.push(t)
                        }
                    }
                    h.length || delete this._events[d]
                }
            return this
        },
        trigger: function(d) {
            if (!this._events)
                return this;
            var g = y.call(arguments, 1);
            if (!B(this, "trigger", d, g))
                return this;
            var f = this._events[d]
              , h = this._events.all;
            f && U(f, g);
            h && U(h, arguments);
            return this
        },
        stopListening: function(d, g, f) {
            var h = this._listeners;
            if (!h)
                return this;
            var c = !g && !f;
            "object" === typeof g && (f = this);
            d && ((h = {})[d._listenerId] = d);
            for (var k in h)
                h[k].off(g, f, this),
                c && delete this._listeners[k];
            return this
        }
    }
      , N = /\s+/
      , B = function(d, g, f, h) {
        if (!f)
            return !0;
        if ("object" === typeof f) {
            for (var c in f)
                d[g].apply(d, [c, f[c]].concat(h));
            return !1
        }
        if (N.test(f)) {
            f = f.split(N);
            c = 0;
            for (var k = f.length; c < k; c++)
                d[g].apply(d, [f[c]].concat(h));
            return !1
        }
        return !0
    }
      , U = function(d, g) {
        var f, h = -1, c = d.length, k = g[0], m = g[1], n = g[2];
        switch (g.length) {
        case 0:
            for (; ++h < c; )
                (f = d[h]).callback.call(f.ctx);
            break;
        case 1:
            for (; ++h < c; )
                (f = d[h]).callback.call(f.ctx, k);
            break;
        case 2:
            for (; ++h < c; )
                (f = d[h]).callback.call(f.ctx, k, m);
            break;
        case 3:
            for (; ++h < c; )
                (f = d[h]).callback.call(f.ctx, k, m, n);
            break;
        default:
            for (; ++h < c; )
                (f = d[h]).callback.apply(f.ctx, g)
        }
    };
    q.each({
        listenTo: "on",
        listenToOnce: "once"
    }, function(d, g) {
        E[g] = function(g, f, c) {
            var k = this._listeners || (this._listeners = {})
              , h = g._listenerId || (g._listenerId = q.uniqueId("l"));
            k[h] = g;
            "object" === typeof f && (c = this);
            g[d](f, c, this);
            return this
        }
    });
    E.bind = E.on;
    E.unbind = E.off;
    q.extend(t, E);
    var Q = t.Model = function(d, g) {
        var f, h = d || {};
        g || (g = {});
        this.cid = q.uniqueId("c");
        this.attributes = {};
        q.extend(this, q.pick(g, ca));
        g.parse && (h = this.parse(h, g) || {});
        if (f = q.result(this, "defaults"))
            h = q.defaults({}, h, f);
        this.set(h, g);
        this.changed = {};
        this.initialize.apply(this, arguments)
    }
      , ca = ["url", "urlRoot", "collection"];
    q.extend(Q.prototype, E, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function(d) {
            return q.clone(this.attributes)
        },
        sync: function() {
            return t.sync.apply(this, arguments)
        },
        get: function(d) {
            return this.attributes[d]
        },
        escape: function(d) {
            return q.escape(this.get(d))
        },
        has: function(d) {
            return null != this.get(d)
        },
        set: function(d, g, f) {
            var h;
            if (null == d)
                return this;
            if ("object" === typeof d) {
                var c = d;
                f = g
            } else
                (c = {})[d] = g;
            f || (f = {});
            if (!this._validate(c, f))
                return !1;
            var k = f.unset;
            var m = f.silent;
            d = [];
            var n = this._changing;
            this._changing = !0;
            n || (this._previousAttributes = q.clone(this.attributes),
            this.changed = {});
            var v = this.attributes;
            var w = this._previousAttributes;
            this.idAttribute in c && (this.id = c[this.idAttribute]);
            for (h in c)
                g = c[h],
                q.isEqual(v[h], g) || d.push(h),
                q.isEqual(w[h], g) ? delete this.changed[h] : this.changed[h] = g,
                k ? delete v[h] : v[h] = g;
            if (!m)
                for (d.length && (this._pending = !0),
                g = 0,
                h = d.length; g < h; g++)
                    this.trigger("change:" + d[g], this, v[d[g]], f);
            if (n)
                return this;
            if (!m)
                for (; this._pending; )
                    this._pending = !1,
                    this.trigger("change", this, f);
            this._changing = this._pending = !1;
            return this
        },
        unset: function(d, g) {
            return this.set(d, void 0, q.extend({}, g, {
                unset: !0
            }))
        },
        clear: function(d) {
            var g = {}, f;
            for (f in this.attributes)
                g[f] = void 0;
            return this.set(g, q.extend({}, d, {
                unset: !0
            }))
        },
        hasChanged: function(d) {
            return null == d ? !q.isEmpty(this.changed) : q.has(this.changed, d)
        },
        changedAttributes: function(d) {
            if (!d)
                return this.hasChanged() ? q.clone(this.changed) : !1;
            var g, f = !1, h = this._changing ? this._previousAttributes : this.attributes, c;
            for (c in d)
                q.isEqual(h[c], g = d[c]) || ((f || (f = {}))[c] = g);
            return f
        },
        previous: function(d) {
            return null != d && this._previousAttributes ? this._previousAttributes[d] : null
        },
        previousAttributes: function() {
            return q.clone(this._previousAttributes)
        },
        fetch: function(d) {
            d = d ? q.clone(d) : {};
            void 0 === d.parse && (d.parse = !0);
            var g = this
              , f = d.success;
            d.success = function(h) {
                if (!g.set(g.parse(h, d), d))
                    return !1;
                f && f(g, h, d);
                g.trigger("sync", g, h, d)
            }
            ;
            Y(this, d);
            return this.sync("read", this, d)
        },
        save: function(d, g, f) {
            var h = this.attributes;
            if (null == d || "object" === typeof d) {
                var c = d;
                f = g
            } else
                (c = {})[d] = g;
            if (!(!c || f && f.wait || this.set(c, f)))
                return !1;
            f = q.extend({
                validate: !0
            }, f);
            if (!this._validate(c, f))
                return !1;
            c && f.wait && (this.attributes = q.extend({}, h, c));
            void 0 === f.parse && (f.parse = !0);
            var k = this
              , m = f.success;
            f.success = function(d) {
                k.attributes = h;
                var g = k.parse(d, f);
                f.wait && (g = q.extend(c || {}, g));
                if (q.isObject(g) && !k.set(g, f))
                    return !1;
                m && m(k, d, f);
                k.trigger("sync", k, d, f)
            }
            ;
            Y(this, f);
            d = this.isNew() ? "create" : f.patch ? "patch" : "update";
            "patch" === d && (f.attrs = c);
            d = this.sync(d, this, f);
            c && f.wait && (this.attributes = h);
            return d
        },
        destroy: function(d) {
            d = d ? q.clone(d) : {};
            var g = this
              , f = d.success
              , h = function() {
                g.trigger("destroy", g, g.collection, d)
            };
            d.success = function(c) {
                (d.wait || g.isNew()) && h();
                f && f(g, c, d);
                g.isNew() || g.trigger("sync", g, c, d)
            }
            ;
            if (this.isNew())
                return d.success(),
                !1;
            Y(this, d);
            var c = this.sync("delete", this, d);
            d.wait || h();
            return c
        },
        url: function() {
            var d = q.result(this, "urlRoot") || q.result(this.collection, "url") || ma();
            return this.isNew() ? d : d + ("/" === d.charAt(d.length - 1) ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(d, g) {
            return d
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return null == this.id
        },
        isValid: function(d) {
            return this._validate({}, q.extend(d || {}, {
                validate: !0
            }))
        },
        _validate: function(d, g) {
            if (!g.validate || !this.validate)
                return !0;
            d = q.extend({}, this.attributes, d);
            d = this.validationError = this.validate(d, g) || null;
            if (!d)
                return !0;
            this.trigger("invalid", this, d, q.extend(g || {}, {
                validationError: d
            }));
            return !1
        }
    });
    q.each("keys values pairs invert pick omit".split(" "), function(d) {
        Q.prototype[d] = function() {
            var g = y.call(arguments);
            g.unshift(this.attributes);
            return q[d].apply(q, g)
        }
    });
    var R = t.Collection = function(d, g) {
        g || (g = {});
        g.url && (this.url = g.url);
        g.model && (this.model = g.model);
        void 0 !== g.comparator && (this.comparator = g.comparator);
        this._reset();
        this.initialize.apply(this, arguments);
        d && this.reset(d, q.extend({
            silent: !0
        }, g))
    }
      , S = {
        add: !0,
        remove: !0,
        merge: !0
    }
      , X = {
        add: !0,
        merge: !1,
        remove: !1
    };
    q.extend(R.prototype, E, {
        model: Q,
        initialize: function() {},
        toJSON: function(d) {
            return this.map(function(g) {
                return g.toJSON(d)
            })
        },
        sync: function() {
            return t.sync.apply(this, arguments)
        },
        add: function(d, g) {
            return this.set(d, q.defaults(g || {}, X))
        },
        remove: function(d, g) {
            d = q.isArray(d) ? d.slice() : [d];
            g || (g = {});
            var f, h;
            var c = 0;
            for (f = d.length; c < f; c++)
                if (h = this.get(d[c])) {
                    delete this._byId[h.id];
                    delete this._byId[h.cid];
                    var k = this.indexOf(h);
                    this.models.splice(k, 1);
                    this.length--;
                    g.silent || (g.index = k,
                    h.trigger("remove", h, this, g));
                    this._removeReference(h)
                }
            return this
        },
        set: function(d, g) {
            g = q.defaults(g || {}, S);
            g.parse && (d = this.parse(d, g));
            q.isArray(d) || (d = d ? [d] : []);
            var f, h, c, k, m = g.at, n = this.comparator && null == m && !1 !== g.sort, t = q.isString(this.comparator) ? this.comparator : null, y = [], z = [], E = {};
            var B = 0;
            for (f = d.length; B < f; B++)
                if (h = this._prepareModel(d[B], g))
                    (c = this.get(h)) ? (g.remove && (E[c.cid] = !0),
                    g.merge && (c.set(h.attributes, g),
                    n && !k && c.hasChanged(t) && (k = !0))) : g.add && (y.push(h),
                    h.on("all", this._onModelEvent, this),
                    this._byId[h.cid] = h,
                    null != h.id && (this._byId[h.id] = h));
            if (g.remove) {
                B = 0;
                for (f = this.length; B < f; ++B)
                    E[(h = this.models[B]).cid] || z.push(h);
                z.length && this.remove(z, g)
            }
            y.length && (n && (k = !0),
            this.length += y.length,
            null != m ? C.apply(this.models, [m, 0].concat(y)) : w.apply(this.models, y));
            k && this.sort({
                silent: !0
            });
            if (g.silent)
                return this;
            B = 0;
            for (f = y.length; B < f; B++)
                (h = y[B]).trigger("add", h, this, g);
            k && this.trigger("sort", this, g);
            return this
        },
        reset: function(d, g) {
            g || (g = {});
            for (var f = 0, h = this.models.length; f < h; f++)
                this._removeReference(this.models[f]);
            g.previousModels = this.models;
            this._reset();
            this.add(d, q.extend({
                silent: !0
            }, g));
            g.silent || this.trigger("reset", this, g);
            return this
        },
        push: function(d, f) {
            d = this._prepareModel(d, f);
            this.add(d, q.extend({
                at: this.length
            }, f));
            return d
        },
        pop: function(d) {
            var f = this.at(this.length - 1);
            this.remove(f, d);
            return f
        },
        unshift: function(d, f) {
            d = this._prepareModel(d, f);
            this.add(d, q.extend({
                at: 0
            }, f));
            return d
        },
        shift: function(d) {
            var f = this.at(0);
            this.remove(f, d);
            return f
        },
        slice: function(d, f) {
            return this.models.slice(d, f)
        },
        get: function(d) {
            if (null != d)
                return this._byId[null != d.id ? d.id : d.cid || d]
        },
        at: function(d) {
            return this.models[d]
        },
        where: function(d, f) {
            return q.isEmpty(d) ? f ? void 0 : [] : this[f ? "find" : "filter"](function(f) {
                for (var g in d)
                    if (d[g] !== f.get(g))
                        return !1;
                return !0
            })
        },
        findWhere: function(d) {
            return this.where(d, !0)
        },
        sort: function(d) {
            if (!this.comparator)
                throw Error("Cannot sort a set without a comparator");
            d || (d = {});
            q.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(q.bind(this.comparator, this));
            d.silent || this.trigger("sort", this, d);
            return this
        },
        sortedIndex: function(d, f, h) {
            f || (f = this.comparator);
            var g = q.isFunction(f) ? f : function(c) {
                return c.get(f)
            }
            ;
            return q.sortedIndex(this.models, d, g, h)
        },
        pluck: function(d) {
            return q.invoke(this.models, "get", d)
        },
        fetch: function(d) {
            d = d ? q.clone(d) : {};
            void 0 === d.parse && (d.parse = !0);
            var f = d.success
              , h = this;
            d.success = function(g) {
                h[d.reset ? "reset" : "set"](g, d);
                f && f(h, g, d);
                h.trigger("sync", h, g, d)
            }
            ;
            Y(this, d);
            return this.sync("read", this, d)
        },
        create: function(d, f) {
            f = f ? q.clone(f) : {};
            if (!(d = this._prepareModel(d, f)))
                return !1;
            f.wait || this.add(d, f);
            var g = this
              , h = f.success;
            f.success = function(c) {
                f.wait && g.add(d, f);
                h && h(d, c, f)
            }
            ;
            d.save(null, f);
            return d
        },
        parse: function(d, f) {
            return d
        },
        clone: function() {
            return new this.constructor(this.models)
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {}
        },
        _prepareModel: function(d, f) {
            if (d instanceof Q)
                return d.collection || (d.collection = this),
                d;
            f || (f = {});
            f.collection = this;
            var g = new this.model(d,f);
            return g._validate(d, f) ? g : (this.trigger("invalid", this, d, f),
            !1)
        },
        _removeReference: function(d) {
            this === d.collection && delete d.collection;
            d.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(d, f, h, m) {
            if ("add" !== d && "remove" !== d || h === this)
                "destroy" === d && this.remove(f, m),
                f && d === "change:" + f.idAttribute && (delete this._byId[f.previous(f.idAttribute)],
                null != f.id && (this._byId[f.id] = f)),
                this.trigger.apply(this, arguments)
        }
    });
    q.each("forEach each map collect reduce foldl inject reduceRight foldr find detect filter select reject every all some any include contains invoke max min toArray size first head take initial rest tail drop last without indexOf shuffle lastIndexOf isEmpty chain".split(" "), function(d) {
        R.prototype[d] = function() {
            var f = y.call(arguments);
            f.unshift(this.models);
            return q[d].apply(q, f)
        }
    });
    q.each(["groupBy", "countBy", "sortBy"], function(d) {
        R.prototype[d] = function(f, h) {
            var g = q.isFunction(f) ? f : function(c) {
                return c.get(f)
            }
            ;
            return q[d](this.models, g, h)
        }
    });
    h = t.View = function(d) {
        this.cid = q.uniqueId("view");
        this._configure(d || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    }
    ;
    var T = /^(\S+)\s*(.*)$/
      , M = "model collection el id attributes className tagName events".split(" ");
    q.extend(h.prototype, E, {
        tagName: "div",
        $: function(d) {
            return this.$el.find(d)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this
        },
        setElement: function(d, f) {
            this.$el && this.undelegateEvents();
            this.$el = d instanceof t.$ ? d : t.$(d);
            this.el = this.$el[0];
            !1 !== f && this.delegateEvents();
            return this
        },
        delegateEvents: function(d) {
            if (!d && !(d = q.result(this, "events")))
                return this;
            this.undelegateEvents();
            for (var f in d) {
                var h = d[f];
                q.isFunction(h) || (h = this[d[f]]);
                if (h) {
                    var m = f.match(T)
                      , c = m[1];
                    m = m[2];
                    h = q.bind(h, this);
                    c += ".delegateEvents" + this.cid;
                    if ("" === m)
                        this.$el.on(c, h);
                    else
                        this.$el.on(c, m, h)
                }
            }
            return this
        },
        undelegateEvents: function() {
            this.$el.off(".delegateEvents" + this.cid);
            return this
        },
        _configure: function(d) {
            this.options && (d = q.extend({}, q.result(this, "options"), d));
            q.extend(this, q.pick(d, M));
            this.options = d
        },
        _ensureElement: function() {
            if (this.el)
                this.setElement(q.result(this, "el"), !1);
            else {
                var d = q.extend({}, q.result(this, "attributes"));
                this.id && (d.id = q.result(this, "id"));
                this.className && (d["class"] = q.result(this, "className"));
                d = t.$("<" + q.result(this, "tagName") + ">").attr(d);
                this.setElement(d, !1)
            }
        }
    });
    t.sync = function(d, f, h) {
        var g = aa[d];
        q.defaults(h || (h = {}), {
            emulateHTTP: t.emulateHTTP,
            emulateJSON: t.emulateJSON
        });
        var c = {
            type: g,
            dataType: "json"
        };
        h.url || (c.url = q.result(f, "url") || ma());
        null != h.data || !f || "create" !== d && "update" !== d && "patch" !== d || (c.contentType = "application/json",
        c.data = JSON.stringify(h.attrs || f.toJSON(h)));
        h.emulateJSON && (c.contentType = "application/x-www-form-urlencoded",
        c.data = c.data ? {
            model: c.data
        } : {});
        if (h.emulateHTTP && ("PUT" === g || "DELETE" === g || "PATCH" === g)) {
            c.type = "POST";
            h.emulateJSON && (c.data._method = g);
            var k = h.beforeSend;
            h.beforeSend = function(c) {
                c.setRequestHeader("X-HTTP-Method-Override", g);
                if (k)
                    return k.apply(this, arguments)
            }
        }
        "GET" === c.type || h.emulateJSON || (c.processData = !1);
        "PATCH" !== c.type || !window.ActiveXObject || window.external && window.external.msActiveXFilteringEnabled || (c.xhr = function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
        );
        d = h.xhr = t.ajax(q.extend(c, h));
        f.trigger("request", f, d, h);
        return d
    }
    ;
    var aa = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    t.ajax = function() {
        return t.$.ajax.apply(t.$, arguments)
    }
    ;
    var V = t.Router = function(d) {
        d || (d = {});
        d.routes && (this.routes = d.routes);
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }
      , f = /\((.*?)\)/g
      , z = /(\(\?)?:\w+/g
      , L = /\*\w+/g
      , I = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    q.extend(V.prototype, E, {
        initialize: function() {},
        route: function(d, f, h) {
            q.isRegExp(d) || (d = this._routeToRegExp(d));
            q.isFunction(f) && (h = f,
            f = "");
            h || (h = this[f]);
            var g = this;
            t.history.route(d, function(c) {
                c = g._extractParameters(d, c);
                h && h.apply(g, c);
                g.trigger.apply(g, ["route:" + f].concat(c));
                g.trigger("route", f, c);
                t.history.trigger("route", g, f, c)
            });
            return this
        },
        navigate: function(d, f) {
            t.history.navigate(d, f);
            return this
        },
        _bindRoutes: function() {
            if (this.routes) {
                this.routes = q.result(this, "routes");
                for (var d, f = q.keys(this.routes); null != (d = f.pop()); )
                    this.route(d, this.routes[d])
            }
        },
        _routeToRegExp: function(d) {
            d = d.replace(I, "\\$&").replace(f, "(?:$1)?").replace(z, function(d, f) {
                return f ? d : "([^/]+)"
            }).replace(L, "(.*?)");
            return new RegExp("^" + d + "$")
        },
        _extractParameters: function(d, f) {
            d = d.exec(f).slice(1);
            return q.map(d, function(d) {
                return d ? decodeURIComponent(d) : null
            })
        }
    });
    var J = t.History = function() {
        this.handlers = [];
        q.bindAll(this, "checkUrl");
        "undefined" !== typeof window && (this.location = window.location,
        this.history = window.history)
    }
      , ba = /^[#\/]|\s+$/g
      , O = /^\/+|\/+$/g
      , F = /msie [\w.]+/
      , ea = /\/$/;
    J.started = !1;
    q.extend(J.prototype, E, {
        interval: 50,
        getHash: function(d) {
            return (d = (d || this).location.href.match(/#(.*)$/)) ? d[1] : ""
        },
        getFragment: function(d, f) {
            null == d && (this._hasPushState || !this._wantsHashChange || f ? (d = this.location.pathname,
            f = this.root.replace(ea, ""),
            d.indexOf(f) || (d = d.substr(f.length))) : d = this.getHash());
            return d.replace(ba, "")
        },
        start: function(d) {
            if (J.started)
                throw Error("Backbone.history has already been started");
            J.started = !0;
            this.options = q.extend({}, {
                root: "/"
            }, this.options, d);
            this.root = this.options.root;
            this._wantsHashChange = !1 !== this.options.hashChange;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            d = this.getFragment();
            var f = document.documentMode;
            f = F.exec(navigator.userAgent.toLowerCase()) && (!f || 7 >= f);
            this.root = ("/" + this.root + "/").replace(O, "/");
            f && this._wantsHashChange && (this.iframe = t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,
            this.navigate(d));
            if (this._hasPushState)
                t.$(window).on("popstate", this.checkUrl);
            else if (this._wantsHashChange && "onhashchange"in window && !f)
                t.$(window).on("hashchange", this.checkUrl);
            else
                this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval));
            this.fragment = d;
            d = this.location;
            f = d.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !f)
                return this.fragment = this.getFragment(null, !0),
                this.location.replace(this.root + this.location.search + "#" + this.fragment),
                !0;
            this._wantsPushState && this._hasPushState && f && d.hash && (this.fragment = this.getHash().replace(ba, ""),
            this.history.replaceState({}, document.title, this.root + this.fragment + d.search));
            if (!this.options.silent)
                return this.loadUrl()
        },
        stop: function() {
            t.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            J.started = !1
        },
        route: function(d, f) {
            this.handlers.unshift({
                route: d,
                callback: f
            })
        },
        checkUrl: function(d) {
            d = this.getFragment();
            d === this.fragment && this.iframe && (d = this.getFragment(this.getHash(this.iframe)));
            if (d === this.fragment)
                return !1;
            this.iframe && this.navigate(d);
            this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function(d) {
            var f = this.fragment = this.getFragment(d);
            return q.any(this.handlers, function(d) {
                if (d.route.test(f))
                    return d.callback(f),
                    !0
            })
        },
        navigate: function(d, f) {
            if (!J.started)
                return !1;
            f && !0 !== f || (f = {
                trigger: f
            });
            d = this.getFragment(d || "");
            if (this.fragment !== d) {
                this.fragment = d;
                var g = this.root + d;
                if (this._hasPushState)
                    this.history[f.replace ? "replaceState" : "pushState"]({}, document.title, g);
                else if (this._wantsHashChange)
                    this._updateHash(this.location, d, f.replace),
                    this.iframe && d !== this.getFragment(this.getHash(this.iframe)) && (f.replace || this.iframe.document.open().close(),
                    this._updateHash(this.iframe.location, d, f.replace));
                else
                    return this.location.assign(g);
                f.trigger && this.loadUrl(d)
            }
        },
        _updateHash: function(d, f, h) {
            h ? (h = d.href.replace(/(javascript:|#).*$/, ""),
            d.replace(h + "#" + f)) : d.hash = "#" + f
        }
    });
    t.history = new J;
    Q.extend = R.extend = V.extend = h.extend = J.extend = function(d, f) {
        var g = this;
        var h = d && q.has(d, "constructor") ? d.constructor : function() {
            return g.apply(this, arguments)
        }
        ;
        q.extend(h, g, f);
        f = function() {
            this.constructor = h
        }
        ;
        f.prototype = g.prototype;
        h.prototype = new f;
        d && q.extend(h.prototype, d);
        h.__super__ = g.prototype;
        return h
    }
    ;
    var ma = function() {
        throw Error('A "url" property or function must be specified');
    }
      , Y = function(d, f) {
        var g = f.error;
        f.error = function(h) {
            g && g(d, h, f);
            d.trigger("error", d, h, f)
        }
    }
}
).call(this);
(function() {
    var m = function(h, m) {
        for (var n = m.exec(h), w = [], t; null != n; )
            t = n.index,
            0 != t && (h.substring(0, t),
            w.push(h.substring(0, t)),
            h = h.slice(t)),
            w.push(n[0]),
            h = h.slice(n[0].length),
            n = m.exec(h);
        "" == !h && w.push(h);
        return w
    }
      , n = function(h, m) {
        for (var n in m)
            m.hasOwnProperty(n) && (h[n] = m[n])
    };
    EJS = function(h) {
        h = "string" == typeof h ? {
            view: h
        } : h;
        this.set_options(h);
        if (h.precompiled)
            this.template = {},
            this.template.process = h.precompiled,
            EJS.update(this.name, this);
        else {
            if (h.element) {
                if ("string" == typeof h.element) {
                    var m = h.element;
                    h.element = document.getElementById(h.element);
                    if (null == h.element)
                        throw m + "does not exist!";
                }
                this.text = h.element.value ? h.element.value : h.element.innerHTML;
                this.name = h.element.id;
                this.type = "["
            } else if (h.url) {
                h.url = EJS.endExt(h.url, this.extMatch);
                this.name = this.name ? this.name : h.url;
                m = h.url;
                var n = EJS.get(this.name, this.cache);
                if (n)
                    return n;
                if (n == EJS.INVALID_PATH)
                    return null;
                try {
                    this.text = EJS.request(m + (this.cache ? "" : "?" + Math.random()))
                } catch (C) {}
                if (null == this.text)
                    throw {
                        type: "EJS",
                        message: "There is no template at " + m
                    };
            }
            n = new EJS.Compiler(this.text,this.type);
            n.compile(h, this.name);
            EJS.update(this.name, this);
            this.template = n
        }
    }
    ;
    EJS.prototype = {
        render: function(h, m) {
            h = h || {};
            this._extra_helpers = m;
            m = new EJS.Helpers(h,m || {});
            return this.template.process.call(h, h, m)
        },
        update: function(h, m) {
            "string" == typeof h && (h = document.getElementById(h));
            if (null == m)
                return _template = this,
                function(m) {
                    EJS.prototype.update.call(_template, h, m)
                }
                ;
            "string" == typeof m ? (params = {},
            params.url = m,
            _template = this,
            params.onComplete = function(m) {
                m = eval(m.responseText);
                EJS.prototype.update.call(_template, h, m)
            }
            ,
            EJS.ajax_request(params)) : h.innerHTML = this.render(m)
        },
        out: function() {
            return this.template.out
        },
        set_options: function(h) {
            this.type = h.type || EJS.type;
            this.cache = null != h.cache ? h.cache : EJS.cache;
            this.text = h.text || null;
            this.name = h.name || null;
            this.ext = h.ext || EJS.ext;
            this.extMatch = new RegExp(this.ext.replace(/\./, "."))
        }
    };
    EJS.endExt = function(h, m) {
        if (!h)
            return null;
        m.lastIndex = 0;
        return h + (m.test(h) ? "" : this.ext)
    }
    ;
    EJS.Scanner = function(h, m, y) {
        n(this, {
            left_delimiter: m + "%",
            right_delimiter: "%" + y,
            double_left: m + "%%",
            double_right: "%%" + y,
            left_equal: m + "%=",
            left_comment: m + "%#"
        });
        this.SplitRegexp = "[" == m ? /(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/ : new RegExp("(" + this.double_left + ")|(%%" + this.double_right + ")|(" + this.left_equal + ")|(" + this.left_comment + ")|(" + this.left_delimiter + ")|(" + this.right_delimiter + "\n)|(" + this.right_delimiter + ")|(\n)");
        this.source = h;
        this.stag = null;
        this.lines = 0
    }
    ;
    EJS.Scanner.to_text = function(h) {
        return null == h || void 0 === h ? "" : h instanceof Date ? h.toDateString() : h.toString ? h.toString() : ""
    }
    ;
    EJS.Scanner.prototype = {
        scan: function(h) {
            scanline = this.scanline;
            regex = this.SplitRegexp;
            if ("" == !this.source)
                for (var n = m(this.source, /\n/), y = 0; y < n.length; y++)
                    this.scanline(n[y], regex, h)
        },
        scanline: function(h, n, y) {
            this.lines++;
            h = m(h, n);
            for (n = 0; n < h.length; n++) {
                var w = h[n];
                if (null != w)
                    try {
                        y(w, this)
                    } catch (t) {
                        throw {
                            type: "EJS.Scanner",
                            line: this.lines
                        };
                    }
            }
        }
    };
    EJS.Buffer = function(h, m) {
        this.line = [];
        this.script = "";
        this.pre_cmd = h;
        this.post_cmd = m;
        for (m = 0; m < this.pre_cmd.length; m++)
            this.push(h[m])
    }
    ;
    EJS.Buffer.prototype = {
        push: function(h) {
            this.line.push(h)
        },
        cr: function() {
            this.script += this.line.join("; ");
            this.line = [];
            this.script += "\n"
        },
        close: function() {
            if (0 < this.line.length) {
                for (var h = 0; h < this.post_cmd.length; h++)
                    this.push(pre_cmd[h]);
                this.script += this.line.join("; ");
                line = null
            }
        }
    };
    EJS.Compiler = function(h, m) {
        this.pre_cmd = ["var ___ViewO = [];"];
        this.post_cmd = [];
        this.source = " ";
        null != h && ("string" == typeof h ? (h = h.replace(/\r\n/g, "\n"),
        this.source = h = h.replace(/\r/g, "\n")) : h.innerHTML && (this.source = h.innerHTML),
        "string" != typeof this.source && (this.source = ""));
        m = m || "<";
        h = ">";
        switch (m) {
        case "[":
            h = "]";
            break;
        case "<":
            break;
        default:
            throw m + " is not a supported deliminator";
        }
        this.scanner = new EJS.Scanner(this.source,m,h);
        this.out = ""
    }
    ;
    EJS.Compiler.prototype = {
        compile: function(h, m) {
            h = h || {};
            this.out = "";
            var n = new EJS.Buffer(this.pre_cmd,this.post_cmd)
              , w = ""
              , t = function(h) {
                h = h.replace(/\\/g, "\\\\");
                h = h.replace(/\n/g, "\\n");
                return h = h.replace(/"/g, '\\"')
            };
            this.scanner.scan(function(h, m) {
                if (null == m.stag)
                    switch (h) {
                    case "\n":
                        w += "\n";
                        n.push('___ViewO.push("' + t(w) + '");');
                        n.cr();
                        w = "";
                        break;
                    case m.left_delimiter:
                    case m.left_equal:
                    case m.left_comment:
                        m.stag = h;
                        0 < w.length && n.push('___ViewO.push("' + t(w) + '")');
                        w = "";
                        break;
                    case m.double_left:
                        w += m.left_delimiter;
                        break;
                    default:
                        w += h
                    }
                else
                    switch (h) {
                    case m.right_delimiter:
                        switch (m.stag) {
                        case m.left_delimiter:
                            "\n" == w[w.length - 1] ? (w = w.substr(0, w.length - 1),
                            n.push(w),
                            n.cr()) : n.push(w);
                            break;
                        case m.left_equal:
                            n.push("___ViewO.push((EJS.Scanner.to_text(" + w + ")))")
                        }
                        m.stag = null;
                        w = "";
                        break;
                    case m.double_right:
                        w += m.right_delimiter;
                        break;
                    default:
                        w += h
                    }
            });
            0 < w.length && n.push('___ViewO.push("' + t(w) + '")');
            n.close();
            this.out = n.script + ";";
            m = "/*" + m + "*/this.process = function(_CONTEXT,_VIEW) { try { with(_VIEW) { with (_CONTEXT) {" + this.out + " return ___ViewO.join('');}}}catch(e){e.lineNumber=null;throw e;}};";
            try {
                eval(m)
            } catch (E) {
                if ("undefined" != typeof JSLINT) {
                    JSLINT(this.out);
                    for (var q = 0; q < JSLINT.errors.length; q++)
                        if (m = JSLINT.errors[q],
                        "Unnecessary semicolon." != m.reason)
                            throw m.line++,
                            q = Error(),
                            q.lineNumber = m.line,
                            q.message = m.reason,
                            h.view && (q.fileName = h.view),
                            q;
                } else
                    throw E;
            }
        }
    };
    EJS.config = function(h) {
        EJS.cache = null != h.cache ? h.cache : EJS.cache;
        EJS.type = null != h.type ? h.type : EJS.type;
        EJS.ext = null != h.ext ? h.ext : EJS.ext;
        var m = EJS.templates_directory || {};
        EJS.templates_directory = m;
        EJS.get = function(h, n) {
            return 0 == n ? null : m[h] ? m[h] : null
        }
        ;
        EJS.update = function(h, n) {
            null != h && (m[h] = n)
        }
        ;
        EJS.INVALID_PATH = -1
    }
    ;
    EJS.config({
        cache: !0,
        type: "<",
        ext: ".ejs"
    });
    EJS.Helpers = function(h, m) {
        this._data = h;
        this._extras = m;
        n(this, m)
    }
    ;
    EJS.Helpers.prototype = {
        view: function(h, m, n) {
            n || (n = this._extras);
            m || (m = this._data);
            return (new EJS(h)).render(m, n)
        },
        to_text: function(h, m) {
            return null == h || void 0 === h ? m || "" : h instanceof Date ? h.toDateString() : h.toString ? h.toString().replace(/\n/g, "<br />").replace(/''/g, "'") : ""
        }
    };
    EJS.newRequest = function() {
        for (var h = [function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }
        , function() {
            return new XMLHttpRequest
        }
        , function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
        ], m = 0; m < h.length; m++)
            try {
                var n = h[m]();
                if (null != n)
                    return n
            } catch (C) {}
    }
    ;
    EJS.request = function(h) {
        var m = new EJS.newRequest;
        m.open("GET", h, !1);
        try {
            m.send(null)
        } catch (y) {
            return null
        }
        return 404 == m.status || 2 == m.status || 0 == m.status && "" == m.responseText ? null : m.responseText
    }
    ;
    EJS.ajax_request = function(h) {
        h.method = h.method ? h.method : "GET";
        var m = new EJS.newRequest;
        m.onreadystatechange = function() {
            if (4 == m.readyState)
                h.onComplete(m)
        }
        ;
        m.open(h.method, h.url);
        m.send(null)
    }
}
)();
