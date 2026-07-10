document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then(() => {
        const split = new SplitText(".ui-entrance-index h1", { type: "words" });
        
        gsap.from(split.words, {
            duration: 0.6,
            y: -20,
            opacity: 0,
            stagger: 0.3,
            ease: "power2.out",
        });

        const split1 = new SplitText(".ui-entrance-index p", { type: "lines" });
    
        gsap.from(split1.lines, {
            duration: 1,
            y: -20,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
        });
    });

    const container = document.querySelector('.horizontal-container');
    const track = document.querySelector('.horizontal-track')
    const sections = gsap.utils.toArray('.ui-gallery-view');

    gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            snap: {
                snapTo: 1 / (sections.length - 1),
                duration: 0.8,
                delay: 0.5,
                ease: "power1.inOut"
            },
            end: () => "+=" + (track.scrollWidth - window.innerWidth)
        }
    })
});
