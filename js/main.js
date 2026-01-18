gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.05 });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

const world = document.querySelector('.world');
const videos = document.querySelectorAll('.v-layer');

const masterTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".viewport",
        start: "top top",
        end: "+=8500", 
        scrub: 1,
        pin: true
    }
});

masterTl
    .to(world, { xPercent: -33.33, duration: 2, 
        onStart: () => switchVideo(1), onReverseComplete: () => switchVideo(0) 
    })
    
    .to(".s2-title", { 
        top: "15%", left: "80%", scale: 0.4, opacity: 0.3, 
        duration: 2, ease: "power2.inOut" 
    })
    
    .to(".interactive-content", { opacity: 1, duration: 0.5 }, "-=1")
    .fromTo(".line-under", 
        { height: 0 }, 
        { 
            height: (i) => [180, 100, 140, 220][i], 
            duration: 1.5, 
            stagger: 0.15, 
            ease: "power2.out" 
        }, 
        "-=0.5"
    )
    .from(".tech-dot", { 
        scale: 0, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" 
    }, "-=1.2")

    .to({}, { duration: 1.5 })

    .to(".tech-dot", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1 })
    .to(".line-under", { height: 0, duration: 0.8 }, "-=0.3")
    .to(".interactive-content", { opacity: 0, duration: 0.3 }, "-=0.5")
    .to(".s2-title", { 
        top: "50%", left: "55%", scale: 1, opacity: 1, 
        duration: 2, ease: "power2.inOut" 
    })

    .to(world, { xPercent: -66.66, duration: 2, 
        onStart: () => switchVideo(2), onReverseComplete: () => switchVideo(1) 
    });

function switchVideo(index) {
    videos.forEach((v, i) => v.classList.toggle('active', i === index));
}

window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    gsap.to(".v-layer", { x: x * 60, y: y * 60, rotationY: x * 4, rotationX: -y * 4, duration: 1.5 });

    gsap.to(".dots-row", { x: x * 40, y: y * 20, duration: 1 });
});

function toggleInfo(el) {
    const card = el.querySelector('.dot-card');
    document.querySelectorAll('.dot-card').forEach(c => c !== card && c.classList.remove('active'));
    card.classList.toggle('active');
}