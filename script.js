/* ===========================
   PORTFOLIO – Interactions
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Theme Toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    if (next === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem('portfolio-theme', next);
  });

  /* ---------- Mobile Nav Toggle ---------- */
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
    const scrollY = window.scrollY + 120;
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

  /* ---------- Navbar shrink on scroll ---------- */
  const navbar = document.getElementById('navbar');
  function handleNavbar() {
    if (window.scrollY > 60) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,.08)';
    } else {
      navbar.style.boxShadow = 'none';
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
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));

  /* ---------- Parallax Hero ---------- */
  const hero = document.getElementById('hero');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const scrollPos = window.scrollY;
      hero.style.setProperty('--scroll-y', `${scrollPos * 0.4}px`);
    }
  });

  /* ---------- Scroll listener for parallax & nav ---------- */
  window.addEventListener('scroll', () => {
    highlightNav();
    handleNavbar();
  });

  // Initial calls
  highlightNav();
  handleNavbar();

  /* ---------- EmailJS Contact Form ---------- */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('.btn-submit');
    const origText = btn.innerHTML;
    
    // Set loading state
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>&nbsp; Sending...';
    btn.disabled = true;

    // Use your own Service ID and Template ID from EmailJS
    const serviceID = 'service_9hr72ji';
    const templateID = 'template_ggcp0ma';
    const publicKey = 'ITZgOxtBfrQ-w_cb9';

    emailjs.sendForm(serviceID, templateID, form, publicKey)
      .then(() => {
        alert("Message sent successfully!");
        btn.innerHTML = '<i class="fa-solid fa-check"></i>&nbsp; Message Sent!';
        btn.style.background = '#2ecc71';
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

  /* ---------- Smooth counter animation ---------- */
  const statNumbers = document.querySelectorAll('.stat-box .number');
  let statsCounted = false;

  function animateCounters() {
    if (statsCounted) return;
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;
    const sTop = statsSection.getBoundingClientRect().top;
    if (sTop < window.innerHeight * 0.9) {
      statsCounted = true;
      statNumbers.forEach(num => {
        const text = num.textContent;
        const isFloat = text.includes('.');
        const hasSuffix = text.match(/[+%]/);
        const suffix = hasSuffix ? hasSuffix[0] : '';
        const target = parseFloat(text);
        if (isNaN(target)) return;

        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          num.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
        }, 35);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

});
