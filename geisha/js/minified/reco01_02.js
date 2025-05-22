(function() {
    Wood.Model.Vote = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.NINJA + "ws/my/votes/!put"
        },
        put: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                type: "POST",
                async: !1,
                xhrFields: {
                    withCredentials: !0
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a
        },
        afterError: function() {
            "3023" === this.getErrorCode() && wood.client.shutdown()
        }
    })
}
)();
(function() {
    Wood.View.Vote = Wood.View.Base.extend({
        el: "#sel_title",
        template: _.template($("#template_title").text()),
        presenter: function() {
            var a = ""
              , b = this.title_model;
            if (b.hasRating()) {
                a = b.getRatingSystem();
                var c = b.getRatingName();
                a = a + ": " + c
            }
            return {
                data: {
                    str_title: b.getTitleName(),
                    url_icon: b.getIconUrl(),
                    str_rating: a
                }
            }
        },
        afterRender: function() {
            Wood.DomUtil.lazyload(this.$("li img"));
            this.localizeText();
            this.hookSE();
            this.hookEvent()
        },
        hookEvent: function() {
            var a = this;
            $("#rating_01, #rating_02, #rating_03, #rating_04, #rating_05").on("click", function() {
                $("#recoq01_01").removeClass().addClass("bg_" + this.id)
            });
            $("#recoq01_02 label").on("click", function() {
                $("#recoq01_02 li").removeClass("ck_lamp_on").addClass("ck_lamp");
                $(this).parent().addClass("ck_lamp_on")
            });
            $("#recoq01_03 label").on("click", function() {
                $("#recoq01_03 li").removeClass("ck_lamp_on").addClass("ck_lamp");
                $(this).parent().addClass("ck_lamp_on")
            });
            $("#reco01_02 label").on("click", function(a) {
                2 < $("#reco01_02 label input:checked").length && ($("#sel_submit_non").hide(),
                $("#sel_submit").show())
            });
            $("#evt_submit").on("click", function(b) {
                b.preventDefault();
                a.submitVote()
            })
        },
        submitVote: function() {
            if (!(2 >= $("#reco01_02 label input:checked").length)) {
                wood.client.disableUserOperation();
                var a = this.vote_model.ns_uid
                  , b = $('input[name="rating_go"]:checked').val()
                  , c = $('input[name="human_go"]:checked').val()
                  , d = $('input[name="play_go"]:checked').val();
                this.vote_model.put({
                    data: {
                        id: a,
                        q3: b,
                        q4: c,
                        q5: d
                    },
                    success: function() {
                        wood.client.alert($("#dialog_msg").text(), $("#dialog_msg_ok").text());
                        wood.client.getSessionStorage().removeItem("votable_data");
                        wood.client.historyBack()
                    }
                })
            }
        }
    })
}
)();
(function() {
    Wood.Controller.Reco01_02 = Wood.Controller.Base.extend({
        BGM: "setting",
        onPageShowCache: function(a, b) {},
        preparePage: function(a, b) {
            this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
            this.menuBar.hookBackEvent(function() {
                a.historyBack()
            })
        },
        run: function(a, b) {
            var c = this;
            this.ns_uid = b.param("title");
            this.title_model = this.generateModel("TitleInfomation", {
                ns_uid: this.ns_uid
            });
            this.vote_model = this.generateModel("Vote", {
                ns_uid: this.ns_uid
            });
            this.view = this.generateView("Vote", {
                title_model: this.title_model,
                vote_model: this.vote_model
            });
            this.title_model.bind("change", function() {
                c.title_model.getNsUid() || (a.showError(Wood.ErrorCode.RETRIABLE),
                a.historyBack());
                c.view.render()
            });
            this.title_model.fetch()
        }
    })
}
)();
