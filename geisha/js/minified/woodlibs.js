var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
    var b = 0;
    return function() {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    }
}
;
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
}
;
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}
    ;
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
;
$jscomp.SymbolClass = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: b
    })
}
;
$jscomp.SymbolClass.prototype.toString = function() {
    return this.$jscomp$symbol$id_
}
;
$jscomp.Symbol = function() {
    function a(c) {
        if (this instanceof a)
            throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (c || "") + "_" + b++,c)
    }
    var b = 0;
    return a
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
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
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function() {}
}
;
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    }
    ;
    return a
}
;
$jscomp.iteratorFromArray = function(a, b) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var c = 0
      , d = {
        next: function() {
            if (c < a.length) {
                var e = c++;
                return {
                    value: b(e, a[e]),
                    done: !1
                }
            }
            d.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ;
            return d.next()
        }
    };
    d[Symbol.iterator] = function() {
        return d
    }
    ;
    return d
}
;
$jscomp.polyfill = function(a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
;
$jscomp.polyfill("Array.prototype.keys", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(a) {
            return a
        })
    }
}, "es6", "es3");
$jscomp.findInternal = function(a, b, c) {
    a instanceof String && (a = String(a));
    for (var d = a.length, e = 0; e < d; e++) {
        var f = a[e];
        if (b.call(c, f, e, a))
            return {
                i: e,
                v: f
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, c) {
        return $jscomp.findInternal(this, a, c).v
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(a, c) {
            return c
        })
    }
}, "es8", "es3");
if (!wood)
    var wood = {};
