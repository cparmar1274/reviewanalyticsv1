!function(t) {
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : t("object" == typeof exports ? require("jquery") : jQuery);
}(function(t, e) {
    function i() {
        return new Date(Date.UTC.apply(Date, arguments));
    }
    function a() {
        var t = new Date();
        return i(t.getFullYear(), t.getMonth(), t.getDate());
    }
    function s(t, e) {
        return t.getUTCFullYear() === e.getUTCFullYear() && t.getUTCMonth() === e.getUTCMonth() && t.getUTCDate() === e.getUTCDate();
    }
    function n(i, a) {
        return function() {
            return a !== e && t.fn.datepicker.deprecated(a), this[i].apply(this, arguments);
        };
    }
    var l = function() {
        var e = {
            get: function(t) {
                return this.slice(t)[0];
            },
            contains: function(t) {
                for (var e = t && t.valueOf(), i = 0, a = this.length; i < a; i++) if (0 <= this[i].valueOf() - e && this[i].valueOf() - e < 864e5) return i;
                return -1;
            },
            remove: function(t) {
                this.splice(t, 1);
            },
            replace: function(e) {
                e && (t.isArray(e) || (e = [ e ]), this.clear(), this.push.apply(this, e));
            },
            clear: function() {
                this.length = 0;
            },
            copy: function() {
                var t = new l();
                return t.replace(this), t;
            }
        };
        return function() {
            var i = [];
            return i.push.apply(i, arguments), t.extend(i, e), i;
        };
    }(), d = function(e, i) {
        t.data(e, "datepicker", this), this._process_options(i), this.dates = new l(), this.viewDate = this.o.defaultViewDate, 
        this.focusDate = null, this.element = t(e), this.isInput = this.element.is("input"), 
        this.inputField = this.isInput ? this.element : this.element.find("input"), this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .btn"), 
        this.component && 0 === this.component.length && (this.component = !1), this.isInline = !this.component && this.element.is("div"), 
        this.picker = t(m.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow), 
        this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow), 
        this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), 
        this.o.rtl && this.picker.addClass("datepicker-rtl"), this.o.calendarWeeks && this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function(t, e) {
            return Number(e) + 1;
        }), this._process_options({
            startDate: this._o.startDate,
            endDate: this._o.endDate,
            daysOfWeekDisabled: this.o.daysOfWeekDisabled,
            daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
            datesDisabled: this.o.datesDisabled
        }), this._allow_update = !1, this.setViewMode(this.o.startView), this._allow_update = !0, 
        this.fillDow(), this.fillMonths(), this.update(), this.isInline && this.show();
    };
    d.prototype = {
        constructor: d,
        _resolveViewName: function(e) {
            return t.each(m.viewModes, function(i, a) {
                if (e === i || -1 !== t.inArray(e, a.names)) return e = i, !1;
            }), e;
        },
        _resolveDaysOfWeek: function(e) {
            return t.isArray(e) || (e = e.split(/[,\s]*/)), t.map(e, Number);
        },
        _check_template: function(i) {
            try {
                return i !== e && "" !== i && ((i.match(/[<>]/g) || []).length <= 0 || 0 < t(i).length);
            } catch (t) {
                return !1;
            }
        },
        _process_options: function(e) {
            this._o = t.extend({}, this._o, e);
            var s = this.o = t.extend({}, this._o), n = s.language;
            D[n] || (n = n.split("-")[0], D[n] || (n = f.language)), s.language = n, s.startView = this._resolveViewName(s.startView), 
            s.minViewMode = this._resolveViewName(s.minViewMode), s.maxViewMode = this._resolveViewName(s.maxViewMode), 
            s.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, s.startView)), 
            !0 !== s.multidate && (s.multidate = Number(s.multidate) || !1, !1 !== s.multidate && (s.multidate = Math.max(0, s.multidate))), 
            s.multidateSeparator = String(s.multidateSeparator), s.weekStart %= 7, s.weekEnd = (s.weekStart + 6) % 7;
            var o = m.parseFormat(s.format);
            s.startDate !== -1 / 0 && (s.startDate ? s.startDate instanceof Date ? s.startDate = this._local_to_utc(this._zero_time(s.startDate)) : s.startDate = m.parseDate(s.startDate, o, s.language, s.assumeNearbyYear) : s.startDate = -1 / 0), 
            s.endDate !== 1 / 0 && (s.endDate ? s.endDate instanceof Date ? s.endDate = this._local_to_utc(this._zero_time(s.endDate)) : s.endDate = m.parseDate(s.endDate, o, s.language, s.assumeNearbyYear) : s.endDate = 1 / 0), 
            s.daysOfWeekDisabled = this._resolveDaysOfWeek(s.daysOfWeekDisabled || []), s.daysOfWeekHighlighted = this._resolveDaysOfWeek(s.daysOfWeekHighlighted || []), 
            s.datesDisabled = s.datesDisabled || [], t.isArray(s.datesDisabled) || (s.datesDisabled = s.datesDisabled.split(",")), 
            s.datesDisabled = t.map(s.datesDisabled, function(t) {
                return m.parseDate(t, o, s.language, s.assumeNearbyYear);
            });
            var r = String(s.orientation).toLowerCase().split(/\s+/g), h = s.orientation.toLowerCase();
            if (r = t.grep(r, function(t) {
                return /^auto|left|right|top|bottom$/.test(t);
            }), s.orientation = {
                x: "auto",
                y: "auto"
            }, h && "auto" !== h) if (1 === r.length) switch (r[0]) {
              case "top":
              case "bottom":
                s.orientation.y = r[0];
                break;

              case "left":
              case "right":
                s.orientation.x = r[0];
            } else h = t.grep(r, function(t) {
                return /^left|right$/.test(t);
            }), s.orientation.x = h[0] || "auto", h = t.grep(r, function(t) {
                return /^top|bottom$/.test(t);
            }), s.orientation.y = h[0] || "auto";
            if (s.defaultViewDate instanceof Date || "string" == typeof s.defaultViewDate) s.defaultViewDate = m.parseDate(s.defaultViewDate, o, s.language, s.assumeNearbyYear); else if (s.defaultViewDate) {
                var l = s.defaultViewDate.year || new Date().getFullYear(), d = s.defaultViewDate.month || 0, c = s.defaultViewDate.day || 1;
                s.defaultViewDate = i(l, d, c);
            } else s.defaultViewDate = a();
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(t) {
            for (var i, a, s, n = 0; n < t.length; n++) i = t[n][0], 2 === t[n].length ? (a = e, 
            s = t[n][1]) : 3 === t[n].length && (a = t[n][1], s = t[n][2]), i.on(s, a);
        },
        _unapplyEvents: function(t) {
            for (var i, a, s, n = 0; n < t.length; n++) i = t[n][0], 2 === t[n].length ? (s = e, 
            a = t[n][1]) : 3 === t[n].length && (s = t[n][1], a = t[n][2]), i.off(a, s);
        },
        _buildEvents: function() {
            var e = {
                keyup: t.proxy(function(e) {
                    -1 === t.inArray(e.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) && this.update();
                }, this),
                keydown: t.proxy(this.keydown, this),
                paste: t.proxy(this.paste, this)
            };
            !0 === this.o.showOnFocus && (e.focus = t.proxy(this.show, this)), this.isInput ? this._events = [ [ this.element, e ] ] : this.component && this.inputField.length ? this._events = [ [ this.inputField, e ], [ this.component, {
                click: t.proxy(this.show, this)
            } ] ] : this._events = [ [ this.element, {
                click: t.proxy(this.show, this),
                keydown: t.proxy(this.keydown, this)
            } ] ], this._events.push([ this.element, "*", {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target;
                }, this)
            } ], [ this.element, {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target;
                }, this)
            } ]), this.o.immediateUpdates && this._events.push([ this.element, {
                "changeYear changeMonth": t.proxy(function(t) {
                    this.update(t.date);
                }, this)
            } ]), this._secondaryEvents = [ [ this.picker, {
                click: t.proxy(this.click, this)
            } ], [ this.picker, ".prev, .next", {
                click: t.proxy(this.navArrowsClick, this)
            } ], [ this.picker, ".day:not(.disabled)", {
                click: t.proxy(this.dayCellClick, this)
            } ], [ t(window), {
                resize: t.proxy(this.place, this)
            } ], [ t(document), {
                "mousedown touchstart": t.proxy(function(t) {
                    this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.isInline || this.hide();
                }, this)
            } ] ];
        },
        _attachEvents: function() {
            this._detachEvents(), this._applyEvents(this._events);
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events);
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents);
        },
        _trigger: function(e, i) {
            var a = i || this.dates.get(-1), s = this._utc_to_local(a);
            this.element.trigger({
                type: e,
                date: s,
                viewMode: this.viewMode,
                dates: t.map(this.dates, this._utc_to_local),
                format: t.proxy(function(t, e) {
                    0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, 
                    t = this.dates.length - 1), e = e || this.o.format;
                    var i = this.dates.get(t);
                    return m.formatDate(i, e, this.o.language);
                }, this)
            });
        },
        show: function() {
            if (!(this.inputField.prop("disabled") || this.inputField.prop("readonly") && !1 === this.o.enableOnReadonly)) return this.isInline || this.picker.appendTo(this.o.container), 
            this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), 
            (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && t(this.element).blur(), 
            this;
        },
        hide: function() {
            return this.isInline || !this.picker.is(":visible") || (this.focusDate = null, this.picker.hide().detach(), 
            this._detachSecondaryEvents(), this.setViewMode(this.o.startView), this.o.forceParse && this.inputField.val() && this.setValue(), 
            this._trigger("hide")), this;
        },
        destroy: function() {
            return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), 
            delete this.element.data().datepicker, this.isInput || delete this.element.data().date, 
            this;
        },
        paste: function(e) {
            var i;
            if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types && -1 !== t.inArray("text/plain", e.originalEvent.clipboardData.types)) i = e.originalEvent.clipboardData.getData("text/plain"); else {
                if (!window.clipboardData) return;
                i = window.clipboardData.getData("Text");
            }
            this.setDate(i), this.update(), e.preventDefault();
        },
        _utc_to_local: function(t) {
            if (!t) return t;
            var e = new Date(t.getTime() + 6e4 * t.getTimezoneOffset());
            return e.getTimezoneOffset() !== t.getTimezoneOffset() && (e = new Date(t.getTime() + 6e4 * e.getTimezoneOffset())), 
            e;
        },
        _local_to_utc: function(t) {
            return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset());
        },
        _zero_time: function(t) {
            return t && new Date(t.getFullYear(), t.getMonth(), t.getDate());
        },
        _zero_utc_time: function(t) {
            return t && i(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate());
        },
        getDates: function() {
            return t.map(this.dates, this._utc_to_local);
        },
        getUTCDates: function() {
            return t.map(this.dates, function(t) {
                return new Date(t);
            });
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate());
        },
        getUTCDate: function() {
            var t = this.dates.get(-1);
            return t !== e ? new Date(t) : null;
        },
        clearDates: function() {
            this.inputField.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide();
        },
        setDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, e), this._trigger("changeDate"), this.setValue(), 
            this;
        },
        setUTCDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.setDates.apply(this, t.map(e, this._utc_to_local)), this;
        },
        setDate: n("setDates"),
        setUTCDate: n("setUTCDates"),
        remove: n("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),
        setValue: function() {
            var t = this.getFormattedDate();
            return this.inputField.val(t), this;
        },
        getFormattedDate: function(i) {
            i === e && (i = this.o.format);
            var a = this.o.language;
            return t.map(this.dates, function(t) {
                return m.formatDate(t, i, a);
            }).join(this.o.multidateSeparator);
        },
        getStartDate: function() {
            return this.o.startDate;
        },
        setStartDate: function(t) {
            return this._process_options({
                startDate: t
            }), this.update(), this.updateNavArrows(), this;
        },
        getEndDate: function() {
            return this.o.endDate;
        },
        setEndDate: function(t) {
            return this._process_options({
                endDate: t
            }), this.update(), this.updateNavArrows(), this;
        },
        setDaysOfWeekDisabled: function(t) {
            return this._process_options({
                daysOfWeekDisabled: t
            }), this.update(), this;
        },
        setDaysOfWeekHighlighted: function(t) {
            return this._process_options({
                daysOfWeekHighlighted: t
            }), this.update(), this;
        },
        setDatesDisabled: function(t) {
            return this._process_options({
                datesDisabled: t
            }), this.update(), this;
        },
        place: function() {
            if (this.isInline) return this;
            var e = this.picker.outerWidth(), i = this.picker.outerHeight(), a = t(this.o.container), s = a.width(), n = "body" === this.o.container ? t(document).scrollTop() : a.scrollTop(), o = a.offset(), r = [ 0 ];
            this.element.parents().each(function() {
                var e = t(this).css("z-index");
                "auto" !== e && 0 !== Number(e) && r.push(Number(e));
            });
            var h = Math.max.apply(Math, r) + this.o.zIndexOffset, l = this.component ? this.component.parent().offset() : this.element.offset(), d = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1), c = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1), u = l.left - o.left, p = l.top - o.top;
            "body" !== this.o.container && (p += n), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), 
            "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), 
            "right" === this.o.orientation.x && (u -= e - c)) : l.left < 0 ? (this.picker.addClass("datepicker-orient-left"), 
            u -= l.left - 10) : s < u + e ? (this.picker.addClass("datepicker-orient-right"), 
            u += c - e) : this.o.rtl ? this.picker.addClass("datepicker-orient-right") : this.picker.addClass("datepicker-orient-left");
            var f = this.o.orientation.y;
            if ("auto" === f && (f = -n + p - i < 0 ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + f), 
            "top" === f ? p -= i + parseInt(this.picker.css("padding-top")) : p += d, this.o.rtl) {
                var g = s - (u + c);
                this.picker.css({
                    top: p,
                    right: g,
                    zIndex: h
                });
            } else this.picker.css({
                top: p,
                left: u,
                zIndex: h
            });
            return this;
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update) return this;
            var e = this.dates.copy(), i = [], a = !1;
            return arguments.length ? (t.each(arguments, t.proxy(function(t, e) {
                e instanceof Date && (e = this._local_to_utc(e)), i.push(e);
            }, this)), a = !0) : (i = (i = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val()) && this.o.multidate ? i.split(this.o.multidateSeparator) : [ i ], 
            delete this.element.data().date), i = t.map(i, t.proxy(function(t) {
                return m.parseDate(t, this.o.format, this.o.language, this.o.assumeNearbyYear);
            }, this)), i = t.grep(i, t.proxy(function(t) {
                return !this.dateWithinRange(t) || !t;
            }, this), !0), this.dates.replace(i), this.o.updateViewDate && (this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate), 
            a ? (this.setValue(), this.element.change()) : this.dates.length && String(e) !== String(this.dates) && a && (this._trigger("changeDate"), 
            this.element.change()), !this.dates.length && e.length && (this._trigger("clearDate"), 
            this.element.change()), this.fill(), this;
        },
        fillDow: function() {
            if (this.o.showWeekDays) {
                var e = this.o.weekStart, i = "<tr>";
                for (this.o.calendarWeeks && (i += '<th class="cw">&#160;</th>'); e < this.o.weekStart + 7; ) i += '<th class="dow', 
                -1 !== t.inArray(e, this.o.daysOfWeekDisabled) && (i += " disabled"), i += '">' + D[this.o.language].daysMin[e++ % 7] + "</th>";
                i += "</tr>", this.picker.find(".datepicker-days thead").append(i);
            }
        },
        fillMonths: function() {
            for (var t = this._utc_to_local(this.viewDate), e = "", i = 0; i < 12; i++) e += '<span class="month' + (t && t.getMonth() === i ? " focused" : "") + '">' + D[this.o.language].monthsShort[i] + "</span>";
            this.picker.find(".datepicker-months td").html(e);
        },
        setRange: function(e) {
            e && e.length ? this.range = t.map(e, function(t) {
                return t.valueOf();
            }) : delete this.range, this.fill();
        },
        getClassNames: function(e) {
            var i = [], n = this.viewDate.getUTCFullYear(), o = this.viewDate.getUTCMonth(), r = a();
            return e.getUTCFullYear() < n || e.getUTCFullYear() === n && e.getUTCMonth() < o ? i.push("old") : (e.getUTCFullYear() > n || e.getUTCFullYear() === n && e.getUTCMonth() > o) && i.push("new"), 
            this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"), 
            this.o.todayHighlight && s(e, r) && i.push("today"), -1 !== this.dates.contains(e) && i.push("active"), 
            this.dateWithinRange(e) || i.push("disabled"), this.dateIsDisabled(e) && i.push("disabled", "disabled-date"), 
            -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekHighlighted) && i.push("highlighted"), 
            this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), 
            -1 !== t.inArray(e.valueOf(), this.range) && i.push("selected"), e.valueOf() === this.range[0] && i.push("range-start"), 
            e.valueOf() === this.range[this.range.length - 1] && i.push("range-end")), i;
        },
        _fill_yearsView: function(i, a, s, n, o, r, h) {
            for (var l, d, c, u = "", p = s / 10, f = this.picker.find(i), g = Math.floor(n / s) * s, D = g + 9 * p, m = Math.floor(this.viewDate.getFullYear() / p) * p, y = t.map(this.dates, function(t) {
                return Math.floor(t.getUTCFullYear() / p) * p;
            }), v = g - p; v <= D + p; v += p) l = [ a ], d = null, v === g - p ? l.push("old") : v === D + p && l.push("new"), 
            -1 !== t.inArray(v, y) && l.push("active"), (v < o || r < v) && l.push("disabled"), 
            v === m && l.push("focused"), h !== t.noop && ((c = h(new Date(v, 0, 1))) === e ? c = {} : "boolean" == typeof c ? c = {
                enabled: c
            } : "string" == typeof c && (c = {
                classes: c
            }), !1 === c.enabled && l.push("disabled"), c.classes && (l = l.concat(c.classes.split(/\s+/))), 
            c.tooltip && (d = c.tooltip)), u += '<span class="' + l.join(" ") + '"' + (d ? ' title="' + d + '"' : "") + ">" + v + "</span>";
            f.find(".datepicker-switch").text(g + "-" + D), f.find("td").html(u);
        },
        fill: function() {
            var a, s, n = new Date(this.viewDate), o = n.getUTCFullYear(), r = n.getUTCMonth(), h = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, l = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, d = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, c = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, u = D[this.o.language].today || D.en.today || "", p = D[this.o.language].clear || D.en.clear || "", f = D[this.o.language].titleFormat || D.en.titleFormat;
            if (!isNaN(o) && !isNaN(r)) {
                this.picker.find(".datepicker-days .datepicker-switch").text(m.formatDate(n, f, this.o.language)), 
                this.picker.find("tfoot .today").text(u).css("display", !0 === this.o.todayBtn || "linked" === this.o.todayBtn ? "table-cell" : "none"), 
                this.picker.find("tfoot .clear").text(p).css("display", !0 === this.o.clearBtn ? "table-cell" : "none"), 
                this.picker.find("thead .datepicker-title").text(this.o.title).css("display", "string" == typeof this.o.title && "" !== this.o.title ? "table-cell" : "none"), 
                this.updateNavArrows(), this.fillMonths();
                var g = i(o, r, 0), y = g.getUTCDate();
                g.setUTCDate(y - (g.getUTCDay() - this.o.weekStart + 7) % 7);
                var v = new Date(g);
                g.getUTCFullYear() < 100 && v.setUTCFullYear(g.getUTCFullYear()), v.setUTCDate(v.getUTCDate() + 42), 
                v = v.valueOf();
                for (var w, k, _ = []; g.valueOf() < v; ) {
                    if ((w = g.getUTCDay()) === this.o.weekStart && (_.push("<tr>"), this.o.calendarWeeks)) {
                        var b = new Date(+g + (this.o.weekStart - w - 7) % 7 * 864e5), C = new Date(Number(b) + (11 - b.getUTCDay()) % 7 * 864e5), T = new Date(Number(T = i(C.getUTCFullYear(), 0, 1)) + (11 - T.getUTCDay()) % 7 * 864e5), M = (C - T) / 864e5 / 7 + 1;
                        _.push('<td class="cw">' + M + "</td>");
                    }
                    (k = this.getClassNames(g)).push("day");
                    var U = g.getUTCDate();
                    this.o.beforeShowDay !== t.noop && ((s = this.o.beforeShowDay(this._utc_to_local(g))) === e ? s = {} : "boolean" == typeof s ? s = {
                        enabled: s
                    } : "string" == typeof s && (s = {
                        classes: s
                    }), !1 === s.enabled && k.push("disabled"), s.classes && (k = k.concat(s.classes.split(/\s+/))), 
                    s.tooltip && (a = s.tooltip), s.content && (U = s.content)), k = t.isFunction(t.uniqueSort) ? t.uniqueSort(k) : t.unique(k), 
                    _.push('<td class="' + k.join(" ") + '"' + (a ? ' title="' + a + '"' : "") + ' data-date="' + g.getTime().toString() + '">' + U + "</td>"), 
                    a = null, w === this.o.weekEnd && _.push("</tr>"), g.setUTCDate(g.getUTCDate() + 1);
                }
                this.picker.find(".datepicker-days tbody").html(_.join(""));
                var x = D[this.o.language].monthsTitle || D.en.monthsTitle || "Months", V = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? x : o).end().find("tbody span").removeClass("active");
                if (t.each(this.dates, function(t, e) {
                    e.getUTCFullYear() === o && V.eq(e.getUTCMonth()).addClass("active");
                }), (o < h || d < o) && V.addClass("disabled"), o === h && V.slice(0, l).addClass("disabled"), 
                o === d && V.slice(c + 1).addClass("disabled"), this.o.beforeShowMonth !== t.noop) {
                    var S = this;
                    t.each(V, function(i, a) {
                        var s = new Date(o, i, 1), n = S.o.beforeShowMonth(s);
                        n === e ? n = {} : "boolean" == typeof n ? n = {
                            enabled: n
                        } : "string" == typeof n && (n = {
                            classes: n
                        }), !1 !== n.enabled || t(a).hasClass("disabled") || t(a).addClass("disabled"), 
                        n.classes && t(a).addClass(n.classes), n.tooltip && t(a).prop("title", n.tooltip);
                    });
                }
                this._fill_yearsView(".datepicker-years", "year", 10, o, h, d, this.o.beforeShowYear), 
                this._fill_yearsView(".datepicker-decades", "decade", 100, o, h, d, this.o.beforeShowDecade), 
                this._fill_yearsView(".datepicker-centuries", "century", 1e3, o, h, d, this.o.beforeShowCentury);
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var t, e, i = new Date(this.viewDate), a = i.getUTCFullYear(), s = i.getUTCMonth(), n = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, o = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, r = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, h = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, l = 1;
                switch (this.viewMode) {
                  case 0:
                    t = a <= n && s <= o, e = r <= a && h <= s;
                    break;

                  case 4:
                    l *= 10;

                  case 3:
                    l *= 10;

                  case 2:
                    l *= 10;

                  case 1:
                    t = Math.floor(a / l) * l <= n, e = Math.floor(a / l) * l + l >= r;
                }
                this.picker.find(".prev").toggleClass("disabled", t), this.picker.find(".next").toggleClass("disabled", e);
            }
        },
        click: function(e) {
            var s, o, r;
            e.preventDefault(), e.stopPropagation(), (s = t(e.target)).hasClass("datepicker-switch") && this.viewMode !== this.o.maxViewMode && this.setViewMode(this.viewMode + 1), 
            s.hasClass("today") && !s.hasClass("day") && (this.setViewMode(0), this._setDate(a(), "linked" === this.o.todayBtn ? null : "view")), 
            s.hasClass("clear") && this.clearDates(), s.hasClass("disabled") || (s.hasClass("month") || s.hasClass("year") || s.hasClass("decade") || s.hasClass("century")) && (this.viewDate.setUTCDate(1), 
            1 === this.viewMode ? (r = s.parent().find("span").index(s), o = this.viewDate.getUTCFullYear(), 
            this.viewDate.setUTCMonth(r)) : (r = 0, o = Number(s.text()), this.viewDate.setUTCFullYear(o)), 
            this._trigger(m.viewModes[this.viewMode - 1].e, this.viewDate), this.viewMode === this.o.minViewMode ? this._setDate(i(o, r, 1)) : (this.setViewMode(this.viewMode - 1), 
            this.fill())), this.picker.is(":visible") && this._focused_from && this._focused_from.focus(), 
            delete this._focused_from;
        },
        dayCellClick: function(e) {
            var i = t(e.currentTarget).data("date"), a = new Date(i);
            this.o.updateViewDate && (a.getUTCFullYear() !== this.viewDate.getUTCFullYear() && this._trigger("changeYear", this.viewDate), 
            a.getUTCMonth() !== this.viewDate.getUTCMonth() && this._trigger("changeMonth", this.viewDate)), 
            this._setDate(a);
        },
        navArrowsClick: function(e) {
            var i = t(e.currentTarget).hasClass("prev") ? -1 : 1;
            0 !== this.viewMode && (i *= 12 * m.viewModes[this.viewMode].navStep), this.viewDate = this.moveMonth(this.viewDate, i), 
            this._trigger(m.viewModes[this.viewMode].e, this.viewDate), this.fill();
        },
        _toggle_multidate: function(t) {
            var e = this.dates.contains(t);
            if (t || this.dates.clear(), -1 !== e ? (!0 === this.o.multidate || 1 < this.o.multidate || this.o.toggleActive) && this.dates.remove(e) : (!1 === this.o.multidate && this.dates.clear(), 
            this.dates.push(t)), "number" == typeof this.o.multidate) for (;this.dates.length > this.o.multidate; ) this.dates.remove(0);
        },
        _setDate: function(t, e) {
            e && "date" !== e || this._toggle_multidate(t && new Date(t)), (!e && this.o.updateViewDate || "view" === e) && (this.viewDate = t && new Date(t)), 
            this.fill(), this.setValue(), e && "view" === e || this._trigger("changeDate"), 
            this.inputField.trigger("change"), !this.o.autoclose || e && "date" !== e || this.hide();
        },
        moveDay: function(t, e) {
            var i = new Date(t);
            return i.setUTCDate(t.getUTCDate() + e), i;
        },
        moveWeek: function(t, e) {
            return this.moveDay(t, 7 * e);
        },
        moveMonth: function(t, e) {
            if (!function(t) {
                return t && !isNaN(t.getTime());
            }(t)) return this.o.defaultViewDate;
            if (!e) return t;
            var i, a, s = new Date(t.valueOf()), n = s.getUTCDate(), r = s.getUTCMonth(), h = Math.abs(e);
            if (e = 0 < e ? 1 : -1, 1 === h) a = -1 === e ? function() {
                return s.getUTCMonth() === r;
            } : function() {
                return s.getUTCMonth() !== i;
            }, i = r + e, s.setUTCMonth(i), i = (i + 12) % 12; else {
                for (var l = 0; l < h; l++) s = this.moveMonth(s, e);
                i = s.getUTCMonth(), s.setUTCDate(n), a = function() {
                    return i !== s.getUTCMonth();
                };
            }
            for (;a(); ) s.setUTCDate(--n), s.setUTCMonth(i);
            return s;
        },
        moveYear: function(t, e) {
            return this.moveMonth(t, 12 * e);
        },
        moveAvailableDate: function(t, e, i) {
            do {
                if (t = this[i](t, e), !this.dateWithinRange(t)) return !1;
                i = "moveDay";
            } while (this.dateIsDisabled(t));
            return t;
        },
        weekOfDateIsDisabled: function(e) {
            return -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled);
        },
        dateIsDisabled: function(e) {
            return this.weekOfDateIsDisabled(e) || 0 < t.grep(this.o.datesDisabled, function(t) {
                return s(e, t);
            }).length;
        },
        dateWithinRange: function(t) {
            return t >= this.o.startDate && t <= this.o.endDate;
        },
        keydown: function(t) {
            if (this.picker.is(":visible")) {
                var e, i, a = !1, s = this.focusDate || this.viewDate;
                switch (t.keyCode) {
                  case 27:
                    this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                    this.fill()) : this.hide(), t.preventDefault(), t.stopPropagation();
                    break;

                  case 37:
                  case 38:
                  case 39:
                  case 40:
                    if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
                    e = 37 === t.keyCode || 38 === t.keyCode ? -1 : 1, 0 === this.viewMode ? t.ctrlKey ? (i = this.moveAvailableDate(s, e, "moveYear")) && this._trigger("changeYear", this.viewDate) : t.shiftKey ? (i = this.moveAvailableDate(s, e, "moveMonth")) && this._trigger("changeMonth", this.viewDate) : 37 === t.keyCode || 39 === t.keyCode ? i = this.moveAvailableDate(s, e, "moveDay") : this.weekOfDateIsDisabled(s) || (i = this.moveAvailableDate(s, e, "moveWeek")) : 1 === this.viewMode ? (38 !== t.keyCode && 40 !== t.keyCode || (e *= 4), 
                    i = this.moveAvailableDate(s, e, "moveMonth")) : 2 === this.viewMode && (38 !== t.keyCode && 40 !== t.keyCode || (e *= 4), 
                    i = this.moveAvailableDate(s, e, "moveYear")), i && (this.focusDate = this.viewDate = i, 
                    this.setValue(), this.fill(), t.preventDefault());
                    break;

                  case 13:
                    if (!this.o.forceParse) break;
                    s = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(s), 
                    a = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                    this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), 
                    t.stopPropagation(), this.o.autoclose && this.hide());
                    break;

                  case 9:
                    this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), 
                    this.hide();
                }
                a && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), 
                this.inputField.trigger("change"));
            } else 40 !== t.keyCode && 27 !== t.keyCode || (this.show(), t.stopPropagation());
        },
        setViewMode: function(t) {
            this.viewMode = t, this.picker.children("div").hide().filter(".datepicker-" + m.viewModes[this.viewMode].clsName).show(), 
            this.updateNavArrows(), this._trigger("changeViewMode", new Date(this.viewDate));
        }
    };
    var c = function(e, i) {
        t.data(e, "datepicker", this), this.element = t(e), this.inputs = t.map(i.inputs, function(t) {
            return t.jquery ? t[0] : t;
        }), delete i.inputs, this.keepEmptyValues = i.keepEmptyValues, delete i.keepEmptyValues, 
        p.call(t(this.inputs), i).on("changeDate", t.proxy(this.dateUpdated, this)), this.pickers = t.map(this.inputs, function(e) {
            return t.data(e, "datepicker");
        }), this.updateDates();
    };
    c.prototype = {
        updateDates: function() {
            this.dates = t.map(this.pickers, function(t) {
                return t.getUTCDate();
            }), this.updateRanges();
        },
        updateRanges: function() {
            var e = t.map(this.dates, function(t) {
                return t.valueOf();
            });
            t.each(this.pickers, function(t, i) {
                i.setRange(e);
            });
        },
        dateUpdated: function(i) {
            if (!this.updating) {
                this.updating = !0;
                var a = t.data(i.target, "datepicker");
                if (a !== e) {
                    var s = a.getUTCDate(), n = this.keepEmptyValues, o = t.inArray(i.target, this.inputs), r = o - 1, h = o + 1, l = this.inputs.length;
                    if (-1 !== o) {
                        if (t.each(this.pickers, function(t, e) {
                            e.getUTCDate() || e !== a && n || e.setUTCDate(s);
                        }), s < this.dates[r]) for (;0 <= r && s < this.dates[r]; ) this.pickers[r--].setUTCDate(s); else if (s > this.dates[h]) for (;h < l && s > this.dates[h]; ) this.pickers[h++].setUTCDate(s);
                        this.updateDates(), delete this.updating;
                    }
                }
            }
        },
        destroy: function() {
            t.map(this.pickers, function(t) {
                t.destroy();
            }), t(this.inputs).off("changeDate", this.dateUpdated), delete this.element.data().datepicker;
        },
        remove: n("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead")
    };
    var u = t.fn.datepicker, p = function(i) {
        var s, a = Array.apply(null, arguments);
        if (a.shift(), this.each(function() {
            var e = t(this), n = e.data("datepicker"), o = "object" == typeof i && i;
            if (!n) {
                var l = function(e, i) {
                    var a = t(e).data(), s = {}, n = new RegExp("^" + i.toLowerCase() + "([A-Z])");
                    for (var o in i = new RegExp("^" + i.toLowerCase()), a) i.test(o) && (s[o.replace(n, function(t, e) {
                        return e.toLowerCase();
                    })] = a[o]);
                    return s;
                }(this, "date"), u = function(e) {
                    var i = {};
                    if (D[e] || (e = e.split("-")[0], D[e])) {
                        var a = D[e];
                        return t.each(g, function(t, e) {
                            e in a && (i[e] = a[e]);
                        }), i;
                    }
                }(t.extend({}, f, l, o).language), p = t.extend({}, f, u, l, o);
                n = e.hasClass("input-daterange") || p.inputs ? (t.extend(p, {
                    inputs: p.inputs || e.find("input").toArray()
                }), new c(this, p)) : new d(this, p), e.data("datepicker", n);
            }
            "string" == typeof i && "function" == typeof n[i] && (s = n[i].apply(n, a));
        }), s === e || s instanceof d || s instanceof c) return this;
        if (1 < this.length) throw new Error("Using only allowed for the collection of a single element (" + i + " function)");
        return s;
    };
    t.fn.datepicker = p;
    var f = t.fn.datepicker.defaults = {
        assumeNearbyYear: !1,
        autoclose: !1,
        beforeShowDay: t.noop,
        beforeShowMonth: t.noop,
        beforeShowYear: t.noop,
        beforeShowDecade: t.noop,
        beforeShowCentury: t.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        toggleActive: !1,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keepEmptyValues: !1,
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        maxViewMode: 4,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -1 / 0,
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        updateViewDate: !0,
        weekStart: 0,
        disableTouchKeyboard: !1,
        enableOnReadonly: !0,
        showOnFocus: !0,
        zIndexOffset: 10,
        container: "body",
        immediateUpdates: !1,
        title: "",
        templates: {
            leftArrow: "&#x00AB;",
            rightArrow: "&#x00BB;"
        },
        showWeekDays: !0
    }, g = t.fn.datepicker.locale_opts = [ "format", "rtl", "weekStart" ];
    t.fn.datepicker.Constructor = d;
    var D = t.fn.datepicker.dates = {
        en: {
            days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            daysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            daysMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
            months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: "Today",
            clear: "Clear",
            titleFormat: "MM yyyy"
        }
    }, m = {
        viewModes: [ {
            names: [ "days", "month" ],
            clsName: "days",
            e: "changeMonth"
        }, {
            names: [ "months", "year" ],
            clsName: "months",
            e: "changeYear",
            navStep: 1
        }, {
            names: [ "years", "decade" ],
            clsName: "years",
            e: "changeDecade",
            navStep: 10
        }, {
            names: [ "decades", "century" ],
            clsName: "decades",
            e: "changeCentury",
            navStep: 100
        }, {
            names: [ "centuries", "millennium" ],
            clsName: "centuries",
            e: "changeMillennium",
            navStep: 1e3
        } ],
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
        parseFormat: function(t) {
            if ("function" == typeof t.toValue && "function" == typeof t.toDisplay) return t;
            var e = t.replace(this.validParts, "\0").split("\0"), i = t.match(this.validParts);
            if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
            return {
                separators: e,
                parts: i
            };
        },
        parseDate: function(i, s, n, o) {
            function h() {
                var t = this.slice(0, l[p].length), e = l[p].slice(0, t.length);
                return t.toLowerCase() === e.toLowerCase();
            }
            if (!i) return e;
            if (i instanceof Date) return i;
            if ("string" == typeof s && (s = m.parseFormat(s)), s.toValue) return s.toValue(i, s, n);
            var l, c, u, p, f, g = {
                d: "moveDay",
                m: "moveMonth",
                w: "moveWeek",
                y: "moveYear"
            }, y = {
                yesterday: "-1d",
                today: "+0d",
                tomorrow: "+1d"
            };
            if (i in y && (i = y[i]), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(i)) {
                for (l = i.match(/([\-+]\d+)([dmwy])/gi), i = new Date(), p = 0; p < l.length; p++) c = l[p].match(/([\-+]\d+)([dmwy])/i), 
                u = Number(c[1]), f = g[c[2].toLowerCase()], i = d.prototype[f](i, u);
                return d.prototype._zero_utc_time(i);
            }
            l = i && i.match(this.nonpunctuation) || [];
            var v, w, k = {}, _ = [ "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd" ], b = {
                yyyy: function(t, e) {
                    return t.setUTCFullYear(o ? function(t, e) {
                        return !0 === e && (e = 10), t < 100 && (t += 2e3) > new Date().getFullYear() + e && (t -= 100), 
                        t;
                    }(e, o) : e);
                },
                m: function(t, e) {
                    if (isNaN(t)) return t;
                    for (e -= 1; e < 0; ) e += 12;
                    for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e; ) t.setUTCDate(t.getUTCDate() - 1);
                    return t;
                },
                d: function(t, e) {
                    return t.setUTCDate(e);
                }
            };
            b.yy = b.yyyy, b.M = b.MM = b.mm = b.m, b.dd = b.d, i = a();
            var C = s.parts.slice();
            if (l.length !== C.length && (C = t(C).filter(function(e, i) {
                return -1 !== t.inArray(i, _);
            }).toArray()), l.length === C.length) {
                var T, M, U;
                for (p = 0, T = C.length; p < T; p++) {
                    if (v = parseInt(l[p], 10), c = C[p], isNaN(v)) switch (c) {
                      case "MM":
                        w = t(D[n].months).filter(h), v = t.inArray(w[0], D[n].months) + 1;
                        break;

                      case "M":
                        w = t(D[n].monthsShort).filter(h), v = t.inArray(w[0], D[n].monthsShort) + 1;
                    }
                    k[c] = v;
                }
                for (p = 0; p < _.length; p++) (U = _[p]) in k && !isNaN(k[U]) && (M = new Date(i), 
                b[U](M, k[U]), isNaN(M) || (i = M));
            }
            return i;
        },
        formatDate: function(e, i, a) {
            if (!e) return "";
            if ("string" == typeof i && (i = m.parseFormat(i)), i.toDisplay) return i.toDisplay(e, i, a);
            var s = {
                d: e.getUTCDate(),
                D: D[a].daysShort[e.getUTCDay()],
                DD: D[a].days[e.getUTCDay()],
                m: e.getUTCMonth() + 1,
                M: D[a].monthsShort[e.getUTCMonth()],
                MM: D[a].months[e.getUTCMonth()],
                yy: e.getUTCFullYear().toString().substring(2),
                yyyy: e.getUTCFullYear()
            };
            s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m, e = [];
            for (var n = t.extend([], i.separators), o = 0, r = i.parts.length; o <= r; o++) n.length && e.push(n.shift()), 
            e.push(s[i.parts[o]]);
            return e.join("");
        },
        headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' + f.templates.leftArrow + '</th><th colspan="5" class="datepicker-switch"></th><th class="next">' + f.templates.rightArrow + "</th></tr></thead>",
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    m.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + m.headTemplate + "<tbody></tbody>" + m.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + "</table></div></div>", 
    t.fn.datepicker.DPGlobal = m, t.fn.datepicker.noConflict = function() {
        return t.fn.datepicker = u, this;
    }, t.fn.datepicker.version = "1.7.1", t.fn.datepicker.deprecated = function(t) {
        var e = window.console;
        e && e.warn && e.warn("DEPRECATED: " + t);
    }, t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
        var i = t(this);
        i.data("datepicker") || (e.preventDefault(), p.call(i, "show"));
    }), t(function() {
        p.call(t('[data-provide="datepicker-inline"]'));
    });
});