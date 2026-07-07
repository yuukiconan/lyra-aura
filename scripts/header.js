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
    })
    .finally(() => {
        const header = document.querySelector('header');

        window.addEventListener('scroll', () => {
            window.scrollY > 30 || document.documentElement.scrollTop > 30 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
        })

        const hamburger = document.querySelector('.hamburger');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const staggerElements = document.querySelectorAll('.stagger-element');
        const root = document.documentElement;
        let scrollDisabled = false;
        let scrollTop = 0;
        
        function openMenu() {
            if (scrollDisabled) return;

            scrollTop = window.scrollY || window.pageYOffset;

            root.style.top = `-${scrollTop}px`;
            root.classList.add('noscroll');

            scrollDisabled = true;

            hamburgerMenu.classList.remove('hidden');
            hamburger.classList.add('no-pointer');
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
            if (!scrollDisabled) return;

            root.style.top = '';
            root.classList.remove('noscroll');
            window.scrollTo(0, scrollTop);

            scrollDisabled = false;

            requestAnimationFrame(() => {
                const array = Array.from(staggerElements).reverse();

                array.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.classList.remove('visible');
                    }, index * 60);

                    btn.addEventListener('transitionend', (e) => {
                        if (e.propertyName !== 'opacity') return;
                        
                        if (!btn.classList.contains('visible')) {
                            hamburgerMenu.classList.add('hidden');
                            header.classList.remove('no-blend');
                            hamburger.classList.remove('no-pointer');
                            hamburger.textContent = '/ Menu /';
                        }
                    }, { once: true});
                })
            });
        }

        async function toggleMenuVisibility() {
            if (hamburgerMenu.classList.contains('hidden')) {
                hamburger.textContent = '/ Close /';
                openMenu();
            } else {
                await closeMenu();
            }
        }

        hamburger.addEventListener('click', toggleMenuVisibility)
    })
    .catch(err => {
        console.error(err);
    });
})