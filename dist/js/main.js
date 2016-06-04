! function (a) {
  "use strict";

  function b(a) {
    return function () {
      var b, c = arguments[0];
      for (b = "[" + (a ? a + ":" : "") + c + "] http://errors.angularjs.org/1.5.6/" + (a ? a + "/" : "") + c, c = 1; c < arguments.length; c++) {
        b = b + (1 == c ? "?" : "&") + "p" + (c - 1) + "=";
        var d, e = encodeURIComponent;
        d = arguments[c], d = "function" == typeof d ? d.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof d ? "undefined" : "string" != typeof d ? JSON.stringify(d) : d, b += e(d)
      }
      return Error(b)
    }
  }

  function c(a) {
    if (null == a || z(a)) return !1;
    if (ed(a) || u(a) || Rc && a instanceof Rc) return !0;
    var b = "length" in Object(a) && a.length;
    return v(b) && (b >= 0 && (b - 1 in a || a instanceof Array) || "function" == typeof a.item)
  }

  function d(a, b, e) {
    var f, g;
    if (a)
      if (x(a))
        for (f in a) "prototype" == f || "length" == f || "name" == f || a.hasOwnProperty && !a.hasOwnProperty(f) || b.call(e, a[f], f, a);
      else if (ed(a) || c(a)) {
      var h = "object" != typeof a;
      for (f = 0, g = a.length; g > f; f++)(h || f in a) && b.call(e, a[f], f, a)
    } else if (a.forEach && a.forEach !== d) a.forEach(b, e, a);
    else if (t(a))
      for (f in a) b.call(e, a[f], f, a);
    else if ("function" == typeof a.hasOwnProperty)
      for (f in a) a.hasOwnProperty(f) && b.call(e, a[f], f, a);
    else
      for (f in a) Vc.call(a, f) && b.call(e, a[f], f, a);
    return a
  }

  function e(a, b, c) {
    for (var d = Object.keys(a).sort(), e = 0; e < d.length; e++) b.call(c, a[d[e]], d[e]);
    return d
  }

  function f(a) {
    return function (b, c) {
      a(c, b)
    }
  }

  function g() {
    return ++dd
  }

  function h(a, b, c) {
    for (var d = a.$$hashKey, e = 0, f = b.length; f > e; ++e) {
      var g = b[e];
      if (s(g) || x(g))
        for (var i = Object.keys(g), j = 0, k = i.length; k > j; j++) {
          var l = i[j],
            m = g[l];
          c && s(m) ? w(m) ? a[l] = new Date(m.valueOf()) : y(m) ? a[l] = new RegExp(m) : m.nodeName ? a[l] = m.cloneNode(!0) : D(m) ? a[l] = m.clone() : (s(a[l]) || (a[l] = ed(m) ? [] : {}), h(a[l], [m], !0)) : a[l] = m
        }
    }
    return d ? a.$$hashKey = d : delete a.$$hashKey, a
  }

  function i(a) {
    return h(a, Yc.call(arguments, 1), !1)
  }

  function j(a) {
    return h(a, Yc.call(arguments, 1), !0)
  }

  function k(a) {
    return parseInt(a, 10)
  }

  function l(a, b) {
    return i(Object.create(a), b)
  }

  function m() {}

  function n(a) {
    return a
  }

  function o(a) {
    return function () {
      return a
    }
  }

  function p(a) {
    return x(a.toString) && a.toString !== _c
  }

  function q(a) {
    return "undefined" == typeof a
  }

  function r(a) {
    return "undefined" != typeof a
  }

  function s(a) {
    return null !== a && "object" == typeof a
  }

  function t(a) {
    return null !== a && "object" == typeof a && !ad(a)
  }

  function u(a) {
    return "string" == typeof a
  }

  function v(a) {
    return "number" == typeof a
  }

  function w(a) {
    return "[object Date]" === _c.call(a)
  }

  function x(a) {
    return "function" == typeof a
  }

  function y(a) {
    return "[object RegExp]" === _c.call(a)
  }

  function z(a) {
    return a && a.window === a
  }

  function A(a) {
    return a && a.$evalAsync && a.$watch
  }

  function B(a) {
    return "boolean" == typeof a
  }

  function C(a) {
    return a && v(a.length) && fd.test(_c.call(a))
  }

  function D(a) {
    return !(!a || !(a.nodeName || a.prop && a.attr && a.find))
  }

  function E(a) {
    var b = {};
    a = a.split(",");
    var c;
    for (c = 0; c < a.length; c++) b[a[c]] = !0;
    return b
  }

  function F(a) {
    return Wc(a.nodeName || a[0] && a[0].nodeName)
  }

  function G(a, b) {
    var c = a.indexOf(b);
    return c >= 0 && a.splice(c, 1), c
  }

  function H(a, b) {
    function c(a, b) {
      var c, d = b.$$hashKey;
      if (ed(a)) {
        c = 0;
        for (var f = a.length; f > c; c++) b.push(e(a[c]))
      } else if (t(a))
        for (c in a) b[c] = e(a[c]);
      else if (a && "function" == typeof a.hasOwnProperty)
        for (c in a) a.hasOwnProperty(c) && (b[c] = e(a[c]));
      else
        for (c in a) Vc.call(a, c) && (b[c] = e(a[c]));
      return d ? b.$$hashKey = d : delete b.$$hashKey, b
    }

    function e(a) {
      if (!s(a)) return a;
      var b = g.indexOf(a);
      if (-1 !== b) return h[b];
      if (z(a) || A(a)) throw bd("cpws");
      var b = !1,
        d = f(a);
      return void 0 === d && (d = ed(a) ? [] : Object.create(ad(a)), b = !0), g.push(a), h.push(d), b ? c(a, d) : d
    }

    function f(a) {
      switch (_c.call(a)) {
      case "[object Int8Array]":
      case "[object Int16Array]":
      case "[object Int32Array]":
      case "[object Float32Array]":
      case "[object Float64Array]":
      case "[object Uint8Array]":
      case "[object Uint8ClampedArray]":
      case "[object Uint16Array]":
      case "[object Uint32Array]":
        return new a.constructor(e(a.buffer));
      case "[object ArrayBuffer]":
        if (!a.slice) {
          var b = new ArrayBuffer(a.byteLength);
          return new Uint8Array(b).set(new Uint8Array(a)), b
        }
        return a.slice(0);
      case "[object Boolean]":
      case "[object Number]":
      case "[object String]":
      case "[object Date]":
        return new a.constructor(a.valueOf());
      case "[object RegExp]":
        return b = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), b.lastIndex = a.lastIndex, b;
      case "[object Blob]":
        return new a.constructor([a], {
          type: a.type
        })
      }
      return x(a.cloneNode) ? a.cloneNode(!0) : void 0
    }
    var g = [],
      h = [];
    if (b) {
      if (C(b) || "[object ArrayBuffer]" === _c.call(b)) throw bd("cpta");
      if (a === b) throw bd("cpi");
      return ed(b) ? b.length = 0 : d(b, function (a, c) {
        "$$hashKey" !== c && delete b[c]
      }), g.push(a), h.push(b), c(a, b)
    }
    return e(a)
  }

  function I(a, b) {
    if (ed(a)) {
      b = b || [];
      for (var c = 0, d = a.length; d > c; c++) b[c] = a[c]
    } else if (s(a))
      for (c in b = b || {}, a) "$" === c.charAt(0) && "$" === c.charAt(1) || (b[c] = a[c]);
    return b || a
  }

  function J(a, b) {
    if (a === b) return !0;
    if (null === a || null === b) return !1;
    if (a !== a && b !== b) return !0;
    var c, d = typeof a;
    if (d == typeof b && "object" == d) {
      if (!ed(a)) {
        if (w(a)) return w(b) ? J(a.getTime(), b.getTime()) : !1;
        if (y(a)) return y(b) ? a.toString() == b.toString() : !1;
        if (A(a) || A(b) || z(a) || z(b) || ed(b) || w(b) || y(b)) return !1;
        d = ha();
        for (c in a)
          if ("$" !== c.charAt(0) && !x(a[c])) {
            if (!J(a[c], b[c])) return !1;
            d[c] = !0
          }
        for (c in b)
          if (!(c in d) && "$" !== c.charAt(0) && r(b[c]) && !x(b[c])) return !1;
        return !0
      }
      if (!ed(b)) return !1;
      if ((d = a.length) == b.length) {
        for (c = 0; d > c; c++)
          if (!J(a[c], b[c])) return !1;
        return !0
      }
    }
    return !1
  }

  function K(a, b, c) {
    return a.concat(Yc.call(b, c))
  }

  function L(a, b) {
    var c = 2 < arguments.length ? Yc.call(arguments, 2) : [];
    return !x(b) || b instanceof RegExp ? b : c.length ? function () {
      return arguments.length ? b.apply(a, K(c, arguments, 0)) : b.apply(a, c)
    } : function () {
      return arguments.length ? b.apply(a, arguments) : b.call(a)
    }
  }

  function M(b, c) {
    var d = c;
    return "string" == typeof b && "$" === b.charAt(0) && "$" === b.charAt(1) ? d = void 0 : z(c) ? d = "$WINDOW" : c && a.document === c ? d = "$DOCUMENT" : A(c) && (d = "$SCOPE"), d
  }

  function N(a, b) {
    return q(a) ? void 0 : (v(b) || (b = b ? 2 : null), JSON.stringify(a, M, b))
  }

  function O(a) {
    return u(a) ? JSON.parse(a) : a
  }

  function P(a, b) {
    a = a.replace(kd, "");
    var c = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6e4;
    return isNaN(c) ? b : c
  }

  function Q(a, b, c) {
    c = c ? -1 : 1;
    var d = a.getTimezoneOffset();
    return b = P(b, d), c *= b - d, a = new Date(a.getTime()), a.setMinutes(a.getMinutes() + c), a
  }

  function R(a) {
    a = Rc(a).clone();
    try {
      a.empty()
    } catch (b) {}
    var c = Rc("<div>").append(a).html();
    try {
      return a[0].nodeType === od ? Wc(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) {
        return "<" + Wc(b)
      })
    } catch (d) {
      return Wc(c)
    }
  }

  function S(a) {
    try {
      return decodeURIComponent(a)
    } catch (b) {}
  }

  function T(a) {
    var b = {};
    return d((a || "").split("&"), function (a) {
      var c, d, e;
      a && (d = a = a.replace(/\+/g, "%20"), c = a.indexOf("="), -1 !== c && (d = a.substring(0, c), e = a.substring(c + 1)), d = S(d), r(d) && (e = r(e) ? S(e) : !0, Vc.call(b, d) ? ed(b[d]) ? b[d].push(e) : b[d] = [b[d], e] : b[d] = e))
    }), b
  }

  function U(a) {
    var b = [];
    return d(a, function (a, c) {
      ed(a) ? d(a, function (a) {
        b.push(W(c, !0) + (!0 === a ? "" : "=" + W(a, !0)))
      }) : b.push(W(c, !0) + (!0 === a ? "" : "=" + W(a, !0)))
    }), b.length ? b.join("&") : ""
  }

  function V(a) {
    return W(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
  }

  function W(a, b) {
    return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+")
  }

  function X(a, b) {
    var c, d, e = ld.length;
    for (d = 0; e > d; ++d)
      if (c = ld[d] + b, u(c = a.getAttribute(c))) return c;
    return null
  }

  function Y(a, b) {
    var c, e, f = {};
    d(ld, function (b) {
      b += "app", !c && a.hasAttribute && a.hasAttribute(b) && (c = a, e = a.getAttribute(b))
    }), d(ld, function (b) {
      b += "app";
      var d;
      !c && (d = a.querySelector("[" + b.replace(":", "\\:") + "]")) && (c = d, e = d.getAttribute(b))
    }), c && (f.strictDi = null !== X(c, "strict-di"), b(c, e ? [e] : [], f))
  }

  function Z(b, c, e) {
    s(e) || (e = {}), e = i({
      strictDi: !1
    }, e);
    var f = function () {
        if (b = Rc(b), b.injector()) {
          var d = b[0] === a.document ? "document" : R(b);
          throw bd("btstrpd", d.replace(/</, "&lt;").replace(/>/, "&gt;"))
        }
        return c = c || [], c.unshift(["$provide", function (a) {
          a.value("$rootElement", b)
        }]), e.debugInfoEnabled && c.push(["$compileProvider", function (a) {
          a.debugInfoEnabled(!0)
        }]), c.unshift("ng"), d = Na(c, e.strictDi), d.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function (a, b, c, d) {
          a.$apply(function () {
            b.data("$injector", d), c(b)(a)
          })
        }]), d
      },
      g = /^NG_ENABLE_DEBUG_INFO!/,
      h = /^NG_DEFER_BOOTSTRAP!/;
    return a && g.test(a.name) && (e.debugInfoEnabled = !0, a.name = a.name.replace(g, "")), a && !h.test(a.name) ? f() : (a.name = a.name.replace(h, ""), cd.resumeBootstrap = function (a) {
      return d(a, function (a) {
        c.push(a)
      }), f()
    }, void(x(cd.resumeDeferredBootstrap) && cd.resumeDeferredBootstrap()))
  }

  function $() {
    a.name = "NG_ENABLE_DEBUG_INFO!" + a.name, a.location.reload()
  }

  function _(a) {
    if (a = cd.element(a).injector(), !a) throw bd("test");
    return a.get("$$testability")
  }

  function aa(a, b) {
    return b = b || "_", a.replace(md, function (a, c) {
      return (c ? b : "") + a.toLowerCase()
    })
  }

  function ba() {
    var b;
    if (!nd) {
      var c = jd();
      (Sc = q(c) ? a.jQuery : c ? a[c] : void 0) && Sc.fn.on ? (Rc = Sc, i(Sc.fn, {
        scope: Cd.scope,
        isolateScope: Cd.isolateScope,
        controller: Cd.controller,
        injector: Cd.injector,
        inheritedData: Cd.inheritedData
      }), b = Sc.cleanData, Sc.cleanData = function (a) {
        for (var c, d, e = 0; null != (d = a[e]); e++)(c = Sc._data(d, "events")) && c.$destroy && Sc(d).triggerHandler("$destroy");
        b(a)
      }) : Rc = oa, cd.element = Rc, nd = !0
    }
  }

  function ca(a, b, c) {
    if (!a) throw bd("areq", b || "?", c || "required");
    return a
  }

  function da(a, b, c) {
    return c && ed(a) && (a = a[a.length - 1]), ca(x(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
  }

  function ea(a, b) {
    if ("hasOwnProperty" === a) throw bd("badname", b)
  }

  function fa(a, b, c) {
    if (!b) return a;
    b = b.split(".");
    for (var d, e = a, f = b.length, g = 0; f > g; g++) d = b[g], a && (a = (e = a)[d]);
    return !c && x(a) ? L(e, a) : a
  }

  function ga(a) {
    for (var b, c = a[0], d = a[a.length - 1], e = 1; c !== d && (c = c.nextSibling); e++)(b || a[e] !== c) && (b || (b = Rc(Yc.call(a, 0, e))), b.push(c));
    return b || a
  }

  function ha() {
    return Object.create(null)
  }

  function ia(a) {
    function c(a, b, c) {
      return a[b] || (a[b] = c())
    }
    var d = b("$injector"),
      e = b("ng");
    return a = c(a, "angular", Object), a.$$minErr = a.$$minErr || b, c(a, "module", function () {
      var a = {};
      return function (b, f, g) {
        if ("hasOwnProperty" === b) throw e("badname", "module");
        return f && a.hasOwnProperty(b) && (a[b] = null), c(a, b, function () {
          function a(a, b, c, d) {
            return d || (d = e),
              function () {
                return d[c || "push"]([a, b, arguments]), k
              }
          }

          function c(a, c) {
            return function (d, f) {
              return f && x(f) && (f.$$moduleName = b), e.push([a, c, arguments]), k
            }
          }
          if (!f) throw d("nomod", b);
          var e = [],
            h = [],
            i = [],
            j = a("$injector", "invoke", "push", h),
            k = {
              _invokeQueue: e,
              _configBlocks: h,
              _runBlocks: i,
              requires: f,
              name: b,
              provider: c("$provide", "provider"),
              factory: c("$provide", "factory"),
              service: c("$provide", "service"),
              value: a("$provide", "value"),
              constant: a("$provide", "constant", "unshift"),
              decorator: c("$provide", "decorator"),
              animation: c("$animateProvider", "register"),
              filter: c("$filterProvider", "register"),
              controller: c("$controllerProvider", "register"),
              directive: c("$compileProvider", "directive"),
              component: c("$compileProvider", "component"),
              config: j,
              run: function (a) {
                return i.push(a), this
              }
            };
          return g && j(g), k
        })
      }
    })
  }

  function ja(c) {
    i(c, {
      bootstrap: Z,
      copy: H,
      extend: i,
      merge: j,
      equals: J,
      element: Rc,
      forEach: d,
      injector: Na,
      noop: m,
      bind: L,
      toJson: N,
      fromJson: O,
      identity: n,
      isUndefined: q,
      isDefined: r,
      isString: u,
      isFunction: x,
      isObject: s,
      isNumber: v,
      isElement: D,
      isArray: ed,
      version: pd,
      isDate: w,
      lowercase: Wc,
      uppercase: Xc,
      callbacks: {
        counter: 0
      },
      getTestability: _,
      $$minErr: b,
      $$csp: id,
      reloadWithDebugInfo: $
    }), (Tc = ia(a))("ng", ["ngLocale"], ["$provide", function (a) {
      a.provider({
        $$sanitizeUri: Zb
      }), a.provider("$compile", Wa).directive({
        a: He,
        input: Ye,
        textarea: Ye,
        form: Le,
        script: Of,
        select: Rf,
        style: Tf,
        option: Sf,
        ngBind: _e,
        ngBindHtml: bf,
        ngBindTemplate: af,
        ngClass: df,
        ngClassEven: ff,
        ngClassOdd: ef,
        ngCloak: gf,
        ngController: hf,
        ngForm: Me,
        ngHide: Hf,
        ngIf: lf,
        ngInclude: mf,
        ngInit: of,
        ngNonBindable: Af,
        ngPluralize: Ef,
        ngRepeat: Ff,
        ngShow: Gf,
        ngStyle: If,
        ngSwitch: Jf,
        ngSwitchWhen: Kf,
        ngSwitchDefault: Lf,
        ngOptions: Df,
        ngTransclude: Nf,
        ngModel: xf,
        ngList: pf,
        ngChange: cf,
        pattern: Vf,
        ngPattern: Vf,
        required: Uf,
        ngRequired: Uf,
        minlength: Xf,
        ngMinlength: Xf,
        maxlength: Wf,
        ngMaxlength: Wf,
        ngValue: $e,
        ngModelOptions: zf
      }).directive({
        ngInclude: nf
      }).directive(Ie).directive(jf), a.provider({
        $anchorScroll: Oa,
        $animate: Qd,
        $animateCss: Td,
        $$animateJs: Od,
        $$animateQueue: Pd,
        $$AnimateRunner: Sd,
        $$animateAsyncRun: Rd,
        $browser: Ta,
        $cacheFactory: Ua,
        $controller: ab,
        $document: bb,
        $exceptionHandler: cb,
        $filter: lc,
        $$forceReflow: Zd,
        $interpolate: ob,
        $interval: pb,
        $http: kb,
        $httpParamSerializer: eb,
        $httpParamSerializerJQLike: fb,
        $httpBackend: mb,
        $xhrFactory: lb,
        $location: Bb,
        $log: Cb,
        $parse: Tb,
        $rootScope: Yb,
        $q: Ub,
        $$q: Vb,
        $sce: bc,
        $sceDelegate: ac,
        $sniffer: cc,
        $templateCache: Va,
        $templateRequest: dc,
        $$testability: ec,
        $timeout: fc,
        $window: ic,
        $$rAF: Xb,
        $$jqLite: Ia,
        $$HashMap: Gd,
        $$cookieReader: kc
      })
    }])
  }

  function ka(a) {
    return a.replace(sd, function (a, b, c, d) {
      return d ? c.toUpperCase() : c
    }).replace(td, "Moz$1")
  }

  function la(a) {
    return a = a.nodeType, 1 === a || !a || 9 === a
  }

  function ma(a, b) {
    var c, e, f = b.createDocumentFragment(),
      g = [];
    if (xd.test(a)) {
      for (c = c || f.appendChild(b.createElement("div")), e = (yd.exec(a) || ["", ""])[1].toLowerCase(), e = Ad[e] || Ad._default, c.innerHTML = e[1] + a.replace(zd, "<$1></$2>") + e[2], e = e[0]; e--;) c = c.lastChild;
      g = K(g, c.childNodes), c = f.firstChild, c.textContent = ""
    } else g.push(b.createTextNode(a));
    return f.textContent = "", f.innerHTML = "", d(g, function (a) {
      f.appendChild(a)
    }), f
  }

  function na(a, b) {
    var c = a.parentNode;
    c && c.replaceChild(b, a), b.appendChild(a)
  }

  function oa(b) {
    if (b instanceof oa) return b;
    var c;
    if (u(b) && (b = gd(b), c = !0), !(this instanceof oa)) {
      if (c && "<" != b.charAt(0)) throw vd("nosel");
      return new oa(b)
    }
    if (c) {
      c = a.document;
      var d;
      b = (d = wd.exec(b)) ? [c.createElement(d[1])] : (d = ma(b, c)) ? d.childNodes : []
    }
    ya(this, b)
  }

  function pa(a) {
    return a.cloneNode(!0)
  }

  function qa(a, b) {
    if (b || sa(a), a.querySelectorAll)
      for (var c = a.querySelectorAll("*"), d = 0, e = c.length; e > d; d++) sa(c[d])
  }

  function ra(a, b, c, e) {
    if (r(e)) throw vd("offargs");
    var f = (e = ta(a)) && e.events,
      g = e && e.handle;
    if (g)
      if (b) {
        var h = function (b) {
          var d = f[b];
          r(c) && G(d || [], c), r(c) && d && 0 < d.length || (a.removeEventListener(b, g, !1), delete f[b])
        };
        d(b.split(" "), function (a) {
          h(a), ud[a] && h(ud[a])
        })
      } else
        for (b in f) "$destroy" !== b && a.removeEventListener(b, g, !1), delete f[b]
  }

  function sa(a, b) {
    var c = a.ng339,
      d = c && qd[c];
    d && (b ? delete d.data[b] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), ra(a)), delete qd[c], a.ng339 = void 0))
  }

  function ta(a, b) {
    var c = a.ng339,
      c = c && qd[c];
    return b && !c && (a.ng339 = c = ++rd, c = qd[c] = {
      events: {},
      data: {},
      handle: void 0
    }), c
  }

  function ua(a, b, c) {
    if (la(a)) {
      var d = r(c),
        e = !d && b && !s(b),
        f = !b;
      if (a = (a = ta(a, !e)) && a.data, d) a[b] = c;
      else {
        if (f) return a;
        if (e) return a && a[b];
        i(a, b)
      }
    }
  }

  function va(a, b) {
    return a.getAttribute ? -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") : !1
  }

  function wa(a, b) {
    b && a.setAttribute && d(b.split(" "), function (b) {
      a.setAttribute("class", gd((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + gd(b) + " ", " ")))
    })
  }

  function xa(a, b) {
    if (b && a.setAttribute) {
      var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
      d(b.split(" "), function (a) {
        a = gd(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
      }), a.setAttribute("class", gd(c))
    }
  }

  function ya(a, b) {
    if (b)
      if (b.nodeType) a[a.length++] = b;
      else {
        var c = b.length;
        if ("number" == typeof c && b.window !== b) {
          if (c)
            for (var d = 0; c > d; d++) a[a.length++] = b[d]
        } else a[a.length++] = b
      }
  }

  function za(a, b) {
    return Aa(a, "$" + (b || "ngController") + "Controller")
  }

  function Aa(a, b, c) {
    for (9 == a.nodeType && (a = a.documentElement), b = ed(b) ? b : [b]; a;) {
      for (var d = 0, e = b.length; e > d; d++)
        if (r(c = Rc.data(a, b[d]))) return c;
      a = a.parentNode || 11 === a.nodeType && a.host
    }
  }

  function Ba(a) {
    for (qa(a, !0); a.firstChild;) a.removeChild(a.firstChild)
  }

  function Ca(a, b) {
    b || qa(a);
    var c = a.parentNode;
    c && c.removeChild(a)
  }

  function Da(b, c) {
    c = c || a, "complete" === c.document.readyState ? c.setTimeout(b) : Rc(c).on("load", b)
  }

  function Ea(a, b) {
    var c = Dd[b.toLowerCase()];
    return c && Ed[F(a)] && c
  }

  function Fa(a, b) {
    var c = function (c, d) {
      c.isDefaultPrevented = function () {
        return c.defaultPrevented
      };
      var e = b[d || c.type],
        f = e ? e.length : 0;
      if (f) {
        if (q(c.immediatePropagationStopped)) {
          var g = c.stopImmediatePropagation;
          c.stopImmediatePropagation = function () {
            c.immediatePropagationStopped = !0, c.stopPropagation && c.stopPropagation(), g && g.call(c)
          }
        }
        c.isImmediatePropagationStopped = function () {
          return !0 === c.immediatePropagationStopped
        };
        var h = e.specialHandlerWrapper || Ga;
        f > 1 && (e = I(e));
        for (var i = 0; f > i; i++) c.isImmediatePropagationStopped() || h(a, c, e[i])
      }
    };
    return c.elem = a, c
  }

  function Ga(a, b, c) {
    c.call(a, b)
  }

  function Ha(a, b, c) {
    var d = b.relatedTarget;
    d && (d === a || Bd.call(a, d)) || c.call(a, b)
  }

  function Ia() {
    this.$get = function () {
      return i(oa, {
        hasClass: function (a, b) {
          return a.attr && (a = a[0]), va(a, b)
        },
        addClass: function (a, b) {
          return a.attr && (a = a[0]), xa(a, b)
        },
        removeClass: function (a, b) {
          return a.attr && (a = a[0]), wa(a, b)
        }
      })
    }
  }

  function Ja(a, b) {
    var c = a && a.$$hashKey;
    return c ? ("function" == typeof c && (c = a.$$hashKey()), c) : (c = typeof a, c = "function" == c || "object" == c && null !== a ? a.$$hashKey = c + ":" + (b || g)() : c + ":" + a)
  }

  function Ka(a, b) {
    if (b) {
      var c = 0;
      this.nextUid = function () {
        return ++c
      }
    }
    d(a, this.put, this)
  }

  function La(a) {
    return a = (Function.prototype.toString.call(a) + " ").replace(Ld, ""), a.match(Hd) || a.match(Id)
  }

  function Ma(a) {
    return (a = La(a)) ? "function(" + (a[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
  }

  function Na(a, b) {
    function c(a) {
      return function (b, c) {
        return s(b) ? void d(b, f(a)) : a(b, c)
      }
    }

    function e(a, b) {
      if (ea(a, "service"), (x(b) || ed(b)) && (b = p.instantiate(b)), !b.$get) throw Md("pget", a);
      return n[a + "Provider"] = b
    }

    function g(a, b) {
      return function () {
        var c = v.invoke(b, this);
        if (q(c)) throw Md("undef", a);
        return c
      }
    }

    function h(a, b, c) {
      return e(a, {
        $get: !1 !== c ? g(a, b) : b
      })
    }

    function i(a) {
      ca(q(a) || ed(a), "modulesToLoad", "not an array");
      var b, c = [];
      return d(a, function (a) {
        function d(a) {
          var b, c;
          for (b = 0, c = a.length; c > b; b++) {
            var d = a[b],
              e = p.get(d[0]);
            e[d[1]].apply(e, d[2])
          }
        }
        if (!m.get(a)) {
          m.put(a, !0);
          try {
            u(a) ? (b = Tc(a), c = c.concat(i(b.requires)).concat(b._runBlocks), d(b._invokeQueue), d(b._configBlocks)) : x(a) ? c.push(p.invoke(a)) : ed(a) ? c.push(p.invoke(a)) : da(a, "module")
          } catch (e) {
            throw ed(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), Md("modulerr", a, e.stack || e.message || e)
          }
        }
      }), c
    }

    function j(a, c) {
      function d(b, d) {
        if (a.hasOwnProperty(b)) {
          if (a[b] === k) throw Md("cdep", b + " <- " + l.join(" <- "));
          return a[b]
        }
        try {
          return l.unshift(b), a[b] = k, a[b] = c(b, d)
        } catch (e) {
          throw a[b] === k && delete a[b], e
        } finally {
          l.shift()
        }
      }

      function e(a, c, e) {
        var f = [];
        a = Na.$$annotate(a, b, e);
        for (var g = 0, h = a.length; h > g; g++) {
          var i = a[g];
          if ("string" != typeof i) throw Md("itkn", i);
          f.push(c && c.hasOwnProperty(i) ? c[i] : d(i, e))
        }
        return f
      }
      return {
        invoke: function (a, b, c, d) {
          return "string" == typeof c && (d = c, c = null), c = e(a, c, d), ed(a) && (a = a[a.length - 1]), d = 11 >= Qc ? !1 : "function" == typeof a && /^(?:class\s|constructor\()/.test(Function.prototype.toString.call(a) + " "), d ? (c.unshift(null), new(Function.prototype.bind.apply(a, c))) : a.apply(b, c)
        },
        instantiate: function (a, b, c) {
          var d = ed(a) ? a[a.length - 1] : a;
          return a = e(a, b, c), a.unshift(null), new(Function.prototype.bind.apply(d, a))
        },
        get: d,
        annotate: Na.$$annotate,
        has: function (b) {
          return n.hasOwnProperty(b + "Provider") || a.hasOwnProperty(b)
        }
      }
    }
    b = !0 === b;
    var k = {},
      l = [],
      m = new Ka([], !0),
      n = {
        $provide: {
          provider: c(e),
          factory: c(h),
          service: c(function (a, b) {
            return h(a, ["$injector", function (a) {
              return a.instantiate(b)
            }])
          }),
          value: c(function (a, b) {
            return h(a, o(b), !1)
          }),
          constant: c(function (a, b) {
            ea(a, "constant"), n[a] = b, r[a] = b
          }),
          decorator: function (a, b) {
            var c = p.get(a + "Provider"),
              d = c.$get;
            c.$get = function () {
              var a = v.invoke(d, c);
              return v.invoke(b, null, {
                $delegate: a
              })
            }
          }
        }
      },
      p = n.$injector = j(n, function (a, b) {
        throw cd.isString(b) && l.push(b), Md("unpr", l.join(" <- "))
      }),
      r = {},
      t = j(r, function (a, b) {
        var c = p.get(a + "Provider", b);
        return v.invoke(c.$get, c, void 0, a)
      }),
      v = t;
    n.$injectorProvider = {
      $get: o(t)
    };
    var w = i(a),
      v = t.get("$injector");
    return v.strictDi = b, d(w, function (a) {
      a && v.invoke(a)
    }), v
  }

  function Oa() {
    var a = !0;
    this.disableAutoScrolling = function () {
      a = !1
    }, this.$get = ["$window", "$location", "$rootScope", function (b, c, d) {
      function e(a) {
        var b = null;
        return Array.prototype.some.call(a, function (a) {
          return "a" === F(a) ? (b = a, !0) : void 0
        }), b
      }

      function f(a) {
        if (a) {
          a.scrollIntoView();
          var c;
          c = g.yOffset, x(c) ? c = c() : D(c) ? (c = c[0], c = "fixed" !== b.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : v(c) || (c = 0), c && (a = a.getBoundingClientRect().top, b.scrollBy(0, a - c))
        } else b.scrollTo(0, 0)
      }

      function g(a) {
        a = u(a) ? a : c.hash();
        var b;
        a ? (b = h.getElementById(a)) ? f(b) : (b = e(h.getElementsByName(a))) ? f(b) : "top" === a && f(null) : f(null)
      }
      var h = b.document;
      return a && d.$watch(function () {
        return c.hash()
      }, function (a, b) {
        a === b && "" === a || Da(function () {
          d.$evalAsync(g)
        })
      }), g
    }]
  }

  function Pa(a, b) {
    return a || b ? a ? b ? (ed(a) && (a = a.join(" ")), ed(b) && (b = b.join(" ")), a + " " + b) : a : b : ""
  }

  function Qa(a) {
    u(a) && (a = a.split(" "));
    var b = ha();
    return d(a, function (a) {
      a.length && (b[a] = !0)
    }), b
  }

  function Ra(a) {
    return s(a) ? a : {}
  }

  function Sa(a, b, c, e) {
    function f(a) {
      try {
        a.apply(null, Yc.call(arguments, 1))
      } finally {
        if (r--, 0 === r)
          for (; s.length;) try {
            s.pop()()
          } catch (b) {
            c.error(b)
          }
      }
    }

    function g() {
      x = null, h(), i()
    }

    function h() {
      t = y(), t = q(t) ? null : t, J(t, B) && (t = B), B = t
    }

    function i() {
      v === j.url() && u === t || (v = j.url(), u = t, d(z, function (a) {
        a(j.url(), t)
      }))
    }
    var j = this,
      k = a.location,
      l = a.history,
      n = a.setTimeout,
      o = a.clearTimeout,
      p = {};
    j.isMock = !1;
    var r = 0,
      s = [];
    j.$$completeOutstandingRequest = f, j.$$incOutstandingRequestCount = function () {
      r++
    }, j.notifyWhenNoOutstandingRequests = function (a) {
      0 === r ? a() : s.push(a)
    };
    var t, u, v = k.href,
      w = b.find("base"),
      x = null,
      y = e.history ? function () {
        try {
          return l.state
        } catch (a) {}
      } : m;
    h(), u = t, j.url = function (b, c, d) {
      if (q(d) && (d = null), k !== a.location && (k = a.location), l !== a.history && (l = a.history), b) {
        var f = u === d;
        if (v === b && (!e.history || f)) return j;
        var g = v && ub(v) === ub(b);
        return v = b, u = d, !e.history || g && f ? (g || (x = b), c ? k.replace(b) : g ? (c = k, d = b.indexOf("#"), d = -1 === d ? "" : b.substr(d), c.hash = d) : k.href = b, k.href !== b && (x = b)) : (l[c ? "replaceState" : "pushState"](d, "", b), h(), u = t), x && (x = b), j
      }
      return x || k.href.replace(/%27/g, "'")
    }, j.state = function () {
      return t
    };
    var z = [],
      A = !1,
      B = null;
    j.onUrlChange = function (b) {
      return A || (e.history && Rc(a).on("popstate", g), Rc(a).on("hashchange", g), A = !0), z.push(b), b
    }, j.$$applicationDestroyed = function () {
      Rc(a).off("hashchange popstate", g)
    }, j.$$checkUrlChange = i, j.baseHref = function () {
      var a = w.attr("href");
      return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
    }, j.defer = function (a, b) {
      var c;
      return r++, c = n(function () {
        delete p[c], f(a)
      }, b || 0), p[c] = !0, c
    }, j.defer.cancel = function (a) {
      return p[a] ? (delete p[a], o(a), f(m), !0) : !1
    }
  }

  function Ta() {
    this.$get = ["$window", "$log", "$sniffer", "$document", function (a, b, c, d) {
      return new Sa(a, d, b, c)
    }]
  }

  function Ua() {
    this.$get = function () {
      function a(a, d) {
        function e(a) {
          a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
        }

        function f(a, b) {
          a != b && (a && (a.p = b), b && (b.n = a))
        }
        if (a in c) throw b("$cacheFactory")("iid", a);
        var g = 0,
          h = i({}, d, {
            id: a
          }),
          j = ha(),
          k = d && d.capacity || Number.MAX_VALUE,
          l = ha(),
          m = null,
          n = null;
        return c[a] = {
          put: function (a, b) {
            if (!q(b)) {
              if (k < Number.MAX_VALUE) {
                var c = l[a] || (l[a] = {
                  key: a
                });
                e(c)
              }
              return a in j || g++, j[a] = b, g > k && this.remove(n.key), b
            }
          },
          get: function (a) {
            if (k < Number.MAX_VALUE) {
              var b = l[a];
              if (!b) return;
              e(b)
            }
            return j[a]
          },
          remove: function (a) {
            if (k < Number.MAX_VALUE) {
              var b = l[a];
              if (!b) return;
              b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete l[a]
            }
            a in j && (delete j[a], g--)
          },
          removeAll: function () {
            j = ha(), g = 0, l = ha(), m = n = null
          },
          destroy: function () {
            l = h = j = null, delete c[a]
          },
          info: function () {
            return i({}, h, {
              size: g
            })
          }
        }
      }
      var c = {};
      return a.info = function () {
        var a = {};
        return d(c, function (b, c) {
          a[c] = b.info()
        }), a
      }, a.get = function (a) {
        return c[a]
      }, a
    }
  }

  function Va() {
    this.$get = ["$cacheFactory", function (a) {
      return a("templates")
    }]
  }

  function Wa(b, c) {
    function e(a, b, c) {
      var e = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/,
        f = ha();
      return d(a, function (a, d) {
        if (a in y) f[d] = y[a];
        else {
          var g = a.match(e);
          if (!g) throw Ud("iscp", b, d, a, c ? "controller bindings definition" : "isolate scope definition");
          f[d] = {
            mode: g[1][0],
            collection: "*" === g[2],
            optional: "?" === g[3],
            attrName: g[4] || d
          }, g[4] && (y[a] = f[d])
        }
      }), f
    }

    function g(a) {
      var b = a.charAt(0);
      if (!b || b !== Wc(b)) throw Ud("baddir", a);
      if (a !== a.trim()) throw Ud("baddir", a)
    }

    function h(a) {
      var b = a.require || a.controller && a.name;
      return !ed(b) && s(b) && d(b, function (a, c) {
        var d = a.match(v);
        a.substring(d[0].length) || (b[c] = d[0] + c)
      }), b
    }
    var j = {},
      k = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
      p = /(([\w\-]+)(?:\:([^;]+))?;?)/,
      t = E("ngSrc,ngSrcset,src,srcset"),
      v = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
      w = /^(on[a-z]+|formaction)$/,
      y = ha();
    this.directive = function D(a, c) {
      return ea(a, "directive"), u(a) ? (g(a), ca(c, "directiveFactory"), j.hasOwnProperty(a) || (j[a] = [], b.factory(a + "Directive", ["$injector", "$exceptionHandler", function (b, c) {
        var e = [];
        return d(j[a], function (d, f) {
          try {
            var g = b.invoke(d);
            x(g) ? g = {
              compile: o(g)
            } : !g.compile && g.link && (g.compile = o(g.link)), g.priority = g.priority || 0, g.index = f, g.name = g.name || a, g.require = h(g), g.restrict = g.restrict || "EA", g.$$moduleName = d.$$moduleName, e.push(g)
          } catch (i) {
            c(i)
          }
        }), e
      }])), j[a].push(c)) : d(a, f(D)), this
    }, this.component = function (a, b) {
      function c(a) {
        function c(b) {
          return x(b) || ed(b) ? function (c, d) {
            return a.invoke(b, this, {
              $element: c,
              $attrs: d
            })
          } : b
        }
        var f = b.template || b.templateUrl ? b.template : "",
          g = {
            controller: e,
            controllerAs: _a(b.controller) || b.controllerAs || "$ctrl",
            template: c(f),
            templateUrl: c(b.templateUrl),
            transclude: b.transclude,
            scope: {},
            bindToController: b.bindings || {},
            restrict: "E",
            require: b.require
          };
        return d(b, function (a, b) {
          "$" === b.charAt(0) && (g[b] = a)
        }), g
      }
      var e = b.controller || function () {};
      return d(b, function (a, b) {
        "$" === b.charAt(0) && (c[b] = a, x(e) && (e[b] = a))
      }), c.$inject = ["$injector"], this.directive(a, c)
    }, this.aHrefSanitizationWhitelist = function (a) {
      return r(a) ? (c.aHrefSanitizationWhitelist(a), this) : c.aHrefSanitizationWhitelist()
    }, this.imgSrcSanitizationWhitelist = function (a) {
      return r(a) ? (c.imgSrcSanitizationWhitelist(a), this) : c.imgSrcSanitizationWhitelist()
    };
    var z = !0;
    this.debugInfoEnabled = function (a) {
      return r(a) ? (z = a, this) : z
    };
    var C = 10;
    this.onChangesTtl = function (a) {
      return arguments.length ? (C = a, this) : C
    }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function (b, c, f, g, h, o, y, D, E, H) {
      function I() {
        try {
          if (!--ua) throw ra = void 0, Ud("infchng", C);
          y.$apply(function () {
            for (var a = 0, b = ra.length; b > a; ++a) ra[a]();
            ra = void 0
          })
        } finally {
          ua++
        }
      }

      function K(a, b) {
        if (b) {
          var c, d, e, f = Object.keys(b);
          for (c = 0, d = f.length; d > c; c++) e = f[c], this[e] = b[e]
        } else this.$attr = {};
        this.$$element = a
      }

      function M(a, b, c) {
        ta.innerHTML = "<span " + b + ">", b = ta.firstChild.attributes;
        var d = b[0];
        b.removeNamedItem(d.name), d.value = c, a.attributes.setNamedItem(d)
      }

      function N(a, b) {
        try {
          a.addClass(b)
        } catch (c) {}
      }

      function O(b, c, d, e, f) {
        b instanceof Rc || (b = Rc(b));
        for (var g = /\S+/, h = 0, i = b.length; i > h; h++) {
          var j = b[h];
          j.nodeType === od && j.nodeValue.match(g) && na(j, b[h] = a.document.createElement("span"))
        }
        var k = P(b, c, b, d, e, f);
        O.$$addScopeClass(b);
        var l = null;
        return function (a, c, d) {
          ca(a, "scope"), f && f.needsNewScope && (a = a.$parent.$new()), d = d || {};
          var e = d.parentBoundTranscludeFn,
            g = d.transcludeControllers;
          if (d = d.futureParentElement, e && e.$$boundTransclude && (e = e.$$boundTransclude), l || (l = (d = d && d[0]) && "foreignobject" !== F(d) && _c.call(d).match(/SVG/) ? "svg" : "html"), d = "html" !== l ? Rc(ia(l, Rc("<div>").append(b).html())) : c ? Cd.clone.call(b) : b, g)
            for (var h in g) d.data("$" + h + "Controller", g[h].instance);
          return O.$$addScopeInfo(d, a), c && c(d, a), k && k(a, d, d, e), d
        }
      }

      function P(a, b, c, d, e, f) {
        function g(a, c, d, e) {
          var f, g, h, i, j, k, n;
          if (l)
            for (n = Array(c.length), i = 0; i < m.length; i += 3) f = m[i], n[f] = c[f];
          else n = c;
          for (i = 0, j = m.length; j > i;) g = n[m[i++]], c = m[i++], f = m[i++], c ? (c.scope ? (h = a.$new(), O.$$addScopeInfo(Rc(g), h)) : h = a, k = c.transcludeOnThisElement ? Q(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? Q(a, b) : null, c(f, h, g, d, k)) : f && f(a, g.childNodes, void 0, e)
        }
        for (var h, i, j, k, l, m = [], n = 0; n < a.length; n++) h = new K, i = S(a[n], [], h, 0 === n ? d : void 0, e), (f = i.length ? W(i, a[n], h, b, c, null, [], [], f) : null) && f.scope && O.$$addScopeClass(h.$$element), h = f && f.terminal || !(j = a[n].childNodes) || !j.length ? null : P(j, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b), (f || h) && (m.push(n, f, h), k = !0, l = l || f), f = null;
        return k ? g : null
      }

      function Q(a, b, c) {
        function d(d, e, f, g, h) {
          return d || (d = a.$new(!1, h), d.$$transcluded = !0), b(d, e, {
            parentBoundTranscludeFn: c,
            transcludeControllers: f,
            futureParentElement: g
          })
        }
        var e, f = d.$$slots = ha();
        for (e in b.$$slots) f[e] = b.$$slots[e] ? Q(a, b.$$slots[e], c) : null;
        return d
      }

      function S(a, b, c, d, e) {
        var f, g = c.$attr;
        switch (a.nodeType) {
        case 1:
          $(b, Ya(F(a)), "E", d, e);
          for (var h, i, j, l = a.attributes, m = 0, n = l && l.length; n > m; m++) {
            var o = !1,
              q = !1;
            h = l[m], f = h.name, i = gd(h.value), h = Ya(f), (j = ya.test(h)) && (f = f.replace(Wd, "").substr(8).replace(/_(.)/g, function (a, b) {
              return b.toUpperCase()
            })), (h = h.match(za)) && _(h[1]) && (o = f, q = f.substr(0, f.length - 5) + "end", f = f.substr(0, f.length - 6)), h = Ya(f.toLowerCase()), g[h] = f, !j && c.hasOwnProperty(h) || (c[h] = i, Ea(a, h) && (c[h] = !0)), ka(a, b, i, h, j), $(b, h, "A", d, e, o, q)
          }
          if (a = a.className, s(a) && (a = a.animVal), u(a) && "" !== a)
            for (; f = p.exec(a);) h = Ya(f[2]), $(b, h, "C", d, e) && (c[h] = gd(f[3])), a = a.substr(f.index + f[0].length);
          break;
        case od:
          if (11 === Qc)
            for (; a.parentNode && a.nextSibling && a.nextSibling.nodeType === od;) a.nodeValue += a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling);
          ga(b, a.nodeValue);
          break;
        case 8:
          try {
            (f = k.exec(a.nodeValue)) && (h = Ya(f[1]), $(b, h, "M", d, e) && (c[h] = gd(f[2])))
          } catch (r) {}
        }
        return b.sort(ea), b
      }

      function T(a, b, c) {
        var d = [],
          e = 0;
        if (b && a.hasAttribute && a.hasAttribute(b)) {
          do {
            if (!a) throw Ud("uterdir", b, c);
            1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
          } while (e > 0)
        } else d.push(a);
        return Rc(d)
      }

      function U(a, b, c) {
        return function (d, e, f, g, h) {
          return e = T(e[0], b, c), a(d, e, f, g, h)
        }
      }

      function V(a, b, c, d, e, f) {
        var g;
        return a ? O(b, c, d, e, f) : function () {
          return g || (g = O(b, c, d, e, f), b = c = f = null), g.apply(this, arguments)
        }
      }

      function W(a, b, c, e, g, h, j, k, l) {
        function m(a, b, c, d) {
          a && (c && (a = U(a, c, d)), a.require = o.require, a.directiveName = p, (z === o || o.$$isolateScope) && (a = ma(a, {
            isolateScope: !0
          })), j.push(a)), b && (c && (b = U(b, c, d)), b.require = o.require, b.directiveName = p, (z === o || o.$$isolateScope) && (b = ma(b, {
            isolateScope: !0
          })), k.push(b))
        }

        function n(a, e, f, g, h) {
          function l(a, b, c, d) {
            var e;
            if (A(a) || (d = c, c = b, b = a, a = void 0), G && (e = t), c || (c = G ? v.parent() : v), !d) return h(a, b, e, c, E);
            var f = h.$$slots[d];
            if (f) return f(a, b, e, c, E);
            if (q(f)) throw Ud("noslot", d, R(v))
          }
          var m, n, o, p, r, t, u, v;
          b === f ? (g = c, v = c.$$element) : (v = Rc(f), g = new K(v, c)), r = e, z ? p = e.$new(!0) : w && (r = e.$parent), h && (u = l, u.$$boundTransclude = h, u.isSlotFilled = function (a) {
            return !!h.$$slots[a]
          }), y && (t = Y(v, g, u, y, p, e, z)), z && (O.$$addScopeInfo(v, p, !0, !(B && (B === z || B === z.$$originalDirective))), O.$$addScopeClass(v, !0), p.$$isolateBindings = z.$$isolateBindings, n = qa(e, g, p, p.$$isolateBindings, z), n.removeWatches && p.$on("$destroy", n.removeWatches));
          for (m in t) {
            n = y[m], o = t[m];
            var C = n.$$bindings.bindToController;
            o.bindingInfo = o.identifier && C ? qa(r, g, o.instance, C, n) : {};
            var D = o();
            D !== o.instance && (o.instance = D, v.data("$" + n.name + "Controller", D), o.bindingInfo.removeWatches && o.bindingInfo.removeWatches(), o.bindingInfo = qa(r, g, o.instance, C, n))
          }
          for (d(y, function (a, b) {
              var c = a.require;
              a.bindToController && !ed(c) && s(c) && i(t[b].instance, X(b, c, v, t))
            }), d(t, function (a) {
              var b = a.instance;
              x(b.$onChanges) && b.$onChanges(a.bindingInfo.initialChanges), x(b.$onInit) && b.$onInit(), x(b.$onDestroy) && r.$on("$destroy", function () {
                b.$onDestroy()
              })
            }), m = 0, n = j.length; n > m; m++) o = j[m], oa(o, o.isolateScope ? p : e, v, g, o.require && X(o.directiveName, o.require, v, t), u);
          var E = e;
          for (z && (z.template || null === z.templateUrl) && (E = p), a && a(E, f.childNodes, void 0, h), m = k.length - 1; m >= 0; m--) o = k[m], oa(o, o.isolateScope ? p : e, v, g, o.require && X(o.directiveName, o.require, v, t), u);
          d(t, function (a) {
            a = a.instance, x(a.$postLink) && a.$postLink()
          })
        }
        l = l || {};
        for (var o, p, r, t, u, v = -Number.MAX_VALUE, w = l.newScopeDirective, y = l.controllerDirectives, z = l.newIsolateScopeDirective, B = l.templateDirective, C = l.nonTlbTranscludeDirective, D = !1, E = !1, G = l.hasElementTranscludeDirective, H = c.$$element = Rc(b), I = e, J = !1, M = !1, N = 0, P = a.length; P > N; N++) {
          o = a[N];
          var Q = o.$$start,
            W = o.$$end;
          if (Q && (H = T(b, Q, W)), r = void 0, v > o.priority) break;
          if ((u = o.scope) && (o.templateUrl || (s(u) ? (fa("new/isolated scope", z || w, o, H), z = o) : fa("new/isolated scope", z, o, H)), w = w || o), p = o.name, !J && (o.replace && (o.templateUrl || o.template) || o.transclude && !o.$$tlb)) {
            for (u = N + 1; J = a[u++];)
              if (J.transclude && !J.$$tlb || J.replace && (J.templateUrl || J.template)) {
                M = !0;
                break
              }
            J = !0
          }
          if (!o.templateUrl && o.controller && (u = o.controller, y = y || ha(), fa("'" + p + "' controller", y[p], o, H), y[p] = o), u = o.transclude)
            if (D = !0, o.$$tlb || (fa("transclusion", C, o, H), C = o), "element" == u) G = !0, v = o.priority, r = H, H = c.$$element = Rc(O.$$createComment(p, c[p])), b = H[0], la(g, Yc.call(r, 0), b), r[0].$$parentNode = r[0].parentNode, I = V(M, r, e, v, h && h.name, {
              nonTlbTranscludeDirective: C
            });
            else {
              var $ = ha();
              if (r = Rc(pa(b)).contents(), s(u)) {
                r = [];
                var _ = ha(),
                  aa = ha();
                d(u, function (a, b) {
                    var c = "?" === a.charAt(0);
                    a = c ? a.substring(1) : a, _[a] = b, $[b] = null, aa[b] = c
                  }),
                  d(H.contents(), function (a) {
                    var b = _[Ya(F(a))];
                    b ? (aa[b] = !0, $[b] = $[b] || [], $[b].push(a)) : r.push(a)
                  }), d(aa, function (a, b) {
                    if (!a) throw Ud("reqslot", b)
                  });
                for (var ca in $) $[ca] && ($[ca] = V(M, $[ca], e))
              }
              H.empty(), I = V(M, r, e, void 0, void 0, {
                needsNewScope: o.$$isolateScope || o.$$newScope
              }), I.$$slots = $
            }
          if (o.template)
            if (E = !0, fa("template", B, o, H), B = o, u = x(o.template) ? o.template(H, c) : o.template, u = xa(u), o.replace) {
              if (h = o, r = xd.test(u) ? $a(ia(o.templateNamespace, gd(u))) : [], b = r[0], 1 != r.length || 1 !== b.nodeType) throw Ud("tplrt", p, "");
              la(g, H, b), P = {
                $attr: {}
              }, u = S(b, [], P);
              var ea = a.splice(N + 1, a.length - (N + 1));
              (z || w) && Z(u, z, w), a = a.concat(u).concat(ea), ba(c, P), P = a.length
            } else H.html(u);
          if (o.templateUrl) E = !0, fa("template", B, o, H), B = o, o.replace && (h = o), n = da(a.splice(N, a.length - N), H, c, g, D && I, j, k, {
            controllerDirectives: y,
            newScopeDirective: w !== o && w,
            newIsolateScopeDirective: z,
            templateDirective: B,
            nonTlbTranscludeDirective: C
          }), P = a.length;
          else if (o.compile) try {
            t = o.compile(H, c, I);
            var ga = o.$$originalDirective || o;
            x(t) ? m(null, L(ga, t), Q, W) : t && m(L(ga, t.pre), L(ga, t.post), Q, W)
          } catch (ja) {
            f(ja, R(H))
          }
          o.terminal && (n.terminal = !0, v = Math.max(v, o.priority))
        }
        return n.scope = w && !0 === w.scope, n.transcludeOnThisElement = D, n.templateOnThisElement = E, n.transclude = I, l.hasElementTranscludeDirective = G, n
      }

      function X(a, b, c, e) {
        var f;
        if (u(b)) {
          var g = b.match(v);
          b = b.substring(g[0].length);
          var h = g[1] || g[3],
            g = "?" === g[2];
          if ("^^" === h ? c = c.parent() : f = (f = e && e[b]) && f.instance, !f) {
            var i = "$" + b + "Controller";
            f = h ? c.inheritedData(i) : c.data(i)
          }
          if (!f && !g) throw Ud("ctreq", b, a)
        } else if (ed(b))
          for (f = [], h = 0, g = b.length; g > h; h++) f[h] = X(a, b[h], c, e);
        else s(b) && (f = {}, d(b, function (b, d) {
          f[d] = X(a, b, c, e)
        }));
        return f || null
      }

      function Y(a, b, c, d, e, f, g) {
        var h, i = ha();
        for (h in d) {
          var j = d[h],
            k = {
              $scope: j === g || j.$$isolateScope ? e : f,
              $element: a,
              $attrs: b,
              $transclude: c
            },
            l = j.controller;
          "@" == l && (l = b[j.name]), k = o(l, k, !0, j.controllerAs), i[j.name] = k, a.data("$" + j.name + "Controller", k.instance)
        }
        return i
      }

      function Z(a, b, c) {
        for (var d = 0, e = a.length; e > d; d++) a[d] = l(a[d], {
          $$isolateScope: b,
          $$newScope: c
        })
      }

      function $(a, c, d, g, h, i, k) {
        if (c === h) return null;
        if (h = null, j.hasOwnProperty(c)) {
          var m;
          c = b.get(c + "Directive");
          for (var n = 0, o = c.length; o > n; n++) try {
            if (m = c[n], (q(g) || g > m.priority) && -1 != m.restrict.indexOf(d)) {
              if (i && (m = l(m, {
                  $$start: i,
                  $$end: k
                })), !m.$$bindings) {
                var p = m,
                  r = m,
                  t = m.name,
                  u = {
                    isolateScope: null,
                    bindToController: null
                  };
                if (s(r.scope) && (!0 === r.bindToController ? (u.bindToController = e(r.scope, t, !0), u.isolateScope = {}) : u.isolateScope = e(r.scope, t, !1)), s(r.bindToController) && (u.bindToController = e(r.bindToController, t, !0)), s(u.bindToController)) {
                  var v = r.controller,
                    w = r.controllerAs;
                  if (!v) throw Ud("noctrl", t);
                  if (!_a(v, w)) throw Ud("noident", t)
                }
                var x = p.$$bindings = u;
                s(x.isolateScope) && (m.$$isolateBindings = x.isolateScope)
              }
              a.push(m), h = m
            }
          } catch (y) {
            f(y)
          }
        }
        return h
      }

      function _(a) {
        if (j.hasOwnProperty(a))
          for (var c = b.get(a + "Directive"), d = 0, e = c.length; e > d; d++)
            if (a = c[d], a.multiElement) return !0;
        return !1
      }

      function ba(a, b) {
        var c = b.$attr,
          e = a.$attr,
          f = a.$$element;
        d(a, function (d, e) {
          "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
        }), d(b, function (b, d) {
          "class" == d ? (N(f, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == d ? (f.attr("style", f.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == d.charAt(0) || a.hasOwnProperty(d) || (a[d] = b, e[d] = c[d])
        })
      }

      function da(a, b, c, e, f, h, i, j) {
        var k, m, n = [],
          o = b[0],
          p = a.shift(),
          q = l(p, {
            templateUrl: null,
            transclude: null,
            replace: null,
            $$originalDirective: p
          }),
          r = x(p.templateUrl) ? p.templateUrl(b, c) : p.templateUrl,
          t = p.templateNamespace;
        return b.empty(), g(r).then(function (g) {
            var l, u;
            if (g = xa(g), p.replace) {
              if (g = xd.test(g) ? $a(ia(t, gd(g))) : [], l = g[0], 1 != g.length || 1 !== l.nodeType) throw Ud("tplrt", p.name, r);
              g = {
                $attr: {}
              }, la(e, b, l);
              var v = S(l, [], g);
              s(p.scope) && Z(v, !0), a = v.concat(a), ba(c, g)
            } else l = o, b.html(g);
            for (a.unshift(q), k = W(a, l, c, f, b, p, h, i, j), d(e, function (a, c) {
                a == l && (e[c] = b[0])
              }), m = P(b[0].childNodes, f); n.length;) {
              g = n.shift(), u = n.shift();
              var w = n.shift(),
                x = n.shift(),
                v = b[0];
              if (!g.$$destroyed) {
                if (u !== o) {
                  var y = u.className;
                  j.hasElementTranscludeDirective && p.replace || (v = pa(l)), la(w, Rc(u), v), N(Rc(v), y)
                }
                u = k.transcludeOnThisElement ? Q(g, k.transclude, x) : x, k(m, g, v, e, u)
              }
            }
            n = null
          }),
          function (a, b, c, d, e) {
            a = e, b.$$destroyed || (n ? n.push(b, c, d, a) : (k.transcludeOnThisElement && (a = Q(b, k.transclude, e)), k(m, b, c, d, a)))
          }
      }

      function ea(a, b) {
        var c = b.priority - a.priority;
        return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
      }

      function fa(a, b, c, d) {
        function e(a) {
          return a ? " (module: " + a + ")" : ""
        }
        if (b) throw Ud("multidir", b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, R(d))
      }

      function ga(a, b) {
        var d = c(b, !0);
        d && a.push({
          priority: 0,
          compile: function (a) {
            a = a.parent();
            var b = !!a.length;
            return b && O.$$addBindingClass(a),
              function (a, c) {
                var e = c.parent();
                b || O.$$addBindingClass(e), O.$$addBindingInfo(e, d.expressions), a.$watch(d, function (a) {
                  c[0].nodeValue = a
                })
              }
          }
        })
      }

      function ia(b, c) {
        switch (b = Wc(b || "html")) {
        case "svg":
        case "math":
          var d = a.document.createElement("div");
          return d.innerHTML = "<" + b + ">" + c + "</" + b + ">", d.childNodes[0].childNodes;
        default:
          return c
        }
      }

      function ja(a, b) {
        if ("srcdoc" == b) return D.HTML;
        var c = F(a);
        return "xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b) ? D.RESOURCE_URL : void 0
      }

      function ka(a, b, d, e, f) {
        var g = ja(a, e);
        f = t[e] || f;
        var h = c(d, !0, g, f);
        if (h) {
          if ("multiple" === e && "select" === F(a)) throw Ud("selmulti", R(a));
          b.push({
            priority: 100,
            compile: function () {
              return {
                pre: function (a, b, i) {
                  if (b = i.$$observers || (i.$$observers = ha()), w.test(e)) throw Ud("nodomevents");
                  var j = i[e];
                  j !== d && (h = j && c(j, !0, g, f), d = j), h && (i[e] = h(a), (b[e] || (b[e] = [])).$$inter = !0, (i.$$observers && i.$$observers[e].$$scope || a).$watch(h, function (a, b) {
                    "class" === e && a != b ? i.$updateClass(a, b) : i.$set(e, a)
                  }))
                }
              }
            }
          })
        }
      }

      function la(b, c, d) {
        var e, f, g = c[0],
          h = c.length,
          i = g.parentNode;
        if (b)
          for (e = 0, f = b.length; f > e; e++)
            if (b[e] == g) {
              b[e++] = d, f = e + h - 1;
              for (var j = b.length; j > e; e++, f++) j > f ? b[e] = b[f] : delete b[e];
              b.length -= h - 1, b.context === g && (b.context = d);
              break
            }
        for (i && i.replaceChild(d, g), b = a.document.createDocumentFragment(), e = 0; h > e; e++) b.appendChild(c[e]);
        for (Rc.hasData(g) && (Rc.data(d, Rc.data(g)), Rc(g).off("$destroy")), Rc.cleanData(b.querySelectorAll("*")), e = 1; h > e; e++) delete c[e];
        c[0] = d, c.length = 1
      }

      function ma(a, b) {
        return i(function () {
          return a.apply(null, arguments)
        }, a, b)
      }

      function oa(a, b, c, d, e, g) {
        try {
          a(b, c, d, e, g)
        } catch (h) {
          f(h, R(c))
        }
      }

      function qa(a, b, e, f, g) {
        function i(b, c, d) {
          x(e.$onChanges) && c !== d && (ra || (a.$$postDigest(I), ra = []), k || (k = {}, ra.push(j)), k[b] && (d = k[b].previousValue), k[b] = new Xa(d, c))
        }

        function j() {
          e.$onChanges(k), k = void 0
        }
        var k, l = [],
          n = {};
        return d(f, function (d, f) {
          var j, k, o, p, q = d.attrName,
            r = d.optional;
          switch (d.mode) {
          case "@":
            r || Vc.call(b, q) || (e[f] = b[q] = void 0), b.$observe(q, function (a) {
              (u(a) || B(a)) && (i(f, a, e[f]), e[f] = a)
            }), b.$$observers[q].$$scope = a, j = b[q], u(j) ? e[f] = c(j)(a) : B(j) && (e[f] = j), n[f] = new Xa(Vd, e[f]);
            break;
          case "=":
            if (!Vc.call(b, q)) {
              if (r) break;
              b[q] = void 0
            }
            if (r && !b[q]) break;
            k = h(b[q]), p = k.literal ? J : function (a, b) {
              return a === b || a !== a && b !== b
            }, o = k.assign || function () {
              throw j = e[f] = k(a), Ud("nonassign", b[q], q, g.name)
            }, j = e[f] = k(a), r = function (b) {
              return p(b, e[f]) || (p(b, j) ? o(a, b = e[f]) : e[f] = b), j = b
            }, r.$stateful = !0, r = d.collection ? a.$watchCollection(b[q], r) : a.$watch(h(b[q], r), null, k.literal), l.push(r);
            break;
          case "<":
            if (!Vc.call(b, q)) {
              if (r) break;
              b[q] = void 0
            }
            if (r && !b[q]) break;
            k = h(b[q]);
            var s = e[f] = k(a);
            n[f] = new Xa(Vd, e[f]), r = a.$watch(k, function (a, b) {
              if (b === a) {
                if (b === s) return;
                b = s
              }
              i(f, a, b), e[f] = a
            }, k.literal), l.push(r);
            break;
          case "&":
            if (k = b.hasOwnProperty(q) ? h(b[q]) : m, k === m && r) break;
            e[f] = function (b) {
              return k(a, b)
            }
          }
        }), {
          initialChanges: n,
          removeWatches: l.length && function () {
            for (var a = 0, b = l.length; b > a; ++a) l[a]()
          }
        }
      }
      var ra, sa = /^\w/,
        ta = a.document.createElement("div"),
        ua = C;
      K.prototype = {
        $normalize: Ya,
        $addClass: function (a) {
          a && 0 < a.length && E.addClass(this.$$element, a)
        },
        $removeClass: function (a) {
          a && 0 < a.length && E.removeClass(this.$$element, a)
        },
        $updateClass: function (a, b) {
          var c = Za(a, b);
          c && c.length && E.addClass(this.$$element, c), (c = Za(b, a)) && c.length && E.removeClass(this.$$element, c)
        },
        $set: function (a, b, c, e) {
          var g = Ea(this.$$element[0], a),
            h = Fd[a],
            i = a;
          if (g ? (this.$$element.prop(a, b), e = g) : h && (this[h] = b, i = h), this[a] = b, e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = aa(a, "-")), g = F(this.$$element), "a" === g && ("href" === a || "xlinkHref" === a) || "img" === g && "src" === a) this[a] = b = H(b, "src" === a);
          else if ("img" === g && "srcset" === a && r(b)) {
            for (var g = "", h = gd(b), j = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, j = /\s/.test(h) ? j : /(,)/, h = h.split(j), j = Math.floor(h.length / 2), k = 0; j > k; k++) var l = 2 * k,
              g = g + H(gd(h[l]), !0),
              g = g + (" " + gd(h[l + 1]));
            h = gd(h[2 * k]).split(/\s/), g += H(gd(h[0]), !0), 2 === h.length && (g += " " + gd(h[1])), this[a] = b = g
          }!1 !== c && (null === b || q(b) ? this.$$element.removeAttr(e) : sa.test(e) ? this.$$element.attr(e, b) : M(this.$$element[0], e, b)), (a = this.$$observers) && d(a[i], function (a) {
            try {
              a(b)
            } catch (c) {
              f(c)
            }
          })
        },
        $observe: function (a, b) {
          var c = this,
            d = c.$$observers || (c.$$observers = ha()),
            e = d[a] || (d[a] = []);
          return e.push(b), y.$evalAsync(function () {
              e.$$inter || !c.hasOwnProperty(a) || q(c[a]) || b(c[a])
            }),
            function () {
              G(e, b)
            }
        }
      };
      var va = c.startSymbol(),
        wa = c.endSymbol(),
        xa = "{{" == va && "}}" == wa ? n : function (a) {
          return a.replace(/\{\{/g, va).replace(/}}/g, wa)
        },
        ya = /^ngAttr[A-Z]/,
        za = /^(.+)Start$/;
      return O.$$addBindingInfo = z ? function (a, b) {
        var c = a.data("$binding") || [];
        ed(b) ? c = c.concat(b) : c.push(b), a.data("$binding", c)
      } : m, O.$$addBindingClass = z ? function (a) {
        N(a, "ng-binding")
      } : m, O.$$addScopeInfo = z ? function (a, b, c, d) {
        a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope", b)
      } : m, O.$$addScopeClass = z ? function (a, b) {
        N(a, b ? "ng-isolate-scope" : "ng-scope")
      } : m, O.$$createComment = function (b, c) {
        var d = "";
        return z && (d = " " + (b || "") + ": ", c && (d += c + " ")), a.document.createComment(d)
      }, O
    }]
  }

  function Xa(a, b) {
    this.previousValue = a, this.currentValue = b
  }

  function Ya(a) {
    return ka(a.replace(Wd, ""))
  }

  function Za(a, b) {
    var c = "",
      d = a.split(/\s+/),
      e = b.split(/\s+/),
      f = 0;
    a: for (; f < d.length; f++) {
      for (var g = d[f], h = 0; h < e.length; h++)
        if (g == e[h]) continue a;
      c += (0 < c.length ? " " : "") + g
    }
    return c
  }

  function $a(a) {
    a = Rc(a);
    var b = a.length;
    if (1 >= b) return a;
    for (; b--;) 8 === a[b].nodeType && Zc.call(a, b, 1);
    return a
  }

  function _a(a, b) {
    if (b && u(b)) return b;
    if (u(a)) {
      var c = Yd.exec(a);
      if (c) return c[3]
    }
  }

  function ab() {
    var a = {},
      c = !1;
    this.has = function (b) {
      return a.hasOwnProperty(b)
    }, this.register = function (b, c) {
      ea(b, "controller"), s(b) ? i(a, b) : a[b] = c
    }, this.allowGlobals = function () {
      c = !0
    }, this.$get = ["$injector", "$window", function (d, e) {
      function f(a, c, d, e) {
        if (!a || !s(a.$scope)) throw b("$controller")("noscp", e, c);
        a.$scope[c] = d
      }
      return function (b, g, h, j) {
        var k, l, m;
        if (h = !0 === h, j && u(j) && (m = j), u(b)) {
          if (j = b.match(Yd), !j) throw Xd("ctrlfmt", b);
          l = j[1], m = m || j[3], b = a.hasOwnProperty(l) ? a[l] : fa(g.$scope, l, !0) || (c ? fa(e, l, !0) : void 0), da(b, l, !0)
        }
        return h ? (h = (ed(b) ? b[b.length - 1] : b).prototype, k = Object.create(h || null), m && f(g, m, k, l || b.name), i(function () {
          var a = d.invoke(b, k, g, l);
          return a !== k && (s(a) || x(a)) && (k = a, m && f(g, m, k, l || b.name)), k
        }, {
          instance: k,
          identifier: m
        })) : (k = d.instantiate(b, g, l), m && f(g, m, k, l || b.name), k)
      }
    }]
  }

  function bb() {
    this.$get = ["$window", function (a) {
      return Rc(a.document)
    }]
  }

  function cb() {
    this.$get = ["$log", function (a) {
      return function (b, c) {
        a.error.apply(a, arguments)
      }
    }]
  }

  function db(a) {
    return s(a) ? w(a) ? a.toISOString() : N(a) : a
  }

  function eb() {
    this.$get = function () {
      return function (a) {
        if (!a) return "";
        var b = [];
        return e(a, function (a, c) {
          null === a || q(a) || (ed(a) ? d(a, function (a) {
            b.push(W(c) + "=" + W(db(a)))
          }) : b.push(W(c) + "=" + W(db(a))))
        }), b.join("&")
      }
    }
  }

  function fb() {
    this.$get = function () {
      return function (a) {
        function b(a, f, g) {
          null === a || q(a) || (ed(a) ? d(a, function (a, c) {
            b(a, f + "[" + (s(a) ? c : "") + "]")
          }) : s(a) && !w(a) ? e(a, function (a, c) {
            b(a, f + (g ? "" : "[") + c + (g ? "" : "]"))
          }) : c.push(W(f) + "=" + W(db(a))))
        }
        if (!a) return "";
        var c = [];
        return b(a, "", !0), c.join("&")
      }
    }
  }

  function gb(a, b) {
    if (u(a)) {
      var c = a.replace(ce, "").trim();
      if (c) {
        var d = b("Content-Type");
        (d = d && 0 === d.indexOf($d)) || (d = (d = c.match(ae)) && be[d[0]].test(c)), d && (a = O(c))
      }
    }
    return a
  }

  function hb(a) {
    var b, c = ha();
    return u(a) ? d(a.split("\n"), function (a) {
      b = a.indexOf(":");
      var d = Wc(gd(a.substr(0, b)));
      a = gd(a.substr(b + 1)), d && (c[d] = c[d] ? c[d] + ", " + a : a)
    }) : s(a) && d(a, function (a, b) {
      var d = Wc(b),
        e = gd(a);
      d && (c[d] = c[d] ? c[d] + ", " + e : e)
    }), c
  }

  function ib(a) {
    var b;
    return function (c) {
      return b || (b = hb(a)), c ? (c = b[Wc(c)], void 0 === c && (c = null), c) : b
    }
  }

  function jb(a, b, c, e) {
    return x(e) ? e(a, b, c) : (d(e, function (d) {
      a = d(a, b, c)
    }), a)
  }

  function kb() {
    var a = this.defaults = {
        transformResponse: [gb],
        transformRequest: [function (a) {
          return s(a) && "[object File]" !== _c.call(a) && "[object Blob]" !== _c.call(a) && "[object FormData]" !== _c.call(a) ? N(a) : a
        }],
        headers: {
          common: {
            Accept: "application/json, text/plain, */*"
          },
          post: I(_d),
          put: I(_d),
          patch: I(_d)
        },
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        paramSerializer: "$httpParamSerializer"
      },
      c = !1;
    this.useApplyAsync = function (a) {
      return r(a) ? (c = !!a, this) : c
    };
    var e = !0;
    this.useLegacyPromiseExtensions = function (a) {
      return r(a) ? (e = !!a, this) : e
    };
    var f = this.interceptors = [];
    this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function (g, h, j, k, l, m) {
      function n(c) {
        function f(a) {
          var b = i({}, a);
          return b.data = jb(a.data, a.headers, a.status, h.transformResponse), a = a.status, a >= 200 && 300 > a ? b : l.reject(b)
        }

        function g(a, b) {
          var c, e = {};
          return d(a, function (a, d) {
            x(a) ? (c = a(b), null != c && (e[d] = c)) : e[d] = a
          }), e
        }
        if (!s(c)) throw b("$http")("badreq", c);
        if (!u(c.url)) throw b("$http")("badreq", c.url);
        var h = i({
          method: "get",
          transformRequest: a.transformRequest,
          transformResponse: a.transformResponse,
          paramSerializer: a.paramSerializer
        }, c);
        h.headers = function (b) {
          var c, d, e, f = a.headers,
            h = i({}, b.headers),
            f = i({}, f.common, f[Wc(b.method)]);
          a: for (c in f) {
            d = Wc(c);
            for (e in h)
              if (Wc(e) === d) continue a;
            h[c] = f[c]
          }
          return g(h, I(b))
        }(c), h.method = Xc(h.method), h.paramSerializer = u(h.paramSerializer) ? m.get(h.paramSerializer) : h.paramSerializer;
        var j = [function (b) {
            var c = b.headers,
              e = jb(b.data, ib(c), void 0, b.transformRequest);
            return q(e) && d(c, function (a, b) {
              "content-type" === Wc(b) && delete c[b]
            }), q(b.withCredentials) && !q(a.withCredentials) && (b.withCredentials = a.withCredentials), o(b, e).then(f, f)
          }, void 0],
          k = l.when(h);
        for (d(v, function (a) {
            (a.request || a.requestError) && j.unshift(a.request, a.requestError), (a.response || a.responseError) && j.push(a.response, a.responseError)
          }); j.length;) {
          c = j.shift();
          var n = j.shift(),
            k = k.then(c, n)
        }
        return e ? (k.success = function (a) {
          return da(a, "fn"), k.then(function (b) {
            a(b.data, b.status, b.headers, h)
          }), k
        }, k.error = function (a) {
          return da(a, "fn"), k.then(null, function (b) {
            a(b.data, b.status, b.headers, h)
          }), k
        }) : (k.success = ee("success"), k.error = ee("error")), k
      }

      function o(b, e) {
        function f(a) {
          if (a) {
            var b = {};
            return d(a, function (a, d) {
              b[d] = function (b) {
                function d() {
                  a(b)
                }
                c ? k.$applyAsync(d) : k.$$phase ? d() : k.$apply(d)
              }
            }), b
          }
        }

        function i(a, b, d, e) {
          function f() {
            j(b, a, d, e)
          }
          u && (a >= 200 && 300 > a ? u.put(A, [a, b, hb(d), e]) : u.remove(A)), c ? k.$applyAsync(f) : (f(), k.$$phase || k.$apply())
        }

        function j(a, c, d, e) {
          c = c >= -1 ? c : 0, (c >= 200 && 300 > c ? w.resolve : w.reject)({
            data: a,
            status: c,
            headers: ib(d),
            config: b,
            statusText: e
          })
        }

        function m(a) {
          j(a.data, a.status, I(a.headers()), a.statusText)
        }

        function o() {
          var a = n.pendingRequests.indexOf(b); - 1 !== a && n.pendingRequests.splice(a, 1)
        }
        var u, v, w = l.defer(),
          y = w.promise,
          z = b.headers,
          A = p(b.url, b.paramSerializer(b.params));
        return n.pendingRequests.push(b), y.then(o, o), !b.cache && !a.cache || !1 === b.cache || "GET" !== b.method && "JSONP" !== b.method || (u = s(b.cache) ? b.cache : s(a.cache) ? a.cache : t), u && (v = u.get(A), r(v) ? v && x(v.then) ? v.then(m, m) : ed(v) ? j(v[1], v[0], I(v[2]), v[3]) : j(v, 200, {}, "OK") : u.put(A, y)), q(v) && ((v = hc(b.url) ? h()[b.xsrfCookieName || a.xsrfCookieName] : void 0) && (z[b.xsrfHeaderName || a.xsrfHeaderName] = v), g(b.method, A, e, i, z, b.timeout, b.withCredentials, b.responseType, f(b.eventHandlers), f(b.uploadEventHandlers))), y
      }

      function p(a, b) {
        return 0 < b.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + b), a
      }
      var t = j("$http");
      a.paramSerializer = u(a.paramSerializer) ? m.get(a.paramSerializer) : a.paramSerializer;
      var v = [];
      return d(f, function (a) {
          v.unshift(u(a) ? m.get(a) : m.invoke(a))
        }), n.pendingRequests = [],
        function (a) {
          d(arguments, function (a) {
            n[a] = function (b, c) {
              return n(i({}, c || {}, {
                method: a,
                url: b
              }))
            }
          })
        }("get", "delete", "head", "jsonp"),
        function (a) {
          d(arguments, function (a) {
            n[a] = function (b, c, d) {
              return n(i({}, d || {}, {
                method: a,
                url: b,
                data: c
              }))
            }
          })
        }("post", "put", "patch"), n.defaults = a, n
    }]
  }

  function lb() {
    this.$get = function () {
      return function () {
        return new a.XMLHttpRequest
      }
    }
  }

  function mb() {
    this.$get = ["$browser", "$window", "$document", "$xhrFactory", function (a, b, c, d) {
      return nb(a, d, a.defer, b.angular.callbacks, c[0])
    }]
  }

  function nb(a, b, c, e, f) {
    function g(a, b, c) {
      var d = f.createElement("script"),
        g = null;
      return d.type = "text/javascript", d.src = a, d.async = !0, g = function (a) {
        d.removeEventListener("load", g, !1), d.removeEventListener("error", g, !1), f.body.removeChild(d), d = null;
        var h = -1,
          i = "unknown";
        a && ("load" !== a.type || e[b].called || (a = {
          type: "error"
        }), i = a.type, h = "error" === a.type ? 404 : 200), c && c(h, i)
      }, d.addEventListener("load", g, !1), d.addEventListener("error", g, !1), f.body.appendChild(d), g
    }
    return function (f, h, i, j, k, l, n, o, p, s) {
      function t() {
        w && w(), y && y.abort()
      }

      function u(b, d, e, f, g) {
        r(A) && c.cancel(A), w = y = null, b(d, e, f, g), a.$$completeOutstandingRequest(m)
      }
      if (a.$$incOutstandingRequestCount(), h = h || a.url(), "jsonp" == Wc(f)) {
        var v = "_" + (e.counter++).toString(36);
        e[v] = function (a) {
          e[v].data = a, e[v].called = !0
        };
        var w = g(h.replace("JSON_CALLBACK", "angular.callbacks." + v), v, function (a, b) {
          u(j, a, e[v].data, "", b), e[v] = m
        })
      } else {
        var y = b(f, h);
        if (y.open(f, h, !0), d(k, function (a, b) {
            r(a) && y.setRequestHeader(b, a)
          }), y.onload = function () {
            var a = y.statusText || "",
              b = "response" in y ? y.response : y.responseText,
              c = 1223 === y.status ? 204 : y.status;
            0 === c && (c = b ? 200 : "file" == gc(h).protocol ? 404 : 0), u(j, c, b, y.getAllResponseHeaders(), a)
          }, f = function () {
            u(j, -1, null, null, "")
          }, y.onerror = f, y.onabort = f, d(p, function (a, b) {
            y.addEventListener(b, a)
          }), d(s, function (a, b) {
            y.upload.addEventListener(b, a)
          }), n && (y.withCredentials = !0), o) try {
          y.responseType = o
        } catch (z) {
          if ("json" !== o) throw z
        }
        y.send(q(i) ? null : i)
      }
      if (l > 0) var A = c(t, l);
      else l && x(l.then) && l.then(t)
    }
  }

  function ob() {
    var a = "{{",
      b = "}}";
    this.startSymbol = function (b) {
      return b ? (a = b, this) : a
    }, this.endSymbol = function (a) {
      return a ? (b = a, this) : b
    }, this.$get = ["$parse", "$exceptionHandler", "$sce", function (c, d, e) {
      function f(a) {
        return "\\\\\\" + a
      }

      function g(c) {
        return c.replace(m, a).replace(n, b)
      }

      function h(a, b, c, d) {
        var e;
        return e = a.$watch(function (a) {
          return e(), d(a)
        }, b, c)
      }

      function j(f, j, m, n) {
        function p(a) {
          try {
            var b = a;
            a = m ? e.getTrusted(m, b) : e.valueOf(b);
            var c;
            if (n && !r(a)) c = a;
            else if (null == a) c = "";
            else {
              switch (typeof a) {
              case "string":
                break;
              case "number":
                a = "" + a;
                break;
              default:
                a = N(a)
              }
              c = a
            }
            return c
          } catch (g) {
            d(fe.interr(f, g))
          }
        }
        if (!f.length || -1 === f.indexOf(a)) {
          var s;
          return j || (j = g(f), s = o(j), s.exp = f, s.expressions = [], s.$$watchDelegate = h), s
        }
        n = !!n;
        var t, u, v = 0,
          w = [],
          y = [];
        s = f.length;
        for (var z = [], A = []; s > v;) {
          if (-1 == (t = f.indexOf(a, v)) || -1 == (u = f.indexOf(b, t + k))) {
            v !== s && z.push(g(f.substring(v)));
            break
          }
          v !== t && z.push(g(f.substring(v, t))), v = f.substring(t + k, u), w.push(v), y.push(c(v, p)), v = u + l, A.push(z.length), z.push("")
        }
        if (m && 1 < z.length && fe.throwNoconcat(f), !j || w.length) {
          var B = function (a) {
            for (var b = 0, c = w.length; c > b; b++) {
              if (n && q(a[b])) return;
              z[A[b]] = a[b]
            }
            return z.join("")
          };
          return i(function (a) {
            var b = 0,
              c = w.length,
              e = Array(c);
            try {
              for (; c > b; b++) e[b] = y[b](a);
              return B(e)
            } catch (g) {
              d(fe.interr(f, g))
            }
          }, {
            exp: f,
            expressions: w,
            $$watchDelegate: function (a, b) {
              var c;
              return a.$watchGroup(y, function (d, e) {
                var f = B(d);
                x(b) && b.call(this, f, d !== e ? c : f, a), c = f
              })
            }
          })
        }
      }
      var k = a.length,
        l = b.length,
        m = new RegExp(a.replace(/./g, f), "g"),
        n = new RegExp(b.replace(/./g, f), "g");
      return j.startSymbol = function () {
        return a
      }, j.endSymbol = function () {
        return b
      }, j
    }]
  }

  function pb() {
    this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function (a, b, c, d, e) {
      function f(f, h, i, j) {
        function k() {
          l ? f.apply(null, m) : f(p)
        }
        var l = 4 < arguments.length,
          m = l ? Yc.call(arguments, 4) : [],
          n = b.setInterval,
          o = b.clearInterval,
          p = 0,
          q = r(j) && !j,
          s = (q ? d : c).defer(),
          t = s.promise;
        return i = r(i) ? i : 0, t.$$intervalId = n(function () {
          q ? e.defer(k) : a.$evalAsync(k), s.notify(p++), i > 0 && p >= i && (s.resolve(p), o(t.$$intervalId), delete g[t.$$intervalId]), q || a.$apply()
        }, h), g[t.$$intervalId] = s, t
      }
      var g = {};
      return f.cancel = function (a) {
        return a && a.$$intervalId in g ? (g[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), delete g[a.$$intervalId], !0) : !1
      }, f
    }]
  }

  function qb(a) {
    a = a.split("/");
    for (var b = a.length; b--;) a[b] = V(a[b]);
    return a.join("/")
  }

  function rb(a, b) {
    var c = gc(a);
    b.$$protocol = c.protocol, b.$$host = c.hostname, b.$$port = k(c.port) || he[c.protocol] || null
  }

  function sb(a, b) {
    var c = "/" !== a.charAt(0);
    c && (a = "/" + a);
    var d = gc(a);
    b.$$path = decodeURIComponent(c && "/" === d.pathname.charAt(0) ? d.pathname.substring(1) : d.pathname), b.$$search = T(d.search), b.$$hash = decodeURIComponent(d.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
  }

  function tb(a, b) {
    return 0 === b.lastIndexOf(a, 0) ? b.substr(a.length) : void 0
  }

  function ub(a) {
    var b = a.indexOf("#");
    return -1 == b ? a : a.substr(0, b)
  }

  function vb(a) {
    return a.replace(/(#.+)|#$/, "$1")
  }

  function wb(a, b, c) {
    this.$$html5 = !0, c = c || "", rb(a, this), this.$$parse = function (a) {
      var c = tb(b, a);
      if (!u(c)) throw ie("ipthprfx", a, b);
      sb(c, this), this.$$path || (this.$$path = "/"), this.$$compose()
    }, this.$$compose = function () {
      var a = U(this.$$search),
        c = this.$$hash ? "#" + V(this.$$hash) : "";
      this.$$url = qb(this.$$path) + (a ? "?" + a : "") + c, this.$$absUrl = b + this.$$url.substr(1)
    }, this.$$parseLinkUrl = function (d, e) {
      if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
      var f, g;
      return r(f = tb(a, d)) ? (g = f, g = r(f = tb(c, f)) ? b + (tb("/", f) || f) : a + g) : r(f = tb(b, d)) ? g = b + f : b == d + "/" && (g = b), g && this.$$parse(g), !!g
    }
  }

  function xb(a, b, c) {
    rb(a, this), this.$$parse = function (d) {
      var e, f = tb(a, d) || tb(b, d);
      q(f) || "#" !== f.charAt(0) ? this.$$html5 ? e = f : (e = "", q(f) && (a = d, this.replace())) : (e = tb(c, f), q(e) && (e = f)), sb(e, this), d = this.$$path;
      var f = a,
        g = /^\/[A-Z]:(\/.*)/;
      0 === e.lastIndexOf(f, 0) && (e = e.replace(f, "")), g.exec(e) || (d = (e = g.exec(d)) ? e[1] : d), this.$$path = d, this.$$compose()
    }, this.$$compose = function () {
      var b = U(this.$$search),
        d = this.$$hash ? "#" + V(this.$$hash) : "";
      this.$$url = qb(this.$$path) + (b ? "?" + b : "") + d, this.$$absUrl = a + (this.$$url ? c + this.$$url : "")
    }, this.$$parseLinkUrl = function (b, c) {
      return ub(a) == ub(b) ? (this.$$parse(b), !0) : !1
    }
  }

  function yb(a, b, c) {
    this.$$html5 = !0, xb.apply(this, arguments), this.$$parseLinkUrl = function (d, e) {
      if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
      var f, g;
      return a == ub(d) ? f = d : (g = tb(b, d)) ? f = a + c + g : b === d + "/" && (f = b), f && this.$$parse(f), !!f
    }, this.$$compose = function () {
      var b = U(this.$$search),
        d = this.$$hash ? "#" + V(this.$$hash) : "";
      this.$$url = qb(this.$$path) + (b ? "?" + b : "") + d, this.$$absUrl = a + c + this.$$url
    }
  }

  function zb(a) {
    return function () {
      return this[a]
    }
  }

  function Ab(a, b) {
    return function (c) {
      return q(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
    }
  }

  function Bb() {
    var a = "",
      b = {
        enabled: !1,
        requireBase: !0,
        rewriteLinks: !0
      };
    this.hashPrefix = function (b) {
      return r(b) ? (a = b, this) : a
    }, this.html5Mode = function (a) {
      return B(a) ? (b.enabled = a, this) : s(a) ? (B(a.enabled) && (b.enabled = a.enabled), B(a.requireBase) && (b.requireBase = a.requireBase), B(a.rewriteLinks) && (b.rewriteLinks = a.rewriteLinks), this) : b
    }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function (c, d, e, f, g) {
      function h(a, b, c) {
        var e = j.url(),
          f = j.$$state;
        try {
          d.url(a, b, c), j.$$state = d.state()
        } catch (g) {
          throw j.url(e), j.$$state = f, g
        }
      }

      function i(a, b) {
        c.$broadcast("$locationChangeSuccess", j.absUrl(), a, j.$$state, b)
      }
      var j, k;
      k = d.baseHref();
      var l, m = d.url();
      if (b.enabled) {
        if (!k && b.requireBase) throw ie("nobase");
        l = m.substring(0, m.indexOf("/", m.indexOf("//") + 2)) + (k || "/"), k = e.history ? wb : yb
      } else l = ub(m), k = xb;
      var n = l.substr(0, ub(l).lastIndexOf("/") + 1);
      j = new k(l, n, "#" + a), j.$$parseLinkUrl(m, m), j.$$state = d.state();
      var o = /^\s*(javascript|mailto):/i;
      f.on("click", function (a) {
        if (b.rewriteLinks && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 != a.which && 2 != a.button) {
          for (var e = Rc(a.target);
            "a" !== F(e[0]);)
            if (e[0] === f[0] || !(e = e.parent())[0]) return;
          var h = e.prop("href"),
            i = e.attr("href") || e.attr("xlink:href");
          s(h) && "[object SVGAnimatedString]" === h.toString() && (h = gc(h.animVal).href), o.test(h) || !h || e.attr("target") || a.isDefaultPrevented() || !j.$$parseLinkUrl(h, i) || (a.preventDefault(), j.absUrl() != d.url() && (c.$apply(), g.angular["ff-684208-preventDefault"] = !0))
        }
      }), vb(j.absUrl()) != vb(m) && d.url(j.absUrl(), !0);
      var p = !0;
      return d.onUrlChange(function (a, b) {
        q(tb(n, a)) ? g.location.href = a : (c.$evalAsync(function () {
          var d, e = j.absUrl(),
            f = j.$$state;
          a = vb(a), j.$$parse(a), j.$$state = b, d = c.$broadcast("$locationChangeStart", a, e, b, f).defaultPrevented, j.absUrl() === a && (d ? (j.$$parse(e), j.$$state = f, h(e, !1, f)) : (p = !1, i(e, f)))
        }), c.$$phase || c.$digest())
      }), c.$watch(function () {
        var a = vb(d.url()),
          b = vb(j.absUrl()),
          f = d.state(),
          g = j.$$replace,
          k = a !== b || j.$$html5 && e.history && f !== j.$$state;
        (p || k) && (p = !1, c.$evalAsync(function () {
          var b = j.absUrl(),
            d = c.$broadcast("$locationChangeStart", b, a, j.$$state, f).defaultPrevented;
          j.absUrl() === b && (d ? (j.$$parse(a), j.$$state = f) : (k && h(b, g, f === j.$$state ? null : j.$$state), i(a, f)))
        })), j.$$replace = !1
      }), j
    }]
  }

  function Cb() {
    var a = !0,
      b = this;
    this.debugEnabled = function (b) {
      return r(b) ? (a = b, this) : a
    }, this.$get = ["$window", function (c) {
      function e(a) {
        return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
      }

      function f(a) {
        var b = c.console || {},
          f = b[a] || b.log || m;
        a = !1;
        try {
          a = !!f.apply
        } catch (g) {}
        return a ? function () {
          var a = [];
          return d(arguments, function (b) {
            a.push(e(b))
          }), f.apply(b, a)
        } : function (a, b) {
          f(a, null == b ? "" : b)
        }
      }
      return {
        log: f("log"),
        info: f("info"),
        warn: f("warn"),
        error: f("error"),
        debug: function () {
          var c = f("debug");
          return function () {
            a && c.apply(b, arguments)
          }
        }()
      }
    }]
  }

  function Db(a, b) {
    if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw ke("isecfld", b);
    return a
  }

  function Eb(a) {
    return a + ""
  }

  function Fb(a, b) {
    if (a) {
      if (a.constructor === a) throw ke("isecfn", b);
      if (a.window === a) throw ke("isecwindow", b);
      if (a.children && (a.nodeName || a.prop && a.attr && a.find)) throw ke("isecdom", b);
      if (a === Object) throw ke("isecobj", b)
    }
    return a
  }

  function Gb(a, b) {
    if (a) {
      if (a.constructor === a) throw ke("isecfn", b);
      if (a === le || a === me || a === ne) throw ke("isecff", b)
    }
  }

  function Hb(a, b) {
    if (a && (a === 0..constructor || a === (!1).constructor || a === "".constructor || a === {}.constructor || a === [].constructor || a === Function.constructor)) throw ke("isecaf", b)
  }

  function Ib(a, b) {
    return "undefined" != typeof a ? a : b
  }

  function Jb(a, b) {
    return "undefined" == typeof a ? b : "undefined" == typeof b ? a : a + b
  }

  function Kb(a, b) {
    var c, e;
    switch (a.type) {
    case re.Program:
      c = !0, d(a.body, function (a) {
        Kb(a.expression, b), c = c && a.expression.constant
      }), a.constant = c;
      break;
    case re.Literal:
      a.constant = !0, a.toWatch = [];
      break;
    case re.UnaryExpression:
      Kb(a.argument, b), a.constant = a.argument.constant, a.toWatch = a.argument.toWatch;
      break;
    case re.BinaryExpression:
      Kb(a.left, b), Kb(a.right, b), a.constant = a.left.constant && a.right.constant, a.toWatch = a.left.toWatch.concat(a.right.toWatch);
      break;
    case re.LogicalExpression:
      Kb(a.left, b), Kb(a.right, b), a.constant = a.left.constant && a.right.constant, a.toWatch = a.constant ? [] : [a];
      break;
    case re.ConditionalExpression:
      Kb(a.test, b), Kb(a.alternate, b), Kb(a.consequent, b), a.constant = a.test.constant && a.alternate.constant && a.consequent.constant, a.toWatch = a.constant ? [] : [a];
      break;
    case re.Identifier:
      a.constant = !1, a.toWatch = [a];
      break;
    case re.MemberExpression:
      Kb(a.object, b), a.computed && Kb(a.property, b), a.constant = a.object.constant && (!a.computed || a.property.constant), a.toWatch = [a];
      break;
    case re.CallExpression:
      c = a.filter ? !b(a.callee.name).$stateful : !1, e = [], d(a.arguments, function (a) {
        Kb(a, b), c = c && a.constant, a.constant || e.push.apply(e, a.toWatch)
      }), a.constant = c, a.toWatch = a.filter && !b(a.callee.name).$stateful ? e : [a];
      break;
    case re.AssignmentExpression:
      Kb(a.left, b), Kb(a.right, b), a.constant = a.left.constant && a.right.constant, a.toWatch = [a];
      break;
    case re.ArrayExpression:
      c = !0, e = [], d(a.elements, function (a) {
        Kb(a, b), c = c && a.constant, a.constant || e.push.apply(e, a.toWatch)
      }), a.constant = c, a.toWatch = e;
      break;
    case re.ObjectExpression:
      c = !0, e = [], d(a.properties, function (a) {
        Kb(a.value, b), c = c && a.value.constant && !a.computed, a.value.constant || e.push.apply(e, a.value.toWatch)
      }), a.constant = c, a.toWatch = e;
      break;
    case re.ThisExpression:
      a.constant = !1, a.toWatch = [];
      break;
    case re.LocalsExpression:
      a.constant = !1, a.toWatch = []
    }
  }

  function Lb(a) {
    if (1 == a.length) {
      a = a[0].expression;
      var b = a.toWatch;
      return 1 !== b.length ? b : b[0] !== a ? b : void 0
    }
  }

  function Mb(a) {
    return a.type === re.Identifier || a.type === re.MemberExpression
  }

  function Nb(a) {
    return 1 === a.body.length && Mb(a.body[0].expression) ? {
      type: re.AssignmentExpression,
      left: a.body[0].expression,
      right: {
        type: re.NGValueParameter
      },
      operator: "="
    } : void 0
  }

  function Ob(a) {
    return 0 === a.body.length || 1 === a.body.length && (a.body[0].expression.type === re.Literal || a.body[0].expression.type === re.ArrayExpression || a.body[0].expression.type === re.ObjectExpression)
  }

  function Pb(a, b) {
    this.astBuilder = a, this.$filter = b
  }

  function Qb(a, b) {
    this.astBuilder = a, this.$filter = b
  }

  function Rb(a) {
    return "constructor" == a
  }

  function Sb(a) {
    return x(a.valueOf) ? a.valueOf() : te.call(a)
  }

  function Tb() {
    var a, b, c = ha(),
      e = ha(),
      f = {
        "true": !0,
        "false": !1,
        "null": null,
        undefined: void 0
      };
    this.addLiteral = function (a, b) {
      f[a] = b
    }, this.setIdentifierFns = function (c, d) {
      return a = c, b = d, this
    }, this.$get = ["$filter", function (g) {
      function h(a, b, d) {
        var f, h, j;
        switch (d = d || u, typeof a) {
        case "string":
          j = a = a.trim();
          var q = d ? e : c;
          if (f = q[j], !f) {
            ":" === a.charAt(0) && ":" === a.charAt(1) && (h = !0, a = a.substring(2)), f = d ? t : s;
            var r = new qe(f);
            f = new se(r, g, f).parse(a), f.constant ? f.$$watchDelegate = o : h ? f.$$watchDelegate = f.literal ? n : l : f.inputs && (f.$$watchDelegate = k), d && (f = i(f)), q[j] = f
          }
          return p(f, b);
        case "function":
          return p(a, b);
        default:
          return p(m, b)
        }
      }

      function i(a) {
        function b(b, c, d, e) {
          var f = u;
          u = !0;
          try {
            return a(b, c, d, e)
          } finally {
            u = f
          }
        }
        if (!a) return a;
        b.$$watchDelegate = a.$$watchDelegate, b.assign = i(a.assign), b.constant = a.constant, b.literal = a.literal;
        for (var c = 0; a.inputs && c < a.inputs.length; ++c) a.inputs[c] = i(a.inputs[c]);
        return b.inputs = a.inputs, b
      }

      function j(a, b) {
        return null == a || null == b ? a === b : "object" == typeof a && (a = Sb(a), "object" == typeof a) ? !1 : a === b || a !== a && b !== b
      }

      function k(a, b, c, d, e) {
        var f, g = d.inputs;
        if (1 === g.length) {
          var h = j,
            g = g[0];
          return a.$watch(function (a) {
            var b = g(a);
            return j(b, h) || (f = d(a, void 0, void 0, [b]), h = b && Sb(b)), f
          }, b, c, e)
        }
        for (var i = [], k = [], l = 0, m = g.length; m > l; l++) i[l] = j, k[l] = null;
        return a.$watch(function (a) {
          for (var b = !1, c = 0, e = g.length; e > c; c++) {
            var h = g[c](a);
            (b || (b = !j(h, i[c]))) && (k[c] = h, i[c] = h && Sb(h))
          }
          return b && (f = d(a, void 0, void 0, k)), f
        }, b, c, e)
      }

      function l(a, b, c, d) {
        var e, f;
        return e = a.$watch(function (a) {
          return d(a)
        }, function (a, c, d) {
          f = a, x(b) && b.apply(this, arguments), r(a) && d.$$postDigest(function () {
            r(f) && e()
          })
        }, c)
      }

      function n(a, b, c, e) {
        function f(a) {
          var b = !0;
          return d(a, function (a) {
            r(a) || (b = !1)
          }), b
        }
        var g, h;
        return g = a.$watch(function (a) {
          return e(a)
        }, function (a, c, d) {
          h = a, x(b) && b.call(this, a, c, d), f(a) && d.$$postDigest(function () {
            f(h) && g()
          })
        }, c)
      }

      function o(a, b, c, d) {
        var e;
        return e = a.$watch(function (a) {
          return e(), d(a)
        }, b, c)
      }

      function p(a, b) {
        if (!b) return a;
        var c = a.$$watchDelegate,
          d = !1,
          c = c !== n && c !== l ? function (c, e, f, g) {
            return f = d && g ? g[0] : a(c, e, f, g), b(f, c, e)
          } : function (c, d, e, f) {
            return e = a(c, d, e, f), c = b(e, c, d), r(e) ? c : e
          };
        return a.$$watchDelegate && a.$$watchDelegate !== k ? c.$$watchDelegate = a.$$watchDelegate : b.$stateful || (c.$$watchDelegate = k, d = !a.inputs, c.inputs = a.inputs ? a.inputs : [a]), c
      }
      var q = id().noUnsafeEval,
        s = {
          csp: q,
          expensiveChecks: !1,
          literals: H(f),
          isIdentifierStart: x(a) && a,
          isIdentifierContinue: x(b) && b
        },
        t = {
          csp: q,
          expensiveChecks: !0,
          literals: H(f),
          isIdentifierStart: x(a) && a,
          isIdentifierContinue: x(b) && b
        },
        u = !1;
      return h.$$runningExpensiveChecks = function () {
        return u
      }, h
    }]
  }

  function Ub() {
    this.$get = ["$rootScope", "$exceptionHandler", function (a, b) {
      return Wb(function (b) {
        a.$evalAsync(b)
      }, b)
    }]
  }

  function Vb() {
    this.$get = ["$browser", "$exceptionHandler", function (a, b) {
      return Wb(function (b) {
        a.defer(b)
      }, b)
    }]
  }

  function Wb(a, c) {
    function e() {
      this.$$state = {
        status: 0
      }
    }

    function f(a, b) {
      return function (c) {
        b.call(a, c)
      }
    }

    function g(b) {
      !b.processScheduled && b.pending && (b.processScheduled = !0, a(function () {
        var a, d, e;
        e = b.pending, b.processScheduled = !1, b.pending = void 0;
        for (var f = 0, g = e.length; g > f; ++f) {
          d = e[f][0], a = e[f][b.status];
          try {
            x(a) ? d.resolve(a(b.value)) : 1 === b.status ? d.resolve(b.value) : d.reject(b.value)
          } catch (h) {
            d.reject(h), c(h)
          }
        }
      }))
    }

    function h() {
      this.promise = new e
    }
    var j = b("$q", TypeError);
    i(e.prototype, {
      then: function (a, b, c) {
        if (q(a) && q(b) && q(c)) return this;
        var d = new h;
        return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([d, a, b, c]), 0 < this.$$state.status && g(this.$$state), d.promise
      },
      "catch": function (a) {
        return this.then(null, a)
      },
      "finally": function (a, b) {
        return this.then(function (b) {
          return l(b, !0, a)
        }, function (b) {
          return l(b, !1, a)
        }, b);
      }
    }), i(h.prototype, {
      resolve: function (a) {
        this.promise.$$state.status || (a === this.promise ? this.$$reject(j("qcycle", a)) : this.$$resolve(a))
      },
      $$resolve: function (a) {
        function b(a) {
          i || (i = !0, h.$$resolve(a))
        }

        function d(a) {
          i || (i = !0, h.$$reject(a))
        }
        var e, h = this,
          i = !1;
        try {
          (s(a) || x(a)) && (e = a && a.then), x(e) ? (this.promise.$$state.status = -1, e.call(a, b, d, f(this, this.notify))) : (this.promise.$$state.value = a, this.promise.$$state.status = 1, g(this.promise.$$state))
        } catch (j) {
          d(j), c(j)
        }
      },
      reject: function (a) {
        this.promise.$$state.status || this.$$reject(a)
      },
      $$reject: function (a) {
        this.promise.$$state.value = a, this.promise.$$state.status = 2, g(this.promise.$$state)
      },
      notify: function (b) {
        var d = this.promise.$$state.pending;
        0 >= this.promise.$$state.status && d && d.length && a(function () {
          for (var a, e, f = 0, g = d.length; g > f; f++) {
            e = d[f][0], a = d[f][3];
            try {
              e.notify(x(a) ? a(b) : b)
            } catch (h) {
              c(h)
            }
          }
        })
      }
    });
    var k = function (a, b) {
        var c = new h;
        return b ? c.resolve(a) : c.reject(a), c.promise
      },
      l = function (a, b, c) {
        var d = null;
        try {
          x(c) && (d = c())
        } catch (e) {
          return k(e, !1)
        }
        return d && x(d.then) ? d.then(function () {
          return k(a, b)
        }, function (a) {
          return k(a, !1)
        }) : k(a, b)
      },
      m = function (a, b, c, d) {
        var e = new h;
        return e.resolve(a), e.promise.then(b, c, d)
      },
      n = function (a) {
        if (!x(a)) throw j("norslvr", a);
        var b = new h;
        return a(function (a) {
          b.resolve(a)
        }, function (a) {
          b.reject(a)
        }), b.promise
      };
    return n.prototype = e.prototype, n.defer = function () {
      var a = new h;
      return a.resolve = f(a, a.resolve), a.reject = f(a, a.reject), a.notify = f(a, a.notify), a
    }, n.reject = function (a) {
      var b = new h;
      return b.reject(a), b.promise
    }, n.when = m, n.resolve = m, n.all = function (a) {
      var b = new h,
        c = 0,
        e = ed(a) ? [] : {};
      return d(a, function (a, d) {
        c++, m(a).then(function (a) {
          e.hasOwnProperty(d) || (e[d] = a, --c || b.resolve(e))
        }, function (a) {
          e.hasOwnProperty(d) || b.reject(a)
        })
      }), 0 === c && b.resolve(e), b.promise
    }, n
  }

  function Xb() {
    this.$get = ["$window", "$timeout", function (a, b) {
      var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame,
        d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame,
        e = !!c,
        f = e ? function (a) {
          var b = c(a);
          return function () {
            d(b)
          }
        } : function (a) {
          var c = b(a, 16.66, !1);
          return function () {
            b.cancel(c)
          }
        };
      return f.supported = e, f
    }]
  }

  function Yb() {
    function a(a) {
      function b() {
        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = ++dd, this.$$ChildScope = null
      }
      return b.prototype = a, b
    }
    var e = 10,
      f = b("$rootScope"),
      g = null,
      h = null;
    this.digestTtl = function (a) {
      return arguments.length && (e = a), e
    }, this.$get = ["$exceptionHandler", "$parse", "$browser", function (b, i, j) {
      function k(a) {
        a.currentScope.$$destroyed = !0
      }

      function l(a) {
        9 === Qc && (a.$$childHead && l(a.$$childHead), a.$$nextSibling && l(a.$$nextSibling)), a.$parent = a.$$nextSibling = a.$$prevSibling = a.$$childHead = a.$$childTail = a.$root = a.$$watchers = null
      }

      function n() {
        this.$id = ++dd, this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null
      }

      function o(a) {
        if (w.$$phase) throw f("inprog", w.$$phase);
        w.$$phase = a
      }

      function p(a, b) {
        do a.$$watchersCount += b; while (a = a.$parent)
      }

      function r(a, b, c) {
        do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent)
      }

      function t() {}

      function u() {
        for (; A.length;) try {
          A.shift()()
        } catch (a) {
          b(a)
        }
        h = null
      }

      function v() {
        null === h && (h = j.defer(function () {
          w.$apply(u)
        }))
      }
      n.prototype = {
        constructor: n,
        $new: function (b, c) {
          var d;
          return c = c || this, b ? (d = new n, d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = a(this)), d = new this.$$ChildScope), d.$parent = c, d.$$prevSibling = c.$$childTail, c.$$childHead ? (c.$$childTail.$$nextSibling = d, c.$$childTail = d) : c.$$childHead = c.$$childTail = d, (b || c != this) && d.$on("$destroy", k), d
        },
        $watch: function (a, b, c, d) {
          var e = i(a);
          if (e.$$watchDelegate) return e.$$watchDelegate(this, b, c, e, a);
          var f = this,
            h = f.$$watchers,
            j = {
              fn: b,
              last: t,
              get: e,
              exp: d || a,
              eq: !!c
            };
          return g = null, x(b) || (j.fn = m), h || (h = f.$$watchers = []), h.unshift(j), p(this, 1),
            function () {
              0 <= G(h, j) && p(f, -1), g = null
            }
        },
        $watchGroup: function (a, b) {
          function c() {
            i = !1, j ? (j = !1, b(f, f, h)) : b(f, e, h)
          }
          var e = Array(a.length),
            f = Array(a.length),
            g = [],
            h = this,
            i = !1,
            j = !0;
          if (!a.length) {
            var k = !0;
            return h.$evalAsync(function () {
                k && b(f, f, h)
              }),
              function () {
                k = !1
              }
          }
          return 1 === a.length ? this.$watch(a[0], function (a, c, d) {
            f[0] = a, e[0] = c, b(f, a === c ? f : e, d)
          }) : (d(a, function (a, b) {
            var d = h.$watch(a, function (a, d) {
              f[b] = a, e[b] = d, i || (i = !0, h.$evalAsync(c))
            });
            g.push(d)
          }), function () {
            for (; g.length;) g.shift()()
          })
        },
        $watchCollection: function (a, b) {
          function d(a) {
            e = a;
            var b, d, g, h;
            if (!q(e)) {
              if (s(e))
                if (c(e))
                  for (f !== m && (f = m, p = f.length = 0, k++), a = e.length, p !== a && (k++, f.length = p = a), b = 0; a > b; b++) h = f[b], g = e[b], d = h !== h && g !== g, d || h === g || (k++, f[b] = g);
                else {
                  f !== n && (f = n = {}, p = 0, k++), a = 0;
                  for (b in e) Vc.call(e, b) && (a++, g = e[b], h = f[b], b in f ? (d = h !== h && g !== g, d || h === g || (k++, f[b] = g)) : (p++, f[b] = g, k++));
                  if (p > a)
                    for (b in k++, f) Vc.call(e, b) || (p--, delete f[b])
                } else f !== e && (f = e, k++);
              return k
            }
          }
          d.$stateful = !0;
          var e, f, g, h = this,
            j = 1 < b.length,
            k = 0,
            l = i(a, d),
            m = [],
            n = {},
            o = !0,
            p = 0;
          return this.$watch(l, function () {
            if (o ? (o = !1, b(e, e, h)) : b(e, g, h), j)
              if (s(e))
                if (c(e)) {
                  g = Array(e.length);
                  for (var a = 0; a < e.length; a++) g[a] = e[a]
                } else
                  for (a in g = {}, e) Vc.call(e, a) && (g[a] = e[a]);
            else g = e
          })
        },
        $digest: function () {
          var a, c, d, i, k, l, m, n, p, q, r, s = e,
            v = [];
          o("$digest"), j.$$checkUrlChange(), this === w && null !== h && (j.defer.cancel(h), u()), g = null;
          do {
            for (n = !1, p = this, l = 0; l < y.length; l++) {
              try {
                r = y[l], r.scope.$eval(r.expression, r.locals)
              } catch (A) {
                b(A)
              }
              g = null
            }
            y.length = 0;
            a: do {
              if (l = p.$$watchers)
                for (m = l.length; m--;) try {
                  if (a = l[m])
                    if (k = a.get, (c = k(p)) === (d = a.last) || (a.eq ? J(c, d) : "number" == typeof c && "number" == typeof d && isNaN(c) && isNaN(d))) {
                      if (a === g) {
                        n = !1;
                        break a
                      }
                    } else n = !0, g = a, a.last = a.eq ? H(c, null) : c, i = a.fn, i(c, d === t ? c : d, p), 5 > s && (q = 4 - s, v[q] || (v[q] = []), v[q].push({
                      msg: x(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp,
                      newVal: c,
                      oldVal: d
                    }))
                } catch (C) {
                  b(C)
                }
              if (!(l = p.$$watchersCount && p.$$childHead || p !== this && p.$$nextSibling))
                for (; p !== this && !(l = p.$$nextSibling);) p = p.$parent
            } while (p = l);
            if ((n || y.length) && !s--) throw w.$$phase = null, f("infdig", e, v)
          } while (n || y.length);
          for (w.$$phase = null; B < z.length;) try {
            z[B++]()
          } catch (D) {
            b(D)
          }
          z.length = B = 0
        },
        $destroy: function () {
          if (!this.$$destroyed) {
            var a = this.$parent;
            this.$broadcast("$destroy"), this.$$destroyed = !0, this === w && j.$$applicationDestroyed(), p(this, -this.$$watchersCount);
            for (var b in this.$$listenerCount) r(this, this.$$listenerCount[b], b);
            a && a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a && a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = m, this.$on = this.$watch = this.$watchGroup = function () {
              return m
            }, this.$$listeners = {}, this.$$nextSibling = null, l(this)
          }
        },
        $eval: function (a, b) {
          return i(a)(this, b)
        },
        $evalAsync: function (a, b) {
          w.$$phase || y.length || j.defer(function () {
            y.length && w.$digest()
          }), y.push({
            scope: this,
            expression: i(a),
            locals: b
          })
        },
        $$postDigest: function (a) {
          z.push(a)
        },
        $apply: function (a) {
          try {
            o("$apply");
            try {
              return this.$eval(a)
            } finally {
              w.$$phase = null
            }
          } catch (c) {
            b(c)
          } finally {
            try {
              w.$digest()
            } catch (d) {
              throw b(d), d
            }
          }
        },
        $applyAsync: function (a) {
          function b() {
            c.$eval(a)
          }
          var c = this;
          a && A.push(b), a = i(a), v()
        },
        $on: function (a, b) {
          var c = this.$$listeners[a];
          c || (this.$$listeners[a] = c = []), c.push(b);
          var d = this;
          do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
          var e = this;
          return function () {
            var d = c.indexOf(b); - 1 !== d && (c[d] = null, r(e, 1, a))
          }
        },
        $emit: function (a, c) {
          var d, e, f, g = [],
            h = this,
            i = !1,
            j = {
              name: a,
              targetScope: h,
              stopPropagation: function () {
                i = !0
              },
              preventDefault: function () {
                j.defaultPrevented = !0
              },
              defaultPrevented: !1
            },
            k = K([j], arguments, 1);
          do {
            for (d = h.$$listeners[a] || g, j.currentScope = h, e = 0, f = d.length; f > e; e++)
              if (d[e]) try {
                d[e].apply(null, k)
              } catch (l) {
                b(l)
              } else d.splice(e, 1), e--, f--;
            if (i) return j.currentScope = null, j;
            h = h.$parent
          } while (h);
          return j.currentScope = null, j
        },
        $broadcast: function (a, c) {
          var d = this,
            e = this,
            f = {
              name: a,
              targetScope: this,
              preventDefault: function () {
                f.defaultPrevented = !0
              },
              defaultPrevented: !1
            };
          if (!this.$$listenerCount[a]) return f;
          for (var g, h, i = K([f], arguments, 1); d = e;) {
            for (f.currentScope = d, e = d.$$listeners[a] || [], g = 0, h = e.length; h > g; g++)
              if (e[g]) try {
                e[g].apply(null, i)
              } catch (j) {
                b(j)
              } else e.splice(g, 1), g--, h--;
            if (!(e = d.$$listenerCount[a] && d.$$childHead || d !== this && d.$$nextSibling))
              for (; d !== this && !(e = d.$$nextSibling);) d = d.$parent
          }
          return f.currentScope = null, f
        }
      };
      var w = new n,
        y = w.$$asyncQueue = [],
        z = w.$$postDigestQueue = [],
        A = w.$$applyAsyncQueue = [],
        B = 0;
      return w
    }]
  }

  function Zb() {
    var a = /^\s*(https?|ftp|mailto|tel|file):/,
      b = /^\s*((https?|ftp|file|blob):|data:image\/)/;
    this.aHrefSanitizationWhitelist = function (b) {
      return r(b) ? (a = b, this) : a
    }, this.imgSrcSanitizationWhitelist = function (a) {
      return r(a) ? (b = a, this) : b
    }, this.$get = function () {
      return function (c, d) {
        var e, f = d ? b : a;
        return e = gc(c).href, "" === e || e.match(f) ? c : "unsafe:" + e
      }
    }
  }

  function $b(a) {
    if ("self" === a) return a;
    if (u(a)) {
      if (-1 < a.indexOf("***")) throw ue("iwcard", a);
      return a = hd(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$")
    }
    if (y(a)) return new RegExp("^" + a.source + "$");
    throw ue("imatcher")
  }

  function _b(a) {
    var b = [];
    return r(a) && d(a, function (a) {
      b.push($b(a))
    }), b
  }

  function ac() {
    this.SCE_CONTEXTS = ve;
    var a = ["self"],
      b = [];
    this.resourceUrlWhitelist = function (b) {
      return arguments.length && (a = _b(b)), a
    }, this.resourceUrlBlacklist = function (a) {
      return arguments.length && (b = _b(a)), b
    }, this.$get = ["$injector", function (c) {
      function d(a, b) {
        return "self" === a ? hc(b) : !!a.exec(b.href)
      }

      function e(a) {
        var b = function (a) {
          this.$$unwrapTrustedValue = function () {
            return a
          }
        };
        return a && (b.prototype = new a), b.prototype.valueOf = function () {
          return this.$$unwrapTrustedValue()
        }, b.prototype.toString = function () {
          return this.$$unwrapTrustedValue().toString()
        }, b
      }
      var f = function (a) {
        throw ue("unsafe")
      };
      c.has("$sanitize") && (f = c.get("$sanitize"));
      var g = e(),
        h = {};
      return h[ve.HTML] = e(g), h[ve.CSS] = e(g), h[ve.URL] = e(g), h[ve.JS] = e(g), h[ve.RESOURCE_URL] = e(h[ve.URL]), {
        trustAs: function (a, b) {
          var c = h.hasOwnProperty(a) ? h[a] : null;
          if (!c) throw ue("icontext", a, b);
          if (null === b || q(b) || "" === b) return b;
          if ("string" != typeof b) throw ue("itype", a);
          return new c(b)
        },
        getTrusted: function (c, e) {
          if (null === e || q(e) || "" === e) return e;
          var g = h.hasOwnProperty(c) ? h[c] : null;
          if (g && e instanceof g) return e.$$unwrapTrustedValue();
          if (c === ve.RESOURCE_URL) {
            var i, j, g = gc(e.toString()),
              k = !1;
            for (i = 0, j = a.length; j > i; i++)
              if (d(a[i], g)) {
                k = !0;
                break
              }
            if (k)
              for (i = 0, j = b.length; j > i; i++)
                if (d(b[i], g)) {
                  k = !1;
                  break
                }
            if (k) return e;
            throw ue("insecurl", e.toString())
          }
          if (c === ve.HTML) return f(e);
          throw ue("unsafe")
        },
        valueOf: function (a) {
          return a instanceof g ? a.$$unwrapTrustedValue() : a
        }
      }
    }]
  }

  function bc() {
    var a = !0;
    this.enabled = function (b) {
      return arguments.length && (a = !!b), a
    }, this.$get = ["$parse", "$sceDelegate", function (b, c) {
      if (a && 8 > Qc) throw ue("iequirks");
      var e = I(ve);
      e.isEnabled = function () {
        return a
      }, e.trustAs = c.trustAs, e.getTrusted = c.getTrusted, e.valueOf = c.valueOf, a || (e.trustAs = e.getTrusted = function (a, b) {
        return b
      }, e.valueOf = n), e.parseAs = function (a, c) {
        var d = b(c);
        return d.literal && d.constant ? d : b(c, function (b) {
          return e.getTrusted(a, b)
        })
      };
      var f = e.parseAs,
        g = e.getTrusted,
        h = e.trustAs;
      return d(ve, function (a, b) {
        var c = Wc(b);
        e[ka("parse_as_" + c)] = function (b) {
          return f(a, b)
        }, e[ka("get_trusted_" + c)] = function (b) {
          return g(a, b)
        }, e[ka("trust_as_" + c)] = function (b) {
          return h(a, b)
        }
      }), e
    }]
  }

  function cc() {
    this.$get = ["$window", "$document", function (a, b) {
      var c, d = {},
        e = !(a.chrome && a.chrome.app && a.chrome.app.runtime) && a.history && a.history.pushState,
        f = k((/android (\d+)/.exec(Wc((a.navigator || {}).userAgent)) || [])[1]),
        g = /Boxee/i.test((a.navigator || {}).userAgent),
        h = b[0] || {},
        i = /^(Moz|webkit|ms)(?=[A-Z])/,
        j = h.body && h.body.style,
        l = !1,
        m = !1;
      if (j) {
        for (var n in j)
          if (l = i.exec(n)) {
            c = l[0], c = c[0].toUpperCase() + c.substr(1);
            break
          }
        c || (c = "WebkitOpacity" in j && "webkit"), l = !!("transition" in j || c + "Transition" in j), m = !!("animation" in j || c + "Animation" in j), !f || l && m || (l = u(j.webkitTransition), m = u(j.webkitAnimation))
      }
      return {
        history: !(!e || 4 > f || g),
        hasEvent: function (a) {
          if ("input" === a && 11 >= Qc) return !1;
          if (q(d[a])) {
            var b = h.createElement("div");
            d[a] = "on" + a in b
          }
          return d[a]
        },
        csp: id(),
        vendorPrefix: c,
        transitions: l,
        animations: m,
        android: f
      }
    }]
  }

  function dc() {
    var a;
    this.httpOptions = function (b) {
      return b ? (a = b, this) : a
    }, this.$get = ["$templateCache", "$http", "$q", "$sce", function (b, c, d, e) {
      function f(g, h) {
        f.totalPendingRequests++, u(g) && !q(b.get(g)) || (g = e.getTrustedResourceUrl(g));
        var j = c.defaults && c.defaults.transformResponse;
        return ed(j) ? j = j.filter(function (a) {
          return a !== gb
        }) : j === gb && (j = null), c.get(g, i({
          cache: b,
          transformResponse: j
        }, a))["finally"](function () {
          f.totalPendingRequests--
        }).then(function (a) {
          return b.put(g, a.data), a.data
        }, function (a) {
          if (!h) throw we("tpload", g, a.status, a.statusText);
          return d.reject(a)
        })
      }
      return f.totalPendingRequests = 0, f
    }]
  }

  function ec() {
    this.$get = ["$rootScope", "$browser", "$location", function (a, b, c) {
      return {
        findBindings: function (a, b, c) {
          a = a.getElementsByClassName("ng-binding");
          var e = [];
          return d(a, function (a) {
            var f = cd.element(a).data("$binding");
            f && d(f, function (d) {
              c ? new RegExp("(^|\\s)" + hd(b) + "(\\s|\\||$)").test(d) && e.push(a) : -1 != d.indexOf(b) && e.push(a)
            })
          }), e
        },
        findModels: function (a, b, c) {
          for (var d = ["ng-", "data-ng-", "ng\\:"], e = 0; e < d.length; ++e) {
            var f = a.querySelectorAll("[" + d[e] + "model" + (c ? "=" : "*=") + '"' + b + '"]');
            if (f.length) return f
          }
        },
        getLocation: function () {
          return c.url()
        },
        setLocation: function (b) {
          b !== c.url() && (c.url(b), a.$digest())
        },
        whenStable: function (a) {
          b.notifyWhenNoOutstandingRequests(a)
        }
      }
    }]
  }

  function fc() {
    this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function (a, b, c, d, e) {
      function f(f, h, i) {
        x(f) || (i = h, h = f, f = m);
        var j, k = Yc.call(arguments, 3),
          l = r(i) && !i,
          n = (l ? d : c).defer(),
          o = n.promise;
        return j = b.defer(function () {
          try {
            n.resolve(f.apply(null, k))
          } catch (b) {
            n.reject(b), e(b)
          } finally {
            delete g[o.$$timeoutId]
          }
          l || a.$apply()
        }, h), o.$$timeoutId = j, g[j] = n, o
      }
      var g = {};
      return f.cancel = function (a) {
        return a && a.$$timeoutId in g ? (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1
      }, f
    }]
  }

  function gc(a) {
    return Qc && (xe.setAttribute("href", a), a = xe.href), xe.setAttribute("href", a), {
      href: xe.href,
      protocol: xe.protocol ? xe.protocol.replace(/:$/, "") : "",
      host: xe.host,
      search: xe.search ? xe.search.replace(/^\?/, "") : "",
      hash: xe.hash ? xe.hash.replace(/^#/, "") : "",
      hostname: xe.hostname,
      port: xe.port,
      pathname: "/" === xe.pathname.charAt(0) ? xe.pathname : "/" + xe.pathname
    }
  }

  function hc(a) {
    return a = u(a) ? gc(a) : a, a.protocol === ye.protocol && a.host === ye.host
  }

  function ic() {
    this.$get = o(a)
  }

  function jc(a) {
    function b(a) {
      try {
        return decodeURIComponent(a)
      } catch (b) {
        return a
      }
    }
    var c = a[0] || {},
      d = {},
      e = "";
    return function () {
      var a, f, g, h, i;
      if (a = c.cookie || "", a !== e)
        for (e = a, a = e.split("; "), d = {}, g = 0; g < a.length; g++) f = a[g], h = f.indexOf("="), h > 0 && (i = b(f.substring(0, h)), q(d[i]) && (d[i] = b(f.substring(h + 1))));
      return d
    }
  }

  function kc() {
    this.$get = jc
  }

  function lc(a) {
    function b(c, e) {
      if (s(c)) {
        var f = {};
        return d(c, function (a, c) {
          f[c] = b(c, a)
        }), f
      }
      return a.factory(c + "Filter", e)
    }
    this.register = b, this.$get = ["$injector", function (a) {
      return function (b) {
        return a.get(b + "Filter")
      }
    }], b("currency", qc), b("date", Bc), b("filter", mc), b("json", Cc), b("limitTo", Dc), b("lowercase", Fe), b("number", rc), b("orderBy", Ec), b("uppercase", Ge)
  }

  function mc() {
    return function (a, d, e) {
      if (!c(a)) {
        if (null == a) return a;
        throw b("filter")("notarray", a)
      }
      var f;
      switch (pc(d)) {
      case "function":
        break;
      case "boolean":
      case "null":
      case "number":
      case "string":
        f = !0;
      case "object":
        d = nc(d, e, f);
        break;
      default:
        return a
      }
      return Array.prototype.filter.call(a, d)
    }
  }

  function nc(a, b, c) {
    var d = s(a) && "$" in a;
    return !0 === b ? b = J : x(b) || (b = function (a, b) {
        return q(a) ? !1 : null === a || null === b ? a === b : s(b) || s(a) && !p(a) ? !1 : (a = Wc("" + a), b = Wc("" + b), -1 !== a.indexOf(b))
      }),
      function (e) {
        return d && !s(e) ? oc(e, a.$, b, !1) : oc(e, a, b, c)
      }
  }

  function oc(a, b, c, d, e) {
    var f = pc(a),
      g = pc(b);
    if ("string" === g && "!" === b.charAt(0)) return !oc(a, b.substring(1), c, d);
    if (ed(a)) return a.some(function (a) {
      return oc(a, b, c, d)
    });
    switch (f) {
    case "object":
      var h;
      if (d) {
        for (h in a)
          if ("$" !== h.charAt(0) && oc(a[h], b, c, !0)) return !0;
        return e ? !1 : oc(a, b, c, !1)
      }
      if ("object" === g) {
        for (h in b)
          if (e = b[h], !x(e) && !q(e) && (f = "$" === h, !oc(f ? a : a[h], e, c, f, f))) return !1;
        return !0
      }
      return c(a, b);
    case "function":
      return !1;
    default:
      return c(a, b)
    }
  }

  function pc(a) {
    return null === a ? "null" : typeof a
  }

  function qc(a) {
    var b = a.NUMBER_FORMATS;
    return function (a, c, d) {
      return q(c) && (c = b.CURRENCY_SYM), q(d) && (d = b.PATTERNS[1].maxFrac), null == a ? a : uc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, d).replace(/\u00A4/g, c)
    }
  }

  function rc(a) {
    var b = a.NUMBER_FORMATS;
    return function (a, c) {
      return null == a ? a : uc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
    }
  }

  function sc(a) {
    var b, c, d, e, f, g = 0;
    for (-1 < (c = a.indexOf(Ae)) && (a = a.replace(Ae, "")), 0 < (d = a.search(/e/i)) ? (0 > c && (c = d), c += +a.slice(d + 1), a = a.substring(0, d)) : 0 > c && (c = a.length), d = 0; a.charAt(d) == Be; d++);
    if (d == (f = a.length)) b = [0], c = 1;
    else {
      for (f--; a.charAt(f) == Be;) f--;
      for (c -= d, b = [], e = 0; f >= d; d++, e++) b[e] = +a.charAt(d)
    }
    return c > ze && (b = b.splice(0, ze - 1), g = c - 1, c = 1), {
      d: b,
      e: g,
      i: c
    }
  }

  function tc(a, b, c, d) {
    var e = a.d,
      f = e.length - a.i;
    if (b = q(b) ? Math.min(Math.max(c, f), d) : +b, c = b + a.i, d = e[c], c > 0) {
      e.splice(Math.max(a.i, c));
      for (var g = c; g < e.length; g++) e[g] = 0
    } else
      for (f = Math.max(0, f), a.i = 1, e.length = Math.max(1, c = b + 1), e[0] = 0, g = 1; c > g; g++) e[g] = 0;
    if (d >= 5)
      if (0 > c - 1) {
        for (d = 0; d > c; d--) e.unshift(0), a.i++;
        e.unshift(1), a.i++
      } else e[c - 1]++;
    for (; f < Math.max(0, b); f++) e.push(0);
    (b = e.reduceRight(function (a, b, c, d) {
      return b += a, d[c] = b % 10, Math.floor(b / 10)
    }, 0)) && (e.unshift(b), a.i++)
  }

  function uc(a, b, c, d, e) {
    if (!u(a) && !v(a) || isNaN(a)) return "";
    var f = !isFinite(a),
      g = !1,
      h = Math.abs(a) + "",
      i = "";
    if (f) i = "∞";
    else {
      for (g = sc(h), tc(g, e, b.minFrac, b.maxFrac), i = g.d, h = g.i, e = g.e, f = [], g = i.reduce(function (a, b) {
          return a && !b
        }, !0); 0 > h;) i.unshift(0), h++;
      for (h > 0 ? f = i.splice(h, i.length) : (f = i, i = [0]), h = [], i.length >= b.lgSize && h.unshift(i.splice(-b.lgSize, i.length).join("")); i.length > b.gSize;) h.unshift(i.splice(-b.gSize, i.length).join(""));
      i.length && h.unshift(i.join("")), i = h.join(c), f.length && (i += d + f.join("")), e && (i += "e+" + e)
    }
    return 0 > a && !g ? b.negPre + i + b.negSuf : b.posPre + i + b.posSuf
  }

  function vc(a, b, c, d) {
    var e = "";
    for ((0 > a || d && 0 >= a) && (d ? a = -a + 1 : (a = -a, e = "-")), a = "" + a; a.length < b;) a = Be + a;
    return c && (a = a.substr(a.length - b)), e + a
  }

  function wc(a, b, c, d, e) {
    return c = c || 0,
      function (f) {
        return f = f["get" + a](), (c > 0 || f > -c) && (f += c), 0 === f && -12 == c && (f = 12), vc(f, b, d, e)
      }
  }

  function xc(a, b, c) {
    return function (d, e) {
      var f = d["get" + a](),
        g = Xc((c ? "STANDALONE" : "") + (b ? "SHORT" : "") + a);
      return e[g][f]
    }
  }

  function yc(a) {
    var b = new Date(a, 0, 1).getDay();
    return new Date(a, 0, (4 >= b ? 5 : 12) - b)
  }

  function zc(a) {
    return function (b) {
      var c = yc(b.getFullYear());
      return b = +new Date(b.getFullYear(), b.getMonth(), b.getDate() + (4 - b.getDay())) - +c, b = 1 + Math.round(b / 6048e5), vc(b, a)
    }
  }

  function Ac(a, b) {
    return 0 >= a.getFullYear() ? b.ERAS[0] : b.ERAS[1]
  }

  function Bc(a) {
    function b(a) {
      var b;
      if (b = a.match(c)) {
        a = new Date(0);
        var d = 0,
          e = 0,
          f = b[8] ? a.setUTCFullYear : a.setFullYear,
          g = b[8] ? a.setUTCHours : a.setHours;
        b[9] && (d = k(b[9] + b[10]), e = k(b[9] + b[11])), f.call(a, k(b[1]), k(b[2]) - 1, k(b[3])), d = k(b[4] || 0) - d, e = k(b[5] || 0) - e, f = k(b[6] || 0), b = Math.round(1e3 * parseFloat("0." + (b[7] || 0))), g.call(a, d, e, f, b)
      }
      return a
    }
    var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (c, e, f) {
      var g, h, i = "",
        j = [];
      if (e = e || "mediumDate", e = a.DATETIME_FORMATS[e] || e, u(c) && (c = Ee.test(c) ? k(c) : b(c)), v(c) && (c = new Date(c)), !w(c) || !isFinite(c.getTime())) return c;
      for (; e;)(h = De.exec(e)) ? (j = K(j, h, 1), e = j.pop()) : (j.push(e), e = null);
      var l = c.getTimezoneOffset();
      return f && (l = P(f, l), c = Q(c, f, !0)), d(j, function (b) {
        g = Ce[b], i += g ? g(c, a.DATETIME_FORMATS, l) : "''" === b ? "'" : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
      }), i
    }
  }

  function Cc() {
    return function (a, b) {
      return q(b) && (b = 2), N(a, b)
    }
  }

  function Dc() {
    return function (a, b, c) {
      return b = 1 / 0 === Math.abs(Number(b)) ? Number(b) : k(b), isNaN(b) ? a : (v(a) && (a = a.toString()), ed(a) || u(a) ? (c = !c || isNaN(c) ? 0 : k(c), c = 0 > c ? Math.max(0, a.length + c) : c, b >= 0 ? a.slice(c, c + b) : 0 === c ? a.slice(b, a.length) : a.slice(Math.max(0, c + b), c)) : a)
    }
  }

  function Ec(a) {
    function d(b, c) {
      return c = c ? -1 : 1, b.map(function (b) {
        var d = 1,
          e = n;
        if (x(b)) e = b;
        else if (u(b) && ("+" != b.charAt(0) && "-" != b.charAt(0) || (d = "-" == b.charAt(0) ? -1 : 1, b = b.substring(1)), "" !== b && (e = a(b), e.constant))) var f = e(),
          e = function (a) {
            return a[f]
          };
        return {
          get: e,
          descending: d * c
        }
      })
    }

    function e(a) {
      switch (typeof a) {
      case "number":
      case "boolean":
      case "string":
        return !0;
      default:
        return !1
      }
    }
    return function (a, f, g) {
      if (null == a) return a;
      if (!c(a)) throw b("orderBy")("notarray", a);
      ed(f) || (f = [f]), 0 === f.length && (f = ["+"]);
      var h = d(f, g);
      return h.push({
        get: function () {
          return {}
        },
        descending: g ? -1 : 1
      }), a = Array.prototype.map.call(a, function (a, b) {
        return {
          value: a,
          predicateValues: h.map(function (c) {
            var d = c.get(a);
            return c = typeof d, null === d ? (c = "string", d = "null") : "string" === c ? d = d.toLowerCase() : "object" === c && ("function" == typeof d.valueOf && (d = d.valueOf(), e(d)) || p(d) && (d = d.toString(), e(d)) || (d = b)), {
              value: d,
              type: c
            }
          })
        }
      }), a.sort(function (a, b) {
        for (var c = 0, d = 0, e = h.length; e > d; ++d) {
          var c = a.predicateValues[d],
            f = b.predicateValues[d],
            g = 0;
          if (c.type === f.type ? c.value !== f.value && (g = c.value < f.value ? -1 : 1) : g = c.type < f.type ? -1 : 1, c = g * h[d].descending) break
        }
        return c
      }), a = a.map(function (a) {
        return a.value
      })
    }
  }

  function Fc(a) {
    return x(a) && (a = {
      link: a
    }), a.restrict = a.restrict || "AC", o(a)
  }

  function Gc(a, b, c, e, f) {
    var g = this,
      h = [];
    g.$error = {}, g.$$success = {}, g.$pending = void 0, g.$name = f(b.name || b.ngForm || "")(c), g.$dirty = !1, g.$pristine = !0, g.$valid = !0, g.$invalid = !1, g.$submitted = !1, g.$$parentForm = Je, g.$rollbackViewValue = function () {
      d(h, function (a) {
        a.$rollbackViewValue()
      })
    }, g.$commitViewValue = function () {
      d(h, function (a) {
        a.$commitViewValue()
      })
    }, g.$addControl = function (a) {
      ea(a.$name, "input"), h.push(a), a.$name && (g[a.$name] = a), a.$$parentForm = g
    }, g.$$renameControl = function (a, b) {
      var c = a.$name;
      g[c] === a && delete g[c], g[b] = a, a.$name = b
    }, g.$removeControl = function (a) {
      a.$name && g[a.$name] === a && delete g[a.$name], d(g.$pending, function (b, c) {
        g.$setValidity(c, null, a)
      }), d(g.$error, function (b, c) {
        g.$setValidity(c, null, a)
      }), d(g.$$success, function (b, c) {
        g.$setValidity(c, null, a)
      }), G(h, a), a.$$parentForm = Je
    }, Oc({
      ctrl: this,
      $element: a,
      set: function (a, b, c) {
        var d = a[b];
        d ? -1 === d.indexOf(c) && d.push(c) : a[b] = [c]
      },
      unset: function (a, b, c) {
        var d = a[b];
        d && (G(d, c), 0 === d.length && delete a[b])
      },
      $animate: e
    }), g.$setDirty = function () {
      e.removeClass(a, sf), e.addClass(a, tf), g.$dirty = !0, g.$pristine = !1, g.$$parentForm.$setDirty()
    }, g.$setPristine = function () {
      e.setClass(a, sf, tf + " ng-submitted"), g.$dirty = !1, g.$pristine = !0, g.$submitted = !1, d(h, function (a) {
        a.$setPristine()
      })
    }, g.$setUntouched = function () {
      d(h, function (a) {
        a.$setUntouched()
      })
    }, g.$setSubmitted = function () {
      e.addClass(a, "ng-submitted"), g.$submitted = !0, g.$$parentForm.$setSubmitted()
    }
  }

  function Hc(a) {
    a.$formatters.push(function (b) {
      return a.$isEmpty(b) ? b : b.toString()
    })
  }

  function Ic(a, b, c, d, e, f) {
    var g = Wc(b[0].type);
    if (!e.android) {
      var h = !1;
      b.on("compositionstart", function () {
        h = !0
      }), b.on("compositionend", function () {
        h = !1, j()
      })
    }
    var i, j = function (a) {
      if (i && (f.defer.cancel(i), i = null), !h) {
        var e = b.val();
        a = a && a.type, "password" === g || c.ngTrim && "false" === c.ngTrim || (e = gd(e)), (d.$viewValue !== e || "" === e && d.$$hasNativeValidators) && d.$setViewValue(e, a)
      }
    };
    if (e.hasEvent("input")) b.on("input", j);
    else {
      var k = function (a, b, c) {
        i || (i = f.defer(function () {
          i = null, b && b.value === c || j(a)
        }))
      };
      b.on("keydown", function (a) {
        var b = a.keyCode;
        91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || k(a, this, this.value)
      }), e.hasEvent("paste") && b.on("paste cut", k)
    }
    b.on("change", j), We[g] && d.$$hasNativeValidators && g === c.type && b.on("keydown wheel mousedown", function (a) {
      if (!i) {
        var b = this.validity,
          c = b.badInput,
          d = b.typeMismatch;
        i = f.defer(function () {
          i = null, b.badInput === c && b.typeMismatch === d || j(a)
        })
      }
    }), d.$render = function () {
      var a = d.$isEmpty(d.$viewValue) ? "" : d.$viewValue;
      b.val() !== a && b.val(a)
    }
  }

  function Jc(a, b) {
    return function (c, e) {
      var f, g;
      if (w(c)) return c;
      if (u(c)) {
        if ('"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1)), Ne.test(c)) return new Date(c);
        if (a.lastIndex = 0, f = a.exec(c)) return f.shift(), g = e ? {
          yyyy: e.getFullYear(),
          MM: e.getMonth() + 1,
          dd: e.getDate(),
          HH: e.getHours(),
          mm: e.getMinutes(),
          ss: e.getSeconds(),
          sss: e.getMilliseconds() / 1e3
        } : {
          yyyy: 1970,
          MM: 1,
          dd: 1,
          HH: 0,
          mm: 0,
          ss: 0,
          sss: 0
        }, d(f, function (a, c) {
          c < b.length && (g[b[c]] = +a)
        }), new Date(g.yyyy, g.MM - 1, g.dd, g.HH, g.mm, g.ss || 0, 1e3 * g.sss || 0)
      }
      return NaN
    }
  }

  function Kc(a, b, c, d) {
    return function (e, f, g, h, i, j, k) {
      function l(a) {
        return a && !(a.getTime && a.getTime() !== a.getTime())
      }

      function m(a) {
        return r(a) && !w(a) ? c(a) || void 0 : a
      }
      Lc(e, f, g, h), Ic(e, f, g, h, i, j);
      var n, o = h && h.$options && h.$options.timezone;
      if (h.$$parserName = a, h.$parsers.push(function (a) {
          return h.$isEmpty(a) ? null : b.test(a) ? (a = c(a, n), o && (a = Q(a, o)), a) : void 0
        }), h.$formatters.push(function (a) {
          if (a && !w(a)) throw vf("datefmt", a);
          return l(a) ? ((n = a) && o && (n = Q(n, o, !0)), k("date")(a, d, o)) : (n = null, "")
        }), r(g.min) || g.ngMin) {
        var p;
        h.$validators.min = function (a) {
          return !l(a) || q(p) || c(a) >= p
        }, g.$observe("min", function (a) {
          p = m(a), h.$validate()
        })
      }
      if (r(g.max) || g.ngMax) {
        var s;
        h.$validators.max = function (a) {
          return !l(a) || q(s) || c(a) <= s
        }, g.$observe("max", function (a) {
          s = m(a), h.$validate()
        })
      }
    }
  }

  function Lc(a, b, c, d) {
    (d.$$hasNativeValidators = s(b[0].validity)) && d.$parsers.push(function (a) {
      var c = b.prop("validity") || {};
      return c.badInput || c.typeMismatch ? void 0 : a
    })
  }

  function Mc(a, b, c, d, e) {
    if (r(d)) {
      if (a = a(d), !a.constant) throw vf("constexpr", c, d);
      return a(b)
    }
    return e
  }

  function Nc(a, b) {
    return a = "ngClass" + a, ["$animate", function (c) {
      function e(a, b) {
        var c = [],
          d = 0;
        a: for (; d < a.length; d++) {
          for (var e = a[d], f = 0; f < b.length; f++)
            if (e == b[f]) continue a;
          c.push(e)
        }
        return c
      }

      function f(a) {
        var b = [];
        return ed(a) ? (d(a, function (a) {
          b = b.concat(f(a))
        }), b) : u(a) ? a.split(" ") : s(a) ? (d(a, function (a, c) {
          a && (b = b.concat(c.split(" ")))
        }), b) : a
      }
      return {
        restrict: "AC",
        link: function (g, h, i) {
          function j(a) {
            a = k(a, 1), i.$addClass(a)
          }

          function k(a, b) {
            var c = h.data("$classCounts") || ha(),
              e = [];
            return d(a, function (a) {
              (b > 0 || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(b > 0) && e.push(a))
            }), h.data("$classCounts", c), e.join(" ")
          }

          function l(a, b) {
            var d = e(b, a),
              f = e(a, b),
              d = k(d, 1),
              f = k(f, -1);
            d && d.length && c.addClass(h, d), f && f.length && c.removeClass(h, f)
          }

          function m(a) {
            if (!0 === b || (1 & g.$index) === b) {
              var c = f(a || []);
              if (n) {
                if (!J(a, n)) {
                  var d = f(n);
                  l(d, c)
                }
              } else j(c)
            }
            n = ed(a) ? a.map(function (a) {
              return I(a)
            }) : I(a)
          }
          var n;
          g.$watch(i[a], m, !0), i.$observe("class", function (b) {
            m(g.$eval(i[a]))
          }), "ngClass" !== a && g.$watch("$index", function (c, d) {
            var e = 1 & c;
            if (e !== (1 & d)) {
              var h = f(g.$eval(i[a]));
              e === b ? j(h) : (e = k(h, -1), i.$removeClass(e))
            }
          })
        }
      }
    }]
  }

  function Oc(a) {
    function b(a, b) {
      b && !f[a] ? (i.addClass(e, a), f[a] = !0) : !b && f[a] && (i.removeClass(e, a), f[a] = !1)
    }

    function c(a, c) {
      a = a ? "-" + aa(a, "-") : "", b(qf + a, !0 === c), b(rf + a, !1 === c)
    }
    var d = a.ctrl,
      e = a.$element,
      f = {},
      g = a.set,
      h = a.unset,
      i = a.$animate;
    f[rf] = !(f[qf] = e.hasClass(qf)), d.$setValidity = function (a, e, f) {
      q(e) ? (d.$pending || (d.$pending = {}), g(d.$pending, a, f)) : (d.$pending && h(d.$pending, a, f), Pc(d.$pending) && (d.$pending = void 0)), B(e) ? e ? (h(d.$error, a, f), g(d.$$success, a, f)) : (g(d.$error, a, f), h(d.$$success, a, f)) : (h(d.$error, a, f), h(d.$$success, a, f)), d.$pending ? (b(uf, !0), d.$valid = d.$invalid = void 0, c("", null)) : (b(uf, !1), d.$valid = Pc(d.$error), d.$invalid = !d.$valid, c("", d.$valid)), e = d.$pending && d.$pending[a] ? void 0 : d.$error[a] ? !1 : d.$$success[a] ? !0 : null, c(a, e), d.$$parentForm.$setValidity(a, e, d)
    }
  }

  function Pc(a) {
    if (a)
      for (var b in a)
        if (a.hasOwnProperty(b)) return !1;
    return !0
  }
  var Qc, Rc, Sc, Tc, Uc = /^\/(.+)\/([a-z]*)$/,
    Vc = Object.prototype.hasOwnProperty,
    Wc = function (a) {
      return u(a) ? a.toLowerCase() : a
    },
    Xc = function (a) {
      return u(a) ? a.toUpperCase() : a
    },
    Yc = [].slice,
    Zc = [].splice,
    $c = [].push,
    _c = Object.prototype.toString,
    ad = Object.getPrototypeOf,
    bd = b("ng"),
    cd = a.angular || (a.angular = {}),
    dd = 0;
  Qc = a.document.documentMode, m.$inject = [], n.$inject = [];
  var ed = Array.isArray,
    fd = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,
    gd = function (a) {
      return u(a) ? a.trim() : a
    },
    hd = function (a) {
      return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    },
    id = function () {
      if (!r(id.rules)) {
        var b = a.document.querySelector("[ng-csp]") || a.document.querySelector("[data-ng-csp]");
        if (b) {
          var c = b.getAttribute("ng-csp") || b.getAttribute("data-ng-csp");
          id.rules = {
            noUnsafeEval: !c || -1 !== c.indexOf("no-unsafe-eval"),
            noInlineStyle: !c || -1 !== c.indexOf("no-inline-style")
          }
        } else {
          b = id;
          try {
            new Function(""), c = !1
          } catch (d) {
            c = !0
          }
          b.rules = {
            noUnsafeEval: c,
            noInlineStyle: !1
          }
        }
      }
      return id.rules
    },
    jd = function () {
      if (r(jd.name_)) return jd.name_;
      var b, c, d, e, f = ld.length;
      for (c = 0; f > c; ++c)
        if (d = ld[c], b = a.document.querySelector("[" + d.replace(":", "\\:") + "jq]")) {
          e = b.getAttribute(d + "jq");
          break
        }
      return jd.name_ = e
    },
    kd = /:/g,
    ld = ["ng-", "data-ng-", "ng:", "x-ng-"],
    md = /[A-Z]/g,
    nd = !1,
    od = 3,
    pd = {
      full: "1.5.6",
      major: 1,
      minor: 5,
      dot: 6,
      codeName: "arrow-stringification"
    };
  oa.expando = "ng339";
  var qd = oa.cache = {},
    rd = 1;
  oa._data = function (a) {
    return this.cache[a[this.expando]] || {}
  };
  var sd = /([\:\-\_]+(.))/g,
    td = /^moz([A-Z])/,
    ud = {
      mouseleave: "mouseout",
      mouseenter: "mouseover"
    },
    vd = b("jqLite"),
    wd = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
    xd = /<|&#?\w+;/,
    yd = /<([\w:-]+)/,
    zd = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    Ad = {
      option: [1, '<select multiple="multiple">', "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
  Ad.optgroup = Ad.option, Ad.tbody = Ad.tfoot = Ad.colgroup = Ad.caption = Ad.thead, Ad.th = Ad.td;
  var Bd = a.Node.prototype.contains || function (a) {
      return !!(16 & this.compareDocumentPosition(a))
    },
    Cd = oa.prototype = {
      ready: function (b) {
        function c() {
          d || (d = !0, b())
        }
        var d = !1;
        "complete" === a.document.readyState ? a.setTimeout(c) : (this.on("DOMContentLoaded", c), oa(a).on("load", c))
      },
      toString: function () {
        var a = [];
        return d(this, function (b) {
          a.push("" + b)
        }), "[" + a.join(", ") + "]"
      },
      eq: function (a) {
        return Rc(a >= 0 ? this[a] : this[this.length + a])
      },
      length: 0,
      push: $c,
      sort: [].sort,
      splice: [].splice
    },
    Dd = {};
  d("multiple selected checked disabled readOnly required open".split(" "), function (a) {
    Dd[Wc(a)] = a
  });
  var Ed = {};
  d("input select option textarea button form details".split(" "), function (a) {
    Ed[a] = !0
  });
  var Fd = {
    ngMinlength: "minlength",
    ngMaxlength: "maxlength",
    ngMin: "min",
    ngMax: "max",
    ngPattern: "pattern"
  };
  d({
    data: ua,
    removeData: sa,
    hasData: function (a) {
      for (var b in qd[a.ng339]) return !0;
      return !1
    },
    cleanData: function (a) {
      for (var b = 0, c = a.length; c > b; b++) sa(a[b])
    }
  }, function (a, b) {
    oa[b] = a
  }), d({
    data: ua,
    inheritedData: Aa,
    scope: function (a) {
      return Rc.data(a, "$scope") || Aa(a.parentNode || a, ["$isolateScope", "$scope"])
    },
    isolateScope: function (a) {
      return Rc.data(a, "$isolateScope") || Rc.data(a, "$isolateScopeNoTemplate")
    },
    controller: za,
    injector: function (a) {
      return Aa(a, "$injector")
    },
    removeAttr: function (a, b) {
      a.removeAttribute(b)
    },
    hasClass: va,
    css: function (a, b, c) {
      return b = ka(b), r(c) ? void(a.style[b] = c) : a.style[b]
    },
    attr: function (a, b, c) {
      var d = a.nodeType;
      if (d !== od && 2 !== d && 8 !== d)
        if (d = Wc(b), Dd[d]) {
          if (!r(c)) return a[b] || (a.attributes.getNamedItem(b) || m).specified ? d : void 0;
          c ? (a[b] = !0, a.setAttribute(b, d)) : (a[b] = !1, a.removeAttribute(d))
        } else if (r(c)) a.setAttribute(b, c);
      else if (a.getAttribute) return a = a.getAttribute(b, 2), null === a ? void 0 : a
    },
    prop: function (a, b, c) {
      return r(c) ? void(a[b] = c) : a[b]
    },
    text: function () {
      function a(a, b) {
        if (q(b)) {
          var c = a.nodeType;
          return 1 === c || c === od ? a.textContent : ""
        }
        a.textContent = b
      }
      return a.$dv = "", a
    }(),
    val: function (a, b) {
      if (q(b)) {
        if (a.multiple && "select" === F(a)) {
          var c = [];
          return d(a.options, function (a) {
            a.selected && c.push(a.value || a.text)
          }), 0 === c.length ? null : c
        }
        return a.value
      }
      a.value = b
    },
    html: function (a, b) {
      return q(b) ? a.innerHTML : (qa(a, !0), void(a.innerHTML = b))
    },
    empty: Ba
  }, function (a, b) {
    oa.prototype[b] = function (b, c) {
      var d, e, f = this.length;
      if (a !== Ba && q(2 == a.length && a !== va && a !== za ? b : c)) {
        if (s(b)) {
          for (d = 0; f > d; d++)
            if (a === ua) a(this[d], b);
            else
              for (e in b) a(this[d], e, b[e]);
          return this
        }
        for (d = a.$dv, f = q(d) ? Math.min(f, 1) : f, e = 0; f > e; e++) {
          var g = a(this[e], b, c);
          d = d ? d + g : g
        }
        return d
      }
      for (d = 0; f > d; d++) a(this[d], b, c);
      return this
    }
  }), d({
    removeData: sa,
    on: function (a, b, c, d) {
      if (r(d)) throw vd("onargs");
      if (la(a)) {
        d = ta(a, !0);
        var e = d.events,
          f = d.handle;
        f || (f = d.handle = Fa(a, e)), d = 0 <= b.indexOf(" ") ? b.split(" ") : [b];
        for (var g = d.length, h = function (b, d, g) {
            var h = e[b];
            h || (h = e[b] = [], h.specialHandlerWrapper = d, "$destroy" === b || g || a.addEventListener(b, f, !1)), h.push(c)
          }; g--;) b = d[g], ud[b] ? (h(ud[b], Ha), h(b, void 0, !0)) : h(b)
      }
    },
    off: ra,
    one: function (a, b, c) {
      a = Rc(a), a.on(b, function d() {
        a.off(b, c), a.off(b, d)
      }), a.on(b, c)
    },
    replaceWith: function (a, b) {
      var c, e = a.parentNode;
      qa(a), d(new oa(b), function (b) {
        c ? e.insertBefore(b, c.nextSibling) : e.replaceChild(b, a), c = b
      })
    },
    children: function (a) {
      var b = [];
      return d(a.childNodes, function (a) {
        1 === a.nodeType && b.push(a)
      }), b
    },
    contents: function (a) {
      return a.contentDocument || a.childNodes || []
    },
    append: function (a, b) {
      var c = a.nodeType;
      if (1 === c || 11 === c) {
        b = new oa(b);
        for (var c = 0, d = b.length; d > c; c++) a.appendChild(b[c])
      }
    },
    prepend: function (a, b) {
      if (1 === a.nodeType) {
        var c = a.firstChild;
        d(new oa(b), function (b) {
          a.insertBefore(b, c)
        })
      }
    },
    wrap: function (a, b) {
      na(a, Rc(b).eq(0).clone()[0])
    },
    remove: Ca,
    detach: function (a) {
      Ca(a, !0)
    },
    after: function (a, b) {
      var c = a,
        d = a.parentNode;
      b = new oa(b);
      for (var e = 0, f = b.length; f > e; e++) {
        var g = b[e];
        d.insertBefore(g, c.nextSibling), c = g
      }
    },
    addClass: xa,
    removeClass: wa,
    toggleClass: function (a, b, c) {
      b && d(b.split(" "), function (b) {
        var d = c;
        q(d) && (d = !va(a, b)), (d ? xa : wa)(a, b)
      })
    },
    parent: function (a) {
      return (a = a.parentNode) && 11 !== a.nodeType ? a : null
    },
    next: function (a) {
      return a.nextElementSibling
    },
    find: function (a, b) {
      return a.getElementsByTagName ? a.getElementsByTagName(b) : []
    },
    clone: pa,
    triggerHandler: function (a, b, c) {
      var e, f, g = b.type || b,
        h = ta(a);
      (h = (h = h && h.events) && h[g]) && (e = {
        preventDefault: function () {
          this.defaultPrevented = !0
        },
        isDefaultPrevented: function () {
          return !0 === this.defaultPrevented
        },
        stopImmediatePropagation: function () {
          this.immediatePropagationStopped = !0
        },
        isImmediatePropagationStopped: function () {
          return !0 === this.immediatePropagationStopped
        },
        stopPropagation: m,
        type: g,
        target: a
      }, b.type && (e = i(e, b)), b = I(h), f = c ? [e].concat(c) : [e], d(b, function (b) {
        e.isImmediatePropagationStopped() || b.apply(a, f)
      }))
    }
  }, function (a, b) {
    oa.prototype[b] = function (b, c, d) {
      for (var e, f = 0, g = this.length; g > f; f++) q(e) ? (e = a(this[f], b, c, d), r(e) && (e = Rc(e))) : ya(e, a(this[f], b, c, d));
      return r(e) ? e : this
    }, oa.prototype.bind = oa.prototype.on, oa.prototype.unbind = oa.prototype.off
  }), Ka.prototype = {
    put: function (a, b) {
      this[Ja(a, this.nextUid)] = b
    },
    get: function (a) {
      return this[Ja(a, this.nextUid)]
    },
    remove: function (a) {
      var b = this[a = Ja(a, this.nextUid)];
      return delete this[a], b
    }
  };
  var Gd = [function () {
      this.$get = [function () {
        return Ka
      }]
    }],
    Hd = /^([^\(]+?)=>/,
    Id = /^[^\(]*\(\s*([^\)]*)\)/m,
    Jd = /,/,
    Kd = /^\s*(_?)(\S+?)\1\s*$/,
    Ld = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
    Md = b("$injector");
  Na.$$annotate = function (a, b, c) {
    var e;
    if ("function" == typeof a) {
      if (!(e = a.$inject)) {
        if (e = [], a.length) {
          if (b) throw u(c) && c || (c = a.name || Ma(a)), Md("strictdi", c);
          b = La(a), d(b[1].split(Jd), function (a) {
            a.replace(Kd, function (a, b, c) {
              e.push(c)
            })
          })
        }
        a.$inject = e
      }
    } else ed(a) ? (b = a.length - 1, da(a[b], "fn"), e = a.slice(0, b)) : da(a, "fn", !0);
    return e
  };
  var Nd = b("$animate"),
    Od = function () {
      this.$get = m
    },
    Pd = function () {
      var a = new Ka,
        b = [];
      this.$get = ["$$AnimateRunner", "$rootScope", function (c, e) {
        function f(a, b, c) {
          var e = !1;
          return b && (b = u(b) ? b.split(" ") : ed(b) ? b : [], d(b, function (b) {
            b && (e = !0, a[b] = c)
          })), e
        }

        function g() {
          d(b, function (b) {
            var c = a.get(b);
            if (c) {
              var e = Qa(b.attr("class")),
                f = "",
                g = "";
              d(c, function (a, b) {
                a !== !!e[b] && (a ? f += (f.length ? " " : "") + b : g += (g.length ? " " : "") + b)
              }), d(b, function (a) {
                f && xa(a, f), g && wa(a, g)
              }), a.remove(b)
            }
          }), b.length = 0
        }
        return {
          enabled: m,
          on: m,
          off: m,
          pin: m,
          push: function (d, h, i, j) {
            return j && j(), i = i || {}, i.from && d.css(i.from), i.to && d.css(i.to), (i.addClass || i.removeClass) && (h = i.addClass, j = i.removeClass, i = a.get(d) || {}, h = f(i, h, !0), j = f(i, j, !1), (h || j) && (a.put(d, i), b.push(d), 1 === b.length && e.$$postDigest(g))), d = new c, d.complete(), d
          }
        }
      }]
    },
    Qd = ["$provide", function (a) {
      var b = this;
      this.$$registeredAnimations = Object.create(null), this.register = function (c, d) {
        if (c && "." !== c.charAt(0)) throw Nd("notcsel", c);
        var e = c + "-animation";
        b.$$registeredAnimations[c.substr(1)] = e, a.factory(e, d)
      }, this.classNameFilter = function (a) {
        if (1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null) && /(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString())) throw Nd("nongcls", "ng-animate");
        return this.$$classNameFilter
      }, this.$get = ["$$animateQueue", function (a) {
        function b(a, b, c) {
          if (c) {
            var d;
            a: {
              for (d = 0; d < c.length; d++) {
                var e = c[d];
                if (1 === e.nodeType) {
                  d = e;
                  break a
                }
              }
              d = void 0
            }!d || d.parentNode || d.previousElementSibling || (c = null)
          }
          c ? c.after(a) : b.prepend(a)
        }
        return {
          on: a.on,
          off: a.off,
          pin: a.pin,
          enabled: a.enabled,
          cancel: function (a) {
            a.end && a.end()
          },
          enter: function (c, d, e, f) {
            return d = d && Rc(d), e = e && Rc(e), d = d || e.parent(), b(c, d, e), a.push(c, "enter", Ra(f))
          },
          move: function (c, d, e, f) {
            return d = d && Rc(d), e = e && Rc(e), d = d || e.parent(), b(c, d, e), a.push(c, "move", Ra(f))
          },
          leave: function (b, c) {
            return a.push(b, "leave", Ra(c), function () {
              b.remove()
            })
          },
          addClass: function (b, c, d) {
            return d = Ra(d), d.addClass = Pa(d.addclass, c), a.push(b, "addClass", d)
          },
          removeClass: function (b, c, d) {
            return d = Ra(d), d.removeClass = Pa(d.removeClass, c), a.push(b, "removeClass", d)
          },
          setClass: function (b, c, d, e) {
            return e = Ra(e), e.addClass = Pa(e.addClass, c), e.removeClass = Pa(e.removeClass, d), a.push(b, "setClass", e)
          },
          animate: function (b, c, d, e, f) {
            return f = Ra(f), f.from = f.from ? i(f.from, c) : c, f.to = f.to ? i(f.to, d) : d, f.tempClasses = Pa(f.tempClasses, e || "ng-inline-animate"), a.push(b, "animate", f)
          }
        }
      }]
    }],
    Rd = function () {
      this.$get = ["$$rAF", function (a) {
        function b(b) {
          c.push(b), 1 < c.length || a(function () {
            for (var a = 0; a < c.length; a++) c[a]();
            c = []
          })
        }
        var c = [];
        return function () {
          var a = !1;
          return b(function () {
              a = !0
            }),
            function (c) {
              a ? c() : b(c)
            }
        }
      }]
    },
    Sd = function () {
      this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function (a, b, c, e, f) {
        function g(a) {
          this.setHost(a);
          var b = c();
          this._doneCallbacks = [], this._tick = function (a) {
            var c = e[0];
            c && c.hidden ? f(a, 0, !1) : b(a)
          }, this._state = 0
        }
        return g.chain = function (a, b) {
          function c() {
            d === a.length ? b(!0) : a[d](function (a) {
              !1 === a ? b(!1) : (d++, c())
            })
          }
          var d = 0;
          c()
        }, g.all = function (a, b) {
          function c(c) {
            f = f && c, ++e === a.length && b(f)
          }
          var e = 0,
            f = !0;
          d(a, function (a) {
            a.done(c)
          })
        }, g.prototype = {
          setHost: function (a) {
            this.host = a || {}
          },
          done: function (a) {
            2 === this._state ? a() : this._doneCallbacks.push(a)
          },
          progress: m,
          getPromise: function () {
            if (!this.promise) {
              var b = this;
              this.promise = a(function (a, c) {
                b.done(function (b) {
                  !1 === b ? c() : a()
                })
              })
            }
            return this.promise
          },
          then: function (a, b) {
            return this.getPromise().then(a, b)
          },
          "catch": function (a) {
            return this.getPromise()["catch"](a)
          },
          "finally": function (a) {
            return this.getPromise()["finally"](a)
          },
          pause: function () {
            this.host.pause && this.host.pause()
          },
          resume: function () {
            this.host.resume && this.host.resume()
          },
          end: function () {
            this.host.end && this.host.end(), this._resolve(!0)
          },
          cancel: function () {
            this.host.cancel && this.host.cancel(), this._resolve(!1)
          },
          complete: function (a) {
            var b = this;
            0 === b._state && (b._state = 1, b._tick(function () {
              b._resolve(a)
            }))
          },
          _resolve: function (a) {
            2 !== this._state && (d(this._doneCallbacks, function (b) {
              b(a)
            }), this._doneCallbacks.length = 0, this._state = 2)
          }
        }, g
      }]
    },
    Td = function () {
      this.$get = ["$$rAF", "$q", "$$AnimateRunner", function (a, b, c) {
        return function (b, d) {
          function e() {
            return a(function () {
              f.addClass && (b.addClass(f.addClass), f.addClass = null), f.removeClass && (b.removeClass(f.removeClass), f.removeClass = null), f.to && (b.css(f.to), f.to = null), g || h.complete(), g = !0
            }), h
          }
          var f = d || {};
          f.$$prepared || (f = H(f)), f.cleanupStyles && (f.from = f.to = null), f.from && (b.css(f.from), f.from = null);
          var g, h = new c;
          return {
            start: e,
            end: e
          }
        }
      }]
    },
    Ud = b("$compile"),
    Vd = new function () {};
  Wa.$inject = ["$provide", "$$sanitizeUriProvider"], Xa.prototype.isFirstChange = function () {
    return this.previousValue === Vd
  };
  var Wd = /^((?:x|data)[\:\-_])/i,
    Xd = b("$controller"),
    Yd = /^(\S+)(\s+as\s+([\w$]+))?$/,
    Zd = function () {
      this.$get = ["$document", function (a) {
        return function (b) {
          return b ? !b.nodeType && b instanceof Rc && (b = b[0]) : b = a[0].body, b.offsetWidth + 1
        }
      }]
    },
    $d = "application/json",
    _d = {
      "Content-Type": $d + ";charset=utf-8"
    },
    ae = /^\[|^\{(?!\{)/,
    be = {
      "[": /]$/,
      "{": /}$/
    },
    ce = /^\)\]\}',?\n/,
    de = b("$http"),
    ee = function (a) {
      return function () {
        throw de("legacy", a)
      }
    },
    fe = cd.$interpolateMinErr = b("$interpolate");
  fe.throwNoconcat = function (a) {
    throw fe("noconcat", a)
  }, fe.interr = function (a, b) {
    return fe("interr", a, b.toString())
  };
  var ge = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
    he = {
      http: 80,
      https: 443,
      ftp: 21
    },
    ie = b("$location"),
    je = {
      $$html5: !1,
      $$replace: !1,
      absUrl: zb("$$absUrl"),
      url: function (a) {
        if (q(a)) return this.$$url;
        var b = ge.exec(a);
        return (b[1] || "" === a) && this.path(decodeURIComponent(b[1])), (b[2] || b[1] || "" === a) && this.search(b[3] || ""), this.hash(b[5] || ""), this
      },
      protocol: zb("$$protocol"),
      host: zb("$$host"),
      port: zb("$$port"),
      path: Ab("$$path", function (a) {
        return a = null !== a ? a.toString() : "", "/" == a.charAt(0) ? a : "/" + a
      }),
      search: function (a, b) {
        switch (arguments.length) {
        case 0:
          return this.$$search;
        case 1:
          if (u(a) || v(a)) a = a.toString(), this.$$search = T(a);
          else {
            if (!s(a)) throw ie("isrcharg");
            a = H(a, {}), d(a, function (b, c) {
              null == b && delete a[c]
            }), this.$$search = a
          }
          break;
        default:
          q(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b
        }
        return this.$$compose(), this
      },
      hash: Ab("$$hash", function (a) {
        return null !== a ? a.toString() : ""
      }),
      replace: function () {
        return this.$$replace = !0, this
      }
    };
  d([yb, xb, wb], function (a) {
    a.prototype = Object.create(je), a.prototype.state = function (b) {
      if (!arguments.length) return this.$$state;
      if (a !== wb || !this.$$html5) throw ie("nostate");
      return this.$$state = q(b) ? null : b, this
    }
  });
  var ke = b("$parse"),
    le = Function.prototype.call,
    me = Function.prototype.apply,
    ne = Function.prototype.bind,
    oe = ha();
  d("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (a) {
    oe[a] = !0
  });
  var pe = {
      n: "\n",
      f: "\f",
      r: "\r",
      t: "	",
      v: "\x0B",
      "'": "'",
      '"': '"'
    },
    qe = function (a) {
      this.options = a
    };
  qe.prototype = {
    constructor: qe,
    lex: function (a) {
      for (this.text = a, this.index = 0, this.tokens = []; this.index < this.text.length;)
        if (a = this.text.charAt(this.index), '"' === a || "'" === a) this.readString(a);
        else if (this.isNumber(a) || "." === a && this.isNumber(this.peek())) this.readNumber();
      else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent();
      else if (this.is(a, "(){}[].,;:?")) this.tokens.push({
        index: this.index,
        text: a
      }), this.index++;
      else if (this.isWhitespace(a)) this.index++;
      else {
        var b = a + this.peek(),
          c = b + this.peek(2),
          d = oe[b],
          e = oe[c];
        oe[a] || d || e ? (a = e ? c : d ? b : a, this.tokens.push({
          index: this.index,
          text: a,
          operator: !0
        }), this.index += a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1)
      }
      return this.tokens
    },
    is: function (a, b) {
      return -1 !== b.indexOf(a)
    },
    peek: function (a) {
      return a = a || 1, this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1
    },
    isNumber: function (a) {
      return a >= "0" && "9" >= a && "string" == typeof a
    },
    isWhitespace: function (a) {
      return " " === a || "\r" === a || "	" === a || "\n" === a || "\x0B" === a || " " === a
    },
    isIdentifierStart: function (a) {
      return this.options.isIdentifierStart ? this.options.isIdentifierStart(a, this.codePointAt(a)) : this.isValidIdentifierStart(a)
    },
    isValidIdentifierStart: function (a) {
      return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
    },
    isIdentifierContinue: function (a) {
      return this.options.isIdentifierContinue ? this.options.isIdentifierContinue(a, this.codePointAt(a)) : this.isValidIdentifierContinue(a)
    },
    isValidIdentifierContinue: function (a, b) {
      return this.isValidIdentifierStart(a, b) || this.isNumber(a)
    },
    codePointAt: function (a) {
      return 1 === a.length ? a.charCodeAt(0) : (a.charCodeAt(0) << 10) + a.charCodeAt(1) - 56613888
    },
    peekMultichar: function () {
      var a = this.text.charAt(this.index),
        b = this.peek();
      if (!b) return a;
      var c = a.charCodeAt(0),
        d = b.charCodeAt(0);
      return c >= 55296 && 56319 >= c && d >= 56320 && 57343 >= d ? a + b : a
    },
    isExpOperator: function (a) {
      return "-" === a || "+" === a || this.isNumber(a)
    },
    throwError: function (a, b, c) {
      throw c = c || this.index, b = r(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c, ke("lexerr", a, b, this.text)
    },
    readNumber: function () {
      for (var a = "", b = this.index; this.index < this.text.length;) {
        var c = Wc(this.text.charAt(this.index));
        if ("." == c || this.isNumber(c)) a += c;
        else {
          var d = this.peek();
          if ("e" == c && this.isExpOperator(d)) a += c;
          else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1)) a += c;
          else {
            if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1)) break;
            this.throwError("Invalid exponent")
          }
        }
        this.index++
      }
      this.tokens.push({
        index: b,
        text: a,
        constant: !0,
        value: Number(a)
      })
    },
    readIdent: function () {
      var a = this.index;
      for (this.index += this.peekMultichar().length; this.index < this.text.length;) {
        var b = this.peekMultichar();
        if (!this.isIdentifierContinue(b)) break;
        this.index += b.length
      }
      this.tokens.push({
        index: a,
        text: this.text.slice(a, this.index),
        identifier: !0
      })
    },
    readString: function (a) {
      var b = this.index;
      this.index++;
      for (var c = "", d = a, e = !1; this.index < this.text.length;) {
        var f = this.text.charAt(this.index),
          d = d + f;
        if (e) "u" === f ? (e = this.text.substring(this.index + 1, this.index + 5), e.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + e + "]"), this.index += 4, c += String.fromCharCode(parseInt(e, 16))) : c += pe[f] || f, e = !1;
        else if ("\\" === f) e = !0;
        else {
          if (f === a) return this.index++, void this.tokens.push({
            index: b,
            text: d,
            constant: !0,
            value: c
          });
          c += f
        }
        this.index++
      }
      this.throwError("Unterminated quote", b)
    }
  };
  var re = function (a, b) {
    this.lexer = a, this.options = b
  };
  re.Program = "Program", re.ExpressionStatement = "ExpressionStatement", re.AssignmentExpression = "AssignmentExpression", re.ConditionalExpression = "ConditionalExpression", re.LogicalExpression = "LogicalExpression", re.BinaryExpression = "BinaryExpression", re.UnaryExpression = "UnaryExpression", re.CallExpression = "CallExpression", re.MemberExpression = "MemberExpression", re.Identifier = "Identifier", re.Literal = "Literal", re.ArrayExpression = "ArrayExpression", re.Property = "Property", re.ObjectExpression = "ObjectExpression", re.ThisExpression = "ThisExpression", re.LocalsExpression = "LocalsExpression", re.NGValueParameter = "NGValueParameter", re.prototype = {
    ast: function (a) {
      return this.text = a, this.tokens = this.lexer.lex(a), a = this.program(), 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), a
    },
    program: function () {
      for (var a = [];;)
        if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.expressionStatement()), !this.expect(";")) return {
          type: re.Program,
          body: a
        }
    },
    expressionStatement: function () {
      return {
        type: re.ExpressionStatement,
        expression: this.filterChain()
      }
    },
    filterChain: function () {
      for (var a = this.expression(); this.expect("|");) a = this.filter(a);
      return a
    },
    expression: function () {
      return this.assignment()
    },
    assignment: function () {
      var a = this.ternary();
      return this.expect("=") && (a = {
        type: re.AssignmentExpression,
        left: a,
        right: this.assignment(),
        operator: "="
      }), a
    },
    ternary: function () {
      var a, b, c = this.logicalOR();
      return this.expect("?") && (a = this.expression(), this.consume(":")) ? (b = this.expression(), {
        type: re.ConditionalExpression,
        test: c,
        alternate: a,
        consequent: b
      }) : c
    },
    logicalOR: function () {
      for (var a = this.logicalAND(); this.expect("||");) a = {
        type: re.LogicalExpression,
        operator: "||",
        left: a,
        right: this.logicalAND()
      };
      return a
    },
    logicalAND: function () {
      for (var a = this.equality(); this.expect("&&");) a = {
        type: re.LogicalExpression,
        operator: "&&",
        left: a,
        right: this.equality()
      };
      return a
    },
    equality: function () {
      for (var a, b = this.relational(); a = this.expect("==", "!=", "===", "!==");) b = {
        type: re.BinaryExpression,
        operator: a.text,
        left: b,
        right: this.relational()
      };
      return b
    },
    relational: function () {
      for (var a, b = this.additive(); a = this.expect("<", ">", "<=", ">=");) b = {
        type: re.BinaryExpression,
        operator: a.text,
        left: b,
        right: this.additive()
      };
      return b
    },
    additive: function () {
      for (var a, b = this.multiplicative(); a = this.expect("+", "-");) b = {
        type: re.BinaryExpression,
        operator: a.text,
        left: b,
        right: this.multiplicative()
      };
      return b
    },
    multiplicative: function () {
      for (var a, b = this.unary(); a = this.expect("*", "/", "%");) b = {
        type: re.BinaryExpression,
        operator: a.text,
        left: b,
        right: this.unary()
      };
      return b
    },
    unary: function () {
      var a;
      return (a = this.expect("+", "-", "!")) ? {
        type: re.UnaryExpression,
        operator: a.text,
        prefix: !0,
        argument: this.unary()
      } : this.primary()
    },
    primary: function () {
      var a;
      this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? a = H(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? a = {
        type: re.Literal,
        value: this.options.literals[this.consume().text]
      } : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());
      for (var b; b = this.expect("(", "[", ".");) "(" === b.text ? (a = {
        type: re.CallExpression,
        callee: a,
        arguments: this.parseArguments()
      }, this.consume(")")) : "[" === b.text ? (a = {
        type: re.MemberExpression,
        object: a,
        property: this.expression(),
        computed: !0
      }, this.consume("]")) : "." === b.text ? a = {
        type: re.MemberExpression,
        object: a,
        property: this.identifier(),
        computed: !1
      } : this.throwError("IMPOSSIBLE");
      return a
    },
    filter: function (a) {
      a = [a];
      for (var b = {
          type: re.CallExpression,
          callee: this.identifier(),
          arguments: a,
          filter: !0
        }; this.expect(":");) a.push(this.expression());
      return b
    },
    parseArguments: function () {
      var a = [];
      if (")" !== this.peekToken().text)
        do a.push(this.expression()); while (this.expect(","));
      return a
    },
    identifier: function () {
      var a = this.consume();
      return a.identifier || this.throwError("is not a valid identifier", a), {
        type: re.Identifier,
        name: a.text
      }
    },
    constant: function () {
      return {
        type: re.Literal,
        value: this.consume().value
      }
    },
    arrayDeclaration: function () {
      var a = [];
      if ("]" !== this.peekToken().text)
        do {
          if (this.peek("]")) break;
          a.push(this.expression())
        } while (this.expect(","));
      return this.consume("]"), {
        type: re.ArrayExpression,
        elements: a
      }
    },
    object: function () {
      var a, b = [];
      if ("}" !== this.peekToken().text)
        do {
          if (this.peek("}")) break;
          a = {
            type: re.Property,
            kind: "init"
          }, this.peek().constant ? (a.key = this.constant(), a.computed = !1, this.consume(":"), a.value = this.expression()) : this.peek().identifier ? (a.key = this.identifier(), a.computed = !1, this.peek(":") ? (this.consume(":"), a.value = this.expression()) : a.value = a.key) : this.peek("[") ? (this.consume("["), a.key = this.expression(), this.consume("]"), a.computed = !0, this.consume(":"), a.value = this.expression()) : this.throwError("invalid key", this.peek()), b.push(a)
        } while (this.expect(","));
      return this.consume("}"), {
        type: re.ObjectExpression,
        properties: b
      }
    },
    throwError: function (a, b) {
      throw ke("syntax", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
    },
    consume: function (a) {
      if (0 === this.tokens.length) throw ke("ueoe", this.text);
      var b = this.expect(a);
      return b || this.throwError("is unexpected, expecting [" + a + "]", this.peek()), b
    },
    peekToken: function () {
      if (0 === this.tokens.length) throw ke("ueoe", this.text);
      return this.tokens[0]
    },
    peek: function (a, b, c, d) {
      return this.peekAhead(0, a, b, c, d)
    },
    peekAhead: function (a, b, c, d, e) {
      if (this.tokens.length > a) {
        a = this.tokens[a];
        var f = a.text;
        if (f === b || f === c || f === d || f === e || !(b || c || d || e)) return a
      }
      return !1
    },
    expect: function (a, b, c, d) {
      return (a = this.peek(a, b, c, d)) ? (this.tokens.shift(), a) : !1
    },
    selfReferential: {
      "this": {
        type: re.ThisExpression
      },
      $locals: {
        type: re.LocalsExpression
      }
    }
  }, Pb.prototype = {
    compile: function (a, b) {
      var c = this,
        e = this.astBuilder.ast(a);
      this.state = {
        nextId: 0,
        filters: {},
        expensiveChecks: b,
        fn: {
          vars: [],
          body: [],
          own: {}
        },
        assign: {
          vars: [],
          body: [],
          own: {}
        },
        inputs: []
      }, Kb(e, c.$filter);
      var f, g = "";
      return this.stage = "assign", (f = Nb(e)) && (this.state.computing = "assign", g = this.nextId(), this.recurse(f, g), this.return_(g), g = "fn.assign=" + this.generateFunction("assign", "s,v,l")), f = Lb(e.body), c.stage = "inputs", d(f, function (a, b) {
        var d = "fn" + b;
        c.state[d] = {
          vars: [],
          body: [],
          own: {}
        }, c.state.computing = d;
        var e = c.nextId();
        c.recurse(a, e), c.return_(e), c.state.inputs.push(d), a.watchId = b
      }), this.state.computing = "fn", this.stage = "main", this.recurse(e), g = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + g + this.watchFns() + "return fn;", g = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", g)(this.$filter, Db, Fb, Gb, Eb, Hb, Ib, Jb, a), this.state = this.stage = void 0, g.literal = Ob(e), g.constant = e.constant, g
    },
    USE: "use",
    STRICT: "strict",
    watchFns: function () {
      var a = [],
        b = this.state.inputs,
        c = this;
      return d(b, function (b) {
        a.push("var " + b + "=" + c.generateFunction(b, "s"))
      }), b.length && a.push("fn.inputs=[" + b.join(",") + "];"), a.join("")
    },
    generateFunction: function (a, b) {
      return "function(" + b + "){" + this.varsPrefix(a) + this.body(a) + "};"
    },
    filterPrefix: function () {
      var a = [],
        b = this;
      return d(this.state.filters, function (c, d) {
        a.push(c + "=$filter(" + b.escape(d) + ")")
      }), a.length ? "var " + a.join(",") + ";" : ""
    },
    varsPrefix: function (a) {
      return this.state[a].vars.length ? "var " + this.state[a].vars.join(",") + ";" : ""
    },
    body: function (a) {
      return this.state[a].body.join("")
    },
    recurse: function (a, b, c, e, f, g) {
      var h, i, j, k, l, n = this;
      if (e = e || m, !g && r(a.watchId)) b = b || this.nextId(), this.if_("i", this.lazyAssign(b, this.computedMember("i", a.watchId)), this.lazyRecurse(a, b, c, e, f, !0));
      else switch (a.type) {
      case re.Program:
        d(a.body, function (b, c) {
          n.recurse(b.expression, void 0, void 0, function (a) {
            i = a
          }), c !== a.body.length - 1 ? n.current().body.push(i, ";") : n.return_(i)
        });
        break;
      case re.Literal:
        k = this.escape(a.value), this.assign(b, k), e(k);
        break;
      case re.UnaryExpression:
        this.recurse(a.argument, void 0, void 0, function (a) {
          i = a
        }), k = a.operator + "(" + this.ifDefined(i, 0) + ")", this.assign(b, k), e(k);
        break;
      case re.BinaryExpression:
        this.recurse(a.left, void 0, void 0, function (a) {
          h = a
        }), this.recurse(a.right, void 0, void 0, function (a) {
          i = a
        }), k = "+" === a.operator ? this.plus(h, i) : "-" === a.operator ? this.ifDefined(h, 0) + a.operator + this.ifDefined(i, 0) : "(" + h + ")" + a.operator + "(" + i + ")", this.assign(b, k), e(k);
        break;
      case re.LogicalExpression:
        b = b || this.nextId(), n.recurse(a.left, b), n.if_("&&" === a.operator ? b : n.not(b), n.lazyRecurse(a.right, b)), e(b);
        break;
      case re.ConditionalExpression:
        b = b || this.nextId(), n.recurse(a.test, b), n.if_(b, n.lazyRecurse(a.alternate, b), n.lazyRecurse(a.consequent, b)), e(b);
        break;
      case re.Identifier:
        b = b || this.nextId(), c && (c.context = "inputs" === n.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", a.name) + "?l:s"), c.computed = !1, c.name = a.name), Db(a.name), n.if_("inputs" === n.stage || n.not(n.getHasOwnProperty("l", a.name)), function () {
          n.if_("inputs" === n.stage || "s", function () {
            f && 1 !== f && n.if_(n.not(n.nonComputedMember("s", a.name)), n.lazyAssign(n.nonComputedMember("s", a.name), "{}")), n.assign(b, n.nonComputedMember("s", a.name))
          })
        }, b && n.lazyAssign(b, n.nonComputedMember("l", a.name))), (n.state.expensiveChecks || Rb(a.name)) && n.addEnsureSafeObject(b), e(b);
        break;
      case re.MemberExpression:
        h = c && (c.context = this.nextId()) || this.nextId(), b = b || this.nextId(), n.recurse(a.object, h, void 0, function () {
          n.if_(n.notNull(h), function () {
            f && 1 !== f && n.addEnsureSafeAssignContext(h), a.computed ? (i = n.nextId(), n.recurse(a.property, i), n.getStringValue(i), n.addEnsureSafeMemberName(i), f && 1 !== f && n.if_(n.not(n.computedMember(h, i)), n.lazyAssign(n.computedMember(h, i), "{}")), k = n.ensureSafeObject(n.computedMember(h, i)), n.assign(b, k), c && (c.computed = !0, c.name = i)) : (Db(a.property.name), f && 1 !== f && n.if_(n.not(n.nonComputedMember(h, a.property.name)), n.lazyAssign(n.nonComputedMember(h, a.property.name), "{}")), k = n.nonComputedMember(h, a.property.name), (n.state.expensiveChecks || Rb(a.property.name)) && (k = n.ensureSafeObject(k)), n.assign(b, k), c && (c.computed = !1, c.name = a.property.name))
          }, function () {
            n.assign(b, "undefined")
          }), e(b)
        }, !!f);
        break;
      case re.CallExpression:
        b = b || this.nextId(), a.filter ? (i = n.filter(a.callee.name), j = [], d(a.arguments, function (a) {
          var b = n.nextId();
          n.recurse(a, b), j.push(b)
        }), k = i + "(" + j.join(",") + ")", n.assign(b, k), e(b)) : (i = n.nextId(), h = {}, j = [], n.recurse(a.callee, i, h, function () {
          n.if_(n.notNull(i), function () {
            n.addEnsureSafeFunction(i), d(a.arguments, function (a) {
              n.recurse(a, n.nextId(), void 0, function (a) {
                j.push(n.ensureSafeObject(a))
              })
            }), h.name ? (n.state.expensiveChecks || n.addEnsureSafeObject(h.context), k = n.member(h.context, h.name, h.computed) + "(" + j.join(",") + ")") : k = i + "(" + j.join(",") + ")", k = n.ensureSafeObject(k), n.assign(b, k)
          }, function () {
            n.assign(b, "undefined")
          }), e(b)
        }));
        break;
      case re.AssignmentExpression:
        if (i = this.nextId(), h = {}, !Mb(a.left)) throw ke("lval");
        this.recurse(a.left, void 0, h, function () {
          n.if_(n.notNull(h.context), function () {
            n.recurse(a.right, i), n.addEnsureSafeObject(n.member(h.context, h.name, h.computed)), n.addEnsureSafeAssignContext(h.context), k = n.member(h.context, h.name, h.computed) + a.operator + i, n.assign(b, k), e(b || k)
          })
        }, 1);
        break;
      case re.ArrayExpression:
        j = [], d(a.elements, function (a) {
          n.recurse(a, n.nextId(), void 0, function (a) {
            j.push(a)
          })
        }), k = "[" + j.join(",") + "]", this.assign(b, k), e(k);
        break;
      case re.ObjectExpression:
        j = [], l = !1, d(a.properties, function (a) {
          a.computed && (l = !0)
        }), l ? (b = b || this.nextId(), this.assign(b, "{}"), d(a.properties, function (a) {
          a.computed ? (h = n.nextId(), n.recurse(a.key, h)) : h = a.key.type === re.Identifier ? a.key.name : "" + a.key.value, i = n.nextId(), n.recurse(a.value, i), n.assign(n.member(b, h, a.computed), i)
        })) : (d(a.properties, function (b) {
          n.recurse(b.value, a.constant ? void 0 : n.nextId(), void 0, function (a) {
            j.push(n.escape(b.key.type === re.Identifier ? b.key.name : "" + b.key.value) + ":" + a)
          })
        }), k = "{" + j.join(",") + "}", this.assign(b, k)), e(b || k);
        break;
      case re.ThisExpression:
        this.assign(b, "s"), e("s");
        break;
      case re.LocalsExpression:
        this.assign(b, "l"), e("l");
        break;
      case re.NGValueParameter:
        this.assign(b, "v"), e("v")
      }
    },
    getHasOwnProperty: function (a, b) {
      var c = a + "." + b,
        d = this.current().own;
      return d.hasOwnProperty(c) || (d[c] = this.nextId(!1, a + "&&(" + this.escape(b) + " in " + a + ")")), d[c]
    },
    assign: function (a, b) {
      return a ? (this.current().body.push(a, "=", b, ";"), a) : void 0
    },
    filter: function (a) {
      return this.state.filters.hasOwnProperty(a) || (this.state.filters[a] = this.nextId(!0)), this.state.filters[a]
    },
    ifDefined: function (a, b) {
      return "ifDefined(" + a + "," + this.escape(b) + ")"
    },
    plus: function (a, b) {
      return "plus(" + a + "," + b + ")"
    },
    return_: function (a) {
      this.current().body.push("return ", a, ";")
    },
    if_: function (a, b, c) {
      if (!0 === a) b();
      else {
        var d = this.current().body;
        d.push("if(", a, "){"), b(), d.push("}"), c && (d.push("else{"), c(), d.push("}"))
      }
    },
    not: function (a) {
      return "!(" + a + ")"
    },
    notNull: function (a) {
      return a + "!=null"
    },
    nonComputedMember: function (a, b) {
      var c = /[^$_a-zA-Z0-9]/g;
      return /[$_a-zA-Z][$_a-zA-Z0-9]*/.test(b) ? a + "." + b : a + '["' + b.replace(c, this.stringEscapeFn) + '"]'
    },
    computedMember: function (a, b) {
      return a + "[" + b + "]"
    },
    member: function (a, b, c) {
      return c ? this.computedMember(a, b) : this.nonComputedMember(a, b)
    },
    addEnsureSafeObject: function (a) {
      this.current().body.push(this.ensureSafeObject(a), ";")
    },
    addEnsureSafeMemberName: function (a) {
      this.current().body.push(this.ensureSafeMemberName(a), ";")
    },
    addEnsureSafeFunction: function (a) {
      this.current().body.push(this.ensureSafeFunction(a), ";")
    },
    addEnsureSafeAssignContext: function (a) {
      this.current().body.push(this.ensureSafeAssignContext(a), ";")
    },
    ensureSafeObject: function (a) {
      return "ensureSafeObject(" + a + ",text)"
    },
    ensureSafeMemberName: function (a) {
      return "ensureSafeMemberName(" + a + ",text)"
    },
    ensureSafeFunction: function (a) {
      return "ensureSafeFunction(" + a + ",text)"
    },
    getStringValue: function (a) {
      this.assign(a, "getStringValue(" + a + ")")
    },
    ensureSafeAssignContext: function (a) {
      return "ensureSafeAssignContext(" + a + ",text)"
    },
    lazyRecurse: function (a, b, c, d, e, f) {
      var g = this;
      return function () {
        g.recurse(a, b, c, d, e, f)
      }
    },
    lazyAssign: function (a, b) {
      var c = this;
      return function () {
        c.assign(a, b)
      }
    },
    stringEscapeRegex: /[^ a-zA-Z0-9]/g,
    stringEscapeFn: function (a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    },
    escape: function (a) {
      if (u(a)) return "'" + a.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
      if (v(a)) return a.toString();
      if (!0 === a) return "true";
      if (!1 === a) return "false";
      if (null === a) return "null";
      if ("undefined" == typeof a) return "undefined";
      throw ke("esc")
    },
    nextId: function (a, b) {
      var c = "v" + this.state.nextId++;
      return a || this.current().vars.push(c + (b ? "=" + b : "")), c
    },
    current: function () {
      return this.state[this.state.computing]
    }
  }, Qb.prototype = {
    compile: function (a, b) {
      var c = this,
        e = this.astBuilder.ast(a);
      this.expression = a, this.expensiveChecks = b, Kb(e, c.$filter);
      var f, g;
      (f = Nb(e)) && (g = this.recurse(f)), f = Lb(e.body);
      var h;
      f && (h = [], d(f, function (a, b) {
        var d = c.recurse(a);
        a.input = d, h.push(d), a.watchId = b
      }));
      var i = [];
      return d(e.body, function (a) {
        i.push(c.recurse(a.expression))
      }), f = 0 === e.body.length ? m : 1 === e.body.length ? i[0] : function (a, b) {
        var c;
        return d(i, function (d) {
          c = d(a, b)
        }), c
      }, g && (f.assign = function (a, b, c) {
        return g(a, c, b)
      }), h && (f.inputs = h), f.literal = Ob(e), f.constant = e.constant, f
    },
    recurse: function (a, b, c) {
      var e, f, g, h = this;
      if (a.input) return this.inputs(a.input, a.watchId);
      switch (a.type) {
      case re.Literal:
        return this.value(a.value, b);
      case re.UnaryExpression:
        return f = this.recurse(a.argument), this["unary" + a.operator](f, b);
      case re.BinaryExpression:
        return e = this.recurse(a.left), f = this.recurse(a.right), this["binary" + a.operator](e, f, b);
      case re.LogicalExpression:
        return e = this.recurse(a.left), f = this.recurse(a.right), this["binary" + a.operator](e, f, b);
      case re.ConditionalExpression:
        return this["ternary?:"](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b);
      case re.Identifier:
        return Db(a.name, h.expression), h.identifier(a.name, h.expensiveChecks || Rb(a.name), b, c, h.expression);
      case re.MemberExpression:
        return e = this.recurse(a.object, !1, !!c), a.computed || (Db(a.property.name, h.expression), f = a.property.name), a.computed && (f = this.recurse(a.property)), a.computed ? this.computedMember(e, f, b, c, h.expression) : this.nonComputedMember(e, f, h.expensiveChecks, b, c, h.expression);
      case re.CallExpression:
        return g = [], d(a.arguments, function (a) {
          g.push(h.recurse(a))
        }), a.filter && (f = this.$filter(a.callee.name)), a.filter || (f = this.recurse(a.callee, !0)), a.filter ? function (a, c, d, e) {
          for (var h = [], i = 0; i < g.length; ++i) h.push(g[i](a, c, d, e));
          return a = f.apply(void 0, h, e), b ? {
            context: void 0,
            name: void 0,
            value: a
          } : a
        } : function (a, c, d, e) {
          var i, j = f(a, c, d, e);
          if (null != j.value) {
            Fb(j.context, h.expression), Gb(j.value, h.expression), i = [];
            for (var k = 0; k < g.length; ++k) i.push(Fb(g[k](a, c, d, e), h.expression));
            i = Fb(j.value.apply(j.context, i), h.expression)
          }
          return b ? {
            value: i
          } : i
        };
      case re.AssignmentExpression:
        return e = this.recurse(a.left, !0, 1), f = this.recurse(a.right),
          function (a, c, d, g) {
            var i = e(a, c, d, g);
            return a = f(a, c, d, g), Fb(i.value, h.expression), Hb(i.context), i.context[i.name] = a, b ? {
              value: a
            } : a
          };
      case re.ArrayExpression:
        return g = [], d(a.elements, function (a) {
            g.push(h.recurse(a))
          }),
          function (a, c, d, e) {
            for (var f = [], h = 0; h < g.length; ++h) f.push(g[h](a, c, d, e));
            return b ? {
              value: f
            } : f
          };
      case re.ObjectExpression:
        return g = [], d(a.properties, function (a) {
            a.computed ? g.push({
              key: h.recurse(a.key),
              computed: !0,
              value: h.recurse(a.value)
            }) : g.push({
              key: a.key.type === re.Identifier ? a.key.name : "" + a.key.value,
              computed: !1,
              value: h.recurse(a.value)
            })
          }),
          function (a, c, d, e) {
            for (var f = {}, h = 0; h < g.length; ++h) g[h].computed ? f[g[h].key(a, c, d, e)] = g[h].value(a, c, d, e) : f[g[h].key] = g[h].value(a, c, d, e);
            return b ? {
              value: f
            } : f
          };
      case re.ThisExpression:
        return function (a) {
          return b ? {
            value: a
          } : a
        };
      case re.LocalsExpression:
        return function (a, c) {
          return b ? {
            value: c
          } : c
        };
      case re.NGValueParameter:
        return function (a, c, d) {
          return b ? {
            value: d
          } : d
        }
      }
    },
    "unary+": function (a, b) {
      return function (c, d, e, f) {
        return c = a(c, d, e, f), c = r(c) ? +c : 0, b ? {
          value: c
        } : c
      }
    },
    "unary-": function (a, b) {
      return function (c, d, e, f) {
        return c = a(c, d, e, f), c = r(c) ? -c : 0, b ? {
          value: c
        } : c
      }
    },
    "unary!": function (a, b) {
      return function (c, d, e, f) {
        return c = !a(c, d, e, f), b ? {
          value: c
        } : c
      }
    },
    "binary+": function (a, b, c) {
      return function (d, e, f, g) {
        var h = a(d, e, f, g);
        return d = b(d, e, f, g), h = Jb(h, d), c ? {
          value: h
        } : h
      }
    },
    "binary-": function (a, b, c) {
      return function (d, e, f, g) {
        var h = a(d, e, f, g);
        return d = b(d, e, f, g), h = (r(h) ? h : 0) - (r(d) ? d : 0), c ? {
          value: h
        } : h
      }
    },
    "binary*": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) * b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary/": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) / b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary%": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) % b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary===": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) === b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary!==": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) !== b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary==": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) == b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary!=": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) != b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary<": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) < b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary>": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) > b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary<=": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) <= b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary>=": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) >= b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary&&": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) && b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "binary||": function (a, b, c) {
      return function (d, e, f, g) {
        return d = a(d, e, f, g) || b(d, e, f, g), c ? {
          value: d
        } : d
      }
    },
    "ternary?:": function (a, b, c, d) {
      return function (e, f, g, h) {
        return e = a(e, f, g, h) ? b(e, f, g, h) : c(e, f, g, h), d ? {
          value: e
        } : e
      }
    },
    value: function (a, b) {
      return function () {
        return b ? {
          context: void 0,
          name: void 0,
          value: a
        } : a
      }
    },
    identifier: function (a, b, c, d, e) {
      return function (f, g, h, i) {
        return f = g && a in g ? g : f, d && 1 !== d && f && !f[a] && (f[a] = {}), g = f ? f[a] : void 0,
          b && Fb(g, e), c ? {
            context: f,
            name: a,
            value: g
          } : g
      }
    },
    computedMember: function (a, b, c, d, e) {
      return function (f, g, h, i) {
        var j, k, l = a(f, g, h, i);
        return null != l && (j = b(f, g, h, i), j += "", Db(j, e), d && 1 !== d && (Hb(l), l && !l[j] && (l[j] = {})), k = l[j], Fb(k, e)), c ? {
          context: l,
          name: j,
          value: k
        } : k
      }
    },
    nonComputedMember: function (a, b, c, d, e, f) {
      return function (g, h, i, j) {
        return g = a(g, h, i, j), e && 1 !== e && (Hb(g), g && !g[b] && (g[b] = {})), h = null != g ? g[b] : void 0, (c || Rb(b)) && Fb(h, f), d ? {
          context: g,
          name: b,
          value: h
        } : h
      }
    },
    inputs: function (a, b) {
      return function (c, d, e, f) {
        return f ? f[b] : a(c, d, e)
      }
    }
  };
  var se = function (a, b, c) {
    this.lexer = a, this.$filter = b, this.options = c, this.ast = new re(a, c), this.astCompiler = c.csp ? new Qb(this.ast, b) : new Pb(this.ast, b)
  };
  se.prototype = {
    constructor: se,
    parse: function (a) {
      return this.astCompiler.compile(a, this.options.expensiveChecks)
    }
  };
  var te = Object.prototype.valueOf,
    ue = b("$sce"),
    ve = {
      HTML: "html",
      CSS: "css",
      URL: "url",
      RESOURCE_URL: "resourceUrl",
      JS: "js"
    },
    we = b("$compile"),
    xe = a.document.createElement("a"),
    ye = gc(a.location.href);
  jc.$inject = ["$document"], lc.$inject = ["$provide"];
  var ze = 22,
    Ae = ".",
    Be = "0";
  qc.$inject = ["$locale"], rc.$inject = ["$locale"];
  var Ce = {
      yyyy: wc("FullYear", 4, 0, !1, !0),
      yy: wc("FullYear", 2, 0, !0, !0),
      y: wc("FullYear", 1, 0, !1, !0),
      MMMM: xc("Month"),
      MMM: xc("Month", !0),
      MM: wc("Month", 2, 1),
      M: wc("Month", 1, 1),
      LLLL: xc("Month", !1, !0),
      dd: wc("Date", 2),
      d: wc("Date", 1),
      HH: wc("Hours", 2),
      H: wc("Hours", 1),
      hh: wc("Hours", 2, -12),
      h: wc("Hours", 1, -12),
      mm: wc("Minutes", 2),
      m: wc("Minutes", 1),
      ss: wc("Seconds", 2),
      s: wc("Seconds", 1),
      sss: wc("Milliseconds", 3),
      EEEE: xc("Day"),
      EEE: xc("Day", !0),
      a: function (a, b) {
        return 12 > a.getHours() ? b.AMPMS[0] : b.AMPMS[1]
      },
      Z: function (a, b, c) {
        return a = -1 * c, a = (a >= 0 ? "+" : "") + (vc(Math[a > 0 ? "floor" : "ceil"](a / 60), 2) + vc(Math.abs(a % 60), 2))
      },
      ww: zc(2),
      w: zc(1),
      G: Ac,
      GG: Ac,
      GGG: Ac,
      GGGG: function (a, b) {
        return 0 >= a.getFullYear() ? b.ERANAMES[0] : b.ERANAMES[1]
      }
    },
    De = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
    Ee = /^\-?\d+$/;
  Bc.$inject = ["$locale"];
  var Fe = o(Wc),
    Ge = o(Xc);
  Ec.$inject = ["$parse"];
  var He = o({
      restrict: "E",
      compile: function (a, b) {
        return b.href || b.xlinkHref ? void 0 : function (a, b) {
          if ("a" === b[0].nodeName.toLowerCase()) {
            var c = "[object SVGAnimatedString]" === _c.call(b.prop("href")) ? "xlink:href" : "href";
            b.on("click", function (a) {
              b.attr(c) || a.preventDefault()
            })
          }
        }
      }
    }),
    Ie = {};
  d(Dd, function (a, b) {
    function c(a, c, e) {
      a.$watch(e[d], function (a) {
        e.$set(b, !!a)
      })
    }
    if ("multiple" != a) {
      var d = Ya("ng-" + b),
        e = c;
      "checked" === a && (e = function (a, b, e) {
        e.ngModel !== e[d] && c(a, b, e)
      }), Ie[d] = function () {
        return {
          restrict: "A",
          priority: 100,
          link: e
        }
      }
    }
  }), d(Fd, function (a, b) {
    Ie[b] = function () {
      return {
        priority: 100,
        link: function (a, c, d) {
          return "ngPattern" === b && "/" == d.ngPattern.charAt(0) && (c = d.ngPattern.match(Uc)) ? void d.$set("ngPattern", new RegExp(c[1], c[2])) : void a.$watch(d[b], function (a) {
            d.$set(b, a)
          })
        }
      }
    }
  }), d(["src", "srcset", "href"], function (a) {
    var b = Ya("ng-" + a);
    Ie[b] = function () {
      return {
        priority: 99,
        link: function (c, d, e) {
          var f = a,
            g = a;
          "href" === a && "[object SVGAnimatedString]" === _c.call(d.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null), e.$observe(b, function (b) {
            b ? (e.$set(g, b), Qc && f && d.prop(f, e[g])) : "href" === a && e.$set(g, null)
          })
        }
      }
    }
  });
  var Je = {
    $addControl: m,
    $$renameControl: function (a, b) {
      a.$name = b
    },
    $removeControl: m,
    $setValidity: m,
    $setDirty: m,
    $setPristine: m,
    $setSubmitted: m
  };
  Gc.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
  var Ke = function (a) {
      return ["$timeout", "$parse", function (b, c) {
        function d(a) {
          return "" === a ? c('this[""]').assign : c(a).assign || m
        }
        return {
          name: "form",
          restrict: a ? "EAC" : "E",
          require: ["form", "^^?form"],
          controller: Gc,
          compile: function (c, e) {
            c.addClass(sf).addClass(qf);
            var f = e.name ? "name" : a && e.ngForm ? "ngForm" : !1;
            return {
              pre: function (a, c, e, g) {
                var h = g[0];
                if (!("action" in e)) {
                  var j = function (b) {
                    a.$apply(function () {
                      h.$commitViewValue(), h.$setSubmitted()
                    }), b.preventDefault()
                  };
                  c[0].addEventListener("submit", j, !1), c.on("$destroy", function () {
                    b(function () {
                      c[0].removeEventListener("submit", j, !1)
                    }, 0, !1)
                  })
                }(g[1] || h.$$parentForm).$addControl(h);
                var k = f ? d(h.$name) : m;
                f && (k(a, h), e.$observe(f, function (b) {
                  h.$name !== b && (k(a, void 0), h.$$parentForm.$$renameControl(h, b), (k = d(h.$name))(a, h))
                })), c.on("$destroy", function () {
                  h.$$parentForm.$removeControl(h), k(a, void 0), i(h, Je)
                })
              }
            }
          }
        }
      }]
    },
    Le = Ke(),
    Me = Ke(!0),
    Ne = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,
    Oe = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:\/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
    Pe = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    Qe = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
    Re = /^(\d{4,})-(\d{2})-(\d{2})$/,
    Se = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
    Te = /^(\d{4,})-W(\d\d)$/,
    Ue = /^(\d{4,})-(\d\d)$/,
    Ve = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
    We = ha();
  d(["date", "datetime-local", "month", "time", "week"], function (a) {
    We[a] = !0
  });
  var Xe = {
      text: function (a, b, c, d, e, f) {
        Ic(a, b, c, d, e, f), Hc(d)
      },
      date: Kc("date", Re, Jc(Re, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
      "datetime-local": Kc("datetimelocal", Se, Jc(Se, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"),
      time: Kc("time", Ve, Jc(Ve, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
      week: Kc("week", Te, function (a, b) {
        if (w(a)) return a;
        if (u(a)) {
          Te.lastIndex = 0;
          var c = Te.exec(a);
          if (c) {
            var d = +c[1],
              e = +c[2],
              f = c = 0,
              g = 0,
              h = 0,
              i = yc(d),
              e = 7 * (e - 1);
            return b && (c = b.getHours(), f = b.getMinutes(), g = b.getSeconds(), h = b.getMilliseconds()), new Date(d, 0, i.getDate() + e, c, f, g, h)
          }
        }
        return NaN
      }, "yyyy-Www"),
      month: Kc("month", Ue, Jc(Ue, ["yyyy", "MM"]), "yyyy-MM"),
      number: function (a, b, c, d, e, f) {
        if (Lc(a, b, c, d), Ic(a, b, c, d, e, f), d.$$parserName = "number", d.$parsers.push(function (a) {
            return d.$isEmpty(a) ? null : Qe.test(a) ? parseFloat(a) : void 0
          }), d.$formatters.push(function (a) {
            if (!d.$isEmpty(a)) {
              if (!v(a)) throw vf("numfmt", a);
              a = a.toString()
            }
            return a
          }), r(c.min) || c.ngMin) {
          var g;
          d.$validators.min = function (a) {
            return d.$isEmpty(a) || q(g) || a >= g
          }, c.$observe("min", function (a) {
            r(a) && !v(a) && (a = parseFloat(a, 10)), g = v(a) && !isNaN(a) ? a : void 0, d.$validate()
          })
        }
        if (r(c.max) || c.ngMax) {
          var h;
          d.$validators.max = function (a) {
            return d.$isEmpty(a) || q(h) || h >= a
          }, c.$observe("max", function (a) {
            r(a) && !v(a) && (a = parseFloat(a, 10)), h = v(a) && !isNaN(a) ? a : void 0, d.$validate()
          })
        }
      },
      url: function (a, b, c, d, e, f) {
        Ic(a, b, c, d, e, f), Hc(d), d.$$parserName = "url", d.$validators.url = function (a, b) {
          var c = a || b;
          return d.$isEmpty(c) || Oe.test(c)
        }
      },
      email: function (a, b, c, d, e, f) {
        Ic(a, b, c, d, e, f), Hc(d), d.$$parserName = "email", d.$validators.email = function (a, b) {
          var c = a || b;
          return d.$isEmpty(c) || Pe.test(c)
        }
      },
      radio: function (a, b, c, d) {
        q(c.name) && b.attr("name", ++dd), b.on("click", function (a) {
          b[0].checked && d.$setViewValue(c.value, a && a.type)
        }), d.$render = function () {
          b[0].checked = c.value == d.$viewValue
        }, c.$observe("value", d.$render)
      },
      checkbox: function (a, b, c, d, e, f, g, h) {
        var i = Mc(h, a, "ngTrueValue", c.ngTrueValue, !0),
          j = Mc(h, a, "ngFalseValue", c.ngFalseValue, !1);
        b.on("click", function (a) {
          d.$setViewValue(b[0].checked, a && a.type)
        }), d.$render = function () {
          b[0].checked = d.$viewValue
        }, d.$isEmpty = function (a) {
          return !1 === a
        }, d.$formatters.push(function (a) {
          return J(a, i)
        }), d.$parsers.push(function (a) {
          return a ? i : j
        })
      },
      hidden: m,
      button: m,
      submit: m,
      reset: m,
      file: m
    },
    Ye = ["$browser", "$sniffer", "$filter", "$parse", function (a, b, c, d) {
      return {
        restrict: "E",
        require: ["?ngModel"],
        link: {
          pre: function (e, f, g, h) {
            h[0] && (Xe[Wc(g.type)] || Xe.text)(e, f, g, h[0], b, a, c, d)
          }
        }
      }
    }],
    Ze = /^(true|false|\d+)$/,
    $e = function () {
      return {
        restrict: "A",
        priority: 100,
        compile: function (a, b) {
          return Ze.test(b.ngValue) ? function (a, b, c) {
            c.$set("value", a.$eval(c.ngValue))
          } : function (a, b, c) {
            a.$watch(c.ngValue, function (a) {
              c.$set("value", a)
            })
          }
        }
      }
    },
    _e = ["$compile", function (a) {
      return {
        restrict: "AC",
        compile: function (b) {
          return a.$$addBindingClass(b),
            function (b, c, d) {
              a.$$addBindingInfo(c, d.ngBind), c = c[0], b.$watch(d.ngBind, function (a) {
                c.textContent = q(a) ? "" : a
              })
            }
        }
      }
    }],
    af = ["$interpolate", "$compile", function (a, b) {
      return {
        compile: function (c) {
          return b.$$addBindingClass(c),
            function (c, d, e) {
              c = a(d.attr(e.$attr.ngBindTemplate)), b.$$addBindingInfo(d, c.expressions), d = d[0], e.$observe("ngBindTemplate", function (a) {
                d.textContent = q(a) ? "" : a
              })
            }
        }
      }
    }],
    bf = ["$sce", "$parse", "$compile", function (a, b, c) {
      return {
        restrict: "A",
        compile: function (d, e) {
          var f = b(e.ngBindHtml),
            g = b(e.ngBindHtml, function (b) {
              return a.valueOf(b)
            });
          return c.$$addBindingClass(d),
            function (b, d, e) {
              c.$$addBindingInfo(d, e.ngBindHtml), b.$watch(g, function () {
                var c = f(b);
                d.html(a.getTrustedHtml(c) || "")
              })
            }
        }
      }
    }],
    cf = o({
      restrict: "A",
      require: "ngModel",
      link: function (a, b, c, d) {
        d.$viewChangeListeners.push(function () {
          a.$eval(c.ngChange)
        })
      }
    }),
    df = Nc("", !0),
    ef = Nc("Odd", 0),
    ff = Nc("Even", 1),
    gf = Fc({
      compile: function (a, b) {
        b.$set("ngCloak", void 0), a.removeClass("ng-cloak")
      }
    }),
    hf = [function () {
      return {
        restrict: "A",
        scope: !0,
        controller: "@",
        priority: 500
      }
    }],
    jf = {},
    kf = {
      blur: !0,
      focus: !0
    };
  d("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (a) {
    var b = Ya("ng-" + a);
    jf[b] = ["$parse", "$rootScope", function (c, d) {
      return {
        restrict: "A",
        compile: function (e, f) {
          var g = c(f[b], null, !0);
          return function (b, c) {
            c.on(a, function (c) {
              var e = function () {
                g(b, {
                  $event: c
                })
              };
              kf[a] && d.$$phase ? b.$evalAsync(e) : b.$apply(e)
            })
          }
        }
      }
    }]
  });
  var lf = ["$animate", "$compile", function (a, b) {
      return {
        multiElement: !0,
        transclude: "element",
        priority: 600,
        terminal: !0,
        restrict: "A",
        $$tlb: !0,
        link: function (c, d, e, f, g) {
          var h, i, j;
          c.$watch(e.ngIf, function (c) {
            c ? i || g(function (c, f) {
              i = f, c[c.length++] = b.$$createComment("end ngIf", e.ngIf), h = {
                clone: c
              }, a.enter(c, d.parent(), d)
            }) : (j && (j.remove(), j = null), i && (i.$destroy(), i = null), h && (j = ga(h.clone), a.leave(j).then(function () {
              j = null
            }), h = null))
          })
        }
      }
    }],
    mf = ["$templateRequest", "$anchorScroll", "$animate", function (a, b, c) {
      return {
        restrict: "ECA",
        priority: 400,
        terminal: !0,
        transclude: "element",
        controller: cd.noop,
        compile: function (d, e) {
          var f = e.ngInclude || e.src,
            g = e.onload || "",
            h = e.autoscroll;
          return function (d, e, i, j, k) {
            var l, m, n, o = 0,
              p = function () {
                m && (m.remove(), m = null), l && (l.$destroy(), l = null), n && (c.leave(n).then(function () {
                  m = null
                }), m = n, n = null)
              };
            d.$watch(f, function (f) {
              var i = function () {
                  !r(h) || h && !d.$eval(h) || b()
                },
                m = ++o;
              f ? (a(f, !0).then(function (a) {
                if (!d.$$destroyed && m === o) {
                  var b = d.$new();
                  j.template = a, a = k(b, function (a) {
                    p(), c.enter(a, null, e).then(i)
                  }), l = b, n = a, l.$emit("$includeContentLoaded", f), d.$eval(g)
                }
              }, function () {
                d.$$destroyed || m !== o || (p(), d.$emit("$includeContentError", f))
              }), d.$emit("$includeContentRequested", f)) : (p(), j.template = null)
            })
          }
        }
      }
    }],
    nf = ["$compile", function (b) {
      return {
        restrict: "ECA",
        priority: -400,
        require: "ngInclude",
        link: function (c, d, e, f) {
          _c.call(d[0]).match(/SVG/) ? (d.empty(), b(ma(f.template, a.document).childNodes)(c, function (a) {
            d.append(a)
          }, {
            futureParentElement: d
          })) : (d.html(f.template), b(d.contents())(c))
        }
      }
    }],
    of = Fc({
      priority: 450,
      compile: function () {
        return {
          pre: function (a, b, c) {
            a.$eval(c.ngInit)
          }
        }
      }
    }),
    pf = function () {
      return {
        restrict: "A",
        priority: 100,
        require: "ngModel",
        link: function (a, b, c, e) {
          var f = b.attr(c.$attr.ngList) || ", ",
            g = "false" !== c.ngTrim,
            h = g ? gd(f) : f;
          e.$parsers.push(function (a) {
            if (!q(a)) {
              var b = [];
              return a && d(a.split(h), function (a) {
                a && b.push(g ? gd(a) : a)
              }), b
            }
          }), e.$formatters.push(function (a) {
            return ed(a) ? a.join(f) : void 0
          }), e.$isEmpty = function (a) {
            return !a || !a.length
          }
        }
      }
    },
    qf = "ng-valid",
    rf = "ng-invalid",
    sf = "ng-pristine",
    tf = "ng-dirty",
    uf = "ng-pending",
    vf = b("ngModel"),
    wf = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function (a, b, c, e, f, g, h, i, j, k) {
      this.$modelValue = this.$viewValue = Number.NaN, this.$$rawModelValue = void 0, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = void 0, this.$name = k(c.name || "", !1)(a), this.$$parentForm = Je;
      var l, n = f(c.ngModel),
        o = n.assign,
        p = n,
        s = o,
        t = null,
        u = this;
      this.$$setOptions = function (a) {
        if ((u.$options = a) && a.getterSetter) {
          var b = f(c.ngModel + "()"),
            d = f(c.ngModel + "($$$p)");
          p = function (a) {
            var c = n(a);
            return x(c) && (c = b(a)), c
          }, s = function (a, b) {
            x(n(a)) ? d(a, {
              $$$p: b
            }) : o(a, b)
          }
        } else if (!n.assign) throw vf("nonassign", c.ngModel, R(e))
      }, this.$render = m, this.$isEmpty = function (a) {
        return q(a) || "" === a || null === a || a !== a
      }, this.$$updateEmptyClasses = function (a) {
        u.$isEmpty(a) ? (g.removeClass(e, "ng-not-empty"), g.addClass(e, "ng-empty")) : (g.removeClass(e, "ng-empty"), g.addClass(e, "ng-not-empty"))
      };
      var w = 0;
      Oc({
        ctrl: this,
        $element: e,
        set: function (a, b) {
          a[b] = !0
        },
        unset: function (a, b) {
          delete a[b]
        },
        $animate: g
      }), this.$setPristine = function () {
        u.$dirty = !1, u.$pristine = !0, g.removeClass(e, tf), g.addClass(e, sf)
      }, this.$setDirty = function () {
        u.$dirty = !0, u.$pristine = !1, g.removeClass(e, sf), g.addClass(e, tf), u.$$parentForm.$setDirty()
      }, this.$setUntouched = function () {
        u.$touched = !1, u.$untouched = !0, g.setClass(e, "ng-untouched", "ng-touched")
      }, this.$setTouched = function () {
        u.$touched = !0, u.$untouched = !1, g.setClass(e, "ng-touched", "ng-untouched")
      }, this.$rollbackViewValue = function () {
        h.cancel(t), u.$viewValue = u.$$lastCommittedViewValue, u.$render()
      }, this.$validate = function () {
        if (!v(u.$modelValue) || !isNaN(u.$modelValue)) {
          var a = u.$$rawModelValue,
            b = u.$valid,
            c = u.$modelValue,
            d = u.$options && u.$options.allowInvalid;
          u.$$runValidators(a, u.$$lastCommittedViewValue, function (e) {
            d || b === e || (u.$modelValue = e ? a : void 0, u.$modelValue !== c && u.$$writeModelToScope())
          })
        }
      }, this.$$runValidators = function (a, b, c) {
        function e() {
          var c = !0;
          return d(u.$validators, function (d, e) {
            var f = d(a, b);
            c = c && f, g(e, f)
          }), c ? !0 : (d(u.$asyncValidators, function (a, b) {
            g(b, null)
          }), !1)
        }

        function f() {
          var c = [],
            e = !0;
          d(u.$asyncValidators, function (d, f) {
            var h = d(a, b);
            if (!h || !x(h.then)) throw vf("nopromise", h);
            g(f, void 0), c.push(h.then(function () {
              g(f, !0)
            }, function () {
              e = !1, g(f, !1)
            }))
          }), c.length ? j.all(c).then(function () {
            h(e)
          }, m) : h(!0)
        }

        function g(a, b) {
          i === w && u.$setValidity(a, b)
        }

        function h(a) {
          i === w && c(a)
        }
        w++;
        var i = w;
        (function () {
          var a = u.$$parserName || "parse";
          return q(l) ? (g(a, null), !0) : (l || (d(u.$validators, function (a, b) {
            g(b, null)
          }), d(u.$asyncValidators, function (a, b) {
            g(b, null)
          })), g(a, l), l)
        })() && e() ? f() : h(!1)
      }, this.$commitViewValue = function () {
        var a = u.$viewValue;
        h.cancel(t), (u.$$lastCommittedViewValue !== a || "" === a && u.$$hasNativeValidators) && (u.$$updateEmptyClasses(a), u.$$lastCommittedViewValue = a, u.$pristine && this.$setDirty(), this.$$parseAndValidate())
      }, this.$$parseAndValidate = function () {
        var b = u.$$lastCommittedViewValue;
        if (l = q(b) ? void 0 : !0)
          for (var c = 0; c < u.$parsers.length; c++)
            if (b = u.$parsers[c](b), q(b)) {
              l = !1;
              break
            }
        v(u.$modelValue) && isNaN(u.$modelValue) && (u.$modelValue = p(a));
        var d = u.$modelValue,
          e = u.$options && u.$options.allowInvalid;
        u.$$rawModelValue = b, e && (u.$modelValue = b, u.$modelValue !== d && u.$$writeModelToScope()), u.$$runValidators(b, u.$$lastCommittedViewValue, function (a) {
          e || (u.$modelValue = a ? b : void 0, u.$modelValue !== d && u.$$writeModelToScope())
        })
      }, this.$$writeModelToScope = function () {
        s(a, u.$modelValue), d(u.$viewChangeListeners, function (a) {
          try {
            a()
          } catch (c) {
            b(c)
          }
        })
      }, this.$setViewValue = function (a, b) {
        u.$viewValue = a, u.$options && !u.$options.updateOnDefault || u.$$debounceViewValueCommit(b)
      }, this.$$debounceViewValueCommit = function (b) {
        var c = 0,
          d = u.$options;
        d && r(d.debounce) && (d = d.debounce, v(d) ? c = d : v(d[b]) ? c = d[b] : v(d["default"]) && (c = d["default"])), h.cancel(t), c ? t = h(function () {
          u.$commitViewValue()
        }, c) : i.$$phase ? u.$commitViewValue() : a.$apply(function () {
          u.$commitViewValue()
        })
      }, a.$watch(function () {
        var b = p(a);
        if (b !== u.$modelValue && (u.$modelValue === u.$modelValue || b === b)) {
          u.$modelValue = u.$$rawModelValue = b, l = void 0;
          for (var c = u.$formatters, d = c.length, e = b; d--;) e = c[d](e);
          u.$viewValue !== e && (u.$$updateEmptyClasses(e), u.$viewValue = u.$$lastCommittedViewValue = e, u.$render(), u.$$runValidators(b, e, m))
        }
        return b
      })
    }],
    xf = ["$rootScope", function (a) {
      return {
        restrict: "A",
        require: ["ngModel", "^?form", "^?ngModelOptions"],
        controller: wf,
        priority: 1,
        compile: function (b) {
          return b.addClass(sf).addClass("ng-untouched").addClass(qf), {
            pre: function (a, b, c, d) {
              var e = d[0];
              b = d[1] || e.$$parentForm, e.$$setOptions(d[2] && d[2].$options), b.$addControl(e), c.$observe("name", function (a) {
                e.$name !== a && e.$$parentForm.$$renameControl(e, a)
              }), a.$on("$destroy", function () {
                e.$$parentForm.$removeControl(e)
              })
            },
            post: function (b, c, d, e) {
              var f = e[0];
              f.$options && f.$options.updateOn && c.on(f.$options.updateOn, function (a) {
                f.$$debounceViewValueCommit(a && a.type)
              }), c.on("blur", function () {
                f.$touched || (a.$$phase ? b.$evalAsync(f.$setTouched) : b.$apply(f.$setTouched))
              })
            }
          }
        }
      }
    }],
    yf = /(\s+|^)default(\s+|$)/,
    zf = function () {
      return {
        restrict: "A",
        controller: ["$scope", "$attrs", function (a, b) {
          var c = this;
          this.$options = H(a.$eval(b.ngModelOptions)), r(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, this.$options.updateOn = gd(this.$options.updateOn.replace(yf, function () {
            return c.$options.updateOnDefault = !0, " "
          }))) : this.$options.updateOnDefault = !0
        }]
      }
    },
    Af = Fc({
      terminal: !0,
      priority: 1e3
    }),
    Bf = b("ngOptions"),
    Cf = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
    Df = ["$compile", "$document", "$parse", function (b, e, f) {
      function g(a, b, d) {
        function e(a, b, c, d, e) {
          this.selectValue = a, this.viewValue = b, this.label = c, this.group = d, this.disabled = e
        }

        function g(a) {
          var b;
          if (!j && c(a)) b = a;
          else {
            b = [];
            for (var d in a) a.hasOwnProperty(d) && "$" !== d.charAt(0) && b.push(d)
          }
          return b
        }
        var h = a.match(Cf);
        if (!h) throw Bf("iexp", a, R(b));
        var i = h[5] || h[7],
          j = h[6];
        a = / as /.test(h[0]) && h[1];
        var k = h[9];
        b = f(h[2] ? h[1] : i);
        var l = a && f(a) || b,
          m = k && f(k),
          n = k ? function (a, b) {
            return m(d, b)
          } : function (a) {
            return Ja(a)
          },
          o = function (a, b) {
            return n(a, u(a, b))
          },
          p = f(h[2] || h[1]),
          q = f(h[3] || ""),
          r = f(h[4] || ""),
          s = f(h[8]),
          t = {},
          u = j ? function (a, b) {
            return t[j] = b, t[i] = a, t
          } : function (a) {
            return t[i] = a, t
          };
        return {
          trackBy: k,
          getTrackByValue: o,
          getWatchables: f(s, function (a) {
            var b = [];
            a = a || [];
            for (var c = g(a), e = c.length, f = 0; e > f; f++) {
              var i = a === c ? f : c[f],
                j = a[i],
                i = u(j, i),
                j = n(j, i);
              b.push(j), (h[2] || h[1]) && (j = p(d, i), b.push(j)), h[4] && (i = r(d, i), b.push(i))
            }
            return b
          }),
          getOptions: function () {
            for (var a = [], b = {}, c = s(d) || [], f = g(c), h = f.length, i = 0; h > i; i++) {
              var j = c === f ? i : f[i],
                m = u(c[j], j),
                t = l(d, m),
                j = n(t, m),
                v = p(d, m),
                w = q(d, m),
                m = r(d, m),
                t = new e(j, t, v, w, m);
              a.push(t), b[j] = t
            }
            return {
              items: a,
              selectValueMap: b,
              getOptionFromViewValue: function (a) {
                return b[o(a)]
              },
              getViewValueFromOption: function (a) {
                return k ? cd.copy(a.viewValue) : a.viewValue
              }
            }
          }
        }
      }
      var h = a.document.createElement("option"),
        i = a.document.createElement("optgroup");
      return {
        restrict: "A",
        terminal: !0,
        require: ["select", "ngModel"],
        link: {
          pre: function (a, b, c, d) {
            d[0].registerOption = m
          },
          post: function (a, c, f, j) {
            function k(a, b) {
              a.element = b, b.disabled = a.disabled, a.label !== b.label && (b.label = a.label, b.textContent = a.label), a.value !== b.value && (b.value = a.selectValue)
            }

            function l() {
              var a = v && n.readValue();
              if (v)
                for (var b = v.items.length - 1; b >= 0; b--) {
                  var d = v.items[b];
                  Ca(d.group ? d.element.parentNode : d.element)
                }
              v = w.getOptions();
              var e = {};
              t && c.prepend(m), v.items.forEach(function (a) {
                var b;
                if (r(a.group)) {
                  b = e[a.group], b || (b = i.cloneNode(!1), x.appendChild(b), b.label = a.group, e[a.group] = b);
                  var c = h.cloneNode(!1)
                } else b = x, c = h.cloneNode(!1);
                b.appendChild(c), k(a, c)
              }), c[0].appendChild(x), o.$render(), o.$isEmpty(a) || (b = n.readValue(), (w.trackBy || p ? J(a, b) : a === b) || (o.$setViewValue(b), o.$render()))
            }
            var m, n = j[0],
              o = j[1],
              p = f.multiple;
            j = 0;
            for (var q = c.children(), s = q.length; s > j; j++)
              if ("" === q[j].value) {
                m = q.eq(j);
                break
              }
            var t = !!m,
              u = Rc(h.cloneNode(!1));
            u.val("?");
            var v, w = g(f.ngOptions, c, a),
              x = e[0].createDocumentFragment();
            p ? (o.$isEmpty = function (a) {
              return !a || 0 === a.length
            }, n.writeValue = function (a) {
              v.items.forEach(function (a) {
                a.element.selected = !1
              }), a && a.forEach(function (a) {
                (a = v.getOptionFromViewValue(a)) && (a.element.selected = !0)
              })
            }, n.readValue = function () {
              var a = c.val() || [],
                b = [];
              return d(a, function (a) {
                (a = v.selectValueMap[a]) && !a.disabled && b.push(v.getViewValueFromOption(a))
              }), b
            }, w.trackBy && a.$watchCollection(function () {
              return ed(o.$viewValue) ? o.$viewValue.map(function (a) {
                return w.getTrackByValue(a)
              }) : void 0
            }, function () {
              o.$render()
            })) : (n.writeValue = function (a) {
              var b = v.getOptionFromViewValue(a);
              b ? (c[0].value !== b.selectValue && (u.remove(), t || m.remove(), c[0].value = b.selectValue, b.element.selected = !0), b.element.setAttribute("selected", "selected")) : null === a || t ? (u.remove(), t || c.prepend(m), c.val(""), m.prop("selected", !0), m.attr("selected", !0)) : (t || m.remove(), c.prepend(u), c.val("?"), u.prop("selected", !0), u.attr("selected", !0))
            }, n.readValue = function () {
              var a = v.selectValueMap[c.val()];
              return a && !a.disabled ? (t || m.remove(), u.remove(), v.getViewValueFromOption(a)) : null
            }, w.trackBy && a.$watch(function () {
              return w.getTrackByValue(o.$viewValue)
            }, function () {
              o.$render()
            })), t ? (m.remove(), b(m)(a), m.removeClass("ng-scope")) : m = Rc(h.cloneNode(!1)), c.empty(), l(), a.$watchCollection(w.getWatchables, l)
          }
        }
      }
    }],
    Ef = ["$locale", "$interpolate", "$log", function (a, b, c) {
      var e = /{}/g,
        f = /^when(Minus)?(.+)$/;
      return {
        link: function (g, h, i) {
          function j(a) {
            h.text(a || "")
          }
          var k, l = i.count,
            n = i.$attr.when && h.attr(i.$attr.when),
            o = i.offset || 0,
            p = g.$eval(n) || {},
            r = {},
            s = b.startSymbol(),
            t = b.endSymbol(),
            u = s + l + "-" + o + t,
            w = cd.noop;
          d(i, function (a, b) {
            var c = f.exec(b);
            c && (c = (c[1] ? "-" : "") + Wc(c[2]), p[c] = h.attr(i.$attr[b]))
          }), d(p, function (a, c) {
            r[c] = b(a.replace(e, u))
          }), g.$watch(l, function (b) {
            var d = parseFloat(b),
              e = isNaN(d);
            e || d in p || (d = a.pluralCat(d - o)), d === k || e && v(k) && isNaN(k) || (w(), e = r[d], q(e) ? (null != b && c.debug("ngPluralize: no rule defined for '" + d + "' in " + n), w = m, j()) : w = g.$watch(e, j), k = d)
          })
        }
      }
    }],
    Ff = ["$parse", "$animate", "$compile", function (a, e, f) {
      var g = b("ngRepeat"),
        h = function (a, b, c, d, e, f, g) {
          a[c] = d, e && (a[e] = f), a.$index = b, a.$first = 0 === b, a.$last = b === g - 1, a.$middle = !(a.$first || a.$last), a.$odd = !(a.$even = 0 === (1 & b))
        };
      return {
        restrict: "A",
        multiElement: !0,
        transclude: "element",
        priority: 1e3,
        terminal: !0,
        $$tlb: !0,
        compile: function (b, i) {
          var j = i.ngRepeat,
            k = f.$$createComment("end ngRepeat", j),
            l = j.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
          if (!l) throw g("iexp", j);
          var m = l[1],
            n = l[2],
            o = l[3],
            p = l[4],
            l = m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
          if (!l) throw g("iidexp", m);
          var q = l[3] || l[1],
            r = l[2];
          if (o && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(o) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(o))) throw g("badident", o);
          var s, t, u, v, w = {
            $id: Ja
          };
          return p ? s = a(p) : (u = function (a, b) {
              return Ja(b)
            }, v = function (a) {
              return a
            }),
            function (a, b, f, i, l) {
              s && (t = function (b, c, d) {
                return r && (w[r] = b), w[q] = c, w.$index = d, s(a, w)
              });
              var m = ha();
              a.$watchCollection(n, function (f) {
                var i, n, p, s, w, x, y, z, A, B, C = b[0],
                  D = ha();
                if (o && (a[o] = f), c(f)) z = f, n = t || u;
                else
                  for (B in n = t || v, z = [], f) Vc.call(f, B) && "$" !== B.charAt(0) && z.push(B);
                for (s = z.length, B = Array(s), i = 0; s > i; i++)
                  if (w = f === z ? i : z[i], x = f[w], y = n(w, x, i), m[y]) A = m[y], delete m[y], D[y] = A, B[i] = A;
                  else {
                    if (D[y]) throw d(B, function (a) {
                      a && a.scope && (m[a.id] = a)
                    }), g("dupes", j, y, x);
                    B[i] = {
                      id: y,
                      scope: void 0,
                      clone: void 0
                    }, D[y] = !0
                  }
                for (p in m) {
                  if (A = m[p], y = ga(A.clone), e.leave(y), y[0].parentNode)
                    for (i = 0, n = y.length; n > i; i++) y[i].$$NG_REMOVED = !0;
                  A.scope.$destroy()
                }
                for (i = 0; s > i; i++)
                  if (w = f === z ? i : z[i], x = f[w], A = B[i], A.scope) {
                    p = C;
                    do p = p.nextSibling; while (p && p.$$NG_REMOVED);
                    A.clone[0] != p && e.move(ga(A.clone), null, C), C = A.clone[A.clone.length - 1], h(A.scope, i, q, x, r, w, s)
                  } else l(function (a, b) {
                    A.scope = b;
                    var c = k.cloneNode(!1);
                    a[a.length++] = c, e.enter(a, null, C), C = c, A.clone = a, D[A.id] = A, h(A.scope, i, q, x, r, w, s)
                  });
                m = D
              })
            }
        }
      }
    }],
    Gf = ["$animate", function (a) {
      return {
        restrict: "A",
        multiElement: !0,
        link: function (b, c, d) {
          b.$watch(d.ngShow, function (b) {
            a[b ? "removeClass" : "addClass"](c, "ng-hide", {
              tempClasses: "ng-hide-animate"
            })
          })
        }
      }
    }],
    Hf = ["$animate", function (a) {
      return {
        restrict: "A",
        multiElement: !0,
        link: function (b, c, d) {
          b.$watch(d.ngHide, function (b) {
            a[b ? "addClass" : "removeClass"](c, "ng-hide", {
              tempClasses: "ng-hide-animate"
            })
          })
        }
      }
    }],
    If = Fc(function (a, b, c) {
      a.$watch(c.ngStyle, function (a, c) {
        c && a !== c && d(c, function (a, c) {
          b.css(c, "")
        }), a && b.css(a)
      }, !0)
    }),
    Jf = ["$animate", "$compile", function (a, b) {
      return {
        require: "ngSwitch",
        controller: ["$scope", function () {
          this.cases = {}
        }],
        link: function (c, e, f, g) {
          var h = [],
            i = [],
            j = [],
            k = [],
            l = function (a, b) {
              return function () {
                a.splice(b, 1)
              }
            };
          c.$watch(f.ngSwitch || f.on, function (c) {
            var e, f;
            for (e = 0, f = j.length; f > e; ++e) a.cancel(j[e]);
            for (e = j.length = 0, f = k.length; f > e; ++e) {
              var m = ga(i[e].clone);
              k[e].$destroy(), (j[e] = a.leave(m)).then(l(j, e))
            }
            i.length = 0, k.length = 0, (h = g.cases["!" + c] || g.cases["?"]) && d(h, function (c) {
              c.transclude(function (d, e) {
                k.push(e);
                var f = c.element;
                d[d.length++] = b.$$createComment("end ngSwitchWhen"), i.push({
                  clone: d
                }), a.enter(d, f.parent(), f)
              })
            })
          })
        }
      }
    }],
    Kf = Fc({
      transclude: "element",
      priority: 1200,
      require: "^ngSwitch",
      multiElement: !0,
      link: function (a, b, c, d, e) {
        d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
          transclude: e,
          element: b
        })
      }
    }),
    Lf = Fc({
      transclude: "element",
      priority: 1200,
      require: "^ngSwitch",
      multiElement: !0,
      link: function (a, b, c, d, e) {
        d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({
          transclude: e,
          element: b
        })
      }
    }),
    Mf = b("ngTransclude"),
    Nf = Fc({
      restrict: "EAC",
      link: function (a, b, c, d, e) {
        if (c.ngTransclude === c.$attr.ngTransclude && (c.ngTransclude = ""), !e) throw Mf("orphan", R(b));
        e(function (a) {
          a.length && (b.empty(), b.append(a))
        }, null, c.ngTransclude || c.ngTranscludeSlot)
      }
    }),
    Of = ["$templateCache", function (a) {
      return {
        restrict: "E",
        terminal: !0,
        compile: function (b, c) {
          "text/ng-template" == c.type && a.put(c.id, b[0].text)
        }
      }
    }],
    Pf = {
      $setViewValue: m,
      $render: m
    },
    Qf = ["$element", "$scope", function (b, c) {
      var d = this,
        e = new Ka;
      d.ngModelCtrl = Pf, d.unknownOption = Rc(a.document.createElement("option")), d.renderUnknownOption = function (a) {
        a = "? " + Ja(a) + " ?", d.unknownOption.val(a), b.prepend(d.unknownOption), b.val(a)
      }, c.$on("$destroy", function () {
        d.renderUnknownOption = m
      }), d.removeUnknownOption = function () {
        d.unknownOption.parent() && d.unknownOption.remove()
      }, d.readValue = function () {
        return d.removeUnknownOption(), b.val()
      }, d.writeValue = function (a) {
        d.hasOption(a) ? (d.removeUnknownOption(), b.val(a), "" === a && d.emptyOption.prop("selected", !0)) : null == a && d.emptyOption ? (d.removeUnknownOption(), b.val("")) : d.renderUnknownOption(a)
      }, d.addOption = function (a, b) {
        if (8 !== b[0].nodeType) {
          ea(a, '"option value"'), "" === a && (d.emptyOption = b);
          var c = e.get(a) || 0;
          e.put(a, c + 1), d.ngModelCtrl.$render(), b[0].hasAttribute("selected") && (b[0].selected = !0)
        }
      }, d.removeOption = function (a) {
        var b = e.get(a);
        b && (1 === b ? (e.remove(a), "" === a && (d.emptyOption = void 0)) : e.put(a, b - 1))
      }, d.hasOption = function (a) {
        return !!e.get(a)
      }, d.registerOption = function (a, b, c, e, f) {
        if (e) {
          var g;
          c.$observe("value", function (a) {
            r(g) && d.removeOption(g), g = a, d.addOption(a, b)
          })
        } else f ? a.$watch(f, function (a, e) {
          c.$set("value", a), e !== a && d.removeOption(e), d.addOption(a, b)
        }) : d.addOption(c.value, b);
        b.on("$destroy", function () {
          d.removeOption(c.value), d.ngModelCtrl.$render()
        })
      }
    }],
    Rf = function () {
      return {
        restrict: "E",
        require: ["select", "?ngModel"],
        controller: Qf,
        priority: 1,
        link: {
          pre: function (a, b, c, e) {
            var f = e[1];
            if (f) {
              var g = e[0];
              if (g.ngModelCtrl = f, b.on("change", function () {
                  a.$apply(function () {
                    f.$setViewValue(g.readValue())
                  })
                }), c.multiple) {
                g.readValue = function () {
                  var a = [];
                  return d(b.find("option"), function (b) {
                    b.selected && a.push(b.value)
                  }), a
                }, g.writeValue = function (a) {
                  var c = new Ka(a);
                  d(b.find("option"), function (a) {
                    a.selected = r(c.get(a.value))
                  })
                };
                var h, i = NaN;
                a.$watch(function () {
                  i !== f.$viewValue || J(h, f.$viewValue) || (h = I(f.$viewValue), f.$render()), i = f.$viewValue
                }), f.$isEmpty = function (a) {
                  return !a || 0 === a.length
                }
              }
            }
          },
          post: function (a, b, c, d) {
            var e = d[1];
            if (e) {
              var f = d[0];
              e.$render = function () {
                f.writeValue(e.$viewValue)
              }
            }
          }
        }
      }
    },
    Sf = ["$interpolate", function (a) {
      return {
        restrict: "E",
        priority: 100,
        compile: function (b, c) {
          if (r(c.value)) var d = a(c.value, !0);
          else {
            var e = a(b.text(), !0);
            e || c.$set("value", b.text())
          }
          return function (a, b, c) {
            var f = b.parent();
            (f = f.data("$selectController") || f.parent().data("$selectController")) && f.registerOption(a, b, c, d, e)
          }
        }
      }
    }],
    Tf = o({
      restrict: "E",
      terminal: !1
    }),
    Uf = function () {
      return {
        restrict: "A",
        require: "?ngModel",
        link: function (a, b, c, d) {
          d && (c.required = !0, d.$validators.required = function (a, b) {
            return !c.required || !d.$isEmpty(b)
          }, c.$observe("required", function () {
            d.$validate()
          }))
        }
      }
    },
    Vf = function () {
      return {
        restrict: "A",
        require: "?ngModel",
        link: function (a, c, d, e) {
          if (e) {
            var f, g = d.ngPattern || d.pattern;
            d.$observe("pattern", function (a) {
              if (u(a) && 0 < a.length && (a = new RegExp("^" + a + "$")), a && !a.test) throw b("ngPattern")("noregexp", g, a, R(c));
              f = a || void 0, e.$validate()
            }), e.$validators.pattern = function (a, b) {
              return e.$isEmpty(b) || q(f) || f.test(b)
            }
          }
        }
      }
    },
    Wf = function () {
      return {
        restrict: "A",
        require: "?ngModel",
        link: function (a, b, c, d) {
          if (d) {
            var e = -1;
            c.$observe("maxlength", function (a) {
              a = k(a), e = isNaN(a) ? -1 : a, d.$validate()
            }), d.$validators.maxlength = function (a, b) {
              return 0 > e || d.$isEmpty(b) || b.length <= e
            }
          }
        }
      }
    },
    Xf = function () {
      return {
        restrict: "A",
        require: "?ngModel",
        link: function (a, b, c, d) {
          if (d) {
            var e = 0;
            c.$observe("minlength", function (a) {
              e = k(a) || 0, d.$validate()
            }), d.$validators.minlength = function (a, b) {
              return d.$isEmpty(b) || b.length >= e
            }
          }
        }
      }
    };
  a.angular.bootstrap ? a.console && console.log("WARNING: Tried to load angular more than once.") : (ba(), ja(cd), cd.module("ngLocale", [], ["$provide", function (a) {
    function b(a) {
      a += "";
      var b = a.indexOf(".");
      return -1 == b ? 0 : a.length - b - 1
    }
    a.value("$locale", {
      DATETIME_FORMATS: {
        AMPMS: ["AM", "PM"],
        DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        ERANAMES: ["Before Christ", "Anno Domini"],
        ERAS: ["BC", "AD"],
        FIRSTDAYOFWEEK: 6,
        MONTH: "January February March April May June July August September October November December".split(" "),
        SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
        SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
        STANDALONEMONTH: "January February March April May June July August September October November December".split(" "),
        WEEKENDRANGE: [5, 6],
        fullDate: "EEEE, MMMM d, y",
        longDate: "MMMM d, y",
        medium: "MMM d, y h:mm:ss a",
        mediumDate: "MMM d, y",
        mediumTime: "h:mm:ss a",
        "short": "M/d/yy h:mm a",
        shortDate: "M/d/yy",
        shortTime: "h:mm a"
      },
      NUMBER_FORMATS: {
        CURRENCY_SYM: "$",
        DECIMAL_SEP: ".",
        GROUP_SEP: ",",
        PATTERNS: [{
          gSize: 3,
          lgSize: 3,
          maxFrac: 3,
          minFrac: 0,
          minInt: 1,
          negPre: "-",
          negSuf: "",
          posPre: "",
          posSuf: ""
        }, {
          gSize: 3,
          lgSize: 3,
          maxFrac: 2,
          minFrac: 2,
          minInt: 1,
          negPre: "-¤",
          negSuf: "",
          posPre: "¤",
          posSuf: ""
        }]
      },
      id: "en-us",
      localeID: "en_US",
      pluralCat: function (a, c) {
        var d = 0 | a,
          e = c;
        return void 0 === e && (e = Math.min(b(a), 3)), Math.pow(10, e), 1 == d && 0 == e ? "one" : "other"
      }
    })
  }]), Rc(a.document).ready(function () {
    Y(a.document, Z)
  }))
}(window), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'),
  function () {
    "use strict";
    var a = [];
    angular.module("toDoList", []).value("appValues", {
      hideToggle: !1,
      inBasket: !1
    }).factory("saveFactory", ["appValues", function (b) {
      return {
        saveInLocalStorage: function () {
          localStorage.setItem("tasks", JSON.stringify(a)), localStorage.setItem("hideToggle", b.hideToggle), localStorage.setItem("inBasket", b.inBasket)
        },
        loadFromLocalStorage: function () {
          localStorage.getItem("tasks") && (a = JSON.parse(localStorage.getItem("tasks")), a.forEach(function (a) {
            a.$$hashKey = void 0
          })), b.hideToggle = localStorage.getItem("hideToggle"), b.hideToggle ? b.hideToggle = "true" === b.hideToggle : b.hideToggle = !1, b.inBasket = localStorage.getItem("inBasket"), b.inBasket ? b.inBasket = "true" === b.inBasket : b.inBasket = !1
        }
      }
    }]).directive("currentDate", function () {
      return {
        restrict: "E",
        templateUrl: "current-date.html",
        controller: function () {
          this.date = new Date
        },
        controllerAs: "dateCtrl"
      }
    }).directive("controlButtons", ["saveFactory", "appValues", function (b, c) {
      return {
        restrict: "E",
        templateUrl: "control-buttons.html",
        controller: function () {
          b.loadFromLocalStorage(), this.inBasket = c.inBasket, this.hideToggle = c.hideToggle, this.addNewTask = function (c) {
            a.push({
              description: c,
              deleted: !1,
              done: !1,
              hide: !1,
              onchange: !1
            }), b.saveInLocalStorage()
          }, this.toggleDone = function () {
            this.hideToggle = c.hideToggle = !c.hideToggle, a.forEach(function (a) {
              a.done && c.hideToggle && (a.hide = !0), a.done && !c.hideToggle && (a.hide = !1)
            }), b.saveInLocalStorage()
          }, this.toggleDeletedTasks = function () {
            this.inBasket = c.inBasket = !c.inBasket, a.forEach(function (a) {
              a.hide = !0, c.inBasket && a.deleted && (a.hide = !1), !c.inBasket && !a.deleted && (a.hide = !1)
            }), b.saveInLocalStorage()
          }
        },
        controllerAs: "btnCtrl"
      }
    }]).directive("tasksList", ["saveFactory", "appValues", function (b, c) {
      return {
        restrict: "E",
        templateUrl: "tasks-list.html",
        controller: function () {
          this.tasks = a, this.changeTask = function (a, c) {
            a.onchange = !a.onchange, c && (a.description = c), b.saveInLocalStorage()
          }, this.toggleDone = function (a) {
            a.done = !a.done, c.hideToggle && (a.hide = !0), b.saveInLocalStorage()
          }, this.deleteTask = function (a) {
            a.deleted = !0, a.hide = !0, a.done = !1, b.saveInLocalStorage()
          }, this.returnTask = function (a) {
            a.deleted = !1, a.hide = !0, b.saveInLocalStorage()
          }, this.finallyDeleteTask = function (c) {
            if (confirm("Точно удалить задачу?")) {
              for (var d = void 0, e = a.length - 1; e >= 0;) {
                if (a[e].$$hashKey === c.$$hashKey) {
                  d = e;
                  break
                }
                e--
              }
              a.splice(d, 1), b.saveInLocalStorage()
            }
          }
        },
        controllerAs: "taskCtrl"
      }
    }])
  }();