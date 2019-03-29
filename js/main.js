"use strict";
(function () {
    var scrolling = false,
        expanded = false,
        current_section = 0,
        circlesShown = false;
    var $body = $('body'),
        $win = $(window),
        $projects = $('.projects'),
        $resume_details = $('.resume_details_block'),
        $to_top_btn = $('.back-to-top'),
        $fp_nav = $('.full-page-nav-container');

    $(document).on('ready', function () {
        console.log("%c Contact: itsnabeel@gmail.com", "color: #FFFFFF; background: #CF0A2C; font-size: x-large");

        $body.addClass('loaded');
        $body.css('overflow-x', 'hidden');


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
                    from: {
                        color: $color,
                        width: 4
                    },
                    to: {
                        color: $color,
                        width: 4
                    },
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

                bar.animate($(this).data('value') / 100); // Number from 0.0 to 1.0
            });


            $('.bar').each(function () {
                var bar = new ProgressBar.Line(this, {
                    strokeWidth: 3,
                    easing: 'easeInOut',
                    duration: 1400,
                    color: $color,
                    trailColor: $('bod').css('backgroundColor'),
                    trailWidth: 0,
                    svgStyle: {
                        width: '100%',
                        height: '10px'
                    },
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
                    from: {
                        color: '#FFEA82'
                    },
                    to: {
                        color: '#ED6A5A'
                    },
                    step: function (sate, bar) {
                        bar.setText(Math.round(bar.value() * 100) + ' %');
                        bar.text.style.right = Math.round((.82 - bar.value()) * 100) + '%';
                    }
                });

                bar.animate($(this).data('value') / 100); // Number from 0.0 to 1.0
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
                        // $('html, body').scrollLeft($('.wrap >section:eq(' + current_section + ')').offset().left);
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


        $('.nav a').on('click', function () {
            $('.navbar-toggle').click();
        });

        var
            speed = 700; // animation speed

        var $filter = $('#filters');



        //Smooth page scroll
        $('.navbar-nav').on('click', 'a', function (event) {
            var anchor = '#' + $(this).attr('href').split('#')[1];
            scrollPage($(anchor).offset().left, $(anchor).offset().top - 100);
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
