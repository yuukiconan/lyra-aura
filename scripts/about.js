document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then(() => {
        setTimeout(() => {
            SplitText.create(".entrance-header h1", {
                type: "lines",
                autoSplit: true,
                onSplit: (self) => {
                    return gsap.from(self.lines, {
                        y: -20,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.1
                    })
                }
            });
            
            SplitText.create(".ui-entrance-index p", {
                type: "lines",
                autoSplit: true,
                onSplit: (self) => {
                    return gsap.from(self.lines, {
                        y: -20,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".ui-entrance-index",
                            start: "top 100%",
                            end: "bottom top"
                        }
                    })
                }
            })
        }, 1900);
    });

    const container = document.querySelector('.horizontal-container');
    const track = document.querySelector('.horizontal-track')
    const sections = gsap.utils.toArray('.ui-gallery-view');
    const distance = () => track.scrollWidth - container.clientWidth;
    const snapPoints = sections.map((_, i) => i / sections.length - 1);

    gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
            trigger: container,
            start: "top 1%",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            end: () => "+=" + distance(),
            markers: true
        }
    });
});
