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

  // 2. Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    });
  });

  // 3. GSAP Fade Up Animations
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

  // 4. Staggered Bento Card Animation
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

  // 5. Form Submission — forwards to devin@cruzcontroldigital.com via Formspree
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdavqpjd";

  const leadForm = document.getElementById("leadForm");
  const submitBtn = leadForm.querySelector(".btn-submit");

  leadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(leadForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Submission failed");

      submitBtn.textContent = "✓ Sent Successfully!";
      submitBtn.style.background = "linear-gradient(135deg, #C7A15A, #A6823F)";
      submitBtn.style.color = "#fff";
      submitBtn.style.boxShadow = "0 0 20px rgba(199, 161, 90, 0.4)";

      setTimeout(() => {
        leadForm.reset();
        submitBtn.textContent = "Send Request";
        submitBtn.style.background = "";
        submitBtn.style.color = "";
        submitBtn.style.boxShadow = "";
        submitBtn.disabled = false;
      }, 3000);

    } catch {
      submitBtn.textContent = "Failed — Please Try Again";
      submitBtn.style.background = "#8b1a1a";
      submitBtn.style.color = "#fff";
      submitBtn.disabled = false;

      setTimeout(() => {
        submitBtn.textContent = "Send Request";
        submitBtn.style.background = "";
        submitBtn.style.color = "";
      }, 3000);
    }
  });
});
