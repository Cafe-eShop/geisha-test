(function() {
    Wood.Controller.Buy02_03 = Wood.Controller.Base.extend({
        BGM: "main",
        run: function(a, b) {
            this.renderView("PurchaseComplete", {})
        },
        preparePage: function(a, b) {
            this.setupMenu(Wood.View.MenuBar.Type.PURCHASED);
            this.setBGM(a);
            a = a.getSessionStorage();
            a.getItem("_nsig_buy_page_type") && Wood.Analytics.sendPurchaseAttr({
                type: a.getItem("_nsig_buy_page_type"),
                id: a.getItem("_nsig_buy_nsuid"),
                currency: a.getItem("_nsig_buy_currency"),
                trans_id: a.getItem("_nsig_buy_purchaseId"),
                businessType: a.getItem("_nsig_buy_business_type"),
                price: a.getItem("_nsig_buy_price"),
                couponCode: a.getItem("_nsig_buy_coupon_code"),
                couponInstanceCode: a.getItem("_nsig_buy_coupon_id")
            });
            a.removeItem("_nsig_buy_page_type");
            a.removeItem("_nsig_buy_page_title");
            a.removeItem("_nsig_buy_type");
            a.removeItem("_nsig_buy_purchaseId");
            a.removeItem("_nsig_buy_nsuid");
            a.removeItem("_nsig_buy_price");
            a.removeItem("_nsig_buy_currency");
            a.removeItem("_nsig_buy_business_type");
            a.removeItem("_nsig_buy_order_type");
            a.removeItem("_nsig_buy_coupon_code");
            a.removeItem("_nsig_buy_coupon_id");
            a.removeItem("pin_code_checked_for_eshop")
        },
        onPageShowCache: function(a, b) {}
    })
}
)();
(function() {
    Wood.View.PurchaseComplete = Backbone.View.extend({
        initialize: function() {
            this.render()
        },
        render: function() {
            var a = $.url()
              , b = a.param("tran_id")
              , c = a.param("referrer")
              , d = a.param("type")
              , g = a.param("has_registered_task")
              , h = a.param("has_multiple_receipt")
              , k = a.param("task_broken")
              , l = "true" === a.param("integrated_account")
              , m = "true" === a.param("is_redeem");
            "ticket" === d && $("#thanks_message").html($("#str_ticket_msg").html());
            "noreceipt" === d && ($("#receipt_message").hide(),
            $("#evt_receipt").hide());
            "ticket" !== d && "true" !== g && $("#thanks_message").html($("#str_installed_msg").html());
            "true" === k && $("#thanks_message").html($("#str_broken_msg").html());
            l && !m && ($("#receipt_message").html($("#str_receipt_message_na").html()),
            $("#code_note").html($("#str_code_note_na").html()),
            $("#evt_receipt").hide());
            "auto_billing" === d && this.renderAutoBilling(a);
            $("#top_link_06 > div").on("click", function(a) {
                wood.client.playSound("SE_WAVE_EXIT", 1);
                wood.client.isWiiU() && (a.preventDefault(),
                wood.client.shutdown())
            });
            $("#sel_menu_bar").show();
            var e = wood.client.getSessionStorage();
            if (a = e.getItem("privilege_infos_" + b))
                a = JSON.parse(a),
                $("#template_privilege_infos").tmpl(a).appendTo($("#str_privilege_code")),
                $("#str_privilege_msg").show();
            var f = Wood.Util.isDefined(b) && "true" !== h;
            f && $("#evt_receipt").text($("#str_receipt").text());
            $("#evt_receipt").on("click", function(a) {
                a.preventDefault();
                f ? wood.client.redirectTo("history05_01.html?tran_id=" + b + "#buy") : wood.client.redirectTo("history04_01.html")
            });
            $("#flow_p").on("click", function(a) {
                a.preventDefault();
                "true" === e.getItem("buy_from_coupon02") ? wood.client.redirectToTop() : Wood.Util.isDefined(c) && "" !== c ? wood.client.redirectReplaceTo(decodeURIComponent(c)) : wood.client.historyBack()
            })
        },
        renderAutoBilling: function(a) {
            var b = a.param("start_day")
              , c = "true" === a.param("purchased");
            a = "true" === a.param("extended");
            $("#receipt_message").html($("#str_receipt_auto_billing").html());
            $("#auto_billing_message").html($("#auto_billing_message").html().replace("%{0}", b)).show();
            c ? a ? $("#thanks_message").html($("#str_ticket_extended_msg").html()) : $("#thanks_message").html($("#str_ticket_msg").html()) : ($("#thanks_message").hide(),
            $("#evt_receipt").hide())
        }
    })
}
)();
