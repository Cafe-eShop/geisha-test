(function() {
    Wood.Controller.Data01_03 = Wood.Controller.Base.extend({
        BGM: "main",
        run: function(a, b) {
            this.setBGM(a);
            this.renderView("CloseConfirmation", {})
        },
        preparePage: function(a, b) {}
    })
}
)();
(function() {
    Wood.View.CloseConfirmation = Backbone.View.extend({
        initialize: function() {
            this.render()
        },
        render: function() {
            $("#evt_quit").on("click", function(a) {
                a.preventDefault();
                wood.client.shutdown()
            });
            $("#evt_cancel").on("click", function(a) {
                a.preventDefault();
                "historyback" === $.url().param("cancel") ? history.back() : void 0 !== $.url().param("seq") ? wood.client.redirectReplaceTo(decodeURIComponent($.url().param("seq"))) : wood.client.redirectTo("./#top")
            })
        }
    })
}
)();
