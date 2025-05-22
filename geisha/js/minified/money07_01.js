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
    Wood.Controller.Money07_01 = Wood.Controller.Nfc.extend({
        BGM: "setting",
        onPageShow: function(a, b) {
            a.disableHomeButton();
            a.enablePowerButton();
            a.stopNfcSound()
        },
        onPageShowCache: function(a, b) {},
        preparePage: function(a, b) {
            a.setReloadAtAjaxIncomplete();
            this.createCloseEvent(a, b);
            this.setupMenu(Wood.View.MenuBar.Type.CLOSE);
            this.menuBar.hookCloseEvent(this.close_event)
        },
        createCloseEvent: function(a, b) {
            this.close_event = function() {
                if ("appJump" === b.param("seq"))
                    a.shutdown();
                else {
                    a.enableHomeButton();
                    a.enablePowerButton();
                    var c = a.getSessionStorage()
                      , d = c.getItem("buying_section");
                    "bal" === d || "iccard" === d ? a.redirectReplaceTo(c.getItem("money_referrer")) : a.redirectReplaceTo("money01_01.html")
                }
            }
        },
        run: function(a, b) {
            this.switcher = this.generateView("Nfc.Switcher", {
                controller: this
            });
            this.checkIncompleteTransaction(a)
        },
        checkIncompleteTransaction: function(a) {
            var b = this.models.incomplete = this.generateModel("NfcTrnIncomplete");
            b.fetch();
            var c = this.transaction_id = b.getId()
              , d = b.getDate();
            _.isString(d) && (d = d.replace(/\//g, " / "));
            c = {
                transaction_id: (c || "").replace(/(.{4})/g, "$1 "),
                date: d
            };
            b.isIncomplete() ? (b = this.switcher.generateAndSwitchView({
                name: "RECOVER",
                view_class: "Nfc.Recover",
                options: c
            }),
            this.listenToOnce(b, "clickedRecover", function() {
                this.recover(a)
            })) : b.isSupportProcessing() ? this.switcher.generateAndSwitchView({
                name: "SUPPORT",
                view_class: "Nfc.Support",
                options: c
            }) : (a.alert($("#dialog_msg_done").text(), $("#dialog_msg_ok").text()),
            this.close_event())
        },
        recover: function(a) {
            if (this.isConnectedToDrc(a)) {
                a.disablePowerButton();
                a.showLoadingDialog($("#str_recover_progress").text());
                var b = this.models.nfc_result_inquiry = this.generateModel("NfcTrnResultInquiry", {
                    transaction_id: this.transaction_id
                });
                b.fetch();
                this.hookResultCheckEvent(a, a.nfc);
                b = a.startResultCheck(b.getMessage());
                this.alertIfPollingError(b, a, null, this.close_event)
            } else
                this.reload()
        },
        hookResultCheckEvent: function(a, b) {
            Wood.log("hookResultCheckEvent");
            this.listenTo(b, "update:RESULT_CHECK_RESPONSE", function(b) {
                this.resultCheckResponseHandler(b, a)
            });
            this.listenTo(b, "update:NETWORK_ERROR", function() {
                this.alertNetworkError(a)
            });
            this.listenTo(b, "update:UNDER_MAINTENANCE_ERROR", function() {
                this.alertMaintenance(a)
            })
        },
        alertNetworkError: function(a) {
            a.enablePowerButton();
            a.hideLoadingDialog();
            a.alert($("#dialog_msg_network_error").text(), $("#dialog_msg_ok").text());
            this.close_event()
        },
        alertMaintenance: function(a) {
            a.enablePowerButton();
            a.hideLoadingDialog();
            a.alert($("#dialog_maintenance").text(), $("#dialog_msg_ok").text());
            this.close_event()
        },
        resultCheckResponseHandler: function(a, b) {
            Wood.log("resultCheckResponseHandler");
            b.enablePowerButton();
            this.stopListening(b.nfc);
            var c = this.models.nfc_result = this.generateModel("NfcTrnResult", {
                transaction_id: this.transaction_id,
                message: a.message,
                result_code: a.result_code
            })
              , d = this;
            $.when(c.getPromise()).done(function() {
                b.hideLoadingDialog();
                d.updateBalance(b, c);
                c.isRecoverIgnore() ? (b.alert($("#str_recover_complete").text(), $("#dialog_msg_ok").text()),
                d.close_event()) : c.isRecoverSuccess() ? (b.alert($("#str_add_complete").text(), $("#dialog_msg_ok").text()),
                d.close_event()) : c.isRequireHistory() ? d.requireHistory(b) : d.reload()
            }).fail(function() {
                b.hideLoadingDialog();
                var a = c.getErrorCode()
                  , e = c.getErrorMessage();
                Wood.log("nfc_result failed: " + a);
                d.removeBalance(b);
                switch (a) {
                case "3236":
                case "3241":
                    b.showError(c.getErrorPrefix() + a, e);
                    d.reload();
                    break;
                case "3234":
                case "3237":
                case "3242":
                    d.reload()
                }
            })
        },
        updateBalance: function(a, b) {
            Wood.log("updateBalance");
            if (b = b.getPostBalance())
                a = a.getSessionStorage(),
                a.setItem(Wood.Client.StorageKey.BALANCE_AMOUNT, b.getAmount()),
                a.setItem(Wood.Client.StorageKey.BALANCE_RAW, b.getRawValue())
        },
        removeBalance: function(a) {
            a = a.getSessionStorage();
            a.removeItem(Wood.Client.StorageKey.BALANCE_AMOUNT);
            a.removeItem(Wood.Client.StorageKey.BALANCE_RAW)
        },
        requireHistory: function(a) {
            a.confirm($("#str_ic_matching").text(), $("#dialog_msg_cancel").text(), $("#dialog_msg_ok").text()) ? (this.switcher.generateAndSwitchView({
                name: "RECOVER_TOUCH",
                view_class: "Nfc.RecoverTouch"
            }),
            this.hideMenuBar(),
            this.menuBar.unhookButtonEvent(),
            (this.models.nfc_history_inquiry = this.generateModel("NfcTrnHistoryInquiry", {
                transaction_id: this.transaction_id
            })).fetch(),
            this.startHistoryInquiry(a)) : this.reload()
        },
        startHistoryInquiry: function(a) {
            a.disablePowerButton();
            var b = a.startHistoryInquiry(this.models.nfc_history_inquiry.getMessage());
            this.alertIfPollingError(b, a, null, this.close_event);
            this.hookHistoryInquiryEvent(a, a.nfc)
        },
        hookHistoryInquiryEvent: function(a, b) {
            this.listenTo(b, "update:DEVICE_DETECT_CARD", function() {
                a.showLoadingDialog($("#str_recover_progress").text())
            });
            var c = function() {
                a.hideLoadingDialog()
            };
            this.listenTo(b, "update:DEVICE_TOUCH_AGAIN", c);
            this.listenTo(b, "update:DEVICE_TOUCH_DIFF_CARD", c);
            this.listenTo(b, "update:HISTORY_INQUIRY_RESPONSE", function(b) {
                this.historyInquiryResponseHandler(b, a)
            });
            this.listenTo(b, "update:NETWORK_ERROR", function() {
                this.alertNetworkError(a)
            });
            this.listenTo(b, "update:UNDER_MAINTENANCE_ERROR", function() {
                this.alertMaintenance(a)
            })
        },
        historyInquiryResponseHandler: function(a, b) {
            b.enablePowerButton();
            this.stopListening(b.nfc);
            var c = this.models.nfc_history = this.generateModel("NfcTrnHistory", {
                transaction_id: this.transaction_id,
                message: a.message,
                result_code: a.result_code
            })
              , d = this;
            $.when(c.getPromise()).done(function() {
                b.hideLoadingDialog();
                d.updateBalance(b, c);
                c.isRecoverIgnore() ? (b.alert($("#str_recover_complete").text(), $("#dialog_msg_ok").text()),
                d.close_event()) : c.isRecoverSuccess() ? (b.alert($("#str_add_complete").text(), $("#dialog_msg_ok").text()),
                d.close_event()) : d.reload()
            }).fail(function() {
                b.hideLoadingDialog();
                b.disableHomeButton();
                var a = c.getErrorCode()
                  , e = c.getErrorMessage();
                Wood.log("nfc_history failed: " + a);
                d.removeBalance(b);
                switch (a) {
                case "3230":
                case "3231":
                case "3232":
                    d.startHistoryInquiry(b);
                    break;
                case "3236":
                case "3241":
                    b.showError(c.getErrorPrefix() + a, e);
                    d.reload();
                    break;
                case "3233":
                case "3234":
                case "3235":
                case "3238":
                case "3243":
                    d.reload()
                }
            })
        },
        afterRun: function(a, b) {}
    })
}
)();
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
    Wood.Model.NfcTrnHistory = Wood.Model.NfcTrnBase.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/nfc_transactions/" + this.transaction_id + "/history"
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
        }
    })
}
)();
(function() {
    Wood.Model.NfcTrnHistoryInquiry = Wood.Model.NfcMessage.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/nfc_transactions/" + this.transaction_id + "/history/inquiry"
        }
    })
}
)();
(function() {
    Wood.Model.NfcTrnResult = Wood.Model.NfcTrnBase.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/nfc_transactions/" + this.transaction_id + "/result"
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
        }
    })
}
)();
(function() {
    Wood.Model.NfcTrnResultInquiry = Wood.Model.NfcMessage.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/nfc_transactions/" + this.transaction_id + "/result/inquiry"
        }
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
    Wood.View.Nfc.Support = Wood.View.Base.extend({
        el: "#money07_01_01",
        tagName: "div",
        initialize: function() {
            this.template = Wood.Template.get("nfc", "#money07_01_01");
            this.setup()
        },
        presenter: function() {
            return {
                transaction_id: this.options.transaction_id,
                date: this.options.date
            }
        }
    })
}
)();
(function() {
    Wood.View.Nfc.Recover = Wood.View.Base.extend({
        el: "#money07_01_02",
        tagName: "div",
        events: {
            "click #evt_recover": "onClickRecover"
        },
        initialize: function() {
            this.template = Wood.Template.get("nfc", "#money07_01_02");
            this.setup()
        },
        presenter: function() {
            return {
                transaction_id: this.options.transaction_id,
                date: this.options.date
            }
        },
        onClickRecover: function(a) {
            a.preventDefault();
            this.trigger("clickedRecover")
        }
    })
}
)();
(function() {
    Wood.View.Nfc.RecoverTouch = Wood.View.Base.extend({
        el: "#money07_02",
        tagName: "div",
        initialize: function() {
            this.template = Wood.Template.get("nfc", "#money07_02");
            this.setup()
        }
    })
}
)();
