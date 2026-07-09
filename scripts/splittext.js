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
});
