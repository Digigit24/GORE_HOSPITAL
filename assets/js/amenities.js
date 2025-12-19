
document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Animate the section title
    gsap.from(".amenities-grid", {
        scrollTrigger: {
            trigger: ".amenities-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: "power3.out",
    });

    // Animate individual cards with staggering
    const cards = document.querySelectorAll(".amenity-card");

    if (cards.length > 0) {
        if (typeof ScrollTrigger !== "undefined") {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: ".amenities-grid",
                    start: "top 80%",
                },
                duration: 0.6,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: "back.out(1.7)",
            });
        } else {
            // Fallback if ScrollTrigger isn't loaded for some reason
            gsap.from(cards, {
                duration: 0.6,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 0.5
            });
        }
    }

    // Add hover animations for icons
    cards.forEach((card) => {
        const iconFn = card.querySelector("svg");
        if (!iconFn) return;

        card.addEventListener("mouseenter", () => {
            gsap.to(iconFn, {
                scale: 1.15,
                duration: 0.4,
                ease: "back.out(1.7)",
                color: "#02a7e9" // Optional: shift color slightly or just keep scale
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(iconFn, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    });
});
