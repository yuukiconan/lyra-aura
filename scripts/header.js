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

        function menuFadeIn() {
            hamburgerMenu.style.animation = `fadeIn .6s cubic-bezier(0.075, 0.82, 0.165, 1)`;

            hamburgerMenu.addEventListener('animationend', () => {
                hamburger.disabled = false;
            })
        }
        
        function openMenu() {
            hamburgerMenu.classList.remove('hidden');
            header.classList.add('no-blend');
            hamburger.disabled = true;

            hamburger.textContent = '/ Close /';
            requestAnimationFrame(() => {
                menuFadeIn();

                staggerElements.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.classList.add('visible');
                    }, index * 60)
                })
            });
        }

        function menuFadeOut() {
            hamburgerMenu.style.animation = 'fadeOut .5s cubic-bezier(0.44, 0, 0.22, 1)';

            hamburgerMenu.addEventListener('animationend', () => {
                if (hamburgerMenu.style.animation.includes('fadeOut')) {
                    header.classList.remove('no-blend');
                    hamburgerMenu.style.animation = '';
                    hamburgerMenu.classList.add('hidden');
                    hamburger.disabled = false;

                    hamburger.textContent = '/ Menu /';
                }
            });
        }

        function closeMenu() {
            hamburger.disabled = true;
            requestAnimationFrame(() => {
                const array = Array.from(staggerElements).reverse();

                array.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.classList.remove('visible');
                    }, index * 60)
                });

                setTimeout(() => {
                    menuFadeOut();
                }, 400)
            });
        }

        function toggleMenuVisibility() {
            if (hamburgerMenu.classList.contains('hidden')) {
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

        // Dark & Light mode handler
        const themeCbx = document.getElementById('theme-cbx');
        const themeToggle = document.querySelector('.theme-toggle');
        const theme = localStorage.getItem('theme') === 'true';

        if (theme) {
            root.classList.toggle('light-mode', theme);
            theme ? themeToggle.textContent = "Theme: Light" : themeToggle.textContent = "Theme: Dark";
        }

        themeToggle.addEventListener('click', () => {
            themeCbx.click();

            themeCbx.addEventListener('change', () => {
                root.classList.toggle('light-mode', themeCbx.checked);
                localStorage.setItem('theme', themeCbx.checked);
                themeCbx.checked ? themeToggle.textContent = "Theme: Light" : themeToggle.textContent = "Theme: Dark";
            })
        });
    })
    .catch(err => {
        console.error(err);
    });
})