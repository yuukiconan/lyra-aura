import LyraUI from "./scripts/framework.js";

const lyra = LyraUI ? new LyraUI("1.0", "Nathania Anneta") : null;

const icon = document.createElement('link');
icon.rel = 'website icon';
icon.href = '/assets/images/lyra.png';
document.head.appendChild(icon);

document.addEventListener('DOMContentLoaded', () => {
    lyra.animateOnScroll('.ui-card-people', {
        animationClass: 'visible',
        stagger: 0.02
    })

    const root = document.documentElement;
    
    root.addEventListener('mousemove', (e) => {
        const acrylic = document.querySelector('.acrylic');
        acrylic.classList.add('visible');

        const rect = root.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        acrylic.style.left = `${x}px`;
        acrylic.style.top = `${y}px`;
    })

    root.addEventListener('mouseleave', (e) => {
        const acrylic = document.querySelector('.acrylic');
        acrylic.classList.remove('visible');
    })
    const hero = document.querySelector('.hero');
    if (!hero) return;

    setTimeout(() => {
        hero.classList.add('loaded')
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

    var Lenis = window.Lenis;
    const lenis = new Lenis({
        duration: 2,
        smooth: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        autoRaf: false,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    })

    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    })
    gsap.ticker.lagSmoothing(0);

    gsap.fromTo('.parallax-heading.to-left', 
        { x: "0%" },
        { x: "-100%", 
            scrollTrigger: {
                start: "top top",
                end: "bottom center",
                scrub: 1,
                marking: false
            }
        }
    )
    gsap.fromTo('.parallax-heading.to-right', 
        { x: "0%" },
        { x: "50%", 
            scrollTrigger: {
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                marking: false
            }
        }
    )
    gsap.fromTo('.parallax-heading.fade-up', 
        { opacity: 0, y: "60" },
        { opacity: 1, y: "-30", 
            scrollTrigger: {
                start: "top+=10px",
                end: "+=2500",
                scrub: 1,
                marking: false
            }
        }
    )
})