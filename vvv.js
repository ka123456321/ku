/*雪花*/


//wp-snow-effect-public.js

(function($) {
	'use strict';

	$(window).load(function() {

		if (!snoweffect.show) return;
		jQuery().jSnow({
			followScroll: true,
			flakes: snoweffect.flakes_num,
			fallingSpeedMin: parseInt(snoweffect.falling_speed_min),
			fallingSpeedMax: parseInt(snoweffect.falling_speed_max),
			flakeMaxSize: parseInt(snoweffect.flake_max_size),
			flakeMinSize: parseInt(snoweffect.flake_min_size),
			flakeColor: [snoweffect.flake_color],
			vSize: snoweffect.vertical_size,
			fadeAway: snoweffect.fade_away,
			zIndex: snoweffect.flake_zindex,
			flakeCode: ["&" + snoweffect.flake_type + ";"]
		});
	});

})(jQuery);


//jsnow.js

(function($) {
	$.fn.jSnow = function(h) {
		var j = $.extend({}, $.fn.jSnow.defaults, h);
		var k, WIN_HEIGHT;
		var l = j.flakes;
		var m = j.flakeCode;
		var n = j.flakeColor;
		var o = j.flakeMinSize;
		var p = j.flakeMaxSize;
		var q = j.fallingSpeedMin;
		var r = j.fallingSpeedMax;
		var s = j.interval;
		var t = j.zIndex;
		var vs = j.vSize;
		var fa = j.fadeAway;
		var fs = j.followScroll;
		setWaH();
		var useGif = false;
		//if ($.browser.msie && (parseFloat($.browser.version) < 8))useGif = true;
		if ($('body').is('.lt-ie8 *')) {
			useGif = true;
		}
		//if ($.browser.msie && (parseFloat($.browser.version) < 8) && t == "auto")t = 0;
		if ($('body').is('.lt-ie8 *') && t == "auto") t = 0;

		var u = $("<div \/>");
		u.css({
			width: k + "px",
			height: 1,
			display: "block",
			overflow: "visible",
			position: "fixed",
			left: "1px",
			zIndex: t
		});
		if (fs) {
			u.css('top', $("html").scrollTop() + 1 + "px");
		} else {
			u.css = '1px';
		}
		$("body").prepend(u).css({
			height: "100%"
		});
		$("html").css({
			"overflow-y": "scroll",
			"overflow-x": "hidden"
		});
		var v = Array();
		generateFlake(l, false);
		setInterval(animateFlakes, s);
		window.onresize = setWaH;

		function setWaH() {
			k = $('body').width();
			var def_h = window.innerHeight || document.documentElement.clientHeight;
			def_h -= 50;
			if (!vs || vs > def_h) {
				WIN_HEIGHT = window.innerHeight || document.documentElement.clientHeight
				WIN_HEIGHT -= 50;
			} else WIN_HEIGHT = vs;
		};
		if (fs) {
			window.onscroll = function() {
				u.css({
					top: $("html").scrollTop() + "px"
				})
			};
		}

		function generateFlake(a, b) {
			a = a || 1;
			b = b || false;
			var i = 0;
			for (i = 0; i < a; i++) {
				var c = $("<span \/>");
				var d = o + Math.floor(Math.random() * p);
				var e = m[Math.floor(Math.random() * m.length)];
				if (e.indexOf(".gif") != -1 || e.indexOf(".png") != -1) {
					var f = new Image();
					if (useGif) e = e.replace("png", "gif");
					f.src = e;
					e = "<img src='" + e + "' alt='jSnowFlake'>"
				}
				c.html(e).css({
					color: n[Math.floor(Math.random() * n.length)],
					fontSize: d + "px",
					display: "block",
					position: "fixed",
					cursor: "default",
					"pointer-events": "none",
					"z-index": t
				});
				$(u).append(c);
				f_left = Math.floor(Math.random() * (k - c.width() - 50)) + 25;
				f_top = (b) ? -1 * c.height() : Math.floor(Math.random() * (WIN_HEIGHT - 50));
				var g = Math.floor(Math.random() * 90);
				jQuery.data(c, "posData", {
					top: f_top,
					left: f_left,
					rad: Math.random() * 50,
					i: Math.ceil(q + Math.random() * (r - q)),
					swingRange: g
				});
				c.css({
					top: f_top + "px",
					left: f_left + "px"
				});
				v.push(c)
			}
		};

		function animateFlakes() {
			var i = 0;
			for (i = v.length - 1; i >= 0; i--) {
				var f = v[i];
				var a = jQuery.data(f, "posData");
				a.top += a.i;
				var b = Number();
				b = Math.cos((a.rad / 180) * Math.PI);
				a.rad += 2;
				var X = a.left - b * a.swingRange;
				if (fa) {
					op = (WIN_HEIGHT - a.top < 100) ? ((WIN_HEIGHT - a.top) / 100) : 1;
					f.css('opacity', op);
				}
				f.css({
					top: a.top + "px",
					left: X + "px"
				});
				if (a.top > WIN_HEIGHT) {
					jQuery.removeData(f);
					f.remove();
					v.splice(i, 1);
					generateFlake(1, true)
				}
			}
		};
		return this
	};
	$.fn.jSnow.defaults = {
		flakes: 30,
		fallingSpeedMin: 1,
		fallingSpeedMax: 3,
		flakeMaxSize: 20,
		flakeMinSize: 10,
		flakeCode: ["&bull;"],
		flakeColor: ["#fff"],
		zIndex: "auto",
		interval: 50,
		fadeAway: true,
	}
})(jQuery);


/*左侧*/

//main.js
(function($) {
	"use strict";

	$(document).ready(function() {

		/*-- Notification --*/
		var $body = $('body');
		var $window = $(window);

		/*-- Notification --*/
		var $notificationSection = $('.ht-notification-section');

		/*-- Notification Height --*/
		var $notiTopHeight = $('.ht-notification-section.ht-n-top').height();
		var $notiBottomHeight = $('.ht-notification-section.ht-n-bottom').height();

		/*-- Open & Close Button --*/
		var $openToggle = $('.ht-n-open-toggle');
		var $closeToggle = $('.ht-n-close-toggle');


		/*-- Body Padding For Default Open Notification --*/
		if ($notificationSection.hasClass('ht-n-top ht-n-open')) {

			$body.css('padding-top', $notiTopHeight);
			$body.addClass('htnotification-mobile');

		}
		if ($notificationSection.hasClass('ht-n-bottom ht-n-open')) {

			$body.css('padding-bottom', $notiBottomHeight);
			$body.addClass('htnotification-mobile');

		}

		/*-- Body Padding For Default Closed Notification --*/
		if ($notificationSection.hasClass('ht-n-top ht-n-close')) {

			$body.css('padding-top', '0px');

		}
		if ($notificationSection.hasClass('ht-n-bottom ht-n-close')) {

			$body.css('padding-bottom', '0px');

		}

		/*-- Closed Notification Open Icon Active Class --*/
		if ($notificationSection.hasClass('ht-n-close')) {

			$('.ht-n-close').find('.ht-n-open-toggle').addClass('ht-n-active');

		}


		/*-- Closed Notification --*/
		if ($notificationSection.hasClass('ht-n-top ht-n-close')) {

			$('.ht-n-top.ht-n-close').find('.ht-notification-wrap').slideUp();

		}
		if ($notificationSection.hasClass('ht-n-bottom ht-n-close')) {

			$('.ht-n-bottom.ht-n-close').find('.ht-notification-wrap').slideUp();

		}


		/*-- left and right notification  --*/
		var nLeftSection = $('.ht-n-left');
		var nLeftSectionWidth = nLeftSection.width();
		var nRightSection = $('.ht-n-right');
		var nRightSectionWidth = nRightSection.width();

		if (nLeftSection.hasClass('ht-n-close')) {

			nLeftSection.css({
				'left': -1 * nLeftSectionWidth + 'px',
			});

		}
		if (nRightSection.hasClass('ht-n-close')) {

			nRightSection.css({
				'right': -1 * nRightSectionWidth + 'px',
			});

		}


		/*-- Notification Close Function --*/
		$closeToggle.on('click', function(e) {
			e.preventDefault();

			var nSection = $(this).parents('.ht-notification-buttons').parents('.ht-notification-wrap').parents('.ht-notification-section');
			var nSectionWidth = nSection.width();

			/* Open Toggle */
			nSection.find('.ht-n-open-toggle').addClass('ht-n-active');

			/* Top, Bottom, Left & Right Animation */
			if (nSection.hasClass('ht-n-top')) {

				nSection.removeClass('ht-n-open').addClass('ht-n-close');
				nSection.find('.ht-notification-wrap').slideToggle();
				$body.css('padding-top', '0px');

			} else if (nSection.hasClass('ht-n-bottom')) {

				nSection.removeClass('ht-n-open').addClass('ht-n-close');
				nSection.find('.ht-notification-wrap').slideToggle();
				$body.css('padding-bottom', '0px');

			} else if (nSection.hasClass('ht-n-left')) {

				nSection.removeClass('ht-n-open').addClass('ht-n-close');
				nSection.css({
					'left': -1 * nSectionWidth + 'px',
				});

			} else if (nSection.hasClass('ht-n-right')) {

				nSection.removeClass('ht-n-open').addClass('ht-n-close');
				nSection.css({
					'right': -1 * nSectionWidth + 'px',
				});

			}

		});

		/*-- Notification Open Function --*/
		$openToggle.on('click', function(e) {
			e.preventDefault();

			var nSection = $(this).parents('.ht-notification-section');

			/* Open Toggle */
			nSection.find('.ht-n-open-toggle').removeClass('ht-n-active');

			/* Top, Bottom, Left & Right Animation */
			if (nSection.hasClass('ht-n-top')) {

				nSection.removeClass('ht-n-close').addClass('ht-n-open');
				nSection.find('.ht-notification-wrap').slideToggle();
				$body.css('padding-top', $notiTopHeight);

			} else if (nSection.hasClass('ht-n-bottom')) {

				nSection.removeClass('ht-n-close').addClass('ht-n-open');
				nSection.find('.ht-notification-wrap').slideToggle();
				$body.css('padding-bottom', $notiBottomHeight);

			} else if (nSection.hasClass('ht-n-left')) {

				nSection.removeClass('ht-n-close').addClass('ht-n-open');
				nSection.css('left', '0px');
				nSection.find('.ht-notification-wrap').show();

			} else if (nSection.hasClass('ht-n-right')) {

				nSection.removeClass('ht-n-close').addClass('ht-n-open');
				nSection.css('right', '0px');
				nSection.find('.ht-notification-wrap').show();

			}

		});

		$window.on('scroll', function() {
			var $scroll = $window.scrollTop();

			if ($scroll > 400 && $notificationSection.hasClass('ht-n-close ht-n-scroll ht-n-top')) {

				var topSection = $('.ht-n-top.ht-n-scroll'); /* Open Toggle */
				topSection.find('.ht-n-open-toggle').removeClass('ht-n-active');
				topSection.removeClass('ht-n-close ht-n-scroll').addClass('ht-n-open');
				topSection.find('.ht-notification-wrap').slideDown();
				topSection.parents('body').css('padding-top', $notiTopHeight);

			}

			if ($scroll > 800 && $notificationSection.hasClass('ht-n-close ht-n-scroll ht-n-bottom')) {

				var bottomSection = $('.ht-n-bottom.ht-n-scroll'); /* Open Toggle */
				bottomSection.find('.ht-n-open-toggle').removeClass('ht-n-active');
				bottomSection.removeClass('ht-n-close ht-n-scroll').addClass('ht-n-open');
				bottomSection.find('.ht-notification-wrap').slideDown();
				bottomSection.parents('body').css('padding-bottom', $notiBottomHeight);

			}

			if ($scroll > 1200 && $notificationSection.hasClass('ht-n-close ht-n-scroll ht-n-left')) {

				var leftSection = $('.ht-n-left.ht-n-scroll'); /* Open Toggle */
				leftSection.find('.ht-n-open-toggle').removeClass('ht-n-active');
				leftSection.removeClass('ht-n-close ht-n-scroll').addClass('ht-n-open');
				leftSection.css('left', '0px');
				leftSection.find('.ht-notification-wrap').show();

			}

			if ($scroll > 1600 && $notificationSection.hasClass('ht-n-close ht-n-scroll ht-n-right')) {

				var rightSection = $('.ht-n-right.ht-n-scroll'); /* Open Toggle */
				rightSection.find('.ht-n-open-toggle').removeClass('ht-n-active');
				rightSection.removeClass('ht-n-close ht-n-scroll').addClass('ht-n-open');
				rightSection.css('right', '0px');
				rightSection.find('.ht-notification-wrap').show();

			}

		});

	});

})(jQuery);


/*g*/

//jquery.chosen.js

/* Chosen v1.8.7 https://github.com/harvesthq/chosen by Patrick Filler - MIT License */
(function() {
	var t, e, s, i, n = function(t, e) {
			return function() {
				return t.apply(e, arguments)
			}
		},
		r = function(t, e) {
			function s() {
				this.constructor = t
			}
			for (var i in e) o.call(e, i) && (t[i] = e[i]);
			return s.prototype = e.prototype, t.prototype = new s, t.__super__ = e.prototype, t
		},
		o = {}.hasOwnProperty;
	(i = function() {
		function t() {
			this.options_index = 0, this.parsed = []
		}
		return t.prototype.add_node = function(t) {
			return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t)
		}, t.prototype.add_group = function(t) {
			var e, s, i, n, r, o;
			for (e = this.parsed.length, this.parsed.push({
				array_index: e,
				group: !0,
				label: t.label,
				title: t.title ? t.title : void 0,
				children: 0,
				disabled: t.disabled,
				classes: t.className
			}), o = [], s = 0, i = (r = t.childNodes).length; s < i; s++) n = r[s], o.push(this.add_option(n, e, t.disabled));
			return o
		}, t.prototype.add_option = function(t, e, s) {
			if ("OPTION" === t.nodeName.toUpperCase()) return "" !== t.text ? (null != e && (this.parsed[e].children += 1), this.parsed.push({
				array_index: this.parsed.length,
				options_index: this.options_index,
				value: t.value,
				text: t.text,
				html: t.innerHTML,
				title: t.title ? t.title : void 0,
				selected: t.selected,
				disabled: !0 === s ? s : t.disabled,
				group_array_index: e,
				group_label: null != e ? this.parsed[e].label : null,
				classes: t.className,
				style: t.style.cssText
			})) : this.parsed.push({
				array_index: this.parsed.length,
				options_index: this.options_index,
				empty: !0
			}), this.options_index += 1
		}, t
	}()).select_to_array = function(t) {
		var e, s, n, r, o;
		for (r = new i, s = 0, n = (o = t.childNodes).length; s < n; s++) e = o[s], r.add_node(e);
		return r.parsed
	}, e = function() {
		function t(e, s) {
			this.form_field = e, this.options = null != s ? s : {}, this.label_click_handler = n(this.label_click_handler, this), t.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
		}
		return t.prototype.set_default_values = function() {
			return this.click_test_action = function(t) {
				return function(e) {
					return t.test_active_click(e)
				}
			}(this), this.activate_action = function(t) {
				return function(e) {
					return t.activate_field(e)
				}
			}(this), this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className), this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search, this.group_search = null == this.options.group_search || this.options.group_search, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete, this.max_selected_options = this.options.max_selected_options || Infinity, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options, this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1, this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY, this.case_sensitive_search = this.options.case_sensitive_search || !1, this.hide_results_on_select = null == this.options.hide_results_on_select || this.options.hide_results_on_select
		}, t.prototype.set_default_text = function() {
			return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || t.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || t.default_single_text, this.default_text = this.escape_html(this.default_text), this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || t.default_no_result_text
		}, t.prototype.choice_label = function(t) {
			return this.include_group_label_in_selected && null != t.group_label ? "<b class='group-name'>" + this.escape_html(t.group_label) + "</b>" + t.html : t.html
		}, t.prototype.mouse_enter = function() {
			return this.mouse_on_container = !0
		}, t.prototype.mouse_leave = function() {
			return this.mouse_on_container = !1
		}, t.prototype.input_focus = function(t) {
			if (this.is_multiple) {
				if (!this.active_field) return setTimeout(function(t) {
					return function() {
						return t.container_mousedown()
					}
				}(this), 50)
			} else if (!this.active_field) return this.activate_field()
		}, t.prototype.input_blur = function(t) {
			if (!this.mouse_on_container) return this.active_field = !1, setTimeout(function(t) {
				return function() {
					return t.blur_test()
				}
			}(this), 100)
		}, t.prototype.label_click_handler = function(t) {
			return this.is_multiple ? this.container_mousedown(t) : this.activate_field()
		}, t.prototype.results_option_build = function(t) {
			var e, s, i, n, r, o, h;
			for (e = "", h = 0, n = 0, r = (o = this.results_data).length; n < r && (s = o[n], i = "", "" !== (i = s.group ? this.result_add_group(s) : this.result_add_option(s)) && (h++, e += i), (null != t ? t.first : void 0) && (s.selected && this.is_multiple ? this.choice_build(s) : s.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(s))), !(h >= this.max_shown_results)); n++);
			return e
		}, t.prototype.result_add_option = function(t) {
			var e, s;
			return t.search_match && this.include_option_in_results(t) ? (e = [], t.disabled || t.selected && this.is_multiple || e.push("active-result"), !t.disabled || t.selected && this.is_multiple || e.push("disabled-result"), t.selected && e.push("result-selected"), null != t.group_array_index && e.push("group-option"), "" !== t.classes && e.push(t.classes), s = document.createElement("li"), s.className = e.join(" "), t.style && (s.style.cssText = t.style), s.setAttribute("data-option-array-index", t.array_index), s.innerHTML = t.highlighted_html || t.html, t.title && (s.title = t.title), this.outerHTML(s)) : ""
		}, t.prototype.result_add_group = function(t) {
			var e, s;
			return (t.search_match || t.group_match) && t.active_options > 0 ? ((e = []).push("group-result"), t.classes && e.push(t.classes), s = document.createElement("li"), s.className = e.join(" "), s.innerHTML = t.highlighted_html || this.escape_html(t.label), t.title && (s.title = t.title), this.outerHTML(s)) : ""
		}, t.prototype.results_update_field = function() {
			if (this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing) return this.winnow_results()
		}, t.prototype.reset_single_select_options = function() {
			var t, e, s, i, n;
			for (n = [], t = 0, e = (s = this.results_data).length; t < e; t++)(i = s[t]).selected ? n.push(i.selected = !1) : n.push(void 0);
			return n
		}, t.prototype.results_toggle = function() {
			return this.results_showing ? this.results_hide() : this.results_show()
		}, t.prototype.results_search = function(t) {
			return this.results_showing ? this.winnow_results() : this.results_show()
		}, t.prototype.winnow_results = function(t) {
			var e, s, i, n, r, o, h, l, c, _, a, u, d, p, f;
			for (this.no_results_clear(), _ = 0, e = (h = this.get_search_text()).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), c = this.get_search_regex(e), i = 0, n = (l = this.results_data).length; i < n; i++)(r = l[i]).search_match = !1, a = null, u = null, r.highlighted_html = "", this.include_option_in_results(r) && (r.group && (r.group_match = !1, r.active_options = 0), null != r.group_array_index && this.results_data[r.group_array_index] && (0 === (a = this.results_data[r.group_array_index]).active_options && a.search_match && (_ += 1), a.active_options += 1), f = r.group ? r.label : r.text, r.group && !this.group_search || (u = this.search_string_match(f, c), r.search_match = null != u, r.search_match && !r.group && (_ += 1), r.search_match ? (h.length && (d = u.index, o = f.slice(0, d), s = f.slice(d, d + h.length), p = f.slice(d + h.length), r.highlighted_html = this.escape_html(o) + "<em>" + this.escape_html(s) + "</em>" + this.escape_html(p)), null != a && (a.group_match = !0)) : null != r.group_array_index && this.results_data[r.group_array_index].search_match && (r.search_match = !0)));
			return this.result_clear_highlight(), _ < 1 && h.length ? (this.update_results_content(""), this.no_results(h)) : (this.update_results_content(this.results_option_build()), (null != t ? t.skip_highlight : void 0) ? void 0 : this.winnow_results_set_highlight())
		}, t.prototype.get_search_regex = function(t) {
			var e, s;
			return s = this.search_contains ? t : "(^|\\s|\\b)" + t + "[^\\s]*", this.enable_split_word_search || this.search_contains || (s = "^" + s), e = this.case_sensitive_search ? "" : "i", new RegExp(s, e)
		}, t.prototype.search_string_match = function(t, e) {
			var s;
			return s = e.exec(t), !this.search_contains && (null != s ? s[1] : void 0) && (s.index += 1), s
		}, t.prototype.choices_count = function() {
			var t, e, s;
			if (null != this.selected_option_count) return this.selected_option_count;
			for (this.selected_option_count = 0, t = 0, e = (s = this.form_field.options).length; t < e; t++) s[t].selected && (this.selected_option_count += 1);
			return this.selected_option_count
		}, t.prototype.choices_click = function(t) {
			if (t.preventDefault(), this.activate_field(), !this.results_showing && !this.is_disabled) return this.results_show()
		}, t.prototype.keydown_checker = function(t) {
			var e, s;
			switch (s = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), 8 !== s && this.pending_backstroke && this.clear_backstroke(), s) {
			case 8:
				this.backstroke_length = this.get_search_field_value().length;
				break;
			case 9:
				this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
				break;
			case 13:
			case 27:
				this.results_showing && t.preventDefault();
				break;
			case 32:
				this.disable_search && t.preventDefault();
				break;
			case 38:
				t.preventDefault(), this.keyup_arrow();
				break;
			case 40:
				t.preventDefault(), this.keydown_arrow()
			}
		}, t.prototype.keyup_checker = function(t) {
			var e, s;
			switch (s = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), s) {
			case 8:
				this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0 ? this.keydown_backstroke() : this.pending_backstroke || (this.result_clear_highlight(), this.results_search());
				break;
			case 13:
				t.preventDefault(), this.results_showing && this.result_select(t);
				break;
			case 27:
				this.results_showing && this.results_hide();
				break;
			case 9:
			case 16:
			case 17:
			case 18:
			case 38:
			case 40:
			case 91:
				break;
			default:
				this.results_search()
			}
		}, t.prototype.clipboard_event_checker = function(t) {
			if (!this.is_disabled) return setTimeout(function(t) {
				return function() {
					return t.results_search()
				}
			}(this), 50)
		}, t.prototype.container_width = function() {
			return null != this.options.width ? this.options.width : this.form_field.offsetWidth + "px"
		}, t.prototype.include_option_in_results = function(t) {
			return !(this.is_multiple && !this.display_selected_options && t.selected) && (!(!this.display_disabled_options && t.disabled) && !t.empty)
		}, t.prototype.search_results_touchstart = function(t) {
			return this.touch_started = !0, this.search_results_mouseover(t)
		}, t.prototype.search_results_touchmove = function(t) {
			return this.touch_started = !1, this.search_results_mouseout(t)
		}, t.prototype.search_results_touchend = function(t) {
			if (this.touch_started) return this.search_results_mouseup(t)
		}, t.prototype.outerHTML = function(t) {
			var e;
			return t.outerHTML ? t.outerHTML : ((e = document.createElement("div")).appendChild(t), e.innerHTML)
		}, t.prototype.get_single_html = function() {
			return '<a class="chosen-single chosen-default">\n  <span>' + this.default_text + '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'
		}, t.prototype.get_multi_html = function() {
			return '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' + this.default_text + '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'
		}, t.prototype.get_no_results_html = function(t) {
			return '<li class="no-results">\n  ' + this.results_none_found + " <span>" + this.escape_html(t) + "</span>\n</li>"
		}, t.browser_is_supported = function() {
			return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : !(/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent))
		}, t.default_multiple_text = "Select Some Options", t.default_single_text = "Select an Option", t.default_no_result_text = "No results match", t
	}(), (t = jQuery).fn.extend({
		chosen: function(i) {
			return e.browser_is_supported() ? this.each(function(e) {
				var n, r;
				r = (n = t(this)).data("chosen"), "destroy" !== i ? r instanceof s || n.data("chosen", new s(this, i)) : r instanceof s && r.destroy()
			}) : this
		}
	}), s = function(s) {
		function n() {
			return n.__super__.constructor.apply(this, arguments)
		}
		return r(n, e), n.prototype.setup = function() {
			return this.form_field_jq = t(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex
		}, n.prototype.set_up_html = function() {
			var e, s;
			return (e = ["chosen-container"]).push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && e.push(this.form_field.className), this.is_rtl && e.push("chosen-rtl"), s = {
				"class": e.join(" "),
				title: this.form_field.title
			}, this.form_field.id.length && (s.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = t("<div />", s), this.container.width(this.container_width()), this.is_multiple ? this.container.html(this.get_multi_html()) : this.container.html(this.get_single_html()), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior()
		}, n.prototype.on_ready = function() {
			return this.form_field_jq.trigger("chosen:ready", {
				chosen: this
			})
		}, n.prototype.register_observers = function() {
			return this.container.on("touchstart.chosen", function(t) {
				return function(e) {
					t.container_mousedown(e)
				}
			}(this)), this.container.on("touchend.chosen", function(t) {
				return function(e) {
					t.container_mouseup(e)
				}
			}(this)), this.container.on("mousedown.chosen", function(t) {
				return function(e) {
					t.container_mousedown(e)
				}
			}(this)), this.container.on("mouseup.chosen", function(t) {
				return function(e) {
					t.container_mouseup(e)
				}
			}(this)), this.container.on("mouseenter.chosen", function(t) {
				return function(e) {
					t.mouse_enter(e)
				}
			}(this)), this.container.on("mouseleave.chosen", function(t) {
				return function(e) {
					t.mouse_leave(e)
				}
			}(this)), this.search_results.on("mouseup.chosen", function(t) {
				return function(e) {
					t.search_results_mouseup(e)
				}
			}(this)), this.search_results.on("mouseover.chosen", function(t) {
				return function(e) {
					t.search_results_mouseover(e)
				}
			}(this)), this.search_results.on("mouseout.chosen", function(t) {
				return function(e) {
					t.search_results_mouseout(e)
				}
			}(this)), this.search_results.on("mousewheel.chosen DOMMouseScroll.chosen", function(t) {
				return function(e) {
					t.search_results_mousewheel(e)
				}
			}(this)), this.search_results.on("touchstart.chosen", function(t) {
				return function(e) {
					t.search_results_touchstart(e)
				}
			}(this)), this.search_results.on("touchmove.chosen", function(t) {
				return function(e) {
					t.search_results_touchmove(e)
				}
			}(this)), this.search_results.on("touchend.chosen", function(t) {
				return function(e) {
					t.search_results_touchend(e)
				}
			}(this)), this.form_field_jq.on("chosen:updated.chosen", function(t) {
				return function(e) {
					t.results_update_field(e)
				}
			}(this)), this.form_field_jq.on("chosen:activate.chosen", function(t) {
				return function(e) {
					t.activate_field(e)
				}
			}(this)), this.form_field_jq.on("chosen:open.chosen", function(t) {
				return function(e) {
					t.container_mousedown(e)
				}
			}(this)), this.form_field_jq.on("chosen:close.chosen", function(t) {
				return function(e) {
					t.close_field(e)
				}
			}(this)), this.search_field.on("blur.chosen", function(t) {
				return function(e) {
					t.input_blur(e)
				}
			}(this)), this.search_field.on("keyup.chosen", function(t) {
				return function(e) {
					t.keyup_checker(e)
				}
			}(this)), this.search_field.on("keydown.chosen", function(t) {
				return function(e) {
					t.keydown_checker(e)
				}
			}(this)), this.search_field.on("focus.chosen", function(t) {
				return function(e) {
					t.input_focus(e)
				}
			}(this)), this.search_field.on("cut.chosen", function(t) {
				return function(e) {
					t.clipboard_event_checker(e)
				}
			}(this)), this.search_field.on("paste.chosen", function(t) {
				return function(e) {
					t.clipboard_event_checker(e)
				}
			}(this)), this.is_multiple ? this.search_choices.on("click.chosen", function(t) {
				return function(e) {
					t.choices_click(e)
				}
			}(this)) : this.container.on("click.chosen", function(t) {
				t.preventDefault()
			})
		}, n.prototype.destroy = function() {
			return t(this.container[0].ownerDocument).off("click.chosen", this.click_test_action), this.form_field_label.length > 0 && this.form_field_label.off("click.chosen"), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
		}, n.prototype.search_field_disabled = function() {
			return this.is_disabled = this.form_field.disabled || this.form_field_jq.parents("fieldset").is(":disabled"), this.container.toggleClass("chosen-disabled", this.is_disabled), this.search_field[0].disabled = this.is_disabled, this.is_multiple || this.selected_item.off("focus.chosen", this.activate_field), this.is_disabled ? this.close_field() : this.is_multiple ? void 0 : this.selected_item.on("focus.chosen", this.activate_field)
		}, n.prototype.container_mousedown = function(e) {
			var s;
			if (!this.is_disabled) return !e || "mousedown" !== (s = e.type) && "touchstart" !== s || this.results_showing || e.preventDefault(), null != e && t(e.target).hasClass("search-choice-close") ? void 0 : (this.active_field ? this.is_multiple || !e || t(e.target)[0] !== this.selected_item[0] && !t(e.target).parents("a.chosen-single").length || (e.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), t(this.container[0].ownerDocument).on("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
		}, n.prototype.container_mouseup = function(t) {
			if ("ABBR" === t.target.nodeName && !this.is_disabled) return this.results_reset(t)
		}, n.prototype.search_results_mousewheel = function(t) {
			var e;
			if (t.originalEvent && (e = t.originalEvent.deltaY || -t.originalEvent.wheelDelta || t.originalEvent.detail), null != e) return t.preventDefault(), "DOMMouseScroll" === t.type && (e *= 40), this.search_results.scrollTop(e + this.search_results.scrollTop())
		}, n.prototype.blur_test = function(t) {
			if (!this.active_field && this.container.hasClass("chosen-container-active")) return this.close_field()
		}, n.prototype.close_field = function() {
			return t(this.container[0].ownerDocument).off("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale(), this.search_field.blur()
		}, n.prototype.activate_field = function() {
			if (!this.is_disabled) return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
		}, n.prototype.test_active_click = function(e) {
			var s;
			return (s = t(e.target).closest(".chosen-container")).length && this.container[0] === s[0] ? this.active_field = !0 : this.close_field()
		}, n.prototype.results_build = function() {
			return this.parsing = !0, this.selected_option_count = null, this.results_data = i.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
				first: !0
			})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
		}, n.prototype.result_do_highlight = function(t) {
			var e, s, i, n, r;
			if (t.length) {
				if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), i = parseInt(this.search_results.css("maxHeight"), 10), r = this.search_results.scrollTop(), n = i + r, s = this.result_highlight.position().top + this.search_results.scrollTop(), (e = s + this.result_highlight.outerHeight()) >= n) return this.search_results.scrollTop(e - i > 0 ? e - i : 0);
				if (s < r) return this.search_results.scrollTop(s)
			}
		}, n.prototype.result_clear_highlight = function() {
			return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
		}, n.prototype.results_show = function() {
			return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
				chosen: this
			}), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.get_search_field_value()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
				chosen: this
			}))
		}, n.prototype.update_results_content = function(t) {
			return this.search_results.html(t)
		}, n.prototype.results_hide = function() {
			return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
				chosen: this
			})), this.results_showing = !1
		}, n.prototype.set_tab_index = function(t) {
			var e;
			if (this.form_field.tabIndex) return e = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = e
		}, n.prototype.set_label_behavior = function() {
			if (this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = t("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0) return this.form_field_label.on("click.chosen", this.label_click_handler)
		}, n.prototype.show_search_field_default = function() {
			return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
		}, n.prototype.search_results_mouseup = function(e) {
			var s;
			if ((s = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first()).length) return this.result_highlight = s, this.result_select(e), this.search_field.focus()
		}, n.prototype.search_results_mouseover = function(e) {
			var s;
			if (s = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first()) return this.result_do_highlight(s)
		}, n.prototype.search_results_mouseout = function(e) {
			if (t(e.target).hasClass("active-result") || t(e.target).parents(".active-result").first()) return this.result_clear_highlight()
		}, n.prototype.choice_build = function(e) {
			var s, i;
			return s = t("<li />", {
				"class": "search-choice"
			}).html("<span>" + this.choice_label(e) + "</span>"), e.disabled ? s.addClass("search-choice-disabled") : ((i = t("<a />", {
				"class": "search-choice-close",
				"data-option-array-index": e.array_index
			})).on("click.chosen", function(t) {
				return function(e) {
					return t.choice_destroy_link_click(e)
				}
			}(this)), s.append(i)), this.search_container.before(s)
		}, n.prototype.choice_destroy_link_click = function(e) {
			if (e.preventDefault(), e.stopPropagation(), !this.is_disabled) return this.choice_destroy(t(e.target))
		}, n.prototype.choice_destroy = function(t) {
			if (this.result_deselect(t[0].getAttribute("data-option-array-index"))) return this.active_field ? this.search_field.focus() : this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.get_search_field_value().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale()
		}, n.prototype.results_reset = function() {
			if (this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.trigger_form_field_change(), this.active_field) return this.results_hide()
		}, n.prototype.results_reset_cleanup = function() {
			return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
		}, n.prototype.result_select = function(t) {
			var e, s;
			if (this.result_highlight) return e = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
				chosen: this
			}), !1) : (this.is_multiple ? e.removeClass("active-result") : this.reset_single_select_options(), e.addClass("result-selected"), s = this.results_data[e[0].getAttribute("data-option-array-index")], s.selected = !0, this.form_field.options[s.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(s) : this.single_set_selected_text(this.choice_label(s)), this.is_multiple && (!this.hide_results_on_select || t.metaKey || t.ctrlKey) ? t.metaKey || t.ctrlKey ? this.winnow_results({
				skip_highlight: !0
			}) : (this.search_field.val(""), this.winnow_results()) : (this.results_hide(), this.show_search_field_default()), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.trigger_form_field_change({
				selected: this.form_field.options[s.options_index].value
			}), this.current_selectedIndex = this.form_field.selectedIndex, t.preventDefault(), this.search_field_scale())
		}, n.prototype.single_set_selected_text = function(t) {
			return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(t)
		}, n.prototype.result_deselect = function(t) {
			var e;
			return e = this.results_data[t], !this.form_field.options[e.options_index].disabled && (e.selected = !1, this.form_field.options[e.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.trigger_form_field_change({
				deselected: this.form_field.options[e.options_index].value
			}), this.search_field_scale(), !0)
		}, n.prototype.single_deselect_control_build = function() {
			if (this.allow_single_deselect) return this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")
		}, n.prototype.get_search_field_value = function() {
			return this.search_field.val()
		}, n.prototype.get_search_text = function() {
			return t.trim(this.get_search_field_value())
		}, n.prototype.escape_html = function(e) {
			return t("<div/>").text(e).html()
		}, n.prototype.winnow_results_set_highlight = function() {
			var t, e;
			if (e = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), null != (t = e.length ? e.first() : this.search_results.find(".active-result").first())) return this.result_do_highlight(t)
		}, n.prototype.no_results = function(t) {
			var e;
			return e = this.get_no_results_html(t), this.search_results.append(e), this.form_field_jq.trigger("chosen:no_results", {
				chosen: this
			})
		}, n.prototype.no_results_clear = function() {
			return this.search_results.find(".no-results").remove()
		}, n.prototype.keydown_arrow = function() {
			var t;
			return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show()
		}, n.prototype.keyup_arrow = function() {
			var t;
			return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result")).length ? this.result_do_highlight(t.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight()) : void 0 : this.results_show()
		}, n.prototype.keydown_backstroke = function() {
			var t;
			return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last()).length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0
		}, n.prototype.clear_backstroke = function() {
			return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
		}, n.prototype.search_field_scale = function() {
			var e, s, i, n, r, o, h;
			if (this.is_multiple) {
				for (r = {
					position: "absolute",
					left: "-1000px",
					top: "-1000px",
					display: "none",
					whiteSpace: "pre"
				}, s = 0, i = (o = ["fontSize", "fontStyle", "fontWeight", "fontFamily", "lineHeight", "textTransform", "letterSpacing"]).length; s < i; s++) r[n = o[s]] = this.search_field.css(n);
				return (e = t("<div />").css(r)).text(this.get_search_field_value()), t("body").append(e), h = e.width() + 25, e.remove(), this.container.is(":visible") && (h = Math.min(this.container.outerWidth() - 10, h)), this.search_field.width(h)
			}
		}, n.prototype.trigger_form_field_change = function(t) {
			return this.form_field_jq.trigger("input", t), this.form_field_jq.trigger("change", t)
		}, n
	}()
}).call(this);


//jquery.cookie.js

/*! js-cookie v3.0.0-rc.0 | MIT */
!
function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self, function() {
		var r = e.Cookies,
			n = e.Cookies = t();
		n.noConflict = function() {
			return e.Cookies = r, n
		}
	}())
}(this, function() {
	"use strict";

	function e(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = arguments[t];
			for (var n in r) e[n] = r[n]
		}
		return e
	}
	var t = {
		read: function(e) {
			return e.replace(/%3B/g, ";")
		},
		write: function(e) {
			return e.replace(/;/g, "%3B")
		}
	};
	return function r(n, i) {
		function o(r, o, u) {
			if ("undefined" != typeof document) {
				"number" == typeof(u = e({}, i, u)).expires && (u.expires = new Date(Date.now() + 864e5 * u.expires)), u.expires && (u.expires = u.expires.toUTCString()), r = t.write(r).replace(/=/g, "%3D"), o = n.write(String(o), r);
				var c = "";
				for (var f in u) u[f] && (c += "; " + f, !0 !== u[f] && (c += "=" + u[f].split(";")[0]));
				return document.cookie = r + "=" + o + c
			}
		}
		return Object.create({
			set: o,
			get: function(e) {
				if ("undefined" != typeof document && (!arguments.length || e)) {
					for (var r = document.cookie ? document.cookie.split("; ") : [], i = {}, o = 0; o < r.length; o++) {
						var u = r[o].split("="),
							c = u.slice(1).join("="),
							f = t.read(u[0]).replace(/%3D/g, "=");
						if (i[f] = n.read(c, f), e === f) break
					}
					return e ? i[e] : i
				}
			},
			remove: function(t, r) {
				o(t, "", e({}, r, {
					expires: -1
				}))
			},
			withAttributes: function(t) {
				return r(this.converter, e({}, this.attributes, t))
			},
			withConverter: function(t) {
				return r(e({}, this.converter, t), this.attributes)
			}
		}, {
			attributes: {
				value: Object.freeze(i)
			},
			converter: {
				value: Object.freeze(n)
			}
		})
	}(t, {
		path: "/"
	})
});


//jquery.parsley.min.js

/*!
 * Parsley.js
 * Version 2.8.0 - built Wed, Sep 13th 2017, 11:04 pm
 * https://parsleyjs.org
 * Guillaume Potier - <guillaume@wisembly.com>
 * Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
 * MIT Licensed
 */

function _toConsumableArray(e) {
	if (Array.isArray(e)) {
		for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
		return i
	}
	return Array.from(e)
}
var _slice = Array.prototype.slice,
	_slicedToArray = function() {
		function e(e, t) {
			var i = [],
				n = !0,
				r = !1,
				s = void 0;
			try {
				for (var a, o = e[Symbol.iterator](); !(n = (a = o.next()).done) && (i.push(a.value), !t || i.length !== t); n = !0);
			} catch (l) {
				r = !0, s = l
			} finally {
				try {
					!n && o["return"] && o["return"]()
				} finally {
					if (r) throw s
				}
			}
			return i
		}
		return function(t, i) {
			if (Array.isArray(t)) return t;
			if (Symbol.iterator in Object(t)) return e(t, i);
			throw new TypeError("Invalid attempt to destructure non-iterable instance")
		}
	}(),
	_extends = Object.assign ||
function(e) {
	for (var t = 1; t < arguments.length; t++) {
		var i = arguments[t];
		for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
	}
	return e
};
!
function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : e.parsley = t(e.jQuery)
}(this, function(e) {
	"use strict";

	function t(e, t) {
		return e.parsleyAdaptedCallback || (e.parsleyAdaptedCallback = function() {
			var i = Array.prototype.slice.call(arguments, 0);
			i.unshift(this), e.apply(t || M, i)
		}), e.parsleyAdaptedCallback
	}
	function i(e) {
		return 0 === e.lastIndexOf(D, 0) ? e.substr(D.length) : e
	}
	/**
	 * inputevent - Alleviate browser bugs for input events
	 * https://github.com/marcandre/inputevent
	 * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
	 * @author Marc-Andre Lafortune <github@marc-andre.ca>
	 * @license MIT
	 */

	function n() {
		var t = this,
			i = window || global;
		_extends(this, {
			isNativeEvent: function(e) {
				return e.originalEvent && e.originalEvent.isTrusted !== !1
			},
			fakeInputEvent: function(i) {
				t.isNativeEvent(i) && e(i.target).trigger("input")
			},
			misbehaves: function(i) {
				t.isNativeEvent(i) && (t.behavesOk(i), e(document).on("change.inputevent", i.data.selector, t.fakeInputEvent), t.fakeInputEvent(i))
			},
			behavesOk: function(i) {
				t.isNativeEvent(i) && e(document).off("input.inputevent", i.data.selector, t.behavesOk).off("change.inputevent", i.data.selector, t.misbehaves)
			},
			install: function() {
				if (!i.inputEventPatched) {
					i.inputEventPatched = "0.0.3";
					for (var n = ["select", 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'], r = 0; r < n.length; r++) {
						var s = n[r];
						e(document).on("input.inputevent", s, {
							selector: s
						}, t.behavesOk).on("change.inputevent", s, {
							selector: s
						}, t.misbehaves)
					}
				}
			},
			uninstall: function() {
				delete i.inputEventPatched, e(document).off(".inputevent")
			}
		})
	}
	var r = 1,
		s = {},
		a = {
			attr: function(e, t, i) {
				var n, r, s, a = new RegExp("^" + t, "i");
				if ("undefined" == typeof i) i = {};
				else for (n in i) i.hasOwnProperty(n) && delete i[n];
				if (!e) return i;
				for (s = e.attributes, n = s.length; n--;) r = s[n], r && r.specified && a.test(r.name) && (i[this.camelize(r.name.slice(t.length))] = this.deserializeValue(r.value));
				return i
			},
			checkAttr: function(e, t, i) {
				return e.hasAttribute(t + i)
			},
			setAttr: function(e, t, i, n) {
				e.setAttribute(this.dasherize(t + i), String(n))
			},
			getType: function(e) {
				return e.getAttribute("type") || "text"
			},
			generateID: function() {
				return "" + r++
			},
			deserializeValue: function(e) {
				var t;
				try {
					return e ? "true" == e || "false" != e && ("null" == e ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? JSON.parse(e) : e : t) : e
				} catch (i) {
					return e
				}
			},
			camelize: function(e) {
				return e.replace(/-+(.)?/g, function(e, t) {
					return t ? t.toUpperCase() : ""
				})
			},
			dasherize: function(e) {
				return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
			},
			warn: function() {
				var e;
				window.console && "function" == typeof window.console.warn && (e = window.console).warn.apply(e, arguments)
			},
			warnOnce: function(e) {
				s[e] || (s[e] = !0, this.warn.apply(this, arguments))
			},
			_resetWarnings: function() {
				s = {}
			},
			trimString: function(e) {
				return e.replace(/^\s+|\s+$/g, "")
			},
			parse: {
				date: function S(e) {
					var t = e.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
					if (!t) return null;
					var i = t.map(function(e) {
						return parseInt(e, 10)
					}),
						n = _slicedToArray(i, 4),
						r = (n[0], n[1]),
						s = n[2],
						a = n[3],
						S = new Date(r, s - 1, a);
					return S.getFullYear() !== r || S.getMonth() + 1 !== s || S.getDate() !== a ? null : S
				},
				string: function(e) {
					return e
				},
				integer: function(e) {
					return isNaN(e) ? null : parseInt(e, 10)
				},
				number: function(e) {
					if (isNaN(e)) throw null;
					return parseFloat(e)
				},
				"boolean": function(e) {
					return !/^\s*false\s*$/i.test(e)
				},
				object: function(e) {
					return a.deserializeValue(e)
				},
				regexp: function(e) {
					var t = "";
					return /^\/.*\/(?:[gimy]*)$/.test(e) ? (t = e.replace(/.*\/([gimy]*)$/, "$1"), e = e.replace(new RegExp("^/(.*?)/" + t + "$"), "$1")) : e = "^" + e + "$", new RegExp(e, t)
				}
			},
			parseRequirement: function(e, t) {
				var i = this.parse[e || "string"];
				if (!i) throw 'Unknown requirement specification: "' + e + '"';
				var n = i(t);
				if (null === n) throw "Requirement is not a " + e + ': "' + t + '"';
				return n
			},
			namespaceEvents: function(t, i) {
				return t = this.trimString(t || "").split(/\s+/), t[0] ? e.map(t, function(e) {
					return e + "." + i
				}).join(" ") : ""
			},
			difference: function(t, i) {
				var n = [];
				return e.each(t, function(e, t) {
					i.indexOf(t) == -1 && n.push(t)
				}), n
			},
			all: function(t) {
				return e.when.apply(e, _toConsumableArray(t).concat([42, 42]))
			},
			objectCreate: Object.create ||
			function() {
				var e = function() {};
				return function(t) {
					if (arguments.length > 1) throw Error("Second argument not supported");
					if ("object" != typeof t) throw TypeError("Argument must be an object");
					e.prototype = t;
					var i = new e;
					return e.prototype = null, i
				}
			}(),
			_SubmitSelector: 'input[type="submit"], button:submit'
		},
		o = {
			namespace: "data-parsley-",
			inputs: "input, textarea, select",
			excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
			priorityEnabled: !0,
			multiple: null,
			group: null,
			uiEnabled: !0,
			validationThreshold: 3,
			focus: "first",
			trigger: !1,
			triggerAfterFailure: "input",
			errorClass: "parsley-error",
			successClass: "parsley-success",
			classHandler: function(e) {},
			errorsContainer: function(e) {},
			errorsWrapper: '<ul class="parsley-errors-list"></ul>',
			errorTemplate: "<li></li>"
		},
		l = function() {
			this.__id__ = a.generateID()
		};
	l.prototype = {
		asyncSupport: !0,
		_pipeAccordingToValidationResult: function() {
			var t = this,
				i = function() {
					var i = e.Deferred();
					return !0 !== t.validationResult && i.reject(), i.resolve().promise()
				};
			return [i, i]
		},
		actualizeOptions: function() {
			return a.attr(this.element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this
		},
		_resetOptions: function(e) {
			this.domOptions = a.objectCreate(this.parent.options), this.options = a.objectCreate(this.domOptions);
			for (var t in e) e.hasOwnProperty(t) && (this.options[t] = e[t]);
			this.actualizeOptions()
		},
		_listeners: null,
		on: function(e, t) {
			this._listeners = this._listeners || {};
			var i = this._listeners[e] = this._listeners[e] || [];
			return i.push(t), this
		},
		subscribe: function(t, i) {
			e.listenTo(this, t.toLowerCase(), i)
		},
		off: function(e, t) {
			var i = this._listeners && this._listeners[e];
			if (i) if (t) for (var n = i.length; n--;) i[n] === t && i.splice(n, 1);
			else delete this._listeners[e];
			return this
		},
		unsubscribe: function(t, i) {
			e.unsubscribeTo(this, t.toLowerCase())
		},
		trigger: function(e, t, i) {
			t = t || this;
			var n, r = this._listeners && this._listeners[e];
			if (r) for (var s = r.length; s--;) if (n = r[s].call(t, t, i), n === !1) return n;
			return !this.parent || this.parent.trigger(e, t, i)
		},
		asyncIsValid: function(e, t) {
			return a.warnOnce("asyncIsValid is deprecated; please use whenValid instead"), this.whenValid({
				group: e,
				force: t
			})
		},
		_findRelated: function() {
			return this.options.multiple ? e(this.parent.element.querySelectorAll("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]')) : this.$element
		}
	};
	var u = function(e, t) {
			var i = e.match(/^\s*\[(.*)\]\s*$/);
			if (!i) throw 'Requirement is not an array: "' + e + '"';
			var n = i[1].split(",").map(a.trimString);
			if (n.length !== t) throw "Requirement has " + n.length + " values when " + t + " are needed";
			return n
		},
		d = function(e, t, i) {
			var n = null,
				r = {};
			for (var s in e) if (s) {
				var o = i(s);
				"string" == typeof o && (o = a.parseRequirement(e[s], o)), r[s] = o
			} else n = a.parseRequirement(e[s], t);
			return [n, r]
		},
		h = function(t) {
			e.extend(!0, this, t)
		};
	h.prototype = {
		validate: function(e, t) {
			if (this.fn) return arguments.length > 3 && (t = [].slice.call(arguments, 1, -1)), this.fn(e, t);
			if (Array.isArray(e)) {
				if (!this.validateMultiple) throw "Validator `" + this.name + "` does not handle multiple values";
				return this.validateMultiple.apply(this, arguments)
			}
			var i = arguments[arguments.length - 1];
			if (this.validateDate && i._isDateInput()) return arguments[0] = a.parse.date(arguments[0]), null !== arguments[0] && this.validateDate.apply(this, arguments);
			if (this.validateNumber) return !isNaN(e) && (arguments[0] = parseFloat(arguments[0]), this.validateNumber.apply(this, arguments));
			if (this.validateString) return this.validateString.apply(this, arguments);
			throw "Validator `" + this.name + "` only handles multiple values"
		},
		parseRequirements: function(t, i) {
			if ("string" != typeof t) return Array.isArray(t) ? t : [t];
			var n = this.requirementType;
			if (Array.isArray(n)) {
				for (var r = u(t, n.length), s = 0; s < r.length; s++) r[s] = a.parseRequirement(n[s], r[s]);
				return r
			}
			return e.isPlainObject(n) ? d(n, t, i) : [a.parseRequirement(n, t)]
		},
		requirementType: "string",
		priority: 2
	};
	var p = function(e, t) {
			this.__class__ = "ValidatorRegistry", this.locale = "en", this.init(e || {}, t || {})
		},
		c = {
			email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
			number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
			integer: /^-?\d+$/,
			digits: /^\d+$/,
			alphanum: /^\w+$/i,
			date: {
				test: function(e) {
					return null !== a.parse.date(e)
				}
			},
			url: new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$", "i")
		};
	c.range = c.number;
	var f = function(e) {
			var t = ("" + e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
			return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
		},
		m = function(e, t) {
			return t.map(a.parse[e])
		},
		g = function(e, t) {
			return function(i) {
				for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) r[s - 1] = arguments[s];
				return r.pop(), t.apply(void 0, [i].concat(_toConsumableArray(m(e, r))))
			}
		},
		v = function(e) {
			return {
				validateDate: g("date", e),
				validateNumber: g("number", e),
				requirementType: e.length <= 2 ? "string" : ["string", "string"],
				priority: 30
			}
		};
	p.prototype = {
		init: function(e, t) {
			this.catalog = t, this.validators = _extends({}, this.validators);
			for (var i in e) this.addValidator(i, e[i].fn, e[i].priority);
			window.Parsley.trigger("parsley:validator:init")
		},
		setLocale: function(e) {
			if ("undefined" == typeof this.catalog[e]) throw new Error(e + " is not available in the catalog");
			return this.locale = e, this
		},
		addCatalog: function(e, t, i) {
			return "object" == typeof t && (this.catalog[e] = t), !0 === i ? this.setLocale(e) : this
		},
		addMessage: function(e, t, i) {
			return "undefined" == typeof this.catalog[e] && (this.catalog[e] = {}), this.catalog[e][t] = i, this
		},
		addMessages: function(e, t) {
			for (var i in t) this.addMessage(e, i, t[i]);
			return this
		},
		addValidator: function(e, t, i) {
			if (this.validators[e]) a.warn('Validator "' + e + '" is already defined.');
			else if (o.hasOwnProperty(e)) return void a.warn('"' + e + '" is a restricted keyword and is not a valid validator name.');
			return this._setValidator.apply(this, arguments)
		},
		hasValidator: function(e) {
			return !!this.validators[e]
		},
		updateValidator: function(e, t, i) {
			return this.validators[e] ? this._setValidator.apply(this, arguments) : (a.warn('Validator "' + e + '" is not already defined.'), this.addValidator.apply(this, arguments))
		},
		removeValidator: function(e) {
			return this.validators[e] || a.warn('Validator "' + e + '" is not defined.'), delete this.validators[e], this
		},
		_setValidator: function(e, t, i) {
			"object" != typeof t && (t = {
				fn: t,
				priority: i
			}), t.validate || (t = new h(t)), this.validators[e] = t;
			for (var n in t.messages || {}) this.addMessage(n, e, t.messages[n]);
			return this
		},
		getErrorMessage: function(e) {
			var t;
			if ("type" === e.name) {
				var i = this.catalog[this.locale][e.name] || {};
				t = i[e.requirements]
			} else t = this.formatMessage(this.catalog[this.locale][e.name], e.requirements);
			return t || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage
		},
		formatMessage: function(e, t) {
			if ("object" == typeof t) {
				for (var i in t) e = this.formatMessage(e, t[i]);
				return e
			}
			return "string" == typeof e ? e.replace(/%s/i, t) : ""
		},
		validators: {
			notblank: {
				validateString: function(e) {
					return /\S/.test(e)
				},
				priority: 2
			},
			required: {
				validateMultiple: function(e) {
					return e.length > 0
				},
				validateString: function(e) {
					return /\S/.test(e)
				},
				priority: 512
			},
			type: {
				validateString: function(e, t) {
					var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
						n = i.step,
						r = void 0 === n ? "any" : n,
						s = i.base,
						a = void 0 === s ? 0 : s,
						o = c[t];
					if (!o) throw new Error("validator type `" + t + "` is not supported");
					if (!o.test(e)) return !1;
					if ("number" === t && !/^any$/i.test(r || "")) {
						var l = Number(e),
							u = Math.max(f(r), f(a));
						if (f(l) > u) return !1;
						var d = function(e) {
								return Math.round(e * Math.pow(10, u))
							};
						if ((d(l) - d(a)) % d(r) != 0) return !1
					}
					return !0
				},
				requirementType: {
					"": "string",
					step: "string",
					base: "number"
				},
				priority: 256
			},
			pattern: {
				validateString: function(e, t) {
					return t.test(e)
				},
				requirementType: "regexp",
				priority: 64
			},
			minlength: {
				validateString: function(e, t) {
					return e.length >= t
				},
				requirementType: "integer",
				priority: 30
			},
			maxlength: {
				validateString: function(e, t) {
					return e.length <= t
				},
				requirementType: "integer",
				priority: 30
			},
			length: {
				validateString: function(e, t, i) {
					return e.length >= t && e.length <= i
				},
				requirementType: ["integer", "integer"],
				priority: 30
			},
			mincheck: {
				validateMultiple: function(e, t) {
					return e.length >= t
				},
				requirementType: "integer",
				priority: 30
			},
			maxcheck: {
				validateMultiple: function(e, t) {
					return e.length <= t
				},
				requirementType: "integer",
				priority: 30
			},
			check: {
				validateMultiple: function(e, t, i) {
					return e.length >= t && e.length <= i
				},
				requirementType: ["integer", "integer"],
				priority: 30
			},
			min: v(function(e, t) {
				return e >= t
			}),
			max: v(function(e, t) {
				return e <= t
			}),
			range: v(function(e, t, i) {
				return e >= t && e <= i
			}),
			equalto: {
				validateString: function(t, i) {
					var n = e(i);
					return n.length ? t === n.val() : t === i
				},
				priority: 256
			}
		}
	};
	var y = {},
		_ = function k(e, t, i) {
			for (var n = [], r = [], s = 0; s < e.length; s++) {
				for (var a = !1, o = 0; o < t.length; o++) if (e[s].assert.name === t[o].assert.name) {
					a = !0;
					break
				}
				a ? r.push(e[s]) : n.push(e[s])
			}
			return {
				kept: r,
				added: n,
				removed: i ? [] : k(t, e, !0).added
			}
		};
	y.Form = {
		_actualizeTriggers: function() {
			var e = this;
			this.$element.on("submit.Parsley", function(t) {
				e.onSubmitValidate(t)
			}), this.$element.on("click.Parsley", a._SubmitSelector, function(t) {
				e.onSubmitButton(t)
			}), !1 !== this.options.uiEnabled && this.element.setAttribute("novalidate", "")
		},
		focus: function() {
			if (this._focusedField = null, !0 === this.validationResult || "none" === this.options.focus) return null;
			for (var e = 0; e < this.fields.length; e++) {
				var t = this.fields[e];
				if (!0 !== t.validationResult && t.validationResult.length > 0 && "undefined" == typeof t.options.noFocus && (this._focusedField = t.$element, "first" === this.options.focus)) break
			}
			return null === this._focusedField ? null : this._focusedField.focus()
		},
		_destroyUI: function() {
			this.$element.off(".Parsley")
		}
	}, y.Field = {
		_reflowUI: function() {
			if (this._buildUI(), this._ui) {
				var e = _(this.validationResult, this._ui.lastValidationResult);
				this._ui.lastValidationResult = this.validationResult, this._manageStatusClass(), this._manageErrorsMessages(e), this._actualizeTriggers(), !e.kept.length && !e.added.length || this._failedOnce || (this._failedOnce = !0, this._actualizeTriggers())
			}
		},
		getErrorsMessages: function() {
			if (!0 === this.validationResult) return [];
			for (var e = [], t = 0; t < this.validationResult.length; t++) e.push(this.validationResult[t].errorMessage || this._getErrorMessage(this.validationResult[t].assert));
			return e
		},
		addError: function(e) {
			var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
				i = t.message,
				n = t.assert,
				r = t.updateClass,
				s = void 0 === r || r;
			this._buildUI(), this._addError(e, {
				message: i,
				assert: n
			}), s && this._errorClass()
		},
		updateError: function(e) {
			var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
				i = t.message,
				n = t.assert,
				r = t.updateClass,
				s = void 0 === r || r;
			this._buildUI(), this._updateError(e, {
				message: i,
				assert: n
			}), s && this._errorClass()
		},
		removeError: function(e) {
			var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
				i = t.updateClass,
				n = void 0 === i || i;
			this._buildUI(), this._removeError(e), n && this._manageStatusClass()
		},
		_manageStatusClass: function() {
			this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : this.validationResult.length > 0 ? this._errorClass() : this._resetClass()
		},
		_manageErrorsMessages: function(t) {
			if ("undefined" == typeof this.options.errorsMessagesDisabled) {
				if ("undefined" != typeof this.options.errorMessage) return t.added.length || t.kept.length ? (this._insertErrorWrapper(), 0 === this._ui.$errorsWrapper.find(".parsley-custom-error-message").length && this._ui.$errorsWrapper.append(e(this.options.errorTemplate).addClass("parsley-custom-error-message")), this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)) : this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
				for (var i = 0; i < t.removed.length; i++) this._removeError(t.removed[i].assert.name);
				for (i = 0; i < t.added.length; i++) this._addError(t.added[i].assert.name, {
					message: t.added[i].errorMessage,
					assert: t.added[i].assert
				});
				for (i = 0; i < t.kept.length; i++) this._updateError(t.kept[i].assert.name, {
					message: t.kept[i].errorMessage,
					assert: t.kept[i].assert
				})
			}
		},
		_addError: function(t, i) {
			var n = i.message,
				r = i.assert;
			this._insertErrorWrapper(), this._ui.$errorsWrapper.addClass("filled").append(e(this.options.errorTemplate).addClass("parsley-" + t).html(n || this._getErrorMessage(r)))
		},
		_updateError: function(e, t) {
			var i = t.message,
				n = t.assert;
			this._ui.$errorsWrapper.addClass("filled").find(".parsley-" + e).html(i || this._getErrorMessage(n))
		},
		_removeError: function(e) {
			this._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + e).remove()
		},
		_getErrorMessage: function(e) {
			var t = e.name + "Message";
			return "undefined" != typeof this.options[t] ? window.Parsley.formatMessage(this.options[t], e.requirements) : window.Parsley.getErrorMessage(e)
		},
		_buildUI: function() {
			if (!this._ui && !1 !== this.options.uiEnabled) {
				var t = {};
				this.element.setAttribute(this.options.namespace + "id", this.__id__), t.$errorClassHandler = this._manageClassHandler(), t.errorsWrapperId = "parsley-id-" + (this.options.multiple ? "multiple-" + this.options.multiple : this.__id__), t.$errorsWrapper = e(this.options.errorsWrapper).attr("id", t.errorsWrapperId), t.lastValidationResult = [], t.validationInformationVisible = !1, this._ui = t
			}
		},
		_manageClassHandler: function() {
			if ("string" == typeof this.options.classHandler && e(this.options.classHandler).length) return e(this.options.classHandler);
			var t = this.options.classHandler;
			if ("string" == typeof this.options.classHandler && "function" == typeof window[this.options.classHandler] && (t = window[this.options.classHandler]), "function" == typeof t) {
				var i = t.call(this, this);
				if ("undefined" != typeof i && i.length) return i
			} else {
				if ("object" == typeof t && t instanceof jQuery && t.length) return t;
				t && a.warn("The class handler `" + t + "` does not exist in DOM nor as a global JS function")
			}
			return this._inputHolder()
		},
		_inputHolder: function() {
			return this.options.multiple && "SELECT" !== this.element.nodeName ? this.$element.parent() : this.$element
		},
		_insertErrorWrapper: function() {
			var t = this.options.errorsContainer;
			if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();
			if ("string" == typeof t) {
				if (e(t).length) return e(t).append(this._ui.$errorsWrapper);
				"function" == typeof window[t] ? t = window[t] : a.warn("The errors container `" + t + "` does not exist in DOM nor as a global JS function")
			}
			return "function" == typeof t && (t = t.call(this, this)), "object" == typeof t && t.length ? t.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper)
		},
		_actualizeTriggers: function() {
			var e, t = this,
				i = this._findRelated();
			i.off(".Parsley"), this._failedOnce ? i.on(a.namespaceEvents(this.options.triggerAfterFailure, "Parsley"), function() {
				t._validateIfNeeded()
			}) : (e = a.namespaceEvents(this.options.trigger, "Parsley")) && i.on(e, function(e) {
				t._validateIfNeeded(e)
			})
		},
		_validateIfNeeded: function(e) {
			var t = this;
			e && /key|input/.test(e.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced), this._debounced = window.setTimeout(function() {
				return t.validate()
			}, this.options.debounce)) : this.validate())
		},
		_resetUI: function() {
			this._failedOnce = !1, this._actualizeTriggers(), "undefined" != typeof this._ui && (this._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(), this._ui.lastValidationResult = [], this._ui.validationInformationVisible = !1)
		},
		_destroyUI: function() {
			this._resetUI(), "undefined" != typeof this._ui && this._ui.$errorsWrapper.remove(), delete this._ui
		},
		_successClass: function() {
			this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)
		},
		_errorClass: function() {
			this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)
		},
		_resetClass: function() {
			this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)
		}
	};
	var w = function(t, i, n) {
			this.__class__ = "Form", this.element = t, this.$element = e(t), this.domOptions = i, this.options = n, this.parent = window.Parsley, this.fields = [], this.validationResult = null
		},
		b = {
			pending: null,
			resolved: !0,
			rejected: !1
		};
	w.prototype = {
		onSubmitValidate: function(e) {
			var t = this;
			if (!0 !== e.parsley) {
				var i = this._submitSource || this.$element.find(a._SubmitSelector)[0];
				if (this._submitSource = null, this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !0), !i || null === i.getAttribute("formnovalidate")) {
					window.Parsley._remoteCache = {};
					var n = this.whenValidate({
						event: e
					});
					"resolved" === n.state() && !1 !== this._trigger("submit") || (e.stopImmediatePropagation(), e.preventDefault(), "pending" === n.state() && n.done(function() {
						t._submit(i)
					}))
				}
			}
		},
		onSubmitButton: function(e) {
			this._submitSource = e.currentTarget
		},
		_submit: function(t) {
			if (!1 !== this._trigger("submit")) {
				if (t) {
					var i = this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !1);
					0 === i.length && (i = e('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)), i.attr({
						name: t.getAttribute("name"),
						value: t.getAttribute("value")
					})
				}
				this.$element.trigger(_extends(e.Event("submit"), {
					parsley: !0
				}))
			}
		},
		validate: function(t) {
			if (arguments.length >= 1 && !e.isPlainObject(t)) {
				a.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");
				var i = _slice.call(arguments),
					n = i[0],
					r = i[1],
					s = i[2];
				t = {
					group: n,
					force: r,
					event: s
				}
			}
			return b[this.whenValidate(t).state()]
		},
		whenValidate: function() {
			var t, i = this,
				n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
				r = n.group,
				s = n.force,
				o = n.event;
			this.submitEvent = o, o && (this.submitEvent = _extends({}, o, {
				preventDefault: function() {
					a.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"), i.validationResult = !1
				}
			})), this.validationResult = !0, this._trigger("validate"), this._refreshFields();
			var l = this._withoutReactualizingFormOptions(function() {
				return e.map(i.fields, function(e) {
					return e.whenValidate({
						force: s,
						group: r
					})
				})
			});
			return (t = a.all(l).done(function() {
				i._trigger("success")
			}).fail(function() {
				i.validationResult = !1, i.focus(), i._trigger("error")
			}).always(function() {
				i._trigger("validated")
			})).pipe.apply(t, _toConsumableArray(this._pipeAccordingToValidationResult()))
		},
		isValid: function(t) {
			if (arguments.length >= 1 && !e.isPlainObject(t)) {
				a.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");
				var i = _slice.call(arguments),
					n = i[0],
					r = i[1];
				t = {
					group: n,
					force: r
				}
			}
			return b[this.whenValid(t).state()]
		},
		whenValid: function() {
			var t = this,
				i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
				n = i.group,
				r = i.force;
			this._refreshFields();
			var s = this._withoutReactualizingFormOptions(function() {
				return e.map(t.fields, function(e) {
					return e.whenValid({
						group: n,
						force: r
					})
				})
			});
			return a.all(s)
		},
		refresh: function() {
			return this._refreshFields(), this
		},
		reset: function() {
			for (var e = 0; e < this.fields.length; e++) this.fields[e].reset();
			this._trigger("reset")
		},
		destroy: function() {
			this._destroyUI();
			for (var e = 0; e < this.fields.length; e++) this.fields[e].destroy();
			this.$element.removeData("Parsley"), this._trigger("destroy")
		},
		_refreshFields: function() {
			return this.actualizeOptions()._bindFields()
		},
		_bindFields: function() {
			var t = this,
				i = this.fields;
			return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions(function() {
				t.$element.find(t.options.inputs).not(t.options.excluded).each(function(e, i) {
					var n = new window.Parsley.Factory(i, {}, t);
					if (("Field" === n.__class__ || "FieldMultiple" === n.__class__) && !0 !== n.options.excluded) {
						var r = n.__class__ + "-" + n.__id__;
						"undefined" == typeof t.fieldsMappedById[r] && (t.fieldsMappedById[r] = n, t.fields.push(n))
					}
				}), e.each(a.difference(i, t.fields), function(e, t) {
					t.reset()
				})
			}), this
		},
		_withoutReactualizingFormOptions: function(e) {
			var t = this.actualizeOptions;
			this.actualizeOptions = function() {
				return this
			};
			var i = e();
			return this.actualizeOptions = t, i
		},
		_trigger: function(e) {
			return this.trigger("form:" + e)
		}
	};
	var F = function(e, t, i, n, r) {
			var s = window.Parsley._validatorRegistry.validators[t],
				a = new h(s);
			n = n || e.options[t + "Priority"] || a.priority, r = !0 === r, _extends(this, {
				validator: a,
				name: t,
				requirements: i,
				priority: n,
				isDomConstraint: r
			}), this._parseRequirements(e.options)
		},
		C = function(e) {
			var t = e[0].toUpperCase();
			return t + e.slice(1)
		};
	F.prototype = {
		validate: function(e, t) {
			var i;
			return (i = this.validator).validate.apply(i, [e].concat(_toConsumableArray(this.requirementList), [t]))
		},
		_parseRequirements: function(e) {
			var t = this;
			this.requirementList = this.validator.parseRequirements(this.requirements, function(i) {
				return e[t.name + C(i)]
			})
		}
	};
	var E = function(t, i, n, r) {
			this.__class__ = "Field", this.element = t, this.$element = e(t), "undefined" != typeof r && (this.parent = r), this.options = n, this.domOptions = i, this.constraints = [], this.constraintsByName = {}, this.validationResult = !0, this._bindConstraints()
		},
		A = {
			pending: null,
			resolved: !0,
			rejected: !1
		};
	E.prototype = {
		validate: function(t) {
			arguments.length >= 1 && !e.isPlainObject(t) && (a.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."), t = {
				options: t
			});
			var i = this.whenValidate(t);
			if (!i) return !0;
			switch (i.state()) {
			case "pending":
				return null;
			case "resolved":
				return !0;
			case "rejected":
				return this.validationResult
			}
		},
		whenValidate: function() {
			var e, t = this,
				i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
				n = i.force,
				r = i.group;
			if (this.refresh(), !r || this._isInGroup(r)) return this.value = this.getValue(), this._trigger("validate"), (e = this.whenValid({
				force: n,
				value: this.value,
				_refreshed: !0
			}).always(function() {
				t._reflowUI()
			}).done(function() {
				t._trigger("success")
			}).fail(function() {
				t._trigger("error")
			}).always(function() {
				t._trigger("validated")
			})).pipe.apply(e, _toConsumableArray(this._pipeAccordingToValidationResult()))
		},
		hasConstraints: function() {
			return 0 !== this.constraints.length
		},
		needsValidation: function(e) {
			return "undefined" == typeof e && (e = this.getValue()), !(!e.length && !this._isRequired() && "undefined" == typeof this.options.validateIfEmpty)
		},
		_isInGroup: function(t) {
			return Array.isArray(this.options.group) ? -1 !== e.inArray(t, this.options.group) : this.options.group === t
		},
		isValid: function(t) {
			if (arguments.length >= 1 && !e.isPlainObject(t)) {
				a.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");
				var i = _slice.call(arguments),
					n = i[0],
					r = i[1];
				t = {
					force: n,
					value: r
				}
			}
			var s = this.whenValid(t);
			return !s || A[s.state()]
		},
		whenValid: function() {
			var t = this,
				i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
				n = i.force,
				r = void 0 !== n && n,
				s = i.value,
				o = i.group,
				l = i._refreshed;
			if (l || this.refresh(), !o || this._isInGroup(o)) {
				if (this.validationResult = !0, !this.hasConstraints()) return e.when();
				if ("undefined" != typeof s && null !== s || (s = this.getValue()), !this.needsValidation(s) && !0 !== r) return e.when();
				var u = this._getGroupedConstraints(),
					d = [];
				return e.each(u, function(i, n) {
					var r = a.all(e.map(n, function(e) {
						return t._validateConstraint(s, e)
					}));
					if (d.push(r), "rejected" === r.state()) return !1
				}), a.all(d)
			}
		},
		_validateConstraint: function(t, i) {
			var n = this,
				r = i.validate(t, this);
			return !1 === r && (r = e.Deferred().reject()), a.all([r]).fail(function(e) {
				n.validationResult instanceof Array || (n.validationResult = []), n.validationResult.push({
					assert: i,
					errorMessage: "string" == typeof e && e
				})
			})
		},
		getValue: function() {
			var e;
			return e = "function" == typeof this.options.value ? this.options.value(this) : "undefined" != typeof this.options.value ? this.options.value : this.$element.val(), "undefined" == typeof e || null === e ? "" : this._handleWhitespace(e)
		},
		reset: function() {
			return this._resetUI(), this._trigger("reset")
		},
		destroy: function() {
			this._destroyUI(), this.$element.removeData("Parsley"), this.$element.removeData("FieldMultiple"), this._trigger("destroy")
		},
		refresh: function() {
			return this._refreshConstraints(), this
		},
		_refreshConstraints: function() {
			return this.actualizeOptions()._bindConstraints()
		},
		refreshConstraints: function() {
			return a.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"), this.refresh()
		},
		addConstraint: function(e, t, i, n) {
			if (window.Parsley._validatorRegistry.validators[e]) {
				var r = new F(this, e, t, i, n);
				"undefined" !== this.constraintsByName[r.name] && this.removeConstraint(r.name), this.constraints.push(r), this.constraintsByName[r.name] = r
			}
			return this
		},
		removeConstraint: function(e) {
			for (var t = 0; t < this.constraints.length; t++) if (e === this.constraints[t].name) {
				this.constraints.splice(t, 1);
				break
			}
			return delete this.constraintsByName[e], this
		},
		updateConstraint: function(e, t, i) {
			return this.removeConstraint(e).addConstraint(e, t, i)
		},
		_bindConstraints: function() {
			for (var e = [], t = {}, i = 0; i < this.constraints.length; i++)!1 === this.constraints[i].isDomConstraint && (e.push(this.constraints[i]), t[this.constraints[i].name] = this.constraints[i]);
			this.constraints = e, this.constraintsByName = t;
			for (var n in this.options) this.addConstraint(n, this.options[n], void 0, !0);
			return this._bindHtml5Constraints()
		},
		_bindHtml5Constraints: function() {
			null !== this.element.getAttribute("required") && this.addConstraint("required", !0, void 0, !0), null !== this.element.getAttribute("pattern") && this.addConstraint("pattern", this.element.getAttribute("pattern"), void 0, !0);
			var e = this.element.getAttribute("min"),
				t = this.element.getAttribute("max");
			null !== e && null !== t ? this.addConstraint("range", [e, t], void 0, !0) : null !== e ? this.addConstraint("min", e, void 0, !0) : null !== t && this.addConstraint("max", t, void 0, !0), null !== this.element.getAttribute("minlength") && null !== this.element.getAttribute("maxlength") ? this.addConstraint("length", [this.element.getAttribute("minlength"), this.element.getAttribute("maxlength")], void 0, !0) : null !== this.element.getAttribute("minlength") ? this.addConstraint("minlength", this.element.getAttribute("minlength"), void 0, !0) : null !== this.element.getAttribute("maxlength") && this.addConstraint("maxlength", this.element.getAttribute("maxlength"), void 0, !0);
			var i = a.getType(this.element);
			return "number" === i ? this.addConstraint("type", ["number",
			{
				step: this.element.getAttribute("step") || "1",
				base: e || this.element.getAttribute("value")
			}], void 0, !0) : /^(email|url|range|date)$/i.test(i) ? this.addConstraint("type", i, void 0, !0) : this
		},
		_isRequired: function() {
			return "undefined" != typeof this.constraintsByName.required && !1 !== this.constraintsByName.required.requirements
		},
		_trigger: function(e) {
			return this.trigger("field:" + e)
		},
		_handleWhitespace: function(e) {
			return !0 === this.options.trimValue && a.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), "squish" === this.options.whitespace && (e = e.replace(/\s{2,}/g, " ")), "trim" !== this.options.whitespace && "squish" !== this.options.whitespace && !0 !== this.options.trimValue || (e = a.trimString(e)), e
		},
		_isDateInput: function() {
			var e = this.constraintsByName.type;
			return e && "date" === e.requirements
		},
		_getGroupedConstraints: function() {
			if (!1 === this.options.priorityEnabled) return [this.constraints];
			for (var e = [], t = {}, i = 0; i < this.constraints.length; i++) {
				var n = this.constraints[i].priority;
				t[n] || e.push(t[n] = []), t[n].push(this.constraints[i])
			}
			return e.sort(function(e, t) {
				return t[0].priority - e[0].priority
			}), e
		}
	};
	var x = E,
		$ = function() {
			this.__class__ = "FieldMultiple"
		};
	$.prototype = {
		addElement: function(e) {
			return this.$elements.push(e), this
		},
		_refreshConstraints: function() {
			var t;
			if (this.constraints = [], "SELECT" === this.element.nodeName) return this.actualizeOptions()._bindConstraints(), this;
			for (var i = 0; i < this.$elements.length; i++) if (e("html").has(this.$elements[i]).length) {
				t = this.$elements[i].data("FieldMultiple")._refreshConstraints().constraints;
				for (var n = 0; n < t.length; n++) this.addConstraint(t[n].name, t[n].requirements, t[n].priority, t[n].isDomConstraint)
			} else this.$elements.splice(i, 1);
			return this
		},
		getValue: function() {
			if ("function" == typeof this.options.value) return this.options.value(this);
			if ("undefined" != typeof this.options.value) return this.options.value;
			if ("INPUT" === this.element.nodeName) {
				var t = a.getType(this.element);
				if ("radio" === t) return this._findRelated().filter(":checked").val() || "";
				if ("checkbox" === t) {
					var i = [];
					return this._findRelated().filter(":checked").each(function() {
						i.push(e(this).val())
					}), i
				}
			}
			return "SELECT" === this.element.nodeName && null === this.$element.val() ? [] : this.$element.val();
		},
		_init: function() {
			return this.$elements = [this.$element], this
		}
	};
	var P = function(t, i, n) {
			this.element = t, this.$element = e(t);
			var r = this.$element.data("Parsley");
			if (r) return "undefined" != typeof n && r.parent === window.Parsley && (r.parent = n, r._resetOptions(r.options)), "object" == typeof i && _extends(r.options, i), r;
			if (!this.$element.length) throw new Error("You must bind Parsley on an existing element.");
			if ("undefined" != typeof n && "Form" !== n.__class__) throw new Error("Parent instance must be a Form instance");
			return this.parent = n || window.Parsley, this.init(i)
		};
	P.prototype = {
		init: function(e) {
			return this.__class__ = "Parsley", this.__version__ = "2.8.0", this.__id__ = a.generateID(), this._resetOptions(e), "FORM" === this.element.nodeName || a.checkAttr(this.element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField")
		},
		isMultiple: function() {
			var e = a.getType(this.element);
			return "radio" === e || "checkbox" === e || "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")
		},
		handleMultiple: function() {
			var t, i, n = this;
			if (this.options.multiple = this.options.multiple || (t = this.element.getAttribute("name")) || this.element.getAttribute("id"), "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")) return this.options.multiple = this.options.multiple || this.__id__, this.bind("parsleyFieldMultiple");
			if (!this.options.multiple) return a.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;
			this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), t && e('input[name="' + t + '"]').each(function(e, t) {
				var i = a.getType(t);
				"radio" !== i && "checkbox" !== i || t.setAttribute(n.options.namespace + "multiple", n.options.multiple)
			});
			for (var r = this._findRelated(), s = 0; s < r.length; s++) if (i = e(r.get(s)).data("Parsley"), "undefined" != typeof i) {
				this.$element.data("FieldMultiple") || i.addElement(this.$element);
				break
			}
			return this.bind("parsleyField", !0), i || this.bind("parsleyFieldMultiple")
		},
		bind: function(t, i) {
			var n;
			switch (t) {
			case "parsleyForm":
				n = e.extend(new w(this.element, this.domOptions, this.options), new l, window.ParsleyExtend)._bindFields();
				break;
			case "parsleyField":
				n = e.extend(new x(this.element, this.domOptions, this.options, this.parent), new l, window.ParsleyExtend);
				break;
			case "parsleyFieldMultiple":
				n = e.extend(new x(this.element, this.domOptions, this.options, this.parent), new $, new l, window.ParsleyExtend)._init();
				break;
			default:
				throw new Error(t + "is not a supported Parsley type")
			}
			return this.options.multiple && a.setAttr(this.element, this.options.namespace, "multiple", this.options.multiple), "undefined" != typeof i ? (this.$element.data("FieldMultiple", n), n) : (this.$element.data("Parsley", n), n._actualizeTriggers(), n._trigger("init"), n)
		}
	};
	var V = e.fn.jquery.split(".");
	if (parseInt(V[0]) <= 1 && parseInt(V[1]) < 8) throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
	V.forEach || a.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");
	var T = _extends(new l, {
		element: document,
		$element: e(document),
		actualizeOptions: null,
		_resetOptions: null,
		Factory: P,
		version: "2.8.0"
	});
	_extends(x.prototype, y.Field, l.prototype), _extends(w.prototype, y.Form, l.prototype), _extends(P.prototype, l.prototype), e.fn.parsley = e.fn.psly = function(t) {
		if (this.length > 1) {
			var i = [];
			return this.each(function() {
				i.push(e(this).parsley(t))
			}), i
		}
		if (0 != this.length) return new P(this[0], t)
	}, "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}), T.options = _extends(a.objectCreate(o), window.ParsleyConfig), window.ParsleyConfig = T.options, window.Parsley = window.psly = T, T.Utils = a, window.ParsleyUtils = {}, e.each(a, function(e, t) {
		"function" == typeof t && (window.ParsleyUtils[e] = function() {
			return a.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."), a[e].apply(a, arguments)
		})
	});
	var O = window.Parsley._validatorRegistry = new p(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
	window.ParsleyValidator = {}, e.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "), function(e, t) {
		window.Parsley[t] = function() {
			return O[t].apply(O, arguments)
		}, window.ParsleyValidator[t] = function() {
			var e;
			return a.warnOnce("Accessing the method '" + t + "' through Validator is deprecated. Simply call 'window.Parsley." + t + "(...)'"), (e = window.Parsley)[t].apply(e, arguments)
		}
	}), window.Parsley.UI = y, window.ParsleyUI = {
		removeError: function(e, t, i) {
			var n = !0 !== i;
			return a.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."), e.removeError(t, {
				updateClass: n
			})
		},
		getErrorsMessages: function(e) {
			return a.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."), e.getErrorsMessages()
		}
	}, e.each("addError updateError".split(" "), function(e, t) {
		window.ParsleyUI[t] = function(e, i, n, r, s) {
			var o = !0 !== s;
			return a.warnOnce("Accessing UI is deprecated. Call '" + t + "' on the instance directly. Please comment in issue 1073 as to your need to call this method."), e[t](i, {
				message: n,
				assert: r,
				updateClass: o
			})
		}
	}), !1 !== window.ParsleyConfig.autoBind && e(function() {
		e("[data-parsley-validate]").length && e("[data-parsley-validate]").parsley()
	});
	var M = e({}),
		R = function() {
			a.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")
		},
		D = "parsley:";
	e.listen = function(e, n) {
		var r;
		if (R(), "object" == typeof arguments[1] && "function" == typeof arguments[2] && (r = arguments[1], n = arguments[2]), "function" != typeof n) throw new Error("Wrong parameters");
		window.Parsley.on(i(e), t(n, r))
	}, e.listenTo = function(e, n, r) {
		if (R(), !(e instanceof x || e instanceof w)) throw new Error("Must give Parsley instance");
		if ("string" != typeof n || "function" != typeof r) throw new Error("Wrong parameters");
		e.on(i(n), t(r))
	}, e.unsubscribe = function(e, t) {
		if (R(), "string" != typeof e || "function" != typeof t) throw new Error("Wrong arguments");
		window.Parsley.off(i(e), t.parsleyAdaptedCallback)
	}, e.unsubscribeTo = function(e, t) {
		if (R(), !(e instanceof x || e instanceof w)) throw new Error("Must give Parsley instance");
		e.off(i(t))
	}, e.unsubscribeAll = function(t) {
		R(), window.Parsley.off(i(t)), e("form,input,textarea,select").each(function() {
			var n = e(this).data("Parsley");
			n && n.off(i(t))
		})
	}, e.emit = function(e, t) {
		var n;
		R();
		var r = t instanceof x || t instanceof w,
			s = Array.prototype.slice.call(arguments, r ? 2 : 1);
		s.unshift(i(e)), r || (t = window.Parsley), (n = t).trigger.apply(n, _toConsumableArray(s))
	};
	e.extend(!0, T, {
		asyncValidators: {
			"default": {
				fn: function(e) {
					return e.status >= 200 && e.status < 300
				},
				url: !1
			},
			reverse: {
				fn: function(e) {
					return e.status < 200 || e.status >= 300
				},
				url: !1
			}
		},
		addAsyncValidator: function(e, t, i, n) {
			return T.asyncValidators[e] = {
				fn: t,
				url: i || !1,
				options: n || {}
			}, this
		}
	}), T.addValidator("remote", {
		requirementType: {
			"": "string",
			validator: "string",
			reverse: "boolean",
			options: "object"
		},
		validateString: function(t, i, n, r) {
			var s, a, o = {},
				l = n.validator || (!0 === n.reverse ? "reverse" : "default");
			if ("undefined" == typeof T.asyncValidators[l]) throw new Error("Calling an undefined async validator: `" + l + "`");
			i = T.asyncValidators[l].url || i, i.indexOf("{value}") > -1 ? i = i.replace("{value}", encodeURIComponent(t)) : o[r.element.getAttribute("name") || r.element.getAttribute("id")] = t;
			var u = e.extend(!0, n.options || {}, T.asyncValidators[l].options);
			s = e.extend(!0, {}, {
				url: i,
				data: o,
				type: "GET"
			}, u), r.trigger("field:ajaxoptions", r, s), a = e.param(s), "undefined" == typeof T._remoteCache && (T._remoteCache = {});
			var d = T._remoteCache[a] = T._remoteCache[a] || e.ajax(s),
				h = function() {
					var t = T.asyncValidators[l].fn.call(r, d, i, n);
					return t || (t = e.Deferred().reject()), e.when(t)
				};
			return d.then(h, h)
		},
		priority: -1
	}), T.on("form:submit", function() {
		T._remoteCache = {}
	}), l.prototype.addAsyncValidator = function() {
		return a.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"), T.addAsyncValidator.apply(T, arguments)
	}, T.addMessages("en", {
		defaultMessage: "This value seems to be invalid.",
		type: {
			email: "This value should be a valid email.",
			url: "This value should be a valid url.",
			number: "This value should be a valid number.",
			integer: "This value should be a valid integer.",
			digits: "This value should be digits.",
			alphanum: "This value should be alphanumeric."
		},
		notblank: "This value should not be blank.",
		required: "This value is required.",
		pattern: "This value seems to be invalid.",
		min: "This value should be greater than or equal to %s.",
		max: "This value should be lower than or equal to %s.",
		range: "This value should be between %s and %s.",
		minlength: "This value is too short. It should have %s characters or more.",
		maxlength: "This value is too long. It should have %s characters or fewer.",
		length: "This value length is invalid. It should be between %s and %s characters long.",
		mincheck: "You must select at least %s choices.",
		maxcheck: "You must select %s choices or fewer.",
		check: "You must select between %s and %s choices.",
		equalto: "This value should be the same."
	}), T.setLocale("en");
	var I = new n;
	I.install();
	var q = T;
	return q
});
//# sourceMappingURL=parsley.min.js.map


//jquery.usp.core.js

/* 
	User Submitted Posts : Core JS : Version 2.0
	@ https://perishablepress.com/user-submitted-posts/
*/
jQuery(document).ready(function($) {

	$('.usp-callout-failure').addClass('usp-hidden').hide();
	$('#user-submitted-post').on('click', function(e) {
		if (usp_recaptcha_disp == 'show' && usp_recaptcha_vers == 3) {
			var validate = usp_validate();
			e.preventDefault();
			grecaptcha.ready(function() {
				grecaptcha.execute(usp_recaptcha_key, {
					action: 'submit'
				}).then(function(token) {
					$('#recaptcha_response').remove();
					$('#usp-submit').prepend('<input type="hidden" name="recaptcha_response" id="recaptcha_response" value="' + token + '">');
					if (validate) $('#usp_form').unbind('submit').submit();
				});;
			});
		} else {
			usp_validate();
		}
	});

	function usp_validate() {
		// $('#usp_form').parsley().validate();
		if (true === $('#usp_form').parsley().isValid()) {
			$('.usp-callout-failure').addClass('usp-hidden').hide();

			// remove empty file inputs
			$('.usp-clone').each(function() {
				var opt = $(this).data('parsley-excluded');
				if (typeof opt !== 'undefined' && opt == true) {
					var val = $(this).val();
					if (!val.trim()) $(this).remove();
				}
			});
			return true;
		} else {
			$('.usp-callout-failure').removeClass('usp-hidden').show();
			return false;
		}
	};
	$('#usp_form').submit(function(e) {
		usp_captcha_check(e);
		if ($(this).parsley().isValid()) {
			$('.usp-submit').css('cursor', 'wait');
			$('.usp-submit').attr('disabled', true);
		}
		usp_remember();
	});
	$('.usp-captcha .usp-input').change(function(e) {
		usp_captcha_check(e);
	});

	function usp_captcha_check(e) {
		if (usp_case_sensitivity === 'true') var usp_casing = '';
		else var usp_casing = 'i';
		var usp_response = new RegExp(usp_challenge_response + '$', usp_casing);
		var usp_captcha = $('.user-submitted-captcha').val();
		if (typeof usp_captcha != 'undefined') {
			if (usp_captcha.match(usp_response)) {
				$('.usp-captcha-error').remove();
				$('.usp-captcha .usp-input').removeClass('parsley-error');
				$('.usp-captcha .usp-input').addClass('parsley-success');
			} else {
				if (e) e.preventDefault();
				$('.usp-captcha-error').remove();
				$('.usp-captcha').append('<ul class="usp-captcha-error parsley-errors-list filled"><li class="parsley-required">' + usp_parsley_error + '</li></ul>');
				$('.usp-captcha .usp-input').removeClass('parsley-success');
				$('.usp-captcha .usp-input').addClass('parsley-error');
			}
		}
	}

	// cookies
	usp_remember();
	usp_forget();

	function usp_cookie(selector, type) {
		$(selector).each(function() {
			var name = $(this).attr('id');
			var cookie = Cookies.get(name);
			if (cookie) {
				cookie = decodeURIComponent(cookie);
				if (type == 'checkbox') {
					if (cookie == 1) {
						$(this).val(1).prop('checked', 1);
					} else {
						$(this).val(0).prop('checked', 0);
					}
				} else if (type == 'select') {
					if (name == 'user-submitted-tags' && window.usp_existing_tags == 1) {
						$.each(cookie.split(','), function(i, e) {
							$('#user-submitted-tags option[value="' + e + '"]').attr('selected', 'selected');
						});
					} else if (name == 'user-submitted-category' && window.usp_multiple_cats == 1) {
						$.each(cookie.split(','), function(i, e) {
							$('#user-submitted-category option[value="' + e + '"]').attr('selected', 'selected');
						});
					} else {
						$('option[value="' + cookie + '"]', this).attr('selected', 'selected');
					}
				} else {
					$(this).val(cookie);
				}
			}
			$(this).on('change', function() {
				if (type == 'checkbox') {

					if ($(this).is(':checked')) {
						var value = 1;
						$(this).val(1).prop('checked', 1);
					} else {
						var value = 0;
						$(this).val(0).prop('checked', 0);
					}
				} else {
					var value = $(this).val();
				}
				Cookies.set(name, encodeURIComponent(value), {
					path: '/',
					expires: 365000,
					sameSite: 'strict'
				});
			});
		});
	}

	function usp_remember() {
		usp_cookie('#user-submitted-name', 'text');
		usp_cookie('#user-submitted-email', 'text');
		usp_cookie('#user-submitted-url', 'text');
		usp_cookie('#user-submitted-title', 'text');

		if (window.usp_existing_tags == 1) {
			usp_cookie('#user-submitted-tags', 'select');
		} else {
			usp_cookie('#user-submitted-tags', 'text');
		}
		usp_cookie('#user-submitted-custom', 'text');
		usp_cookie('#user-submitted-captcha', 'text');
		usp_cookie('#user-submitted-category', 'select');
		usp_cookie('#user-submitted-content', 'textarea');
		usp_cookie('#user-submitted-checkbox', 'checkbox');
	}

	function usp_forget() {

		if (window.location.href.indexOf('success=') > -1) {

			Cookies.remove('user-submitted-name');
			Cookies.remove('user-submitted-email');
			Cookies.remove('user-submitted-url');
			Cookies.remove('user-submitted-title');
			Cookies.remove('user-submitted-tags');
			Cookies.remove('user-submitted-category');
			Cookies.remove('user-submitted-content');
			Cookies.remove('user-submitted-custom');
			Cookies.remove('user-submitted-checkbox');
			Cookies.remove('user-submitted-captcha');
			$('#usp_form').find('input[type="text"], textarea').val('');
			$('#usp_form option[value=""]').attr('selected', '');
		}
	}

	// add another image
	$('#usp_add-another').removeClass('usp-no-js');
	$('#usp_add-another').addClass('usp-js');

	usp_add_another();

	function usp_add_another() {
		var x = parseInt($('#usp-min-images').val());
		var y = parseInt($('#usp-max-images').val());
		if (x === 0) x = 1;
		if (x >= y) $('#usp_add-another').hide();
		$('#usp_add-another').click(function(e) {
			e.preventDefault();
			x++;
			var link = $(this);
			var clone = $('#user-submitted-image').find('input:visible:last').clone().val('').attr('style', 'display:block;');
			var prev = '<img class="usp-file-preview" src="" alt="" style="display:none;">';
			$('#usp-min-images').val(x);
			if (x < y) {
				link.before(clone.fadeIn(300));
				link.before(prev);
			} else if (x = y) {
				link.before(clone.fadeIn(300));
				link.before(prev);
				link.hide();
			} else {
				link.hide();
			}
			clone.attr('data-parsley-excluded', 'true');
		});
	}

	// file preview
	$('.usp-input[type=file]').after('<img class="usp-file-preview" src="" alt="" style="display:none;">');
	$(document).on('change', '.usp-input[type=file]', function(x) {
		var f = x.target.files[0];
		var disable = (typeof window.usp_disable_previews !== 'undefined') ? window.usp_disable_previews : false;
		if (f && !disable) {
			var r = new FileReader();
			var prev = $(this).nextAll('.usp-file-preview:first');
			r.onload = function(e) {
				prev.attr('src', r.result);
				prev.css({
					'display': 'block',
					'height': '180px',
					'width': 'auto',
					'margin': '10px 0',
					'border': '0'
				});
			};
			r.readAsDataURL(f);
		}
	});

	// chosen
	var disable_chosen = (typeof window.usp_disable_chosen !== 'undefined') ? window.usp_disable_chosen : false;

	if (window.usp_multiple_cats == 1 && !disable_chosen) $('#user-submitted-category').chosen();
	if (window.usp_existing_tags == 1 && !disable_chosen) $('#user-submitted-tags').chosen();

});


/*图片压缩*/


//smush-lazy-load.min.js

!
function() {
	var e = {
		90: function(e) {
			!
			function(t, n) {
				var a = function(e, t, n) {
						"use strict";
						var a, i;
						if (function() {
							var t, n = {
								lazyClass: "lazyload",
								loadedClass: "lazyloaded",
								loadingClass: "lazyloading",
								preloadClass: "lazypreload",
								errorClass: "lazyerror",
								autosizesClass: "lazyautosizes",
								fastLoadedClass: "ls-is-cached",
								iframeLoadMode: 0,
								srcAttr: "data-src",
								srcsetAttr: "data-srcset",
								sizesAttr: "data-sizes",
								minSize: 40,
								customMedia: {},
								init: !0,
								expFactor: 1.5,
								hFac: .8,
								loadMode: 2,
								loadHidden: !0,
								ricTimeout: 0,
								throttleDelay: 125
							};
							for (t in i = e.lazySizesConfig || e.lazysizesConfig || {}, n) t in i || (i[t] = n[t])
						}(), !t || !t.getElementsByClassName) return {
							init: function() {},
							cfg: i,
							noSupport: !0
						};
						var r = t.documentElement,
							o = e.HTMLPictureElement,
							s = "addEventListener",
							l = "getAttribute",
							c = e[s].bind(e),
							d = e.setTimeout,
							u = e.requestAnimationFrame || d,
							f = e.requestIdleCallback,
							m = /^picture$/i,
							v = ["load", "error", "lazyincluded", "_lazyloaded"],
							y = {},
							h = Array.prototype.forEach,
							z = function(e, t) {
								return y[t] || (y[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), y[t].test(e[l]("class") || "") && y[t]
							},
							p = function(e, t) {
								z(e, t) || e.setAttribute("class", (e[l]("class") || "").trim() + " " + t)
							},
							g = function(e, t) {
								var n;
								(n = z(e, t)) && e.setAttribute("class", (e[l]("class") || "").replace(n, " "))
							},
							C = function(e, t, n) {
								var a = n ? s : "removeEventListener";
								n && C(e, t), v.forEach((function(n) {
									e[a](n, t)
								}))
							},
							b = function(e, n, i, r, o) {
								var s = t.createEvent("Event");
								return i || (i = {}), i.instance = a, s.initEvent(n, !r, !o), s.detail = i, e.dispatchEvent(s), s
							},
							A = function(t, n) {
								var a;
								!o && (a = e.picturefill || i.pf) ? (n && n.src && !t[l]("srcset") && t.setAttribute("srcset", n.src), a({
									reevaluate: !0,
									elements: [t]
								})) : n && n.src && (t.src = n.src)
							},
							E = function(e, t) {
								return (getComputedStyle(e, null) || {})[t]
							},
							_ = function(e, t, n) {
								for (n = n || e.offsetWidth; n < i.minSize && t && !e._lazysizesWidth;) n = t.offsetWidth, t = t.parentNode;
								return n
							},
							w = (pe = [], ge = [], Ce = pe, be = function() {
								var e = Ce;
								for (Ce = pe.length ? ge : pe, he = !0, ze = !1; e.length;) e.shift()();
								he = !1
							}, Ae = function(e, n) {
								he && !n ? e.apply(this, arguments) : (Ce.push(e), ze || (ze = !0, (t.hidden ? d : u)(be)))
							}, Ae._lsFlush = be, Ae),
							M = function(e, t) {
								return t ?
								function() {
									w(e)
								} : function() {
									var t = this,
										n = arguments;
									w((function() {
										e.apply(t, n)
									}))
								}
							},
							N = function(e) {
								var t, a = 0,
									r = i.throttleDelay,
									o = i.ricTimeout,
									s = function() {
										t = !1, a = n.now(), e()
									},
									l = f && o > 49 ?
								function() {
									f(s, {
										timeout: o
									}), o !== i.ricTimeout && (o = i.ricTimeout)
								} : M((function() {
									d(s)
								}), !0);
								return function(e) {
									var i;
									(e = !0 === e) && (o = 33), t || (t = !0, (i = r - (n.now() - a)) < 0 && (i = 0), e || i < 9 ? l() : d(l, i))
								}
							},
							x = function(e) {
								var t, a, i = 99,
									r = function() {
										t = null, e()
									},
									o = function() {
										var e = n.now() - a;
										e < i ? d(o, i - e) : (f || r)(r)
									};
								return function() {
									a = n.now(), t || (t = d(o, i))
								}
							},
							L = (K = /^img$/i, Q = /^iframe$/i, V = "onscroll" in e && !/(gle|ing)bot/.test(navigator.userAgent), X = 0, Y = 0, Z = 0, ee = -1, te = function(e) {
								Z--, (!e || Z < 0 || !e.target) && (Z = 0)
							}, ne = function(e) {
								return null == J && (J = "hidden" == E(t.body, "visibility")), J || !("hidden" == E(e.parentNode, "visibility") && "hidden" == E(e, "visibility"))
							}, ae = function(e, n) {
								var a, i = e,
									o = ne(e);
								for (I -= n, G += n, j -= n, U += n; o && (i = i.offsetParent) && i != t.body && i != r;)(o = (E(i, "opacity") || 1) > 0) && "visible" != E(i, "overflow") && (a = i.getBoundingClientRect(), o = U > a.left && j < a.right && G > a.top - 1 && I < a.bottom + 1);
								return o
							}, ie = function() {
								var e, n, o, s, c, d, u, f, m, v, y, h, z = a.elements;
								if ((k = i.loadMode) && Z < 8 && (e = z.length)) {
									for (n = 0, ee++; n < e; n++) if (z[n] && !z[n]._lazyRace) if (!V || a.prematureUnveil && a.prematureUnveil(z[n])) fe(z[n]);
									else if ((f = z[n][l]("data-expand")) && (d = 1 * f) || (d = Y), v || (v = !i.expand || i.expand < 1 ? r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370 : i.expand, a._defEx = v, y = v * i.expFactor, h = i.hFac, J = null, Y < y && Z < 1 && ee > 2 && k > 2 && !t.hidden ? (Y = y, ee = 0) : Y = k > 1 && ee > 1 && Z < 6 ? v : X), m !== d && ($ = innerWidth + d * h, q = innerHeight + d, u = -1 * d, m = d), o = z[n].getBoundingClientRect(), (G = o.bottom) >= u && (I = o.top) <= q && (U = o.right) >= u * h && (j = o.left) <= $ && (G || U || j || I) && (i.loadHidden || ne(z[n])) && (P && Z < 3 && !f && (k < 3 || ee < 4) || ae(z[n], d))) {
										if (fe(z[n]), c = !0, Z > 9) break
									} else!c && P && !s && Z < 4 && ee < 4 && k > 2 && (R[0] || i.preloadAfterLoad) && (R[0] || !f && (G || U || j || I || "auto" != z[n][l](i.sizesAttr))) && (s = R[0] || z[n]);
									s && !c && fe(s)
								}
							}, re = N(ie), oe = function(e) {
								var t = e.target;
								t._lazyCache ? delete t._lazyCache : (te(e), p(t, i.loadedClass), g(t, i.loadingClass), C(t, le), b(t, "lazyloaded"))
							}, se = M(oe), le = function(e) {
								se({
									target: e.target
								})
							}, ce = function(e, t) {
								var n = e.getAttribute("data-load-mode") || i.iframeLoadMode;
								0 == n ? e.contentWindow.location.replace(t) : 1 == n && (e.src = t)
							}, de = function(e) {
								var t, n = e[l](i.srcsetAttr);
								(t = i.customMedia[e[l]("data-media") || e[l]("media")]) && e.setAttribute("media", t), n && e.setAttribute("srcset", n)
							}, ue = M((function(e, t, n, a, r) {
								var o, s, c, u, f, v;
								(f = b(e, "lazybeforeunveil", t)).defaultPrevented || (a && (n ? p(e, i.autosizesClass) : e.setAttribute("sizes", a)), s = e[l](i.srcsetAttr), o = e[l](i.srcAttr), r && (u = (c = e.parentNode) && m.test(c.nodeName || "")), v = t.firesLoad || "src" in e && (s || o || u), f = {
									target: e
								}, p(e, i.loadingClass), v && (clearTimeout(D), D = d(te, 2500), C(e, le, !0)), u && h.call(c.getElementsByTagName("source"), de), s ? e.setAttribute("srcset", s) : o && !u && (Q.test(e.nodeName) ? ce(e, o) : e.src = o), r && (s || u) && A(e, {
									src: o
								})), e._lazyRace && delete e._lazyRace, g(e, i.lazyClass), w((function() {
									var t = e.complete && e.naturalWidth > 1;
									v && !t || (t && p(e, i.fastLoadedClass), oe(f), e._lazyCache = !0, d((function() {
										"_lazyCache" in e && delete e._lazyCache
									}), 9)), "lazy" == e.loading && Z--
								}), !0)
							})), fe = function(e) {
								if (!e._lazyRace) {
									var t, n = K.test(e.nodeName),
										a = n && (e[l](i.sizesAttr) || e[l]("sizes")),
										r = "auto" == a;
									(!r && P || !n || !e[l]("src") && !e.srcset || e.complete || z(e, i.errorClass) || !z(e, i.lazyClass)) && (t = b(e, "lazyunveilread").detail, r && W.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, Z++, ue(e, t, r, a, n))
								}
							}, me = x((function() {
								i.loadMode = 3, re()
							})), ve = function() {
								3 == i.loadMode && (i.loadMode = 2), me()
							}, ye = function() {
								P || (n.now() - H < 999 ? d(ye, 999) : (P = !0, i.loadMode = 3, re(), c("scroll", ve, !0)))
							}, {
								_: function() {
									H = n.now(), a.elements = t.getElementsByClassName(i.lazyClass), R = t.getElementsByClassName(i.lazyClass + " " + i.preloadClass), c("scroll", re, !0), c("resize", re, !0), c("pageshow", (function(e) {
										if (e.persisted) {
											var n = t.querySelectorAll("." + i.loadingClass);
											n.length && n.forEach && u((function() {
												n.forEach((function(e) {
													e.complete && fe(e)
												}))
											}))
										}
									})), e.MutationObserver ? new MutationObserver(re).observe(r, {
										childList: !0,
										subtree: !0,
										attributes: !0
									}) : (r[s]("DOMNodeInserted", re, !0), r[s]("DOMAttrModified", re, !0), setInterval(re, 999)), c("hashchange", re, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach((function(e) {
										t[s](e, re, !0)
									})), /d$|^c/.test(t.readyState) ? ye() : (c("load", ye), t[s]("DOMContentLoaded", re), d(ye, 2e4)), a.elements.length ? (ie(), w._lsFlush()) : re()
								},
								checkElems: re,
								unveil: fe,
								_aLSL: ve
							}),
							W = (T = M((function(e, t, n, a) {
								var i, r, o;
								if (e._lazysizesWidth = a, a += "px", e.setAttribute("sizes", a), m.test(t.nodeName || "")) for (r = 0, o = (i = t.getElementsByTagName("source")).length; r < o; r++) i[r].setAttribute("sizes", a);
								n.detail.dataAttr || A(e, n.detail)
							})), F = function(e, t, n) {
								var a, i = e.parentNode;
								i && (n = _(e, i, n), (a = b(e, "lazybeforesizes", {
									width: n,
									dataAttr: !! t
								})).defaultPrevented || (n = a.detail.width) && n !== e._lazysizesWidth && T(e, i, a, n))
							}, O = x((function() {
								var e, t = B.length;
								if (t) for (e = 0; e < t; e++) F(B[e])
							})), {
								_: function() {
									B = t.getElementsByClassName(i.autosizesClass), c("resize", O)
								},
								checkElems: O,
								updateElem: F
							}),
							S = function() {
								!S.i && t.getElementsByClassName && (S.i = !0, W._(), L._())
							};
						var B, T, F, O;
						var R, P, D, k, H, $, q, I, j, U, G, J, K, Q, V, X, Y, Z, ee, te, ne, ae, ie, re, oe, se, le, ce, de, ue, fe, me, ve, ye;
						var he, ze, pe, ge, Ce, be, Ae;
						return d((function() {
							i.init && S()
						})), a = {
							cfg: i,
							autoSizer: W,
							loader: L,
							init: S,
							uP: A,
							aC: p,
							rC: g,
							hC: z,
							fire: b,
							gW: _,
							rAF: w
						}
					}(t, t.document, Date);
				t.lazySizes = a, e.exports && (e.exports = a)
			}("undefined" != typeof window ? window : {})
		}
	},
		t = {};

	function n(a) {
		if (t[a]) return t[a].exports;
		var i = t[a] = {
			exports: {}
		};
		return e[a](i, i.exports, n), i.exports
	}
	n.n = function(e) {
		var t = e && e.__esModule ?
		function() {
			return e.
		default
		} : function() {
			return e
		};
		return n.d(t, {
			a: t
		}), t
	}, n.d = function(e, t) {
		for (var a in t) n.o(t, a) && !n.o(e, a) && Object.defineProperty(e, a, {
			enumerable: !0,
			get: t[a]
		})
	}, n.o = function(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, function() {
		"use strict";
		var e = n(90);
		n.n(e)().init()
	}()
}();
//# sourceMappingURL=smush-lazy-load.min.js.map


/*模板*/

//theme.min.js

/*! OwO-v1.0.2 | MIT License | By DIYgod */
"use strict";

function _classCallCheck(e, t) {
	if (!(e instanceof t)) {
		throw new TypeError("Cannot call a class as a function")
	}
}
var _createClass = function() {
		function e(e, t) {
			for (var a = 0; a < t.length; a++) {
				var s = t[a];
				s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
			}
		}
		return function(t, a, s) {
			return a && e(t.prototype, a), s && e(t, s), t
		}
	}();
!
function() {
	var e = function() {
			function e(t) {
				var a = this;
				_classCallCheck(this, e);
				var s = {
					logo: "OwO表情",
					container: document.getElementsByClassName("OwO")[0],
					position: "down",
					width: "90%",
					maxHeight: "250px",
					api: xb.thome + "/inc/OwO.json"
				};
				for (var n in s) {
					s.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = s[n])
				}
				this.container = t.container, "up" === t.position && this.container.classList.add("OwO-up");
				var i = new XMLHttpRequest;
				i.onreadystatechange = function() {
					4 === i.readyState && (i.status >= 200 && i.status < 300 || 304 === i.status ? (a.odata = JSON.parse(i.responseText), a.init(t)) : console.log("OwO data request was unsuccessful: " + i.status))
				}, i.open("get", t.api, !0), i.send(null)
			}
			return _createClass(e, [{
				key: "init",
				value: function(e) {
					var t = this;
					this.packages = Object.keys(this.odata);
					for (var a = '\n            <div class="OwO-logo"><span>' + e.logo + '</span></div>\n            <div class="OwO-body" style="width: ' + e.width + '">', s = 0; s < this.packages.length; s++) {
						a += '\n                <ul class="OwO-items OwO-items-' + this.odata[this.packages[s]].type + '" style="max-height: ' + (parseInt(e.maxHeight) - 53 + "px") + ';">';
						for (var n = this.odata[this.packages[s]].container, i = 0; i < n.length; i++) {
							var temp0 = n[i].icon;
							if (temp0.substr(0, 1) == "/") {
								var temp0 = '<img src="' + xb.owo + n[i].icon + '">'
							}
							a += '\n                    <li class="OwO-item" title="' + n[i].text + '"><a href="javascript:grin(' + n[i].desc + ')">' + temp0 + "</a></li>"
						}
						a += "\n                </ul>"
					}
					a += '\n                <div class="OwO-bar">\n                    <ul class="OwO-packages">';
					for (var o = 0; o < this.packages.length; o++) {
						a += "\n                        <li><span>" + this.packages[o] + "</span></li>"
					}
					a += "\n                    </ul>\n                </div>\n            </div>\n            ", this.container.innerHTML = a, this.logo = this.container.getElementsByClassName("OwO-logo")[0], this.logo.addEventListener("click", function() {
						t.toggle()
					}), this.packagesEle = this.container.getElementsByClassName("OwO-packages")[0];
					for (var c = function(e) {
							!
							function(a) {
								t.packagesEle.children[e].addEventListener("click", function() {
									t.tab(a)
								})
							}(e)
						}, l = 0; l < this.packagesEle.children.length; l++) {
						c(l)
					}
					this.tab(0)
				}
			}, {
				key: "toggle",
				value: function() {
					this.container.classList.contains("OwO-open") ? this.container.classList.remove("OwO-open") : this.container.classList.add("OwO-open")
				}
			}, {
				key: "tab",
				value: function(e) {
					var t = this.container.getElementsByClassName("OwO-items-show")[0];
					t && t.classList.remove("OwO-items-show"), this.container.getElementsByClassName("OwO-items")[e].classList.add("OwO-items-show");
					var a = this.container.getElementsByClassName("OwO-package-active")[0];
					a && a.classList.remove("OwO-package-active"), this.packagesEle.getElementsByTagName("li")[e].classList.add("OwO-package-active")
				}
			}]), e
		}();
	"undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e : window.OwO = e
}();

function grin(tag) {
	var myField;
	tag = " " + tag + " ";
	if (document.getElementById("comment") && document.getElementById("comment").type == "textarea") {
		myField = document.getElementById("comment")
	} else {
		return false
	}
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = tag;
		myField.focus()
	} else {
		if (myField.selectionStart || myField.selectionStart == "0") {
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			var cursorPos = endPos;
			myField.value = myField.value.substring(0, startPos) + tag + myField.value.substring(endPos, myField.value.length);
			cursorPos += tag.length;
			myField.focus();
			myField.selectionStart = cursorPos;
			myField.selectionEnd = cursorPos;
			var owoopen = document.getElementsByClassName("OwO OwO-open")[0];
			owoopen.className = "OwO"
		} else {
			myField.value += tag;
			myField.focus()
		}
	}
}; /*! layer-v3.1.0 | MIT License | By 贤心 */
!
function(e, t) {
	var i, n, a = e.layui && layui.define,
		o = {
			getPath: function() {
				var e = document.scripts,
					t = e[e.length - 1],
					i = t.src;
				if (!t.getAttribute("merge")) {
					return i.substring(0, i.lastIndexOf("/") + 1)
				}
			}(),
			config: {},
			end: {},
			minIndex: 0,
			minLeft: [],
			btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
			type: ["dialog", "page", "iframe", "loading", "tips"],
			getStyle: function(t, i) {
				var n = t.currentStyle ? t.currentStyle : e.getComputedStyle(t, null);
				return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](i)
			},
			link: function(t, i, n) {}
		},
		r = {
			v: "3.1.0",
			ie: function() {
				var t = navigator.userAgent.toLowerCase();
				return !!(e.ActiveXObject || "ActiveXObject" in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11")
			}(),
			index: e.layer && e.layer.v ? 100000 : 0,
			path: o.getPath,
			config: function(e, t) {
				return e = e || {}, r.cache = o.config = i.extend({}, o.config, e), r.path = o.config.path || r.path, "string" == typeof e.extend && (e.extend = [e.extend]), o.config.path && r.ready(), e.extend ? (a ? layui.addcss("modules/layer/" + e.extend) : o.link("theme/" + e.extend), this) : this
			},
			ready: function(e) {},
			alert: function(e, t, n) {
				var a = "function" == typeof t;
				return a && (n = t), r.open(i.extend({
					content: e,
					yes: n
				}, a ? {} : t))
			},
			confirm: function(e, t, n, a) {
				var s = "function" == typeof t;
				return s && (a = n, n = t), r.open(i.extend({
					content: e,
					btn: o.btn,
					yes: n,
					btn2: a
				}, s ? {} : t))
			},
			msg: function(e, n, a) {
				var s = "function" == typeof n,
					f = o.config.skin,
					c = (f ? f + " " + f + "-msg" : "") || "layui-layer-msg",
					u = l.anim.length - 1;
				return s && (a = n), r.open(i.extend({
					content: e,
					time: 3000,
					shade: !1,
					skin: c,
					title: !1,
					closeBtn: !1,
					btn: !1,
					resize: !1,
					end: a
				}, s && !o.config.skin ? {
					skin: c + " layui-layer-hui",
					anim: u
				} : function() {
					return n = n || {}, (n.icon === -1 || n.icon === t && !o.config.skin) && (n.skin = c + " " + (n.skin || "layui-layer-hui")), n
				}()))
			},
			load: function(e, t) {
				return r.open(i.extend({
					type: 3,
					icon: e || 0,
					resize: !1,
					shade: 0.01
				}, t))
			},
			tips: function(e, t, n) {
				return r.open(i.extend({
					type: 4,
					content: [e, t],
					closeBtn: !1,
					time: 3000,
					shade: !1,
					resize: !1,
					fixed: !1,
					maxWidth: 210
				}, n))
			}
		},
		s = function(e) {
			var t = this;
			t.index = ++r.index, t.config = i.extend({}, t.config, o.config, e), document.body ? t.creat() : setTimeout(function() {
				t.creat()
			}, 30)
		};
	s.pt = s.prototype;
	var l = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
	l.anim = ["layer-anim-00", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"], s.pt.config = {
		type: 0,
		shade: 0.3,
		fixed: !0,
		move: l[1],
		title: "&#x4FE1;&#x606F;",
		offset: "auto",
		area: "auto",
		closeBtn: 1,
		time: 0,
		zIndex: 19891014,
		maxWidth: 360,
		anim: 0,
		isOutAnim: !0,
		icon: -1,
		moveType: 1,
		resize: !0,
		scrollbar: !0,
		tips: 2
	}, s.pt.vessel = function(e, t) {
		var n = this,
			a = n.index,
			r = n.config,
			s = r.zIndex + a,
			f = "object" == typeof r.title,
			c = r.maxmin && (1 === r.type || 2 === r.type),
			u = r.title ? '<div class="layui-layer-title" style="' + (f ? r.title[1] : "") + '">' + (f ? r.title[0] : r.title) + "</div>" : "";
		return r.zIndex = s, t([r.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + a + '" times="' + a + '" style="' + ("z-index:" + (s - 1) + "; ") + '"></div>' : "", '<div class="' + l[0] + (" layui-layer-" + o.type[r.type]) + (0 != r.type && 2 != r.type || r.shade ? "" : " layui-layer-border") + " " + (r.skin || "") + '" id="' + l[0] + a + '" type="' + o.type[r.type] + '" times="' + a + '" showtime="' + r.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + r.area[0] + ";height:" + r.area[1] + (r.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != r.type ? "" : u) + '<div id="' + (r.id || "") + '" class="layui-layer-content' + (0 == r.type && r.icon !== -1 ? " layui-layer-padding" : "") + (3 == r.type ? " layui-layer-loading" + r.icon : "") + '">' + (0 == r.type && r.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + r.icon + '"></i>' : "") + (1 == r.type && e ? "" : r.content || "") + '</div><span class="layui-layer-setwin">' +
		function() {
			var e = c ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
			return r.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (r.title ? r.closeBtn : 4 == r.type ? "1" : "2") + '" href="javascript:;"></a>'), e
		}() + "</span>" + (r.btn ?
		function() {
			var e = "";
			"string" == typeof r.btn && (r.btn = [r.btn]);
			for (var t = 0, i = r.btn.length; t < i; t++) {
				e += '<a class="' + l[6] + t + '">' + r.btn[t] + "</a>"
			}
			return '<div class="' + l[6] + " layui-layer-btn-" + (r.btnAlign || "") + '">' + e + "</div>"
		}() : "") + (r.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], u, i('<div class="layui-layer-move"></div>')), n
	}, s.pt.creat = function() {
		var e = this,
			t = e.config,
			a = e.index,
			s = t.content,
			f = "object" == typeof s,
			c = i("body");
		if (!t.id || !i("#" + t.id)[0]) {
			switch ("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]), t.shift && (t.anim = t.shift), 6 == r.ie && (t.fixed = !1), t.type) {
			case 0:
				t.btn = "btn" in t ? t.btn : o.btn[0], r.closeAll("dialog");
				break;
			case 2:
				var s = t.content = f ? t.content : [t.content || "http://layer.layui.com", "auto"];
				t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + a + '" name="' + l[4] + a + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
				break;
			case 3:
				delete t.title, delete t.closeBtn, t.icon === -1 && 0 === t.icon, r.closeAll("loading");
				break;
			case 4:
				f || (t.content = [t.content, "body"]), t.follow = t.content[1], t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>', delete t.title, t.tips = "object" == typeof t.tips ? t.tips : [t.tips, !0], t.tipsMore || r.closeAll("tips")
			}
			if (e.vessel(f, function(n, r, u) {
				c.append(n[0]), f ?
				function() {
					2 == t.type || 4 == t.type ?
					function() {
						i("body").append(n[1])
					}() : function() {
						s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]), i("#" + l[0] + a).find("." + l[5]).before(r))
					}()
				}() : c.append(n[1]), i(".layui-layer-move")[0] || c.append(o.moveElem = u), e.layero = i("#" + l[0] + a), t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", a)
			}).auto(a), i("#layui-layer-shade" + e.index).css({
				"background-color": t.shade[1] || "#000",
				opacity: t.shade[0] || t.shade
			}), 2 == t.type && 6 == r.ie && e.layero.find("iframe").attr("src", s[0]), 4 == t.type ? e.tips() : e.offset(), t.fixed && n.on("resize", function() {
				e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(a), 4 == t.type && e.tips()
			}), t.time <= 0 || setTimeout(function() {
				r.close(e.index)
			}, t.time), e.move().callback(), l.anim[t.anim]) {
				var u = "layer-anim " + l.anim[t.anim];
				e.layero.addClass(u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
					i(this).removeClass(u)
				})
			}
			t.isOutAnim && e.layero.data("isOutAnim", !0)
		}
	}, s.pt.auto = function(e) {
		var t = this,
			a = t.config,
			o = i("#" + l[0] + e);
		"" === a.area[0] && a.maxWidth > 0 && (r.ie && r.ie < 8 && a.btn && o.width(o.innerWidth()), o.outerWidth() > a.maxWidth && o.width(a.maxWidth));
		var s = [o.innerWidth(), o.innerHeight()],
			f = o.find(l[1]).outerHeight() || 0,
			c = o.find("." + l[6]).outerHeight() || 0,
			u = function(e) {
				e = o.find(e), e.height(s[1] - f - c - 2 * (0 | parseFloat(e.css("padding-top"))))
			};
		switch (a.type) {
		case 2:
			u("iframe");
			break;
		default:
			"" === a.area[1] ? a.maxHeight > 0 && o.outerHeight() > a.maxHeight ? (s[1] = a.maxHeight, u("." + l[5])) : a.fixed && s[1] >= n.height() && (s[1] = n.height(), u("." + l[5])) : u("." + l[5])
		}
		return t
	}, s.pt.offset = function() {
		var e = this,
			t = e.config,
			i = e.layero,
			a = [i.outerWidth(), i.outerHeight()],
			o = "object" == typeof t.offset;
		e.offsetTop = (n.height() - a[1]) / 2, e.offsetLeft = (n.width() - a[0]) / 2, o ? (e.offsetTop = t.offset[0], e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - a[0] : "b" === t.offset ? e.offsetTop = n.height() - a[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = n.width() - a[0]) : "rb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = n.width() - a[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ? n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += n.scrollTop(), e.offsetLeft += n.scrollLeft()), i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(l[1]).outerHeight() || 0), e.offsetLeft = i.css("left")), i.css({
			top: e.offsetTop,
			left: e.offsetLeft
		})
	}, s.pt.tips = function() {
		var e = this,
			t = e.config,
			a = e.layero,
			o = [a.outerWidth(), a.outerHeight()],
			r = i(t.follow);
		r[0] || (r = i("body"));
		var s = {
			width: r.outerWidth(),
			height: r.outerHeight(),
			top: r.offset().top,
			left: r.offset().left
		},
			f = a.find(".layui-layer-TipsG"),
			c = t.tips[0];
		t.tips[1] || f.remove(), s.autoLeft = function() {
			s.left + o[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - o[0], f.css({
				right: 12,
				left: "auto"
			})) : s.tipLeft = s.left
		}, s.where = [function() {
			s.autoLeft(), s.tipTop = s.top - o[1] - 10, f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1])
		}, function() {
			s.tipLeft = s.left + s.width + 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1])
		}, function() {
			s.autoLeft(), s.tipTop = s.top + s.height + 10, f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1])
		}, function() {
			s.tipLeft = s.left - o[0] - 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1])
		}], s.where[c - 1](), 1 === c ? s.top - (n.scrollTop() + o[1] + 16) < 0 && s.where[2]() : 2 === c ? n.width() - (s.left + s.width + o[0] + 16) > 0 || s.where[3]() : 3 === c ? s.top - n.scrollTop() + s.height + o[1] + 16 - n.height() > 0 && s.where[0]() : 4 === c && o[0] + 16 - s.left > 0 && s.where[1](), a.find("." + l[5]).css({
			"background-color": t.tips[1],
			"padding-right": t.closeBtn ? "30px" : ""
		}), a.css({
			left: s.tipLeft - (t.fixed ? n.scrollLeft() : 0),
			top: s.tipTop - (t.fixed ? n.scrollTop() : 0)
		})
	}, s.pt.move = function() {
		var e = this,
			t = e.config,
			a = i(document),
			s = e.layero,
			l = s.find(t.move),
			f = s.find(".layui-layer-resize"),
			c = {};
		return t.move, l.on("mousedown", function(e) {
			e.preventDefault(), t.move && (c.moveStart = !0, c.offset = [e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top"))], o.moveElem.css("cursor", "move").show())
		}), f.on("mousedown", function(e) {
			e.preventDefault(), c.resizeStart = !0, c.offset = [e.clientX, e.clientY], c.area = [s.outerWidth(), s.outerHeight()], o.moveElem.css("cursor", "se-resize").show()
		}), a.on("mousemove", function(i) {
			if (c.moveStart) {
				var a = i.clientX - c.offset[0],
					o = i.clientY - c.offset[1],
					l = "fixed" === s.css("position");
				if (i.preventDefault(), c.stX = l ? 0 : n.scrollLeft(), c.stY = l ? 0 : n.scrollTop(), !t.moveOut) {
					var f = n.width() - s.outerWidth() + c.stX,
						u = n.height() - s.outerHeight() + c.stY;
					a < c.stX && (a = c.stX), a > f && (a = f), o < c.stY && (o = c.stY), o > u && (o = u)
				}
				s.css({
					left: a,
					top: o
				})
			}
			if (t.resize && c.resizeStart) {
				var a = i.clientX - c.offset[0],
					o = i.clientY - c.offset[1];
				i.preventDefault(), r.style(e.index, {
					width: c.area[0] + a,
					height: c.area[1] + o
				}), c.isResize = !0, t.resizing && t.resizing(s)
			}
		}).on("mouseup", function(e) {
			c.moveStart && (delete c.moveStart, o.moveElem.hide(), t.moveEnd && t.moveEnd(s)), c.resizeStart && (delete c.resizeStart, o.moveElem.hide())
		}), e
	}, s.pt.callback = function() {
		function e() {
			var e = a.cancel && a.cancel(t.index, n);
			e === !1 || r.close(t.index)
		}
		var t = this,
			n = t.layero,
			a = t.config;
		t.openLayer(), a.success && (2 == a.type ? n.find("iframe").on("load", function() {
			a.success(n, t.index)
		}) : a.success(n, t.index)), 6 == r.ie && t.IE6(n), n.find("." + l[6]).children("a").on("click", function() {
			var e = i(this).index();
			if (0 === e) {
				a.yes ? a.yes(t.index, n) : a.btn1 ? a.btn1(t.index, n) : r.close(t.index)
			} else {
				var o = a["btn" + (e + 1)] && a["btn" + (e + 1)](t.index, n);
				o === !1 || r.close(t.index)
			}
		}), n.find("." + l[7]).on("click", e), a.shadeClose && i("#layui-layer-shade" + t.index).on("click", function() {
			r.close(t.index)
		}), n.find(".layui-layer-min").on("click", function() {
			var e = a.min && a.min(n);
			e === !1 || r.min(t.index, a)
		}), n.find(".layui-layer-max").on("click", function() {
			i(this).hasClass("layui-layer-maxmin") ? (r.restore(t.index), a.restore && a.restore(n)) : (r.full(t.index, a), setTimeout(function() {
				a.full && a.full(n)
			}, 100))
		}), a.end && (o.end[t.index] = a.end)
	}, o.reselect = function() {
		i.each(i("select"), function(e, t) {
			var n = i(this);
			n.parents("." + l[0])[0] || 1 == n.attr("layer") && i("." + l[0]).length < 1 && n.removeAttr("layer").show(), n = null
		})
	}, s.pt.IE6 = function(e) {
		i("select").each(function(e, t) {
			var n = i(this);
			n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({
				layer: "1"
			}).hide(), n = null
		})
	}, s.pt.openLayer = function() {
		var e = this;
		r.zIndex = e.config.zIndex, r.setTop = function(e) {
			var t = function() {
					r.zIndex++, e.css("z-index", r.zIndex + 1)
				};
			return r.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", t), r.zIndex
		}
	}, o.record = function(e) {
		var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
		e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({
			area: t
		})
	}, o.rescollbar = function(e) {
		l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"), l.html.removeAttr("layer-full"))
	}, e.layer = r, r.getChildFrame = function(e, t) {
		return t = t || i("." + l[4]).attr("times"), i("#" + l[0] + t).find("iframe").contents().find(e)
	}, r.getFrameIndex = function(e) {
		return i("#" + e).parents("." + l[4]).attr("times")
	}, r.iframeAuto = function(e) {
		if (e) {
			var t = r.getChildFrame("html", e).outerHeight(),
				n = i("#" + l[0] + e),
				a = n.find(l[1]).outerHeight() || 0,
				o = n.find("." + l[6]).outerHeight() || 0;
			n.css({
				height: t + a + o
			}), n.find("iframe").css({
				height: t
			})
		}
	}, r.iframeSrc = function(e, t) {
		i("#" + l[0] + e).find("iframe").attr("src", t)
	}, r.style = function(e, t, n) {
		var a = i("#" + l[0] + e),
			r = a.find(".layui-layer-content"),
			s = a.attr("type"),
			f = a.find(l[1]).outerHeight() || 0,
			c = a.find("." + l[6]).outerHeight() || 0;
		a.attr("minLeft");
		s !== o.type[3] && s !== o.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - f - c <= 64 && (t.height = 64 + f + c)), a.css(t), c = a.find("." + l[6]).outerHeight(), s === o.type[2] ? a.find("iframe").css({
			height: parseFloat(t.height) - f - c
		}) : r.css({
			height: parseFloat(t.height) - f - c - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom"))
		}))
	}, r.min = function(e, t) {
		var a = i("#" + l[0] + e),
			s = a.find(l[1]).outerHeight() || 0,
			f = a.attr("minLeft") || 181 * o.minIndex + "px",
			c = a.css("position");
		o.record(a), o.minLeft[0] && (f = o.minLeft[0], o.minLeft.shift()), a.attr("position", c), r.style(e, {
			width: 180,
			height: s,
			left: f,
			top: n.height() - s,
			position: "fixed",
			overflow: "hidden"
		}, !0), a.find(".layui-layer-min").hide(), "page" === a.attr("type") && a.find(l[4]).hide(), o.rescollbar(e), a.attr("minLeft") || o.minIndex++, a.attr("minLeft", f)
	}, r.restore = function(e) {
		var t = i("#" + l[0] + e),
			n = t.attr("area").split(",");
		t.attr("type");
		r.style(e, {
			width: parseFloat(n[0]),
			height: parseFloat(n[1]),
			top: parseFloat(n[2]),
			left: parseFloat(n[3]),
			position: t.attr("position"),
			overflow: "visible"
		}, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), "page" === t.attr("type") && t.find(l[4]).show(), o.rescollbar(e)
	}, r.full = function(e) {
		var t, a = i("#" + l[0] + e);
		o.record(a), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), clearTimeout(t), t = setTimeout(function() {
			var t = "fixed" === a.css("position");
			r.style(e, {
				top: t ? 0 : n.scrollTop(),
				left: t ? 0 : n.scrollLeft(),
				width: n.width(),
				height: n.height()
			}, !0), a.find(".layui-layer-min").hide()
		}, 100)
	}, r.title = function(e, t) {
		var n = i("#" + l[0] + (t || r.index)).find(l[1]);
		n.html(e)
	}, r.close = function(e) {
		var t = i("#" + l[0] + e),
			n = t.attr("type"),
			a = "layer-anim-close";
		if (t[0]) {
			var s = "layui-layer-wrap",
				f = function() {
					if (n === o.type[1] && "object" === t.attr("conType")) {
						t.children(":not(." + l[5] + ")").remove();
						for (var a = t.find("." + s), r = 0; r < 2; r++) {
							a.unwrap()
						}
						a.css("display", a.data("display")).removeClass(s)
					} else {
						if (n === o.type[2]) {
							try {
								var f = i("#" + l[4] + e)[0];
								f.contentWindow.document.write(""), f.contentWindow.close(), t.find("." + l[5])[0].removeChild(f)
							} catch (c) {}
						}
						t[0].innerHTML = "", t.remove()
					}
					"function" == typeof o.end[e] && o.end[e](), delete o.end[e]
				};
			t.data("isOutAnim") && t.addClass("layer-anim " + a), i("#layui-layer-moves, #layui-layer-shade" + e).remove(), 6 == r.ie && o.reselect(), o.rescollbar(e), t.attr("minLeft") && (o.minIndex--, o.minLeft.push(t.attr("minLeft"))), r.ie && r.ie < 10 || !t.data("isOutAnim") ? f() : setTimeout(function() {
				f()
			}, 200)
		}
	}, r.closeAll = function(e) {
		i.each(i("." + l[0]), function() {
			var t = i(this),
				n = e ? t.attr("type") === e : 1;
			n && r.close(t.attr("times")), n = null
		})
	};
	var f = r.cache || {},
		c = function(e) {
			return f.skin ? " " + f.skin + " " + f.skin + "-" + e : ""
		};
	r.prompt = function(e, t) {
		var a = "";
		if (e = e || {}, "function" == typeof e && (t = e), e.area) {
			var o = e.area;
			a = 'style="width: ' + o[0] + "; height: " + o[1] + ';"', delete e.area
		}
		var s, l = 2 == e.formType ? '<textarea class="layui-layer-input"' + a + ">" + (e.value || "") + "</textarea>" : function() {
				return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (e.value || "") + '">'
			}(),
			f = e.success;
		return delete e.success, r.open(i.extend({
			type: 1,
			btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
			content: l,
			skin: "layui-layer-prompt" + c("prompt"),
			maxWidth: n.width(),
			success: function(e) {
				s = e.find(".layui-layer-input"), s.focus(), "function" == typeof f && f(e)
			},
			resize: !1,
			yes: function(i) {
				var n = s.val();
				"" === n ? s.focus() : n.length > (e.maxlength || 500) ? r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {
					tips: 1
				}) : t && t(n, i, s)
			}
		}, e))
	}, r.tab = function(e) {
		e = e || {};
		var t = e.tab || {},
			n = "layui-this",
			a = e.success;
		return delete e.success, r.open(i.extend({
			type: 1,
			skin: "layui-layer-tab" + c("tab"),
			resize: !1,
			title: function() {
				var e = t.length,
					i = 1,
					a = "";
				if (e > 0) {
					for (a = '<span class="' + n + '">' + t[0].title + "</span>"; i < e; i++) {
						a += "<span>" + t[i].title + "</span>"
					}
				}
				return a
			}(),
			content: '<ul class="layui-layer-tabmain">' +
			function() {
				var e = t.length,
					i = 1,
					a = "";
				if (e > 0) {
					for (a = '<li class="layui-layer-tabli ' + n + '">' + (t[0].content || "no content") + "</li>"; i < e; i++) {
						a += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>"
					}
				}
				return a
			}() + "</ul>",
			success: function(t) {
				var o = t.find(".layui-layer-title").children(),
					r = t.find(".layui-layer-tabmain").children();
				o.on("mousedown", function(t) {
					t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
					var a = i(this),
						o = a.index();
					a.addClass(n).siblings().removeClass(n), r.eq(o).show().siblings().hide(), "function" == typeof e.change && e.change(o)
				}), "function" == typeof a && a(t)
			}
		}, e))
	}, r.photos = function(t, n, a) {
		function o(e, t, i) {
			var n = new Image;
			return n.src = e, n.complete ? t(n) : (n.onload = function() {
				n.onload = null, t(n)
			}, void(n.onerror = function(e) {
				n.onerror = null, i(e)
			}))
		}
		var s = {};
		if (t = t || {}, t.photos) {
			var l = t.photos.constructor === Object,
				f = l ? t.photos : {},
				u = f.data || [],
				d = f.start || 0;
			s.imgIndex = (0 | d) + 1, t.img = t.img || "img";
			var y = t.success;
			if (delete t.success, l) {
				if (0 === u.length) {
					return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
				}
			} else {
				var p = i(t.photos),
					h = function() {
						u = [], p.find(t.img).each(function(e) {
							var t = i(this);
							t.attr("layer-index", e), u.push({
								alt: t.attr("alt"),
								pid: t.attr("layer-pid"),
								src: t.attr("layer-src") || t.attr("src"),
								thumb: t.attr("src")
							})
						})
					};
				if (h(), 0 === u.length) {
					return
				}
				if (n || p.on("click", t.img, function() {
					var e = i(this),
						n = e.attr("layer-index");
					r.photos(i.extend(t, {
						photos: {
							start: n,
							data: u,
							tab: t.tab
						},
						full: t.full
					}), !0), h()
				}), !n) {
					return
				}
			}
			s.imgprev = function(e) {
				s.imgIndex--, s.imgIndex < 1 && (s.imgIndex = u.length), s.tabimg(e)
			}, s.imgnext = function(e, t) {
				s.imgIndex++, s.imgIndex > u.length && (s.imgIndex = 1, t) || s.tabimg(e)
			}, s.keyup = function(e) {
				if (!s.end) {
					var t = e.keyCode;
					e.preventDefault(), 37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && r.close(s.index)
				}
			}, s.tabimg = function(e) {
				if (!(u.length <= 1)) {
					return f.start = s.imgIndex - 1, r.close(s.index), r.photos(t, !0, e)
				}
			}, s.event = function() {
				s.bigimg.hover(function() {
					s.imgsee.show()
				}, function() {
					s.imgsee.hide()
				}), s.bigimg.find(".layui-layer-imgprev").on("click", function(e) {
					e.preventDefault(), s.imgprev()
				}), s.bigimg.find(".layui-layer-imgnext").on("click", function(e) {
					e.preventDefault(), s.imgnext()
				}), i(document).on("keyup", s.keyup)
			}, s.loadi = r.load(1, {
				shade: !("shade" in t) && 0.9,
				scrollbar: !1
			}), o(u[d].src, function(n) {
				r.close(s.loadi), s.index = r.open(i.extend({
					type: 1,
					id: "layui-layer-photos",
					area: function() {
						var a = [n.width, n.height],
							o = [i(e).width() - 100, i(e).height() - 100];
						if (!t.full && (a[0] > o[0] || a[1] > o[1])) {
							var r = [a[0] / o[0], a[1] / o[1]];
							r[0] > r[1] ? (a[0] = a[0] / r[0], a[1] = a[1] / r[0]) : r[0] < r[1] && (a[0] = a[0] / r[1], a[1] = a[1] / r[1])
						}
						return [a[0] + "px", a[1] + "px"]
					}(),
					title: !1,
					shade: 0.9,
					shadeClose: !0,
					closeBtn: !1,
					move: ".layui-layer-phimg img",
					moveType: 1,
					scrollbar: !1,
					moveOut: !0,
					isOutAnim: !1,
					skin: "layui-layer-photos" + c("photos"),
					content: '<div class="layui-layer-phimg"><img src="' + u[d].src + '" alt="' + (u[d].alt || "") + '" layer-pid="' + u[d].pid + '"><div class="layui-layer-imgsee">' + (u.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (a ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (u[d].alt || "") + "</a><em>" + s.imgIndex + "/" + u.length + "</em></span></div></div></div>",
					success: function(e, i) {
						s.bigimg = e.find(".layui-layer-phimg"), s.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), s.event(e), t.tab && t.tab(u[d], e), "function" == typeof y && y(e)
					},
					end: function() {
						s.end = !0, i(document).off("keyup", s.keyup)
					}
				}, t))
			}, function() {
				r.close(s.loadi), r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
					time: 30000,
					btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
					yes: function() {
						u.length > 1 && s.imgnext(!0, !0)
					}
				})
			})
		}
	}, o.run = function(t) {
		i = t, n = i(e), l.html = i("html"), r.open = function(e) {
			var t = new s(e);
			return t.index
		}
	}, e.layui && layui.define ? (r.ready(), layui.define("jquery", function(t) {
		r.path = layui.cache.dir, o.run(layui.$), e.layer = r, t("layer", r)
	})) : "function" == typeof define && define.amd ? define(["jquery"], function() {
		return o.run(e.jQuery), r
	}) : function() {
		o.run(e.jQuery), r.ready()
	}()
}(window); /*! Bootstrap-v3.3.0 | MIT License */
if ("undefined" == typeof jQuery) {
	throw new Error("Bootstrap's JavaScript requires jQuery")
} +
function(a) {
	var b = a.fn.jquery.split(" ")[0].split(".");
	if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) {
		throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
	}
}(jQuery), +
function(a) {
	function b() {
		var a = document.createElement("bootstrap"),
			b = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd otransitionend",
				transition: "transitionend"
			};
		for (var c in b) {
			if (void 0 !== a.style[c]) {
				return {
					end: b[c]
				}
			}
		}
		return !1
	}
	a.fn.emulateTransitionEnd = function(b) {
		var c = !1,
			d = this;
		a(this).one("bsTransitionEnd", function() {
			c = !0
		});
		var e = function() {
				c || a(d).trigger(a.support.transition.end)
			};
		return setTimeout(e, b), this
	}, a(function() {
		a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
			bindType: a.support.transition.end,
			delegateType: a.support.transition.end,
			handle: function(b) {
				if (a(b.target).is(this)) {
					return b.handleObj.handler.apply(this, arguments)
				}
			}
		})
	})
}(jQuery), +
function(a) {
	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.carousel"),
				f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
				g = "string" == typeof b ? b : f.slide;
			e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
		})
	}
	var c = function(b, c) {
			this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
		};
	c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
		interval: 5000,
		pause: "hover",
		wrap: !0,
		keyboard: !0
	}, c.prototype.keydown = function(a) {
		if (!/input|textarea/i.test(a.target.tagName)) {
			switch (a.which) {
			case 37:
				this.prev();
				break;
			case 39:
				this.next();
				break;
			default:
				return
			}
			a.preventDefault()
		}
	}, c.prototype.cycle = function(b) {
		return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
	}, c.prototype.getItemIndex = function(a) {
		return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
	}, c.prototype.getItemForDirection = function(a, b) {
		var c = this.getItemIndex(b),
			d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
		if (d && !this.options.wrap) {
			return b
		}
		var e = "prev" == a ? -1 : 1,
			f = (c + e) % this.$items.length;
		return this.$items.eq(f)
	}, c.prototype.to = function(a) {
		var b = this,
			c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
		if (!(a > this.$items.length - 1 || a < 0)) {
			return this.sliding ? this.$element.one("slid.bs.carousel", function() {
				b.to(a)
			}) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
		}
	}, c.prototype.pause = function(b) {
		return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
	}, c.prototype.next = function() {
		if (!this.sliding) {
			return this.slide("next")
		}
	}, c.prototype.prev = function() {
		if (!this.sliding) {
			return this.slide("prev")
		}
	}, c.prototype.slide = function(b, d) {
		var e = this.$element.find(".item.active"),
			f = d || this.getItemForDirection(b, e),
			g = this.interval,
			h = "next" == b ? "left" : "right",
			i = this;
		if (f.hasClass("active")) {
			return this.sliding = !1
		}
		var j = f[0],
			k = a.Event("slide.bs.carousel", {
				relatedTarget: j,
				direction: h
			});
		if (this.$element.trigger(k), !k.isDefaultPrevented()) {
			if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
				this.$indicators.find(".active").removeClass("active");
				var l = a(this.$indicators.children()[this.getItemIndex(f)]);
				l && l.addClass("active")
			}
			var m = a.Event("slid.bs.carousel", {
				relatedTarget: j,
				direction: h
			});
			return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
				f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
					i.$element.trigger(m)
				}, 0)
			}).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
		}
	};
	var d = a.fn.carousel;
	a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
		return a.fn.carousel = d, this
	};
	var e = function(c) {
			var d, e = a(this),
				f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
			if (f.hasClass("carousel")) {
				var g = a.extend({}, f.data(), e.data()),
					h = e.attr("data-slide-to");
				h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
			}
		};
	a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
		a('[data-ride="carousel"]').each(function() {
			var c = a(this);
			b.call(c, c.data())
		})
	})
}(jQuery), +
function(a) {
	function b(c, d) {
		this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
	}
	function c(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.scrollspy"),
				f = "object" == typeof c && c;
			e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
		})
	}
	b.VERSION = "3.3.7", b.DEFAULTS = {
		offset: 10
	}, b.prototype.getScrollHeight = function() {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	}, b.prototype.refresh = function() {
		var b = this,
			c = "offset",
			d = 0;
		this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
			var b = a(this),
				e = b.data("target") || b.attr("href"),
				f = /^#./.test(e) && a(e);
			return f && f.length && f.is(":visible") && [
				[f[c]().top + d, e]
			] || null
		}).sort(function(a, b) {
			return a[0] - b[0]
		}).each(function() {
			b.offsets.push(this[0]), b.targets.push(this[1])
		})
	}, b.prototype.process = function() {
		var a, b = this.$scrollElement.scrollTop() + this.options.offset,
			c = this.getScrollHeight(),
			d = this.options.offset + c - this.$scrollElement.height(),
			e = this.offsets,
			f = this.targets,
			g = this.activeTarget;
		if (this.scrollHeight != c && this.refresh(), b >= d) {
			return g != (a = f[f.length - 1]) && this.activate(a)
		}
		if (g && b < e[0]) {
			return this.activeTarget = null, this.clear()
		}
		for (a = e.length; a--;) {
			g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
		}
	}, b.prototype.activate = function(b) {
		this.activeTarget = b, this.clear();
		var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
			d = a(c).parents("li").addClass("active");
		d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
	}, b.prototype.clear = function() {
		a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
	};
	var d = a.fn.scrollspy;
	a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
		return a.fn.scrollspy = d, this
	}, a(window).on("load.bs.scrollspy.data-api", function() {
		a('[data-spy="scroll"]').each(function() {
			var b = a(this);
			c.call(b, b.data())
		})
	})
}(jQuery), +
function(a) {
	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.tab");
			e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
		})
	}
	var c = function(b) {
			this.element = a(b)
		};
	c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
		var b = this.element,
			c = b.closest("ul:not(.dropdown-menu)"),
			d = b.data("target");
		if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
			var e = c.find(".active:last a"),
				f = a.Event("hide.bs.tab", {
					relatedTarget: b[0]
				}),
				g = a.Event("show.bs.tab", {
					relatedTarget: e[0]
				});
			if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
				var h = a(d);
				this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
					e.trigger({
						type: "hidden.bs.tab",
						relatedTarget: b[0]
					}), b.trigger({
						type: "shown.bs.tab",
						relatedTarget: e[0]
					})
				})
			}
		}
	}, c.prototype.activate = function(b, d, e) {
		function f() {
			g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
		}
		var g = d.find("> .active"),
			h = e && a.support.transition && (g.length && g.hasClass("fade") || !! d.find("> .fade").length);
		g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
	};
	var d = a.fn.tab;
	a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
		return a.fn.tab = d, this
	};
	var e = function(c) {
			c.preventDefault(), b.call(a(this), "show")
		};
	a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), +
function(a) {
	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.affix"),
				f = "object" == typeof b && b;
			e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
		})
	}
	var c = function(b, d) {
			this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
		};
	c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
		offset: 0,
		target: window
	}, c.prototype.getState = function(a, b, c, d) {
		var e = this.$target.scrollTop(),
			f = this.$element.offset(),
			g = this.$target.height();
		if (null != c && "top" == this.affixed) {
			return e < c && "top"
		}
		if ("bottom" == this.affixed) {
			return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom"
		}
		var h = null == this.affixed,
			i = h ? e : f.top,
			j = h ? g : b;
		return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
	}, c.prototype.getPinnedOffset = function() {
		if (this.pinnedOffset) {
			return this.pinnedOffset
		}
		this.$element.removeClass(c.RESET).addClass("affix");
		var a = this.$target.scrollTop(),
			b = this.$element.offset();
		return this.pinnedOffset = b.top - a
	}, c.prototype.checkPositionWithEventLoop = function() {
		setTimeout(a.proxy(this.checkPosition, this), 1)
	}, c.prototype.checkPosition = function() {
		if (this.$element.is(":visible")) {
			var b = this.$element.height(),
				d = this.options.offset,
				e = d.top,
				f = d.bottom,
				g = Math.max(a(document).height(), a(document.body).height());
			"object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
			var h = this.getState(g, b, e, f);
			if (this.affixed != h) {
				null != this.unpin && this.$element.css("top", "");
				var i = "affix" + (h ? "-" + h : ""),
					j = a.Event(i + ".bs.affix");
				if (this.$element.trigger(j), j.isDefaultPrevented()) {
					return
				}
				this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
			}
			"bottom" == h && this.$element.offset({
				top: g - b - f
			})
		}
	};
	var d = a.fn.affix;
	a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
		return a.fn.affix = d, this
	}, a(window).on("load", function() {
		a('[data-spy="affix"]').each(function() {
			var c = a(this),
				d = c.data();
			d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
		})
	})
}(jQuery); /*! highlight.js-v9.13.1 | BSD3 License | git.io/hljslicense */
!
function(e) {
	var t = "object" == typeof window && window || "object" == typeof self && self;
	"undefined" != typeof exports ? e(exports) : t && (t.hljs = e({}), "function" == typeof define && define.amd && define([], function() {
		return t.hljs
	}))
}(function(e) {
	function t(e) {
		return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}
	function r(e) {
		return e.nodeName.toLowerCase()
	}
	function a(e, t) {
		var r = e && e.exec(t);
		return r && 0 === r.index
	}
	function n(e) {
		return M.test(e)
	}
	function i(e) {
		var t, r, a, i, s = e.className + " ";
		if (s += e.parentNode ? e.parentNode.className : "", r = B.exec(s)) {
			return w(r[1]) ? r[1] : "no-highlight"
		}
		for (s = s.split(/\s+/), t = 0, a = s.length; a > t; t++) {
			if (i = s[t], n(i) || w(i)) {
				return i
			}
		}
	}
	function s(e) {
		var t, r = {},
			a = Array.prototype.slice.call(arguments, 1);
		for (t in e) {
			r[t] = e[t]
		}
		return a.forEach(function(e) {
			for (t in e) {
				r[t] = e[t]
			}
		}), r
	}
	function c(e) {
		var t = [];
		return function a(e, n) {
			for (var i = e.firstChild; i; i = i.nextSibling) {
				3 === i.nodeType ? n += i.nodeValue.length : 1 === i.nodeType && (t.push({
					event: "start",
					offset: n,
					node: i
				}), n = a(i, n), r(i).match(/br|hr|img|input/) || t.push({
					event: "stop",
					offset: n,
					node: i
				}))
			}
			return n
		}(e, 0), t
	}
	function o(e, a, n) {
		function i() {
			return e.length && a.length ? e[0].offset !== a[0].offset ? e[0].offset < a[0].offset ? e : a : "start" === a[0].event ? e : a : e.length ? e : a
		}
		function s(e) {
			function a(e) {
				return " " + e.nodeName + '="' + t(e.value).replace('"', "&quot;") + '"'
			}
			u += "<" + r(e) + k.map.call(e.attributes, a).join("") + ">"
		}
		function c(e) {
			u += "</" + r(e) + ">"
		}
		function o(e) {
			("start" === e.event ? s : c)(e.node)
		}
		for (var l = 0, u = "", d = []; e.length || a.length;) {
			var b = i();
			if (u += t(n.substring(l, b[0].offset)), l = b[0].offset, b === e) {
				d.reverse().forEach(c);
				do {
					o(b.splice(0, 1)[0]), b = i()
				} while (b === e && b.length && b[0].offset === l);
				d.reverse().forEach(s)
			} else {
				"start" === b[0].event ? d.push(b[0].node) : d.pop(), o(b.splice(0, 1)[0])
			}
		}
		return u + t(n.substr(l))
	}
	function l(e) {
		return e.v && !e.cached_variants && (e.cached_variants = e.v.map(function(t) {
			return s(e, {
				v: null
			}, t)
		})), e.cached_variants || e.eW && [s(e)] || [e]
	}
	function u(e) {
		function t(e) {
			return e && e.source || e
		}
		function r(r, a) {
			return new RegExp(t(r), "m" + (e.cI ? "i" : "") + (a ? "g" : ""))
		}
		function a(n, i) {
			if (!n.compiled) {
				if (n.compiled = !0, n.k = n.k || n.bK, n.k) {
					var s = {},
						c = function(t, r) {
							e.cI && (r = r.toLowerCase()), r.split(" ").forEach(function(e) {
								var r = e.split("|");
								s[r[0]] = [t, r[1] ? Number(r[1]) : 1]
							})
						};
					"string" == typeof n.k ? c("keyword", n.k) : x(n.k).forEach(function(e) {
						c(e, n.k[e])
					}), n.k = s
				}
				n.lR = r(n.l || /\w+/, !0), i && (n.bK && (n.b = "\\b(" + n.bK.split(" ").join("|") + ")\\b"), n.b || (n.b = /\B|\b/), n.bR = r(n.b), n.endSameAsBegin && (n.e = n.b), n.e || n.eW || (n.e = /\B|\b/), n.e && (n.eR = r(n.e)), n.tE = t(n.e) || "", n.eW && i.tE && (n.tE += (n.e ? "|" : "") + i.tE)), n.i && (n.iR = r(n.i)), null == n.r && (n.r = 1), n.c || (n.c = []), n.c = Array.prototype.concat.apply([], n.c.map(function(e) {
					return l("self" === e ? n : e)
				})), n.c.forEach(function(e) {
					a(e, n)
				}), n.starts && a(n.starts, i);
				var o = n.c.map(function(e) {
					return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
				}).concat([n.tE, n.i]).map(t).filter(Boolean);
				n.t = o.length ? r(o.join("|"), !0) : {
					exec: function() {
						return null
					}
				}
			}
		}
		a(e)
	}
	function d(e, r, n, i) {
		function s(e) {
			return new RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "m")
		}
		function c(e, t) {
			var r, n;
			for (r = 0, n = t.c.length; n > r; r++) {
				if (a(t.c[r].bR, e)) {
					return t.c[r].endSameAsBegin && (t.c[r].eR = s(t.c[r].bR.exec(e)[0])), t.c[r]
				}
			}
		}
		function o(e, t) {
			if (a(e.eR, t)) {
				for (; e.endsParent && e.parent;) {
					e = e.parent
				}
				return e
			}
			return e.eW ? o(e.parent, t) : void 0
		}
		function l(e, t) {
			return !n && a(t.iR, e)
		}
		function p(e, t) {
			var r = y.cI ? t[0].toLowerCase() : t[0];
			return e.k.hasOwnProperty(r) && e.k[r]
		}
		function m(e, t, r, a) {
			var n = a ? "" : S.classPrefix,
				i = '<span class="' + n,
				s = r ? "" : R;
			return i += e + '">', i + t + s
		}
		function f() {
			var e, r, a, n;
			if (!k.k) {
				return t(M)
			}
			for (n = "", r = 0, k.lR.lastIndex = 0, a = k.lR.exec(M); a;) {
				n += t(M.substring(r, a.index)), e = p(k, a), e ? (B += e[1], n += m(e[0], t(a[0]))) : n += t(a[0]), r = k.lR.lastIndex, a = k.lR.exec(M)
			}
			return n + t(M.substr(r))
		}
		function g() {
			var e = "string" == typeof k.sL;
			if (e && !E[k.sL]) {
				return t(M)
			}
			var r = e ? d(k.sL, M, !0, x[k.sL]) : b(M, k.sL.length ? k.sL : void 0);
			return k.r > 0 && (B += r.r), e && (x[k.sL] = r.top), m(r.language, r.value, !1, !0)
		}
		function _() {
			C += null != k.sL ? g() : f(), M = ""
		}
		function h(e) {
			C += e.cN ? m(e.cN, "", !0) : "", k = Object.create(e, {
				parent: {
					value: k
				}
			})
		}
		function v(e, t) {
			if (M += e, null == t) {
				return _(), 0
			}
			var r = c(t, k);
			if (r) {
				return r.skip ? M += t : (r.eB && (M += t), _(), r.rB || r.eB || (M = t)), h(r, t), r.rB ? 0 : t.length
			}
			var a = o(k, t);
			if (a) {
				var n = k;
				n.skip ? M += t : (n.rE || n.eE || (M += t), _(), n.eE && (M = t));
				do {
					k.cN && (C += R), k.skip || k.sL || (B += k.r), k = k.parent
				} while (k !== a.parent);
				return a.starts && (a.endSameAsBegin && (a.starts.eR = a.eR), h(a.starts, "")), n.rE ? 0 : t.length
			}
			if (l(t, k)) {
				throw new Error('Illegal lexeme "' + t + '" for mode "' + (k.cN || "<unnamed>") + '"')
			}
			return M += t, t.length || 1
		}
		var y = w(e);
		if (!y) {
			throw new Error('Unknown language: "' + e + '"')
		}
		u(y);
		var N, k = i || y,
			x = {},
			C = "";
		for (N = k; N !== y; N = N.parent) {
			N.cN && (C = m(N.cN, "", !0) + C)
		}
		var M = "",
			B = 0;
		try {
			for (var L, A, $ = 0;;) {
				if (k.t.lastIndex = $, L = k.t.exec(r), !L) {
					break
				}
				A = v(r.substring($, L.index), L[0]), $ = L.index + A
			}
			for (v(r.substr($)), N = k; N.parent; N = N.parent) {
				N.cN && (C += R)
			}
			return {
				r: B,
				value: C,
				language: e,
				top: k
			}
		} catch (I) {
			if (I.message && -1 !== I.message.indexOf("Illegal")) {
				return {
					r: 0,
					value: t(r)
				}
			}
			throw I
		}
	}
	function b(e, r) {
		r = r || S.languages || x(E);
		var a = {
			r: 0,
			value: t(e)
		},
			n = a;
		return r.filter(w).filter(N).forEach(function(t) {
			var r = d(t, e, !1);
			r.language = t, r.r > n.r && (n = r), r.r > a.r && (n = a, a = r)
		}), n.language && (a.second_best = n), a
	}
	function p(e) {
		return S.tabReplace || S.useBR ? e.replace(L, function(e, t) {
			return S.useBR && "\n" === e ? "<br>" : S.tabReplace ? t.replace(/\t/g, S.tabReplace) : ""
		}) : e
	}
	function m(e, t, r) {
		var a = t ? C[t] : r,
			n = [e.trim()];
		return e.match(/\bhljs\b/) || n.push("hljs"), -1 === e.indexOf(a) && n.push(a), n.join(" ").trim()
	}
	function f(e) {
		var t, r, a, s, l, u = i(e);
		n(u) || (S.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e, l = t.textContent, a = u ? d(u, l, !0) : b(l), r = c(t), r.length && (s = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), s.innerHTML = a.value, a.value = o(r, c(s), l)), a.value = p(a.value), e.innerHTML = a.value, e.className = m(e.className, u, a.language), e.result = {
			language: a.language,
			re: a.r
		}, a.second_best && (e.second_best = {
			language: a.second_best.language,
			re: a.second_best.r
		}))
	}
	function g(e) {
		S = s(S, e)
	}
	function _() {
		if (!_.called) {
			_.called = !0;
			var e = document.querySelectorAll("pre code");
			k.forEach.call(e, f)
		}
	}
	function h() {
		addEventListener("DOMContentLoaded", _, !1), addEventListener("load", _, !1)
	}
	function v(t, r) {
		var a = E[t] = r(e);
		a.aliases && a.aliases.forEach(function(e) {
			C[e] = t
		})
	}
	function y() {
		return x(E)
	}
	function w(e) {
		return e = (e || "").toLowerCase(), E[e] || E[C[e]]
	}
	function N(e) {
		var t = w(e);
		return t && !t.disableAutodetect
	}
	var k = [],
		x = Object.keys,
		E = {},
		C = {},
		M = /^(no-?highlight|plain|text)$/i,
		B = /\blang(?:uage)?-([\w-]+)\b/i,
		L = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
		R = "</span>",
		S = {
			classPrefix: "hljs-",
			tabReplace: null,
			useBR: !1,
			languages: void 0
		};
	return e.highlight = d, e.highlightAuto = b, e.fixMarkup = p, e.highlightBlock = f, e.configure = g, e.initHighlighting = _, e.initHighlightingOnLoad = h, e.registerLanguage = v, e.listLanguages = y, e.getLanguage = w, e.autoDetection = N, e.inherit = s, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
		b: "\\\\[\\s\\S]",
		r: 0
	}, e.ASM = {
		cN: "string",
		b: "'",
		e: "'",
		i: "\\n",
		c: [e.BE]
	}, e.QSM = {
		cN: "string",
		b: '"',
		e: '"',
		i: "\\n",
		c: [e.BE]
	}, e.PWM = {
		b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
	}, e.C = function(t, r, a) {
		var n = e.inherit({
			cN: "comment",
			b: t,
			e: r,
			c: []
		}, a || {});
		return n.c.push(e.PWM), n.c.push({
			cN: "doctag",
			b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
			r: 0
		}), n
	}, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
		cN: "number",
		b: e.NR,
		r: 0
	}, e.CNM = {
		cN: "number",
		b: e.CNR,
		r: 0
	}, e.BNM = {
		cN: "number",
		b: e.BNR,
		r: 0
	}, e.CSSNM = {
		cN: "number",
		b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
		r: 0
	}, e.RM = {
		cN: "regexp",
		b: /\//,
		e: /\/[gimuy]*/,
		i: /\n/,
		c: [e.BE,
		{
			b: /\[/,
			e: /\]/,
			r: 0,
			c: [e.BE]
		}]
	}, e.TM = {
		cN: "title",
		b: e.IR,
		r: 0
	}, e.UTM = {
		cN: "title",
		b: e.UIR,
		r: 0
	}, e.METHOD_GUARD = {
		b: "\\.\\s*" + e.UIR,
		r: 0
	}, e.registerLanguage("apache", function(e) {
		var t = {
			cN: "number",
			b: "[\\$%]\\d+"
		};
		return {
			aliases: ["apacheconf"],
			cI: !0,
			c: [e.HCM,
			{
				cN: "section",
				b: "</?",
				e: ">"
			}, {
				cN: "attribute",
				b: /\w+/,
				r: 0,
				k: {
					nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
				},
				starts: {
					e: /$/,
					r: 0,
					k: {
						literal: "on off all"
					},
					c: [{
						cN: "meta",
						b: "\\s\\[",
						e: "\\]$"
					}, {
						cN: "variable",
						b: "[\\$%]\\{",
						e: "\\}",
						c: ["self", t]
					},
					t, e.QSM]
				}
			}],
			i: /\S/
		}
	}), e.registerLanguage("bash", function(e) {
		var t = {
			cN: "variable",
			v: [{
				b: /\$[\w\d#@][\w\d_]*/
			}, {
				b: /\$\{(.*?)}/
			}]
		},
			r = {
				cN: "string",
				b: /"/,
				e: /"/,
				c: [e.BE, t,
				{
					cN: "variable",
					b: /\$\(/,
					e: /\)/,
					c: [e.BE]
				}]
			},
			a = {
				cN: "string",
				b: /'/,
				e: /'/
			};
		return {
			aliases: ["sh", "zsh"],
			l: /\b-?[a-z\._]+\b/,
			k: {
				keyword: "if then else elif fi for while in do done case esac function",
				literal: "true false",
				built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
				_: "-ne -eq -lt -gt -f -d -e -s -l -a"
			},
			c: [{
				cN: "meta",
				b: /^#![^\n]+sh\s*$/,
				r: 10
			}, {
				cN: "function",
				b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
				rB: !0,
				c: [e.inherit(e.TM, {
					b: /\w[\w\d_]*/
				})],
				r: 0
			},
			e.HCM, r, a, t]
		}
	}), e.registerLanguage("coffeescript", function(e) {
		var t = {
			keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super yield import export from as default await then unless until loop of by when and or is isnt not",
			literal: "true false null undefined yes no on off",
			built_in: "npm require console print module global window document"
		},
			r = "[A-Za-z$_][0-9A-Za-z$_]*",
			a = {
				cN: "subst",
				b: /#\{/,
				e: /}/,
				k: t
			},
			n = [e.BNM, e.inherit(e.CNM, {
				starts: {
					e: "(\\s*/)?",
					r: 0
				}
			}),
			{
				cN: "string",
				v: [{
					b: /'''/,
					e: /'''/,
					c: [e.BE]
				}, {
					b: /'/,
					e: /'/,
					c: [e.BE]
				}, {
					b: /"""/,
					e: /"""/,
					c: [e.BE, a]
				}, {
					b: /"/,
					e: /"/,
					c: [e.BE, a]
				}]
			}, {
				cN: "regexp",
				v: [{
					b: "///",
					e: "///",
					c: [a, e.HCM]
				}, {
					b: "//[gim]*",
					r: 0
				}, {
					b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
				}]
			}, {
				b: "@" + r
			}, {
				sL: "javascript",
				eB: !0,
				eE: !0,
				v: [{
					b: "```",
					e: "```"
				}, {
					b: "`",
					e: "`"
				}]
			}];
		a.c = n;
		var i = e.inherit(e.TM, {
			b: r
		}),
			s = "(\\(.*\\))?\\s*\\B[-=]>",
			c = {
				cN: "params",
				b: "\\([^\\(]",
				rB: !0,
				c: [{
					b: /\(/,
					e: /\)/,
					k: t,
					c: ["self"].concat(n)
				}]
			};
		return {
			aliases: ["coffee", "cson", "iced"],
			k: t,
			i: /\/\*/,
			c: n.concat([e.C("###", "###"), e.HCM,
			{
				cN: "function",
				b: "^\\s*" + r + "\\s*=\\s*" + s,
				e: "[-=]>",
				rB: !0,
				c: [i, c]
			}, {
				b: /[:\(,=]\s*/,
				r: 0,
				c: [{
					cN: "function",
					b: s,
					e: "[-=]>",
					rB: !0,
					c: [c]
				}]
			}, {
				cN: "class",
				bK: "class",
				e: "$",
				i: /[:="\[\]]/,
				c: [{
					bK: "extends",
					eW: !0,
					i: /[:="\[\]]/,
					c: [i]
				},
				i]
			}, {
				b: r + ":",
				e: ":",
				rB: !0,
				rE: !0,
				r: 0
			}])
		}
	}), e.registerLanguage("cpp", function(e) {
		var t = {
			cN: "keyword",
			b: "\\b[a-z\\d_]*_t\\b"
		},
			r = {
				cN: "string",
				v: [{
					b: '(u8?|U|L)?"',
					e: '"',
					i: "\\n",
					c: [e.BE]
				}, {
					b: '(u8?|U|L)?R"\\(',
					e: '\\)"'
				}, {
					b: "'\\\\?.",
					e: "'",
					i: "."
				}]
			},
			a = {
				cN: "number",
				v: [{
					b: "\\b(0b[01']+)"
				}, {
					b: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
				}, {
					b: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
				}],
				r: 0
			},
			n = {
				cN: "meta",
				b: /#\s*[a-z]+\b/,
				e: /$/,
				k: {
					"meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
				},
				c: [{
					b: /\\\n/,
					r: 0
				},
				e.inherit(r, {
					cN: "meta-string"
				}),
				{
					cN: "meta-string",
					b: /<[^\n>]*>/,
					e: /$/,
					i: "\\n"
				},
				e.CLCM, e.CBCM]
			},
			i = e.IR + "\\s*\\(",
			s = {
				keyword: "int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not",
				built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
				literal: "true false nullptr NULL"
			},
			c = [t, e.CLCM, e.CBCM, a, r];
		return {
			aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
			k: s,
			i: "</",
			c: c.concat([n,
			{
				b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
				e: ">",
				k: s,
				c: ["self", t]
			}, {
				b: e.IR + "::",
				k: s
			}, {
				v: [{
					b: /=/,
					e: /;/
				}, {
					b: /\(/,
					e: /\)/
				}, {
					bK: "new throw return else",
					e: /;/
				}],
				k: s,
				c: c.concat([{
					b: /\(/,
					e: /\)/,
					k: s,
					c: c.concat(["self"]),
					r: 0
				}]),
				r: 0
			}, {
				cN: "function",
				b: "(" + e.IR + "[\\*&\\s]+)+" + i,
				rB: !0,
				e: /[{;=]/,
				eE: !0,
				k: s,
				i: /[^\w\s\*&]/,
				c: [{
					b: i,
					rB: !0,
					c: [e.TM],
					r: 0
				}, {
					cN: "params",
					b: /\(/,
					e: /\)/,
					k: s,
					r: 0,
					c: [e.CLCM, e.CBCM, r, a, t,
					{
						b: /\(/,
						e: /\)/,
						k: s,
						r: 0,
						c: ["self", e.CLCM, e.CBCM, r, a, t]
					}]
				},
				e.CLCM, e.CBCM, n]
			}, {
				cN: "class",
				bK: "class struct",
				e: /[{;:]/,
				c: [{
					b: /</,
					e: />/,
					c: ["self"]
				},
				e.TM]
			}]),
			exports: {
				preprocessor: n,
				strings: r,
				k: s
			}
		}
	}), e.registerLanguage("cs", function(e) {
		var t = {
			keyword: "abstract as base bool break byte case catch char checked const continue decimal default delegate do double enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long nameof object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield",
			literal: "null false true"
		},
			r = {
				cN: "number",
				v: [{
					b: "\\b(0b[01']+)"
				}, {
					b: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
				}, {
					b: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
				}],
				r: 0
			},
			a = {
				cN: "string",
				b: '@"',
				e: '"',
				c: [{
					b: '""'
				}]
			},
			n = e.inherit(a, {
				i: /\n/
			}),
			i = {
				cN: "subst",
				b: "{",
				e: "}",
				k: t
			},
			s = e.inherit(i, {
				i: /\n/
			}),
			c = {
				cN: "string",
				b: /\$"/,
				e: '"',
				i: /\n/,
				c: [{
					b: "{{"
				}, {
					b: "}}"
				},
				e.BE, s]
			},
			o = {
				cN: "string",
				b: /\$@"/,
				e: '"',
				c: [{
					b: "{{"
				}, {
					b: "}}"
				}, {
					b: '""'
				},
				i]
			},
			l = e.inherit(o, {
				i: /\n/,
				c: [{
					b: "{{"
				}, {
					b: "}}"
				}, {
					b: '""'
				},
				s]
			});
		i.c = [o, c, a, e.ASM, e.QSM, r, e.CBCM], s.c = [l, c, n, e.ASM, e.QSM, r, e.inherit(e.CBCM, {
			i: /\n/
		})];
		var u = {
			v: [o, c, a, e.ASM, e.QSM]
		},
			d = e.IR + "(<" + e.IR + "(\\s*,\\s*" + e.IR + ")*>)?(\\[\\])?";
		return {
			aliases: ["csharp"],
			k: t,
			i: /::/,
			c: [e.C("///", "$", {
				rB: !0,
				c: [{
					cN: "doctag",
					v: [{
						b: "///",
						r: 0
					}, {
						b: "<!--|-->"
					}, {
						b: "</?",
						e: ">"
					}]
				}]
			}), e.CLCM, e.CBCM,
			{
				cN: "meta",
				b: "#",
				e: "$",
				k: {
					"meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
				}
			},
			u, r,
			{
				bK: "class interface",
				e: /[{;=]/,
				i: /[^\s:,]/,
				c: [e.TM, e.CLCM, e.CBCM]
			}, {
				bK: "namespace",
				e: /[{;=]/,
				i: /[^\s:]/,
				c: [e.inherit(e.TM, {
					b: "[a-zA-Z](\\.?\\w)*"
				}), e.CLCM, e.CBCM]
			}, {
				cN: "meta",
				b: "^\\s*\\[",
				eB: !0,
				e: "\\]",
				eE: !0,
				c: [{
					cN: "meta-string",
					b: /"/,
					e: /"/
				}]
			}, {
				bK: "new return throw await else",
				r: 0
			}, {
				cN: "function",
				b: "(" + d + "\\s+)+" + e.IR + "\\s*\\(",
				rB: !0,
				e: /\s*[{;=]/,
				eE: !0,
				k: t,
				c: [{
					b: e.IR + "\\s*\\(",
					rB: !0,
					c: [e.TM],
					r: 0
				}, {
					cN: "params",
					b: /\(/,
					e: /\)/,
					eB: !0,
					eE: !0,
					k: t,
					r: 0,
					c: [u, r, e.CBCM]
				},
				e.CLCM, e.CBCM]
			}]
		}
	}), e.registerLanguage("css", function(e) {
		var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
			r = {
				b: /[A-Z\_\.\-]+\s*:/,
				rB: !0,
				e: ";",
				eW: !0,
				c: [{
					cN: "attribute",
					b: /\S/,
					e: ":",
					eE: !0,
					starts: {
						eW: !0,
						eE: !0,
						c: [{
							b: /[\w-]+\(/,
							rB: !0,
							c: [{
								cN: "built_in",
								b: /[\w-]+/
							}, {
								b: /\(/,
								e: /\)/,
								c: [e.ASM, e.QSM]
							}]
						},
						e.CSSNM, e.QSM, e.ASM, e.CBCM,
						{
							cN: "number",
							b: "#[0-9A-Fa-f]+"
						}, {
							cN: "meta",
							b: "!important"
						}]
					}
				}]
			};
		return {
			cI: !0,
			i: /[=\/|'\$]/,
			c: [e.CBCM,
			{
				cN: "selector-id",
				b: /#[A-Za-z0-9_-]+/
			}, {
				cN: "selector-class",
				b: /\.[A-Za-z0-9_-]+/
			}, {
				cN: "selector-attr",
				b: /\[/,
				e: /\]/,
				i: "$"
			}, {
				cN: "selector-pseudo",
				b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
			}, {
				b: "@(font-face|page)",
				l: "[a-z-]+",
				k: "font-face page"
			}, {
				b: "@",
				e: "[{;]",
				i: /:/,
				c: [{
					cN: "keyword",
					b: /\w+/
				}, {
					b: /\s/,
					eW: !0,
					eE: !0,
					r: 0,
					c: [e.ASM, e.QSM, e.CSSNM]
				}]
			}, {
				cN: "selector-tag",
				b: t,
				r: 0
			}, {
				b: "{",
				e: "}",
				i: /\S/,
				c: [e.CBCM, r]
			}]
		}
	}), e.registerLanguage("diff", function(e) {
		return {
			aliases: ["patch"],
			c: [{
				cN: "meta",
				r: 10,
				v: [{
					b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
				}, {
					b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
				}, {
					b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
				}]
			}, {
				cN: "comment",
				v: [{
					b: /Index: /,
					e: /$/
				}, {
					b: /={3,}/,
					e: /$/
				}, {
					b: /^\-{3}/,
					e: /$/
				}, {
					b: /^\*{3} /,
					e: /$/
				}, {
					b: /^\+{3}/,
					e: /$/
				}, {
					b: /\*{5}/,
					e: /\*{5}$/
				}]
			}, {
				cN: "addition",
				b: "^\\+",
				e: "$"
			}, {
				cN: "deletion",
				b: "^\\-",
				e: "$"
			}, {
				cN: "addition",
				b: "^\\!",
				e: "$"
			}]
		}
	}), e.registerLanguage("http", function(e) {
		var t = "HTTP/[0-9\\.]+";
		return {
			aliases: ["https"],
			i: "\\S",
			c: [{
				b: "^" + t,
				e: "$",
				c: [{
					cN: "number",
					b: "\\b\\d{3}\\b"
				}]
			}, {
				b: "^[A-Z]+ (.*?) " + t + "$",
				rB: !0,
				e: "$",
				c: [{
					cN: "string",
					b: " ",
					e: " ",
					eB: !0,
					eE: !0
				}, {
					b: t
				}, {
					cN: "keyword",
					b: "[A-Z]+"
				}]
			}, {
				cN: "attribute",
				b: "^\\w",
				e: ": ",
				eE: !0,
				i: "\\n|\\s|=",
				starts: {
					e: "$",
					r: 0
				}
			}, {
				b: "\\n\\n",
				starts: {
					sL: [],
					eW: !0
				}
			}]
		}
	}), e.registerLanguage("ini", function(e) {
		var t = {
			cN: "string",
			c: [e.BE],
			v: [{
				b: "'''",
				e: "'''",
				r: 10
			}, {
				b: '"""',
				e: '"""',
				r: 10
			}, {
				b: '"',
				e: '"'
			}, {
				b: "'",
				e: "'"
			}]
		};
		return {
			aliases: ["toml"],
			cI: !0,
			i: /\S/,
			c: [e.C(";", "$"), e.HCM,
			{
				cN: "section",
				b: /^\s*\[+/,
				e: /\]+/
			}, {
				b: /^[a-z0-9\[\]_-]+\s*=\s*/,
				e: "$",
				rB: !0,
				c: [{
					cN: "attr",
					b: /[a-z0-9\[\]_-]+/
				}, {
					b: /=/,
					eW: !0,
					r: 0,
					c: [{
						cN: "literal",
						b: /\bon|off|true|false|yes|no\b/
					}, {
						cN: "variable",
						v: [{
							b: /\$[\w\d"][\w\d_]*/
						}, {
							b: /\$\{(.*?)}/
						}]
					},
					t,
					{
						cN: "number",
						b: /([\+\-]+)?[\d]+_[\d_]+/
					},
					e.NM]
				}]
			}]
		}
	}), e.registerLanguage("java", function(e) {
		var t = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",
			r = t + "(<" + t + "(\\s*,\\s*" + t + ")*>)?",
			a = "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",
			n = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
			i = {
				cN: "number",
				b: n,
				r: 0
			};
		return {
			aliases: ["jsp"],
			k: a,
			i: /<\/|#/,
			c: [e.C("/\\*\\*", "\\*/", {
				r: 0,
				c: [{
					b: /\w+@/,
					r: 0
				}, {
					cN: "doctag",
					b: "@[A-Za-z]+"
				}]
			}), e.CLCM, e.CBCM, e.ASM, e.QSM,
			{
				cN: "class",
				bK: "class interface",
				e: /[{;=]/,
				eE: !0,
				k: "class interface",
				i: /[:"\[\]]/,
				c: [{
					bK: "extends implements"
				},
				e.UTM]
			}, {
				bK: "new throw return else",
				r: 0
			}, {
				cN: "function",
				b: "(" + r + "\\s+)+" + e.UIR + "\\s*\\(",
				rB: !0,
				e: /[{;=]/,
				eE: !0,
				k: a,
				c: [{
					b: e.UIR + "\\s*\\(",
					rB: !0,
					r: 0,
					c: [e.UTM]
				}, {
					cN: "params",
					b: /\(/,
					e: /\)/,
					k: a,
					r: 0,
					c: [e.ASM, e.QSM, e.CNM, e.CBCM]
				},
				e.CLCM, e.CBCM]
			},
			i,
			{
				cN: "meta",
				b: "@[A-Za-z]+"
			}]
		}
	}), e.registerLanguage("javascript", function(e) {
		var t = "[A-Za-z$_][0-9A-Za-z$_]*",
			r = {
				keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
				literal: "true false null undefined NaN Infinity",
				built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
			},
			a = {
				cN: "number",
				v: [{
					b: "\\b(0[bB][01]+)"
				}, {
					b: "\\b(0[oO][0-7]+)"
				}, {
					b: e.CNR
				}],
				r: 0
			},
			n = {
				cN: "subst",
				b: "\\$\\{",
				e: "\\}",
				k: r,
				c: []
			},
			i = {
				cN: "string",
				b: "`",
				e: "`",
				c: [e.BE, n]
			};
		n.c = [e.ASM, e.QSM, i, a, e.RM];
		var s = n.c.concat([e.CBCM, e.CLCM]);
		return {
			aliases: ["js", "jsx"],
			k: r,
			c: [{
				cN: "meta",
				r: 10,
				b: /^\s*['"]use (strict|asm)['"]/
			}, {
				cN: "meta",
				b: /^#!/,
				e: /$/
			},
			e.ASM, e.QSM, i, e.CLCM, e.CBCM, a,
			{
				b: /[{,]\s*/,
				r: 0,
				c: [{
					b: t + "\\s*:",
					rB: !0,
					r: 0,
					c: [{
						cN: "attr",
						b: t,
						r: 0
					}]
				}]
			}, {
				b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
				k: "return throw case",
				c: [e.CLCM, e.CBCM, e.RM,
				{
					cN: "function",
					b: "(\\(.*?\\)|" + t + ")\\s*=>",
					rB: !0,
					e: "\\s*=>",
					c: [{
						cN: "params",
						v: [{
							b: t
						}, {
							b: /\(\s*\)/
						}, {
							b: /\(/,
							e: /\)/,
							eB: !0,
							eE: !0,
							k: r,
							c: s
						}]
					}]
				}, {
					b: /</,
					e: /(\/\w+|\w+\/)>/,
					sL: "xml",
					c: [{
						b: /<\w+\s*\/>/,
						skip: !0
					}, {
						b: /<\w+/,
						e: /(\/\w+|\w+\/)>/,
						skip: !0,
						c: [{
							b: /<\w+\s*\/>/,
							skip: !0
						}, "self"]
					}]
				}],
				r: 0
			}, {
				cN: "function",
				bK: "function",
				e: /\{/,
				eE: !0,
				c: [e.inherit(e.TM, {
					b: t
				}),
				{
					cN: "params",
					b: /\(/,
					e: /\)/,
					eB: !0,
					eE: !0,
					c: s
				}],
				i: /\[|%/
			}, {
				b: /\$[(.]/
			},
			e.METHOD_GUARD,
			{
				cN: "class",
				bK: "class",
				e: /[{;=]/,
				eE: !0,
				i: /[:"\[\]]/,
				c: [{
					bK: "extends"
				},
				e.UTM]
			}, {
				bK: "constructor",
				e: /\{/,
				eE: !0
			}],
			i: /#(?!!)/
		}
	}), e.registerLanguage("json", function(e) {
		var t = {
			literal: "true false null"
		},
			r = [e.QSM, e.CNM],
			a = {
				e: ",",
				eW: !0,
				eE: !0,
				c: r,
				k: t
			},
			n = {
				b: "{",
				e: "}",
				c: [{
					cN: "attr",
					b: /"/,
					e: /"/,
					c: [e.BE],
					i: "\\n"
				},
				e.inherit(a, {
					b: /:/
				})],
				i: "\\S"
			},
			i = {
				b: "\\[",
				e: "\\]",
				c: [e.inherit(a)],
				i: "\\S"
			};
		return r.splice(r.length, 0, n, i), {
			c: r,
			k: t,
			i: "\\S"
		}
	}), e.registerLanguage("makefile", function(e) {
		var t = {
			cN: "variable",
			v: [{
				b: "\\$\\(" + e.UIR + "\\)",
				c: [e.BE]
			}, {
				b: /\$[@%<?\^\+\*]/
			}]
		},
			r = {
				cN: "string",
				b: /"/,
				e: /"/,
				c: [e.BE, t]
			},
			a = {
				cN: "variable",
				b: /\$\([\w-]+\s/,
				e: /\)/,
				k: {
					built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
				},
				c: [t]
			},
			n = {
				b: "^" + e.UIR + "\\s*[:+?]?=",
				i: "\\n",
				rB: !0,
				c: [{
					b: "^" + e.UIR,
					e: "[:+?]?=",
					eE: !0
				}]
			},
			i = {
				cN: "meta",
				b: /^\.PHONY:/,
				e: /$/,
				k: {
					"meta-keyword": ".PHONY"
				},
				l: /[\.\w]+/
			},
			s = {
				cN: "section",
				b: /^[^\s]+:/,
				e: /$/,
				c: [t]
			};
		return {
			aliases: ["mk", "mak"],
			k: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath",
			l: /[\w-]+/,
			c: [e.HCM, t, r, a, n, i, s]
		}
	}), e.registerLanguage("xml", function(e) {
		var t = "[A-Za-z0-9\\._:-]+",
			r = {
				eW: !0,
				i: /</,
				r: 0,
				c: [{
					cN: "attr",
					b: t,
					r: 0
				}, {
					b: /=\s*/,
					r: 0,
					c: [{
						cN: "string",
						endsParent: !0,
						v: [{
							b: /"/,
							e: /"/
						}, {
							b: /'/,
							e: /'/
						}, {
							b: /[^\s"'=<>`]+/
						}]
					}]
				}]
			};
		return {
			aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist"],
			cI: !0,
			c: [{
				cN: "meta",
				b: "<!DOCTYPE",
				e: ">",
				r: 10,
				c: [{
					b: "\\[",
					e: "\\]"
				}]
			},
			e.C("<!--", "-->", {
				r: 10
			}),
			{
				b: "<\\!\\[CDATA\\[",
				e: "\\]\\]>",
				r: 10
			}, {
				cN: "meta",
				b: /<\?xml/,
				e: /\?>/,
				r: 10
			}, {
				b: /<\?(php)?/,
				e: /\?>/,
				sL: "php",
				c: [{
					b: "/\\*",
					e: "\\*/",
					skip: !0
				}, {
					b: 'b"',
					e: '"',
					skip: !0
				}, {
					b: "b'",
					e: "'",
					skip: !0
				},
				e.inherit(e.ASM, {
					i: null,
					cN: null,
					c: null,
					skip: !0
				}), e.inherit(e.QSM, {
					i: null,
					cN: null,
					c: null,
					skip: !0
				})]
			}, {
				cN: "tag",
				b: "<style(?=\\s|>|$)",
				e: ">",
				k: {
					name: "style"
				},
				c: [r],
				starts: {
					e: "</style>",
					rE: !0,
					sL: ["css", "xml"]
				}
			}, {
				cN: "tag",
				b: "<script(?=\\s|>|$)",
				e: ">",
				k: {
					name: "script"
				},
				c: [r],
				starts: {
					e: "<\/script>",
					rE: !0,
					sL: ["actionscript", "javascript", "handlebars", "xml"]
				}
			}, {
				cN: "tag",
				b: "</?",
				e: "/?>",
				c: [{
					cN: "name",
					b: /[^\/><\s]+/,
					r: 0
				},
				r]
			}]
		}
	}), e.registerLanguage("markdown", function(e) {
		return {
			aliases: ["md", "mkdown", "mkd"],
			c: [{
				cN: "section",
				v: [{
					b: "^#{1,6}",
					e: "$"
				}, {
					b: "^.+?\\n[=-]{2,}$"
				}]
			}, {
				b: "<",
				e: ">",
				sL: "xml",
				r: 0
			}, {
				cN: "bullet",
				b: "^([*+-]|(\\d+\\.))\\s+"
			}, {
				cN: "strong",
				b: "[*_]{2}.+?[*_]{2}"
			}, {
				cN: "emphasis",
				v: [{
					b: "\\*.+?\\*"
				}, {
					b: "_.+?_",
					r: 0
				}]
			}, {
				cN: "quote",
				b: "^>\\s+",
				e: "$"
			}, {
				cN: "code",
				v: [{
					b: "^```w*s*$",
					e: "^```s*$"
				}, {
					b: "`.+?`"
				}, {
					b: "^( {4}|	)",
					e: "$",
					r: 0
				}]
			}, {
				b: "^[-\\*]{3,}",
				e: "$"
			}, {
				b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
				rB: !0,
				c: [{
					cN: "string",
					b: "\\[",
					e: "\\]",
					eB: !0,
					rE: !0,
					r: 0
				}, {
					cN: "link",
					b: "\\]\\(",
					e: "\\)",
					eB: !0,
					eE: !0
				}, {
					cN: "symbol",
					b: "\\]\\[",
					e: "\\]",
					eB: !0,
					eE: !0
				}],
				r: 10
			}, {
				b: /^\[[^\n]+\]:/,
				rB: !0,
				c: [{
					cN: "symbol",
					b: /\[/,
					e: /\]/,
					eB: !0,
					eE: !0
				}, {
					cN: "link",
					b: /:\s*/,
					e: /$/,
					eB: !0
				}]
			}]
		}
	}), e.registerLanguage("nginx", function(e) {
		var t = {
			cN: "variable",
			v: [{
				b: /\$\d+/
			}, {
				b: /\$\{/,
				e: /}/
			}, {
				b: "[\\$\\@]" + e.UIR
			}]
		},
			r = {
				eW: !0,
				l: "[a-z/_]+",
				k: {
					literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
				},
				r: 0,
				i: "=>",
				c: [e.HCM,
				{
					cN: "string",
					c: [e.BE, t],
					v: [{
						b: /"/,
						e: /"/
					}, {
						b: /'/,
						e: /'/
					}]
				}, {
					b: "([a-z]+):/",
					e: "\\s",
					eW: !0,
					eE: !0,
					c: [t]
				}, {
					cN: "regexp",
					c: [e.BE, t],
					v: [{
						b: "\\s\\^",
						e: "\\s|{|;",
						rE: !0
					}, {
						b: "~\\*?\\s+",
						e: "\\s|{|;",
						rE: !0
					}, {
						b: "\\*(\\.[a-z\\-]+)+"
					}, {
						b: "([a-z\\-]+\\.)+\\*"
					}]
				}, {
					cN: "number",
					b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
				}, {
					cN: "number",
					b: "\\b\\d+[kKmMgGdshdwy]*\\b",
					r: 0
				},
				t]
			};
		return {
			aliases: ["nginxconf"],
			c: [e.HCM,
			{
				b: e.UIR + "\\s+{",
				rB: !0,
				e: "{",
				c: [{
					cN: "section",
					b: e.UIR
				}],
				r: 0
			}, {
				b: e.UIR + "\\s",
				e: ";|{",
				rB: !0,
				c: [{
					cN: "attribute",
					b: e.UIR,
					starts: r
				}],
				r: 0
			}],
			i: "[^\\s\\}]"
		}
	}), e.registerLanguage("objectivec", function(e) {
		var t = {
			cN: "built_in",
			b: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
		},
			r = {
				keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
				literal: "false true FALSE TRUE nil YES NO NULL",
				built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
			},
			a = /[a-zA-Z@][a-zA-Z0-9_]*/,
			n = "@interface @class @protocol @implementation";
		return {
			aliases: ["mm", "objc", "obj-c"],
			k: r,
			l: a,
			i: "</",
			c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM,
			{
				cN: "string",
				v: [{
					b: '@"',
					e: '"',
					i: "\\n",
					c: [e.BE]
				}, {
					b: "'",
					e: "[^\\\\]'",
					i: "[^\\\\][^']"
				}]
			}, {
				cN: "meta",
				b: "#",
				e: "$",
				c: [{
					cN: "meta-string",
					v: [{
						b: '"',
						e: '"'
					}, {
						b: "<",
						e: ">"
					}]
				}]
			}, {
				cN: "class",
				b: "(" + n.split(" ").join("|") + ")\\b",
				e: "({|$)",
				eE: !0,
				k: n,
				l: a,
				c: [e.UTM]
			}, {
				b: "\\." + e.UIR,
				r: 0
			}]
		}
	}), e.registerLanguage("perl", function(e) {
		var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
			r = {
				cN: "subst",
				b: "[$@]\\{",
				e: "\\}",
				k: t
			},
			a = {
				b: "->{",
				e: "}"
			},
			n = {
				v: [{
					b: /\$\d/
				}, {
					b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
				}, {
					b: /[\$%@][^\s\w{]/,
					r: 0
				}]
			},
			i = [e.BE, r, n],
			s = [n, e.HCM, e.C("^\\=\\w", "\\=cut", {
				eW: !0
			}), a,
			{
				cN: "string",
				c: i,
				v: [{
					b: "q[qwxr]?\\s*\\(",
					e: "\\)",
					r: 5
				}, {
					b: "q[qwxr]?\\s*\\[",
					e: "\\]",
					r: 5
				}, {
					b: "q[qwxr]?\\s*\\{",
					e: "\\}",
					r: 5
				}, {
					b: "q[qwxr]?\\s*\\|",
					e: "\\|",
					r: 5
				}, {
					b: "q[qwxr]?\\s*\\<",
					e: "\\>",
					r: 5
				}, {
					b: "qw\\s+q",
					e: "q",
					r: 5
				}, {
					b: "'",
					e: "'",
					c: [e.BE]
				}, {
					b: '"',
					e: '"'
				}, {
					b: "`",
					e: "`",
					c: [e.BE]
				}, {
					b: "{\\w+}",
					c: [],
					r: 0
				}, {
					b: "-?\\w+\\s*\\=\\>",
					c: [],
					r: 0
				}]
			}, {
				cN: "number",
				b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
				r: 0
			}, {
				b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
				k: "split return print reverse grep",
				r: 0,
				c: [e.HCM,
				{
					cN: "regexp",
					b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
					r: 10
				}, {
					cN: "regexp",
					b: "(m|qr)?/",
					e: "/[a-z]*",
					c: [e.BE],
					r: 0
				}]
			}, {
				cN: "function",
				bK: "sub",
				e: "(\\s*\\(.*?\\))?[;{]",
				eE: !0,
				r: 5,
				c: [e.TM]
			}, {
				b: "-\\w\\b",
				r: 0
			}, {
				b: "^__DATA__$",
				e: "^__END__$",
				sL: "mojolicious",
				c: [{
					b: "^@@.*",
					e: "$",
					cN: "comment"
				}]
			}];
		return r.c = s, a.c = s, {
			aliases: ["pl", "pm"],
			l: /[\w\.]+/,
			k: t,
			c: s
		}
	}), e.registerLanguage("php", function(e) {
		var t = {
			b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
		},
			r = {
				cN: "meta",
				b: /<\?(php)?|\?>/
			},
			a = {
				cN: "string",
				c: [e.BE, r],
				v: [{
					b: 'b"',
					e: '"'
				}, {
					b: "b'",
					e: "'"
				},
				e.inherit(e.ASM, {
					i: null
				}), e.inherit(e.QSM, {
					i: null
				})]
			},
			n = {
				v: [e.BNM, e.CNM]
			};
		return {
			aliases: ["php", "php3", "php4", "php5", "php6", "php7"],
			cI: !0,
			k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
			c: [e.HCM, e.C("//", "$", {
				c: [r]
			}), e.C("/\\*", "\\*/", {
				c: [{
					cN: "doctag",
					b: "@[A-Za-z]+"
				}]
			}), e.C("__halt_compiler.+?;", !1, {
				eW: !0,
				k: "__halt_compiler",
				l: e.UIR
			}),
			{
				cN: "string",
				b: /<<<['"]?\w+['"]?$/,
				e: /^\w+;?$/,
				c: [e.BE,
				{
					cN: "subst",
					v: [{
						b: /\$\w+/
					}, {
						b: /\{\$/,
						e: /\}/
					}]
				}]
			},
			r,
			{
				cN: "keyword",
				b: /\$this\b/
			},
			t,
			{
				b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
			}, {
				cN: "function",
				bK: "function",
				e: /[;{]/,
				eE: !0,
				i: "\\$|\\[|%",
				c: [e.UTM,
				{
					cN: "params",
					b: "\\(",
					e: "\\)",
					c: ["self", t, e.CBCM, a, n]
				}]
			}, {
				cN: "class",
				bK: "class interface",
				e: "{",
				eE: !0,
				i: /[:\(\$"]/,
				c: [{
					bK: "extends implements"
				},
				e.UTM]
			}, {
				bK: "namespace",
				e: ";",
				i: /[\.']/,
				c: [e.UTM]
			}, {
				bK: "use",
				e: ";",
				c: [e.UTM]
			}, {
				b: "=>"
			},
			a, n]
		}
	}), e.registerLanguage("properties", function(e) {
		var t = "[ \\t\\f]*",
			r = "[ \\t\\f]+",
			a = "(" + t + "[:=]" + t + "|" + r + ")",
			n = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+",
			i = "([^\\\\:= \\t\\f\\n]|\\\\.)+",
			s = {
				e: a,
				r: 0,
				starts: {
					cN: "string",
					e: /$/,
					r: 0,
					c: [{
						b: "\\\\\\n"
					}]
				}
			};
		return {
			cI: !0,
			i: /\S/,
			c: [e.C("^\\s*[!#]", "$"),
			{
				b: n + a,
				rB: !0,
				c: [{
					cN: "attr",
					b: n,
					endsParent: !0,
					r: 0
				}],
				starts: s
			}, {
				b: i + a,
				rB: !0,
				r: 0,
				c: [{
					cN: "meta",
					b: i,
					endsParent: !0,
					r: 0
				}],
				starts: s
			}, {
				cN: "attr",
				r: 0,
				b: i + t + "$"
			}]
		}
	}), e.registerLanguage("python", function(e) {
		var t = {
			keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
			built_in: "Ellipsis NotImplemented"
		},
			r = {
				cN: "meta",
				b: /^(>>>|\.\.\.) /
			},
			a = {
				cN: "subst",
				b: /\{/,
				e: /\}/,
				k: t,
				i: /#/
			},
			n = {
				cN: "string",
				c: [e.BE],
				v: [{
					b: /(u|b)?r?'''/,
					e: /'''/,
					c: [e.BE, r],
					r: 10
				}, {
					b: /(u|b)?r?"""/,
					e: /"""/,
					c: [e.BE, r],
					r: 10
				}, {
					b: /(fr|rf|f)'''/,
					e: /'''/,
					c: [e.BE, r, a]
				}, {
					b: /(fr|rf|f)"""/,
					e: /"""/,
					c: [e.BE, r, a]
				}, {
					b: /(u|r|ur)'/,
					e: /'/,
					r: 10
				}, {
					b: /(u|r|ur)"/,
					e: /"/,
					r: 10
				}, {
					b: /(b|br)'/,
					e: /'/
				}, {
					b: /(b|br)"/,
					e: /"/
				}, {
					b: /(fr|rf|f)'/,
					e: /'/,
					c: [e.BE, a]
				}, {
					b: /(fr|rf|f)"/,
					e: /"/,
					c: [e.BE, a]
				},
				e.ASM, e.QSM]
			},
			i = {
				cN: "number",
				r: 0,
				v: [{
					b: e.BNR + "[lLjJ]?"
				}, {
					b: "\\b(0o[0-7]+)[lLjJ]?"
				}, {
					b: e.CNR + "[lLjJ]?"
				}]
			},
			s = {
				cN: "params",
				b: /\(/,
				e: /\)/,
				c: ["self", r, i, n]
			};
		return a.c = [n, i, r], {
			aliases: ["py", "gyp"],
			k: t,
			i: /(<\/|->|\?)|=>/,
			c: [r, i, n, e.HCM,
			{
				v: [{
					cN: "function",
					bK: "def"
				}, {
					cN: "class",
					bK: "class"
				}],
				e: /:/,
				i: /[${=;\n,]/,
				c: [e.UTM, s,
				{
					b: /->/,
					eW: !0,
					k: "None"
				}]
			}, {
				cN: "meta",
				b: /^[\t ]*@/,
				e: /$/
			}, {
				b: /\b(print|exec)\(/
			}]
		}
	}), e.registerLanguage("ruby", function(e) {
		var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
			r = {
				keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
				literal: "true false nil"
			},
			a = {
				cN: "doctag",
				b: "@[A-Za-z]+"
			},
			n = {
				b: "#<",
				e: ">"
			},
			i = [e.C("#", "$", {
				c: [a]
			}), e.C("^\\=begin", "^\\=end", {
				c: [a],
				r: 10
			}), e.C("^__END__", "\\n$")],
			s = {
				cN: "subst",
				b: "#\\{",
				e: "}",
				k: r
			},
			c = {
				cN: "string",
				c: [e.BE, s],
				v: [{
					b: /'/,
					e: /'/
				}, {
					b: /"/,
					e: /"/
				}, {
					b: /`/,
					e: /`/
				}, {
					b: "%[qQwWx]?\\(",
					e: "\\)"
				}, {
					b: "%[qQwWx]?\\[",
					e: "\\]"
				}, {
					b: "%[qQwWx]?{",
					e: "}"
				}, {
					b: "%[qQwWx]?<",
					e: ">"
				}, {
					b: "%[qQwWx]?/",
					e: "/"
				}, {
					b: "%[qQwWx]?%",
					e: "%"
				}, {
					b: "%[qQwWx]?-",
					e: "-"
				}, {
					b: "%[qQwWx]?\\|",
					e: "\\|"
				}, {
					b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
				}, {
					b: /<<(-?)\w+$/,
					e: /^\s*\w+$/
				}]
			},
			o = {
				cN: "params",
				b: "\\(",
				e: "\\)",
				endsParent: !0,
				k: r
			},
			l = [c, n,
			{
				cN: "class",
				bK: "class module",
				e: "$|;",
				i: /=/,
				c: [e.inherit(e.TM, {
					b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
				}),
				{
					b: "<\\s*",
					c: [{
						b: "(" + e.IR + "::)?" + e.IR
					}]
				}].concat(i)
			}, {
				cN: "function",
				bK: "def",
				e: "$|;",
				c: [e.inherit(e.TM, {
					b: t
				}), o].concat(i)
			}, {
				b: e.IR + "::"
			}, {
				cN: "symbol",
				b: e.UIR + "(\\!|\\?)?:",
				r: 0
			}, {
				cN: "symbol",
				b: ":(?!\\s)",
				c: [c,
				{
					b: t
				}],
				r: 0
			}, {
				cN: "number",
				b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
				r: 0
			}, {
				b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
			}, {
				cN: "params",
				b: /\|/,
				e: /\|/,
				k: r
			}, {
				b: "(" + e.RSR + "|unless)\\s*",
				k: "unless",
				c: [n,
				{
					cN: "regexp",
					c: [e.BE, s],
					i: /\n/,
					v: [{
						b: "/",
						e: "/[a-z]*"
					}, {
						b: "%r{",
						e: "}[a-z]*"
					}, {
						b: "%r\\(",
						e: "\\)[a-z]*"
					}, {
						b: "%r!",
						e: "![a-z]*"
					}, {
						b: "%r\\[",
						e: "\\][a-z]*"
					}]
				}].concat(i),
				r: 0
			}].concat(i);
		s.c = l, o.c = l;
		var u = "[>?]>",
			d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
			b = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
			p = [{
				b: /^\s*=>/,
				starts: {
					e: "$",
					c: l
				}
			}, {
				cN: "meta",
				b: "^(" + u + "|" + d + "|" + b + ")",
				starts: {
					e: "$",
					c: l
				}
			}];
		return {
			aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
			k: r,
			i: /\/\*/,
			c: i.concat(p).concat(l)
		}
	}), e.registerLanguage("shell", function(e) {
		return {
			aliases: ["console"],
			c: [{
				cN: "meta",
				b: "^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]",
				starts: {
					e: "$",
					sL: "bash"
				}
			}]
		}
	}), e.registerLanguage("sql", function(e) {
		var t = e.C("--", "$");
		return {
			cI: !0,
			i: /[<>{}*]/,
			c: [{
				bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment with",
				e: /;/,
				eW: !0,
				l: /[\w\.]+/,
				k: {
					keyword: "as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
					literal: "true false null unknown",
					built_in: "array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp varchar varying void"
				},
				c: [{
					cN: "string",
					b: "'",
					e: "'",
					c: [e.BE,
					{
						b: "''"
					}]
				}, {
					cN: "string",
					b: '"',
					e: '"',
					c: [e.BE,
					{
						b: '""'
					}]
				}, {
					cN: "string",
					b: "`",
					e: "`",
					c: [e.BE]
				},
				e.CNM, e.CBCM, t, e.HCM]
			},
			e.CBCM, t, e.HCM]
		}
	}), e
}); /*! APlayer-v1.10.1 | MIT License | By DIYgod */
!
function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("APlayer", [], t) : "object" == typeof exports ? exports.APlayer = t() : e.APlayer = t()
}(window, function() {
	return function(e) {
		var t = {};

		function n(i) {
			if (t[i]) return t[i].exports;
			var a = t[i] = {
				i: i,
				l: !1,
				exports: {}
			};
			return e[i].call(a.exports, a, a.exports, n), a.l = !0, a.exports
		}
		return n.m = e, n.c = t, n.d = function(e, t, i) {
			n.o(e, t) || Object.defineProperty(e, t, {
				configurable: !1,
				enumerable: !0,
				get: i
			})
		}, n.r = function(e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			})
		}, n.n = function(e) {
			var t = e && e.__esModule ?
			function() {
				return e.
			default
			} : function() {
				return e
			};
			return n.d(t, "a", t), t
		}, n.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, n.p = "/", n(n.s = 41)
	}([function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = /mobile/i.test(window.navigator.userAgent),
			a = {
				secondToTime: function(e) {
					var t = Math.floor(e / 3600),
						n = Math.floor((e - 3600 * t) / 60),
						i = Math.floor(e - 3600 * t - 60 * n);
					return (t > 0 ? [t, n, i] : [n, i]).map(function(e) {
						return e < 10 ? "0" + e : "" + e
					}).join(":")
				},
				getElementViewLeft: function(e) {
					var t = e.offsetLeft,
						n = e.offsetParent,
						i = document.body.scrollLeft + document.documentElement.scrollLeft;
					if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) for (; null !== n && n !== e;) t += n.offsetLeft, n = n.offsetParent;
					else for (; null !== n;) t += n.offsetLeft, n = n.offsetParent;
					return t - i
				},
				getElementViewTop: function(e, t) {
					for (var n, i = e.offsetTop, a = e.offsetParent; null !== a;) i += a.offsetTop, a = a.offsetParent;
					return n = document.body.scrollTop + document.documentElement.scrollTop, t ? i : i - n
				},
				isMobile: i,
				storage: {
					set: function(e, t) {
						localStorage.setItem(e, t)
					},
					get: function(e) {
						return localStorage.getItem(e)
					}
				},
				nameMap: {
					dragStart: i ? "touchstart" : "mousedown",
					dragMove: i ? "touchmove" : "mousemove",
					dragEnd: i ? "touchend" : "mouseup"
				},
				randomOrder: function(e) {
					return function(e) {
						for (var t = e.length - 1; t >= 0; t--) {
							var n = Math.floor(Math.random() * (t + 1)),
								i = e[n];
							e[n] = e[t], e[t] = i
						}
						return e
					}([].concat(function(e) {
						if (Array.isArray(e)) {
							for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
							return n
						}
						return Array.from(e)
					}(Array(e))).map(function(e, t) {
						return t
					}))
				}
			};
		t.
	default = a
	}, function(e, t, n) {
		var i = n(2);
		e.exports = function(e) {
			"use strict";
			e = e || {};
			var t = "",
				n = i.$each,
				a = e.audio,
				r = (e.$value, e.$index, i.$escape),
				o = e.theme,
				s = e.index;
			return n(a, function(e, n) {
				t += '\n<li>\n <span class="aplayer-list-cur" style="background-color: ', t += r(e.theme || o), t += ';"></span>\n <span class="aplayer-list-index">', t += r(n + s), t += '</span>\n <span class="aplayer-list-title">', t += r(e.name), t += '</span>\n <span class="aplayer-list-author">', t += r(e.artist), t += "</span>\n</li>\n"
			}), t
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = n(15)
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = g(n(33)),
			a = g(n(32)),
			r = g(n(31)),
			o = g(n(30)),
			s = g(n(29)),
			l = g(n(28)),
			u = g(n(27)),
			c = g(n(26)),
			p = g(n(25)),
			d = g(n(24)),
			h = g(n(23)),
			y = g(n(22)),
			f = g(n(21)),
			v = g(n(20)),
			m = g(n(19));

		function g(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		var w = {
			play: i.
		default,
			pause:
			a.
		default,
			volumeUp:
			r.
		default,
			volumeDown:
			o.
		default,
			volumeOff:
			s.
		default,
			orderRandom:
			l.
		default,
			orderList:
			u.
		default,
			menu:
			c.
		default,
			loopAll:
			p.
		default,
			loopOne:
			d.
		default,
			loopNone:
			h.
		default,
			loading:
			y.
		default,
			right:
			f.
		default,
			skip:
			v.
		default,
			lrc:
			m.
		default
		};
		t.
	default = w
	}, function(e, t, n) {
		"use strict";
		var i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
		function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		};
		i = function() {
			return this
		}();
		try {
			i = i || Function("return this")() || (0, eval)("this")
		} catch (e) {
			"object" === ("undefined" == typeof window ? "undefined" : a(window)) && (i = window)
		}
		e.exports = i
	}, function(e, t, n) {
		"use strict";
		var i, a, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
		function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		};
		void 0 === (a = "function" == typeof(i = function() {
			if ("object" === ("undefined" == typeof window ? "undefined" : r(window)) && void 0 !== document.querySelectorAll && void 0 !== window.pageYOffset && void 0 !== history.pushState) {
				var e = function(e, t, n, i) {
						return n > i ? t : e + (t - e) * ((a = n / i) < .5 ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1);
						var a
					},
					t = function(t, n, i, a) {
						n = n || 500;
						var r = (a = a || window).scrollTop || window.pageYOffset;
						if ("number" == typeof t) var o = parseInt(t);
						else var o = function(e, t) {
								return "HTML" === e.nodeName ? -t : e.getBoundingClientRect().top + t
							}(t, r);
						var s = Date.now(),
							l = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
						function(e) {
							window.setTimeout(e, 15)
						};
						!
						function u() {
							var c = Date.now() - s;
							a !== window ? a.scrollTop = e(r, o, c, n) : window.scroll(0, e(r, o, c, n)), c > n ? "function" == typeof i && i(t) : l(u)
						}()
					},
					n = function(e) {
						if (!e.defaultPrevented) {
							e.preventDefault(), location.hash !== this.hash && window.history.pushState(null, null, this.hash);
							var n = document.getElementById(this.hash.substring(1));
							if (!n) return;
							t(n, 500, function(e) {
								location.replace("#" + e.id)
							})
						}
					};
				return document.addEventListener("DOMContentLoaded", function() {
					for (var e, t = document.querySelectorAll('a[href^="#"]:not([href="#"])'), i = t.length; e = t[--i];) e.addEventListener("click", n, !1)
				}), t
			}
		}) ? i.call(t, n, t, e) : i) || (e.exports = a)
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t
				}
			}(),
			a = s(n(1)),
			r = s(n(0)),
			o = s(n(5));

		function s(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		var l = function() {
				function e(t) {
					!
					function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.player = t, this.index = 0, this.audios = this.player.options.audio, this.bindEvents()
				}
				return i(e, [{
					key: "bindEvents",
					value: function() {
						var e = this;
						this.player.template.list.addEventListener("click", function(t) {
							var n = void 0;
							n = "LI" === t.target.tagName.toUpperCase() ? t.target : t.target.parentElement;
							var i = parseInt(n.getElementsByClassName("aplayer-list-index")[0].innerHTML) - 1;
							i !== e.index ? (e.
							switch (i), e.player.play()) : e.player.toggle()
						})
					}
				}, {
					key: "show",
					value: function() {
						this.player.events.trigger("listshow"), this.player.template.list.classList.remove("aplayer-list-hide"), this.player.template.listOl.scrollTop = 33 * this.index
					}
				}, {
					key: "hide",
					value: function() {
						this.player.events.trigger("listhide"), this.player.template.list.classList.add("aplayer-list-hide")
					}
				}, {
					key: "toggle",
					value: function() {
						this.player.template.list.classList.contains("aplayer-list-hide") ? this.show() : this.hide()
					}
				}, {
					key: "add",
					value: function(e) {
						this.player.events.trigger("listadd", {
							audios: e
						}), "[object Array]" !== Object.prototype.toString.call(e) && (e = [e]), e.map(function(e) {
							return e.name = e.name || e.title || "Audio name", e.artist = e.artist || e.author || "Audio artist", e.cover = e.cover || e.pic, e.type = e.type || "normal", e
						});
						var t = !(this.audios.length > 1),
							n = 0 === this.audios.length;
						this.player.template.listOl.innerHTML += (0, a.
					default)({
							theme: this.player.options.theme,
							audio: e,
							index: this.audios.length + 1
						}), this.audios = this.audios.concat(e), t && this.audios.length > 1 && this.player.container.classList.add("aplayer-withlist"), this.player.randomOrder = r.
					default.randomOrder(this.audios.length), this.player.template.listCurs = this.player.container.querySelectorAll(".aplayer-list-cur"), this.player.template.listCurs[this.audios.length - 1].style.backgroundColor = e.theme || this.player.options.theme, n && ("random" === this.player.options.order ? this.
						switch (this.player.randomOrder[0]) : this.
						switch (0))
					}
				}, {
					key: "remove",
					value: function(e) {
						if (this.player.events.trigger("listremove", {
							index: e
						}), this.audios[e]) if (this.audios.length > 1) {
							var t = this.player.container.querySelectorAll(".aplayer-list li");
							t[e].remove(), this.audios.splice(e, 1), this.player.lrc && this.player.lrc.remove(e), e === this.index && (this.audios[e] ? this.
							switch (e) : this.
							switch (e - 1)), this.index > e && this.index--;
							for (var n = e; n < t.length; n++) t[n].getElementsByClassName("aplayer-list-index")[0].textContent = n;
							1 === this.audios.length && this.player.container.classList.remove("aplayer-withlist"), this.player.template.listCurs = this.player.container.querySelectorAll(".aplayer-list-cur")
						} else this.clear()
					}
				}, {
					key: "switch",
					value: function(e) {
						if (this.player.events.trigger("listswitch", {
							index: e
						}), void 0 !== e && this.audios[e]) {
							this.index = e;
							var t = this.audios[this.index];
							this.player.template.pic.style.backgroundImage = t.cover ? "url('" + t.cover + "')" : "", this.player.theme(this.audios[this.index].theme || this.player.options.theme, this.index, !1), this.player.template.title.innerHTML = t.name, this.player.template.author.innerHTML = t.artist ? " - " + t.artist : "";
							var n = this.player.container.getElementsByClassName("aplayer-list-light")[0];
							n && n.classList.remove("aplayer-list-light"), this.player.container.querySelectorAll(".aplayer-list li")[this.index].classList.add("aplayer-list-light"), (0, o.
						default)(33 * this.index, 500, null, this.player.template.listOl), this.player.setAudio(t), this.player.lrc && this.player.lrc.
							switch (this.index), this.player.lrc && this.player.lrc.update(0), 1 !== this.player.duration && (this.player.template.dtime.innerHTML = r.
						default.secondToTime(this.player.duration))
						}
					}
				}, {
					key: "clear",
					value: function() {
						this.player.events.trigger("listclear"), this.index = 0, this.player.container.classList.remove("aplayer-withlist"), this.player.pause(), this.audios = [], this.player.lrc && this.player.lrc.clear(), this.player.audio.src = "", this.player.template.listOl.innerHTML = "", this.player.template.pic.style.backgroundImage = "", this.player.theme(this.player.options.theme, this.index, !1), this.player.template.title.innerHTML = "No audio", this.player.template.author.innerHTML = "", this.player.bar.set("loaded", 0, "width"), this.player.template.dtime.innerHTML = r.
					default.secondToTime(0)
					}
				}]), e
			}();
		t.
	default = l
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t
				}
			}();
		var a = function() {
				function e() {
					!
					function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.events = {}, this.audioEvents = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "mozaudioavailable", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], this.playerEvents = ["destroy", "listshow", "listhide", "listadd", "listremove", "listswitch", "listclear", "noticeshow", "noticehide", "lrcshow", "lrchide"]
				}
				return i(e, [{
					key: "on",
					value: function(e, t) {
						this.type(e) && "function" == typeof t && (this.events[e] || (this.events[e] = []), this.events[e].push(t))
					}
				}, {
					key: "trigger",
					value: function(e, t) {
						if (this.events[e] && this.events[e].length) for (var n = 0; n < this.events[e].length; n++) this.events[e][n](t)
					}
				}, {
					key: "type",
					value: function(e) {
						return -1 !== this.playerEvents.indexOf(e) ? "player" : -1 !== this.audioEvents.indexOf(e) ? "audio" : (console.error("Unknown event name: " + e), null)
					}
				}]), e
			}();
		t.
	default = a
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t
				}
			}();
		var a = function() {
				function e(t) {
					!
					function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.player = t, window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
					function(e) {
						window.setTimeout(e, 1e3 / 60)
					}, this.types = ["loading"], this.init()
				}
				return i(e, [{
					key: "init",
					value: function() {
						var e = this;
						this.types.forEach(function(t) {
							e["init" + t + "Checker"]()
						})
					}
				}, {
					key: "initloadingChecker",
					value: function() {
						var e = this,
							t = 0,
							n = 0,
							i = !1;
						this.loadingChecker = setInterval(function() {
							e.enableloadingChecker && (n = e.player.audio.currentTime, i || n !== t || e.player.audio.paused || (e.player.container.classList.add("aplayer-loading"), i = !0), i && n > t && !e.player.audio.paused && (e.player.container.classList.remove("aplayer-loading"), i = !1), t = n)
						}, 100)
					}
				}, {
					key: "enable",
					value: function(e) {
						this["enable" + e + "Checker"] = !0, "fps" === e && this.initfpsChecker()
					}
				}, {
					key: "disable",
					value: function(e) {
						this["enable" + e + "Checker"] = !1
					}
				}, {
					key: "destroy",
					value: function() {
						var e = this;
						this.types.forEach(function(t) {
							e["enable" + t + "Checker"] = !1, e[t + "Checker"] && clearInterval(e[t + "Checker"])
						})
					}
				}]), e
			}();
		t.
	default = a
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t
				}
			}(),
			a = o(n(0)),
			r = o(n(3));

		function o(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		var s = function() {
				function e(t) {
					!
					function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.player = t, this.initPlayButton(), this.initPlayBar(), this.initOrderButton(), this.initLoopButton(), this.initMenuButton(), a.
				default.isMobile || this.initVolumeButton(), this.initMiniSwitcher(), this.initSkipButton(), this.initLrcButton()
				}
				return i(e, [{
					key: "initPlayButton",
					value: function() {
						var e = this;
						this.player.template.pic.addEventListener("click", function() {
							e.player.toggle()
						})
					}
				}, {
					key: "initPlayBar",
					value: function() {
						var e = this,
							t = function(t) {
								var n = ((t.clientX || t.changedTouches[0].clientX) - a.
							default.getElementViewLeft(e.player.template.barWrap)) / e.player.template.barWrap.clientWidth;
								n = Math.max(n, 0), n = Math.min(n, 1), e.player.bar.set("played", n, "width"), e.player.lrc && e.player.lrc.update(n * e.player.duration), e.player.template.ptime.innerHTML = a.
							default.secondToTime(n * e.player.duration)
							},
							n = function n(i) {
								document.removeEventListener(a.
							default.nameMap.dragEnd, n), document.removeEventListener(a.
							default.nameMap.dragMove, t);
								var r = ((i.clientX || i.changedTouches[0].clientX) - a.
							default.getElementViewLeft(e.player.template.barWrap)) / e.player.template.barWrap.clientWidth;
								r = Math.max(r, 0), r = Math.min(r, 1), e.player.bar.set("played", r, "width"), e.player.seek(e.player.bar.get("played", "width") * e.player.duration), e.player.disableTimeupdate = !1
							};
						this.player.template.barWrap.addEventListener(a.
					default.nameMap.dragStart, function() {
							e.player.disableTimeupdate = !0, document.addEventListener(a.
						default.nameMap.dragMove, t), document.addEventListener(a.
						default.nameMap.dragEnd, n)
						})
					}
				}, {
					key: "initVolumeButton",
					value: function() {
						var e = this;
						this.player.template.volumeButton.addEventListener("click", function() {
							e.player.audio.muted ? (e.player.audio.muted = !1, e.player.switchVolumeIcon(), e.player.bar.set("volume", e.player.volume(), "height")) : (e.player.audio.muted = !0, e.player.switchVolumeIcon(), e.player.bar.set("volume", 0, "height"))
						});
						var t = function(t) {
								var n = 1 - ((t.clientY || t.changedTouches[0].clientY) - a.
							default.getElementViewTop(e.player.template.volumeBar, e.player.options.fixed)) / e.player.template.volumeBar.clientHeight;
								n = Math.max(n, 0), n = Math.min(n, 1), e.player.volume(n)
							},
							n = function n(i) {
								e.player.template.volumeBarWrap.classList.remove("aplayer-volume-bar-wrap-active"), document.removeEventListener(a.
							default.nameMap.dragEnd, n), document.removeEventListener(a.
							default.nameMap.dragMove, t);
								var r = 1 - ((i.clientY || i.changedTouches[0].clientY) - a.
							default.getElementViewTop(e.player.template.volumeBar, e.player.options.fixed)) / e.player.template.volumeBar.clientHeight;
								r = Math.max(r, 0), r = Math.min(r, 1), e.player.volume(r)
							};
						this.player.template.volumeBarWrap.addEventListener(a.
					default.nameMap.dragStart, function() {
							e.player.template.volumeBarWrap.classList.add("aplayer-volume-bar-wrap-active"), document.addEventListener(a.
						default.nameMap.dragMove, t), document.addEventListener(a.
						default.nameMap.dragEnd, n)
						})
					}
				}, {
					key: "initOrderButton",
					value: function() {
						var e = this;
						this.player.template.order.addEventListener("click", function() {
							"list" === e.player.options.order ? (e.player.options.order = "random", e.player.template.order.innerHTML = r.
						default.orderRandom) : "random" === e.player.options.order && (e.player.options.order = "list", e.player.template.order.innerHTML = r.
						default.orderList)
						})
					}
				}, {
					key: "initLoopButton",
					value: function() {
						var e = this;
						this.player.template.loop.addEventListener("click", function() {
							e.player.list.audios.length > 1 ? "one" === e.player.options.loop ? (e.player.options.loop = "none", e.player.template.loop.innerHTML = r.
						default.loopNone) : "none" === e.player.options.loop ? (e.player.options.loop = "all", e.player.template.loop.innerHTML = r.
						default.loopAll) : "all" === e.player.options.loop && (e.player.options.loop = "one", e.player.template.loop.innerHTML = r.
						default.loopOne) : "one" === e.player.options.loop || "all" === e.player.options.loop ? (e.player.options.loop = "none", e.player.template.loop.innerHTML = r.
						default.loopNone) : "none" === e.player.options.loop && (e.player.options.loop = "all", e.player.template.loop.innerHTML = r.
						default.loopAll)
						})
					}
				}, {
					key: "initMenuButton",
					value: function() {
						var e = this;
						this.player.template.menu.addEventListener("click", function() {
							e.player.list.toggle()
						})
					}
				}, {
					key: "initMiniSwitcher",
					value: function() {
						var e = this;
						this.player.template.miniSwitcher.addEventListener("click", function() {
							e.player.setMode("mini" === e.player.mode ? "normal" : "mini")
						})
					}
				}, {
					key: "initSkipButton",
					value: function() {
						var e = this;
						this.player.template.skipBackButton.addEventListener("click", function() {
							e.player.skipBack()
						}), this.player.template.skipForwardButton.addEventListener("click", function() {
							e.player.skipForward()
						}), this.player.template.skipPlayButton.addEventListener("click", function() {
							e.player.toggle()
						})
					}
				}, {
					key: "initLrcButton",
					value: function() {
						var e = this;
						this.player.template.lrcButton.addEventListener("click", function() {
							e.player.template.lrcButton.classList.contains("aplayer-icon-lrc-inactivity") ? (e.player.template.lrcButton.classList.remove("aplayer-icon-lrc-inactivity"), e.player.lrc && e.player.lrc.show()) : (e.player.template.lrcButton.classList.add("aplayer-icon-lrc-inactivity"), e.player.lrc && e.player.lrc.hide())
						})
					}
				}]), e
			}();
		t.
	default = s
	}, function(e, t, n) {
		var i = n(2);
		e.exports = function(e) {
			"use strict";
			e = e || {};
			var t = "",
				n = i.$each,
				a = e.lyrics,
				r = (e.$value, e.$index, i.$escape);
			return n(a, function(e, n) {
				t += "\n <p", 0 === n && (t += ' class="aplayer-lrc-current"'), t += ">", t += r(e[1]), t += "</p>\n"
			}), t
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i, a = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t
				}
			}(),
			r = n(10),
			o = (i = r) && i.__esModule ? i : {
			default:
				i
			};
		var s = function() {
				function e(t) {
					!
					function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.container = t.container, this.async = t.async, this.player = t.player, this.parsed = [], this.index = 0, this.current = []
				}
				return a(e, [{
					key: "show",
					value: function() {
						this.player.events.trigger("lrcshow"), this.player.template.lrcWrap.classList.remove("aplayer-lrc-hide")
					}
				}, {
					key: "hide",
					value: function() {
						this.player.events.trigger("lrchide"), this.player.template.lrcWrap.classList.add("aplayer-lrc-hide")
					}
				}, {
					key: "toggle",
					value: function() {
						this.player.template.lrcWrap.classList.contains("aplayer-lrc-hide") ? this.show() : this.hide()
					}
				}, {
					key: "update",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.player.audio.currentTime;
						if (this.index > this.current.length - 1 || e < this.current[this.index][0] || !this.current[this.index + 1] || e >= this.current[this.index + 1][0]) for (var t = 0; t < this.current.length; t++) e >= this.current[t][0] && (!this.current[t + 1] || e < this.current[t + 1][0]) && (this.index = t, this.container.style.transform = "translateY(" + 16 * -this.index + "px)", this.container.style.webkitTransform = "translateY(" + 16 * -this.index + "px)", this.container.getElementsByClassName("aplayer-lrc-current")[0].classList.remove("aplayer-lrc-current"), this.container.getElementsByTagName("p")[t].classList.add("aplayer-lrc-current"))
					}
				}, {
					key: "switch",
					value: function(e) {
						var t = this;
						if (!this.parsed[e]) if (this.async) {
							this.parsed[e] = [
								["00:00", "Loading"]
							];
							var n = new XMLHttpRequest;
							n.onreadystatechange = function() {
								e === t.player.list.index && 4 === n.readyState && (n.status >= 200 && n.status < 300 || 304 === n.status ? t.parsed[e] = t.parse(n.responseText) : (t.player.notice("LRC file request fails: status " + n.status), t.parsed[e] = [
									["00:00", "Not available"]
								]), t.container.innerHTML = (0, o.
							default)({
									lyrics: t.parsed[e]
								}), t.update(0), t.current = t.parsed[e])
							};
							var i = this.player.list.audios[e].lrc;
							n.open("get", i, !0), n.send(null)
						} else this.player.list.audios[e].lrc ? this.parsed[e] = this.parse(this.player.list.audios[e].lrc) : this.parsed[e] = [
							["00:00", "Not available"]
						];
						this.container.innerHTML = (0, o.
					default)({
							lyrics: this.parsed[e]
						}), this.update(0), this.current = this.parsed[e]
					}
				}, {
					key: "parse",
					value: function(e) {
						if (e) {
							for (var t = (e = e.replace(/([^\]^\n])\[/g, function(e, t) {
								return t + "\n["
							})).split("\n"), n = [], i = t.length, a = 0; a < i; a++) {
								var r = t[a].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g),
									o = t[a].replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, "").replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, "").replace(/^\s+|\s+$/g, "");
								if (r) for (var s = r.length, l = 0; l < s; l++) {
									var u = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(r[l]),
										c = 60 * u[1] + parseInt(u[2]) + (u[4] ? parseInt(u[4]) / (2 === (u[4] + "").length ? 100 : 1e3) : 0);
									n.push([c, o])
								}
							}
							return (n = n.filter(function(e) {
								return e[1]
							})).sort(function(e, t) {
								return e[0] - t[0]
							}), n
						}
						return []
					}
				}, {
					key: "remove",
					value: function(e) {
						this.parsed.splice(e, 1)
					}
				}, {
					key: "clear",
					value: function() {
						this.parsed = [], this.container.innerHTML = ""
					}
				}]), e
			}();
		t.
	default = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i, a = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t
				}
			}(),
			r = n(0),
			o = (i = r) && i.__esModule ? i : {
			default:
				i
			};
		var s = function() {
				function e(t) {
					!
					function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.storageName = t.options.storageName, this.data = JSON.parse(o.
				default.storage.get(this.storageName)), this.data || (this.data = {}), this.data.volume = this.data.volume || t.options.volume
				}
				return a(e, [{
					key: "get",
					value: function(e) {
						return this.data[e]
					}
				}, {
					key: "set",
					value: function(e, t) {
						this.data[e] = t, o.
					default.storage.set(this.storageName, JSON.stringify(this.data))
					}
				}]), e
			}();
		t.
	default = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t
				}
			}();
		var a = function() {
				function e(t) {
					!
					function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.elements = {}, this.elements.volume = t.volume, this.elements.played = t.played, this.elements.loaded = t.loaded
				}
				return i(e, [{
					key: "set",
					value: function(e, t, n) {
						t = Math.max(t, 0), t = Math.min(t, 1), this.elements[e].style[n] = 100 * t + "%"
					}
				}, {
					key: "get",
					value: function(e, t) {
						return parseFloat(this.elements[e].style[t]) / 100
					}
				}]), e
			}();
		t.
	default = a
	}, function(e, t, n) {
		"use strict";
		(function(t) {
			e.exports = !1;
			try {
				e.exports = "[object process]" === Object.prototype.toString.call(t.process)
			} catch (e) {}
		}).call(this, n(4))
	}, function(e, t, n) {
		"use strict";
		(function(t) {
			var i = n(14),
				a = Object.create(i ? t : window),
				r = /["&'<>]/;
			a.$escape = function(e) {
				return function(e) {
					var t = "" + e,
						n = r.exec(t);
					if (!n) return e;
					var i = "",
						a = void 0,
						o = void 0,
						s = void 0;
					for (a = n.index, o = 0; a < t.length; a++) {
						switch (t.charCodeAt(a)) {
						case 34:
							s = "&#34;";
							break;
						case 38:
							s = "&#38;";
							break;
						case 39:
							s = "&#39;";
							break;
						case 60:
							s = "&#60;";
							break;
						case 62:
							s = "&#62;";
							break;
						default:
							continue
						}
						o !== a && (i += t.substring(o, a)), o = a + 1, i += s
					}
					return o !== a ? i + t.substring(o, a) : i
				}(function e(t) {
					"string" != typeof t && (t = void 0 === t || null === t ? "" : "function" == typeof t ? e(t.call(t)) : JSON.stringify(t));
					return t
				}(e))
			}, a.$each = function(e, t) {
				if (Array.isArray(e)) for (var n = 0, i = e.length; n < i; n++) t(e[n], n);
				else for (var a in e) t(e[a], a)
			}, e.exports = a
		}).call(this, n(4))
	}, function(e, t, n) {
		var i = n(2);
		e.exports = function(e) {
			"use strict";
			var t = "",
				a = (e = e || {}).options,
				r = e.cover,
				o = i.$escape,
				s = e.icons,
				l = (arguments[1], function(e) {
					return t += e
				}),
				u = e.getObject;
			e.theme, e.audio, e.index;
			return a.fixed ? (t += '\n<div class="aplayer-list', a.listFolded && (t += " aplayer-list-hide"), t += '"', a.listMaxHeight && (t += ' style="max-height: ', t += o(a.listMaxHeight), t += '"'), t += ">\n <ol", a.listMaxHeight && (t += ' style="max-height: ', t += o(a.listMaxHeight), t += '"'), t += ">\n ", l(n(1)(u({
				theme: a.theme,
				audio: a.audio,
				index: 1
			}))), t += '\n </ol>\n</div>\n<div class="aplayer-body">\n <div class="aplayer-pic" style="', r && (t += "background-image: url(&quot;", t += o(r), t += "&quot;);"), t += "background-color: ", t += o(a.theme), t += ';">\n <div class="aplayer-button aplayer-play">', t += s.play, t += '</div>\n </div>\n <div class="aplayer-info" style="display: none;">\n <div class="aplayer-music">\n <span class="aplayer-title">No audio</span>\n <span class="aplayer-author"></span>\n </div>\n <div class="aplayer-controller">\n <div class="aplayer-bar-wrap">\n <div class="aplayer-bar">\n <div class="aplayer-loaded" style="width: 0"></div>\n <div class="aplayer-played" style="width: 0; background: ', t += o(a.theme), t += ';">\n <span class="aplayer-thumb" style="background: ', t += o(a.theme), t += ';">\n <span class="aplayer-loading-icon">', t += s.loading, t += '</span>\n </span>\n </div>\n </div>\n </div>\n <div class="aplayer-time">\n <span class="aplayer-time-inner">\n <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>\n </span>\n <span class="aplayer-icon aplayer-icon-back">\n ', t += s.skip, t += '\n </span>\n <span class="aplayer-icon aplayer-icon-play">\n ', t += s.play, t += '\n </span>\n <span class="aplayer-icon aplayer-icon-forward">\n ', t += s.skip, t += '\n </span>\n <div class="aplayer-volume-wrap">\n <button type="button" class="aplayer-icon aplayer-icon-volume-down">\n ', t += s.volumeDown, t += '\n </button>\n <div class="aplayer-volume-bar-wrap">\n <div class="aplayer-volume-bar">\n <div class="aplayer-volume" style="height: 80%; background: ', t += o(a.theme), t += ';"></div>\n </div>\n </div>\n </div>\n <button type="button" class="aplayer-icon aplayer-icon-order">\n ', "list" === a.order ? t += s.orderList : "random" === a.order && (t += s.orderRandom), t += '\n </button>\n <button type="button" class="aplayer-icon aplayer-icon-loop">\n ', "one" === a.loop ? t += s.loopOne : "all" === a.loop ? t += s.loopAll : "none" === a.loop && (t += s.loopNone), t += '\n </button>\n <button type="button" class="aplayer-icon aplayer-icon-menu">\n ', t += s.menu, t += '\n </button>\n <button type="button" class="aplayer-icon aplayer-icon-lrc">\n ', t += s.lrc, t += '\n </button>\n </div>\n </div>\n </div>\n <div class="aplayer-notice"></div>\n <div class="aplayer-miniswitcher"><button class="aplayer-icon">', t += s.right, t += '</button></div>\n</div>\n<div class="aplayer-lrc">\n <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>\n</div>\n') : (t += '\n<div class="aplayer-body">\n <div class="aplayer-pic" style="', r && (t += "background-image: url(&quot;", t += o(r), t += "&quot;);"), t += "background-color: ", t += o(a.theme), t += ';">\n <div class="aplayer-button aplayer-play">', t += s.play, t += '</div>\n </div>\n <div class="aplayer-info">\n <div class="aplayer-music">\n <span class="aplayer-title">No audio</span>\n <span class="aplayer-author"></span>\n </div>\n <div class="aplayer-lrc">\n <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>\n </div>\n <div class="aplayer-controller">\n <div class="aplayer-bar-wrap">\n <div class="aplayer-bar">\n <div class="aplayer-loaded" style="width: 0"></div>\n <div class="aplayer-played" style="width: 0; background: ', t += o(a.theme), t += ';">\n <span class="aplayer-thumb" style="background: ', t += o(a.theme), t += ';">\n <span class="aplayer-loading-icon">', t += s.loading, t += '</span>\n </span>\n </div>\n </div>\n </div>\n <div class="aplayer-time">\n <span class="aplayer-time-inner">\n <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>\n </span>\n <span class="aplayer-icon aplayer-icon-back">\n ', t += s.skip, t += '\n </span>\n <span class="aplayer-icon aplayer-icon-play">\n ', t += s.play, t += '\n </span>\n <span class="aplayer-icon aplayer-icon-forward">\n ', t += s.skip, t += '\n </span>\n <div class="aplayer-volume-wrap">\n <button type="button" class="aplayer-icon aplayer-icon-volume-down">\n ', t += s.volumeDown, t += '\n </button>\n <div class="aplayer-volume-bar-wrap">\n <div class="aplayer-volume-bar">\n <div class="aplayer-volume" style="height: 80%; background: ', t += o(a.theme), t += ';"></div>\n </div>\n </div>\n </div>\n <button type="button" class="aplayer-icon aplayer-icon-order">\n ', "list" === a.order ? t += s.orderList : "random" === a.order && (t += s.orderRandom), t += '\n </button>\n <button type="button" class="aplayer-icon aplayer-icon-loop">\n ', "one" === a.loop ? t += s.loopOne : "all" === a.loop ? t += s.loopAll : "none" === a.loop && (t += s.loopNone), t += '\n </button>\n <button type="button" class="aplayer-icon aplayer-icon-menu">\n ', t += s.menu, t += '\n </button>\n <button type="button" class="aplayer-icon aplayer-icon-lrc">\n ', t += s.lrc, t += '\n </button>\n </div>\n </div>\n </div>\n <div class="aplayer-notice"></div>\n <div class="aplayer-miniswitcher"><button class="aplayer-icon">', t += s.right, t += '</button></div>\n</div>\n<div class="aplayer-list', a.listFolded && (t += " aplayer-list-hide"), t += '"', a.listMaxHeight && (t += ' style="max-height: ', t += o(a.listMaxHeight), t += '"'), t += ">\n <ol", a.listMaxHeight && (t += ' style="max-height: ', t += o(a.listMaxHeight), t += '"'), t += ">\n ", l(n(1)(u({
				theme: a.theme,
				audio: a.audio,
				index: 1
			}))), t += "\n </ol>\n</div>\n"), t
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t
				}
			}(),
			a = o(n(3)),
			r = o(n(16));

		function o(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		var s = function() {
				function e(t) {
					!
					function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.container = t.container, this.options = t.options, this.randomOrder = t.randomOrder, this.init()
				}
				return i(e, [{
					key: "init",
					value: function() {
						var e = "";
						this.options.audio.length && (e = "random" === this.options.order ? this.options.audio[this.randomOrder[0]].cover : this.options.audio[0].cover), this.container.innerHTML = (0, r.
					default)({
							options: this.options,
							icons: a.
						default,
							cover:
							e,
							getObject: function(e) {
								return e
							}
						}), this.lrc = this.container.querySelector(".aplayer-lrc-contents"), this.lrcWrap = this.container.querySelector(".aplayer-lrc"), this.ptime = this.container.querySelector(".aplayer-ptime"), this.info = this.container.querySelector(".aplayer-info"), this.time = this.container.querySelector(".aplayer-time"), this.barWrap = this.container.querySelector(".aplayer-bar-wrap"), this.button = this.container.querySelector(".aplayer-button"), this.body = this.container.querySelector(".aplayer-body"), this.list = this.container.querySelector(".aplayer-list"), this.listOl = this.container.querySelector(".aplayer-list ol"), this.listCurs = this.container.querySelectorAll(".aplayer-list-cur"), this.played = this.container.querySelector(".aplayer-played"), this.loaded = this.container.querySelector(".aplayer-loaded"), this.thumb = this.container.querySelector(".aplayer-thumb"), this.volume = this.container.querySelector(".aplayer-volume"), this.volumeBar = this.container.querySelector(".aplayer-volume-bar"), this.volumeButton = this.container.querySelector(".aplayer-time button"), this.volumeBarWrap = this.container.querySelector(".aplayer-volume-bar-wrap"), this.loop = this.container.querySelector(".aplayer-icon-loop"), this.order = this.container.querySelector(".aplayer-icon-order"), this.menu = this.container.querySelector(".aplayer-icon-menu"), this.pic = this.container.querySelector(".aplayer-pic"), this.title = this.container.querySelector(".aplayer-title"), this.author = this.container.querySelector(".aplayer-author"), this.dtime = this.container.querySelector(".aplayer-dtime"), this.notice = this.container.querySelector(".aplayer-notice"), this.miniSwitcher = this.container.querySelector(".aplayer-miniswitcher"), this.skipBackButton = this.container.querySelector(".aplayer-icon-back"), this.skipForwardButton = this.container.querySelector(".aplayer-icon-forward"), this.skipPlayButton = this.container.querySelector(".aplayer-icon-play"), this.lrcButton = this.container.querySelector(".aplayer-icon-lrc")
					}
				}]), e
			}();
		t.
	default = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.
	default = function(e) {
			var t = {
				container: e.element || document.getElementsByClassName("aplayer")[0],
				mini: e.narrow || e.fixed || !1,
				fixed: !1,
				autoplay: !1,
				mutex: !0,
				lrcType: e.showlrc || e.lrc || 0,
				preload: "auto",
				theme: "#b7daff",
				loop: "all",
				order: "list",
				volume: .7,
				listFolded: e.fixed,
				listMaxHeight: e.listmaxheight || "250px",
				audio: e.music || [],
				storageName: "aplayer-setting"
			};
			for (var n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
			return "[object Array]" !== Object.prototype.toString.call(e.audio) && (e.audio = [e.audio]), e.audio.map(function(e) {
				return e.name = e.name || e.title || "Audio name", e.artist = e.artist || e.author || "Audio artist", e.cover = e.cover || e.pic, e.type = e.type || "normal", e
			}), e.audio.length <= 1 && "one" === e.loop && (e.loop = "all"), e
		}
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M25.468 6.947c-0.326-0.172-0.724-0.151-1.030 0.057l-6.438 4.38v-3.553c0-0.371-0.205-0.71-0.532-0.884-0.326-0.172-0.724-0.151-1.030 0.057l-12 8.164c-0.274 0.186-0.438 0.496-0.438 0.827s0.164 0.641 0.438 0.827l12 8.168c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-3.556l6.438 4.382c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-16.333c0-0.371-0.205-0.71-0.532-0.884z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 29 32"><path d="M2.667 7.027l1.707-1.693 22.293 22.293-1.693 1.707-4-4h-11.64v4l-5.333-5.333 5.333-5.333v4h8.973l-8.973-8.973v0.973h-2.667v-3.64l-4-4zM22.667 17.333h2.667v5.573l-2.667-2.667v-2.907zM22.667 6.667v-4l5.333 5.333-5.333 5.333v-4h-10.907l-2.667-2.667h13.573z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 33 32"><path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333zM17.333 20v-8h-1.333l-2.667 1.333v1.333h2v5.333h2z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 29 32"><path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 22 32"><path d="M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'
	}, function(e, t) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 31"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'
	}, function(e, t, n) {
		"use strict";
		var i, a, r = e.exports = {};

		function o() {
			throw new Error("setTimeout has not been defined")
		}
		function s() {
			throw new Error("clearTimeout has not been defined")
		}
		function l(e) {
			if (i === setTimeout) return setTimeout(e, 0);
			if ((i === o || !i) && setTimeout) return i = setTimeout, setTimeout(e, 0);
			try {
				return i(e, 0)
			} catch (t) {
				try {
					return i.call(null, e, 0)
				} catch (t) {
					return i.call(this, e, 0)
				}
			}
		}!
		function() {
			try {
				i = "function" == typeof setTimeout ? setTimeout : o
			} catch (e) {
				i = o
			}
			try {
				a = "function" == typeof clearTimeout ? clearTimeout : s
			} catch (e) {
				a = s
			}
		}();
		var u, c = [],
			p = !1,
			d = -1;

		function h() {
			p && u && (p = !1, u.length ? c = u.concat(c) : d = -1, c.length && y())
		}
		function y() {
			if (!p) {
				var e = l(h);
				p = !0;
				for (var t = c.length; t;) {
					for (u = c, c = []; ++d < t;) u && u[d].run();
					d = -1, t = c.length
				}
				u = null, p = !1, function(e) {
					if (a === clearTimeout) return clearTimeout(e);
					if ((a === s || !a) && clearTimeout) return a = clearTimeout, clearTimeout(e);
					try {
						a(e)
					} catch (t) {
						try {
							return a.call(null, e)
						} catch (t) {
							return a.call(this, e)
						}
					}
				}(e)
			}
		}
		function f(e, t) {
			this.fun = e, this.array = t
		}
		function v() {}
		r.nextTick = function(e) {
			var t = new Array(arguments.length - 1);
			if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
			c.push(new f(e, t)), 1 !== c.length || p || l(y)
		}, f.prototype.run = function() {
			this.fun.apply(null, this.array)
		}, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = v, r.addListener = v, r.once = v, r.off = v, r.removeListener = v, r.removeAllListeners = v, r.emit = v, r.prependListener = v, r.prependOnceListener = v, r.listeners = function(e) {
			return []
		}, r.binding = function(e) {
			throw new Error("process.binding is not supported")
		}, r.cwd = function() {
			return "/"
		}, r.chdir = function(e) {
			throw new Error("process.chdir is not supported")
		}, r.umask = function() {
			return 0
		}
	}, function(e, t, n) {
		"use strict";
		(function(e, t) {
			!
			function(e, n) {
				if (!e.setImmediate) {
					var i, a, r, o, s, l = 1,
						u = {},
						c = !1,
						p = e.document,
						d = Object.getPrototypeOf && Object.getPrototypeOf(e);
					d = d && d.setTimeout ? d : e, "[object process]" === {}.toString.call(e.process) ? i = function(e) {
						t.nextTick(function() {
							y(e)
						})
					} : !
					function() {
						if (e.postMessage && !e.importScripts) {
							var t = !0,
								n = e.onmessage;
							return e.onmessage = function() {
								t = !1
							}, e.postMessage("", "*"), e.onmessage = n, t
						}
					}() ? e.MessageChannel ? ((r = new MessageChannel).port1.onmessage = function(e) {
						y(e.data)
					}, i = function(e) {
						r.port2.postMessage(e)
					}) : p && "onreadystatechange" in p.createElement("script") ? (a = p.documentElement, i = function(e) {
						var t = p.createElement("script");
						t.onreadystatechange = function() {
							y(e), t.onreadystatechange = null, a.removeChild(t), t = null
						}, a.appendChild(t)
					}) : i = function(e) {
						setTimeout(y, 0, e)
					} : (o = "setImmediate$" + Math.random() + "$", s = function(t) {
						t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(o) && y(+t.data.slice(o.length))
					}, e.addEventListener ? e.addEventListener("message", s, !1) : e.attachEvent("onmessage", s), i = function(t) {
						e.postMessage(o + t, "*")
					}), d.setImmediate = function(e) {
						"function" != typeof e && (e = new Function("" + e));
						for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
						var a = {
							callback: e,
							args: t
						};
						return u[l] = a, i(l), l++
					}, d.clearImmediate = h
				}
				function h(e) {
					delete u[e]
				}
				function y(e) {
					if (c) setTimeout(y, 0, e);
					else {
						var t = u[e];
						if (t) {
							c = !0;
							try {
								!
								function(e) {
									var t = e.callback,
										i = e.args;
									switch (i.length) {
									case 0:
										t();
										break;
									case 1:
										t(i[0]);
										break;
									case 2:
										t(i[0], i[1]);
										break;
									case 3:
										t(i[0], i[1], i[2]);
										break;
									default:
										t.apply(n, i)
									}
								}(t)
							} finally {
								h(e), c = !1
							}
						}
					}
				}
			}("undefined" == typeof self ? void 0 === e ? void 0 : e : self)
		}).call(this, n(4), n(34))
	}, function(e, t, n) {
		"use strict";
		var i = Function.prototype.apply;

		function a(e, t) {
			this._id = e, this._clearFn = t
		}
		t.setTimeout = function() {
			return new a(i.call(setTimeout, window, arguments), clearTimeout)
		}, t.setInterval = function() {
			return new a(i.call(setInterval, window, arguments), clearInterval)
		}, t.clearTimeout = t.clearInterval = function(e) {
			e && e.close()
		}, a.prototype.unref = a.prototype.ref = function() {}, a.prototype.close = function() {
			this._clearFn.call(window, this._id)
		}, t.enroll = function(e, t) {
			clearTimeout(e._idleTimeoutId), e._idleTimeout = t
		}, t.unenroll = function(e) {
			clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
		}, t._unrefActive = t.active = function(e) {
			clearTimeout(e._idleTimeoutId);
			var t = e._idleTimeout;
			t >= 0 && (e._idleTimeoutId = setTimeout(function() {
				e._onTimeout && e._onTimeout()
			}, t))
		}, n(35), t.setImmediate = setImmediate, t.clearImmediate = clearImmediate
	}, function(e, t, n) {
		"use strict";
		(function(t) {
			var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
			function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			}, i = setTimeout;

			function a() {}
			function r(e) {
				if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
				if ("function" != typeof e) throw new TypeError("not a function");
				this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], c(e, this)
			}
			function o(e, t) {
				for (; 3 === e._state;) e = e._value;
				0 !== e._state ? (e._handled = !0, r._immediateFn(function() {
					var n = 1 === e._state ? t.onFulfilled : t.onRejected;
					if (null !== n) {
						var i;
						try {
							i = n(e._value)
						} catch (e) {
							return void l(t.promise, e)
						}
						s(t.promise, i)
					} else(1 === e._state ? s : l)(t.promise, e._value)
				})) : e._deferreds.push(t)
			}
			function s(e, t) {
				try {
					if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
					if (t && ("object" === (void 0 === t ? "undefined" : n(t)) || "function" == typeof t)) {
						var i = t.then;
						if (t instanceof r) return e._state = 3, e._value = t, void u(e);
						if ("function" == typeof i) return void c((a = i, o = t, function() {
							a.apply(o, arguments)
						}), e)
					}
					e._state = 1, e._value = t, u(e)
				} catch (t) {
					l(e, t)
				}
				var a, o
			}
			function l(e, t) {
				e._state = 2, e._value = t, u(e)
			}
			function u(e) {
				2 === e._state && 0 === e._deferreds.length && r._immediateFn(function() {
					e._handled || r._unhandledRejectionFn(e._value)
				});
				for (var t = 0, n = e._deferreds.length; t < n; t++) o(e, e._deferreds[t]);
				e._deferreds = null
			}
			function c(e, t) {
				var n = !1;
				try {
					e(function(e) {
						n || (n = !0, s(t, e))
					}, function(e) {
						n || (n = !0, l(t, e))
					})
				} catch (e) {
					if (n) return;
					n = !0, l(t, e)
				}
			}
			r.prototype.
			catch = function(e) {
				return this.then(null, e)
			}, r.prototype.then = function(e, t) {
				var n = new this.constructor(a);
				return o(this, new function(e, t, n) {
					this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
				}(e, t, n)), n
			}, r.prototype.
			finally = function(e) {
				var t = this.constructor;
				return this.then(function(n) {
					return t.resolve(e()).then(function() {
						return n
					})
				}, function(n) {
					return t.resolve(e()).then(function() {
						return t.reject(n)
					})
				})
			}, r.all = function(e) {
				return new r(function(t, i) {
					if (!e || void 0 === e.length) throw new TypeError("Promise.all accepts an array");
					var a = Array.prototype.slice.call(e);
					if (0 === a.length) return t([]);
					var r = a.length;

					function o(e, s) {
						try {
							if (s && ("object" === (void 0 === s ? "undefined" : n(s)) || "function" == typeof s)) {
								var l = s.then;
								if ("function" == typeof l) return void l.call(s, function(t) {
									o(e, t)
								}, i)
							}
							a[e] = s, 0 == --r && t(a)
						} catch (e) {
							i(e)
						}
					}
					for (var s = 0; s < a.length; s++) o(s, a[s])
				})
			}, r.resolve = function(e) {
				return e && "object" === (void 0 === e ? "undefined" : n(e)) && e.constructor === r ? e : new r(function(t) {
					t(e)
				})
			}, r.reject = function(e) {
				return new r(function(t, n) {
					n(e)
				})
			}, r.race = function(e) {
				return new r(function(t, n) {
					for (var i = 0, a = e.length; i < a; i++) e[i].then(t, n)
				})
			}, r._immediateFn = "function" == typeof t &&
			function(e) {
				t(e)
			} ||
			function(e) {
				i(e, 0)
			}, r._unhandledRejectionFn = function(e) {
				"undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
			}, e.exports = r
		}).call(this, n(36).setImmediate)
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t
				}
			}(),
			a = v(n(37)),
			r = v(n(0)),
			o = v(n(3)),
			s = v(n(18)),
			l = v(n(17)),
			u = v(n(13)),
			c = v(n(12)),
			p = v(n(11)),
			d = v(n(9)),
			h = v(n(8)),
			y = v(n(7)),
			f = v(n(6));

		function v(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		var m = [],
			g = function() {
				function e(t) {
					if (function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.options = (0, s.
				default)(t), this.container = this.options.container, this.paused = !0, this.playedPromise = a.
				default.resolve(), this.mode = "normal", this.randomOrder = r.
				default.randomOrder(this.options.audio.length), this.container.classList.add("aplayer"), this.options.lrcType && !this.options.fixed && this.container.classList.add("aplayer-withlrc"), this.options.audio.length > 1 && this.container.classList.add("aplayer-withlist"), r.
				default.isMobile && this.container.classList.add("aplayer-mobile"), this.arrow = this.container.offsetWidth <= 300, this.arrow && this.container.classList.add("aplayer-arrow"), this.container = this.options.container, 2 === this.options.lrcType || !0 === this.options.lrcType) for (var n = this.container.getElementsByClassName("aplayer-lrc-content"), i = 0; i < n.length; i++) this.options.audio[i] && (this.options.audio[i].lrc = n[i].innerHTML);
					this.template = new l.
				default ({
						container: this.container,
						options: this.options,
						randomOrder: this.randomOrder
					}), this.options.fixed && (this.container.classList.add("aplayer-fixed"), this.template.body.style.width = this.template.body.offsetWidth - 18 + "px"), this.options.mini && (this.setMode("mini"), this.template.info.style.display = "block"), this.template.info.offsetWidth < 200 && this.template.time.classList.add("aplayer-time-narrow"), this.options.lrcType && (this.lrc = new p.
				default ({
						container: this.template.lrc,
						async: 3 === this.options.lrcType,
						player: this
					})), this.events = new y.
				default, this.storage = new c.
				default (this), this.bar = new u.
				default (this.template), this.controller = new d.
				default (this), this.timer = new h.
				default (this), this.list = new f.
				default (this), this.initAudio(), this.bindEvents(), "random" === this.options.order ? this.list.
					switch (this.randomOrder[0]):
					this.list.
					switch (0), this.options.autoplay && this.play(), m.push(this)
				}
				return i(e, [{
					key: "initAudio",
					value: function() {
						var e = this;
						this.audio = document.createElement("audio"), this.audio.preload = this.options.preload;
						for (var t = function(t) {
								e.audio.addEventListener(e.events.audioEvents[t], function(n) {
									e.events.trigger(e.events.audioEvents[t], n)
								})
							}, n = 0; n < this.events.audioEvents.length; n++) t(n);
						this.volume(this.storage.get("volume"), !0)
					}
				}, {
					key: "bindEvents",
					value: function() {
						var e = this;
						this.on("play", function() {
							e.paused && e.setUIPlaying()
						}), this.on("pause", function() {
							e.paused || e.setUIPaused()
						}), this.on("timeupdate", function() {
							if (!e.disableTimeupdate) {
								e.bar.set("played", e.audio.currentTime / e.duration, "width"), e.lrc && e.lrc.update();
								var t = r.
							default.secondToTime(e.audio.currentTime);
								e.template.ptime.innerHTML !== t && (e.template.ptime.innerHTML = t)
							}
						}), this.on("durationchange", function() {
							1 !== e.duration && (e.template.dtime.innerHTML = r.
						default.secondToTime(e.duration))
						}), this.on("progress", function() {
							var t = e.audio.buffered.length ? e.audio.buffered.end(e.audio.buffered.length - 1) / e.duration : 0;
							e.bar.set("loaded", t, "width")
						});
						var t = void 0;
						this.on("error", function() {
							e.list.audios.length > 1 ? (e.notice("An audio error has occurred, player will skip forward in 2 seconds."), t = setTimeout(function() {
								e.skipForward(), e.paused || e.play()
							}, 2e3)) : 1 === e.list.audios.length && e.notice("An audio error has occurred.")
						}), this.events.on("listswitch", function() {
							t && clearTimeout(t)
						}), this.on("ended", function() {
							"none" === e.options.loop ? "list" === e.options.order ? e.list.index < e.list.audios.length - 1 ? (e.list.
							switch ((e.list.index + 1) % e.list.audios.length), e.play()) : (e.list.
							switch ((e.list.index + 1) % e.list.audios.length), e.pause()) : "random" === e.options.order && (e.randomOrder.indexOf(e.list.index) < e.randomOrder.length - 1 ? (e.list.
							switch (e.nextIndex()), e.play()) : (e.list.
							switch (e.nextIndex()), e.pause())) : "one" === e.options.loop ? (e.list.
							switch (e.list.index), e.play()) : "all" === e.options.loop && (e.skipForward(), e.play())
						})
					}
				}, {
					key: "setAudio",
					value: function(e) {
						this.hls && (this.hls.destroy(), this.hls = null);
						var t = e.type;
						this.options.customAudioType && this.options.customAudioType[t] ? "[object Function]" === Object.prototype.toString.call(this.options.customAudioType[t]) ? this.options.customAudioType[t](this.audio, e, this) : console.error("Illegal customType: " + t) : (t && "auto" !== t || (t = /m3u8(#|\?|$)/i.exec(e.url) ? "hls" : "normal"), "hls" === t ? Hls.isSupported() ? (this.hls = new Hls, this.hls.loadSource(e.url), this.hls.attachMedia(this.audio)) : this.audio.canPlayType("application/x-mpegURL") || this.audio.canPlayType("application/vnd.apple.mpegURL") ? this.audio.src = e.url : this.notice("Error: HLS is not supported.") : "normal" === t && (this.audio.src = e.url)), this.seek(0), this.paused || this.audio.play()
					}
				}, {
					key: "theme",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.list.audios[this.list.index].theme || this.options.theme,
							t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.list.index;
						(!(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]) && this.list.audios[t] && (this.list.audios[t].theme = e), this.template.listCurs[t] && (this.template.listCurs[t].style.backgroundColor = e), t === this.list.index && (this.template.pic.style.backgroundColor = e, this.template.played.style.background = e, this.template.thumb.style.background = e, this.template.volume.style.background = e)
					}
				}, {
					key: "seek",
					value: function(e) {
						e = Math.max(e, 0), e = Math.min(e, this.duration), this.audio.currentTime = e, this.bar.set("played", e / this.duration, "width"), this.template.ptime.innerHTML = r.
					default.secondToTime(e)
					}
				}, {
					key: "setUIPlaying",
					value: function() {
						var e = this;
						if (this.paused && (this.paused = !1, this.template.button.classList.remove("aplayer-play"), this.template.button.classList.add("aplayer-pause"), this.template.button.innerHTML = "", setTimeout(function() {
							e.template.button.innerHTML = o.
						default.pause
						}, 100), this.template.skipPlayButton.innerHTML = o.
					default.pause), this.timer.enable("loading"), this.options.mutex) for (var t = 0; t < m.length; t++) this !== m[t] && m[t].pause()
					}
				}, {
					key: "play",
					value: function() {
						var e = this;
						this.setUIPlaying();
						var t = this.audio.play();
						t && t.
						catch (function(t) {
							console.warn(t), "NotAllowedError" === t.name && e.setUIPaused()
						})
					}
				}, {
					key: "setUIPaused",
					value: function() {
						var e = this;
						this.paused || (this.paused = !0, this.template.button.classList.remove("aplayer-pause"), this.template.button.classList.add("aplayer-play"), this.template.button.innerHTML = "", setTimeout(function() {
							e.template.button.innerHTML = o.
						default.play
						}, 100), this.template.skipPlayButton.innerHTML = o.
					default.play), this.container.classList.remove("aplayer-loading"), this.timer.disable("loading")
					}
				}, {
					key: "pause",
					value: function() {
						this.setUIPaused(), this.audio.pause()
					}
				}, {
					key: "switchVolumeIcon",
					value: function() {
						this.volume() >= .95 ? this.template.volumeButton.innerHTML = o.
					default.volumeUp:
						this.volume() > 0 ? this.template.volumeButton.innerHTML = o.
					default.volumeDown:
						this.template.volumeButton.innerHTML = o.
					default.volumeOff
					}
				}, {
					key: "volume",
					value: function(e, t) {
						return e = parseFloat(e), isNaN(e) || (e = Math.max(e, 0), e = Math.min(e, 1), this.bar.set("volume", e, "height"), t || this.storage.set("volume", e), this.audio.volume = e, this.audio.muted && (this.audio.muted = !1), this.switchVolumeIcon()), this.audio.muted ? 0 : this.audio.volume
					}
				}, {
					key: "on",
					value: function(e, t) {
						this.events.on(e, t)
					}
				}, {
					key: "toggle",
					value: function() {
						this.template.button.classList.contains("aplayer-play") ? this.play() : this.template.button.classList.contains("aplayer-pause") && this.pause()
					}
				}, {
					key: "switchAudio",
					value: function(e) {
						this.list.
						switch (e)
					}
				}, {
					key: "addAudio",
					value: function(e) {
						this.list.add(e)
					}
				}, {
					key: "removeAudio",
					value: function(e) {
						this.list.remove(e)
					}
				}, {
					key: "destroy",
					value: function() {
						m.splice(m.indexOf(this), 1), this.pause(), this.container.innerHTML = "", this.audio.src = "", this.timer.destroy(), this.events.trigger("destroy")
					}
				}, {
					key: "setMode",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "normal";
						this.mode = e, "mini" === e ? this.container.classList.add("aplayer-narrow") : "normal" === e && this.container.classList.remove("aplayer-narrow")
					}
				}, {
					key: "notice",
					value: function(e) {
						var t = this,
							n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3,
							i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : .8;
						this.template.notice.innerHTML = e, this.template.notice.style.opacity = i, this.noticeTime && clearTimeout(this.noticeTime), this.events.trigger("noticeshow", {
							text: e
						}), n && (this.noticeTime = setTimeout(function() {
							t.template.notice.style.opacity = 0, t.events.trigger("noticehide")
						}, n))
					}
				}, {
					key: "prevIndex",
					value: function() {
						if (!(this.list.audios.length > 1)) return 0;
						if ("list" === this.options.order) return this.list.index - 1 < 0 ? this.list.audios.length - 1 : this.list.index - 1;
						if ("random" === this.options.order) {
							var e = this.randomOrder.indexOf(this.list.index);
							return 0 === e ? this.randomOrder[this.randomOrder.length - 1] : this.randomOrder[e - 1]
						}
					}
				}, {
					key: "nextIndex",
					value: function() {
						if (!(this.list.audios.length > 1)) return 0;
						if ("list" === this.options.order) return (this.list.index + 1) % this.list.audios.length;
						if ("random" === this.options.order) {
							var e = this.randomOrder.indexOf(this.list.index);
							return e === this.randomOrder.length - 1 ? this.randomOrder[0] : this.randomOrder[e + 1]
						}
					}
				}, {
					key: "skipBack",
					value: function() {
						this.list.
						switch (this.prevIndex())
					}
				}, {
					key: "skipForward",
					value: function() {
						this.list.
						switch (this.nextIndex())
					}
				}, {
					key: "duration",
					get: function() {
						return isNaN(this.audio.duration) ? 0 : this.audio.duration
					}
				}], [{
					key: "version",
					get: function() {
						return "1.10.1"
					}
				}]), e
			}();
		t.
	default = g
	}, , function(e, t, n) {}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), n(40);
		var i, a = n(38),
			r = (i = a) && i.__esModule ? i : {
			default:
				i
			};
		console.log("\n %c APlayer v1.10.1 af84efb %c http://aplayer.js.org \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;"), t.
	default = r.
	default
	}]).
default
});


//kratos.js

//functions
(function() {
	'use strict';
	var shareMenu = function() {
			$(document).on('click', '.Share', function() {
				$('.share-wrap').fadeToggle('slow');
			});
		}
	var sidebaraffix = function() {
			if ($('#sidebar').height() && xb.site_sh) {
				if ($('#main').height() > $('#sidebar').height()) {
					var footerHeight = 0;
					if ($('#page-footer').length > 0) {
						footerHeight = $('#page-footer').outerHeight(true);
					}
					$('#sidebar').affix({
						offset: {
							top: $('#sidebar').offset().top - xb.site_sh,
							bottom: $('#footer').outerHeight(true) + footerHeight + 6
						}
					});
				}
			}
		}
	var toSearch = function() {
			$('.search-box').on('click', function(e) {
				$('#searchform').animate({
					width: '200px'
				}, 200), $('#searchform input').css('display', 'block');
				$(document).one('click', function() {
					$('#searchform').animate({
						width: '0'
					}, 100), $('#searchform input').hide();
				});
				e.stopPropagation();
			});
			$('#searchform').on('click', function(e) {
				e.stopPropagation();
			})
		}
	var showlove = function() {
			$.fn.postLike = function() {
				if ($(this).hasClass('done')) {
					layer.msg('您已经支持过了', function() {});
					return false;
				} else {
					$(this).addClass('done');
					layer.msg('感谢您的支持');
					var id = $(this).data('id'),
						action = $(this).data('action'),
						rateHolder = $(this).children('.count');
					var ajax_data = {
						action: 'love',
						um_id: id,
						um_action: action
					};
					$.post(xb.ajax_url, ajax_data, function(data) {
						$(rateHolder).html(data);
					});
					return false;
				}
			};
			$(document).on('click', '.Love', function() {
				$(this).postLike();
			});
		}
	var gotop = function() {
			$('.gotop-box').on('click', function(event) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: $('html').offset().top
				}, 500);
				return false;
			});
			$(window).scroll(function() {
				var $win = $(window);
				if ($win.scrollTop() > 200) {
					$('.gotop-box').addClass('active');
				} else {
					$('.gotop-box').removeClass('active');
				}
			});
		}
	var wechatpic = function() {
			$('#wechat-img').mouseout(function() {
				$('#wechat-pic')[0].style.display = 'none';
			})
			$('#wechat-img').mouseover(function() {
				$('#wechat-pic')[0].style.display = 'block';
			})
		}
	var showPhotos = function() {
			layer.photos({
				photos: '.kratos-post-content p,.kratos-status-post p',
				anim: 0
			});
		}
	var offcanvas = function() {
			var $clone = $('#kratos-menu-wrap').clone();
			$clone.attr({
				'id': 'offcanvas-menu'
			});
			$clone.find('> ul').attr({
				'class': 'ul-me',
				'id': ''
			});
			$('#kratos-page').prepend($clone);
			$('.js-kratos-nav-toggle').on('click', function() {
				if ($('.nav-toggle').hasClass('toon')) {
					$('.nav-toggle').removeClass('toon');
					$('#offcanvas-menu').css('right', '-240px');
				} else {
					$('.nav-toggle').addClass('toon');
					$('#offcanvas-menu').css('right', '0px');
				}
			});
			$('#offcanvas-menu a').on('click', function() {
				$('.nav-toggle').removeClass('toon');
				$('#offcanvas-menu').css('right', '-240px');
			});
			$('#offcanvas-menu').css('height', $(window).height());
			$('#offcanvas-menu').css('right', '-240px');
			$(window).resize(function() {
				var w = $(window);
				$('#offcanvas-menu').css('height', w.height());
				if (w.width() > 769) {
					if ($('.nav-toggle').hasClass('toon')) {
						$('.nav-toggle').removeClass('toon');
						$('#offcanvas-menu').css('right', '-240px');
					}
				}
			});
		}
	var menu = function() {
			$(document).click(function(e) {
				var container = $('#offcanvas-menu,.js-kratos-nav-toggle');
				if (!container.is(e.target) && container.has(e.target).length === 0) {
					if ($('.nav-toggle').hasClass('toon')) {
						$('.nav-toggle').removeClass('toon');
						$('#offcanvas-menu').css('right', '-240px');
					}
				}
			});
			$('#kratos-header-section:not(.color-banner) ul>li').hover(function() {
				$(this).children('ul').slideDown(150)
			}, function() {
				$(this).children('ul').stop(true, false).slideUp(200)
			});
		}
	var xControl = function() {
			$(document).on('click', '.xHeading', function(event) {
				var $this = $(this);
				$this.closest('.xControl').find('.xContent').slideToggle(300);
				if ($this.closest('.xControl').hasClass('active')) {
					$this.closest('.xControl').removeClass('active');
				} else {
					$this.closest('.xControl').addClass('active');
				}
				event.preventDefault();
			});
		}
	var donateConfig = function() {
			$(document).on('click', '.Donate', function() {
				layer.open({
					type: 1,
					area: ['300px', '370px'],
					title: '打赏作者',
					resize: false,
					scrollbar: false,
					content: '<div class="donate-box"><div class="meta-pay text-center"><strong>扫一扫支付</strong></div><div class="qr-pay text-center"><img class="pay-img" id="alipay_qr" src="' + xb.alipay + '"><img class="pay-img d-none" id="wechat_qr" src="' + xb.wechat + '"></div><div class="choose-pay text-center mt-2"><input id="alipay" type="radio" name="pay-method" checked><label for="alipay" class="pay-button"><img src="' + xb.thome + '/static/images/alipay.png"></label><input id="wechatpay" type="radio" name="pay-method"><label for="wechatpay" class="pay-button"><img src="' + xb.thome + '/static/images/wechat.png"></label></div></div>'
				});
				$('.choose-pay input[type="radio"]').click(function() {
					var id = $(this).attr('id');
					if (id == 'alipay') {
						$('.qr-pay #alipay_qr').removeClass('d-none');
						$('.qr-pay #wechat_qr').addClass('d-none')
					};
					if (id == 'wechatpay') {
						$('.qr-pay #alipay_qr').addClass('d-none');
						$('.qr-pay #wechat_qr').removeClass('d-none')
					};
				});
			});
		}
	var OwOcfg = function() {
			if ($('#commentform').height()) {
				var OwO_demo = new OwO({
					logo: 'OωO表情',
					container: document.getElementsByClassName('OwO')[0],
					target: document.getElementsByClassName('OwO')[0],
					api: xb.thome + '/inc/OwO.json',
					position: 'down',
					width: '90%',
					maxHeight: '250px'
				});
			}
		}
	var APF = function() {
			var $this = $('#ap-footer');
			$.ajax({
				url: $this.attr('data-json'),
				success: function(e) {
					var a = new APlayer({
						element: document.getElementById('ap-footer'),
						autoplay: $this.attr('data-autoplay'),
						fixed: true,
						loop: $this.attr('data-loop'),
						order: $this.attr('data-order'),
						listFolded: true,
						showlrc: 3,
						theme: '#e6d0b2',
						listmaxheight: '200px',
						music: eval(e)
					});
					window.aplayers || (window.aplayers = []), window.aplayers.push(a)
				}
			})
		}
	var SnowF = function() {
			var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
			window.requestAnimationFrame = requestAnimationFrame;
			var flakes = [],
				canvas = document.getElementById("Snow"),
				ctx = canvas.getContext("2d"),
				flakeCount = parseInt($('#Snow').attr('data-count')),
				mX = -100,
				mY = -100;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			function snow() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				for (var i = 0; i < flakeCount; i++) {
					var flake = flakes[i],
						x = mX,
						y = mY,
						minDist = parseInt($('#Snow').attr('data-dist')),
						x2 = flake.x,
						y2 = flake.y;
					var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
						dx = x2 - x,
						dy = y2 - y;
					if (dist < minDist) {
						var force = minDist / (dist * dist),
							xcomp = (x - x2) / dist,
							ycomp = (y - y2) / dist,
							deltaV = force / 2;
						flake.velX -= deltaV * xcomp;
						flake.velY -= deltaV * ycomp;
					} else {
						flake.velX *= 0.98;
						if (flake.velY <= flake.speed) {
							flake.velY = flake.speed;
						}
						flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
					}
					ctx.fillStyle = "rgba(" + $('#Snow').attr('data-color') + "," + flake.opacity + ")";
					flake.y += flake.velY;
					flake.x += flake.velX;
					if (flake.y >= canvas.height || flake.y <= 0) {
						reset(flake);
					}
					if (flake.x >= canvas.width || flake.x <= 0) {
						reset(flake);
					}
					ctx.beginPath();
					ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
					ctx.fill();
				}
				requestAnimationFrame(snow);
			};

			function reset(flake) {
				flake.x = Math.floor(Math.random() * canvas.width);
				flake.y = 0;
				flake.size = (Math.random() * 3) + parseInt($('#Snow').attr('data-size'));
				flake.speed = (Math.random() * 1) + parseInt($('#Snow').attr('data-speed'));
				flake.velY = flake.speed;
				flake.velX = 0;
				flake.opacity = (Math.random() * 0.5) + parseInt($('#Snow').attr('data-opacity'));
			}

			function init() {
				for (var i = 0; i < flakeCount; i++) {
					var x = Math.floor(Math.random() * canvas.width),
						y = Math.floor(Math.random() * canvas.height),
						size = (Math.random() * 3) + parseInt($('#Snow').attr('data-size')),
						speed = (Math.random() * 1) + parseInt($('#Snow').attr('data-speed')),
						opacity = (Math.random() * 0.5) + parseInt($('#Snow').attr('data-opacity'));
					flakes.push({
						speed: speed,
						velY: speed,
						velX: 0,
						x: x,
						y: y,
						size: size,
						stepSize: (Math.random()) / 30 * parseInt($('#Snow').attr('data-step')),
						step: 0,
						angle: 180,
						opacity: opacity
					});
				}
				snow();
			};
			document.addEventListener('mousemove', function(e) {
				mX = e.clientX, mY = e.clientY
			});
			window.addEventListener('resize', function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			});
			init();
		}
		//pjax reload
		$.fn.kratos_pjax_reload = function() {
			sidebaraffix();
			showPhotos();
			OwOcfg();
		}
	$(function() {
		gotop();
		sidebaraffix();
		offcanvas();
		menu();
		toSearch();
		xControl();
		showPhotos();
		donateConfig();
		showlove();
		shareMenu();
		OwOcfg();
		wechatpic();
		if ($('div').hasClass('aplayer-footer')) APF();
		if ($('div').hasClass('xb-snow')) SnowF();
	});
}());
//comment ajax
$('body').on('click', '.comment-reply-link', function() {
	if ($(this).attr('onclick')) return;
	addComment.moveForm($(this).attr('data-belowelement'), $(this).attr('data-commentid'), $(this).attr('data-respondelement'), $(this).attr('data-postid'));
	return false;
});
jQuery(document).ready(function(jQuery) {
	var __cancel = jQuery('#cancel-comment-reply-link'),
		__cancel_text = __cancel.text(),
		__list = 'comment-list';
	jQuery(document).on('submit', '#commentform', function() {
		jQuery.ajax({
			url: xb.ajax_url,
			data: jQuery(this).serialize() + '&action=ajax_comment',
			type: jQuery(this).attr('method'),
			beforeSend: addComment.createButterbar('正在提交'),
			error: function(request) {
				var t = addComment;
				t.createButterbar(request.responseText)
			},
			success: function(data) {
				jQuery('textarea').each(function() {
					this.value = ''
				});
				var t = addComment,
					cancel = t.I('cancel-comment-reply-link'),
					temp = t.I('wp-temp-form-div'),
					respond = t.I(t.respondId),
					post = t.I('comment_post_ID').value,
					parent = t.I('comment_parent').value;
				if (parent != '0') {
					jQuery('#respond').before('<ol class="children">' + data + '</ol>')
				} else if (!jQuery('.' + __list).length) {
					jQuery('#comments-nav').before('<ol class="' + __list + '">' + data + '</ol>')
				} else {
					if (xb.order == 'asc') {
						jQuery('.' + __list).append(data)
					} else {
						jQuery('.' + __list).prepend(data)
					}
				}
				t.createButterbar('评论成功，如果魔力值未增加说明达到上限');
				cancel.style.display = 'none';
				cancel.onclick = null;
				t.I('comment_parent').value = '0';
				if (temp && respond) {
					temp.parentNode.insertBefore(respond, temp);
					temp.parentNode.removeChild(temp)
				}
			}
		});
		return false
	});
	addComment = {
		moveForm: function(commId, parentId, respondId) {
			var t = this,
				div, comm = t.I(commId),
				respond = t.I(respondId),
				cancel = t.I('cancel-comment-reply-link'),
				parent = t.I('comment_parent'),
				post = t.I('comment_post_ID');
			__cancel.text(__cancel_text);
			t.respondId = respondId;
			if (!t.I('wp-temp-form-div')) {
				div = document.createElement('div');
				div.id = 'wp-temp-form-div';
				div.style.display = 'none';
				respond.parentNode.insertBefore(div, respond)
			}!comm ? (temp = t.I('wp-temp-form-div'), t.I('comment_parent').value = '0', temp.parentNode.insertBefore(respond, temp), temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);
			jQuery('body').animate({
				scrollTop: jQuery('#respond').offset().top - 180
			}, 400);
			parent.value = parentId;
			cancel.style.display = '';
			cancel.onclick = function() {
				var t = addComment,
					temp = t.I('wp-temp-form-div'),
					respond = t.I(t.respondId);
				t.I('comment_parent').value = '0';
				if (temp && respond) {
					temp.parentNode.insertBefore(respond, temp);
					temp.parentNode.removeChild(temp)
				}
				this.style.display = 'none';
				this.onclick = null;
				return false
			};
			try {
				t.I('comment').focus()
			} catch (e) {}
			return false
		},
		I: function(e) {
			return document.getElementById(e)
		},
		createButterbar: function(message) {
			var t = this;
			layer.msg(message)
		}
	};

	// 用户信息弹窗
	let infoCss = {
		backgroundColor: "transparent",
		boxShadow: "none"
	}

	let userInfoE = $("aside.widget.widget_cp_pointswidget.clearfix").css(infoCss);
	let userInfoE_new = userInfoE.clone(true);

	let userInfoTopE = $("aside.widget.widget_cp_topuserswidget.clearfix").css(infoCss);
	let userInfoTopE_new = userInfoTopE.clone(true);

	let userInfoWarp = $("<div class='user-info-warp'></div>").append(userInfoE_new).append(userInfoTopE_new).css({
		// backgroundColor: "rgba(100, 178, 255, .9)",
		backgroundColor: "rgba(155, 205, 247, 0.7)",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		// border: "1px solid skyblue",
		// width : 300,
		width: userInfoE.css("width"),
		height: "auto",
		borderRadius: 10,

	}).click(function(event) {
		event = event || window.event;
		event.stopPropagation();
		return false;
	});

	let contentUserInfoE = $("<div class='user-info-background'></div>").append(userInfoWarp).css({
		backgroundColor: "rgba(80, 80, 80, 0.8)",
		// opacity : 0.7,
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 99991,

	});
	contentUserInfoE.hide().click(() = > {
		console.log("测试页码");
		contentUserInfoE.hide();
	});

	$(document.body).append(contentUserInfoE);

	let userInfoBtn = $("#userInfoBtn").css({
		position: "fixed",
		// top : 0,
		// left : 0,
		right: 20,
		bottom: 130,
		display: "table-cell",
		verticalAlign: "middle",
		backgroundColor: "#848484",
		visibility: "visible",
		opacity: .7,
		color: "#fff",
		width: 40,
		height: 40,
		fontSize: 18
	}).click(() = > {
		console.log("测试页码");
		contentUserInfoE.show();
	});


});
//highlight
hljs.initHighlightingOnLoad();
//time
var now = new Date();

function createtime() {
	var grt = new Date(xb.ctime);
	now.setTime(now.getTime() + 250);
	days = (now - grt) / 1000 / 60 / 60 / 24;
	dnum = Math.floor(days);
	hours = (now - grt) / 1000 / 60 / 60 - (24 * dnum);
	hnum = Math.floor(hours);
	if (String(hnum).length == 1) {
		hnum = '0' + hnum;
	}
	minutes = (now - grt) / 1000 / 60 - (24 * 60 * dnum) - (60 * hnum);
	mnum = Math.floor(minutes);
	if (String(mnum).length == 1) {
		mnum = '0' + mnum;
	}
	seconds = (now - grt) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
	snum = Math.round(seconds);
	if (String(snum).length == 1) {
		snum = '0' + snum;
	}
	document.getElementById('span_dt_dt').innerHTML = dnum + '天' + hnum + '小时' + mnum + '分' + snum + '秒';
}
setInterval('createtime()', 250);
//copy
if (xb.copy) document.body.oncopy = function() {
	alert('复制成功，请遵守本站条约！');
}
//console
window.onload = function() {
	var now = new Date().getTime();
	var page_load_time = now - performance.timing.navigationStart;

	// console.clear();
	console.log('项目托管:https://github.com/xb2016/kratos-pjax');
	console.log('%cwww.fczbl.vip', 'font-size:2em');
	console.log('%c页面加载完毕消耗了' + Math.round(performance.now() * 100) / 100 + 'ms', 'background:#fff;color:#333;text-shadow:0 0 2px #eee,0 0 3px #eee,0 0 3px #eee,0 0 2px #eee,0 0 3px #eee;');
};


//layer.min.js

;
!
function(e, t) {
	"use strict";
	var i, n, a = e.layui && layui.define,
		o = {
			getPath: function() {
				var e = document.scripts,
					t = e[e.length - 1],
					i = t.src;
				if (!t.getAttribute("merge")) return i.substring(0, i.lastIndexOf("/") + 1)
			}(),
			config: {},
			end: {},
			minIndex: 0,
			minLeft: [],
			btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
			type: ["dialog", "page", "iframe", "loading", "tips"],
			getStyle: function(t, i) {
				var n = t.currentStyle ? t.currentStyle : e.getComputedStyle(t, null);
				return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](i)
			},
			link: function(t, i, n) {}
		},
		r = {
			v: "3.1.0",
			ie: function() {
				var t = navigator.userAgent.toLowerCase();
				return !!(e.ActiveXObject || "ActiveXObject" in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11")
			}(),
			index: e.layer && e.layer.v ? 1e5 : 0,
			path: o.getPath,
			config: function(e, t) {
				return e = e || {}, r.cache = o.config = i.extend({}, o.config, e), r.path = o.config.path || r.path, "string" == typeof e.extend && (e.extend = [e.extend]), o.config.path && r.ready(), e.extend ? (a ? layui.addcss("modules/layer/" + e.extend) : o.link("theme/" + e.extend), this) : this
			},
			ready: function(e) {},
			alert: function(e, t, n) {
				var a = "function" == typeof t;
				return a && (n = t), r.open(i.extend({
					content: e,
					yes: n
				}, a ? {} : t))
			},
			confirm: function(e, t, n, a) {
				var s = "function" == typeof t;
				return s && (a = n, n = t), r.open(i.extend({
					content: e,
					btn: o.btn,
					yes: n,
					btn2: a
				}, s ? {} : t))
			},
			msg: function(e, n, a) {
				var s = "function" == typeof n,
					f = o.config.skin,
					c = (f ? f + " " + f + "-msg" : "") || "layui-layer-msg",
					u = l.anim.length - 1;
				return s && (a = n), r.open(i.extend({
					content: e,
					time: 3e3,
					shade: !1,
					skin: c,
					title: !1,
					closeBtn: !1,
					btn: !1,
					resize: !1,
					end: a
				}, s && !o.config.skin ? {
					skin: c + " layui-layer-hui",
					anim: u
				} : function() {
					return n = n || {}, (n.icon === -1 || n.icon === t && !o.config.skin) && (n.skin = c + " " + (n.skin || "layui-layer-hui")), n
				}()))
			},
			load: function(e, t) {
				return r.open(i.extend({
					type: 3,
					icon: e || 0,
					resize: !1,
					shade: .01
				}, t))
			},
			tips: function(e, t, n) {
				return r.open(i.extend({
					type: 4,
					content: [e, t],
					closeBtn: !1,
					time: 3e3,
					shade: !1,
					resize: !1,
					fixed: !1,
					maxWidth: 210
				}, n))
			}
		},
		s = function(e) {
			var t = this;
			t.index = ++r.index, t.config = i.extend({}, t.config, o.config, e), document.body ? t.creat() : setTimeout(function() {
				t.creat()
			}, 30)
		};
	s.pt = s.prototype;
	var l = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
	l.anim = ["layer-anim-00", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"], s.pt.config = {
		type: 0,
		shade: .3,
		fixed: !0,
		move: l[1],
		title: "&#x4FE1;&#x606F;",
		offset: "auto",
		area: "auto",
		closeBtn: 1,
		time: 0,
		zIndex: 19891014,
		maxWidth: 360,
		anim: 0,
		isOutAnim: !0,
		icon: -1,
		moveType: 1,
		resize: !0,
		scrollbar: !0,
		tips: 2
	}, s.pt.vessel = function(e, t) {
		var n = this,
			a = n.index,
			r = n.config,
			s = r.zIndex + a,
			f = "object" == typeof r.title,
			c = r.maxmin && (1 === r.type || 2 === r.type),
			u = r.title ? '<div class="layui-layer-title" style="' + (f ? r.title[1] : "") + '">' + (f ? r.title[0] : r.title) + "</div>" : "";
		return r.zIndex = s, t([r.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + a + '" times="' + a + '" style="' + ("z-index:" + (s - 1) + "; ") + '"></div>' : "", '<div class="' + l[0] + (" layui-layer-" + o.type[r.type]) + (0 != r.type && 2 != r.type || r.shade ? "" : " layui-layer-border") + " " + (r.skin || "") + '" id="' + l[0] + a + '" type="' + o.type[r.type] + '" times="' + a + '" showtime="' + r.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + r.area[0] + ";height:" + r.area[1] + (r.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != r.type ? "" : u) + '<div id="' + (r.id || "") + '" class="layui-layer-content' + (0 == r.type && r.icon !== -1 ? " layui-layer-padding" : "") + (3 == r.type ? " layui-layer-loading" + r.icon : "") + '">' + (0 == r.type && r.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + r.icon + '"></i>' : "") + (1 == r.type && e ? "" : r.content || "") + '</div><span class="layui-layer-setwin">' +
		function() {
			var e = c ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
			return r.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (r.title ? r.closeBtn : 4 == r.type ? "1" : "2") + '" href="javascript:;"></a>'), e
		}() + "</span>" + (r.btn ?
		function() {
			var e = "";
			"string" == typeof r.btn && (r.btn = [r.btn]);
			for (var t = 0, i = r.btn.length; t < i; t++) e += '<a class="' + l[6] + t + '">' + r.btn[t] + "</a>";
			return '<div class="' + l[6] + " layui-layer-btn-" + (r.btnAlign || "") + '">' + e + "</div>"
		}() : "") + (r.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], u, i('<div class="layui-layer-move"></div>')), n
	}, s.pt.creat = function() {
		var e = this,
			t = e.config,
			a = e.index,
			s = t.content,
			f = "object" == typeof s,
			c = i("body");
		if (!t.id || !i("#" + t.id)[0]) {
			switch ("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]), t.shift && (t.anim = t.shift), 6 == r.ie && (t.fixed = !1), t.type) {
			case 0:
				t.btn = "btn" in t ? t.btn : o.btn[0], r.closeAll("dialog");
				break;
			case 2:
				var s = t.content = f ? t.content : [t.content || "http://layer.layui.com", "auto"];
				t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + a + '" name="' + l[4] + a + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
				break;
			case 3:
				delete t.title, delete t.closeBtn, t.icon === -1 && 0 === t.icon, r.closeAll("loading");
				break;
			case 4:
				f || (t.content = [t.content, "body"]), t.follow = t.content[1], t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>', delete t.title, t.tips = "object" == typeof t.tips ? t.tips : [t.tips, !0], t.tipsMore || r.closeAll("tips")
			}
			if (e.vessel(f, function(n, r, u) {
				c.append(n[0]), f ?
				function() {
					2 == t.type || 4 == t.type ?
					function() {
						i("body").append(n[1])
					}() : function() {
						s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]), i("#" + l[0] + a).find("." + l[5]).before(r))
					}()
				}() : c.append(n[1]), i(".layui-layer-move")[0] || c.append(o.moveElem = u), e.layero = i("#" + l[0] + a), t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", a)
			}).auto(a), i("#layui-layer-shade" + e.index).css({
				"background-color": t.shade[1] || "#000",
				opacity: t.shade[0] || t.shade
			}), 2 == t.type && 6 == r.ie && e.layero.find("iframe").attr("src", s[0]), 4 == t.type ? e.tips() : e.offset(), t.fixed && n.on("resize", function() {
				e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(a), 4 == t.type && e.tips()
			}), t.time <= 0 || setTimeout(function() {
				r.close(e.index)
			}, t.time), e.move().callback(), l.anim[t.anim]) {
				var u = "layer-anim " + l.anim[t.anim];
				e.layero.addClass(u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
					i(this).removeClass(u)
				})
			}
			t.isOutAnim && e.layero.data("isOutAnim", !0)
		}
	}, s.pt.auto = function(e) {
		var t = this,
			a = t.config,
			o = i("#" + l[0] + e);
		"" === a.area[0] && a.maxWidth > 0 && (r.ie && r.ie < 8 && a.btn && o.width(o.innerWidth()), o.outerWidth() > a.maxWidth && o.width(a.maxWidth));
		var s = [o.innerWidth(), o.innerHeight()],
			f = o.find(l[1]).outerHeight() || 0,
			c = o.find("." + l[6]).outerHeight() || 0,
			u = function(e) {
				e = o.find(e), e.height(s[1] - f - c - 2 * (0 | parseFloat(e.css("padding-top"))))
			};
		switch (a.type) {
		case 2:
			u("iframe");
			break;
		default:
			"" === a.area[1] ? a.maxHeight > 0 && o.outerHeight() > a.maxHeight ? (s[1] = a.maxHeight, u("." + l[5])) : a.fixed && s[1] >= n.height() && (s[1] = n.height(), u("." + l[5])) : u("." + l[5])
		}
		return t
	}, s.pt.offset = function() {
		var e = this,
			t = e.config,
			i = e.layero,
			a = [i.outerWidth(), i.outerHeight()],
			o = "object" == typeof t.offset;
		e.offsetTop = (n.height() - a[1]) / 2, e.offsetLeft = (n.width() - a[0]) / 2, o ? (e.offsetTop = t.offset[0], e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - a[0] : "b" === t.offset ? e.offsetTop = n.height() - a[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = n.width() - a[0]) : "rb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = n.width() - a[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ? n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += n.scrollTop(), e.offsetLeft += n.scrollLeft()), i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(l[1]).outerHeight() || 0), e.offsetLeft = i.css("left")), i.css({
			top: e.offsetTop,
			left: e.offsetLeft
		})
	}, s.pt.tips = function() {
		var e = this,
			t = e.config,
			a = e.layero,
			o = [a.outerWidth(), a.outerHeight()],
			r = i(t.follow);
		r[0] || (r = i("body"));
		var s = {
			width: r.outerWidth(),
			height: r.outerHeight(),
			top: r.offset().top,
			left: r.offset().left
		},
			f = a.find(".layui-layer-TipsG"),
			c = t.tips[0];
		t.tips[1] || f.remove(), s.autoLeft = function() {
			s.left + o[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - o[0], f.css({
				right: 12,
				left: "auto"
			})) : s.tipLeft = s.left
		}, s.where = [function() {
			s.autoLeft(), s.tipTop = s.top - o[1] - 10, f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1])
		}, function() {
			s.tipLeft = s.left + s.width + 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1])
		}, function() {
			s.autoLeft(), s.tipTop = s.top + s.height + 10, f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1])
		}, function() {
			s.tipLeft = s.left - o[0] - 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1])
		}], s.where[c - 1](), 1 === c ? s.top - (n.scrollTop() + o[1] + 16) < 0 && s.where[2]() : 2 === c ? n.width() - (s.left + s.width + o[0] + 16) > 0 || s.where[3]() : 3 === c ? s.top - n.scrollTop() + s.height + o[1] + 16 - n.height() > 0 && s.where[0]() : 4 === c && o[0] + 16 - s.left > 0 && s.where[1](), a.find("." + l[5]).css({
			"background-color": t.tips[1],
			"padding-right": t.closeBtn ? "30px" : ""
		}), a.css({
			left: s.tipLeft - (t.fixed ? n.scrollLeft() : 0),
			top: s.tipTop - (t.fixed ? n.scrollTop() : 0)
		})
	}, s.pt.move = function() {
		var e = this,
			t = e.config,
			a = i(document),
			s = e.layero,
			l = s.find(t.move),
			f = s.find(".layui-layer-resize"),
			c = {};
		return t.move, l.on("mousedown", function(e) {
			e.preventDefault(), t.move && (c.moveStart = !0, c.offset = [e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top"))], o.moveElem.css("cursor", "move").show())
		}), f.on("mousedown", function(e) {
			e.preventDefault(), c.resizeStart = !0, c.offset = [e.clientX, e.clientY], c.area = [s.outerWidth(), s.outerHeight()], o.moveElem.css("cursor", "se-resize").show()
		}), a.on("mousemove", function(i) {
			if (c.moveStart) {
				var a = i.clientX - c.offset[0],
					o = i.clientY - c.offset[1],
					l = "fixed" === s.css("position");
				if (i.preventDefault(), c.stX = l ? 0 : n.scrollLeft(), c.stY = l ? 0 : n.scrollTop(), !t.moveOut) {
					var f = n.width() - s.outerWidth() + c.stX,
						u = n.height() - s.outerHeight() + c.stY;
					a < c.stX && (a = c.stX), a > f && (a = f), o < c.stY && (o = c.stY), o > u && (o = u)
				}
				s.css({
					left: a,
					top: o
				})
			}
			if (t.resize && c.resizeStart) {
				var a = i.clientX - c.offset[0],
					o = i.clientY - c.offset[1];
				i.preventDefault(), r.style(e.index, {
					width: c.area[0] + a,
					height: c.area[1] + o
				}), c.isResize = !0, t.resizing && t.resizing(s)
			}
		}).on("mouseup", function(e) {
			c.moveStart && (delete c.moveStart, o.moveElem.hide(), t.moveEnd && t.moveEnd(s)), c.resizeStart && (delete c.resizeStart, o.moveElem.hide())
		}), e
	}, s.pt.callback = function() {
		function e() {
			var e = a.cancel && a.cancel(t.index, n);
			e === !1 || r.close(t.index)
		}
		var t = this,
			n = t.layero,
			a = t.config;
		t.openLayer(), a.success && (2 == a.type ? n.find("iframe").on("load", function() {
			a.success(n, t.index)
		}) : a.success(n, t.index)), 6 == r.ie && t.IE6(n), n.find("." + l[6]).children("a").on("click", function() {
			var e = i(this).index();
			if (0 === e) a.yes ? a.yes(t.index, n) : a.btn1 ? a.btn1(t.index, n) : r.close(t.index);
			else {
				var o = a["btn" + (e + 1)] && a["btn" + (e + 1)](t.index, n);
				o === !1 || r.close(t.index)
			}
		}), n.find("." + l[7]).on("click", e), a.shadeClose && i("#layui-layer-shade" + t.index).on("click", function() {
			r.close(t.index)
		}), n.find(".layui-layer-min").on("click", function() {
			var e = a.min && a.min(n);
			e === !1 || r.min(t.index, a)
		}), n.find(".layui-layer-max").on("click", function() {
			i(this).hasClass("layui-layer-maxmin") ? (r.restore(t.index), a.restore && a.restore(n)) : (r.full(t.index, a), setTimeout(function() {
				a.full && a.full(n)
			}, 100))
		}), a.end && (o.end[t.index] = a.end)
	}, o.reselect = function() {
		i.each(i("select"), function(e, t) {
			var n = i(this);
			n.parents("." + l[0])[0] || 1 == n.attr("layer") && i("." + l[0]).length < 1 && n.removeAttr("layer").show(), n = null
		})
	}, s.pt.IE6 = function(e) {
		i("select").each(function(e, t) {
			var n = i(this);
			n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({
				layer: "1"
			}).hide(), n = null
		})
	}, s.pt.openLayer = function() {
		var e = this;
		r.zIndex = e.config.zIndex, r.setTop = function(e) {
			var t = function() {
					r.zIndex++, e.css("z-index", r.zIndex + 1)
				};
			return r.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", t), r.zIndex
		}
	}, o.record = function(e) {
		var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
		e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({
			area: t
		})
	}, o.rescollbar = function(e) {
		l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"), l.html.removeAttr("layer-full"))
	}, e.layer = r, r.getChildFrame = function(e, t) {
		return t = t || i("." + l[4]).attr("times"), i("#" + l[0] + t).find("iframe").contents().find(e)
	}, r.getFrameIndex = function(e) {
		return i("#" + e).parents("." + l[4]).attr("times")
	}, r.iframeAuto = function(e) {
		if (e) {
			var t = r.getChildFrame("html", e).outerHeight(),
				n = i("#" + l[0] + e),
				a = n.find(l[1]).outerHeight() || 0,
				o = n.find("." + l[6]).outerHeight() || 0;
			n.css({
				height: t + a + o
			}), n.find("iframe").css({
				height: t
			})
		}
	}, r.iframeSrc = function(e, t) {
		i("#" + l[0] + e).find("iframe").attr("src", t)
	}, r.style = function(e, t, n) {
		var a = i("#" + l[0] + e),
			r = a.find(".layui-layer-content"),
			s = a.attr("type"),
			f = a.find(l[1]).outerHeight() || 0,
			c = a.find("." + l[6]).outerHeight() || 0;
		a.attr("minLeft");
		s !== o.type[3] && s !== o.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - f - c <= 64 && (t.height = 64 + f + c)), a.css(t), c = a.find("." + l[6]).outerHeight(), s === o.type[2] ? a.find("iframe").css({
			height: parseFloat(t.height) - f - c
		}) : r.css({
			height: parseFloat(t.height) - f - c - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom"))
		}))
	}, r.min = function(e, t) {
		var a = i("#" + l[0] + e),
			s = a.find(l[1]).outerHeight() || 0,
			f = a.attr("minLeft") || 181 * o.minIndex + "px",
			c = a.css("position");
		o.record(a), o.minLeft[0] && (f = o.minLeft[0], o.minLeft.shift()), a.attr("position", c), r.style(e, {
			width: 180,
			height: s,
			left: f,
			top: n.height() - s,
			position: "fixed",
			overflow: "hidden"
		}, !0), a.find(".layui-layer-min").hide(), "page" === a.attr("type") && a.find(l[4]).hide(), o.rescollbar(e), a.attr("minLeft") || o.minIndex++, a.attr("minLeft", f)
	}, r.restore = function(e) {
		var t = i("#" + l[0] + e),
			n = t.attr("area").split(",");
		t.attr("type");
		r.style(e, {
			width: parseFloat(n[0]),
			height: parseFloat(n[1]),
			top: parseFloat(n[2]),
			left: parseFloat(n[3]),
			position: t.attr("position"),
			overflow: "visible"
		}, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), "page" === t.attr("type") && t.find(l[4]).show(), o.rescollbar(e)
	}, r.full = function(e) {
		var t, a = i("#" + l[0] + e);
		o.record(a), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), clearTimeout(t), t = setTimeout(function() {
			var t = "fixed" === a.css("position");
			r.style(e, {
				top: t ? 0 : n.scrollTop(),
				left: t ? 0 : n.scrollLeft(),
				width: n.width(),
				height: n.height()
			}, !0), a.find(".layui-layer-min").hide()
		}, 100)
	}, r.title = function(e, t) {
		var n = i("#" + l[0] + (t || r.index)).find(l[1]);
		n.html(e)
	}, r.close = function(e) {
		var t = i("#" + l[0] + e),
			n = t.attr("type"),
			a = "layer-anim-close";
		if (t[0]) {
			var s = "layui-layer-wrap",
				f = function() {
					if (n === o.type[1] && "object" === t.attr("conType")) {
						t.children(":not(." + l[5] + ")").remove();
						for (var a = t.find("." + s), r = 0; r < 2; r++) a.unwrap();
						a.css("display", a.data("display")).removeClass(s)
					} else {
						if (n === o.type[2]) try {
							var f = i("#" + l[4] + e)[0];
							f.contentWindow.document.write(""), f.contentWindow.close(), t.find("." + l[5])[0].removeChild(f)
						} catch (c) {}
						t[0].innerHTML = "", t.remove()
					}
					"function" == typeof o.end[e] && o.end[e](), delete o.end[e]
				};
			t.data("isOutAnim") && t.addClass("layer-anim " + a), i("#layui-layer-moves, #layui-layer-shade" + e).remove(), 6 == r.ie && o.reselect(), o.rescollbar(e), t.attr("minLeft") && (o.minIndex--, o.minLeft.push(t.attr("minLeft"))), r.ie && r.ie < 10 || !t.data("isOutAnim") ? f() : setTimeout(function() {
				f()
			}, 200)
		}
	}, r.closeAll = function(e) {
		i.each(i("." + l[0]), function() {
			var t = i(this),
				n = e ? t.attr("type") === e : 1;
			n && r.close(t.attr("times")), n = null
		})
	};
	var f = r.cache || {},
		c = function(e) {
			return f.skin ? " " + f.skin + " " + f.skin + "-" + e : ""
		};
	r.prompt = function(e, t) {
		var a = "";
		if (e = e || {}, "function" == typeof e && (t = e), e.area) {
			var o = e.area;
			a = 'style="width: ' + o[0] + "; height: " + o[1] + ';"', delete e.area
		}
		var s, l = 2 == e.formType ? '<textarea class="layui-layer-input"' + a + ">" + (e.value || "") + "</textarea>" : function() {
				return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (e.value || "") + '">'
			}(),
			f = e.success;
		return delete e.success, r.open(i.extend({
			type: 1,
			btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
			content: l,
			skin: "layui-layer-prompt" + c("prompt"),
			maxWidth: n.width(),
			success: function(e) {
				s = e.find(".layui-layer-input"), s.focus(), "function" == typeof f && f(e)
			},
			resize: !1,
			yes: function(i) {
				var n = s.val();
				"" === n ? s.focus() : n.length > (e.maxlength || 500) ? r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {
					tips: 1
				}) : t && t(n, i, s)
			}
		}, e))
	}, r.tab = function(e) {
		e = e || {};
		var t = e.tab || {},
			n = "layui-this",
			a = e.success;
		return delete e.success, r.open(i.extend({
			type: 1,
			skin: "layui-layer-tab" + c("tab"),
			resize: !1,
			title: function() {
				var e = t.length,
					i = 1,
					a = "";
				if (e > 0) for (a = '<span class="' + n + '">' + t[0].title + "</span>"; i < e; i++) a += "<span>" + t[i].title + "</span>";
				return a
			}(),
			content: '<ul class="layui-layer-tabmain">' +
			function() {
				var e = t.length,
					i = 1,
					a = "";
				if (e > 0) for (a = '<li class="layui-layer-tabli ' + n + '">' + (t[0].content || "no content") + "</li>"; i < e; i++) a += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>";
				return a
			}() + "</ul>",
			success: function(t) {
				var o = t.find(".layui-layer-title").children(),
					r = t.find(".layui-layer-tabmain").children();
				o.on("mousedown", function(t) {
					t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
					var a = i(this),
						o = a.index();
					a.addClass(n).siblings().removeClass(n), r.eq(o).show().siblings().hide(), "function" == typeof e.change && e.change(o)
				}), "function" == typeof a && a(t)
			}
		}, e))
	}, r.photos = function(t, n, a) {
		function o(e, t, i) {
			var n = new Image;
			return n.src = e, n.complete ? t(n) : (n.onload = function() {
				n.onload = null, t(n)
			}, void(n.onerror = function(e) {
				n.onerror = null, i(e)
			}))
		}
		var s = {};
		if (t = t || {}, t.photos) {
			var l = t.photos.constructor === Object,
				f = l ? t.photos : {},
				u = f.data || [],
				d = f.start || 0;
			s.imgIndex = (0 | d) + 1, t.img = t.img || "img";
			var y = t.success;
			if (delete t.success, l) {
				if (0 === u.length) return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
			} else {
				var p = i(t.photos),
					h = function() {
						u = [], p.find(t.img).each(function(e) {
							var t = i(this);
							t.attr("layer-index", e), u.push({
								alt: t.attr("alt"),
								pid: t.attr("layer-pid"),
								src: t.attr("layer-src") || t.attr("src"),
								thumb: t.attr("src")
							})
						})
					};
				if (h(), 0 === u.length) return;
				if (n || p.on("click", t.img, function() {
					var e = i(this),
						n = e.attr("layer-index");
					r.photos(i.extend(t, {
						photos: {
							start: n,
							data: u,
							tab: t.tab
						},
						full: t.full
					}), !0), h()
				}), !n) return
			}
			s.imgprev = function(e) {
				s.imgIndex--, s.imgIndex < 1 && (s.imgIndex = u.length), s.tabimg(e)
			}, s.imgnext = function(e, t) {
				s.imgIndex++, s.imgIndex > u.length && (s.imgIndex = 1, t) || s.tabimg(e)
			}, s.keyup = function(e) {
				if (!s.end) {
					var t = e.keyCode;
					e.preventDefault(), 37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && r.close(s.index)
				}
			}, s.tabimg = function(e) {
				if (!(u.length <= 1)) return f.start = s.imgIndex - 1, r.close(s.index), r.photos(t, !0, e)
			}, s.event = function() {
				s.bigimg.hover(function() {
					s.imgsee.show()
				}, function() {
					s.imgsee.hide()
				}), s.bigimg.find(".layui-layer-imgprev").on("click", function(e) {
					e.preventDefault(), s.imgprev()
				}), s.bigimg.find(".layui-layer-imgnext").on("click", function(e) {
					e.preventDefault(), s.imgnext()
				}), i(document).on("keyup", s.keyup)
			}, s.loadi = r.load(1, {
				shade: !("shade" in t) && .9,
				scrollbar: !1
			}), o(u[d].src, function(n) {
				r.close(s.loadi), s.index = r.open(i.extend({
					type: 1,
					id: "layui-layer-photos",
					area: function() {
						var a = [n.width, n.height],
							o = [i(e).width() - 100, i(e).height() - 100];
						if (!t.full && (a[0] > o[0] || a[1] > o[1])) {
							var r = [a[0] / o[0], a[1] / o[1]];
							r[0] > r[1] ? (a[0] = a[0] / r[0], a[1] = a[1] / r[0]) : r[0] < r[1] && (a[0] = a[0] / r[1], a[1] = a[1] / r[1])
						}
						return [a[0] + "px", a[1] + "px"]
					}(),
					title: !1,
					shade: .9,
					shadeClose: !0,
					closeBtn: !1,
					move: ".layui-layer-phimg img",
					moveType: 1,
					scrollbar: !1,
					moveOut: !0,
					isOutAnim: !1,
					skin: "layui-layer-photos" + c("photos"),
					content: '<div class="layui-layer-phimg"><img src="' + u[d].src + '" alt="' + (u[d].alt || "") + '" layer-pid="' + u[d].pid + '"><div class="layui-layer-imgsee">' + (u.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (a ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (u[d].alt || "") + "</a><em>" + s.imgIndex + "/" + u.length + "</em></span></div></div></div>",
					success: function(e, i) {
						s.bigimg = e.find(".layui-layer-phimg"), s.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), s.event(e), t.tab && t.tab(u[d], e), "function" == typeof y && y(e)
					},
					end: function() {
						s.end = !0, i(document).off("keyup", s.keyup)
					}
				}, t))
			}, function() {
				r.close(s.loadi), r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
					time: 3e4,
					btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
					yes: function() {
						u.length > 1 && s.imgnext(!0, !0)
					}
				})
			})
		}
	}, o.run = function(t) {
		i = t, n = i(e), l.html = i("html"), r.open = function(e) {
			var t = new s(e);
			return t.index
		}
	}, e.layui && layui.define ? (r.ready(), layui.define("jquery", function(t) {
		r.path = layui.cache.dir, o.run(layui.$), e.layer = r, t("layer", r)
	})) : "function" == typeof define && define.amd ? define(["jquery"], function() {
		return o.run(e.jQuery), r
	}) : function() {
		o.run(e.jQuery), r.ready()
	}()
}(window);


//bootstrap.min.js

if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); +
function(a) {
	"use strict";
	var b = a.fn.jquery.split(" ")[0].split(".");
	if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), +
function(a) {
	"use strict";

	function b() {
		var a = document.createElement("bootstrap"),
			b = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd otransitionend",
				transition: "transitionend"
			};
		for (var c in b) if (void 0 !== a.style[c]) return {
			end: b[c]
		};
		return !1
	}
	a.fn.emulateTransitionEnd = function(b) {
		var c = !1,
			d = this;
		a(this).one("bsTransitionEnd", function() {
			c = !0
		});
		var e = function() {
				c || a(d).trigger(a.support.transition.end)
			};
		return setTimeout(e, b), this
	}, a(function() {
		a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
			bindType: a.support.transition.end,
			delegateType: a.support.transition.end,
			handle: function(b) {
				if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
			}
		})
	})
}(jQuery), +
function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var c = a(this),
				e = c.data("bs.alert");
			e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
		})
	}
	var c = '[data-dismiss="alert"]',
		d = function(b) {
			a(b).on("click", c, this.close)
		};
	d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
		function c() {
			g.detach().trigger("closed.bs.alert").remove()
		}
		var e = a(this),
			f = e.attr("data-target");
		f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
		var g = a("#" === f ? [] : f);
		b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
	};
	var e = a.fn.alert;
	a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
		return a.fn.alert = e, this
	}, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), +
function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.button"),
				f = "object" == typeof b && b;
			e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
		})
	}
	var c = function(b, d) {
			this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
		};
	c.VERSION = "3.3.7", c.DEFAULTS = {
		loadingText: "loading..."
	}, c.prototype.setState = function(b) {
		var c = "disabled",
			d = this.$element,
			e = d.is("input") ? "val" : "html",
			f = d.data();
		b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
			d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1))
		}, this), 0)
	}, c.prototype.toggle = function() {
		var a = !0,
			b = this.$element.closest('[data-toggle="buttons"]');
		if (b.length) {
			var c = this.$element.find("input");
			"radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
		} else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
	};
	var d = a.fn.button;
	a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
		return a.fn.button = d, this
	}, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
		var d = a(c.target).closest(".btn");
		b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
	}).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
		a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
	})
}(jQuery), +
function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.carousel"),
				f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
				g = "string" == typeof b ? b : f.slide;
			e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
		})
	}
	var c = function(b, c) {
			this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
		};
	c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
		interval: 5e3,
		pause: "hover",
		wrap: !0,
		keyboard: !0
	}, c.prototype.keydown = function(a) {
		if (!/input|textarea/i.test(a.target.tagName)) {
			switch (a.which) {
			case 37:
				this.prev();
				break;
			case 39:
				this.next();
				break;
			default:
				return
			}
			a.preventDefault()
		}
	}, c.prototype.cycle = function(b) {
		return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
	}, c.prototype.getItemIndex = function(a) {
		return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
	}, c.prototype.getItemForDirection = function(a, b) {
		var c = this.getItemIndex(b),
			d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
		if (d && !this.options.wrap) return b;
		var e = "prev" == a ? -1 : 1,
			f = (c + e) % this.$items.length;
		return this.$items.eq(f)
	}, c.prototype.to = function(a) {
		var b = this,
			c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
		if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
			b.to(a)
		}) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
	}, c.prototype.pause = function(b) {
		return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
	}, c.prototype.next = function() {
		if (!this.sliding) return this.slide("next")
	}, c.prototype.prev = function() {
		if (!this.sliding) return this.slide("prev")
	}, c.prototype.slide = function(b, d) {
		var e = this.$element.find(".item.active"),
			f = d || this.getItemForDirection(b, e),
			g = this.interval,
			h = "next" == b ? "left" : "right",
			i = this;
		if (f.hasClass("active")) return this.sliding = !1;
		var j = f[0],
			k = a.Event("slide.bs.carousel", {
				relatedTarget: j,
				direction: h
			});
		if (this.$element.trigger(k), !k.isDefaultPrevented()) {
			if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
				this.$indicators.find(".active").removeClass("active");
				var l = a(this.$indicators.children()[this.getItemIndex(f)]);
				l && l.addClass("active")
			}
			var m = a.Event("slid.bs.carousel", {
				relatedTarget: j,
				direction: h
			});
			return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
				f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
					i.$element.trigger(m)
				}, 0)
			}).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
		}
	};
	var d = a.fn.carousel;
	a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
		return a.fn.carousel = d, this
	};
	var e = function(c) {
			var d, e = a(this),
				f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
			if (f.hasClass("carousel")) {
				var g = a.extend({}, f.data(), e.data()),
					h = e.attr("data-slide-to");
				h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
			}
		};
	a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
		a('[data-ride="carousel"]').each(function() {
			var c = a(this);
			b.call(c, c.data())
		})
	})
}(jQuery), +
function(a) {
	"use strict";

	function b(b) {
		var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
		return a(d)
	}
	function c(b) {
		return this.each(function() {
			var c = a(this),
				e = c.data("bs.collapse"),
				f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
			!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
		})
	}
	var d = function(b, c) {
			this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
		};
	d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
		toggle: !0
	}, d.prototype.dimension = function() {
		var a = this.$element.hasClass("width");
		return a ? "width" : "height"
	}, d.prototype.show = function() {
		if (!this.transitioning && !this.$element.hasClass("in")) {
			var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
			if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
				var f = a.Event("show.bs.collapse");
				if (this.$element.trigger(f), !f.isDefaultPrevented()) {
					e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
					var g = this.dimension();
					this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
					var h = function() {
							this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
						};
					if (!a.support.transition) return h.call(this);
					var i = a.camelCase(["scroll", g].join("-"));
					this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
				}
			}
		}
	}, d.prototype.hide = function() {
		if (!this.transitioning && this.$element.hasClass("in")) {
			var b = a.Event("hide.bs.collapse");
			if (this.$element.trigger(b), !b.isDefaultPrevented()) {
				var c = this.dimension();
				this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
				var e = function() {
						this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
					};
				return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
			}
		}
	}, d.prototype.toggle = function() {
		this[this.$element.hasClass("in") ? "hide" : "show"]()
	}, d.prototype.getParent = function() {
		return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
			var e = a(d);
			this.addAriaAndCollapsedClass(b(e), e)
		}, this)).end()
	}, d.prototype.addAriaAndCollapsedClass = function(a, b) {
		var c = a.hasClass("in");
		a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
	};
	var e = a.fn.collapse;
	a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
		return a.fn.collapse = e, this
	}, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
		var e = a(this);
		e.attr("data-target") || d.preventDefault();
		var f = b(e),
			g = f.data("bs.collapse"),
			h = g ? "toggle" : e.data();
		c.call(f, h)
	})
}(jQuery), +
function(a) {
	"use strict";

	function b(b) {
		var c = b.attr("data-target");
		c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
		var d = c && a(c);
		return d && d.length ? d : b.parent()
	}
	function c(c) {
		c && 3 === c.which || (a(e).remove(), a(f).each(function() {
			var d = a(this),
				e = b(d),
				f = {
					relatedTarget: this
				};
			e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
		}))
	}
	function d(b) {
		return this.each(function() {
			var c = a(this),
				d = c.data("bs.dropdown");
			d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
		})
	}
	var e = ".dropdown-backdrop",
		f = '[data-toggle="dropdown"]',
		g = function(b) {
			a(b).on("click.bs.dropdown", this.toggle)
		};
	g.VERSION = "3.3.7", g.prototype.toggle = function(d) {
		var e = a(this);
		if (!e.is(".disabled, :disabled")) {
			var f = b(e),
				g = f.hasClass("open");
			if (c(), !g) {
				"ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
				var h = {
					relatedTarget: this
				};
				if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
				e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
			}
			return !1
		}
	}, g.prototype.keydown = function(c) {
		if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
			var d = a(this);
			if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
				var e = b(d),
					g = e.hasClass("open");
				if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
				var h = " li:not(.disabled):visible a",
					i = e.find(".dropdown-menu" + h);
				if (i.length) {
					var j = i.index(c.target);
					38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
				}
			}
		}
	};
	var h = a.fn.dropdown;
	a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
		return a.fn.dropdown = h, this
	}, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
		a.stopPropagation()
	}).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), +
function(a) {
	"use strict";

	function b(b, d) {
		return this.each(function() {
			var e = a(this),
				f = e.data("bs.modal"),
				g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
			f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
		})
	}
	var c = function(b, c) {
			this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
				this.$element.trigger("loaded.bs.modal")
			}, this))
		};
	c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
		backdrop: !0,
		keyboard: !0,
		show: !0
	}, c.prototype.toggle = function(a) {
		return this.isShown ? this.hide() : this.show(a)
	}, c.prototype.show = function(b) {
		var d = this,
			e = a.Event("show.bs.modal", {
				relatedTarget: b
			});
		this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
			d.$element.one("mouseup.dismiss.bs.modal", function(b) {
				a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
			})
		}), this.backdrop(function() {
			var e = a.support.transition && d.$element.hasClass("fade");
			d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
			var f = a.Event("shown.bs.modal", {
				relatedTarget: b
			});
			e ? d.$dialog.one("bsTransitionEnd", function() {
				d.$element.trigger("focus").trigger(f)
			}).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
		}))
	}, c.prototype.hide = function(b) {
		b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
	}, c.prototype.enforceFocus = function() {
		a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
			document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
		}, this))
	}, c.prototype.escape = function() {
		this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
			27 == a.which && this.hide()
		}, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
	}, c.prototype.resize = function() {
		this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
	}, c.prototype.hideModal = function() {
		var a = this;
		this.$element.hide(), this.backdrop(function() {
			a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
		})
	}, c.prototype.removeBackdrop = function() {
		this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
	}, c.prototype.backdrop = function(b) {
		var d = this,
			e = this.$element.hasClass("fade") ? "fade" : "";
		if (this.isShown && this.options.backdrop) {
			var f = a.support.transition && e;
			if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
				return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
			}, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
			f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
		} else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass("in");
			var g = function() {
					d.removeBackdrop(), b && b()
				};
			a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
		} else b && b()
	}, c.prototype.handleUpdate = function() {
		this.adjustDialog()
	}, c.prototype.adjustDialog = function() {
		var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
		this.$element.css({
			paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
			paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
		})
	}, c.prototype.resetAdjustments = function() {
		this.$element.css({
			paddingLeft: "",
			paddingRight: ""
		})
	}, c.prototype.checkScrollbar = function() {
		var a = window.innerWidth;
		if (!a) {
			var b = document.documentElement.getBoundingClientRect();
			a = b.right - Math.abs(b.left)
		}
		this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
	}, c.prototype.setScrollbar = function() {
		var a = parseInt(this.$body.css("padding-right") || 0, 10);
		this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
	}, c.prototype.resetScrollbar = function() {
		this.$body.css("padding-right", this.originalBodyPad)
	}, c.prototype.measureScrollbar = function() {
		var a = document.createElement("div");
		a.className = "modal-scrollbar-measure", this.$body.append(a);
		var b = a.offsetWidth - a.clientWidth;
		return this.$body[0].removeChild(a), b
	};
	var d = a.fn.modal;
	a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
		return a.fn.modal = d, this
	}, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
		var d = a(this),
			e = d.attr("href"),
			f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
			g = f.data("bs.modal") ? "toggle" : a.extend({
				remote: !/#/.test(e) && e
			}, f.data(), d.data());
		d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
			a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
				d.is(":visible") && d.trigger("focus")
			})
		}), b.call(f, g, this)
	})
}(jQuery), +
function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.tooltip"),
				f = "object" == typeof b && b;
			!e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
		})
	}
	var c = function(a, b) {
			this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
		};
	c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
		animation: !0,
		placement: "top",
		selector: !1,
		template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: "hover focus",
		title: "",
		delay: 0,
		html: !1,
		container: !1,
		viewport: {
			selector: "body",
			padding: 0
		}
	}, c.prototype.init = function(b, c, d) {
		if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
			click: !1,
			hover: !1,
			focus: !1
		}, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
		for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
			var g = e[f];
			if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
			else if ("manual" != g) {
				var h = "hover" == g ? "mouseenter" : "focusin",
					i = "hover" == g ? "mouseleave" : "focusout";
				this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
			}
		}
		this.options.selector ? this._options = a.extend({}, this.options, {
			trigger: "manual",
			selector: ""
		}) : this.fixTitle()
	}, c.prototype.getDefaults = function() {
		return c.DEFAULTS
	}, c.prototype.getOptions = function(b) {
		return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
			show: b.delay,
			hide: b.delay
		}), b
	}, c.prototype.getDelegateOptions = function() {
		var b = {},
			c = this.getDefaults();
		return this._options && a.each(this._options, function(a, d) {
			c[a] != d && (b[a] = d)
		}), b
	}, c.prototype.enter = function(b) {
		var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
		return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
			"in" == c.hoverState && c.show()
		}, c.options.delay.show)) : c.show())
	}, c.prototype.isInStateTrue = function() {
		for (var a in this.inState) if (this.inState[a]) return !0;
		return !1
	}, c.prototype.leave = function(b) {
		var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
		if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
			"out" == c.hoverState && c.hide()
		}, c.options.delay.hide)) : c.hide()
	}, c.prototype.show = function() {
		var b = a.Event("show.bs." + this.type);
		if (this.hasContent() && this.enabled) {
			this.$element.trigger(b);
			var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
			if (b.isDefaultPrevented() || !d) return;
			var e = this,
				f = this.tip(),
				g = this.getUID(this.type);
			this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
			var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
				i = /\s?auto?\s?/i,
				j = i.test(h);
			j && (h = h.replace(i, "") || "top"), f.detach().css({
				top: 0,
				left: 0,
				display: "block"
			}).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
			var k = this.getPosition(),
				l = f[0].offsetWidth,
				m = f[0].offsetHeight;
			if (j) {
				var n = h,
					o = this.getPosition(this.$viewport);
				h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
			}
			var p = this.getCalculatedOffset(h, k, l, m);
			this.applyPlacement(p, h);
			var q = function() {
					var a = e.hoverState;
					e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
				};
			a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
		}
	}, c.prototype.applyPlacement = function(b, c) {
		var d = this.tip(),
			e = d[0].offsetWidth,
			f = d[0].offsetHeight,
			g = parseInt(d.css("margin-top"), 10),
			h = parseInt(d.css("margin-left"), 10);
		isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
			using: function(a) {
				d.css({
					top: Math.round(a.top),
					left: Math.round(a.left)
				})
			}
		}, b), 0), d.addClass("in");
		var i = d[0].offsetWidth,
			j = d[0].offsetHeight;
		"top" == c && j != f && (b.top = b.top + f - j);
		var k = this.getViewportAdjustedDelta(c, b, i, j);
		k.left ? b.left += k.left : b.top += k.top;
		var l = /top|bottom/.test(c),
			m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
			n = l ? "offsetWidth" : "offsetHeight";
		d.offset(b), this.replaceArrow(m, d[0][n], l)
	}, c.prototype.replaceArrow = function(a, b, c) {
		this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
	}, c.prototype.setContent = function() {
		var a = this.tip(),
			b = this.getTitle();
		a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
	}, c.prototype.hide = function(b) {
		function d() {
			"in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
		}
		var e = this,
			f = a(this.$tip),
			g = a.Event("hide.bs." + this.type);
		if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
	}, c.prototype.fixTitle = function() {
		var a = this.$element;
		(a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
	}, c.prototype.hasContent = function() {
		return this.getTitle()
	}, c.prototype.getPosition = function(b) {
		b = b || this.$element;
		var c = b[0],
			d = "BODY" == c.tagName,
			e = c.getBoundingClientRect();
		null == e.width && (e = a.extend({}, e, {
			width: e.right - e.left,
			height: e.bottom - e.top
		}));
		var f = window.SVGElement && c instanceof window.SVGElement,
			g = d ? {
				top: 0,
				left: 0
			} : f ? null : b.offset(),
			h = {
				scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
			},
			i = d ? {
				width: a(window).width(),
				height: a(window).height()
			} : null;
		return a.extend({}, e, h, i, g)
	}, c.prototype.getCalculatedOffset = function(a, b, c, d) {
		return "bottom" == a ? {
			top: b.top + b.height,
			left: b.left + b.width / 2 - c / 2
		} : "top" == a ? {
			top: b.top - d,
			left: b.left + b.width / 2 - c / 2
		} : "left" == a ? {
			top: b.top + b.height / 2 - d / 2,
			left: b.left - c
		} : {
			top: b.top + b.height / 2 - d / 2,
			left: b.left + b.width
		}
	}, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
		var e = {
			top: 0,
			left: 0
		};
		if (!this.$viewport) return e;
		var f = this.options.viewport && this.options.viewport.padding || 0,
			g = this.getPosition(this.$viewport);
		if (/right|left/.test(a)) {
			var h = b.top - f - g.scroll,
				i = b.top + f - g.scroll + d;
			h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
		} else {
			var j = b.left - f,
				k = b.left + f + c;
			j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
		}
		return e
	}, c.prototype.getTitle = function() {
		var a, b = this.$element,
			c = this.options;
		return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
	}, c.prototype.getUID = function(a) {
		do a += ~~ (1e6 * Math.random());
		while (document.getElementById(a));
		return a
	}, c.prototype.tip = function() {
		if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
		return this.$tip
	}, c.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
	}, c.prototype.enable = function() {
		this.enabled = !0
	}, c.prototype.disable = function() {
		this.enabled = !1
	}, c.prototype.toggleEnabled = function() {
		this.enabled = !this.enabled
	}, c.prototype.toggle = function(b) {
		var c = this;
		b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
	}, c.prototype.destroy = function() {
		var a = this;
		clearTimeout(this.timeout), this.hide(function() {
			a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
		})
	};
	var d = a.fn.tooltip;
	a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
		return a.fn.tooltip = d, this
	}
}(jQuery), +
function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.popover"),
				f = "object" == typeof b && b;
			!e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
		})
	}
	var c = function(a, b) {
			this.init("popover", a, b)
		};
	if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
	c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
		placement: "right",
		trigger: "click",
		content: "",
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	}), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
		return c.DEFAULTS
	}, c.prototype.setContent = function() {
		var a = this.tip(),
			b = this.getTitle(),
			c = this.getContent();
		a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
	}, c.prototype.hasContent = function() {
		return this.getTitle() || this.getContent()
	}, c.prototype.getContent = function() {
		var a = this.$element,
			b = this.options;
		return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
	}, c.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".arrow")
	};
	var d = a.fn.popover;
	a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
		return a.fn.popover = d, this
	}
}(jQuery), +
function(a) {
	"use strict";

	function b(c, d) {
		this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
	}
	function c(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.scrollspy"),
				f = "object" == typeof c && c;
			e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
		})
	}
	b.VERSION = "3.3.7", b.DEFAULTS = {
		offset: 10
	}, b.prototype.getScrollHeight = function() {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	}, b.prototype.refresh = function() {
		var b = this,
			c = "offset",
			d = 0;
		this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
			var b = a(this),
				e = b.data("target") || b.attr("href"),
				f = /^#./.test(e) && a(e);
			return f && f.length && f.is(":visible") && [
				[f[c]().top + d, e]
			] || null
		}).sort(function(a, b) {
			return a[0] - b[0]
		}).each(function() {
			b.offsets.push(this[0]), b.targets.push(this[1])
		})
	}, b.prototype.process = function() {
		var a, b = this.$scrollElement.scrollTop() + this.options.offset,
			c = this.getScrollHeight(),
			d = this.options.offset + c - this.$scrollElement.height(),
			e = this.offsets,
			f = this.targets,
			g = this.activeTarget;
		if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
		if (g && b < e[0]) return this.activeTarget = null, this.clear();
		for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
	}, b.prototype.activate = function(b) {
		this.activeTarget = b, this.clear();
		var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
			d = a(c).parents("li").addClass("active");
		d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
	}, b.prototype.clear = function() {
		a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
	};
	var d = a.fn.scrollspy;
	a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
		return a.fn.scrollspy = d, this
	}, a(window).on("load.bs.scrollspy.data-api", function() {
		a('[data-spy="scroll"]').each(function() {
			var b = a(this);
			c.call(b, b.data())
		})
	})
}(jQuery), +
function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.tab");
			e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
		})
	}
	var c = function(b) {
			this.element = a(b)
		};
	c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
		var b = this.element,
			c = b.closest("ul:not(.dropdown-menu)"),
			d = b.data("target");
		if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
			var e = c.find(".active:last a"),
				f = a.Event("hide.bs.tab", {
					relatedTarget: b[0]
				}),
				g = a.Event("show.bs.tab", {
					relatedTarget: e[0]
				});
			if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
				var h = a(d);
				this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
					e.trigger({
						type: "hidden.bs.tab",
						relatedTarget: b[0]
					}), b.trigger({
						type: "shown.bs.tab",
						relatedTarget: e[0]
					})
				})
			}
		}
	}, c.prototype.activate = function(b, d, e) {
		function f() {
			g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
		}
		var g = d.find("> .active"),
			h = e && a.support.transition && (g.length && g.hasClass("fade") || !! d.find("> .fade").length);
		g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
	};
	var d = a.fn.tab;
	a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
		return a.fn.tab = d, this
	};
	var e = function(c) {
			c.preventDefault(), b.call(a(this), "show")
		};
	a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), +
function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.affix"),
				f = "object" == typeof b && b;
			e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
		})
	}
	var c = function(b, d) {
			this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
		};
	c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
		offset: 0,
		target: window
	}, c.prototype.getState = function(a, b, c, d) {
		var e = this.$target.scrollTop(),
			f = this.$element.offset(),
			g = this.$target.height();
		if (null != c && "top" == this.affixed) return e < c && "top";
		if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
		var h = null == this.affixed,
			i = h ? e : f.top,
			j = h ? g : b;
		return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
	}, c.prototype.getPinnedOffset = function() {
		if (this.pinnedOffset) return this.pinnedOffset;
		this.$element.removeClass(c.RESET).addClass("affix");
		var a = this.$target.scrollTop(),
			b = this.$element.offset();
		return this.pinnedOffset = b.top - a
	}, c.prototype.checkPositionWithEventLoop = function() {
		setTimeout(a.proxy(this.checkPosition, this), 1)
	}, c.prototype.checkPosition = function() {
		if (this.$element.is(":visible")) {
			var b = this.$element.height(),
				d = this.options.offset,
				e = d.top,
				f = d.bottom,
				g = Math.max(a(document).height(), a(document.body).height());
			"object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
			var h = this.getState(g, b, e, f);
			if (this.affixed != h) {
				null != this.unpin && this.$element.css("top", "");
				var i = "affix" + (h ? "-" + h : ""),
					j = a.Event(i + ".bs.affix");
				if (this.$element.trigger(j), j.isDefaultPrevented()) return;
				this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
			}
			"bottom" == h && this.$element.offset({
				top: g - b - f
			})
		}
	};
	var d = a.fn.affix;
	a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
		return a.fn.affix = d, this
	}, a(window).on("load", function() {
		a('[data-spy="affix"]').each(function() {
			var c = a(this),
				d = c.data();
			d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
		})
	})
}(jQuery);


//live2d.js

!
function(t) {
	function i(r) {
		if (e[r]) return e[r].exports;
		var o = e[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		return t[r].call(o.exports, o, o.exports, i), o.l = !0, o.exports
	}
	var e = {};
	i.m = t, i.c = e, i.d = function(t, e, r) {
		i.o(t, e) || Object.defineProperty(t, e, {
			configurable: !1,
			enumerable: !0,
			get: r
		})
	}, i.n = function(t) {
		var e = t && t.__esModule ?
		function() {
			return t.
		default
		} : function() {
			return t
		};
		return i.d(e, "a", e), e
	}, i.o = function(t, i) {
		return Object.prototype.hasOwnProperty.call(t, i)
	}, i.p = "", i(i.s = 4)
}([function(t, i, e) {
	"use strict";

	function r() {
		this.live2DModel = null, this.modelMatrix = null, this.eyeBlink = null, this.physics = null, this.pose = null, this.debugMode = !1, this.initialized = !1, this.updating = !1, this.alpha = 1, this.accAlpha = 0, this.lipSync = !1, this.lipSyncValue = 0, this.accelX = 0, this.accelY = 0, this.accelZ = 0, this.dragX = 0, this.dragY = 0, this.startTimeMSec = null, this.mainMotionManager = new h, this.expressionManager = new h, this.motions = {}, this.expressions = {}, this.isTexLoaded = !1
	}
	function o() {
		AMotion.prototype.constructor.call(this), this.paramList = new Array
	}
	function n() {
		this.id = "", this.type = -1, this.value = null
	}
	function s() {
		this.nextBlinkTime = null, this.stateStartTime = null, this.blinkIntervalMsec = null, this.eyeState = g.STATE_FIRST, this.blinkIntervalMsec = 4e3, this.closingMotionMsec = 100, this.closedMotionMsec = 50, this.openingMotionMsec = 150, this.closeIfZero = !0, this.eyeID_L = "PARAM_EYE_L_OPEN", this.eyeID_R = "PARAM_EYE_R_OPEN"
	}
	function _() {
		this.tr = new Float32Array(16), this.identity()
	}
	function a(t, i) {
		_.prototype.constructor.call(this), this.width = t, this.height = i
	}
	function h() {
		MotionQueueManager.prototype.constructor.call(this), this.currentPriority = null, this.reservePriority = null, this.super = MotionQueueManager.prototype
	}
	function l() {
		this.physicsList = new Array, this.startTimeMSec = UtSystem.getUserTimeMSec()
	}
	function $() {
		this.lastTime = 0, this.lastModel = null, this.partsGroups = new Array
	}
	function u(t) {
		this.paramIndex = -1, this.partsIndex = -1, this.link = null, this.id = t
	}
	function p() {
		this.EPSILON = .01, this.faceTargetX = 0, this.faceTargetY = 0, this.faceX = 0, this.faceY = 0, this.faceVX = 0, this.faceVY = 0, this.lastTimeSec = 0
	}
	function f() {
		_.prototype.constructor.call(this), this.screenLeft = null, this.screenRight = null, this.screenTop = null, this.screenBottom = null, this.maxLeft = null, this.maxRight = null, this.maxTop = null, this.maxBottom = null, this.max = Number.MAX_VALUE, this.min = 0
	}
	function c() {}
	var d = 0;
	r.prototype.getModelMatrix = function() {
		return this.modelMatrix
	}, r.prototype.setAlpha = function(t) {
		t > .999 && (t = 1), t < .001 && (t = 0), this.alpha = t
	}, r.prototype.getAlpha = function() {
		return this.alpha
	}, r.prototype.isInitialized = function() {
		return this.initialized
	}, r.prototype.setInitialized = function(t) {
		this.initialized = t
	}, r.prototype.isUpdating = function() {
		return this.updating
	}, r.prototype.setUpdating = function(t) {
		this.updating = t
	}, r.prototype.getLive2DModel = function() {
		return this.live2DModel
	}, r.prototype.setLipSync = function(t) {
		this.lipSync = t
	}, r.prototype.setLipSyncValue = function(t) {
		this.lipSyncValue = t
	}, r.prototype.setAccel = function(t, i, e) {
		this.accelX = t, this.accelY = i, this.accelZ = e
	}, r.prototype.setDrag = function(t, i) {
		this.dragX = t, this.dragY = i
	}, r.prototype.getMainMotionManager = function() {
		return this.mainMotionManager
	}, r.prototype.getExpressionManager = function() {
		return this.expressionManager
	}, r.prototype.loadModelData = function(t, i) {
		var e = c.getPlatformManager();
		this.debugMode && e.log("Load model : " + t);
		var r = this;
		e.loadLive2DModel(t, function(t) {
			if (r.live2DModel = t, r.live2DModel.saveParam(), 0 != Live2D.getError()) return void console.error("Error : Failed to loadModelData().");
			r.modelMatrix = new a(r.live2DModel.getCanvasWidth(), r.live2DModel.getCanvasHeight()), r.modelMatrix.setWidth(2), r.modelMatrix.setCenterPosition(0, 0), i(r.live2DModel)
		})
	}, r.prototype.loadTexture = function(t, i, e) {
		d++;
		var r = c.getPlatformManager();
		this.debugMode && r.log("Load Texture : " + i);
		var o = this;
		r.loadTexture(this.live2DModel, t, i, function() {
			d--, 0 == d && (o.isTexLoaded = !0), "function" == typeof e && e()
		})
	}, r.prototype.loadMotion = function(t, i, e) {
		var r = c.getPlatformManager();
		this.debugMode && r.log("Load Motion : " + i);
		var o = null,
			n = this;
		r.loadBytes(i, function(i) {
			o = Live2DMotion.loadMotion(i), null != t && (n.motions[t] = o), e(o)
		})
	}, r.prototype.loadExpression = function(t, i, e) {
		var r = c.getPlatformManager();
		this.debugMode && r.log("Load Expression : " + i);
		var n = this;
		r.loadBytes(i, function(i) {
			null != t && (n.expressions[t] = o.loadJson(i)), "function" == typeof e && e()
		})
	}, r.prototype.loadPose = function(t, i) {
		var e = c.getPlatformManager();
		this.debugMode && e.log("Load Pose : " + t);
		var r = this;
		try {
			e.loadBytes(t, function(t) {
				r.pose = $.load(t), "function" == typeof i && i()
			})
		} catch (t) {
			console.warn(t)
		}
	}, r.prototype.loadPhysics = function(t) {
		var i = c.getPlatformManager();
		this.debugMode && i.log("Load Physics : " + t);
		var e = this;
		try {
			i.loadBytes(t, function(t) {
				e.physics = l.load(t)
			})
		} catch (t) {
			console.warn(t)
		}
	}, r.prototype.hitTestSimple = function(t, i, e) {
		if (null === this.live2DModel) return !1;
		var r = this.live2DModel.getDrawDataIndex(t);
		if (r < 0) return !1;
		for (var o = this.live2DModel.getTransformedPoints(r), n = this.live2DModel.getCanvasWidth(), s = 0, _ = this.live2DModel.getCanvasHeight(), a = 0, h = 0; h < o.length; h += 2) {
			var l = o[h],
				$ = o[h + 1];
			l < n && (n = l), l > s && (s = l), $ < _ && (_ = $), $ > a && (a = $)
		}
		var u = this.modelMatrix.invertTransformX(i),
			p = this.modelMatrix.invertTransformY(e);
		return n <= u && u <= s && _ <= p && p <= a
	}, r.prototype.hitTestSimpleCustom = function(t, i, e, r) {
		return null !== this.live2DModel && (e >= t[0] && e <= i[0] && r <= t[1] && r >= i[1])
	}, o.prototype = new AMotion, o.EXPRESSION_DEFAULT = "DEFAULT", o.TYPE_SET = 0, o.TYPE_ADD = 1, o.TYPE_MULT = 2, o.loadJson = function(t) {
		var i = new o,
			e = c.getPlatformManager(),
			r = e.jsonParseFromBytes(t);
		if (i.setFadeIn(parseInt(r.fade_in) > 0 ? parseInt(r.fade_in) : 1e3), i.setFadeOut(parseInt(r.fade_out) > 0 ? parseInt(r.fade_out) : 1e3), null == r.params) return i;
		var s = r.params,
			_ = s.length;
		i.paramList = [];
		for (var a = 0; a < _; a++) {
			var h = s[a],
				l = h.id.toString(),
				$ = parseFloat(h.val),
				u = o.TYPE_ADD,
				p = null != h.calc ? h.calc.toString() : "add";
			if ((u = "add" === p ? o.TYPE_ADD : "mult" === p ? o.TYPE_MULT : "set" === p ? o.TYPE_SET : o.TYPE_ADD) == o.TYPE_ADD) {
				var f = null == h.def ? 0 : parseFloat(h.def);
				$ -= f
			} else if (u == o.TYPE_MULT) {
				var f = null == h.def ? 1 : parseFloat(h.def);
				0 == f && (f = 1), $ /= f
			}
			var d = new n;
			d.id = l, d.type = u, d.value = $, i.paramList.push(d)
		}
		return i
	}, o.prototype.updateParamExe = function(t, i, e, r) {
		for (var n = this.paramList.length - 1; n >= 0; --n) {
			var s = this.paramList[n];
			s.type == o.TYPE_ADD ? t.addToParamFloat(s.id, s.value, e) : s.type == o.TYPE_MULT ? t.multParamFloat(s.id, s.value, e) : s.type == o.TYPE_SET && t.setParamFloat(s.id, s.value, e)
		}
	}, s.prototype.calcNextBlink = function() {
		return UtSystem.getUserTimeMSec() + Math.random() * (2 * this.blinkIntervalMsec - 1)
	}, s.prototype.setInterval = function(t) {
		this.blinkIntervalMsec = t
	}, s.prototype.setEyeMotion = function(t, i, e) {
		this.closingMotionMsec = t, this.closedMotionMsec = i, this.openingMotionMsec = e
	}, s.prototype.updateParam = function(t) {
		var i, e = UtSystem.getUserTimeMSec(),
			r = 0;
		switch (this.eyeState) {
		case g.STATE_CLOSING:
			r = (e - this.stateStartTime) / this.closingMotionMsec, r >= 1 && (r = 1, this.eyeState = g.STATE_CLOSED, this.stateStartTime = e), i = 1 - r;
			break;
		case g.STATE_CLOSED:
			r = (e - this.stateStartTime) / this.closedMotionMsec, r >= 1 && (this.eyeState = g.STATE_OPENING, this.stateStartTime = e), i = 0;
			break;
		case g.STATE_OPENING:
			r = (e - this.stateStartTime) / this.openingMotionMsec, r >= 1 && (r = 1, this.eyeState = g.STATE_INTERVAL, this.nextBlinkTime = this.calcNextBlink()), i = r;
			break;
		case g.STATE_INTERVAL:
			this.nextBlinkTime < e && (this.eyeState = g.STATE_CLOSING, this.stateStartTime = e), i = 1;
			break;
		case g.STATE_FIRST:
		default:
			this.eyeState = g.STATE_INTERVAL, this.nextBlinkTime = this.calcNextBlink(), i = 1
		}
		this.closeIfZero || (i = -i), t.setParamFloat(this.eyeID_L, i), t.setParamFloat(this.eyeID_R, i)
	};
	var g = function() {};
	g.STATE_FIRST = "STATE_FIRST", g.STATE_INTERVAL = "STATE_INTERVAL", g.STATE_CLOSING = "STATE_CLOSING", g.STATE_CLOSED = "STATE_CLOSED", g.STATE_OPENING = "STATE_OPENING", _.mul = function(t, i, e) {
		var r, o, n, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (r = 0; r < 4; r++) for (o = 0; o < 4; o++) for (n = 0; n < 4; n++) s[r + 4 * o] += t[r + 4 * n] * i[n + 4 * o];
		for (r = 0; r < 16; r++) e[r] = s[r]
	}, _.prototype.identity = function() {
		for (var t = 0; t < 16; t++) this.tr[t] = t % 5 == 0 ? 1 : 0
	}, _.prototype.getArray = function() {
		return this.tr
	}, _.prototype.getCopyMatrix = function() {
		return new Float32Array(this.tr)
	}, _.prototype.setMatrix = function(t) {
		if (null != this.tr && this.tr.length == this.tr.length) for (var i = 0; i < 16; i++) this.tr[i] = t[i]
	}, _.prototype.getScaleX = function() {
		return this.tr[0]
	}, _.prototype.getScaleY = function() {
		return this.tr[5]
	}, _.prototype.transformX = function(t) {
		return this.tr[0] * t + this.tr[12]
	}, _.prototype.transformY = function(t) {
		return this.tr[5] * t + this.tr[13]
	}, _.prototype.invertTransformX = function(t) {
		return (t - this.tr[12]) / this.tr[0]
	}, _.prototype.invertTransformY = function(t) {
		return (t - this.tr[13]) / this.tr[5]
	}, _.prototype.multTranslate = function(t, i) {
		var e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1];
		_.mul(e, this.tr, this.tr)
	}, _.prototype.translate = function(t, i) {
		this.tr[12] = t, this.tr[13] = i
	}, _.prototype.translateX = function(t) {
		this.tr[12] = t
	}, _.prototype.translateY = function(t) {
		this.tr[13] = t
	}, _.prototype.multScale = function(t, i) {
		var e = [t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
		_.mul(e, this.tr, this.tr)
	}, _.prototype.scale = function(t, i) {
		this.tr[0] = t, this.tr[5] = i
	}, a.prototype = new _, a.prototype.setPosition = function(t, i) {
		this.translate(t, i)
	}, a.prototype.setCenterPosition = function(t, i) {
		var e = this.width * this.getScaleX(),
			r = this.height * this.getScaleY();
		this.translate(t - e / 2, i - r / 2)
	}, a.prototype.top = function(t) {
		this.setY(t)
	}, a.prototype.bottom = function(t) {
		var i = this.height * this.getScaleY();
		this.translateY(t - i)
	}, a.prototype.left = function(t) {
		this.setX(t)
	}, a.prototype.right = function(t) {
		var i = this.width * this.getScaleX();
		this.translateX(t - i)
	}, a.prototype.centerX = function(t) {
		var i = this.width * this.getScaleX();
		this.translateX(t - i / 2)
	}, a.prototype.centerY = function(t) {
		var i = this.height * this.getScaleY();
		this.translateY(t - i / 2)
	}, a.prototype.setX = function(t) {
		this.translateX(t)
	}, a.prototype.setY = function(t) {
		this.translateY(t)
	}, a.prototype.setHeight = function(t) {
		var i = t / this.height,
			e = -i;
		this.scale(i, e)
	}, a.prototype.setWidth = function(t) {
		var i = t / this.width,
			e = -i;
		this.scale(i, e)
	}, h.prototype = new MotionQueueManager, h.prototype.getCurrentPriority = function() {
		return this.currentPriority
	}, h.prototype.getReservePriority = function() {
		return this.reservePriority
	}, h.prototype.reserveMotion = function(t) {
		return !(this.reservePriority >= t) && (!(this.currentPriority >= t) && (this.reservePriority = t, !0))
	}, h.prototype.setReservePriority = function(t) {
		this.reservePriority = t
	}, h.prototype.updateParam = function(t) {
		var i = MotionQueueManager.prototype.updateParam.call(this, t);
		return this.isFinished() && (this.currentPriority = 0), i
	}, h.prototype.startMotionPrio = function(t, i) {
		return i == this.reservePriority && (this.reservePriority = 0), this.currentPriority = i, this.startMotion(t, !1)
	}, l.load = function(t) {
		for (var i = new l, e = c.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.physics_hair, n = o.length, s = 0; s < n; s++) {
			var _ = o[s],
				a = new PhysicsHair,
				h = _.setup,
				$ = parseFloat(h.length),
				u = parseFloat(h.regist),
				p = parseFloat(h.mass);
			a.setup($, u, p);
			for (var f = _.src, d = f.length, g = 0; g < d; g++) {
				var y = f[g],
					m = y.id,
					T = PhysicsHair.Src.SRC_TO_X,
					P = y.ptype;
				"x" === P ? T = PhysicsHair.Src.SRC_TO_X : "y" === P ? T = PhysicsHair.Src.SRC_TO_Y : "angle" === P ? T = PhysicsHair.Src.SRC_TO_G_ANGLE : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Src");
				var S = parseFloat(y.scale),
					v = parseFloat(y.weight);
				a.addSrcParam(T, m, S, v)
			}
			for (var L = _.targets, M = L.length, g = 0; g < M; g++) {
				var E = L[g],
					m = E.id,
					T = PhysicsHair.Target.TARGET_FROM_ANGLE,
					P = E.ptype;
				"angle" === P ? T = PhysicsHair.Target.TARGET_FROM_ANGLE : "angle_v" === P ? T = PhysicsHair.Target.TARGET_FROM_ANGLE_V : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Target");
				var S = parseFloat(E.scale),
					v = parseFloat(E.weight);
				a.addTargetParam(T, m, S, v)
			}
			i.physicsList.push(a)
		}
		return i
	}, l.prototype.updateParam = function(t) {
		for (var i = UtSystem.getUserTimeMSec() - this.startTimeMSec, e = 0; e < this.physicsList.length; e++) this.physicsList[e].update(t, i)
	}, $.load = function(t) {
		for (var i = new $, e = c.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.parts_visible, n = o.length, s = 0; s < n; s++) {
			for (var _ = o[s], a = _.group, h = a.length, l = new Array, p = 0; p < h; p++) {
				var f = a[p],
					d = new u(f.id);
				if (l[p] = d, null != f.link) {
					var g = f.link,
						y = g.length;
					d.link = new Array;
					for (var m = 0; m < y; m++) {
						var T = new u(g[m]);
						d.link.push(T)
					}
				}
			}
			i.partsGroups.push(l)
		}
		return i
	}, $.prototype.updateParam = function(t) {
		if (null != t) {
			t != this.lastModel && this.initParam(t), this.lastModel = t;
			var i = UtSystem.getUserTimeMSec(),
				e = 0 == this.lastTime ? 0 : (i - this.lastTime) / 1e3;
			this.lastTime = i, e < 0 && (e = 0);
			for (var r = 0; r < this.partsGroups.length; r++) this.normalizePartsOpacityGroup(t, this.partsGroups[r], e), this.copyOpacityOtherParts(t, this.partsGroups[r])
		}
	}, $.prototype.initParam = function(t) {
		if (null != t) for (var i = 0; i < this.partsGroups.length; i++) for (var e = this.partsGroups[i], r = 0; r < e.length; r++) {
			e[r].initIndex(t);
			var o = e[r].partsIndex,
				n = e[r].paramIndex;
			if (!(o < 0)) {
				var s = 0 != t.getParamFloat(n);
				if (t.setPartsOpacity(o, s ? 1 : 0), t.setParamFloat(n, s ? 1 : 0), null != e[r].link) for (var _ = 0; _ < e[r].link.length; _++) e[r].link[_].initIndex(t)
			}
		}
	}, $.prototype.normalizePartsOpacityGroup = function(t, i, e) {
		for (var r = -1, o = 1, n = 0; n < i.length; n++) {
			var s = i[n].partsIndex,
				_ = i[n].paramIndex;
			if (!(s < 0) && 0 != t.getParamFloat(_)) {
				if (r >= 0) break;
				r = n, o = t.getPartsOpacity(s), o += e / .5, o > 1 && (o = 1)
			}
		}
		r < 0 && (r = 0, o = 1);
		for (var n = 0; n < i.length; n++) {
			var s = i[n].partsIndex;
			if (!(s < 0)) if (r == n) t.setPartsOpacity(s, o);
			else {
				var a, h = t.getPartsOpacity(s);
				a = o < .5 ? -.5 * o / .5 + 1 : .5 * (1 - o) / .5;
				var l = (1 - a) * (1 - o);
				l > .15 && (a = 1 - .15 / (1 - o)), h > a && (h = a), t.setPartsOpacity(s, h)
			}
		}
	}, $.prototype.copyOpacityOtherParts = function(t, i) {
		for (var e = 0; e < i.length; e++) {
			var r = i[e];
			if (null != r.link && !(r.partsIndex < 0)) for (var o = t.getPartsOpacity(r.partsIndex), n = 0; n < r.link.length; n++) {
				var s = r.link[n];
				s.partsIndex < 0 || t.setPartsOpacity(s.partsIndex, o)
			}
		}
	}, u.prototype.initIndex = function(t) {
		this.paramIndex = t.getParamIndex("VISIBLE:" + this.id), this.partsIndex = t.getPartsDataIndex(PartsDataID.getID(this.id)), t.setParamFloat(this.paramIndex, 1)
	}, p.FRAME_RATE = 30, p.prototype.setPoint = function(t, i) {
		this.faceTargetX = t, this.faceTargetY = i
	}, p.prototype.getX = function() {
		return this.faceX
	}, p.prototype.getY = function() {
		return this.faceY
	}, p.prototype.update = function() {
		var t = 40 / 7.5 / p.FRAME_RATE;
		if (0 == this.lastTimeSec) return void(this.lastTimeSec = UtSystem.getUserTimeMSec());
		var i = UtSystem.getUserTimeMSec(),
			e = (i - this.lastTimeSec) * p.FRAME_RATE / 1e3;
		this.lastTimeSec = i;
		var r = .15 * p.FRAME_RATE,
			o = e * t / r,
			n = this.faceTargetX - this.faceX,
			s = this.faceTargetY - this.faceY;
		if (!(Math.abs(n) <= this.EPSILON && Math.abs(s) <= this.EPSILON)) {
			var _ = Math.sqrt(n * n + s * s),
				a = t * n / _,
				h = t * s / _,
				l = a - this.faceVX,
				$ = h - this.faceVY,
				u = Math.sqrt(l * l + $ * $);
			(u < -o || u > o) && (l *= o / u, $ *= o / u, u = o), this.faceVX += l, this.faceVY += $;
			var f = .5 * (Math.sqrt(o * o + 16 * o * _ - 8 * o * _) - o),
				c = Math.sqrt(this.faceVX * this.faceVX + this.faceVY * this.faceVY);
			c > f && (this.faceVX *= f / c, this.faceVY *= f / c), this.faceX += this.faceVX, this.faceY += this.faceVY
		}
	}, f.prototype = new _, f.prototype.getMaxScale = function() {
		return this.max
	}, f.prototype.getMinScale = function() {
		return this.min
	}, f.prototype.setMaxScale = function(t) {
		this.max = t
	}, f.prototype.setMinScale = function(t) {
		this.min = t
	}, f.prototype.isMaxScale = function() {
		return this.getScaleX() == this.max
	}, f.prototype.isMinScale = function() {
		return this.getScaleX() == this.min
	}, f.prototype.adjustTranslate = function(t, i) {
		this.tr[0] * this.maxLeft + (this.tr[12] + t) > this.screenLeft && (t = this.screenLeft - this.tr[0] * this.maxLeft - this.tr[12]), this.tr[0] * this.maxRight + (this.tr[12] + t) < this.screenRight && (t = this.screenRight - this.tr[0] * this.maxRight - this.tr[12]), this.tr[5] * this.maxTop + (this.tr[13] + i) < this.screenTop && (i = this.screenTop - this.tr[5] * this.maxTop - this.tr[13]), this.tr[5] * this.maxBottom + (this.tr[13] + i) > this.screenBottom && (i = this.screenBottom - this.tr[5] * this.maxBottom - this.tr[13]);
		var e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1];
		_.mul(e, this.tr, this.tr)
	}, f.prototype.adjustScale = function(t, i, e) {
		var r = e * this.tr[0];
		r < this.min ? this.tr[0] > 0 && (e = this.min / this.tr[0]) : r > this.max && this.tr[0] > 0 && (e = this.max / this.tr[0]);
		var o = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1],
			n = [e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
			s = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -t, -i, 0, 1];
		_.mul(s, this.tr, this.tr), _.mul(n, this.tr, this.tr), _.mul(o, this.tr, this.tr)
	}, f.prototype.setScreenRect = function(t, i, e, r) {
		this.screenLeft = t, this.screenRight = i, this.screenTop = r, this.screenBottom = e
	}, f.prototype.setMaxScreenRect = function(t, i, e, r) {
		this.maxLeft = t, this.maxRight = i, this.maxTop = r, this.maxBottom = e
	}, f.prototype.getScreenLeft = function() {
		return this.screenLeft
	}, f.prototype.getScreenRight = function() {
		return this.screenRight
	}, f.prototype.getScreenBottom = function() {
		return this.screenBottom
	}, f.prototype.getScreenTop = function() {
		return this.screenTop
	}, f.prototype.getMaxLeft = function() {
		return this.maxLeft
	}, f.prototype.getMaxRight = function() {
		return this.maxRight
	}, f.prototype.getMaxBottom = function() {
		return this.maxBottom
	}, f.prototype.getMaxTop = function() {
		return this.maxTop
	}, c.platformManager = null, c.getPlatformManager = function() {
		return c.platformManager
	}, c.setPlatformManager = function(t) {
		c.platformManager = t
	}, t.exports = {
		L2DTargetPoint: p,
		Live2DFramework: c,
		L2DViewMatrix: f,
		L2DPose: $,
		L2DPartsParam: u,
		L2DPhysics: l,
		L2DMotionManager: h,
		L2DModelMatrix: a,
		L2DMatrix44: _,
		EYE_STATE: g,
		L2DEyeBlink: s,
		L2DExpressionParam: n,
		L2DExpressionMotion: o,
		L2DBaseModel: r
	}
}, function(t, i, e) {
	"use strict";
	var r = {
		DEBUG_LOG: !1,
		DEBUG_MOUSE_LOG: !1,
		DEBUG_DRAW_HIT_AREA: !1,
		DEBUG_DRAW_ALPHA_MODEL: !1,
		VIEW_MAX_SCALE: 2,
		VIEW_MIN_SCALE: .8,
		VIEW_LOGICAL_LEFT: -1,
		VIEW_LOGICAL_RIGHT: 1,
		VIEW_LOGICAL_MAX_LEFT: -2,
		VIEW_LOGICAL_MAX_RIGHT: 2,
		VIEW_LOGICAL_MAX_BOTTOM: -2,
		VIEW_LOGICAL_MAX_TOP: 2,
		PRIORITY_NONE: 0,
		PRIORITY_IDLE: 1,
		PRIORITY_SLEEPY: 2,
		PRIORITY_NORMAL: 3,
		PRIORITY_FORCE: 4,
		MOTION_GROUP_IDLE: "idle",
		MOTION_GROUP_SLEEPY: "sleepy",
		MOTION_GROUP_TAP_BODY: "tap_body",
		MOTION_GROUP_FLICK_HEAD: "flick_head",
		MOTION_GROUP_PINCH_IN: "pinch_in",
		MOTION_GROUP_PINCH_OUT: "pinch_out",
		MOTION_GROUP_SHAKE: "shake",
		HIT_AREA_HEAD: "head",
		HIT_AREA_BODY: "body"
	};
	t.exports = r
}, function(t, i, e) {
	"use strict";

	function r(t) {
		n = t
	}
	function o() {
		return n
	}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.setContext = r, i.getContext = o;
	var n = void 0
}, function(t, i, e) {
	"use strict";

	function r() {}
	r.matrixStack = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], r.depth = 0, r.currentMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], r.tmp = new Array(16), r.reset = function() {
		this.depth = 0
	}, r.loadIdentity = function() {
		for (var t = 0; t < 16; t++) this.currentMatrix[t] = t % 5 == 0 ? 1 : 0
	}, r.push = function() {
		var t = (this.depth, 16 * (this.depth + 1));
		this.matrixStack.length < t + 16 && (this.matrixStack.length = t + 16);
		for (var i = 0; i < 16; i++) this.matrixStack[t + i] = this.currentMatrix[i];
		this.depth++
	}, r.pop = function() {
		--this.depth < 0 && (myError("Invalid matrix stack."), this.depth = 0);
		for (var t = 16 * this.depth, i = 0; i < 16; i++) this.currentMatrix[i] = this.matrixStack[t + i]
	}, r.getMatrix = function() {
		return this.currentMatrix
	}, r.multMatrix = function(t) {
		var i, e, r;
		for (i = 0; i < 16; i++) this.tmp[i] = 0;
		for (i = 0; i < 4; i++) for (e = 0; e < 4; e++) for (r = 0; r < 4; r++) this.tmp[i + 4 * e] += this.currentMatrix[i + 4 * r] * t[r + 4 * e];
		for (i = 0; i < 16; i++) this.currentMatrix[i] = this.tmp[i]
	}, t.exports = r
}, function(t, i, e) {
	t.exports = e(5)
}, function(t, i, e) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
		default:
			t
		}
	}
	function o(t) {
		C = document.getElementById(t), C.addEventListener && (window.addEventListener("click", g), window.addEventListener("mousedown", g), window.addEventListener("mousemove", g), window.addEventListener("mouseup", g), document.addEventListener("mouseout", g), window.addEventListener("touchstart", y), window.addEventListener("touchend", y), window.addEventListener("touchmove", y))
	}
	function n(t) {
		var i = C.width,
			e = C.height;
		N = new M.L2DTargetPoint;
		var r = e / i,
			o = w.
		default.VIEW_LOGICAL_LEFT,
			n = w.
		default.VIEW_LOGICAL_RIGHT,
			_ = -r,
			h = r;
		if (window.Live2D.captureFrame = !1, B = new M.L2DViewMatrix, B.setScreenRect(o, n, _, h), B.setMaxScreenRect(w.
	default.VIEW_LOGICAL_MAX_LEFT, w.
	default.VIEW_LOGICAL_MAX_RIGHT, w.
	default.VIEW_LOGICAL_MAX_BOTTOM, w.
	default.VIEW_LOGICAL_MAX_TOP), B.setMaxScale(w.
	default.VIEW_MAX_SCALE), B.setMinScale(w.
	default.VIEW_MIN_SCALE), U = new M.L2DMatrix44, U.multScale(1, i / e), G = new M.L2DMatrix44, G.multTranslate(-i / 2, -e / 2), G.multScale(2 / i, -2 / i), F = v(), (0, D.setContext)(F), !F) return console.error("Failed to create WebGL context."), void(window.WebGLRenderingContext && console.error("Your browser don't support WebGL, check https://get.webgl.org/ for futher information."));
		window.Live2D.setGL(F), F.clearColor(0, 0, 0, 0), a(t), s()
	}
	function s() {
		b || (b = !0, function t() {
			_();
			var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			if (window.Live2D.captureFrame) {
				window.Live2D.captureFrame = !1;
				var e = document.createElement("a");
				document.body.appendChild(e), e.setAttribute("type", "hidden"), e.href = C.toDataURL(), e.download = window.Live2D.captureName || "live2d.png", e.click()
			}
			i(t, C)
		}())
	}
	function _() {
		O.
	default.reset(), O.
	default.loadIdentity(), N.update(), R.setDrag(N.getX(), N.getY()), F.clear(F.COLOR_BUFFER_BIT), O.
	default.multMatrix(U.getArray()), O.
	default.multMatrix(B.getArray()), O.
	default.push();
		for (var t = 0; t < R.numModels(); t++) {
			var i = R.getModel(t);
			if (null == i) return;
			i.initialized && !i.updating && (i.update(), i.draw(F))
		}
		O.
	default.pop()
	}
	function a(t) {
		R.reloadFlg = !0, R.count++, R.changeModel(F, t)
	}
	function h(t, i) {
		return t.x * i.x + t.y * i.y
	}
	function l(t, i) {
		var e = Math.sqrt(t * t + i * i);
		return {
			x: t / e,
			y: i / e
		}
	}
	function $(t, i, e) {
		function r(t, i) {
			return 180 * Math.acos(h({
				x: 0,
				y: 1
			}, l(t, i))) / Math.PI
		}
		if (i.x < e.left + e.width && i.y < e.top + e.height && i.x > e.left && i.y > e.top) return i;
		var o = t.x - i.x,
			n = t.y - i.y,
			s = r(o, n);
		i.x < t.x && (s = 360 - s);
		var _ = 360 - r(e.left - t.x, -1 * (e.top - t.y)),
			a = 360 - r(e.left - t.x, -1 * (e.top + e.height - t.y)),
			$ = r(e.left + e.width - t.x, -1 * (e.top - t.y)),
			u = r(e.left + e.width - t.x, -1 * (e.top + e.height - t.y)),
			p = n / o,
			f = {};
		if (s < $) {
			var c = e.top - t.y,
				d = c / p;
			f = {
				y: t.y + c,
				x: t.x + d
			}
		} else if (s < u) {
			var g = e.left + e.width - t.x,
				y = g * p;
			f = {
				y: t.y + y,
				x: t.x + g
			}
		} else if (s < a) {
			var m = e.top + e.height - t.y,
				T = m / p;
			f = {
				y: t.y + m,
				x: t.x + T
			}
		} else if (s < _) {
			var P = t.x - e.left,
				S = P * p;
			f = {
				y: t.y - S,
				x: t.x - P
			}
		} else {
			var v = e.top - t.y,
				L = v / p;
			f = {
				y: t.y + v,
				x: t.x + L
			}
		}
		return f
	}
	function u(t) {
		Y = !0;
		var i = C.getBoundingClientRect(),
			e = P(t.clientX - i.left),
			r = S(t.clientY - i.top),
			o = $({
				x: i.left + i.width / 2,
				y: i.top + i.height * X
			}, {
				x: t.clientX,
				y: t.clientY
			}, i),
			n = m(o.x - i.left),
			s = T(o.y - i.top);
		w.
	default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), k = e, V = r, N.setPoint(n, s)
	}
	function p(t) {
		Y = !0;
		var i = C.getBoundingClientRect(),
			e = P(t.clientX - i.left),
			r = S(t.clientY - i.top),
			o = $({
				x: i.left + i.width / 2,
				y: i.top + i.height * X
			}, {
				x: t.clientX,
				y: t.clientY
			}, i),
			n = m(o.x - i.left),
			s = T(o.y - i.top);
		w.
	default.DEBUG_MOUSE_LOG && console.log("onMouseDown device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), k = e, V = r, R.tapEvent(n, s)
	}
	function f(t) {
		var i = C.getBoundingClientRect(),
			e = P(t.clientX - i.left),
			r = S(t.clientY - i.top),
			o = $({
				x: i.left + i.width / 2,
				y: i.top + i.height * X
			}, {
				x: t.clientX,
				y: t.clientY
			}, i),
			n = m(o.x - i.left),
			s = T(o.y - i.top);
		w.
	default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), Y && (k = e, V = r, N.setPoint(n, s))
	}
	function c() {
		Y && (Y = !1), N.setPoint(0, 0)
	}
	function d() {
		w.
	default.DEBUG_LOG && console.log("Set Session Storage."), sessionStorage.setItem("Sleepy", "1")
	}
	function g(t) {
		if ("mousewheel" == t.type);
		else if ("mousedown" == t.type) p(t);
		else if ("mousemove" == t.type) {
			var i = sessionStorage.getItem("Sleepy");
			"1" === i && sessionStorage.setItem("Sleepy", "0"), u(t)
		} else if ("mouseup" == t.type) {
			if ("button" in t && 0 != t.button) return
		} else if ("mouseout" == t.type) {
			w.
		default.DEBUG_LOG && console.log("Mouse out Window."), c();
			var e = sessionStorage.getItem("SleepyTimer");
			window.clearTimeout(e), e = window.setTimeout(d, 5e4), sessionStorage.setItem("SleepyTimer", e)
		}
	}
	function y(t) {
		var i = t.touches[0];
		"touchstart" == t.type ? 1 == t.touches.length && u(i) : "touchmove" == t.type ? f(i) : "touchend" == t.type && c()
	}
	function m(t) {
		var i = G.transformX(t);
		return B.invertTransformX(i)
	}
	function T(t) {
		var i = G.transformY(t);
		return B.invertTransformY(i)
	}
	function P(t) {
		return G.transformX(t)
	}
	function S(t) {
		return G.transformY(t)
	}
	function v() {
		for (var t = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], i = 0; i < t.length; i++) try {
			var e = C.getContext(t[i], {
				premultipliedAlpha: !0
			});
			if (e) return e
		} catch (t) {}
		return null
	}
	function L(t, i, e) {
		X = void 0 === e ? .5 : e, o(t), n(i)
	}
	e(6);
	var M = e(0),
		E = e(8),
		A = r(E),
		I = e(1),
		w = r(I),
		x = e(3),
		O = r(x),
		D = e(2),
		R = (window.navigator.platform.toLowerCase(), new A.
	default),
		b = !1,
		F = null,
		C = null,
		N = null,
		B = null,
		U = null,
		G = null,
		Y = !1,
		k = 0,
		V = 0,
		X = .5;
	window.loadlive2d = L
}, function(t, i, e) {
	"use strict";
	(function(t) {
		!
		function() {
			function i() {
				At || (this._$MT = null, this._$5S = null, this._$NP = 0, i._$42++, this._$5S = new Y(this))
			}
			function e(t) {
				if (!At) {
					this.clipContextList = new Array, this.glcontext = t.gl, this.dp_webgl = t, this.curFrameNo = 0, this.firstError_clipInNotUpdate = !0, this.colorBuffer = 0, this.isInitGLFBFunc = !1, this.tmpBoundsOnModel = new S, at.glContext.length > at.frameBuffers.length && (this.curFrameNo = this.getMaskRenderTexture()), this.tmpModelToViewMatrix = new R, this.tmpMatrix2 = new R, this.tmpMatrixForMask = new R, this.tmpMatrixForDraw = new R, this.CHANNEL_COLORS = new Array;
					var i = new A;
					i = new A, i.r = 0, i.g = 0, i.b = 0, i.a = 1, this.CHANNEL_COLORS.push(i), i = new A, i.r = 1, i.g = 0, i.b = 0, i.a = 0, this.CHANNEL_COLORS.push(i), i = new A, i.r = 0, i.g = 1, i.b = 0, i.a = 0, this.CHANNEL_COLORS.push(i), i = new A, i.r = 0, i.g = 0, i.b = 1, i.a = 0, this.CHANNEL_COLORS.push(i);
					for (var e = 0; e < this.CHANNEL_COLORS.length; e++) this.dp_webgl.setChannelFlagAsColor(e, this.CHANNEL_COLORS[e])
				}
			}
			function r(t, i, e) {
				this.clipIDList = new Array, this.clipIDList = e, this.clippingMaskDrawIndexList = new Array;
				for (var r = 0; r < e.length; r++) this.clippingMaskDrawIndexList.push(i.getDrawDataIndex(e[r]));
				this.clippedDrawContextList = new Array, this.isUsing = !0, this.layoutChannelNo = 0, this.layoutBounds = new S, this.allClippedDrawRect = new S, this.matrixForMask = new Float32Array(16), this.matrixForDraw = new Float32Array(16), this.owner = t
			}
			function o(t, i) {
				this._$gP = t, this.drawDataIndex = i
			}
			function n() {
				At || (this.color = null)
			}
			function s() {
				At || (this._$dP = null, this._$eo = null, this._$V0 = null, this._$dP = 1e3, this._$eo = 1e3, this._$V0 = 1, this._$a0())
			}
			function _() {}
			function a() {
				this._$r = null, this._$0S = null
			}
			function h() {
				At || (this.x = null, this.y = null, this.width = null, this.height = null)
			}
			function l(t) {
				At || et.prototype.constructor.call(this, t)
			}
			function $() {}
			function u(t) {
				At || et.prototype.constructor.call(this, t)
			}
			function p() {
				At || (this._$vo = null, this._$F2 = null, this._$ao = 400, this._$1S = 400, p._$42++)
			}
			function f() {
				At || (this.p1 = new c, this.p2 = new c, this._$Fo = 0, this._$Db = 0, this._$L2 = 0, this._$M2 = 0, this._$ks = 0, this._$9b = 0, this._$iP = 0, this._$iT = 0, this._$lL = new Array, this._$qP = new Array, this.setup(.3, .5, .1))
			}
			function c() {
				this._$p = 1, this.x = 0, this.y = 0, this.vx = 0, this.vy = 0, this.ax = 0, this.ay = 0, this.fx = 0, this.fy = 0, this._$s0 = 0, this._$70 = 0, this._$7L = 0, this._$HL = 0
			}
			function d(t, i, e) {
				this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = t, this.scale = i, this._$V0 = e
			}
			function g(t, i, e, r) {
				d.prototype.constructor.call(this, i, e, r), this._$tL = null, this._$tL = t
			}
			function y(t, i, e) {
				this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = t, this.scale = i, this._$V0 = e
			}
			function T(t, i, e, r) {
				y.prototype.constructor.call(this, i, e, r), this._$YP = null, this._$YP = t
			}
			function P() {
				At || (this._$fL = 0, this._$gL = 0, this._$B0 = 1, this._$z0 = 1, this._$qT = 0, this.reflectX = !1, this.reflectY = !1)
			}
			function S() {
				At || (this.x = null, this.y = null, this.width = null, this.height = null)
			}
			function v() {}
			function L() {
				At || (this.x = null, this.y = null)
			}
			function M() {
				At || (this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null, this.clipID = null, this.clipIDList = new Array)
			}
			function E() {
				At || (this._$Eb = E._$ps, this._$lT = 1, this._$C0 = 1, this._$tT = 1, this._$WL = 1, this.culling = !1, this.matrix4x4 = new Float32Array(16), this.premultipliedAlpha = !1, this.anisotropy = 0, this.clippingProcess = E.CLIPPING_PROCESS_NONE, this.clipBufPre_clipContextMask = null, this.clipBufPre_clipContextDraw = null, this.CHANNEL_COLORS = new Array)
			}
			function A() {
				At || (this.a = 1, this.r = 1, this.g = 1, this.b = 1, this.scale = 1, this._$ho = 1, this.blendMode = at.L2D_COLOR_BLEND_MODE_MULT)
			}
			function I() {
				At || (this._$kP = null, this._$dr = null, this._$Ai = !0, this._$mS = null)
			}
			function w() {}
			function x() {
				At || (this._$VP = 0, this._$wL = null, this._$GP = null, this._$8o = x._$ds, this._$2r = -1, this._$O2 = 0, this._$ri = 0)
			}
			function O() {}
			function D() {
				At || (this._$Ob = null)
			}
			function R() {
				this.m = new Float32Array(16), this.identity()
			}
			function b(t) {
				At || et.prototype.constructor.call(this, t)
			}
			function F() {
				At || (this._$7 = 1, this._$f = 0, this._$H = 0, this._$g = 1, this._$k = 0, this._$w = 0, this._$hi = STATE_IDENTITY, this._$Z = _$pS)
			}
			function C() {
				At || (s.prototype.constructor.call(this), this.motions = new Array, this._$7r = null, this._$7r = C._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !0, this.loopFadeIn = !0, this._$AS = -1, _$a0())
			}
			function N() {
				this._$P = new Float32Array(100), this.size = 0
			}
			function B() {
				this._$4P = null, this._$I0 = null, this._$RP = null
			}
			function U() {}
			function G() {}
			function Y(t) {
				At || (this._$QT = !0, this._$co = -1, this._$qo = 0, this._$pb = new Array(Y._$is), this._$_2 = new Float32Array(Y._$is), this._$vr = new Float32Array(Y._$is), this._$Rr = new Float32Array(Y._$is), this._$Or = new Float32Array(Y._$is), this._$fs = new Float32Array(Y._$is), this._$Js = new Array(Y._$is), this._$3S = new Array, this._$aS = new Array, this._$Bo = null, this._$F2 = new Array, this._$db = new Array, this._$8b = new Array, this._$Hr = new Array, this._$Ws = null, this._$Vs = null, this._$Er = null, this._$Es = new Int16Array(U._$Qb), this._$ZP = new Float32Array(2 * U._$1r), this._$Ri = t, this._$b0 = Y._$HP++, this.clipManager = null, this.dp_webgl = null)
			}
			function k() {}
			function V() {
				At || (this._$12 = null, this._$bb = null, this._$_L = null, this._$jo = null, this._$iL = null, this._$0L = null, this._$Br = null, this._$Dr = null, this._$Cb = null, this._$mr = null, this._$_L = wt.STATE_FIRST, this._$Br = 4e3, this._$Dr = 100, this._$Cb = 50, this._$mr = 150, this._$jo = !0, this._$iL = "PARAM_EYE_L_OPEN", this._$0L = "PARAM_EYE_R_OPEN")
			}
			function X() {
				At || (E.prototype.constructor.call(this), this._$sb = new Int32Array(X._$As), this._$U2 = new Array, this.transform = null, this.gl = null, null == X._$NT && (X._$NT = X._$9r(256), X._$vS = X._$9r(256), X._$no = X._$vb(256)))
			}
			function z() {
				At || (I.prototype.constructor.call(this), this._$GS = null, this._$Y0 = null)
			}
			function H(t) {
				_t.prototype.constructor.call(this, t), this._$8r = I._$ur, this._$Yr = null, this._$Wr = null
			}
			function W() {
				At || (M.prototype.constructor.call(this), this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null)
			}
			function j() {
				At || (this._$NL = null, this._$3S = null, this._$aS = null, j._$42++)
			}
			function q() {
				At || (i.prototype.constructor.call(this), this._$zo = new X)
			}
			function J() {
				At || (s.prototype.constructor.call(this), this.motions = new Array, this._$o2 = null, this._$7r = J._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !1, this.loopFadeIn = !0, this._$rr = -1, this._$eP = 0)
			}
			function Q(t, i) {
				return String.fromCharCode(t.getUint8(i))
			}
			function N() {
				this._$P = new Float32Array(100), this.size = 0
			}
			function B() {
				this._$4P = null, this._$I0 = null, this._$RP = null
			}
			function Z() {
				At || (I.prototype.constructor.call(this), this._$o = 0, this._$A = 0, this._$GS = null, this._$Eo = null)
			}
			function K(t) {
				_t.prototype.constructor.call(this, t), this._$8r = I._$ur, this._$Cr = null, this._$hr = null
			}
			function tt() {
				At || (this.visible = !0, this._$g0 = !1, this._$NL = null, this._$3S = null, this._$aS = null, tt._$42++)
			}
			function it(t) {
				this._$VS = null, this._$e0 = null, this._$e0 = t
			}
			function et(t) {
				At || (this.id = t)
			}
			function rt() {}
			function ot() {
				At || (this._$4S = null)
			}
			function nt(t, i) {
				this.canvas = t, this.context = i, this.viewport = new Array(0, 0, t.width, t.height), this._$6r = 1, this._$xP = 0, this._$3r = 1, this._$uP = 0, this._$Qo = -1, this.cacheImages = {}
			}
			function st() {
				At || (this._$TT = null, this._$LT = null, this._$FS = null, this._$wL = null)
			}
			function _t(t) {
				At || (this._$e0 = null, this._$IP = null, this._$JS = !1, this._$AT = !0, this._$e0 = t, this.totalScale = 1, this._$7s = 1, this.totalOpacity = 1)
			}
			function at() {}
			function ht() {}
			function lt(t) {
				At || (this._$ib = t)
			}
			function $t() {
				At || (W.prototype.constructor.call(this), this._$LP = -1, this._$d0 = 0, this._$Yo = 0, this._$JP = null, this._$5P = null, this._$BP = null, this._$Eo = null, this._$Qi = null, this._$6s = $t._$ms, this.culling = !0, this.gl_cacheImage = null, this.instanceNo = $t._$42++)
			}
			function ut(t) {
				Mt.prototype.constructor.call(this, t), this._$8r = W._$ur, this._$Cr = null, this._$hr = null
			}
			function pt() {
				At || (this.x = null, this.y = null)
			}
			function ft(t) {
				At || (i.prototype.constructor.call(this), this.drawParamWebGL = new mt(t), this.drawParamWebGL.setGL(at.getGL(t)))
			}
			function ct() {
				At || (this.motions = null, this._$eb = !1, this.motions = new Array)
			}
			function dt() {
				this._$w0 = null, this._$AT = !0, this._$9L = !1, this._$z2 = -1, this._$bs = -1, this._$Do = -1, this._$sr = null, this._$sr = dt._$Gs++
			}
			function gt() {
				this.m = new Array(1, 0, 0, 0, 1, 0, 0, 0, 1)
			}
			function yt(t) {
				At || et.prototype.constructor.call(this, t)
			}
			function mt(t) {
				At || (E.prototype.constructor.call(this), this.textures = new Array, this.transform = null, this.gl = null, this.glno = t, this.firstDraw = !0, this.anisotropyExt = null, this.maxAnisotropy = 0, this._$As = 32, this._$Gr = !1, this._$NT = null, this._$vS = null, this._$no = null, this.vertShader = null, this.fragShader = null, this.vertShaderOff = null, this.fragShaderOff = null)
			}
			function Tt(t, i, e) {
				return null == i && (i = t.createBuffer()), t.bindBuffer(t.ARRAY_BUFFER, i), t.bufferData(t.ARRAY_BUFFER, e, t.DYNAMIC_DRAW), i
			}
			function Pt(t, i, e) {
				return null == i && (i = t.createBuffer()), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, i), t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.DYNAMIC_DRAW), i
			}
			function St(t) {
				At || (this._$P = new Int8Array(8), this._$R0 = new DataView(this._$P.buffer), this._$3i = new Int8Array(1e3), this._$hL = 0, this._$v0 = 0, this._$S2 = 0, this._$Ko = new Array, this._$T = t, this._$F = 0)
			}
			function vt() {}
			function Lt() {}
			function Mt(t) {
				At || (this._$e0 = null, this._$IP = null, this._$Us = null, this._$7s = null, this._$IS = [!1], this._$VS = null, this._$AT = !0, this.baseOpacity = 1, this.clipBufPre_clipContext = null, this._$e0 = t)
			}
			function Et() {}
			var At = !0;
			i._$0s = 1, i._$4s = 2, i._$42 = 0, i._$62 = function(t, e) {
				try {
					if (e instanceof ArrayBuffer && (e = new DataView(e)), !(e instanceof DataView)) throw new lt("_$SS#loadModel(b) / b _$x be DataView or ArrayBuffer");
					var r, o = new St(e),
						n = o._$ST(),
						s = o._$ST(),
						a = o._$ST();
					if (109 != n || 111 != s || 99 != a) throw new lt("_$gi _$C _$li , _$Q0 _$P0.");
					if (r = o._$ST(), o._$gr(r), r > G._$T7) {
						t._$NP |= i._$4s;
						throw new lt("_$gi _$C _$li , _$n0 _$_ version _$li ( SDK : " + G._$T7 + " < _$f0 : " + r + " )@_$SS#loadModel()\n")
					}
					var h = o._$nP();
					if (r >= G._$s7) {
						var l = o._$9T(),
							$ = o._$9T();
						if (-30584 != l || -30584 != $) throw t._$NP |= i._$0s, new lt("_$gi _$C _$li , _$0 _$6 _$Ui.")
					}
					t._$KS(h);
					var u = t.getModelContext();
					u.setDrawParam(t.getDrawParam()), u.init()
				} catch (t) {
					_._$Rb(t)
				}
			}, i.prototype._$KS = function(t) {
				this._$MT = t
			}, i.prototype.getModelImpl = function() {
				return null == this._$MT && (this._$MT = new p, this._$MT._$zP()), this._$MT
			}, i.prototype.getCanvasWidth = function() {
				return null == this._$MT ? 0 : this._$MT.getCanvasWidth()
			}, i.prototype.getCanvasHeight = function() {
				return null == this._$MT ? 0 : this._$MT.getCanvasHeight()
			}, i.prototype.getParamFloat = function(t) {
				return "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), this._$5S.getParamFloat(t)
			}, i.prototype.setParamFloat = function(t, i, e) {
				"number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), arguments.length < 3 && (e = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 - e) + i * e)
			}, i.prototype.addToParamFloat = function(t, i, e) {
				"number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), arguments.length < 3 && (e = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) + i * e)
			}, i.prototype.multParamFloat = function(t, i, e) {
				"number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), arguments.length < 3 && (e = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 + (i - 1) * e))
			}, i.prototype.getParamIndex = function(t) {
				return this._$5S.getParamIndex(u.getID(t))
			}, i.prototype.loadParam = function() {
				this._$5S.loadParam()
			}, i.prototype.saveParam = function() {
				this._$5S.saveParam()
			}, i.prototype.init = function() {
				this._$5S.init()
			}, i.prototype.update = function() {
				this._$5S.update()
			}, i.prototype._$Rs = function() {
				return _._$li("_$60 _$PT _$Rs()"), -1
			}, i.prototype._$Ds = function(t) {
				_._$li("_$60 _$PT _$SS#_$Ds() \n")
			}, i.prototype._$K2 = function() {}, i.prototype.draw = function() {}, i.prototype.getModelContext = function() {
				return this._$5S
			}, i.prototype._$s2 = function() {
				return this._$NP
			}, i.prototype._$P7 = function(t, i, e, r) {
				var o = -1,
					n = 0,
					s = this;
				if (0 != e) if (1 == t.length) {
					var _ = t[0],
						a = 0 != s.getParamFloat(_),
						h = i[0],
						l = s.getPartsOpacity(h),
						$ = e / r;
					a ? (l += $) > 1 && (l = 1) : (l -= $) < 0 && (l = 0), s.setPartsOpacity(h, l)
				} else {
					for (var u = 0; u < t.length; u++) {
						var _ = t[u],
							p = 0 != s.getParamFloat(_);
						if (p) {
							if (o >= 0) break;
							o = u;
							var h = i[u];
							n = s.getPartsOpacity(h), n += e / r, n > 1 && (n = 1)
						}
					}
					o < 0 && (console.log("No _$wi _$q0/ _$U default[%s]", t[0]), o = 0, n = 1, s.loadParam(), s.setParamFloat(t[o], n), s.saveParam());
					for (var u = 0; u < t.length; u++) {
						var h = i[u];
						if (o == u) s.setPartsOpacity(h, n);
						else {
							var f, c = s.getPartsOpacity(h);
							f = n < .5 ? -.5 * n / .5 + 1 : .5 * (1 - n) / .5;
							var d = (1 - f) * (1 - n);
							d > .15 && (f = 1 - .15 / (1 - n)), c > f && (c = f), s.setPartsOpacity(h, c)
						}
					}
				} else for (var u = 0; u < t.length; u++) {
					var _ = t[u],
						h = i[u],
						p = 0 != s.getParamFloat(_);
					s.setPartsOpacity(h, p ? 1 : 0)
				}
			}, i.prototype.setPartsOpacity = function(t, i) {
				"number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))), this._$5S.setPartsOpacity(t, i)
			}, i.prototype.getPartsDataIndex = function(t) {
				return t instanceof l || (t = l.getID(t)), this._$5S.getPartsDataIndex(t)
			}, i.prototype.getPartsOpacity = function(t) {
				return "number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))), t < 0 ? 0 : this._$5S.getPartsOpacity(t)
			}, i.prototype.getDrawParam = function() {}, i.prototype.getDrawDataIndex = function(t) {
				return this._$5S.getDrawDataIndex(b.getID(t))
			}, i.prototype.getDrawData = function(t) {
				return this._$5S.getDrawData(t)
			}, i.prototype.getTransformedPoints = function(t) {
				var i = this._$5S._$C2(t);
				return i instanceof ut ? i.getTransformedPoints() : null
			}, i.prototype.getIndexArray = function(t) {
				if (t < 0 || t >= this._$5S._$aS.length) return null;
				var i = this._$5S._$aS[t];
				return null != i && i.getType() == W._$wb && i instanceof $t ? i.getIndexArray() : null
			}, e.CHANNEL_COUNT = 4, e.RENDER_TEXTURE_USE_MIPMAP = !1, e.NOT_USED_FRAME = -100, e.prototype._$L7 = function() {
				if (this.tmpModelToViewMatrix && (this.tmpModelToViewMatrix = null), this.tmpMatrix2 && (this.tmpMatrix2 = null), this.tmpMatrixForMask && (this.tmpMatrixForMask = null), this.tmpMatrixForDraw && (this.tmpMatrixForDraw = null), this.tmpBoundsOnModel && (this.tmpBoundsOnModel = null), this.CHANNEL_COLORS) {
					for (var t = this.CHANNEL_COLORS.length - 1; t >= 0; --t) this.CHANNEL_COLORS.splice(t, 1);
					this.CHANNEL_COLORS = []
				}
				this.releaseShader()
			}, e.prototype.releaseShader = function() {
				for (var t = at.frameBuffers.length, i = 0; i < t; i++) this.gl.deleteFramebuffer(at.frameBuffers[i].framebuffer);
				at.frameBuffers = [], at.glContext = []
			}, e.prototype.init = function(t, i, e) {
				for (var o = 0; o < i.length; o++) {
					var n = i[o].getClipIDList();
					if (null != n) {
						var s = this.findSameClip(n);
						null == s && (s = new r(this, t, n), this.clipContextList.push(s));
						var _ = i[o].getDrawDataID(),
							a = t.getDrawDataIndex(_);
						s.addClippedDrawData(_, a);
						e[o].clipBufPre_clipContext = s
					}
				}
			}, e.prototype.getMaskRenderTexture = function() {
				var t = null;
				return t = this.dp_webgl.createFramebuffer(), at.frameBuffers[this.dp_webgl.glno] = t, this.dp_webgl.glno
			}, e.prototype.setupClip = function(t, i) {
				for (var e = 0, r = 0; r < this.clipContextList.length; r++) {
					var o = this.clipContextList[r];
					this.calcClippedDrawTotalBounds(t, o), o.isUsing && e++
				}
				if (e > 0) {
					var n = i.gl.getParameter(i.gl.FRAMEBUFFER_BINDING),
						s = new Array(4);
					s[0] = 0, s[1] = 0, s[2] = i.gl.canvas.width, s[3] = i.gl.canvas.height, i.gl.viewport(0, 0, at.clippingMaskBufferSize, at.clippingMaskBufferSize), this.setupLayoutBounds(e), i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, at.frameBuffers[this.curFrameNo].framebuffer), i.gl.clearColor(0, 0, 0, 0), i.gl.clear(i.gl.COLOR_BUFFER_BIT);
					for (var r = 0; r < this.clipContextList.length; r++) {
						var o = this.clipContextList[r],
							_ = o.allClippedDrawRect,
							a = (o.layoutChannelNo, o.layoutBounds);
						this.tmpBoundsOnModel._$jL(_), this.tmpBoundsOnModel.expand(.05 * _.width, .05 * _.height);
						var h = a.width / this.tmpBoundsOnModel.width,
							l = a.height / this.tmpBoundsOnModel.height;
						this.tmpMatrix2.identity(), this.tmpMatrix2.translate(-1, -1, 0), this.tmpMatrix2.scale(2, 2, 1), this.tmpMatrix2.translate(a.x, a.y, 0), this.tmpMatrix2.scale(h, l, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForMask.setMatrix(this.tmpMatrix2.m), this.tmpMatrix2.identity(), this.tmpMatrix2.translate(a.x, a.y, 0), this.tmpMatrix2.scale(h, l, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForDraw.setMatrix(this.tmpMatrix2.m);
						for (var $ = this.tmpMatrixForMask.getArray(), u = 0; u < 16; u++) o.matrixForMask[u] = $[u];
						for (var p = this.tmpMatrixForDraw.getArray(), u = 0; u < 16; u++) o.matrixForDraw[u] = p[u];
						for (var f = o.clippingMaskDrawIndexList.length, c = 0; c < f; c++) {
							var d = o.clippingMaskDrawIndexList[c],
								g = t.getDrawData(d),
								y = t._$C2(d);
							i.setClipBufPre_clipContextForMask(o), g.draw(i, t, y)
						}
					}
					i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, n), i.setClipBufPre_clipContextForMask(null), i.gl.viewport(s[0], s[1], s[2], s[3])
				}
			}, e.prototype.getColorBuffer = function() {
				return this.colorBuffer
			}, e.prototype.findSameClip = function(t) {
				for (var i = 0; i < this.clipContextList.length; i++) {
					var e = this.clipContextList[i],
						r = e.clipIDList.length;
					if (r == t.length) {
						for (var o = 0, n = 0; n < r; n++) for (var s = e.clipIDList[n], _ = 0; _ < r; _++) if (t[_] == s) {
							o++;
							break
						}
						if (o == r) return e
					}
				}
				return null
			}, e.prototype.calcClippedDrawTotalBounds = function(t, i) {
				for (var e = t._$Ri.getModelImpl().getCanvasWidth(), r = t._$Ri.getModelImpl().getCanvasHeight(), o = e > r ? e : r, n = o, s = o, _ = 0, a = 0, h = i.clippedDrawContextList.length, l = 0; l < h; l++) {
					var $ = i.clippedDrawContextList[l],
						u = $.drawDataIndex,
						p = t._$C2(u);
					if (p._$yo()) {
						for (var f = p.getTransformedPoints(), c = f.length, d = [], g = [], y = 0, m = U._$i2; m < c; m += U._$No) d[y] = f[m], g[y] = f[m + 1], y++;
						var T = Math.min.apply(null, d),
							P = Math.min.apply(null, g),
							S = Math.max.apply(null, d),
							v = Math.max.apply(null, g);
						T < n && (n = T), P < s && (s = P), S > _ && (_ = S), v > a && (a = v)
					}
				}
				if (n == o) i.allClippedDrawRect.x = 0, i.allClippedDrawRect.y = 0, i.allClippedDrawRect.width = 0, i.allClippedDrawRect.height = 0, i.isUsing = !1;
				else {
					var L = _ - n,
						M = a - s;
					i.allClippedDrawRect.x = n, i.allClippedDrawRect.y = s, i.allClippedDrawRect.width = L, i.allClippedDrawRect.height = M, i.isUsing = !0
				}
			}, e.prototype.setupLayoutBounds = function(t) {
				var i = t / e.CHANNEL_COUNT,
					r = t % e.CHANNEL_COUNT;
				i = ~~i, r = ~~r;
				for (var o = 0, n = 0; n < e.CHANNEL_COUNT; n++) {
					var s = i + (n < r ? 1 : 0);
					if (0 == s);
					else if (1 == s) {
						var a = this.clipContextList[o++];
						a.layoutChannelNo = n, a.layoutBounds.x = 0, a.layoutBounds.y = 0, a.layoutBounds.width = 1, a.layoutBounds.height = 1
					} else if (2 == s) for (var h = 0; h < s; h++) {
						var l = h % 2,
							$ = 0;
						l = ~~l;
						var a = this.clipContextList[o++];
						a.layoutChannelNo = n, a.layoutBounds.x = .5 * l, a.layoutBounds.y = 0, a.layoutBounds.width = .5, a.layoutBounds.height = 1
					} else if (s <= 4) for (var h = 0; h < s; h++) {
						var l = h % 2,
							$ = h / 2;
						l = ~~l, $ = ~~$;
						var a = this.clipContextList[o++];
						a.layoutChannelNo = n, a.layoutBounds.x = .5 * l, a.layoutBounds.y = .5 * $, a.layoutBounds.width = .5, a.layoutBounds.height = .5
					} else if (s <= 9) for (var h = 0; h < s; h++) {
						var l = h % 3,
							$ = h / 3;
						l = ~~l, $ = ~~$;
						var a = this.clipContextList[o++];
						a.layoutChannelNo = n, a.layoutBounds.x = l / 3, a.layoutBounds.y = $ / 3, a.layoutBounds.width = 1 / 3, a.layoutBounds.height = 1 / 3
					} else _._$li("_$6 _$0P mask count : %d", s)
				}
			}, r.prototype.addClippedDrawData = function(t, i) {
				var e = new o(t, i);
				this.clippedDrawContextList.push(e)
			}, s._$JT = function(t, i, e) {
				var r = t / i,
					o = e / i,
					n = o,
					s = 1 - (1 - o) * (1 - o),
					_ = 1 - (1 - n) * (1 - n),
					a = 1 / 3 * (1 - o) * s + (n * (2 / 3) + 1 / 3 * (1 - n)) * (1 - s),
					h = (n + 2 / 3 * (1 - n)) * _ + (o * (1 / 3) + 2 / 3 * (1 - o)) * (1 - _),
					l = 1 - 3 * h + 3 * a - 0,
					$ = 3 * h - 6 * a + 0,
					u = 3 * a - 0;
				if (r <= 0) return 0;
				if (r >= 1) return 1;
				var p = r,
					f = p * p;
				return l * (p * f) + $ * f + u * p + 0
			}, s.prototype._$a0 = function() {}, s.prototype.setFadeIn = function(t) {
				this._$dP = t
			}, s.prototype.setFadeOut = function(t) {
				this._$eo = t
			}, s.prototype._$pT = function(t) {
				this._$V0 = t
			}, s.prototype.getFadeOut = function() {
				return this._$eo
			}, s.prototype._$4T = function() {
				return this._$eo
			}, s.prototype._$mT = function() {
				return this._$V0
			}, s.prototype.getDurationMSec = function() {
				return -1
			}, s.prototype.getLoopDurationMSec = function() {
				return -1
			}, s.prototype.updateParam = function(t, i) {
				if (i._$AT && !i._$9L) {
					var e = w.getUserTimeMSec();
					if (i._$z2 < 0) {
						i._$z2 = e, i._$bs = e;
						var r = this.getDurationMSec();
						i._$Do < 0 && (i._$Do = r <= 0 ? -1 : i._$z2 + r)
					}
					var o = this._$V0;
					o = o * (0 == this._$dP ? 1 : ht._$r2((e - i._$bs) / this._$dP)) * (0 == this._$eo || i._$Do < 0 ? 1 : ht._$r2((i._$Do - e) / this._$eo)), 0 <= o && o <= 1 || console.log("### assert!! ### "), this.updateParamExe(t, e, o, i), i._$Do > 0 && i._$Do < e && (i._$9L = !0)
				}
			}, s.prototype.updateParamExe = function(t, i, e, r) {}, _._$8s = 0, _._$fT = new Object, _.start = function(t) {
				var i = _._$fT[t];
				null == i && (i = new a, i._$r = t, _._$fT[t] = i), i._$0S = w.getSystemTimeMSec()
			}, _.dump = function(t) {
				var i = _._$fT[t];
				if (null != i) {
					var e = w.getSystemTimeMSec(),
						r = e - i._$0S;
					return console.log(t + " : " + r + "ms"), r
				}
				return -1
			}, _.end = function(t) {
				var i = _._$fT[t];
				if (null != i) {
					return w.getSystemTimeMSec() - i._$0S
				}
				return -1
			}, _._$li = function(t, i) {
				console.log("_$li : " + t + "\n", i)
			}, _._$Ji = function(t, i) {
				console.log(t, i)
			}, _._$dL = function(t, i) {
				console.log(t, i), console.log("\n")
			}, _._$KL = function(t, i) {
				for (var e = 0; e < i; e++) e % 16 == 0 && e > 0 ? console.log("\n") : e % 8 == 0 && e > 0 && console.log("  "), console.log("%02X ", 255 & t[e]);
				console.log("\n")
			}, _._$nr = function(t, i, e) {
				console.log("%s\n", t);
				for (var r = i.length, o = 0; o < r; ++o) console.log("%5d", i[o]), console.log("%s\n", e), console.log(",");
				console.log("\n")
			}, _._$Rb = function(t) {
				console.log("dump exception : " + t), console.log("stack :: " + t.stack)
			}, h.prototype._$8P = function() {
				return .5 * (this.x + this.x + this.width)
			}, h.prototype._$6P = function() {
				return .5 * (this.y + this.y + this.height)
			}, h.prototype._$EL = function() {
				return this.x + this.width
			}, h.prototype._$5T = function() {
				return this.y + this.height
			}, h.prototype._$jL = function(t, i, e, r) {
				this.x = t, this.y = i, this.width = e, this.height = r
			}, h.prototype._$jL = function(t) {
				this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
			}, l.prototype = new et, l._$tP = new Object, l._$27 = function() {
				l._$tP.clear()
			}, l.getID = function(t) {
				var i = l._$tP[t];
				return null == i && (i = new l(t), l._$tP[t] = i), i
			}, l.prototype._$3s = function() {
				return new l
			}, u.prototype = new et, u._$tP = new Object, u._$27 = function() {
				u._$tP.clear()
			}, u.getID = function(t) {
				var i = u._$tP[t];
				return null == i && (i = new u(t), u._$tP[t] = i), i
			}, u.prototype._$3s = function() {
				return new u
			}, p._$42 = 0, p.prototype._$zP = function() {
				null == this._$vo && (this._$vo = new ot), null == this._$F2 && (this._$F2 = new Array)
			}, p.prototype.getCanvasWidth = function() {
				return this._$ao
			}, p.prototype.getCanvasHeight = function() {
				return this._$1S
			}, p.prototype._$F0 = function(t) {
				this._$vo = t._$nP(), this._$F2 = t._$nP(), this._$ao = t._$6L(), this._$1S = t._$6L()
			}, p.prototype._$6S = function(t) {
				this._$F2.push(t)
			}, p.prototype._$Xr = function() {
				return this._$F2
			}, p.prototype._$E2 = function() {
				return this._$vo
			}, f.prototype.setup = function(t, i, e) {
				this._$ks = this._$Yb(), this.p2._$xT(), 3 == arguments.length && (this._$Fo = t, this._$L2 = i, this.p1._$p = e, this.p2._$p = e, this.p2.y = t, this.setup())
			}, f.prototype.getPhysicsPoint1 = function() {
				return this.p1
			}, f.prototype.getPhysicsPoint2 = function() {
				return this.p2
			}, f.prototype._$qr = function() {
				return this._$Db
			}, f.prototype._$pr = function(t) {
				this._$Db = t
			}, f.prototype._$5r = function() {
				return this._$M2
			}, f.prototype._$Cs = function() {
				return this._$9b
			}, f.prototype._$Yb = function() {
				return -180 * Math.atan2(this.p1.x - this.p2.x, -(this.p1.y - this.p2.y)) / Math.PI
			}, f.prototype.addSrcParam = function(t, i, e, r) {
				var o = new g(t, i, e, r);
				this._$lL.push(o)
			}, f.prototype.addTargetParam = function(t, i, e, r) {
				var o = new T(t, i, e, r);
				this._$qP.push(o)
			}, f.prototype.update = function(t, i) {
				if (0 == this._$iP) return this._$iP = this._$iT = i, void(this._$Fo = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y)));
				var e = (i - this._$iT) / 1e3;
				if (0 != e) {
					for (var r = this._$lL.length - 1; r >= 0; --r) {
						this._$lL[r]._$oP(t, this)
					}
					this._$oo(t, e), this._$M2 = this._$Yb(), this._$9b = (this._$M2 - this._$ks) / e, this._$ks = this._$M2
				}
				for (var r = this._$qP.length - 1; r >= 0; --r) {
					this._$qP[r]._$YS(t, this)
				}
				this._$iT = i
			}, f.prototype._$oo = function(t, i) {
				i < .033 && (i = .033);
				var e = 1 / i;
				this.p1.vx = (this.p1.x - this.p1._$s0) * e, this.p1.vy = (this.p1.y - this.p1._$70) * e, this.p1.ax = (this.p1.vx - this.p1._$7L) * e, this.p1.ay = (this.p1.vy - this.p1._$HL) * e, this.p1.fx = this.p1.ax * this.p1._$p, this.p1.fy = this.p1.ay * this.p1._$p, this.p1._$xT();
				var r, o, n = -Math.atan2(this.p1.y - this.p2.y, this.p1.x - this.p2.x),
					s = Math.cos(n),
					_ = Math.sin(n),
					a = 9.8 * this.p2._$p,
					h = this._$Db * Lt._$bS,
					l = a * Math.cos(n - h);
				r = l * _, o = l * s;
				var $ = -this.p1.fx * _ * _,
					u = -this.p1.fy * _ * s,
					p = -this.p2.vx * this._$L2,
					f = -this.p2.vy * this._$L2;
				this.p2.fx = r + $ + p, this.p2.fy = o + u + f, this.p2.ax = this.p2.fx / this.p2._$p, this.p2.ay = this.p2.fy / this.p2._$p, this.p2.vx += this.p2.ax * i, this.p2.vy += this.p2.ay * i, this.p2.x += this.p2.vx * i, this.p2.y += this.p2.vy * i;
				var c = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
				this.p2.x = this.p1.x + this._$Fo * (this.p2.x - this.p1.x) / c, this.p2.y = this.p1.y + this._$Fo * (this.p2.y - this.p1.y) / c, this.p2.vx = (this.p2.x - this.p2._$s0) * e, this.p2.vy = (this.p2.y - this.p2._$70) * e, this.p2._$xT()
			}, c.prototype._$xT = function() {
				this._$s0 = this.x, this._$70 = this.y, this._$7L = this.vx, this._$HL = this.vy
			}, d.prototype._$oP = function(t, i) {}, g.prototype = new d, g.prototype._$oP = function(t, i) {
				var e = this.scale * t.getParamFloat(this._$wL),
					r = i.getPhysicsPoint1();
				switch (this._$tL) {
				default:
				case f.Src.SRC_TO_X:
					r.x = r.x + (e - r.x) * this._$V0;
					break;
				case f.Src.SRC_TO_Y:
					r.y = r.y + (e - r.y) * this._$V0;
					break;
				case f.Src.SRC_TO_G_ANGLE:
					var o = i._$qr();
					o += (e - o) * this._$V0, i._$pr(o)
				}
			}, y.prototype._$YS = function(t, i) {}, T.prototype = new y, T.prototype._$YS = function(t, i) {
				switch (this._$YP) {
				default:
				case f.Target.TARGET_FROM_ANGLE:
					t.setParamFloat(this._$wL, this.scale * i._$5r(), this._$V0);
					break;
				case f.Target.TARGET_FROM_ANGLE_V:
					t.setParamFloat(this._$wL, this.scale * i._$Cs(), this._$V0)
				}
			}, f.Src = function() {}, f.Src.SRC_TO_X = "SRC_TO_X", f.Src.SRC_TO_Y = "SRC_TO_Y", f.Src.SRC_TO_G_ANGLE = "SRC_TO_G_ANGLE", f.Target = function() {}, f.Target.TARGET_FROM_ANGLE = "TARGET_FROM_ANGLE", f.Target.TARGET_FROM_ANGLE_V = "TARGET_FROM_ANGLE_V", P.prototype.init = function(t) {
				this._$fL = t._$fL, this._$gL = t._$gL, this._$B0 = t._$B0, this._$z0 = t._$z0, this._$qT = t._$qT, this.reflectX = t.reflectX, this.reflectY = t.reflectY
			}, P.prototype._$F0 = function(t) {
				this._$fL = t._$_T(), this._$gL = t._$_T(), this._$B0 = t._$_T(), this._$z0 = t._$_T(), this._$qT = t._$_T(), t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this.reflectX = t._$po(), this.reflectY = t._$po())
			}, P.prototype._$e = function() {};
			var It = function() {};
			It._$ni = function(t, i, e, r, o, n, s, _, a) {
				var h = s * n - _ * o;
				if (0 == h) return null;
				var l, $ = ((t - e) * n - (i - r) * o) / h;
				return l = 0 != o ? (t - e - $ * s) / o : (i - r - $ * _) / n, isNaN(l) && (l = (t - e - $ * s) / o, isNaN(l) && (l = (i - r - $ * _) / n), isNaN(l) && (console.log("a is NaN @UtVector#_$ni() "), console.log("v1x : " + o), console.log("v1x != 0 ? " + (0 != o)))), null == a ? new Array(l, $) : (a[0] = l, a[1] = $, a)
			}, S.prototype._$8P = function() {
				return this.x + .5 * this.width
			}, S.prototype._$6P = function() {
				return this.y + .5 * this.height
			}, S.prototype._$EL = function() {
				return this.x + this.width
			}, S.prototype._$5T = function() {
				return this.y + this.height
			}, S.prototype._$jL = function(t, i, e, r) {
				this.x = t, this.y = i, this.width = e, this.height = r
			}, S.prototype._$jL = function(t) {
				this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
			}, S.prototype.contains = function(t, i) {
				return this.x <= this.x && this.y <= this.y && this.x <= this.x + this.width && this.y <= this.y + this.height
			}, S.prototype.expand = function(t, i) {
				this.x -= t, this.y -= i, this.width += 2 * t, this.height += 2 * i
			}, v._$Z2 = function(t, i, e, r) {
				var o = i._$Q2(t, e),
					n = t._$vs(),
					s = t._$Tr();
				if (i._$zr(n, s, o), o <= 0) return r[n[0]];
				if (1 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						h = s[0];
					return _ + (a - _) * h | 0
				}
				if (2 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						l = r[n[2]],
						$ = r[n[3]],
						h = s[0],
						u = s[1],
						p = _ + (a - _) * h | 0,
						f = l + ($ - l) * h | 0;
					return p + (f - p) * u | 0
				}
				if (3 == o) {
					var c = r[n[0]],
						d = r[n[1]],
						g = r[n[2]],
						y = r[n[3]],
						m = r[n[4]],
						T = r[n[5]],
						P = r[n[6]],
						S = r[n[7]],
						h = s[0],
						u = s[1],
						v = s[2],
						_ = c + (d - c) * h | 0,
						a = g + (y - g) * h | 0,
						l = m + (T - m) * h | 0,
						$ = P + (S - P) * h | 0,
						p = _ + (a - _) * u | 0,
						f = l + ($ - l) * u | 0;
					return p + (f - p) * v | 0
				}
				if (4 == o) {
					var L = r[n[0]],
						M = r[n[1]],
						E = r[n[2]],
						A = r[n[3]],
						I = r[n[4]],
						w = r[n[5]],
						x = r[n[6]],
						O = r[n[7]],
						D = r[n[8]],
						R = r[n[9]],
						b = r[n[10]],
						F = r[n[11]],
						C = r[n[12]],
						N = r[n[13]],
						B = r[n[14]],
						U = r[n[15]],
						h = s[0],
						u = s[1],
						v = s[2],
						G = s[3],
						c = L + (M - L) * h | 0,
						d = E + (A - E) * h | 0,
						g = I + (w - I) * h | 0,
						y = x + (O - x) * h | 0,
						m = D + (R - D) * h | 0,
						T = b + (F - b) * h | 0,
						P = C + (N - C) * h | 0,
						S = B + (U - B) * h | 0,
						_ = c + (d - c) * u | 0,
						a = g + (y - g) * u | 0,
						l = m + (T - m) * u | 0,
						$ = P + (S - P) * u | 0,
						p = _ + (a - _) * v | 0,
						f = l + ($ - l) * v | 0;
					return p + (f - p) * G | 0
				}
				for (var Y = 1 << o, k = new Float32Array(Y), V = 0; V < Y; V++) {
					for (var X = V, z = 1, H = 0; H < o; H++) z *= X % 2 == 0 ? 1 - s[H] : s[H], X /= 2;
					k[V] = z
				}
				for (var W = new Float32Array(Y), j = 0; j < Y; j++) W[j] = r[n[j]];
				for (var q = 0, j = 0; j < Y; j++) q += k[j] * W[j];
				return q + .5 | 0
			}, v._$br = function(t, i, e, r) {
				var o = i._$Q2(t, e),
					n = t._$vs(),
					s = t._$Tr();
				if (i._$zr(n, s, o), o <= 0) return r[n[0]];
				if (1 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						h = s[0];
					return _ + (a - _) * h
				}
				if (2 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						l = r[n[2]],
						$ = r[n[3]],
						h = s[0],
						u = s[1];
					return (1 - u) * (_ + (a - _) * h) + u * (l + ($ - l) * h)
				}
				if (3 == o) {
					var p = r[n[0]],
						f = r[n[1]],
						c = r[n[2]],
						d = r[n[3]],
						g = r[n[4]],
						y = r[n[5]],
						m = r[n[6]],
						T = r[n[7]],
						h = s[0],
						u = s[1],
						P = s[2];
					return (1 - P) * ((1 - u) * (p + (f - p) * h) + u * (c + (d - c) * h)) + P * ((1 - u) * (g + (y - g) * h) + u * (m + (T - m) * h))
				}
				if (4 == o) {
					var S = r[n[0]],
						v = r[n[1]],
						L = r[n[2]],
						M = r[n[3]],
						E = r[n[4]],
						A = r[n[5]],
						I = r[n[6]],
						w = r[n[7]],
						x = r[n[8]],
						O = r[n[9]],
						D = r[n[10]],
						R = r[n[11]],
						b = r[n[12]],
						F = r[n[13]],
						C = r[n[14]],
						N = r[n[15]],
						h = s[0],
						u = s[1],
						P = s[2],
						B = s[3];
					return (1 - B) * ((1 - P) * ((1 - u) * (S + (v - S) * h) + u * (L + (M - L) * h)) + P * ((1 - u) * (E + (A - E) * h) + u * (I + (w - I) * h))) + B * ((1 - P) * ((1 - u) * (x + (O - x) * h) + u * (D + (R - D) * h)) + P * ((1 - u) * (b + (F - b) * h) + u * (C + (N - C) * h)))
				}
				for (var U = 1 << o, G = new Float32Array(U), Y = 0; Y < U; Y++) {
					for (var k = Y, V = 1, X = 0; X < o; X++) V *= k % 2 == 0 ? 1 - s[X] : s[X], k /= 2;
					G[Y] = V
				}
				for (var z = new Float32Array(U), H = 0; H < U; H++) z[H] = r[n[H]];
				for (var W = 0, H = 0; H < U; H++) W += G[H] * z[H];
				return W
			}, v._$Vr = function(t, i, e, r, o, n, s, _) {
				var a = i._$Q2(t, e),
					h = t._$vs(),
					l = t._$Tr();
				i._$zr(h, l, a);
				var $ = 2 * r,
					u = s;
				if (a <= 0) {
					var p = h[0],
						f = o[p];
					if (2 == _ && 0 == s) w._$jT(f, 0, n, 0, $);
					else for (var c = 0; c < $;) n[u] = f[c++], n[u + 1] = f[c++], u += _
				} else if (1 == a) for (var f = o[h[0]], d = o[h[1]], g = l[0], y = 1 - g, c = 0; c < $;) n[u] = f[c] * y + d[c] * g, ++c, n[u + 1] = f[c] * y + d[c] * g, ++c, u += _;
				else if (2 == a) for (var f = o[h[0]], d = o[h[1]], m = o[h[2]], T = o[h[3]], g = l[0], P = l[1], y = 1 - g, S = 1 - P, v = S * y, L = S * g, M = P * y, E = P * g, c = 0; c < $;) n[u] = v * f[c] + L * d[c] + M * m[c] + E * T[c], ++c, n[u + 1] = v * f[c] + L * d[c] + M * m[c] + E * T[c], ++c, u += _;
				else if (3 == a) for (var A = o[h[0]], I = o[h[1]], x = o[h[2]], O = o[h[3]], D = o[h[4]], R = o[h[5]], b = o[h[6]], F = o[h[7]], g = l[0], P = l[1], C = l[2], y = 1 - g, S = 1 - P, N = 1 - C, B = N * S * y, U = N * S * g, G = N * P * y, Y = N * P * g, k = C * S * y, V = C * S * g, X = C * P * y, z = C * P * g, c = 0; c < $;) n[u] = B * A[c] + U * I[c] + G * x[c] + Y * O[c] + k * D[c] + V * R[c] + X * b[c] + z * F[c], ++c, n[u + 1] = B * A[c] + U * I[c] + G * x[c] + Y * O[c] + k * D[c] + V * R[c] + X * b[c] + z * F[c], ++c, u += _;
				else if (4 == a) for (var H = o[h[0]], W = o[h[1]], j = o[h[2]], q = o[h[3]], J = o[h[4]], Q = o[h[5]], Z = o[h[6]], K = o[h[7]], tt = o[h[8]], it = o[h[9]], et = o[h[10]], rt = o[h[11]], ot = o[h[12]], nt = o[h[13]], st = o[h[14]], _t = o[h[15]], g = l[0], P = l[1], C = l[2], at = l[3], y = 1 - g, S = 1 - P, N = 1 - C, ht = 1 - at, lt = ht * N * S * y, $t = ht * N * S * g, ut = ht * N * P * y, pt = ht * N * P * g, ft = ht * C * S * y, ct = ht * C * S * g, dt = ht * C * P * y, gt = ht * C * P * g, yt = at * N * S * y, mt = at * N * S * g, Tt = at * N * P * y, Pt = at * N * P * g, St = at * C * S * y, vt = at * C * S * g, Lt = at * C * P * y, Mt = at * C * P * g, c = 0; c < $;) n[u] = lt * H[c] + $t * W[c] + ut * j[c] + pt * q[c] + ft * J[c] + ct * Q[c] + dt * Z[c] + gt * K[c] + yt * tt[c] + mt * it[c] + Tt * et[c] + Pt * rt[c] + St * ot[c] + vt * nt[c] + Lt * st[c] + Mt * _t[c], ++c, n[u + 1] = lt * H[c] + $t * W[c] + ut * j[c] + pt * q[c] + ft * J[c] + ct * Q[c] + dt * Z[c] + gt * K[c] + yt * tt[c] + mt * it[c] + Tt * et[c] + Pt * rt[c] + St * ot[c] + vt * nt[c] + Lt * st[c] + Mt * _t[c], ++c, u += _;
				else {
					for (var Et = 1 << a, At = new Float32Array(Et), It = 0; It < Et; It++) {
						for (var wt = It, xt = 1, Ot = 0; Ot < a; Ot++) xt *= wt % 2 == 0 ? 1 - l[Ot] : l[Ot], wt /= 2;
						At[It] = xt
					}
					for (var Dt = new Float32Array(Et), Rt = 0; Rt < Et; Rt++) Dt[Rt] = o[h[Rt]];
					for (var c = 0; c < $;) {
						for (var bt = 0, Ft = 0, Ct = c + 1, Rt = 0; Rt < Et; Rt++) bt += At[Rt] * Dt[Rt][c], Ft += At[Rt] * Dt[Rt][Ct];
						c += 2, n[u] = bt, n[u + 1] = Ft, u += _
					}
				}
			}, L.prototype._$HT = function(t, i) {
				this.x = t, this.y = i
			}, L.prototype._$HT = function(t) {
				this.x = t.x, this.y = t.y
			}, M._$ur = -2, M._$ES = 500, M._$wb = 2, M._$8S = 3, M._$52 = M._$ES, M._$R2 = M._$ES, M._$or = function() {
				return M._$52
			}, M._$Pr = function() {
				return M._$R2
			}, M.prototype.convertClipIDForV2_11 = function(t) {
				var i = [];
				return null == t ? null : 0 == t.length ? null : /,/.test(t) ? i = t.id.split(",") : (i.push(t.id), i)
			}, M.prototype._$F0 = function(t) {
				this._$gP = t._$nP(), this._$dr = t._$nP(), this._$GS = t._$nP(), this._$qb = t._$6L(), this._$Lb = t._$cS(), this._$mS = t._$Tb(), t.getFormatVersion() >= G._$T7 ? (this.clipID = t._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = [], this._$MS(this._$Lb)
			}, M.prototype.getClipIDList = function() {
				return this.clipIDList
			}, M.prototype.init = function(t) {}, M.prototype._$Nr = function(t, i) {
				if (i._$IS[0] = !1, i._$Us = v._$Z2(t, this._$GS, i._$IS, this._$Lb), at._$Zs);
				else if (i._$IS[0]) return;
				i._$7s = v._$br(t, this._$GS, i._$IS, this._$mS)
			}, M.prototype._$2b = function(t, i) {}, M.prototype.getDrawDataID = function() {
				return this._$gP
			}, M.prototype._$j2 = function(t) {
				this._$gP = t
			}, M.prototype.getOpacity = function(t, i) {
				return i._$7s
			}, M.prototype._$zS = function(t, i) {
				return i._$Us
			}, M.prototype._$MS = function(t) {
				for (var i = t.length - 1; i >= 0; --i) {
					var e = t[i];
					e < M._$52 ? M._$52 = e : e > M._$R2 && (M._$R2 = e)
				}
			}, M.prototype.getTargetBaseDataID = function() {
				return this._$dr
			}, M.prototype._$gs = function(t) {
				this._$dr = t
			}, M.prototype._$32 = function() {
				return null != this._$dr && this._$dr != yt._$2o()
			}, M.prototype.preDraw = function(t, i, e) {}, M.prototype.draw = function(t, i, e) {}, M.prototype.getType = function() {}, M.prototype._$B2 = function(t, i, e) {}, E._$ps = 32, E.CLIPPING_PROCESS_NONE = 0, E.CLIPPING_PROCESS_OVERWRITE_ALPHA = 1, E.CLIPPING_PROCESS_MULTIPLY_ALPHA = 2, E.CLIPPING_PROCESS_DRAW = 3, E.CLIPPING_PROCESS_CLEAR_ALPHA = 4, E.prototype.setChannelFlagAsColor = function(t, i) {
				this.CHANNEL_COLORS[t] = i
			}, E.prototype.getChannelFlagAsColor = function(t) {
				return this.CHANNEL_COLORS[t]
			}, E.prototype._$ZT = function() {}, E.prototype._$Uo = function(t, i, e, r, o, n, s) {}, E.prototype._$Rs = function() {
				return -1
			}, E.prototype._$Ds = function(t) {}, E.prototype.setBaseColor = function(t, i, e, r) {
				t < 0 ? t = 0 : t > 1 && (t = 1), i < 0 ? i = 0 : i > 1 && (i = 1), e < 0 ? e = 0 : e > 1 && (e = 1), r < 0 ? r = 0 : r > 1 && (r = 1), this._$lT = t, this._$C0 = i, this._$tT = e, this._$WL = r
			}, E.prototype._$WP = function(t) {
				this.culling = t
			}, E.prototype.setMatrix = function(t) {
				for (var i = 0; i < 16; i++) this.matrix4x4[i] = t[i]
			}, E.prototype._$IT = function() {
				return this.matrix4x4
			}, E.prototype.setPremultipliedAlpha = function(t) {
				this.premultipliedAlpha = t
			}, E.prototype.isPremultipliedAlpha = function() {
				return this.premultipliedAlpha
			}, E.prototype.setAnisotropy = function(t) {
				this.anisotropy = t
			}, E.prototype.getAnisotropy = function() {
				return this.anisotropy
			}, E.prototype.getClippingProcess = function() {
				return this.clippingProcess
			}, E.prototype.setClippingProcess = function(t) {
				this.clippingProcess = t
			}, E.prototype.setClipBufPre_clipContextForMask = function(t) {
				this.clipBufPre_clipContextMask = t
			}, E.prototype.getClipBufPre_clipContextMask = function() {
				return this.clipBufPre_clipContextMask
			}, E.prototype.setClipBufPre_clipContextForDraw = function(t) {
				this.clipBufPre_clipContextDraw = t
			}, E.prototype.getClipBufPre_clipContextDraw = function() {
				return this.clipBufPre_clipContextDraw
			}, I._$ur = -2, I._$c2 = 1, I._$_b = 2, I.prototype._$F0 = function(t) {
				this._$kP = t._$nP(), this._$dr = t._$nP()
			}, I.prototype.readV2_opacity = function(t) {
				t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this._$mS = t._$Tb())
			}, I.prototype.init = function(t) {}, I.prototype._$Nr = function(t, i) {}, I.prototype.interpolateOpacity = function(t, i, e, r) {
				null == this._$mS ? e.setInterpolatedOpacity(1) : e.setInterpolatedOpacity(v._$br(t, i, r, this._$mS))
			}, I.prototype._$2b = function(t, i) {}, I.prototype._$nb = function(t, i, e, r, o, n, s) {}, I.prototype.getType = function() {}, I.prototype._$gs = function(t) {
				this._$dr = t
			}, I.prototype._$a2 = function(t) {
				this._$kP = t
			}, I.prototype.getTargetBaseDataID = function() {
				return this._$dr
			}, I.prototype.getBaseDataID = function() {
				return this._$kP
			}, I.prototype._$32 = function() {
				return null != this._$dr && this._$dr != yt._$2o()
			}, w._$W2 = 0, w._$CS = w._$W2, w._$Mo = function() {
				return !0
			}, w._$XP = function(t) {
				try {
					for (var i = getTimeMSec(); getTimeMSec() - i < t;);
				} catch (t) {
					t._$Rb()
				}
			}, w.getUserTimeMSec = function() {
				return w._$CS == w._$W2 ? w.getSystemTimeMSec() : w._$CS
			}, w.setUserTimeMSec = function(t) {
				w._$CS = t
			}, w.updateUserTimeMSec = function() {
				return w._$CS = w.getSystemTimeMSec()
			}, w.getTimeMSec = function() {
				return (new Date).getTime()
			}, w.getSystemTimeMSec = function() {
				return (new Date).getTime()
			}, w._$Q = function(t) {}, w._$jT = function(t, i, e, r, o) {
				for (var n = 0; n < o; n++) e[r + n] = t[i + n]
			}, x._$ds = -2, x.prototype._$F0 = function(t) {
				this._$wL = t._$nP(), this._$VP = t._$6L(), this._$GP = t._$nP()
			}, x.prototype.getParamIndex = function(t) {
				return this._$2r != t && (this._$8o = x._$ds), this._$8o
			}, x.prototype._$Pb = function(t, i) {
				this._$8o = t, this._$2r = i
			}, x.prototype.getParamID = function() {
				return this._$wL
			}, x.prototype._$yP = function(t) {
				this._$wL = t
			}, x.prototype._$N2 = function() {
				return this._$VP
			}, x.prototype._$d2 = function() {
				return this._$GP
			}, x.prototype._$t2 = function(t, i) {
				this._$VP = t, this._$GP = i
			}, x.prototype._$Lr = function() {
				return this._$O2
			}, x.prototype._$wr = function(t) {
				this._$O2 = t
			}, x.prototype._$SL = function() {
				return this._$ri
			}, x.prototype._$AL = function(t) {
				this._$ri = t
			}, O.startsWith = function(t, i, e) {
				var r = i + e.length;
				if (r >= t.length) return !1;
				for (var o = i; o < r; o++) if (O.getChar(t, o) != e.charAt(o - i)) return !1;
				return !0
			}, O.getChar = function(t, i) {
				return String.fromCharCode(t.getUint8(i))
			}, O.createString = function(t, i, e) {
				for (var r = new ArrayBuffer(2 * e), o = new Uint16Array(r), n = 0; n < e; n++) o[n] = t.getUint8(i + n);
				return String.fromCharCode.apply(null, o)
			}, O._$LS = function(t, i, e, r) {
				t instanceof ArrayBuffer && (t = new DataView(t));
				var o = e,
					n = !1,
					s = !1,
					_ = 0,
					a = O.getChar(t, o);
				"-" == a && (n = !0, o++);
				for (var h = !1; o < i; o++) {
					switch (a = O.getChar(t, o)) {
					case "0":
						_ *= 10;
						break;
					case "1":
						_ = 10 * _ + 1;
						break;
					case "2":
						_ = 10 * _ + 2;
						break;
					case "3":
						_ = 10 * _ + 3;
						break;
					case "4":
						_ = 10 * _ + 4;
						break;
					case "5":
						_ = 10 * _ + 5;
						break;
					case "6":
						_ = 10 * _ + 6;
						break;
					case "7":
						_ = 10 * _ + 7;
						break;
					case "8":
						_ = 10 * _ + 8;
						break;
					case "9":
						_ = 10 * _ + 9;
						break;
					case ".":
						s = !0, o++, h = !0;
						break;
					default:
						h = !0
					}
					if (h) break
				}
				if (s) for (var l = .1, $ = !1; o < i; o++) {
					switch (a = O.getChar(t, o)) {
					case "0":
						break;
					case "1":
						_ += 1 * l;
						break;
					case "2":
						_ += 2 * l;
						break;
					case "3":
						_ += 3 * l;
						break;
					case "4":
						_ += 4 * l;
						break;
					case "5":
						_ += 5 * l;
						break;
					case "6":
						_ += 6 * l;
						break;
					case "7":
						_ += 7 * l;
						break;
					case "8":
						_ += 8 * l;
						break;
					case "9":
						_ += 9 * l;
						break;
					default:
						$ = !0
					}
					if (l *= .1, $) break
				}
				return n && (_ = -_), r[0] = o, _
			}, D.prototype._$zP = function() {
				this._$Ob = new Array
			}, D.prototype._$F0 = function(t) {
				this._$Ob = t._$nP()
			}, D.prototype._$Ur = function(t) {
				if (t._$WS()) return !0;
				for (var i = t._$v2(), e = this._$Ob.length - 1; e >= 0; --e) {
					var r = this._$Ob[e].getParamIndex(i);
					if (r == x._$ds && (r = t.getParamIndex(this._$Ob[e].getParamID())), t._$Xb(r)) return !0
				}
				return !1
			}, D.prototype._$Q2 = function(t, i) {
				for (var e, r, o = this._$Ob.length, n = t._$v2(), s = 0, _ = 0; _ < o; _++) {
					var a = this._$Ob[_];
					if (e = a.getParamIndex(n), e == x._$ds && (e = t.getParamIndex(a.getParamID()), a._$Pb(e, n)), e < 0) throw new Exception("err 23242 : " + a.getParamID());
					var h = e < 0 ? 0 : t.getParamFloat(e);
					r = a._$N2();
					var l, $, u = a._$d2(),
						p = -1,
						f = 0;
					if (r < 1);
					else if (1 == r) l = u[0], l - U._$J < h && h < l + U._$J ? (p = 0, f = 0) : (p = 0, i[0] = !0);
					else if (l = u[0], h < l - U._$J) p = 0, i[0] = !0;
					else if (h < l + U._$J) p = 0;
					else {
						for (var c = !1, d = 1; d < r; ++d) {
							if ($ = u[d], h < $ + U._$J) {
								$ - U._$J < h ? p = d : (p = d - 1, f = (h - l) / ($ - l), s++), c = !0;
								break
							}
							l = $
						}
						c || (p = r - 1, f = 0, i[0] = !0)
					}
					a._$wr(p), a._$AL(f)
				}
				return s
			}, D.prototype._$zr = function(t, i, e) {
				var r = 1 << e;
				r + 1 > U._$Qb && console.log("err 23245\n");
				for (var o = this._$Ob.length, n = 1, s = 1, _ = 0, a = 0; a < r; ++a) t[a] = 0;
				for (var h = 0; h < o; ++h) {
					var l = this._$Ob[h];
					if (0 == l._$SL()) {
						var $ = l._$Lr() * n;
						if ($ < 0 && at._$3T) throw new Exception("err 23246");
						for (var a = 0; a < r; ++a) t[a] += $
					} else {
						for (var $ = n * l._$Lr(), u = n * (l._$Lr() + 1), a = 0; a < r; ++a) t[a] += (a / s | 0) % 2 == 0 ? $ : u;
						i[_++] = l._$SL(), s *= 2
					}
					n *= l._$N2()
				}
				t[r] = 65535, i[_] = -1
			}, D.prototype._$h2 = function(t, i, e) {
				for (var r = new Float32Array(i), o = 0; o < i; ++o) r[o] = e[o];
				var n = new x;
				n._$yP(t), n._$t2(i, r), this._$Ob.push(n)
			}, D.prototype._$J2 = function(t) {
				for (var i = t, e = this._$Ob.length, r = 0; r < e; ++r) {
					var o = this._$Ob[r],
						n = o._$N2(),
						s = i % o._$N2(),
						_ = o._$d2()[s];
					console.log("%s[%d]=%7.2f / ", o.getParamID(), s, _), i /= n
				}
				console.log("\n")
			}, D.prototype.getParamCount = function() {
				return this._$Ob.length
			}, D.prototype._$zs = function() {
				return this._$Ob
			}, R.prototype.identity = function() {
				for (var t = 0; t < 16; t++) this.m[t] = t % 5 == 0 ? 1 : 0
			}, R.prototype.getArray = function() {
				return this.m
			}, R.prototype.getCopyMatrix = function() {
				return new Float32Array(this.m)
			}, R.prototype.setMatrix = function(t) {
				if (null != t && 16 == t.length) for (var i = 0; i < 16; i++) this.m[i] = t[i]
			}, R.prototype.mult = function(t, i, e) {
				return null == i ? null : (this == i ? this.mult_safe(this.m, t.m, i.m, e) : this.mult_fast(this.m, t.m, i.m, e), i)
			}, R.prototype.mult_safe = function(t, i, e, r) {
				if (t == e) {
					var o = new Array(16);
					this.mult_fast(t, i, o, r);
					for (var n = 15; n >= 0; --n) e[n] = o[n]
				} else this.mult_fast(t, i, e, r)
			}, R.prototype.mult_fast = function(t, i, e, r) {
				r ? (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2], e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6], e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10], e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12], e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2], e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6], e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10], e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13], e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2], e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6], e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10], e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14], e[3] = e[7] = e[11] = 0, e[15] = 1) : (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2] + t[12] * i[3], e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6] + t[12] * i[7], e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10] + t[12] * i[11], e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12] * i[15], e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2] + t[13] * i[3], e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6] + t[13] * i[7], e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10] + t[13] * i[11], e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13] * i[15], e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2] + t[14] * i[3], e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6] + t[14] * i[7], e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10] + t[14] * i[11], e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14] * i[15], e[3] = t[3] * i[0] + t[7] * i[1] + t[11] * i[2] + t[15] * i[3], e[7] = t[3] * i[4] + t[7] * i[5] + t[11] * i[6] + t[15] * i[7], e[11] = t[3] * i[8] + t[7] * i[9] + t[11] * i[10] + t[15] * i[11], e[15] = t[3] * i[12] + t[7] * i[13] + t[11] * i[14] + t[15] * i[15])
			}, R.prototype.translate = function(t, i, e) {
				this.m[12] = this.m[0] * t + this.m[4] * i + this.m[8] * e + this.m[12], this.m[13] = this.m[1] * t + this.m[5] * i + this.m[9] * e + this.m[13], this.m[14] = this.m[2] * t + this.m[6] * i + this.m[10] * e + this.m[14], this.m[15] = this.m[3] * t + this.m[7] * i + this.m[11] * e + this.m[15]
			}, R.prototype.scale = function(t, i, e) {
				this.m[0] *= t, this.m[4] *= i, this.m[8] *= e, this.m[1] *= t, this.m[5] *= i, this.m[9] *= e, this.m[2] *= t, this.m[6] *= i, this.m[10] *= e, this.m[3] *= t, this.m[7] *= i, this.m[11] *= e
			}, R.prototype.rotateX = function(t) {
				var i = Lt.fcos(t),
					e = Lt._$9(t),
					r = this.m[4];
				this.m[4] = r * i + this.m[8] * e, this.m[8] = r * -e + this.m[8] * i, r = this.m[5], this.m[5] = r * i + this.m[9] * e, this.m[9] = r * -e + this.m[9] * i, r = this.m[6], this.m[6] = r * i + this.m[10] * e, this.m[10] = r * -e + this.m[10] * i, r = this.m[7], this.m[7] = r * i + this.m[11] * e, this.m[11] = r * -e + this.m[11] * i
			}, R.prototype.rotateY = function(t) {
				var i = Lt.fcos(t),
					e = Lt._$9(t),
					r = this.m[0];
				this.m[0] = r * i + this.m[8] * -e, this.m[8] = r * e + this.m[8] * i, r = this.m[1], this.m[1] = r * i + this.m[9] * -e, this.m[9] = r * e + this.m[9] * i, r = m[2], this.m[2] = r * i + this.m[10] * -e, this.m[10] = r * e + this.m[10] * i, r = m[3], this.m[3] = r * i + this.m[11] * -e, this.m[11] = r * e + this.m[11] * i
			}, R.prototype.rotateZ = function(t) {
				var i = Lt.fcos(t),
					e = Lt._$9(t),
					r = this.m[0];
				this.m[0] = r * i + this.m[4] * e, this.m[4] = r * -e + this.m[4] * i, r = this.m[1], this.m[1] = r * i + this.m[5] * e, this.m[5] = r * -e + this.m[5] * i, r = this.m[2], this.m[2] = r * i + this.m[6] * e, this.m[6] = r * -e + this.m[6] * i, r = this.m[3], this.m[3] = r * i + this.m[7] * e, this.m[7] = r * -e + this.m[7] * i
			}, b.prototype = new et, b._$tP = new Object, b._$27 = function() {
				b._$tP.clear()
			}, b.getID = function(t) {
				var i = b._$tP[t];
				return null == i && (i = new b(t), b._$tP[t] = i), i
			}, b.prototype._$3s = function() {
				return new b
			}, F._$kS = -1, F._$pS = 0, F._$hb = 1, F.STATE_IDENTITY = 0, F._$gb = 1, F._$fo = 2, F._$go = 4, F.prototype.transform = function(t, i, e) {
				var r, o, n, s, _, a, h = 0,
					l = 0;
				switch (this._$hi) {
				default:
					return;
				case F._$go | F._$fo | F._$gb:
					for (r = this._$7, o = this._$H, n = this._$k, s = this._$f, _ = this._$g, a = this._$w; --e >= 0;) {
						var $ = t[h++],
							u = t[h++];
						i[l++] = r * $ + o * u + n, i[l++] = s * $ + _ * u + a
					}
					return;
				case F._$go | F._$fo:
					for (r = this._$7, o = this._$H, s = this._$f, _ = this._$g; --e >= 0;) {
						var $ = t[h++],
							u = t[h++];
						i[l++] = r * $ + o * u, i[l++] = s * $ + _ * u
					}
					return;
				case F._$go | F._$gb:
					for (o = this._$H, n = this._$k, s = this._$f, a = this._$w; --e >= 0;) {
						var $ = t[h++];
						i[l++] = o * t[h++] + n, i[l++] = s * $ + a
					}
					return;
				case F._$go:
					for (o = this._$H, s = this._$f; --e >= 0;) {
						var $ = t[h++];
						i[l++] = o * t[h++], i[l++] = s * $
					}
					return;
				case F._$fo | F._$gb:
					for (r = this._$7, n = this._$k, _ = this._$g, a = this._$w; --e >= 0;) i[l++] = r * t[h++] + n, i[l++] = _ * t[h++] + a;
					return;
				case F._$fo:
					for (r = this._$7, _ = this._$g; --e >= 0;) i[l++] = r * t[h++], i[l++] = _ * t[h++];
					return;
				case F._$gb:
					for (n = this._$k, a = this._$w; --e >= 0;) i[l++] = t[h++] + n, i[l++] = t[h++] + a;
					return;
				case F.STATE_IDENTITY:
					return void(t == i && h == l || w._$jT(t, h, i, l, 2 * e))
				}
			}, F.prototype.update = function() {
				0 == this._$H && 0 == this._$f ? 1 == this._$7 && 1 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = F.STATE_IDENTITY, this._$Z = F._$pS) : (this._$hi = F._$gb, this._$Z = F._$hb) : 0 == this._$k && 0 == this._$w ? (this._$hi = F._$fo, this._$Z = F._$kS) : (this._$hi = F._$fo | F._$gb, this._$Z = F._$kS) : 0 == this._$7 && 0 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = F._$go, this._$Z = F._$kS) : (this._$hi = F._$go | F._$gb, this._$Z = F._$kS) : 0 == this._$k && 0 == this._$w ? (this._$hi = F._$go | F._$fo, this._$Z = F._$kS) : (this._$hi = F._$go | F._$fo | F._$gb, this._$Z = F._$kS)
			}, F.prototype._$RT = function(t) {
				this._$IT(t);
				var i = t[0],
					e = t[2],
					r = t[1],
					o = t[3],
					n = Math.sqrt(i * i + r * r),
					s = i * o - e * r;
				0 == n ? at._$so && console.log("affine._$RT() / rt==0") : (t[0] = n, t[1] = s / n, t[2] = (r * o + i * e) / s, t[3] = Math.atan2(r, i))
			}, F.prototype._$ho = function(t, i, e, r) {
				var o = new Float32Array(6),
					n = new Float32Array(6);
				t._$RT(o), i._$RT(n);
				var s = new Float32Array(6);
				s[0] = o[0] + (n[0] - o[0]) * e, s[1] = o[1] + (n[1] - o[1]) * e, s[2] = o[2] + (n[2] - o[2]) * e, s[3] = o[3] + (n[3] - o[3]) * e, s[4] = o[4] + (n[4] - o[4]) * e, s[5] = o[5] + (n[5] - o[5]) * e, r._$CT(s)
			}, F.prototype._$CT = function(t) {
				var i = Math.cos(t[3]),
					e = Math.sin(t[3]);
				this._$7 = t[0] * i, this._$f = t[0] * e, this._$H = t[1] * (t[2] * i - e), this._$g = t[1] * (t[2] * e + i), this._$k = t[4], this._$w = t[5], this.update()
			}, F.prototype._$IT = function(t) {
				t[0] = this._$7, t[1] = this._$f, t[2] = this._$H, t[3] = this._$g, t[4] = this._$k, t[5] = this._$w
			}, C.prototype = new s, C._$cs = "VISIBLE:", C._$ar = "LAYOUT:", C._$Co = 0, C._$D2 = [], C._$1T = 1, C.loadMotion = function(t) {
				var i = new C,
					e = [0],
					r = t.length;
				i._$yT = 0;
				for (var o = 0; o < r; ++o) {
					var n = 255 & t[o];
					if ("\n" != n && "\r" != n) if ("#" != n) if ("$" != n) {
						if ("a" <= n && n <= "z" || "A" <= n && n <= "Z" || "_" == n) {
							for (var s = o, _ = -1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o) if ("=" == n) {
								_ = o;
								break
							}
							if (_ >= 0) {
								var a = new B;
								O.startsWith(t, s, C._$cs) ? (a._$RP = B._$hs, a._$4P = new String(t, s, _ - s)) : O.startsWith(t, s, C._$ar) ? (a._$4P = new String(t, s + 7, _ - s - 7), O.startsWith(t, s + 7, "ANCHOR_X") ? a._$RP = B._$xs : O.startsWith(t, s + 7, "ANCHOR_Y") ? a._$RP = B._$us : O.startsWith(t, s + 7, "SCALE_X") ? a._$RP = B._$qs : O.startsWith(t, s + 7, "SCALE_Y") ? a._$RP = B._$Ys : O.startsWith(t, s + 7, "X") ? a._$RP = B._$ws : O.startsWith(t, s + 7, "Y") && (a._$RP = B._$Ns)) : (a._$RP = B._$Fr, a._$4P = new String(t, s, _ - s)), i.motions.push(a);
								var h = 0;
								for (C._$D2.clear(), o = _ + 1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o) if ("," != n && " " != n && "\t" != n) {
									var l = O._$LS(t, r, o, e);
									if (e[0] > 0) {
										C._$D2.push(l), h++;
										var $ = e[0];
										if ($ < o) {
											console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
											break
										}
										o = $
									}
								}
								a._$I0 = C._$D2._$BL(), h > i._$yT && (i._$yT = h)
							}
						}
					} else {
						for (var s = o, _ = -1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o) if ("=" == n) {
							_ = o;
							break
						}
						var u = !1;
						if (_ >= 0) for (_ == s + 4 && "f" == t[s + 1] && "p" == t[s + 2] && "s" == t[s + 3] && (u = !0), o = _ + 1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o) if ("," != n && " " != n && "\t" != n) {
							var l = O._$LS(t, r, o, e);
							e[0] > 0 && u && 5 < l && l < 121 && (i._$D0 = l), o = e[0]
						}
						for (; o < r && ("\n" != t[o] && "\r" != t[o]); ++o);
					} else for (; o < r && ("\n" != t[o] && "\r" != t[o]); ++o);
				}
				return i._$AS = 1e3 * i._$yT / i._$D0 | 0, i
			}, C.prototype.getDurationMSec = function() {
				return this._$AS
			}, C.prototype.dump = function() {
				for (var t = 0; t < this.motions.length; t++) {
					var i = this.motions[t];
					console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
					for (var e = 0; e < i._$I0.length && e < 10; e++) console.log("%5.2f ,", i._$I0[e]);
					console.log("\n")
				}
			}, C.prototype.updateParamExe = function(t, i, e, r) {
				for (var o = i - r._$z2, n = o * this._$D0 / 1e3, s = 0 | n, _ = n - s, a = 0; a < this.motions.length; a++) {
					var h = this.motions[a],
						l = h._$I0.length,
						$ = h._$4P;
					if (h._$RP == B._$hs) {
						var u = h._$I0[s >= l ? l - 1 : s];
						t.setParamFloat($, u)
					} else if (B._$ws <= h._$RP && h._$RP <= B._$Ys);
					else {
						var p = t.getParamFloat($),
							f = h._$I0[s >= l ? l - 1 : s],
							c = h._$I0[s + 1 >= l ? l - 1 : s + 1],
							d = f + (c - f) * _,
							g = p + (d - p) * e;
						t.setParamFloat($, g)
					}
				}
				s >= this._$yT && (this._$E ? (r._$z2 = i, this.loopFadeIn && (r._$bs = i)) : r._$9L = !0)
			}, C.prototype._$r0 = function() {
				return this._$E
			}, C.prototype._$aL = function(t) {
				this._$E = t
			}, C.prototype.isLoopFadeIn = function() {
				return this.loopFadeIn
			}, C.prototype.setLoopFadeIn = function(t) {
				this.loopFadeIn = t
			}, N.prototype.clear = function() {
				this.size = 0
			}, N.prototype.add = function(t) {
				if (this._$P.length <= this.size) {
					var i = new Float32Array(2 * this.size);
					w._$jT(this._$P, 0, i, 0, this.size), this._$P = i
				}
				this._$P[this.size++] = t
			}, N.prototype._$BL = function() {
				var t = new Float32Array(this.size);
				return w._$jT(this._$P, 0, t, 0, this.size), t
			}, B._$Fr = 0, B._$hs = 1, B._$ws = 100, B._$Ns = 101, B._$xs = 102, B._$us = 103, B._$qs = 104, B._$Ys = 105, U._$Ms = 1, U._$Qs = 2, U._$i2 = 0, U._$No = 2, U._$do = U._$Ms, U._$Ls = !0, U._$1r = 5, U._$Qb = 65, U._$J = 1e-4, U._$FT = .001, U._$Ss = 3, G._$o7 = 6, G._$S7 = 7, G._$s7 = 8, G._$77 = 9, G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 = 10, G.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1 = 11, G._$T7 = G.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1, G._$Is = -2004318072, G._$h0 = 0, G._$4L = 23, G._$7P = 33, G._$uT = function(t) {
				console.log("_$bo :: _$6 _$mo _$E0 : %d\n", t)
			}, G._$9o = function(t) {
				if (t < 40) return G._$uT(t), null;
				if (t < 50) return G._$uT(t), null;
				if (t < 60) return G._$uT(t), null;
				if (t < 100) switch (t) {
				case 65:
					return new Z;
				case 66:
					return new D;
				case 67:
					return new x;
				case 68:
					return new z;
				case 69:
					return new P;
				case 70:
					return new $t;
				default:
					return G._$uT(t), null
				} else if (t < 150) switch (t) {
				case 131:
					return new st;
				case 133:
					return new tt;
				case 136:
					return new p;
				case 137:
					return new ot;
				case 142:
					return new j
				}
				return G._$uT(t), null
			}, Y._$HP = 0, Y._$_0 = !0;
			Y._$V2 = -1, Y._$W0 = -1, Y._$jr = !1, Y._$ZS = !0, Y._$tr = -1e6, Y._$lr = 1e6, Y._$is = 32, Y._$e = !1, Y.prototype.getDrawDataIndex = function(t) {
				for (var i = this._$aS.length - 1; i >= 0; --i) if (null != this._$aS[i] && this._$aS[i].getDrawDataID() == t) return i;
				return -1
			}, Y.prototype.getDrawData = function(t) {
				if (t instanceof b) {
					if (null == this._$Bo) {
						this._$Bo = new Object;
						for (var i = this._$aS.length, e = 0; e < i; e++) {
							var r = this._$aS[e],
								o = r.getDrawDataID();
							null != o && (this._$Bo[o] = r)
						}
					}
					return this._$Bo[id]
				}
				return t < this._$aS.length ? this._$aS[t] : null
			}, Y.prototype.release = function() {
				this._$3S.clear(), this._$aS.clear(), this._$F2.clear(), null != this._$Bo && this._$Bo.clear(), this._$db.clear(), this._$8b.clear(), this._$Hr.clear()
			}, Y.prototype.init = function() {
				this._$co++, this._$F2.length > 0 && this.release();
				for (var t = this._$Ri.getModelImpl(), i = t._$Xr(), r = i.length, o = new Array, n = new Array, s = 0; s < r; ++s) {
					var _ = i[s];
					this._$F2.push(_), this._$Hr.push(_.init(this));
					for (var a = _.getBaseData(), h = a.length, l = 0; l < h; ++l) o.push(a[l]);
					for (var l = 0; l < h; ++l) {
						var $ = a[l].init(this);
						$._$l2(s), n.push($)
					}
					for (var u = _.getDrawData(), p = u.length, l = 0; l < p; ++l) {
						var f = u[l],
							c = f.init(this);
						c._$IP = s, this._$aS.push(f), this._$8b.push(c)
					}
				}
				for (var d = o.length, g = yt._$2o();;) {
					for (var y = !1, s = 0; s < d; ++s) {
						var m = o[s];
						if (null != m) {
							var T = m.getTargetBaseDataID();
							(null == T || T == g || this.getBaseDataIndex(T) >= 0) && (this._$3S.push(m), this._$db.push(n[s]), o[s] = null, y = !0)
						}
					}
					if (!y) break
				}
				var P = t._$E2();
				if (null != P) {
					var S = P._$1s();
					if (null != S) for (var v = S.length, s = 0; s < v; ++s) {
						var L = S[s];
						null != L && this._$02(L.getParamID(), L.getDefaultValue(), L.getMinValue(), L.getMaxValue())
					}
				}
				this.clipManager = new e(this.dp_webgl), this.clipManager.init(this, this._$aS, this._$8b), this._$QT = !0
			}, Y.prototype.update = function() {
				Y._$e && _.start("_$zL");
				for (var t = this._$_2.length, i = 0; i < t; i++) this._$_2[i] != this._$vr[i] && (this._$Js[i] = Y._$ZS, this._$vr[i] = this._$_2[i]);
				var e = this._$3S.length,
					r = this._$aS.length,
					o = W._$or(),
					n = W._$Pr(),
					s = n - o + 1;
				(null == this._$Ws || this._$Ws.length < s) && (this._$Ws = new Int16Array(s), this._$Vs = new Int16Array(s));
				for (var i = 0; i < s; i++) this._$Ws[i] = Y._$V2, this._$Vs[i] = Y._$V2;
				(null == this._$Er || this._$Er.length < r) && (this._$Er = new Int16Array(r));
				for (var i = 0; i < r; i++) this._$Er[i] = Y._$W0;
				Y._$e && _.dump("_$zL"), Y._$e && _.start("_$UL");
				for (var a = null, h = 0; h < e; ++h) {
					var l = this._$3S[h],
						$ = this._$db[h];
					try {
						l._$Nr(this, $), l._$2b(this, $)
					} catch (t) {
						null == a && (a = t)
					}
				}
				null != a && Y._$_0 && _._$Rb(a), Y._$e && _.dump("_$UL"), Y._$e && _.start("_$DL");
				for (var u = null, p = 0; p < r; ++p) {
					var f = this._$aS[p],
						c = this._$8b[p];
					try {
						if (f._$Nr(this, c), c._$u2()) continue;
						f._$2b(this, c);
						var d, g = Math.floor(f._$zS(this, c) - o);
						try {
							d = this._$Vs[g]
						} catch (t) {
							console.log("_$li :: %s / %s \t\t\t\t@@_$fS\n", t.toString(), f.getDrawDataID().toString()), g = Math.floor(f._$zS(this, c) - o);
							continue
						}
						d == Y._$V2 ? this._$Ws[g] = p : this._$Er[d] = p, this._$Vs[g] = p
					} catch (t) {
						null == u && (u = t, at._$sT(at._$H7))
					}
				}
				null != u && Y._$_0 && _._$Rb(u), Y._$e && _.dump("_$DL"), Y._$e && _.start("_$eL");
				for (var i = this._$Js.length - 1; i >= 0; i--) this._$Js[i] = Y._$jr;
				return this._$QT = !1, Y._$e && _.dump("_$eL"), !1
			}, Y.prototype.preDraw = function(t) {
				null != this.clipManager && (t._$ZT(), this.clipManager.setupClip(this, t))
			}, Y.prototype.draw = function(t) {
				if (null == this._$Ws) return void _._$li("call _$Ri.update() before _$Ri.draw() ");
				var i = this._$Ws.length;
				t._$ZT();
				for (var e = 0; e < i; ++e) {
					var r = this._$Ws[e];
					if (r != Y._$V2) for (;;) {
						var o = this._$aS[r],
							n = this._$8b[r];
						if (n._$yo()) {
							var s = n._$IP,
								a = this._$Hr[s];
							n._$VS = a.getPartsOpacity(), o.draw(t, this, n)
						}
						var h = this._$Er[r];
						if (h <= r || h == Y._$W0) break;
						r = h
					}
				}
			}, Y.prototype.getParamIndex = function(t) {
				for (var i = this._$pb.length - 1; i >= 0; --i) if (this._$pb[i] == t) return i;
				return this._$02(t, 0, Y._$tr, Y._$lr)
			}, Y.prototype._$BS = function(t) {
				return this.getBaseDataIndex(t)
			}, Y.prototype.getBaseDataIndex = function(t) {
				for (var i = this._$3S.length - 1; i >= 0; --i) if (null != this._$3S[i] && this._$3S[i].getBaseDataID() == t) return i;
				return -1
			}, Y.prototype._$UT = function(t, i) {
				var e = new Float32Array(i);
				return w._$jT(t, 0, e, 0, t.length), e
			}, Y.prototype._$02 = function(t, i, e, r) {
				if (this._$qo >= this._$pb.length) {
					var o = this._$pb.length,
						n = new Array(2 * o);
					w._$jT(this._$pb, 0, n, 0, o), this._$pb = n, this._$_2 = this._$UT(this._$_2, 2 * o), this._$vr = this._$UT(this._$vr, 2 * o), this._$Rr = this._$UT(this._$Rr, 2 * o), this._$Or = this._$UT(this._$Or, 2 * o);
					var s = new Array;
					w._$jT(this._$Js, 0, s, 0, o), this._$Js = s
				}
				return this._$pb[this._$qo] = t, this._$_2[this._$qo] = i, this._$vr[this._$qo] = i, this._$Rr[this._$qo] = e, this._$Or[this._$qo] = r, this._$Js[this._$qo] = Y._$ZS, this._$qo++
			}, Y.prototype._$Zo = function(t, i) {
				this._$3S[t] = i
			}, Y.prototype.setParamFloat = function(t, i) {
				i < this._$Rr[t] && (i = this._$Rr[t]), i > this._$Or[t] && (i = this._$Or[t]), this._$_2[t] = i
			}, Y.prototype.loadParam = function() {
				var t = this._$_2.length;
				t > this._$fs.length && (t = this._$fs.length), w._$jT(this._$fs, 0, this._$_2, 0, t)
			}, Y.prototype.saveParam = function() {
				var t = this._$_2.length;
				t > this._$fs.length && (this._$fs = new Float32Array(t)), w._$jT(this._$_2, 0, this._$fs, 0, t)
			}, Y.prototype._$v2 = function() {
				return this._$co
			}, Y.prototype._$WS = function() {
				return this._$QT
			}, Y.prototype._$Xb = function(t) {
				return this._$Js[t] == Y._$ZS
			}, Y.prototype._$vs = function() {
				return this._$Es
			}, Y.prototype._$Tr = function() {
				return this._$ZP
			}, Y.prototype.getBaseData = function(t) {
				return this._$3S[t]
			}, Y.prototype.getParamFloat = function(t) {
				return this._$_2[t]
			}, Y.prototype.getParamMax = function(t) {
				return this._$Or[t]
			}, Y.prototype.getParamMin = function(t) {
				return this._$Rr[t]
			}, Y.prototype.setPartsOpacity = function(t, i) {
				this._$Hr[t].setPartsOpacity(i)
			}, Y.prototype.getPartsOpacity = function(t) {
				return this._$Hr[t].getPartsOpacity()
			}, Y.prototype.getPartsDataIndex = function(t) {
				for (var i = this._$F2.length - 1; i >= 0; --i) if (null != this._$F2[i] && this._$F2[i]._$p2() == t) return i;
				return -1
			}, Y.prototype._$q2 = function(t) {
				return this._$db[t]
			}, Y.prototype._$C2 = function(t) {
				return this._$8b[t]
			}, Y.prototype._$Bb = function(t) {
				return this._$Hr[t]
			}, Y.prototype._$5s = function(t, i) {
				for (var e = this._$Ws.length, r = t, o = 0; o < e; ++o) {
					var n = this._$Ws[o];
					if (n != Y._$V2) for (;;) {
						var s = this._$8b[n];
						s._$yo() && (s._$GT()._$B2(this, s, r), r += i);
						var _ = this._$Er[n];
						if (_ <= n || _ == Y._$W0) break;
						n = _
					}
				}
			}, Y.prototype.setDrawParam = function(t) {
				this.dp_webgl = t
			}, Y.prototype.getDrawParam = function() {
				return this.dp_webgl
			}, k._$0T = function(t) {
				return k._$0T(new _$5(t))
			}, k._$0T = function(t) {
				if (!t.exists()) throw new _$ls(t._$3b());
				for (var i, e = t.length(), r = new Int8Array(e), o = new _$Xs(new _$kb(t), 8192), n = 0;
				(i = o.read(r, n, e - n)) > 0;) n += i;
				return r
			}, k._$C = function(t) {
				var i = null,
					e = null;
				try {
					i = t instanceof Array ? t : new _$Xs(t, 8192), e = new _$js;
					for (var r, o = new Int8Array(1e3);
					(r = i.read(o)) > 0;) e.write(o, 0, r);
					return e._$TS()
				} finally {
					null != t && t.close(), null != e && (e.flush(), e.close())
				}
			}, V.prototype._$T2 = function() {
				return w.getUserTimeMSec() + Math._$10() * (2 * this._$Br - 1)
			}, V.prototype._$uo = function(t) {
				this._$Br = t
			}, V.prototype._$QS = function(t, i, e) {
				this._$Dr = t, this._$Cb = i, this._$mr = e
			}, V.prototype._$7T = function(t) {
				var i, e = w.getUserTimeMSec(),
					r = 0;
				switch (this._$_L) {
				case STATE_CLOSING:
					r = (e - this._$bb) / this._$Dr, r >= 1 && (r = 1, this._$_L = wt.STATE_CLOSED, this._$bb = e), i = 1 - r;
					break;
				case STATE_CLOSED:
					r = (e - this._$bb) / this._$Cb, r >= 1 && (this._$_L = wt.STATE_OPENING, this._$bb = e), i = 0;
					break;
				case STATE_OPENING:
					r = (e - this._$bb) / this._$mr, r >= 1 && (r = 1, this._$_L = wt.STATE_INTERVAL, this._$12 = this._$T2()), i = r;
					break;
				case STATE_INTERVAL:
					this._$12 < e && (this._$_L = wt.STATE_CLOSING, this._$bb = e), i = 1;
					break;
				case STATE_FIRST:
				default:
					this._$_L = wt.STATE_INTERVAL, this._$12 = this._$T2(), i = 1
				}
				this._$jo || (i = -i), t.setParamFloat(this._$iL, i), t.setParamFloat(this._$0L, i)
			};
			var wt = function() {};
			wt.STATE_FIRST = "STATE_FIRST", wt.STATE_INTERVAL = "STATE_INTERVAL", wt.STATE_CLOSING = "STATE_CLOSING", wt.STATE_CLOSED = "STATE_CLOSED", wt.STATE_OPENING = "STATE_OPENING", X.prototype = new E, X._$As = 32, X._$Gr = !1, X._$NT = null, X._$vS = null, X._$no = null, X._$9r = function(t) {
				return new Float32Array(t)
			}, X._$vb = function(t) {
				return new Int16Array(t)
			}, X._$cr = function(t, i) {
				return null == t || t._$yL() < i.length ? (t = X._$9r(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
			}, X._$mb = function(t, i) {
				return null == t || t._$yL() < i.length ? (t = X._$vb(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
			}, X._$Hs = function() {
				return X._$Gr
			}, X._$as = function(t) {
				X._$Gr = t
			}, X.prototype.setGL = function(t) {
				this.gl = t
			}, X.prototype.setTransform = function(t) {
				this.transform = t
			}, X.prototype._$ZT = function() {}, X.prototype._$Uo = function(t, i, e, r, o, n, s, _) {
				if (!(n < .01)) {
					var a = this._$U2[t],
						h = n > .9 ? at.EXPAND_W : 0;
					this.gl.drawElements(a, e, r, o, n, h, this.transform, _)
				}
			}, X.prototype._$Rs = function() {
				throw new Error("_$Rs")
			}, X.prototype._$Ds = function(t) {
				throw new Error("_$Ds")
			}, X.prototype._$K2 = function() {
				for (var t = 0; t < this._$sb.length; t++) {
					0 != this._$sb[t] && (this.gl._$Sr(1, this._$sb, t), this._$sb[t] = 0)
				}
			}, X.prototype.setTexture = function(t, i) {
				this._$sb.length < t + 1 && this._$nS(t), this._$sb[t] = i
			}, X.prototype.setTexture = function(t, i) {
				this._$sb.length < t + 1 && this._$nS(t), this._$U2[t] = i
			}, X.prototype._$nS = function(t) {
				var i = Math.max(2 * this._$sb.length, t + 1 + 10),
					e = new Int32Array(i);
				w._$jT(this._$sb, 0, e, 0, this._$sb.length), this._$sb = e;
				var r = new Array;
				w._$jT(this._$U2, 0, r, 0, this._$U2.length), this._$U2 = r
			}, z.prototype = new I, z._$Xo = new Float32Array(2), z._$io = new Float32Array(2), z._$0o = new Float32Array(2), z._$Lo = new Float32Array(2), z._$To = new Float32Array(2), z._$Po = new Float32Array(2), z._$gT = new Array, z.prototype._$zP = function() {
				this._$GS = new D, this._$GS._$zP(), this._$Y0 = new Array
			}, z.prototype.getType = function() {
				return I._$c2
			}, z.prototype._$F0 = function(t) {
				I.prototype._$F0.call(this, t), this._$GS = t._$nP(), this._$Y0 = t._$nP(), I.prototype.readV2_opacity.call(this, t)
			}, z.prototype.init = function(t) {
				var i = new H(this);
				return i._$Yr = new P, this._$32() && (i._$Wr = new P), i
			}, z.prototype._$Nr = function(t, i) {
				this != i._$GT() && console.log("### assert!! ### ");
				var e = i;
				if (this._$GS._$Ur(t)) {
					var r = z._$gT;
					r[0] = !1;
					var o = this._$GS._$Q2(t, r);
					i._$Ib(r[0]), this.interpolateOpacity(t, this._$GS, i, r);
					var n = t._$vs(),
						s = t._$Tr();
					if (this._$GS._$zr(n, s, o), o <= 0) {
						var _ = this._$Y0[n[0]];
						e._$Yr.init(_)
					} else if (1 == o) {
						var _ = this._$Y0[n[0]],
							a = this._$Y0[n[1]],
							h = s[0];
						e._$Yr._$fL = _._$fL + (a._$fL - _._$fL) * h, e._$Yr._$gL = _._$gL + (a._$gL - _._$gL) * h, e._$Yr._$B0 = _._$B0 + (a._$B0 - _._$B0) * h, e._$Yr._$z0 = _._$z0 + (a._$z0 - _._$z0) * h, e._$Yr._$qT = _._$qT + (a._$qT - _._$qT) * h
					} else if (2 == o) {
						var _ = this._$Y0[n[0]],
							a = this._$Y0[n[1]],
							l = this._$Y0[n[2]],
							$ = this._$Y0[n[3]],
							h = s[0],
							u = s[1],
							p = _._$fL + (a._$fL - _._$fL) * h,
							f = l._$fL + ($._$fL - l._$fL) * h;
						e._$Yr._$fL = p + (f - p) * u, p = _._$gL + (a._$gL - _._$gL) * h, f = l._$gL + ($._$gL - l._$gL) * h, e._$Yr._$gL = p + (f - p) * u, p = _._$B0 + (a._$B0 - _._$B0) * h, f = l._$B0 + ($._$B0 - l._$B0) * h, e._$Yr._$B0 = p + (f - p) * u, p = _._$z0 + (a._$z0 - _._$z0) * h, f = l._$z0 + ($._$z0 - l._$z0) * h, e._$Yr._$z0 = p + (f - p) * u, p = _._$qT + (a._$qT - _._$qT) * h, f = l._$qT + ($._$qT - l._$qT) * h, e._$Yr._$qT = p + (f - p) * u
					} else if (3 == o) {
						var c = this._$Y0[n[0]],
							d = this._$Y0[n[1]],
							g = this._$Y0[n[2]],
							y = this._$Y0[n[3]],
							m = this._$Y0[n[4]],
							T = this._$Y0[n[5]],
							P = this._$Y0[n[6]],
							S = this._$Y0[n[7]],
							h = s[0],
							u = s[1],
							v = s[2],
							p = c._$fL + (d._$fL - c._$fL) * h,
							f = g._$fL + (y._$fL - g._$fL) * h,
							L = m._$fL + (T._$fL - m._$fL) * h,
							M = P._$fL + (S._$fL - P._$fL) * h;
						e._$Yr._$fL = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u), p = c._$gL + (d._$gL - c._$gL) * h, f = g._$gL + (y._$gL - g._$gL) * h, L = m._$gL + (T._$gL - m._$gL) * h, M = P._$gL + (S._$gL - P._$gL) * h, e._$Yr._$gL = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u), p = c._$B0 + (d._$B0 - c._$B0) * h, f = g._$B0 + (y._$B0 - g._$B0) * h, L = m._$B0 + (T._$B0 - m._$B0) * h, M = P._$B0 + (S._$B0 - P._$B0) * h, e._$Yr._$B0 = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u), p = c._$z0 + (d._$z0 - c._$z0) * h, f = g._$z0 + (y._$z0 - g._$z0) * h, L = m._$z0 + (T._$z0 - m._$z0) * h, M = P._$z0 + (S._$z0 - P._$z0) * h, e._$Yr._$z0 = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u), p = c._$qT + (d._$qT - c._$qT) * h, f = g._$qT + (y._$qT - g._$qT) * h, L = m._$qT + (T._$qT - m._$qT) * h, M = P._$qT + (S._$qT - P._$qT) * h, e._$Yr._$qT = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)
					} else if (4 == o) {
						var E = this._$Y0[n[0]],
							A = this._$Y0[n[1]],
							I = this._$Y0[n[2]],
							w = this._$Y0[n[3]],
							x = this._$Y0[n[4]],
							O = this._$Y0[n[5]],
							D = this._$Y0[n[6]],
							R = this._$Y0[n[7]],
							b = this._$Y0[n[8]],
							F = this._$Y0[n[9]],
							C = this._$Y0[n[10]],
							N = this._$Y0[n[11]],
							B = this._$Y0[n[12]],
							U = this._$Y0[n[13]],
							G = this._$Y0[n[14]],
							Y = this._$Y0[n[15]],
							h = s[0],
							u = s[1],
							v = s[2],
							k = s[3],
							p = E._$fL + (A._$fL - E._$fL) * h,
							f = I._$fL + (w._$fL - I._$fL) * h,
							L = x._$fL + (O._$fL - x._$fL) * h,
							M = D._$fL + (R._$fL - D._$fL) * h,
							V = b._$fL + (F._$fL - b._$fL) * h,
							X = C._$fL + (N._$fL - C._$fL) * h,
							H = B._$fL + (U._$fL - B._$fL) * h,
							W = G._$fL + (Y._$fL - G._$fL) * h;
						e._$Yr._$fL = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u)), p = E._$gL + (A._$gL - E._$gL) * h, f = I._$gL + (w._$gL - I._$gL) * h, L = x._$gL + (O._$gL - x._$gL) * h, M = D._$gL + (R._$gL - D._$gL) * h, V = b._$gL + (F._$gL - b._$gL) * h, X = C._$gL + (N._$gL - C._$gL) * h, H = B._$gL + (U._$gL - B._$gL) * h, W = G._$gL + (Y._$gL - G._$gL) * h, e._$Yr._$gL = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u)), p = E._$B0 + (A._$B0 - E._$B0) * h, f = I._$B0 + (w._$B0 - I._$B0) * h, L = x._$B0 + (O._$B0 - x._$B0) * h, M = D._$B0 + (R._$B0 - D._$B0) * h, V = b._$B0 + (F._$B0 - b._$B0) * h, X = C._$B0 + (N._$B0 - C._$B0) * h, H = B._$B0 + (U._$B0 - B._$B0) * h, W = G._$B0 + (Y._$B0 - G._$B0) * h, e._$Yr._$B0 = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u)), p = E._$z0 + (A._$z0 - E._$z0) * h, f = I._$z0 + (w._$z0 - I._$z0) * h, L = x._$z0 + (O._$z0 - x._$z0) * h, M = D._$z0 + (R._$z0 - D._$z0) * h, V = b._$z0 + (F._$z0 - b._$z0) * h, X = C._$z0 + (N._$z0 - C._$z0) * h, H = B._$z0 + (U._$z0 - B._$z0) * h, W = G._$z0 + (Y._$z0 - G._$z0) * h, e._$Yr._$z0 = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u)), p = E._$qT + (A._$qT - E._$qT) * h, f = I._$qT + (w._$qT - I._$qT) * h, L = x._$qT + (O._$qT - x._$qT) * h, M = D._$qT + (R._$qT - D._$qT) * h, V = b._$qT + (F._$qT - b._$qT) * h, X = C._$qT + (N._$qT - C._$qT) * h, H = B._$qT + (U._$qT - B._$qT) * h, W = G._$qT + (Y._$qT - G._$qT) * h, e._$Yr._$qT = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u))
					} else {
						for (var j = 0 | Math.pow(2, o), q = new Float32Array(j), J = 0; J < j; J++) {
							for (var Q = J, Z = 1, K = 0; K < o; K++) Z *= Q % 2 == 0 ? 1 - s[K] : s[K], Q /= 2;
							q[J] = Z
						}
						for (var tt = new Array, it = 0; it < j; it++) tt[it] = this._$Y0[n[it]];
						for (var et = 0, rt = 0, ot = 0, nt = 0, st = 0, it = 0; it < j; it++) et += q[it] * tt[it]._$fL, rt += q[it] * tt[it]._$gL, ot += q[it] * tt[it]._$B0, nt += q[it] * tt[it]._$z0, st += q[it] * tt[it]._$qT;
						e._$Yr._$fL = et, e._$Yr._$gL = rt, e._$Yr._$B0 = ot, e._$Yr._$z0 = nt, e._$Yr._$qT = st
					}
					var _ = this._$Y0[n[0]];
					e._$Yr.reflectX = _.reflectX, e._$Yr.reflectY = _.reflectY
				}
			}, z.prototype._$2b = function(t, i) {
				this != i._$GT() && console.log("### assert!! ### ");
				var e = i;
				if (e._$hS(!0), this._$32()) {
					var r = this.getTargetBaseDataID();
					if (e._$8r == I._$ur && (e._$8r = t.getBaseDataIndex(r)), e._$8r < 0) at._$so && _._$li("_$L _$0P _$G :: %s", r), e._$hS(!1);
					else {
						var o = t.getBaseData(e._$8r);
						if (null != o) {
							var n = t._$q2(e._$8r),
								s = z._$Xo;
							s[0] = e._$Yr._$fL, s[1] = e._$Yr._$gL;
							var a = z._$io;
							a[0] = 0, a[1] = -.1;
							n._$GT().getType() == I._$c2 ? a[1] = -10 : a[1] = -.1;
							var h = z._$0o;
							this._$Jr(t, o, n, s, a, h);
							var l = Lt._$92(a, h);
							o._$nb(t, n, s, s, 1, 0, 2), e._$Wr._$fL = s[0], e._$Wr._$gL = s[1], e._$Wr._$B0 = e._$Yr._$B0, e._$Wr._$z0 = e._$Yr._$z0, e._$Wr._$qT = e._$Yr._$qT - l * Lt._$NS;
							var $ = n.getTotalScale();
							e.setTotalScale_notForClient($ * e._$Wr._$B0);
							var u = n.getTotalOpacity();
							e.setTotalOpacity(u * e.getInterpolatedOpacity()), e._$Wr.reflectX = e._$Yr.reflectX, e._$Wr.reflectY = e._$Yr.reflectY, e._$hS(n._$yo())
						} else e._$hS(!1)
					}
				} else e.setTotalScale_notForClient(e._$Yr._$B0), e.setTotalOpacity(e.getInterpolatedOpacity())
			}, z.prototype._$nb = function(t, i, e, r, o, n, s) {
				this != i._$GT() && console.log("### assert!! ### ");
				for (var _, a, h = i, l = null != h._$Wr ? h._$Wr : h._$Yr, $ = Math.sin(Lt._$bS * l._$qT), u = Math.cos(Lt._$bS * l._$qT), p = h.getTotalScale(), f = l.reflectX ? -1 : 1, c = l.reflectY ? -1 : 1, d = u * p * f, g = -$ * p * c, y = $ * p * f, m = u * p * c, T = l._$fL, P = l._$gL, S = o * s, v = n; v < S; v += s) _ = e[v], a = e[v + 1], r[v] = d * _ + g * a + T, r[v + 1] = y * _ + m * a + P
			}, z.prototype._$Jr = function(t, i, e, r, o, n) {
				i != e._$GT() && console.log("### assert!! ### ");
				var s = z._$Lo;
				z._$Lo[0] = r[0], z._$Lo[1] = r[1], i._$nb(t, e, s, s, 1, 0, 2);
				for (var _ = z._$To, a = z._$Po, h = 1, l = 0; l < 10; l++) {
					if (a[0] = r[0] + h * o[0], a[1] = r[1] + h * o[1], i._$nb(t, e, a, _, 1, 0, 2), _[0] -= s[0], _[1] -= s[1], 0 != _[0] || 0 != _[1]) return n[0] = _[0], void(n[1] = _[1]);
					if (a[0] = r[0] - h * o[0], a[1] = r[1] - h * o[1], i._$nb(t, e, a, _, 1, 0, 2), _[0] -= s[0], _[1] -= s[1], 0 != _[0] || 0 != _[1]) return _[0] = -_[0], _[0] = -_[0], n[0] = _[0], void(n[1] = _[1]);
					h *= .1
				}
				at._$so && console.log("_$L0 to transform _$SP\n")
			}, H.prototype = new _t, W.prototype = new M, W._$ur = -2, W._$ES = 500, W._$wb = 2, W._$8S = 3, W._$os = 4, W._$52 = W._$ES, W._$R2 = W._$ES, W._$Sb = function(t) {
				for (var i = t.length - 1; i >= 0; --i) {
					var e = t[i];
					e < W._$52 ? W._$52 = e : e > W._$R2 && (W._$R2 = e)
				}
			}, W._$or = function() {
				return W._$52
			}, W._$Pr = function() {
				return W._$R2
			}, W.prototype._$F0 = function(t) {
				this._$gP = t._$nP(), this._$dr = t._$nP(), this._$GS = t._$nP(), this._$qb = t._$6L(), this._$Lb = t._$cS(), this._$mS = t._$Tb(), t.getFormatVersion() >= G._$T7 ? (this.clipID = t._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = null, W._$Sb(this._$Lb)
			}, W.prototype.getClipIDList = function() {
				return this.clipIDList
			}, W.prototype._$Nr = function(t, i) {
				if (i._$IS[0] = !1, i._$Us = v._$Z2(t, this._$GS, i._$IS, this._$Lb), at._$Zs);
				else if (i._$IS[0]) return;
				i._$7s = v._$br(t, this._$GS, i._$IS, this._$mS)
			}, W.prototype._$2b = function(t) {}, W.prototype.getDrawDataID = function() {
				return this._$gP
			}, W.prototype._$j2 = function(t) {
				this._$gP = t
			}, W.prototype.getOpacity = function(t, i) {
				return i._$7s
			}, W.prototype._$zS = function(t, i) {
				return i._$Us
			}, W.prototype.getTargetBaseDataID = function() {
				return this._$dr
			}, W.prototype._$gs = function(t) {
				this._$dr = t
			}, W.prototype._$32 = function() {
				return null != this._$dr && this._$dr != yt._$2o()
			}, W.prototype.getType = function() {}, j._$42 = 0, j.prototype._$1b = function() {
				return this._$3S
			}, j.prototype.getDrawDataList = function() {
				return this._$aS
			}, j.prototype._$F0 = function(t) {
				this._$NL = t._$nP(), this._$aS = t._$nP(), this._$3S = t._$nP()
			}, j.prototype._$kr = function(t) {
				t._$Zo(this._$3S), t._$xo(this._$aS), this._$3S = null, this._$aS = null
			}, q.prototype = new i, q.loadModel = function(t) {
				var e = new q;
				return i._$62(e, t), e
			}, q.loadModel = function(t) {
				var e = new q;
				return i._$62(e, t), e
			}, q._$to = function() {
				return new q
			}, q._$er = function(t) {
				var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
				if (0 == i.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
				for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = q.loadModel(i._$3b()), o = 0; o < e.length; o++) {
					var n = new _$5(e[o]);
					if (0 == n.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
					r.setTexture(o, _$nL._$_o(t, n._$3b()))
				}
				return r
			}, q.prototype.setGL = function(t) {
				this._$zo.setGL(t)
			}, q.prototype.setTransform = function(t) {
				this._$zo.setTransform(t)
			}, q.prototype.draw = function() {
				this._$5S.draw(this._$zo)
			}, q.prototype._$K2 = function() {
				this._$zo._$K2()
			}, q.prototype.setTexture = function(t, i) {
				null == this._$zo && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(t, i)
			}, q.prototype.setTexture = function(t, i) {
				null == this._$zo && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(t, i)
			}, q.prototype._$Rs = function() {
				return this._$zo._$Rs()
			}, q.prototype._$Ds = function(t) {
				this._$zo._$Ds(t)
			}, q.prototype.getDrawParam = function() {
				return this._$zo
			}, J.prototype = new s, J._$cs = "VISIBLE:", J._$ar = "LAYOUT:", J.MTN_PREFIX_FADEIN = "FADEIN:", J.MTN_PREFIX_FADEOUT = "FADEOUT:", J._$Co = 0, J._$1T = 1, J.loadMotion = function(t) {
				var i = k._$C(t);
				return J.loadMotion(i)
			}, J.loadMotion = function(t) {
				t instanceof ArrayBuffer && (t = new DataView(t));
				var i = new J,
					e = [0],
					r = t.byteLength;
				i._$yT = 0;
				for (var o = 0; o < r; ++o) {
					var n = Q(t, o),
						s = n.charCodeAt(0);
					if ("\n" != n && "\r" != n) if ("#" != n) if ("$" != n) {
						if (97 <= s && s <= 122 || 65 <= s && s <= 90 || "_" == n) {
							for (var _ = o, a = -1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o) if ("=" == n) {
								a = o;
								break
							}
							if (a >= 0) {
								var h = new B;
								O.startsWith(t, _, J._$cs) ? (h._$RP = B._$hs, h._$4P = O.createString(t, _, a - _)) : O.startsWith(t, _, J._$ar) ? (h._$4P = O.createString(t, _ + 7, a - _ - 7), O.startsWith(t, _ + 7, "ANCHOR_X") ? h._$RP = B._$xs : O.startsWith(t, _ + 7, "ANCHOR_Y") ? h._$RP = B._$us : O.startsWith(t, _ + 7, "SCALE_X") ? h._$RP = B._$qs : O.startsWith(t, _ + 7, "SCALE_Y") ? h._$RP = B._$Ys : O.startsWith(t, _ + 7, "X") ? h._$RP = B._$ws : O.startsWith(t, _ + 7, "Y") && (h._$RP = B._$Ns)) : (h._$RP = B._$Fr, h._$4P = O.createString(t, _, a - _)), i.motions.push(h);
								var l = 0,
									$ = [];
								for (o = a + 1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o) if ("," != n && " " != n && "\t" != n) {
									var u = O._$LS(t, r, o, e);
									if (e[0] > 0) {
										$.push(u), l++;
										var p = e[0];
										if (p < o) {
											console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
											break
										}
										o = p - 1
									}
								}
								h._$I0 = new Float32Array($), l > i._$yT && (i._$yT = l)
							}
						}
					} else {
						for (var _ = o, a = -1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o) if ("=" == n) {
							a = o;
							break
						}
						var f = !1;
						if (a >= 0) for (a == _ + 4 && "f" == Q(t, _ + 1) && "p" == Q(t, _ + 2) && "s" == Q(t, _ + 3) && (f = !0), o = a + 1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o) if ("," != n && " " != n && "\t" != n) {
							var u = O._$LS(t, r, o, e);
							e[0] > 0 && f && 5 < u && u < 121 && (i._$D0 = u), o = e[0]
						}
						for (; o < r && ("\n" != Q(t, o) && "\r" != Q(t, o)); ++o);
					} else for (; o < r && ("\n" != Q(t, o) && "\r" != Q(t, o)); ++o);
				}
				return i._$rr = 1e3 * i._$yT / i._$D0 | 0, i
			}, J.prototype.getDurationMSec = function() {
				return this._$E ? -1 : this._$rr
			}, J.prototype.getLoopDurationMSec = function() {
				return this._$rr
			}, J.prototype.dump = function() {
				for (var t = 0; t < this.motions.length; t++) {
					var i = this.motions[t];
					console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
					for (var e = 0; e < i._$I0.length && e < 10; e++) console.log("%5.2f ,", i._$I0[e]);
					console.log("\n")
				}
			}, J.prototype.updateParamExe = function(t, i, e, r) {
				for (var o = i - r._$z2, n = o * this._$D0 / 1e3, s = 0 | n, _ = n - s, a = 0; a < this.motions.length; a++) {
					var h = this.motions[a],
						l = h._$I0.length,
						$ = h._$4P;
					if (h._$RP == B._$hs) {
						var u = h._$I0[s >= l ? l - 1 : s];
						t.setParamFloat($, u)
					} else if (B._$ws <= h._$RP && h._$RP <= B._$Ys);
					else {
						var p, f = t.getParamIndex($),
							c = t.getModelContext(),
							d = c.getParamMax(f),
							g = c.getParamMin(f),
							y = .4 * (d - g),
							m = c.getParamFloat(f),
							T = h._$I0[s >= l ? l - 1 : s],
							P = h._$I0[s + 1 >= l ? l - 1 : s + 1];
						p = T < P && P - T > y || T > P && T - P > y ? T : T + (P - T) * _;
						var S = m + (p - m) * e;
						t.setParamFloat($, S)
					}
				}
				s >= this._$yT && (this._$E ? (r._$z2 = i, this.loopFadeIn && (r._$bs = i)) : r._$9L = !0), this._$eP = e
			}, J.prototype._$r0 = function() {
				return this._$E
			}, J.prototype._$aL = function(t) {
				this._$E = t
			}, J.prototype._$S0 = function() {
				return this._$D0
			}, J.prototype._$U0 = function(t) {
				this._$D0 = t
			}, J.prototype.isLoopFadeIn = function() {
				return this.loopFadeIn
			}, J.prototype.setLoopFadeIn = function(t) {
				this.loopFadeIn = t
			}, N.prototype.clear = function() {
				this.size = 0
			}, N.prototype.add = function(t) {
				if (this._$P.length <= this.size) {
					var i = new Float32Array(2 * this.size);
					w._$jT(this._$P, 0, i, 0, this.size), this._$P = i
				}
				this._$P[this.size++] = t
			}, N.prototype._$BL = function() {
				var t = new Float32Array(this.size);
				return w._$jT(this._$P, 0, t, 0, this.size), t
			}, B._$Fr = 0, B._$hs = 1, B._$ws = 100, B._$Ns = 101, B._$xs = 102, B._$us = 103, B._$qs = 104, B._$Ys = 105, Z.prototype = new I, Z._$gT = new Array, Z.prototype._$zP = function() {
				this._$GS = new D, this._$GS._$zP()
			}, Z.prototype._$F0 = function(t) {
				I.prototype._$F0.call(this, t), this._$A = t._$6L(), this._$o = t._$6L(), this._$GS = t._$nP(), this._$Eo = t._$nP(), I.prototype.readV2_opacity.call(this, t)
			}, Z.prototype.init = function(t) {
				var i = new K(this),
					e = (this._$o + 1) * (this._$A + 1);
				return null != i._$Cr && (i._$Cr = null), i._$Cr = new Float32Array(2 * e), null != i._$hr && (i._$hr = null), this._$32() ? i._$hr = new Float32Array(2 * e) : i._$hr = null, i
			}, Z.prototype._$Nr = function(t, i) {
				var e = i;
				if (this._$GS._$Ur(t)) {
					var r = this._$VT(),
						o = Z._$gT;
					o[0] = !1, v._$Vr(t, this._$GS, o, r, this._$Eo, e._$Cr, 0, 2), i._$Ib(o[0]), this.interpolateOpacity(t, this._$GS, i, o)
				}
			}, Z.prototype._$2b = function(t, i) {
				var e = i;
				if (e._$hS(!0), this._$32()) {
					var r = this.getTargetBaseDataID();
					if (e._$8r == I._$ur && (e._$8r = t.getBaseDataIndex(r)), e._$8r < 0) at._$so && _._$li("_$L _$0P _$G :: %s", r), e._$hS(!1);
					else {
						var o = t.getBaseData(e._$8r),
							n = t._$q2(e._$8r);
						if (null != o && n._$yo()) {
							var s = n.getTotalScale();
							e.setTotalScale_notForClient(s);
							var a = n.getTotalOpacity();
							e.setTotalOpacity(a * e.getInterpolatedOpacity()), o._$nb(t, n, e._$Cr, e._$hr, this._$VT(), 0, 2), e._$hS(!0)
						} else e._$hS(!1)
					}
				} else e.setTotalOpacity(e.getInterpolatedOpacity())
			}, Z.prototype._$nb = function(t, i, e, r, o, n, s) {
				var _ = i,
					a = null != _._$hr ? _._$hr : _._$Cr;
				Z.transformPoints_sdk2(e, r, o, n, s, a, this._$o, this._$A)
			}, Z.transformPoints_sdk2 = function(i, e, r, o, n, s, _, a) {
				for (var h, l, $, u = r * n, p = 0, f = 0, c = 0, d = 0, g = 0, y = 0, m = !1, T = o; T < u; T += n) {
					var P, S, v, L;
					if (v = i[T], L = i[T + 1], P = v * _, S = L * a, P < 0 || S < 0 || _ <= P || a <= S) {
						var M = _ + 1;
						if (!m) {
							m = !0, p = .25 * (s[2 * (0 + 0 * M)] + s[2 * (_ + 0 * M)] + s[2 * (0 + a * M)] + s[2 * (_ + a * M)]), f = .25 * (s[2 * (0 + 0 * M) + 1] + s[2 * (_ + 0 * M) + 1] + s[2 * (0 + a * M) + 1] + s[2 * (_ + a * M) + 1]);
							var E = s[2 * (_ + a * M)] - s[2 * (0 + 0 * M)],
								A = s[2 * (_ + a * M) + 1] - s[2 * (0 + 0 * M) + 1],
								I = s[2 * (_ + 0 * M)] - s[2 * (0 + a * M)],
								w = s[2 * (_ + 0 * M) + 1] - s[2 * (0 + a * M) + 1];
							c = .5 * (E + I), d = .5 * (A + w), g = .5 * (E - I), y = .5 * (A - w), p -= .5 * (c + g), f -= .5 * (d + y)
						}
						if (-2 < v && v < 3 && -2 < L && L < 3) if (v <= 0) if (L <= 0) {
							var x = s[2 * (0 + 0 * M)],
								O = s[2 * (0 + 0 * M) + 1],
								D = p - 2 * c,
								R = f - 2 * d,
								b = p - 2 * g,
								F = f - 2 * y,
								C = p - 2 * c - 2 * g,
								N = f - 2 * d - 2 * y,
								B = .5 * (v - -2),
								U = .5 * (L - -2);
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else if (L >= 1) {
							var b = s[2 * (0 + a * M)],
								F = s[2 * (0 + a * M) + 1],
								C = p - 2 * c + 1 * g,
								N = f - 2 * d + 1 * y,
								x = p + 3 * g,
								O = f + 3 * y,
								D = p - 2 * c + 3 * g,
								R = f - 2 * d + 3 * y,
								B = .5 * (v - -2),
								U = .5 * (L - 1);
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else {
							var G = 0 | S;
							G == a && (G = a - 1);
							var B = .5 * (v - -2),
								U = S - G,
								Y = G / a,
								k = (G + 1) / a,
								b = s[2 * (0 + G * M)],
								F = s[2 * (0 + G * M) + 1],
								x = s[2 * (0 + (G + 1) * M)],
								O = s[2 * (0 + (G + 1) * M) + 1],
								C = p - 2 * c + Y * g,
								N = f - 2 * d + Y * y,
								D = p - 2 * c + k * g,
								R = f - 2 * d + k * y;
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else if (1 <= v) if (L <= 0) {
							var D = s[2 * (_ + 0 * M)],
								R = s[2 * (_ + 0 * M) + 1],
								x = p + 3 * c,
								O = f + 3 * d,
								C = p + 1 * c - 2 * g,
								N = f + 1 * d - 2 * y,
								b = p + 3 * c - 2 * g,
								F = f + 3 * d - 2 * y,
								B = .5 * (v - 1),
								U = .5 * (L - -2);
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else if (L >= 1) {
							var C = s[2 * (_ + a * M)],
								N = s[2 * (_ + a * M) + 1],
								b = p + 3 * c + 1 * g,
								F = f + 3 * d + 1 * y,
								D = p + 1 * c + 3 * g,
								R = f + 1 * d + 3 * y,
								x = p + 3 * c + 3 * g,
								O = f + 3 * d + 3 * y,
								B = .5 * (v - 1),
								U = .5 * (L - 1);
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else {
							var G = 0 | S;
							G == a && (G = a - 1);
							var B = .5 * (v - 1),
								U = S - G,
								Y = G / a,
								k = (G + 1) / a,
								C = s[2 * (_ + G * M)],
								N = s[2 * (_ + G * M) + 1],
								D = s[2 * (_ + (G + 1) * M)],
								R = s[2 * (_ + (G + 1) * M) + 1],
								b = p + 3 * c + Y * g,
								F = f + 3 * d + Y * y,
								x = p + 3 * c + k * g,
								O = f + 3 * d + k * y;
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else if (L <= 0) {
							var V = 0 | P;
							V == _ && (V = _ - 1);
							var B = P - V,
								U = .5 * (L - -2),
								X = V / _,
								z = (V + 1) / _,
								D = s[2 * (V + 0 * M)],
								R = s[2 * (V + 0 * M) + 1],
								x = s[2 * (V + 1 + 0 * M)],
								O = s[2 * (V + 1 + 0 * M) + 1],
								C = p + X * c - 2 * g,
								N = f + X * d - 2 * y,
								b = p + z * c - 2 * g,
								F = f + z * d - 2 * y;
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else if (L >= 1) {
							var V = 0 | P;
							V == _ && (V = _ - 1);
							var B = P - V,
								U = .5 * (L - 1),
								X = V / _,
								z = (V + 1) / _,
								C = s[2 * (V + a * M)],
								N = s[2 * (V + a * M) + 1],
								b = s[2 * (V + 1 + a * M)],
								F = s[2 * (V + 1 + a * M) + 1],
								D = p + X * c + 3 * g,
								R = f + X * d + 3 * y,
								x = p + z * c + 3 * g,
								O = f + z * d + 3 * y;
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else t.err.printf("_$li calc : %.4f , %.4f\t\t\t\t\t@@BDBoxGrid\n", v, L);
						else e[T] = p + v * c + L * g, e[T + 1] = f + v * d + L * y
					} else l = P - (0 | P), $ = S - (0 | S), h = 2 * ((0 | P) + (0 | S) * (_ + 1)), l + $ < 1 ? (e[T] = s[h] * (1 - l - $) + s[h + 2] * l + s[h + 2 * (_ + 1)] * $, e[T + 1] = s[h + 1] * (1 - l - $) + s[h + 3] * l + s[h + 2 * (_ + 1) + 1] * $) : (e[T] = s[h + 2 * (_ + 1) + 2] * (l - 1 + $) + s[h + 2 * (_ + 1)] * (1 - l) + s[h + 2] * (1 - $), e[T + 1] = s[h + 2 * (_ + 1) + 3] * (l - 1 + $) + s[h + 2 * (_ + 1) + 1] * (1 - l) + s[h + 3] * (1 - $))
				}
			}, Z.prototype.transformPoints_sdk1 = function(t, i, e, r, o, n, s) {
				for (var _, a, h, l, $, u, p, f = i, c = this._$o, d = this._$A, g = o * s, y = null != f._$hr ? f._$hr : f._$Cr, m = n; m < g; m += s) at._$ts ? (_ = e[m], a = e[m + 1], _ < 0 ? _ = 0 : _ > 1 && (_ = 1), a < 0 ? a = 0 : a > 1 && (a = 1), _ *= c, a *= d, h = 0 | _, l = 0 | a, h > c - 1 && (h = c - 1), l > d - 1 && (l = d - 1), u = _ - h, p = a - l, $ = 2 * (h + l * (c + 1))) : (_ = e[m] * c, a = e[m + 1] * d, u = _ - (0 | _), p = a - (0 | a), $ = 2 * ((0 | _) + (0 | a) * (c + 1))), u + p < 1 ? (r[m] = y[$] * (1 - u - p) + y[$ + 2] * u + y[$ + 2 * (c + 1)] * p, r[m + 1] = y[$ + 1] * (1 - u - p) + y[$ + 3] * u + y[$ + 2 * (c + 1) + 1] * p) : (r[m] = y[$ + 2 * (c + 1) + 2] * (u - 1 + p) + y[$ + 2 * (c + 1)] * (1 - u) + y[$ + 2] * (1 - p), r[m + 1] = y[$ + 2 * (c + 1) + 3] * (u - 1 + p) + y[$ + 2 * (c + 1) + 1] * (1 - u) + y[$ + 3] * (1 - p))
			}, Z.prototype._$VT = function() {
				return (this._$o + 1) * (this._$A + 1)
			}, Z.prototype.getType = function() {
				return I._$_b
			}, K.prototype = new _t, tt._$42 = 0, tt.prototype._$zP = function() {
				this._$3S = new Array, this._$aS = new Array
			}, tt.prototype._$F0 = function(t) {
				this._$g0 = t._$8L(), this.visible = t._$8L(), this._$NL = t._$nP(), this._$3S = t._$nP(), this._$aS = t._$nP()
			}, tt.prototype.init = function(t) {
				var i = new it(this);
				return i.setPartsOpacity(this.isVisible() ? 1 : 0), i
			}, tt.prototype._$6o = function(t) {
				if (null == this._$3S) throw new Error("_$3S _$6 _$Wo@_$6o");
				this._$3S.push(t)
			}, tt.prototype._$3o = function(t) {
				if (null == this._$aS) throw new Error("_$aS _$6 _$Wo@_$3o");
				this._$aS.push(t)
			}, tt.prototype._$Zo = function(t) {
				this._$3S = t
			}, tt.prototype._$xo = function(t) {
				this._$aS = t
			}, tt.prototype.isVisible = function() {
				return this.visible
			}, tt.prototype._$uL = function() {
				return this._$g0
			}, tt.prototype._$KP = function(t) {
				this.visible = t
			}, tt.prototype._$ET = function(t) {
				this._$g0 = t
			}, tt.prototype.getBaseData = function() {
				return this._$3S
			}, tt.prototype.getDrawData = function() {
				return this._$aS
			}, tt.prototype._$p2 = function() {
				return this._$NL
			}, tt.prototype._$ob = function(t) {
				this._$NL = t
			}, tt.prototype.getPartsID = function() {
				return this._$NL
			}, tt.prototype._$MP = function(t) {
				this._$NL = t
			}, it.prototype = new $, it.prototype.getPartsOpacity = function() {
				return this._$VS
			}, it.prototype.setPartsOpacity = function(t) {
				this._$VS = t
			}, et._$L7 = function() {
				u._$27(), yt._$27(), b._$27(), l._$27()
			}, et.prototype.toString = function() {
				return this.id
			}, rt.prototype._$F0 = function(t) {}, ot.prototype._$1s = function() {
				return this._$4S
			}, ot.prototype._$zP = function() {
				this._$4S = new Array
			}, ot.prototype._$F0 = function(t) {
				this._$4S = t._$nP()
			}, ot.prototype._$Ks = function(t) {
				this._$4S.push(t)
			}, nt.tr = new gt, nt._$50 = new gt, nt._$Ti = new Array(0, 0), nt._$Pi = new Array(0, 0), nt._$B = new Array(0, 0), nt.prototype._$lP = function(t, i, e, r) {
				this.viewport = new Array(t, i, e, r)
			}, nt.prototype._$bL = function() {
				this.context.save();
				var t = this.viewport;
				null != t && (this.context.beginPath(), this.context._$Li(t[0], t[1], t[2], t[3]), this.context.clip())
			}, nt.prototype._$ei = function() {
				this.context.restore()
			}, nt.prototype.drawElements = function(t, i, e, r, o, n, s, a) {
				try {
					o != this._$Qo && (this._$Qo = o, this.context.globalAlpha = o);
					for (var h = i.length, l = t.width, $ = t.height, u = this.context, p = this._$xP, f = this._$uP, c = this._$6r, d = this._$3r, g = nt.tr, y = nt._$Ti, m = nt._$Pi, T = nt._$B, P = 0; P < h; P += 3) {
						u.save();
						var S = i[P],
							v = i[P + 1],
							L = i[P + 2],
							M = p + c * e[2 * S],
							E = f + d * e[2 * S + 1],
							A = p + c * e[2 * v],
							I = f + d * e[2 * v + 1],
							w = p + c * e[2 * L],
							x = f + d * e[2 * L + 1];
						s && (s._$PS(M, E, T), M = T[0], E = T[1], s._$PS(A, I, T), A = T[0], I = T[1], s._$PS(w, x, T), w = T[0], x = T[1]);
						var O = l * r[2 * S],
							D = $ - $ * r[2 * S + 1],
							R = l * r[2 * v],
							b = $ - $ * r[2 * v + 1],
							F = l * r[2 * L],
							C = $ - $ * r[2 * L + 1],
							N = Math.atan2(b - D, R - O),
							B = Math.atan2(I - E, A - M),
							U = A - M,
							G = I - E,
							Y = Math.sqrt(U * U + G * G),
							k = R - O,
							V = b - D,
							X = Math.sqrt(k * k + V * V),
							z = Y / X;
						It._$ni(F, C, O, D, R - O, b - D, -(b - D), R - O, y), It._$ni(w, x, M, E, A - M, I - E, -(I - E), A - M, m);
						var H = (m[0] - y[0]) / y[1],
							W = Math.min(O, R, F),
							j = Math.max(O, R, F),
							q = Math.min(D, b, C),
							J = Math.max(D, b, C),
							Q = Math.floor(W),
							Z = Math.floor(q),
							K = Math.ceil(j),
							tt = Math.ceil(J);
						g.identity(), g.translate(M, E), g.rotate(B), g.scale(1, m[1] / y[1]), g.shear(H, 0), g.scale(z, z), g.rotate(-N), g.translate(-O, -D), g.setContext(u);
						if (n || (n = 1.2), at.IGNORE_EXPAND && (n = 0), at.USE_CACHED_POLYGON_IMAGE) {
							var it = a._$e0;
							if (it.gl_cacheImage = it.gl_cacheImage || {}, !it.gl_cacheImage[P]) {
								var et = nt.createCanvas(K - Q, tt - Z);
								at.DEBUG_DATA.LDGL_CANVAS_MB = at.DEBUG_DATA.LDGL_CANVAS_MB || 0, at.DEBUG_DATA.LDGL_CANVAS_MB += (K - Q) * (tt - Z) * 4;
								var rt = et.getContext("2d");
								rt.translate(-Q, -Z), nt.clip(rt, g, n, Y, O, D, R, b, F, C, M, E, A, I, w, x), rt.drawImage(t, 0, 0), it.gl_cacheImage[P] = {
									cacheCanvas: et,
									cacheContext: rt
								}
							}
							u.drawImage(it.gl_cacheImage[P].cacheCanvas, Q, Z)
						} else at.IGNORE_CLIP || nt.clip(u, g, n, Y, O, D, R, b, F, C, M, E, A, I, w, x), at.USE_ADJUST_TRANSLATION && (W = 0, j = l, q = 0, J = $), u.drawImage(t, W, q, j - W, J - q, W, q, j - W, J - q);
						u.restore()
					}
				} catch (t) {
					_._$Rb(t)
				}
			}, nt.clip = function(t, i, e, r, o, n, s, _, a, h, l, $, u, p, f, c) {
				e > .02 ? nt.expandClip(t, i, e, r, l, $, u, p, f, c) : nt.clipWithTransform(t, null, o, n, s, _, a, h)
			}, nt.expandClip = function(t, i, e, r, o, n, s, _, a, h) {
				var l = s - o,
					$ = _ - n,
					u = a - o,
					p = h - n,
					f = l * p - $ * u > 0 ? e : -e,
					c = -$,
					d = l,
					g = a - s,
					y = h - _,
					m = -y,
					T = g,
					P = Math.sqrt(g * g + y * y),
					S = -p,
					v = u,
					L = Math.sqrt(u * u + p * p),
					M = o - f * c / r,
					E = n - f * d / r,
					A = s - f * c / r,
					I = _ - f * d / r,
					w = s - f * m / P,
					x = _ - f * T / P,
					O = a - f * m / P,
					D = h - f * T / P,
					R = o + f * S / L,
					b = n + f * v / L,
					F = a + f * S / L,
					C = h + f * v / L,
					N = nt._$50;
				return null != i._$P2(N) && (nt.clipWithTransform(t, N, M, E, A, I, w, x, O, D, F, C, R, b), !0)
			}, nt.clipWithTransform = function(t, i, e, r, o, n, s, a) {
				if (arguments.length < 7) return void _._$li("err : @LDGL.clip()");
				if (!(arguments[1] instanceof gt)) return void _._$li("err : a[0] is _$6 LDTransform @LDGL.clip()");
				var h = nt._$B,
					l = i,
					$ = arguments;
				if (t.beginPath(), l) {
					l._$PS($[2], $[3], h), t.moveTo(h[0], h[1]);
					for (var u = 4; u < $.length; u += 2) l._$PS($[u], $[u + 1], h), t.lineTo(h[0], h[1])
				} else {
					t.moveTo($[2], $[3]);
					for (var u = 4; u < $.length; u += 2) t.lineTo($[u], $[u + 1])
				}
				t.clip()
			}, nt.createCanvas = function(t, i) {
				var e = document.createElement("canvas");
				return e.setAttribute("width", t), e.setAttribute("height", i), e || _._$li("err : " + e), e
			}, nt.dumpValues = function() {
				for (var t = "", i = 0; i < arguments.length; i++) t += "[" + i + "]= " + arguments[i].toFixed(3) + " , ";
				console.log(t)
			}, st.prototype._$F0 = function(t) {
				this._$TT = t._$_T(), this._$LT = t._$_T(), this._$FS = t._$_T(), this._$wL = t._$nP()
			}, st.prototype.getMinValue = function() {
				return this._$TT
			}, st.prototype.getMaxValue = function() {
				return this._$LT
			}, st.prototype.getDefaultValue = function() {
				return this._$FS
			}, st.prototype.getParamID = function() {
				return this._$wL
			}, _t.prototype._$yo = function() {
				return this._$AT && !this._$JS
			}, _t.prototype._$hS = function(t) {
				this._$AT = t
			}, _t.prototype._$GT = function() {
				return this._$e0
			}, _t.prototype._$l2 = function(t) {
				this._$IP = t
			}, _t.prototype.getPartsIndex = function() {
				return this._$IP
			}, _t.prototype._$x2 = function() {
				return this._$JS
			}, _t.prototype._$Ib = function(t) {
				this._$JS = t
			}, _t.prototype.getTotalScale = function() {
				return this.totalScale
			}, _t.prototype.setTotalScale_notForClient = function(t) {
				this.totalScale = t
			}, _t.prototype.getInterpolatedOpacity = function() {
				return this._$7s
			}, _t.prototype.setInterpolatedOpacity = function(t) {
				this._$7s = t
			}, _t.prototype.getTotalOpacity = function(t) {
				return this.totalOpacity
			}, _t.prototype.setTotalOpacity = function(t) {
				this.totalOpacity = t
			}, at._$2s = "2.1.00_1", at._$Kr = 201001e3, at._$sP = !0, at._$so = !0, at._$cb = !1, at._$3T = !0, at._$Ts = !0, at._$fb = !0, at._$ts = !0, at.L2D_DEFORMER_EXTEND = !0, at._$Wb = !1;
			at._$yr = !1, at._$Zs = !1, at.L2D_NO_ERROR = 0, at._$i7 = 1e3, at._$9s = 1001, at._$es = 1100, at._$r7 = 2e3, at._$07 = 2001, at._$b7 = 2002, at._$H7 = 4e3, at.L2D_COLOR_BLEND_MODE_MULT = 0, at.L2D_COLOR_BLEND_MODE_ADD = 1, at.L2D_COLOR_BLEND_MODE_INTERPOLATE = 2, at._$6b = !0, at._$cT = 0, at.clippingMaskBufferSize = 256, at.glContext = new Array, at.frameBuffers = new Array, at.fTexture = new Array, at.IGNORE_CLIP = !1, at.IGNORE_EXPAND = !1, at.EXPAND_W = 2, at.USE_ADJUST_TRANSLATION = !0, at.USE_CANVAS_TRANSFORM = !0, at.USE_CACHED_POLYGON_IMAGE = !1, at.DEBUG_DATA = {}, at.PROFILE_IOS_SPEED = {
				PROFILE_NAME: "iOS Speed",
				USE_ADJUST_TRANSLATION: !0,
				USE_CACHED_POLYGON_IMAGE: !0,
				EXPAND_W: 4
			}, at.PROFILE_IOS_QUALITY = {
				PROFILE_NAME: "iOS HiQ",
				USE_ADJUST_TRANSLATION: !0,
				USE_CACHED_POLYGON_IMAGE: !1,
				EXPAND_W: 2
			}, at.PROFILE_IOS_DEFAULT = at.PROFILE_IOS_QUALITY, at.PROFILE_ANDROID = {
				PROFILE_NAME: "Android",
				USE_ADJUST_TRANSLATION: !1,
				USE_CACHED_POLYGON_IMAGE: !1,
				EXPAND_W: 2
			}, at.PROFILE_DESKTOP = {
				PROFILE_NAME: "Desktop",
				USE_ADJUST_TRANSLATION: !1,
				USE_CACHED_POLYGON_IMAGE: !1,
				EXPAND_W: 2
			}, at.initProfile = function() {
				Et.isIOS() ? at.setupProfile(at.PROFILE_IOS_DEFAULT) : Et.isAndroid() ? at.setupProfile(at.PROFILE_ANDROID) : at.setupProfile(at.PROFILE_DESKTOP)
			}, at.setupProfile = function(t, i) {
				if ("number" == typeof t) switch (t) {
				case 9901:
					t = at.PROFILE_IOS_SPEED;
					break;
				case 9902:
					t = at.PROFILE_IOS_QUALITY;
					break;
				case 9903:
					t = at.PROFILE_IOS_DEFAULT;
					break;
				case 9904:
					t = at.PROFILE_ANDROID;
					break;
				case 9905:
					t = at.PROFILE_DESKTOP;
					break;
				default:
					alert("profile _$6 _$Ui : " + t)
				}
				arguments.length < 2 && (i = !0), i && console.log("profile : " + t.PROFILE_NAME);
				for (var e in t) at[e] = t[e], i && console.log("  [" + e + "] = " + t[e])
			}, at.init = function() {
				if (at._$6b) {
					console.log("Live2D %s", at._$2s), at._$6b = !1;
					!0, at.initProfile()
				}
			}, at.getVersionStr = function() {
				return at._$2s
			}, at.getVersionNo = function() {
				return at._$Kr
			}, at._$sT = function(t) {
				at._$cT = t
			}, at.getError = function() {
				var t = at._$cT;
				return at._$cT = 0, t
			}, at.dispose = function() {
				at.glContext = [], at.frameBuffers = [], at.fTexture = []
			}, at.setGL = function(t, i) {
				var e = i || 0;
				at.glContext[e] = t
			}, at.getGL = function(t) {
				return at.glContext[t]
			}, at.setClippingMaskBufferSize = function(t) {
				at.clippingMaskBufferSize = t
			}, at.getClippingMaskBufferSize = function() {
				return at.clippingMaskBufferSize
			}, at.deleteBuffer = function(t) {
				at.getGL(t).deleteFramebuffer(at.frameBuffers[t].framebuffer), delete at.frameBuffers[t], delete at.glContext[t]
			}, ht._$r2 = function(t) {
				return t < 0 ? 0 : t > 1 ? 1 : .5 - .5 * Math.cos(t * Lt.PI_F)
			}, lt._$fr = -1, lt.prototype.toString = function() {
				return this._$ib
			}, $t.prototype = new W, $t._$42 = 0, $t._$Os = 30, $t._$ms = 0, $t._$ns = 1, $t._$_s = 2, $t._$gT = new Array, $t.prototype._$_S = function(t) {
				this._$LP = t
			}, $t.prototype.getTextureNo = function() {
				return this._$LP
			}, $t.prototype._$ZL = function() {
				return this._$Qi
			}, $t.prototype._$H2 = function() {
				return this._$JP
			}, $t.prototype.getNumPoints = function() {
				return this._$d0
			}, $t.prototype.getType = function() {
				return W._$wb
			}, $t.prototype._$B2 = function(t, i, e) {
				var r = i,
					o = null != r._$hr ? r._$hr : r._$Cr;
				switch (U._$do) {
				default:
				case U._$Ms:
					throw new Error("_$L _$ro ");
				case U._$Qs:
					for (var n = this._$d0 - 1; n >= 0; --n) o[n * U._$No + 4] = e
				}
			}, $t.prototype._$zP = function() {
				this._$GS = new D, this._$GS._$zP()
			}, $t.prototype._$F0 = function(t) {
				W.prototype._$F0.call(this, t), this._$LP = t._$6L(), this._$d0 = t._$6L(), this._$Yo = t._$6L();
				var i = t._$nP();
				this._$BP = new Int16Array(3 * this._$Yo);
				for (var e = 3 * this._$Yo - 1; e >= 0; --e) this._$BP[e] = i[e];
				if (this._$Eo = t._$nP(), this._$Qi = t._$nP(), t.getFormatVersion() >= G._$s7) {
					if (this._$JP = t._$6L(), 0 != this._$JP) {
						if (0 != (1 & this._$JP)) {
							var r = t._$6L();
							null == this._$5P && (this._$5P = new Object), this._$5P._$Hb = parseInt(r)
						}
						0 != (this._$JP & $t._$Os) ? this._$6s = (this._$JP & $t._$Os) >> 1 : this._$6s = $t._$ms, 0 != (32 & this._$JP) && (this.culling = !1)
					}
				} else this._$JP = 0
			}, $t.prototype.init = function(t) {
				var i = new ut(this),
					e = this._$d0 * U._$No,
					r = this._$32();
				switch (null != i._$Cr && (i._$Cr = null), i._$Cr = new Float32Array(e), null != i._$hr && (i._$hr = null), i._$hr = r ? new Float32Array(e) : null, U._$do) {
				default:
				case U._$Ms:
					if (U._$Ls) for (var o = this._$d0 - 1; o >= 0; --o) {
						var n = o << 1;
						this._$Qi[n + 1] = 1 - this._$Qi[n + 1]
					}
					break;
				case U._$Qs:
					for (var o = this._$d0 - 1; o >= 0; --o) {
						var n = o << 1,
							s = o * U._$No,
							_ = this._$Qi[n],
							a = this._$Qi[n + 1];
						i._$Cr[s] = _, i._$Cr[s + 1] = a, i._$Cr[s + 4] = 0, r && (i._$hr[s] = _, i._$hr[s + 1] = a, i._$hr[s + 4] = 0)
					}
				}
				return i
			}, $t.prototype._$Nr = function(t, i) {
				var e = i;
				if (this != e._$GT() && console.log("### assert!! ### "), this._$GS._$Ur(t) && (W.prototype._$Nr.call(this, t, e), !e._$IS[0])) {
					var r = $t._$gT;
					r[0] = !1, v._$Vr(t, this._$GS, r, this._$d0, this._$Eo, e._$Cr, U._$i2, U._$No)
				}
			}, $t.prototype._$2b = function(t, i) {
				try {
					this != i._$GT() && console.log("### assert!! ### ");
					var e = !1;
					i._$IS[0] && (e = !0);
					var r = i;
					if (!e && (W.prototype._$2b.call(this, t), this._$32())) {
						var o = this.getTargetBaseDataID();
						if (r._$8r == W._$ur && (r._$8r = t.getBaseDataIndex(o)), r._$8r < 0) at._$so && _._$li("_$L _$0P _$G :: %s", o);
						else {
							var n = t.getBaseData(r._$8r),
								s = t._$q2(r._$8r);
							null == n || s._$x2() ? r._$AT = !1 : (n._$nb(t, s, r._$Cr, r._$hr, this._$d0, U._$i2, U._$No), r._$AT = !0), r.baseOpacity = s.getTotalOpacity()
						}
					}
				} catch (t) {
					throw t
				}
			}, $t.prototype.draw = function(t, i, e) {
				if (this != e._$GT() && console.log("### assert!! ### "), !e._$IS[0]) {
					var r = e,
						o = this._$LP;
					o < 0 && (o = 1);
					var n = this.getOpacity(i, r) * e._$VS * e.baseOpacity,
						s = null != r._$hr ? r._$hr : r._$Cr;
					t.setClipBufPre_clipContextForDraw(e.clipBufPre_clipContext), t._$WP(this.culling), t._$Uo(o, 3 * this._$Yo, this._$BP, s, this._$Qi, n, this._$6s, r)
				}
			}, $t.prototype.dump = function() {
				console.log("  _$yi( %d ) , _$d0( %d ) , _$Yo( %d ) \n", this._$LP, this._$d0, this._$Yo), console.log("  _$Oi _$di = { ");
				for (var t = 0; t < this._$BP.length; t++) console.log("%5d ,", this._$BP[t]);
				console.log("\n  _$5i _$30");
				for (var t = 0; t < this._$Eo.length; t++) {
					console.log("\n    _$30[%d] = ", t);
					for (var i = this._$Eo[t], e = 0; e < i.length; e++) console.log("%6.2f, ", i[e])
				}
				console.log("\n")
			}, $t.prototype._$72 = function(t) {
				return null == this._$5P ? null : this._$5P[t]
			}, $t.prototype.getIndexArray = function() {
				return this._$BP
			}, ut.prototype = new Mt, ut.prototype.getTransformedPoints = function() {
				return null != this._$hr ? this._$hr : this._$Cr
			}, pt.prototype._$HT = function(t) {
				this.x = t.x, this.y = t.y
			}, pt.prototype._$HT = function(t, i) {
				this.x = t, this.y = i
			}, ft.prototype = new i, ft.loadModel = function(t) {
				var e = new ft;
				return i._$62(e, t), e
			}, ft.loadModel = function(t, e) {
				var r = e || 0,
					o = new ft(r);
				return i._$62(o, t), o
			}, ft._$to = function() {
				return new ft
			}, ft._$er = function(t) {
				var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
				if (0 == i.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
				for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = ft.loadModel(i._$3b()), o = 0; o < e.length; o++) {
					var n = new _$5(e[o]);
					if (0 == n.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
					r.setTexture(o, _$nL._$_o(t, n._$3b()))
				}
				return r
			}, ft.prototype.setGL = function(t) {
				at.setGL(t)
			}, ft.prototype.setTransform = function(t) {
				this.drawParamWebGL.setTransform(t)
			}, ft.prototype.update = function() {
				this._$5S.update(), this._$5S.preDraw(this.drawParamWebGL)
			}, ft.prototype.draw = function() {
				this._$5S.draw(this.drawParamWebGL)
			}, ft.prototype._$K2 = function() {
				this.drawParamWebGL._$K2()
			}, ft.prototype.setTexture = function(t, i) {
				null == this.drawParamWebGL && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(t, i)
			}, ft.prototype.setTexture = function(t, i) {
				null == this.drawParamWebGL && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(t, i)
			}, ft.prototype._$Rs = function() {
				return this.drawParamWebGL._$Rs()
			}, ft.prototype._$Ds = function(t) {
				this.drawParamWebGL._$Ds(t)
			}, ft.prototype.getDrawParam = function() {
				return this.drawParamWebGL
			}, ft.prototype.setMatrix = function(t) {
				this.drawParamWebGL.setMatrix(t)
			}, ft.prototype.setPremultipliedAlpha = function(t) {
				this.drawParamWebGL.setPremultipliedAlpha(t)
			}, ft.prototype.isPremultipliedAlpha = function() {
				return this.drawParamWebGL.isPremultipliedAlpha()
			}, ft.prototype.setAnisotropy = function(t) {
				this.drawParamWebGL.setAnisotropy(t)
			}, ft.prototype.getAnisotropy = function() {
				return this.drawParamWebGL.getAnisotropy()
			}, ct.prototype._$tb = function() {
				return this.motions
			}, ct.prototype.startMotion = function(t, i) {
				for (var e = null, r = this.motions.length, o = 0; o < r; ++o) null != (e = this.motions[o]) && (e._$qS(e._$w0.getFadeOut()), this._$eb && _._$Ji("MotionQueueManager[size:%2d]->startMotion() / start _$K _$3 (m%d)\n", r, e._$sr));
				if (null == t) return -1;
				e = new dt, e._$w0 = t, this.motions.push(e);
				var n = e._$sr;
				return this._$eb && _._$Ji("MotionQueueManager[size:%2d]->startMotion() / new _$w0 (m%d)\n", r, n), n
			}, ct.prototype.updateParam = function(t) {
				try {
					for (var i = !1, e = 0; e < this.motions.length; e++) {
						var r = this.motions[e];
						if (null != r) {
							var o = r._$w0;
							null != o ? (o.updateParam(t, r), i = !0, r.isFinished() && (this._$eb && _._$Ji("MotionQueueManager[size:%2d]->updateParam() / _$T0 _$w0 (m%d)\n", this.motions.length - 1, r._$sr), this.motions.splice(e, 1), e--)) : (this.motions = this.motions.splice(e, 1), e--)
						} else this.motions.splice(e, 1), e--
					}
					return i
				} catch (t) {
					return _._$li(t), !0
				}
			}, ct.prototype.isFinished = function(t) {
				if (arguments.length >= 1) {
					for (var i = 0; i < this.motions.length; i++) {
						var e = this.motions[i];
						if (null != e && (e._$sr == t && !e.isFinished())) return !1
					}
					return !0
				}
				for (var i = 0; i < this.motions.length; i++) {
					var e = this.motions[i];
					if (null != e) {
						if (null != e._$w0) {
							if (!e.isFinished()) return !1
						} else this.motions.splice(i, 1), i--
					} else this.motions.splice(i, 1), i--
				}
				return !0
			}, ct.prototype.stopAllMotions = function() {
				for (var t = 0; t < this.motions.length; t++) {
					var i = this.motions[t];
					if (null != i) {
						i._$w0;
						this.motions.splice(t, 1), t--
					} else this.motions.splice(t, 1), t--
				}
			}, ct.prototype._$Zr = function(t) {
				this._$eb = t
			}, ct.prototype._$e = function() {
				console.log("-- _$R --\n");
				for (var t = 0; t < this.motions.length; t++) {
					var i = this.motions[t],
						e = i._$w0;
					console.log("MotionQueueEnt[%d] :: %s\n", this.motions.length, e.toString())
				}
			}, dt._$Gs = 0, dt.prototype.isFinished = function() {
				return this._$9L
			}, dt.prototype._$qS = function(t) {
				var i = w.getUserTimeMSec(),
					e = i + t;
				(this._$Do < 0 || e < this._$Do) && (this._$Do = e)
			}, dt.prototype._$Bs = function() {
				return this._$sr
			}, gt.prototype.setContext = function(t) {
				var i = this.m;
				t.transform(i[0], i[1], i[3], i[4], i[6], i[7])
			}, gt.prototype.toString = function() {
				for (var t = "LDTransform { ", i = 0; i < 9; i++) t += this.m[i].toFixed(2) + " ,";
				return t += " }"
			}, gt.prototype.identity = function() {
				var t = this.m;
				t[0] = t[4] = t[8] = 1, t[1] = t[2] = t[3] = t[5] = t[6] = t[7] = 0
			}, gt.prototype._$PS = function(t, i, e) {
				null == e && (e = new Array(0, 0));
				var r = this.m;
				return e[0] = r[0] * t + r[3] * i + r[6], e[1] = r[1] * t + r[4] * i + r[7], e
			}, gt.prototype._$P2 = function(t) {
				t || (t = new gt);
				var i = this.m,
					e = i[0],
					r = i[1],
					o = i[2],
					n = i[3],
					s = i[4],
					_ = i[5],
					a = i[6],
					h = i[7],
					l = i[8],
					$ = e * s * l + r * _ * a + o * n * h - e * _ * h - o * s * a - r * n * l;
				if (0 == $) return null;
				var u = 1 / $;
				return t.m[0] = u * (s * l - h * _), t.m[1] = u * (h * o - r * l), t.m[2] = u * (r * _ - s * o), t.m[3] = u * (a * _ - n * l), t.m[4] = u * (e * l - a * o), t.m[5] = u * (n * o - e * _), t.m[6] = u * (n * h - a * s), t.m[7] = u * (a * r - e * h), t.m[8] = u * (e * s - n * r), t
			}, gt.prototype.transform = function(t, i, e) {
				null == e && (e = new Array(0, 0));
				var r = this.m;
				return e[0] = r[0] * t + r[3] * i + r[6], e[1] = r[1] * t + r[4] * i + r[7], e
			}, gt.prototype.translate = function(t, i) {
				var e = this.m;
				e[6] = e[0] * t + e[3] * i + e[6], e[7] = e[1] * t + e[4] * i + e[7], e[8] = e[2] * t + e[5] * i + e[8]
			}, gt.prototype.scale = function(t, i) {
				var e = this.m;
				e[0] *= t, e[1] *= t, e[2] *= t, e[3] *= i, e[4] *= i, e[5] *= i
			}, gt.prototype.shear = function(t, i) {
				var e = this.m,
					r = e[0] + e[3] * i,
					o = e[1] + e[4] * i,
					n = e[2] + e[5] * i;
				e[3] = e[0] * t + e[3], e[4] = e[1] * t + e[4], e[5] = e[2] * t + e[5], e[0] = r, e[1] = o, e[2] = n
			}, gt.prototype.rotate = function(t) {
				var i = this.m,
					e = Math.cos(t),
					r = Math.sin(t),
					o = i[0] * e + i[3] * r,
					n = i[1] * e + i[4] * r,
					s = i[2] * e + i[5] * r;
				i[3] = -i[0] * r + i[3] * e, i[4] = -i[1] * r + i[4] * e, i[5] = -i[2] * r + i[5] * e, i[0] = o, i[1] = n, i[2] = s
			}, gt.prototype.concatenate = function(t) {
				var i = this.m,
					e = t.m,
					r = i[0] * e[0] + i[3] * e[1] + i[6] * e[2],
					o = i[1] * e[0] + i[4] * e[1] + i[7] * e[2],
					n = i[2] * e[0] + i[5] * e[1] + i[8] * e[2],
					s = i[0] * e[3] + i[3] * e[4] + i[6] * e[5],
					_ = i[1] * e[3] + i[4] * e[4] + i[7] * e[5],
					a = i[2] * e[3] + i[5] * e[4] + i[8] * e[5],
					h = i[0] * e[6] + i[3] * e[7] + i[6] * e[8],
					l = i[1] * e[6] + i[4] * e[7] + i[7] * e[8],
					$ = i[2] * e[6] + i[5] * e[7] + i[8] * e[8];
				m[0] = r, m[1] = o, m[2] = n, m[3] = s, m[4] = _, m[5] = a, m[6] = h, m[7] = l, m[8] = $
			}, yt.prototype = new et, yt._$eT = null, yt._$tP = new Object, yt._$2o = function() {
				return null == yt._$eT && (yt._$eT = yt.getID("DST_BASE")), yt._$eT
			}, yt._$27 = function() {
				yt._$tP.clear(), yt._$eT = null
			}, yt.getID = function(t) {
				var i = yt._$tP[t];
				return null == i && (i = new yt(t), yt._$tP[t] = i), i
			}, yt.prototype._$3s = function() {
				return new yt
			}, mt.prototype = new E, mt._$9r = function(t) {
				return new Float32Array(t)
			}, mt._$vb = function(t) {
				return new Int16Array(t)
			}, mt._$cr = function(t, i) {
				return null == t || t._$yL() < i.length ? (t = mt._$9r(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
			}, mt._$mb = function(t, i) {
				return null == t || t._$yL() < i.length ? (t = mt._$vb(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
			}, mt._$Hs = function() {
				return this._$Gr
			}, mt._$as = function(t) {
				this._$Gr = t
			}, mt.prototype.getGL = function() {
				return this.gl
			}, mt.prototype.setGL = function(t) {
				this.gl = t
			}, mt.prototype.setTransform = function(t) {
				this.transform = t
			}, mt.prototype._$ZT = function() {
				var t = this.gl;
				this.firstDraw && (this.initShader(), this.firstDraw = !1, this.anisotropyExt = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic"), this.anisotropyExt && (this.maxAnisotropy = t.getParameter(this.anisotropyExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT))), t.disable(t.SCISSOR_TEST), t.disable(t.STENCIL_TEST), t.disable(t.DEPTH_TEST), t.frontFace(t.CW), t.enable(t.BLEND), t.colorMask(1, 1, 1, 1), t.bindBuffer(t.ARRAY_BUFFER, null), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null)
			}, mt.prototype._$Uo = function(t, i, e, r, o, n, s, _) {
				if (!(n < .01 && null == this.clipBufPre_clipContextMask)) {
					var a = (n > .9 && at.EXPAND_W, this.gl);
					if (null == this.gl) throw new Error("gl is null");
					var h = 1 * this._$C0 * n,
						l = 1 * this._$tT * n,
						$ = 1 * this._$WL * n,
						u = this._$lT * n;
					if (null != this.clipBufPre_clipContextMask) {
						a.frontFace(a.CCW), a.useProgram(this.shaderProgram), this._$vS = Tt(a, this._$vS, r), this._$no = Pt(a, this._$no, e), a.enableVertexAttribArray(this.a_position_Loc), a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0), this._$NT = Tt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc, 1), a.enableVertexAttribArray(this.a_texCoord_Loc), a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.getClipBufPre_clipContextMask().matrixForMask);
						var p = this.getClipBufPre_clipContextMask().layoutChannelNo,
							f = this.getChannelFlagAsColor(p);
						a.uniform4f(this.u_channelFlag, f.r, f.g, f.b, f.a);
						var c = this.getClipBufPre_clipContextMask().layoutBounds;
						a.uniform4f(this.u_baseColor_Loc, 2 * c.x - 1, 2 * c.y - 1, 2 * c._$EL() - 1, 2 * c._$5T() - 1), a.uniform1i(this.u_maskFlag_Loc, !0)
					} else if (null != this.getClipBufPre_clipContextDraw()) {
						a.useProgram(this.shaderProgramOff), this._$vS = Tt(a, this._$vS, r), this._$no = Pt(a, this._$no, e), a.enableVertexAttribArray(this.a_position_Loc_Off), a.vertexAttribPointer(this.a_position_Loc_Off, 2, a.FLOAT, !1, 0, 0), this._$NT = Tt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc_Off, 1), a.enableVertexAttribArray(this.a_texCoord_Loc_Off), a.vertexAttribPointer(this.a_texCoord_Loc_Off, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_clipMatrix_Loc_Off, !1, this.getClipBufPre_clipContextDraw().matrixForDraw), a.uniformMatrix4fv(this.u_matrix_Loc_Off, !1, this.matrix4x4), a.activeTexture(a.TEXTURE2), a.bindTexture(a.TEXTURE_2D, at.fTexture[this.glno]), a.uniform1i(this.s_texture1_Loc_Off, 2);
						var p = this.getClipBufPre_clipContextDraw().layoutChannelNo,
							f = this.getChannelFlagAsColor(p);
						a.uniform4f(this.u_channelFlag_Loc_Off, f.r, f.g, f.b, f.a), a.uniform4f(this.u_baseColor_Loc_Off, h, l, $, u)
					} else a.useProgram(this.shaderProgram), this._$vS = Tt(a, this._$vS, r), this._$no = Pt(a, this._$no, e), a.enableVertexAttribArray(this.a_position_Loc), a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0), this._$NT = Tt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc, 1), a.enableVertexAttribArray(this.a_texCoord_Loc), a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.matrix4x4), a.uniform4f(this.u_baseColor_Loc, h, l, $, u), a.uniform1i(this.u_maskFlag_Loc, !1);
					this.culling ? this.gl.enable(a.CULL_FACE) : this.gl.disable(a.CULL_FACE), this.gl.enable(a.BLEND);
					var d, g, y, m;
					if (null != this.clipBufPre_clipContextMask) d = a.ONE, g = a.ONE_MINUS_SRC_ALPHA, y = a.ONE, m = a.ONE_MINUS_SRC_ALPHA;
					else switch (s) {
					case $t._$ms:
						d = a.ONE, g = a.ONE_MINUS_SRC_ALPHA, y = a.ONE, m = a.ONE_MINUS_SRC_ALPHA;
						break;
					case $t._$ns:
						d = a.ONE, g = a.ONE, y = a.ZERO, m = a.ONE;
						break;
					case $t._$_s:
						d = a.DST_COLOR, g = a.ONE_MINUS_SRC_ALPHA, y = a.ZERO, m = a.ONE
					}
					a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(d, g, y, m), this.anisotropyExt && a.texParameteri(a.TEXTURE_2D, this.anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
					var T = e.length;
					a.drawElements(a.TRIANGLES, T, a.UNSIGNED_SHORT, 0), a.bindTexture(a.TEXTURE_2D, null)
				}
			}, mt.prototype._$Rs = function() {
				throw new Error("_$Rs")
			}, mt.prototype._$Ds = function(t) {
				throw new Error("_$Ds")
			}, mt.prototype._$K2 = function() {
				for (var t = 0; t < this.textures.length; t++) {
					0 != this.textures[t] && (this.gl._$K2(1, this.textures, t), this.textures[t] = null)
				}
			}, mt.prototype.setTexture = function(t, i) {
				this.textures[t] = i
			}, mt.prototype.initShader = function() {
				var t = this.gl;
				this.loadShaders2(), this.a_position_Loc = t.getAttribLocation(this.shaderProgram, "a_position"), this.a_texCoord_Loc = t.getAttribLocation(this.shaderProgram, "a_texCoord"), this.u_matrix_Loc = t.getUniformLocation(this.shaderProgram, "u_mvpMatrix"), this.s_texture0_Loc = t.getUniformLocation(this.shaderProgram, "s_texture0"), this.u_channelFlag = t.getUniformLocation(this.shaderProgram, "u_channelFlag"), this.u_baseColor_Loc = t.getUniformLocation(this.shaderProgram, "u_baseColor"), this.u_maskFlag_Loc = t.getUniformLocation(this.shaderProgram, "u_maskFlag"), this.a_position_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_position"), this.a_texCoord_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_texCoord"), this.u_matrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_mvpMatrix"), this.u_clipMatrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_ClipMatrix"), this.s_texture0_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture0"), this.s_texture1_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture1"), this.u_channelFlag_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_channelFlag"), this.u_baseColor_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_baseColor")
			}, mt.prototype.disposeShader = function() {
				var t = this.gl;
				this.shaderProgram && (t.deleteProgram(this.shaderProgram), this.shaderProgram = null), this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = null)
			}, mt.prototype.compileShader = function(t, i) {
				var e = this.gl,
					r = i,
					o = e.createShader(t);
				if (null == o) return _._$Ji("_$L0 to create shader"), null;
				if (e.shaderSource(o, r), e.compileShader(o), !e.getShaderParameter(o, e.COMPILE_STATUS)) {
					var n = e.getShaderInfoLog(o);
					return _._$Ji("_$L0 to compile shader : " + n), e.deleteShader(o), null
				}
				return o
			}, mt.prototype.loadShaders2 = function() {
				var t = this.gl;
				if (this.shaderProgram = t.createProgram(), !this.shaderProgram) return !1;
				if (this.shaderProgramOff = t.createProgram(), !this.shaderProgramOff) return !1;
				if (this.vertShader = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_mvpMatrix * a_position;    v_texCoord = a_texCoord;}"), !this.vertShader) return _._$Ji("Vertex shader compile _$li!"), !1;
				if (this.vertShaderOff = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;uniform mat4       u_ClipMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_ClipMatrix * a_position;    v_texCoord = a_texCoord ;}"), !this.vertShaderOff) return _._$Ji("OffVertex shader compile _$li!"), !1;
				if (this.fragShader = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform vec4       u_channelFlag;uniform vec4       u_baseColor;uniform bool       u_maskFlag;void main(){    vec4 smpColor;     if(u_maskFlag){        float isInside =             step(u_baseColor.x, v_ClipPos.x/v_ClipPos.w)          * step(u_baseColor.y, v_ClipPos.y/v_ClipPos.w)          * step(v_ClipPos.x/v_ClipPos.w, u_baseColor.z)          * step(v_ClipPos.y/v_ClipPos.w, u_baseColor.w);        smpColor = u_channelFlag * texture2D(s_texture0 , v_texCoord).a * isInside;    }else{        smpColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;    }    gl_FragColor = smpColor;}"), !this.fragShader) return _._$Ji("Fragment shader compile _$li!"), !1;
				if (this.fragShaderOff = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float ;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_channelFlag;uniform vec4       u_baseColor ;void main(){    vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;    vec4 clipMask = texture2D(s_texture1, v_ClipPos.xy / v_ClipPos.w) * u_channelFlag;    float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;    col_formask = col_formask * maskVal;    gl_FragColor = col_formask;}"), !this.fragShaderOff) return _._$Ji("OffFragment shader compile _$li!"), !1;
				if (t.attachShader(this.shaderProgram, this.vertShader), t.attachShader(this.shaderProgram, this.fragShader), t.attachShader(this.shaderProgramOff, this.vertShaderOff), t.attachShader(this.shaderProgramOff, this.fragShaderOff), t.linkProgram(this.shaderProgram), t.linkProgram(this.shaderProgramOff), !t.getProgramParameter(this.shaderProgram, t.LINK_STATUS)) {
					var i = t.getProgramInfoLog(this.shaderProgram);
					return _._$Ji("_$L0 to link program: " + i), this.vertShader && (t.deleteShader(this.vertShader), this.vertShader = 0), this.fragShader && (t.deleteShader(this.fragShader), this.fragShader = 0), this.shaderProgram && (t.deleteProgram(this.shaderProgram), this.shaderProgram = 0), this.vertShaderOff && (t.deleteShader(this.vertShaderOff), this.vertShaderOff = 0), this.fragShaderOff && (t.deleteShader(this.fragShaderOff), this.fragShaderOff = 0), this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = 0), !1
				}
				return !0
			}, mt.prototype.createFramebuffer = function() {
				var t = this.gl,
					i = at.clippingMaskBufferSize,
					e = t.createFramebuffer();
				t.bindFramebuffer(t.FRAMEBUFFER, e);
				var r = t.createRenderbuffer();
				t.bindRenderbuffer(t.RENDERBUFFER, r), t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, i, i), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.RENDERBUFFER, r);
				var o = t.createTexture();
				return t.bindTexture(t.TEXTURE_2D, o), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, i, i, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, o, 0), t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), at.fTexture[this.glno] = o, {
					framebuffer: e,
					renderbuffer: r,
					texture: at.fTexture[this.glno]
				}
			}, St.prototype._$fP = function() {
				var t, i, e, r = this._$ST();
				if (0 == (128 & r)) return 255 & r;
				if (0 == (128 & (t = this._$ST()))) return (127 & r) << 7 | 127 & t;
				if (0 == (128 & (i = this._$ST()))) return (127 & r) << 14 | (127 & t) << 7 | 255 & i;
				if (0 == (128 & (e = this._$ST()))) return (127 & r) << 21 | (127 & t) << 14 | (127 & i) << 7 | 255 & e;
				throw new lt("_$L _$0P  _")
			}, St.prototype.getFormatVersion = function() {
				return this._$S2
			}, St.prototype._$gr = function(t) {
				this._$S2 = t
			}, St.prototype._$3L = function() {
				return this._$fP()
			}, St.prototype._$mP = function() {
				return this._$zT(), this._$F += 8, this._$T.getFloat64(this._$F - 8)
			}, St.prototype._$_T = function() {
				return this._$zT(), this._$F += 4, this._$T.getFloat32(this._$F - 4)
			}, St.prototype._$6L = function() {
				return this._$zT(), this._$F += 4, this._$T.getInt32(this._$F - 4)
			}, St.prototype._$ST = function() {
				return this._$zT(), this._$T.getInt8(this._$F++)
			}, St.prototype._$9T = function() {
				return this._$zT(), this._$F += 2, this._$T.getInt16(this._$F - 2)
			}, St.prototype._$2T = function() {
				throw this._$zT(), this._$F += 8, new lt("_$L _$q read long")
			}, St.prototype._$po = function() {
				return this._$zT(), 0 != this._$T.getInt8(this._$F++)
			};
			var xt = !0;
			St.prototype._$bT = function() {
				this._$zT();
				var t = this._$3L(),
					i = null;
				if (xt) try {
					var e = new ArrayBuffer(2 * t);
					i = new Uint16Array(e);
					for (var r = 0; r < t; ++r) i[r] = this._$T.getUint8(this._$F++);
					return String.fromCharCode.apply(null, i)
				} catch (t) {
					xt = !1
				}
				try {
					var o = new Array;
					if (null == i) for (var r = 0; r < t; ++r) o[r] = this._$T.getUint8(this._$F++);
					else for (var r = 0; r < t; ++r) o[r] = i[r];
					return String.fromCharCode.apply(null, o)
				} catch (t) {
					console.log("read utf8 / _$rT _$L0 !! : " + t)
				}
			}, St.prototype._$cS = function() {
				this._$zT();
				for (var t = this._$3L(), i = new Int32Array(t), e = 0; e < t; e++) i[e] = this._$T.getInt32(this._$F), this._$F += 4;
				return i
			}, St.prototype._$Tb = function() {
				this._$zT();
				for (var t = this._$3L(), i = new Float32Array(t), e = 0; e < t; e++) i[e] = this._$T.getFloat32(this._$F), this._$F += 4;
				return i
			}, St.prototype._$5b = function() {
				this._$zT();
				for (var t = this._$3L(), i = new Float64Array(t), e = 0; e < t; e++) i[e] = this._$T.getFloat64(this._$F), this._$F += 8;
				return i
			}, St.prototype._$nP = function() {
				return this._$Jb(-1)
			}, St.prototype._$Jb = function(t) {
				if (this._$zT(), t < 0 && (t = this._$3L()), t == G._$7P) {
					var i = this._$6L();
					if (0 <= i && i < this._$Ko.length) return this._$Ko[i];
					throw new lt("_$sL _$4i @_$m0")
				}
				var e = this._$4b(t);
				return this._$Ko.push(e), e
			}, St.prototype._$4b = function(t) {
				if (0 == t) return null;
				if (50 == t) {
					var i = this._$bT(),
						e = b.getID(i);
					return e
				}
				if (51 == t) {
					var i = this._$bT(),
						e = yt.getID(i);
					return e
				}
				if (134 == t) {
					var i = this._$bT(),
						e = l.getID(i);
					return e
				}
				if (60 == t) {
					var i = this._$bT(),
						e = u.getID(i);
					return e
				}
				if (t >= 48) {
					var r = G._$9o(t);
					return null != r ? (r._$F0(this), r) : null
				}
				switch (t) {
				case 1:
					return this._$bT();
				case 10:
					return new n(this._$6L(), !0);
				case 11:
					return new S(this._$mP(), this._$mP(), this._$mP(), this._$mP());
				case 12:
					return new S(this._$_T(), this._$_T(), this._$_T(), this._$_T());
				case 13:
					return new L(this._$mP(), this._$mP());
				case 14:
					return new L(this._$_T(), this._$_T());
				case 15:
					for (var o = this._$3L(), e = new Array(o), s = 0; s < o; s++) e[s] = this._$nP();
					return e;
				case 17:
					var e = new F(this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP());
					return e;
				case 21:
					return new h(this._$6L(), this._$6L(), this._$6L(), this._$6L());
				case 22:
					return new pt(this._$6L(), this._$6L());
				case 23:
					throw new Error("_$L _$ro ");
				case 16:
				case 25:
					return this._$cS();
				case 26:
					return this._$5b();
				case 27:
					return this._$Tb();
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 18:
				case 19:
				case 20:
				case 24:
				case 28:
					throw new lt("_$6 _$q : _$nP() of 2-9 ,18,19,20,24,28 : " + t);
				default:
					throw new lt("_$6 _$q : _$nP() NO _$i : " + t)
				}
			}, St.prototype._$8L = function() {
				return 0 == this._$hL ? this._$v0 = this._$ST() : 8 == this._$hL && (this._$v0 = this._$ST(), this._$hL = 0), 1 == (this._$v0 >> 7 - this._$hL++ & 1)
			}, St.prototype._$zT = function() {
				0 != this._$hL && (this._$hL = 0)
			}, vt.prototype._$wP = function(t, i, e) {
				for (var r = 0; r < e; r++) {
					for (var o = 0; o < i; o++) {
						var n = 2 * (o + r * i);
						console.log("(% 7.3f , % 7.3f) , ", t[n], t[n + 1])
					}
					console.log("\n")
				}
				console.log("\n")
			}, Lt._$2S = Math.PI / 180, Lt._$bS = Math.PI / 180, Lt._$wS = 180 / Math.PI, Lt._$NS = 180 / Math.PI, Lt.PI_F = Math.PI, Lt._$kT = [0, .012368, .024734, .037097, .049454, .061803, .074143, .086471, .098786, .111087, .12337, .135634, .147877, .160098, .172295, .184465, .196606, .208718, .220798, .232844, .244854, .256827, .268761, .280654, .292503, .304308, .316066, .327776, .339436, .351044, .362598, .374097, .385538, .396921, .408243, .419502, .430697, .441826, .452888, .463881, .474802, .485651, .496425, .507124, .517745, .528287, .538748, .549126, .559421, .56963, .579752, .589785, .599728, .609579, .619337, .629, .638567, .648036, .657406, .666676, .675843, .684908, .693867, .70272, .711466, .720103, .72863, .737045, .745348, .753536, .76161, .769566, .777405, .785125, .792725, .800204, .807561, .814793, .821901, .828884, .835739, .842467, .849066, .855535, .861873, .868079, .874153, .880093, .885898, .891567, .897101, .902497, .907754, .912873, .917853, .922692, .92739, .931946, .936359, .940629, .944755, .948737, .952574, .956265, .959809, .963207, .966457, .96956, .972514, .97532, .977976, .980482, .982839, .985045, .987101, .989006, .990759, .992361, .993811, .995109, .996254, .997248, .998088, .998776, .999312, .999694, .999924, 1], Lt._$92 = function(t, i) {
				var e = Math.atan2(t[1], t[0]),
					r = Math.atan2(i[1], i[0]);
				return Lt._$tS(e, r)
			}, Lt._$tS = function(t, i) {
				for (var e = t - i; e < -Math.PI;) e += 2 * Math.PI;
				for (; e > Math.PI;) e -= 2 * Math.PI;
				return e
			}, Lt._$9 = function(t) {
				return Math.sin(t)
			}, Lt.fcos = function(t) {
				return Math.cos(t)
			}, Mt.prototype._$u2 = function() {
				return this._$IS[0]
			}, Mt.prototype._$yo = function() {
				return this._$AT && !this._$IS[0]
			}, Mt.prototype._$GT = function() {
				return this._$e0
			}, Et._$W2 = 0, Et.SYSTEM_INFO = null, Et.USER_AGENT = navigator.userAgent, Et.isIPhone = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isIPhone
			}, Et.isIOS = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isIPhone || Et.SYSTEM_INFO._isIPad
			}, Et.isAndroid = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isAndroid
			}, Et.getOSVersion = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO.version
			}, Et.getOS = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isIPhone || Et.SYSTEM_INFO._isIPad ? "iOS" : Et.SYSTEM_INFO._isAndroid ? "Android" : "_$Q0 OS"
			}, Et.setup = function() {
				function t(t, i) {
					for (var e = t.substring(i).split(/[ _,;\.]/), r = 0, o = 0; o <= 2 && !isNaN(e[o]); o++) {
						var n = parseInt(e[o]);
						if (n < 0 || n > 999) {
							_._$li("err : " + n + " @UtHtml5.setup()"), r = 0;
							break
						}
						r += n * Math.pow(1e3, 2 - o)
					}
					return r
				}
				var i, e = Et.USER_AGENT,
					r = Et.SYSTEM_INFO = {
						userAgent: e
					};
				if ((i = e.indexOf("iPhone OS ")) >= 0) r.os = "iPhone", r._isIPhone = !0, r.version = t(e, i + "iPhone OS ".length);
				else if ((i = e.indexOf("iPad")) >= 0) {
					if ((i = e.indexOf("CPU OS")) < 0) return void _._$li(" err : " + e + " @UtHtml5.setup()");
					r.os = "iPad", r._isIPad = !0, r.version = t(e, i + "CPU OS ".length)
				} else(i = e.indexOf("Android")) >= 0 ? (r.os = "Android", r._isAndroid = !0, r.version = t(e, i + "Android ".length)) : (r.os = "-", r.version = -1)
			}, window.UtSystem = w, window.UtDebug = _, window.LDTransform = gt, window.LDGL = nt, window.Live2D = at, window.Live2DModelWebGL = ft, window.Live2DModelJS = q, window.Live2DMotion = J, window.MotionQueueManager = ct, window.PhysicsHair = f, window.AMotion = s, window.PartsDataID = l, window.DrawDataID = b, window.BaseDataID = yt, window.ParamID = u, at.init();
			var At = !1
		}()
	}).call(i, e(7))
}, function(t, i) {
	t.exports = {
		import: function() {
			throw new Error("System.import cannot be used indirectly")
		}
	}
}, function(t, i, e) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
		default:
			t
		}
	}
	function o() {
		this.models = [], this.count = -1, this.reloadFlg = !1, Live2D.init(), n.Live2DFramework.setPlatformManager(new _.
	default)
	}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.
default = o;
	var n = e(0),
		s = e(9),
		_ = r(s),
		a = e(10),
		h = r(a),
		l = e(1),
		$ = r(l);
	o.prototype.createModel = function() {
		var t = new h.
	default;
		return this.models.push(t), t
	}, o.prototype.changeModel = function(t, i) {
		if (this.reloadFlg) {
			this.reloadFlg = !1;
			this.releaseModel(0, t), this.createModel(), this.models[0].load(t, i)
		}
	}, o.prototype.getModel = function(t) {
		return t >= this.models.length ? null : this.models[t]
	}, o.prototype.releaseModel = function(t, i) {
		this.models.length <= t || (this.models[t].release(i), delete this.models[t], this.models.splice(t, 1))
	}, o.prototype.numModels = function() {
		return this.models.length
	}, o.prototype.setDrag = function(t, i) {
		for (var e = 0; e < this.models.length; e++) this.models[e].setDrag(t, i)
	}, o.prototype.maxScaleEvent = function() {
		$.
	default.DEBUG_LOG && console.log("Max scale event.");
		for (var t = 0; t < this.models.length; t++) this.models[t].startRandomMotion($.
	default.MOTION_GROUP_PINCH_IN, $.
	default.PRIORITY_NORMAL)
	}, o.prototype.minScaleEvent = function() {
		$.
	default.DEBUG_LOG && console.log("Min scale event.");
		for (var t = 0; t < this.models.length; t++) this.models[t].startRandomMotion($.
	default.MOTION_GROUP_PINCH_OUT, $.
	default.PRIORITY_NORMAL)
	}, o.prototype.tapEvent = function(t, i) {
		$.
	default.DEBUG_LOG && console.log("tapEvent view x:" + t + " y:" + i);
		for (var e = 0; e < this.models.length; e++) this.models[e].hitTest($.
	default.HIT_AREA_HEAD, t, i) ? ($.
	default.DEBUG_LOG && console.log("Tap face."), this.models[e].setRandomExpression()):
		this.models[e].hitTest($.
	default.HIT_AREA_BODY, t, i) ? ($.
	default.DEBUG_LOG && console.log("Tap body. models[" + e + "]"), this.models[e].startRandomMotion($.
	default.MOTION_GROUP_TAP_BODY, $.
	default.PRIORITY_NORMAL)) : this.models[e].hitTestCustom("head", t, i) ? ($.
	default.DEBUG_LOG && console.log("Tap face."), this.models[e].startRandomMotion($.
	default.MOTION_GROUP_FLICK_HEAD, $.
	default.PRIORITY_NORMAL)) : this.models[e].hitTestCustom("body", t, i) && ($.
	default.DEBUG_LOG && console.log("Tap body. models[" + e + "]"), this.models[e].startRandomMotion($.
	default.MOTION_GROUP_TAP_BODY, $.
	default.PRIORITY_NORMAL));
		return !0
	}
}, function(t, i, e) {
	"use strict";

	function r() {}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.
default = r;
	var o = e(2);
	r.prototype.loadBytes = function(t, i) {
		var e = new XMLHttpRequest;
		e.open("GET", t, !0), e.responseType = "arraybuffer", e.onload = function() {
			switch (e.status) {
			case 200:
				i(e.response);
				break;
			default:
				console.error("Failed to load (" + e.status + ") : " + t)
			}
		}, e.send(null)
	}, r.prototype.loadString = function(t) {
		this.loadBytes(t, function(t) {
			return t
		})
	}, r.prototype.loadLive2DModel = function(t, i) {
		var e = null;
		this.loadBytes(t, function(t) {
			e = Live2DModelWebGL.loadModel(t), i(e)
		})
	}, r.prototype.loadTexture = function(t, i, e, r) {
		var n = new Image;
		n.crossOrigin = "Anonymous", n.src = e;
		n.onload = function() {
			var e = (0, o.getContext)(),
				s = e.createTexture();
			if (!s) return console.error("Failed to generate gl texture name."), -1;
			0 == t.isPremultipliedAlpha() && e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, s), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, n), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR_MIPMAP_NEAREST), e.generateMipmap(e.TEXTURE_2D), t.setTexture(i, s), s = null, "function" == typeof r && r()
		}, n.onerror = function() {
			console.error("Failed to load image : " + e)
		}
	}, r.prototype.jsonParseFromBytes = function(t) {
		var i, e = new Uint8Array(t, 0, 3);
		return i = 239 == e[0] && 187 == e[1] && 191 == e[2] ? String.fromCharCode.apply(null, new Uint8Array(t, 3)) : String.fromCharCode.apply(null, new Uint8Array(t)), JSON.parse(i)
	}, r.prototype.log = function(t) {}
}, function(t, i, e) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
		default:
			t
		}
	}
	function o() {
		n.L2DBaseModel.prototype.constructor.call(this), this.modelHomeDir = "", this.modelSetting = null, this.tmpMatrix = []
	}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.
default = o;
	var n = e(0),
		s = e(11),
		_ = r(s),
		a = e(1),
		h = r(a),
		l = e(3),
		$ = r(l);
	o.prototype = new n.L2DBaseModel, o.prototype.load = function(t, i, e) {
		this.setUpdating(!0), this.setInitialized(!1), this.modelHomeDir = i.substring(0, i.lastIndexOf("/") + 1), this.modelSetting = new _.
	default;
		var r = this;
		this.modelSetting.loadModelSetting(i, function() {
			var t = r.modelHomeDir + r.modelSetting.getModelFile();
			r.loadModelData(t, function(t) {
				for (var i = 0; i < r.modelSetting.getTextureNum(); i++) {
					if (/^https?:\/\/|^\/\//i.test(r.modelSetting.getTextureFile(i))) var o = r.modelSetting.getTextureFile(i);
					else var o = r.modelHomeDir + r.modelSetting.getTextureFile(i);
					r.loadTexture(i, o, function() {
						if (r.isTexLoaded) {
							if (r.modelSetting.getExpressionNum() > 0) {
								r.expressions = {};
								for (var t = 0; t < r.modelSetting.getExpressionNum(); t++) {
									var i = r.modelSetting.getExpressionName(t),
										o = r.modelHomeDir + r.modelSetting.getExpressionFile(t);
									r.loadExpression(i, o)
								}
							} else r.expressionManager = null, r.expressions = {};
							if (r.eyeBlink, null != r.modelSetting.getPhysicsFile() ? r.loadPhysics(r.modelHomeDir + r.modelSetting.getPhysicsFile()) : r.physics = null, null != r.modelSetting.getPoseFile() ? r.loadPose(r.modelHomeDir + r.modelSetting.getPoseFile(), function() {
								r.pose.updateParam(r.live2DModel)
							}) : r.pose = null, null != r.modelSetting.getLayout()) {
								var n = r.modelSetting.getLayout();
								null != n.width && r.modelMatrix.setWidth(n.width), null != n.height && r.modelMatrix.setHeight(n.height), null != n.x && r.modelMatrix.setX(n.x), null != n.y && r.modelMatrix.setY(n.y), null != n.center_x && r.modelMatrix.centerX(n.center_x), null != n.center_y && r.modelMatrix.centerY(n.center_y), null != n.top && r.modelMatrix.top(n.top), null != n.bottom && r.modelMatrix.bottom(n.bottom), null != n.left && r.modelMatrix.left(n.left), null != n.right && r.modelMatrix.right(n.right)
							}
							if (null != r.modelSetting.getHitAreasCustom()) {
								var s = r.modelSetting.getHitAreasCustom();
								null != s.head_x && (h.
							default.hit_areas_custom_head_x = s.head_x), null != s.head_y && (h.
							default.hit_areas_custom_head_y = s.head_y), null != s.body_x && (h.
							default.hit_areas_custom_body_x = s.body_x), null != s.body_y && (h.
							default.hit_areas_custom_body_y = s.body_y)
							}
							for (var t = 0; t < r.modelSetting.getInitParamNum(); t++) r.live2DModel.setParamFloat(r.modelSetting.getInitParamID(t), r.modelSetting.getInitParamValue(t));
							for (var t = 0; t < r.modelSetting.getInitPartsVisibleNum(); t++) r.live2DModel.setPartsOpacity(r.modelSetting.getInitPartsVisibleID(t), r.modelSetting.getInitPartsVisibleValue(t));
							r.live2DModel.saveParam(), r.preloadMotionGroup(h.
						default.MOTION_GROUP_IDLE), r.preloadMotionGroup(h.
						default.MOTION_GROUP_SLEEPY), r.mainMotionManager.stopAllMotions(), r.setUpdating(!1), r.setInitialized(!0), "function" == typeof e && e()
						}
					})
				}
			})
		})
	}, o.prototype.release = function(t) {
		var i = n.Live2DFramework.getPlatformManager();
		t.deleteTexture(i.texture)
	}, o.prototype.preloadMotionGroup = function(t) {
		for (var i = this, e = 0; e < this.modelSetting.getMotionNum(t); e++) {
			var r = this.modelSetting.getMotionFile(t, e);
			this.loadMotion(r, this.modelHomeDir + r, function(r) {
				r.setFadeIn(i.modelSetting.getMotionFadeIn(t, e)), r.setFadeOut(i.modelSetting.getMotionFadeOut(t, e))
			})
		}
	}, o.prototype.update = function() {
		if (null == this.live2DModel) return void(h.
	default.DEBUG_LOG && console.error("Failed to update."));
		var t = UtSystem.getUserTimeMSec() - this.startTimeMSec,
			i = t / 1e3,
			e = 2 * i * Math.PI;
		if (this.mainMotionManager.isFinished()) {
			"1" === sessionStorage.getItem("Sleepy") ? this.startRandomMotion(h.
		default.MOTION_GROUP_SLEEPY, h.
		default.PRIORITY_SLEEPY) : this.startRandomMotion(h.
		default.MOTION_GROUP_IDLE, h.
		default.PRIORITY_IDLE)
		}
		this.live2DModel.loadParam(), this.mainMotionManager.updateParam(this.live2DModel) || null != this.eyeBlink && this.eyeBlink.updateParam(this.live2DModel), this.live2DModel.saveParam(), null == this.expressionManager || null == this.expressions || this.expressionManager.isFinished() || this.expressionManager.updateParam(this.live2DModel), this.live2DModel.addToParamFloat("PARAM_ANGLE_X", 30 * this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", 30 * this.dragY, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", this.dragX * this.dragY * -30, 1), this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", 10 * this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_X", Number(15 * Math.sin(e / 6.5345)), .5), this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", Number(8 * Math.sin(e / 3.5345)), .5), this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", Number(10 * Math.sin(e / 5.5345)), .5), this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", Number(4 * Math.sin(e / 15.5345)), .5), this.live2DModel.setParamFloat("PARAM_BREATH", Number(.5 + .5 * Math.sin(e / 3.2345)), 1), null != this.physics && this.physics.updateParam(this.live2DModel), null == this.lipSync && this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y", this.lipSyncValue), null != this.pose && this.pose.updateParam(this.live2DModel), this.live2DModel.update()
	}, o.prototype.setRandomExpression = function() {
		var t = [];
		for (var i in this.expressions) t.push(i);
		var e = parseInt(Math.random() * t.length);
		this.setExpression(t[e])
	}, o.prototype.startRandomMotion = function(t, i) {
		var e = this.modelSetting.getMotionNum(t),
			r = parseInt(Math.random() * e);
		this.startMotion(t, r, i)
	}, o.prototype.startMotion = function(t, i, e) {
		var r = this.modelSetting.getMotionFile(t, i);
		if (null == r || "" == r) return void(h.
	default.DEBUG_LOG && console.error("Failed to motion."));
		if (e == h.
	default.PRIORITY_FORCE) this.mainMotionManager.setReservePriority(e);
		else if (!this.mainMotionManager.reserveMotion(e)) return void(h.
	default.DEBUG_LOG && console.log("Motion is running."));
		var o, n = this;
		null == this.motions[t] ? this.loadMotion(null, this.modelHomeDir + r, function(r) {
			o = r, n.setFadeInFadeOut(t, i, e, o)
		}) : (o = this.motions[t], n.setFadeInFadeOut(t, i, e, o))
	}, o.prototype.setFadeInFadeOut = function(t, i, e, r) {
		var o = this.modelSetting.getMotionFile(t, i);
		if (r.setFadeIn(this.modelSetting.getMotionFadeIn(t, i)), r.setFadeOut(this.modelSetting.getMotionFadeOut(t, i)), h.
	default.DEBUG_LOG && console.log("Start motion : " + o), null == this.modelSetting.getMotionSound(t, i)) this.mainMotionManager.startMotionPrio(r, e);
		else {
			var n = this.modelSetting.getMotionSound(t, i),
				s = document.createElement("audio");
			s.src = this.modelHomeDir + n, h.
		default.DEBUG_LOG && console.log("Start sound : " + n), s.play(), this.mainMotionManager.startMotionPrio(r, e)
		}
	}, o.prototype.setExpression = function(t) {
		var i = this.expressions[t];
		h.
	default.DEBUG_LOG && console.log("Expression : " + t), this.expressionManager.startMotion(i, !1)
	}, o.prototype.draw = function(t) {
		$.
	default.push(), $.
	default.multMatrix(this.modelMatrix.getArray()), this.tmpMatrix = $.
	default.getMatrix(), this.live2DModel.setMatrix(this.tmpMatrix), this.live2DModel.draw(), $.
	default.pop()
	}, o.prototype.hitTest = function(t, i, e) {
		for (var r = this.modelSetting.getHitAreaNum(), o = 0; o < r; o++) if (t == this.modelSetting.getHitAreaName(o)) {
			var n = this.modelSetting.getHitAreaID(o);
			return this.hitTestSimple(n, i, e)
		}
		return !1
	}, o.prototype.hitTestCustom = function(t, i, e) {
		return "head" == t ? this.hitTestSimpleCustom(h.
	default.hit_areas_custom_head_x, h.
	default.hit_areas_custom_head_y, i, e) : "body" == t && this.hitTestSimpleCustom(h.
	default.hit_areas_custom_body_x, h.
	default.hit_areas_custom_body_y, i, e)
	}
}, function(t, i, e) {
	"use strict";

	function r() {
		this.NAME = "name", this.ID = "id", this.MODEL = "model", this.TEXTURES = "textures", this.HIT_AREAS = "hit_areas", this.PHYSICS = "physics", this.POSE = "pose", this.EXPRESSIONS = "expressions", this.MOTION_GROUPS = "motions", this.SOUND = "sound", this.FADE_IN = "fade_in", this.FADE_OUT = "fade_out", this.LAYOUT = "layout", this.HIT_AREAS_CUSTOM = "hit_areas_custom", this.INIT_PARAM = "init_param", this.INIT_PARTS_VISIBLE = "init_parts_visible", this.VALUE = "val", this.FILE = "file", this.json = {}
	}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.
default = r;
	var o = e(0);
	r.prototype.loadModelSetting = function(t, i) {
		var e = this;
		o.Live2DFramework.getPlatformManager().loadBytes(t, function(t) {
			var r = String.fromCharCode.apply(null, new Uint8Array(t));
			e.json = JSON.parse(r), i()
		})
	}, r.prototype.getTextureFile = function(t) {
		return null == this.json[this.TEXTURES] || null == this.json[this.TEXTURES][t] ? null : this.json[this.TEXTURES][t]
	}, r.prototype.getModelFile = function() {
		return this.json[this.MODEL]
	}, r.prototype.getTextureNum = function() {
		return null == this.json[this.TEXTURES] ? 0 : this.json[this.TEXTURES].length
	}, r.prototype.getHitAreaNum = function() {
		return null == this.json[this.HIT_AREAS] ? 0 : this.json[this.HIT_AREAS].length
	}, r.prototype.getHitAreaID = function(t) {
		return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.ID]
	}, r.prototype.getHitAreaName = function(t) {
		return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.NAME]
	}, r.prototype.getPhysicsFile = function() {
		return this.json[this.PHYSICS]
	}, r.prototype.getPoseFile = function() {
		return this.json[this.POSE]
	}, r.prototype.getExpressionNum = function() {
		return null == this.json[this.EXPRESSIONS] ? 0 : this.json[this.EXPRESSIONS].length
	}, r.prototype.getExpressionFile = function(t) {
		return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.FILE]
	}, r.prototype.getExpressionName = function(t) {
		return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.NAME]
	}, r.prototype.getLayout = function() {
		return this.json[this.LAYOUT]
	}, r.prototype.getHitAreasCustom = function() {
		return this.json[this.HIT_AREAS_CUSTOM]
	}, r.prototype.getInitParamNum = function() {
		return null == this.json[this.INIT_PARAM] ? 0 : this.json[this.INIT_PARAM].length
	}, r.prototype.getMotionNum = function(t) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] ? 0 : this.json[this.MOTION_GROUPS][t].length
	}, r.prototype.getMotionFile = function(t, i) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] ? null : this.json[this.MOTION_GROUPS][t][i][this.FILE]
	}, r.prototype.getMotionSound = function(t, i) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.SOUND] ? null : this.json[this.MOTION_GROUPS][t][i][this.SOUND]
	}, r.prototype.getMotionFadeIn = function(t, i) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_IN] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_IN]
	}, r.prototype.getMotionFadeOut = function(t, i) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT]
	}, r.prototype.getInitParamID = function(t) {
		return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? null : this.json[this.INIT_PARAM][t][this.ID]
	}, r.prototype.getInitParamValue = function(t) {
		return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? NaN : this.json[this.INIT_PARAM][t][this.VALUE]
	}, r.prototype.getInitPartsVisibleNum = function() {
		return null == this.json[this.INIT_PARTS_VISIBLE] ? 0 : this.json[this.INIT_PARTS_VISIBLE].length
	}, r.prototype.getInitPartsVisibleID = function(t) {
		return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? null : this.json[this.INIT_PARTS_VISIBLE][t][this.ID]
	}, r.prototype.getInitPartsVisibleValue = function(t) {
		return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? NaN : this.json[this.INIT_PARTS_VISIBLE][t][this.VALUE]
	}
}]);


//waifu-tips.js

$(document).on('copy', function() {
	showMessage('你都复制了些什么呀，转载要记得加上出处哦', 8000);
});
$('.waifu-tool .fa-home').click(function() {
	try {
		if (typeof(ajax) === "function") ajax(window.location.protocol + '//' + window.location.hostname + '/', "pagelink");
		else window.location = window.location.protocol + '//' + window.location.hostname + '/';
	} catch (e) {}
});
var model_p = 22;
$('.waifu-tool .fa-drivers-license-o').click(function() {
	loadlive2d('live2d', xb.thome + '/inc/model/api.php?p=' + model_p + '&model=rand');
	if (model_p === 22) {
		model_p = 33;
		showMessage('33援交有点累了，现在该我上场了', 4000);
	} else {
		model_p = 22;
		showMessage('我又回来了！', 4000);
	}
});
$('.waifu-tool .fa-comments').click(function() {
	showHitokoto();
});
$('.waifu-tool .fa-street-view').click(function() {
	if (model_p === 22) loadlive2d('live2d', xb.thome + '/inc/model/api.php?p=33&model=rand');
	else loadlive2d('live2d', xb.thome + '/inc/model/api.php?p=22&model=rand');
	showMessage('我的新衣服好看嘛', 4000);
});
$('.waifu-tool .fa-info-circle').click(function() {
	window.open('https://www.fczbl.vip/946.html');
});
$('.waifu-tool .fa-camera').click(function() {
	showMessage('照好了嘛，是不是很可爱呢？', 5000);
	window.Live2D.captureName = model_p + '.png';
	window.Live2D.captureFrame = true;
});
$('.waifu-tool .fa-close').click(function() {
	sessionStorage.setItem('waifu-dsiplay', 'none');
	showMessage('愿你有一天能与重要的人重逢', 2000);
	window.setTimeout(function() {
		$('.waifu').hide();
	}, 1000);
});
loadlive2d('live2d', xb.thome + '/inc/model/api.php?p=33&model=default');

function showHitokoto() {
	$.post("https://api.fczbl.vip/hitokoto/", function(result) {
		showMessage(result);
	});
}

function showMessage(a, b) {
	if (b == null) b = 10000;
	jQuery(".waifu-tips").hide().stop();
	jQuery(".waifu-tips").html(a);
	jQuery(".waifu-tips").fadeTo("10", 1);
	jQuery(".waifu-tips").fadeOut(b);
}(function() {
	var text;
	var SiteIndexUrl = window.location.protocol + '//' + window.location.hostname + '/';
	if (window.location.href == SiteIndexUrl) {
		var now = (new Date()).getHours();
		if (now > 23 || now <= 5) {
			text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
		} else if (now > 5 && now <= 7) {
			text = '早上好！一日之计在于晨，美好的一天就要开始了';
		} else if (now > 7 && now <= 11) {
			text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
		} else if (now > 11 && now <= 14) {
			text = '中午了，工作了一个上午，现在是午餐时间！';
		} else if (now > 14 && now <= 17) {
			text = '午后很容易犯困呢，今天的运动目标完成了吗？';
		} else if (now > 17 && now <= 19) {
			text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
		} else if (now > 19 && now <= 21) {
			text = '晚上好，今天过得怎么样？';
		} else if (now > 21 && now <= 23) {
			text = '已经这么晚了呀，早点休息吧，晚安~';
		} else {
			text = '嗨~ 快来逗我玩吧！';
		}
	} else {
		if (document.referrer !== '') {
			var referrer = document.createElement('a');
			referrer.href = document.referrer;
			var domain = referrer.hostname.split('.')[1];
			if (window.location.hostname == referrer.hostname) {
				text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
			} else if (domain == 'baidu') {
				text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
			} else if (domain == 'so') {
				text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
			} else if (domain == 'google') {
				text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
			} else {
				text = 'Hello! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
			}
		} else {
			text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
		}
	}
	$(".waifu").animate({
		top: $(window).height() - 250
	}, 800);
	showMessage(text, 8000);
})();
$(window).resize(function() {
	$(".waifu").css('top', window.innerHeight - 250);
});
$("#live2d").mouseover(function() {
	msgs = ["你要干嘛呀？", "鼠…鼠标放错地方了！", "大笨蛋有没有记住我们的域名？是acgxue.net哦！", "你在羡慕我长的可爱？", "坏人！怕怕", "你看到我的小熊了吗"];
	var i = Math.floor(Math.random() * msgs.length);
	showMessage(msgs[i]);
});
jQuery(document).ready(function($) {
	$('.search-box').mouseover(function() {
		showMessage('找不到想要的？试试搜索吧！');
	});
	$('#search').focus(function() {
		showMessage('输入你想搜索的关键词再按Enter键就可以搜索啦!');
	});
	$('.desc a h2,.desc a span,.color-logo a,.back-index,.waifu-tool .fa-home,#kratos-primary-menu .fa-home').mouseover(function() {
		showMessage('点它就可以回到首页啦！');
	});
	$('#footer p a i.fa-weibo').mouseover(function() {
		showMessage('微博？求关注喵！');
	});
	$('#footer p a i.fa-envelope').mouseover(function() {
		showMessage('邮件我会及时回复的！');
	});
	$('#footer p a i.fa-twitter').mouseover(function() {
		showMessage('Twitter?好像是不存在的东西?');
	});
	$('#footer p a i.fa-facebook-official').mouseover(function() {
		showMessage('emmm...FB已经好久没上了...');
	});
	$('#footer p a i.fa-github').mouseover(function() {
		showMessage('GayHub！我是新手！');
	});
	$('#wechat-img').mouseover(function() {
		showMessage('这是我的微信二维码~');
	});
	$('.gotop-box').mouseover(function() {
		showMessage('要回到开始的地方么？');
	});
	$('.waifu-tool .fa-comments').mouseover(function() {
		showMessage('猜猜我要说些什么？');
	});
	$('.waifu-tool .fa-drivers-license-o').mouseover(function() {
		if (model_p === 22) showMessage('要见见我的姐姐嘛');
		else showMessage('什么？我的服务不好，要33回来？');
	});
	$('.waifu-tool .fa-street-view').mouseover(function() {
		showMessage('喜欢换装play吗？');
	});
	$('.waifu-tool .fa-camera').mouseover(function() {
		showMessage('你要给我拍照呀？一二三～茄子～');
	});
	$('.waifu-tool .fa-info-circle').mouseover(function() {
		showMessage('想知道更多关于我的事么？');
	});
	$('.waifu-tool .fa-close').mouseover(function() {
		showMessage('到了要说再见的时候了吗');
	});
	$(document).on("click", "h2 a", function() {
		showMessage('加载<span style="color:#0099cc;">' + $(this).text() + '</span>中...请稍候', 600);
	});
	$(document).on("mouseover", "h2 a", function() {
		showMessage('要看看<span style="color:#0099cc;">' + $(this).text() + '</span>么？');
	});
	$(document).on("mouseover", ".prev", function() {
		showMessage('要翻到上一页吗?');
	});
	$(document).on("mouseover", ".next", function() {
		showMessage('要翻到下一页吗?');
	});
	$(document).on("mouseover", ".kratos-post-content a", function() {
		showMessage('去 <span style="color:#0099cc;">' + $(this).text() + '</span> 逛逛吧');
	});
	$(document).on("mouseover", "#submit", function() {
		showMessage('呐 首次评论需要审核，请耐心等待哦~');
	});
	$(document).on("mouseover", ".OwO-logo", function() {
		showMessage('要来一发表情吗？');
	});
	$(document).on("mouseover", ".nav-previous", function() {
		showMessage('点它可以后退哦！');
	});
	$(document).on("mouseover", ".nav-next", function() {
		showMessage('点它可以前进哦！');
	});
	$(document).on("mouseover", ".comment-reply-link", function() {
		showMessage('要说点什么吗');
	});
	$(document).on("mouseover", ".Donate", function() {
		showMessage('要打赏我嘛？好期待啊~');
	});
	$(document).on("mouseover", ".Love", function() {
		showMessage('我是不是棒棒哒~快给我点赞吧！');
	});
	$(document).on("mouseover", ".must-log-in", function() {
		showMessage('登录才可以继续哦~');
	});
	$(document).on("mouseover", ".Share", function() {
		showMessage('好东西要让更多人知道才行哦');
	});
	$(document).on("click", "#author", function() {
		showMessage("留下你的尊姓大名！");
	});
	$(document).on("click", "#email", function() {
		showMessage("留下你的邮箱，不然就是无头像人士了！");
	});
	$(document).on("click", "#url", function() {
		showMessage("快快告诉我你的家在哪里，好让我去参观参观！");
	});
	$(document).on("click", "#comment", function() {
		showMessage("一定要认真填写喵~");
	});
});
jQuery(document).ready(function($) {
	window.setInterval(function() {
		showMessage(showHitokoto());
	}, 25000);
	var stat_click = 0;
	$("#live2d").click(function() {
		if (!ismove) {
			stat_click++;
			if (stat_click > 6) {
				msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了", "非礼呀！救命！", "OH，My ladygaga", "110吗，这里有个变态一直在摸我(ó﹏ò｡)"];
				var i = Math.floor(Math.random() * msgs.length);
			} else {
				msgs = ["是…是不小心碰到了吧", "我跑呀跑呀跑！~~", "再摸的话我可要报警了！⌇●﹏●⌇", "别摸我，有什么好摸的！", "惹不起你，我还躲不起你么？", "不要摸我了，我会告诉老婆来打你的！", "干嘛动我呀！小心我咬你！"];
				var i = Math.floor(Math.random() * msgs.length);
			}
			s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75];
			var i1 = Math.floor(Math.random() * s.length);
			var i2 = Math.floor(Math.random() * s.length);
			$(".waifu").animate({
				left: (document.body.offsetWidth - 210) / 2 * (1 + s[i1]),
				top: (window.innerHeight - 240) - (window.innerHeight - 240) / 2 * (1 - s[i2])
			}, {
				duration: 500,
				complete: showMessage(msgs[i])
			});
		} else {
			ismove = false;
		}
	});
});
var ismove = false;
jQuery(document).ready(function($) {
	var box = $('.waifu')[0];
	var topCount = 20;
	box.onmousedown = function(e) {
		var Ox = e.offsetX;
		var Oy = e.offsetY;
		var Ch = document.documentElement.clientHeight;
		var Cw = document.documentElement.clientWidth;
		document.onmousemove = function(e) {
			var Cx = e.clientX;
			var Cy = e.clientY;
			box.style.left = Cx - Ox + "px";
			box.style.top = Cy - Oy + "px";
			if (box.offsetLeft < 0) {
				box.style.left = 0;
			} else if (box.offsetLeft + box.offsetWidth > Cw) {
				box.style.left = Cw - box.offsetWidth + "px";
			}
			if (box.offsetTop - topCount < 0) {
				box.style.top = topCount + "px";
			} else if (box.offsetTop + box.offsetHeight - topCount > Ch) {
				box.style.top = Ch - (box.offsetHeight - topCount) + "px";
			}
			ismove = true;
		};
		document.onmouseup = function(e) {
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
});