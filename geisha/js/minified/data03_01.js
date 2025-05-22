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
(function() {
    Wood.Model.AocCheck = Backbone.Model.extend({});
    Wood.Collection.AocCheckList = Backbone.Collection.extend({
        Model: Wood.Model.AocCheck
    })
}
)();
(function() {
    Wood.Model.OwnedTickets = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/owned_tickets"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                async: !1,
                cache: !1,
                data: {
                    title: this.title_id
                },
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            Wood.log(JSON.stringify(a, null, "    "));
            return a.owned_tickets
        },
        isEmpty: function() {
            return !this.get("owned_ticket")
        },
        getContractId: function() {
            var a = this.get("owned_ticket")
              , b = null;
            return b = _.reduce(a, function(a, b) {
                return a || b && b.auto_billing && b.auto_billing.ns_uid
            }, null)
        },
        getTickets: function() {
            var a = this.get("owned_ticket");
            if (!a || 0 === a.length)
                return [];
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(new Wood.Model.Ticket(a[d]));
            return b
        }
    })
}
)();
(function() {
    Wood.Model.Aoc = Wood.Model.Base.extend({
        queryParamKeys: ["country", "language", "id"],
        initialize: function(a) {
            this.initByPropertyOrQuery(a);
            this.setup()
        },
        initByProperty: function(a) {
            this.set({
                id: a.id,
                name: a.name,
                screenshots: a.screenshots,
                icon_url: a.icon_url,
                allow_overlap: !!a.allow_overlap,
                promotion_movie_url: a.promotion_movie_url,
                description: a.description,
                content_index: a.content_indexes.content_index,
                variation: a.content_indexes.variation
            })
        },
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/aocs"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                data: {
                    lang: this.language,
                    "aoc[]": this.id
                },
                async: !1,
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            (a = a.aocs.aoc) && this.initByProperty(a[0])
        },
        getId: function() {
            return this.get("id")
        },
        getName: function() {
            return this.get("name")
        },
        getIconUrl: function() {
            return this.get("icon_url")
        },
        getPromotionMovieUrl: function() {
            return this.get("promotion_movie_url")
        },
        getDescription: function() {
            return this.get("description")
        },
        getScreenshotURLs: function() {
            var a = this.getSafe("screenshots.screenshot");
            return a ? _.chain(a).map(function(a) {
                return _.pluck(a.image_url, "value")
            }).flatten().value() : null
        },
        allowedOverlap: function() {
            return this.get("allow_overlap")
        },
        getContentIndexes: function() {
            return this.get("content_index")
        },
        getVariation: function() {
            return this.get("variation")
        },
        isOverlap: function(a) {
            var b = this.getContentIndexes();
            if (!b || 0 === b.length || !a)
                return !1;
            a.length || (a = [a]);
            var c = b.length, d, e = function(a) {
                return a === b[d]
            };
            for (d = 0; d < c; d++)
                if (0 < a.filter(e).length)
                    return !0;
            return !1
        }
    })
}
)();
(function() {
    Wood.Model.OwnedContents = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/owned_contents"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                async: !1,
                data: {
                    title: this.title_id
                },
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.owned_contents
        },
        getContents: function() {
            return this.get("owned_content")
        },
        getContentsByVariation: function(a) {
            var b = this.getContents();
            if (!b || 0 === b.length)
                return [];
            for (var c = b.length, d = [], e = 0; e < c; e++) {
                var f = b[e];
                f.title_id.slice(-2) === a && d.push(f)
            }
            return d
        },
        hasAllContentOf: function(a) {
            var b = this.getContents();
            if (!b || 0 === b.length || !a)
                return !1;
            for (var c = {}, d, e, f = b.length, k = function(a) {
                a === d[e] && (c[a] = !0)
            }, h = 0; h < f; h++) {
                var g = b[h];
                if (g.title_id.slice(-2) === a.getVariation())
                    for (d = g.content_indexes.content_index,
                    g = d.length,
                    e = 0; e < g; e++)
                        a.getContentIndexes().forEach(k)
            }
            b = Object.keys(c).length;
            a = a.getContentIndexes().length;
            return b === a
        },
        overlapDialogRequired: function(a) {
            var b = this.getContents();
            if (!b || 0 === b.length || !a)
                return !1;
            for (var c = b.length, d = 0; d < c; d++) {
                var e = b[d].title_id.slice(-2)
                  , f = b[d].content_indexes.content_index;
                if (e === a.getVariation() && (e = a.getContentIndexes(),
                f = _.intersection(f, e),
                0 < f.length && f.length !== e.length))
                    return !0
            }
            return !1
        }
    })
}
)();
(function() {
    Wood.Model.TitleAocs = Wood.Model.Base.extend({
        defaults: function() {
            return _.extend({
                aocs_description: ""
            }, Wood.Model.Base.DEFAULT_PARAM)
        },
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/title/" + this.title_id + "/aocs"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam()
              , c = {
                lang: this.language,
                offset: this.offset || 0,
                limit: this.limit || 25,
                sort: this.sort || "new",
                freeword: this.freeword,
                "category[]": this["category[]"],
                price_min: this.price_min,
                price_max: this.price_max
            };
            _.each(c, function(a, b) {
                "" === a && delete c[b]
            });
            $.extend(b, {
                type: "GET",
                async: !1,
                data: c,
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.title
        },
        getName: function() {
            return this.get("name")
        },
        getBannerUrl: function() {
            return this.get("aocs_banner_url")
        },
        getDescription: function() {
            return this.get("aocs_description")
        },
        getAocs: function() {
            var a = this.getSafe("aocs.aoc");
            return a ? a.map(function(a) {
                return new Wood.Model.Aoc(a)
            }) : []
        },
        getIds: function() {
            var a = this.getSafe("aocs.aoc");
            return _.map(a, function(a) {
                return a.id
            })
        },
        getTotal: function() {
            return this.getSafe("aocs.total")
        },
        getLength: function() {
            return this.getSafe("aocs.length")
        },
        isEmpty: function() {
            return 0 === this.getLength()
        },
        hasSearchWord: function() {
            return Wood.Util.isDefined(this.freeword)
        }
    })
}
)();
(function() {
    Wood.Model.AocCategoryList = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/aoc_categories"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                data: {
                    lang: this.language,
                    title: this.title_id
                },
                async: !1,
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.aoc_categories
        },
        getAocCategories: function() {
            return this.get("aoc_category_group")
        }
    })
}
)();
(function() {
    function a(a) {
        if (Wood.Util.isUndefined(a))
            throw Error("price status not stored");
    }
    Wood.Model.OnlinePrice = Wood.Model.Base.extend({
        getSalesStatus: function() {
            return this.get("eshop_sales_status")
        },
        isUnreleased: function() {
            var b = this.getSalesStatus();
            a(b);
            return "unreleased" === b
        },
        isOnSale: function() {
            var b = this.getSalesStatus();
            a(b);
            return "onsale" === b
        },
        isDownloadTerminated: function() {
            var b = this.getSalesStatus();
            a(b);
            return "download_termination" === b
        },
        isSalesTerminated: function() {
            var b = this.getSalesStatus();
            a(b);
            return "sales_termination" === b
        },
        isPreOrder: function() {
            var a = this.getPriceObj();
            return a && !0 === a.pre_order
        },
        getPriceObj: function() {
            return this.get("price")
        },
        getRawValue: function() {
            return parseFloat(this.getPriceObj().regular_price.raw_value, 10)
        },
        isEmpty: function() {
            return _.isEmpty(this.getPriceObj())
        },
        isFree: function(a) {
            return this.getLowestPrice(a).isFree()
        },
        isDiscount: function() {
            var a = this.getPriceObj();
            return a && a.discount_price
        },
        isConditional: function() {
            var a = this.getPriceObj();
            return a && a.conditional_prices
        },
        isCoupon: function() {
            var a = this.getPriceObj();
            return a && a.coupon_price
        },
        getRegularPrice: function() {
            var a = this.getPriceObj();
            return a ? new Wood.Price(a.regular_price.id,a.regular_price.raw_value,a.regular_price.amount,a.regular_price.currency,Wood.Price.DiscountType.NONE,a.regular_price.description) : null
        },
        getDiscountPrice: function() {
            var a = this.getPriceObj();
            return this.isDiscount() ? new Wood.Price(a.discount_price.id,a.discount_price.raw_value,a.discount_price.amount,a.discount_price.currency,Wood.Price.DiscountType.NORMAL,a.discount_price.description) : null
        },
        getConditionalPrices: function() {
            var a = this.getPriceObj();
            if (!this.isConditional())
                return null;
            for (var c = [], d = a.conditional_prices.conditional_price, e = d.length, f = 0; f < e; f++)
                a = d[f],
                c.push(new Wood.Price(a.id,a.raw_value,a.amount,a.currency,Wood.Price.DiscountType.CONDITIONAL,a.description));
            return c
        },
        getConditionalPrice: function(a) {
            var b = this.getPriceObj();
            if (!b || !b.conditional_prices)
                return null;
            var d = b.conditional_prices.conditional_price
              , e = d.length
              , f = {};
            b = a.length;
            for (var k = 0; k < b; k++)
                f[a[k]] = !0;
            for (a = 0; a < e; a++) {
                b = d[a];
                k = b.conditional_contents.conditional_content.length;
                for (var h = 0, g = 0; g < k; g++)
                    f[b.conditional_contents.conditional_content[g]] && h++;
                if (0 < h && h === k)
                    return new Wood.Price(b.id,b.raw_value,b.amount,b.currency,Wood.Price.DiscountType.CONDITIONAL,b.description)
            }
            return null
        },
        getCouponPrice: function() {
            var a = this.getPriceObj();
            return this.isCoupon() ? new Wood.Price(null,a.coupon_price.raw_value,a.coupon_price.amount,a.coupon_price.currency,Wood.Price.DiscountType.COUPON,null) : null
        },
        getLowestPrice: function(a) {
            return _.isArray(a) && !_.isEmpty(a) && (a = this.getConditionalPrice(a)) || (a = this.getDiscountPrice()) ? a : (a = this.getRegularPrice()) ? a : null
        }
    })
}
)();
(function() {
    Wood.Model.AocPriceList = Wood.Model.Base.extend({
        url: function() {
            var a = this.country;
            a || (a = wood.client.country);
            return Wood.UrlPrefix.SAMURAI_ORIGIN + "ws/" + a + "/aocs/prices"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, a);
            a = this.language;
            a || (a = wood.client.language);
            var c = this.ids || b.items;
            b.type = "GET";
            b.data = {
                lang: a,
                "aoc[]": c.join(",")
            };
            this.fetchJSON(b)
        },
        parse: function(a) {
            var b = this;
            _.each(a.online_prices.online_price, function(a) {
                _.defaults(a, b.constructor.DEFALT_PRICE)
            });
            return a.online_prices
        },
        getPricesInfo: function() {
            var a = this.get("online_price");
            return a && 0 !== a.length ? a : []
        },
        getPriceInfoById: function(a) {
            var b = this.getPricesInfo();
            if (0 === b.length)
                return null;
            for (var c = b.length, d = 0; d < c; d++)
                if (a === b[d].aoc_id)
                    return b[d];
            return null
        },
        getPriceInfoModelById: function(a) {
            a = this.getPriceInfoById(a) || _.defaults({
                aoc_id: a
            }, this.constructor.DEFALT_PRICE);
            return new Wood.Model.AocPrice(a)
        }
    }, {
        DEFALT_AMOUNT: "&nbsp;-&nbsp;",
        DEFALT_PRICE: {
            eshop_sales_status: "",
            price: {
                regular_price: {
                    amount: "&nbsp;-&nbsp;"
                }
            }
        }
    })
}
)();
(function() {
    Wood.Model.AocPrice = Wood.Model.OnlinePrice.extend({
        queryParamKeys: ["country", "language", "item"],
        initialize: function(a) {
            this.initByPropertyOrQuery(a);
            this.setup()
        },
        url: function() {
            var a = this.country;
            a || (a = wood.client.country);
            return Wood.UrlPrefix.SAMURAI_ORIGIN + "ws/" + a + "/aocs/prices"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, a);
            a = this.language;
            a || (a = wood.client.language);
            var c = this.id || b.item;
            b.type = "GET";
            b.data = {
                lang: a,
                "aoc[]": c
            };
            this.fetchJSON(b)
        },
        parse: function(a) {
            if ((a = a.online_prices) && 0 !== a.length && !_.isEmpty(a.online_price))
                return _.each(a, function(a) {
                    _.defaults(a, Wood.Model.AocPriceList.prototype.DEFALT_PRICE)
                }),
                a.online_price[0]
        }
    })
}
)();
(function() {
    Wood.Model.AocSizeList = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/aocs/size"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                data: {
                    lang: this.language,
                    "aoc[]": this.ids.join(",")
                },
                async: !1,
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.aocs
        },
        getSizes: function() {
            var a = this.get("aoc");
            return a ? a : []
        },
        getSizeById: function(a) {
            var b = this.getSizes();
            if (0 === b.length)
                return null;
            for (var c = b.length, d = 0; d < c; d++)
                if (b[d].id === a)
                    return b[d].data_size;
            return null
        }
    })
}
)();
(function() {
    Wood.Model.DataTitleVersionList = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/title/" + this.aoc_ns_uid + "/datatitlesVersion"
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
                    withCredentials: !1
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.title_ec_infos
        },
        getVersions: function() {
            var a = this.get("title_ec_info");
            return a ? a : []
        },
        getVersionByFunction: function(a) {
            var b = this.getVersions();
            if (0 === b.length)
                return null;
            for (var c = b.length, d = 0; d < c; d++)
                if (a(b[d]))
                    return b[d];
            return null
        },
        getVersionByTitleId: function(a) {
            return this.getVersionByFunction(function(b) {
                return b.title_id === a
            })
        },
        getVersionByVariation: function(a) {
            return this.getVersionByFunction(function(b) {
                return b.title_id.slice(-2) === a
            })
        }
    })
}
)();
(function() {
    Wood.View.Aoc.Context = function(a) {
        this.context = a
    }
    ;
    Wood.View.Aoc.Context.Type = {
        PURCHASE: "purchase",
        DETAIL: "detail",
        REDEEM: "redeem"
    };
    Wood.View.Aoc.Context.prototype = {
        isPurchase: function() {
            return this.context === Wood.View.Aoc.Context.Type.PURCHASE
        }
    };
    Wood.View.Aoc.Base = Wood.View.Base.extend({
        el: "#data03_01",
        context: null,
        hideContents: function() {
            this.$(">:not(#aoc_search)").wrap('<div class="hide-wrapper" style="display: none"></div>')
        },
        showContents: function() {
            this.$(">.hide-wrapper").children().unwrap()
        },
        afterShow: function(a, b) {
            if (this.context.isPurchase() && 2 === this.back_event_history.length) {
                var c = this.back_event_history;
                c[c.length - 1]();
                c[c.length - 1]()
            }
            this.last_scroll = $("body").scrollTop();
            this.hideContents();
            this.$el.prepend(a.el);
            Wood.DomUtil.animateToTop();
            c = function() {
                a.close()
            }
            ;
            this.context.isPurchase() && (this.menubar_history.push({
                type: this.options.controller.menuBar.type,
                back_event: this.options.controller.menuBar.back_event
            }),
            this.back_event_history.push(c));
            this.options.controller.menuBar.setup(b);
            this.options.controller.menuBar.hookBackEvent(c);
            this.options.controller.menuBar.rebuild()
        },
        afterClose: function() {
            this.options.controller.menuBar.allowScroll();
            _.isFunction(this.updateAocsView) && this.updateAocsView();
            this.showContents();
            Wood.DomUtil.animateToTop(this.last_scroll);
            if (this.context.isPurchase() && 0 < this.menubar_history.length) {
                this.back_event_history.pop();
                var a = this.menubar_history.pop();
                var b = a.type;
                a = a.back_event
            } else
                b = Wood.View.MenuBar.Type.DEFAULT,
                a = this.options.controller.back_event;
            this.options.controller.setupMenu(b);
            this.options.controller.menuBar.hookBackEvent(a);
            this.options.controller.menuBar.rebuild()
        },
        showDetail: function(a) {
            a = this.detail_view = new Wood.View.Aoc.Detail({
                model: {
                    aoc: a.aoc,
                    price: a.price
                },
                size: this.model.size.getSizeById(a.aoc.getId()),
                title_id: this.options.title_id,
                checked: a.checked,
                checklist_confirm_view: this.list_view.checklist_confirm_view || null,
                parent_view: this,
                presentedBase: a.presented
            });
            a.render();
            this.listenTo(a, "close", this.closeDetail);
            this.listenTo(a, "download", this.download);
            this.listenTo(a, "toggleCheck", this.updateChecklist);
            this.afterShow(a, Wood.View.MenuBar.Type.CLOSE)
        },
        closeDetail: function() {
            this.afterClose()
        },
        download: function(a) {
            a = a.aoc;
            this.model.owned.overlapDialogRequired(a) && !wood.client.confirm($("#dialog_msg_overlapped").text(), $("#dialog_confirm_cancel").text(), $("#dialog_confirm_ok").text()) || wood.client.redirectTo("buy01_01.html", {
                type: "aoc",
                seq: this.context.context || "",
                title: this.options.title_id,
                "aoc[]": a.getId()
            })
        },
        updateChecklist: function(a) {
            this.list_view.updateChecklist(a);
            var b = this;
            this.updateAocsView = _.once(function() {
                b.list_view.renderMainView()
            })
        },
        updateDetailCheck: function() {
            this.detail_view && (this.detail_view.checked = !1,
            this.detail_view.render())
        }
    })
}
)();
(function() {
    Wood.View.Aoc.Data03_01 = Wood.View.Aoc.Base.extend({
        template: Wood.Template.get("aoc_list", "#wrapper"),
        context: new Wood.View.Aoc.Context(Wood.View.Aoc.Context.Type.PURCHASE),
        initialize: function() {
            this.setup();
            this.render()
        },
        presenter: function() {
            return {
                legal_message_required: wood.client.isLegalBusinessMessageRequired(),
                title_id: this.options.title_id,
                is_aoc_purchase: this.context.isPurchase()
            }
        },
        afterRender: function() {
            this.localizeText();
            this.hookSE();
            this.list_view = new Wood.View.Aoc.List.Main({
                el: this.$el,
                model: this.model,
                controller: this.options.controller,
                parent_view: this,
                title_id: this.options.title_id,
                context: this.context
            });
            this.listenTo(this.options.controller, "showUpdateConfirm", this.showUpdateConfirm);
            var a = this;
            this.back_event = function() {
                var b = a.list_view.checklist;
                if (b && 0 < b.length && !wood.client.confirm($("#dialog_confirm_exit").text(), $("#dialog_confirm_cancel").text(), $("#dialog_confirm_exit_ok").text()))
                    return !1;
                a.options.controller.back_event()
            }
            ;
            this.options.controller.menuBar.hookBackEvent(this.back_event);
            this.options.controller.menuBar.rebuild();
            this.menubar_history = [];
            this.back_event_history = []
        },
        setSort: function(a) {
            this.list_view.setSort(a)
        },
        setFreeword: function(a) {
            this.freeword = a
        },
        showSearch: function() {
            this.search_view ? this.search_view.$el.show() : (this.search_view = new Wood.View.Aoc.Search({
                model: this.model.categories
            }),
            this.search_view.render(),
            this.listenTo(this.search_view, "close", this.closeSearch),
            this.listenTo(this.search_view, "search", this.search),
            this.freeword && this.search_view.setFreeword(this.freeword));
            this.afterShow(this.search_view, Wood.View.MenuBar.Type.AOC_SEARCH)
        },
        closeSearch: function() {
            this.afterClose();
            this.search_view.$el.hide()
        },
        search: function(a) {
            this.list_view.search(a)
        },
        showChecklist: function(a) {
            a = new Wood.View.Aoc.Check.Main(_.extend({
                parent_view: this,
                title_id: this.options.title_id
            }, a));
            a.render();
            this.listenTo(a, "close", this.closeChecklist);
            this.afterShow(a, Wood.View.MenuBar.Type.DEFAULT)
        },
        closeChecklist: function() {
            this.list_view.renderMainView();
            this.afterClose()
        }
    })
}
)();
(function() {
    Wood.View.Aoc.Detail = Wood.View.Base.extend({
        id: "main-detail",
        template: Wood.Template.get("aoc_detail", "#wrapper"),
        events: {
            "click .redeem": "onClickDownload",
            "click .purchase": "onClickCheck"
        },
        initialize: function() {
            this.setup();
            this.checked = this.options.checked
        },
        presenter: function() {
            var a = this.model.aoc
              , b = $("#str_size").html().replace("%{0}", Wood.DomUtil.createSizeHTML(this.options.size, wood.client.language, wood.client.getRegion()));
            a = Wood.URL.create("data02_03.html", {
                title: this.options.title_id,
                aoc: a.getId()
            });
            b = {
                data_size: b,
                url_mov: a,
                checked: this.checked ? "checked" : ""
            };
            _.defaults(b, this.options.presentedBase);
            return b
        },
        afterRender: function() {
            var a = this.options.checklist_confirm_view;
            if (a) {
                a = new Wood.View.Aoc.List.Checklist({
                    model: a.model,
                    collection: a.collection
                });
                a.setElement(this.$(".checklist")).render();
                var b = this.options.parent_view;
                b.listenTo(a, "showChecklist", b.showChecklist)
            }
            this.$checkbox = this.$(".purchase");
            Wood.DomUtil.lazyload(this.$("img.lazy"));
            this.localizeText();
            this.hookSE()
        },
        close: function() {
            this.$el.off();
            this.remove();
            this.trigger("close")
        },
        onClickDownload: function(a) {
            a.preventDefault();
            this.trigger("download", {
                aoc: this.model.aoc
            })
        },
        onClickCheck: function(a) {
            a.preventDefault();
            this.toggleCheck();
            this.trigger("toggleCheck", {
                checked: this.checked,
                caller: this,
                aoc: this.model.aoc,
                price: this.model.price,
                lowest_price: this.model.price.getLowestPrice(),
                presented: this.options.presentedBase
            })
        },
        toggleCheck: function() {
            this.checked = !this.checked;
            this.$checkbox.toggleClass("checked")
        }
    })
}
)();
(function() {
    Wood.View.Aoc.Search = Wood.View.Base.extend({
        id: "aoc_search",
        template: Wood.Template.get("aoc_search", "#wrapper"),
        events: {
            "click .evt_search": "onClickSearch",
            "click .reset-price": "onClickResetPrice",
            "click .reset-all": "onClickResetAll",
            "click li.all > *": "onChangeCategoryAll",
            "click li:not(.all) > *": "onChangeCategory"
        },
        presenter: function() {
            return {
                data: this.model.attributes
            }
        },
        afterRender: function() {
            this.localizeText();
            this.hookSE();
            this.$price_min = this.$("input[name='AOC_priceMin']");
            this.$price_max = this.$("input[name='AOC_priceMax']");
            this.$freeword = this.$("input[name='AOC_freeword']");
            this.$category_all = this.$("li.all > input");
            this.$category_each = this.$("li:not(.all) > input");
            this.$category_all.prop("checked", !0);
            this.$price_min.attr("placeholder", $("#str_priceMin").text());
            this.$price_max.attr("placeholder", $("#str_priceMax").text());
            this.$freeword.attr("placeholder", $("#str_freeword").text())
        },
        setFreeword: function(a) {
            this.$freeword.val(a)
        },
        close: function() {
            this.trigger("close")
        },
        onClickSearch: function(a) {
            a.preventDefault();
            a = this.$category_each.filter(":checked").map(function() {
                return $(this).val()
            }).get().join(",");
            a = {
                freeword: this.$freeword.val(),
                "category[]": a,
                price_min: this.$price_min.val(),
                price_max: this.$price_max.val()
            };
            this.trigger("search", a);
            this.close()
        },
        onClickResetPrice: function(a) {
            a.preventDefault();
            this.$price_min.val("");
            this.$price_max.val("")
        },
        onClickResetAll: function(a) {
            a.preventDefault();
            this.$price_min.val("");
            this.$price_max.val("");
            this.$freeword.val("");
            this.$category_all.prop("checked", !0);
            this.$category_each.prop("checked", !1)
        },
        onChangeCategoryAll: function(a) {
            a = $(a.currentTarget);
            a.prop("checked") ? a.parent().nextAll().find("input").prop("checked", !1) : a.prop("checked", !0)
        },
        onChangeCategory: function(a) {
            a = $(a.currentTarget);
            var b = a.parent().parent().find("li.all input");
            a.prop("checked") ? b.prop("checked", !1) : 0 === a.parent().parent().find("li:not(.all) input:checked").size() && b.prop("checked", !0)
        }
    })
}
)();
(function() {
    Wood.View.Aoc.List.Main = Wood.View.Base.extend({
        initialize: function() {
            this.setup();
            _.each({
                loadedInitialModel: this.renderInitialView,
                movePage: this.movePage
            }, function(a, b) {
                this.listenTo(this.options.controller, b, a)
            }, this);
            this.$main = this.$("#main");
            this.$main_disable = this.$("#main-disable");
            this.$footer = this.$("#footer");
            this.$item_ul = this.$(".item ul");
            this.$pagenation_top = this.$("#main > .pagenation");
            this.pagenationView = new Wood.View.Common.Pagination;
            this.pagenationView.store_history = !1
        },
        renderInitialView: function() {
            this.header_view = new Wood.View.Aoc.List.Header({
                model: this.model,
                context: this.options.context
            });
            this.header_view.setElement(this.$("#header")).render();
            this.listenTo(this.header_view, "sortSelected", this.resetCurrentPage);
            this.sort_option && this.header_view.setSort(this.sort_option);
            var a = this.options.parent_view;
            a.listenTo(this.header_view, "showSearch", a.showSearch);
            this.checklist = new Wood.Collection.AocCheckList;
            this.checklist_confirm_view = new Wood.View.Aoc.List.Checklist({
                model: this.model.title_aocs,
                collection: this.checklist
            });
            this.checklist_confirm_view.setElement(this.$(".checklist")).render();
            a.listenTo(this.checklist_confirm_view, "showChecklist", a.showChecklist);
            this.listenTo(this.model.title_aocs, "sync", this.renderAocsView);
            this.renderAocsView()
        },
        renderMainView: function() {
            var a = this.options.parent_view
              , b = Wood.Template.get("aoc_list", "#item")
              , c = this.model.aocs;
            this.$main.off();
            this.pagenationView.setTotalCount(this.model.title_aocs.getTotal());
            this.pagenationView.setElement(this.$(".pagenation")).render();
            this.$item_ul.empty();
            this.item_views && _.each(this.item_views, function(a) {
                a.remove()
            });
            this.item_views = [];
            var d = this;
            _.each(c, function(c) {
                c = new Wood.View.Aoc.List.Item({
                    model: {
                        owned: d.model.owned,
                        price: d.model.price.getPriceInfoModelById(c.getId()),
                        aoc: c
                    },
                    template: b,
                    title_id: d.options.title_id,
                    checked: d.checklist ? !!d.checklist.get(c.id) : !1,
                    context: d.options.context
                });
                d.$item_ul.append(c.render().el);
                a.listenTo(c, "showDetail", a.showDetail);
                a.listenTo(c, "download", a.download);
                d.listenTo(c, "toggleCheck", d.updateChecklist);
                d.item_views.push(c)
            });
            this.$footer.show();
            _.isFunction(this.afterRenderMainView) && this.afterRenderMainView.call(this)
        },
        setSort: function(a) {
            this.sort_option = a
        },
        movePage: function(a) {
            this.afterRenderMainView = function() {
                Wood.DomUtil.animateToTop(this.$pagenation_top.offset().top);
                this.afterRenderMainView = null
            }
            ;
            var b = this.pagenationView.pagenation;
            b.setCurrentPage(a);
            this.setTitleAocsParam({
                offset: b.getOffset()
            })
        },
        resetCurrentPage: function(a) {
            this.options.controller.goToFirstPage();
            this.pagenationView.pagenation.setCurrentPage(1);
            this.setTitleAocsParam({
                offset: 0,
                sort: a
            })
        },
        search: function(a) {
            this.options.controller.goToFirstPage();
            this.pagenationView.pagenation.setCurrentPage(1);
            this.setTitleAocsParam(_.extend({
                offset: 0
            }, a))
        },
        setTitleAocsParam: function(a) {
            wood.client.disableUserOperation();
            this.model.title_aocs.setParam(a);
            this.model.title_aocs.fetch({
                async: !0
            })
        },
        renderAocsView: function() {
            var a = this.model.title_aocs;
            if (0 === a.getTotal())
                this.$main.hide(),
                this.$main_disable.show(),
                this.header_view.setDisableSortList(!0),
                wood.client.enableUserOperation();
            else {
                var b = this
                  , c = this.model
                  , d = {
                    ids: a.getIds()
                };
                c.aocs = a.getAocs();
                c.price.setParam(d);
                c.size.setParam(d);
                $.when(c.price.getPromise(), c.size.getPromise()).done(function() {
                    b.$main.show();
                    b.$main_disable.hide();
                    b.header_view.setDisableSortList(!1);
                    b.renderMainView();
                    wood.client.enableUserOperation()
                })
            }
        },
        updateChecklist: function(a) {
            a.checked ? (wood.client.playSound("SE_WAVE_CHECKBOX_CHECK"),
            10 <= this.checklist.length ? (wood.client.alert($("#dialog_msg_limit").text(), $("#dialog_msg_ok").text()),
            a.caller.toggleCheck()) : this.checklist.add(new Wood.Model.AocCheck(_.extend({
                aoc: a.aoc,
                price: a.price,
                lowest_price: a.lowest_price
            }, a.presented)))) : (wood.client.playSound("SE_WAVE_CHECKBOX_UNCHECK"),
            this.checklist.remove(a.presented.id))
        }
    })
}
)();
(function() {
    Wood.View.Aoc.List.Item = Wood.View.Base.extend({
        tagName: "li",
        events: {
            "click .outline": "onClickShowDetail",
            "click .redeem": "onClickDownload",
            "click .purchase": "onClickCheck"
        },
        initialize: function() {
            this.setup();
            this.checked = this.options.checked
        },
        presenter: function() {
            var a = this.model.owned
              , b = this.model.price
              , c = this.model.aoc;
            this.options.context.isPurchase();
            var d = b.getDiscountPrice();
            var e = b.isDiscount()
              , f = null;
            if (e) {
                var k = b.getRegularPrice().getAmount();
                f = Wood.DomUtil.getTaxTextWithPriceObject(d)
            } else
                k = Wood.DomUtil.getTaxTextWithPriceObject(b.getRegularPrice());
            var h = d ? d.getDescription() : null
              , g = !!c.getPromotionMovieUrl()
              , m = this.checked ? "checked" : ""
              , l = c.getScreenshotURLs()
              , n = (d = this.options.context.isPurchase()) ? "purchase" : "redeem";
            d ? (b = wood.client.getAocPurchaseStatus(this.options.title_id, c, b),
            a = b.isOkOrDownloadable(),
            b = b.getText()) : b = (a = a.hasAllContentOf(c) ? !1 : !0) ? $("#str_DL").html() : $("#str_purchased").html();
            return this.presented = _.extend({
                is_aoc_purchase: d,
                regular_price: k,
                discount_price: f,
                discount_description: h,
                downloadable: a,
                purchase_status_str: b,
                screenshot_urls: l,
                mov_disp: g,
                is_discount: e,
                checked: m,
                context: n
            }, this.model.aoc.attributes)
        },
        afterRender: function() {
            Wood.DomUtil.lazyload(this.$(".image img"));
            this.$checkbox = this.$(".purchase");
            this.localizeText();
            this.hookSE()
        },
        onClickShowDetail: function(a) {
            a.preventDefault();
            this.trigger("showDetail", {
                checked: this.checked,
                aoc: this.model.aoc,
                price: this.model.price,
                presented: this.presented
            })
        },
        onClickDownload: function(a) {
            a.preventDefault();
            this.trigger("download", {
                aoc: this.model.aoc
            })
        },
        onClickCheck: function(a) {
            a.preventDefault();
            this.toggleCheck();
            this.trigger("toggleCheck", {
                checked: this.checked,
                caller: this,
                aoc: this.model.aoc,
                price: this.model.price,
                lowest_price: this.model.price.getLowestPrice(),
                presented: this.presented
            })
        },
        toggleCheck: function() {
            this.checked = !this.checked;
            this.$checkbox.toggleClass("checked")
        }
    })
}
)();
(function() {
    Wood.View.Aoc.List.Header = Wood.View.Base.extend({
        template: Wood.Template.get("aoc_list", "#header"),
        events: {
            "change #sort_select": "sortSelected",
            "click #header_search": "search"
        },
        presenter: function() {
            var a = this.model.title_aocs;
            a = {
                aocs_banner_url: "",
                str_title_desc: $("#str_attention").html().replace("%{title}", a.getName()),
                is_aoc_purchase: this.options.context.isPurchase()
            };
            _.extend(a, this.model.title_aocs.attributes);
            return a
        },
        afterRender: function() {
            Wood.DomUtil.lazyload("#sel_banner");
            this.localizeText(this.$(".search"));
            this.hookSE();
            this.$sort_select = this.$("#sort_select")
        },
        setSort: function(a) {
            this.$sort_select.val(a)
        },
        sortSelected: function() {
            this.trigger("sortSelected", this.$sort_select.val())
        },
        search: function(a) {
            a.preventDefault();
            this.trigger("showSearch")
        },
        setDisableSortList: function(a) {
            this.$sort_select.prop("disabled", a)
        }
    })
}
)();
(function() {
    Wood.View.Aoc.List.Checklist = Wood.View.Base.extend({
        template: Wood.Template.get("aoc_list", "#checklist"),
        events: {
            "click .evt_confirm_checklist": "showChecklist"
        },
        initialize: function() {
            this.setup();
            this.listenTo(this.model, "change:aocs", this.render);
            this.listenTo(this.collection, "all", this.render)
        },
        presenter: function() {
            var a = wood.client.getText("shelf01_01_002").replace("%{0}", this.model.getTotal())
              , b = wood.client.getText("data03_01_011") + this.collection.length;
            return {
                str_aocs_total: a,
                str_checked_num: b
            }
        },
        showChecklist: function(a) {
            a.preventDefault();
            wood.client.disableUserOperation();
            _.delay(function() {
                wood.client.enableUserOperation()
            }, 500);
            this.trigger("showChecklist", {
                collection: this.collection
            })
        }
    })
}
)();
(function() {
    Wood.View.Aoc.Check.Item = Wood.View.Base.extend({
        tagName: "li",
        events: {
            "click .outline": "onClickShowDetail",
            "click .delete": "onClickDelete"
        },
        presenter: function() {
            return this.options.presented
        },
        afterRender: function() {
            Wood.DomUtil.lazyload(this.$(".image img"));
            this.localizeText();
            this.hookSE()
        },
        onClickShowDetail: function(a) {
            a.preventDefault();
            this.trigger("showDetail", {
                checked: !0,
                aoc: this.presented.aoc,
                price: this.presented.price,
                presented: this.presented,
                from_checklist: !0
            })
        },
        onClickDelete: function(a) {
            a.preventDefault();
            wood.client.disableUserOperation();
            _.delay(function() {
                wood.client.enableUserOperation()
            }, 500);
            this.collection.remove(this.options.presented.id);
            this.trigger("deleteChecked")
        }
    })
}
)();
(function() {
    Wood.View.Aoc.Check.Main = Wood.View.Base.extend({
        id: "aoc_checklist",
        template: Wood.Template.get("aoc_checklist", "#wrapper"),
        events: {
            "click .next": "onClickNext"
        },
        initialize: function() {
            this.setup();
            this.listenTo(this.collection, "remove", this.render);
            this.listenTo(this.collection, "add", this.render)
        },
        presenter: function() {
            var a = this.collection.length
              , b = wood.client.getText("data03_01_011") + a;
            return {
                checked_num: a,
                str_checked_num: b
            }
        },
        afterRender: function() {
            this.$item_ul = this.$(".item ul");
            this.$item_ul.empty();
            this.item_views && _.each(this.item_views, function(a) {
                a.remove()
            });
            this.item_views = [];
            var a = this
              , b = Wood.Template.get("aoc_checklist", "#item")
              , c = this.options.parent_view;
            this.collection.each(function(d) {
                d = new Wood.View.Aoc.Check.Item({
                    template: b,
                    collection: a.collection,
                    presented: d.attributes
                });
                c.listenTo(d, "showDetail", c.showDetail);
                c.listenTo(d, "deleteChecked", c.updateDetailCheck);
                a.$item_ul.append(d.render().el);
                a.item_views.push(d)
            });
            this.localizeText();
            this.hookSE()
        },
        onClickNext: function(a) {
            a.preventDefault();
            var b = this.collection.map(function(a) {
                return a.get("aoc")
            })
              , c = this.collection.map(function(a) {
                return a.get("lowest_price").getRawValueText()
            });
            if (function(a) {
                var b = a.length, c, d;
                for (c = 0; c < b; c++) {
                    var e = a[c].getVariation();
                    for (d = c + 1; d < b; d++)
                        if (e === a[d].getVariation() && a[c].isOverlap(a[d].getContentIndexes()))
                            return !0
                }
                return !1
            }(b))
                wood.client.alert($("#dialog_msg_overlap_not_allowed").text(), $("#dialog_msg_ok").text());
            else {
                a = this.options.title_id;
                var d = wood.client.getOwnedContents(a);
                b = _.map(b, function(a) {
                    return d.overlapDialogRequired(a)
                });
                if (!_.some(b) || wood.client.confirm($("#dialog_msg_overlapped").text(), $("#dialog_confirm_cancel").text(), $("#dialog_confirm_ok").text())) {
                    var e = "0";
                    _.each(c, function(a) {
                        e = Wood.Price.priceAdd(e, a)
                    });
                    c = wood.client.getSessionStorage().getItem("max_cash");
                    b = wood.client.getSessionStorage().getItem("max_cash_str");
                    Wood.Price.isNegative(Wood.Price.priceSub(c, e)) ? wood.client.alert($("#dialog_msg_cash_over").text().replace("%{price}", b), $("#dialog_msg_ok").text()) : (c = this.collection.map(function(a) {
                        return a.get("id")
                    }),
                    wood.client.redirectTo("buy01_01.html", {
                        type: "aoc",
                        title: a,
                        "aoc[]": c.join(",")
                    }))
                }
            }
        },
        close: function() {
            this.$el.off();
            this.remove();
            this.trigger("close")
        }
    })
}
)();
(function() {
    Wood.Controller.Aoc = Wood.Controller.Base.extend({
        dl_items: [],
        is_aoc_broken: !1,
        is_size_over: !1,
        getVersionList: function(a, b) {
            a = this.generateModel("DataTitleVersionList", {
                country: a.country,
                language: a.language,
                aoc_ns_uid: b
            });
            a.fetch();
            return a
        },
        isUpdateNeeded: function(a, b, c) {
            var d = this.getVersionList(a, b)
              , e = this.dl_items = [];
            d = d.getVersions();
            var f = d.length;
            Wood.log("Wood.Controller.Aoc#isUpdateNeeded : " + b);
            b = function(a) {
                return a.content_indexes.content_index
            }
            ;
            if (!a.isWiiU())
                return !1;
            for (var k = 0; k < f; k++) {
                var h = d[k]
                  , g = h.title_id;
                h = h.title_version;
                var m = g.slice(-2);
                Wood.log("=====================================");
                Wood.log("remote_title_id      : " + g);
                Wood.log("remote_title_version : " + h);
                m = c.getContentsByVariation(m);
                Wood.log("local_matched_contents : " + JSON.stringify(m, null, "    "));
                var l = wiiuDevice.getTicketInfo(g);
                Wood.log("getTicketInfo : " + JSON.stringify(l, null, "    "));
                a.shutdownIfError(l);
                if (0 !== m.length || l.hasCommonTicket)
                    if (l.hasPersonalTicket || l.hasCommonTicket) {
                        l = wiiuEC.getDownloadTaskState(g);
                        Wood.log("getDownloadTaskState : " + JSON.stringify(l, null, "    "));
                        a.shutdownIfError(l);
                        l.registerd && l.titleVersion < h && (Wood.DomUtil.hideBody(),
                        a.alert($("#dialog_msg_DL").text(), $("#dialog_msg_ok").text()),
                        a.historyBack());
                        var n = wiiuDevice.getTitleInstallState(g);
                        Wood.log("getTitleInstallState : " + JSON.stringify(n, null, "    "));
                        a.shutdownIfError(n);
                        if (n.installed) {
                            var q = parseInt(n.version, 10);
                            m = _.chain(m).map(b).flatten().uniq().value();
                            Wood.log("content_index : " + JSON.stringify(m, null, "    "));
                            if (q < h && l && !1 === l.registerd) {
                                Wood.log("NEED AOC UPDATE : new ver." + h + "installed ver." + n.version);
                                var p = {
                                    title_id: String(g),
                                    title_version: String(h),
                                    content_index: m
                                };
                                e.push(p)
                            } else
                                m = JSON.stringify({
                                    indexes: m
                                }),
                                g = wiiuEC.getAocInstallInfo(String(g), String(h), m),
                                Wood.log("wiiuEC.getAocInstallInfo returns: " + JSON.stringify(g)),
                                a.shutdownIfError(g);
                            Wood.log("dl_item : " + JSON.stringify(p, null, "    "))
                        }
                    }
            }
            return 0 < e.length
        },
        updateAOC: function(a, b) {
            Wood.log("Wood.Controller.Aoc#updateAOC");
            a.isWiiU() && (a.isDefinedShowLoadingDialog() ? (a.disableHomeButton(),
            this.registerAoc(a),
            a.enableHomeButton()) : a.confirm($("#dialog_msg_update").text(), $("#dialog_confirm_later").text(), $("#dialog_confirm_update").text()) && a.redirectTo("buy01_01.html", {
                type: "aoc",
                title: b
            }))
        },
        registerAoc: function(a) {
            Wood.log("Wood.Controller.Aoc#registerAoc");
            this.checkAOCSize(a);
            if (!this.is_aoc_broken)
                if (this.is_size_over)
                    a.alert($("#dialog_msg_size_over").text(), $("#dialog_msg_ok").text());
                else {
                    var b = wiiuEC.getDownloadTaskListState();
                    Wood.log("getDownloadTaskListState : " + JSON.stringify(b, null, "    "));
                    a.shutdownIfError(b);
                    0 < b.remainingTaskNum && (a.showLoadingDialog($("#dialog_msg_updating").text()),
                    _.each(this.dl_items, function(b) {
                        Wood.log("item : " + JSON.stringify(b, null, "    "));
                        b = wiiuEC.registerAocDownloadTask(b.title_id, b.title_version, '{"indexes":[]}');
                        Wood.log("registerAocDownloadTask : " + JSON.stringify(b, null, "    "));
                        a.shutdownIfError(b)
                    }),
                    a.hideLoadingDialog())
                }
        },
        checkAOCSize: function(a) {
            Wood.log("Wood.Controller.Aoc#checkAOCSize");
            var b = 0
              , c = this;
            _.each(c.dl_items, function(d) {
                var e = JSON.stringify({
                    indexes: d.content_index
                });
                d = wiiuEC.getAocInstallInfo(d.title_id, d.title_version, e);
                Wood.log("wiiuEC.getAocInstallInfo returns: " + JSON.stringify(d));
                a.shutdownIfError(d);
                c.isAOCBroken(d) && (Wood.log("is_aoc_broken: true"),
                c.is_aoc_broken = !0);
                b += parseInt(d.installSize, 10);
                parseInt(d.storageSize, 10) < b && (Wood.log("is_size_over"),
                c.is_size_over = !0)
            })
        },
        isAOCBroken: function(a) {
            return a && a.error ? _.contains([1050606, 1114640, 1114641, 1114693], a.error.code) : !1
        }
    })
}
)();
(function() {
    Wood.Controller.Data03_01 = Wood.Controller.Aoc.extend({
        routes: _.defaults({
            "page/:page": "changePage"
        }, Wood.Controller.ROUTES),
        goToFirstPage: function() {
            this.navigate("#page/1", {
                replace: !0
            })
        },
        preparePage: function(a, b) {
            this.title_id = this.parseParam().title.replace(/#.*/, "");
            this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
            this.back_event = this.createAppJumpBackEvent(a, b);
            this.menuBar.hookBackEvent(this.back_event);
            wood.client.disableUserOperation();
            this.hideMenuBar();
            wood.client.showLoadingIcon();
            wood.client.initPurchaseInfo()
        },
        onPageShow: function() {
            wood.client.allowLoadingIcon()
        },
        onPageShowCache: function() {
            this.isMymenuOpen || "true" === wood.client.getSessionStorage().getItem(Wood.Client.StorageKey.AOC_EDITING) || (Wood.DomUtil.hideBody(),
            this.reloadWithoutHash())
        },
        run: function(a, b) {
            var c = {}
              , d = this;
            c.title = new Wood.Model.TitleInfomation({
                ns_uid: this.title_id
            });
            c.owned = new Wood.Model.OwnedContents({
                title_id: this.title_id
            });
            c.title_aocs = new Wood.Model.TitleAocs({
                country: wood.client.country,
                language: wood.client.language,
                title_id: this.title_id,
                afterError: function() {
                    wood.client.historyBack()
                }
            });
            c.categories = new Wood.Model.AocCategoryList({
                country: wood.client.country,
                language: wood.client.language,
                title_id: this.title_id
            });
            c.data_titles = new Wood.Model.DataTitleVersionList({
                country: wood.client.country,
                language: wood.client.language,
                aoc_ns_uid: this.title_id
            });
            b = {
                country: wood.client.country,
                language: wood.client.language
            };
            c.price = new Wood.Model.AocPriceList(b);
            c.size = new Wood.Model.AocSizeList(b);
            this.view = new Wood.View.Aoc.Data03_01({
                model: c,
                title_id: d.title_id,
                controller: d
            });
            var e = this.parseParam();
            b = e.sort;
            e = e.search_word;
            _.contains(["new", "name", "popular"], b) && (c.title_aocs.setParam({
                sort: b
            }),
            this.view.setSort(b));
            e && c.title_aocs.setParam({
                freeword: e
            });
            $.when(c.title.getPromise(), c.owned.getPromise(), c.title_aocs.getPromise(), c.categories.getPromise(), c.data_titles.getPromise()).done(function() {
                wood.client.hideLoadingIcon();
                d.limitAge(c.title, Wood.Rating.ActionType.PURCHACE);
                d.limitParentalControl(c.title);
                !c.title_aocs.hasSearchWord() && c.title_aocs.isEmpty() ? (wood.client.alert($("#dialog_msg_nocontent").text(), $("#dialog_msg_ok").text()),
                d.back_event()) : (wood.client.setOwnedContents(c.owned, d.title_id),
                wood.client.setDataTitleVersions(c.data_titles, d.title_id),
                d.isUpdateNeeded(a, d.title_id, c.owned) && d.updateAOC(a, d.title_id),
                Wood.Analytics.addDirectoryAttr(d.getDirectoryBeaconParam()).sendVirtualPV("VP_AOC_List"),
                wood.client.getSessionStorage().setItem(Wood.Client.StorageKey.AOC_EDITING, "true"),
                d.showMenuBar(),
                d.trigger("loadedInitialModel"))
            })
        },
        changePage: function(a) {
            a = a ? parseInt(a, 10) : 1;
            this.called_runroot || this.runRoot();
            this.trigger("movePage", a);
            this.menuBar.removeClassBackButton()
        }
    })
}
)();
