$(function () {
    var slider_partners = new Swiper('.slider-partners', {
        nextButton: '.slider-partners-next',
        prevButton: '.slider-partners-prev',
        paginationClickable: true,
        spaceBetween: 30,
        preloadImages: false,
        lazyLoading: true,
        slidesPerView: 4,
        lazyLoadingInPrevNextAmount: 4,
        breakpoints: {
            // when window width is <= 320px
            640: {
                slidesPerView: 1,
                lazyLoadingInPrevNextAmount: 1
            },
            768: {
                slidesPerView: 2,
                lazyLoadingInPrevNextAmount: 2
            },
            1200: {
                slidesPerView: 3,
                lazyLoadingInPrevNextAmount: 3
            }
        },
    });
});

