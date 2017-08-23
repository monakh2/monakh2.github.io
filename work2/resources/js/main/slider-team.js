$(function () {
    if ($('.slider-team').length === 0)
        return;


    var slider_team = new Swiper('.slider-team', {
        slidesPerView: 3,
        spaceBetween: 30,
        nextButton: '.slider-team-next',
        prevButton: '.slider-team-prev',
        breakpoints: {
            640: {
                slidesPerView: 1
            },
            992: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        }
    });

});