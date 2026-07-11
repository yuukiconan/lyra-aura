document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.video').playbackRate = 1.25;

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
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    })

    gsap.from('.hero-content img', {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    })

});
