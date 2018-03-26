$(document).ready(function () {

    $(function () {
        $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
                submitSuccess: function () {
                    alert("Все впорядке");
                    $('.registration-modal').arcticmodal('close');
                }
            }
        );
    });

    $('.contacts > a:last-child,.submit-wr > input,.clndr-nav,.celendar_slider-wrap+a,.professions>div').bind('touchstart touchend', function (e) {
        $(this).toggleClass('hover_effect');
    });

    $('.log-in-wrap a').click(function (e) {
        e.preventDefault();
        $('.menu_wrap').removeClass('opened');
        $('.login-modal').arcticmodal();
    });

    $('.register > .register__btn').click(function (e) {
        e.preventDefault();
        $('.login-modal').arcticmodal('close');
        $('.registration-modal').arcticmodal();
    });
    $('.routes-block .route-photo').click(function (e) {
        e.preventDefault();
        $('.routes-modal-photo').arcticmodal();
        $('.route-slider').slick({
            nextArrow: '<span class="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>',
            prevArrow: '<span class="prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>',
        });

        $('.routes-modal-photo .icon-close').click(function () {
            $('.routes-modal-photo').arcticmodal('close');
        });
    });

    $('.form-login__btn-forgot-pass').click(function (e) {
        e.preventDefault();
        $('.login-modal').arcticmodal('close');
        $('.forgot-pass-modal').arcticmodal();
    });

    $('.new-obj').click(function (e) {
        e.preventDefault();
        $('.right-side-wrap').removeClass('active');
        $('.right-side-bar-two').addClass('active');

    });
    $('.icon-arrow-back').click(function (e) {
        e.preventDefault();
        $('.right-side-bar-two').removeClass('active');
        $('.right-side-wrap').addClass('active');

    });
    $('.route-title__link').click(function (e) {
        e.preventDefault();
        $('.right-side-wrap').removeClass('active');
        $('.route-single').addClass('active');
    });

    $('.new-route').click(function (e) {
        e.preventDefault();
        $('.right-side-wrap').removeClass('active');
        $('.route-new').addClass('active');
    });
    $('.route-new-btn__back').click(function (e) {
        e.preventDefault();
        $('.right-side-wrap').addClass('active');
        $('.route-new').removeClass('active');
    });

    $('.right-side-bar-two .result-open-btn > a').click(function (e) {
        e.preventDefault();
        $('.right-side-bar-two').removeClass('active');
    });

    $('.object-stars > i').click(function (e) {
        e.preventDefault();
        $('.object-stars > i').removeClass('active');
        $(this).addClass('active');
        console.log($(this).attr('data-mark'));
        $('[name="mark"]').val($(this).attr('data-mark'));
    });
    $('.upload-wrap input').change(function () {
        $('.upload-wrap p').text($('.upload-wrap input').val());
    });

    $(".right-side-bar-two .result-head-line > a").click(function (e) {
        e.preventDefault();
        $('.add-object-wrap form input[type="submit"]').click();
    });

    $(".swipe-div").swipe({

        swipeLeft: function (event, direction, distance, duration, fingerCount) {
            if ($(window).width() <= 800) {
                $('.right-side-wrap').addClass('active');

            }
            console.log('fire');
        },
        swipeRight: function (event, direction, distance, duration, fingerCount) {
            if ($(window).width() <= 800) {
                $('.right-side-wrap').removeClass('active');
            }
        }
    });

    $('.cat-title>a').click(function (e) {
        e.preventDefault();
        if ($(window).width() <= 481) {
            $('.category-block').removeClass('shown');
            $(this).closest('.category-block').addClass('shown');

        } else {
            $(this).closest('.category-block').find('a').removeClass('actived');
            $(this).closest('.category-block').toggleClass('actived');
        }

        if ($(this).closest('.category-block').hasClass('actived')) {
            $('p[data-cat="' + $(this).attr('data-cat') + '"]').addClass('actived');
            $('input[data-cat="' + $(this).attr('data-cat') + '"]').prop('checked', true);
        } else {
            $('p[data-cat="' + $(this).attr('data-cat') + '"]').removeClass('actived');
            $('input[data-cat="' + $(this).attr('data-cat') + '"]').prop('checked', false);
        }
    });

    $('.category-block li>a').click(function (e) {
        e.preventDefault();
        $(this).closest('.category-block').removeClass('actived');
        $(this).addClass('actived');
        $('p[data-cat="' + $(this).closest('.category-block').find('.cat-title>a').attr('data-cat') + '"]').removeClass('actived');
        $('input[data-cat="' + $(this).closest('.category-block').find('.cat-title>a').attr('data-cat') + '"]').prop('checked', false);
    });


    $('.icon-wrap input').click(function () {
        if ($(this).prop('checked')) {
            $('p[data-cat="' + $(this).attr('data-cat') + '"]').addClass('actived');
            $('a[data-cat="' + $(this).attr('data-cat') + '"]').closest('.category-block').addClass('actived');
        } else {
            $('p[data-cat="' + $(this).attr('data-cat') + '"]').removeClass('actived');
            $('a[data-cat="' + $(this).attr('data-cat') + '"]').closest('.category-block').removeClass('actived');
        }
    });

    function uploadpreview(input) {
        if (input.files && input.files[0]) {
            var reader    = new FileReader();
            reader.onload = function (e) {
                $('#preview-img').attr('src', e.target.result);
                $('.preview-wrap>div p').hide();
                $('#preview-img').css('opacity', '1');
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".preview-wrap input").change(function () {
        uploadpreview(this);
    });


    $('.menu').click(function () {
        $('.menu_wrap').addClass('opened');
    });

    $('.cross').click(function () {
        $('.menu_wrap').removeClass('opened');
    });

    $(document).on('click', '.next-slide', function (e) {
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    });

    $(document).on('click', '.prev-slide', function (e) {
        e.preventDefault();
        $.fn.fullpage.moveSectionUp();
    });

    $(function () {
        var currentSlide        = 0;
        var loaded              = false;
        var delay               = 2000; //milliseconds
        var animationIsFinished = false;

        if ($(window).width() >= 800) {
            $('#pages_wrap>div:not(.main_section)').css('visibility', "hidden");
            $('#pages_wrap').fullpage({
                navigation: false,
                controlArrows: false,
                anchors: ['start', 'about', 'recalls', 'why_we', 'contacts'],
                menu: '#main-menu',
                onLeave: function (index, nextIndex, direction) {
                    $('#pages_wrap>div:not(.main_section)').css('visibility', "visible");
                    loaded = false;
                    change_bg(nextIndex);
                }

            });
        } else {
        }
    });

    function change_bg(slide_index) {
        if (slide_index == 1) {
            $('.main-pege-menu-wrap').attr('class', $('.main-pege-menu-wrap').attr('class').replace(/\bpage_\d+\b/g, ''));
            $('.backgrounds').removeClass('shown');
            $('.background-1').addClass('shown');
            $('.main-page-menu').addClass('on-front');
            $('.main-pege-menu-wrap').addClass('page_1');
        } else if (slide_index == 2) {
            $('.main-pege-menu-wrap').attr('class', $('.main-pege-menu-wrap').attr('class').replace(/\bpage_\d+\b/g, ''));
            $('.backgrounds').removeClass('shown');
            $('.main-page-menu').removeClass('on-front');
            $('.background-2').addClass('shown');
            $('.main-pege-menu-wrap').addClass('page_2');
        } else if (slide_index == 3) {
            $('.main-pege-menu-wrap').attr('class', $('.main-pege-menu-wrap').attr('class').replace(/\bpage_\d+\b/g, ''));
            $('.backgrounds').removeClass('shown');
            $('.main-page-menu').removeClass('on-front');
            $('.background-3').addClass('shown');
            $('.main-pege-menu-wrap').addClass('page_3');
        } else if (slide_index == 4) {
            $('.main-pege-menu-wrap').attr('class', $('.main-pege-menu-wrap').attr('class').replace(/\bpage_\d+\b/g, ''));
            $('.backgrounds').removeClass('shown');
            $('.main-page-menu').removeClass('on-front');
            $('.background-4').addClass('shown');
            $('.main-pege-menu-wrap').addClass('page_4');
        } else if (slide_index == 5) {
            $('.main-pege-menu-wrap').attr('class', $('.main-pege-menu-wrap').attr('class').replace(/\bpage_\d+\b/g, ''));
            $('.backgrounds').removeClass('shown');
            $('.main-page-menu').removeClass('on-front');
            $('.background-5').addClass('shown');
            $('.main-pege-menu-wrap').addClass('page_5');
        }
    }

    $('.recall-slider').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }]
    });


    $('select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
        // closeOnSelect: false,
        //theme: 'black'
    });

    $('.category-btn').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            $('*').removeClass('active');
            $('.footer-line>div').slideUp();
            $(this).addClass('active');
            $('.category-arrow').addClass('active');
            if ($(window).width() <= 481) {
                $('.category-arrow').removeClass('active');
                $('.bottom-line>.container').slideUp();
            }
            $('.categories-wrap').slideDown();
        } else {
            $(this).removeClass('active');
            $('.category-arrow').removeClass('active');
            $('.categories-wrap').slideUp();
        }
    });
    $('.category-arrow').click(function (e) {
        e.preventDefault();
        if ($(window).width() >= 481) {
            if (!$(this).hasClass('active')) {
                $('*').removeClass('active');
                $('.footer-line>div').slideUp();
                $(this).addClass('active');
                $('.category-btn').addClass('active');
                $('.categories-wrap').slideDown();
            } else {
                $(this).removeClass('active');
                $('.category-btn').removeClass('active');
                $('.categories-wrap').slideUp();
            }
        } else {
            if (!$(this).hasClass('active')) {
                $('*').removeClass('active');
                $('.footer-line>div').slideUp();
                $('.categories-wrap').slideUp();
                $(this).addClass('active');
                $('.bottom-line>.container').slideDown();
            } else {
                $(this).removeClass('active');
                $('.bottom-line>.container').slideUp();
            }

        }
    });


    $('.footer-line > a').click(function (e) {
        e.preventDefault();

        if (!$(this).hasClass('active')) {
            $('*').removeClass('active');
            $('.categories-wrap').slideUp();
            $(this).addClass('active');
            $('.footer-line>div').slideDown();
        } else {
            $(this).removeClass('active');
            $('.footer-line>div').slideUp();
        }

    });
    $('.result-open-btn>a').click(function (e) {
        e.preventDefault();
        $('.right-side-wrap').toggleClass('active');

    });
    $('.side-open-btn').click(function (e) {
        e.preventDefault();
        $('.left-side-wrap').toggleClass('active');

    });
    $('.side-head .loged-wrap + a').click(function (e) {
        e.preventDefault();
        $('.left-side-wrap').toggleClass('active');
    });

    $('.popular-posts-slider').slick({
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        nextArrow: '<span class="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>',
        prevArrow: '<span class="prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>',
        responsive: [{
            breakpoint: 1140,
            settings: {
                slidesToShow: 2,
            }

        }, {

            breakpoint: 800,
            settings: {
                slidesToShow: 1,
            }
        }

            // }, {
            //
            //     breakpoint: 300,
            //     settings: "unslick" // destroys slick
            //
            // }
        ]
    });
    $('.excursion-slider').slick({
        nextArrow: '<span class="prev"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>',
        prevArrow: '<span class="next"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>',
    });

    /*RATING*/
    $('.star-rating__input').change(function () {
        $('#rating-count').html(this.value);
    });

    var transport = $('.transport-list li:not(:first-child)');
    transport.click(function () {
        transport.removeClass('active');
        $(this).addClass('active');
    });
    $('.accordion').accordion({
        "transitionSpeed": 400
    });


    $(".side-bar-routes, .route-single-wrap, .message-wrap").mCustomScrollbar({
        theme: "dark-2"
    });

});
