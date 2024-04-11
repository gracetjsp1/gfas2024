(function($) {

	"use strict";


    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $("#navbar");
        var navLinks = $("#navbar > ul > li > a:not(.dropdown-toggle)");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $("#navbar .close-navbar");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })

        navLinks.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })
    }

    toggleMobileNavigation();
    

    //ACTIVE CURRENT MENU WHILE SCROLLING
    // function for active menuitem
    var sections = $("section"),
        nav = $("#navbar"),
        nav_height = nav.outerHeight(),
        home = nav.find(" > ul > li:first"),
        contact = nav.find(" > ul > li:last");

    function activeMenuItem() {
        var cur_pos = $(window).scrollTop() + 2;
        var bottomPosition = $(document).height() - $(window).height() - $(window).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("current");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("current");
                home.addClass("current");
            }

            if (bottomPosition === 0) {
                nav.find("> ul > li > a").parent().removeClass("current");
                contact.addClass("current");
            }
        });
    }

    // smooth-scrolling
    $(function() {
        $("#navbar > ul > li > a:not(.dropdown-toggle)").on("click", function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
                if (target.length) {
                    $("html, body").animate({
                    scrollTop: target.offset().top -60
                }, 1000, "easeInOutExpo");
                    return false;
                }
            }

            return false;
        });
    });  


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.children(img);
                var imgSrc = img.attr("src");

                $this.css({
                    backgroundImage: "url("+ imgSrc +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    // set two coloumn height equial
    function setTwoColEqHeight($col1, $col2) {
        var firstCol = $col1,
            secondCol = $col2,
            firstColHeight = $col1.innerHeight(),
            secondColHeight = $col2.innerHeight();

        if (firstColHeight > secondColHeight) {
            secondCol.css({
                "height": firstColHeight + 1 + "px"
            })
        } else {
            firstCol.css({
                "height": secondColHeight + 1 + "px"
            })
        }
    }

    // toggle mini cart
    function toggleMiniCartBtn() {
        var miniCartBtn = $(".mini-cart-btn"),
            miniCart = $(".mini-cart");

        miniCart.hide();
        miniCartBtn.on("click", function(e) {
            e.preventDefault();
            miniCart.slideToggle();
            return false;
        })
    }

    if ($(".mini-cart-wrapper").length) {
        toggleMiniCartBtn();
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    }); 


    // Setting main hero slider
    function mainHeroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").owlCarousel({
                items: 1,
                autoplay: true,
                loop: true,
                mouseDrag: false,
                nav: true,
                navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
                autoplaySpeed: 700,
                navSpeed: 700,
                dotsSpeed: 700
            });
        }
    }


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {
                //active wow
                wow.init();

                // active background image setting for hero slider
                sliderBgSetting();

                 //Active heor slider
                mainHeroSlider();

                if ($(".home-style-four .hero-title").length) {
                    var heroTitle = $(".home-style-four .hero-title");
                    heroTitle.addClass("active-hero-title");
                }

                if ($(".home-style-five .main-banar .banar-title").length) {
                    var heroTitle = $(".home-style-five .main-banar .banar-title");
                    heroTitle.addClass("active-banar-title");
                }
            });
        }
    }


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/
    $(window).on("scroll", function() {
        var header = $("#header");
        var mainNavigation = $("#main-navigation");
        var scroll = $(window).scrollTop();
        var top = $(".top-bar").innerHeight();

        if ((scroll > top) && !header.hasClass("header-style-three")) {
            mainNavigation.addClass("sticky");
        } else {
            mainNavigation.removeClass("sticky");
        }
    });

    if ($(".header-style-three").length) {
        $(window).on("scroll", function() {
            var mainNavigation = $("#main-navigation");
            var scroll = $(window).scrollTop();
            var top = $(".topbar").innerHeight();

            if (scroll > top) {
                mainNavigation.addClass("sticky");
            } else {
                mainNavigation.removeClass("sticky");
            }
        });        
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/  
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {  
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });    
    }


    /*------------------------------------------
        = POPULAR-CAMPAIGN METER
    -------------------------------------------*/
    function popularCampaignMeter() {
        if ($(".popular-campaign .meter").length) {
            var $meter = $('.meter');
            $meter.appear();
            $(document.body).on('appear', '.meter', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    current_item.addClass('appeared');
                    $(".meter").circleProgress({
                        size: 45,
                        thickness: 2,
                        fill: "#fff",
                        animation: {
                             duration: 2000
                        }
                    }).on('circle-animation-progress', function(event, progress, stepValue) {
                        var $this = $(this);
                        $this.find('span').html(Math.round(100 * stepValue) + '<i>%</i>');
                    });
                }                
            });
        };
    }

    popularCampaignMeter();


    /*------------------------------------------
        = LATEST CAUSES PROGRESS BAR
    -------------------------------------------*/
    function causesProgressBar() {
        if ($(".progress-bar").length) {
            var $progress_bar = $('.progress-bar');
            $progress_bar.appear();
            $(document.body).on('appear', '.progress-bar', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var percent = current_item.data('percent');
                    current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
                }
                
            });
        };
    }

    causesProgressBar();



    /*------------------------------------------
        = EVENTS SLIDER
    -------------------------------------------*/
    if ($(".events-slider").length) {
        $(".events-slider").owlCarousel({
            autoplay:true,
            smartSpeed:300,
            loop:true,
            margin:0,
            dots:false,
            center:true,
            autoplayHoverPause:true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 2
                },

                600 : {
                    items: 3
                },

                991 : {
                    items: 3
                },

                992 : {
                    items: 5
                }
            }
        });
    }


    /*------------------------------------------
        = LATEST NEWS SLIDER
    -------------------------------------------*/
    if ($(".latest-news-slider").length) {
        $(".latest-news-slider").owlCarousel({
            autoplay:true,
            smartSpeed:300,
            items:4,
            loop:true,
             responsive: {
                0 : {
                    items: 1
                },

                500 : {
                    items: 2
                },

                992 : {
                    items: 3
                },

                1200 : {
                    items: 4
                }
            }
        });
    }


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/  
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });    
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            sliderBgSetting();

            popularCampaignMeter();

            causesProgressBar();

            // set cta-2 two col equial
            if ($(".cta-2").length) {
                setTwoColEqHeight($(".cta-2 .join-us"), $(".cta-2 .sing-up"));
            }

            // set newsletter two col equial
            if ($(".newsletter").length) {
                setTwoColEqHeight($(".newsletter .children-holder"), $(".newsletter .subscribe"));
            }  
        });


    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {
        activeMenuItem();
    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {

        // set cta-2 two col equial
        if ($(".cta-2").length) {
            setTwoColEqHeight($(".cta-2 .join-us"), $(".cta-2 .sing-up"));
        }

        // set newsletter two col equial
        if ($(".newsletter").length) {
            setTwoColEqHeight($(".newsletter .children-holder"), $(".newsletter .subscribe"));
        }
    });


})(window.jQuery);
