var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(a, b, c) {
    a instanceof String && (a = String(a));
    for (var d = a.length, e = 0; e < d; e++) {
        var f = a[e];
        if (b.call(c, f, e, a))
            return {
                i: e,
                v: f
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
}
;
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, c) {
        return $jscomp.findInternal(this, a, c).v
    }
}, "es6", "es3");
(function() {
    Wood.Controller.Always02_01 = Wood.Controller.Base.extend({
        preparePage: function(a, b) {
            a.disableUserOperation();
            this.setupMenu(Wood.View.MenuBar.Type.SEARCH);
            this.menuBar.hookBackEvent(function() {
                a.historyBack()
            })
        },
        run: function(a, b) {
            b = {
                country: a.country,
                language: a.language
            };
            this.models = b = {
                platforms: this.generateModel("PlatformList", b),
                genres: this.generateModel("GenreList", b),
                publishers: this.generateModel("PublisherList", b)
            };
            this.view = this.generateView("Search", {
                model: b,
                controller: this
            });
            var c = this
              , d = Wood.Util.createPromise(function(a) {
                c.view.render();
                a.resolve()
            });
            $.when(b.platforms.getPromise(), b.genres.getPromise(), b.publishers.getPromise(), d).done(function() {
                c.trigger("promiseDone")
            }).always(function() {
                a.enableUserOperation()
            })
        },
        onPageShowCache: function(a, b) {}
    })
}
)();
(function() {
    Wood.Model.PlatformList = Wood.Model.Base.extend({
        storageCache: {
            keyname: "_platforms_v1",
            storage: Wood.SessionStorage,
            flush_on_save: !1,
            autosave: !0
        },
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/platforms"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                data: {
                    lang: this.language
                },
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.platforms
        },
        getLength: function() {
            return this.get("length")
        },
        getPlatform: function() {
            return this.get("platform")
        }
    })
}
)();
(function() {
    Wood.Model.GenreList = Wood.Model.Base.extend({
        storageCache: {
            keyname: "_genres_v1",
            storage: Wood.SessionStorage,
            flush_on_save: !1,
            autosave: !0
        },
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/genres"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                data: {
                    lang: this.language
                },
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.genres
        },
        getLength: function() {
            return this.get("length")
        },
        getGenre: function() {
            return this.get("genre")
        }
    })
}
)();
(function() {
    Wood.Model.PublisherList = Wood.Model.Base.extend({
        storageCache: {
            keyname: "_publishers_v1",
            storage: Wood.SessionStorage,
            flush_on_save: !1,
            autosave: !0
        },
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/publishers"
        },
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, {
                data: {
                    lang: this.language
                },
                xhrFields: {
                    withCredentials: !1
                }
            });
            $.extend(b, a);
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.publishers
        },
        getLength: function() {
            return this.get("length")
        },
        getPublisher: function() {
            return this.get("publisher")
        }
    })
}
)();
(function() {
    Wood.View.Search = Wood.View.Base.extend({
        el: "#always_02_01",
        template: Wood.Template.get("search", "#main"),
        events: {
            "click .search-submit": "searchSubmit",
            "click #soft": "switchTitle",
            "click #movie": "switchMovie",
            "click #both": "switchBoth",
            "click #show-publisher": "showPublisher",
            "click #show-genre": "showGenre",
            "click .dialog-submit": "closeDialog",
            "click .reset-all": "resetAll",
            "click .reset-price": "resetPrice",
            "click li.all > input:checkbox": "onChangeCategoryAll",
            "click li:not(.all) > input:checkbox": "onChangeCategory"
        },
        initialize: function() {
            this.setup();
            this.listenTo(this.options.controller, "promiseDone", this.renderSearchCategory);
            this.menu_bar = this.options.controller.menuBar;
            this.back_event = this.menu_bar.back_event;
            this.last_scroll = 0
        },
        afterRender: function() {
            this.localizeText();
            this.hookSE();
            this.$wrap = this.$("#always_02_wrapper");
            this.$footer = this.$("#footer");
            this.$search_title = this.$("#search-title");
            this.$search_movie = this.$("#serach-movie");
            this.$search_platform = this.$("#search-platform");
            this.$genre_dialog = this.$("#genre_dialog");
            this.$publisher_dialog = this.$("#publisher_dialog");
            this.$assigned_genre = this.$(".assigned-genre");
            this.$assigned_publisher = this.$(".assigned-publisher");
            this.$price_min = this.$("input[name='price_min']");
            this.$price_max = this.$("input[name='price_max']");
            this.$freeword = this.$("input[name='freeword']");
            this.$search_type = this.$("input[name='searchType']");
            this.$price_min.attr("placeholder", this.$("#str_priceMin").text());
            this.$price_max.attr("placeholder", this.$("#str_priceMax").text());
            this.$freeword.attr("placeholder", this.$("#str_freeword").text());
            var a = this;
            this.loadSearchStatus({
                searchType: function(b) {
                    a.$search_type.prop("checked", !1);
                    a.$search_type.filter("[value='" + b + "']").prop("checked", !0);
                    a.switchType(b)
                },
                "device[]": function(b) {
                    a.setCheckbox(b, "device[]")
                },
                freeword: function(b) {
                    a.$freeword.val(b)
                },
                price_min: function(b) {
                    a.$price_min.val(b)
                },
                price_max: function(b) {
                    a.$price_max.val(b)
                }
            })
        },
        loadSearchStatus: function(a) {
            var b = wood.client.getSessionStorage();
            _.each(a, function(a, d) {
                d = b.getItem(d);
                null !== d && a(d)
            })
        },
        setCheckbox: function(a, b) {
            var c = this.$('input[name="' + b + '"]');
            c.filter('[value="0"]').prop("checked", !1);
            _.each(a.split(","), function(a) {
                c.filter('[value="' + a + '"]').prop("checked", !0)
            })
        },
        switchType: function(a) {
            switch (a) {
            case "title":
                this.$search_title.show();
                this.$search_movie.hide();
                this.$footer.show();
                break;
            case "movie":
                this.$search_title.hide();
                this.$search_movie.show();
                this.$footer.hide();
                break;
            case "both":
                this.$search_title.hide(),
                this.$search_movie.hide(),
                this.$footer.hide()
            }
        },
        renderSearchCategory: function() {
            this.$(".loading").remove();
            var a = new Wood.View.Base({
                template: Wood.Template.get("search", "#platform"),
                model: this.model.platforms
            });
            a.presenter = function() {
                return {
                    data: this.model.getPlatform()
                }
            }
            ;
            this.$search_platform.find("ul").append(a.render().$el.children());
            a = new Wood.View.Base({
                template: Wood.Template.get("search", "#genre"),
                model: this.model.genres
            });
            a.presenter = function() {
                return {
                    data: this.model.getGenre()
                }
            }
            ;
            this.$genre_dialog.find("ul").append(a.render().$el.children());
            a = new Wood.View.Base({
                template: Wood.Template.get("search", "#publisher"),
                model: this.model.publishers
            });
            a.presenter = function() {
                return {
                    data: this.model.getPublisher()
                }
            }
            ;
            this.$publisher_dialog.find("ul").append(a.render().$el.children());
            var b = this;
            this.loadSearchStatus({
                "platform[]": function(a) {
                    b.setCheckbox(a, "platform[]")
                },
                "publisher[]": function(a) {
                    b.setCheckbox(a, "publisher[]")
                },
                "genre[]": function(a) {
                    b.setCheckbox(a, "genre[]")
                }
            });
            this.updateAssignedCategory();
            this.$category_all = this.$("li.all > input:checkbox");
            this.$category_each = this.$("li:not(.all) > input:checkbox")
        },
        searchSubmit: function(a) {
            a.preventDefault();
            var b = {}
              , c = wood.client.getSessionStorage()
              , d = this;
            a = function(a) {
                var f = d.$('input[name="' + a + '"]:checked');
                "0" !== f.val() ? b[a] = f.map(function() {
                    return $(this).val()
                }).get().join(",") : c.removeItem(a)
            }
            ;
            var e = function(a) {
                var e = d.$('input[name="' + a + '"]');
                e = parseInt(e.val(), 10);
                isFinite(e) ? b[a] = e.toString() : c.removeItem(a)
            };
            switch (this.$("input[name='searchType']:checked").val()) {
            case "title":
                _.each(["platform[]", "genre[]", "publisher[]"], a);
                _.each(["price_min", "price_max"], e);
                break;
            case "movie":
                a("device[]")
            }
            a("searchType");
            (function(a) {
                var e = d.$('input[name="' + a + '"]').val();
                "" !== e ? b[a] = e : c.removeItem(a)
            }
            )("freeword");
            _.each(b, function(a, b) {
                c.setItem(b, a)
            });
            wood.client.redirectReplaceTo("./#shelf", b)
        },
        switchTitle: function() {
            this.switchType("title")
        },
        switchMovie: function() {
            this.switchType("movie")
        },
        switchBoth: function() {
            this.switchType("both")
        },
        showGenre: function(a) {
            a.preventDefault();
            this.showDialog(this.$genre_dialog)
        },
        showPublisher: function(a) {
            a.preventDefault();
            this.showDialog(this.$publisher_dialog)
        },
        showDialog: function(a) {
            a.show();
            this.$wrap.hide();
            this.last_scroll = $("body").scrollTop();
            Wood.DomUtil.animateToTop();
            a = _.bind(this.closeDialog, this);
            this.menu_bar.hookBackEvent(a);
            this.menu_bar.rebuild()
        },
        closeDialog: function(a) {
            a && a.preventDefault();
            this.updateAssignedCategory();
            this.$wrap.show();
            this.$genre_dialog.hide();
            this.$publisher_dialog.hide();
            Wood.DomUtil.animateToTop(this.last_scroll);
            this.menu_bar.hookBackEvent(this.back_event);
            this.menu_bar.rebuild()
        },
        updateAssignedCategory: function() {
            var a = function(a, c) {
                a = a.find("input:checked").map(function() {
                    return $(this).next().text()
                }).get();
                c.find("dd").text(a.join("/"))
            };
            _.each([[this.$genre_dialog, this.$assigned_genre], [this.$publisher_dialog, this.$assigned_publisher]], function(b) {
                a(b[0], b[1])
            })
        },
        resetAll: function(a) {
            a.preventDefault();
            this.$price_min.val("");
            this.$price_max.val("");
            this.$freeword.val("");
            this.$category_all.filter(":not([name='device[]'])").prop("checked", !0);
            this.$category_each.filter(":not([name='device[]'])").prop("checked", !1);
            this.updateAssignedCategory()
        },
        resetPrice: function(a) {
            a.preventDefault();
            this.$price_min.val("");
            this.$price_max.val("")
        },
        onChangeCategoryAll: function(a) {
            a = $(a.currentTarget);
            a.prop("checked") ? a.parent().nextAll().find("input").prop("checked", !1) : a.prop("checked", !0)
        },
        onChangeCategory: function(a) {
            a = $(a.currentTarget);
            var b = a.parent().parent().find("li.all input");
            a.prop("checked") ? b.prop("checked", !1) : 0 === a.parent().parent().find("li:not(.all) input:checked").size() && b.prop("checked", !0)
        }
    })
}
)();
