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
    Wood.Model.News = Wood.Model.Base.extend({
        url: function() {
            return Wood.UrlPrefix.SAMURAI + "ws/" + wood.client.country + "/news"
        },
        use_store: !0,
        fetch: function(a) {
            var b = this.getBaseAjaxParam();
            $.extend(b, a);
            b.type = "GET";
            b.data = {
                lang: wood.client.language
            };
            this.fetchJSON(b)
        },
        parse: function(a) {
            return a.news
        },
        getNews: function() {
            return this.get("news_entry")
        }
    })
}
)();
(function() {
    Wood.View.News = Backbone.View.extend({
        el: "#top02_01",
        initialize: function() {
            this.template = {
                list: Wood.Template.get("news", "#template_news_list"),
                detail: Wood.Template.get("news", "#template_news_detail")
            };
            this.is_reading = this.is_locked = !1;
            var a = this;
            a.options.menuBar.hookBackEvent(function() {
                if (a.is_reading) {
                    if (a.is_locked)
                        return;
                    a.is_reading = !1
                }
                wood.client.historyBack()
            });
            this.model.bind("change", this.render, this);
            this.model.fetch({
                async: !1
            })
        },
        render: function() {
            var a = this.model.getNews()
              , b = this;
            this.options.menuBar.allowScroll();
            Wood.Util.each(a, function(a, d) {
                a = d.id.toString();
                var c = d.headline;
                d = b.createNewsHTML(d);
                var f = !wood.client.isNewsRead(a);
                $(b.template.list({
                    url_detail: "#news_" + a,
                    str_title: c,
                    is_new: f,
                    str_new: $("#str_new").text()
                })).appendTo("#sel_list");
                $(b.template.detail({
                    id_news: "news_" + a,
                    str_title: c,
                    str_content: d
                })).appendTo("#sel_detail")
            });
            Wood.DomUtil.lazyload(this.$("img.lazy"));
            Wood.DomUtil.hookLabelSoundEffectEvent($("#sel_detail, #sel_list"));
            $(".evt_show_detail").on("click", _.bind(this.renderDetailOnClick, this))
        },
        renderDetailOnClick: function(a) {
            a.preventDefault();
            a = $(a.currentTarget);
            this.renderDetail(a)
        },
        renderDetailWithId: function(a) {
            a = $('a[data-detail="#news_' + a + '"]');
            this.renderDetail(a)
        },
        renderDetail: function(a) {
            var b = this;
            b.is_locked = !0;
            b.is_reading = !0;
            var c = a.data("detail")
              , d = $(c).attr("id").slice(5);
            Backbone.history.navigate("news?id=" + d);
            Wood.Analytics.addFromAttr("news").sendVirtualPV("VP_NewsDetail");
            $("#sel_list").fadeOut(0, function() {
                $(c).show(0, function() {
                    b.is_locked = !1
                });
                Wood.DomUtil.animateToTop()
            });
            wood.client.readNews(d);
            a.next("span.sel-new").hide()
        },
        createNewsHTML: function(a) {
            var b = this.createHyperlinkTag(a.description);
            return b = this.createImageTag(b, a.images)
        },
        createHyperlinkTag: function(a) {
            var b = [{
                re: /\[(.*?)\]\(title:(.*?)\)/g,
                str: '<a class="se" data-se-label="SE_WAVE_OK" href="#title?title=$2"><span>$1</span></a>'
            }, {
                re: /\[(.*?)\]\(aocs:(.*?)\)/g,
                str: '<a class="se" data-se-label="SE_WAVE_OK" href="data03_01.html?title=$2"><span>$1</span></a>'
            }, {
                re: /\[(.*?)\]\(movie:(.*?)\)/g,
                str: '<a class="se" data-se-label="SE_WAVE_OK" href="data02_01.html?movie=$2"><span>$1</span></a>'
            }, {
                re: /\[(.*?)\]\(shelf:(.*?)\)/g,
                str: '<a class="se" data-se-label="SE_WAVE_OK" href="#shelf?directory=$2"><span>$1</span></a>'
            }, {
                re: /\[(.*?)\]\(shelf_alias:(.*?)\)/g,
                str: '<a class="se" data-se-label="SE_WAVE_OK" href="#shelf?alias=$2"><span>$1</span></a>'
            }];
            if (!a)
                return "";
            a = a.split(/\n/);
            return _.map(a, function(a) {
                _.each(b, function(b) {
                    a = a.replace(b.re, b.str)
                });
                return a
            }).join("")
        },
        createImageTag: function(a, b) {
            return b && b.image ? a.replace(/\((icon|banner):(\d*?)\)/g, function(a, d, e) {
                e = parseInt(e, 10);
                var c = _.find(b.image, function(a) {
                    return a.index === e
                });
                return c ? '<img src="image/placeholder/place_free_dcdcdc.png"data-original="' + c.url + '" class="lazy news-' + d + '" width="' + c.width + '" height="' + c.height + '" />' : a
            }) : a
        }
    })
}
)();
(function() {
    Wood.Controller.Top02_01 = Wood.Controller.Base.extend({
        preparePage: function() {
            this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
            Wood.Analytics.sendVirtualPV("VP_NewsList")
        },
        run: function() {
            this.models.news = this.generateModel("News");
            this.view = this.renderView("News", {
                model: this.models.news,
                menuBar: this.menuBar
            });
            var a = this.parseParam().id;
            a && this.view.renderDetailWithId(a);
            this.showPage()
        },
        onPageShowCache: function() {}
    })
}
)();
