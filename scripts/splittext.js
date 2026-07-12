document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero.isFixed');
    const uiPeoples = document.querySelectorAll('.ui-people-box .stagger-element');
    
    setTimeout(() => {
        uiPeoples.forEach((uiPeople, index) => {
            setTimeout(() => {
                uiPeople.classList.add('active');
            }, index * 300);
        });
    }, 3000);
    
    document.fonts.ready.then(() => {
        const split = new SplitText(".info-box p", { type: "lines" });
        
        gsap.from(split.lines, {
            duration: 0.5,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".info-box",
                start: "top 150%",
                end: "bottom 130%",
                scrub: false,
                markers: false
            }
        });
    });
    const container = document.querySelector('.horizontal-gallery-wrapper');
    const track = document.querySelector('.horizontal-track')
    const sections = gsap.utils.toArray('.ui-gallery-view');
    if (!container || !track) return;
    const distance = () => track.scrollWidth - window.innerWidth;

    var scrollTween = gsap.to(track, {
        x: () => -distance() + 'px',
        ease: "none",
        scrollTrigger: {
            trigger: container,
            pin: true,
            start: "top top",
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            snap: {
                snapTo: 1 / (sections.length - 1),
                duration: 0.6,
                ease: "power1.inOut"
            },
            end: () => "+=" + distance()
        }
    });
});
