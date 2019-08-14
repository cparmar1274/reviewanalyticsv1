!function(t, e) {
    "use strict";
    "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : "function" == typeof define && define.amd ? define([ "jquery" ], function(t) {
        return e(t);
    }) : e(t.jQuery);
}(this, function(t) {
    "use strict";
    var e = function(e, s) {
        this.$element = t(e), this.options = t.extend({}, t.fn.typeahead.defaults, s), this.matcher = this.options.matcher || this.matcher, 
        this.sorter = this.options.sorter || this.sorter, this.select = this.options.select || this.select, 
        this.autoSelect = "boolean" != typeof this.options.autoSelect || this.options.autoSelect, 
        this.highlighter = this.options.highlighter || this.highlighter, this.render = this.options.render || this.render, 
        this.updater = this.options.updater || this.updater, this.displayText = this.options.displayText || this.displayText, 
        this.source = this.options.source, this.delay = this.options.delay, this.$menu = t(this.options.menu), 
        this.$appendTo = this.options.appendTo ? t(this.options.appendTo) : null, this.fitToElement = "boolean" == typeof this.options.fitToElement && this.options.fitToElement, 
        this.shown = !1, this.listen(), this.showHintOnFocus = ("boolean" == typeof this.options.showHintOnFocus || "all" === this.options.showHintOnFocus) && this.options.showHintOnFocus, 
        this.afterSelect = this.options.afterSelect, this.addItem = !1, this.value = this.$element.val() || this.$element.text();
    };
    e.prototype = {
        constructor: e,
        select: function() {
            var t = this.$menu.find(".active").data("value");
            if (this.$element.data("active", t), this.autoSelect || t) {
                var e = this.updater(t);
                e || (e = ""), this.$element.val(this.displayText(e) || e).text(this.displayText(e) || e).change(), 
                this.afterSelect(e);
            }
            return this.hide();
        },
        updater: function(t) {
            return t;
        },
        setSource: function(t) {
            this.source = t;
        },
        show: function() {
            var e, s = t.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            }), i = "function" == typeof this.options.scrollHeight ? this.options.scrollHeight.call() : this.options.scrollHeight;
            if (this.shown ? e = this.$menu : this.$appendTo ? (e = this.$menu.appendTo(this.$appendTo), 
            this.hasSameParent = this.$appendTo.is(this.$element.parent())) : (e = this.$menu.insertAfter(this.$element), 
            this.hasSameParent = !0), !this.hasSameParent) {
                e.css("position", "fixed");
                var o = this.$element.offset();
                s.top = o.top, s.left = o.left;
            }
            var n = t(e).parent().hasClass("dropup") ? "auto" : s.top + s.height + i, h = t(e).hasClass("dropdown-menu-right") ? "auto" : s.left;
            return e.css({
                top: n,
                left: h
            }).show(), !0 === this.options.fitToElement && e.css("width", this.$element.outerWidth() + "px"), 
            this.shown = !0, this;
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this;
        },
        lookup: function(e) {
            if (this.query = null != e ? e : this.$element.val() || this.$element.text() || "", 
            this.query.length < this.options.minLength && !this.options.showHintOnFocus) return this.shown ? this.hide() : this;
            var s = t.proxy(function() {
                t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source && this.process(this.source);
            }, this);
            clearTimeout(this.lookupWorker), this.lookupWorker = setTimeout(s, this.delay);
        },
        process: function(e) {
            var s = this;
            return e = t.grep(e, function(t) {
                return s.matcher(t);
            }), (e = this.sorter(e)).length || this.options.addItem ? (0 < e.length ? this.$element.data("active", e[0]) : this.$element.data("active", null), 
            this.options.addItem && e.push(this.options.addItem), "all" == this.options.items ? this.render(e).show() : this.render(e.slice(0, this.options.items)).show()) : this.shown ? this.hide() : this;
        },
        matcher: function(t) {
            return ~this.displayText(t).toLowerCase().indexOf(this.query.toLowerCase());
        },
        sorter: function(t) {
            for (var e, s = [], i = [], o = []; e = t.shift(); ) {
                var n = this.displayText(e);
                n.toLowerCase().indexOf(this.query.toLowerCase()) ? ~n.indexOf(this.query) ? i.push(e) : o.push(e) : s.push(e);
            }
            return s.concat(i, o);
        },
        highlighter: function(e) {
            var s, i, o, n, h = t("<div></div>"), a = this.query, r = e.toLowerCase().indexOf(a.toLowerCase()), u = a.length;
            if (0 === u) return h.text(e).html();
            for (;-1 < r; ) s = e.substr(0, r), i = e.substr(r, u), o = e.substr(r + u), n = t("<strong></strong>").text(i), 
            h.append(document.createTextNode(s)).append(n), r = (e = o).toLowerCase().indexOf(a.toLowerCase());
            return h.append(document.createTextNode(e)).html();
        },
        render: function(e) {
            var s = this, i = this, o = !1, n = [], h = s.options.separator;
            return t.each(e, function(t, s) {
                0 < t && s[h] !== e[t - 1][h] && n.push({
                    __type: "divider"
                }), !s[h] || 0 !== t && s[h] === e[t - 1][h] || n.push({
                    __type: "category",
                    name: s[h]
                }), n.push(s);
            }), e = t(n).map(function(e, n) {
                if ("category" == (n.__type || !1)) return t(s.options.headerHtml).text(n.name)[0];
                if ("divider" == (n.__type || !1)) return t(s.options.headerDivider)[0];
                var h = i.displayText(n);
                return (e = t(s.options.item).data("value", n)).find("a").html(s.highlighter(h, n)), 
                h == i.$element.val() && (e.addClass("active"), i.$element.data("active", n), o = !0), 
                e[0];
            }), this.autoSelect && !o && (e.filter(":not(.dropdown-header)").first().addClass("active"), 
            this.$element.data("active", e.first().data("value"))), this.$menu.html(e), this;
        },
        displayText: function(t) {
            return void 0 !== t && void 0 !== t.name && t.name || t;
        },
        next: function(e) {
            var s = this.$menu.find(".active").removeClass("active").next();
            s.length || (s = t(this.$menu.find("li")[0])), s.addClass("active");
        },
        prev: function(t) {
            var e = this.$menu.find(".active").removeClass("active").prev();
            e.length || (e = this.$menu.find("li").last()), e.addClass("active");
        },
        listen: function() {
            this.$element.on("focus", t.proxy(this.focus, this)).on("blur", t.proxy(this.blur, this)).on("keypress", t.proxy(this.keypress, this)).on("input", t.proxy(this.input, this)).on("keyup", t.proxy(this.keyup, this)), 
            this.eventSupported("keydown") && this.$element.on("keydown", t.proxy(this.keydown, this)), 
            this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", "li", t.proxy(this.mouseenter, this)).on("mouseleave", "li", t.proxy(this.mouseleave, this)).on("mousedown", t.proxy(this.mousedown, this));
        },
        destroy: function() {
            this.$element.data("typeahead", null), this.$element.data("active", null), this.$element.off("focus").off("blur").off("keypress").off("input").off("keyup"), 
            this.eventSupported("keydown") && this.$element.off("keydown"), this.$menu.remove(), 
            this.destroyed = !0;
        },
        eventSupported: function(t) {
            var e = t in this.$element;
            return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), 
            e;
        },
        move: function(t) {
            if (this.shown) switch (t.keyCode) {
              case 9:
              case 13:
              case 27:
                t.preventDefault();
                break;

              case 38:
                if (t.shiftKey) return;
                t.preventDefault(), this.prev();
                break;

              case 40:
                if (t.shiftKey) return;
                t.preventDefault(), this.next();
            }
        },
        keydown: function(e) {
            this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [ 40, 38, 9, 13, 27 ]), this.shown || 40 != e.keyCode ? this.move(e) : this.lookup();
        },
        keypress: function(t) {
            this.suppressKeyPressRepeat || this.move(t);
        },
        input: function(t) {
            var e = this.$element.val() || this.$element.text();
            this.value !== e && (this.value = e, this.lookup());
        },
        keyup: function(t) {
            if (!this.destroyed) switch (t.keyCode) {
              case 40:
              case 38:
              case 16:
              case 17:
              case 18:
                break;

              case 9:
              case 13:
                if (!this.shown) return;
                this.select();
                break;

              case 27:
                if (!this.shown) return;
                this.hide();
            }
        },
        focus: function(t) {
            this.focused || (this.focused = !0, this.options.showHintOnFocus && !0 !== this.skipShowHintOnFocus && ("all" === this.options.showHintOnFocus ? this.lookup("") : this.lookup())), 
            this.skipShowHintOnFocus && (this.skipShowHintOnFocus = !1);
        },
        blur: function(t) {
            this.mousedover || this.mouseddown || !this.shown ? this.mouseddown && (this.skipShowHintOnFocus = !0, 
            this.$element.focus(), this.mouseddown = !1) : (this.hide(), this.focused = !1);
        },
        click: function(t) {
            t.preventDefault(), this.skipShowHintOnFocus = !0, this.select(), this.$element.focus(), 
            this.hide();
        },
        mouseenter: function(e) {
            this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active");
        },
        mouseleave: function(t) {
            this.mousedover = !1, !this.focused && this.shown && this.hide();
        },
        mousedown: function(t) {
            this.mouseddown = !0, this.$menu.one("mouseup", function(t) {
                this.mouseddown = !1;
            }.bind(this));
        }
    };
    var s = t.fn.typeahead;
    t.fn.typeahead = function(s) {
        var i = arguments;
        return "string" == typeof s && "getActive" == s ? this.data("active") : this.each(function() {
            var o = t(this), n = o.data("typeahead"), h = "object" == typeof s && s;
            n || o.data("typeahead", n = new e(this, h)), "string" == typeof s && n[s] && (1 < i.length ? n[s].apply(n, Array.prototype.slice.call(i, 1)) : n[s]());
        });
    }, t.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu" role="listbox"></ul>',
        item: '<li><a class="dropdown-item" href="#" role="option"></a></li>',
        minLength: 1,
        scrollHeight: 0,
        autoSelect: !0,
        afterSelect: t.noop,
        addItem: !1,
        delay: 0,
        separator: "category",
        headerHtml: '<li class="dropdown-header"></li>',
        headerDivider: '<li class="divider" role="separator"></li>'
    }, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function() {
        return t.fn.typeahead = s, this;
    }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
        var s = t(this);
        s.data("typeahead") || s.typeahead(s.data());
    });
});