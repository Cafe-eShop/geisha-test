(function(u) {
  u.fn.crypt = function(k) {
      function x(f) {
          var a = ""
            , m = 0;
          do {
              var l = f.source.charCodeAt(m++);
              var h = f.source.charCodeAt(m++);
              var e = f.source.charCodeAt(m++);
              var b = l >> 2;
              l = (l & 3) << 4 | h >> 4;
              var c = (h & 15) << 2 | e >> 6;
              var d = e & 63;
              isNaN(h) ? c = d = 64 : isNaN(e) && (d = 64);
              a += f.b64Str.charAt(b) + f.b64Str.charAt(l) + f.b64Str.charAt(c) + f.b64Str.charAt(d)
          } while (m < f.source.length);
          return a
      }
      function r(f) {
          var a = ""
            , m = 0;
          var l = new RegExp("[^A-Za-z0-9" + f.b64Str.substr(-3) + "]","g");
          f.source = f.source.replace(l, "");
          do {
              var h = f.b64Str.indexOf(f.source.charAt(m++));
              var e = f.b64Str.indexOf(f.source.charAt(m++));
              l = f.b64Str.indexOf(f.source.charAt(m++));
              var b = f.b64Str.indexOf(f.source.charAt(m++));
              h = h << 2 | e >> 4;
              e = (e & 15) << 4 | l >> 2;
              var c = (l & 3) << 6 | b;
              a += String.fromCharCode(h);
              64 != l && (a += String.fromCharCode(e));
              64 != b && (a += String.fromCharCode(c))
          } while (m < f.source.length);
          return a
      }
      function a(a) {
          function p(e, b, c, d, g, h) {
              e = f(f(b, e), f(d, h));
              return f(e << g | e >>> 32 - g, c)
          }
          function m(e, b, c, d, f, h, a) {
              return p(b & c | ~b & d, e, b, f, h, a)
          }
          function l(e, b, c, d, f, h, a) {
              return p(b & d | c & ~d, e, b, f, h, a)
          }
          function h(e, b, c, d, f, h, a) {
              return p(c ^ (b | ~d), e, b, f, h, a)
          }
          return function(f) {
              for (var b = a.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < 4 * f.length; d++)
                  c += b.charAt(f[d >> 2] >> d % 4 * 8 + 4 & 15) + b.charAt(f[d >> 2] >> d % 4 * 8 & 15);
              return c
          }(function(e, b) {
              e[b >> 5] |= 128 << b % 32;
              e[(b + 64 >>> 9 << 4) + 14] = b;
              b = 1732584193;
              for (var c = -271733879, d = -1732584194, g = 271733878, a = 0; a < e.length; a += 16) {
                  var k = b
                    , A = c
                    , v = d
                    , q = g;
                  b = m(b, c, d, g, e[a + 0], 7, -680876936);
                  g = m(g, b, c, d, e[a + 1], 12, -389564586);
                  d = m(d, g, b, c, e[a + 2], 17, 606105819);
                  c = m(c, d, g, b, e[a + 3], 22, -1044525330);
                  b = m(b, c, d, g, e[a + 4], 7, -176418897);
                  g = m(g, b, c, d, e[a + 5], 12, 1200080426);
                  d = m(d, g, b, c, e[a + 6], 17, -1473231341);
                  c = m(c, d, g, b, e[a + 7], 22, -45705983);
                  b = m(b, c, d, g, e[a + 8], 7, 1770035416);
                  g = m(g, b, c, d, e[a + 9], 12, -1958414417);
                  d = m(d, g, b, c, e[a + 10], 17, -42063);
                  c = m(c, d, g, b, e[a + 11], 22, -1990404162);
                  b = m(b, c, d, g, e[a + 12], 7, 1804603682);
                  g = m(g, b, c, d, e[a + 13], 12, -40341101);
                  d = m(d, g, b, c, e[a + 14], 17, -1502002290);
                  c = m(c, d, g, b, e[a + 15], 22, 1236535329);
                  b = l(b, c, d, g, e[a + 1], 5, -165796510);
                  g = l(g, b, c, d, e[a + 6], 9, -1069501632);
                  d = l(d, g, b, c, e[a + 11], 14, 643717713);
                  c = l(c, d, g, b, e[a + 0], 20, -373897302);
                  b = l(b, c, d, g, e[a + 5], 5, -701558691);
                  g = l(g, b, c, d, e[a + 10], 9, 38016083);
                  d = l(d, g, b, c, e[a + 15], 14, -660478335);
                  c = l(c, d, g, b, e[a + 4], 20, -405537848);
                  b = l(b, c, d, g, e[a + 9], 5, 568446438);
                  g = l(g, b, c, d, e[a + 14], 9, -1019803690);
                  d = l(d, g, b, c, e[a + 3], 14, -187363961);
                  c = l(c, d, g, b, e[a + 8], 20, 1163531501);
                  b = l(b, c, d, g, e[a + 13], 5, -1444681467);
                  g = l(g, b, c, d, e[a + 2], 9, -51403784);
                  d = l(d, g, b, c, e[a + 7], 14, 1735328473);
                  c = l(c, d, g, b, e[a + 12], 20, -1926607734);
                  b = p(c ^ d ^ g, b, c, e[a + 5], 4, -378558);
                  g = p(b ^ c ^ d, g, b, e[a + 8], 11, -2022574463);
                  d = p(g ^ b ^ c, d, g, e[a + 11], 16, 1839030562);
                  c = p(d ^ g ^ b, c, d, e[a + 14], 23, -35309556);
                  b = p(c ^ d ^ g, b, c, e[a + 1], 4, -1530992060);
                  g = p(b ^ c ^ d, g, b, e[a + 4], 11, 1272893353);
                  d = p(g ^ b ^ c, d, g, e[a + 7], 16, -155497632);
                  c = p(d ^ g ^ b, c, d, e[a + 10], 23, -1094730640);
                  b = p(c ^ d ^ g, b, c, e[a + 13], 4, 681279174);
                  g = p(b ^ c ^ d, g, b, e[a + 0], 11, -358537222);
                  d = p(g ^ b ^ c, d, g, e[a + 3], 16, -722521979);
                  c = p(d ^ g ^ b, c, d, e[a + 6], 23, 76029189);
                  b = p(c ^ d ^ g, b, c, e[a + 9], 4, -640364487);
                  g = p(b ^ c ^ d, g, b, e[a + 12], 11, -421815835);
                  d = p(g ^ b ^ c, d, g, e[a + 15], 16, 530742520);
                  c = p(d ^ g ^ b, c, d, e[a + 2], 23, -995338651);
                  b = h(b, c, d, g, e[a + 0], 6, -198630844);
                  g = h(g, b, c, d, e[a + 7], 10, 1126891415);
                  d = h(d, g, b, c, e[a + 14], 15, -1416354905);
                  c = h(c, d, g, b, e[a + 5], 21, -57434055);
                  b = h(b, c, d, g, e[a + 12], 6, 1700485571);
                  g = h(g, b, c, d, e[a + 3], 10, -1894986606);
                  d = h(d, g, b, c, e[a + 10], 15, -1051523);
                  c = h(c, d, g, b, e[a + 1], 21, -2054922799);
                  b = h(b, c, d, g, e[a + 8], 6, 1873313359);
                  g = h(g, b, c, d, e[a + 15], 10, -30611744);
                  d = h(d, g, b, c, e[a + 6], 15, -1560198380);
                  c = h(c, d, g, b, e[a + 13], 21, 1309151649);
                  b = h(b, c, d, g, e[a + 4], 6, -145523070);
                  g = h(g, b, c, d, e[a + 11], 10, -1120210379);
                  d = h(d, g, b, c, e[a + 2], 15, 718787259);
                  c = h(c, d, g, b, e[a + 9], 21, -343485551);
                  b = f(b, k);
                  c = f(c, A);
                  d = f(d, v);
                  g = f(g, q)
              }
              return [b, c, d, g]
          }(function(f) {
              for (var b = [], c = (1 << a.chrsz) - 1, d = 0; d < f.length * a.chrsz; d += a.chrsz)
                  b[d >> 5] |= (f.charCodeAt(d / a.chrsz) & c) << d % 32;
              return b
          }(a.source), a.source.length * a.chrsz))
      }
      function f(a, f) {
          var m = (a & 65535) + (f & 65535);
          return (a >> 16) + (f >> 16) + (m >> 16) << 16 | m & 65535
      }
      function v(a) {
          return function(f) {
              for (var m = a.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", l = "", h = 0; h < 4 * f.length; h++)
                  l += m.charAt(f[h >> 2] >> 8 * (3 - h % 4) + 4 & 15) + m.charAt(f[h >> 2] >> 8 * (3 - h % 4) & 15);
              return l
          }(function(a, m) {
              a[m >> 5] |= 128 << 24 - m % 32;
              a[(m + 64 >> 9 << 4) + 15] = m;
              m = Array(80);
              for (var l = 1732584193, h = -271733879, e = -1732584194, b = 271733878, c = -1009589776, d = 0; d < a.length; d += 16) {
                  for (var g = l, p = h, k = e, v = b, r = c, q = 0; 80 > q; q++) {
                      if (16 > q)
                          m[q] = a[d + q];
                      else {
                          var n = m[q - 3] ^ m[q - 8] ^ m[q - 14] ^ m[q - 16];
                          m[q] = n << 1 | n >>> 31
                      }
                      n = l << 5 | l >>> 27;
                      var t = 20 > q ? h & e | ~h & b : 40 > q ? h ^ e ^ b : 60 > q ? h & e | h & b | e & b : h ^ e ^ b;
                      n = f(f(n, t), f(f(c, m[q]), 20 > q ? 1518500249 : 40 > q ? 1859775393 : 60 > q ? -1894007588 : -899497514));
                      c = b;
                      b = e;
                      e = h << 30 | h >>> 2;
                      h = l;
                      l = n
                  }
                  l = f(l, g);
                  h = f(h, p);
                  e = f(e, k);
                  b = f(b, v);
                  c = f(c, r)
              }
              return [l, h, e, b, c]
          }(function(f) {
              for (var l = [], p = (1 << a.chrsz) - 1, h = 0; h < f.length * a.chrsz; h += a.chrsz)
                  l[h >> 5] |= (f.charCodeAt(h / a.chrsz) & p) << 32 - a.chrsz - h % 32;
              return l
          }(a.source), a.source.length * a.chrsz))
      }
      function n(a) {
          var f = Array(2), l = Array(4), k = "", h;
          a.source = escape(a.source);
          for (h = 0; 4 > h; h++)
              l[h] = w(a.strKey.slice(4 * h, 4 * (h + 1)));
          for (h = 0; h < a.source.length; h += 8) {
              f[0] = w(a.source.slice(h, h + 4));
              f[1] = w(a.source.slice(h + 4, h + 8));
              for (var e = f, b = e[0], c = e[1], d = 0; 84941944608 != d; )
                  b += (c << 4 ^ c >>> 5) + c ^ d + l[d & 3],
                  d += 2654435769,
                  c += (b << 4 ^ b >>> 5) + b ^ d + l[d >>> 11 & 3];
              e[0] = b;
              e[1] = c;
              k += y(f[0]) + y(f[1])
          }
          return B(k)
      }
      function z(a) {
          var f = Array(2), l = Array(4), k = "", h;
          for (h = 0; 4 > h; h++)
              l[h] = w(a.strKey.slice(4 * h, 4 * (h + 1)));
          ciphertext = C(a.source);
          for (h = 0; h < ciphertext.length; h += 8) {
              f[0] = w(ciphertext.slice(h, h + 4));
              f[1] = w(ciphertext.slice(h + 4, h + 8));
              a = f;
              for (var e = a[0], b = a[1], c = 84941944608; 0 != c; )
                  b -= (e << 4 ^ e >>> 5) + e ^ c + l[c >>> 11 & 3],
                  c -= 2654435769,
                  e -= (b << 4 ^ b >>> 5) + b ^ c + l[c & 3];
              a[0] = e;
              a[1] = b;
              k += y(f[0]) + y(f[1])
          }
          k = k.replace(/\0+$/, "");
          return unescape(k)
      }
      function w(a) {
          for (var f = 0, l = 0; 4 > l; l++)
              f |= a.charCodeAt(l) << 8 * l;
          return isNaN(f) ? 0 : f
      }
      function y(a) {
          return String.fromCharCode(a & 255, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255)
      }
      function B(a) {
          return a.replace(/[\0\t\n\v\f\r\xa0'"!]/g, function(a) {
              return "!" + a.charCodeAt(0) + "!"
          })
      }
      function C(a) {
          return a.replace(/!\d\d?\d?!/g, function(a) {
              return String.fromCharCode(a.slice(1, -1))
          })
      }
      var t = {
          b64Str: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          strKey: "123",
          method: "md5",
          source: "",
          chrsz: 8,
          hexcase: 0
      };
      "undefined" == typeof k.urlsafe ? (t.b64Str += "+/=",
      k.urlsafe = !1) : t.b64Str = k.urlsafe ? t.b64Str + "-_=" : t.b64Str + "+/=";
      k = u.extend(t, k);
      if (!k.source)
          if (t = u(this),
          t.html())
              k.source = t.html();
          else if (t.val())
              k.source = t.val();
          else
              return alert("Please provide source text"),
              !1;
      if ("md5" == k.method)
          return a(k);
      if ("sha1" == k.method)
          return v(k);
      if ("b64enc" == k.method)
          return x(k);
      if ("b64dec" == k.method)
          return r(k);
      if ("xteaenc" == k.method)
          return n(k);
      if ("xteadec" == k.method)
          return z(k);
      if ("xteab64enc" == k.method)
          return t = n(k),
          k.method = "b64enc",
          k.source = t,
          x(k);
      if ("xteab64dec" == k.method)
          return t = r(k),
          k.method = "xteadec",
          k.source = t,
          z(k)
  }
}
)(jQuery);
(function(u) {
  var k = u.Wood || {};
  u.Wood = k;
  k.AnalyticsUtil = function() {
      var k = "undefined" !== typeof wiiuSystemSetting ? !0 : !1
        , r = u.localStorage
        , a = u.sessionStorage;
      return {
          isWiiU: k,
          isReferrerTop: function() {
              var a = !1
                , k = $.url()
                , n = k.fparam("beacon") || k.param("beacon");
              n = n ? /directory/.test(n) : !1;
              "appJump" !== k.param("seq") && n && (a = !0);
              return a
          },
          getHashedPID: function() {
              if (!k)
                  return r.getItem("pid") || "00000000000000000000000000000000";
              var a = parseInt(wiiuNNA.principalId, 10);
              a = isNaN(a) ? "0" : a.toString(16);
              a = ["00000000", a].join("");
              a = a.substr(a.length - 8);
              a = [wiiuNNA.principalIdHashKey, a].join("");
              return jQuery().crypt({
                  method: "md5",
                  source: a
              })
          },
          getRegionType: function() {
              var a = this.getRegion();
              return "JPN" === a ? "jp" : "USA" === a ? "us" : "EUR" === a ? "eu" : "unknown"
          },
          getDefaultCurrency: function() {
              var a = this.getRegion();
              return "JPN" === a ? "JPY" : "USA" === a ? "USD" : "EUR" === a ? "EUR" : "JPY"
          },
          getGender: function() {
              return k ? wiiuNNA.gender : r.getItem("gender") || "unknown"
          },
          getAge: function() {
              if (!k)
                  return parseInt(r.getItem("age"), 10) || 30;
              var a = new Date;
              a = 1E4 * a.getFullYear() + 100 * (a.getMonth() + 1) + a.getDate();
              var v = new Date(wiiuNNA.birthday);
              v = 1E4 * v.getFullYear() + 100 * (v.getMonth() + 1) + v.getDate();
              return Math.floor((a - v) / 1E4)
          },
          getRegion: function() {
              if (k) {
                  var a = wiiuSystemSetting.getRegion();
                  return a.error ? "unknown" : a.code
              }
              a = this.getCountry();
              return "JP" === a ? "JPN" : "US" === a || "CA" === a || "MX" === a || "BR" === a ? "USA" : "EUR"
          },
          getCountry: function() {
              if (k) {
                  var f = wiiuSystemSetting.getCountry();
                  return f.error ? "unknown" : f.code
              }
              return a.getItem("country") || "unknown"
          },
          getLanguage: function() {
              if (k) {
                  var a = wiiuSystemSetting.getLanguage();
                  return a.error ? "unknown" : a.code
              }
              return r.getItem("lang") || "unknown"
          }
      }
  }()
}
)(window);
(function(u) {
  function k() {
      this.dataLayer = u.dataLayer || [];
      u.dataLayer = this.dataLayer;
      this.sessionStorage = r.isWiiU ? wiiuSessionStorage : u.sessionStorage;
      this._isSent = null;
      this.setAccountInfo()
  }
  var x = u.Wood
    , r = x.AnalyticsUtil;
  k.prototype = {
      _send: function() {
          this._isSent || (setTimeout(function() {
              var a = window;
              a.dataLayer = a.dataLayer || [];
              a.dataLayer.push({
                  "gtm.start": (new Date).getTime(),
                  event: "gtm.js"
              });
              a = document.getElementsByTagName("script")[0];
              var f = document.createElement("script");
              f.async = !0;
              f.src = "//www.googletagmanager.com/gtm.js?id=GTM-TNPGB6";
              a.parentNode.insertBefore(f, a)
          }, 1),
          this._isSent = !0)
      },
      _addAttr: function(a) {
          this.dataLayer.push(a)
      },
      _addEvent: function(a, f) {
          this._addAttr($.extend({
              event: a
          }, f))
      },
      _addEventOrAttr: function(a, f) {
          this._isSent ? this._addEvent(a, f) : this._addAttr(f)
      },
      setAccountInfo: function() {
          this._addAppJumpEvent();
          this._addEventOrAttr("login", {
              regionCd: r.getRegionType(),
              uId: r.getHashedPID(),
              upc01: r.getAge(),
              upc02: r.getGender(),
              uCountry: r.getCountry(),
              uLanguage: r.getLanguage()
          });
          this._send()
      },
      sendVirtualPV: function(a, f) {
          this._addEvent("virtualPV", $.extend({
              virtualPage: a
          }, f))
      },
      addTitleViewAttr: function(a) {
          this._addAttr({
              ecommerce: {
                  detail: {
                      products: [{
                          id: a
                      }]
                  }
              }
          });
          return this
      },
      addFromAttr: function(a) {
          this._addAttr({
              from: a
          });
          return this
      },
      addDirectoryAttr: function(a) {
          a && this.addFromAttr("id_" + a.id);
          return this
      },
      addShelfAttr: function(a, f) {
          if (a) {
              var k = a.alias
                , n = a.name;
              this._addAttr({
                  shelf: k ? "ALIAS:" + k : "NAME:" + n,
                  directory_index: a.index
              })
          }
          this.addFromAttr({
              OwnedCoupon: "owned_coupon",
              Search: "search"
          }[f] || (a ? "id_" + a.id : "feature"));
          return this
      },
      saveAppJumpAttr: function(a) {
          a = a || {};
          var f = a.scene
            , k = a.src_title_id;
          a = a.launcher_type;
          var n = null;
          f && (k && !a && (a = "(Not specified)"),
          "top" !== f && (n = "app_jump"));
          this.sessionStorage.setItem("analytics_appjump", JSON.stringify({
              from: n,
              srcTitleId: k,
              launcherType: a
          }))
      },
      _addAppJumpEvent: function() {
          var a = this.sessionStorage.getItem("analytics_appjump");
          if (!a)
              return this;
          this.sessionStorage.removeItem("analytics_appjump");
          a = JSON.parse(a);
          "caffeine_killer" === a.launcherType && this._addEvent("kntf", {
              launcher_type: "caffeine_killer",
              src_title_id: a.srcTitleId
          });
          return this
      },
      sendMoviePlay: function(a) {
          this._addEvent("play_movie", {
              playMovieID: a
          })
      },
      sendPurchaseAttr: function(a) {
          a = this._createEcommerceAttr("Purchase", a);
          this._addAttr(a);
          this.sendVirtualPV("VP_PurchaseCompletion")
      },
      sendPurchaseConfirmAttr: function(a) {
          var f = [{
              id: a
          }]
            , k = this;
          a = function(a) {
              var n = {
                  ecommerce: {}
              };
              n.ecommerce[a] = {
                  products: f
              };
              k._addAttr(n)
          }
          ;
          a("add");
          this.sendVirtualPV("VP_Purchase_AddCart");
          a("checkout");
          this.sendVirtualPV("VP_PurchaseConfirmation")
      },
      _createEcommerceAttr: function(a, f) {
          var k = f.couponCode ? "CODE_" + f.couponCode : f.couponInstanceCode ? "OWNED_COUPON_" + f.couponInstanceCode : "DID_NOT_USE_COUPON";
          var n = "eu" === r.getRegionType();
          return {
              currency: f.currency || null,
              ecommerce: {
                  purchase: {
                      actionField: {
                          id: "" + f.trans_id,
                          affiliation: a,
                          revenue: f.price
                      },
                      products: [{
                          id: f.id,
                          coupon: k,
                          dimension2: n && f.businessType || null,
                          price: f.price,
                          quantity: "1"
                      }]
                  }
              }
          }
      },
      sendError: function(a) {
          this._addEvent("event_error", {
              errorCode: a
          })
      }
  };
  x.Analytics = new k
}
)(window);
