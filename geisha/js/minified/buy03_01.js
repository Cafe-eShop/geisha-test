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
    return a ? a : function(b, a) {
        return $jscomp.findInternal(this, b, a).v
    }
}, "es6", "es3");
(function() {
    function a(b) {
        if (Wood.Util.isUndefined(b))
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
            var b = this.getPriceObj();
            return b && !0 === b.pre_order
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
        isFree: function(b) {
            return this.getLowestPrice(b).isFree()
        },
        isDiscount: function() {
            var b = this.getPriceObj();
            return b && b.discount_price
        },
        isConditional: function() {
            var b = this.getPriceObj();
            return b && b.conditional_prices
        },
        isCoupon: function() {
            var b = this.getPriceObj();
            return b && b.coupon_price
        },
        getRegularPrice: function() {
            var b = this.getPriceObj();
            return b ? new Wood.Price(b.regular_price.id,b.regular_price.raw_value,b.regular_price.amount,b.regular_price.currency,Wood.Price.DiscountType.NONE,b.regular_price.description) : null
        },
        getDiscountPrice: function() {
            var b = this.getPriceObj();
            return this.isDiscount() ? new Wood.Price(b.discount_price.id,b.discount_price.raw_value,b.discount_price.amount,b.discount_price.currency,Wood.Price.DiscountType.NORMAL,b.discount_price.description) : null
        },
        getConditionalPrices: function() {
            var b = this.getPriceObj();
            if (!this.isConditional())
                return null;
            for (var a = [], d = b.conditional_prices.conditional_price, e = d.length, f = 0; f < e; f++)
                b = d[f],
                a.push(new Wood.Price(b.id,b.raw_value,b.amount,b.currency,Wood.Price.DiscountType.CONDITIONAL,b.description));
            return a
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
                for (var h = 0, k = 0; k < g; k++)
                    f[b.conditional_contents.conditional_content[k]] && h++;
                if (0 < h && h === g)
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
    Wood.Model.PaymentAmount = Wood.Model.Base.extend({
        getPrice: function() {
            var a = new Wood.Model.OnlinePrice;
            a.set(this.getAttributes());
            return a
        },
        getTaxAmount: function() {
            var a = new Wood.Model.MoneyType;
            a.set(this.get("tax_amount"));
            return a
        },
        getTotalAmount: function() {
            var a = new Wood.Model.MoneyType;
            a.set(this.get("total_amount"));
            return a
        }
    })
}
)();
(function() {
    Wood.Model.AutoBilling = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/auto_billing/" + this.contract_id
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
            return a.contract
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.AutoBilling, {
        getId: "id",
        getName: "name",
        getDescription: "description"
    })
}
)();
(function() {
    Wood.Model.AutoBillingPrepurchaseInfo = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/title/" + this.title_id + "/auto_billing/" + this.contract_id + "/prepurchase_info"
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
            return a.prepurchase_info
        },
        getTotalAmount: function() {
            var a = this.get("total_amount");
            if (!a)
                return null;
            var b = new Wood.Model.PaymentAmount;
            b.set(a);
            return b
        },
        getPriceId: function() {
            var a = this.getSafe("purchasing_content");
            if (!a)
                return null;
            a = _.find(a, function(a) {
                return a.payment_amount
            });
            if (!a)
                return null;
            var b = new Wood.Model.OnlinePrice;
            b.set(a.payment_amount);
            return b.getLowestPrice().getId()
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.AutoBillingPrepurchaseInfo, {
        isPurchaseRequired: "purchase_required"
    })
}
)();
(function() {
    Wood.Model.AutoBillingPurchaseBase = Wood.Model.Base.extend({
        parse: function(a) {
            return a.auto_billing_transaction_result
        },
        appendQueryCommons: function(a) {
            this.price_id && (a.price_id = this.price_id);
            this.postal_code && (a.postal_code = this.postal_code);
            return a
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.AutoBillingPurchaseBase, {
        getPriorBillingStartDay: "prior_billing_start_day",
        isPurchased: "purchased",
        isExtended: "extended",
        getTransactionId: "transaction_result.transaction_id"
    })
}
)();
(function() {
    Wood.Model.AutoBillingPurchaseCc = Wood.Model.AutoBillingPurchaseBase.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/title/" + this.title_id + "/auto_billing/" + this.contract_id + "/!cc_purchase"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                data: this.appendQueryCommons({
                    request_id: this.request_id,
                    postal_code: this.postal_code,
                    application_id: this.application_id,
                    password: this.password
                }),
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        }
    })
}
)();
(function() {
    Wood.Model.AutoBillingPurchaseWallet = Wood.Model.AutoBillingPurchaseBase.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/title/" + this.title_id + "/auto_billing/" + this.contract_id + "/!wallet_purchase"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                data: this.appendQueryCommons({
                    password: this.password
                }),
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        }
    })
}
)();
(function() {
    Wood.Model.CcPrepare = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/balance/current/!cc_prepare"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                data: {
                    replenish_amount: this.replenish_amount
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
            return a.ccif_transaction
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.CcPrepare, {
        getRequestId: "request_id",
        getApplicationId: "application_id"
    })
}
)();
(function(a) {
    var b = a.Wood || {};
    a.Wood = b;
    b.CCPM = function() {
        function b(a, b) {
            return JSON.stringify({
                type: a,
                payload: b
            })
        }
        function d(a) {
            g ? wiiuErrorViewer.openByCode(a) : window.alert(a)
        }
        function e(a) {
            var b = setTimeout(function() {
                d(1119001);
                history.back()
            }, 3E4);
            var c = jQuery.Deferred();
            a.on("load", function() {
                clearTimeout(b);
                c.resolve(function(b) {
                    a[0].contentWindow.postMessage(b, k)
                })
            });
            return c.promise()
        }
        function f(b) {
            a.addEventListener("message", function(a) {
                var c = JSON.parse(a.data);
                c = c.type + ", " + c.payload + ", " + a.origin;
                g && "undefined" !== typeof wiiuDebug ? wiiuDebug.print(c) : console.log(c);
                b(a)
            }, !1)
        }
        var g = "undefined" !== typeof wiiuSystemSetting
          , h = {
            GO_BACK: "CCPM_GO_BACK",
            SET_CARD_TYPE: "CCPM_SET_CARD_TYPE",
            CHECK: "CCPM_CHECK",
            VALIDATE: "CCPM_VALIDATE",
            SAVE: "CCPM_SAVE",
            CALL_CCIF: "CCPM_CALL_CCIF",
            RETURN_CCIF: "CCPM_RETURN_CCIF"
        }
          , k = "";
        return {
            isWiiU: g,
            showError: d,
            MESSAGE: h,
            setTargetOrigin: function(a) {
                k = a
            },
            createMessage: b,
            postCCMessage: function(a, c, d) {
                a.source.postMessage(b(c, d), a.origin)
            },
            getPMPromise: e,
            onMessage: f,
            setUpCCIF: function(a) {
                k = "https://ccweb.wup.shop.nintendo.net";
                var c = e(a);
                return {
                    callCCIF: function(a) {
                        var d = jQuery.Deferred();
                        c.done(function(c) {
                            c(b(h.CALL_CCIF, a))
                        });
                        f(function(a) {
                            a = JSON.parse(a.data);
                            a.type === h.RETURN_CCIF && d.resolve(a.payload)
                        });
                        return d.promise()
                    }
                }
            }
        }
    }()
}
)(window);
(function() {
    Wood.Controller.Buy03_01 = Wood.Controller.Base.extend({
        onPageShowCache: function(a, b) {},
        preparePage: function(a, b) {
            this.historyBack = function() {
                a.initPurchaseInfo();
                a.initCardInfo();
                a.historyBack()
            }
            ;
            this.setupMenu(Wood.View.MenuBar.Type.PURCHASE);
            this.menuBar.hookBackEvent(this.historyBack);
            this.title_id = b.param("title");
            this.contract_id = b.param("contract");
            this.ccifManager = Wood.CCPM.setUpCCIF($("#card_info_frame"))
        },
        run: function(a, b) {
            var c = this.models
              , d = this;
            c.title = this.generateModel("TitleInfomation", {
                ns_uid: this.title_id
            });
            c.auto_billing = this.generateModel("AutoBilling", {
                contract_id: this.contract_id,
                language: a.language,
                country: a.country
            });
            c.prepurchase = this.generateModel("AutoBillingPrepurchaseInfo", {
                country: a.country,
                title_id: this.title_id,
                contract_id: this.contract_id,
                afterError: function() {
                    a.redirectToTop()
                }
            });
            $.when(c.title.getPromise(), c.auto_billing.getPromise(), c.prepurchase.getPromise()).done(function() {
                d.view = d.renderView("AutoBillingConfirm", {
                    model: c
                }).render();
                d.listenToOnce(d.view, "purchase", function() {
                    d.purchase(a)
                })
            })
        },
        purchase: function(a) {
            var b = a.getSessionStorage()
              , c = b.getItem("cc_type");
            if (b = b.getItem("cc_pass"))
                if (a.disableHomeButton(),
                a.disableUserOperation(),
                a.showLoadingDialog($("#dialog_msg_wait").text()),
                this.price_id = this.models.prepurchase.getPriceId(),
                c = c ? this.createCcPurchase(a, b) : this.createWalletPurchase(a, b)) {
                    var d = this
                      , e = c.model;
                    c.preparePromise.then(function() {
                        return e.getPromise()
                    }).done(function() {
                        var b = e.isPurchased()
                          , c = e.getTransactionId()
                          , d = {
                            type: "auto_billing",
                            start_day: e.getPriorBillingStartDay(),
                            purchased: b
                        };
                        c && (d.tran_id = c);
                        b && (d.extended = e.isExtended());
                        _.defer(function() {
                            a.redirectReplaceTo("buy02_03.html", d)
                        })
                    }).fail(c.fail).always(function() {
                        d.enableOperation(a)
                    })
                }
        },
        enableOperation: function(a) {
            a.enableHomeButton();
            a.enableUserOperation();
            a.hideLoadingDialog()
        },
        createWalletPurchase: function(a, b) {
            var c = this.models.wallet_purchase = this.generateModel("AutoBillingPurchaseWallet", {
                country: a.country,
                title_id: this.title_id,
                contract_id: this.contract_id,
                price_id: this.price_id,
                password: b
            });
            return {
                preparePromise: jQuery.Deferred().resolve().promise(),
                model: c,
                fail: function() {
                    a.hideLoadingDialog();
                    var b = c.getErrorCode()
                      , e = c.getErrorMessage();
                    Wood.log("AutoBillingPurchaseWallet failed: " + b);
                    switch (b) {
                    case "3160":
                        a.getSessionStorage().setItem("required_check_under_age", "true");
                        a.alert($("#dialog_msg_deleted").text(), $("#dialog_msg_ok").text());
                        a.redirectReplaceTo("money03_02.html");
                        break;
                    case "7530":
                    case "3171":
                    case "3162":
                        a.alert(e, $("#dialog_msg_ok").text());
                        a.redirectReplaceTo("money03_02.html?seq=pass");
                        break;
                    default:
                        a.redirectToTop()
                    }
                }
            }
        },
        createCcPurchase: function(a, b) {
            var c = this.models
              , d = a.getSessionStorage().getItem("postal_code")
              , e = c.prepurchase.getTotalAmount();
            e = e ? e.getTotalAmount().getRawValue() : "0";
            c.cc_prepare = this.generateModel("CcPrepare", {
                replenish_amount: e
            });
            c.cc_prepare.fetch();
            var f = this
              , g = jQuery.Deferred();
            this.ccifManager.callCCIF({
                request_id: c.cc_prepare.getRequestId(),
                application_id: c.cc_prepare.getApplicationId()
            }).done(function(b) {
                "0" !== b ? (Wood.log("ccif_error: " + b),
                b && "0" !== b ? (/^96/.test(b) || (b = "9700"),
                f.enableOperation(a),
                a.showError(c.ccif.getErrorPrefix() + b),
                f.historyBack()) : g.reject(!1)) : g.resolve(!0)
            });
            b = c.cc_purchase = this.generateModel("AutoBillingPurchaseCc", {
                country: a.country,
                title_id: this.title_id,
                contract_id: this.contract_id,
                price_id: this.price_id,
                request_id: c.cc_prepare.getRequestId(),
                application_id: c.cc_prepare.getApplicationId(),
                password: b,
                postal_code: d,
                afterError: function() {
                    var b = this.getErrorCode();
                    Wood.log("AutoBillingPurchaseCc failed: " + b);
                    a.hideLoadingDialog();
                    a.initCardInfo();
                    _.contains("7503 7504 7505 7506 7507 7508 7511 7512 7513 7514 7515 7516 7517 7518 7519 7536 9003 9004 9005 9006 9007 9008 9011 9012 9013 9014 9015 9016 9017 9018 9019 9036".split(" "), b) ? a.redirectReplaceTo("money03_02.html") : a.redirectToTop()
                }
            });
            return {
                preparePromise: g.promise(),
                model: b,
                fail: function() {}
            }
        }
    })
}
)();
(function() {
    Wood.View.AutoBillingConfirm = Wood.View.Base.extend({
        el: "#buy03_01",
        events: {
            "click .evt_purchase": "onClickPurchase"
        },
        initialize: function() {
            this.template = _.template($("#template_buy03_01").html());
            this.setup()
        },
        presenter: function() {
            var a = this.model.prepurchase
              , b = this.model.title
              , c = this.model.auto_billing
              , d = a.isPurchaseRequired()
              , e = d ? $("#str_purchase").text() : $("#str_request").text();
            a = (a = a.getTotalAmount()) ? a.getTotalAmount().getAmount() : "";
            var f = Wood.URL.create("legal03_01.html", {
                type: "title",
                title: b.getNsUid(),
                seq: "auto_billing"
            });
            return {
                is_purchase_required: d,
                button_name: e,
                is_legal_message_required: wood.client.isLegalBusinessMessageRequired(),
                icon_url: b.getIconUrl(),
                law_url: f,
                title_name: b.getTitleName(),
                plan_name: c.getName(),
                total_amount: a
            }
        },
        afterRender: function() {
            Wood.DomUtil.lazyload(this.$("img"));
            this.localizeText();
            this.hookSE();
            var a = $("AUS" === wood.client.getRegion() ? "#str_card_country_au" : "#str_card_country").text();
            $("#card_country").text(a)
        },
        onClickPurchase: function(a) {
            a.preventDefault();
            this.trigger("purchase")
        }
    })
}
)();
