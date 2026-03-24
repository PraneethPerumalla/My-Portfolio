/* ===========================
   PORTFOLIO – Interactions
   (Yaswanth-Style Dark Theme)
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Custom Cursor ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth ring follow with lerp
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover detection on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, textarea, .btn, .btn-hire, .btn-live, .btn-source, .btn-cert, .value-card, .skill-category-card, .cert-card, .browser-mockup');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hovering');
      cursorRing.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hovering');
      cursorRing.classList.remove('hovering');
    });
  });

  // Click feedback
  document.addEventListener('mousedown', () => {
    cursorDot.classList.add('clicking');
    cursorRing.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    cursorDot.classList.remove('clicking');
    cursorRing.classList.remove('clicking');
  });
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    const scrollY = window.scrollY + 140;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }

  /* ---------- Navbar scroll effects ---------- */
  const navbar = document.getElementById('navbar');
  function handleNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* ---------- Reveal on Scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  /* ---------- Scroll listener ---------- */
  window.addEventListener('scroll', () => {
    highlightNav();
    handleNavbar();
  });

  // Initial calls
  highlightNav();
  handleNavbar();

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- EmailJS Contact Form ---------- */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('.btn-submit');
    const origText = btn.innerHTML;
    
    // Set loading state
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>&nbsp; Sending...';
    btn.disabled = true;

    const serviceID = 'service_9hr72ji';
    const templateID = 'template_ggcp0ma';
    const publicKey = 'ITZgOxtBfrQ-w_cb9';

    const templateParams = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      title: "New Message from Portfolio",
      message: document.getElementById('message').value
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        alert("Message sent successfully!");
        btn.innerHTML = '<i class="fa-solid fa-check"></i>&nbsp; Message Sent!';
        btn.style.background = '#28c841';
        btn.style.color = '#fff';
        form.reset();
        
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      }, (err) => {
        console.error('EmailJS Error:', err);
        const errorMsg = err.text || err.message || JSON.stringify(err);
        alert("Failed to send message. Error: " + errorMsg);
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp; Error Sending';
        btn.style.background = '#e74c3c';
        
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      });
  });

});
