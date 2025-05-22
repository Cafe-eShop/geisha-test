(function() {
    Wood.View.VotableList = Wood.View.Base.extend({
        el: "#sel_title",
        template: _.template($("#template_reco").text()),
        presenter: function() {
            var a = this.list;
            if (!a)
                return null;
            a = a.content;
            _.each(a, function(a) {
                var b = a.title;
                a.data_title_id = b.id;
                a.str_title = b.name;
                a.url_img = b.icon_url;
                a.rating_age = b.rating_info ? b.rating_info.rating.age : null
            });
            return {
                data: {
                    votable: a,
                    str_vote: $("#str_vote").text()
                }
            }
        },
        render: function() {
            this.total = this.model.getTotal();
            var a = this.presenter()
              , c = $("#data_exist")
              , b = $("#data_none")
              , d = $("#sel_desc");
            this.$("li").remove();
            a && 0 !== this.total ? (b.hide(),
            c.show(),
            d.show(),
            this.$el.html(this.template(a))) : (b.show(),
            c.hide(),
            d.hide());
            this.renderPagination(this.total);
            this.afterRender()
        },
        afterRender: function() {
            Wood.DomUtil.lazyload(this.$("li img"));
            this.localizeText();
            this.hookSE();
            this.hookEvent()
        },
        hookEvent: function() {
            this.$(".evt_vote").on("click", function(a) {
                a.preventDefault();
                var c = $(this);
                a = c.data("title-id");
                c = c.data("rating-age");
                var b = parseInt(wood.client.getSessionStorage().getItem("age"), 10);
                "USA" !== wood.client.region && b < parseInt(c, 10) ? wood.client.alert($("#dialog_msg_age").text(), $("#dialog_msg_ok").text()) : wood.client.redirectTo("reco01_02.html", {
                    title: a
                })
            })
        },
        renderPagination: function(a) {
            this.$pagination = this.$pagination || $(".pagenation");
            this.pagination_view.pagenation.setCurrentPage(this.model.page);
            this.pagination_view.setTotalCount(a);
            this.pagination_view.setElement(this.$pagination).render()
        }
    })
}
)();
(function() {
    Wood.Controller.Reco01_01 = Wood.Controller.Base.extend({
        BGM: "setting",
        routes: _.defaults({
            "page/:page": "changePage"
        }, Wood.Controller.ROUTES),
        onPageShowCache: function(a, c) {
            $("body").addClass("display_cover");
            this.reloadWithoutHash()
        },
        preparePage: function(a, c) {
            this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
            var b = this.menuBar;
            b.hookBackEvent(function() {
                _.delay(function() {
                    b.removeClassBackButton()
                }, 100);
                a.historyBack()
            })
        },
        run: function(a, c) {
            this.pagination_view = this.generateView("Common.Pagination");
            this.model = this.generateModel("VotableList", {
                language: a.language,
                page: 1
            })
        },
        afterRun: function(a, c) {
            var b = this;
            this.model.hasVotableTitles() ? this.model.fetch({
                async: !0,
                success: function() {
                    b.renderVotables(a);
                    b.model.bind("change", function() {
                        b.renderVotables(a)
                    })
                }
            }) : this.renderVotables(a)
        },
        renderVotables: function(a) {
            var c = this.model.getContents();
            this.view = this.generateView("VotableList", {
                list: c,
                model: this.model,
                pagination_view: this.pagination_view
            });
            this.view.render();
            a.enableUserOperation();
            this.removeVotableSessionData(a)
        },
        removeVotableSessionData: function(a) {
            a.getSessionStorage().removeItem("votable_data")
        },
        changePage: function(a) {
            this.view || this.runRoot();
            wood.client.disableUserOperation();
            var c = this.model;
            a = a ? parseInt(a, 10) : 1;
            var b = (a - 1) * c.limit;
            c.page = a;
            _.delay(function() {
                c.fetch({
                    async: !1,
                    offset: b
                });
                Wood.DomUtil.animateToTop();
                c.hasChanged() || wood.client.enableUserOperation()
            }, 150)
        }
    })
}
)();
