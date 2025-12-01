(function($) {
    "use strict";
  
    const $documentOn = $(document);
    const $windowOn = $(window);
  
    $documentOn.ready( function() {
  
      //>> Mobile Menu Js Start <<//
      $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "1199",
        meanExpand: ['<i class="far fa-plus"></i>'],
    });

    $('#mobile-menus').meanmenu({
        meanMenuContainer: '.mobile-menus',
        meanScreenWidth: "1920",
        meanExpand: ['<i class="far fa-plus"></i>'],
    });
  
      //>> Sidebar Toggle Js Start <<//
      $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
        $(".offcanvas__info").removeClass("info-open");
        $(".offcanvas__overlay").removeClass("overlay-open");
      });
      $(".sidebar__toggle").on("click", function () {
        $(".offcanvas__info").addClass("info-open");
        $(".offcanvas__overlay").addClass("overlay-open");
      });
  
      //>> Body Overlay Js Start <<//
      $(".body-overlay").on("click", function () {
        $(".offcanvas__area").removeClass("offcanvas-opened");
        $(".df-search-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
      });
  
      //>> Sticky Header Js Start <<//
  
      $windowOn.on("scroll", function () {
        if ($(this).scrollTop() > 250) {
          $("#header-sticky").addClass("sticky");
        } else {
          $("#header-sticky").removeClass("sticky");
        }
      });      
      
      //>> Video Popup Start <<//
      $(".img-popup").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });
  
      $(".img-popup2").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });
  
      $(".video-popup").magnificPopup({
        type: "iframe",
        callbacks: {},
      });
  
      //>> Counterup Start <<//
      $(".count").counterUp({
        delay: 15,
        time: 4000,
      });
  
      //>> Wow Animation Start <<//
      new WOW().init();
  
       //>> Nice Select Start <<//
       if ($('.single-select').length) {
        $('.single-select').niceSelect();
    }

    ///>> Hero Slider Start <<//
    const sliderswiper = new Swiper('.hero-slider', {
        // Optional parameters
        speed: 1500,
        loop: true,
        slidesPerView: 1,
       // autoplay: true,
        effect: 'fade',
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1400': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },

            a11y: false,
        },

        navigation: {
            prevEl: ".array-next",
            nextEl: ".array-prev",
        },

    });


    //>> Hero-3 Slider Start <<//
    const sliderActive3 = ".hero-slider-3";
    const sliderInit3 = new Swiper(sliderActive3, {
        loop: true,
        slidesPerView: 1,
        effect: "fade",
        speed: 2000,
        autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        },
        pagination: {
            el: ".dot2",
            clickable: true,
        },
        navigation: {
        nextEl: ".array-prev",
        prevEl: ".array-next",
    },
        
    });
    // content animation when active start here
    function animated_swiper(selector, init) {
        let animated = function animated() {
            $(selector + " [data-animation]").each(function () {
                let anim = $(this).data("animation");
                let delay = $(this).data("delay");
                let duration = $(this).data("duration");
                $(this)
                    .removeClass("anim" + anim)
                    .addClass(anim + " animated")
                    .css({
                        webkitAnimationDelay: delay,
                        animationDelay: delay,
                        webkitAnimationDuration: duration,
                        animationDuration: duration,
                    })
                    .one("animationend", function () {
                        $(this).removeClass(anim + " animated");
                    });
            });
        };
        animated();
        init.on("slideChange", function () {
            $(sliderActive3 + " [data-animation]").removeClass("animated");
        });
        init.on("slideChange", animated);
    }
    animated_swiper(sliderActive3, sliderInit3);


    //>> Brand Slider Start <<//

    if($('.brand-slider').length > 0) {
        const brandSlider = new Swiper(".brand-slider", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },

            breakpoints: {
                1199: {
                    slidesPerView: 5,
                },
                991: {
                    slidesPerView: 4,
                },
                767: {
                    slidesPerView: 3,
                },
                575: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> Testimonial Slider Start <<//
    if($('.testimonial-slider').length > 0) {
        const testimonialSlider = new Swiper(".testimonial-slider", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: ".array-prevs",
                nextEl: ".array-nexts",
            },
            breakpoints: {
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> Testimonial Slider2 Start <<//
    if($('.testimonial-slider2').length > 0) {
        const testimonialSlider2 = new Swiper(".testimonial-slider2", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: ".array-prev",
                nextEl: ".array-next",
            },
            breakpoints: {
                1199: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> Testimonial Slider2 Start <<//
    if($('.testimonial-slider3').length > 0) {
        const testimonialSlider3 = new Swiper(".testimonial-slider3", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: ".array-prev",
                nextEl: ".array-next",
            },
            breakpoints: {
                1199: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> Offer Slider Start <<//
    if($('.offer-slider').length > 0) {
        const offerSlider = new Swiper(".offer-slider", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: ".array-prev",
                nextEl: ".array-next",
            },
            breakpoints: {
                1399: {
                    slidesPerView: 4,
                },
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }
    
    //>> Offer Slider Start <<//
    if($('.offer-slider2').length > 0) {
        const offerSlider2 = new Swiper(".offer-slider2", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: ".array-prev",
                nextEl: ".array-next",
            },
            breakpoints: {
                1399: {
                    slidesPerView: 2,
                },
                1199: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> category Slider Start <<//
    if($('.category-slider').length > 0) {
        const categorySlider = new Swiper(".category-slider", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".dot",
                clickable: true,
            },
            breakpoints: {
                1399: {
                    slidesPerView: 5,
                },
                1199: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView: 4,
                },
                767: {
                    slidesPerView: 3,
                },
                575: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> Instagram Slider Start <<//
    if($('.instagram-banner-slider').length > 0) {
        const instagramBannerSlider = new Swiper(".instagram-banner-slider", {
            spaceBetween: 30,
            speed: 1500,
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
            breakpoints: {
                1399: {
                    slidesPerView: 6,
                },
                1199: {
                    slidesPerView: 5,
                },
                991: {
                    slidesPerView: 4,
                },
                767: {
                    slidesPerView: 3,
                },
                650: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    if($('.new-destination-slider').length > 0) {
        const newDestinationSlider = new Swiper(".new-destination-slider", {
            spaceBetween: 30,
            speed: 3000,
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".dot",
                clickable: true,
            },
            navigation: {
                prevEl: ".array-prev",
                nextEl: ".array-next",
            },
            breakpoints: {
                1399: {
                    slidesPerView: 4,
                },
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> tour Slider Start <<//
    if($('.tour-slider').length > 0) {
        const tourSlider = new Swiper(".tour-slider", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: ".array-prev",
                nextEl: ".array-next",
            },
            breakpoints: {
                1399: {
                    slidesPerView: 4,
                },
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 3,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> tour Slider Start <<//
    if($('.team-slider').length > 0) {
        const teamSlider = new Swiper(".team-slider", {
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: ".array-prev",
                nextEl: ".array-next",
            },
            breakpoints: {
                1399: {
                    slidesPerView: 3,
                },
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    //>> CountDown Start <<//
    let targetDate = new Date("2025-05-12 00:00:00").getTime();
    const countdownInterval = setInterval(function () {
        let currentDate = new Date().getTime();
        let remainingTime = targetDate - currentDate;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            // Display a message or perform any action when the countdown timer reaches zero
            $("#countdown-container").text("Countdown has ended!");
        } else {
            let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
                (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minutes = Math.floor(
                (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
            );
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            // Pad single-digit values with leading zeros
            $("#day").text(days.toString().padStart(2, "0"));
            $("#hour").text(hours.toString().padStart(2, "0"));
            $("#min").text(minutes.toString().padStart(2, "0"));
            $("#sec").text(seconds.toString().padStart(2, "0"));
        }
    }, 1000);


    //>> Search Popup Start <<//
    const $searchWrap = $(".search-wrap");
    const $navSearch = $(".nav-search");
    const $searchClose = $("#search-close");

    $(".search-trigger").on("click", function (e) {
        e.preventDefault();
        $searchWrap.animate({ opacity: "toggle" }, 500);
        $navSearch.add($searchClose).addClass("open");
    });

    $(".search-close").on("click", function (e) {
        e.preventDefault();
        $searchWrap.animate({ opacity: "toggle" }, 500);
        $navSearch.add($searchClose).removeClass("open");
    });

    function closeSearch() {
        $searchWrap.fadeOut(200);
        $navSearch.add($searchClose).removeClass("open");
    }

    $(document.body).on("click", function (e) {
        closeSearch();
    });

    $(".search-trigger, .main-search-input").on("click", function (e) {
        e.stopPropagation();
    });

    //>> Mouse Cursor Start <<//
    function mousecursor() {
        if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
                t = document.querySelector(".cursor-outer");
            let n,
                i = 0,
                o = !1;
            (window.onmousemove = function(s) {
                o ||
                    (t.style.transform =
                        "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                    (e.style.transform =
                        "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                    (n = s.clientY),
                    (i = s.clientX);
            }),
            $("body").on("mouseenter", "a, .cursor-pointer", function() {
                    e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
                }),
                $("body").on("mouseleave", "a, .cursor-pointer", function() {
                    ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
                    (e.classList.remove("cursor-hover"),
                        t.classList.remove("cursor-hover"));
                }),
                (e.style.visibility = "visible"),
                (t.style.visibility = "visible");
        }
    }
    $(function() {
        mousecursor();
    });

    //>> Back To Top Slider Start <<//
    $windowOn.on('scroll', function() {
        if ($(this).scrollTop() > 20) {
            $("#back-top").addClass("show");
        } else {
            $("#back-top").removeClass("show");
        }
    });
    
    $documentOn.on('click', '#back-top', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
    
    $(function() {
        $("#datepicker, #datepicker2, #datepicker3, #datepicker4, #datepicker5, #datepicker6, #datepicker7, #datepicker8, #datepicker9, #datepicker10, #datepicker11").datepicker({
            autoclose: true,
            todayHighlight: true
        });
    });
        
    }); // End Document Ready Function
  
  
     //Price Range Slideer
     document.addEventListener("DOMContentLoaded", function () {
        const minSlider = document.getElementById("min-slider");
        const maxSlider = document.getElementById("max-slider");
        const amount = document.getElementById("amount");

        function updateAmount() {
            const minValue = parseInt(minSlider.value, 10);
            const maxValue = parseInt(maxSlider.value, 10);

            // Ensure the minimum value is always lower than the maximum value
            if (minValue > maxValue) {
                minSlider.value = maxValue;
            }

            // Update the displayed price range
            amount.value = "$" + minSlider.value + " - $" + maxSlider.value;

            // Calculate the percentage positions of the sliders
            const minPercent =
                ((minSlider.value - minSlider.min) /
                    (minSlider.max - minSlider.min)) *
                100;
            const maxPercent =
                ((maxSlider.value - maxSlider.min) /
                    (maxSlider.max - maxSlider.min)) *
                100;

            // Update the background gradient to show the active track color
            minSlider.style.background = `linear-gradient(to right, #000 ${minPercent}%, #1CA8CB ${minPercent}%, #1CA8CB ${maxPercent}%, #000 ${maxPercent}%)`;
            maxSlider.style.background = `linear-gradient(to right, #000 ${minPercent}%, #1CA8CB ${minPercent}%, #1CA8CB ${maxPercent}%, #000 ${maxPercent}%)`;
        }

        // Initialize the sliders and track with default values
        amount && updateAmount();

        // if (minSlider && maxSlider) {

        // Add event listeners for both sliders
        minSlider && minSlider.addEventListener("input", updateAmount);
        maxSlider && maxSlider.addEventListener("input", updateAmount);
        // }
    });
  
      function loader() {
        $windowOn.on('load', function() {
            // Animate loader off screen
            $(".preloader").addClass('loaded');
            $(".preloader").delay(600).fadeOut();
        });
      }
      
      loader();
  
   
  
  })(jQuery); // End jQuery