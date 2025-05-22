var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(b, a, c) {
    b instanceof String && (b = String(b));
    for (var d = b.length, e = 0; e < d; e++) {
        var f = b[e];
        if (a.call(c, f, e, b))
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, a, c) {
    b != Array.prototype && b != Object.prototype && (b[a] = c.value)
}
;
$jscomp.getGlobal = function(b) {
    return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(b, a, c, d) {
    if (a) {
        c = $jscomp.global;
        b = b.split(".");
        for (d = 0; d < b.length - 1; d++) {
            var e = b[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        b = b[b.length - 1];
        d = c[b];
        a = a(d);
        a != d && null != a && $jscomp.defineProperty(c, b, {
            configurable: !0,
            writable: !0,
            value: a
        })
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(b) {
    return b ? b : function(a, b) {
        return $jscomp.findInternal(this, a, b).v
    }
}, "es6", "es3");
(function() {
    Wood.Controller.Data04_01 = Wood.Controller.Base.extend({
        onPageShowCache: function(b, a) {
            Wood.DomUtil.hideBody();
            b.initPurchaseInfo();
            b.initCardInfo();
            this.view && (this.view.$el.off(),
            this.view.stopListening(),
            this.view = null);
            this.run(b, a)
        },
        preparePage: function(b, a) {
            this.title_id = a.param("title");
            b.disableUserOperation();
            this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
            Wood.Analytics.addDirectoryAttr(this.getDirectoryBeaconParam()).sendVirtualPV("VP_Ticket_List")
        },
        run: function(b, a) {
            var c = this
              , d = this.models;
            d.title = this.generateModel("TitleInfomation", {
                ns_uid: this.title_id
            });
            d.owned_tickets = this.generateModel("OwnedTickets", {
                title_id: this.title_id
            });
            d.info = this.generateModel("TicketsInfo", {
                country: b.country,
                language: b.language,
                offset: 0,
                limit: 50,
                title_id: this.title_id,
                afterError: function() {
                    b.historyBack()
                }
            });
            d.id_pair = this.generateModel("IdPair", {
                ns_uid: this.title_id
            });
            $.when(d.title.getPromise(), d.owned_tickets.getPromise(), d.info.getPromise(), d.id_pair.getPromise()).done(function() {
                var e = d.info.getTickets();
                0 === d.info.getLength() ? (b.alert($("#dialog_msg_nocontent").text(), $("#dialog_msg_ok").text()),
                b.historyBack()) : (c.limitAge(d.title, Wood.Rating.ActionType.PURCHACE),
                c.limitParentalControl(d.title),
                c.view = c.renderView("TicketPurchase", {
                    model: d,
                    title_id: c.title_id,
                    back_evt: c.createAppJumpBackEvent(b, a)
                }),
                c.showPage(),
                d.info.canAutoBilling() && c.runAutoBilling(b),
                d.prices = c.generateModel("TicketPriceList", {
                    country: b.country,
                    language: b.language,
                    ticket_ids: _.pluck(e, "id")
                }),
                $.when(d.prices.getPromise()).done(function() {
                    c.trigger("resolvedPrices")
                }))
            })
        },
        runAutoBilling: function(b) {
            var a = this
              , c = a.generateModel("AutoBillingList", {
                title_id: a.title_id,
                language: b.language,
                country: b.country
            });
            $.when(c.getPromise()).done(function() {
                var d = c.getContracts()
                  , e = a.generateModel("AutoBillingPriceList", {
                    contract_ids: _.pluck(d, "id"),
                    language: b.language,
                    country: b.country
                });
                $.when(e.getPromise()).done(function() {
                    a.listenTo(a.view, "cancelAutoBilling", function() {
                        a.cancelAutoBilling(b)
                    });
                    a.trigger("resolvedAutoBillingList", {
                        auto_billing: c,
                        auto_billing_price: e
                    })
                })
            })
        },
        cancelAutoBilling: function(b) {
            var a = this.models.owned_tickets.getContractId();
            a = this.generateModel("AutoBillingCancel", {
                contract_id: a,
                afterError: function() {
                    b.enableUserOperation();
                    b.redirectToTop()
                }
            });
            var c = this;
            b.showLoadingIcon();
            $.when(a.getPromise()).done(function() {
                b.enableUserOperation();
                b.hideLoadingIcon();
                b.alert($("#dialog_msg_auto_billing_cancel_done").text(), $("#dialog_msg_ok").text());
                c.reload()
            })
        }
    })
}
)();
(function() {
    var b = {
        NONE: 0,
        PR: 1,
        DR_SIBLING: 2,
        DR_SELF: 3,
        EXCEED: 4,
        AUTO_BILLING: 5
    };
    Wood.View.Ticket = Backbone.View.extend({
        getTicketStatuses: function(a, c, d, e) {
            a = this.getOwnedTicketStatuses(a, c);
            c = 864E5 * e;
            e = a.active_ticket ? 1E3 * a.active_ticket.getExpireSec() : (new Date).getTime();
            a.ticket_owned_status !== b.AUTO_BILLING && a.ticket_owned_status !== b.DR_SIBLING && a.ticket_owned_status !== b.PR && d.ticket.limit && d.ticket.limit.value && (d = d.ticket.limit.value,
            c = (new Date).getTime() + c,
            d = parseInt(e, 10) + 1E3 * parseInt(d, 10),
            c < d && (a.ticket_owned_status = b.EXCEED));
            return a
        },
        getOwnedTicketStatuses: function(a, c) {
            var d = {
                ticket_owned_status: null,
                max_exp_date: null,
                active_ticket: null,
                next_purchase_date: null,
                has_ticket_history: !1
            }
              , e = 0
              , f = 0
              , g = (new Date).getTime();
            a.getTickets().forEach(function(a) {
                if (a.getTitleId().substring(9, 14) === c.getTitleId().substring(9, 14) && (d.has_ticket_history = !0,
                d.ticket_owned_status !== b.AUTO_BILLING)) {
                    if (a.isAutoBilling() && a.isAccountSelf())
                        return d.ticket_owned_status = b.AUTO_BILLING,
                        d.next_purchase_date = a.getNextPurchaseDate(),
                        !1;
                    if (a.isLimitPermanent())
                        return d.ticket_owned_status = b.PR,
                        !1;
                    if (a.isLimitDuration()) {
                        e = 1E3 * a.getExpireSec();
                        if (e <= g)
                            return !0;
                        a.isAccountSibling() ? d.ticket_owned_status = b.DR_SIBLING : d.ticket_owned_status !== b.DR_SIBLING && a.isAccountSelf() && (d.ticket_owned_status = b.DR_SELF);
                        if (f > e)
                            return !0;
                        f = e;
                        d.active_ticket = a;
                        return !0
                    }
                }
            });
            d.ticket_owned_status = d.ticket_owned_status || b.NONE;
            d.max_exp_date = f;
            return d
        },
        getLimitDate: function(a) {
            var b = null;
            a && (b = a.limit.date.split("-"),
            a = a.limit.time.split(":"),
            $(".sel_limit").text($("#str_limit").text()),
            b = $("#str_date_format").html().replace("%{yyyy}", b[0]).replace("%{MM}", b[1]).replace("%{dd}", b[2]).replace("%{hh}", a[0]).replace("%{mm}", a[1]));
            return b
        },
        renderAttention: function(a, c, d, e) {
            var f = $("#sel_attention");
            switch (a) {
            case b.PR:
                f.hide();
                $("#sel_PR").show();
                $("#sel_PR_other").hide();
                $(".sel_limit").text($("#str_limit").text());
                $(".sel_limit_time").text($("#str_no_limit").text());
                break;
            case b.DR_SIBLING:
                f.hide();
                $("#sel_PR").hide();
                $("#sel_PR_other").show();
                $(".sel_limit_time").text(c);
                break;
            case b.DR_SELF:
                f.show();
                $("#sel_PR").hide();
                $("#sel_PR_other").hide();
                $(".sel_limit_time").text(c);
                break;
            case b.EXCEED:
                f.hide();
                $("#sel_PR").hide();
                $("#sel_PR_other").hide();
                a = $("#sel_total_over").text().replace("%{0}", d);
                $("#sel_total_over").text(a);
                $("#sel_total_over").show();
                c ? $(".sel_limit_time").text(c) : ($(".sel_limit").text($("#str_none").text()),
                $(".sel_limit_time").text(""));
                break;
            case b.AUTO_BILLING:
                f.hide();
                $("#sel_AUTO_BILLING").show();
                e && (c = e.split("-"),
                c = $("#str_auto_billing_next_purchase_date").text().replace("%{yyyy}", c[0]).replace("%{MM}", c[1]).replace("%{dd}", c[2]),
                $(".sel_limit").text($("#str_is_auto_billing").text()),
                $(".sel_limit_time").text(c));
                break;
            default:
                f.show(),
                $("#sel_PR").hide(),
                $("#sel_PR_other").hide(),
                $(".sel_limit").text($("#str_none").text()),
                $(".sel_limit_time").text("")
            }
            f.css("visibility", "visible")
        },
        getAutoBillingAttention: function(a) {
            switch (a) {
            case b.PR:
                a = $("#sel_PR").html();
                break;
            case b.DR_SIBLING:
                a = $("#sel_PR_other").html();
                break;
            case b.DR_SELF:
                a = $("#sel_attention").html();
                break;
            default:
                a = $("#sel_attention").html()
            }
            return a
        },
        isAutoBilling: function(a) {
            return a === b.AUTO_BILLING
        },
        canPurchase: function(a) {
            return !_.contains([b.PR, b.DR_SIBLING, b.EXCEED], a)
        },
        renderPurchase: function(a) {
            this.canPurchase(a) ? (a = this.getBuyURL(),
            $("#template_redeem").tmpl({
                url_purchase: a,
                str_next: $("#str_next").html()
            }).appendTo("#sel_buy")) : $("#template_redeem_off").tmpl({
                str_next: $("#str_next").html()
            }).appendTo("#sel_buy")
        }
    }, {
        TICKET_STATUS: b
    })
}
)();
(function() {
    var b, a, c, d;
    Wood.View.TicketPurchase = Wood.View.Ticket.extend({
        el: "#wrapper > div",
        events: {
            "click .evt_show_detail": "onClickShowDetail",
            "click .evt_show_auto_billing_detail": "onClickShowAutoBillingDetail",
            "click .evt_show_auto_billing_cancel": "onClickShowAutoBillingCancel",
            "click .evt_auto_billing_purchase": "onClickAutoBillingPurchase",
            "click .evt_show_auto_billing_cancel_confirm": "onClickShowAutoBillingCancelConfirm",
            "click .evt_auto_billing_cancel": "onClickAutoBillingCancel"
        },
        initialize: function() {
            b = this.$("#data04_01");
            a = this.$("#data04_02");
            c = this.$("#use_ticket_r");
            a.empty();
            c.empty();
            d = this;
            this.title_id = this.options.title_id;
            this.$body = $("body");
            this.last_scroll = 0;
            this.render()
        },
        render: function() {
            b.show();
            a.hide();
            var e = this.model.owned_tickets
              , c = this.model.id_pair
              , g = this.model.info.getMaxServiceDays();
            e = this.statuses = this.getOwnedTicketStatuses(e, c);
            c = e.ticket_owned_status;
            this.has_ticket_history = e.has_ticket_history;
            this.max_exp_date = e.max_exp_date;
            this.can_purchase = this.canPurchase(c);
            this.is_auto_billing = this.isAutoBilling(c);
            this.renderTickets(this.model.info);
            var l = this.getLimitDate(e.active_ticket);
            this.renderAttention(c, l, g, e.next_purchase_date);
            Wood.DomUtil.lazyload("img.lazy");
            this.listenTo(this.options.controller, "resolvedPrices", this.renderPrices);
            this.listenTo(this.options.controller, "resolvedAutoBillingList", this.renderAutoBilling);
            this.opened_detail = !1;
            var k = this.options.controller.menuBar
              , h = this.options.back_evt;
            if (!k.initial_back_event)
                return k.hookBackEvent(function() {
                    if (d.opened_detail)
                        return d.opened_detail = !1,
                        b.show(),
                        a.hide(),
                        a.children().hide(),
                        k.allowScroll(),
                        Wood.DomUtil.animateToTop(d.last_scroll),
                        !1;
                    h()
                }),
                this
        },
        onClickShowDetail: function(a) {
            a.preventDefault();
            a = $(a.currentTarget).data("detail");
            a = $(a);
            this.showDetail(a)
        },
        showDetail: function(e) {
            this.last_scroll = this.$body.scrollTop();
            b.hide();
            a.show();
            e.show();
            Wood.DomUtil.animateToTop();
            this.opened_detail = !0
        },
        renderTickets: function(a) {
            var b = this.str_title = a.getName()
              , e = $("#str_attention").html().replace("%{title}", b);
            $("#sel_attention").html(e);
            e = a.getTicketBannerUrl();
            var d = a.getDescription()
              , c = a.getMaxServiceDays();
            $("#sel_max_days").attr("data-max-days", c);
            var h = $("#sel_max_days").html().replace("%{0}", c);
            this.str_total_over = $("#str_total_over").html().replace("%{0}", c);
            $("#sel_max_days").html(h).show();
            $("#sel_title").html(b);
            $("#sel_banner").data("original", e);
            $("#sel_desc").html(d);
            _.each(a.getTickets(), this.renderTicket)
        },
        renderTicket: function(b) {
            var e = b.id
              , g = b.name
              , l = b.description
              , k = b.initial_purchase_only
              , h = "";
            b.limit && 0 < b.limit.value && (h = b.limit.value);
            b = Wood.URL.create("buy01_01.html", {
                type: "ticket",
                title: d.title_id,
                ticket: e
            });
            var n = wood.client.isLegalBusinessMessageRequired() ? "table" : "none";
            $("#template_ticket").tmpl({
                url_detail: "#ticket" + e,
                data_ticket_id: e,
                data_initial_only: k,
                str_ticket_name: g,
                str_sale: $("#str_sale").text()
            }).appendTo(c);
            $("#template_detail").tmpl({
                id_ticket: "ticket" + e,
                str_title: d.str_title,
                str_sale: $("#str_sale").text(),
                str_ticket_title: g,
                ticket_desc: l,
                data_ticket_value: h,
                url_buy: b,
                str_law: $("#str_law").text(),
                param_disp: n,
                ns_uid: d.title_id,
                str_only: $("#str_only").html(),
                html_total_over: d.str_total_over,
                str_buy: $("#str_buy").text()
            }).appendTo(a)
        },
        renderAutoBilling: function(e) {
            var c = e.auto_billing
              , g = e.auto_billing_price.getPrices();
            e = c.getContracts();
            if (this.is_auto_billing || 0 !== _.size(e)) {
                e = _.map(e, function(a) {
                    var b = _.find(g, function(b) {
                        return b.getContractId() === a.id
                    });
                    return {
                        id: a.id,
                        name: a.name,
                        price: b.getRegularPrice().getAmount()
                    }
                });
                c = this.createImageTag(c.getDescription(), c.getImages());
                var l = this.getAutoBillingAttention(this.statuses.ticket_owned_status)
                  , k = b.find(".sel_limit").text()
                  , h = b.find(".sel_limit_time").text()
                  , n = Wood.URL.create("legal03_01.html", {
                    type: "title",
                    title: this.title_id
                });
                this.is_auto_billing ? (e = {
                    str_title: d.str_title,
                    limit: k,
                    limit_time: h,
                    description: c
                },
                $("#template_auto_billing_cancel").tmpl(e).appendTo(a),
                $("#template_auto_billing_cancel_confirm").tmpl(e).appendTo(a)) : $("#template_auto_billing_detail").tmpl({
                    str_title: d.str_title,
                    description: c,
                    limit: k,
                    limit_time: h,
                    contracts: e,
                    attention: l,
                    law_url: n,
                    can_purchase: this.can_purchase
                }).appendTo(a);
                this.renderAutoBillingButton();
                Wood.DomUtil.localizeText(a);
                Wood.DomUtil.hookSoundEffectEvent(a)
            }
        },
        createImageTag: function(a, b) {
            return a ? b && b.image ? a.replace(/\(image:(\d*?)\)/g, function(a, e) {
                e = parseInt(e, 10);
                var c = _.find(b.image, function(a) {
                    return a.index === e
                });
                return c ? '<img src="' + c.url + '" class="" width="' + c.width + '" height="' + c.height + '" />' : a
            }) : a : ""
        },
        renderAutoBillingButton: function() {
            var a = $("#auto_billing_button");
            a.find("a").addClass(this.is_auto_billing ? "evt_show_auto_billing_cancel" : "evt_show_auto_billing_detail");
            a.show()
        },
        onClickShowAutoBillingDetail: function(a) {
            a.preventDefault();
            this.showDetail($("#auto_billing_detail"))
        },
        onClickShowAutoBillingCancel: function(a) {
            a.preventDefault();
            this.showDetail($("#auto_billing_cancel"))
        },
        onClickAutoBillingPurchase: function(a) {
            a.preventDefault();
            a = $(a.currentTarget).data("contract-id");
            a = wood.client.isMailAddressValidated() ? Wood.URL.create("buy01_01.html", {
                type: "auto_billing",
                title: this.title_id,
                contract: a
            }) : Wood.URL.create("set09_01.html", {
                title: this.title_id,
                contract: a
            });
            wood.client.redirectTo(a)
        },
        onClickShowAutoBillingCancelConfirm: function(a) {
            a.preventDefault();
            $("#auto_billing_cancel").hide();
            $("#auto_billing_cancel_confirm").show()
        },
        onClickAutoBillingCancel: function(a) {
            a.preventDefault();
            wood.client.confirm($("#dialog_msg_auto_billing_cancel_confirm").text(), $("#str_cancel").text(), $("#dialog_msg_auto_billing_cancel_do").text()) && (wood.client.disableUserOperation(),
            this.trigger("cancelAutoBilling"))
        },
        renderPrices: function() {
            var a = this.model.prices.getPrices();
            this.current_ms = (new Date).getTime();
            var b = _.bind(this.renderPrice, this);
            _.each(a, b);
            wood.client.enableUserOperation()
        },
        renderPrice: function(a) {
            var b = a.getTicketId()
              , c = $("#use_ticket_r li[data-ticket-id=" + b + "]")
              , d = $("a", c)
              , e = $("#ticket" + b);
            b = $(c).data("initial-only");
            var h = !1
              , n = $("#str_DL").text()
              , p = a.getRegularPrice()
              , m = a.getDiscountPrice();
            null !== m ? (m.getAmount(),
            m.getId(),
            h = m.isFree(),
            $(".sel_sale", d).show(),
            $(".sel_sale", e).show(),
            $(".sel_ticket_price", d).addClass("sale"),
            $(".sel_ticket_price", e).addClass("sale"),
            $(".sel_regular_price", d).text(p.getAmount()),
            $(".sel_regular_price", e).text(p.getAmount()),
            (d = m.getDescription()) && $(".data04_02_price_desc", e).html(d).show()) : (p.getAmount(),
            h = p.isFree(),
            $(".sel_sale", d).hide(),
            $(".sel_ticket_price", d).removeClass("sale"),
            $(".sel_ticket_price", e).removeClass("sale"),
            $(".sel_regular_price", d).hide(),
            $(".sel_regular_price", e).hide(),
            $(".data04_02_price_desc", e).hide(),
            $(".strike-through", d).hide(),
            $(".strike-through", e).hide());
            var q = Wood.DomUtil.getTaxTextWithPriceObject(m || p);
            _.defer(function() {
                $(".sel_ticket_price", c).html(q);
                $(".sel_ticket_price", e).html(q)
            });
            h && $("a.sel_buy > span", e).text(n);
            this.renderStatus(a, c, e, b)
        },
        renderStatus: function(a, b, c, l) {
            a.isSalesTerminated() ? 0 < $("a", b).size() && ($("a", b).remove(),
            $(b).attr("class", "ticket-btn-not-buy"),
            $("span.btn_ut_r", b).text($("#str_undefined").text()),
            $("dl.lf dd", c).text($("#str_undefined").text())) : !d.can_purchase || d.is_auto_billing || 1 === l && d.has_ticket_history ? 0 < $("a", b).size() && ($("span", b).unwrap(),
            $("a", b).remove(),
            $(b).attr("class", "ticket-btn-not-buy"),
            $(".sel_regular_price", b).wrap('<div class="strike-through price-above" />'),
            $(".sel_ticket_price", b).removeClass("sale"),
            $(".ticket-total-contain", c).hide(),
            $(".ticket-disable-total-over", c).show()) : this.isOverMaxDays(c.data("ticket-value")) ? ($(".ticket-total-contain", c).hide(),
            $(".ticket-disable-total-over", c).show()) : ($(".ticket-total-contain", c).show(),
            $(".ticket-disable-total-over", c).hide())
        },
        isOverMaxDays: function(a) {
            var b = 864E5 * $("#sel_max_days").data("max-days")
              , c = 1E3 * parseInt(a, 10);
            return (d.max_exp_date > d.current_ms && "" !== a ? d.max_exp_date + c : d.current_ms + c) > d.current_ms + b
        }
    })
}
)();
(function() {
    Wood.Model.IdPair = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/titles/id_pair"
        },
        fetch: function(b) {
            var a = this.getBaseAjaxParam();
            $.extend(a, {
                type: "GET",
                async: !1,
                data: {
                    "ns_uid[]": this.ns_uid
                },
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(a, b);
            this.fetchJSON(a)
        },
        parse: function(b) {
            return b.title_id_pairs.title_id_pair[0]
        },
        getNsUid: function() {
            return this.get("ns_uid")
        },
        getTitleId: function() {
            return this.get("title_id")
        },
        getType: function() {
            return this.get("type")
        }
    })
}
)();
(function() {
    Wood.Model.Ticket = function(b) {
        this.title_id = b.title_id;
        this.account_type = b.account_type;
        this.limit = b.limit;
        this.auto_billing = b.auto_billing
    }
    ;
    Wood.Model.Ticket.prototype = {
        getTitleId: function() {
            return this.title_id
        },
        isAccountSelf: function() {
            return "SELF" === this.account_type
        },
        isAccountSibling: function() {
            return "SIBLING" === this.account_type
        },
        isLimitPermanent: function() {
            return "PR" === this.limit.type
        },
        isLimitDuration: function() {
            return "DR" === this.limit.type
        },
        isAutoBilling: function() {
            return this.auto_billing && this.auto_billing.applied
        },
        getNextPurchaseDate: function() {
            return this.auto_billing && this.auto_billing.next_purchase_date
        },
        getExpireSec: function() {
            return this.isLimitDuration() ? parseInt(this.limit.value, 10) : null
        }
    }
}
)();
(function() {
    Wood.Model.OwnedTickets = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/owned_tickets"
        },
        fetch: function(b) {
            var a = this.getBaseAjaxParam();
            $.extend(a, {
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
            $.extend(a, b);
            this.fetchJSON(a)
        },
        parse: function(b) {
            Wood.log(JSON.stringify(b, null, "    "));
            return b.owned_tickets
        },
        isEmpty: function() {
            return !this.get("owned_ticket")
        },
        getContractId: function() {
            var b = this.get("owned_ticket")
              , a = null;
            return a = _.reduce(b, function(a, b) {
                return a || b && b.auto_billing && b.auto_billing.ns_uid
            }, null)
        },
        getTickets: function() {
            var b = this.get("owned_ticket");
            if (!b || 0 === b.length)
                return [];
            for (var a = [], c = b.length, d = 0; d < c; d++)
                a.push(new Wood.Model.Ticket(b[d]));
            return a
        }
    })
}
)();
(function() {
    Wood.Model.TicketsInfo = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/title/" + this.title_id + "/tickets"
        },
        fetch: function(b) {
            var a = this.getBaseAjaxParam()
              , c = {
                offset: this.offset,
                limit: this.limit,
                lang: this.language
            };
            _.each(c, function(a, b) {
                _.isUndefined(a) && delete c[b]
            });
            $.extend(a, {
                type: "GET",
                async: !1,
                data: c,
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(a, b);
            this.fetchJSON(a)
        },
        parse: function(b) {
            return b.title
        },
        getTicketById: function(b) {
            var a = this.getTickets();
            if (!a || 0 === a.length)
                return null;
            for (var c = a.length, d = 0; d < c; d++) {
                var e = a[d];
                if (e.id === b)
                    return e
            }
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.TicketsInfo, {
        getName: "name",
        getTicketBannerUrl: "tickets_banner_url",
        getDescription: "tickets_description",
        getMaxServiceDays: "max_service_days",
        getLength: "tickets.length",
        getTickets: "tickets.ticket",
        canAutoBilling: "auto_billing"
    })
}
)();
(function() {
    function b(a) {
        if (Wood.Util.isUndefined(a))
            throw Error("price status not stored");
    }
    Wood.Model.OnlinePrice = Wood.Model.Base.extend({
        getSalesStatus: function() {
            return this.get("eshop_sales_status")
        },
        isUnreleased: function() {
            var a = this.getSalesStatus();
            b(a);
            return "unreleased" === a
        },
        isOnSale: function() {
            var a = this.getSalesStatus();
            b(a);
            return "onsale" === a
        },
        isDownloadTerminated: function() {
            var a = this.getSalesStatus();
            b(a);
            return "download_termination" === a
        },
        isSalesTerminated: function() {
            var a = this.getSalesStatus();
            b(a);
            return "sales_termination" === a
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
            for (var b = [], d = a.conditional_prices.conditional_price, e = d.length, f = 0; f < e; f++)
                a = d[f],
                b.push(new Wood.Price(a.id,a.raw_value,a.amount,a.currency,Wood.Price.DiscountType.CONDITIONAL,a.description));
            return b
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
                for (var l = 0, k = 0; k < g; k++)
                    f[b.conditional_contents.conditional_content[k]] && l++;
                if (0 < l && l === g)
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
    Wood.Model.TicketPrice = Wood.Model.OnlinePrice.extend({
        getTicketId: function() {
            return this.get("ticket_id")
        }
    })
}
)();
(function() {
    Wood.Model.TicketPriceList = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI_ORIGIN + "ws/" + this.country + "/tickets/prices"
        },
        fetch: function(b) {
            var a = this.getBaseAjaxParam();
            $.extend(a, {
                type: "GET",
                async: !1,
                data: {
                    "ticket[]": this.ticket_ids.join(","),
                    lang: this.language
                },
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(a, b);
            this.fetchJSON(a)
        },
        parse: function(b) {
            return b.online_prices
        },
        getPrices: function() {
            var b = this.get("online_price");
            return b ? _.map(b, function(a) {
                return (new Wood.Model.TicketPrice).set(a)
            }) : []
        }
    })
}
)();
(function() {
    Wood.Model.AutoBillingList = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/title/" + this.title_id + "/auto_billing"
        },
        fetch: function(b) {
            var a = this.getBaseAjaxParam();
            $.extend(a, {
                type: "GET",
                data: {
                    lang: this.language
                },
                async: !1,
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(a, b);
            this.fetchJSON(a)
        },
        parse: function(b) {
            return b.contracts
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.AutoBillingList, {
        getDescription: "description",
        getImages: "description_images",
        getContracts: "contract"
    })
}
)();
(function() {
    Wood.Model.AutoBillingCancel = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/auto_billing/" + this.contract_id + "/!cancel"
        },
        fetch: function(b) {
            var a = this.getBaseAjaxParam();
            $.extend(a, {
                type: "POST",
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(a, b);
            this.fetchJSON(a)
        },
        parse: function(b) {
            return b
        }
    })
}
)();
(function() {
    Wood.Model.AutoBillingPrice = Wood.Model.OnlinePrice.extend({
        getContractId: function() {
            return this.get("contract_id")
        }
    })
}
)();
(function() {
    Wood.Model.AutoBillingPriceList = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/auto_billing/prices"
        },
        fetch: function(b) {
            var a = this.getBaseAjaxParam();
            $.extend(a, {
                type: "GET",
                data: {
                    "contract[]": this.contract_ids.join(","),
                    lang: this.language
                },
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(a, b);
            this.fetchJSON(a)
        },
        parse: function(b) {
            return b.online_prices
        },
        getPrices: function() {
            var b = this.get("online_price");
            return b ? _.map(b, function(a) {
                return (new Wood.Model.AutoBillingPrice).set(a)
            }) : []
        }
    })
}
)();
