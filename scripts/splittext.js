document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero.isPeople');
    const uiPeoples = document.querySelectorAll('.ui-people-box .stagger-element');
    
    setTimeout(() => {
        uiPeoples.forEach((uiPeople, index) => {
            setTimeout(() => {
                uiPeople.classList.add('active');
            }, index * 300);
        });
    }, 3000);

    const split = new SplitText(".info-box p", { type: "lines" });
    gsap.from(split.lines, {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".info-box",
            start: "top 100%",
            end: "bottom 100%",
            scrub: 1,
            markers: false
        }
    })
});
