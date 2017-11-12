var set_locale_to = function (locale) {
	if (locale) {
		$.i18n().locale = locale;
	}
	$('body').i18n();
	$('.translate').each(function () {
		var args = [], $this = $(this);
		if ($this.data('args')) {
			args = $this.data('args').split(',');
		}
		$this.html($.i18n.apply(null, args));
	})
};

jQuery(function () {
	$.i18n().load({
		'en': '../js/i18n/en.json',
		'ru': '../js/i18n/ru.json'
	}).done(function () {
		set_locale_to(url('?locale'));

		History.Adapter.bind(window, 'statechange', function () {
			set_locale_to(url('?locale'));
		});

		$('.switch-locale').on('click', 'a', function (e) {
			e.preventDefault();
			History.pushState(null, null, "?locale=" + $(this).data('locale'));
		});
	});
});
jQuery(function() {
	$.extend($.i18n.parser.emitter, {
		sitename: function() {
			return "Demo";
		}
	});
});