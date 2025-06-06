(function() {
  Wood.Model.RedeemableCard = Wood.Model.Base.extend({
      url: function() {
          return Wood.UrlPrefix.NINJA + "ws/redeemable_card/!check"
      },
      fetch: function(a) {
          var c = this.getBaseAjaxParam();
          $.extend(c, {
              type: "POST",
              async: !1,
              data: {
                  card_number: this.card_number
              },
              xhrFields: {
                  withCredentials: !0
              }
          });
          $.extend(c, a);
          this.fetchJSON(c)
      },
      parse: function(a) {
          return a.redeemable_card
      },
      toJSON: function() {
          return JSON.stringify(this.attributes)
      },
      getNumber: function() {
          return this.get("number")
      },
      getPreOrder: function() {
          return this.get("pre_order")
      },
      getContents: function() {
          return this.getSafe("contents.content")
      },
      getFirstContent: function() {
          var a = this.getContents();
          return a && 0 !== a.length ? a[0] : null
      },
      isAOC: function() {
          var a = this.getFirstContent();
          return !(!a || !a.aoc)
      },
      isTicket: function() {
          var a = this.getFirstContent();
          return !(!a || !a.ticket)
      },
      isTitle: function() {
          var a = this.getFirstContent();
          return !(!a || !a.title)
      },
      getReferenceTitleId: function() {
          return this.get("reference_title_id")
      },
      getCash: function() {
          return this.get("cash")
      },
      isCash: function() {
          return !!this.getCash()
      },
      isTitleCTR: function() {
          return this.isTitle() ? !!this.getFirstContent().title.id.toString().match(/^5/) : !1
      },
      isTitleWUP: function() {
          return this.isTitle() ? !!this.getFirstContent().title.id.toString().match(/^2/) : !1
      }
  });
  Wood.Model.RedeemableCard.isValidNumber = function(a) {
      return a && "string" === typeof a && /^[a-zA-Z0-9]{16}$/.test(a) ? !0 : !1
  }
  ;
  Wood.Model.RedeemableCard.hasUnusedChar = function(a) {
      return a && "string" === typeof a && /[IOZ\-]/i.test(a) ? !0 : !1
  }
}
)();
(function() {
  Wood.Model.IdPair = Wood.Model.Base.extend({
      url: function() {
          return Wood.UrlPrefix.NINJA + "ws/titles/id_pair"
      },
      fetch: function(a) {
          var c = this.getBaseAjaxParam();
          $.extend(c, {
              type: "GET",
              async: !1,
              data: {
                  "ns_uid[]": this.ns_uid
              },
              xhrFields: {
                  withCredentials: !0
              }
          });
          $.extend(c, a);
          this.fetchJSON(c)
      },
      parse: function(a) {
          return a.title_id_pairs.title_id_pair[0]
      },
      getNsUid: function() {
          return this.get("ns_uid")
      },
      getTitleId: function() {
          return this.get("title_id")
      },
      getType: function() {
          return this.get("type")
      }
  })
}
)();
(function() {
  Wood.Controller.Top03_01 = Wood.Controller.Base.extend({
      preparePage: function(a, c) {
          this.setupMenu(Wood.View.MenuBar.Type.DEFAULT);
          var b = this.parseParam();
          this.menuBar.hookBackEvent(function() {
              b.backurl ? wood.client.redirectTo(b.backurl) : c.isAppJump() ? wood.client.redirectTo("data01_03.html", {
                  cancel: "historyback"
              }) : wood.client.historyBack()
          });
          Wood.Analytics.addFromAttr("dl_no").sendVirtualPV("VP_RedeemInput")
      },
      run: function(a, c) {
          var b = this;
          b.clearRedeemForm();
          a = null;
          var e = $('input[name="redeem_num"]');
          a = this.parseParam();
          if (c.isAppJump() || c.isFromPurchaseComplete())
              e.val(a.card_number),
              $("#sel_redeem_next").show();
          var d = function(a) {
              a && a.preventDefault();
              wood.client.disableUserOperation(!0);
              if ("" === e.val() || e.val() === $("#str_input").text())
                  return wood.client.enableUserOperation(!0),
                  !1;
              a = e.val();
              Wood.Model.RedeemableCard.hasUnusedChar(a) ? (wood.client.enableUserOperation(!0),
              wood.client.alert($("#dialog_msg_unused_char").text(), $("#dialog_ok").text())) : Wood.Model.RedeemableCard.isValidNumber(a) ? b.verifyRedeemableNumber(a, !1) : (wood.client.enableUserOperation(!0),
              wood.client.alert($("#dialog_msg_invalid").text(), $("#dialog_ok").text()))
          };
          e.on("change", function() {
              if (c.isAppJump())
                  return !1;
              d.call()
          });
          $("#evt_redeem").on("click", d);
          var f = wood.client.getSessionStorage();
          "checkNum" === a.seq && Wood.Util.isDefined(f.getItem("redeem_num")) ? (a = f.getItem("redeem_num"),
          this.verifyRedeemableNumber(a, !0)) : this.showPage()
      },
      verifyRedeemableNumber: function(a, c) {
          var b = new Wood.Model.RedeemableCard({
              card_number: a
          });
          b.fetch();
          if (b.isTitle() && !b.isTitleWUP())
              if (wood.client.enableUserOperation(!0),
              wood.client.alert($("#dialog_msg_invalid").text(), $("#dialog_ok").text()),
              c)
                  wood.client.historyBack();
              else
                  return;
          var e = wood.client.getSessionStorage()
            , d = e.getItem("prepaid_card_available");
          if (b.isCash() && "true" !== d)
              wood.client.enableUserOperation(!0),
              wood.client.alert($("#dialog_msg_block_prepaid").text(), $("#dialog_ok").text());
          else {
              b.isCash() && (wood.client.alert($("#dialog_msg").text(), $("#dialog_ok").text()),
              e.setItem("card_num", b.getNumber()),
              wood.client.redirectTo("money02_01.html?seq=checkNum"));
              wood.client.clearRedeemableCard();
              if (b.isTitle())
                  d = b.getFirstContent().title.id,
                  a = new Wood.Model.IdPair({
                      ns_uid: d
                  }),
                  a.fetch(),
                  a = a.getTitleId(),
                  d = "buy01_01.html?type=title&seq=redeem&title=" + d,
                  b.getPreOrder() && (d += "&pre_order=true");
              else if (b.isAOC())
                  a = new Wood.Model.IdPair({
                      ns_uid: b.getReferenceTitleId()
                  }),
                  a.fetch(),
                  a = a.getTitleId(),
                  d = Wood.URL.create("data03_01_redeem.html", {
                      redeem_title_id: a
                  });
              else if (b.isTicket())
                  a = new Wood.Model.IdPair({
                      ns_uid: b.getReferenceTitleId()
                  }),
                  a.fetch(),
                  a = a.getTitleId(),
                  d = Wood.URL.create("data04_01_redeem.html", {
                      redeem_title_id: a
                  });
              else {
                  Wood.log("strange redeemable_card_num: " + a);
                  return
              }
              e.setItem("redeem_title_id", a);
              e.setItem("redeem_num", b.getNumber());
              wood.client.setRedeemableCard(b);
              c ? wood.client.redirectReplaceTo(d) : wood.client.redirectTo(d)
          }
      },
      clearRedeemForm: function() {
          $('input[name="redeem_num"]').attr("placeholder", $("#str_redeem_num").text()).val("").blur()
      },
      onPageShowCache: function() {
          this.clearRedeemForm();
          wood.client.clearRedeemableCard()
      }
  })
}
)();
