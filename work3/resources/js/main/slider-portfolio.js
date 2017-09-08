$(function () {
    if ($('.slider-portfolio').length === 0)
        return;
    

    var slider_portfolio = new Swiper('.slider-portfolio', {
        pagination: '.slider-portfolio-pagination',
        effect: 'coverflow',
        slideToClickedSlide:true,
        grabCursor: true,
        centeredSlides: true,
        paginationClickable: true,
        //mousewheelControl: true,
        keyboardControl: true,
        preloadImages: false,
        lazyLoading: true,
        lazyLoadingInPrevNextAmount: 5,
        slidesPerView: 5,
        breakpoints: {
              // when window width is <= 320px
            320: {
                slidesPerView: 1,
                lazyLoadingInPrevNextAmount: 1
            },
            640: {
                slidesPerView: 1,
                lazyLoadingInPrevNextAmount: 1
            },
            768: {
                slidesPerView: 2,
                lazyLoadingInPrevNextAmount: 2
            },
            992: {
                slidesPerView: 3,
                lazyLoadingInPrevNextAmount: 3
            },
            1200: {
                slidesPerView: 3,
                lazyLoadingInPrevNextAmount: 3
            },
            1366: {
                slidesPerView: 4,
                lazyLoadingInPrevNextAmount: 4
            },
            1600: {
                slidesPerView: 4,
                lazyLoadingInPrevNextAmount: 4
            }
        },
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        }
    });
    
    
   

});