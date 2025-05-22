(function() {
    Wood.Controller.Always01_01 = Wood.Controller.Base.extend({
        run: function(a, b) {
            this.main_view = this.renderView("Mymenu");
            this.$wrap = this.$wrap || $("#wrap");
            this.$wrap.append(this.main_view.render().el);
            this.setupMenu(Wood.View.MenuBar.Type.MENU);
            this.menuBar.hookBackEvent(function() {
                a.historyBack()
            })
        },
        preparePage: function(a, b) {},
        onPageShowCache: function(a, b) {
            Wood.DomUtil.hideBody();
            this.reload()
        }
    })
}
)();
