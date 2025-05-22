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
    Wood.Controller.Coupon03_01 = Wood.Controller.Base.extend({
        onPageShow: function(a, b) {},
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
                a && (d.buying_section = "owned_coupon",
                d.coupon_ins = a);
                return Wood.URL.create("buy01_01.html", d)
            }
            ;
            var c = this;
            this.setupMenu(Wood.View.MenuBar.Type.PURCHASE);
            this.menuBar.hookBackEvent(function() {
                a.redirectReplaceTo(c.getBackUrl())
            });
            $(".evt_next").hide()
        },
        run: function(a, b) {
            var c = this.models.owned_coupons = this.generateModel("OwnedCoupons", {
                ns_uid: this.ns_uid
            });
            b = this.models.title_info = this.generateModel("TitleInfomation", {
                ns_uid: this.ns_uid
            });
            var d = this.view = this.renderView("OwnedCouponSelect", {
                model: {
                    title_info: b,
                    owned_coupons: c
                }
            })
              , e = this;
            $.when(c.getPromise(), b.getPromise()).done(function() {
                if (0 === c.getLength())
                    a.alert($("#str_no_coupon").text(), $("#dialog_msg_ok").text()),
                    a.historyBack();
                else {
                    d.render();
                    var b = c.getInstanceCodes();
                    a.readOwnedCoupon(b);
                    e.menuBar.rebuild();
                    c.cacheCouponId();
                    $(".evt_next").show().on("click", function(b) {
                        b.preventDefault();
                        a.redirectReplaceTo(e.getBackUrl(d.getCheckedCouponInstanceCode()))
                    })
                }
            })
        },
        afterRun: function(a, b) {}
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
    Wood.View.OwnedCouponSelectItem = Wood.View.CouponBase.extend({
        tagName: "li",
        events: {
            "click .show-detail": "onClickReadMore"
        },
        presenter: function() {
            var a = this.coupon
              , b = a.getDescription()
              , c = a.getDiscountPrice()
              , d = a.getInstanceCode();
            return {
                name: a.getName(),
                after_price: c ? Wood.DomUtil.getTaxText(c.after_price.amount) : "",
                discount_rate: $("#str_off").text().replace("%{0}", a.getDiscountInfo()),
                valid_duration: this.getValidDuration({
                    start: a.getStartDateTime(),
                    end: a.getEndDateTime()
                }),
                instance_code: d,
                is_new: !wood.client.isOwnedCouponRead(d),
                is_target_type_all: a.isTargetTypeAll(),
                image: a.getImage(),
                usage_count: a.isUseAtOnce() ? $("#str_can_use_at_once").text() : $("#str_can_use_many_times").text(),
                description: b
            }
        },
        afterRender: function() {
            var a = this;
            _.defer(function() {
                var b = a.$description = a.$(".description");
                35 < b.height() && (b.addClass("overflow-description"),
                a.$(".show-detail").show())
            })
        },
        onClickReadMore: function(a) {
            a.preventDefault();
            $(a.currentTarget).hide();
            this.$description.removeClass("overflow-description")
        }
    })
}
)();
(function() {
    Wood.View.OwnedCouponSelect = Wood.View.Base.extend({
        el: "#coupon03_01",
        template: _.template($("#template_coupon03_01").html()),
        item_template: _.template($("#template_coupon03_01_item").html()),
        presenter: function() {
            var a = this.model.title_info;
            this.coupons = this.model.owned_coupons.getCoupons();
            var b = wood.client.getText("shelf01_01_002").replace("%{0}", this.coupons.length);
            return {
                icon_url: a.getIconUrl(),
                title_name: a.getTitleName(),
                before_price: this.coupons[0].getDiscountPrice().before_price.amount,
                coupon_num: b
            }
        },
        afterRender: function() {
            var a = this.$(".enable_coupon_list")
              , b = this;
            _.chain(this.coupons).sortBy(function(a) {
                return parseInt(a.getDiscountPrice().after_price.raw_value, 10)
            }).each(function(c) {
                c = new Wood.View.OwnedCouponSelectItem({
                    coupon: c,
                    template: b.item_template
                });
                a.append(c.render().el)
            });
            this.$("input[name='coupon_plan']").first().prop("checked", !0);
            Wood.DomUtil.lazyload(this.$("img"));
            this.localizeText();
            this.hookSE()
        },
        getCheckedCouponInstanceCode: function() {
            return this.$("input[name='coupon_plan']:checked").val()
        }
    })
}
)();
