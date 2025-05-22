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
    Wood.Controller.Coupon02_01 = Wood.Controller.Base.extend({
        onPageShow: function(a, b) {},
        onPageShowCache: function(a, b) {
            this.view && (this.view.$el.off(),
            this.view.stopListening(),
            this.view = null);
            this.run(a, b)
        },
        preparePage: function(a, b) {
            this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
            this.menuBar.hookBackEvent(function() {
                a.historyBack()
            })
        },
        run: function(a, b) {
            var c = this.models.owned_coupons = this.generateModel("OwnedCoupons", {})
              , d = this.view = this.renderView("OwnedCoupons", {
                model: {
                    owned_coupons: c
                }
            })
              , e = this;
            $.when(c.getPromise()).done(function() {
                if (0 < c.getLength()) {
                    d.render();
                    var b = c.getInstanceCodes();
                    a.readOwnedCoupon(b);
                    a.storeUnreadOwnedCoupon(c.getInstanceCodes());
                    e.menuBar.rebuild();
                    c.cacheCoupon();
                    c.cacheCouponId()
                } else
                    $("#coupon02_01").hide(),
                    $("#coupon02_02").show(),
                    a.storeUnreadOwnedCoupon([]),
                    e.menuBar.rebuild()
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
    Wood.View.OwnedCoupons = Wood.View.Base.extend({
        el: "#coupon02_01",
        template: _.template($("#template_coupon02_01").html()),
        item_template: _.template($("#template_coupon02_01_item").html()),
        presenter: function() {
            this.coupons = this.model.owned_coupons.getCoupons();
            return {
                coupon_num: wood.client.getText("shelf01_01_002").replace("%{0}", this.coupons.length)
            }
        },
        afterRender: function() {
            var a = this.$(".enable_coupon_list")
              , b = this;
            _.each(this.coupons, function(c) {
                c = new Wood.View.OwnedCouponSelectItem({
                    coupon: c,
                    template: b.item_template
                });
                a.append(c.render().el)
            });
            Wood.DomUtil.lazyload(this.$("img"));
            this.localizeText();
            this.hookSE()
        }
    })
}
)();
