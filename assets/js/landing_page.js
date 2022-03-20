(function ($) {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 20
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.lanp-back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Todo: use CountUp
     */

    // Home number counterup
    if ($('.counter').length && parseInt($('.counter').text()) > 0) {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    }

    // Basic carousel
    if ($('.basic-carousel .owl-carousel').length) {
        $('.basic-carousel .owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        })
    }
 

    // Base caroousel
    var owl = $('.custom-owl-container .owl-carousel');
    owl.owlCarousel({
        lazyLoad: true,
        autoplay: true,
        stagePadding: 10,
        loop: true,
        margin: 10,
        nav: true,
        navText: [
            '<i class="bi bi-caret-left-fill" aria-hidden="true"></i>',
            '<i class="bi bi-caret-right-fill" aria-hidden="true"></i>'
        ],
        navContainer: '.custom-owl-container .custom-nav',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });

    // Go to the next item for Custom nav
    if ($('.custom-nav .owl-next').length) {
        $('.custom-nav .owl-next').click(function() {
            owl.trigger('next.owl.carousel');
        });
    }

// Apexcharts
var options = {
    series: [30000000, 150000000, 50000000, 150000000, 250000000, 150000000, 120000000, 100000000],
    labels: [
        "Airdrop campaign and marketing promotion",
        "Pre-Sale Release",
        "under the management of the Advisory Board",
        "listed on reserve fund and exchange",
        "for P2E - accompanying ecosystem",
        "under the management of the development team and ecosystem administrator",
        "for international marketing and expansion",
        "for project development fund"
    ],
    colors: ['#d3d3d3', '#32cd32', '#87cefa', '#c50f0f', '#db7093', '#9acd32', '#808000', '#483d8b'],
    chart: {
        width: 380,
        type: 'pie',
    },
    legend: {
        show: false,
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 300
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();


/**
 * Animation on scroll
 */
window.addEventListener('load', () => {
    AOS.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    })
});
    

})(window.jQuery);