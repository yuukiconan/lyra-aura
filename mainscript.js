const icon = document.createElement('link');
icon.rel = 'website icon';
icon.href = '/assets/images/lyra.png';
document.head.appendChild(icon);

document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    setTimeout(() => {
        hero.classList.add('loaded')
    }, 2000)
    window.addEventListener('scroll', (e) => {
        e.preventDefault();
        
        console.log(window.scrollY, document.body.scrollTop)
        if (window.scrollY <= 0) {
            hero.classList.remove('loaded');
            hero.classList.add('backToPos');
        }
        if (hero.classList.contains('backToPos') && window.scrollY > 10) {
            hero.classList.remove('backToPos');
            hero.classList.add('loaded');
        }
    })
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