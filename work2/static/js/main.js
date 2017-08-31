// JavaScript Document
'use strict';

$(document).ready(function(e) {
	/* Owl sliders */
	$('#post-slider-1').owlCarousel({
		singleItem: true,
		navigation: true,
		navigationText: false,
		pagination: false
	});
	$('#post-images-slider-1').owlCarousel({
		singleItem: true
	});
	$('#blog-post-images-slider').owlCarousel({
		navigation: true,
		navigationText: false,
		singleItem: true
    });
	$('#products-slider-1').owlCarousel({
		singleItem: true
    });
	$('#gallery-slider').owlCarousel({
		singleItem: true
	});
	$('#testimonials-slider').owlCarousel({
		singleItem: true
	});
	$('#services-slider').owlCarousel({
		items: 5,
		pagination: false
	});
	$('#feed-post-slider').owlCarousel({
		singleItem: true,
		pagination: false,
		navigation: true,
		navigationText: false
	});
	
	/* Main slider */
	if(typeof MasterSlider == 'function') {
		var slider = new MasterSlider();
		slider.setup('masterslider' , {
			width: 1250,    // slider standard width
			height: 450,    // slider standard height
			view: 'basic',
			layout: 'fillwidth',
			speed: 20
		});
		slider.control('bullets', {autohide:false});
		slider.control('arrows');
	}
	
	/* Menu trigger */
	var nav_top = $('#nav-top');
	$('#menu-button').on('click', function(e) {
        nav_top.stop().slideToggle();
    });
	
	/* Re-show menu on resize if it was hidden by js */
	var menu_button_container_el = $('.menu-button-container');
	$(window).resize(function(e) {
        if((menu_button_container_el.css('display') == "none") && (nav_top.css('display') == "none"))
    		nav_top.stop().slideDown();
	});
	
	/* in page scrolling */
	$('.scroll-to').on('click', function(e) {
		e.preventDefault();
		$.scrollTo($(this).attr('href'), 800, {axis:'y'});
	});
	
	/* Forms */
	$('#rss-subscribe').on('submit', function(e) {
		return form_to_ajax_request($(this), ['email'], ['email']);
	});
	$('#contact-form').on('submit', function(e) {
		return form_to_ajax_request($(this), ['email', 'name', 'message'], ['email', 'name', 'message']);
	});
	$('#contact-form-alt').on('submit', function(e) {
		return form_to_ajax_request($(this), ['email', 'name', 'subject', 'message'], ['email', 'name', 'subject', 'message']);
	});
	
	/* On-scroll animations */
	var on_scroll_anims = $('.onscroll-animate');
	for (var i=0; i<on_scroll_anims.length; i++) {
		var element = on_scroll_anims.eq(i);
		element.one('inview', function (event, visible) {
			var el = $(this);
			var anim = (el.data("animation") !== undefined) ? el.data("animation") : "fadeIn";
			var delay = (el.data("delay") !== undefined ) ? el.data("delay") : 200;

			var timer = setTimeout(function() {
				el.addClass(anim);
				clearTimeout(timer);
			}, delay);
		});
	}
	
	/* Top menu switch */
	var page_header_el = $('.page-header');
	$(window).scroll(function(e) {
        if($(window).scrollTop() >= 165) {
			page_header_el.addClass('fixed-header');
		}
		else if(page_header_el.hasClass('fixed-header')) {
			page_header_el.removeClass('fixed-header');
		}
	});
	
	googleMap();
	
	/* Google Map */
	function googleMap() {
		var map_canvas = $('#map-canvas');
		if(map_canvas.length == 0)
			return;
		var map;
		var myLatlng = new google.maps.LatLng(55.815777, 37.525333);
		var center = new google.maps.LatLng(55.810666, 37.486908);
		function mapInitialize() {
			var mapOptions = {
				scrollwheel: false,
				zoom: 14,
				center: center
			};
			
				
			map = new google.maps.Map(map_canvas.get(0), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map
			});
		}
		google.maps.event.addDomListener(window, 'load', mapInitialize);
	}
});



$(window).load(function(e) {
	var parallax_backgrounds = $('.parallax-background');
	for (var i=0; i<parallax_backgrounds.length; i++) {
		var el = parallax_backgrounds.eq(i);
		if(!el.attr("data-stellar-background-ratio"))
        	el.attr('data-stellar-background-ratio', 0.4);
    }
	
    $.stellar({
		horizontalScrolling: false,
		responsive: true,
	});
});





