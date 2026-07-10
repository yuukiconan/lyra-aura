document.addEventListener('DOMContentLoaded', () => {
    fetch('../elements/header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        document.querySelector('header').innerHTML = data;

        const header = document.querySelector('header');
        /* let lastScrollY = window.scrollY;
        const headerContent = header.querySelector('.header-content');
        
        window.addEventListener('scroll', () => {
            let currentScrollY = window.scrollY;

            currentScrollY > lastScrollY ? headerContent.classList.add('hide') : headerContent.classList.remove('hide');
            
            lastScrollY = currentScrollY;
            
        }); */


        const hamburger = document.querySelector('.hamburger');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const staggerElements = document.querySelectorAll('.stagger-element');
        const root = document.documentElement;
        const lenis = window.lenis;
        
        function openMenu() {
            hamburgerMenu.classList.remove('hidden');
            header.classList.add('no-blend');
            
            requestAnimationFrame(() => {
                staggerElements.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.classList.add('visible');
                    }, index * 60)
                })
            });
        }

        function closeMenu() {
            requestAnimationFrame(() => {
                const array = Array.from(staggerElements).reverse();

                array.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.classList.remove('visible');
                    }, index * 60);

                    btn.addEventListener('transitionend', (e) => {
                        if (!btn.classList.contains('visible')) {
                            hamburgerMenu.classList.add('hidden');
                            header.classList.remove('no-blend');
                            hamburger.textContent = '/ Menu /';
                        }
                    }, { once: true});
                })
            });
        }

        function toggleMenuVisibility() {
            if (hamburgerMenu.classList.contains('hidden')) {
                hamburger.textContent = '/ Close /';
                root.classList.add('noscroll');
                lenis.stop();
                openMenu();
            } else {
                lenis.start();
                root.classList.remove('noscroll');
                closeMenu();
            }
        }

        hamburger.addEventListener('click', toggleMenuVisibility);
    })
    .catch(err => {
        console.error(err);
    });
})