if (!Wood) {
    var Wood = {
        Model: {},
        Modules: {
            Client: {},
            Controller: {
                Base: {},
                Login: {}
            }
        },
        Controller: {},
        Collection: {},
        View: {
            Common: {},
            Nfc: {},
            Title: {},
            Ranking: {},
            Aoc: {
                Check: {},
                List: {}
            }
        },
        UrlPrefix: {},
        Debug: {},
        Test: {}
    }
      , wood_client = {};
    Wood.isWiiU = "undefined" !== typeof wiiuSystemSetting;
    var NINJA_BASE = "https://ninja.wup.shop.nintendo.net/ninja/"
      , SAMURAI_ORIGINBASE = "https://samurai.wup.shop.nintendo.net/samurai/";
    Wood.getHostName = function() {
        return location.hostname
    }
    ;
    Wood.setupUrlPrefix = function() {
        Wood.UrlPrefix.NINJA = NINJA_BASE;
        Wood.UrlPrefix.SAMURAI_ORIGIN = SAMURAI_ORIGINBASE;
        var a = Wood.getHostName();
        0 <= a.indexOf("geisha") ? Wood.UrlPrefix.SAMURAI = "https://" + a.replace("geisha", "samurai") + "/samurai/" : Wood.UrlPrefix.SAMURAI = SAMURAI_ORIGINBASE;
        if (!Wood.isWiiU) {
            if (a = localStorage.getItem("samurai_base"))
                Wood.UrlPrefix.SAMURAI_ORIGIN = a,
                Wood.UrlPrefix.SAMURAI = a;
            if (a = localStorage.getItem("ninja_base"))
                Wood.UrlPrefix.NINJA = a
        }
    }
    ;
    Wood.setupUrlPrefix();
    Wood.isSWLoaded = function() {
        return "StopWatch"in window
    }
    ;
    Wood.hasSW = function() {
        if (Wood.isSWLoaded())
            return !!wood.stop_watch
    }
    ;
    Wood.initializeSW = function(a) {
        Wood.isSWLoaded() && (wood.stop_watch = new StopWatch(a),
        wood.stop_watch.start())
    }
    ;
    Wood.lap = function(a) {
        Wood.isSWLoaded() && (Wood.hasSW() || Wood.initializeSW("unknown"),
        wood.stop_watch.lap(a))
    }
    ;
    Wood.finalizeSW = function() {
        if (Wood.isSWLoaded()) {
            if (!Wood.hasSW())
                throw "wood.stop_watch not initialized.";
            wood.stop_watch.finish();
            wood.stop_watch.reportText().split("\n").forEach(function(a, b) {
                Wood.log(a)
            });
            wood.stop_watch = null
        }
    }
    ;
    Wood.log = function(a) {
        if (Wood.isWiiU && "undefined" !== typeof wiiuDebug)
            for (; a; )
                wiiuDebug.print(a.substr(0, 200)),
                a = a.substr(200);
        else
            console.log(a)
    }
}
window.jQuery && jQuery.extend({
    print: function(a) {
        "undefined" !== typeof wiiuDebug ? wiiuDebug.print(a) : "undefined" !== typeof console && console.log(a)
    }
});
(function() {
    Wood.Storage = function(a) {
        this.storage = a
    }
    ;
    Wood.Storage.Types = {
        string: {
            encode: function(a) {
                return a ? "" + a : ""
            },
            decode: function(a) {
                return a ? "" + a : a
            }
        },
        number: {
            encode: function(a) {
                if (!_.isNumber(a))
                    throw a + " is not number";
                return "" + a
            },
            decode: function(a) {
                return parseInt(a, 10)
            }
        },
        "boolean": {
            encode: function(a) {
                return a ? "true" : "false"
            },
            decode: function(a) {
                return "true" === a
            }
        },
        json: {
            encode: function(a) {
                return JSON.stringify(a)
            },
            decode: function(a) {
                return JSON.parse(a)
            }
        }
    };
    Wood.Storage.validateAccessorEntry = function(a) {
        return _.isString(a.name) && _.isString(a.key) && _.include(_.keys(Wood.Storage.Types), a.type) ? !0 : !1
    }
    ;
    Wood.Storage.injectAccessors = function(a, b) {
        _.each(b, function(b) {
            if (!Wood.Storage.validateAccessorEntry(b))
                throw "invalid accessor entry: " + JSON.stringify(b);
            var c = Wood.Storage.Types[b.type];
            a["set" + b.name] = function(a) {
                this.storage.setItem(b.key, c.encode(a))
            }
            ;
            a["get" + b.name] = function() {
                return c.decode(this.storage.getItem(b.key))
            }
            ;
            a["remove" + b.name] = function() {
                this.storage.removeItem(b.key)
            }
            ;
            "boolean" === b.type && (a["is" + b.name] = function() {
                return !!c.decode(this.storage.getItem(b.key))
            }
            ,
            a["has" + b.name] = function() {
                return !!this.storage.getItem(b.key)
            }
            )
        })
    }
    ;
    Wood.Storage.create = function(a) {
        if (!_.isArray(a.accessors))
            throw "accessors not specified";
        if (!a.storage)
            throw "storage not specified";
        var b = new Wood.Storage(a.storage);
        _.isFunction(a.writer) && (b.storageWrite = a.writer);
        Wood.Storage.injectAccessors(b, a.accessors);
        return b
    }
}
)();
(function() {
    var a = [{
        name: "LangSelectable",
        key: "_lang_selectable_v1",
        type: "boolean"
    }, {
        name: "WishlistLastModified",
        key: "_wish_modified_v1",
        type: "number"
    }, {
        name: "MovieType",
        key: "movie_type",
        type: "string"
    }];
    Wood.LocalStorage = {
        getRawInstance: function() {
            return "undefined" !== typeof wiiuSystemSetting ? wiiuLocalStorage : window.localStorage
        },
        build: function(b) {
            return Wood.Storage.create({
                storage: b,
                accessors: a
            })
        }
    }
}
)();
(function() {
    var a = [];
    Wood.SessionStorage = {
        getRawInstance: function() {
            return "undefined" !== typeof wiiuSystemSetting ? wiiuSessionStorage : window.sessionStorage
        },
        build: function(b) {
            return Wood.Storage.create({
                storage: b,
                accessors: a
            })
        }
    }
}
)();
(function() {
    Wood.Util = {
        each: function(a, b) {
            if (void 0 !== a && null !== a)
                if ("array" === $.type(a) || "object" === $.type(a))
                    if ("object" === $.type(a) && isNaN(parseInt(Object.keys(a), 10)))
                        b(0, a);
                    else
                        for (var c in a)
                            a.hasOwnProperty(c) && b(c, a[c]);
                else
                    b(0, a)
        },
        arrayDiff: function(a, b) {
            if (!a || !b)
                return !1;
            var c = [];
            a.forEach(function(a) {
                0 > $.inArray(a, b) && c.push(a)
            });
            b.forEach(function(b) {
                0 > $.inArray(b, a) && c.push(b)
            });
            return c
        },
        isUndefined: function(a) {
            return void 0 === a || null === a
        },
        isDefined: function(a) {
            return void 0 !== a && null !== a
        },
        encodeValues: function(a) {
            var b = a.split("?");
            a = b[0];
            b = b[1];
            if (!b)
                return a;
            var c = [];
            $.each(b.split("&"), function(a, b) {
                a = b.split("=");
                c.push(a[0] + "=" + encodeURIComponent(a[1]))
            });
            return a + "?" + c.join("&")
        },
        convertSecondToFormat: function(a) {
            var b = [];
            b[0] = Math.floor(a / 3600);
            b[1] = Math.floor(a / 60 % 60);
            10 > b[1] && (b[1] = "0" + b[1]);
            b[2] = a % 60;
            10 > b[2] && (b[2] = "0" + b[2]);
            return b.join(":")
        },
        createPromise: function(a) {
            var b = jQuery.Deferred();
            _.defer(function() {
                a(b)
            });
            return b.promise()
        },
        isWupNsuid: function(a) {
            return a ? "5" === a.toString().charAt(0) ? !1 : !0 : !0
        },
        createPlaceHolderUrl: function(a) {
            return "image/placeholder/place_icon_" + (Wood.Util.isWupNsuid(a) ? "wii_u" : "3ds") + ".png"
        },
        createIconClass: function(a) {
            return "p-icon-" + (Wood.Util.isWupNsuid(a) ? "wup-M" : "ctr-M")
        },
        formatTime: function(a) {
            var b = [];
            a = parseInt(a, 10);
            b[0] = Math.floor(a / 3600);
            b[1] = Math.floor(a / 60 % 60);
            10 > b[1] && (b[1] = "0" + b[1]);
            b[2] = a % 60;
            10 > b[2] && (b[2] = "0" + b[2]);
            return b.join(":")
        }
    }
}
)();
(function() {
    Wood.DomUtil = {
        hookLabelSoundEffectEvent: function(a) {
            a.find('.se:not([data-sound-assigned="true"])').each(function() {
                var a = $(this).data("se-label");
                $(this).on("click", function() {
                    wood.client.playSound(a);
                    return !0
                }).on("touchstart", function() {
                    wood.client.playSound("SE_WAVE_DRC_TOUCH_TRG");
                    return !0
                }).attr("data-sound-assigned", !0)
            })
        },
        hookSoundEffectEvent: function(a) {
            this.hookLabelSoundEffectEvent(a);
            $([['input[type="submit"]', "touchstart", ["SE_WAVE_DRC_TOUCH_TRG"]], ['input[type="submit"]', "click", ["SE_WAVE_OK"]], ['input[type="reset"]', "touchstart", ["SE_WAVE_DRC_TOUCH_TRG"]], ['input[type="reset"]', "click", ["SE_WAVE_RESET"]], ['input[type="checkbox"]', "click", ["SE_WAVE_CHECKBOX_CHECK", "SE_WAVE_CHECKBOX_UNCHECK"]], ['input[type="radio"]', "click", ["SE_WAVE_DRC_TOUCH_TRG", "SE_WAVE_RADIOBUTTON_CHECK"]]]).each(function() {
                var b = this[1]
                  , c = this[2];
                a.find(this[0]).each(function() {
                    var a = $(this);
                    a.data("sound-assigned") || a.on(b, function() {
                        if ("checkbox" === a.attr("type")) {
                            var b = a.prop("checked") ? 0 : 1;
                            wood.client.playSound(c[b])
                        } else
                            c.forEach(function(a) {
                                wood.client.playSound(a)
                            })
                    }).attr("data-sound-assigned", !0)
                })
            })
        },
        applyLocalizedText: function(a, b) {
            $("entry", b).each(function() {
                var b = '[data-message="' + $(this).attr("key") + '"]';
                $(b, a).html($(this).text())
            })
        },
        localizeText: function(a) {
            a = a || this.$el;
            a.find("[data-message]").each(function() {
                var a = $(this);
                a.html(wood.client.getText(a.attr("data-message")))
            })
        },
        showBody: function() {
            $("body").removeClass("display_cover")
        },
        hideBody: function() {
            $("body").addClass("display_cover")
        },
        createSizeHTML: function(a, b, c) {
            var d = null;
            a = this.getSizeWithUnit(a);
            a.size = this.replaceRadixPoint(a.size, b, c);
            switch (a.unit) {
            case "GB":
                d = $("#str_gb").html();
                break;
            case "MB":
                d = $("#str_mb").html();
                break;
            case "KB":
                d = $("#str_kb").html()
            }
            return a.size + " " + d
        },
        getSizeWithUnit: function(a) {
            var b = parseInt(a, 10);
            10239948 >= b ? (b = Math.floor(b / 10.24),
            a = "KB",
            100 > b && (b = 100)) : 10485707571 >= b ? (b = Math.floor(b / 10485.76),
            a = "MB") : (b = Math.floor(b / 1.073741824E7),
            a = "GB");
            b += 5;
            999999 < b && (b = 999999);
            b /= 10;
            b = Math.floor(b / 10) + "." + Math.floor(b % 10);
            return {
                size: b,
                unit: a
            }
        },
        replaceRadixPoint: function(a, b, c) {
            a = a.toString();
            _.contains(["JP_ja", "US_en", "US_es", "EU_en", "EU_pt"], {
                JPN: "JP_",
                USA: "US_",
                EUR: "EU_",
                AUS: "EU_"
            }[c] + b) || (a = a.replace(".", ","));
            return a
        },
        applyTextOverflow: function(a) {
            var b = a.html()
              , c = a.clone();
            c.css({
                display: "none",
                position: "absolute",
                overflow: "visible",
                width: a.width(),
                height: "auto"
            });
            for (a.after(c); 0 < b.length && c.height() > a.height(); )
                b = b.substr(0, b.length - 1),
                c.html(b + "...");
            a.html(c.html());
            c.remove()
        },
        formatDate: function(a) {
            a = a.split("-");
            return 3 === a.length ? $("#str_release_ymd").html().replace("%{yyyy}", a[0]).replace("%{mm}", a[1]).replace("%{dd}", a[2]) : 2 === a.length ? $("#str_release_ym").html().replace("%{yyyy}", a[0]).replace("%{mm}", a[1]) : $("#str_release_y").html().replace("%{yyyy}", a[0])
        },
        animateToTop: function(a) {
            a ? $("html,body").animate({
                scrollTop: a
            }, 0) : $("html,body").animate({
                scrollTop: $("html,body").offset().top
            }, 0)
        },
        lazyload: function(a) {
            $(a).on("error", function() {
                void 0 !== $(this).data("placeholder") && $(this).attr("src", $(this).data("placeholder"))
            });
            $(a).each(function() {
                if (void 0 === $(this).data("loaded") || "placeholder" === $(this).data("loaded")) {
                    var a = this;
                    setTimeout(function() {
                        var b = $(a).attr("src")
                          , d = "placeholder";
                        void 0 !== $(a).data("original") && "" !== $(a).data("original") && (d = $(a).data("original"),
                        $(a).attr("src", d),
                        $(a).data("placeholder", b));
                        $(a).data("loaded", d)
                    }, 0)
                }
            })
        },
        getTaxTextWithPriceObject: function(a) {
            var b = a.getAmount();
            return a.isFree() ? b : this.getTaxText(b)
        },
        getTaxText: function(a) {
            var b = a, c;
            if (c = a)
                a = (a = (a || "").match(/\d/g)) ? !/[1-9]/.test(a.join("")) : !1,
                c = !a;
            c && wood.client.isTaxIncludedMessageRequired() && (b = "AU" === wood.client.country ? b + (" " + $("#str_tax_included_au").html()) : b + (" " + $("#str_tax_included").html()));
            return b
        }
    }
}
)();
(function() {
    Wood.ErrorCode = {
        WISHLIST_FULL: 1073190,
        CLOSE_APPLICATION: 1119E3,
        RETRIABLE: 1119001,
        UNDER_MAINTENANCE: 1119002,
        SERVICE_FINISHED: 1119003,
        INVALID_TEMPLATE: 1119100,
        FOR_BROWSER_LOCKED: 1990503
    }
}
)();
(function() {
    Wood.ErrorViewer = {
        show: function(a, b) {
            Wood.log("[Wood.ErrorViewer] errorCode:" + a);
            Wood.log("[Wood.ErrorViewer] errorMessage:" + b);
            Wood.isWiiU ? (a = "string" === typeof a ? parseInt(a, 10) : a,
            Wood.Analytics.sendError(a),
            b ? wiiuErrorViewer.openByCodeAndMessage(a, b) : wiiuErrorViewer.openByCode(a)) : (Wood.Analytics.sendError(a),
            b ? Wood.ErrorViewer.showAlert(a + "\n\n" + b) : Wood.ErrorViewer.showAlert(a))
        },
        showAlert: function(a) {
            window.alert(a)
        }
    }
}
)();
(function() {
    Wood.SystemConfig = {
        PREFIX_SAMURAI: 110,
        PREFIX_NINJA: 107,
        PREFIX_CCIF: 126,
        PREFIX_OTHER: 111,
        ERROR_CODE_CLOSE_APPLICATION: 1119E3,
        ERROR_CODE_RETRIABLE: 1119001,
        ERROR_CODE_UNDER_MAINTENANCE: 1119002,
        ERROR_CODE_SERVICE_FINISHED: 1119003,
        ERROR_CODE_BROWSWER_LOCKED: 1990503,
        EXCLUSION_PLATFORM_IDS: "20,21,22,23,24,25,26,43,63,83",
        SESSION_UPDATE_INTERVAL: 36E5
    };
    Wood.SystemConfig.getExclusionPlatformIds = function() {
        return _.map(Wood.SystemConfig.EXCLUSION_PLATFORM_IDS.split(","), function(a) {
            return parseInt(a, 10)
        })
    }
}
)();
(function() {
    var a = Wood.Error = function(a, b, c, e) {
        this.type = b;
        this.displayable = a;
        this.dialog_type = c;
        this.handler = e
    }
    ;
    a.Type = {
        GENERIC: 1,
        SPECIFIC: 2
    };
    a.DialogType = {
        CONFIRM: 1,
        ALERT: 2
    };
    var b = function() {
        location.href = "index.html#top";
        throw Error("error top_redirector stopper");
    }
      , c = new a(!0,a.Type.GENERIC,a.DialogType.ALERT)
      , d = new a(!0,a.Type.GENERIC,a.DialogType.ALERT,b)
      , e = new a(!0,a.Type.SPECIFIC,a.DialogType.ALERT)
      , f = new a(!1,a.Type.SPECIFIC,a.DialogType.ALERT)
      , g = {
        3011: c,
        3021: new a(!0,a.Type.SPECIFIC,a.DialogType.ALERT,b),
        3025: e,
        3026: e,
        3027: e,
        3028: new a(!0,a.Type.SPECIFIC,a.DialogType.ALERT,b),
        3051: d,
        3052: d,
        3053: d,
        3054: d,
        3055: d,
        3056: d,
        3057: d,
        3058: d,
        3100: e,
        3101: e,
        3102: e,
        3103: e,
        3104: e,
        3105: e,
        3106: e,
        3107: e,
        3108: e,
        3109: e,
        3110: e,
        3111: e,
        3112: e,
        3113: e,
        3114: e,
        3115: e,
        3116: e,
        3117: e,
        3118: e,
        3120: e,
        3121: f,
        3122: f,
        3123: new a(!1,a.Type.GENERIC,a.DialogType.ALERT),
        3124: new a(!1,a.Type.SPECIFIC,a.DialogType.CONFIRM),
        3125: c,
        3150: d,
        3151: d,
        3152: e,
        3153: e,
        3154: f,
        3155: f,
        3160: f,
        3161: new a(!0,a.Type.SPECIFIC,a.DialogType.ALERT,b),
        3162: f,
        3170: c,
        3171: f,
        3180: c,
        3190: new a(!1,a.Type.SPECIFIC,a.DialogType.CONFIRM),
        3191: d,
        3200: new a(!1,a.Type.GENERIC,a.DialogType.ALERT),
        3210: e,
        3230: e,
        3231: e,
        3232: e,
        3233: e,
        3234: e,
        3235: f,
        3236: f,
        3237: e,
        3238: e,
        3239: e,
        3240: e,
        3241: f,
        3242: e,
        3243: e,
        3250: e,
        3251: e,
        3252: e,
        3260: e,
        3261: e,
        3262: e,
        3263: e,
        3264: e,
        3265: e,
        3266: e,
        3267: new a(!0,a.Type.SPECIFIC,a.DialogType.ALERT,b),
        3268: new a(!0,a.Type.SPECIFIC,a.DialogType.ALERT,b),
        3271: e,
        3278: e,
        3279: e,
        3301: new a(!1,a.Type.SPECIFIC,a.DialogType.ALERT,b),
        5997: d,
        6542: e,
        6561: e,
        6568: e,
        6591: c,
        6635: new a(!0,a.Type.SPECIFIC,a.DialogType.ALERT,b),
        6644: new a(!0,a.Type.SPECIFIC,a.DialogType.ALERT,b),
        6804: e,
        6805: e,
        6810: c,
        6811: e,
        6812: e,
        6813: e,
        6814: c,
        6815: e,
        6830: c,
        6831: c,
        6834: e,
        6835: e,
        6836: e,
        6837: e,
        6838: e,
        6941: e,
        6942: e,
        6943: e,
        6989: e,
        7401: e,
        7402: c,
        7403: e,
        7499: e,
        7501: e,
        7503: e,
        7506: c,
        7507: e,
        7509: d,
        7510: d,
        7511: e,
        7514: e,
        7515: c,
        7516: e,
        7519: e,
        7530: f,
        7532: c,
        7534: c,
        7535: d,
        7536: e,
        7537: c,
        9001: e,
        9003: e,
        9006: c,
        9007: e,
        9009: d,
        9010: d,
        9011: e,
        9014: e,
        9015: c,
        9019: e,
        9030: e,
        9032: c,
        9034: c,
        9035: d,
        9036: e,
        9037: c,
        9600: c,
        9601: c,
        9610: c,
        9611: c,
        9612: c,
        9613: c,
        9614: c,
        9615: c,
        9620: c,
        9621: c,
        9630: c,
        9631: c,
        9632: c,
        9640: c,
        9641: c,
        9642: c
    };
    a.dispatch = function(a) {
        return g[a]
    }
    ;
    a.Result = {
        ERROR_NOT_PROCESSED: 0,
        ERROR_MESSAGE_SHOWN: 1
    }
}
)();
(function() {
    Wood.KeyMap = {
        BUTTON_A: 13,
        BUTTON_B: 27,
        BUTTON_X: 88,
        BUTTON_Y: 89,
        BUTTON_L: 76,
        BUTTON_R: 82,
        BUTTON_PLUS: 80,
        BUTTON_MINUS: 77
    }
}
)();
(function() {
    function a(a, c) {
        return function(b) {
            if (b.keyCode === a)
                return c.call(b, b)
        }
    }
    Wood.KeyEvent = {
        A: function(b) {
            return a(Wood.KeyMap.BUTTON_A, b)
        },
        B: function(b) {
            return a(Wood.KeyMap.BUTTON_B, b)
        },
        X: function(b) {
            return a(Wood.KeyMap.BUTTON_X, b)
        },
        Y: function(b) {
            return a(Wood.KeyMap.BUTTON_Y, b)
        },
        L: function(b) {
            return a(Wood.KeyMap.BUTTON_L, b)
        },
        R: function(b) {
            return a(Wood.KeyMap.BUTTON_R, b)
        },
        PLUS: function(b) {
            return a(Wood.KeyMap.BUTTON_PLUS, b)
        },
        MINUS: function(b) {
            return a(Wood.KeyMap.BUTTON_MINUS, b)
        }
    }
}
)();
(function() {
    Wood.Request = function(a) {
        this.location = a;
        this._param = this.parseParam()
    }
    ;
    Wood.Request.prototype = {
        param: function(a) {
            return this._param[a]
        },
        params: function() {
            return this._param
        },
        getPathname: function() {
            return this.location.pathname
        },
        getHash: function() {
            return this.location.hash
        },
        getSearch: function() {
            return this.location.search
        },
        getFilename: function() {
            return this.location.pathname.replace(/.*\//, "")
        },
        isAppJump: function() {
            return "appJump" === this.param("seq")
        },
        isFromPurchaseComplete: function() {
            return "privJump" === this.param("seq")
        },
        parseParam: function() {
            var a = {}
              , b = (this.location || location).href.split("?");
            if (1 < b.length) {
                b = b[b.length - 1].split("&");
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = b[c].split("=");
                    a[decodeURIComponent(e[0])] = decodeURIComponent(e[1])
                }
            } else
                return !1;
            return a
        }
    }
}
)();
(function() {
    Wood.StarRating = function(a, b) {
        this.number = a;
        this.path_prefix = b ? b : "image/shelf01_01/img_relating_"
    }
    ;
    Wood.StarRating.prototype = {
        getNumber: function() {
            return this.number
        },
        getImagePath: function() {
            var a = this.number;
            return 4.75 <= a ? this.path_prefix + "05.png" : 4.25 <= a ? this.path_prefix + "04h.png" : 3.75 <= a ? this.path_prefix + "04.png" : 3.25 <= a ? this.path_prefix + "03h.png" : 2.75 <= a ? this.path_prefix + "03.png" : 2.25 <= a ? this.path_prefix + "02h.png" : 1.75 <= a ? this.path_prefix + "02.png" : 1.25 <= a ? this.path_prefix + "01h.png" : this.path_prefix + "01.png"
        }
    };
    Wood.StarRating.PathPrefix = {
        DATA01_SMALL: "image/data01_01/img_data01_01_evaluation_small_",
        DATA01_LARGE: "image/data01_01/img_data01_01_evaluation_large_"
    };
    Wood.StarRating.NO_RATING_IMAGE_PATH = "image/shelf01_01/img_relating_00.png"
}
)();
(function() {
    Wood.URL = function(a, b, c) {
        this.base_url = a;
        this.setQueryStrings(b);
        this.fragment = c
    }
    ;
    Wood.URL.create = function(a, b, c) {
        return (new Wood.URL(a,b,c)).toString()
    }
    ;
    Wood.URL.prototype = {
        setQueryString: function(a, b) {
            this.query_strings[a] = b
        },
        setQueryStrings: function(a) {
            this.query_strings = a || {}
        },
        addQuery: function(a) {
            $.extend(this.query_strings, a)
        },
        toString: function() {
            return this.base_url + ($.isEmptyObject(this.query_strings) ? "" : "?") + $.map(this.query_strings, function(a, b) {
                return encodeURIComponent(b) + "=" + encodeURIComponent(a)
            }).join("&") + (this.fragment ? "#" + this.fragment : "")
        }
    }
}
)();
(function() {
    Wood.UserAgent = function(a) {
        this.user_agent_string = "string" === typeof a ? a : navigator.userAgent
    }
    ;
    Wood.UserAgent.LATEST_VERSION = "1.5";
    Wood.UserAgent.parseUserAgentString = function(a) {
        return new Wood.UserAgent(a)
    }
    ;
    Wood.UserAgent.prototype = {
        getWoodVersion: function() {
            var a = this.user_agent_string.match(/wood\/([\d\.]+)\.[^\d]/);
            return null !== a && 2 === a.length ? a[1] : 0
        },
        isWood: function() {
            return /wood\//.test(this.user_agent_string)
        },
        isLatestVersion: function() {
            return this.getWoodVersion() === Wood.UserAgent.LATEST_VERSION
        },
        isLatestVersionOrLater: function() {
            var a = parseFloat(this.getWoodVersion())
              , b = parseFloat(Wood.UserAgent.LATEST_VERSION);
            return a >= b
        },
        toString: function() {
            return this.user_agent_string
        }
    }
}
)();
(function() {
    var a = {
        PARTNER: [0, 4],
        RESERVED: [4, 2],
        CATEGORY: [6, 2],
        PLATFORM: [8, 1],
        UNIQUE: [9, 5],
        VARIATION: [14, 2]
    };
    Wood.TitleId = function(a) {
        this.title_id = a;
        this.id = this.getStructuredId(a)
    }
    ;
    Wood.TitleId.prototype = {
        getStructuredId: function(b) {
            if (!_.isString(b) || 16 !== b.length)
                throw Error("\u30bf\u30a4\u30c8\u30ebID\u304c\u6b63\u3057\u304f\u3042\u308a\u307e\u305b\u3093: " + b);
            var c = {};
            _.each(a, function(a, e) {
                c[e.toLowerCase()] = b.substr(a[0], a[1])
            });
            return c
        },
        getPartnerID: function() {
            return this.id.partner
        },
        getCategoryID: function() {
            return this.id.category
        },
        getPlatformID: function() {
            return this.id.platform
        },
        getUniqueID: function() {
            return this.id.unique
        },
        getVariation: function() {
            return this.id.variation
        },
        getUniqueTitleName: function() {
            var a = this.id;
            return a.partner + a.reserved + a.category + a.platform + a.unique
        },
        isSameTitleAs: function(a) {
            a = a instanceof Wood.TitleId ? a : new Wood.TitleId(a);
            return this.getUniqueTitleName() === a.getUniqueTitleName()
        }
    }
}
)();
(function() {
    Wood.Pagenation = function(a, b, c) {
        this.total_count = a;
        this.per_page = b;
        this.current_page = c
    }
    ;
    Wood.Pagenation.prototype = {
        getTotalCount: function() {
            return this.total_count
        },
        setTotalCount: function(a) {
            this.total_count = a
        },
        getPerPage: function() {
            return this.per_page
        },
        getCurrentPage: function() {
            return this.current_page
        },
        getOffset: function() {
            return (this.current_page - 1) * this.per_page
        },
        setCurrentPage: function(a) {
            this.current_page = a
        },
        getTotalPage: function() {
            var a = this.getTotalCount()
              , b = this.getPerPage()
              , c = parseInt(a / b, 10);
            0 < a - b * c && c++;
            return c
        },
        getNextPage: function() {
            return this.getTotalPage() > this.getCurrentPage() ? this.getCurrentPage() + 1 : null
        },
        getPrevPage: function() {
            return 1 === this.getTotalPage() || 1 === this.getCurrentPage() ? null : this.getCurrentPage() - 1
        },
        getSlicedIndexes: function() {
            if (0 === this.getTotalCount())
                return [];
            var a = []
              , b = (this.getCurrentPage() - 1) * this.getPerPage()
              , c = b + this.getPerPage() - 1
              , d = this.getTotalCount() - 1;
            for (c > d && (c = d); b <= c; b++)
                a.push(b);
            return a
        },
        getNaviPages: function() {
            var a = this.getTotalPage()
              , b = 5 > a ? a : 5
              , c = Math.floor(b / 2)
              , d = this.getCurrentPage()
              , e = d - c;
            c = d + c;
            7 === a ? (e = 1,
            c = 7) : (0 >= e && (e = 1,
            c = b),
            c > a && (c = a,
            e = a - b + 1),
            4 > d && 6 <= a && c++,
            d > a - 3 && 6 <= a && e--);
            return _.range(e, c + 1)
        }
    }
}
)();
(function() {
    Wood.Price = function(a, b, c, d, e, f) {
        this.id = parseInt(a, 10);
        this.raw_value = parseFloat(b, 10);
        this.amount = c;
        this.currency = d;
        this.discount_type = e;
        this.description = f;
        this.raw_value_text = b
    }
    ;
    Wood.Price.DiscountType = {
        NONE: 1,
        NORMAL: 2,
        CONDITIONAL: 3,
        COUPON: 4
    };
    Wood.Price.prototype = {
        getId: function() {
            return this.id
        },
        getRawValue: function() {
            return this.raw_value
        },
        getRawValueText: function() {
            return this.raw_value_text
        },
        getAmount: function() {
            return this.amount
        },
        getCurrency: function() {
            return this.currency
        },
        getDiscountType: function() {
            return this.discount_type
        },
        getDescription: function() {
            return this.description && "" !== this.description ? this.description : null
        },
        isNotAtDiscount: function() {
            return this.discount_type === Wood.Price.DiscountType.NONE
        },
        isAtNormalDiscount: function() {
            return this.discount_type === Wood.Price.DiscountType.NORMAL
        },
        isAtConditionalDiscount: function() {
            return this.discount_type === Wood.Price.DiscountType.CONDITIONAL
        },
        isAtCouponDiscount: function() {
            return this.discount_type === Wood.Price.DiscountType.COUPON
        },
        isFree: function() {
            return 0 === this.raw_value
        }
    };
    _.defaults(Wood.Price, {
        getDecimalPoint: function(a) {
            return 0 <= a.indexOf(".") ? a.length - 1 - a.indexOf(".") : 0
        },
        getPaddingInt: function(a, b) {
            a = a.replace(".", "");
            for (var c = 0; c < b; c++)
                a += "0";
            return parseInt(a, 10)
        },
        addDot: function(a, b) {
            var c = this.priceAbs(a)
              , d = c;
            if (0 < b)
                if (c.length <= b) {
                    d = "0.";
                    for (var e = 0; e < b - c.length; e++)
                        d += "0";
                    d += c
                } else
                    b = c.length - b,
                    d = c.substring(0, b) + "." + c.substring(b);
            this.isNegative(a) && (d = "-" + d);
            return d
        },
        isPositive: function(a) {
            return null !== a && null !== a.match(/^[0-9]+[\.]?[0-9]*$/) ? !0 : !1
        },
        isNegative: function(a) {
            return null === a || null === a.match(/^-[0-9]+[\.]?[0-9]*$/) || this.isZero(a) ? !1 : !0
        },
        isZero: function(a) {
            return null !== a ? null !== a.match(/^[\-]?[0]+[\.]?[0]*$/) : !1
        },
        priceAbs: function(a) {
            return this.isZero(a) ? a : this.isPositive(a) ? a : this.isNegative(a) ? a.slice(1) : null
        },
        priceAdd: function(a, b) {
            var c = this.priceAbs(a)
              , d = this.priceAbs(b);
            if (null === c || null === d)
                return null;
            a = this.isNegative(a);
            var e = this.isNegative(b)
              , f = this.getDecimalPoint(c)
              , g = this.getDecimalPoint(d);
            b = Math.max(f, g);
            c = this.getPaddingInt(c.replace(".", ""), b - f);
            d = this.getPaddingInt(d.replace(".", ""), b - g);
            d = String((a ? -1 : 1) * c + (e ? -1 : 1) * d);
            return d = this.addDot(d, b)
        },
        priceSub: function(a, b) {
            var c;
            this.isNegative(b) ? c = b.slice(1) : this.isPositive(b) && (c = "-" + b);
            return void 0 !== c ? this.priceAdd(a, c) : null
        }
    })
}
)();
(function() {
    Wood.Rating = function(a, b) {
        this.system_id = parseInt(a, 10);
        this.rating_age = parseInt(b, 10)
    }
    ;
    Wood.Rating.ActionType = {
        DEFAULT: 1,
        PURCHACE: 2,
        REDOWNLOAD: 3,
        REDEEM: 4
    };
    Wood.Rating.System = {
        CERO: 201,
        ESRB: 202,
        COB: 208,
        IARC_OFLC_AGCB: 308,
        OFLC_NZ: 209,
        IARC_OFLC_NZ: 309
    };
    Wood.Rating.prototype = {
        isDisplayAllowed: function(a, b, c) {
            if (Wood.Util.isUndefined(this.rating_age))
                return !0;
            var d = this.system_id === Wood.Rating.System.COB || this.system_id === Wood.Rating.System.IARC_OFLC_AGCB
              , e = this.system_id === Wood.Rating.System.OFLC_NZ || this.system_id === Wood.Rating.System.IARC_OFLC_NZ;
            if (this.requiresAgeFilter(a, b)) {
                if (this.system_id === Wood.Rating.System.CERO && 18 === this.rating_age || this.system_id === Wood.Rating.System.ESRB && 17 === this.rating_age || this.system_id === Wood.Rating.System.ESRB && 18 === this.rating_age || d && 18 === this.rating_age)
                    return c >= this.rating_age;
                if (e && 15 === this.rating_age)
                    return 18 <= c
            }
            return !0
        },
        requiresAgeFilter: function(a, b) {
            var c = !1;
            switch (a) {
            case Wood.Rating.ActionType.DEFAULT:
                c = _.contains(["JPN", "AUS", "USA"], b);
                break;
            case Wood.Rating.ActionType.PURCHACE:
                c = "USA" !== b && _.contains(["JPN", "AUS"], b);
                break;
            case Wood.Rating.ActionType.REDOWNLOAD:
            case Wood.Rating.ActionType.REDEEM:
                c = !_.contains(["JPN", "USA"], b) && "AUS" === b
            }
            return c
        }
    }
}
)();
(function() {
    _.templateSettings = {
        interpolate: /\{\{=(.+?)\}\}/g,
        evaluate: /\{\{(.+?)\}\}/g,
        escape: /\{\{-(.+?)\}\}/g
    };
    Wood.Template = function() {
        function a(a) {
            function b() {
                wood.client.showError(Wood.ErrorCode.INVALID_TEMPLATE);
                wood.client.errorShutdown()
            }
            try {
                var c = new EJS({
                    url: "template/" + a + ".html",
                    ext: ".html"
                })
            } catch (g) {
                Wood.log("<Wood.Template> load failed. :" + g.message),
                b()
            }
            /^<script/.test(c.text) || (Wood.log("<Wood.Template> invalid"),
            b());
            return c.text
        }
        function b(a) {
            a = Wood.LocalStorage.getRawInstance().getItem(a);
            return JSON.parse(a)
        }
        function c(c, e) {
            var d = b("tmpl_" + c);
            (d = _.isObject(d) ? d.template : null) || (d = a(c));
            return e && (c = $(d).filter(e),
            d = c.text(),
            /jquery/.test(c.attr("type"))) ? c : _.template(d)
        }
        return {
            get: function(a, b) {
                var e = c(a, b);
                return function(a) {
                    return _.isFunction(e) ? e(a) : e.tmpl(a)
                }
            },
            set: function(c, e) {
                var d = "tmpl_" + c;
                e = e ? e.toString() : "1";
                var g = b(d);
                if (!_.isObject(g) || g.version !== e || !/^<script/.test(g.template))
                    if (c = a(c))
                        e = {
                            version: e,
                            template: c
                        },
                        wood.client.getLocalStorage().setItem(d, JSON.stringify(e)),
                        wood.client.setFSFlushRequired()
            }
        }
    }();
    Wood.Template.Version = {
        MYMENU: 10.5,
        SHELF: 2.4,
        TITLE: 2.6,
        COMMON: 1.1,
        REDEEM: 1.3,
        NEWS: 1.1
    }
}
)();
(function() {
    Wood.Modules.Client.ErrorHandler = function() {
        this.reload_at_ajax_incomplete = this.ajax_aborted = this.shutdown_on_ajax_failure = !1
    }
    ;
    Wood.Modules.Client.ErrorHandler.prototype = {
        setReloadAtAjaxIncomplete: function() {
            this.reload_at_ajax_incomplete = !0
        },
        _handleIncompleteError: function(a, b) {
            Wood.log("[handleAjaxError] before complete error: readyState=" + a.readyState + " url=" + b.url() + " text=" + a.responseText + " statusText=" + a.statusText);
            if (this.shutdown_on_ajax_failure)
                Wood.log("[handleAjaxError] shutdown_on_ajax_failure"),
                this.showError(Wood.ErrorCode.CLOSE_APPLICATION),
                this.errorShutdown();
            else
                throw this.ajax_aborted || this.showError(Wood.ErrorCode.RETRIABLE),
                this.isWiiU() && (this.enableHomeButton(),
                this.disableUserOperation()),
                Wood.log("[handleAjaxError] redirect to top"),
                this.ajax_aborted = !0,
                a.abort(),
                this.isFirstBoot() ? (Wood.log("[handleAjaxError] first boot error"),
                this.showError(Wood.ErrorCode.CLOSE_APPLICATION),
                this.errorShutdown()) : this.reload_at_ajax_incomplete ? (Wood.log("[handleAjaxError] reload"),
                this.enableUserOperation(),
                _.delay(function() {
                    location.reload()
                }, 3E3)) : (Wood.log("[handleAjaxError] redirectToTop"),
                _.defer(_.bind(this.redirectToTop, this))),
                Wood.log("[handleAjaxError] stopper exception thorown"),
                Error("Exception to stop the script in this page.");
        },
        _handleCompleteError: function(a, b) {
            if (!Wood.Util.isUndefined(a.responseText)) {
                var c = a.responseText ? JSON.parse(a.responseText) : null;
                if (Wood.Util.isUndefined(c) || Wood.Util.isUndefined(c.error))
                    Wood.log("cannot handle error:  url=" + b.url() + " statusText=" + a.statusText + " text=" + a.responseText);
                else
                    return this.enableUserOperation(),
                    this.enableHomeButton(),
                    this.showErrorDialog(b.getErrorPrefix(), c.error.code, c.error.message)
            }
        },
        handleAjaxError: function(a, b) {
            Wood.log("handleAjaxError(new) called:");
            Wood.log(" - xhr.readyState: " + a.readyState);
            Wood.log(" - xhr.statusText: " + a.statusText);
            Wood.log(" - model.url(): " + b.url());
            Wood.log(" - model.attributes: " + JSON.stringify(b.attributes));
            this.endStartUp();
            this.hideLoadingIcon();
            this.stopNfcSound();
            if (0 === a.readyState && "abort" === a.statusText)
                Wood.log("request was aborted by user: url=" + b.url() + " statusText=" + a.statusText);
            else {
                if (4 > a.readyState)
                    return this._handleIncompleteError(a, b);
                if (503 === a.status)
                    this.showError(Wood.ErrorCode.UNDER_MAINTENANCE),
                    this.errorShutdown();
                else
                    return this._handleCompleteError(a, b)
            }
        },
        _showErrorMessage: function(a, b, c) {
            "" !== c && void 0 !== c ? this.showError(a + b, c) : this.showError(a + b)
        },
        _performCallback: function(a, b) {
            if (void 0 !== b)
                return b(Wood.Error.Result.ERROR_MESSAGE_SHOWN);
            if (a.handler)
                return a.handler.call(Wood.Error.Result.ERROR_MESSAGE_SHOWN)
        },
        _showDefinedError: function(a, b, c, d, e) {
            if (b.dialog_type === Wood.Error.CONFIRM)
                return e(Wood.Error.Result.ERROR_NOT_PROCESSED);
            if (b.displayable) {
                if ("" !== c && void 0 !== c)
                    return this._showErrorMessage(a, c, d),
                    this._performCallback(b, e);
                Wood.log("[ERROR] error code is not defined.");
                this.showError(Wood.ErrorCode.CLOSE_APPLICATION);
                this.isWiiU() && this.errorShutdown()
            } else if ("" !== d && void 0 !== d) {
                if (void 0 !== e)
                    return e(Wood.Error.Result.ERROR_NOT_PROCESSED);
                if (b.handler)
                    return b.handler.call()
            } else
                Wood.log("[ERROR] error message is not defined."),
                this.showError(Wood.ErrorCode.CLOSE_APPLICATION),
                this.isWiiU() && this.errorShutdown()
        },
        _showInvalidSessionError: function(a, b, c) {
            c = $("#dialog_msg_invalid_session").text();
            "" !== c ? this.showError(a + b, c) : this.showError(Wood.ErrorCode.RETRIABLE)
        },
        showErrorDialog: function(a, b, c, d) {
            Wood.log("[showErrorDialog] prefix=" + a + ", code=" + b + ", msg=" + c);
            a = Wood.Util.isDefined(a) ? a : Wood.SystemConfig.PREFIX_OTHER;
            Wood.Util.isDefined(b) && 7 === b.length && (a = "");
            var e = Wood.Error.dispatch(b);
            if (e)
                return this._showDefinedError(a, e, b, c, d);
            Wood.log("[ERROR] error code is not defined.(error code not display)");
            "3010" === b ? this._showInvalidSessionError(a, b, c) : "" !== b && void 0 !== b && "" !== c && void 0 !== c ? this.showError(a + b, c) : "" !== b && void 0 !== b && a !== Wood.SystemConfig.PREFIX_SAMURAI && a !== Wood.SystemConfig.PREFIX_NINJA ? this.showError(a + b) : this.showError(Wood.ErrorCode.CLOSE_APPLICATION);
            this.isWiiU() ? this.errorShutdown() : "3010" !== b && this.redirectToTop()
        },
        showError: function() {
            this.hideLoadingDialog();
            Wood.ErrorViewer.show.apply(null, arguments)
        },
        shutdownIfError: function(a) {
            if (void 0 !== a && this.isWiiU() && a.error) {
                var b = a.error.code;
                _.contains([1114701, 1114702], b) || (this.enableHomeButton(),
                this.enableUserOperation(),
                this.showError(a.error.code),
                _.contains([1050606, 1114640, 1114550, 1114641, 1114693], b) || (_.contains([1114692], b) ? this.historyBack() : this.errorShutdown()))
            }
        }
    }
}
)();
(function() {
    Wood.Modules.Client.PurchaseInfo = function() {}
    ;
    Wood.Modules.Client.PurchaseInfo.prototype = {
        setRedeemableCard: function(a) {
            this.getSessionStorage().setItem(Wood.Client.StorageKey.TEMP_REDEEMABLE_CARD, a.toJSON())
        },
        getRedeemableCard: function() {
            var a = this.getSessionStorage().getItem(Wood.Client.StorageKey.TEMP_REDEEMABLE_CARD);
            if (Wood.Util.isUndefined(a))
                return null;
            var b = new Wood.Model.RedeemableCard;
            b.set(JSON.parse(a));
            return b
        },
        clearRedeemableCard: function() {
            this.getSessionStorage().removeItem(Wood.Client.StorageKey.TEMP_REDEEMABLE_CARD)
        },
        setRedeemNumber: function(a, b) {
            var c = this.getSessionStorage();
            c.setItem(Wood.Client.StorageKey.REDEEM_TITLE_ID, a);
            c.setItem(Wood.Client.StorageKey.REDEEM_NUMBER, b)
        },
        initCardInfo: function() {
            var a = this.getSessionStorage();
            _.each("addbal_cc addbal_cc_str ccard_registration cc_pass cc_type postal_code request_id application_id credit_card_update".split(" "), function(b) {
                a.removeItem(b)
            })
        },
        initPurchaseInfo: function() {
            var a = this.getSessionStorage()
              , b = "aoc_name_ aoc_size_unit_ aoc_size_str_ aoc_free_flg_ aoc!_price_ aoc_price_str_ aoc_tax_str_ aoc_taxin_price_str_ aoc_redl_flg_ _nsig_aoc_taxin_price_".split(" ");
            _.each("buying_title_id buying_type buying_section buying_coupon_instance_code buying_aoc buying_ticket buying_shortfall get_common_info get_title_info get_aoc_info get_ticket_info get_demo_info buying_seq_rating buying_seq_attention buying_seq_size buying_seq_balance buying_seq_purchase money_referrer addr_referrer title_name title_icon rating_flg rating_age rating_sys notes_flg title_size_unit title_size_str title_dl_media title_display_size_str title_release_date title_pre_order_flg title_in_app_purchase titile_owned_coupon_flg title_lowest_price title_display_size_unit title_free_flg size_over_flg title_dl_items title_redl_flg current_balance current_balance_str post_balance post_balance_str title_price_str title_discount_price_id title_regular_price_id title_tax title_tax_str title_taxin_price title_taxin_price_str pin_code_checked_money withdrawal_agreed auto_billing_contract_id auto_billing_title_id coupon_code".split(" "), function(b) {
                a.removeItem(b)
            });
            if (null !== a.getItem("aoc_id_list")) {
                var c = a.getItem("aoc_id_list").split(",");
                _.each(c, function(c) {
                    _.each(b, function(b) {
                        a.removeItem(b + c)
                    })
                })
            }
            _.each("aoc_id_list aocs_free_flg aocs_dl_media aocs_total_size aocs_total_size_str aocs_total_size_unit aocs_price_str aocs_price_id aocs_tax aocs_tax_str aocs_taxin_price aocs_taxin_price_str aoc_dl_items aoc_same_variation_items aoc_update_flg aocs_all_redl_flg buying_aoc_id_list ticket_id ticket_name ticket_free_flg ticket_price_str ticket_price_id ticket_discount_price_id ticket_discount_price_id ticket_tax ticket_tax_str ticket_taxin_price ticket_taxin_price_str demo_id demo_name demo_icon demo_dl_items size_over_flg demo_dl_media demo_size_str demo_size_unit demo_display_size_str demo_display_size_unit aocs_discount_id".split(" "), function(b) {
                a.removeItem(b)
            })
        }
    }
}
)();
(function() {
    Wood.Modules.Client.Boot = function() {
        this.need_flush_fs = this.is_in_boot = !1
    }
    ;
    Wood.Modules.Client.Boot.prototype = {
        endStartUp: function() {
            Wood.log("(wood.client) endStartUp(false)");
            this.isWiiU() && wiiuBrowser.endStartUp && wiiuBrowser.endStartUp(!1)
        },
        endStartUpWithBGM: function() {
            Wood.log("(wood.client) endStartUp(true)");
            this.isWiiU() && wiiuBrowser.endStartUp && wiiuBrowser.endStartUp(!0)
        },
        isInBoot: function() {
            return this.is_in_boot
        },
        setInBoot: function() {
            this.is_in_boot = !0
        },
        finishBoot: function() {
            this.is_in_boot = !1
        },
        setFSFlushRequired: function() {
            this.need_flush_fs = !0
        },
        cancelFSFlush: function() {
            this.need_flush_fs = !1
        },
        isFSFlushRequired: function() {
            return this.need_flush_fs
        },
        setNinjaSession: function(a) {
            this.getSessionStorage().setItem(Wood.Client.StorageKey.NINJA_SESSION, a.toJSON())
        },
        getNinjaSession: function() {
            var a = this.getSessionStorage().getItem(Wood.Client.StorageKey.NINJA_SESSION);
            if (!a)
                return null;
            var b = new Wood.Model.NinjaSession;
            b.loadJSON(a);
            return b
        },
        canSetEShopInitialized: function() {
            return this.isWiiU() && wiiuSystemSetting.setEShopInitialized
        },
        setEShopInitialized: function(a) {
            a = wiiuSystemSetting.setEShopInitialized(a);
            this.shutdownIfError(a)
        },
        isFirstBoot: function() {
            if (this.isWiiU() && wiiuSystemSetting.getEShopInitialized) {
                var a = wiiuSystemSetting.getEShopInitialized();
                this.shutdownIfError(a);
                if (a.initialized)
                    return Wood.log("(wood.client) isFirstBoot: res.initialized"),
                    !1
            }
            (a = "true" === this.getLocalStorage().getItem(Wood.Client.StorageKey.FIRST_BOOT)) && this.canSetEShopInitialized() && this.setEShopInitialized(!0);
            return !a
        },
        finishFirstBoot: function() {
            this.canSetEShopInitialized() ? this.setEShopInitialized(!0) : (this.getLocalStorage().setItem(Wood.Client.StorageKey.FIRST_BOOT, "true"),
            this.writeLocalStorage())
        },
        updateParentalControls: function() {
            var a = this.getNinjaSession().getParentalControl()
              , b = {};
            _.each(a, function(a) {
                "WUP" === a.device && (b[a.type] = a.value)
            });
            if (this.isWiiU()) {
                a = this.getParentalControlForGamePlay();
                var c = this.getParentalControlForEShop();
                "AU" !== this.country && "NZ" !== this.country || "13" !== a.age || (a.age = "14")
            } else
                a = {
                    isLocked: !1,
                    age: "18"
                },
                c = !0;
            a.age = parseInt(a.age, 10);
            b && b.game_rating_age === a.age && !!b.game_rating_lock === a.isLocked && !!b.shopping === c || (new Wood.Model.ParentalControlPut({
                game_rating_lock: a.isLocked ? 1 : 0,
                game_rating_age: a.age,
                shopping: c ? 1 : 0
            })).fetch()
        },
        redirectToStartPage: function(a) {
            a = Wood.StartPageDispatcher.dispatch(a);
            this.endStartUp();
            this.redirectReplaceTo(a)
        },
        redirectToInitialSequence: function(a) {
            var b = new Wood.URL("initial_sequence.html",{
                country: this.country,
                language: this.language
            })
              , c = $.url().param();
            _.each(c, function(a, c) {
                b.setQueryString(c, a)
            });
            a.isShopAccountInitialized() && b.setQueryString("shop_ac_init", 1);
            this.isFirstBoot() || b.setQueryString("lang_select_only", 1);
            this.redirectReplaceTo(b.toString())
        }
    }
}
)();
(function() {
    Wood.Modules.Client.AOC = function() {
        this.data_titles = {};
        this.installed_items = {};
        this.owned_contents_cache = {}
    }
    ;
    Wood.Modules.Client.AOC.prototype = {
        getAocPurchaseStatus: function(a, b, c) {
            var d = Wood.PurchaseStatus.STATUS
              , e = b.getContentIndexes();
            if (c.isOnSale()) {
                var f = this.getOwnedContents(a).getContentsByVariation(b.getVariation());
                f = _.chain(f).map(function(a) {
                    return a.content_indexes.content_index
                }).flatten().uniq().value();
                f = _.filter(f, function(a) {
                    return _.contains(e, a)
                }).length;
                a = f === e.length ? this.hasDataTitle(a, b) ? d.PURCHASED : d.REDOWNLOADABLE : 0 < f ? b.allowedOverlap() ? c.isFree() ? d.DOWNLOADABLE : d.OK : d.DUPLICATED : c.isFree() ? d.DOWNLOADABLE : d.OK
            } else
                a = d.INVALID;
            return new Wood.PurchaseStatus(a)
        },
        hasDataTitle: function(a, b) {
            var c = this
              , d = b.getContentIndexes();
            a = this.getDataTitleVersions(a).getVersions();
            var e = [];
            _.each(a, function(a) {
                a = c.getAocInstalledItem(a.title_id);
                a.variation === b.getVariation() && e.push(a.content_index)
            });
            e = _.chain(e).flatten().uniq().value();
            return _.filter(e, function(a) {
                return _.contains(d, parseInt(a, 10))
            }).length === d.length
        },
        getOwnedContents: function(a) {
            var b = this.owned_contents_cache[a];
            b ? a = b : (a = new Wood.Model.OwnedContents({
                title_id: a
            }),
            a.fetch({
                async: !1
            }));
            return a
        },
        setOwnedContents: function(a, b) {
            this.owned_contents_cache[b] = a
        },
        getDataTitleVersions: function(a) {
            var b = this.data_titles[a];
            b || (b = new Wood.Model.DataTitleVersionList({
                country: this.country,
                language: this.language,
                aoc_ns_uid: a
            }),
            b.fetch(),
            this.data_titles[a] = b);
            return b
        },
        setDataTitleVersions: function(a, b) {
            this.data_titles[b] = a
        },
        getAocInstalledItem: function(a) {
            var b = {};
            if (this.isWiiU()) {
                var c = this.installed_items[a];
                if (c)
                    b = c;
                else {
                    c = wiiuDevice.getAocContentIndexList(a);
                    this.shutdownIfError(c);
                    var d = a.slice(-2);
                    b.title_id = a;
                    b.variation = d;
                    b.content_index = c.indexes;
                    this.installed_items[a] = b
                }
            }
            return b
        }
    }
}
)();
(function() {
    Wood.Modules.Client.EC = function() {}
    ;
    var a = {
        downloadMedia: "USB",
        installSize: "65535",
        storageSize: "9493802"
    };
    Wood.Modules.Client.EC.prototype = {
        getTitleInstallInfo: function(b) {
            return this.isWiiU() ? (b = wiiuEC.getTitleInstallInfo(b.getId(), b.getVersion().toString()),
            this.shutdownIfError(b),
            b) : a
        }
    }
}
)();
(function() {
    var a = {
        NONE: 0,
        CANCEL_PROHIBIT: 1,
        NETWORK_ERROR: 2,
        UNDER_MAINTENANCE_ERROR: 3,
        DEVICE_POLLING_START: 10,
        DEVICE_DETECT_CARD: 11,
        DEVICE_TOUCH_AGAIN: 12,
        DEVICE_TOUCH_DIFF_CARD: 13,
        PAYMENT_RESPONSE: 20,
        BALANCE_INQUIRY_RESPONSE: 21,
        RESULT_CHECK_RESPONSE: 22,
        HISTORY_INQUIRY_RESPONSE: 23
    }
      , b = _.invert(a);
    Wood.Modules.Client.Nfc = function() {
        this.nfc = _.extend({}, Backbone.Events)
    }
    ;
    Wood.Modules.Client.Nfc.prototype = {
        startNfcPolling: function(a, b) {
            Wood.log("wood.client#startNfcPolling request_type:" + a + ", request_info:" + b);
            var c = null;
            this.isWiiU() && (c = wiiuNfc.startPolling(a, b),
            this.shutdownIfError(c),
            this.watchProcess());
            return c
        },
        startPayment: function(a) {
            return this.startNfcPolling(1, a)
        },
        startBalanceInquiry: function(a) {
            return this.startNfcPolling(3, a)
        },
        startHistoryInquiry: function(a) {
            return this.startNfcPolling(5, a)
        },
        startResultCheck: function(a) {
            return this.startNfcPolling(9, a)
        },
        cancelNfc: function() {
            Wood.log("wood.client#cancelNfc");
            return this.isWiiU() ? wiiuNfc.cancel() : !0
        },
        watchProcess: function() {
            var b = this
              , d = function() {
                var c = 50
                  , f = wiiuNfc.getMessage();
                switch (f) {
                case a.DEVICE_POLLING_START:
                case a.DEVICE_DETECT_CARD:
                case a.DEVICE_TOUCH_DIFF_CARD:
                case a.CANCEL_PROHIBIT:
                    b.nfcTrigger(f);
                    break;
                case a.DEVICE_TOUCH_AGAIN:
                    c = 1500;
                    b.nfcTrigger(f);
                    break;
                case a.PAYMENT_RESPONSE:
                case a.BALANCE_INQUIRY_RESPONSE:
                case a.RESULT_CHECK_RESPONSE:
                case a.HISTORY_INQUIRY_RESPONSE:
                    c = wiiuNfc.getResponse(f);
                    b.nfcTrigger(f, c);
                    return;
                case a.UNDER_MAINTENANCE_ERROR:
                case a.NETWORK_ERROR:
                    b.nfcTrigger(f);
                    return
                }
                _.delay(d, c)
            };
            d()
        },
        nfcTrigger: function(a, d) {
            a = "update:" + b[a];
            Wood.log(a);
            Wood.log(d ? JSON.stringify(d, null, "    ") : "");
            this.nfc.trigger(a, d)
        },
        stopNfcSound: function() {
            Wood.log("wood.client#stopNfcSound");
            this.isWiiU() && wiiuSound.stopNfcSound(2)
        }
    }
}
)();
(function() {
    Wood.Modules.Client.NNA = function() {}
    ;
    Wood.Modules.Client.NNA.prototype = {
        isMailAddressValidated: function() {
            return this.isWiiU() ? wiiuNNA.isMailAddressValidated() : "true" === this.getLocalStorage().getItem("_isMailAddressValidated")
        }
    }
}
)();
(function() {
    Wood.Modules.Client.UI = function() {
        this.user_operation_enabled = this.power_button_enabled = this.home_button_enabled = !0
    }
    ;
    Wood.Modules.Client.UI.prototype = {
        enableHomeButton: function(a) {
            Wood.log("(wood.client) enableHomeButton");
            !this.isWiiU() || !a && this.home_button_enabled || (wiiuBrowser.lockHomeButtonMenu(!1),
            this.home_button_enabled = !0)
        },
        disableHomeButton: function(a) {
            Wood.log("(wood.client) disableHomeButton");
            this.isWiiU() && (a || this.home_button_enabled) && (wiiuBrowser.lockHomeButtonMenu(!0),
            this.home_button_enabled = !1)
        },
        enablePowerButton: function(a) {
            Wood.log("(wood.client) enablePowerButton");
            !this.isWiiU() || !a && this.power_button_enabled || (wiiuBrowser.lockPowerButton(!1),
            this.power_button_enabled = !0)
        },
        disablePowerButton: function(a) {
            Wood.log("(wood.client) disablePowerButton");
            this.isWiiU() && (a || this.power_button_enabled) && (wiiuBrowser.lockPowerButton(!0),
            this.power_button_enabled = !1)
        },
        enableUserOperation: function(a) {
            Wood.log("(wood.client) enableUserOperation");
            !this.isWiiU() || !a && this.user_operation_enabled || (wiiuBrowser.lockUserOperation(!1),
            this.user_operation_enabled = !0)
        },
        disableUserOperation: function(a) {
            Wood.log("(wood.client) disableUserOperation");
            this.isWiiU() && (a || this.user_operation_enabled) && (wiiuBrowser.lockUserOperation(!0),
            this.user_operation_enabled = !1)
        },
        showLoadingIcon: function() {
            this.isWiiU() && wiiuBrowser.showLoadingIcon(!0)
        },
        hideLoadingIcon: function() {
            this.isWiiU() && wiiuBrowser.showLoadingIcon(!1)
        },
        prohibitLoadingIcon: function() {
            this.isWiiU() && wiiuBrowser.prohibitLoadingIcon(!0)
        },
        allowLoadingIcon: function() {
            this.isWiiU() && wiiuBrowser.prohibitLoadingIcon(!1)
        },
        showLoadingDialog: function(a) {
            this.isWiiU() && this.isDefinedShowLoadingDialog() && wiiuDialog.showLoading(a)
        },
        hideLoadingDialog: function() {
            this.isWiiU() && this.isDefinedHideLoadingDialog() && wiiuDialog.hideLoading()
        },
        isDefinedShowLoadingDialog: function() {
            return "undefined" !== typeof wiiuDialog && _.isFunction(wiiuDialog.showLoading)
        },
        isDefinedHideLoadingDialog: function() {
            return "undefined" !== typeof wiiuDialog && _.isFunction(wiiuDialog.hideLoading)
        },
        curtainClose: function() {
            this.isWiiU() && "undefined" !== typeof wiiuCurtain && wiiuCurtain.close()
        },
        alert: function(a, b) {
            this.hideLoadingDialog();
            this.isWiiU() ? Wood.Util.isDefined(b) ? wiiuDialog.alert(a, b) : wiiuDialog.alert(a, "OK") : (Wood.Util.isDefined(b) && (a = a + "\n\nButton: " + b),
            window.alert(a))
        },
        confirm: function(a, b, c) {
            this.hideLoadingDialog();
            if (this.isWiiU())
                return Wood.Util.isDefined(b) && Wood.Util.isDefined(c) ? wiiuDialog.confirm(a, b, c) : wiiuDialog.confirm(a, "Cancel", "OK");
            Wood.Util.isDefined(b) && Wood.Util.isDefined(c) && (a = a + "\n\nLeft Button: " + b);
            return window.confirm(a)
        }
    }
}
)();
(function() {
    Wood.Modules.Client.RegionalInfo = function() {}
    ;
    Wood.Modules.Client.RegionalInfo.prototype = {
        hasCountryInfo: function() {
            var a = this.getSessionStorage();
            return "max_cash_str max_cash loyalty_system_available prepaid_card_available credit_card_available nfc_available coupon_available my_coupon_available legal_payment_message_required legal_business_message_required time_based_restrictions tax_excluded_country".split(" ").some(function(b) {
                return Wood.Util.isDefined(a.getItem(b))
            })
        },
        isLoyaltySystemAvailable: function() {
            var a = this.getSessionStorage().getItem("loyalty_system_available");
            return a && "true" === a
        },
        isInquiryAvailable: function() {
            return !_.contains(["EUR", "AUS"], this.getRegion())
        },
        isAddressAvailable: function() {
            return _.contains(["US", "CA"], this.country)
        },
        storeCountryInfo: function(a) {
            if (!this.hasCountryInfo()) {
                a ? Wood.log("<storeCountryInfo> country cache found") : (Wood.log("<storeCountryInfo> country cache not found"),
                a = new Wood.Model.CountryInfo({
                    country: this.country,
                    language: this.language
                }),
                a.fetch());
                var b = this.getSessionStorage()
                  , c = a.getMaxCacheSpec();
                b.setItem("max_cash_str", c.amount.toString());
                b.setItem("max_cash", c.raw_value.toString());
                b.setItem("loyalty_system_available", a.isLoyaltySystemAvailable().toString());
                b.setItem("prepaid_card_available", a.isPrepaiedCardAvailable().toString());
                b.setItem("credit_card_available", a.isCreditCardAvailable().toString());
                b.setItem("nfc_available", a.isNfcAvailable().toString());
                b.setItem("coupon_available", a.isCouponAvailable().toString());
                b.setItem("my_coupon_available", a.isMyCouponAvailable().toString());
                b.setItem("legal_payment_message_required", a.isLegalPaymentMessageRequired().toString());
                b.setItem("legal_business_message_required", a.isLegalBusinessMessageRequired().toString());
                b.setItem("tax_excluded_country", a.isTaxExcluded().toString());
                b.setItem("time_based_restrictions", JSON.stringify(a.getTimeBasedRestrictions()))
            }
        },
        isLegalPaymentMessageRequired: function() {
            return "true" === this.getSessionStorage().getItem("legal_payment_message_required")
        },
        isLegalBusinessMessageRequired: function() {
            return "true" === this.getSessionStorage().getItem("legal_business_message_required")
        },
        isTaxIncludedMessageRequired: function() {
            var a = ["NZ", "RU", "TR"];
            return "false" === this.getSessionStorage().getItem("tax_excluded_country") && !_.contains(a, this.country) && "JP" !== this.country
        },
        isNfcAvailable: function() {
            return "true" === this.getSessionStorage().getItem("nfc_available")
        },
        isCouponAvailable: function() {
            return "true" === this.getSessionStorage().getItem("coupon_available")
        },
        isMyCouponAvailable: function() {
            return "true" === this.getSessionStorage().getItem("my_coupon_available")
        }
    }
}
)();
(function() {
    function a(a, c) {
        this.client = a;
        this.storage_key = c
    }
    Wood.Modules.Client.Read = function() {}
    ;
    Wood.Modules.Client.Read.prototype = {
        createReadStore: function(b) {
            return new a(this,b)
        }
    };
    a.prototype = {
        read: function(a) {
            var b = this.getReadItems();
            a = _.union(b, a);
            _.isEqual(b, a) || (this.client.getLocalStorage().setItem(this.storage_key, a.join(",")),
            this.client.writeLocalStorage())
        },
        isRead: function(a) {
            return -1 !== this.getReadItems().indexOf(a)
        },
        getReadItems: function() {
            var a = this.client.getLocalStorage().getItem(this.storage_key);
            return Wood.Util.isDefined(a) ? _.map(a.split(","), function(a) {
                return a.toString()
            }) : []
        },
        hasUnReadItems: function(a) {
            var b = this.getReadItems();
            return !_.every(_.map(a, function(a) {
                return _.contains(b, a)
            }))
        }
    }
}
)();
(function() {
    Wood.Modules.Client.News = function() {
        this.newsReadStore = this.createReadStore("news")
    }
    ;
    Wood.Modules.Client.News.prototype = {
        readNews: function(a) {
            this.newsReadStore.read(a)
        },
        isNewsRead: function(a) {
            return this.newsReadStore.isRead(a)
        },
        getReadNews: function() {
            return this.newsReadStore.getReadItems()
        },
        hasUnReadNews: function(a) {
            a = _.map(a, function(a) {
                return a.id.toString()
            });
            return this.newsReadStore.hasUnReadItems(a)
        }
    }
}
)();
(function() {
    Wood.Modules.Client.OwnedCoupon = function() {
        this.ownedCouponReadStore = this.createReadStore("read_owned_coupon")
    }
    ;
    Wood.Modules.Client.OwnedCoupon.prototype = {
        readOwnedCoupon: function(a) {
            this.ownedCouponReadStore.read(a);
            a = this.getSessionStorage().getItem("cache_owned_coupon") || "";
            this.storeUnreadOwnedCoupon(a.split(","))
        },
        isOwnedCouponRead: function(a) {
            return this.ownedCouponReadStore.isRead(a)
        },
        getReadOwnedCoupon: function() {
            return this.ownedCouponReadStore.getReadItems()
        },
        storeOwnedCoupon: function(a) {
            this.getSessionStorage().setItem("cache_owned_coupon", a.join(","))
        },
        storeUnreadOwnedCoupon: function(a) {
            a = this.ownedCouponReadStore.hasUnReadItems(a);
            this.getSessionStorage().setItem("has_unread_owned_coupon", a + "")
        },
        hasUnReadOwnedCoupon: function() {
            return "true" === this.getSessionStorage().getItem("has_unread_owned_coupon")
        }
    }
}
)();
(function() {
    Wood.Modules.Client.ParentalControl = function() {}
    ;
    Wood.Modules.Client.ParentalControl.prototype = {
        getParentalControlForEShop: function() {
            if (this.isWiiU()) {
                var a = wiiuSystemSetting.getParentalControlForEShop();
                this.shutdownIfError(a);
                return a.isLocked
            }
            return !0
        },
        getParentalControlForGamePlay: function() {
            if (this.isWiiU()) {
                var a = wiiuSystemSetting.getParentalControlForGamePlay();
                this.shutdownIfError(a);
                return a
            }
            return {
                isLocked: !0,
                age: "18"
            }
        },
        isPincodeCheckedForEshop: function() {
            return "true" === this.getSessionStorage().getItem("pin_code_checked_for_eshop")
        },
        isPincodeChecked: function() {
            return "true" === this.getSessionStorage().getItem("pin_code_checked")
        },
        getAge: function() {
            return parseInt(this.getSessionStorage().getItem("age"), 10)
        },
        isLockedForEShop: function() {
            var a = this.getParentalControlForEShop();
            return this.isPincodeCheckedForEshop() ? !1 : a
        },
        isLockedForGamePlay: function(a) {
            if (Wood.Util.isUndefined(a))
                return !1;
            var b = this.getParentalControlForGamePlay()
              , c = b.isLocked;
            b = parseInt(b.age, 10);
            "AU" !== this.country && "NZ" !== this.country || 13 !== b || (b = 14);
            parseInt(a, 10) <= b && (c = !1);
            return this.isPincodeChecked() ? !1 : c
        },
        isRequiredNfcUnderCheck: function() {
            var a = "JP" === this.country
              , b = 18 <= this.getAge();
            return a && !b
        }
    }
}
)();
(function() {
    Wood.Modules.Client.Storage = function() {
        this.ls = Wood.LocalStorage.build(this.isWiiU() ? wiiuLocalStorage : window.localStorage);
        this.ss = Wood.SessionStorage.build(this.isWiiU() ? wiiuSessionStorage : window.sessionStorage)
    }
    ;
    Wood.Modules.Client.Storage.prototype = {
        getSessionStorage: function() {
            return Wood.SessionStorage.getRawInstance()
        },
        getLocalStorage: function() {
            return Wood.LocalStorage.getRawInstance()
        },
        writeLocalStorage: function(a) {
            !a && this.isInBoot() ? (Wood.log("writeLocalStorage in Boot, delayed"),
            this.setFSFlushRequired()) : this.isWiiU() && (Wood.log("writeLocalStorage performed"),
            this.criticalAction(function() {
                this.getLocalStorage().write();
                this.cancelFSFlush()
            }))
        }
    }
}
)();
(function() {
    Wood.Modules.Client.UserData = function() {}
    ;
    Wood.Modules.Client.UserData.prototype = {
        getDeviceOrderList: function() {
            var a = this.getLocalStorage()
              , b = a.getItem(Wood.Client.StorageKey.DEVICE_ORDER_LIST);
            a = a.getItem(Wood.Client.StorageKey.DEVICE_ORDER_LIST_RVC);
            if (Wood.Util.isDefined(b) && Wood.Util.isDefined(a))
                var c = new Wood.Model.DeviceOrderList({
                    title_ids: b,
                    rvc_title_ids: a
                });
            else
                c = new Wood.Model.DeviceOrderList,
                c.fetch({
                    async: !1,
                    success: function() {
                        wood.client.updateDeviceOrderList(c);
                        Wood.log("getDeviceOrderList: DeviceOrderList updated")
                    }
                });
            return c
        },
        getDeviceOrderListModified: function() {
            return this.getLocalStorage().getItem(Wood.Client.StorageKey.DEVICE_ORDER_LIST_MODIFIED)
        },
        updateDeviceOrderList: function(a) {
            var b = this.getLocalStorage();
            b.setItem(Wood.Client.StorageKey.DEVICE_ORDER_LIST, a.getTitleIdString());
            b.setItem(Wood.Client.StorageKey.DEVICE_ORDER_LIST_RVC, a.getRVCTitleIdString());
            b.setItem(Wood.Client.StorageKey.DEVICE_ORDER_LIST_MODIFIED, (new Date).getTime().toString());
            this.writeLocalStorage()
        },
        storeBalance: function() {
            var a = this.getSessionStorage()
              , b = a.getItem(Wood.Client.StorageKey.BALANCE_AMOUNT)
              , c = a.getItem(Wood.Client.StorageKey.BALANCE_RAW);
            if (Wood.Util.isDefined(b) || Wood.Util.isDefined(c))
                return !1;
            b = new Wood.Model.Balance({
                country: this.country,
                language: this.language
            });
            b.fetch({
                async: !1
            });
            if (!b.getAmount())
                return Wood.log("balance_info is empty. server error?"),
                !1;
            c = b.getAmount();
            "MX" === this.country && (c = c.replace("MX$", "MX$ "));
            a.setItem(Wood.Client.StorageKey.BALANCE_AMOUNT, c);
            a.setItem(Wood.Client.StorageKey.BALANCE_RAW, b.getRawValue());
            return !0
        },
        getBalanceAmount: function() {
            return this.getSessionStorage().getItem(Wood.Client.StorageKey.BALANCE_AMOUNT)
        }
    }
}
)();
(function() {
    Wood.Modules.Client.SystemSetting = function() {
        this.resourceKey = this.region = this.language = this.country = null
    }
    ;
    Wood.Modules.Client.SystemSetting.prototype = {
        verifyIVSSent: function() {
            var a = this.getUserAgent();
            if (this.isWiiU() && !a.isLatestVersionOrLater())
                Wood.log("[ERROR] not latest version of wood:" + a.getWoodVersion());
            else {
                a = this.getSessionStorage();
                var b = a.getItem(Wood.Client.StorageKey.IVS_SENT);
                if (Wood.Util.isDefined(b))
                    return Wood.log("verifyIVSSent: IVS OK (sessionStorage cache)"),
                    !0;
                if (Wood.isWiiU) {
                    b = wiiuEC.getSendIvsState();
                    if (b.status && "success" === b.status)
                        return Wood.log("verifyIVSSent: IVS status success"),
                        a.setItem(Wood.Client.StorageKey.IVS_SENT, "1"),
                        !0;
                    if ((a = b.error) && a.code)
                        if (Wood.log("verifyIVSSent: IVS error:" + a.message),
                        this.isWiiU())
                            this.showError(a.code, a.message),
                            this.errorShutdown();
                        else
                            return !1;
                    Wood.log("verifyIVSSent: maybe sending. " + b.status)
                }
            }
        },
        loadSystemSetting: function() {
            if (this.isWiiU()) {
                this.language = this.getLocalStorage().getItem("lang");
                var a = wiiuSystemSetting.getCountry();
                this.shutdownIfError(a);
                this.country = a.code
            } else
                a = this.getLocalStorage().getItem("lang"),
                Wood.Util.isUndefined(a) ? this.language = "ja" : this.language = a,
                a = this.getSessionStorage().getItem("country"),
                this.country = null === a || 0 === a.length ? "JP" : a;
            if (this.country && this.language)
                return this.region = this.getRegion(),
                this.resourceKey = this.getResourceKey(),
                this.getSessionStorage().setItem(Wood.Client.StorageKey.RESOURCE_KEY, this.resourceKey),
                !0;
            Wood.log("client has no country, language info.")
        },
        getRegion: function() {
            if ("AU" === this.country || "NZ" === this.country)
                return "AUS";
            if (this.isWiiU()) {
                var a = wiiuSystemSetting.getRegion();
                this.shutdownIfError(a);
                return a.code
            }
            return "JP" === this.country ? "JPN" : "US" === this.country || "CA" === this.country || "MX" === this.country || "BR" === this.country ? "USA" : "EUR"
        },
        getResourceKey: function() {
            if (!this.region)
                throw Error("region not stored yet");
            switch (this.region) {
            case "USA":
                return this.language + "_US";
            case "AUS":
                return "en_AU";
            default:
                return this.language
            }
        },
        saveSystemSetting: function() {
            this.getLocalStorage().setItem(Wood.Client.StorageKey.LANGUAGE, this.language);
            this.writeLocalStorage()
        }
    }
}
)();
(function() {
    Wood.Modules.Client.LocalizedText = function() {
        this.localized_message = null
    }
    ;
    Wood.Modules.Client.LocalizedText.prototype = {
        clearLocalizedText: function() {
            this.getSessionStorage().removeItem(Wood.Client.StorageKey.LOCALIZED_TEXT)
        },
        prepareLocalizedText: function(a) {
            var b = this.getSessionStorage()
              , c = new Wood.Model.LocalizedMessage({
                resource_key: this.getResourceKey()
            })
              , d = b.getItem(Wood.Client.StorageKey.LOCALIZED_TEXT);
            !d || a && a.force ? (c.fetch(),
            b.setItem(Wood.Client.StorageKey.LOCALIZED_TEXT, c.toJSON())) : c.loadJSON(d);
            this.localized_message = c
        },
        getText: function(a) {
            if (!this.localized_message)
                throw Error("localized text not prepared");
            return this.localized_message.getText(a)
        }
    }
}
)();
(function() {
    Wood.Modules.Client.Dictionary = function() {}
    ;
    Wood.Modules.Client.Dictionary.prototype = {
        isDictionarySet: function() {
            var a = this.getSessionStorage().getItem(Wood.Client.StorageKey.DICTIONARY_FLAG);
            return a && "true" === a ? !0 : !1
        },
        setDictionaryFlag: function(a) {
            return this.getSessionStorage().setItem(Wood.Client.StorageKey.DICTIONARY_FLAG, "true")
        }
    }
}
)();
(function() {
    Wood.Modules.Client.Redirector = function() {}
    ;
    Wood.Modules.Client.Redirector.prototype = {
        redirectTo: function(a, b, c) {
            a = b || c ? Wood.URL.create(a, b, c) : a;
            Wood.log("redirect to " + a);
            location.href = a;
            throw Error("wooc.client#redirectTo stopper");
        },
        redirectToTop: function() {
            "#top" === this.getHash() ? (Wood.log("[redirectToTop] already on top"),
            this.enableUserOperation()) : (Wood.log("[redirectToTop] to index.html#top"),
            this.redirectTo("index.html#top"))
        },
        redirectReplaceTo: function(a, b, c) {
            a = b || c ? Wood.URL.create(a, b, c) : a;
            Wood.log("redirect replace to " + a);
            location.replace(a);
            throw Error("wooc.client#redirectReplaceTo stopper");
        }
    }
}
)();
(function() {
    Wood.Modules.Client.Session = function() {}
    ;
    Wood.Modules.Client.Session.prototype = {
        updateUserSession: function(a) {
            var b = this.isWiiU() ? parseInt(wiiuSystemSetting.getUTC().epochMilliSeconds, 10) : (new Date).getTime()
              , c = this.getSessionStorage()
              , d = Number(c.getItem(Wood.Client.StorageKey.SESSION_UPDATED));
            if ((d && 0 !== d ? b - d : b) < Wood.SystemConfig.SESSION_UPDATE_INTERVAL)
                return !1;
            d = !0;
            a && a.hasOwnProperty("async") && (d = a.async);
            (new Wood.Model.Balance({
                country: this.country,
                language: this.language
            })).fetch({
                async: d,
                success: function() {
                    c.setItem(Wood.Client.StorageKey.SESSION_UPDATED, b.toString())
                }
            });
            return !0
        }
    }
}
)();
(function() {
    function a(a) {
        if (a.isWiiU())
            return !0;
        throw Error("this function is WiiU only");
    }
    Wood.Modules.Client.Jumper = function() {}
    ;
    Wood.Modules.Client.Jumper.prototype = {
        shutdown: function(b) {
            a(this);
            if ("1" === this.getSessionStorage().getItem(Wood.Client.StorageKey.FROM_OTHER_APP))
                Wood.log("shutdown: returnToCaller"),
                wiiuBrowser.returnToCaller();
            else {
                if (b && b.back_to_home_menu)
                    return this.jumpToHBM();
                Wood.log("shutdown: closeApplication");
                wiiuBrowser.closeApplication()
            }
        },
        errorShutdown: function() {
            this.shutdown({
                back_to_home_menu: !0
            })
        },
        jumpToHBM: function() {
            Wood.log("shutdown: jumpToHomeButtonMenu");
            wiiuBrowser.jumpToHomeButtonMenu ? wiiuBrowser.jumpToHomeButtonMenu() : wiiuBrowser.closeApplication()
        },
        jumpToUpdate: function() {
            a(this);
            Wood.log("wiiuBrowser.jumpToUpdate()");
            wiiuBrowser.jumpToUpdate()
        }
    }
}
)();
(function() {
    Wood.Client = function() {
        var a = this;
        _.each(Wood.Client.Modules, function(b) {
            b.call(a)
        })
    }
    ;
    Wood.Client.create = function() {
        return new Wood.Client
    }
    ;
    Wood.Client.prototype = {
        isWiiU: function() {
            return Wood.isWiiU
        },
        isDrc: function() {
            return this.isWiiU() ? wiiuDevice.isDrc() : !0
        },
        tryWiiU: function(a) {
            return this.isWiiU() ? a.call() : !1
        },
        getAB: function() {
            return this.isWiiU() ? ["A", "B"][wiiuNNA.principalId % 2] : ""
        },
        getHash: function() {
            return location.hash
        },
        debug_print: Wood.log,
        historyBack: function() {
            if (!this.isWiiU())
                throw history.back(),
                Error("wooc.client#historyBack stopper");
            wiiuBrowser.canHistoryBack() ? history.back() : this.redirectToTop();
            throw Error("wooc.client#historyBack stopper");
        },
        getUserAgent: function(a) {
            return new Wood.UserAgent(a)
        },
        criticalAction: function(a) {
            if (!this.isWiiU())
                return a.apply(this);
            wiiuBrowser.lockHomeButtonMenu(!0);
            wiiuBrowser.lockPowerButton(!0);
            a.apply(this);
            wiiuBrowser.lockHomeButtonMenu(!1);
            wiiuBrowser.lockPowerButton(!1)
        },
        playSound: function(a, c) {
            this.isWiiU() ? (c = c || Wood.Client.SoundDevice.DRC,
            wiiuSound.playSoundByName(a, c)) : Wood.log("(wood.client) playSound: " + a)
        }
    };
    Wood.Client.StorageKey = {
        SESSION_UPDATED: "keep_alive_modified",
        IVS_SENT: "ivs_sent",
        BALANCE_AMOUNT: "balance",
        BALANCE_RAW: "balance_raw",
        DEVICE_ORDER_LIST: "device_order_list",
        DEVICE_ORDER_LIST_RVC: "device_order_list_rvc",
        DEVICE_ORDER_LIST_MODIFIED: "device_order_list_modified",
        DICTIONARY_FLAG: "dictionary_flg",
        TEMP_REDEEMABLE_CARD: "temp_redeemable_card",
        LOCALIZED_TEXT: "localized_text",
        RESOURCE_KEY: "resource_key",
        REDEEM_TITLE_ID: "redeem_title_id",
        REDEEM_NUMBER: "redeem_num",
        NINJA_SESSION: "ninja_session",
        FIRST_BOOT: "first_boot",
        LANGUAGE: "lang",
        FROM_OTHER_APP: "from_other_app",
        VOTABLE_LIST: "votable_list",
        VOTABLE_DATA: "votable_data",
        AOC_EDITING: "aoc_editing"
    };
    Wood.Client.SoundDevice = {
        DRC: 1,
        TV: 2,
        BOTH: 3
    };
    var a = Wood.Modules.Client;
    Wood.Client.Modules = [a.ErrorHandler, a.PurchaseInfo, a.Boot, a.AOC, a.EC, a.Nfc, a.NNA, a.UI, a.RegionalInfo, a.Read, a.News, a.OwnedCoupon, a.ParentalControl, a.Storage, a.UserData, a.SystemSetting, a.LocalizedText, a.Dictionary, a.Redirector, a.Session, a.Jumper];
    _.each(Wood.Client.Modules, function(a) {
        _.extend(Wood.Client.prototype, a.prototype)
    })
}
)();
(function() {
    var a;
    Wood.ModelStore = function() {
        this.pool = [];
        this.size = 10
    }
    ;
    Wood.ModelStore.getInstance = function() {
        return a = a || new Wood.ModelStore
    }
    ;
    Wood.ModelStore.prototype = {
        add: function(a, c) {
            this.pool.push({
                key: a,
                attr: c
            });
            this.shift()
        },
        get: function(a) {
            var b = function(b) {
                return b.key === a
            }
              , d = _.find(this.pool, b)
              , e = null;
            _.isObject(d) && (e = d.attr,
            this.pool = _.reject(this.pool, b),
            this.pool.push(d),
            this.shift());
            return e
        },
        shift: function() {
            if (this.pool.length > this.size)
                return this.pool.shift()
        }
    }
}
)();
(function() {
    Wood.PurchaseStatus = function(a) {
        this.status = a
    }
    ;
    var a = Wood.PurchaseStatus.STATUS = {
        PURCHASED: 1,
        REDOWNLOADABLE: 2,
        DUPLICATED: 3,
        OK: 4,
        INVALID: 5,
        DOWNLOADABLE: 6
    };
    Wood.PurchaseStatus.prototype = {
        getText: function() {
            switch (this.status) {
            case a.PURCHASED:
                return $("#str_purchased").html();
            case a.REDOWNLOADABLE:
                return $("#str_reDL").html();
            case a.DUPLICATED:
                return $("#str_nobuy_d").html();
            case a.OK:
                return $("#str_buy").html();
            case a.INVALID:
                return $("#str_undefined").html();
            case a.DOWNLOADABLE:
                return $("#str_DL").html()
            }
        },
        isOkOrDownloadable: function() {
            return _.contains([a.OK, a.DOWNLOADABLE, a.REDOWNLOADABLE], this.status)
        },
        isPurchased: function() {
            return this.status === a.PURCHASED
        },
        isDuplicated: function() {
            return this.status === a.DUPLICATED
        },
        isOk: function() {
            return this.status === a.OK
        },
        isInvalid: function() {
            return this.status === a.INVALID
        },
        isDownloadable: function() {
            return this.status === a.DOWNLOADABLE
        }
    }
}
)();
(function() {
    var a = ["title", "movie", "both"]
      , b = {
        "0005000010185100": "0005000010101F00",
        "0005000010185200": "0005000010101C00",
        "0005000010185300": "000500001012BC00",
        "0005000010185400": "0005000010143400",
        "0005000010185500": "0005000010112D00",
        "0005000010185600": "0005000010116300"
    };
    Wood.StartPageDispatcher = {
        alertNoData: function() {
            wood.client.endStartUp();
            wood.client.alert($("#dialog_msg_nodata").text(), wood.client.getText("common01_01_006"))
        },
        isDemoNsUid: function(a) {
            return "3" === String(a).split("")[3]
        },
        convertToNormalTitleId: function(a) {
            a = String(a);
            0 === a.indexOf("00050002") && (a = "000500001" + a.substring(9, 14) + "00");
            0 === a.indexOf("00040002") && (a = "00040000" + a.substring(8, 14) + "00");
            return 0 !== a.indexOf("00050000") && 0 !== a.indexOf("00040000") ? null : a
        },
        convertToMainTitleId: function(a, d) {
            return "0005000010183A00" !== d && _.has(b, a) ? b[a] : a
        },
        getNsUid: function(a) {
            var b = null
              , c = null;
            if (void 0 !== a.dst_nsuid)
                c = new Wood.Model.TitlePublicStatus({
                    country: wood.client.country,
                    language: wood.client.language,
                    id: a.dst_nsuid
                }),
                c.fetch(),
                b = c.getNsUid();
            else if (void 0 !== a.dst_title_id) {
                b = Wood.StartPageDispatcher.convertToNormalTitleId(a.dst_title_id);
                if (!b) {
                    Wood.log("systemapp title_id specified. exit script.");
                    return
                }
                b = Wood.StartPageDispatcher.convertToMainTitleId(b, a.src_title_id);
                c = new Wood.Model.TitlePublicStatus({
                    country: wood.client.country,
                    language: wood.client.language,
                    id: b
                });
                c.fetch();
                b = c.getNsUid()
            } else
                void 0 !== a.dst_unique_id && (b = "000500001" + a.dst_unique_id + "00",
                c = new Wood.Model.TitlePublicStatus({
                    country: wood.client.country,
                    language: wood.client.language,
                    id: b
                }),
                c.fetch(),
                b = c.getNsUid());
            b && Wood.StartPageDispatcher.isDemoNsUid(b) && (Wood.StartPageDispatcher.alertNoData(),
            wood.client.redirectReplaceTo("./#top"));
            b && c && (a = "true" === a.allow_unsearchable,
            c.isPublic() || c.isUnseachable() && a || (b = null));
            return b
        },
        getNsUidFromItemCode: function(a) {
            a = new Wood.Model.AocItemNsuid({
                country: wood.client.country,
                item_code: a
            });
            a.fetch();
            return a.getNsuid()
        },
        createAocURL: function(a) {
            var b = Wood.StartPageDispatcher.getNsUid(a);
            if (!b)
                return Wood.StartPageDispatcher.alertNoData(),
                "./#top";
            var c = a.dst_aoc_nsuid;
            a = a.dst_item_code;
            return c || a ? c || !a || (c = this.getNsUidFromItemCode(a),
            c) ? Wood.URL.create("./aoc_detail.html", {
                seq: "appJump",
                title_id: b,
                aoc_id: c
            }) : Wood.URL.create("./#title", {
                title: b
            }) : (Wood.StartPageDispatcher.alertNoData(),
            "./#top")
        },
        createAocsURL: function(a) {
            var b = Wood.StartPageDispatcher.getNsUid(a);
            if (null === b)
                return Wood.StartPageDispatcher.alertNoData(),
                "./#top";
            b = new Wood.URL("./data03_01.html",{
                seq: "appJump",
                title: b
            });
            var c = a.search_word;
            a = a.sort;
            c && b.setQueryString("search_word", c);
            a && b.setQueryString("sort", a);
            return b.toString()
        },
        createTicketsURL: function(a) {
            a = Wood.StartPageDispatcher.getNsUid(a);
            return _.isNull(a) ? (Wood.StartPageDispatcher.alertNoData(),
            "./#top") : _.isUndefined(a) ? "./#top" : Wood.URL.create("./data04_01.html", {
                seq: "appJump",
                title: a
            })
        },
        createRedeemURL: function(a) {
            return Wood.URL.create("./#redeem", {
                seq: "appJump",
                card_number: a.card_number || ""
            })
        },
        createTitleDetailURL: function(a) {
            a = Wood.StartPageDispatcher.getNsUid(a);
            return _.isNull(a) ? (Wood.StartPageDispatcher.alertNoData(),
            "./#top") : _.isUndefined(a) ? "./#top" : Wood.URL.create("./#title", {
                seq: "appJump",
                title: a
            })
        },
        createSearchURL: function(b) {
            var c = _.contains(a, b.type) ? b.type : _.first(a)
              , e = null;
            _.isString(b.freeword) && (e = b.freeword);
            b = {
                seq: "appJump",
                searchType: c
            };
            e && (b.freeword = e);
            return Wood.URL.create("./#shelf", b)
        },
        createNfcRecoverURL: function(a) {
            return Wood.URL.create("./money07_01.html", {
                seq: "appJump"
            })
        },
        dispatch: function(a) {
            switch (a.scene) {
            case "top":
                return "./#top";
            case "aoc":
                return this.createAocURL(a);
            case "aocs":
                return this.createAocsURL(a);
            case "tickets":
                return this.createTicketsURL(a);
            case "redeem":
                return this.createRedeemURL(a);
            case "detail":
                return this.createTitleDetailURL(a);
            case "search":
                return this.createSearchURL(a);
            case "recover_nfc":
                return this.createNfcRecoverURL(a);
            default:
                return "./#top"
            }
        }
    };
    Wood.StartPageDispatcher.URL_TOP = "./#top"
}
)();
(function() {
    Wood.IndexBeacon = {
        boot01_01: function() {
            Wood.Analytics.saveAppJumpAttr($.url().param())
        },
        boot01_02: function() {},
        boot01_03: function() {},
        boot01_04: function() {},
        boot01_05: function() {},
        boot01_06: function() {},
        boot01_07: function() {}
    }
}
)();
(function() {
    Wood.ScreenSwitcher = function(a) {
        this.ids = a ? a : []
    }
    ;
    Wood.ScreenSwitcher.prototype = {
        getIds: function() {
            return this.ids
        },
        change: function(a) {
            $.each(this.getIds(), function(b, c) {
                c === a ? $("#" + c).show() : $("#" + c).hide()
            })
        }
    }
}
)();
(function() {
    Wood.Model.Base = Backbone.Model.extend({
        defaults: function() {
            return this.constructor.DEFAULT_PARAM
        },
        initialize: function(a) {
            this.setParam(a);
            this.setup()
        },
        store: Wood.ModelStore.getInstance(),
        setup: function() {
            this.storageCache && this.storageCache.autosave && this.listenTo(this, "sync", this.saveStorageCache)
        },
        setParam: function(a) {
            _.extend(this, a)
        },
        initByProperty: function(a) {
            this.set(a)
        },
        initByPropertyOrQuery: function(a) {
            _.every(_.map(this.queryParamKeys, function(b) {
                return _.has(a, b)
            })) ? this.setParam(a) : this.initByProperty(a)
        },
        getAttributes: function() {
            var a = $.extend({}, this.attributes)
              , b = this.defaults();
            _.each(b, function(b, d) {
                delete a[d]
            });
            return a
        },
        storageCache: null,
        _assertCacheInfo: function() {
            if (!this.storageCache)
                throw Error("storageCache not defined");
            return this.storageCache
        },
        saveStorageCache: function() {
            var a = this._assertCacheInfo()
              , b = a.storage.getRawInstance();
            b.setItem(a.keyname, JSON.stringify(this.getAttributes()));
            a.flush_on_save && _.isFunction(b.write) && b.write()
        },
        hasStorageCache: function() {
            var a = this._assertCacheInfo();
            return !!a.storage.getRawInstance().getItem(a.keyname)
        },
        loadStorageCache: function() {
            var a = this._assertCacheInfo()
              , b = a.storage.getRawInstance();
            a = JSON.parse(b.getItem(a.keyname));
            this.set(a);
            _.isFunction(this.afterLoad) && this.afterLoad()
        },
        removeStorageCache: function() {
            var a = this._assertCacheInfo();
            a.storage.getRawInstance().removeItem(a.keyname)
        },
        loadOrFetch: function(a) {
            this.storageCache && this.hasStorageCache() ? this.loadStorageCache() : this.fetch(a)
        },
        getBaseAjaxParam: function() {
            var a = this;
            return {
                beforeSend: function(b, c) {
                    $(window).on("beforeunload", function() {
                        4 !== b.readyState && (Wood.log("[Ajax Warning] request cancelled by user operation. text=" + b.statusText + " url=" + a.url()),
                        b.abort())
                    })
                },
                error: function(b, c, d) {
                    if ((d = c.responseText ? JSON.parse(c.responseText) : null) && d.error) {
                        var e = d.error.code;
                        var f = d.error.message;
                        for (var g = b.getIgnoreErrors(), h = g.length, k = 0; k < h; k++)
                            if (g[k] === e)
                                return b.hasDeferred() && b.getDeferred().resolve(),
                                !1
                    }
                    wood.client.handleAjaxError(c, a);
                    d && d.error && (a.set("error_code", e),
                    a.set("error_message", f));
                    _.isFunction(a.afterError) && a.afterError.call(a)
                }
            }
        },
        ignoreError: function(a) {
            this.ignore_errors || (this.ignore_errors = []);
            this.ignore_errors.push(a)
        },
        getIgnoreErrors: function() {
            return this.ignore_errors || []
        },
        getErrorPrefix: function() {
            var a = this.url().split("://")[1].split(/(\.|\-|cdn)/)[0];
            return "samurai" === a ? Wood.SystemConfig.PREFIX_SAMURAI : "ninja" === a ? Wood.SystemConfig.PREFIX_NINJA : null
        },
        fetchJSON: function(a) {
            a.data || (a.data = {});
            a.data._type = "json";
            if (this.hasDeferred()) {
                var b = function(a, b) {
                    return _.isFunction(a) ? _.compose(b, a) : b
                };
                a.success = b(a.success, this.getDeferred().resolve);
                a.error = b(a.error, this.getDeferred().reject);
                a.async = !0
            }
            b = function() {}
            ;
            if (this.canUseStore()) {
                var c = this.getCacheKey(a);
                b = this.store.get(c);
                if (null !== b) {
                    this.set(this.parse(b, a));
                    this.hasDeferred() && this.getDeferred().resolve();
                    return
                }
                var d = this;
                b = function(a) {
                    d.store.add(c, a)
                }
            }
            Backbone.Model.prototype.fetch.call(this, a).done(b)
        },
        getPromise: function(a) {
            this.set({
                deferred: $.Deferred()
            });
            this.storageCache && this.hasStorageCache() ? (this.loadStorageCache(),
            this.getDeferred().resolve()) : this.fetch(a);
            return this.getDeferred().promise()
        },
        getSafe: function(a) {
            var b = null;
            a = a.split(".");
            for (var c = a.length, d = 0; d < c; d++) {
                null === b && (b = this.attributes);
                if (Wood.Util.isUndefined(b[a[d]])) {
                    b = null;
                    break
                }
                b = b[a[d]]
            }
            return b
        },
        isError: function() {
            return Wood.Util.isDefined(this.getErrorCode())
        },
        getErrorCode: function() {
            return this.get("error_code")
        },
        getErrorMessage: function() {
            return this.get("error_message")
        },
        getDeferred: function() {
            return this.get("deferred")
        },
        hasDeferred: function() {
            return Wood.Util.isDefined(this.getDeferred())
        },
        getCacheKey: function(a) {
            return this.url() + "@" + JSON.stringify(a)
        },
        canUseStore: function() {
            return !!this.use_store
        }
    }, {
        DEFAULT_PARAM: {
            error_code: null,
            error_message: null,
            deferred: null
        },
        createGetters: function(a, b) {
            _.each(b, function(b, d) {
                a.prototype[d] = function() {
                    return this.getSafe(b)
                }
            })
        }
    })
}
)();
(function() {
    Wood.Model.MoneyType = Wood.Model.Base.extend({
        getAmount: function() {
            return this.get("amount")
        },
        getCurrency: function() {
            return this.get("currency")
        },
        getRawValue: function() {
            return this.get("raw_value")
        },
        isFree: function() {
            return 0 === parseFloat(this.getRawValue(), 10)
        }
    })
}
)();
(function() {
    Wood.Model.IdArray = Wood.Model.Base.extend({
        initialize: function() {
            this.ids = [];
            this.setup()
        },
        getIds: function() {
            return this.ids
        },
        loadIds: function(a) {
            var b = [];
            if (Wood.Util.isUndefined(a) || !a.length)
                return a;
            a.forEach(function(a) {
                a && a.id && b.push(a.id.toString())
            });
            this.ids = b
        },
        addId: function(a) {
            this.ids.push(a.toString())
        },
        removeId: function(a) {
            this.ids = this.ids.filter(function(b) {
                return b !== a.toString()
            })
        },
        contains: function(a) {
            var b = this.ids.length;
            if (0 === b)
                return !1;
            for (var c = 0; c < b; c++)
                if (this.ids[c] === a)
                    return !0;
            return !1
        },
        isEmpty: function() {
            return 0 === this.ids.length
        },
        toCSV: function() {
            return this.ids.join(",")
        },
        loadCSV: function(a) {
            this.ids = a.split(",")
        }
    })
}
)();
(function() {
    Wood.Model.CountryInfo = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/country/" + this.country
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                data: {
                    lang: this.lang
                },
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.country_detail
        },
        getISOCode: function() {
            return this.get("iso_code")
        },
        getName: function() {
            return this.get("name")
        },
        getDefaultLanguageCode: function() {
            return this.get("default_language_code")
        },
        isLanguageSelectable: function() {
            return this.get("language_selectable")
        },
        getMaxCacheSpec: function() {
            return this.get("max_cash")
        },
        isLoyaltySystemAvailable: function() {
            return this.get("loyalty_system_available")
        },
        isLegalPaymentMessageRequired: function() {
            return this.get("legal_payment_message_required")
        },
        isLegalBusinessMessageRequired: function() {
            return this.get("legal_business_message_required")
        },
        isTaxExcluded: function() {
            return this.get("tax_excluded_country")
        },
        isPrepaiedCardAvailable: function() {
            return this.get("prepaid_card_available")
        },
        isCreditCardAvailable: function() {
            return this.get("credit_card_available")
        },
        isNfcAvailable: function() {
            return this.get("nfc_available")
        },
        isCouponAvailable: function() {
            return this.get("coupon_available")
        },
        isMyCouponAvailable: function() {
            return this.get("my_coupon_available")
        },
        getTimeBasedRestrictions: function() {
            var a = this.get("time_based_restrictions");
            return Wood.Util.isUndefined(a) ? [] : a.time_based_restriction
        }
    })
}
)();
(function() {
    Wood.Model.Balance = Wood.Model.MoneyType.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/balance/current"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                data: {
                    lang: this.language
                },
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.balance
        }
    })
}
)();
(function() {
    Wood.Model.OrderList = Wood.Model.IdArray.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/owned_titles"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            a = a.owned_titles.owned_title;
            this.loadIds(a);
            return a
        }
    })
}
)();
(function() {
    function a(a, b, e) {
        return !!a
    }
    function b(a) {
        return parseInt(a, 10)
    }
    Wood.Model.DeviceOrderList = Wood.Model.Base.extend({
        initialize: function(c) {
            c = c || {};
            _.isString(c.title_ids) && _.isString(c.rvc_title_ids) ? (this.title_ids = c.title_ids.split(",").filter(a).map(b),
            this.rvc_title_ids = c.rvc_title_ids.split(",").filter(a).map(b)) : (this.title_ids = c.title_ids,
            this.rvc_title_ids = c.rvc_title_ids);
            this.setup()
        },
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/shared_title_ids"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            var b = this;
            b.title_ids = [];
            b.rvc_title_ids = [];
            a.owned_titles && a.owned_titles.owned_title && Wood.Util.each(a.owned_titles.owned_title, function(a, c) {
                b.title_ids.push(c.id)
            });
            a.owned_wii_titles && a.owned_wii_titles.owned_title && Wood.Util.each(a.owned_wii_titles.owned_title, function(a, c) {
                b.rvc_title_ids.push(c.id)
            });
            return a
        },
        contains: function(a) {
            for (var b = this.title_ids.concat(this.rvc_title_ids), c = b.length, f = 0; f < c; f++)
                if (b[f] === a)
                    return !0;
            return !1
        },
        getTitleIds: function() {
            return this.title_ids
        },
        getRVCTitleIds: function() {
            return this.rvc_title_ids
        },
        getAllIds: function() {
            return this.title_ids.concat(this.rvc_title_ids)
        },
        getTitleIdString: function() {
            return this.title_ids.join(",")
        },
        getRVCTitleIdString: function() {
            return this.rvc_title_ids.join(",")
        }
    })
}
)();
(function() {
    var a = {
        BOTH: "4,5",
        CAFE: "5",
        CTR: "4"
    };
    Wood.Model.WishList = Wood.Model.IdArray.extend({
        defaults: function() {
            return _.defaults({
                device: a.BOTH
            }, Wood.Model.IdArray.prototype.defaults())
        },
        storageCache: {
            keyname: "_wishlist_v2",
            storage: Wood.LocalStorage,
            flush_on_save: !0,
            autosave: !1
        },
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/wishlist"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam()
              , d = {
                sort: "registered",
                "device[]": this.getDevice()
            };
            $.extend(b, {
                type: "GET",
                async: !1,
                data: d,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        add: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                url: this.url() + "/!put",
                type: "POST",
                async: !1,
                xhrFields: {
                    withCredentials: !0
                },
                data: {
                    id: a
                }
            });
            Backbone.Model.prototype.fetch.call(this, b);
            this.addId(a);
            return this.isError() && parseInt(this.getErrorPrefix() + this.getErrorCode(), 10) === Wood.ErrorCode.WISHLIST_FULL ? !1 : !0
        },
        remove: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                url: this.url() + "/" + a + "/!delete",
                type: "POST",
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.ajax(b);
            var d = this;
            _.each(this.attributes, function(b, c) {
                b && a === b.id && delete d.attributes[c]
            });
            this.removeId(a);
            var e = this.attributes;
            Wood.Util.each(this.getAttributes(), function(b, c) {
                if (c.id === a)
                    return delete e[b],
                    !1
            });
            this.attributes = e
        },
        parse: function(a) {
            if (a.wishlist) {
                var b = a.wishlist.wished_title;
                this.loadIds(b)
            }
            return b
        },
        afterLoad: function() {
            this.loadIds(_.values(this.attributes))
        },
        isFull: function() {
            return 200 <= this.getIds().length
        },
        getTitlesData: function() {
            var a = [];
            if (0 === this.ids.length)
                return a;
            var c = this.getAttributes();
            Wood.Util.each(c, function(b, c) {
                a.push(c)
            });
            return a
        },
        getDevice: function() {
            return this.attributes.device
        }
    }, {
        DeviceCode: a
    })
}
)();
(function() {
    Wood.Model.Dictionary = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/dictionary"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                data: {
                    lang: this.language
                },
                async: !0,
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        getItems: function() {
            return this.get("items")
        }
    })
}
)();
(function() {
    Wood.Model.LocalizedMessage = Wood.Model.Base.extend({
        url: function() {
            return "./message/messages-" + this.resource_key + ".xml"
        },
        initialize: function(a) {
            _.extend(this, a);
            this.fetched = !1;
            this.parsed = {};
            this.setup()
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                url: this.url(),
                type: "GET",
                contentType: "application/xml",
                dataType: "xml",
                async: !1
            });
            $.extend(b, a);
            Backbone.Model.prototype.fetch.call(this, b)
        },
        parse: function(a) {
            var b = {};
            $(a).find("entry").each(function() {
                var a = $(this).attr("key")
                  , d = $(this).text();
                b[a] = d
            });
            this.fetched = !0;
            return this.parsed = b
        },
        getText: function(a) {
            this.fetched || this.fetch();
            var b = this.get(a);
            return b ? b : (Wood.log("[warn] text not found for label: " + a),
            "")
        },
        toJSON: function() {
            return JSON.stringify(this.parsed)
        },
        loadJSON: function(a) {
            this.set(JSON.parse(a));
            this.fetched = !0
        }
    })
}
)();
(function() {
    Wood.Model.NinjaSession = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/session/!open"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                data: {
                    lang: this.language,
                    country: this.country,
                    ver: 1
                },
                async: !1,
                xhrFields: {
                    withCredentials: !0
                },
                headers: {
                    "X-Nintendo-ServiceToken": this.service_token
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.session_config
        },
        getPrincipalId: function() {
            return this.get("pid")
        },
        getAccountId: function() {
            return this.get("account_id")
        },
        getCountry: function() {
            return this.get("country")
        },
        getSavedLanguage: function() {
            return this.get("saved_lang")
        },
        isShopAccountInitialized: function() {
            return this.get("shop_account_initialized")
        },
        getOwnedTitlesModified: function() {
            return this.get("owned_titles_modified")
        },
        getSharedTitlesModified: function() {
            return this.get("shared_titles_last_modified")
        },
        getOwnedWiiTitlesLastModified: function() {
            return this.get("owned_wii_titles_last_modified")
        },
        getWishlistLastModified: function() {
            return this.get("wishlist_last_modified")
        },
        getParentalControl: function() {
            return this.getSafe("parental_controls.parental_control")
        },
        getAge: function() {
            return this.get("age")
        },
        getId: function() {
            return this.get("id")
        },
        getMii: function() {
            return this.get("mii")
        },
        toJSON: function() {
            return JSON.stringify(this.getAttributes())
        },
        loadJSON: function(a) {
            return this.set(JSON.parse(a))
        }
    })
}
)();
(function() {
    Wood.Model.PseudoNinjaSession = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "debug/my/session/!open"
        },
        initialize: function(a) {
            _.extend(this, a);
            this.opened = !1;
            this.setup()
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                async: !1,
                data: {
                    lang: this.language,
                    country: this.country,
                    pid: this.pid
                },
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            a && a.session_config && (this.opened = !0);
            return a.session_config
        },
        isOpened: function() {
            return this.opened
        },
        getPrincipalId: function() {
            return this.get("pid")
        },
        getAccountId: function() {
            return this.get("account_id")
        },
        getCountry: function() {
            return this.get("country")
        },
        getSavedLanguage: function() {
            return this.get("saved_lang")
        },
        isShopAccountInitialized: function() {
            return this.get("shop_account_initialized")
        },
        getOwnedTitlesModified: function() {
            return this.get("owned_titles_modified")
        },
        getSharedTitlesModified: function() {
            return this.get("shared_titles_last_modified")
        },
        getOwnedWiiTitlesLastModified: function() {
            return this.get("owned_wii_titles_last_modified")
        },
        getAge: function() {
            return this.get("age")
        },
        getId: function() {
            return this.get("id")
        },
        toJSON: function() {
            return JSON.stringify(this.getAttributes())
        },
        loadJSON: function(a) {
            return this.set(JSON.parse(a))
        }
    })
}
)();
(function() {
    Wood.Model.DebugServiceToken = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "debug/api/service_token"
        },
        initialize: function(a) {
            this.param = a;
            this.token = null;
            this.setup()
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                data: this.param,
                dataType: "text",
                async: !1
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return this.token = a
        },
        getToken: function() {
            return this.token
        }
    })
}
)();
(function() {
    Wood.Model.TitlePublicStatus = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/title/public_status"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            var c = this.id.toString();
            c = 0 === c.indexOf("0005") || 0 === c.indexOf("0004") ? {
                title_id: c
            } : {
                ns_uid: c
            };
            this.language && (c.lang = this.language);
            $.extend(b, {
                type: "GET",
                data: c,
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.title_public_status
        },
        getPublicStatus: function() {
            return this.get("public_status")
        },
        isPublic: function() {
            return "PUBLIC" === this.getPublicStatus()
        },
        isUnseachable: function() {
            return "UNSEARCHABLE" === this.getPublicStatus()
        },
        getType: function() {
            return this.get("type")
        },
        getNsUid: function() {
            return this.get("ns_uid")
        },
        getTitleId: function() {
            return this.get("title_id")
        }
    })
}
)();
(function() {
    Wood.Model.AocItemNsuid = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/aoc/" + this.item_code + "/ns_uid"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.aoc
        },
        getNsuid: function() {
            return this.get("id")
        }
    })
}
)();
(function() {
    Wood.Model.VotableList = Wood.Model.Base.extend({
        LIMIT: 25,
        OFFSET: 0,
        PLAY_TIME: "60",
        is_upload_agreed: !1,
        has_votable_titles: !1,
        url: function() {
            return this.is_upload_agreed ? Wood.UrlPrefix.NINJA + "ws/my/votable_titles" : Wood.UrlPrefix.NINJA + "ws/my/instant_votable_titles"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam()
              , c = this.getRequestData();
            a && _.isNumber(a.offset) && (c.offset = a.offset);
            $.extend(b, {
                type: "GET",
                async: !1,
                data: c,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        put: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                url: this.url() + "/!put",
                type: "POST",
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        isUploadAgreed: function() {
            if (wood.client.isWiiU()) {
                var a = wiiuSystemSetting.getSpotPassUploadConsoleInfoState();
                wood.client.shutdownIfError(a);
                return a.enable
            }
            return !0
        },
        hasVotableTitles: function() {
            return wood.client.isWiiU() ? (this.data || this.setupData(),
            this.has_votable_titles) : !0
        },
        getRequestData: function() {
            this.data || this.setupData();
            return this.data
        },
        setupData: function() {
            this.limit = this.limit || this.LIMIT;
            var a = {
                lang: this.language,
                offset: this.offset || this.OFFSET,
                limit: this.limit
            };
            if (this.is_upload_agreed = this.isUploadAgreed())
                wood.client.isWiiU() && this.updateCandidates();
            else {
                var b = []
                  , c = this.getCandidates();
                c && c.IDs && 0 < c.IDs.length && (this.has_votable_titles = !0,
                b = c.IDs);
                a["titleIds[]"] = b.join(",")
            }
            this.data = a
        },
        getCandidates: function() {
            return wiiuPDM.getTitlesFilteredByPlayTime(this.PLAY_TIME)
        },
        updateCandidates: function() {
            var a = this.getCandidates().IDs;
            0 < a.length ? (this.has_votable_titles = !0,
            a = a.join(","),
            this.put({
                data: {
                    "titleIds[]": a
                },
                success: function() {
                    Wood.log("SUCCESS :played titles saved!")
                }
            })) : this.has_votable_titles = !1
        },
        getContents: function() {
            return this.get("contents")
        },
        saveList: function(a) {
            var b = this
              , c = this.getRequestData()
              , d = function(b) {
                wood.client.getSessionStorage().setItem(Wood.Client.StorageKey.VOTABLE_DATA, JSON.stringify(b));
                a(b)
            };
            !this.has_votable_titles || !this.is_upload_agreed && "" === c["titleIds[]"] ? d({
                content: null
            }) : this.fetch({
                async: !0,
                cache: !1,
                success: function(a) {
                    d(b.getContents())
                }
            })
        },
        loadList: function() {
            var a = wood.client.getSessionStorage().getItem(Wood.Client.StorageKey.VOTABLE_DATA);
            return JSON.parse(a)
        },
        getTotal: function() {
            var a = this.attributes.contents;
            return a && a.total ? parseInt(this.attributes.contents.total, 10) : 0
        }
    })
}
)();
(function() {
    Wood.Model.RedeemableCard = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/redeemable_card/!check"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                async: !1,
                data: {
                    card_number: this.card_number
                },
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.redeemable_card
        },
        toJSON: function() {
            return JSON.stringify(this.attributes)
        },
        getNumber: function() {
            return this.get("number")
        },
        getPreOrder: function() {
            return this.get("pre_order")
        },
        getContents: function() {
            return this.getSafe("contents.content")
        },
        getFirstContent: function() {
            var a = this.getContents();
            return a && 0 !== a.length ? a[0] : null
        },
        isAOC: function() {
            var a = this.getFirstContent();
            return !(!a || !a.aoc)
        },
        isTicket: function() {
            var a = this.getFirstContent();
            return !(!a || !a.ticket)
        },
        isTitle: function() {
            var a = this.getFirstContent();
            return !(!a || !a.title)
        },
        getReferenceTitleId: function() {
            return this.get("reference_title_id")
        },
        getCash: function() {
            return this.get("cash")
        },
        isCash: function() {
            return !!this.getCash()
        },
        isTitleCTR: function() {
            return this.isTitle() ? !!this.getFirstContent().title.id.toString().match(/^5/) : !1
        },
        isTitleWUP: function() {
            return this.isTitle() ? !!this.getFirstContent().title.id.toString().match(/^2/) : !1
        }
    });
    Wood.Model.RedeemableCard.isValidNumber = function(a) {
        return a && "string" === typeof a && /^[a-zA-Z0-9]{16}$/.test(a) ? !0 : !1
    }
    ;
    Wood.Model.RedeemableCard.hasUnusedChar = function(a) {
        return a && "string" === typeof a && /[IOZ\-]/i.test(a) ? !0 : !1
    }
}
)();
(function() {
    Wood.Model.TitleInfomation = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + wood.client.country + "/title/" + this.ns_uid
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, a);
            b.type = "GET";
            b.data = {
                lang: wood.client.language
            };
            this.fetchJSON(b)
        },
        parse: function(a) {
            if (Wood.Util.isDefined(a.title.id)) {
                var b = a.title
                  , c = Wood.Util.isDefined(b.tentative_price_on_eshop) ? b.tentative_price_on_eshop : "";
                this.item = {
                    ns_uid: parseInt(b.id, 10),
                    device: b.platform.device,
                    eshop_sales: b.eshop_sales,
                    tentative_price_on_eshop: c,
                    release_date_on_eshop: b.release_date_on_eshop
                }
            }
            return a.title
        },
        getNsUid: function() {
            return this.get("ns_uid")
        },
        getTitleName: function() {
            return this.get("name")
        },
        getFormalTitleName: function() {
            return this.get("formal_name")
        },
        getBannerUrl: function() {
            return this.getSafe("banner_url")
        },
        getIconUrl: function() {
            return this.get("icon_url")
        },
        hasNewDisplay: function() {
            return this.get("new")
        },
        hasAoc: function() {
            return this.get("aoc_available")
        },
        hasDemo: function() {
            return this.get("demo_available")
        },
        getDemoTitles: function() {
            return this.getSafe("demo_titles.demo_title")
        },
        hasAppPurchase: function() {
            return this.get("in_app_purchase")
        },
        hasTicket: function() {
            return this.get("ticket_available")
        },
        getScreenshots: function() {
            return this.getSafe("screenshots.screenshot")
        },
        getDescription: function() {
            return this.get("description")
        },
        getMovies: function() {
            return this.getSafe("movies.movie")
        },
        getKeywords: function() {
            return this.getSafe("keywords.keyword")
        },
        getPlatformDevice: function() {
            return this.attributes.platform.device
        },
        isWUP: function() {
            return "WUP" === this.getPlatformDevice()
        },
        isCTR: function() {
            return "CTR" === this.getPlatformDevice()
        },
        getPlatformName: function() {
            return this.attributes.platform.name
        },
        getPublishermName: function() {
            return this.attributes.publisher.name
        },
        hasEshopSales: function() {
            return this.get("eshop_sales")
        },
        hasRetailSales: function() {
            return this.get("retail_sales")
        },
        getPriceOnEshop: function() {
            return this.get("price_on_eshop")
        },
        getPriceOnRetail: function() {
            return this.get("price_on_retail")
        },
        getPriceOnRetailDetail: function() {
            var a = this.get("price_on_retail_detail");
            if (!a)
                return null;
            var b = new Wood.Model.MoneyType;
            b.set(a);
            return b
        },
        getPriceDescription: function() {
            return this.getSafe("price_description")
        },
        getNetworkDescription: function() {
            return this.getSafe("network_feature_description")
        },
        getSpecDescription: function() {
            return this.getSafe("spec_description")
        },
        getPeripheralDescription: function() {
            return this.getSafe("peripheral_description")
        },
        getReleaseDateOnEshop: function() {
            return this.get("release_date_on_eshop")
        },
        getReleaseDateOnRetail: function() {
            return this.get("release_date_on_retail")
        },
        getTentativePrice: function() {
            return this.get("tentative_price_on_eshop")
        },
        getDisplayGenre: function() {
            return this.get("display_genre")
        },
        getGenres: function() {
            return this.getSafe("genres.genre")
        },
        getNumberOfPlayer: function() {
            return this.get("number_of_players")
        },
        getLanguages: function() {
            return this.getSafe("languages.language")
        },
        getFeatures: function() {
            function a(a) {
                _.each(a, function(a) {
                    var b = _.find(d, function(b) {
                        return b.name === a.name
                    });
                    b ? b.required = b.required || a.required : (7 === a.type && (a.type = 4),
                    d.push(a))
                })
            }
            var b = this.getSafe("features.feature") || [];
            _.each(b, function(a) {
                _.contains([5, 6, 8, 9], a.type) && (a.type = 4)
            });
            var c = this.getSafe("play_styles.play_style")
              , d = [];
            _.each(c, function(b) {
                a(b.controllers && b.controllers.controller);
                a(b.features && b.features.feature)
            });
            return b = b.concat(d)
        },
        getDisclaimer: function() {
            return this.get("disclaimer")
        },
        getWebSites: function() {
            return this.getSafe("web_sites.web_site")
        },
        hasRating: function() {
            return Wood.Util.isDefined(this.attributes.rating_info) ? !0 : !1
        },
        getRatingSystemId: function() {
            return this.getSafe("rating_info.rating_system.id")
        },
        getRatingSystem: function() {
            return this.getSafe("rating_info.rating_system.name")
        },
        getRatingName: function() {
            return this.getSafe("rating_info.rating.name")
        },
        getRatingAge: function() {
            return this.getSafe("rating_info.rating.age")
        },
        getRatingImage: function() {
            return this.constructor.findNormalIconUrl(this.getSafe("rating_info.rating.icons"))
        },
        getRatingDescriptors: function() {
            return this.getSafe("rating_info.descriptors.descriptor")
        },
        getCopyrightText: function() {
            return this.getSafe("copyright.text")
        },
        getCopyrightImage: function() {
            return this.getSafe("copyright.image_url")
        },
        getStarRatingScoreAverage: function() {
            return this.getSafe("star_rating_info.score")
        },
        getStarRatingVotes: function() {
            return this.getSafe("star_rating_info.votes")
        },
        getStarRating: function() {
            return Wood.Util.isDefined(this.attributes.star_rating_info) ? {
                score1: this.attributes.star_rating_info.star1,
                score2: this.attributes.star_rating_info.star2,
                score3: this.attributes.star_rating_info.star3,
                score4: this.attributes.star_rating_info.star4,
                score5: this.attributes.star_rating_info.star5
            } : null
        },
        getPlayStyle: function() {
            return this.getSafe("preference.play_style")
        },
        getTargetPlayer: function() {
            return this.getSafe("preference.target_player")
        },
        getRating: function() {
            return new Wood.Rating(this.getRatingSystemId(),this.getRatingAge())
        }
    }, {
        findNormalIconUrl: function(a) {
            a = a.icon;
            return (a = _.find(a, function(a) {
                return a && "normal" === a.type
            })) ? a.url : null
        },
        canDisplayFeatures: function(a) {
            a = _.map(a, function(a) {
                return !(4 === a.type && a.icons && !Wood.Model.TitleInfomation.findNormalIconUrl(a.icons))
            });
            return _.some(a)
        }
    })
}
)();
(function() {
    Wood.View.Base = Backbone.View.extend({
        initialize: function() {
            this.setup()
        },
        setup: function() {
            _.defaults(this, this.options);
            this.assignedViews = {}
        },
        presenter: function() {
            return null
        },
        render: function() {
            _.isFunction(this.template) && this.$el.html(this.template(this.presenter()));
            _.each(this.assignedViews, function(a, b) {
                a.setElement(this.$(b)).render()
            }, this);
            this.afterRender();
            return this
        },
        afterRender: function() {
            this.localizeText();
            this.hookSE()
        },
        assign: function(a, b) {
            this.assignedViews[a] = b
        },
        localizeText: Wood.DomUtil.localizeText,
        hookSE: function(a) {
            a = a || this.$el;
            Wood.DomUtil.hookSoundEffectEvent(a)
        },
        getRatingStarInfo: function(a) {
            var b = !1
              , c = null
              , d = null;
            if (a.star_rating_info) {
                var e = a.star_rating_info.score;
                e && (b = !0,
                c = (new Wood.StarRating(e)).getImagePath(),
                a.star_rating_info.votes && (d = a.star_rating_info.votes))
            }
            return {
                has_rating: b,
                rating_img_path: c,
                rating_votes: d
            }
        }
    })
}
)();
(function() {
    var a = {
        DEFAULT: 1,
        TOP: 2,
        MENU: 3,
        BALANCE: 4,
        SEARCH: 5,
        PURCHASE: 6,
        PURCHASED: 7,
        CLOSE: 8,
        AOC_SEARCH: 9
    }
      , b = {
        DEFAULT: "x,y,+,-",
        TOP: "y,+,-,exit",
        MENU: "x,+,-",
        BALANCE: "x,y",
        SEARCH: "x,y,+",
        PURCHASE: "x",
        PURCHASED: "x,exit",
        CLOSE: "",
        AOC_SEARCH: "x"
    }
      , c = {
        x: ["X", "#top_link_01 > div"],
        y: ["Y", "#top_link_02:not(.off):not(.on) > div"],
        "+": ["PLUS", "#top_link_03 > div"],
        "-": ["MINUS", "#top_link_04 > div"],
        exit: ["A", "#top_link_06 > div"]
    }
      , d = _.throttle(function(a, b, c) {
        return a.apply(c, b)
    }, 1E3, {
        trailing: !1
    });
    Wood.View.MenuBar = Backbone.View.extend({
        initialize: function() {
            this.$body = $("body");
            this.$el = this.options.$wrap.find("#sel_menu_bar");
            this.$window = $(window);
            this.initial_back_event = this.initial_type = this.top_event = this.mymenu_event = this.close_event = this.back_event = this.type = null
        },
        setup: function(a) {
            this.resetAllButtonEvent();
            this.render(a);
            var b = wood.client.getNinjaSession();
            (b = b ? b.getMii() : null) && b.icon_url && this.$("#top_link_02 img").attr("src", b.icon_url);
            this.setTouchEvents();
            this.setButtonEvents(a);
            Wood.DomUtil.hookLabelSoundEffectEvent(this.$el);
            wood.client.storeBalance();
            this.$("#balance").text(wood.client.getSessionStorage().getItem(Wood.Client.StorageKey.BALANCE_AMOUNT));
            b = this.$("#ft_navi .menu span");
            wood.client.hasUnReadOwnedCoupon() ? b.addClass("attention-mark") : b.removeClass("attention-mark");
            this.type = a;
            return this
        },
        template: _.template('{{ if (type === TYPE.CLOSE) { }}<ul id="ft_navi_popup"><li id="top_link_07" class="close"><div data-href="">{{= t7 }}</div></li></ul>{{ } else { }}<ul id="ft_navi"><li id="top_link_01"{{ if (type === TYPE.TOP) { }} class="top on"><div>{{ } else { }} class="top"><div data-href="{{= top_link }}" class="se" data-se-label="SE_WAVE_OK_SUB">{{ } }}<span>{{= t1 }}</span></div></li><li id="top_link_02"{{ if (type === TYPE.MENU) { }} class="menu on"><div>{{ } else if (_.contains([TYPE.BALANCE, TYPE.PURCHASE, TYPE.PURCHASED, TYPE.AOC_SEARCH], type)) { }} class="menu off"><div>{{ } else { }} class="menu"><div data-href="">{{ } }}<img src="image/img_unknown_MiiIcon.png" width="70" height="70"/><br/><span>{{= t2 }}</span></div></li><li id="top_link_03"{{ if (type === TYPE.BALANCE) { }} class="balance on"><div>{{ } else if (_.contains([TYPE.PURCHASE, TYPE.PURCHASED, TYPE.AOC_SEARCH], type)) { }} class="balance off"><div>{{ } else { }} class="balance"><div data-href="money01_01.html" class="se" data-se-label="SE_WAVE_OK_SUB">{{ } }}<span>{{= t3 }}</span><span id="balance"></span></div></li><li id="top_link_04"{{ if (type === TYPE.SEARCH) { }} class="search on"><div>{{ } else if (_.contains([TYPE.PURCHASE, TYPE.PURCHASED, TYPE.AOC_SEARCH, TYPE.BALANCE], type)) { }} class="search off"><div>{{ } else { }} class="search"><div data-href="always02_01.html" class="se" data-se-label="SE_WAVE_OK_SUB">{{ } }}<span>{{= t4 }}</span></div></li>{{ if (_.contains([TYPE.TOP, TYPE.PURCHASED], type)) { }}<li id="top_link_06" class="exit"><div data-href=""><span>{{= t6 }}</span></div></li>{{ } else { }}<li id="top_link_05" class="back"><div data-href=""><span>{{= t5 }}</span></div></li>{{ } }}</ul>{{ } }}'),
        isIndex: function() {
            return !!$(".js-top").length
        },
        render: function(b) {
            var c = this.top_link = this.isIndex() ? "#top" : "./#top";
            this.$el.html(this.template({
                TYPE: a,
                type: b,
                top_link: c,
                t1: wood.client.getText("common01_01_038"),
                t2: wood.client.getText("common01_01_002"),
                t3: wood.client.getText("common01_01_020"),
                t4: wood.client.getText("common01_01_003"),
                t5: wood.client.getText("common01_01_001"),
                t6: wood.client.getText("common01_01_010"),
                t7: wood.client.getText("common01_01_008")
            }))
        },
        setTouchEvents: function() {
            var a = this.$el.find("[data-href]")
              , b = this
              , c = "#top" === location.hash;
            a.each(function(a, e) {
                var f = $(e)
                  , h = f.parent();
                f.on("click", function(a) {
                    a.preventDefault();
                    h.hasClass("back") || h.hasClass("menu") || h.hasClass("close") || d(function() {
                        h.addClass("on");
                        if (!h.hasClass("top") || !_.isFunction(b.top_event) || b.top_event()) {
                            var a = f.data("href");
                            a && _.delay(function() {
                                b.isIndex() && !c && a === b.top_link && b.fixScrollTemporary();
                                location.href = a
                            }, 30)
                        }
                    })
                }).on("touchstart", function(a) {
                    h.addClass("on");
                    wood.client.playSound("SE_WAVE_HWKEY_MENU_TRG")
                }).on("touchend", function(a) {
                    h.removeClass("on")
                })
            })
        },
        setButtonEvents: function(c) {
            var e = this;
            c = _.invert(a)[c];
            if (c = b[c])
                c = c.split(","),
                _.each(c, function(a) {
                    e.hookButtonEvent(a)
                })
        },
        hookButtonEvent: function(a) {
            var b = c[a]
              , e = b[0]
              , d = this.$(b[1]);
            if ("exit" === a)
                b = function(a) {
                    wood.client.playSound("SE_WAVE_EXIT");
                    wood.client.isWiiU() && (a.preventDefault(),
                    wood.client.shutdown())
                }
                ,
                d.on("keydown", Wood.KeyEvent[e](b)).on("click", b);
            else {
                var k = this
                  , l = this.initial_type === Wood.View.MenuBar.Type.TOP;
                this.$body.on("keydown", Wood.KeyEvent[e](function() {
                    wood.client.playSound("SE_WAVE_HWKEY_MENU_TRG");
                    if ("x" !== a || !_.isFunction(k.top_event) || k.top_event())
                        if (l && "x" === a)
                            wood.client.playSound("SE_WAVE_OK_SUB"),
                            d.parent().addClass("on"),
                            _.delay(function() {
                                k.back_event()
                            }, 30);
                        else {
                            var b = d.data("href");
                            b ? (b === k.top_link && k.fixScrollTemporary(),
                            d.parent().addClass("on"),
                            wood.client.playSound("SE_WAVE_OK_SUB"),
                            _.defer(function() {
                                wood.client.redirectTo(b)
                            })) : d.trigger("click")
                        }
                }))
            }
        },
        unhookButtonEvent: function() {
            this.$body.off("keydown")
        },
        fixScrollTemporary: function() {
            this.options.$wrap.css({
                position: "fixed",
                top: "-" + this.$window.scrollTop() + "px"
            });
            var a = _.bind(this.allowScroll, this);
            _.delay(a, 1E3)
        },
        allowScroll: function() {
            this.options.$wrap.css({
                position: "static",
                top: 0
            })
        },
        triggerBack: function() {
            this.trigger("back", {
                scroll_top: this.$window.scrollTop()
            })
        },
        removeClassBackButton: function() {
            this.$("#top_link_05, #top_link_07").removeClass("on")
        },
        hookBackEvent: function(a) {
            var b = this
              , e = function(c) {
                c.preventDefault();
                wood.client.playSound("SE_WAVE_HWKEY_MENU_TRG");
                wood.client.playSound("SE_WAVE_BACK");
                var d = b.$("#top_link_05, #top_link_07").addClass("on");
                _.delay(function() {
                    b.fixScrollTemporary();
                    b.triggerBack();
                    !1 === a() && d.removeClass("on")
                }, 30)
            };
            this.$body.on("keydown", Wood.KeyEvent.B(function(a) {
                d(e, [a])
            }));
            this.$("#top_link_05 > div").on("click", function(c) {
                c.preventDefault();
                d(function() {
                    wood.client.playSound("SE_WAVE_BACK");
                    b.fixScrollTemporary();
                    b.triggerBack();
                    a()
                })
            });
            this.$("#top_link_07 > div").on("click", function(b) {
                b.preventDefault();
                d(function() {
                    wood.client.playSound("SE_WAVE_BACK");
                    a()
                })
            });
            if (this.initial_type === Wood.View.MenuBar.Type.TOP)
                this.$(c.x[1]).on("click", function(b) {
                    b.preventDefault();
                    a()
                });
            this.back_event = a;
            this.close_event = null
        },
        hookCloseEvent: function(a) {
            var b = this
              , c = function(c) {
                c.preventDefault();
                wood.client.playSound("SE_WAVE_HWKEY_MENU_TRG");
                wood.client.playSound("SE_WAVE_CANCEL");
                b.$("#top_link_07").addClass("on");
                _.delay(function() {
                    a()
                }, 30)
            };
            this.$body.on("keydown", Wood.KeyEvent.B(function(a) {
                d(c, [a])
            }));
            this.$("#top_link_07 > div").on("click", function(b) {
                b.preventDefault();
                d(function() {
                    wood.client.playSound("SE_WAVE_CANCEL");
                    a()
                })
            });
            this.close_event = a;
            this.back_event = null
        },
        hookMymenuEvent: function(a) {
            var b = this.$(c.y[1]);
            b.on("click", function(c) {
                c.preventDefault();
                d(function() {
                    b.parent().addClass("on");
                    wood.client.playSound("SE_WAVE_OK_SUB");
                    _.delay(a, 30)
                })
            });
            this.mymenu_event = a
        },
        hookTopEvent: function(a) {
            this.top_event = a
        },
        resetAllButtonEvent: function() {
            this.$body.off("keydown")
        },
        saveInitialState: function() {
            this.initial_type || (this.initial_type = this.type,
            this.initial_back_event = this.back_event)
        },
        selectMenu: function(a) {
            this.saveInitialState();
            this.type = Wood.View.MenuBar.Type.MENU;
            this.hookBackEvent(a);
            this.rebuild();
            this.$(c.y[1]).off()
        },
        rebuild: function() {
            this.setup(this.type);
            this.back_event && this.hookBackEvent(this.back_event);
            this.close_event && this.hookCloseEvent(this.close_event);
            this.mymenu_event && this.hookMymenuEvent(this.mymenu_event)
        },
        revert: function() {
            this.type = this.initial_type;
            this.hookBackEvent(this.initial_back_event);
            this.rebuild()
        }
    });
    Wood.View.MenuBar.Type = a
}
)();
(function() {
    Wood.View.Common.Pagination = Wood.View.Base.extend({
        per_page: 25,
        store_history: !0,
        events: {
            "click .evt_pager_num": "onClickPageNumber",
            "click .evt_pager_next, .evt_pager_prev": "onClickNext",
            "click a": "onClickAnchor"
        },
        initialize: function(a, b) {
            this.template = Wood.Template.get("common", "#pagination");
            this.setup();
            this.pagenation = new Wood.Pagenation(1,this.per_page,1)
        },
        setTotalCount: function(a) {
            this.pagenation.setTotalCount(a)
        },
        presenter: function() {
            var a = this.pagenation
              , b = a.getCurrentPage()
              , c = a.getNaviPages();
            return {
                pages: _.map(c, function(a) {
                    return {
                        page: a,
                        is_self: a === b
                    }
                }),
                total_page: a.getTotalPage(),
                current_page: b,
                prev_page: a.getPrevPage(),
                next_page: a.getNextPage()
            }
        },
        onClickPageNumber: function(a) {
            $(".pagenation li[class=current]").removeClass("current").addClass("page");
            $(a.currentTarget).parent().removeClass("page").addClass("current")
        },
        onClickNext: function(a) {
            $(a.currentTarget).parent().removeClass("on").addClass("selected")
        },
        onClickAnchor: function(a) {
            this.store_history || (a.preventDefault(),
            wood.client.redirectReplaceTo(a.currentTarget.href))
        }
    })
}
)();
(function() {
    Wood.View.Common.PushToWishlist = Wood.View.Base.extend({
        className: "el-wish",
        options: {
            short_label: !1,
            selector_add: "#str_wishlist",
            selector_add_short: "#str_wishlist_short",
            selector_done: "#str_wishlist_done"
        },
        initialize: function() {
            this.template = Wood.Template.get("common", "#template_wishlist");
            var a = this.options;
            a.controller && a.controller.$wrap && (this.$el = a.controller.$wrap.find("." + this.className));
            this.is_single = _.isString(a.ns_uid);
            this.ids = a.ns_uid;
            this.text_add = $(a.short_label ? a.selector_add_short : a.selector_add).html();
            this.text_done = $(a.selector_done).html();
            this.render()
        },
        render: function() {
            var a = this;
            this.$el.children().remove();
            var b = new Wood.Model.WishList;
            b.loadOrFetch();
            if (a.is_single) {
                var c = b.contains(a.ids);
                a.appendTemplate(a.ids, c)
            } else
                _.each(a.ids, function(c) {
                    var d = b.contains(c.toString());
                    a.appendTemplate(c, d)
                });
            a.$el.find("a").on("click", function(b) {
                a.eventRegister(b, a)
            });
            return this
        },
        appendTemplate: function(a, b) {
            (this.is_single ? this.$el : $("#el-wish-" + a)).append(this.template({
                is_registered: b,
                str_wishlist: this.text_add,
                str_wishlist_done: this.text_done,
                data_title_id: a
            }))
        },
        confirmListOverflow: function() {
            var a = wood.client.confirm($("#dialog_msg_wish").text(), $("#dialog_later").text(), $("#dialog_watch").text());
            a && wood.client.redirectTo("wish01_01.html");
            return a
        },
        eventRegister: function(a, b) {
            a.preventDefault();
            a = $(a.currentTarget);
            wood.client.playSound("SE_WAVE_CHECKBUTTON_CHECK");
            wood.client.disableUserOperation(!0);
            var c = new Wood.Model.WishList;
            c.fetch();
            if (c.isFull())
                c.saveStorageCache(),
                this.confirmListOverflow(),
                wood.client.enableUserOperation();
            else {
                wood.client.disableHomeButton(!0);
                var d = a.data("title-id");
                c.add(d) ? (c.fetch(),
                c.saveStorageCache(),
                wood.client.enableUserOperation(!0),
                wood.client.enableHomeButton(!0),
                a.remove(),
                b.appendTemplate(d, !0),
                wood.client.playSound("SE_WAVE_OK"),
                Wood.log("RegisterWishList: status success")) : (this.confirmListOverflow(),
                wood.client.enableUserOperation(),
                wood.client.enableHomeButton())
            }
        }
    })
}
)();
(function() {
    Wood.View.Mymenu = Wood.View.Base.extend({
        id: "mymenu",
        max_icons: 5,
        initialize: function() {
            this.template = Wood.Template.get("mymenu", "#main");
            this.setup()
        },
        presenter: function() {
            var a = wood.client.getNinjaSession();
            return {
                data: {
                    mii: a ? a.getMii() || {} : {},
                    wish: this.getWishList(),
                    is_address_available: wood.client.isAddressAvailable(),
                    is_lang_selectable: wood.client.ls.isLangSelectable(),
                    is_owned_coupon_available: wood.client.isMyCouponAvailable(),
                    is_club_available: wood.client.isLoyaltySystemAvailable()
                }
            }
        },
        afterRender: function() {
            Wood.DomUtil.lazyload(this.$(".wishlist li img"));
            this.localizeText();
            this.hookSE();
            this.hookEvent();
            this.getVotableList();
            this.renderOwnedCoupon();
            this.hideCCardButton();
            this.$balance = this.$(".amount").text(wood.client.getBalanceAmount())
        },
        getWishList: function() {
            var a = this
              , b = this.options.controller
              , c = b.parseParam()
              , d = new Wood.Model.WishList;
            d.loadOrFetch();
            if (d.isEmpty())
                return Wood.log("mymenu:getWishList: empty"),
                null;
            var e = [];
            _.some(d.getAttributes(), function(d, g) {
                g = d.id;
                if (!g)
                    return !1;
                var f = d.platform.id;
                if (_.contains(Wood.SystemConfig.getExclusionPlatformIds(), f))
                    return !1;
                d = d.icon_url;
                /^title\?/.test(Backbone.history.fragment) && g.toString() === c.title ? f = "#closeMymenu" : (f = ($(".js-top").length ? "" : "./") + "#title",
                f = new Wood.URL(f,{
                    title: g
                }),
                b.appendDirectlinkBeaconParam(f, "mymenu", "wish01"),
                f = f.toString());
                if (e.length >= a.max_icons)
                    return !0;
                e.push({
                    id: g,
                    icon: d,
                    url: f
                })
            });
            return e
        },
        hookEvent: function() {
            var a = this;
            if (!this.options.controller.isMymenuOpen)
                this.$("a:not(#evt_show_all, #js-help)").on("click", function(a) {
                    a.preventDefault();
                    wood.client.redirectTo($(a.currentTarget).attr("href"))
                });
            this.$("#evt_show_all").on("click", function(b) {
                b.preventDefault();
                $(this).hide();
                a.$(".setting > ul").show()
            });
            this.$(".help a").on("click", function(b) {
                b.preventDefault();
                a.openHelp()
            });
            this.$(".wishlist a[href=#closeMymenu]").on("click", function(b) {
                b.preventDefault();
                a.options.controller.closeMymenu()
            })
        },
        getVotableList: function() {
            var a = this
              , b = new Wood.Model.VotableList({
                language: wood.client.language,
                limit: this.max_icons
            });
            if (b.isUploadAgreed()) {
                var c = b.loadList();
                c ? this.renderVotableList(c.content) : b.saveList(function(b) {
                    a.renderVotableList(b.content)
                })
            } else
                this.renderVotableList(null)
        },
        renderOwnedCoupon: function() {
            var a = this.$(".show-owned-coupon-list");
            wood.client.hasUnReadOwnedCoupon() ? a.addClass("attention-mark") : a.removeClass("attention-mark")
        },
        renderVotableList: function(a) {
            a = new Wood.View.Mymenu.VotableList({
                list: a,
                controller: this.options.controller
            });
            this.$(".recommend").empty().append(a.render().$el.children())
        },
        hideCCardButton: function() {
            "false" === wood.client.getSessionStorage().getItem("credit_card_available") && this.$(".ccard").hide()
        },
        openHelp: function() {
            var a = this;
            this.$el.hide();
            this.help ? this.help.$el.show() : (this.help = new Wood.View.Mymenu.Help,
            this.$el.parent().append(this.help.render().el));
            var b = a.options.controller.menuBar;
            b.setup(Wood.View.MenuBar.Type.CLOSE);
            b.hookCloseEvent(function() {
                a.closeHelp();
                a.sendMymenuBeacon()
            });
            this.sendHelpBeacon()
        },
        closeHelp: function() {
            var a = this;
            this.help.$el.hide();
            this.$el.show();
            var b = this.options.controller.menuBar;
            b.setup(Wood.View.MenuBar.Type.MENU);
            b.hookBackEvent(function() {
                a.options.controller.isMymenuOpen ? a.options.controller.closeMymenu() : wood.client.historyBack()
            })
        },
        reset: function() {
            this.help && "block" === this.help.$el.css("display") && this.closeHelp();
            this.$el.off()
        },
        reopen: function() {
            this.$el.off();
            this.render();
            this.$el.show()
        },
        sendHelpBeacon: function() {},
        sendMymenuBeacon: function() {}
    })
}
)();
(function() {
    Wood.View.Mymenu.VotableList = Wood.View.Base.extend({
        max_icons: 5,
        initialize: function() {
            this.template = Wood.Template.get("mymenu", "#recommend");
            this.setup()
        },
        presenter: function() {
            var a = this.list
              , b = this.controller;
            _.each(a, function(a) {
                var c = new Wood.URL("reco01_02.html",{
                    title: a.title.id
                });
                b.appendDirectlinkBeaconParam(c, "mymenu", "reco01");
                a.url = c.toString()
            });
            return {
                data: {
                    votable: a
                }
            }
        },
        afterRender: function() {
            Wood.DomUtil.lazyload(this.$("li img"));
            this.localizeText();
            this.hookSE();
            this.hookEvent()
        },
        hookEvent: function() {
            this.$("li a").on("click", function(a) {
                a.preventDefault();
                a = $(this);
                var b = parseInt(a.data("age"), 10);
                wood.client.getAge() < b && "USA" !== wood.client.getRegion() ? wood.client.alert($("#mymenu_msg_age").text(), $("#mymenu_msg_ok").text()) : wood.client.redirectTo(a.attr("href"))
            })
        }
    })
}
)();
(function() {
    Wood.View.Mymenu.Help = Wood.View.Base.extend({
        initialize: function() {
            this.template = Wood.Template.get("mymenu", "#help");
            this.setup()
        },
        presenter: function() {
            return {
                is_inquiry_available: wood.client.isInquiryAvailable()
            }
        }
    })
}
)();
(function() {
    Wood.Modules.Controller.Base.Boot = function() {}
    ;
    Wood.Modules.Controller.Base.Boot.prototype = {
        handleBoot: function(a, b) {
            a && !a.isInBoot() ? this.lightBoot(a, b) : (this._prepareClient(),
            a = wood.client,
            this.boot(a, b))
        },
        boot: function(a, b) {
            var c = [a, b]
              , d = a.getUserAgent();
            Wood.log("<boot> : getUserAgent = " + d.toString());
            !a.isWiiU() || d.isWood() && d.isLatestVersionOrLater() || (a.showError(Wood.ErrorCode.CLOSE_APPLICATION),
            a.shutdown());
            a.isInBoot() || (Wood.log("<boot> : setBGM"),
            this.setBGM(a));
            $.ajaxSetup({
                timeout: 55E3
            });
            a.verifyIVSSent();
            Wood.DomUtil.hookSoundEffectEvent($("body"));
            a.storeBalance();
            $('<div style="display:none;"><span id="dialog_msg_invalid_session" data-message="error01_01"></span></div>').appendTo("body");
            a.prepareLocalizedText();
            this.localizeText();
            this.$wrap.show();
            this.storeUserData(a.isInBoot(), b.isAppJump());
            this.setDictionary();
            a.enableUserOperation(!0);
            a.isInBoot() ? a.endStartUpWithBGM() : a.endStartUp();
            this.setPageShowEvent(this, c)
        },
        setPageShowEvent: function(a, b) {
            var c = b[0];
            $(window).on("pageshow", function(d) {
                c.isWiiU() && (window.wiiu.videoplayer.end(),
                wiiuBrowser.lockPowerButton(!1));
                a.setBGM(c);
                a.callOnPageShow(a, b);
                d.originalEvent && d.originalEvent.persisted && (Wood.log("[pageshow] from back"),
                c.enableUserOperation(!0),
                c.enableHomeButton(!0),
                a.callOnPageShowCache(a, b))
            })
        },
        callOnPageShow: function(a, b) {
            _.isFunction(a.onPageShow) && a.onPageShow.apply(a, b)
        },
        callOnPageShowCache: function(a, b) {
            _.isFunction(a.onPageShowCacheDynamic) ? a.onPageShowCacheDynamic.apply(a, b) : (a.rebuildMenuBar(),
            a.mymenu && (a.mymenu.reset(),
            a.mymenu.render()),
            _.isFunction(a.onPageShowCache) && a.onPageShowCache.apply(a, b))
        },
        lightBoot: function(a, b) {
            Wood.DomUtil.hookSoundEffectEvent($("body"));
            a.prepareLocalizedText();
            this.localizeText()
        }
    }
}
)();
(function() {
    Wood.Modules.Controller.Base.Beacon = function() {}
    ;
    Wood.Modules.Controller.Base.Beacon.prototype = {
        appendBeaconParam: function(a, b) {
            a.addQuery({
                beacon: JSON.stringify(b)
            })
        },
        getBeaconParam: function(a) {
            var b = this.parseParam().beacon;
            return b ? (b = b.replace(/^(.*)#([^}]*?)$/, "$1"),
            JSON.parse(b)[a]) : null
        },
        appendDirectoryBeaconParam: function(a, b, c, d, e) {
            this.appendBeaconParam(a, {
                directory: {
                    id: b,
                    index: c,
                    alias: d,
                    name: e
                }
            })
        },
        getDirectoryBeaconParam: function() {
            return this.getBeaconParam("directory")
        },
        appendDirectlinkBeaconParam: function(a, b, c) {
            this.appendBeaconParam(a, {
                directlink: {
                    scene: b,
                    from: c
                }
            })
        },
        getDirectlinkBeaconParam: function() {
            return this.getBeaconParam("directlink")
        }
    }
}
)();
(function() {
    Wood.Modules.Controller.Base.Client = function() {}
    ;
    Wood.Modules.Controller.Base.Client.prototype = {
        setCache: function(a) {
            this.cache = a
        },
        _prepareClient: function() {
            wood.client && wood.client.isWiiU || (wood.client = new Wood.Client);
            wood.client.loadSystemSetting();
            var a = null;
            this.cache && this.cache.country === wood.client.country && this.cache.language === wood.client.language && (Wood.log("<_prepareClient> country cache hit"),
            a = this.cache.country_info);
            wood.client.storeCountryInfo(a);
            wood.client.updateUserSession()
        },
        setBGM: function(a) {
            switch (this.BGM || "main") {
            case "main":
                a.playSound("BGM_WAVE_MAIN", 3);
                break;
            case "setting":
                a.playSound("BGM_WAVE_SETTING", 3);
                break;
            case "boot":
                a.playSound("BGM_WAVE_BOOT_0", 3);
                break;
            default:
                a.playSound("BGM_WAVE_MAIN", 3)
            }
        }
    }
}
)();
(function() {
    Wood.Modules.Controller.Base.Dictionary = function() {}
    ;
    Wood.Modules.Controller.Base.Dictionary.prototype = {
        setDictionary: function() {
            if (wood.client.isWiiU() && !wiiuKeyboard.setUserDictionary)
                Wood.log("setUserDictionary not supported");
            else if (wood.client.isDictionarySet())
                Wood.log("user dictionary already set");
            else {
                var a = new Wood.Model.Dictionary({
                    country: wood.client.country,
                    language: wood.client.language
                });
                a.bind("change", function() {
                    if (wood.client.isWiiU()) {
                        var b = wiiuKeyboard.setUserDictionary(JSON.stringify({
                            items: a.getItems()
                        }));
                        b && !b.error ? Wood.log("fetch and store user dictionary") : Wood.log("setUserDictionary failed:" + b.error.code)
                    } else
                        Wood.log("(PC) set dictionary flag true");
                    wood.client.setDictionaryFlag()
                }, a);
                a.fetch()
            }
        }
    }
}
)();
(function() {
    Wood.Modules.Controller.Base.UserData = function() {}
    ;
    Wood.Modules.Controller.Base.UserData.prototype = {
        storeUserData: function(a, b) {
            var c = !1;
            if (Wood.Util.isUndefined(wood.client.getDeviceOrderList())) {
                Wood.log("storeUserData: try to update DeviceOrderList...");
                var d = new Wood.Model.DeviceOrderList;
                d.fetch({
                    async: !b,
                    success: function() {
                        a ? setTimeout(function() {
                            wood.client.updateDeviceOrderList(d);
                            Wood.log("storeUserData: DeviceOrderList updated (delayed)")
                        }, 4E3) : (wood.client.updateDeviceOrderList(d),
                        Wood.log("storeUserData: DeviceOrderList updated"))
                    }
                })
            }
            b = new Wood.Model.WishList;
            b.hasStorageCache() || (Wood.log("storeUserData: update WishList"),
            b.fetch(),
            b.saveStorageCache(),
            c = !0);
            wood.client.ls.hasLangSelectable() || (Wood.log("storeUserData: update LangSelectable"),
            c = new Wood.Model.CountryInfo({
                country: wood.client.country,
                language: wood.client.language
            }),
            c.fetch(),
            wood.client.ls.setLangSelectable(c.isLanguageSelectable()),
            c = !0);
            c && wood.client.isWiiU() && wood.client.criticalAction(function() {
                wood.client.getLocalStorage().write()
            })
        }
    }
}
)();
(function() {
    Wood.Modules.Controller.Base.MenuBar = function() {}
    ;
    Wood.Modules.Controller.Base.MenuBar.prototype = {
        setupMenu: function(a) {
            var b = this;
            this.menuBar = new Wood.View.MenuBar({
                $wrap: this.$wrap
            });
            this.menuBar.setup(a);
            this.menuBar.hookMymenuEvent(function() {
                b.openMymenu()
            })
        },
        rebuildMenuBar: function() {
            this.menuBar && this.menuBar.rebuild()
        },
        showMenuBar: function() {
            this.menuBar && this.menuBar.$el.show()
        },
        hideMenuBar: function() {
            this.menuBar && this.menuBar.$el.hide()
        }
    }
}
)();
(function() {
    Wood.Modules.Controller.Base.Mymenu = function() {}
    ;
    Wood.Modules.Controller.Base.Mymenu.prototype = {
        openMymenu: function() {
            var a = this
              , b = $("#wrap, #wrapper").filter(":visible");
            if (this.isMymenuOpen) {
                if (b.find("#mymenu").length)
                    return
            } else
                this.last_scroll = this.$body.scrollTop(),
                this.isMymenuOpen = !0;
            "main" !== this.BGM && wood.client.playSound("BGM_WAVE_MAIN", 3);
            this.$content = b.find("#sb_cont");
            this.$content.length || (this.$content = b.children().first());
            this.$content.hide();
            this.mymenu = this.renderView(Wood.View.Mymenu);
            b.append(this.mymenu.render().el);
            Wood.DomUtil.animateToTop();
            this.menuBar.selectMenu(function() {
                a.closeMymenu()
            })
        },
        closeMymenu: function() {
            this.isMymenuOpen = !1;
            if (this.mymenu)
                "main" !== this.BGM && this.setBGM(wood.client),
                this.$content.show(),
                this.mymenu.$el.hide(),
                this.mymenu.remove(),
                this.menuBar.revert(),
                this.menuBar.allowScroll(),
                Wood.DomUtil.animateToTop(this.last_scroll);
            else {
                var a = this.$body.find("#mymenu");
                a.length && a.remove()
            }
        }
    }
}
)();
(function() {
    Wood.Modules.Controller.Base.Limit = function() {}
    ;
    Wood.Modules.Controller.Base.Limit.prototype = {
        limitAge: function(a, b) {
            if (a.hasRating() && !a.getRating(a.getRatingSystemId(), a.getRatingAge()).isDisplayAllowed(b, wood.client.getRegion(), wood.client.getAge()))
                throw wood.client.alert($("#dialog_msg_age").text(), $("#dialog_msg_ok").text()),
                wood.client.historyBack(),
                Error("limitAge redirect stopper");
        },
        limitParentalControl: function(a) {
            if (a.hasRating() && wood.client.isLockedForGamePlay(a.getRatingAge()))
                throw a = $.url(),
                wood.client.redirectReplaceTo("legal01_01.html?seq=" + encodeURIComponent(a.attr("file") + "?" + a.attr("query")) + "#gameplay"),
                Error("limitParentalControl redirect stopper");
        }
    }
}
)();
(function() {
    Wood.Modules.Controller.Base.Util = function() {}
    ;
    Wood.Modules.Controller.Base.Util.prototype = {
        parseParam: Wood.Request.prototype.parseParam,
        createAppJumpBackEvent: function(a, b) {
            var c = b.isAppJump();
            return function() {
                c ? a.redirectTo("data01_03.html", {
                    cancel: "historyback"
                }) : a.historyBack()
            }
        },
        updateRedeemNumSession: function(a, b) {
            var c = b.param("redeem_num");
            b = b.param("redeem_title_id");
            c && b && a.setRedeemNumber(b, c)
        },
        reload: function() {
            location.reload()
        },
        reloadWithoutHash: function() {
            location.href = location.pathname + location.search
        }
    }
}
)();
(function() {
    Wood.Controller.ROUTES = {
        "": "runRoot"
    };
    Wood.Controller.Base = Backbone.Router.extend({
        routes: $.extend({}, Wood.Controller.ROUTES),
        models: {},
        called_runroot: !1,
        initialize: function() {
            var a = this;
            _.each(Wood.Controller.Base.Modules, function(b) {
                b.call(a)
            });
            this.$body = $("body");
            this.$wrap = $("#wrap, #wrapper")
        },
        runRoot: function() {
            this.called_runroot = !0;
            var a = wood.client
              , c = this.getRequest();
            a = [a, c];
            this.handleBoot.apply(this, a);
            a = wood.client;
            a = [a, c];
            _.isFunction(this.preparePage) && this.preparePage.apply(this, a);
            _.isFunction(this.run) && this.run.apply(this, a);
            _.isFunction(this.afterRun) && this.afterRun.apply(this, a)
        },
        showPage: function() {
            this.$wrap.show();
            this.$body.removeClass("display_cover")
        },
        renderView: function(a, c) {
            a = this.generateView(a, $.extend({
                controller: this
            }, c));
            Wood.DomUtil.hookSoundEffectEvent($(a.el));
            return a
        },
        localizeText: function() {
            $("[data-message]").each(function() {
                var a = $(this);
                a.html(wood.client.getText(a.attr("data-message")))
            })
        },
        generateModel: function(a, c) {
            return this.generateObject(Wood.Model, a, c)
        },
        generateView: function(a, c) {
            return _.isFunction(a) ? new a(c) : this.generateObject(Wood.View, a.toString(), c)
        },
        generateObject: function(a, c, d) {
            var b = a;
            _.each(c.split("."), function(a) {
                b = b[a];
                if (!b)
                    throw Error("(Wood.Controller.Base#generateObject) Error:" + c + " does not exists.");
            });
            return new b(d)
        },
        getRequest: function() {
            return new Wood.Request(location)
        }
    });
    var a = Wood.Modules.Controller.Base;
    Wood.Controller.Base.Modules = [a.Boot, a.Beacon, a.Client, a.Dictionary, a.UserData, a.MenuBar, a.Mymenu, a.Limit, a.Util];
    _.each(Wood.Controller.Base.Modules, function(a) {
        _.extend(Wood.Controller.Base.prototype, a.prototype)
    })
}
)();
