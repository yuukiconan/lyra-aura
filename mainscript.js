import LyraUI from "./scripts/framework.js";

const lyra = LyraUI ? new LyraUI("1.0", "Nathania Anneta") : null;
window.lyra = lyra;

const icon = document.createElement('link');
icon.rel = 'website icon';
icon.href = '/assets/images/lyra.png';
document.head.appendChild(icon);

document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
        duration: 2,
        smooth: true,
        autoRaf: false,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    })

    window.lenis = lenis;
    
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', () => {
        ScrollTrigger.update();
    });
    
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    if (hamburgerMenu) {
        if (!hamburgerMenu.classList.contains('hidden')) {
            lenis.stop();
        } else {
            lenis.start();
        }
        
    }
    
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const peopleCards = document.querySelectorAll('.ui-card-people');
    if (!peopleCards) return;

    const root = document.documentElement;
    
    const circle = document.createElement('div');
    const circleText = document.createElement('span');
    circle.className = 'acrylic';
    circleText.className = 'circle-text';
    peopleCards.forEach(el => {
        el.setAttribute('data-circle-text', 'Enter');
        el.setAttribute('tabIndex', '0');

        function redirectToPerson() {
            if (el.dataset.person) {
                const personId = el.dataset.person;
                const targetLink = `/about/${personId}.html`;

                window.location.href = targetLink;
            }
        }

        el.addEventListener('click', redirectToPerson);
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                redirectToPerson();
            }
        })
    });
    
    const texts = document.querySelectorAll('[data-circle-text]');
    texts.forEach(el => {
        el.addEventListener('mouseenter', () => {
            circleText.textContent = el.dataset.circleText;
            circleText.classList.add('visible');
        });
        el.addEventListener('mouseleave', () => {
            circleText.classList.remove('visible');
        })
    })

    circle.appendChild(circleText);
    root.appendChild(circle);
    
    root.addEventListener('mousemove', (e) => {
        circle.classList.add('visible');
        const x = e.clientX;
        const y = e.clientY;

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
    })

    root.addEventListener('mouseleave', () => {
        circle.classList.remove('visible');
    })

    const hero = document.querySelector('.hero');
    if (!hero) return;
    if (!hero.classList.contains('loaded')) lenis.stop();

    setTimeout(() => {
        hero.classList.add('loaded')
        lenis.start();
    }, 2000)
    
    window.addEventListener('scroll', () => {
        if (window.scrollY <= 0) {
            hero.classList.remove('loaded');
            hero.classList.add('backToPos');
        }
        if (hero.classList.contains('backToPos') && window.scrollY > 10) {
            hero.classList.remove('backToPos');
            hero.classList.add('loaded');
        }
    }, {passive: true});
    history.scrollRestoration = 'manual';
    document.fonts.ready.then(() => {
        const split = new SplitText(".hero-content h1", { type: "words" });
        
        gsap.from(split.words, {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero-content",
                scrub: false,
                markers: false
            }
        });
    });

    // Dialog handler
    function openDialog(className) {
        document.querySelector(`.${className}`)?.showModal();
        root.classList.add('noscroll');
        lenis.stop();
    }

    document.addEventListener('click', (e) => {
        const dialogOpen = e.target.closest('[data-dialog-open]');
        if (dialogOpen) {
            openDialog(dialogOpen.dataset.dialogOpen);
        }

        const closeBtn = e.target.closest('[data-dialog-close]');
        const dialog = closeBtn?.closest('dialog');
        if (closeBtn) {
            requestAnimationFrame(() => {
                dialog.style.animation = `fadeOut 350ms cubic-bezier(0.5, 0, 0.75, 0)`;
                dialog.addEventListener('animationend', () => {
                    closeBtn.closest('dialog')?.close();
                    dialog.style.animation = '';
                    root.classList.add('noscroll');
                    lenis.start();
                }, {once: true});
            })
        }
    });
})