(function() {
    Wood.Model.NfcMessage = Wood.Model.Base.extend({
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
            Wood.log(this.url() + "\n" + JSON.stringify(a, null, "    "));
            return a.nfc_message
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.NfcMessage, {
        getTransactionId: "transaction_id",
        getMessage: "message"
    })
}
)();
(function() {
    Wood.Model.NfcTrnBase = Wood.Model.Base.extend({
        parse: function(a) {
            Wood.log(this.url() + "\n" + JSON.stringify(a, null, "    "));
            return a.nfc_transaction
        },
        isIncomplete: function() {
            return "INCOMPLETE" === this.getStatus()
        },
        isSupportProcessing: function() {
            return "SUPPORT_PROCESSING" === this.getStatus()
        },
        isRecoverIgnore: function() {
            return "RECOVER_IGNORE" === this.getStatus()
        },
        isRecoverSuccess: function() {
            return "RECOVER_SUCCESS" === this.getStatus()
        },
        isRequireHistory: function() {
            return "REQUIRE_HISTORY" === this.getStatus()
        },
        getPostBalance: function() {
            return this.createBalance("transaction_result.post_balance")
        },
        createBalance: function(a) {
            var b = new Wood.Model.MoneyType;
            a = this.getSafe(a);
            if (!a)
                return null;
            b.set(a);
            return b
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.NfcTrnBase, {
        getId: "id",
        getStatus: "status",
        getDate: "date"
    })
}
)();
(function() {
    Wood.Model.NfcAdd = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/balance/current/!nfc_add"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                async: !1,
                timeout: 12E4,
                data: {
                    message: this.message,
                    result_code: this.result_code
                },
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            Wood.log(this.url() + "\n" + JSON.stringify(a, null, "    "));
            return a.transaction_result
        },
        getTransactionId: function() {
            return this.get("transaction_id")
        },
        getIntegratedAccount: function() {
            return this.get("integrated_account")
        },
        getPostBalance: function() {
            return this.createBalance("post_balance")
        },
        getNfcBalance: function() {
            return this.createBalance("nfc_balance")
        },
        getInsufficient: function() {
            return this.getSafe("nfc_balance.insufficient")
        },
        createBalance: function(a) {
            var b = new Wood.Model.MoneyType;
            b.set(this.get(a));
            return b
        }
    })
}
)();
(function() {
    Wood.Model.NfcPrepare = Wood.Model.NfcMessage.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/balance/current/!nfc_prepare"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                async: !1,
                data: {
                    replenish_amount: this.replenish_amount
                },
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
    Wood.Model.NfcCancel = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/balance/current/!nfc_cancel"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                async: !1,
                data: {
                    transaction_id: this.transaction_id
                },
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            Wood.log("nfc canceld. :" + this.transaction_id);
            return a
        }
    })
}
)();
(function() {
    Wood.Model.NfcTrnIncomplete = Wood.Model.NfcTrnBase.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/nfc_transactions/incomplete_transaction"
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
        getAmount: function() {
            var a = new Wood.Model.MoneyType;
            a.set(this.get("amount"));
            return a
        }
    })
}
)();
(function() {
    Wood.Model.ReplenishAmounts = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/country/" + this.country + "/replenish_amounts"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                async: !1,
                data: {
                    lang: this.language
                },
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.replenish_amounts
        },
        getAmounts: function() {
            return this.get("replenish_amount")
        }
    })
}
)();
(function() {
    Wood.Model.PrereplenishInfo = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/balance/prereplenish_info"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "GET",
                async: !1,
                data: {
                    replenish_amount: this.replenish_amount
                },
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.prereplenish_info
        },
        getCurrentBalance: function() {
            return this.createBalance("current_balance")
        },
        getPostBalance: function() {
            return this.createBalance("post_balance")
        },
        getReplenishBalance: function() {
            return this.createBalance("replenish_amount")
        },
        createBalance: function(a) {
            var b = new Wood.Model.MoneyType;
            b.set(this.get(a));
            return b
        }
    })
}
)();
(function() {
    Wood.Controller.Nfc = Wood.Controller.Base.extend({
        isConnectedToDrc: function(a) {
            return a.isDrc() ? !0 : a.confirm($("#dialog_msg_drc").text(), $("#dialog_msg_cancel").text(), $("#dialog_msg_ok").text()) ? this.isConnectedToDrc(a) : !1
        },
        alertIfPollingError: function(a, b, c, d) {
            a && a.error && _.contains([1114701, 1114702], a.error.code) && (b.enablePowerButton(),
            _.isFunction(c) && c(),
            b.alert($("#dialog_msg_network_error").text(), $("#dialog_msg_ok").text()),
            _.isFunction(d) && d())
        }
    })
}
)();
(function() {
    Wood.Controller.Money06_01 = Wood.Controller.Nfc.extend({
        BGM: "setting",
        is_prohibiting_cancel: !1,
        is_complete: !1,
        onPageShow: function(a, b) {},
        onPageShowCache: function(a, b) {},
        preparePage: function(a, b) {
            this.setupMenu(Wood.View.MenuBar.Type.BALANCE);
            this.createBackEvent(a);
            this.hideMenuBar();
            this.menuBar.unhookButtonEvent()
        },
        run: function(a, b) {
            this.switcher = this.generateView("Nfc.Switcher", {
                controller: this
            });
            this.checkNfcAvailable(a);
            this.checkOldClient(a);
            this.setMoneyReferrer(a, b);
            this.checkIncompleteTransaction(a);
            this.checkParentalControl(a, b);
            this.showMenuBar();
            this.is_section_iccard ? (b = this.models.pre = this.generateModel("PrereplenishInfo", {
                replenish_amount: b.param("amount"),
                async: !1
            }),
            b.fetch(),
            b = b.getReplenishBalance(),
            this.nfcTransaction(a, {
                amount: b.getAmount(),
                raw_value: b.getRawValue()
            })) : this.selectAmount(a)
        },
        checkNfcAvailable: function(a) {
            a.isNfcAvailable() || a.historyBack()
        },
        checkOldClient: function(a) {
            a.isWiiU() && !a.isDefinedShowLoadingDialog() && (Wood.log("wiiuDialog.showLoading is not defined."),
            a.showError(Wood.ErrorCode.CLOSE_APPLICATION),
            a.errorShutdown())
        },
        checkIncompleteTransaction: function(a) {
            var b = this.models.incomplete = this.generateModel("NfcTrnIncomplete");
            b.fetch();
            if (b.isIncomplete())
                this.replaceToRecover(a);
            else if (b.isSupportProcessing()) {
                if ("true" === a.getSessionStorage().getItem("pin_code_checked_money"))
                    return;
                var c = b.getId().replace(/(.{4})/g, "$1 ")
                  , d = b.getDate().replace(/\//g, " / ")
                  , e = $("#dialog_msg_support").text();
                e = e.replace("%{id}", c).replace("%{date}", d);
                a.alert(e, $("#dialog_msg_ok").text())
            }
            "3239" === b.getErrorCode() && this.back_event()
        },
        checkParentalControl: function(a, b) {
            var c = a.getSessionStorage()
              , d = null !== c.getItem("buying_shortfall") ? a.isLockedForEShop() : a.getParentalControlForEShop();
            "true" !== c.getItem("pin_code_checked_money") && d ? a.redirectReplaceTo("legal01_01.html?seq=" + this.createSequence(b) + "#money") : c.removeItem("pin_code_checked_money")
        },
        createSequence: function(a) {
            return encodeURIComponent(a.getFilename() + "?" + a.getSearch())
        },
        replaceToRecover: function(a) {
            a.redirectReplaceTo("money07_01.html")
        },
        setMoneyReferrer: function(a, b) {
            a = a.getSessionStorage();
            var c = b.param("buying_section");
            if (this.is_section_iccard = "iccard" === c) {
                var d = b.param("type")
                  , e = a.getItem("coupon_code")
                  , f = a.getItem("buying_coupon_instance_code");
                e = e ? "&coupon_code=" + encodeURIComponent(e) : f ? "&coupon_ins=" + encodeURIComponent(f) : "";
                e = "buy01_01.html?type=" + d + "&title=" + b.param("title") + e + "&buying_section=" + c;
                a.setItem("buying_section", c);
                switch (d) {
                case "title":
                    a.setItem("money_referrer", e);
                    break;
                case "aoc":
                    a.setItem("buying_aoc", b.param("aoc[]"));
                    a.setItem("money_referrer", e + "&aoc[]=" + b.param("aoc[]"));
                    break;
                case "ticket":
                    a.setItem("buying_ticket", b.param("ticket")),
                    a.setItem("money_referrer", e + "&ticket=" + b.param("ticket"))
                }
            }
        },
        createBackEvent: function(a) {
            var b = this;
            return this.back_event = function() {
                a.enableHomeButton();
                a.enablePowerButton();
                var c = a.getSessionStorage()
                  , d = c.getItem("buying_section");
                "bal" === d || "iccard" === d ? a.redirectReplaceTo(c.getItem("money_referrer")) : b.is_complete ? a.historyBack() : a.redirectReplaceTo("money01_01.html")
            }
        },
        selectAmount: function(a) {
            var b = this.models
              , c = this;
            b.amounts = this.generateModel("ReplenishAmounts", {
                language: a.language,
                country: a.country,
                async: !0
            });
            var d = this.switcher.generateAndSwitchView({
                name: "SELECT_AMOUNT",
                view_class: "Nfc.SelectAmount",
                options: {
                    model: b.amounts
                },
                back_evt: this.back_event
            });
            this.listenTo(d, "selectedAmount", _.debounce(function(b) {
                Wood.log(b.raw_value);
                a.disableUserOperation();
                _.delay(function() {
                    c.nfcTransaction(a, b)
                }, 500)
            }, 1E3, !0));
            b.amounts.fetch()
        },
        cancelNfcTrn: function(a) {
            var b = this.models
              , c = this;
            a.tryWiiU(function() {
                b.nfc_cancel = c.generateModel("NfcCancel", {
                    transaction_id: b.nfc_prepare.getTransactionId()
                });
                b.nfc_cancel.fetch()
            })
        },
        nfcTransaction: function(a, b) {
            if (this.isConnectedToDrc(a)) {
                a.enableUserOperation();
                a.disableHomeButton();
                this.replenish_amount = b.raw_value;
                this.post_amount = b.amount;
                var c = this;
                this.transaction_view && this.transaction_view.$el.off();
                var d = function() {
                    var b = a.cancelNfc();
                    b && (c.stopListening(a.nfc),
                    c.cancelNfcTrn(a),
                    a.enableHomeButton(),
                    a.enablePowerButton(),
                    a.alert($("#str_ic_cancel").text(), $("#dialog_msg_ok").text()));
                    return b
                };
                this.transaction_view = this.switcher.generateAndSwitchView({
                    name: "TRANSACTION",
                    view_class: "Nfc.Transaction",
                    options: {
                        amount: this.post_amount
                    },
                    back_evt: function() {
                        d() && (c.is_section_iccard ? c.back_event() : (c.switcher.switchTo("SELECT_AMOUNT"),
                        c.menuBar.allowScroll()))
                    },
                    top_evt: function() {
                        return d()
                    }
                });
                a.tryWiiU(function() {
                    _.defer(function() {
                        c.startPayment(a)
                    })
                });
                this.hookNfcEvent(a, a.nfc)
            } else
                this.back_event()
        },
        startPayment: function(a) {
            a.disablePowerButton(!0);
            var b = this.models;
            b.nfc_prepare = this.generateModel("NfcPrepare", {
                replenish_amount: this.replenish_amount
            });
            b.nfc_prepare.fetch();
            b = a.startPayment(b.nfc_prepare.getMessage());
            this.alertIfPollingError(b, a, _.bind(function() {
                this.cancelNfcTrn(a)
            }, this), this.back_event)
        },
        hookNfcEvent: function(a, b) {
            var c = !1;
            this.listenTo(b, "update:DEVICE_DETECT_CARD", function() {
                a.showLoadingDialog($("#str_progress_settle").text());
                a.disableUserOperation();
                c && (c = !1,
                this.switcher.switchTo("TRANSACTION"),
                this.showMenuBar())
            });
            var d = function() {
                c = !0;
                this.touchagain_view = this.touchagain_view || this.switcher.generateView({
                    name: "TOUCH_AGAIN",
                    view_class: "Nfc.TouchAgain"
                }).render();
                this.switcher.switchTo("TOUCH_AGAIN");
                a.hideLoadingDialog();
                a.enableUserOperation();
                this.hideMenuBar();
                this.menuBar.unhookButtonEvent()
            };
            this.listenTo(b, "update:DEVICE_TOUCH_AGAIN", d);
            this.listenTo(b, "update:DEVICE_TOUCH_DIFF_CARD", d);
            this.listenTo(b, "update:CANCEL_PROHIBIT", function() {
                this.is_prohibiting_cancel = !0
            });
            this.listenTo(b, "update:PAYMENT_RESPONSE", function(b) {
                this.paymentResponseHandler(b, a)
            });
            var e = this;
            d = function(b) {
                return function() {
                    e.is_prohibiting_cancel || e.cancelNfcTrn(a);
                    a.enableHomeButton();
                    a.enablePowerButton();
                    a.hideLoadingDialog();
                    e.is_prohibiting_cancel ? e.replaceToRecover(a) : (a.alert(b, $("#dialog_msg_ok").text()),
                    e.back_event())
                }
            }
            ;
            this.listenTo(b, "update:NETWORK_ERROR", d($("#dialog_msg_network_error").text()));
            this.listenTo(b, "update:UNDER_MAINTENANCE_ERROR", d($("#dialog_maintenance").text()))
        },
        paymentResponseHandler: function(a, b) {
            b.enablePowerButton();
            var c = this.models.nfc_add = this.generateModel("NfcAdd", {
                message: a.message,
                result_code: a.result_code
            })
              , d = this
              , e = b.getSessionStorage();
            $.when(c.getPromise()).done(function() {
                b.hideLoadingDialog();
                b.enableUserOperation();
                if (c.getInsufficient()) {
                    var a = c.getNfcBalance().getAmount();
                    a = $("#str_ic_short").text().replace("%{post_price}", d.post_amount).replace("%{nfc_price}", a);
                    b.alert(a, $("#dialog_msg_ok").text());
                    d.startPayment(b)
                } else
                    a = c.getPostBalance(),
                    e.setItem(Wood.Client.StorageKey.BALANCE_AMOUNT, a.getAmount()),
                    e.setItem(Wood.Client.StorageKey.BALANCE_RAW, a.getRawValue()),
                    d.showComplete(c, b)
            }).fail(function() {
                b.hideLoadingDialog();
                b.enableUserOperation();
                b.disableHomeButton();
                e.removeItem(Wood.Client.StorageKey.BALANCE_AMOUNT);
                e.removeItem(Wood.Client.StorageKey.BALANCE_RAW);
                var a = c.getErrorCode();
                Wood.log("failed: " + a);
                switch (a) {
                case "3230":
                case "3231":
                case "3233":
                    d.startPayment(b);
                    break;
                case "3241":
                case "3235":
                case "3236":
                    d.replaceToRecover(b)
                }
            })
        },
        showComplete: function(a, b) {
            var c = a.getPostBalance()
              , d = a.getNfcBalance();
            this.is_complete = !0;
            this.rebuildMenuBar();
            a = this.switcher.generateAndSwitchView({
                name: "COMPLETE",
                view_class: "Nfc.Complete",
                options: {
                    post_amount: this.post_amount,
                    nfc_balance: d.getAmount(),
                    balance: c.getAmount(),
                    tran_id: a.getTransactionId(),
                    integrated_account: a.getIntegratedAccount()
                },
                back_evt: this.back_event
            });
            b.enableHomeButton();
            this.listenTo(a, "clickedOk", this.back_event)
        },
        afterRun: function(a, b) {}
    })
}
)();
(function() {
    Wood.View.Nfc.Switcher = Wood.View.Base.extend({
        el: "#wrap",
        views: {},
        generateView: function(a) {
            var b = this.views[a.name] = this.controller.generateView(a.view_class, a.options)
              , c = this.controller.menuBar;
            b.listenTo(this, "switch", function(d) {
                d === a.name ? (Wood.DomUtil.animateToTop(),
                b.$el.show(),
                a.back_evt && c.hookBackEvent(a.back_evt),
                c.hookTopEvent(a.top_evt || null),
                c.rebuild()) : b.$el.hide()
            });
            return b
        },
        switchTo: function(a) {
            this.trigger("switch", a)
        },
        getView: function(a) {
            if (a = this.views[a])
                return a;
            throw Error("(Wood.View.Nfc.Switcher) Error:" + a + " does not exists.");
        },
        generateAndSwitchView: function(a) {
            var b = this.generateView(a).render();
            this.switchTo(a.name);
            return b
        }
    })
}
)();
(function() {
    Wood.View.Nfc.SelectAmount = Wood.View.Base.extend({
        el: "#money06_01",
        tagName: "div",
        initialize: function() {
            this.template = Wood.Template.get("nfc", "#money06_01");
            this.listenTo(this.model, "change", this.renderAmounts);
            var a = wood.client.getSessionStorage();
            this.max_cash_str = a.getItem("max_cash_str");
            this.max_cash = a.getItem("max_cash");
            this.balance = a.getItem("balance_raw");
            this.setup()
        },
        presenter: function() {
            return {
                max_amount: $("#str_max_amount").html().replace("%{price}", this.max_cash_str)
            }
        },
        afterRender: function() {
            this.$sel_amount = this.$("#sel_amount");
            this.localizeText();
            this.hookSE()
        },
        renderAmounts: function() {
            var a = this
              , b = this.model.getAmounts();
            _.each(b, function(b) {
                b = new Wood.View.Nfc.Amount({
                    amount: b.amount,
                    raw_value: b.raw_value,
                    max_cash: a.max_cash,
                    balance: a.balance,
                    parent: a
                });
                a.$sel_amount.append(b.render().el)
            })
        }
    })
}
)();
(function() {
    Wood.View.Nfc.Amount = Wood.View.Base.extend({
        tagName: "li",
        events: {
            "click a[href]": "onClick"
        },
        initialize: function() {
            this.template = Wood.Template.get("nfc", "#amount");
            this.setup()
        },
        presenter: function() {
            return {
                is_excess: this.isExcessBalance(),
                amount: this.amount
            }
        },
        isExcessBalance: function() {
            var a = Wood.Price.priceAdd(this.balance, this.raw_value);
            a = Wood.Price.priceSub(this.max_cash, a);
            return Wood.Price.isNegative(a)
        },
        onClick: function(a) {
            a.preventDefault();
            this.parent.trigger("selectedAmount", {
                amount: this.amount,
                raw_value: this.raw_value
            })
        }
    })
}
)();
(function() {
    Wood.View.Nfc.Transaction = Wood.View.Base.extend({
        el: "#money06_02",
        tagName: "div",
        initialize: function() {
            this.template = Wood.Template.get("nfc", "#money06_02");
            this.setup()
        },
        presenter: function() {
            return {
                amount: this.options.amount
            }
        }
    })
}
)();
(function() {
    Wood.View.Nfc.TouchAgain = Wood.View.Base.extend({
        el: "#money06_03",
        tagName: "div",
        initialize: function() {
            this.template = Wood.Template.get("nfc", "#money06_03");
            this.setup()
        }
    })
}
)();
(function() {
    Wood.View.Nfc.Complete = Wood.View.Base.extend({
        el: "#money06_05",
        tagName: "div",
        events: {
            "click #evt_ok": "onClickOk"
        },
        initialize: function() {
            this.template = Wood.Template.get("nfc", "#money06_05");
            this.setup()
        },
        presenter: function() {
            return {
                complete: $("#str_add_done").html().replace("%{price}", this.post_amount),
                post_amount: this.post_amount,
                nfc_balance: this.nfc_balance,
                balance: this.balance,
                tran_id: this.tran_id,
                integrated_account: this.integrated_account
            }
        },
        onClickOk: function(a) {
            a.preventDefault();
            this.trigger("clickedOk")
        }
    })
}
)();
