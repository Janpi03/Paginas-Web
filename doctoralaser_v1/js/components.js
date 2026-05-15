/* ============================================================
   DOCTORALASER.COM — Shared Components
   ============================================================ */

(function () {
  'use strict';

  var WA_NUMBER  = '573015666729';
  var WA_BASE    = 'https://wa.me/' + WA_NUMBER;
  var SITE_EMAIL = 'info@doctoralaser.com';
  var SITE_PHONE = '+57 301 5666729';
  var SITE_ADDR  = 'Cra. 7 Bis #124-56, Bogotá, Colombia';

  var HOURS = [
    { day: 'Lunes',    time: '8:00 a.m. – 12:00 p.m.' },
    { day: 'Martes',   time: '8:00 a.m. – 7:00 p.m.' },
    { day: 'Miércoles',time: '2:00 p.m. – 7:00 p.m.' },
    { day: 'Jueves',   time: '8:00 a.m. – 7:00 p.m.' },
    { day: 'Viernes',  time: '8:00 a.m. – 7:00 p.m.' },
    { day: 'Sábado',   time: '8:00 a.m. – 7:00 p.m.' },
    { day: 'Domingo',  time: 'Cerrado', closed: true },
  ];

  var navLinks = [
    { href: 'index.html',        label: '¿Qué es?' },
    { href: 'beneficios.html',   label: 'Beneficios' },
    { href: 'tratamientos.html', label: 'Tratamientos' },
    { href: 'evidencia.html',    label: 'Evidencia' },
    { href: 'casos.html',        label: 'Casos reales' },
  ];

  document.addEventListener('DOMContentLoaded', function () {
    buildNav();
    buildWaFloat();
    buildFooter();
    initPopup();
  });

  /* ---- NAV ---- */
  function buildNav() {
    var navEl = document.getElementById('main-nav');
    if (!navEl) return;
    var currentPage = location.pathname.split('/').pop() || 'index.html';

    navEl.innerHTML =
      '<div class="nav__inner">' +
        '<a href="index.html" class="nav__logo" aria-label="Inicio — DoctorLáser">' +
          '<span class="nav__logo-main">Doctor<span>Láser</span></span>' +
          '<span class="nav__logo-sub">Dra. Ana Vinasco · Bogotá</span>' +
        '</a>' +
        '<nav class="nav__links" aria-label="Navegación principal">' +
          navLinks.map(function(l) {
            return '<a href="' + l.href + '" class="nav__link' + (currentPage === l.href ? ' active' : '') + '">' + l.label + '</a>';
          }).join('') +
          '<a href="agenda.html" class="nav__cta">Agendar cita</a>' +
        '</nav>' +
        '<button class="nav__burger" id="nav-burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-mobile">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
      '<div class="nav__mobile" id="nav-mobile" role="dialog" aria-label="Menú móvil" aria-modal="true">' +
        navLinks.map(function(l) {
          return '<a href="' + l.href + '" class="nav__link' + (currentPage === l.href ? ' active' : '') + '">' + l.label + '</a>';
        }).join('') +
        '<a href="agenda.html" class="nav__cta">Agendar cita &rarr;</a>' +
      '</div>';
  }

  /* ---- WHATSAPP FLOAT ---- */
  function buildWaFloat() {
    var waContainer = document.getElementById('wa-float');
    if (!waContainer) return;
    var msg = encodeURIComponent('Hola, quiero información sobre tratamientos con láser dental 😊');
    waContainer.innerHTML =
      '<span class="wa-float__bubble" aria-hidden="true">Escríbenos ahora</span>' +
      '<a href="' + WA_BASE + '?text=' + msg + '" target="_blank" rel="noopener noreferrer" ' +
         'class="wa-float__btn" id="wa-float-btn" aria-label="Contactar por WhatsApp">' +
        '<i class="ti ti-brand-whatsapp" aria-hidden="true"></i>' +
      '</a>';
  }

  /* ---- FOOTER ---- */
  function buildFooter() {
    var footerEl = document.getElementById('main-footer');
    if (!footerEl) return;

    var hoursHtml = HOURS.map(function(h) {
      return '<div class="footer-hour-row' + (h.closed ? ' footer-hour-row--closed' : '') + '">' +
        '<span>' + h.day + '</span><span>' + h.time + '</span>' +
      '</div>';
    }).join('');

    footerEl.innerHTML =
      '<footer class="footer" role="contentinfo">' +
        '<div class="container">' +
          '<div class="footer__inner">' +
            '<div>' +
              '<div class="footer__logo">Doctor<span>Láser</span></div>' +
              '<p class="footer__tagline">Odontología con láser diodo en Bogotá. Tratamientos más precisos, menos dolor, recuperación más rápida.</p>' +
              '<div style="margin-top:1.5rem;display:flex;gap:.75rem">' +
                '<a href="agenda.html" class="btn btn--teal btn--sm">Agendar cita</a>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<p class="footer__heading">Páginas</p>' +
              '<nav class="footer__links" aria-label="Navegación del pie de página">' +
                navLinks.map(function(l) {
                  return '<a href="' + l.href + '" class="footer__link">' + l.label + '</a>';
                }).join('') +
                '<a href="agenda.html" class="footer__link">Agenda</a>' +
              '</nav>' +
            '</div>' +
            '<div>' +
              '<p class="footer__heading">Contacto</p>' +
              '<address class="footer__links" style="font-style:normal">' +
                '<span class="footer__link">' + SITE_ADDR + '</span>' +
                '<a href="tel:+573015666729" class="footer__link">' + SITE_PHONE + '</a>' +
                '<a href="mailto:' + SITE_EMAIL + '" class="footer__link">' + SITE_EMAIL + '</a>' +
              '</address>' +
              '<p class="footer__heading" style="margin-top:1.5rem">Horarios</p>' +
              '<div style="font-size:12px;color:rgba(255,255,255,.4)">' +
                hoursHtml +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer__bottom">' +
            '<p class="footer__copy">&copy; 2025 DoctorLáser &middot; Dra. Ana Vinasco. Todos los derechos reservados.</p>' +
            '<p class="footer__copy">Bogotá, Colombia</p>' +
          '</div>' +
        '</div>' +
      '</footer>' +
      '<style>' +
      '.footer-hour-row{display:flex;justify-content:space-between;padding:3px 0;gap:1rem}' +
      '.footer-hour-row--closed span:last-child{opacity:.4}' +
      '</style>';
  }

  /* ---- EMAIL POPUP (scroll 60% or 35 seconds) ---- */
  function initPopup() {
    var STORAGE_KEY = 'dl_popup_dismissed';
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    var overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'popup-title');
    overlay.innerHTML =
      '<div class="popup-card">' +
        '<button class="popup-close" id="popup-close" aria-label="Cerrar">' +
          '<i class="ti ti-x" aria-hidden="true"></i>' +
        '</button>' +
        '<div class="popup-header">' +
          '<div class="popup-icon"><i class="ti ti-file-description" aria-hidden="true"></i></div>' +
          '<h2 class="popup-title" id="popup-title">Guía gratuita:<br><em>Todo sobre el láser dental</em></h2>' +
          '<p class="popup-sub">Descarga el PDF que la Dra. Ana Vinasco preparó para que llegues informado a tu primera consulta.</p>' +
        '</div>' +
        '<div class="popup-body">' +
          '<input type="email" class="popup-input" id="popup-email" placeholder="Tu correo electrónico" autocomplete="email" inputmode="email">' +
          '<button class="popup-submit" id="popup-submit">' +
            '<i class="ti ti-download" aria-hidden="true"></i>' +
            'Recibir guía gratis' +
          '</button>' +
          '<p class="popup-note"><i class="ti ti-shield-lock" style="vertical-align:-2px;margin-right:3px" aria-hidden="true"></i>Sin spam. Tu correo es solo para enviarte la guía.</p>' +
          '<span class="popup-skip" id="popup-skip" role="button" tabindex="0">No me interesa por ahora</span>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    function showPopup() {
      overlay.classList.add('visible');
      var emailInput = document.getElementById('popup-email');
      if (emailInput) emailInput.focus();
    }

    function dismissPopup() {
      overlay.classList.remove('visible');
      sessionStorage.setItem(STORAGE_KEY, '1');
    }

    var shown = false;
    function maybeShow() {
      if (shown) return;
      shown = true;
      showPopup();
    }

    var timer = setTimeout(maybeShow, 35000);

    var scrollHandler = function () {
      var scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= 0.6) {
        clearTimeout(timer);
        window.removeEventListener('scroll', scrollHandler, { passive: true });
        maybeShow();
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    document.getElementById('popup-close').addEventListener('click', dismissPopup);
    document.getElementById('popup-skip').addEventListener('click', dismissPopup);
    document.getElementById('popup-skip').addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') dismissPopup();
    });

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) dismissPopup();
    });

    document.getElementById('popup-submit').addEventListener('click', function () {
      var email = document.getElementById('popup-email').value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('popup-email').focus();
        return;
      }
      var waMsg = encodeURIComponent('Hola, me interesa recibir la guía gratuita sobre láser dental. Mi correo: ' + email);
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + waMsg, '_blank');
      dismissPopup();
    });

    overlay.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') dismissPopup();
    });
  }

})();
