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
(function() {
    Wood.Model.Search = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + wood.client.country + "/" + this.search_type
        },
        use_store: !0,
        initialize: function(a) {
            this.search_type = a.search_type;
            this.query_param = a.query_param;
            this.limit = 25;
            this.page = 1;
            this.setup()
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, a);
            var c = this.query_param;
            Wood.Util.isDefined(a) && (Wood.Util.isDefined(b.sort_id) && (this.sort_id = b.sort_id,
            c.sort = b.sort_id),
            Wood.Util.isDefined(b.offset) ? (c.offset = b.offset,
            this.page = this.getPageNumber(this.limit)) : (c.offset = 0,
            this.page = 1));
            c.lang = wood.client.language;
            c.limit = this.limit;
            b.data = c;
            this.fetchJSON(b)
        },
        parse: function(a) {
            var b = this;
            b.items = [];
            Wood.Util.each(a.contents.content, function(a, d) {
                Wood.Util.isDefined(d.title) && (a = d.title,
                a = {
                    id: parseInt(a.id, 10),
                    device: a.platform.device,
                    eshop_sales: a.eshop_sales,
                    retail_sales: a.retail_sales,
                    in_app_purchase: a.in_app_purchase
                },
                b.items.push(a))
            });
            return a
        },
        getIDs: function() {
            return this.items.map(function(a) {
                return a.id
            })
        },
        getTotalCount: function() {
            return Wood.Util.isDefined(this.attributes.contents.total) ? parseInt(this.attributes.contents.total, 10) : 0
        },
        getShelfContents: function() {
            return this.attributes.contents.content
        },
        getPageNumber: function(a) {
            a = Math.ceil(this.attributes.query_param.offset / a);
            return 0 === a ? 1 : a + 1
        }
    })
}
)();
(function() {
    Wood.Model.Shelf = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + wood.client.country + "/directory/" + (_.isString(this.alias) ? "~" + this.alias : this.dir_id)
        },
        use_store: !0,
        initialize: function(a) {
            this.dir_id = a.dir_id;
            this.alias = a.alias;
            this.query_param = {};
            this.limit = 25;
            this.page = 1;
            this.setup()
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, a);
            a = this.query_param;
            Wood.Util.isDefined(b.sort_id) && (this.sort_id = b.sort_id,
            a.sort = b.sort_id);
            Wood.Util.isDefined(b.offset) ? (a.offset = this.offset = b.offset,
            this.page = this.getPageNumber(this.limit)) : (a.offset = this.offset = 0,
            this.page = 1);
            a.lang = wood.client.language;
            b.type = "GET";
            b.data = a;
            this.fetchJSON(b)
        },
        parse: function(a) {
            var b = this
              , c = [];
            b.items = [];
            Wood.Util.isDefined(a.directory.contents.content) && Wood.Util.each(a.directory.contents.content, function(a, c) {
                Wood.Util.isDefined(c.title) && (a = c.title,
                a = {
                    id: parseInt(a.id, 10),
                    device: a.platform.device,
                    eshop_sales: a.eshop_sales,
                    retail_sales: a.retail_sales,
                    in_app_purchase: a.in_app_purchase
                },
                b.items.push(a))
            });
            return c = a.directory
        },
        getIDs: function() {
            return this.items.map(function(a) {
                return a.id
            })
        },
        getShelfName: function() {
            return this.get("name")
        },
        getDescription: function() {
            return this.get("description")
        },
        isComponentAny: function() {
            return "any" === this.get("component")
        },
        isComponentMovie: function() {
            return "movie" === this.get("component")
        },
        getTotalCount: function() {
            return Wood.Util.isDefined(this.attributes.contents.total) ? parseInt(this.attributes.contents.total, 10) : 0
        },
        getShelfContents: function() {
            return this.attributes.contents.content
        },
        getPageNumber: function(a) {
            a = Math.ceil(this.offset / a);
            return 0 === a ? 1 : a + 1
        }
    })
}
)();
(function() {
    Wood.Model.CouponTitles = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + wood.client.country + "/coupon/" + this.coupon_id + "/titles"
        },
        initialize: function(a) {
            this.coupon_id = a.coupon_id;
            this.afterError = a.afterError;
            this.limit = 25;
            this.page = 1;
            this.setup()
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, a);
            a = {
                lang: wood.client.language,
                limit: this.limit
            };
            Wood.Util.isDefined(b.offset) ? (a.offset = this.offset = b.offset,
            this.page = this.getPageNumber(this.limit)) : (a.offset = this.offset = 0,
            this.page = 1);
            $.extend(b, {
                type: "GET",
                data: a,
                async: !1,
                xhrFields: {
                    withCredentials: !1
                }
            });
            this.fetchJSON(b)
        },
        parse: function(a) {
            var b = this
              , c = [];
            b.items = [];
            _.each(a.contents.content, function(a) {
                a = a.title;
                b.items.push({
                    id: a.id,
                    device: a.platform.device,
                    eshop_sales: a.eshop_sales,
                    retail_sales: a.retail_sales,
                    in_app_purchase: a.in_app_purchase
                })
            });
            return c = a.contents
        },
        getIDs: function() {
            return this.items.map(function(a) {
                return a.id
            })
        },
        getTotalCount: function() {
            return this.get("total")
        },
        getShelfContents: function() {
            return this.get("content")
        },
        getPageNumber: function(a) {
            a = Math.ceil(this.offset / a);
            return 0 === a ? 1 : a + 1
        }
    })
}
)();
(function() {
    Wood.Model.OwnedCoupon = Wood.Model.CouponBase.extend({
        isTargetTypeAll: function() {
            return "AllTitle" === this.getTargetType()
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.OwnedCoupon, {
        isUseAtOnce: "use_at_once_flag",
        getDiscountInfo: "discount_info.amount",
        getImage: "image",
        getId: "id",
        getInstanceCode: "instance_code",
        getDescription: "description",
        getTargetType: "target_type",
        getName: "name"
    })
}
)();
(function() {
    Wood.Model.OwnedCoupons = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/owned_coupons"
        },
        use_store: !0,
        fetch: function(a) {
            var b = this.getBaseAjaxParam()
              , c = {};
            this.ns_uid && (c.ns_uid = this.ns_uid);
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
        parse: function(a) {
            return a.coupons
        },
        getCoupons: function() {
            var a = this.get("coupons");
            return _.map(a, function(a) {
                return (new Wood.Model.OwnedCoupon).set(a)
            })
        },
        getInstanceCodes: function() {
            var a = this.get("coupons");
            return _.map(a, function(a) {
                return a.instance_code
            })
        },
        getLength: function() {
            var a = this.get("coupons");
            return a && a.length || 0
        },
        cacheCoupon: function() {
            var a = wood.client.getSessionStorage()
              , b = this.get("coupons");
            return _.each(b, function(b) {
                a.setItem("_owned_coupon_" + b.id, JSON.stringify(b))
            })
        },
        cacheCouponId: function() {
            var a = wood.client.getSessionStorage()
              , b = this.get("coupons");
            return _.each(b, function(b) {
                a.setItem("_coupon_id_" + b.instance_code, b.id + "")
            })
        }
    }, {
        getCachedCoupon: function(a) {
            return (a = wood.client.getSessionStorage().getItem("_owned_coupon_" + a)) ? (new Wood.Model.OwnedCoupon).set(JSON.parse(a)) : null
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
            for (var c = [], d = a.conditional_prices.conditional_price, e = d.length, g = 0; g < e; g++)
                a = d[g],
                c.push(new Wood.Price(a.id,a.raw_value,a.amount,a.currency,Wood.Price.DiscountType.CONDITIONAL,a.description));
            return c
        },
        getConditionalPrice: function(a) {
            var b = this.getPriceObj();
            if (!b || !b.conditional_prices)
                return null;
            var d = b.conditional_prices.conditional_price
              , e = d.length
              , g = {};
            b = a.length;
            for (var f = 0; f < b; f++)
                g[a[f]] = !0;
            for (a = 0; a < e; a++) {
                b = d[a];
                f = b.conditional_contents.conditional_content.length;
                for (var h = 0, k = 0; k < f; k++)
                    g[b.conditional_contents.conditional_content[k]] && h++;
                if (0 < h && h === f)
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
    Wood.Model.TitlePriceList = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/titles/online_prices"
        },
        use_store: !0,
        fetch: function(a) {
            var b = this.getBaseAjaxParam()
              , c = {
                lang: this.language,
                "title[]": this.title_ids.join(","),
                include_coupon: !0
            };
            this.coupon_id && (c.coupon_id = this.coupon_id);
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
        parse: function(a) {
            return a.online_prices
        },
        getOnlinePrices: function() {
            return this.get("online_price")
        },
        getTitlePrices: function() {
            var a = []
              , b = this.get("online_price");
            if (!b)
                return a;
            for (var c = b.length, d = 0; d < c; d++) {
                var e = new Wood.Model.TitlePrice({
                    country: this.country,
                    language: this.language,
                    title_id: b[d].title_id
                });
                e.set(b[d]);
                a.push(e)
            }
            return a
        },
        getTitlePriceById: function(a) {
            var b = this.getTitlePrices();
            if (0 === b.length)
                return null;
            for (var c = b.length, d = 0; d < c; d++)
                if (b[d].title_id === a)
                    return b[d];
            return null
        }
    })
}
)();
(function() {
    Wood.Model.TitlePrice = Wood.Model.OnlinePrice.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/titles/online_prices"
        },
        initialize: function(a) {
            _.extend(this, a);
            this.sales_status = null;
            this.setup()
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam()
              , c = {
                lang: this.language,
                "title[]": this.title_id,
                include_coupon: !0
            };
            this.coupon_id && (c.coupon_id = this.coupon_id);
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
        parse: function(a) {
            return a.online_prices.online_price[0]
        },
        getTitleId: function() {
            return this.title_id
        },
        getTentativePrice: function() {
            var a = this.get("tentative_price");
            if (!a)
                return null;
            var b = new Wood.Model.MoneyType;
            b.set(a);
            return b
        }
    })
}
)();
(function() {
    Wood.View.Shelf = Wood.View.Base.extend({
        el: "#shelf-list",
        initialize: function() {
            this.template = {
                title: Wood.Template.get("shelf", "#template_title"),
                movie: Wood.Template.get("shelf", "#template_movie")
            };
            this.pagenationView = this.options.pagenation;
            this.render()
        },
        render: function() {
            var a = this
              , b = this.model.getTotalCount();
            this.$el.empty();
            this.renderPagination(b);
            0 === b ? $(a.el).append($("#str_no_result").clone()) : (Wood.Util.each(this.model.getShelfContents(), function(b, d) {
                Wood.Util.isDefined(d.title) ? a.renderTitle(d.title) : Wood.Util.isDefined(d.movie) && a.renderMovie(d.movie)
            }),
            $(".title-outline a").on("click", function(a) {
                a.preventDefault();
                $("#el-sort").prop("disabled", !0);
                wood.client.isWiiU() && (a = $(this).data("se-label"),
                wood.client.playSound(a));
                wood.client.redirectTo($(this).attr("href"))
            }),
            _.defer(function() {
                $("#shelf-list li").each(function() {
                    if ("movie" === $(this).data("content-type")) {
                        var a = $(".list-movie-summary > .name", this);
                        Wood.DomUtil.applyTextOverflow(a)
                    }
                })
            }),
            Wood.DomUtil.lazyload("img.lazy"));
            $(this.el).attr("data-isloaded", !0)
        },
        renderMovie: function(a) {
            if (!Wood.Util.isUndefined(a)) {
                var b = "";
                Wood.Util.isDefined(a.rating_info) && Wood.Util.isDefined(a.rating_info.rating_system.name) && Wood.Util.isDefined(a.rating_info.rating.name) && (b = a.rating_info.rating_system.name + ": " + a.rating_info.rating.name);
                for (var c = 0, d = a.files.file, e = d.length, g = 0; g < e; g++) {
                    var f = d[g];
                    if (f.quality && "HQ" === f.quality) {
                        c = f.play_time_sec;
                        break
                    } else
                        f.quality && "LQ" === f.quality && (c = f.play_time_sec)
                }
                $(this.template.movie({
                    str_title: a.name,
                    url_icon: a.icon_url,
                    url_detail: "data02_01.html?movie=" + a.id,
                    data_content_type: "movie",
                    is_new: a["new"],
                    str_new: $("#str_new").text(),
                    str_mov_time: Wood.Util.convertSecondToFormat(c),
                    str_movie: $("#str_movie").text(),
                    str_rating: b
                })).appendTo(this.el)
            }
        },
        renderTitle: function(a) {
            if (!Wood.Util.isUndefined(a)) {
                var b = "";
                Wood.Util.isDefined(a.rating_info) && Wood.Util.isDefined(a.rating_info.rating_system.name) && Wood.Util.isDefined(a.rating_info.rating.name) && (b = a.rating_info.rating_system.name + ": " + a.rating_info.rating.name);
                var c = this.getRatingStarInfo(a)
                  , d = "WUP" === a.platform.device
                  , e = {
                    title: a.id
                };
                this.options.coupon_ins && (e.coupon_ins = this.options.coupon_ins);
                $(this.template.title({
                    data_title_id: a.id,
                    data_esales_flg: a.eshop_sales,
                    data_release_date: a.release_date_on_eshop,
                    data_content_type: a.platform.device,
                    str_title: a.name,
                    str_platform: a.platform.name,
                    str_publisher: a.publisher.name,
                    str_rating: b,
                    url_icon: a.icon_url,
                    url_detail: Wood.URL.create("#title", e),
                    is_new: a["new"],
                    has_demo: d && a.demo_available,
                    has_aoc: d && a.aoc_available,
                    has_rating: c.has_rating,
                    rating_img_path: c.rating_img_path,
                    rating_votes: c.rating_votes,
                    str_new: $("#str_new").text(),
                    str_sale: $("#str_sale").text(),
                    str_pre_order: $("#str_pre_order").text(),
                    str_conditional_sale: $("#str_conditional_sale").text(),
                    str_owned_coupon: $("#str_owned_coupon").text(),
                    str_buy: $("#str_buy").text()
                })).appendTo(this.el)
            }
        },
        renderPagination: function(a) {
            this.pagenationView.pagenation.setCurrentPage(this.model.page);
            this.pagenationView.setTotalCount(a);
            this.pagenationView.setElement($(".pagenation")).render()
        }
    })
}
)();
(function() {
    Wood.View.ShelfHeader = Backbone.View.extend({
        el: "#el-header",
        initialize: function(a) {
            this.template = {
                header: Wood.Template.get("shelf", "#template_header"),
                non_desc: Wood.Template.get("shelf", "#template_header_non_desc"),
                coupon: Wood.Template.get("shelf", "#template_header_coupon"),
                search: Wood.Template.get("shelf", "#template_header_search")
            };
            this.type = a.type;
            this.coupon = a.coupon;
            this.render()
        },
        render: function() {
            this.$el.empty();
            switch (this.type) {
            case "directory":
                this.renderDirectoryHeader();
                break;
            case "coupon":
                this.renderCouponHeader();
                break;
            default:
                this.renderSerachHeader()
            }
        },
        renderDirectoryHeader: function() {
            Wood.Util.isDefined(this.model.getDescription()) ? ($("#el-dialog-headline").html(this.model.getShelfName()),
            $("#el-dialog-description").html(this.model.getDescription()),
            $(this.template.header({
                str_header: this.model.getShelfName(),
                str_total: this.getTextTotal()
            })).appendTo(this.el),
            this.hookDialogEvent()) : $(this.template.non_desc({
                str_header: this.model.getShelfName(),
                str_total: this.getTextTotal()
            })).appendTo(this.el)
        },
        renderCouponHeader: function() {
            $(this.template.coupon({
                coupon_name: this.coupon.getName(),
                discount_rate: $("#str_off").text().replace("%{0}", this.coupon.getDiscountInfo()),
                str_total: this.getTextTotal()
            })).appendTo(this.el);
            $(".shelf-filter").hide()
        },
        renderSerachHeader: function() {
            $(this.template.search({
                str_header: $("#str_search").text(),
                str_total: this.getTextTotal()
            })).appendTo(this.el)
        },
        getTextTotal: function() {
            return 0 !== this.model.getTotalCount() ? $("#str_total").html().replace("%{0}", this.model.getTotalCount()) : ""
        },
        hookDialogEvent: function() {
            var a = this;
            $("#open-dialog").on("click", function(b) {
                b.preventDefault();
                Wood.DomUtil.animateToTop();
                $("#shelf01_01").hide();
                $("#shelf_dialog").fadeIn();
                var c = a.options.controller.menuBar;
                c.saveInitialState();
                c.setup(Wood.View.MenuBar.Type.CLOSE);
                c.hookCloseEvent(function() {
                    c.revert();
                    $("#shelf_dialog").fadeOut(0, function() {
                        $("#shelf01_01").show()
                    });
                    $("html,body").animate({
                        scrollTop: $("html,body").offset().top
                    }, 0)
                })
            })
        }
    })
}
)();
(function() {
    Wood.View.ShelfSort = Backbone.View.extend({
        el: "#el-sort",
        elements: {
            titles: {
                non: !1,
                "new": !0,
                score: !0,
                name: !0
            },
            movies: {
                non: !1,
                "new": !0,
                score: !1,
                name: !0
            },
            contents: {
                non: !1,
                "new": !0,
                score: !1,
                name: !0
            },
            directory: {
                non: !0,
                "new": !0,
                score: !0,
                name: !0
            }
        },
        initialize: function() {
            this.template = Wood.Template.get("shelf", "#template_sort");
            this.type = Wood.Util.isDefined(this.model.search_type) ? this.model.search_type : "directory";
            this.render()
        },
        render: function() {
            var a = this;
            a.$el.empty();
            if (0 === this.model.getTotalCount())
                $(a.el).prop("disabled", !0);
            else {
                var b = a.elements[a.type];
                "directory" === a.type && (a.model.isComponentAny() || a.model.isComponentMovie()) && (b.score = !1);
                Object.keys(b).forEach(function(c) {
                    b[c] && $(a.template({
                        id_sort: "sel_opt_" + c,
                        param_value: c,
                        str_sort: $("#str_sort_" + c).text()
                    })).appendTo(a.el)
                });
                $("#sel_opt_" + a.model.sort_id).prop("selected", !0);
                a.hookSortChangeEvent()
            }
        },
        hookSortChangeEvent: function() {
            var a = this;
            $(a.el).unbind("change");
            $(a.el).on("change", function() {
                var b = $(this).val();
                Wood.Util.isDefined(b) && a.model.sort_id !== b && (a.options.controller.addHistory({
                    sort_id: b,
                    page: 1
                }, {
                    replace: !0
                }),
                wood.client.disableUserOperation(),
                $(a.el).prop("disabled", !0),
                a.model.fetch({
                    sort_id: b,
                    async: !1
                }),
                a.model.hasChanged() || (wood.client.enableUserOperation(),
                $(a.el).prop("disabled", !1)))
            })
        }
    })
}
)();
(function() {
    Wood.View.ShelfTitlePrice = Backbone.View.extend({
        initialize: function() {
            this.template = {
                nosale: Wood.Template.get("shelf", "#template_nosale"),
                unreleased: Wood.Template.get("shelf", "#template_unreleased"),
                purchased: Wood.Template.get("shelf", "#template_purchased"),
                downloaded: Wood.Template.get("shelf", "#template_download"),
                buy: Wood.Template.get("shelf", "#template_buy"),
                price: Wood.Template.get("shelf", "#template_price"),
                sales_terminated: Wood.Template.get("shelf", "#template_sales_termination"),
                dl_terminated: Wood.Template.get("shelf", "#template_download_termination")
            };
            this.items = this.model.shelf_list.items;
            this.model.price_list = new Wood.Model.TitlePriceList({
                country: wood.client.country,
                language: wood.client.language,
                coupon_id: this.options.coupon_id,
                title_ids: this.model.shelf_list.items.map(function(a) {
                    return a.id
                })
            });
            this.model.price_list.bind("change", this.render, this);
            if (0 < this.items.length) {
                var a = [];
                Wood.Util.each(this.items, function(b, c) {
                    a.push(c.id)
                });
                0 < a.length ? this.model.price_list.fetch({
                    async: !0,
                    items: a
                }) : this.render()
            } else
                0 < this.model.shelf_list.getTotalCount() && this.enableSort()
        },
        enableSort: function() {
            $("#el-sort").prop("disabled", !1)
        },
        render: function() {
            var a = this;
            this.$el = $("#shelf-list");
            var b = this.$("li");
            if (0 < b.length && 0 < a.items.length && (b = b.map(function() {
                return $(this).data("title-id")
            }).get(),
            !_.contains(b, a.items[0].id)))
                return;
            $(".el-purchase").empty();
            $(".el-price").empty();
            $(".sel_disp_sale").hide();
            $(".sel_disp_conditional").hide();
            $(".sel_disp_owned_coupon").hide();
            this.enableSort();
            var c = {};
            Wood.Util.each(a.model.price_list.getTitlePrices(), function(a, b) {
                c[b.getTitleId()] = b
            });
            Wood.Util.each(a.items, function(b, e) {
                a.renderItem(e, c)
            });
            Wood.DomUtil.hookLabelSoundEffectEvent($(".el-purchase"));
            $(".el-purchase > a").on("click", function(a) {
                a.preventDefault();
                $("#el-sort").prop("disabled", !0);
                wood.client.redirectTo($(this).attr("href"))
            })
        },
        renderItem: function(a, b) {
            var c = wood.client.getDeviceOrderList()
              , d = this.$("li[data-title-id=" + a.id + "]");
            b = b[a.id];
            var e = a.retail_sales;
            a.eshop_sales || e ? !a.eshop_sales && "CTR" === a.device || !a.eshop_sales && "WUP" === a.device || !b ? $(".el-purchase", d).append(this.template.nosale({
                str_nosale: $("#str_check_at_retailer").html()
            })) : (b.isUnreleased() ? this.renderUnrelease(d) : b.isSalesTerminated() ? this.renderSalesTerminated(d) : b.isDownloadTerminated() ? this.renderDownloadTerminated(d) : this.renderPrice(d, b, c, a),
            a.eshop_sales && "CTR" === a.device && $(".el-purchase", d).empty().append(this.template.nosale({
                str_nosale: $("#str_check_at_tiger").html()
            }))) : this.renderSalesTerminated(d)
        },
        renderUnrelease: function(a) {
            var b = String(a.data("release-date"));
            "TBD" === b || "" === b ? b = $("#str_unreleased_eshop").html() : (b = b.split("-"),
            b = 3 === b.length ? $("#str_available_ymd").html().replace("%{yyyy}", b[0]).replace("%{mm}", b[1]).replace("%{dd}", b[2]) : 2 === b.length ? $("#str_available_ym").html().replace("%{yyyy}", b[0]).replace("%{mm}", b[1]) : $("#str_available_y").html().replace("%{yyyy}", b[0]));
            $(".el-purchase", a).append(this.template.unreleased({
                str_date: b
            }))
        },
        renderSalesTerminated: function(a) {
            $(".el-purchase", a).append(this.template.sales_terminated({
                str_termination: $("#str_termination").html()
            }))
        },
        renderDownloadTerminated: function(a) {
            $(".el-purchase", a).append(this.template.dl_terminated({
                str_termination: $("#str_termination").html()
            }))
        },
        getCouponPriceText: function(a) {
            return this.options.coupon_id ? a : $("#str_to").text().replace("%{price}", a)
        },
        renderPrice: function(a, b, c, d) {
            var e = b.getLowestPrice(c.getAllIds())
              , g = b.getCouponPrice()
              , f = !1
              , h = !1
              , k = !1
              , l = "";
            if (e.isNotAtDiscount() && !g)
                var m = Wood.DomUtil.getTaxTextWithPriceObject(e);
            else
                e.isAtNormalDiscount() ? ($(".sel_disp_sale", a).show(),
                f = !0) : e.isAtConditionalDiscount() && ($(".sel_disp_conditional", a).show(),
                h = !0),
                g && ($(".sel_disp_owned_coupon", a).show(),
                k = !0),
                m = b.getRegularPrice().getAmount(),
                l = Wood.DomUtil.getTaxTextWithPriceObject(g || e),
                g && (l = this.getCouponPriceText(l));
            b.isPreOrder() && !e.isFree() && ($(".status-pre-order", a).show(),
            $(".status-new", a).hide());
            e.isFree() ? d.in_app_purchase && $(".el-price", a).append(this.template.price({
                is_normal_discount: !1,
                is_conditional_discount: !1,
                is_coupon_discount: !1,
                regular_price: $("#str_in_app_purchase").html(),
                discount_price: ""
            })) : $(".el-price", a).append(this.template.price({
                is_normal_discount: f,
                is_conditional_discount: h,
                is_coupon_discount: k,
                regular_price: m,
                discount_price: l
            }));
            c && c.contains(d.id) ? $(".el-purchase", a).append(this.template.purchased({
                str_purchased: $("#str_purchased").text()
            })) : e && (b = {
                title: b.getTitleId(),
                type: "title"
            },
            this.options.coupon_ins && (b.coupon_ins = this.options.coupon_ins),
            b = Wood.URL.create("buy01_01.html", b),
            e.isFree() ? $(".el-purchase", a).append(this.template.downloaded({
                url_dl: b,
                str_DL: $("#str_DL").text()
            })) : $(".el-purchase", a).append(this.template.buy({
                url_buy: b,
                str_buy: $("#str_buy").text()
            })))
        }
    })
}
)();
(function() {
    Wood.Controller.Shelf01_01 = Wood.Controller.Base.extend({
        routes: _.defaults({
            "page/:page": "changePage"
        }, Wood.Controller.ROUTES),
        changePage: function(a) {
            var b = a ? parseInt(a, 10) : 1;
            $("#el-sort").prop("disabled", !0);
            var c = this.shelf_model;
            wood.client.disableUserOperation();
            var d = (b - 1) * c.limit;
            _.delay(function() {
                c.fetch({
                    offset: d,
                    async: !1
                });
                Wood.DomUtil.animateToTop();
                c.hasChanged() || (wood.client.enableUserOperation(),
                $("#el-sort").prop("disabled", !1))
            }, 150);
            this.addHistory({
                page: a
            }, {
                replace: !0
            })
        },
        addHistory: function(a, b) {
            this.param = _.extend(this.param, a);
            a = Wood.URL.create("shelf", this.param);
            Backbone.history.navigate(a, b)
        },
        setupModelShelf: function() {
            var a = this.param = this.parseParam();
            this.shelf_model = new Wood.Model.Shelf({
                dir_id: a.directory,
                alias: a.alias
            });
            a = this.getFetchOptions(a, this.shelf_model);
            this.shelf_model.bind("change", this.displayShelf, this);
            this.shelf_model.fetch(a)
        },
        setupModelCoupon: function() {
            var a = {};
            a = this.param = this.parseParam();
            this.shelf_model = new Wood.Model.CouponTitles({
                coupon_id: this.coupon_id,
                afterError: function() {
                    wood.client.redirectToTop()
                }
            });
            a = this.getFetchOptions(a, this.shelf_model);
            this.shelf_model.bind("change", this.displayCouponShelf, this);
            this.shelf_model.fetch(a)
        },
        setupModelSearch: function() {
            var a = {}
              , b = this.parseParam();
            a = this.param = this.parseParam();
            var c = {}
              , d = "";
            b ? ("title" === b.searchType ? d = "titles" : (d = "movie" === b.searchType ? "movies" : "contents",
            c.video_quality = "HQ",
            c.video_format = "mp4"),
            Wood.Util.each("genre[] platform[] publisher[] freeword price_min price_max device[]".split(" "), function(a, d) {
                Wood.Util.isDefined(b[d]) && (c[d] = b[d])
            })) : (d = "contents",
            c.video_quality = "HQ",
            c.video_format = "mp4");
            this.shelf_model = new Wood.Model.Search({
                search_type: d,
                query_param: c
            });
            a = this.getFetchOptions(a, this.shelf_model);
            this.shelf_model.bind("change", this.displaySearch, this);
            this.shelf_model.fetch(a)
        },
        setupModel: function() {
            this.hasDirectoryOrAlias() ? this.setupModelShelf() : this.hasCouponId() ? this.setupModelCoupon() : this.setupModelSearch()
        },
        run: function(a, b) {
            wood.client.showLoadingIcon();
            this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
            this.menuBar.allowScroll();
            this.menuBar.hookBackEvent(this.createAppJumpBackEvent(a, b));
            this.pagenationView = new Wood.View.Common.Pagination;
            this.setupModel()
        },
        getFetchOptions: function(a, b) {
            var c = {}
              , d = a.sort_id;
            a = a.page;
            d && (c.sort_id = d);
            a && (b = ((a ? parseInt(a, 10) : 1) - 1) * b.limit,
            c.offset = b);
            return c
        },
        hasDirectoryOrAlias: function() {
            var a = this.parseParam()
              , b = a.directory;
            return Wood.Util.isDefined(a.alias) || Wood.Util.isDefined(b)
        },
        hasCouponId: function() {
            return !!this.coupon_id
        },
        displayShelf: function() {
            this.renderView(Wood.View.Shelf, {
                model: this.shelf_model,
                pagenation: this.pagenationView
            });
            this.renderView(Wood.View.ShelfHeader, {
                model: this.shelf_model,
                type: "directory"
            });
            this.renderView(Wood.View.ShelfSort, {
                model: this.shelf_model
            });
            this.renderView(Wood.View.ShelfTitlePrice, {
                model: {
                    shelf_list: this.shelf_model
                }
            });
            this.renderView(Wood.View.Common.PushToWishlist, {
                ns_uid: this.shelf_model.getIDs(),
                short_label: !0
            });
            this.afterDisplay()
        },
        displayCouponShelf: function() {
            if (!this.shelf_model.isError()) {
                var a = Wood.Model.OwnedCoupons.getCachedCoupon(this.coupon_id);
                this.renderView(Wood.View.Shelf, {
                    model: this.shelf_model,
                    pagenation: this.pagenationView,
                    coupon_ins: this.coupon_ins
                });
                this.renderView(Wood.View.ShelfHeader, {
                    model: this.shelf_model,
                    coupon: a,
                    type: "coupon"
                });
                this.renderView(Wood.View.ShelfTitlePrice, {
                    model: {
                        shelf_list: this.shelf_model
                    },
                    coupon_id: this.coupon_id,
                    coupon_ins: this.coupon_ins
                });
                this.renderView(Wood.View.Common.PushToWishlist, {
                    ns_uid: this.shelf_model.getIDs(),
                    short_label: !0
                });
                this.afterDisplay()
            }
        },
        displaySearch: function() {
            this.renderView(Wood.View.Shelf, {
                model: this.shelf_model,
                pagenation: this.pagenationView
            });
            this.renderView(Wood.View.ShelfHeader, {
                model: this.shelf_model,
                type: "search"
            });
            this.renderView(Wood.View.ShelfSort, {
                model: this.shelf_model
            });
            this.renderView(Wood.View.ShelfTitlePrice, {
                model: {
                    shelf_list: this.shelf_model
                }
            });
            this.renderView(Wood.View.Common.PushToWishlist, {
                ns_uid: this.shelf_model.getIDs(),
                short_label: !0
            });
            this.afterDisplay()
        },
        afterDisplay: function() {
            wood.client.hideLoadingIcon();
            wood.client.enableUserOperation()
        },
        preparePage: function() {
            var a = this.hasDirectoryOrAlias() ? "Feature" : this.hasCouponId() ? "OwnedCoupon" : "Search";
            Wood.Analytics.addShelfAttr(this.getDirectoryBeaconParam(), a).sendVirtualPV("VP_Shelf_" + a);
            window.scrollTo(0, 0);
            $("#el-sort").val($("#el-sort option:eq(0)").val());
            this.coupon_id = (a = this.coupon_ins = this.parseParam().coupon_ins) ? wood.client.getSessionStorage().getItem("_coupon_id_" + a) : ""
        },
        onPageShowCache: function() {
            $("#shelf-list").data("isloaded") ? 0 === $("#shelf-list > li").size() ? $("#el-sort").prop("disabled", !0) : $("#el-sort").prop("disabled", !1) : (wood.client.disableUserOperation(),
            Wood.DomUtil.hideBody(),
            this.reload());
            this.renderView(Wood.View.ShelfTitlePrice, {
                model: {
                    shelf_list: this.shelf_model
                },
                coupon_id: this.coupon_id,
                coupon_ins: this.coupon_ins
            });
            this.renderView(Wood.View.Common.PushToWishlist, {
                ns_uid: this.shelf_model.getIDs(),
                short_label: !0
            })
        }
    })
}
)();
