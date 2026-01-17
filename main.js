/**
 * InternetCharlotte.com - Main JavaScript
 * Using jQuery for DOM manipulation and animations
 */

$(document).ready(function() {
    'use strict';

    // =============================================
    // Mobile Navigation Toggle
    // =============================================
    $('#mobileMenuToggle').on('click', function() {
        $(this).toggleClass('active');
        $('#mainNav').toggleClass('active');
    });

    // Close mobile menu when clicking a link
    $('#mainNav a').on('click', function() {
        $('#mobileMenuToggle').removeClass('active');
        $('#mainNav').removeClass('active');
    });

    // =============================================
    // Header Scroll Effect
    // =============================================
    var $header = $('header');
    var scrollThreshold = 50;

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > scrollThreshold) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    });

    // =============================================
    // Smooth Scroll for Anchor Links
    // =============================================
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // =============================================
    // Scroll Animation for Elements
    // =============================================
    function animateOnScroll() {
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();

        $('.animate-on-scroll').each(function() {
            var $element = $(this);
            var elementTop = $element.offset().top;
            var triggerPoint = scrollTop + windowHeight - 100;

            if (elementTop < triggerPoint) {
                $element.addClass('visible');
            }
        });
    }

    // Run on load and scroll
    animateOnScroll();
    $(window).on('scroll', animateOnScroll);

    // =============================================
    // Counter Animation for Stats
    // =============================================
    var countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        var $statsSection = $('.why-us, .stats-grid');
        if ($statsSection.length === 0) return;

        var sectionTop = $statsSection.first().offset().top;
        var scrollPosition = $(window).scrollTop() + $(window).height();

        if (scrollPosition > sectionTop + 100) {
            countersAnimated = true;

            $('.stat-number').each(function() {
                var $counter = $(this);
                var target = parseInt($counter.attr('data-count'), 10);
                var duration = 2000;
                var startTime = null;

                function updateCounter(currentTime) {
                    if (!startTime) startTime = currentTime;
                    var progress = Math.min((currentTime - startTime) / duration, 1);

                    // Easing function for smooth animation
                    var easeOut = 1 - Math.pow(1 - progress, 3);
                    var current = Math.floor(easeOut * target);

                    $counter.text(current);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        $counter.text(target);
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    // Run counter animation on scroll
    $(window).on('scroll', animateCounters);
    animateCounters(); // Check on load

    // =============================================
    // Contact Form Handling
    // =============================================
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        var $form = $(this);
        var $submitBtn = $form.find('.form-submit');
        var $successMsg = $('#formSuccess');

        // Basic validation
        var isValid = true;
        $form.find('[required]').each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });

        // Email validation
        var emailField = $form.find('#email');
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.val())) {
            isValid = false;
            emailField.addClass('error');
        }

        if (!isValid) {
            return false;
        }

        // Simulate form submission
        $submitBtn.prop('disabled', true).text('Sending...');

        // Simulate API call delay
        setTimeout(function() {
            $form.fadeOut(300, function() {
                $successMsg.addClass('show').fadeIn(300);
            });
        }, 1500);
    });

    // Remove error class on input
    $('input, textarea').on('input', function() {
        $(this).removeClass('error');
    });

    // =============================================
    // Add CSS for scrolled header
    // =============================================
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            header.scrolled {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }

            input.error, textarea.error {
                border-color: #dc3545 !important;
            }

            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }

            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }

            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        `)
        .appendTo('head');

    // =============================================
    // Parallax Effect for Hero (subtle)
    // =============================================
    $(window).on('scroll', function() {
        var scrolled = $(this).scrollTop();
        var $hero = $('.hero, .page-header');

        if ($hero.length && scrolled < $hero.height()) {
            $hero.css('background-position-y', (scrolled * 0.4) + 'px');
        }
    });

    // =============================================
    // Service Cards Hover Effect Enhancement
    // =============================================
    $('.service-card').on('mouseenter', function() {
        $(this).find('.service-icon').css('transform', 'scale(1.1) rotate(5deg)');
    }).on('mouseleave', function() {
        $(this).find('.service-icon').css('transform', 'scale(1) rotate(0deg)');
    });

    // Add transition to service icons
    $('.service-icon').css('transition', 'transform 0.3s ease');

    // =============================================
    // Active Navigation Highlight
    // =============================================
    function setActiveNav() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        $('nav ul li a').each(function() {
            var href = $(this).attr('href');
            if (href === currentPage) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }

    setActiveNav();

    // =============================================
    // Lazy Load Images Enhancement
    // =============================================
    $('img').each(function() {
        var $img = $(this);
        $img.on('load', function() {
            $img.addClass('loaded');
        });

        // Add loaded class if already cached
        if (this.complete) {
            $img.addClass('loaded');
        }
    });

    // Add fade-in style for images
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            img {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            img.loaded {
                opacity: 1;
            }
            .logo img, .footer-skyline {
                opacity: 1;
            }
        `)
        .appendTo('head');

    // =============================================
    // Console Welcome Message
    // =============================================
    console.log('%cInternetCharlotte.com', 'color: #1a5f7a; font-size: 24px; font-weight: bold;');
    console.log('%cTransforming businesses through technology', 'color: #159895; font-size: 14px;');

});
