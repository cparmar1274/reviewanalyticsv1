!function t(e, n, r) {
    function o(i, s) {
        if (!n[i]) {
            if (!e[i]) {
                var a = "function" == typeof require && require;
                if (!s && a) return a(i, !0);
                if (l) return l(i, !0);
                var c = new Error("Cannot find module '" + i + "'");
                throw c.code = "MODULE_NOT_FOUND", c;
            }
            var u = n[i] = {
                exports: {}
            };
            e[i][0].call(u.exports, function(t) {
                return o(e[i][1][t] || t);
            }, u, u.exports, t, e, n, r);
        }
        return n[i].exports;
    }
    for (var l = "function" == typeof require && require, i = 0; i < r.length; i++) o(r[i]);
    return o;
}({
    1: [ function(t, e, n) {
        "use strict";
        function r(t) {
            t.fn.perfectScrollbar = function(t) {
                return this.each(function() {
                    if ("object" == typeof t || void 0 === t) {
                        var e = t;
                        l.get(this) || o.initialize(this, e);
                    } else {
                        var n = t;
                        "update" === n ? o.update(this) : "destroy" === n && o.destroy(this);
                    }
                });
            };
        }
        var o = t("../main"), l = t("../plugin/instances");
        if ("function" == typeof define && define.amd) define([ "jquery" ], r); else {
            var i = window.jQuery ? window.jQuery : window.$;
            void 0 !== i && r(i);
        }
        e.exports = r;
    }, {
        "../main": 7,
        "../plugin/instances": 18
    } ],
    2: [ function(t, e, n) {
        "use strict";
        n.add = function(t, e) {
            t.classList ? t.classList.add(e) : function(t, e) {
                var n = t.className.split(" ");
                n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ");
            }(t, e);
        }, n.remove = function(t, e) {
            t.classList ? t.classList.remove(e) : function(t, e) {
                var n = t.className.split(" "), r = n.indexOf(e);
                0 <= r && n.splice(r, 1), t.className = n.join(" ");
            }(t, e);
        }, n.list = function(t) {
            return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ");
        };
    }, {} ],
    3: [ function(t, e, n) {
        "use strict";
        var i = {
            e: function(t, e) {
                var n = document.createElement(t);
                return n.className = e, n;
            },
            appendTo: function(t, e) {
                return e.appendChild(t), t;
            }
        };
        i.css = function(t, e, n) {
            return "object" == typeof e ? function(t, e) {
                for (var n in e) {
                    var r = e[n];
                    "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r;
                }
                return t;
            }(t, e) : void 0 === n ? function(t, e) {
                return window.getComputedStyle(t)[e];
            }(t, e) : function(t, e, n) {
                return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t;
            }(t, e, n);
        }, i.matches = function(t, e) {
            return void 0 !== t.matches ? t.matches(e) : void 0 !== t.matchesSelector ? t.matchesSelector(e) : void 0 !== t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : void 0 !== t.mozMatchesSelector ? t.mozMatchesSelector(e) : void 0 !== t.msMatchesSelector ? t.msMatchesSelector(e) : void 0;
        }, i.remove = function(t) {
            void 0 !== t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t);
        }, i.queryChildren = function(t, e) {
            return Array.prototype.filter.call(t.childNodes, function(t) {
                return i.matches(t, e);
            });
        }, e.exports = i;
    }, {} ],
    4: [ function(t, e, n) {
        "use strict";
        var r = function(t) {
            this.element = t, this.events = {};
        };
        r.prototype.bind = function(t, e) {
            void 0 === this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1);
        }, r.prototype.unbind = function(t, e) {
            var n = void 0 !== e;
            this.events[t] = this.events[t].filter(function(r) {
                return !(!n || r === e) || (this.element.removeEventListener(t, r, !1), !1);
            }, this);
        }, r.prototype.unbindAll = function() {
            for (var t in this.events) this.unbind(t);
        };
        var o = function() {
            this.eventElements = [];
        };
        o.prototype.eventElement = function(t) {
            var e = this.eventElements.filter(function(e) {
                return e.element === t;
            })[0];
            return void 0 === e && (e = new r(t), this.eventElements.push(e)), e;
        }, o.prototype.bind = function(t, e, n) {
            this.eventElement(t).bind(e, n);
        }, o.prototype.unbind = function(t, e, n) {
            this.eventElement(t).unbind(e, n);
        }, o.prototype.unbindAll = function() {
            for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll();
        }, o.prototype.once = function(t, e, n) {
            var r = this.eventElement(t), o = function(t) {
                r.unbind(e, o), n(t);
            };
            r.bind(e, o);
        }, e.exports = o;
    }, {} ],
    5: [ function(t, e, n) {
        "use strict";
        e.exports = function() {
            function t() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
            }
            return function() {
                return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
            };
        }();
    }, {} ],
    6: [ function(t, e, n) {
        "use strict";
        var r = t("./class"), o = t("./dom"), l = n.toInt = function(t) {
            return parseInt(t, 10) || 0;
        }, i = n.clone = function(t) {
            if (t) {
                if (t.constructor === Array) return t.map(i);
                if ("object" != typeof t) return t;
                var e = {};
                for (var n in t) e[n] = i(t[n]);
                return e;
            }
            return null;
        };
        n.extend = function(t, e) {
            var n = i(t);
            for (var r in e) n[r] = i(e[r]);
            return n;
        }, n.isEditable = function(t) {
            return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]");
        }, n.removePsClasses = function(t) {
            for (var e = r.list(t), n = 0; n < e.length; n++) {
                var o = e[n];
                0 === o.indexOf("ps-") && r.remove(t, o);
            }
        }, n.outerWidth = function(t) {
            return l(o.css(t, "width")) + l(o.css(t, "paddingLeft")) + l(o.css(t, "paddingRight")) + l(o.css(t, "borderLeftWidth")) + l(o.css(t, "borderRightWidth"));
        }, n.startScrolling = function(t, e) {
            r.add(t, "ps-in-scrolling"), void 0 !== e ? r.add(t, "ps-" + e) : (r.add(t, "ps-x"), 
            r.add(t, "ps-y"));
        }, n.stopScrolling = function(t, e) {
            r.remove(t, "ps-in-scrolling"), void 0 !== e ? r.remove(t, "ps-" + e) : (r.remove(t, "ps-x"), 
            r.remove(t, "ps-y"));
        }, n.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            supportsIePointer: null !== window.navigator.msMaxTouchPoints
        };
    }, {
        "./class": 2,
        "./dom": 3
    } ],
    7: [ function(t, e, n) {
        "use strict";
        var r = t("./plugin/destroy"), o = t("./plugin/initialize"), l = t("./plugin/update");
        e.exports = {
            initialize: o,
            update: l,
            destroy: r
        };
    }, {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21
    } ],
    8: [ function(t, e, n) {
        "use strict";
        e.exports = {
            handlers: [ "click-rail", "drag-scrollbar", "keyboard", "wheel", "touch" ],
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipePropagation: !0,
            useBothWheelAxes: !1,
            wheelPropagation: !1,
            wheelSpeed: 1,
            theme: "default"
        };
    }, {} ],
    9: [ function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"), o = t("../lib/dom"), l = t("./instances");
        e.exports = function(t) {
            var e = l.get(t);
            e && (e.event.unbindAll(), o.remove(e.scrollbarX), o.remove(e.scrollbarY), o.remove(e.scrollbarXRail), 
            o.remove(e.scrollbarYRail), r.removePsClasses(t), l.remove(t));
        };
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18
    } ],
    10: [ function(t, e, n) {
        "use strict";
        var o = t("../instances"), l = t("../update-geometry"), i = t("../update-scroll");
        e.exports = function(t) {
            !function(t, e) {
                function n(t) {
                    return t.getBoundingClientRect();
                }
                var r = function(t) {
                    t.stopPropagation();
                };
                e.event.bind(e.scrollbarY, "click", r), e.event.bind(e.scrollbarYRail, "click", function(r) {
                    var o = r.pageY - window.pageYOffset - n(e.scrollbarYRail).top > e.scrollbarYTop ? 1 : -1;
                    i(t, "top", t.scrollTop + o * e.containerHeight), l(t), r.stopPropagation();
                }), e.event.bind(e.scrollbarX, "click", r), e.event.bind(e.scrollbarXRail, "click", function(r) {
                    var o = r.pageX - window.pageXOffset - n(e.scrollbarXRail).left > e.scrollbarXLeft ? 1 : -1;
                    i(t, "left", t.scrollLeft + o * e.containerWidth), l(t), r.stopPropagation();
                });
            }(t, o.get(t));
        };
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    } ],
    11: [ function(t, e, n) {
        "use strict";
        var l = t("../../lib/helper"), i = t("../../lib/dom"), s = t("../instances"), a = t("../update-geometry"), c = t("../update-scroll");
        e.exports = function(t) {
            var e = s.get(t);
            (function(t, e) {
                function n(n) {
                    var o = r + n * e.railXRatio, i = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                    e.scrollbarXLeft = o < 0 ? 0 : i < o ? i : o;
                    var s = l.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                    c(t, "left", s);
                }
                var r = null, o = null, s = function(e) {
                    n(e.pageX - o), a(t), e.stopPropagation(), e.preventDefault();
                }, u = function() {
                    l.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", s);
                };
                e.event.bind(e.scrollbarX, "mousedown", function(n) {
                    o = n.pageX, r = l.toInt(i.css(e.scrollbarX, "left")) * e.railXRatio, l.startScrolling(t, "x"), 
                    e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), 
                    n.stopPropagation(), n.preventDefault();
                });
            })(t, e), function(t, e) {
                function n(n) {
                    var o = r + n * e.railYRatio, i = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                    e.scrollbarYTop = o < 0 ? 0 : i < o ? i : o;
                    var s = l.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                    c(t, "top", s);
                }
                var r = null, o = null, s = function(e) {
                    n(e.pageY - o), a(t), e.stopPropagation(), e.preventDefault();
                }, u = function() {
                    l.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", s);
                };
                e.event.bind(e.scrollbarY, "mousedown", function(n) {
                    o = n.pageY, r = l.toInt(i.css(e.scrollbarY, "top")) * e.railYRatio, l.startScrolling(t, "y"), 
                    e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), 
                    n.stopPropagation(), n.preventDefault();
                });
            }(t, e);
        };
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    } ],
    12: [ function(t, e, n) {
        "use strict";
        function r(t, e) {
            var r = !1;
            e.event.bind(t, "mouseenter", function() {
                r = !0;
            }), e.event.bind(t, "mouseleave", function() {
                r = !1;
            });
            e.event.bind(e.ownerDocument, "keydown", function(c) {
                if (!(c.isDefaultPrevented && c.isDefaultPrevented() || c.defaultPrevented)) {
                    var u = l.matches(e.scrollbarX, ":focus") || l.matches(e.scrollbarY, ":focus");
                    if (r || u) {
                        var d = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                        if (d) {
                            if ("IFRAME" === d.tagName) d = d.contentDocument.activeElement; else for (;d.shadowRoot; ) d = d.shadowRoot.activeElement;
                            if (o.isEditable(d)) return;
                        }
                        var p = 0, h = 0;
                        switch (c.which) {
                          case 37:
                            p = c.metaKey ? -e.contentWidth : c.altKey ? -e.containerWidth : -30;
                            break;

                          case 38:
                            h = c.metaKey ? e.contentHeight : c.altKey ? e.containerHeight : 30;
                            break;

                          case 39:
                            p = c.metaKey ? e.contentWidth : c.altKey ? e.containerWidth : 30;
                            break;

                          case 40:
                            h = c.metaKey ? -e.contentHeight : c.altKey ? -e.containerHeight : -30;
                            break;

                          case 33:
                            h = 90;
                            break;

                          case 32:
                            h = c.shiftKey ? 90 : -90;
                            break;

                          case 34:
                            h = -90;
                            break;

                          case 35:
                            h = c.ctrlKey ? -e.contentHeight : -e.containerHeight;
                            break;

                          case 36:
                            h = c.ctrlKey ? t.scrollTop : e.containerHeight;
                            break;

                          default:
                            return;
                        }
                        a(t, "top", t.scrollTop - h), a(t, "left", t.scrollLeft + p), s(t), function(n, r) {
                            var o = t.scrollTop;
                            if (0 === n) {
                                if (!e.scrollbarYActive) return !1;
                                if (0 === o && 0 < r || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation;
                            }
                            var l = t.scrollLeft;
                            if (0 === r) {
                                if (!e.scrollbarXActive) return !1;
                                if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && 0 < n) return !e.settings.wheelPropagation;
                            }
                            return !0;
                        }(p, h) && c.preventDefault();
                    }
                }
            });
        }
        var o = t("../../lib/helper"), l = t("../../lib/dom"), i = t("../instances"), s = t("../update-geometry"), a = t("../update-scroll");
        e.exports = function(t) {
            r(t, i.get(t));
        };
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    } ],
    13: [ function(t, e, n) {
        "use strict";
        function r(t, e) {
            function s(s) {
                var c = function(t) {
                    var e = t.deltaX, n = -1 * t.deltaY;
                    return void 0 !== e && void 0 !== n || (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), 
                    t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e != e && n != n && (e = 0, 
                    n = t.wheelDelta), t.shiftKey ? [ -n, -e ] : [ e, n ];
                }(s), u = c[0], d = c[1];
                (function(e, n) {
                    var r = t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                    if (r) {
                        if (!window.getComputedStyle(r).overflow.match(/(scroll|auto)/)) return !1;
                        var o = r.scrollHeight - r.clientHeight;
                        if (0 < o && !(0 === r.scrollTop && 0 < n || r.scrollTop === o && n < 0)) return !0;
                        var l = r.scrollLeft - r.clientWidth;
                        if (0 < l && !(0 === r.scrollLeft && e < 0 || r.scrollLeft === l && 0 < e)) return !0;
                    }
                    return !1;
                })(u, d) || (a = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (i(t, "top", d ? t.scrollTop - d * e.settings.wheelSpeed : t.scrollTop + u * e.settings.wheelSpeed), 
                a = !0) : e.scrollbarXActive && !e.scrollbarYActive && (i(t, "left", u ? t.scrollLeft + u * e.settings.wheelSpeed : t.scrollLeft - d * e.settings.wheelSpeed), 
                a = !0) : (i(t, "top", t.scrollTop - d * e.settings.wheelSpeed), i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed)), 
                l(t), (a = a || function(n, r) {
                    var o = t.scrollTop;
                    if (0 === n) {
                        if (!e.scrollbarYActive) return !1;
                        if (0 === o && 0 < r || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation;
                    }
                    var l = t.scrollLeft;
                    if (0 === r) {
                        if (!e.scrollbarXActive) return !1;
                        if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && 0 < n) return !e.settings.wheelPropagation;
                    }
                    return !0;
                }(u, d)) && (s.stopPropagation(), s.preventDefault()));
            }
            var a = !1;
            void 0 !== window.onwheel ? e.event.bind(t, "wheel", s) : void 0 !== window.onmousewheel && e.event.bind(t, "mousewheel", s);
        }
        var o = t("../instances"), l = t("../update-geometry"), i = t("../update-scroll");
        e.exports = function(t) {
            r(t, o.get(t));
        };
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    } ],
    14: [ function(t, e, n) {
        "use strict";
        var o = t("../instances"), l = t("../update-geometry");
        e.exports = function(t) {
            !function(t, e) {
                e.event.bind(t, "scroll", function() {
                    l(t);
                });
            }(t, o.get(t));
        };
    }, {
        "../instances": 18,
        "../update-geometry": 19
    } ],
    15: [ function(t, e, n) {
        "use strict";
        function r(t, e) {
            function r() {
                c || (c = setInterval(function() {
                    l.get(t) ? (s(t, "top", t.scrollTop + u.top), s(t, "left", t.scrollLeft + u.left), 
                    i(t)) : clearInterval(c);
                }, 50));
            }
            function a() {
                c && (clearInterval(c), c = null), o.stopScrolling(t);
            }
            var c = null, u = {
                top: 0,
                left: 0
            }, d = !1;
            e.event.bind(e.ownerDocument, "selectionchange", function() {
                t.contains(function() {
                    var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                    return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer;
                }()) ? d = !0 : (d = !1, a());
            }), e.event.bind(window, "mouseup", function() {
                d && (d = !1, a());
            }), e.event.bind(window, "keyup", function() {
                d && (d = !1, a());
            }), e.event.bind(window, "mousemove", function(e) {
                if (d) {
                    var n_x = e.pageX, n_y = e.pageY, l_left = t.offsetLeft, l_right = t.offsetLeft + t.offsetWidth, l_top = t.offsetTop, l_bottom = t.offsetTop + t.offsetHeight;
                    n_x < l_left + 3 ? (u.left = -5, o.startScrolling(t, "x")) : l_right - 3 < n_x ? (u.left = 5, 
                    o.startScrolling(t, "x")) : u.left = 0, n_y < l_top + 3 ? (u.top = l_top + 3 - n_y < 5 ? -5 : -20, 
                    o.startScrolling(t, "y")) : l_bottom - 3 < n_y ? (u.top = n_y - l_bottom + 3 < 5 ? 5 : 20, 
                    o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? a() : r();
                }
            });
        }
        var o = t("../../lib/helper"), l = t("../instances"), i = t("../update-geometry"), s = t("../update-scroll");
        e.exports = function(t) {
            r(t, l.get(t));
        };
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    } ],
    16: [ function(t, e, n) {
        "use strict";
        var o = t("../../lib/helper"), l = t("../instances"), i = t("../update-geometry"), s = t("../update-scroll");
        e.exports = function(t) {
            (o.env.supportsTouch || o.env.supportsIePointer) && function(t, e, n, r) {
                function o(n, r) {
                    var o = t.scrollTop, l = t.scrollLeft, i = Math.abs(n), s = Math.abs(r);
                    if (i < s) {
                        if (r < 0 && o === e.contentHeight - e.containerHeight || 0 < r && 0 === o) return !e.settings.swipePropagation;
                    } else if (s < i && (n < 0 && l === e.contentWidth - e.containerWidth || 0 < n && 0 === l)) return !e.settings.swipePropagation;
                    return !0;
                }
                function a(e, n) {
                    s(t, "top", t.scrollTop - n), s(t, "left", t.scrollLeft - e), i(t);
                }
                function c() {
                    Y = !0;
                }
                function u() {
                    Y = !1;
                }
                function d(t) {
                    return t.targetTouches ? t.targetTouches[0] : t;
                }
                function p(t) {
                    return !(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE);
                }
                function h(t) {
                    if (p(t)) {
                        y = !0;
                        var e = d(t);
                        v.pageX = e.pageX, v.pageY = e.pageY, g = new Date().getTime(), null !== w && clearInterval(w), 
                        t.stopPropagation();
                    }
                }
                function f(t) {
                    if (!y && e.settings.swipePropagation && h(t), !Y && y && p(t)) {
                        var n = d(t), r = {
                            pageX: n.pageX,
                            pageY: n.pageY
                        }, l = r.pageX - v.pageX, i = r.pageY - v.pageY;
                        a(l, i), v = r;
                        var s = new Date().getTime(), c = s - g;
                        0 < c && (m.x = l / c, m.y = i / c, g = s), o(l, i) && (t.stopPropagation(), t.preventDefault());
                    }
                }
                function b() {
                    !Y && y && (y = !1, clearInterval(w), w = setInterval(function() {
                        l.get(t) && (m.x || m.y) ? Math.abs(m.x) < .01 && Math.abs(m.y) < .01 ? clearInterval(w) : (a(30 * m.x, 30 * m.y), 
                        m.x *= .8, m.y *= .8) : clearInterval(w);
                    }, 10));
                }
                var v = {}, g = 0, m = {}, w = null, Y = !1, y = !1;
                n ? (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), 
                e.event.bind(t, "touchstart", h), e.event.bind(t, "touchmove", f), e.event.bind(t, "touchend", b)) : r && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), 
                e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", h), e.event.bind(t, "pointermove", f), 
                e.event.bind(t, "pointerup", b)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), 
                e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", h), e.event.bind(t, "MSPointerMove", f), 
                e.event.bind(t, "MSPointerUp", b)));
            }(t, l.get(t), o.env.supportsTouch, o.env.supportsIePointer);
        };
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    } ],
    17: [ function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"), o = t("../lib/class"), l = t("./instances"), i = t("./update-geometry"), s = {
            "click-rail": t("./handler/click-rail"),
            "drag-scrollbar": t("./handler/drag-scrollbar"),
            keyboard: t("./handler/keyboard"),
            wheel: t("./handler/mouse-wheel"),
            touch: t("./handler/touch"),
            selection: t("./handler/selection")
        }, a = t("./handler/native-scroll");
        e.exports = function(t, e) {
            e = "object" == typeof e ? e : {}, o.add(t, "ps-container");
            var n = l.add(t);
            n.settings = r.extend(n.settings, e), o.add(t, "ps-theme-" + n.settings.theme), 
            n.settings.handlers.forEach(function(e) {
                s[e](t);
            }), a(t), i(t);
        };
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    } ],
    18: [ function(t, e, n) {
        "use strict";
        function r(t) {
            function e() {
                a.add(t, "ps-focus");
            }
            function n() {
                a.remove(t, "ps-focus");
            }
            var r = this;
            r.settings = s.clone(c), r.containerWidth = null, r.containerHeight = null, r.contentWidth = null, 
            r.contentHeight = null, r.isRtl = "rtl" === u.css(t, "direction"), r.isNegativeScroll = function() {
                var n, e = t.scrollLeft;
                return t.scrollLeft = -1, n = t.scrollLeft < 0, t.scrollLeft = e, n;
            }(), r.negativeScrollAdjustment = r.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, 
            r.event = new d(), r.ownerDocument = t.ownerDocument || document, r.scrollbarXRail = u.appendTo(u.e("div", "ps-scrollbar-x-rail"), t), 
            r.scrollbarX = u.appendTo(u.e("div", "ps-scrollbar-x"), r.scrollbarXRail), r.scrollbarX.setAttribute("tabindex", 0), 
            r.event.bind(r.scrollbarX, "focus", e), r.event.bind(r.scrollbarX, "blur", n), r.scrollbarXActive = null, 
            r.scrollbarXWidth = null, r.scrollbarXLeft = null, r.scrollbarXBottom = s.toInt(u.css(r.scrollbarXRail, "bottom")), 
            r.isScrollbarXUsingBottom = r.scrollbarXBottom == r.scrollbarXBottom, r.scrollbarXTop = r.isScrollbarXUsingBottom ? null : s.toInt(u.css(r.scrollbarXRail, "top")), 
            r.railBorderXWidth = s.toInt(u.css(r.scrollbarXRail, "borderLeftWidth")) + s.toInt(u.css(r.scrollbarXRail, "borderRightWidth")), 
            u.css(r.scrollbarXRail, "display", "block"), r.railXMarginWidth = s.toInt(u.css(r.scrollbarXRail, "marginLeft")) + s.toInt(u.css(r.scrollbarXRail, "marginRight")), 
            u.css(r.scrollbarXRail, "display", ""), r.railXWidth = null, r.railXRatio = null, 
            r.scrollbarYRail = u.appendTo(u.e("div", "ps-scrollbar-y-rail"), t), r.scrollbarY = u.appendTo(u.e("div", "ps-scrollbar-y"), r.scrollbarYRail), 
            r.scrollbarY.setAttribute("tabindex", 0), r.event.bind(r.scrollbarY, "focus", e), 
            r.event.bind(r.scrollbarY, "blur", n), r.scrollbarYActive = null, r.scrollbarYHeight = null, 
            r.scrollbarYTop = null, r.scrollbarYRight = s.toInt(u.css(r.scrollbarYRail, "right")), 
            r.isScrollbarYUsingRight = r.scrollbarYRight == r.scrollbarYRight, r.scrollbarYLeft = r.isScrollbarYUsingRight ? null : s.toInt(u.css(r.scrollbarYRail, "left")), 
            r.scrollbarYOuterWidth = r.isRtl ? s.outerWidth(r.scrollbarY) : null, r.railBorderYWidth = s.toInt(u.css(r.scrollbarYRail, "borderTopWidth")) + s.toInt(u.css(r.scrollbarYRail, "borderBottomWidth")), 
            u.css(r.scrollbarYRail, "display", "block"), r.railYMarginHeight = s.toInt(u.css(r.scrollbarYRail, "marginTop")) + s.toInt(u.css(r.scrollbarYRail, "marginBottom")), 
            u.css(r.scrollbarYRail, "display", ""), r.railYHeight = null, r.railYRatio = null;
        }
        function o(t) {
            return t.getAttribute("data-ps-id");
        }
        var s = t("../lib/helper"), a = t("../lib/class"), c = t("./default-setting"), u = t("../lib/dom"), d = t("../lib/event-manager"), p = t("../lib/guid"), h = {};
        n.add = function(t) {
            var e = p();
            return function(t, e) {
                t.setAttribute("data-ps-id", e);
            }(t, e), h[e] = new r(t), h[e];
        }, n.remove = function(t) {
            delete h[o(t)], function(t) {
                t.removeAttribute("data-ps-id");
            }(t);
        }, n.get = function(t) {
            return h[o(t)];
        };
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8
    } ],
    19: [ function(t, e, n) {
        "use strict";
        function r(t, e) {
            return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), 
            t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), 
            e;
        }
        var l = t("../lib/helper"), i = t("../lib/class"), s = t("../lib/dom"), a = t("./instances"), c = t("./update-scroll");
        e.exports = function(t) {
            var n, e = a.get(t);
            e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, 
            e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (0 < (n = s.queryChildren(t, ".ps-scrollbar-x-rail")).length && n.forEach(function(t) {
                s.remove(t);
            }), s.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (0 < (n = s.queryChildren(t, ".ps-scrollbar-y-rail")).length && n.forEach(function(t) {
                s.remove(t);
            }), s.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, 
            e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, 
            e.scrollbarXWidth = r(e, l.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), 
            e.scrollbarXLeft = l.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, 
            !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, 
            e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, 
            e.scrollbarYHeight = r(e, l.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), 
            e.scrollbarYTop = l.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, 
            e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), 
            e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), 
            function(t, e) {
                var n = {
                    width: e.railXWidth
                };
                e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, 
                e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, 
                s.css(e.scrollbarXRail, n);
                var r = {
                    top: t.scrollTop,
                    height: e.railYHeight
                };
                e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft, 
                s.css(e.scrollbarYRail, r), s.css(e.scrollbarX, {
                    left: e.scrollbarXLeft,
                    width: e.scrollbarXWidth - e.railBorderXWidth
                }), s.css(e.scrollbarY, {
                    top: e.scrollbarYTop,
                    height: e.scrollbarYHeight - e.railBorderYWidth
                });
            }(t, e), e.scrollbarXActive ? i.add(t, "ps-active-x") : (i.remove(t, "ps-active-x"), 
            e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, c(t, "left", 0)), e.scrollbarYActive ? i.add(t, "ps-active-y") : (i.remove(t, "ps-active-y"), 
            e.scrollbarYHeight = 0, e.scrollbarYTop = 0, c(t, "top", 0));
        };
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20
    } ],
    20: [ function(t, e, n) {
        "use strict";
        var r, o, l = t("./instances"), i = function(t) {
            var e = document.createEvent("Event");
            return e.initEvent(t, !0, !0), e;
        };
        e.exports = function(t, e, n) {
            if (void 0 === t) throw "You must provide an element to the update-scroll function";
            if (void 0 === e) throw "You must provide an axis to the update-scroll function";
            if (void 0 === n) throw "You must provide a value to the update-scroll function";
            "top" === e && n <= 0 && (t.scrollTop = n = 0, t.dispatchEvent(i("ps-y-reach-start"))), 
            "left" === e && n <= 0 && (t.scrollLeft = n = 0, t.dispatchEvent(i("ps-x-reach-start")));
            var s = l.get(t);
            "top" === e && n >= s.contentHeight - s.containerHeight && ((n = s.contentHeight - s.containerHeight) - t.scrollTop <= 1 ? n = t.scrollTop : t.scrollTop = n, 
            t.dispatchEvent(i("ps-y-reach-end"))), "left" === e && n >= s.contentWidth - s.containerWidth && ((n = s.contentWidth - s.containerWidth) - t.scrollLeft <= 1 ? n = t.scrollLeft : t.scrollLeft = n, 
            t.dispatchEvent(i("ps-x-reach-end"))), r || (r = t.scrollTop), o || (o = t.scrollLeft), 
            "top" === e && n < r && t.dispatchEvent(i("ps-scroll-up")), "top" === e && r < n && t.dispatchEvent(i("ps-scroll-down")), 
            "left" === e && n < o && t.dispatchEvent(i("ps-scroll-left")), "left" === e && o < n && t.dispatchEvent(i("ps-scroll-right")), 
            "top" === e && (t.scrollTop = r = n, t.dispatchEvent(i("ps-scroll-y"))), "left" === e && (t.scrollLeft = o = n, 
            t.dispatchEvent(i("ps-scroll-x")));
        };
    }, {
        "./instances": 18
    } ],
    21: [ function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"), o = t("../lib/dom"), l = t("./instances"), i = t("./update-geometry"), s = t("./update-scroll");
        e.exports = function(t) {
            var e = l.get(t);
            e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, 
            o.css(e.scrollbarXRail, "display", "block"), o.css(e.scrollbarYRail, "display", "block"), 
            e.railXMarginWidth = r.toInt(o.css(e.scrollbarXRail, "marginLeft")) + r.toInt(o.css(e.scrollbarXRail, "marginRight")), 
            e.railYMarginHeight = r.toInt(o.css(e.scrollbarYRail, "marginTop")) + r.toInt(o.css(e.scrollbarYRail, "marginBottom")), 
            o.css(e.scrollbarXRail, "display", "none"), o.css(e.scrollbarYRail, "display", "none"), 
            i(t), s(t, "top", t.scrollTop), s(t, "left", t.scrollLeft), o.css(e.scrollbarXRail, "display", ""), 
            o.css(e.scrollbarYRail, "display", ""));
        };
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19,
        "./update-scroll": 20
    } ]
}, {}, [ 1 ]);