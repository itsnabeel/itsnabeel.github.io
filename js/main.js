"use strict";
(function () {
    var scrolling = false, expanded = false, current_section = 0, circlesShown = false;
    var $body = $('body'), $win = $(window), $projects = $('.projects'), $resume_details = $('.resume_details_block'),
        $to_top_btn = $('.back-to-top'), $fp_nav = $('.full-page-nav-container');

    $(document).on('ready', function () {
        $body.addClass('loaded');
        $body.css('overflow-x', 'hidden');
        // load projects for small screens
        $('.load_projects').on('click', function () {
            if ($projects.data('height') === undefined || $projects.data('height') === null) {
                $projects.data('height', $projects.height() + 30); // 30px padding of project
                $projects.css({'max-height': 'none'});
                $(this).html("Load less");
            } else {
                $projects.css({'max-height': $projects.data('height')});
                $projects.data('height', null);
                $(this).html("Load more");
                $('html, body').scrollTop($projects.offset().top);
            }
            return false;
        });

        // load projects button for large screens
        $('#load_projects').on('click', function () {
            if ($win.width() > 991) {
                if ($projects.data('height') === undefined || $projects.data('height') === null) {
                    $projects.data('height', $projects.height() + 30); // 30px padding of project
                    $projects.css({'max-height': 'none'});
                    $projects.closest('.vcenter').addClass('block');

                    scrollPage(null, 70, function () {
                        $projects.addClass('expanded');
                    });
                    expanded = true;
                    $(this).fadeOut(1000);
                }
            }
            return false;
        });

        // more details button on Resume section for Mobile
        $('.more-resume').on('click', function () {
            $resume_details.toggle();

            scrollPage(null, $resume_details.offset().top);
            $win.scroll(); // to trigger appear event thus animating progress bars
            var val = $(this).html();
            $(this).html((val === 'More Details') ? "Less Details" : "More Details");
            return false;
        });

        // more details button on Resume section for Desktop
        $('#more-resume').on('click', function () {
            if ($win.width() > 991) {
                $resume_details.show();

                scrollPage(null, $resume_details.offset().top, function () {
                    $resume_details.addClass('expanded');
                });

                $('#education').addClass('dim');
                $body.css('overflow-x', 'hidden');
                expanded = true;
                $(this).fadeOut(1000);
            }
            return false;
        });


        $body.on('mousewheel', function (e) {
            // horizontal scrolling will be applied on screens larger than 991px
            if ($win.width() > 991) {
                var total_sections = $('.wrap > section').length - 1;

                // already in scrolling state don't take any action
                if (scrolling)
                    return false;

                // if reading resume details then let user scroll vertically
                if (expanded) {
                    return true;
                }

                //check the direction of scroll
                if (e.deltaY > 0) {
                    if (current_section > 0)
                        current_section--;
                } else {
                    if (current_section < total_sections)
                        current_section++;
                }
                scrolling = true;

                // move page horizontally based on scroll direction
                scrollPage($('.wrap >section:eq(' + current_section + ')').offset().left, null);

                // wait to prevent unnecessary scroll (better UX)
                window.setTimeout(function () {
                    scrolling = false;
                }, 1200);

                return false;
            }
        });


        $body.on('appear', '.sec-title', function (e, $affected) {
            $(this).addClass('expand');
        });
        var $secTitle = $('.sec-title');
        $secTitle.appear();
        $secTitle.on('disappear', function (event, $all_disappeared_elements) {
            $(this).removeClass('expand');
        });


        $body.one('appear', '#skills', function (e, $affected) {
            if (circlesShown)
                return;

            var $color = $('h1').css('color');
            circlesShown = true;
            $('.progress-circle').each(function () {
                var bar = new ProgressBar.Circle(this, {
                    color: $color,
                    // This has to be the same size as the maximum width to
                    // prevent clipping
                    strokeWidth: 4,
                    trailWidth: 0,
                    easing: 'easeInOut',
                    duration: 1400,
                    text: {
                        autoStyleContainer: false
                    },
                    from: {color: $color, width: 4},
                    to: {color: $color, width: 4},
                    // Set default step function for all animate calls
                    step: function (state, circle) {
                        circle.path.setAttribute('stroke', state.color);
                        circle.path.setAttribute('stroke-width', state.width);

                        var value = Math.round(circle.value() * 100);
                        if (value === 0) {
                            circle.setText('');
                        } else {
                            circle.setText(value + '%');
                        }

                    }
                });

                bar.animate($(this).data('value') / 100);  // Number from 0.0 to 1.0
            });


            $('.bar').each(function () {
                var bar = new ProgressBar.Line(this, {
                    strokeWidth: 3,
                    easing: 'easeInOut',
                    duration: 1400,
                    color: $color,
                    trailColor: $('bod').css('backgroundColor'),
                    trailWidth: 0,
                    svgStyle: {width: '100%', height: '10px'},
                    text: {
                        style: {
                            // Text color.
                            // Default: same as stroke color (options.color)
                            color: $color,
                            position: 'absolute',
                            right: '-100px',
                            top: '0px',
                            padding: 0,
                            margin: 0,
                            transform: null
                        },
                        autoStyleContainer: false
                    },
                    from: {color: '#FFEA82'},
                    to: {color: '#ED6A5A'},
                    step: function (sate, bar) {
                        bar.setText(Math.round(bar.value() * 100) + ' %');
                        bar.text.style.right = Math.round((.82 - bar.value()) * 100) + '%';
                    }
                });

                bar.animate($(this).data('value') / 100);  // Number from 0.0 to 1.0
            });

        });
        $('#skills').appear();


        // portfolio lightbox
        var groups = {};
        $('.galleryItem').each(function () {
            var id = parseInt($(this).attr('data-group'), 10);

            if (!groups[id]) {
                groups[id] = [];
            }

            groups[id].push(this);
        });


        $.each(groups, function () {

            $(this).magnificPopup({
                type: 'inline',
                closeBtnInside: true,
                gallery: {
                    enabled: true
                },
                callbacks: {
                    buildControls: function () {
                        // re-appends controls inside the main container
                        this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                    },
                    open: function () {
                        scrolling = true;
                        $('#load_projects').focus();
                    },
                    afterClose: function () {
                        $('html, body').scrollLeft($('.wrap >section:eq(' + current_section + ')').offset().left);
                    },

                    close: function () {
                        // Will fire when popup is closed
                        scrolling = false;
                        $('.logo a').focus();
                    }
                }
            })
        });


        $to_top_btn.on('click', function () {
            scrollPage(null, 0);
            return false;
        });


        $(".typed").typed({
            stringsElement: $('#typed-title'),
            typeSpeed: 100,
            callback: function () {
                $(".title .typed-cursor").remove();
                $(".sub-typed").typed({
                    stringsElement: $('#typed-sub-title'),
                    typeSpeed: 70,
                    loop: true,
                    backDelay: 1000,
                    loopCount: 3, //false for infinite
                    backspace: function (curString, curStrPos) {
                        // check string array position
                        // on the first string, only delete one word
                        // the stopNum actually represents the amount of chars to
                        // keep in the current string. In my case it's 3.
                        if (self.arrayPos === 1) {
                            self.stopNum = 3;
                        }
                        //every other time, delete the whole typed string
                        else {
                            self.stopNum = 0;
                        }
                    }
                });
            }
        });

        $('.nav a').on('click', function () {
            $('.navbar-toggle').click();
        });

        var
            speed = 700,   // animation speed
            masonryOptions = {         // initial masonry options
                itemSelector: '.project',
                animate: true,
                percentPosition: true,
                columnWidth: '.project-sizer',

                animationOptions: {
                    duration: speed,
                    queue: true
                }
            };
        var $filter = $('#filters');

        // run on window.load so we can capture any incoming hashes
        $win.on('load', function () {
            // run masonry on start-up to capture all the boxes we'll need
            $projects.masonry(masonryOptions);
            if (window.location.hash) {
                var possibleFilterClass = window.location.hash.replace('#', '');
                switch (possibleFilterClass) {
                    // if the hash matches the following words
                    case 'web' :
                    case 'branding' :
                    case 'advertisement' :
                        masonryOptions.animate = false;
                        $projects.find('.project').not('.' + possibleFilterClass)
                            .toggleClass('invis').hide();
                        $projects.masonry(masonryOptions);

                        $filter.find('a').removeClass("active");
                        $filter.find("[data-filter='" + possibleFilterClass + "']").addClass('active');
                        break;
                }
            }
        });


        // Projects Filter script
        $filter.on('click', 'a', function () {
            var
                type = $(this).data('filter'),
                filterClass = '.' + type;

            if (filterClass === '.all') {
                // show all hidden boxes
                $projects.find('.invis')
                    .toggleClass('invis').fadeIn(200, function () {
                    $projects.masonry();
                });
            } else {
                // hide visible boxes
                $projects.find('.project').not(filterClass).not('.invis')
                    .toggleClass('invis').fadeOut(400);
                // show hidden boxes
                $projects.find(filterClass + '.invis')
                    .toggleClass('invis').fadeIn(200);
            }
            window.setTimeout(function () {
                $projects.masonry({animate: true});
            }, 500);

            // set hash in URL
            window.location.hash = type;
            $filter.find('a').removeClass("active");
            $(this).addClass("active");
            return false;
        });

        //Smooth page scroll
        $('.navbar-nav').on('click', 'a', function (event) {
            var anchor = '#' + $(this).attr('href').split('#')[1];
            scrollPage($(anchor).offset().left, $(anchor).offset().top);
            current_section = $(anchor).index();
            event.preventDefault();
        });

    });

    $win.scroll(function () {
        if ($win.scrollTop() > 60) {
            $fp_nav.addClass('sticky');
            $to_top_btn.addClass('visible');
        } else {
            $fp_nav.removeClass('sticky');
            $to_top_btn.removeClass('visible');
        }

        if ($resume_details.hasClass('expanded') && $win.scrollTop() < 300 && $win.width() > 767) {

            scrollPage(null, 0, function () {
                $resume_details.removeClass('expanded').hide();
                $('#education').removeClass('dim');
            }, 50);

            expanded = false;
            $('#more-resume').fadeIn(1000);
        }
        if ($projects.hasClass('expanded') && $win.scrollTop() < 50 && $win.width() > 767) {
            scrollPage(null, 0, function () {
                $projects.removeClass('expanded');
            }, 50);

            $projects.css({'max-height': $projects.data('height')});
            $projects.data('height', null);
            $projects.closest('.vcenter').removeClass('block');

            expanded = false;
            $('#load_projects').fadeIn(1000);

        }
    });

    function scrollPage(xPos, yPos, func) {
        if (xPos === null)
            xPos = $win.scrollLeft();
        if (yPos === null)
            yPos = $win.scrollTop();
        // if optional 4th parameter of speed is provided use that otherwise default value of 1500ms
        var speed = arguments[3] || 1500;
        $('html, body').stop().animate({
            scrollLeft: xPos,
            scrollTop: yPos
        }, speed, 'easeInOutExpo', func);
    }

})();