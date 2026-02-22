(function ($) {
    ('use strict');
    /*=============================================
    =              Preloader       =
    =============================================*/
    function preloader() {
        $('#preloader').fadeOut();
    }

    /*=============================================
    =    		Magnific Popup		      =
    =============================================*/
    function magnificPopup() {
        /* magnificPopup video view */
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-with-zoom',
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                },
            },
        });
    }
    function theStickySidebar() {
        $('.sidebar_right').stickySidebar({
            topSpacing: 50,
            bottomSpacing: 50,
        });
    }
    /*=============================================
    =           Go to top       =
    =============================================*/
    function progressPageLoad() {
        var progressWrap = document.querySelector('.btn-scroll-top');
        if (progressWrap != null) {
            var progressPath = document.querySelector('.btn-scroll-top path');
            var pathLength = progressPath.getTotalLength();
            var offset = 50;
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
            window.addEventListener('scroll', function (event) {
                var scroll = document.body.scrollTop || document.documentElement.scrollTop;
                var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
                var scrollElementPos = document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollElementPos >= offset) {
                    progressWrap.classList.add('active-progress');
                } else {
                    progressWrap.classList.remove('active-progress');
                }
            });
            progressWrap.addEventListener('click', function (e) {
                e.preventDefault();
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            });
        }
    }

    // link hover effect 1
    function initLinkEffect1() {
        // Find all <a> elements with class .link-effect-1
        const linkElements = document.querySelectorAll('a.link-effect-1');

        linkElements.forEach(function (linkElement) {
            // Check if already processed to avoid duplicates
            if (linkElement.querySelector('span.text-2')) {
                return;
            }

            // Find the first <span> element inside the <a> tag
            const firstSpan = linkElement.querySelector('span');

            if (firstSpan) {
                // Add class "text-1" to the first <span> element
                firstSpan.classList.add('text-1');

                // Get the content of the first <span> element
                const spanContent = firstSpan.textContent;

                // Create a new <span> element with class "text-2"
                const secondSpan = document.createElement('span');
                secondSpan.className = 'text-2';
                secondSpan.textContent = spanContent;

                // Append the new <span> element to the <a> tag
                linkElement.appendChild(secondSpan);
            }
        });
    }
    // button hover effect 1
    function initButtonEffect3() {
        const buttons = document.querySelectorAll('.button-effect-1');

        buttons.forEach((button) => {
            // Get the original text content
            const originalText = button.textContent.trim();

            // Create the HTML structure with wrapper span and two text spans
            const textStructure = `
                <span class="btn-text">
                    <span class="btn-text-1">${originalText}</span>
                    <span class="btn-text-2">${originalText}</span>
                </span>
            `;

            // Replace button content with the new structure
            button.innerHTML = textStructure;
        });
    }

    /*=============================================
    =          Sidebar Menu Toggle Functionality   =
    =============================================*/
    function initSidebarMenu() {
        const navbarTogglers = document.querySelectorAll('.navbar-toggler');
        const sidebarLeft = document.querySelector('.sidebar-left');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');
        const closeSidebar = document.querySelector('.close-sidebar');

        // Add event listener for all navbar togglers if they exist
        if (navbarTogglers.length > 0 && sidebarLeft && sidebarOverlay) {
            navbarTogglers.forEach(function (navbarToggler) {
                navbarToggler.addEventListener('click', function (e) {
                    e.preventDefault();
                    sidebarLeft.classList.add('active');
                    sidebarOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
        }

        // Add event listener for overlay if it exists
        if (sidebarOverlay && sidebarLeft) {
            sidebarOverlay.addEventListener('click', function () {
                sidebarLeft.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Add event listener for close button if it exists
        if (closeSidebar && sidebarLeft && sidebarOverlay) {
            closeSidebar.addEventListener('click', function (e) {
                e.preventDefault();
                sidebarLeft.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Toggle submenu when clicking on menu items with children
        document.querySelectorAll('.sidebar-nav .collapse-toggle').forEach((toggle) => {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                const parentItem = this.closest('.nav-item');
                const submenu = this.nextElementSibling;

                // Toggle active class on parent item
                parentItem.classList.toggle('active');

                // Toggle the submenu
                if (submenu && submenu.classList.contains('collapse-menu')) {
                    if (submenu.style.maxHeight) {
                        submenu.style.maxHeight = null;
                    } else {
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    }
                }
            });
        });

        // Toggle submenu for items with has-child class
        document.querySelectorAll('.sidebar-nav .has-child').forEach((childToggle) => {
            childToggle.addEventListener('click', function (e) {
                e.preventDefault();
                const parentItem = this.closest('.nav-item-has-child');
                const submenu = this.nextElementSibling;

                // Toggle active class on parent item
                parentItem.classList.toggle('active');

                // Toggle the submenu
                if (submenu && submenu.classList.contains('sub-menu')) {
                    if (submenu.style.maxHeight) {
                        submenu.style.maxHeight = null;
                    } else {
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    }
                }
            });
        });

        // Close sidebar when clicking on close button
        document.querySelectorAll('.close-popup').forEach((closeBtn) => {
            closeBtn.addEventListener('click', function () {
                document.querySelector('.sidebar-left').classList.remove('active');
                document.querySelector('.popup-search-overlay').classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    /*=============================================
    =          Tab Functionality         =
    =============================================*/
    function initTabs() {
        const tabLinks = document.querySelectorAll('[data-bs-toggle="tab"], [data-toggle="tab"]');

        if (!tabLinks.length) return;

        // Function to show tab
        function showTab(tabLink) {
            if (!tabLink || !tabLink.getAttribute('href')) return;

            const tabId = tabLink.getAttribute('href');
            const tabPane = document.querySelector(tabId);

            if (!tabPane) return;

            // Hide all tab panes and deactivate all tab links
            document.querySelectorAll('.tab-pane').forEach((pane) => {
                pane.classList.remove('show', 'active');
            });

            tabLinks.forEach((link) => {
                link.classList.remove('active');
                link.setAttribute('aria-selected', 'false');
            });

            // Show the selected tab pane and activate the tab link
            tabLink.classList.add('active');
            tabLink.setAttribute('aria-selected', 'true');
            tabPane.classList.add('show', 'active');

            // Trigger a custom event in case other scripts need to know about tab changes
            const event = new Event('shown.bs.tab');
            tabLink.dispatchEvent(event);
        }

        // Handle click events
        tabLinks.forEach((tabLink) => {
            tabLink.addEventListener('click', function (e) {
                e.preventDefault();
                showTab(this);
            });

            // Set initial ARIA attributes
            tabLink.setAttribute('role', 'tab');
            tabLink.setAttribute('aria-selected', 'false');

            // Set up keyboard navigation
            tabLink.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showTab(this);
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const tabs = Array.from(tabLinks);
                    const currentIndex = tabs.indexOf(this);
                    let nextIndex = e.key === 'ArrowRight' ? currentIndex + 1 : currentIndex - 1;

                    // Loop around if at the start/end
                    if (nextIndex >= tabs.length) nextIndex = 0;
                    if (nextIndex < 0) nextIndex = tabs.length - 1;

                    tabs[nextIndex].focus();
                }
            });
        });

        // Show first tab by default if none is active
        const activeTab = document.querySelector('.nav-link.active, .nav-tabs .active');
        if (activeTab) {
            showTab(activeTab);
        } else if (tabLinks.length > 0) {
            showTab(tabLinks[0]);
        }
    }

    /*=============================================
    =          Collapse/Accordion Functionality         =
    =============================================*/
    function initCollapse() {
        // Find all collapse triggers
        const collapseTriggers = document.querySelectorAll('[data-bs-toggle="collapse"]');

        collapseTriggers.forEach(function (trigger) {
            // Prevent duplicate event listeners
            if (trigger.dataset.collapseInitialized === 'true') {
                return;
            }
            trigger.dataset.collapseInitialized = 'true';

            // Initialize collapsed state based on current state
            const href = trigger.getAttribute('href');
            if (href) {
                const targetId = href.startsWith('#') ? href : '#' + href;
                const collapseElement = document.querySelector(targetId);
                if (collapseElement) {
                    // Add transition for smooth animation
                    collapseElement.style.transition = 'height 0.35s ease';
                    collapseElement.style.overflow = 'hidden';

                    const isShown = collapseElement.classList.contains('show');
                    if (!isShown) {
                        trigger.classList.add('collapsed');
                        collapseElement.style.height = '0px';
                    } else {
                        trigger.classList.remove('collapsed');
                        collapseElement.style.height = collapseElement.scrollHeight + 'px';
                    }
                }
            }

            trigger.addEventListener('click', function (e) {
                e.preventDefault();

                const href = this.getAttribute('href');
                if (!href) return;

                const targetId = href.startsWith('#') ? href : '#' + href;
                const collapseElement = document.querySelector(targetId);
                if (!collapseElement) return;

                // Ensure transition is set
                collapseElement.style.transition = 'height 0.35s ease';
                collapseElement.style.overflow = 'hidden';

                const isCurrentlyShown = collapseElement.classList.contains('show');
                const parentSelector = collapseElement.getAttribute('data-bs-parent');

                // If has parent (accordion mode), close other collapses in the same parent
                if (parentSelector) {
                    const parent = document.querySelector(parentSelector);
                    if (parent) {
                        // Close all other collapses in the same parent
                        parent.querySelectorAll('.collapse.show').forEach(function (otherCollapse) {
                            if (otherCollapse !== collapseElement) {
                                const otherTrigger = parent.querySelector('[href="#' + otherCollapse.id + '"]');
                                if (otherTrigger) {
                                    otherTrigger.classList.add('collapsed');
                                }
                                // Close with animation
                                otherCollapse.style.height = '0px';
                                setTimeout(function () {
                                    otherCollapse.classList.remove('show');
                                }, 350);
                            }
                        });
                    }
                }

                // Toggle current collapse
                if (isCurrentlyShown) {
                    // Close
                    this.classList.add('collapsed');
                    collapseElement.style.height = '0px';
                    setTimeout(function () {
                        collapseElement.classList.remove('show');
                    }, 350);
                } else {
                    // Open
                    collapseElement.classList.add('show');
                    // Force reflow to ensure height is calculated correctly
                    collapseElement.style.height = '0px';
                    requestAnimationFrame(
                        function () {
                            const targetHeight = collapseElement.scrollHeight + 'px';
                            collapseElement.style.height = targetHeight;
                            this.classList.remove('collapsed');
                        }.bind(this),
                    );

                    // Clean up after animation
                    setTimeout(function () {
                        if (collapseElement.classList.contains('show')) {
                            collapseElement.style.height = 'auto';
                        }
                    }, 350);
                }
            });
        });
    }

    /*=============================================
    =          Popup Search Functionality         =
    =============================================*/
    function initPopupSearch() {
        const searchBtn = document.querySelector('.search-btn');
        const popupSearch = document.querySelector('.popup-search');
        const closeBtn = document.querySelector('.close-popup');
        const popupOverlay = document.querySelector('.popup-search-overlay');

        function showPopup() {
            document.body.style.overflow = 'hidden';
            popupSearch.classList.add('show');
            popupOverlay.classList.add('active');
            // Focus on search input when popup opens
            const searchInput = popupSearch.querySelector('input[type="text"]');
            if (searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                }, 100);
            }
        }

        function hidePopup() {
            document.body.style.overflow = '';
            popupSearch.classList.remove('show');
            popupOverlay.classList.remove('active');
        }

        if (searchBtn && popupSearch && popupOverlay) {
            // Show popup when search button is clicked
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                showPopup();
            });
        }

        if (closeBtn && popupSearch && popupOverlay) {
            // Hide popup when close button is clicked
            closeBtn.addEventListener('click', function (e) {
                e.preventDefault();
                hidePopup();
            });
        }

        // Close popup when clicking on overlay
        if (popupOverlay) {
            popupOverlay.addEventListener('click', function () {
                hidePopup();
            });
        }

        // Close popup when clicking outside of the popup content
        if (popupSearch) {
            popupSearch.addEventListener('click', function (e) {
                if (e.target === popupSearch) {
                    hidePopup();
                }
            });
        }
    }

    function customSwiper() {
        const swiperCategory = new Swiper('.swiper-category', {
            slidesPerView: 1,
            spaceBetween: 24,
            slidesPerGroup: 1,
            centeredSlides: false,
            loop: true,
            autoplay: {
                delay: 4000,
            },
        });
        const swiperCategory2 = new Swiper('.swiper-category-2', {
            slidesPerView: 1,
            spaceBetween: 24,
            slidesPerGroup: 1,
            centeredSlides: false,
            loop: true,
            autoplay: {
                reverseDirection: true,
                delay: 4000,
            },
        });

        const galleryThumbs = new Swiper('.testimonials-thumbs', {
            spaceBetween: 16,
            slidesPerView: 5,
            freeMode: true,
            autoplay: {
                delay: 4000,
            },
            loop: true,
            breakpoints: {
                1200: {
                    slidesPerView: 5,
                },
                992: {
                    slidesPerView: 5,
                },
                768: {
                    slidesPerView: 5,
                },
                576: {
                    slidesPerView: 4,
                },
                0: {
                    slidesPerView: 4,
                },
            },
        });

        const galleryTop = new Swiper('.testimonials-swiper', {
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            freeMode: false,
            autoplay: {
                delay: 4000,
            },
            thumbs: {
                swiper: galleryThumbs,
            },
        });

        const slider1 = new Swiper('.slider-1', {
            slidesPerView: 1,
            spaceBetween: 0,
            slidesPerGroup: 1,
            centeredSlides: false,
            loop: true,
            autoplay: {
                delay: 4000,
            },
            navigation: {
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
            },
        });
        const slider3 = new Swiper('.slider-3', {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup: 1,
            centeredSlides: false,
            loop: true,
            autoplay: {
                delay: 4000,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                },
                576: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
    }

    function inputFocus() {
        $('input')
            .focus(function () {
                $(this).closest('div.input-group').addClass('focus');
            })
            .blur(function () {
                $(this).closest('div.input-group').removeClass('focus');
            });
        $('textarea')
            .focus(function () {
                $(this).closest('div.input-group').addClass('focus');
            })
            .blur(function () {
                $(this).closest('div.input-group').removeClass('focus');
            });
        $('select')
            .focus(function () {
                $(this).closest('div.input-group').addClass('focus');
            })
            .blur(function () {
                $(this).closest('div.input-group').removeClass('focus');
            });
    }
    /*=============================================
    =          Portfolio Filter Functionality         =
    =============================================*/
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-portfolio .filter-btn');
        const portfolioCards = document.querySelectorAll('.card-portfolio');

        if (filterButtons.length === 0 || portfolioCards.length === 0) {
            return;
        }

        filterButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Remove active class from all buttons
                filterButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                this.classList.add('active');

                // Get the filter value
                const filterValue = this.getAttribute('data-filter');

                // Filter portfolio cards
                portfolioCards.forEach(function (card) {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        // Show card with fade in animation
                        card.style.display = '';
                        card.style.opacity = '0';
                        setTimeout(function () {
                            card.style.transition = 'opacity 0.3s ease';
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        // Hide card with fade out animation
                        card.style.transition = 'opacity 0.3s ease';
                        card.style.opacity = '0';
                        setTimeout(function () {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    $(window).on('load', function () {
        preloader();
        progressPageLoad();
        customSwiper();
        initSidebarMenu();
        initTabs();
        inputFocus();
        magnificPopup();
        initPopupSearch();
        initCollapse();
        initLinkEffect1();
        initButtonEffect3();
        initPortfolioFilter();
        theStickySidebar();
    });
})(jQuery);
