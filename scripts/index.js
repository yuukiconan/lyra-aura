document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    document.fonts.ready.then(() => {
        const split = new SplitText(".hero-content h1", { type: "words" });
        
        gsap.from(split.words, {
            duration: 1,
            x: -20,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero-content",
                scrub: false,
                markers: false
            }
        });
        gsap.from('.hero-content img', {
            x: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }
            
        )
    });

});
