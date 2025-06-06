var $jscomp = $jscomp || {};
$jscomp.scope = {};
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
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, c) {
        return $jscomp.findInternal(this, a, c).v
    }
}, "es6", "es3");
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
    Wood.Model.TitleEcInfo = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + wood.client.country + "/title/" + this.ns_uid + "/ec_info"
        },
        initialize: function(a) {
            this.ns_uid = a.ns_uid;
            this.setup()
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, a);
            b.type = "GET";
            b.async = !1;
            b.xhrFields = {
                withCredentials: !0
            };
            b.data = {
                lang: wood.client.language
            };
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.title_ec_info
        },
        getId: function() {
            return this.get("title_id")
        },
        getVersion: function() {
            return this.get("title_version")
        },
        getContentSize: function() {
            return this.get("content_size")
        }
    })
}
)();
(function() {
    Wood.Model.TitleOwner = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/title_owner"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, a);
            b.type = "GET";
            b.async = !1;
            b.xhrFields = {
                withCredentials: !0
            };
            b.cache = !1;
            b.data = {
                nsUid: this.ns_uid
            };
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.title_owner
        }
    })
}
)();
(function() {
    Wood.Model.DemoReleaseStatus = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + wood.client.country + "/title/public_status?ns_uid=" + this.ns_uid
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            b.type = "GET";
            b.async = !1;
            b.xhrFields = {
                withCredentials: !0
            };
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.title_public_status
        },
        isRelease: function() {
            return "PUBLIC" === this.get("public_status")
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
            for (var g = 0; g < b; g++)
                f[a[g]] = !0;
            for (a = 0; a < e; a++) {
                b = d[a];
                g = b.conditional_contents.conditional_content.length;
                for (var k = 0, h = 0; h < g; h++)
                    f[b.conditional_contents.conditional_content[h]] && k++;
                if (0 < k && k === g)
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
    Wood.View.Title = Backbone.View.extend({
        initialize: function() {
            this.render();
            this.model.info.bind("change", this.render, this)
        },
        render: function() {
            var a = this;
            $(".title-main-loading").hide();
            this.renderMainInfo();
            _.delay(function() {
                a.renderDetailInfo();
                _.delay(function() {
                    a.renderOptionalInfo();
                    $("#footer").show();
                    a.hookPagetop()
                }, 100)
            }, 100);
            return this
        },
        renderMainInfo: function() {
            var a = this.options.controller
              , b = this.model.info;
            b.getBannerUrl() ? ($("#title-header img").attr("data-original", b.getBannerUrl()).show(),
            Wood.DomUtil.lazyload("img.lazy_header")) : $("#title-main").addClass("no_header");
            if (this.options.coupon) {
                var c = $("#title-header");
                c.addClass("owned-coupon");
                var d = Wood.Template.get("title", "#template_header_owned_coupon");
                c.append(d({
                    coupon_name: this.options.coupon.getName(),
                    discount_rate: $("#str_off").text().replace("%{0}", this.options.coupon.getDiscountInfo())
                }))
            }
            a.renderView(Wood.View.Title.Headline, {
                model: b
            });
            a.renderView(Wood.View.Title.ActionItem, {
                model: b
            });
            a.renderView(Wood.View.Common.PushToWishlist, {
                ns_uid: b.getNsUid()
            });
            b.getScreenshots() && a.renderView(Wood.View.Title.Screen, {
                model: b
            });
            b.getMovies() && a.renderView(Wood.View.Title.RelatedMovie, {
                model: b
            });
            b.getDescription() && a.renderView(Wood.View.Title.Description, {
                model: b
            })
        },
        renderDetailInfo: function() {
            var a = this.options.controller
              , b = this.model.info
              , c = b.getFeatures();
            (c && Wood.Model.TitleInfomation.canDisplayFeatures(c) || b.getNetworkDescription() || b.getPeripheralDescription()) && a.renderView(Wood.View.Title.Feature, {
                model: b
            });
            b.getSpecDescription() && a.renderView(Wood.View.Title.SpecDescription, {
                model: b
            });
            b.getStarRatingScoreAverage() && a.renderView(Wood.View.Title.Evaluation, {
                model: b
            });
            b.getDisclaimer() && a.renderView(Wood.View.Title.Disclaimer, {
                model: b
            });
            this.renderStorage()
        },
        renderStorage: function() {
            var a = this.model.ecinfo
              , b = void 0 !== a.getContentSize()
              , c = "WUP" === this.model.info.item.device
              , d = function() {
                if (wood.client.isWiiU()) {
                    var b = wiiuDevice.getTitleInstallState(a.getId());
                    wood.client.shutdownIfError(b);
                    return b.installed
                }
                return !1
            };
            if (b && c && !d()) {
                var e = this.options.controller, f;
                b = Wood.Util.createPromise(function(b) {
                    f = wood.client.getTitleInstallInfo(a);
                    b.resolve()
                });
                $.when(b).done(function() {
                    var a = Wood.DomUtil.createSizeHTML(f.installSize, wood.client.language, wood.client.getRegion());
                    $("#sel_storage_head").show();
                    $("#sel_storage_info_head").html(a).show();
                    e.generateView(Wood.View.Title.Storage, {
                        info: f
                    }).render();
                    a = $(".title-basic-spec");
                    a.html(a.html());
                    a = $("#sel_storage");
                    a.html(a.html());
                    wood.client.hideLoadingIcon()
                })
            } else
                wood.client.hideLoadingIcon()
        },
        renderOptionalInfo: function() {
            var a = this.options.controller
              , b = this.model.info;
            b.getKeywords() && b.isWUP() && a.renderView(Wood.View.Title.RelatedKeyword, {
                model: b
            });
            b.getWebSites() && a.renderView(Wood.View.Title.RelatedWebsite, {
                model: b
            });
            b.getRatingSystem() && a.renderView(Wood.View.Title.Rating, {
                model: b
            });
            (b.getCopyrightText() || b.getCopyrightImage()) && a.renderView(Wood.View.Title.Copyright, {
                model: b
            });
            wood.client.isLegalBusinessMessageRequired() && !b.isCTR() && (a = Wood.URL.create("legal03_01.html", {
                type: "title",
                title: b.getNsUid()
            }),
            $("#evt_legal_business").attr("href", a),
            $("#sel_legal_business").show())
        },
        hookPagetop: function() {
            $("#evt_pagetop").on("click", function(a) {
                a.preventDefault();
                Wood.DomUtil.animateToTop()
            })
        }
    })
}
)();
(function() {
    Wood.View.Title.Headline = Backbone.View.extend({
        el: "#el_headline",
        initialize: function() {
            this.template = Wood.Template.get("title", "#template_headline");
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            this.$el.empty();
            var a = this.getPrice(this.model)
              , b = this.getStarRating()
              , c = ""
              , d = "";
            this.model.isWUP() ? (c = "wup",
            d = "icon_wup") : this.model.isCTR() && (c = "ctr",
            d = "icon_ctr");
            var e = this.getReleaseDateInfo()
              , f = this.model.getPublishermName() ? this.model.getPublishermName() : ""
              , g = this.model.getDisplayGenre() ? this.model.getDisplayGenre() : ""
              , k = this.model.getNumberOfPlayer() ? this.model.getNumberOfPlayer() : ""
              , h = "";
            if (this.model.getLanguages() && "JP" !== wood.client.country) {
                var l = [];
                Wood.Util.each(this.model.getLanguages(), function(a, b) {
                    l.push(b.name)
                });
                h = l.join(" / ")
            }
            this.$el.append(this.template({
                class_platform_icon: d,
                url_icon: this.model.getIconUrl(),
                str_title: this.model.getTitleName(),
                star_rating: b,
                str_price: Wood.DomUtil.getTaxText(a),
                str_new: $("#str_new").text(),
                str_pre_order: $("#str_pre_order").text(),
                str_sale: $("#str_sale").text(),
                str_conditional_sale: $("#str_conditional_sale").text(),
                str_owned_coupon: $("#str_owned_coupon").text(),
                str_price_description: this.model.getPriceDescription(),
                str_platform: this.model.getPlatformName(),
                class_platform: c,
                str_title_name: $("#str_title_name").text(),
                str_formal_name: this.model.getFormalTitleName(),
                str_release_type: e.release_type,
                str_release_date: e.str_date,
                str_publisher: $("#str_publisher").text(),
                str_publisher_info: f,
                str_genre: $("#str_genre").text(),
                str_genre_info: g,
                str_storage: $("#str_storage").text(),
                str_player: $("#str_player").text(),
                str_player_info: k,
                str_lang: $("#str_language").text(),
                str_lang_info: h
            }));
            return this
        },
        getPrice: function(a) {
            var b = ""
              , c = a.getPriceOnRetailDetail();
            !a.hasEshopSales() && c && (b = c.isFree() ? a.hasAppPurchase() ? $("#str_in_app_purchase").html() : "" : c.getAmount());
            return b
        },
        getStarRating: function() {
            var a = ""
              , b = this.model.getStarRatingScoreAverage();
            Wood.Util.isDefined(b) && (a = (new Wood.StarRating(b,Wood.StarRating.PathPrefix.DATA01_SMALL)).getImagePath(),
            b = this.model.getStarRatingVotes() ? "(" + this.model.getStarRatingVotes() + ")" : "&nbsp;",
            a = '<img src="' + a + '">' + b);
            return a
        },
        getReleaseDateInfo: function(a) {
            var b = a = "";
            this.model.hasEshopSales() ? (a = $("#str_release_eshop").text(),
            b = "TBD" === this.model.getReleaseDateOnEshop() || "" === this.model.getReleaseDateOnEshop() ? $("#str_undecided_eshop").text() : Wood.DomUtil.formatDate(this.model.getReleaseDateOnEshop())) : this.model.hasRetailSales() && (a = $("#str_release_retail").text(),
            b = "TBD" === this.model.getReleaseDateOnRetail() || "" === this.model.getReleaseDateOnRetail() ? $("#str_unreleased_retail").text() : Wood.DomUtil.formatDate(this.model.getReleaseDateOnRetail()));
            return {
                release_type: a,
                str_date: b
            }
        }
    })
}
)();
(function() {
    Wood.View.Title.ActionItem = Backbone.View.extend({
        el: "#el_action_item",
        initialize: function() {
            this.template = {
                item: Wood.Template.get("title", "#template_action_item"),
                demo: Wood.Template.get("title", "#template_demo_list")
            };
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            var a = this;
            this.$el.append(this.template.item({
                str_loading: $("#str_loading").text(),
                is_ctr: this.model.isCTR(),
                has_demo: this.model.hasDemo(),
                str_demo: $("#str_demo").text(),
                has_aoc: this.model.hasAoc(),
                url_aoc: "data03_01.html?title=" + this.model.getNsUid(),
                str_aoc: $("#str_aoc").text(),
                has_ticket: this.model.hasTicket(),
                url_ticket: "data04_01.html?title=" + this.model.getNsUid(),
                str_ticket: $("#str_ticket").text()
            }));
            if (this.model.hasDemo()) {
                var b = this.model.getDemoTitles()
                  , c = $("#el_demo_titles");
                1 < b.length ? (Wood.Util.each(b, function(b, e) {
                    c.append(a.template.demo({
                        title_id: e.id,
                        str_demo_title: e.name
                    }))
                }),
                this.hookDemosListEvent(),
                this.hookDemosClickEvent()) : this.hookDemoClickEvent(b[0].id)
            }
            return this
        },
        hookDemosListEvent: function() {
            var a = this;
            $("#evt_demo").on("click", function(b) {
                b.preventDefault();
                wood.client.playSound("SE_WAVE_OK");
                $("#data01_01").hide(0, function() {
                    $("#data01_02").show();
                    Wood.DomUtil.animateToTop($("#data01_02").offset().top)
                });
                var c = a.options.controller.menuBar;
                c.saveInitialState();
                c.setup(Wood.View.MenuBar.Type.CLOSE);
                c.hookCloseEvent(function() {
                    c.revert();
                    $("#data01_02").hide();
                    $("#data01_01").show()
                })
            })
        },
        hookDemosClickEvent: function() {
            var a = this;
            $("#el_demo_titles a").on("click", function(b) {
                b.preventDefault();
                wood.client.playSound("SE_WAVE_OK");
                a.jumpToBuy($(this).data("titleid"))
            })
        },
        hookDemoClickEvent: function(a) {
            var b = this;
            $("#evt_demo").on("click", function(c) {
                c.preventDefault();
                wood.client.playSound("SE_WAVE_OK");
                b.jumpToBuy(a)
            })
        },
        jumpToBuy: function(a) {
            wood.client.playSound("SE_WAVE_DECIDE");
            var b = new Wood.Model.DemoReleaseStatus({
                ns_uid: a
            });
            b.fetch();
            b.isRelease() ? (a = (new Wood.URL("buy01_01.html",{
                type: "demo",
                title: this.model.getNsUid(),
                demo: a
            })).toString(),
            wood.client.redirectTo(a)) : wood.client.alert($("#dialog_msg_not_published").text(), $("#dialog_msg_ok").text())
        }
    })
}
)();
(function() {
    Wood.View.Title.Copyright = Backbone.View.extend({
        initialize: function() {
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            this.model.getCopyrightText() && $("#sel_copy_str").html(this.model.getCopyrightText());
            this.model.getCopyrightImage() && $("#sel_copy_img").append('<img src="' + this.model.getCopyrightImage() + '"/>');
            $("#sel_copyright").removeClass("hide");
            return this
        }
    })
}
)();
(function() {
    Wood.View.Title.Description = Backbone.View.extend({
        el: "#content_description",
        initialize: function() {
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            $("#el_description").html(this.model.getDescription());
            310 < $("#el_description").text().replace(/\n|\r\n/g, "").length && ($("#el_description").css({
                height: "170px",
                overflow: "hidden"
            }),
            $("#evt_show_description").show(),
            this.hookShowDetail());
            $("#sel_description").removeClass("hide");
            return this
        },
        hookShowDetail: function() {
            $("#evt_show_description").on("click", function(a) {
                a.preventDefault();
                $("#el_description").css({
                    height: "auto",
                    overflow: "visible"
                });
                $(this).hide()
            })
        }
    })
}
)();
(function() {
    Wood.View.Title.Disclaimer = Backbone.View.extend({
        initialize: function() {
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            $("#el_disclaimer").html(this.model.getDisclaimer());
            $("#sel_disclaimer").removeClass("hide");
            return this
        }
    })
}
)();
(function() {
    Wood.View.Title.Evaluation = Backbone.View.extend({
        initialize: function() {
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            var a = this.model.getStarRatingScoreAverage();
            a = (new Wood.StarRating(a,Wood.StarRating.PathPrefix.DATA01_LARGE)).getImagePath();
            $(".var_star_rating").attr("src", a);
            a = this.model.getStarRatingVotes() ? "(" + this.model.getStarRatingVotes() + ")" : "&nbsp;";
            $(".var_total_votes").text(a);
            a = this.model.getStarRating();
            $(".var_star1_votes").text("(" + a.score1 + ")");
            $(".var_star2_votes").text("(" + a.score2 + ")");
            $(".var_star3_votes").text("(" + a.score3 + ")");
            $(".var_star4_votes").text("(" + a.score4 + ")");
            $(".var_star5_votes").text("(" + a.score5 + ")");
            var b = this.model.getTargetPlayer();
            a = b.everyone;
            b = b.gamers;
            this.renderBarchart({
                dom_id: "sel_bar_style",
                param_left: a,
                param_right: b
            });
            $("#sel_everyone").text(a + "%");
            $("#sel_gamers").text(b + "%");
            b = this.model.getPlayStyle();
            a = b.casual;
            b = b.intense;
            this.renderBarchart({
                dom_id: "sel_bar_feeling",
                param_left: a,
                param_right: b
            });
            $("#sel_casual").text(a + "%");
            $("#sel_intense").text(b + "%");
            $("#sel_evaluation").removeClass("hide");
            return this
        },
        renderBarchart: function(a) {
            var b = 6 * a.param_left
              , c = 6 * a.param_right;
            a = document.getElementById(a.dom_id).getContext("2d");
            a.beginPath();
            a.fillStyle = "#00c5e8";
            a.fillRect(0, 0, b, 30);
            a.beginPath();
            a.fillStyle = "#ebaa00";
            a.fillRect(b, 0, c, 30)
        }
    })
}
)();
(function() {
    Wood.View.Title.Feature = Backbone.View.extend({
        initialize: function() {
            this.template = {
                list: Wood.Template.get("title", "#template_feature"),
                image: Wood.Template.get("title", "#template_feature_img")
            };
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            $("#sel_feature").removeClass("hide");
            this.$show_feature = $("#evt_show_feature").show();
            this.hookShowDetail();
            return this
        },
        renderContent: function() {
            var a = this;
            this.flags = {
                type1_true: !1,
                type1_false: !1,
                type2_true: !1,
                type2_false: !1,
                type3_false: !1,
                type4_false: !1,
                type4_false_img: !1
            };
            this.$nodes = {
                type1_true: $("#sel_type1_true"),
                type1_false: $("#sel_type1_false"),
                type2_true: $("#sel_type2_true"),
                type2_false: $("#sel_type2_false"),
                type3_false: $("#sel_type3_false"),
                type4_false: $("#sel_type4_false"),
                type4_false_img: $("#sel_type4_false_img"),
                type_periph: $("#sel_type_peripheral")
            };
            Wood.Util.each(this.model.getFeatures(), function(b, c) {
                1 === c.type ? c.required ? (a.renderList(a.$nodes.type1_true, c.name),
                a.flags.type1_true = !0) : (a.renderList(a.$nodes.type1_false, c.name),
                a.flags.type1_false = !0) : 2 === c.type ? c.required ? (a.renderList(a.$nodes.type2_true, c.name),
                a.flags.type2_true = !0) : (a.renderList(a.$nodes.type2_false, c.name),
                a.flags.type2_false = !0) : 3 === c.type ? (a.renderList(a.$nodes.type3_false, c.name),
                a.flags.type3_false = !0) : 4 === c.type && (Wood.Util.isDefined(c.icons) ? (a.renderImage(a.$nodes.type4_false_img, Wood.Model.TitleInfomation.findNormalIconUrl(c.icons)),
                a.flags.type4_false_img = !0) : (a.renderList(a.$nodes.type4_false, c.name),
                a.flags.type4_false = !0))
            });
            this.cleanContent()
        },
        renderList: function(a, b) {
            Wood.Util.isUndefined(a) || Wood.Util.isUndefined(b) || a.append(this.template.list({
                str_feature: b
            }))
        },
        renderImage: function(a, b) {
            Wood.Util.isUndefined(a) || Wood.Util.isUndefined(b) || a.append(this.template.image({
                icon_url: b
            }))
        },
        cleanContent: function() {
            this.cleanControllers();
            this.cleanControllerOptions();
            this.cleanPeripherals();
            this.cleanNetwork();
            this.cleanFeatures()
        },
        cleanControllers: function() {
            this.flags.type1_true || this.flags.type1_false || this.$nodes.type1_true.parent().remove();
            this.flags.type1_true || (this.$nodes.type1_true.prev().remove(),
            this.$nodes.type1_true.remove());
            this.flags.type1_false || (this.$nodes.type1_false.prev().remove(),
            this.$nodes.type1_false.remove())
        },
        cleanControllerOptions: function() {
            this.flags.type2_true || this.flags.type2_false || this.$nodes.type2_true.parent().remove();
            this.flags.type2_true || (this.$nodes.type2_true.prev().remove(),
            this.$nodes.type2_true.remove());
            this.flags.type2_false || (this.$nodes.type2_false.prev().remove(),
            this.$nodes.type2_false.remove())
        },
        cleanPeripherals: function() {
            this.model.getPeripheralDescription() ? this.$nodes.type_periph.append(this.model.getPeripheralDescription()) : (this.$nodes.type_periph.prev().remove(),
            this.$nodes.type_periph.remove())
        },
        cleanNetwork: function() {
            this.model.getNetworkDescription() && (this.$nodes.type3_false.append(this.model.getNetworkDescription()),
            this.flags.type3_false = !0);
            this.flags.type3_false || (this.$nodes.type3_false.parent().remove(),
            this.$nodes.type3_false.remove())
        },
        cleanFeatures: function() {
            this.flags.type4_false_img || this.flags.type4_false || this.$nodes.type4_false.parent().remove();
            this.flags.type4_false_img || this.$nodes.type4_false_img.remove();
            this.flags.type4_false || this.$nodes.type4_false.remove()
        },
        hookShowDetail: function() {
            var a = this;
            this.$show_feature.on("click", function(b) {
                b.preventDefault();
                a.renderContent();
                $("#sel_feature_content").show();
                $(this).hide()
            })
        }
    })
}
)();
(function() {
    Wood.View.Title.Price = Backbone.View.extend({
        initialize: function(a) {
            this.template = {
                buy: Wood.Template.get("title", "#template_buy"),
                purchased: Wood.Template.get("title", "#template_purchased"),
                unavailable: Wood.Template.get("title", "#template_unavailable")
            };
            this.item = a.item;
            this.$price = $("#sel_price");
            this.$buy = $("#sel_buy");
            this.render()
        },
        render: function() {
            $("#sel_buy_loading").remove();
            this.$buy.empty();
            $("#sel_sale_description").empty();
            $("#sel_pre_order").hide();
            $("#sel_sale").hide();
            $("#sel_conditional_sale").hide();
            $("#sel_owned_coupon").hide();
            var a = this.model.info.hasEshopSales()
              , b = this.model.info.hasRetailSales();
            this.model.info.hasNewDisplay() && $("#sel_new").show();
            a || b ? "WUP" === this.item.device && a ? this.renderWupPrice(this.model.price) : "CTR" === this.item.device && a ? this.renderCtrPrice(this.model.price) : this.renderUnavailable({
                device: this.item.device,
                eshop_sales: a,
                retail_sales: b
            }) : this.renderSalesTerminated();
            Wood.DomUtil.hookLabelSoundEffectEvent(this.$buy)
        },
        renderWupPrice: function(a) {
            a.isUnreleased() ? this.renderUnreleased() : a.isSalesTerminated() ? this.renderSalesTerminated() : a.isDownloadTerminated() ? this.model.info.hasRetailSales() ? this.renderUnavailable({
                device: this.item.device,
                eshop_sales: this.model.info.hasEshopSales(),
                retail_sales: this.model.info.hasRetailSales()
            }) : this.renderSalesTerminated() : this.renderNormal(a)
        },
        renderUnreleased: function() {
            var a = !1
              , b = this.model.info.getPriceOnRetailDetail()
              , c = this.model.price.getTentativePrice();
            c ? (this.renderPriceText(c.getAmount(), c.isFree()),
            a = !0) : !this.model.info.hasEshopSales() && b ? this.renderPriceText(b.getAmount(), b.isFree()) : ($("#sel_ordinary_price").empty(),
            this.$price.empty(),
            a = !0);
            a ? (a = this.item.release_date_on_eshop,
            "TBD" === a || "" === a ? a = $("#str_unreleased_eshop").html() : (a = a.split("-"),
            a = 3 === a.length ? $("#str_available_ymd").html().replace("%{yyyy}", a[0]).replace("%{mm}", a[1]).replace("%{dd}", a[2]) : 2 === a.length ? $("#str_available_ym").html().replace("%{yyyy}", a[0]).replace("%{mm}", a[1]) : $("#str_available_y").html().replace("%{yyyy}", a[0])),
            this.renderUnavailable({
                device: this.item.device,
                eshop_sales: this.model.info.hasEshopSales(),
                retail_sales: this.model.info.hasRetailSales(),
                str_date: a
            })) : this.renderUnavailable({
                device: this.item.device,
                eshop_sales: this.model.info.hasEshopSales(),
                retail_sales: this.model.info.hasRetailSales()
            })
        },
        renderSalesTerminated: function() {
            this.model.owner.get("is_owned") ? this.renderBuyButton({
                ns_uid: this.item.ns_uid,
                is_owned: this.model.owner.get("is_owned"),
                is_free: !1,
                str_buy: "",
                str_ordinary_price: "",
                str_selling_price: ""
            }) : this.$buy.append(this.template.unavailable({
                str_unavailable: $("#str_termination").html()
            }))
        },
        renderNormal: function(a) {
            var b = wood.client.getDeviceOrderList()
              , c = a.getRegularPrice();
            b = b ? b.getAllIds() : null;
            b = a.getLowestPrice(b);
            var d = a.getCouponPrice();
            a.isPreOrder() && !b.isFree() && ($("#sel_pre_order").show(),
            $("#sel_new").hide());
            Wood.Util.isUndefined(c) || "" === c.getRawValue() ? ($("#sel_ordinary_price").empty(),
            this.$price.empty()) : b && (b.isAtNormalDiscount() || b.isAtConditionalDiscount() || d) ? this.renderNormalDiscount(c, b, d) : this.renderNormalSales(c, b)
        },
        renderNormalDiscount: function(a, b, c) {
            var d = b.isFree() ? $("#str_DL").text() : $("#str_buy").text();
            this.$price.removeClass("sale conditional owned_coupon");
            b.isAtNormalDiscount() ? ($("#sel_sale").show(),
            this.$price.addClass("sale")) : b.isAtConditionalDiscount() && ($("#sel_conditional_sale").show(),
            this.$price.addClass("conditional"));
            c && ($("#sel_owned_coupon").show(),
            this.$price.removeClass("sale conditional"),
            this.$price.addClass("owned_coupon"));
            Wood.Util.isDefined(b.getDescription()) && !c && $("#sel_sale_description").html(b.getDescription()).show();
            this.renderBuyButton({
                ns_uid: this.item.ns_uid,
                is_owned: this.model.owner.get("is_owned"),
                is_free: b.isFree(),
                str_buy: d,
                str_ordinary_price: a.getAmount(),
                str_selling_price: c ? this.getCouponPriceText(c) : b.getAmount()
            })
        },
        getCouponPriceText: function(a) {
            var b = !!this.options.coupon_id;
            a = a.getAmount();
            return b ? a : $("#str_to").text().replace("%{price}", a)
        },
        renderNormalSales: function(a, b) {
            b = a.isFree() ? $("#str_DL").text() : $("#str_buy").text();
            this.$price.removeClass("sale conditional owned_coupon");
            this.renderBuyButton({
                ns_uid: this.item.ns_uid,
                is_owned: this.model.owner.get("is_owned"),
                is_free: a.isFree(),
                str_buy: b,
                str_ordinary_price: "",
                str_selling_price: a.getAmount()
            })
        },
        renderCtrPrice: function(a) {
            this.renderWupPrice(a);
            this.$buy.empty();
            this.renderUnavailable({
                device: this.item.device,
                eshop_sales: this.model.info.hasEshopSales(),
                retail_sales: this.model.info.hasRetailSales()
            })
        },
        renderUnavailable: function(a) {
            Wood.Util.isUndefined(a) || (a = "CTR" === a.device && a.eshop_sales ? $("#str_check_at_tiger").html() : a.str_date ? a.str_date : a.retail_sales ? $("#str_check_at_retailer").html() : $("#str_termination").html(),
            this.$buy.append(this.template.unavailable({
                str_unavailable: a
            })))
        },
        renderBuyButton: function(a) {
            if (!Wood.Util.isUndefined(a)) {
                if (a.is_owned)
                    if (wood.client.isWiiU()) {
                        var b = wiiuDevice.getTitleInstallState(this.model.ecinfo.getId());
                        wood.client.shutdownIfError(b);
                        b.installed ? this.$buy.append(this.template.purchased({
                            str_purchased: $("#str_purchased").text()
                        })) : this.$buy.append(this.template.buy({
                            url_buy: "buy01_01.html?type=title&title=" + a.ns_uid,
                            str_buy: $("#str_reDL").text()
                        }))
                    } else
                        this.$buy.append(this.template.purchased({
                            str_purchased: $("#str_purchased").text()
                        }));
                else
                    b = {
                        title: a.ns_uid,
                        type: "title"
                    },
                    this.options.coupon_ins && (b.coupon_ins = this.options.coupon_ins),
                    this.$buy.append(this.template.buy({
                        url_buy: Wood.URL.create("buy01_01.html", b),
                        str_buy: a.str_buy
                    }));
                $("#sel_ordinary_price").text(a.str_ordinary_price);
                this.renderPriceText(a.str_selling_price, a.is_free)
            }
        },
        renderPriceText: function(a, b) {
            b ? (a = this.model.info.hasAppPurchase() ? $("#str_in_app_purchase").html() : "",
            this.$price.html(a),
            $("#sel_ordinary_price").empty(),
            this.$price.removeClass().addClass("price")) : this.$price.html(Wood.DomUtil.getTaxText(a))
        }
    })
}
)();
(function() {
    Wood.View.Title.Rating = Backbone.View.extend({
        initialize: function() {
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            var a = this.model.getRatingSystemId()
              , b = {
                201: "m-rating-cero",
                202: "m-rating-esrb",
                203: "m-rating-usk",
                204: "m-rating-pegi",
                206: "m-rating-pegi",
                207: "m-rating-bbfc",
                208: "m-rating-cob",
                209: "m-rating-oflc",
                212: "m-rating-rar",
                303: "m-rating-iarc-usk",
                304: "m-rating-iarc-pegi",
                306: "m-rating-iarc-pegi",
                308: "m-rating-iarc-cob",
                309: "m-rating-iarc-oflc"
            }[a]
              , c = {
                203: "#sel_usk",
                207: "#sel_bbfc",
                208: "#sel_cob",
                209: "#sel_oflc",
                212: "#sel_rar",
                303: "#sel_iarc_usk",
                308: "#sel_cob",
                309: "#sel_oflc"
            }[a]
              , d = 204 === a || 206 === a;
            a = 304 === a || 306 === a;
            b && $("#title_rating_display").addClass(b);
            c && $(c).removeClass("hide");
            (d || a) && this.renderPegi(a);
            $("#rating-name").append("<p><img src=" + this.model.getRatingImage() + " /></p>");
            this.model.getRatingDescriptors() && Wood.Util.each(this.model.getRatingDescriptors(), function(a, b) {
                Wood.Util.isDefined(b.icons) ? $("#descriptor").append("<img src=" + Wood.Model.TitleInfomation.findNormalIconUrl(b.icons) + " />") : $("#descriptor").append("<p>" + b.name + "</p>")
            });
            $("#sel_rating").removeClass("hide");
            return this
        },
        renderPegi: function(a) {
            var b = wood.client.language;
            b = _.contains("fr es de it nl pt ru".split(" "), b) ? b : "en";
            $("#sel_" + (a ? "iarc_" : "") + "pegi_" + b).removeClass("hide")
        }
    })
}
)();
(function() {
    Wood.View.Title.RelatedKeyword = Backbone.View.extend({
        el: "#el_related_title",
        initialize: function() {
            this.template = Wood.Template.get("title", "#template_related_title");
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            var a = this;
            Wood.Util.each(a.model.getKeywords(), function(b, c) {
                a.renderKeyword(c)
            });
            $("#sel_related_title").removeClass("hide")
        },
        renderKeyword: function(a) {
            if (!Wood.Util.isUndefined(a)) {
                var b = "#shelf?searchType=title&freeword=" + encodeURIComponent(a);
                this.$el.append(this.template({
                    str_keyword: a,
                    url_keyword: b
                }))
            }
        }
    })
}
)();
(function() {
    Wood.View.Title.RelatedMovie = Backbone.View.extend({
        el: "#el_related_movie",
        initialize: function() {
            this.template = Wood.Template.get("title", "#template_related_movie");
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            var a = this;
            this.movies = this.model.getMovies();
            _.each(_.first(this.movies, 3), function(b) {
                a.renderMovie(b)
            });
            3 < this.movies.length && ($("#evt_show_movie").show(),
            this.hookShowDetail());
            Wood.DomUtil.lazyload("img.lazy_movie");
            $("#sel_related_movie").removeClass("hide");
            return this
        },
        renderMovie: function(a) {
            Wood.Util.isUndefined(a) || this.$el.append(this.template({
                str_title: a.name,
                url_icon: a.banner_url,
                url_detail: "data02_01.html?movie=" + a.id,
                is_new: a["new"],
                str_new: wood.client.getText("common01_01_046")
            }))
        },
        renderRest: function() {
            var a = this;
            _.each(_.rest(this.movies, 3), function(b) {
                a.renderMovie(b)
            });
            Wood.DomUtil.lazyload("img.lazy_movie")
        },
        hookShowDetail: function() {
            var a = this;
            $("#evt_show_movie").on("click", function(b) {
                b.preventDefault();
                a.renderRest();
                $(this).hide()
            })
        }
    })
}
)();
(function() {
    Wood.View.Title.RelatedWebsite = Backbone.View.extend({
        el: "#el_related_website",
        initialize: function() {
            this.template = Wood.Template.get("title", "#template_related_website");
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            var a = this;
            Wood.Util.each(this.model.getWebSites(), function(b, c) {
                b = "related_site_" + b;
                a.$el.append(a.template({
                    id: b,
                    str_site: c.name,
                    url_site: c.url
                }));
                $("#" + b).on("click", function(a) {
                    a.preventDefault();
                    wood.client.playSound("SE_WAVE_OK");
                    wood.client.isWiiU() ? (a = wiiuSystemSetting.getParentalControlForBrowser(),
                    wood.client.shutdownIfError(a),
                    !0 === a.isLocked ? wood.client.showError(Wood.ErrorCode.FOR_BROWSER_LOCKED) : (wood.client.disableUserOperation(),
                    wood.client.confirm($("#dialog_msg_browse").text(), $("#dialog_cancel").text(), $("#dialog_browse").text()) && wiiuBrowser.jumpToBrowser(c.url),
                    wood.client.enableUserOperation())) : location.href = c.url
                })
            });
            $("#sel_related_website").removeClass("hide");
            return this
        }
    })
}
)();
(function() {
    Wood.View.Title.Screen = Backbone.View.extend({
        el: "#el_screenshot",
        initialize: function() {
            this.template = {
                wup: Wood.Template.get("title", "#template_screen_wup"),
                wup_detail: Wood.Template.get("title", "#template_screen_wup_d"),
                ctr: Wood.Template.get("title", "#template_screen_ctr"),
                ctr_detail: Wood.Template.get("title", "#template_screen_ctr_d")
            };
            this.$detail = $("#show_screen_detail");
            this.$menu_bar = $("#wrapper #sel_menu_bar");
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            var a = this;
            this.$el.empty();
            Wood.Util.each(a.model.getScreenshots(), function(b, c) {
                a.model.isWUP() ? a.renderWupScreen(b, c) : a.model.isCTR() && a.renderCtrScreen(b, c)
            });
            this.hookShowScreenEvent();
            Wood.DomUtil.lazyload("img.lazy_screen");
            $("#content_game_screen").removeClass("hide");
            return this
        },
        renderWupScreen: function(a, b) {
            if (!Wood.Util.isUndefined(b)) {
                var c = Wood.Util.isDefined(b.thumbnail_url) ? b.thumbnail_url[0].value : b.image_url[0].value;
                this.$el.append(this.template.wup({
                    id_thumbnail: a,
                    img_screen: c
                }));
                this.$detail.append(this.template.wup_detail({
                    id_detail: "screen_" + a,
                    url_image: b.image_url[0].value
                }))
            }
        },
        renderCtrScreen: function(a, b) {
            if (!Wood.Util.isUndefined(b)) {
                var c, d, e, f;
                if (Wood.Util.isDefined(b.thumnail_url))
                    var g = b.thumnail_url;
                else
                    Wood.Util.isDefined(b.image_url) && (g = b.image_url);
                Wood.Util.each(g, function(a, b) {
                    "upper" === b.type ? c = b.value : "lower" === b.type && (d = b.value)
                });
                this.$el.append(this.template.ctr({
                    id_thumbnail: a,
                    img_upper: c,
                    img_lower: d
                }));
                Wood.Util.each(b.image_url, function(a, b) {
                    "upper" === b.type ? e = b.value : "lower" === b.type && (f = b.value)
                });
                this.$detail.append(this.template.ctr_detail({
                    id_detail: "screen_" + a,
                    url_image_upper: e,
                    url_image_lower: f
                }))
            }
        },
        hookShowScreenEvent: function() {
            var a = this;
            $("#el_screenshot a").on("click", function(b) {
                b.preventDefault();
                wood.client.prohibitLoadingIcon();
                b = $("#screen_" + $(b.currentTarget).data("id"));
                a.renderScreenDetail(b);
                $("#show_screen_detail > div").on("touchstart", function() {
                    0 === a.$menu_bar.children().size() && a.renderScreenDetail($("#show_screen_detail > div.active"))
                })
            })
        },
        renderScreenDetail: function(a) {
            var b = this;
            this.$menu_bar.empty();
            $("#screen_switch").empty();
            Wood.DomUtil.animateToTop();
            b.renderCloseButton();
            b.renderButton(a);
            Wood.DomUtil.lazyload("img.lazy_screen");
            $("#data01_01").hide(0, function() {
                $("#show_screen_detail > div").hide();
                $("#screen_switch").show();
                a.addClass("active").show()
            });
            $(window).off("keydown").on("keydown", function(a) {
                Wood.log("e.keyCode: " + a.keyCode);
                a.keyCode !== Wood.KeyMap.BUTTON_B && (b.hideButtonTimer(),
                0 === b.$menu_bar.children().size() && b.renderScreenDetail($("#show_screen_detail > div.active")))
            });
            b.hookSwitchScreenEvent();
            b.hideButtonTimer()
        },
        renderButton: function(a) {
            1 < $("#show_screen_detail > div").length && (a.prev().length ? a.next().length ? $("#screen_switch").append('<a href="#" id="evt_back" class="box_pager screen_back"><img src="image/data01_01/btn_data01_01_back.png" /></a><a href="#" id="evt_next" class="box_pager screen_next"><img src="image/data01_01/btn_data01_01_next.png" /></a>') : $("#screen_switch").append('<a href="#" id="evt_back" class="box_pager screen_back"><img src="image/data01_01/btn_data01_01_back.png" /></a>') : $("#screen_switch").append('<a href="#" id="evt_next" class="box_pager screen_next"><img src="image/data01_01/btn_data01_01_next.png" /></a>'))
        },
        renderCloseButton: function() {
            var a = this
              , b = a.options.controller.menuBar;
            b.saveInitialState();
            b.setup(Wood.View.MenuBar.Type.CLOSE);
            b.hookCloseEvent(function() {
                $(window).off("keydown");
                wood.client.allowLoadingIcon();
                clearTimeout(a.timer);
                b.revert();
                $("#show_screen_detail > div").hide(0, function() {
                    $("#show_screen_detail > div.active").removeClass("active");
                    $("#data01_01").show();
                    $("#screen_switch").hide();
                    a.$menu_bar.show()
                });
                Wood.DomUtil.animateToTop($("#el_screenshot").offset().top)
            })
        },
        hookSwitchScreenEvent: function() {
            var a = this
              , b = function(b) {
                var c = $("#show_screen_detail > div.active");
                if ("next" === b && c.next().length)
                    b = c.next();
                else if ("prev" === b && c.prev().length)
                    b = c.prev();
                else
                    return;
                c.removeClass("active").hide();
                a.renderScreenDetail(b)
            };
            $("#evt_back").on("click", function(a) {
                a.preventDefault();
                b("prev")
            });
            $("#evt_next").on("click", function(a) {
                a.preventDefault();
                b("next")
            })
        },
        hideButtonTimer: function() {
            var a = this;
            clearTimeout(a.timer);
            this.$menu_bar.show(0);
            $("#screen_switch").show(0);
            a.timer = setTimeout(function() {
                a.$menu_bar.empty();
                $("#evt_next").remove();
                $("#evt_back").remove()
            }, 1E3)
        }
    })
}
)();
(function() {
    Wood.View.Title.SpecDescription = Backbone.View.extend({
        initialize: function() {
            this.render();
            this.model.bind("change", this.render, this)
        },
        render: function() {
            $("#el_spec_description").html(this.model.getSpecDescription());
            $("#sel_spec_description").removeClass("hide");
            return this
        }
    })
}
)();
(function() {
    Wood.View.Title.Storage = Wood.View.Base.extend({
        el: "#sel_storage",
        initialize: function() {
            this.template = Wood.Template.get("title", "#template_storage");
            this.setup()
        },
        presenter: function() {
            var a = this.options.info
              , b = wood.client.language
              , c = wood.client.getRegion();
            return {
                can_install: parseInt(a.installSize, 10) <= parseInt(a.storageSize, 10),
                install_size: Wood.DomUtil.createSizeHTML(a.installSize, b, c),
                storage_size: Wood.DomUtil.createSizeHTML(a.storageSize, b, c),
                storage_media: "NAND" === a.downloadMedia ? $("#str_media_nand").html() : $("#str_media_usb").html()
            }
        },
        afterRender: function() {
            this.$el.show();
            this.localizeText()
        }
    })
}
)();
(function() {
    Wood.Controller.Data01_01 = Wood.Controller.Base.extend({
        run: function(a, b) {
            a.showLoadingIcon();
            this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
            this.menuBar.hookBackEvent(this.createAppJumpBackEvent(a, b));
            this.models.title_info = this.title_info = this.generateModel("TitleInfomation", {
                ns_uid: this.ns_uid
            });
            this.title_ecinfo = this.generateModel("TitleEcInfo", {
                ns_uid: this.ns_uid
            });
            this.fetchInfo(a, b);
            this.title_price = this.generateModel("TitlePrice", {
                country: a.country,
                language: a.language,
                title_id: this.ns_uid,
                coupon_id: this.coupon_id,
                coupon_ins: this.coupon_ins
            });
            this.title_owner = this.generateModel("TitleOwner", {
                ns_uid: this.ns_uid
            });
            this.fetchPrice()
        },
        beforeRedirect: function(a) {
            a.enableUserOperation();
            a.hideLoadingIcon()
        },
        fetchInfo: function(a, b) {
            var c = this;
            this.is_info_fetched = !1;
            this.title_ecinfo.ignoreError("3150");
            $.when(this.title_info.getPromise(), this.title_ecinfo.getPromise()).done(function() {
                c.title_info.getNsUid() || (c.beforeRedirect(a),
                a.showError(Wood.ErrorCode.RETRIABLE),
                a.historyBack());
                c.is_info_fetched = !0;
                c.rating(a, b)
            })
        },
        fetchPrice: function() {
            var a = this;
            this.is_price_fetched = !1;
            $.when(this.title_price.getPromise(), this.title_owner.getPromise()).done(function() {
                a.is_price_fetched = !0;
                a.displayPrice()
            })
        },
        rating: function(a, b) {
            if (this.title_info.hasRating()) {
                var c = this.title_info.getRatingAge();
                this.title_info.getRating(this.title_info.getRatingSystemId(), c).isDisplayAllowed(Wood.Rating.ActionType.DEFAULT, a.getRegion(), a.getAge()) ? a.isLockedForGamePlay(c) ? (b = b.getPathname() + b.getHash(),
                this.beforeRedirect(a),
                a.redirectReplaceTo("legal01_01.html?seq=" + encodeURIComponent(b) + "#gameplay")) : this.display(a) : (this.beforeRedirect(a),
                a.alert($("#dialog_msg_age").text(), $("#dialog_msg_ok").text()),
                a.historyBack())
            } else
                this.display(a)
        },
        display: function(a) {
            a.enableUserOperation();
            Wood.DomUtil.showBody();
            this.displayMain();
            this.displayPrice()
        },
        displayMain: function() {
            var a = Wood.Model.OwnedCoupons.getCachedCoupon(this.coupon_id);
            this.renderView("Title", {
                model: {
                    info: this.title_info,
                    ecinfo: this.title_ecinfo
                },
                ns_uid: this.ns_uid,
                coupon: a
            })
        },
        displayPrice: function() {
            if (this.is_info_fetched && this.is_price_fetched) {
                var a = this;
                _.defer(function() {
                    a.renderView("Title.Price", {
                        model: {
                            price: a.title_price,
                            info: a.title_info,
                            owner: a.title_owner,
                            ecinfo: a.title_ecinfo
                        },
                        item: a.title_info.item,
                        coupon_id: a.coupon_id,
                        coupon_ins: a.coupon_ins
                    })
                })
            }
        },
        preparePage: function(a, b) {
            a.disableUserOperation();
            this.ns_uid = b.param("title");
            this.coupon_id = (b = this.coupon_ins = b.param("coupon_ins")) ? a.getSessionStorage().getItem("_coupon_id_" + b) : "";
            Wood.Analytics.addTitleViewAttr(this.ns_uid).addDirectoryAttr(this.getDirectoryBeaconParam()).sendVirtualPV("VP_TitleDetail")
        },
        onPageShowCache: function(a, b) {
            $("div.sel_buy").html($("#sel_loading").clone());
            this.fetchPrice();
            this.renderView("Common.PushToWishlist", {
                ns_uid: this.title_info.getNsUid()
            })
        }
    })
}
)();
