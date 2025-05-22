(function() {
    Wood.Model.Movie = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + this.pathname()
        },
        pathname: function() {
            return "ws/" + this.country + "/movie/" + this.nsuid
        },
        fetch: function(a) {
            var c = this.getBaseAjaxParam();
            $.extend(c, a);
            c.type = "GET";
            c.data = {
                lang: this.language
            };
            this.fetchJSON(c)
        },
        sendPlayLog: function() {
            var a = this.getBaseAjaxParam();
            $.extend(a, {
                url: Wood.UrlPrefix.NINJA + this.pathname() + "/!play",
                type: "POST",
                async: !0,
                xhrFields: {
                    withCredentials: !0
                },
                success: function() {},
                error: function() {}
            });
            Backbone.Model.prototype.fetch.call(this, a)
        },
        getFilesByQuality: function(a) {
            return _.filter(this.getFiles(), function(c) {
                return c.quality && c.quality === a
            })
        },
        getFilesHQ: function() {
            return this.getFilesByQuality("HQ")
        },
        getFilesLQ: function() {
            return this.getFilesByQuality("LQ")
        },
        getRatingIconsByType: function(a) {
            return _.filter(this.getRatingIcons(), function(c) {
                return c.type && c.type === a
            })
        },
        getNormalRatingIcons: function() {
            return this.getRatingIconsByType("normal")
        },
        getSmallRatingIcons: function() {
            return this.getRatingIconsByType("small")
        },
        parse: function(a) {
            return a.movie
        }
    });
    Wood.Model.Base.createGetters(Wood.Model.Movie, {
        getId: "id",
        getName: "name",
        getIconUrl: "icon_url",
        getBannerUrl: "banner_url",
        getFiles: "files.file",
        getTitle: "title",
        getTitleName: "title.name",
        getTitleIconUrl: "title.icon_url",
        getTitleId: "title.id",
        getRating: "rating_info",
        getRatingDisplay: "rating_info.display",
        getRatingSystemName: "rating_info.rating_system.name",
        getRatingSystemId: "rating_info.rating_system.id",
        getRatingName: "rating_info.rating.name",
        getRatingAge: "rating_info.rating.age",
        getRatingId: "rating_info.rating.id",
        getRatingIcons: "rating_info.rating.icons.icon",
        getRatingDescriptors: "rating_info.descriptors.descriptor",
        getAlternateRatingImageUrl: "alternate_rating_image_url"
    })
}
)();
(function() {
    Wood.Controller.Data02_01 = Wood.Controller.Base.extend({
        onPageShow: function() {},
        onPageShowCache: function() {},
        preparePage: function() {
            this.$wrap = $("#wrap");
            this.setupMenu(Wood.View.MenuBar.Type.PURCHASE);
            this.menuBar.hookBackEvent(function() {
                wood.client.historyBack()
            })
        },
        verifyRating: function(a) {
            (new Wood.Rating(a.getRatingSystemId(),a.getRatingAge())).isDisplayAllowed(Wood.Rating.ActionType.DEFAULT, wood.client.getRegion(), wood.client.getAge()) || (wood.client.alert($("#dialog_msg_age").text(), $("#dialog_msg_ok").text()),
            wood.client.historyBack())
        },
        verifyParentalControl: function(a) {
            a = a.getRatingAge();
            wood.client.isLockedForGamePlay(a) && (a = $.url(),
            a = a.attr("file") + "?" + a.attr("query"),
            wood.client.redirectReplaceTo("legal01_01.html", {
                seq: a
            }, "gameplay"))
        },
        run: function() {
            var a = this
              , c = $.url().param("movie")
              , g = new Wood.Model.Movie({
                country: wood.client.country,
                language: wood.client.language,
                nsuid: c
            });
            c = g.getPromise();
            $.when(c).done(function() {
                a.verifyRating(g);
                a.verifyParentalControl(g);
                a.view = a.renderView(Wood.View.Movie, {
                    model: g,
                    beacon_param: a.getDirectoryBeaconParam()
                })
            })
        },
        afterRun: function() {}
    })
}
)();
(function() {
    function a() {
        p = d.currentTime;
        q = e.currentTime;
        k = Math.max(p, q)
    }
    function c() {
        Wood.Analytics.sendMoviePlay($.url().param("movie"));
        if (Wood.isWiiU) {
            var b = wiiuSystemSetting.getSpotPassUploadConsoleInfoState();
            wood.client.shutdownIfError(b);
            !0 === b.enable && f.sendPlayLog()
        }
    }
    function g() {
        h ? k = q = p = 0 : a();
        c();
        h = !1;
        d.load();
        d.play();
        Wood.isWiiU && (window.wiiu.videoplayer.viewMode = !1);
        r = "hq";
        $("#evt_set_hq").removeClass("btn_002").addClass("btn_006");
        $("#evt_set_lq").removeClass("btn_006").addClass("btn_002");
        $("#data02_01_02").show();
        $("#sel_menu_bar").hide();
        $("#data02_01_01").hide();
        $("body").unbind("keydown")
    }
    function t() {
        h ? k = q = p = 0 : a();
        c();
        h = !1;
        e.load();
        e.play();
        Wood.isWiiU && (window.wiiu.videoplayer.viewMode = !1);
        r = "lq";
        $("#evt_set_hq").removeClass("btn_006").addClass("btn_002");
        $("#evt_set_lq").removeClass("btn_002").addClass("btn_006");
        $("#data02_01_02").show();
        $("#sel_menu_bar").hide();
        $("#data02_01_01").hide();
        $("body").unbind("keydown")
    }
    function l() {
        wood.client.disableUserOperation();
        wood.client.historyBack();
        wood.client.enableUserOperation()
    }
    var m = !0, h = !1, e = document.getElementById("sel_lq"), d = document.getElementById("sel_hq"), p = d.currentTime, q = e.currentTime, k = Math.max(p, q), u, r, f;
    Wood.View.Movie = Backbone.View.extend({
        el: "#data02_01",
        events: {
            "click .evt_movie": "onClickRelatedMovie"
        },
        initialize: function() {
            this.render()
        },
        detectMovieType: function(b) {
            var a = b.getFilesHQ();
            var n = b.getFilesLQ();
            var c = !_.isEmpty(a)
              , d = !_.isEmpty(n);
            Wood.isWiiU && wood.client.getLocalStorage().write();
            if (d && c) {
                if (wood.client.ls.getMovieType()) {
                    n = wood.client.ls.getMovieType();
                    var v = b.getFilesByQuality(n.toUpperCase())[0]
                } else
                    n = "hq",
                    v = a[0];
                $("#evt_set_" + n).removeClass("btn_002").addClass("btn_006")
            } else
                c ? v = a[0] : d && (v = n[0]),
                $("#evt_set_hq").removeClass("btn_002").addClass("btn_006"),
                $("#evt_set_lq").removeClass("btn_006").addClass("btn_002"),
                $("#img_quality_ul").prev().remove(),
                $("#img_quality_ul").remove(),
                $("#img_quality_caution").remove();
            return v
        },
        appendMovieName: function(b) {
            var a = $("#sel_movie_name");
            a.html(b.getName());
            _.defer(function() {
                Wood.DomUtil.applyTextOverflow(a)
            });
            $("#sel_movie_full_name").html(b.getName())
        },
        displayRating: function(b) {
            var a = {
                201: "rd_cero",
                202: "rd_esrb",
                203: "rd_usk",
                204: "rd_pegi",
                206: "rd_pegi",
                207: "rd_bbfc",
                208: "rd_cob",
                209: "rd_oflc",
                212: "rd_rar",
                303: "rd_iarc_usk",
                304: "rd_iarc_pegi",
                306: "rd_iarc_pegi",
                308: "rd_iarc_cob",
                309: "rd_iarc_oflc"
            }[b.getRatingSystemId()];
            a && $("#rating_display").addClass(a);
            a = b.getAlternateRatingImageUrl();
            a || (a = b.getNormalRatingIcons()[0].url,
            b = b.getRatingDescriptors(),
            _.each(b, function(a) {
                var b = null;
                a.icons && a.icons.icon && (b = _.filter(a.icons.icon, function(a) {
                    return "normal" === a.type
                }));
                b && !_.isEmpty(b) ? $("#rd_r").append("<img src=" + b[0].url + " />") : (a = a.name,
                $("#rd_r").append("<p>" + a + "</p>"))
            }));
            $("#rd_l").append("<p><img src=" + a + " /></p>")
        },
        appendRelatedMovies: function(a) {
            var b = a.getTitle().id;
            $("#sel_detail").attr("href", Wood.URL.create("./#title", {
                title: b
            }));
            var c = new Wood.Model.TitleInfomation({
                ns_uid: b
            });
            $.when(c.getPromise()).done(function() {
                var b = c.getMovies();
                if (!b || _.isEmpty(b))
                    Wood.log(" - no related movies found"),
                    $("#sel_related").hide();
                else {
                    var d = a.getId();
                    _.each(b, function(a) {
                        if (d !== a.id) {
                            var b = a["new"]
                              , c = a.banner_url
                              , e = a.name;
                            a = Wood.URL.create("data02_01.html", {
                                movie: a.id
                            });
                            $("#template_movie").tmpl({
                                url_icon: c,
                                str_title: e,
                                url_detail: a,
                                is_new: b,
                                str_new: $("#str_new").text()
                            }).appendTo("#data02_01_related_mov")
                        }
                    });
                    0 === $("#data02_01_related_mov li").size() && $("#sel_related").hide()
                }
            })
        },
        onClickRelatedMovie: function(a) {
            a.preventDefault();
            wood.client.disableUserOperation();
            d.removeEventListener("wiiu_videoplayer_end", l, !0);
            e.removeEventListener("wiiu_videoplayer_end", l, !0);
            Wood.isWiiU && window.wiiu.videoplayer.end();
            location.replace($(a.currentTarget).attr("href"))
        },
        setMovieUrl: function(a) {
            function b(a) {
                return (a = a && a[0]) ? a.movie_url : null
            }
            $("#sel_hq").attr("src", b(a.getFilesHQ()));
            $("#sel_lq").attr("src", b(a.getFilesLQ()))
        },
        setClickEvents: function() {
            $("#data02_01_related_mov img").on("error", function() {
                $(this).attr("src", "image/placeholder/place_icon_movie.png")
            });
            $("#sel_detail").on("click", function(a) {
                a.preventDefault();
                wood.client.disableUserOperation();
                wood.client.playSound("SE_WAVE_OK", 1);
                d.removeEventListener("wiiu_videoplayer_end", l, !0);
                e.removeEventListener("wiiu_videoplayer_end", l, !0);
                Wood.isWiiU && window.wiiu.videoplayer.end();
                wood.client.redirectReplaceTo($(this).attr("href"))
            });
            $("#evt_set_hq").on("click", function(b) {
                $("#evt_set_hq").removeClass("btn_002").addClass("btn_006");
                $("#evt_set_lq").removeClass("btn_006").addClass("btn_002");
                m = !0;
                a();
                b.preventDefault();
                wood.client.playSound("SE_WAVE_OK_SUB", 1);
                "lq" === r && (wood.client.ls.setMovieType("hq"),
                wood.client.disableHomeButton(),
                wood.client.ls.setMovieType("hq"),
                Wood.isWiiU && wood.client.getLocalStorage().write(),
                wood.client.enableHomeButton(),
                g())
            });
            $("#evt_set_lq").on("click", function(b) {
                Wood.log("point 1");
                $("#evt_set_hq").removeClass("btn_006").addClass("btn_002");
                $("#evt_set_lq").removeClass("btn_002").addClass("btn_006");
                Wood.log("point 2");
                m = !0;
                a();
                b.preventDefault();
                Wood.log("point 3");
                wood.client.playSound("SE_WAVE_OK_SUB", 1);
                Wood.log("point 4");
                "hq" === r && (Wood.log("point 5"),
                wood.client.ls.setMovieType("lq"),
                Wood.isWiiU && (Wood.log("point 6"),
                wood.client.getLocalStorage().write()),
                wood.client.disableHomeButton(),
                wood.client.enableHomeButton(),
                Wood.log("point 7"),
                t());
                Wood.log("point 8")
            });
            $("#evt_play").on("click", function(a) {
                a.preventDefault();
                wood.client.playSound("SE_WAVE_OK", 1);
                "hq" === u ? g() : t()
            })
        },
        hookOnLoad: function(a) {
            var b = a.getRating() && a.getRatingDisplay();
            a = "ESRB" === a.getRatingSystemName();
            b ? a ? setTimeout(function() {
                $("#dmc01").fadeOut("normal", function() {
                    $("#dmc02").show()
                })
            }, 4E3) : setTimeout(function() {
                "hq" === u ? g() : t()
            }, 4E3) : setTimeout(function() {
                "hq" === u ? g() : t()
            }, 1E3)
        },
        hookMovieEvents: function() {
            d.addEventListener("wiiu_videoplayer_end", l, !0);
            d.addEventListener("canplay", function() {
                m && 0 !== k && (d.currentTime = k,
                m = !1)
            }, !0);
            d.addEventListener("play", function() {
                h = !1
            }, !0);
            d.addEventListener("ended", function() {
                h = !0
            }, !0);
            e.addEventListener("wiiu_videoplayer_end", l, !0);
            e.addEventListener("canplay", function() {
                m && 0 !== k && (e.currentTime = k,
                m = !1)
            }, !0);
            e.addEventListener("play", function() {
                h = !1
            }, !0);
            e.addEventListener("ended", function() {
                h = !0
            }, !0)
        },
        render: function() {
            f = this.model;
            var a = this.detectMovieType(f);
            u = a.quality.toLowerCase();
            a = Wood.Util.formatTime(a.play_time_sec);
            $(".sel_movie_time").text(a);
            this.appendMovieName(f);
            $("#data02_01_02").hide();
            $("body").removeClass("display_cover");
            f.getRating() && f.getRatingDisplay() ? this.displayRating(f) : $("#rating_display").hide();
            Wood.Analytics.addDirectoryAttr(this.options.beacon_param).sendVirtualPV("VP_Movie");
            f.getTitle() ? this.appendRelatedMovies(f) : ($("#view_soft_info").hide(),
            $("#sel_related").hide());
            this.setMovieUrl(f);
            this.setClickEvents();
            this.hookOnLoad(f);
            this.hookMovieEvents();
            return this
        }
    })
}
)();
