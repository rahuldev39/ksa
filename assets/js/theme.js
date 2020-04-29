(function($) {
    "use strict";

    if ($('.enllaxBG').length) {
        $('.enllaxBG').enllax();
    }


    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)

            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }
    if ($('.main-navigation .navigation-box').length) {
        var subMenu = $('.navigation-box ul');
        subMenu.parent('li').children('a').append(function() {
            return '<button class="sub-nav-toggler"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>';
        });
        var mainNavToggler = $('.header-navigation .menu-toggler');
        var subNavToggler = $('.main-navigation .sub-nav-toggler');
        mainNavToggler.on('click', function() {
            var Self = $(this);
            var menu = Self.closest('.header-navigation').find(Self.data('target'));
            $(menu).slideToggle();
            $(menu).toggleClass('showen');
            return false;
        });
        subNavToggler.on('click', function() {
            var Self = $(this);
            Self.parent().parent().children('ul').slideToggle();
            return false;
        });
    }

    if ($('[data-toggle="tooltip"]').length) {
        $('[data-toggle="tooltip"]').tooltip();
    }
    if ($('.stricky').length) {
        $('.stricky').addClass('original').clone(true).insertAfter('.stricky').addClass('stricked-menu').removeClass('original');
    }
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

            return false;

        });
    }


    if ($('.side-menu__toggler').length) {
        $('.side-menu__toggler').on('click', function(e) {
            $('.side-menu__block').addClass('active');
            e.preventDefault();
        });
    }

    if ($('.side-menu__block-overlay').length) {
        $('.side-menu__block-overlay').on('click', function(e) {
            $('.side-menu__block').removeClass('active');
            e.preventDefault();
        });
    }


    

    $(window).on('scroll', function() {
        if ($('.scroll-to-top').length) {
            var strickyScrollPos = 100;
            if ($(window).scrollTop() > strickyScrollPos) {
                $('.scroll-to-top').fadeIn(500);
            } else if ($(this).scrollTop() <= strickyScrollPos) {
                $('.scroll-to-top').fadeOut(500);
            }
        }
        if ($('.stricked-menu').length) {
            var headerScrollPos = 100;
            var stricky = $('.stricked-menu');
            if ($(window).scrollTop() > headerScrollPos) {
                stricky.addClass('stricky-fixed');
            } else if ($(this).scrollTop() <= headerScrollPos) {
                stricky.removeClass('stricky-fixed');
            }
        }
    });
    

    $(window).on('load', function() {

       

        if ($('.thm__owl-carousel').length) {
            $('.thm__owl-carousel').each(function() {

                var Self = $(this);
                var carouselOptions = Self.data('options');
                var carouselPrevSelector = Self.data('carousel-prev-btn');
                var carouselNextSelector = Self.data('carousel-next-btn');
                var thmCarousel = Self.owlCarousel(carouselOptions);
                if (carouselPrevSelector !== undefined) {
                    $(carouselPrevSelector).on('click', function() {
                        thmCarousel.trigger('prev.owl.carousel');
                        return false;
                    });
                }
                if (carouselNextSelector !== undefined) {
                    $(carouselNextSelector).on('click', function() {
                        thmCarousel.trigger('next.owl.carousel');
                        return false;
                    });
                }
            });
        }
        if ($('.preloader').length) {
            $('.preloader').fadeOut('slow');
        }

        if ($('.side-menu__block-inner').length) {
            $('.side-menu__block-inner').mCustomScrollbar({
                axis: 'y',
                theme: 'dark'
            });
        }

        if ($('.custom-cursor__overlay').length) {

            // / cursor /
            var cursor = $(".custom-cursor__overlay .cursor"),
                follower = $(".custom-cursor__overlay .cursor-follower");

            var posX = 0,
                posY = 0;

            var mouseX = 0,
                mouseY = 0;

            TweenMax.to({}, 0.016, {
                repeat: -1,
                onRepeat: function() {
                    posX += (mouseX - posX) / 9;
                    posY += (mouseY - posY) / 9;

                    TweenMax.set(follower, {
                        css: {
                            left: posX - 22,
                            top: posY - 22
                        }
                    });

                    TweenMax.set(cursor, {
                        css: {
                            left: mouseX,
                            top: mouseY
                        }
                    });

                }
            });

            $(document).on("mousemove", function(e) {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                mouseX = e.pageX;
                mouseY = e.pageY - scrollTop;
            });
            $("button, a").on("mouseenter", function() {
                cursor.addClass("active");
                follower.addClass("active");
            });
            $("button, a").on("mouseleave", function() {
                cursor.removeClass("active");
                follower.removeClass("active");
            });
            $(".custom-cursor__overlay").on("mouseenter", function() {
                cursor.addClass("close-cursor");
                follower.addClass("close-cursor");
            });
            $(".custom-cursor__overlay").on("mouseleave", function() {
                cursor.removeClass("close-cursor");
                follower.removeClass("close-cursor");
            });
        }

        if ($('.slider-one__carousel').length) {
            var slideOneCarousel = $('.slider-one__carousel');
            var singleItem = $('.slider-one__slide');

            slideOneCarousel.owlCarousel({
                loop: true,
                items: 1,
                margin: 0,
                dots: true,
                nav: false,
                animateOut: 'slideOutDown',
                animateIn: 'fadeIn',
                active: true,
                smartSpeed: 1000,
                autoplay: 7000
            });
            $('.slide-one__left-btn').on('click', function(e) {
                slideOneCarousel.trigger('next.owl.carousel');
                e.preventDefault();
            });
            $('.slide-one__right-btn').on('click', function(e) {
                slideOneCarousel.trigger('prev.owl.carousel');
                e.preventDefault();
            });



            // making thumbnail to owl dots
            var thumbCount = slideOneCarousel.find('.owl-dot').length;
            for (var i = 0; i < thumbCount; i++) {
                var newIdx = i;
                var itemThumb = slideOneCarousel.find(singleItem).eq(newIdx).data('thumb');
                slideOneCarousel.find('.owl-dot').eq(i).find('span').css('background-image', 'url(' + itemThumb + ')');
            }
        }

        if ($('.slider-two__carousel').length) {
            var slideTwoWrap = $('.slider-two');
            var slideTwoCarousel = $('.slider-two__carousel').owlCarousel({
                loop: true,
                items: 1,
                margin: 0,
                dots: false,
                nav: false,
                animateOut: 'slideOutDown',
                animateIn: 'fadeIn',
                active: true,
                smartSpeed: 1000,
                autoplay: 7000
            });
            slideTwoWrap.find('.slide-two__left-btn').on('click', function(e) {
                slideTwoCarousel.trigger('next.owl.carousel');
                e.preventDefault();
            });
            slideTwoWrap.find('.slide-two__right-btn').on('click', function(e) {
                slideTwoCarousel.trigger('prev.owl.carousel');
                e.preventDefault();
            });
        }
        
       

    });

})(jQuery);