(function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
      mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close mobile menu on link click
  mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.setAttribute('aria-label', 'Open menu');
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
      });
  });

  // Nav scroll
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 100);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href === '#') return;
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
  });

  // Scroll animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, observerOptions);

  document.querySelectorAll('.space-card, .amenity-card, .about-feature, .gallery-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s var(--transition-smooth), transform 0.6s var(--transition-smooth)';
      observer.observe(el);
  });

})();