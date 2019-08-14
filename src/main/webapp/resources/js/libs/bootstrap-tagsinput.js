!function(t) {
    "use strict";
    function e(e, n) {
        this.isInit = !0, this.itemsArray = [], this.$element = t(e), this.$element.hide(), 
        this.isSelect = "SELECT" === e.tagName, this.multiple = this.isSelect && e.hasAttribute("multiple"), 
        this.objectItems = n && n.itemValue, this.placeholderText = e.hasAttribute("placeholder") ? this.$element.attr("placeholder") : "", 
        this.inputSize = Math.max(1, this.placeholderText.length), this.$container = t('<div class="bootstrap-tagsinput"></div>'), 
        this.$input = t('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container), 
        this.$element.before(this.$container), this.build(n), this.isInit = !1;
    }
    function n(t, e) {
        if ("function" != typeof t[e]) {
            var n = t[e];
            t[e] = function(t) {
                return t[n];
            };
        }
    }
    function i(t, e) {
        if ("function" != typeof t[e]) {
            var n = t[e];
            t[e] = function() {
                return n;
            };
        }
    }
    function a(t) {
        return t ? l.text(t).html() : "";
    }
    function o(t) {
        var e = 0;
        if (document.selection) {
            t.focus();
            var n = document.selection.createRange();
            n.moveStart("character", -t.value.length), e = n.text.length;
        } else (t.selectionStart || "0" == t.selectionStart) && (e = t.selectionStart);
        return e;
    }
    var s = {
        tagClass: function(t) {
            return "label label-info";
        },
        focusClass: "focus",
        itemValue: function(t) {
            return t ? t.toString() : t;
        },
        itemText: function(t) {
            return this.itemValue(t);
        },
        itemTitle: function(t) {
            return null;
        },
        freeInput: !0,
        addOnBlur: !0,
        maxTags: void 0,
        maxChars: void 0,
        confirmKeys: [ 13, 44 ],
        delimiter: ",",
        delimiterRegex: null,
        cancelConfirmKeysOnEmpty: !1,
        onTagExists: function(t, e) {
            e.hide().fadeIn();
        },
        trimValue: !1,
        allowDuplicates: !1,
        triggerChange: !0
    };
    e.prototype = {
        constructor: e,
        add: function(e, n, i) {
            var o = this;
            if (!(o.options.maxTags && o.itemsArray.length >= o.options.maxTags) && (!1 === e || e)) {
                if ("string" == typeof e && o.options.trimValue && (e = t.trim(e)), "object" == typeof e && !o.objectItems) throw "Can't add objects when itemValue option is not set";
                if (!e.toString().match(/^\s*$/)) {
                    if (o.isSelect && !o.multiple && 0 < o.itemsArray.length && o.remove(o.itemsArray[0]), 
                    "string" == typeof e && "INPUT" === this.$element[0].tagName) {
                        var r = o.options.delimiterRegex ? o.options.delimiterRegex : o.options.delimiter, s = e.split(r);
                        if (1 < s.length) {
                            for (var l = 0; l < s.length; l++) this.add(s[l], !0);
                            return void (n || o.pushVal(o.options.triggerChange));
                        }
                    }
                    var u = o.options.itemValue(e), p = o.options.itemText(e), c = o.options.tagClass(e), h = o.options.itemTitle(e), m = t.grep(o.itemsArray, function(t) {
                        return o.options.itemValue(t) === u;
                    })[0];
                    if (!m || o.options.allowDuplicates) {
                        if (!(o.items().toString().length + e.length + 1 > o.options.maxInputLength)) {
                            var f = t.Event("beforeItemAdd", {
                                item: e,
                                cancel: !1,
                                options: i
                            });
                            if (o.$element.trigger(f), !f.cancel) {
                                o.itemsArray.push(e);
                                var d = t('<span class="tag ' + a(c) + (null !== h ? '" title="' + h : "") + '">' + a(p) + '<span data-role="remove"></span></span>');
                                d.data("item", e), o.findInputWrapper().before(d), d.after(" ");
                                var g = t('option[value="' + encodeURIComponent(u) + '"]', o.$element).length || t('option[value="' + a(u) + '"]', o.$element).length;
                                if (o.isSelect && !g) {
                                    var v = t("<option selected>" + a(p) + "</option>");
                                    v.data("item", e), v.attr("value", u), o.$element.append(v);
                                }
                                n || o.pushVal(o.options.triggerChange), o.options.maxTags !== o.itemsArray.length && o.items().toString().length !== o.options.maxInputLength || o.$container.addClass("bootstrap-tagsinput-max"), 
                                t(".typeahead, .twitter-typeahead", o.$container).length && o.$input.typeahead("val", ""), 
                                this.isInit ? o.$element.trigger(t.Event("itemAddedOnInit", {
                                    item: e,
                                    options: i
                                })) : o.$element.trigger(t.Event("itemAdded", {
                                    item: e,
                                    options: i
                                }));
                            }
                        }
                    } else if (o.options.onTagExists) {
                        var y = t(".tag", o.$container).filter(function() {
                            return t(this).data("item") === m;
                        });
                        o.options.onTagExists(e, y);
                    }
                }
            }
        },
        remove: function(e, n, i) {
            var a = this;
            if (a.objectItems && (e = (e = "object" == typeof e ? t.grep(a.itemsArray, function(t) {
                return a.options.itemValue(t) == a.options.itemValue(e);
            }) : t.grep(a.itemsArray, function(t) {
                return a.options.itemValue(t) == e;
            }))[e.length - 1]), e) {
                var o = t.Event("beforeItemRemove", {
                    item: e,
                    cancel: !1,
                    options: i
                });
                if (a.$element.trigger(o), o.cancel) return;
                t(".tag", a.$container).filter(function() {
                    return t(this).data("item") === e;
                }).remove(), t("option", a.$element).filter(function() {
                    return t(this).data("item") === e;
                }).remove(), -1 !== t.inArray(e, a.itemsArray) && a.itemsArray.splice(t.inArray(e, a.itemsArray), 1);
            }
            n || a.pushVal(a.options.triggerChange), a.options.maxTags > a.itemsArray.length && a.$container.removeClass("bootstrap-tagsinput-max"), 
            a.$element.trigger(t.Event("itemRemoved", {
                item: e,
                options: i
            }));
        },
        removeAll: function() {
            var e = this;
            for (t(".tag", e.$container).remove(), t("option", e.$element).remove(); 0 < e.itemsArray.length; ) e.itemsArray.pop();
            e.pushVal(e.options.triggerChange);
        },
        refresh: function() {
            var e = this;
            t(".tag", e.$container).each(function() {
                var n = t(this), i = n.data("item"), o = e.options.itemValue(i), r = e.options.itemText(i), s = e.options.tagClass(i);
                n.attr("class", null), n.addClass("tag " + a(s)), n.contents().filter(function() {
                    return 3 == this.nodeType;
                })[0].nodeValue = a(r), e.isSelect && t("option", e.$element).filter(function() {
                    return t(this).data("item") === i;
                }).attr("value", o);
            });
        },
        items: function() {
            return this.itemsArray;
        },
        pushVal: function() {
            var e = this, n = t.map(e.items(), function(t) {
                return e.options.itemValue(t).toString();
            });
            e.$element.val(n, !0), e.options.triggerChange && e.$element.trigger("change");
        },
        build: function(e) {
            var a = this;
            if (a.options = t.extend({}, s, e), a.objectItems && (a.options.freeInput = !1), 
            n(a.options, "itemValue"), n(a.options, "itemText"), i(a.options, "tagClass"), a.options.typeahead) {
                var l = a.options.typeahead || {};
                i(l, "source"), a.$input.typeahead(t.extend({}, l, {
                    source: function(e, n) {
                        function i(t) {
                            for (var e = [], i = 0; i < t.length; i++) {
                                var r = a.options.itemText(t[i]);
                                o[r] = t[i], e.push(r);
                            }
                            n(e);
                        }
                        this.map = {};
                        var o = this.map, r = l.source(e);
                        t.isFunction(r.success) ? r.success(i) : t.isFunction(r.then) ? r.then(i) : t.when(r).then(i);
                    },
                    updater: function(t) {
                        return a.add(this.map[t]), this.map[t];
                    },
                    matcher: function(t) {
                        return -1 !== t.toLowerCase().indexOf(this.query.trim().toLowerCase());
                    },
                    sorter: function(t) {
                        return t.sort();
                    },
                    highlighter: function(t) {
                        var e = new RegExp("(" + this.query + ")", "gi");
                        return t.replace(e, "<strong>$1</strong>");
                    }
                }));
            }
            if (a.options.typeaheadjs) {
                var u = null, p = {}, c = a.options.typeaheadjs;
                p = t.isArray(c) ? (u = c[0], c[1]) : c, a.$input.typeahead(u, p).on("typeahead:selected", t.proxy(function(t, e) {
                    p.valueKey ? a.add(e[p.valueKey]) : a.add(e), a.$input.typeahead("val", "");
                }, a));
            }
            a.$container.on("click", t.proxy(function(t) {
                a.$element.attr("disabled") || a.$input.removeAttr("disabled"), a.$input.focus();
            }, a)), a.options.addOnBlur && a.options.freeInput && a.$input.on("focusout", t.proxy(function(e) {
                0 === t(".typeahead, .twitter-typeahead", a.$container).length && (a.add(a.$input.val()), 
                a.$input.val(""));
            }, a)), a.$container.on({
                focusin: function() {
                    a.$container.addClass(a.options.focusClass);
                },
                focusout: function() {
                    a.$container.removeClass(a.options.focusClass);
                }
            }), a.$container.on("keydown", "input", t.proxy(function(e) {
                var n = t(e.target), i = a.findInputWrapper();
                if (a.$element.attr("disabled")) a.$input.attr("disabled", "disabled"); else {
                    switch (e.which) {
                      case 8:
                        if (0 === o(n[0])) {
                            var r = i.prev();
                            r.length && a.remove(r.data("item"));
                        }
                        break;

                      case 46:
                        if (0 === o(n[0])) {
                            var s = i.next();
                            s.length && a.remove(s.data("item"));
                        }
                        break;

                      case 37:
                        var l = i.prev();
                        0 === n.val().length && l[0] && (l.before(i), n.focus());
                        break;

                      case 39:
                        var u = i.next();
                        0 === n.val().length && u[0] && (u.after(i), n.focus());
                    }
                    var p = n.val().length;
                    Math.ceil(p / 5), n.attr("size", Math.max(this.inputSize, n.val().length));
                }
            }, a)), a.$container.on("keypress", "input", t.proxy(function(e) {
                var n = t(e.target);
                if (a.$element.attr("disabled")) a.$input.attr("disabled", "disabled"); else {
                    var i = n.val(), o = a.options.maxChars && i.length >= a.options.maxChars;
                    a.options.freeInput && (function(e, n) {
                        var i = !1;
                        return t.each(n, function(t, n) {
                            if ("number" == typeof n && e.which === n) return !(i = !0);
                            if (e.which === n.which) {
                                var a = !n.hasOwnProperty("altKey") || e.altKey === n.altKey, o = !n.hasOwnProperty("shiftKey") || e.shiftKey === n.shiftKey, r = !n.hasOwnProperty("ctrlKey") || e.ctrlKey === n.ctrlKey;
                                if (a && o && r) return !(i = !0);
                            }
                        }), i;
                    }(e, a.options.confirmKeys) || o) && (0 !== i.length && (a.add(o ? i.substr(0, a.options.maxChars) : i), 
                    n.val("")), !1 === a.options.cancelConfirmKeysOnEmpty && e.preventDefault());
                    var s = n.val().length;
                    Math.ceil(s / 5), n.attr("size", Math.max(this.inputSize, n.val().length));
                }
            }, a)), a.$container.on("click", "[data-role=remove]", t.proxy(function(e) {
                a.$element.attr("disabled") || a.remove(t(e.target).closest(".tag").data("item"));
            }, a)), a.options.itemValue === s.itemValue && ("INPUT" === a.$element[0].tagName ? a.add(a.$element.val()) : t("option", a.$element).each(function() {
                a.add(t(this).attr("value"), !0);
            }));
        },
        destroy: function() {
            var t = this;
            t.$container.off("keypress", "input"), t.$container.off("click", "[role=remove]"), 
            t.$container.remove(), t.$element.removeData("tagsinput"), t.$element.show();
        },
        focus: function() {
            this.$input.focus();
        },
        input: function() {
            return this.$input;
        },
        findInputWrapper: function() {
            for (var e = this.$input[0], n = this.$container[0]; e && e.parentNode !== n; ) e = e.parentNode;
            return t(e);
        }
    }, t.fn.tagsinput = function(n, i, a) {
        var o = [];
        return this.each(function() {
            var r = t(this).data("tagsinput");
            if (r) if (n || i) {
                if (void 0 !== r[n]) {
                    if (3 === r[n].length && void 0 !== a) s = r[n](i, null, a); else var s = r[n](i);
                    void 0 !== s && o.push(s);
                }
            } else o.push(r); else r = new e(this, n), t(this).data("tagsinput", r), o.push(r), 
            "SELECT" === this.tagName && t("option", t(this)).attr("selected", "selected"), 
            t(this).val(t(this).val());
        }), "string" == typeof n ? 1 < o.length ? o : o[0] : o;
    }, t.fn.tagsinput.Constructor = e;
    var l = t("<div />");
    t(function() {
        t("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
    });
}(window.jQuery);