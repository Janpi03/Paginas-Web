/* ============================================================
   DOCTORALASER.COM — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* --- Navigation scroll behavior --- */
  var nav = document.getElementById('main-nav');
  var burger, mobileMenu;

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  if (nav) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    burger = document.getElementById('nav-burger');
    mobileMenu = document.getElementById('nav-mobile');

    if (burger && mobileMenu) {
      burger.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        burger.setAttribute('aria-expanded', String(isOpen));
      });
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* --- Scroll Animations --- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) { io.observe(el); });

    /* Stagger grid children */
    var gridObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var children = e.target.querySelectorAll('.treatment-card, .benefit-card, .card, .case-card, .evidence-item');
          children.forEach(function (child, i) {
            child.style.transitionDelay = (i * 60) + 'ms';
            child.classList.add('fade-up', 'visible');
          });
          gridObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.grid-auto, .grid-2, .grid-3').forEach(function (g) {
      if (!g.closest('.fade-up')) gridObserver.observe(g);
    });

    /* Number counter animation */
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseFloat(el.dataset.count);
            var duration = 1600;
            var start = performance.now();
            var isFloat = String(target).includes('.');
            (function animate(now) {
              var progress = Math.min((now - start) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 4);
              el.textContent = isFloat ? (eased * target).toFixed(1) : Math.round(eased * target);
              if (progress < 1) requestAnimationFrame(animate);
            })(start);
            countObserver.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { countObserver.observe(c); });
    }
  } else {
    /* Fallback for older browsers */
    document.querySelectorAll('.fade-up').forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;
    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    var answer = item.querySelector('.faq-answer');
    if (answer) {
      question.setAttribute('aria-expanded', 'false');
      answer.setAttribute('role', 'region');
    }
    function toggle() {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        var q = openItem.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    }
    question.addEventListener('click', toggle);
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  /* --- Smooth anchor scrolling --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 90;
        var y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

})();