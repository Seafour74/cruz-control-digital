document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // 1. Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. GSAP Fade Up Animations
  const fadeElements = document.querySelectorAll(".fade-up");
  
  fadeElements.forEach((el) => {
    gsap.fromTo(el, 
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // 3. Staggered Bento Card Animation
  gsap.fromTo(".bento-card",
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );

  // 4. Form Submission Handling
  const leadForm = document.getElementById("leadForm");
  const submitBtn = leadForm.querySelector(".btn-submit");

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Simulate API call and success state
    submitBtn.textContent = "✓ Sent Successfully!";
    submitBtn.style.background = "#00f0ff";
    submitBtn.style.color = "#05050a";
    submitBtn.style.boxShadow = "0 0 20px rgba(0, 240, 255, 0.4)";
    submitBtn.disabled = true;

    // Reset after 3 seconds
    setTimeout(() => {
      leadForm.reset();
      submitBtn.textContent = "Send Request";
      submitBtn.style.background = "";
      submitBtn.style.color = "";
      submitBtn.style.boxShadow = "";
      submitBtn.disabled = false;
    }, 3000);
  });
});
