/* ============================================================
   DOCTORALASER.COM — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* --- Navigation --- */
  const nav = document.getElementById('main-nav');
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  /* Mark active nav link based on current page */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Scroll Animations (IntersectionObserver) --- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* --- Hero Parallax (subtle) --- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.18}px)`;
    }, { passive: true });
  }

  /* --- Stagger children of .grid when visible --- */
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const children = e.target.querySelectorAll('.treatment-card, .benefit-card, .card, .case-card, .evidence-item');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 60}ms`;
          child.classList.add('fade-up', 'visible');
        });
        gridObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.grid-auto, .grid-2, .grid-3').forEach(g => {
    if (!g.closest('.fade-up')) gridObserver.observe(g);
  });

  /* --- WhatsApp Float Button --- */
  const waBtn = document.getElementById('wa-float-btn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const msg = encodeURIComponent('Hola, quiero información sobre tratamientos con láser dental 😊');
      window.open(`https://wa.me/573000000000?text=${msg}`, '_blank');
    });
  }

  /* --- Smooth anchor scrolling for hash links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* --- Number counter animation for stats --- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const duration = 1600;
          const start = performance.now();
          const isFloat = String(target).includes('.');
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = isFloat
              ? (eased * target).toFixed(1)
              : Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

})();
