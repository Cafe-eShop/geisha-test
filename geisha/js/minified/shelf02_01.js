(function() {
  Wood.Model.RankingList = Wood.Model.Base.extend({
      url: function() {
          return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/rankings"
      },
      fetch: function(b) {
          var a = this.getBaseAjaxParam();
          $.extend(a, {
              type: "GET",
              data: {
                  lang: this.language,
                  device: 5
              },
              async: !1,
              xhrFields: {
                  withCredentials: !1
              }
          });
          $.extend(a, b);
          this.fetchJSON(a)
      },
      parse: function(b) {
          return b.rankings
      },
      getRankings: function() {
          return this.get("ranking")
      },
      getRankingById: function(b) {
          var a = this.getRankings();
          if (!a || 0 === a.length)
              return null;
          for (var e = a.length, c = 0; c < e; c++)
              if (a[c].id === b)
                  return a[c];
          return null
      }
  })
}
)();
(function() {
  Wood.Model.Ranking = Wood.Model.Base.extend({
      url: function() {
          return Wood.UrlPrefix.SAMURAI + "ws/" + this.country + "/ranking/" + this.ranking_id
      },
      initialize: function(b) {
          _.extend(this, b);
          this.limit = 20;
          this.filter_id = null;
          this.setup()
      },
      fetch: function(b, a) {
          var e = this.getBaseAjaxParam()
            , c = {
              lang: this.language
          };
          b && (c.filter = b);
          $.extend(e, {
              type: "GET",
              data: c,
              async: !1,
              xhrFields: {
                  withCredentials: !1
              }
          });
          $.extend(e, a);
          this.fetchJSON(e)
      },
      parse: function(b) {
          this.clear({
              silent: !0
          });
          return b.ranking
      },
      getName: function() {
          return this.get("name")
      },
      getId: function() {
          return this.get("id")
      },
      isRecentBestSellerType: function() {
          return 1 === this.get("id")
      },
      isAllBestSellerType: function() {
          return 2 === this.get("id")
      },
      isRecentRecommendType: function() {
          return 3 === this.get("id")
      },
      isAllRecommendType: function() {
          return 4 === this.get("id")
      },
      isPopularVideoType: function() {
          return 5 === this.get("id")
      },
      getType: function() {
          return this.get("type")
      },
      getContents: function() {
          return this.getSafe("contents.content")
      },
      getTitleIds: function() {
          var b = []
            , a = this.getContents();
          if (Wood.Util.isUndefined(a))
              return b;
          for (var e = a.length, c = 0; c < e; c++) {
              var d = a[c];
              d.title && d.title.id && b.push(d.title.id)
          }
          return b
      }
  })
}
)();
(function() {
  function b(a) {
      if (Wood.Util.isUndefined(a))
          throw Error("price status not stored");
  }
  Wood.Model.OnlinePrice = Wood.Model.Base.extend({
      getSalesStatus: function() {
          return this.get("eshop_sales_status")
      },
      isUnreleased: function() {
          var a = this.getSalesStatus();
          b(a);
          return "unreleased" === a
      },
      isOnSale: function() {
          var a = this.getSalesStatus();
          b(a);
          return "onsale" === a
      },
      isDownloadTerminated: function() {
          var a = this.getSalesStatus();
          b(a);
          return "download_termination" === a
      },
      isSalesTerminated: function() {
          var a = this.getSalesStatus();
          b(a);
          return "sales_termination" === a
      },
      isPreOrder: function() {
          var a = this.getPriceObj();
          return a && !0 === a.pre_order
      },
      getPriceObj: function() {
          return this.get("price")
      },
      getRawValue: function() {
          return parseFloat(this.getPriceObj().regular_price.raw_value, 10)
      },
      isEmpty: function() {
          return _.isEmpty(this.getPriceObj())
      },
      isFree: function(a) {
          return this.getLowestPrice(a).isFree()
      },
      isDiscount: function() {
          var a = this.getPriceObj();
          return a && a.discount_price
      },
      isConditional: function() {
          var a = this.getPriceObj();
          return a && a.conditional_prices
      },
      isCoupon: function() {
          var a = this.getPriceObj();
          return a && a.coupon_price
      },
      getRegularPrice: function() {
          var a = this.getPriceObj();
          return a ? new Wood.Price(a.regular_price.id,a.regular_price.raw_value,a.regular_price.amount,a.regular_price.currency,Wood.Price.DiscountType.NONE,a.regular_price.description) : null
      },
      getDiscountPrice: function() {
          var a = this.getPriceObj();
          return this.isDiscount() ? new Wood.Price(a.discount_price.id,a.discount_price.raw_value,a.discount_price.amount,a.discount_price.currency,Wood.Price.DiscountType.NORMAL,a.discount_price.description) : null
      },
      getConditionalPrices: function() {
          var a = this.getPriceObj();
          if (!this.isConditional())
              return null;
          for (var b = [], c = a.conditional_prices.conditional_price, d = c.length, g = 0; g < d; g++)
              a = c[g],
              b.push(new Wood.Price(a.id,a.raw_value,a.amount,a.currency,Wood.Price.DiscountType.CONDITIONAL,a.description));
          return b
      },
      getConditionalPrice: function(a) {
          var b = this.getPriceObj();
          if (!b || !b.conditional_prices)
              return null;
          var c = b.conditional_prices.conditional_price
            , d = c.length
            , g = {};
          b = a.length;
          for (var f = 0; f < b; f++)
              g[a[f]] = !0;
          for (a = 0; a < d; a++) {
              b = c[a];
              f = b.conditional_contents.conditional_content.length;
              for (var h = 0, l = 0; l < f; l++)
                  g[b.conditional_contents.conditional_content[l]] && h++;
              if (0 < h && h === f)
                  return new Wood.Price(b.id,b.raw_value,b.amount,b.currency,Wood.Price.DiscountType.CONDITIONAL,b.description)
          }
          return null
      },
      getCouponPrice: function() {
          var a = this.getPriceObj();
          return this.isCoupon() ? new Wood.Price(null,a.coupon_price.raw_value,a.coupon_price.amount,a.coupon_price.currency,Wood.Price.DiscountType.COUPON,null) : null
      },
      getLowestPrice: function(a) {
          return _.isArray(a) && !_.isEmpty(a) && (a = this.getConditionalPrice(a)) || (a = this.getDiscountPrice()) ? a : (a = this.getRegularPrice()) ? a : null
      }
  })
}
)();
(function() {
  Wood.Model.TitlePriceList = Wood.Model.Base.extend({
      url: function() {
          return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/titles/online_prices"
      },
      use_store: !0,
      fetch: function(b) {
          var a = this.getBaseAjaxParam()
            , e = {
              lang: this.language,
              "title[]": this.title_ids.join(","),
              include_coupon: !0
          };
          this.coupon_id && (e.coupon_id = this.coupon_id);
          $.extend(a, {
              type: "GET",
              async: !1,
              data: e,
              xhrFields: {
                  withCredentials: !0
              }
          });
          $.extend(a, b);
          this.fetchJSON(a)
      },
      parse: function(b) {
          return b.online_prices
      },
      getOnlinePrices: function() {
          return this.get("online_price")
      },
      getTitlePrices: function() {
          var b = []
            , a = this.get("online_price");
          if (!a)
              return b;
          for (var e = a.length, c = 0; c < e; c++) {
              var d = new Wood.Model.TitlePrice({
                  country: this.country,
                  language: this.language,
                  title_id: a[c].title_id
              });
              d.set(a[c]);
              b.push(d)
          }
          return b
      },
      getTitlePriceById: function(b) {
          var a = this.getTitlePrices();
          if (0 === a.length)
              return null;
          for (var e = a.length, c = 0; c < e; c++)
              if (a[c].title_id === b)
                  return a[c];
          return null
      }
  })
}
)();
(function() {
  Wood.Model.TitlePrice = Wood.Model.OnlinePrice.extend({
      url: function() {
          return Wood.UrlPrefix.NINJA + "ws/" + this.country + "/titles/online_prices"
      },
      initialize: function(b) {
          _.extend(this, b);
          this.sales_status = null;
          this.setup()
      },
      fetch: function(b) {
          var a = this.getBaseAjaxParam()
            , e = {
              lang: this.language,
              "title[]": this.title_id,
              include_coupon: !0
          };
          this.coupon_id && (e.coupon_id = this.coupon_id);
          $.extend(a, {
              type: "GET",
              async: !1,
              data: e,
              xhrFields: {
                  withCredentials: !0
              }
          });
          $.extend(a, b);
          this.fetchJSON(a)
      },
      parse: function(b) {
          return b.online_prices.online_price[0]
      },
      getTitleId: function() {
          return this.title_id
      },
      getTentativePrice: function() {
          var b = this.get("tentative_price");
          if (!b)
              return null;
          var a = new Wood.Model.MoneyType;
          a.set(b);
          return a
      }
  })
}
)();
(function() {
  Wood.View.Ranking.Types = Backbone.View.extend({
      el: "#el-filter",
      initialize: function() {
          this.render();
          this.hookEvents()
      },
      hookEvents: function() {
          var b = this;
          $("select").on("change", function() {
              var a = b.options.controller;
              a.disableCategoryPulldowns();
              wood.client.disableUserOperation();
              var c = parseInt($("#el-category").val(), 10)
                , d = $("#el-refine").val()
                , g = parseInt(d, 10);
              if (void 0 !== c) {
                  $("#shelf-list  li").remove();
                  c !== a.ranking.ranking_id && (d = g = null);
                  var f = a.ranking_list.getRankingById(c);
                  f && a.ranking_type_view.renderCategoryFilter(f, g);
                  a.ranking.ranking_id = c;
                  a.ranking.fetch(d, {
                      async: !1
                  });
                  a.ranking.getId() || (wood.client.showError(Wood.ErrorCode.RETRIABLE),
                  wood.client.historyBack())
              }
          });
          var a = function(a) {
              b.options.controller.disableCategoryPulldowns()
          };
          $("#top_link_01,#top_link_03,#top_link_04,#top_link_05").on("keydown", Wood.KeyEvent.A(a)).on("click", a)
      },
      render: function() {
          for (var b = this.model.getRankings(), a = b.length, e = 0; e < a; e++) {
              var c = b[e];
              $('<option value="' + c.id + '">&zwj;' + c.name + "</option>").appendTo("#el-category");
              0 === e && this.renderCategoryFilter(c)
          }
      },
      renderCategoryFilter: function(b, a) {
          $("#el-refine").empty();
          $("#el-refine").prop("disabled", !0);
          if (b.filters && 0 < b.filters.filter.length) {
              b = b.filters.filter;
              $('<option value="">&zwj;' + $("#str_all").text() + "</option>").appendTo("#el-refine");
              for (var e = 0; e < b.length; e++)
                  $('<option value="' + b[e].id + '"' + (b[e].id === a ? " selected" : "") + ">&zwj;" + b[e].name + "</option>").appendTo("#el-refine")
          }
      }
  })
}
)();
(function() {
  Wood.View.Ranking.Body = Wood.View.Base.extend({
      el: "#shelf-list",
      initialize: function() {
          this.render()
      },
      render: function() {
          Wood.DomUtil.animateToTop();
          $("#shelf-list").empty();
          var b = this.model.getContents();
          if (b && 0 !== b.length) {
              for (var a = b.length, e = {}, c = 0; c < a; c++) {
                  var d = b[c];
                  d.title ? (this.appendTitle(d),
                  e[d.title.id] = d) : d.movie && this.appendMovie(d)
              }
              this.contents = e;
              _.defer(function() {
                  $("#shelf-list li").each(function() {
                      if ("movie" === $(this).data("content-type")) {
                          var a = $(".list-movie-summary > .name", this);
                          Wood.DomUtil.applyTextOverflow(a)
                      }
                  })
              });
              Wood.DomUtil.lazyload("img.lazy")
          } else
              $("#shelf-list").append($("#no_result").clone()),
              this.options.controller.enableCategoryPulldowns()
      },
      appendTitle: function(b) {
          var a = b.title.id
            , e = b.title.name
            , c = "./#title?title=" + a
            , d = "buy01_01.html?type=title&title=" + a
            , g = b.title.platform.name
            , f = b.title.platform.device
            , h = b.title.publisher.name
            , l = b.title.eshop_sales
            , k = b.title.release_date_on_eshop
            , m = this.getRatingStarInfo(b.title);
          this.model.isRecentRecommendType() && (m.rating_votes = "");
          var p = null
            , n = null;
          b.title.rating_info && (n = b.title.rating_info,
          p = n.rating_system.name,
          n = n.rating.name);
          var q = "";
          p && n && (q = p + ": " + n);
          $("#template_title").tmpl({
              data_title_id: a,
              data_esales_flg: l,
              data_release_date: k,
              data_content_type: f,
              str_title: e,
              str_platform: g,
              str_publisher: h,
              str_rating: q,
              str_rank_no: b.index,
              url_icon: b.title.icon_url,
              url_detail: c,
              url_buy: d,
              is_new: b.title["new"],
              has_demo: b.title.demo_available,
              has_aoc: b.title.aoc_available,
              has_rating: m.has_rating,
              rating_img_path: m.rating_img_path,
              rating_votes: m.rating_votes,
              str_new: $("#str_new").text(),
              str_sale: $("#str_sale").text(),
              str_pre_order: $("#str_pre_order").text(),
              str_conditional_sale: $("#str_conditional_sale").text(),
              str_owned_coupon: $("#str_owned_coupon").text(),
              str_buy: $("#str_buy").text()
          }).appendTo("#shelf-list")
      },
      appendMovie: function(b) {
          for (var a = b.movie.name, e = b.movie.icon_url, c = "data02_01.html?movie=" + b.movie.id, d = b.movie.files.file, g = d.length, f = null, h = null, l = 0; l < g; l++) {
              var k = d[l];
              k.quality && "HQ" === k.quality ? f = k : k.quality && "LQ" === k.quality && (h = k)
          }
          d = [];
          f = f ? f.play_time_sec : h.play_time_sec;
          d[0] = Math.floor(f / 3600);
          d[1] = Math.floor(f / 60 % 60);
          10 > d[1] && (d[1] = "0" + d[1]);
          d[2] = f % 60;
          10 > d[2] && (d[2] = "0" + d[2]);
          f = d.join(":");
          h = "";
          b.movie.rating_info && (d = b.movie.rating_info.rating_system,
          g = b.movie.rating_info.rating,
          d && g && (h = d.name + ": " + g.name));
          $("#template_movie").tmpl({
              str_title: a,
              url_icon: e,
              url_detail: c,
              data_content_type: "movie",
              is_new: b.movie["new"],
              str_rank_no: b.index,
              str_mov_time: f,
              str_movie: $("#str_movie").text(),
              str_new: $("#str_new").text(),
              str_rating: h
          }).appendTo("#shelf-list")
      },
      renderUnreleased: function(b) {
          var a = String(b.data("release-date"));
          "TBD" === a || "" === a ? a = $("#str_unreleased_eshop").html() : (a = a.split("-"),
          a = 3 === a.length ? $("#str_available_ymd").html().replace("%{yyyy}", a[0]).replace("%{mm}", a[1]).replace("%{dd}", a[2]) : 2 === a.length ? $("#str_available_ym").html().replace("%{yyyy}", a[0]).replace("%{mm}", a[1]) : $("#str_available_y").html().replace("%{yyyy}", a[0]));
          $(".el-purchase", b).append($("#template_unreleased").tmpl({
              str_date: a
          }))
      },
      applyPrice: function(b, a) {
          var e = $("#shelf-list li[data-title-id=" + b.getTitleId() + "]");
          $(".el-purchase", e).empty();
          var c = this.contents[b.getTitleId()]
            , d = c.title.platform.device
            , g = c.title.eshop_sales
            , f = c.title.retail_sales;
          c = c.title.in_app_purchase;
          g || f ? "WUP" !== d || g ? "CTR" === d && g ? $(".el-purchase", e).append($("#template_sales_termination").tmpl({
              str_termination: $("#str_check_at_tiger").html()
          })) : b.isUnreleased() ? this.renderUnreleased(e) : b.isSalesTerminated() ? $(".el-purchase", e).append($("#template_sales_termination").tmpl({
              str_termination: $("#str_termination").html()
          })) : b.isDownloadTerminated() ? $(".el-purchase", e).append($("#template_download_termination").tmpl({
              str_termination: $("#str_termination").html()
          })) : this.renderPrice(e, b, a, c) : $(".el-purchase", e).append($("#template_sales_termination").tmpl({
              str_termination: $("#str_check_at_retailer").html()
          })) : $(".el-purchase", e).append($("#template_sales_termination").tmpl({
              str_termination: $("#str_termination").html()
          }))
      },
      renderPrice: function(b, a, e, c) {
          var d = a.getLowestPrice(e.getAllIds())
            , g = a.getCouponPrice()
            , f = !1
            , h = !1
            , l = !1
            , k = "";
          $(".el-price", b).empty();
          if (d.isNotAtDiscount() && !g)
              var m = Wood.DomUtil.getTaxTextWithPriceObject(d);
          else
              d.isAtNormalDiscount() ? ($(".sel_disp_sale", b).show(),
              f = !0) : d.isAtConditionalDiscount() && ($(".sel_disp_conditional", b).show(),
              h = !0),
              g && ($(".sel_disp_owned_coupon", b).show(),
              l = !0),
              m = a.getRegularPrice().getAmount(),
              k = Wood.DomUtil.getTaxTextWithPriceObject(g || d),
              g && (k = $("#str_to").text().replace("%{price}", k));
          a.isPreOrder() && !d.isFree() && ($(".status-pre-order", b).show(),
          $(".status-new", b).hide());
          d.isFree() ? c && $("#template_price").tmpl({
              is_normal_discount: !1,
              is_conditional_discount: !1,
              is_coupon_discount: !1,
              regular_price: $("#str_in_app_purchase").html(),
              discount_price: ""
          }).appendTo($(".el-price", b)) : $("#template_price").tmpl({
              is_normal_discount: f,
              is_conditional_discount: h,
              is_coupon_discount: l,
              regular_price: m,
              discount_price: k
          }).appendTo($(".el-price", b));
          e.contains(a.getTitleId()) ? $(".el-purchase", b).append($("#template_purchased").tmpl({
              str_purchased: $("#str_purchased").text()
          })) : d && (a = "buy01_01.html?type=title&title=" + a.getTitleId(),
          d.isFree() ? $(".el-purchase", b).append($("#template_download").tmpl({
              url_dl: a,
              str_DL: $("#str_DL").text()
          })) : $(".el-purchase", b).append($("#template_buy").tmpl({
              url_buy: a,
              str_buy: $("#str_buy").text()
          })))
      },
      applyPriceList: function(b) {
          if ((b = b.getTitlePrices()) && 0 !== b.length) {
              $(".sel_disp_sale").hide();
              $(".sel_disp_conditional_sale").hide();
              $(".sel_disp_owned_coupon").hide();
              for (var a = wood.client.getDeviceOrderList(), e = b.length, c = 0; c < e; c++)
                  this.applyPrice(b[c], a)
          }
      }
  })
}
)();
(function() {
  Wood.Controller.Shelf02_01 = Wood.Controller.Base.extend({
      preparePage: function() {
          this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
          this.menuBar.hookBackEvent(function() {
              wood.client.historyBack()
          });
          Wood.Analytics.addFromAttr("ranking").sendVirtualPV("VP_Ranking")
      },
      disableCategoryPulldowns: function() {
          $("#el-category").prop("disabled", !0);
          $("#el-refine").prop("disabled", !0)
      },
      enableCategoryPulldowns: function() {
          $("#el-category").prop("disabled", !1);
          0 < $("#el-refine option").length && $("#el-refine").prop("disabled", !1)
      },
      run: function() {
          var b = this;
          b.ranking_list = new Wood.Model.RankingList({
              country: wood.client.country,
              language: wood.client.language
          });
          b.ranking_list.fetch();
          b.ranking_type_view = b.renderView(Wood.View.Ranking.Types, {
              model: b.ranking_list
          });
          b.disableCategoryPulldowns();
          var a = parseInt($("#el-category").val(), 10)
            , e = parseInt($("#el-refine").val(), 10);
          b.ranking = new Wood.Model.Ranking({
              country: wood.client.country,
              language: wood.client.language,
              ranking_id: a
          });
          b.ranking.filter_id = e;
          b.ranking.bind("change", function() {
              b.view = b.renderView(Wood.View.Ranking.Body, {
                  model: this
              });
              var a = this.getTitleIds();
              0 !== a.length && (b.title_price_list = new Wood.Model.TitlePriceList({
                  country: wood.client.country,
                  language: wood.client.language,
                  title_ids: a
              }),
              b.title_price_list.fetch(),
              b.view.applyPriceList(b.title_price_list),
              b.renderView(Wood.View.Common.PushToWishlist, {
                  ns_uid: a
              }),
              b.view.hookSE());
              b.enableCategoryPulldowns();
              wood.client.enableUserOperation()
          }, b.ranking);
          b.ranking.fetch(e, {
              async: !0
          });
          $("#wrap").show()
      },
      onPageShowCache: function() {
          0 === $("#shelf-list").children().size() ? (wood.client.disableUserOperation(),
          Wood.DomUtil.hideBody(),
          this.reload()) : ($("#el-category").prop("disabled", !1),
          0 < $("#el-refine option").length && $("#el-refine").prop("disabled", !1));
          this.title_price_list.fetch();
          this.view.applyPriceList(this.title_price_list);
          this.renderView(Wood.View.Common.PushToWishlist, {
              ns_uid: this.ranking.getTitleIds()
          });
          this.view.hookSE()
      }
  })
}
)();
