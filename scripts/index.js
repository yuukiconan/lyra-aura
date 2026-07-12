document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.video');
    const firstGlance = document.querySelector('.hero-first-glance');
    const isVideoPlayed = document.getElementById('isVideoPlayed');
    const circle = document.querySelector('.acrylic');
    const circleText = circle.querySelector('.circle-text');

    video.currentTime = 7.9;

    firstGlance.addEventListener('mouseenter', () => {
        if (isVideoPlayed.checked) {
            circleText.textContent = firstGlance.dataset.circleTextAfter;
        } else {
            circleText.textContent = firstGlance.dataset.circleText;
        }
    });

    firstGlance.addEventListener('click', () => {
        isVideoPlayed.click();

        isVideoPlayed.addEventListener('change', (e) => {
            if (e.target.checked) {
                video.pause();
                circleText.textContent = firstGlance.dataset.circleTextAfter;
            } else {
                video.play();
                circleText.textContent = firstGlance.dataset.circleText;
            }
        });
    })

    firstGlance.addEventListener('mouseleave', () => {
        circleText.classList.remove('visible');
        circleText.textContent = '';
    })

    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    document.fonts.ready.then(() => {
        const splitHeading = new SplitText(".hero-heading", { type: "chars" });
        
        gsap.from(splitHeading.chars, {
            duration: 1,
            x: -20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            delay: 2.5
        });

        const splitSlogan = new SplitText(".section-content-at-bottom h1.right", { type: "words" });
        
        gsap.from(splitSlogan.words, {
            duration: 0.6,
            x: -20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            delay: 3
        });
        
    });

    gsap.from('.hero-content img', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    })

    setTimeout(() => {
        gsap.to('.hero-content img', {
            scale: 0,
            opacity: 0,
            duration: 1.1,
            ease: "power1.inOut"
        })
    }, 2000)

    gsap.from('.parallax-heading.fade-up', 
        { 
            opacity: 0, 
            y: 40, 
            scrollTrigger: {
                start: "center center",
                end: "bottom center",
            }
        }
    )
});
