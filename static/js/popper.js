(function (a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.Popper = b()
})(this, function () {
    function ao(a) {
        return a && "[object Function]" === {}.toString.call(a)
    }

    function a5(a, d) {
        if (1 !== a.nodeType) {
            return []
        }
        var c = a.ownerDocument.defaultView, b = c.getComputedStyle(a, null);
        return d ? b[d] : b
    }

    function aR(a) {
        return "HTML" === a.nodeName ? a : a.parentNode || a.host
    }

    function aO(a) {
        if (!a) {
            return document.body
        }
        switch (a.nodeName) {
            case"HTML":
            case"BODY":
                return a.ownerDocument.body;
            case"#document":
                return a.body
        }
        var b = a5(a), d = b.overflow, c = b.overflowX, f = b.overflowY;
        return /(auto|scroll|overlay)/.test(d + f + c) ? a : aO(aR(a))
    }

    function aZ(a) {
        return 11 === a ? aW : 10 === a ? a4 : aW || a4
    }

    function aU(a) {
        if (!a) {
            return document.documentElement
        }
        for (var d = aZ(10) ? document.body : null, c = a.offsetParent || null; c === d && a.nextElementSibling;) {
            c = (a = a.nextElementSibling).offsetParent
        }
        var b = c && c.nodeName;
        return b && "BODY" !== b && "HTML" !== b ? -1 !== ["TH", "TD", "TABLE"].indexOf(c.nodeName) && "static" === a5(c, "position") ? aU(c) : c : a ? a.ownerDocument.documentElement : document.documentElement
    }

    function a2(a) {
        var b = a.nodeName;
        return "BODY" !== b && ("HTML" === b || aU(a.firstElementChild) === a)
    }

    function al(a) {
        return null === a.parentNode ? a : al(a.parentNode)
    }

    function ac(a, k) {
        if (!a || !a.nodeType || !k || !k.nodeType) {
            return document.documentElement
        }
        var h = a.compareDocumentPosition(k) & Node.DOCUMENT_POSITION_FOLLOWING, g = h ? a : k, c = h ? k : a,
            j = document.createRange();
        j.setStart(g, 0), j.setEnd(c, 0);
        var d = j.commonAncestorContainer;
        if (a !== d && k !== d || g.contains(c)) {
            return a2(d) ? d : aU(d)
        }
        var b = al(a);
        return b.host ? ac(b.host, k) : ac(a, al(k).host)
    }

    function aI(a) {
        var g = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
            d = "top" === g ? "scrollTop" : "scrollLeft", c = a.nodeName;
        if ("BODY" === c || "HTML" === c) {
            var b = a.ownerDocument.documentElement, f = a.ownerDocument.scrollingElement || b;
            return f[d]
        }
        return a[d]
    }

    function ar(a, g) {
        var d = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], c = aI(g, "top"), b = aI(g, "left"),
            f = d ? -1 : 1;
        return a.top += c * f, a.bottom += c * f, a.left += b * f, a.right += b * f, a
    }

    function aL(a, d) {
        var c = "x" === d ? "Left" : "Top", b = "Left" == c ? "Right" : "Bottom";
        return parseFloat(a["border" + c + "Width"], 10) + parseFloat(a["border" + b + "Width"], 10)
    }

    function ay(a, d, c, b) {
        return aq(d["offset" + a], d["scroll" + a], c["client" + a], c["offset" + a], c["scroll" + a], aZ(10) ? parseInt(c["offset" + a]) + parseInt(b["margin" + ("Height" === a ? "Top" : "Left")]) + parseInt(b["margin" + ("Height" === a ? "Bottom" : "Right")]) : 0)
    }

    function ai(a) {
        var d = a.body, c = a.documentElement, b = aZ(10) && getComputedStyle(c);
        return {height: ay("Height", d, c, b), width: ay("Width", d, c, b)}
    }

    function av(a) {
        return au({}, a, {right: a.left + a.width, bottom: a.top + a.height})
    }

    function a8(g) {
        var q = {};
        try {
            if (aZ(10)) {
                q = g.getBoundingClientRect();
                var m = aI(g, "top"), l = aI(g, "left");
                q.top += m, q.left += l, q.bottom += m, q.right += l
            } else {
                q = g.getBoundingClientRect()
            }
        } catch (w) {
        }
        var r = {left: q.left, top: q.top, width: q.right - q.left, height: q.bottom - q.top},
            v = "HTML" === g.nodeName ? ai(g.ownerDocument) : {}, c = v.width || g.clientWidth || r.right - r.left,
            b = v.height || g.clientHeight || r.bottom - r.top, j = g.offsetWidth - c, k = g.offsetHeight - b;
        if (j || k) {
            var x = w(g);
            j -= aL(x, "x"), k -= aL(x, "y"), r.width -= j, r.height -= k
        }
        return av(r)
    }

    function ag(n, v) {
        var r = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], x = aZ(10), z = "HTML" === v.nodeName,
            k = a8(n), f = a8(v), t = aO(n), u = a5(v), q = parseFloat(u.borderTopWidth, 10),
            j = parseFloat(u.borderLeftWidth, 10);
        r && z && (f.top = aq(f.top, 0), f.left = aq(f.left, 0));
        var g = av({top: k.top - f.top - q, left: k.left - f.left - j, width: k.width, height: k.height});
        if (g.marginTop = 0, g.marginLeft = 0, !x && z) {
            var A = parseFloat(u.marginTop, 10), B = parseFloat(u.marginLeft, 10);
            g.top -= q - A, g.bottom -= q - A, g.left -= j - B, g.right -= j - B, g.marginTop = A, g.marginLeft = B
        }
        return (x && !r ? v.contains(t) : v === t && "BODY" !== t.nodeName) && (g = ar(g, v)), g
    }

    function bd(b) {
        var l = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], g = b.ownerDocument.documentElement,
            f = ag(b, g), c = aq(g.clientWidth, window.innerWidth || 0),
            j = aq(g.clientHeight, window.innerHeight || 0), h = l ? 0 : aI(g), k = l ? 0 : aI(g, "left"),
            a = {top: h - f.top + f.marginTop, left: k - f.left + f.marginLeft, width: c, height: j};
        return av(a)
    }

    function bh(a) {
        var c = a.nodeName;
        if ("BODY" === c || "HTML" === c) {
            return !1
        }
        if ("fixed" === a5(a, "position")) {
            return !0
        }
        var b = aR(a);
        return !!b && bh(b)
    }

    function ap(a) {
        if (!a || !a.parentElement || aZ()) {
            return document.documentElement
        }
        for (var b = a.parentElement; b && "none" === a5(b, "transform");) {
            b = b.parentElement
        }
        return b || document.documentElement
    }

    function bb(b, y, n, w) {
        var v = 4 < arguments.length && void 0 !== arguments[4] && arguments[4], x = {top: 0, left: 0},
            a = v ? ap(b) : ac(b, y);
        if ("viewport" === w) {
            x = bd(a, v)
        } else {
            var o;
            "scrollParent" === w ? (o = aO(aR(y)), "BODY" === o.nodeName && (o = b.ownerDocument.documentElement)) : "window" === w ? o = b.ownerDocument.documentElement : o = w;
            var c = ag(o, a, v);
            if ("HTML" === o.nodeName && !bh(a)) {
                var q = ai(b.ownerDocument), k = q.height, j = q.width;
                x.top += c.top - c.marginTop, x.bottom = k + c.top, x.left += c.left - c.marginLeft, x.right = j + c.left
            } else {
                x = c
            }
        }
        n = n || 0;
        var z = "number" == typeof n;
        return x.left += z ? n : n.left || 0, x.top += z ? n : n.top || 0, x.right -= z ? n : n.right || 0, x.bottom -= z ? n : n.bottom || 0, x
    }

    function bf(a) {
        var c = a.width, b = a.height;
        return c * b
    }

    function aS(g, x, q, m, j) {
        var v = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === g.indexOf("auto")) {
            return g
        }
        var u = bb(q, m, v, j), w = {
            top: {width: u.width, height: x.top - u.top},
            right: {width: u.right - x.right, height: u.height},
            bottom: {width: u.width, height: u.bottom - x.bottom},
            left: {width: x.left - u.left, height: u.height}
        }, c = Object.keys(w).map(function (a) {
            return au({key: a}, w[a], {area: bf(w[a])})
        }).sort(function (a, d) {
            return d.area - a.area
        }), b = c.filter(function (a) {
            var f = a.width, d = a.height;
            return f >= q.clientWidth && d >= q.clientHeight
        }), k = 0 < b.length ? b[0].key : c[0].key, h = g.split("-")[1];
        return k + (h ? "-" + h : "")
    }

    function aJ(a, f, d) {
        var c = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null, b = c ? ap(f) : ac(f, d);
        return ag(d, b, c)
    }

    function a3(a) {
        var g = a.ownerDocument.defaultView, d = g.getComputedStyle(a),
            c = parseFloat(d.marginTop || 0) + parseFloat(d.marginBottom || 0),
            b = parseFloat(d.marginLeft || 0) + parseFloat(d.marginRight || 0),
            f = {width: a.offsetWidth + b, height: a.offsetHeight + c};
        return f
    }

    function a6(a) {
        var b = {left: "right", right: "left", bottom: "top", top: "bottom"};
        return a.replace(/left|right|bottom|top/g, function (c) {
            return b[c]
        })
    }

    function am(f, q, j) {
        j = j.split("-")[0];
        var h = a3(f), g = {width: h.width, height: h.height}, l = -1 !== ["right", "left"].indexOf(j),
            k = l ? "top" : "left", m = l ? "left" : "top", c = l ? "height" : "width", b = l ? "width" : "height";
        return g[k] = q[k] + q[c] / 2 - h[c] / 2, g[m] = j === m ? q[m] - h[b] : q[a6(m)], g
    }

    function aj(a, b) {
        return Array.prototype.find ? a.find(b) : a.filter(b)[0]
    }

    function aP(a, d, c) {
        if (Array.prototype.findIndex) {
            return a.findIndex(function (f) {
                return f[d] === c
            })
        }
        var b = aj(a, function (f) {
            return f[d] === c
        });
        return a.indexOf(b)
    }

    function aV(d, c, b) {
        var a = void 0 === b ? d : d.slice(0, aP(d, "name", b));
        return a.forEach(function (f) {
            f["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var e = f["function"] || f.fn;
            f.enabled && ao(e) && (c.offsets.popper = av(c.offsets.popper), c.offsets.reference = av(c.offsets.reference), c = e(c, f))
        }), c
    }

    function aG() {
        if (!this.state.isDestroyed) {
            var a = {instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {}};
            a.offsets.reference = aJ(this.state, this.popper, this.reference, this.options.positionFixed), a.placement = aS(this.options.placement, a.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), a.originalPlacement = a.placement, a.positionFixed = this.options.positionFixed, a.offsets.popper = am(this.popper, a.offsets.reference, a.placement), a.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", a = aV(this.modifiers, a), this.state.isCreated ? this.options.onUpdate(a) : (this.state.isCreated = !0, this.options.onCreate(a))
        }
    }

    function be(a, b) {
        return a.some(function (c) {
            var f = c.name, d = c.enabled;
            return d && f === b
        })
    }

    function az(a) {
        for (var g = [!1, "ms", "Webkit", "Moz", "O"], d = a.charAt(0).toUpperCase() + a.slice(1), c = 0; c < g.length; c++) {
            var b = g[c], f = b ? "" + b + d : a;
            if ("undefined" != typeof document.body.style[f]) {
                return f
            }
        }
        return null
    }

    function ah() {
        return this.state.isDestroyed = !0, be(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[az("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function ad(a) {
        var b = a.ownerDocument;
        return b ? b.defaultView : window
    }

    function aM(a, g, c, b) {
        var f = "BODY" === a.nodeName, d = f ? a.ownerDocument.defaultView : a;
        d.addEventListener(g, c, {passive: !0}), f || aM(aO(d.parentNode), g, c, b), b.push(d)
    }

    function at(a, f, c, b) {
        c.updateBound = b, ad(a).addEventListener("resize", c.updateBound, {passive: !0});
        var d = aO(a);
        return aM(d, "scroll", c.updateBound, c.scrollParents), c.scrollElement = d, c.eventsEnabled = !0, c
    }

    function aC() {
        this.state.eventsEnabled || (this.state = at(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function a0(a, b) {
        return ad(a).removeEventListener("resize", b.updateBound), b.scrollParents.forEach(function (c) {
            c.removeEventListener("scroll", b.updateBound)
        }), b.updateBound = null, b.scrollParents = [], b.scrollElement = null, b.eventsEnabled = !1, b
    }

    function a9() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = a0(this.reference, this.state))
    }

    function bi(a) {
        return "" !== a && !isNaN(parseFloat(a)) && isFinite(a)
    }

    function aE(a, b) {
        Object.keys(b).forEach(function (d) {
            var c = "";
            -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(d) && bi(b[d]) && (c = "px"), a.style[d] = b[d] + c
        })
    }

    function bc(a, b) {
        Object.keys(b).forEach(function (d) {
            var c = b[d];
            !1 === c ? a.removeAttribute(d) : a.setAttribute(d, b[d])
        })
    }

    function aX(g, z) {
        var v = g.offsets, u = v.popper, j = v.reference, x = aa, w = function (a) {
                return a
            }, y = x(j.width), c = x(u.width), b = -1 !== ["left", "right"].indexOf(g.placement),
            k = -1 !== g.placement.indexOf("-"), h = z ? b || k || y % 2 == c % 2 ? x : bk : w, q = z ? x : w;
        return {
            left: h(1 == y % 2 && 1 == c % 2 && !k && z ? u.left - 1 : u.left),
            top: q(u.top),
            bottom: q(u.bottom),
            right: h(u.right)
        }
    }

    function aH(a, g, d) {
        var c = aj(a, function (h) {
            var i = h.name;
            return i === g
        }), b = !!c && a.some(function (h) {
            return h.name === d && h.enabled && h.order < c.order
        });
        if (!b) {
            var f = "`" + g + "`";
            console.warn("`" + d + "` modifier is required by " + f + " modifier in order to work, be sure to include it before " + f + "!")
        }
        return b
    }

    function bj(a) {
        return "end" === a ? "start" : "start" === a ? "end" : a
    }

    function aw(a) {
        var d = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], c = ak.indexOf(a),
            b = ak.slice(c + 1).concat(ak.slice(0, c));
        return d ? b.reverse() : b
    }

    function ab(f, q, j, h) {
        var g = f.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), l = +g[1], k = g[2];
        if (!l) {
            return f
        }
        if (0 === k.indexOf("%")) {
            var m;
            switch (k) {
                case"%p":
                    m = j;
                    break;
                case"%":
                case"%r":
                default:
                    m = h
            }
            var c = av(m);
            return c[q] / 100 * l
        }
        if ("vh" === k || "vw" === k) {
            var b;
            return b = "vh" === k ? aq(document.documentElement.clientHeight, window.innerHeight || 0) : aq(document.documentElement.clientWidth, window.innerWidth || 0), b / 100 * l
        }
        return l
    }

    function bg(f, q, j, h) {
        var g = [0, 0], l = -1 !== ["right", "left"].indexOf(h), k = f.split(/(\+|\-)/).map(function (a) {
            return a.trim()
        }), m = k.indexOf(aj(k, function (a) {
            return -1 !== a.search(/,|\s/)
        }));
        k[m] && -1 === k[m].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var c = /\s*,\s*|\s+/,
            b = -1 === m ? [k] : [k.slice(0, m).concat([k[m].split(c)[0]]), [k[m].split(c)[1]].concat(k.slice(m + 1))];
        return b = b.map(function (a, o) {
            var d = (1 === o ? !l : l) ? "height" : "width", r = !1;
            return a.reduce(function (i, n) {
                return "" === i[i.length - 1] && -1 !== ["+", "-"].indexOf(n) ? (i[i.length - 1] = n, r = !0, i) : r ? (i[i.length - 1] += n, r = !1, i) : i.concat(n)
            }, []).map(function (i) {
                return ab(i, d, q, j)
            })
        }), b.forEach(function (a, d) {
            a.forEach(function (i, e) {
                bi(i) && (g[d] += i * ("-" === a[e - 1] ? -1 : 1))
            })
        }), g
    }

    function aF(b, l) {
        var g, f = l.offset, c = b.placement, j = b.offsets, h = j.popper, k = j.reference, a = c.split("-")[0];
        return g = bi(+f) ? [+f, 0] : bg(f, h, k, a), "left" === a ? (h.top += g[0], h.left -= g[1]) : "right" === a ? (h.top += g[0], h.left += g[1]) : "top" === a ? (h.left += g[0], h.top -= g[1]) : "bottom" === a && (h.left += g[0], h.top += g[1]), b.popper = h, b
    }

    for (var aY = Math.min, bk = Math.floor, aa = Math.round, aq = Math.max, a7 = "undefined" != typeof window && "undefined" != typeof document, aT = ["Edge", "Trident", "Firefox"], aQ = 0, aD = 0; aD < aT.length; aD += 1) {
        if (a7 && 0 <= navigator.userAgent.indexOf(aT[aD])) {
            aQ = 1;
            break
        }
    }
    var aB = a7 && window.Promise, a1 = aB ? function (a) {
            var b = !1;
            return function () {
                b || (b = !0, window.Promise.resolve().then(function () {
                    b = !1, a()
                }))
            }
        } : function (a) {
            var b = !1;
            return function () {
                b || (b = !0, setTimeout(function () {
                    b = !1, a()
                }, aQ))
            }
        }, aW = a7 && !!(window.MSInputMethodContext && document.documentMode),
        a4 = a7 && /MSIE 10/.test(navigator.userAgent), an = function (a, b) {
            if (!(a instanceof b)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }, af = function () {
            function a(b, f) {
                for (var d, c = 0; c < f.length; c++) {
                    d = f[c], d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(b, d.key, d)
                }
            }

            return function (d, c, b) {
                return c && a(d.prototype, c), b && a(d, b), d
            }
        }(), aK = function (a, c, b) {
            return c in a ? Object.defineProperty(a, c, {
                value: b,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : a[c] = b, a
        }, au = Object.assign || function (a) {
            for (var d, c = 1; c < arguments.length; c++) {
                for (var b in d = arguments[c], d) {
                    Object.prototype.hasOwnProperty.call(d, b) && (a[b] = d[b])
                }
            }
            return a
        }, aN = a7 && /Firefox/i.test(navigator.userAgent),
        aA = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        ak = aA.slice(3), ax = {FLIP: "flip", CLOCKWISE: "clockwise", COUNTERCLOCKWISE: "counterclockwise"},
        ba = function () {
            function a(d, c) {
                var b = this, f = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                an(this, a), this.scheduleUpdate = function () {
                    return requestAnimationFrame(b.update)
                }, this.update = a1(this.update.bind(this)), this.options = au({}, a.Defaults, f), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = d && d.jquery ? d[0] : d, this.popper = c && c.jquery ? c[0] : c, this.options.modifiers = {}, Object.keys(au({}, a.Defaults.modifiers, f.modifiers)).forEach(function (g) {
                    b.options.modifiers[g] = au({}, a.Defaults.modifiers[g] || {}, f.modifiers ? f.modifiers[g] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function (g) {
                    return au({name: g}, b.options.modifiers[g])
                }).sort(function (g, h) {
                    return g.order - h.order
                }), this.modifiers.forEach(function (g) {
                    g.enabled && ao(g.onLoad) && g.onLoad(b.reference, b.popper, b.options, g, b.state)
                }), this.update();
                var e = this.options.eventsEnabled;
                e && this.enableEventListeners(), this.state.eventsEnabled = e
            }

            return af(a, [{
                key: "update", value: function () {
                    return aG.call(this)
                }
            }, {
                key: "destroy", value: function () {
                    return ah.call(this)
                }
            }, {
                key: "enableEventListeners", value: function () {
                    return aC.call(this)
                }
            }, {
                key: "disableEventListeners", value: function () {
                    return a9.call(this)
                }
            }]), a
        }();
    return ba.Utils = ("undefined" == typeof window ? global : window).PopperUtils, ba.placements = aA, ba.Defaults = {
        placement: "bottom", positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function () {
        }, onUpdate: function () {
        }, modifiers: {
            shift: {
                order: 100, enabled: !0, fn: function (f) {
                    var v = f.placement, k = v.split("-")[0], j = v.split("-")[1];
                    if (j) {
                        var g = f.offsets, q = g.reference, m = g.popper, u = -1 !== ["bottom", "top"].indexOf(k),
                            c = u ? "left" : "top", b = u ? "width" : "height",
                            h = {start: aK({}, c, q[c]), end: aK({}, c, q[c] + q[b] - m[b])};
                        f.offsets.popper = au({}, m, h[j])
                    }
                    return f
                }
            },
            offset: {order: 200, enabled: !0, fn: aF, offset: 0},
            preventOverflow: {
                order: 300, enabled: !0, fn: function (g, x) {
                    var u = x.boundariesElement || aU(g.instance.popper);
                    g.instance.reference === u && (u = aU(u));
                    var q = az("transform"), j = g.instance.popper.style, v = j.top, w = j.left, c = j[q];
                    j.top = "", j.left = "", j[q] = "";
                    var b = bb(g.instance.popper, g.instance.reference, x.padding, u, g.positionFixed);
                    j.top = v, j.left = w, j[q] = c, x.boundaries = b;
                    var k = x.priority, h = g.offsets.popper, p = {
                        primary: function (a) {
                            var d = h[a];
                            return h[a] < b[a] && !x.escapeWithReference && (d = aq(h[a], b[a])), aK({}, a, d)
                        }, secondary: function (a) {
                            var f = "right" === a ? "left" : "top", d = h[f];
                            return h[a] > b[a] && !x.escapeWithReference && (d = aY(h[f], b[a] - ("right" === a ? h.width : h.height))), aK({}, f, d)
                        }
                    };
                    return k.forEach(function (a) {
                        var d = -1 === ["left", "top"].indexOf(a) ? "secondary" : "primary";
                        h = au({}, h, p[d](a))
                    }), g.offsets.popper = h, g
                }, priority: ["left", "right", "top", "bottom"], padding: 5, boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400, enabled: !0, fn: function (f) {
                    var q = f.offsets, j = q.popper, h = q.reference, g = f.placement.split("-")[0], l = bk,
                        k = -1 !== ["top", "bottom"].indexOf(g), m = k ? "right" : "bottom", c = k ? "left" : "top",
                        b = k ? "width" : "height";
                    return j[m] < l(h[c]) && (f.offsets.popper[c] = l(h[c]) - j[b]), j[c] > l(h[m]) && (f.offsets.popper[c] = l(h[m])), f
                }
            },
            arrow: {
                order: 500, enabled: !0, fn: function (t, G) {
                    var F;
                    if (!aH(t.instance.modifiers, "arrow", "keepTogether")) {
                        return t
                    }
                    var B = G.element;
                    if ("string" == typeof B) {
                        if (B = t.instance.popper.querySelector(B), !B) {
                            return t
                        }
                    } else {
                        if (!t.instance.popper.contains(B)) {
                            return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t
                        }
                    }
                    var I = t.placement.split("-")[0], H = t.offsets, J = H.popper, q = H.reference,
                        g = -1 !== ["left", "right"].indexOf(I), C = g ? "height" : "width", z = g ? "Top" : "Left",
                        D = z.toLowerCase(), A = g ? "left" : "top", k = g ? "bottom" : "right", K = a3(B)[C];
                    q[k] - K < J[D] && (t.offsets.popper[D] -= J[D] - (q[k] - K)), q[D] + K > J[k] && (t.offsets.popper[D] += q[D] + K - J[k]), t.offsets.popper = av(t.offsets.popper);
                    var j = q[D] + q[C] / 2 - K / 2, M = a5(t.instance.popper), N = parseFloat(M["margin" + z], 10),
                        x = parseFloat(M["border" + z + "Width"], 10), L = j - t.offsets.popper[D] - N - x;
                    return L = aq(aY(J[C] - K, L), 0), t.arrowElement = B, t.offsets.arrow = (F = {}, aK(F, D, aa(L)), aK(F, A, ""), F), t
                }, element: "[x-arrow]"
            },
            flip: {
                order: 600, enabled: !0, fn: function (a, h) {
                    if (be(a.instance.modifiers, "inner")) {
                        return a
                    }
                    if (a.flipped && a.placement === a.originalPlacement) {
                        return a
                    }
                    var d = bb(a.instance.popper, a.instance.reference, h.padding, h.boundariesElement, a.positionFixed),
                        c = a.placement.split("-")[0], b = a6(c), g = a.placement.split("-")[1] || "", f = [];
                    switch (h.behavior) {
                        case ax.FLIP:
                            f = [c, b];
                            break;
                        case ax.CLOCKWISE:
                            f = aw(c);
                            break;
                        case ax.COUNTERCLOCKWISE:
                            f = aw(c, !0);
                            break;
                        default:
                            f = h.behavior
                    }
                    return f.forEach(function (t, k) {
                        if (c !== t || f.length === k + 1) {
                            return a
                        }
                        c = a.placement.split("-")[0], b = a6(c);
                        var e = a.offsets.popper, q = a.offsets.reference, n = bk,
                            r = "left" === c && n(e.right) > n(q.left) || "right" === c && n(e.left) < n(q.right) || "top" === c && n(e.bottom) > n(q.top) || "bottom" === c && n(e.top) < n(q.bottom),
                            p = n(e.left) < n(d.left), j = n(e.right) > n(d.right), o = n(e.top) < n(d.top),
                            v = n(e.bottom) > n(d.bottom),
                            i = "left" === c && p || "right" === c && j || "top" === c && o || "bottom" === c && v,
                            x = -1 !== ["top", "bottom"].indexOf(c),
                            z = !!h.flipVariations && (x && "start" === g && p || x && "end" === g && j || !x && "start" === g && o || !x && "end" === g && v);
                        (r || i || z) && (a.flipped = !0, (r || i) && (c = f[k + 1]), z && (g = bj(g)), a.placement = c + (g ? "-" + g : ""), a.offsets.popper = au({}, a.offsets.popper, am(a.instance.popper, a.offsets.reference, a.placement)), a = aV(a.instance.modifiers, a, "flip"))
                    }), a
                }, behavior: "flip", padding: 5, boundariesElement: "viewport"
            },
            inner: {
                order: 700, enabled: !1, fn: function (a) {
                    var j = a.placement, d = j.split("-")[0], c = a.offsets, b = c.popper, g = c.reference,
                        f = -1 !== ["left", "right"].indexOf(d), h = -1 === ["top", "left"].indexOf(d);
                    return b[f ? "left" : "top"] = g[d] - (h ? b[f ? "width" : "height"] : 0), a.placement = a6(j), a.offsets.popper = av(b), a
                }
            },
            hide: {
                order: 800, enabled: !0, fn: function (a) {
                    if (!aH(a.instance.modifiers, "hide", "preventOverflow")) {
                        return a
                    }
                    var c = a.offsets.reference, b = aj(a.instance.modifiers, function (d) {
                        return "preventOverflow" === d.name
                    }).boundaries;
                    if (c.bottom < b.top || c.left > b.right || c.top > b.bottom || c.right < b.left) {
                        if (!0 === a.hide) {
                            return a
                        }
                        a.hide = !0, a.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === a.hide) {
                            return a
                        }
                        a.hide = !1, a.attributes["x-out-of-boundaries"] = !1
                    }
                    return a
                }
            },
            computeStyle: {
                order: 850, enabled: !0, fn: function (u, J) {
                    var G = J.x, F = J.y, B = u.offsets.popper, H = aj(u.instance.modifiers, function (a) {
                        return "applyStyle" === a.name
                    }).gpuAcceleration;
                    void 0 !== H && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var I, q, j = void 0 === H ? J.gpuAcceleration : H, C = aU(u.instance.popper), x = a8(C),
                        D = {position: B.position}, A = aX(u, 2 > window.devicePixelRatio || !aN),
                        p = "bottom" === G ? "top" : "bottom", z = "right" === F ? "left" : "right",
                        k = az("transform");
                    if (q = "bottom" == p ? "HTML" === C.nodeName ? -C.clientHeight + A.bottom : -x.height + A.bottom : A.top, I = "right" == z ? "HTML" === C.nodeName ? -C.clientWidth + A.right : -x.width + A.right : A.left, j && k) {
                        D[k] = "translate3d(" + I + "px, " + q + "px, 0)", D[p] = 0, D[z] = 0, D.willChange = "transform"
                    } else {
                        var K = "bottom" == p ? -1 : 1, L = "right" == z ? -1 : 1;
                        D[p] = q * K, D[z] = I * L, D.willChange = p + ", " + z
                    }
                    var v = {"x-placement": u.placement};
                    return u.attributes = au({}, v, u.attributes), u.styles = au({}, D, u.styles), u.arrowStyles = au({}, u.offsets.arrow, u.arrowStyles), u
                }, gpuAcceleration: !0, x: "bottom", y: "right"
            },
            applyStyle: {
                order: 900, enabled: !0, fn: function (a) {
                    return aE(a.instance.popper, a.styles), bc(a.instance.popper, a.attributes), a.arrowElement && Object.keys(a.arrowStyles).length && aE(a.arrowElement, a.arrowStyles), a
                }, onLoad: function (a, h, d, c, b) {
                    var g = aJ(b, h, a, d.positionFixed),
                        f = aS(d.placement, g, h, a, d.modifiers.flip.boundariesElement, d.modifiers.flip.padding);
                    return h.setAttribute("x-placement", f), aE(h, {position: d.positionFixed ? "fixed" : "absolute"}), d
                }, gpuAcceleration: void 0
            }
        }
    }, ba
});