/*	
  create ajax request from form element and his fields
  messages: set as form "data" attribut - "[field name]-not-set-msg", "all-fields-required-msg", "ajax-fail-msg", "success-msg"
  form must have attributes "method" and "action" set
  "return message" and "ajax loader" are also managed - see functions below
  
  @param form_el - form element
  @param all_fields - array of names of all fields in the form element that will be send
  @param required_fields - array of names of all fields in the form element that must be set - cannot be empty
*/
function form_to_ajax_request(form_el, all_fields, required_fields) {
	var fields_values = [];
	var error = false;
	
	//get values from fields
	$.each(all_fields, function(index, value) {
		fields_values[value] = form_el.find('*[name=' + value + ']').val();
	});
	
	//check if required fields are set
	$.each(required_fields, function(index, value) {
		if(!isSet(fields_values[value])) {
			var message = form_el.data(value + '-not-set-msg');
			if(!isSet(message))
				message = form_el.data('all-fields-required-msg');
			setReturnMessage(form_el, message);
			showReturnMessage(form_el);
			error = true;
			return;
		}
	});
	if(error)
		return false;
	
	//form data query object for ajax request
	var data_query = {};
	$.each(all_fields, function(index, value) {
		data_query[value] = fields_values[value];
	});
	data_query['ajax'] = true;

	//show ajax loader
	showLoader(form_el);
	
	//send the request
	$.ajax({
		type: form_el.attr('method'),
		url: form_el.attr('action'),
		data: data_query,
		cache: false,
		dataType: "text"
	})
	.fail(function() {		//request failed
		setReturnMessage(form_el, form_el.data('ajax-fail-msg'));
		showReturnMessage(form_el);
	})
	.done(function(message) {		//request succeeded
		if(!isSet(message)) {
			clearForm(form_el);
			setReturnMessage(form_el, form_el.data('success-msg'));
			showReturnMessage(form_el);
		}
		else {
			setReturnMessage(form_el, message);
			showReturnMessage(form_el);
		}
	});
	
	//hide ajax loader
	hideLoader(form_el);
	
	return false;
}

function isSet(variable) {
	if(variable == "" || typeof(variable) == 'undefined')
		return false;
	return true;
}

function clearForm(form_el) {
	form_el.find('input[type=text]').val('');
	form_el.find('input[type=checkbox]').prop('checked', false);
	form_el.find('textarea').val('');
}

function showLoader(form_el) {
	form_el.find('.ajax-loader').fadeIn('fast');
}

function hideLoader(form_el) {
	form_el.find('.ajax-loader').fadeOut('fast');
}
	
function setReturnMessage(form_el, content) {
	if(!isSet(content))
		content = "Unspecified message.";
	form_el.find('.return-msg').html(content);
}

function showReturnMessage(form_el) {
	form_el.find('.return-msg').addClass('show-return-msg');
}

$('.return-msg').click(function(e) {
	$(this).removeClass('show-return-msg').html('&nbsp;');
});
$(document).ready(function (e) {
	$('.theme-customizer-icon').click(function (e) {
		$('#theme-customizer').toggleClass('slide-out');
	});

	var logo1              = $('#logo-1');
	var logo2              = $('#logo-2');
	var body_el            = $('body');
	var all_el             = $('#all');
	var bread_img          = $('#bread-image');
	var devices_img        = $('#devices-img');
	var slider_testimonial = $('#testimonials-slider');
	var slider_post_images = $('#post-images-slider-1');
	var post_slider        = $('#post-slider-1');
	$('.theme-syle').click(function (e) {
		e.preventDefault();
		if ($('#dark-stylesheet').length > 0) {
			$('#dark-stylesheet')[0].disabled = true;
			$('#dark-stylesheet').remove();
		}
		body_el.removeClass();
		all_el.removeClass();
		$('#devices-section.section-black-cover').removeClass('section-black-cover').addClass('section-color-cover');
		$('.section-black-cover').removeClass('section-black-cover').addClass('section-white-cover');
		bread_img.attr('src', 'images/bread.png');
		devices_img.attr('src', 'images/devices.png');
		logo1.attr('src', 'images/logo.png');
		logo2.attr('src', 'images/logo_secondary.png');

		switch ($(this).attr('id')) {
			case 'theme-pattern':
				body_el.addClass('bg-pattern');
				break;
			case 'theme-boxed':
				body_el.addClass('bg-pattern2');
				all_el.addClass('boxed');
				break;
			case 'theme-dark':
				$('head').append('<link id="dark-stylesheet" rel="stylesheet" type="text/css" href="http://lvape.ru/styles/dark-skin.css">');
				$('.section-white-cover').removeClass('section-white-cover').addClass('section-black-cover');
				bread_img.attr('src', 'images/bread_dark_skin.png');
				devices_img.attr('src', 'images/devices_dark_skin.png');
				$('#devices-section').removeClass('section-color-cover').addClass('section-black-cover');
				logo1.attr('src', 'images/logo_dark_skin.png');
				logo2.attr('src', 'images/logo_secondary_dark_skin.png');
				break;
			case 'theme-dark-pattern':
				$('head').append('<link id="dark-stylesheet" rel="stylesheet" type="text/css" href="http://lvape.ru/styles/dark-skin.css">');
				$('.section-white-cover').removeClass('section-white-cover').addClass('section-black-cover');
				bread_img.attr('src', 'images/bread_dark_skin.png');
				devices_img.attr('src', 'images/devices_dark_skin.png');
				$('#devices-section').removeClass('section-color-cover').addClass('section-black-cover');
				logo1.attr('src', 'images/logo_dark_skin.png');
				logo2.attr('src', 'images/logo_secondary_dark_skin.png');
				body_el.addClass('bg-pattern3');
				break;
		}

		var owl = slider_testimonial.data('owlCarousel');
		owl.destroy();
		slider_testimonial.owlCarousel({
			singleItem: true
		});
		var owl = slider_post_images.data('owlCarousel');
		owl.destroy();
		var owl = post_slider.data('owlCarousel');
		owl.destroy();
		post_slider.owlCarousel({
			singleItem: true,
			navigation: true,
			navigationText: false,
			pagination: false
		});
		slider_post_images.owlCarousel({
			singleItem: true
		});
		$(window).trigger('resize');
	});
});