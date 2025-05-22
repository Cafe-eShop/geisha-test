(function() {
    Wood.Model.CouponBase = Wood.Model.Base.extend({
        getDiscountPrice: function() {
            var a = this.getSafe("target_list.titles.title");
            return a && a[0]
        },
        parseDatetime: function(a) {
            if (!a)
                return null;
            var b = a.split("T");
            a = b[0].split("-");
            b = b[1].split(":");
            return {
                date: a,
                time: b
            }
        },
        getStartDateTime: function() {
            return this.parseDatetime(this.getSafe("start_datetime.localdatetime.datetime"))
        },
        getEndDateTime: function() {
            return this.parseDatetime(this.getSafe("end_datetime.localdatetime.datetime"))
        }
    })
}
)();
(function() {
    Wood.Model.CouponCheck = Wood.Model.CouponBase.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/coupon/!check"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                data: {
                    ns_uid: this.ns_uid,
                    coupon_code: this.code
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
            return a.coupon
        },
        setCode: function(a) {
            this.code = a
        }
    }, {
        isValidCode: function(a) {
            return _.isString(a) && /^[a-zA-Z\d]{1,15}$/.test(a)
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.CouponCheck, {
        getInstanceCode: "instance_code",
        getDescription: "description",
        getName: "name"
    })
}
)();
(function() {
    Wood.Controller.Coupon01_01 = Wood.Controller.Base.extend({
        onPageShowCache: function(a, b) {},
        preparePage: function(a, b) {
            this.ns_uid = b.param("item");
            this.getBackUrl = function(a) {
                var c = b.param("type")
                  , d = {
                    type: c
                };
                switch (c) {
                case "title":
                    d.title = b.param("item")
                }
                a && (d.buying_section = "coupon",
                d.coupon_code = a);
                return Wood.URL.create("buy01_01.html", d)
            }
            ;
            var c = this;
            this.setupMenu(Wood.View.MenuBar.Type.PURCHASE);
            this.menuBar.hookBackEvent(function() {
                a.redirectReplaceTo(c.getBackUrl())
            })
        },
        run: function(a, b) {
            this.models.coupon_check = this.generateModel("CouponCheck", {
                ns_uid: this.ns_uid,
                country: a.country
            });
            this.views = {
                input: this.renderView("CouponInput", {}).render(),
                info: this.renderView("CouponInfo", {}).render()
            };
            var c = this;
            this.listenTo(this.views.input, "changed", function(b) {
                c.checkCoupon(a, b)
            });
            this.listenTo(this.views.info, "use", function() {
                c.useCoupon(a)
            })
        },
        checkCoupon: function(a, b) {
            var c = this
              , d = this.models.coupon_check;
            this.coupon_code = b;
            d.setCode(b);
            Wood.Model.CouponCheck.isValidCode(b) ? (a.disableUserOperation(),
            a.showLoadingIcon(),
            $.when(d.getPromise()).done(function() {
                a.enableUserOperation();
                a.hideLoadingIcon();
                a.getSessionStorage().setItem("coupon_code_ins_" + b, d.getInstanceCode());
                c.views.info.model = d;
                c.views.info.render();
                c.views.info.$el.show()
            }).fail(function() {
                a.enableUserOperation();
                a.hideLoadingIcon();
                c.hideInfo()
            })) : (a.alert($("#dialog_msg_invalid").text(), $("#dialog_msg_ok").text()),
            this.hideInfo())
        },
        hideInfo: function() {
            this.views.info.$el.hide()
        },
        useCoupon: function(a) {
            a.redirectReplaceTo(this.getBackUrl(this.coupon_code))
        }
    })
}
)();
(function() {
    Wood.View.CouponBase = Wood.View.Base.extend({
        getValidDuration: function(a) {
            var b = $("#valid_duration_format").html()
              , c = a.start.date
              , d = a.start.time
              , e = a.end.date;
            a = a.end.time;
            return b.replace("%{s_yyyy}", c[0]).replace("%{s_MM}", c[1]).replace("%{s_dd}", c[2]).replace("%{s_hh}", d[0]).replace("%{s_mm}", d[1]).replace("%{e_yyyy}", e[0]).replace("%{e_MM}", e[1]).replace("%{e_dd}", e[2]).replace("%{e_hh}", a[0]).replace("%{e_mm}", a[1])
        }
    })
}
)();
(function() {
    Wood.View.CouponInput = Wood.View.Base.extend({
        el: "#coupon01_01",
        events: {
            'change input[name="coupon_code"]': "onChangeCoupon"
        },
        afterRender: function() {
            this.$input_coupon = this.$('input[name="coupon_code"]');
            this.$input_coupon.attr("guidestring", $("#msg_input_code_guide").text()).attr("placeholder", $("#msg_input_code_placeholder").text())
        },
        onChangeCoupon: function() {
            var a = this.$input_coupon.val().toUpperCase();
            this.$input_coupon.val(a);
            this.trigger("changed", a)
        }
    })
}
)();
(function() {
    Wood.View.CouponInfo = Wood.View.CouponBase.extend({
        el: "#coupon01_02",
        events: {
            "click #evt_use": "onClickUse"
        },
        initialize: function() {
            this.template = _.template($("#template_coupon01_02").html());
            this.setup()
        },
        presenter: function() {
            var a = this.model;
            if (!a)
                return {};
            var b = a.getDiscountPrice();
            return {
                name: a.getName(),
                description: a.getDescription(),
                before_price: b.before_price.amount,
                after_price: Wood.DomUtil.getTaxText(b.after_price.amount),
                valid_duration: this.getValidDuration({
                    start: a.getStartDateTime(),
                    end: a.getEndDateTime()
                })
            }
        },
        afterRender: function() {
            this.localizeText();
            this.hookSE()
        },
        onClickUse: function(a) {
            a.preventDefault();
            this.trigger("use")
        }
    })
}
)();
