//На кнопки для открытия / закрытия меню
function toggle_main_nav() {
    $("body").toggleClass('overflow--hidden');
    $(".main_nav").toggleClass('main_nav--open');
}
//При скролле вниз, меню скрывается, появляется когда скролится вверх
$(function () {
    var lastScrollTop = 0;
    $(window).on('scroll', function () {
        st = $(this).scrollTop();
        if (st < lastScrollTop) {
            if ($(".collapsed_menu").hasClass("collapsed_menu--hidden")) {
                $(".collapsed_menu").removeClass("collapsed_menu--hidden");
                $(".collapsed_menu").addClass("collapsed_menu--visible");
            }
        } else {
            if ($(".collapsed_menu").hasClass("collapsed_menu--visible")) {
                $(".collapsed_menu").removeClass("collapsed_menu--visible");
                $(".collapsed_menu").addClass("collapsed_menu--hidden");
            }
        }
        lastScrollTop = st;
    });
});
// При изменении размера окна, все сбрасываем
$(window).resize(function () {
    $("body").removeClass('overflow--hidden');
    $(".main_nav").removeClass('main_nav--open');
    $('.main_nav').removeClass('main_nav--sticky');
});

$(document).ready(function () {
    var stickyNavTop = $('.main_nav').offset().top;

    var stickyNav = function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            $('.main_nav').addClass('main_nav--sticky');
        } else {
            $('.main_nav').removeClass('main_nav--sticky');
        }
    };




    $(window).scroll(function () {
        if ($(document).width() > 768) {
            stickyNav();
        }

    });
});
