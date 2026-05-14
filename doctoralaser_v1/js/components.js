/* ============================================================
   DOCTORALASER.COM — Shared HTML Components
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- NAV ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    { href: 'index.html',      label: '¿Qué es?' },
    { href: 'beneficios.html', label: 'Beneficios' },
    { href: 'tratamientos.html', label: 'Tratamientos' },
    { href: 'evidencia.html',  label: 'Evidencia' },
    { href: 'casos.html',      label: 'Casos reales' },
  ];

  const navEl = document.getElementById('main-nav');
  if (navEl) {
    navEl.innerHTML = `
      <div class="nav__inner">
        <a href="index.html" class="nav__logo" aria-label="Inicio — DoctorLáser">
          <span class="nav__logo-main">Doctor<span>Láser</span></span>
          <span class="nav__logo-sub">Dra. Ana Vinasco · Bogotá</span>
        </a>
        <nav class="nav__links" aria-label="Navegación principal">
          ${navLinks.map(l => `<a href="${l.href}" class="nav__link${currentPage === l.href ? ' active' : ''}">${l.label}</a>`).join('')}
          <a href="agenda.html" class="nav__cta">Agendar cita</a>
        </nav>
        <button class="nav__burger" id="nav-burger" aria-label="Abrir menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav__mobile" id="nav-mobile" role="dialog" aria-label="Menú móvil">
        ${navLinks.map(l => `<a href="${l.href}" class="nav__link${currentPage === l.href ? ' active' : ''}">${l.label}</a>`).join('')}
        <a href="agenda.html" class="nav__cta">Agendar cita →</a>
      </div>
    `;
  }

  /* ---- WHATSAPP FLOAT ---- */
  const waContainer = document.getElementById('wa-float');
  if (waContainer) {
    waContainer.innerHTML = `
      <span class="wa-float__bubble">Escríbenos ahora</span>
      <button class="wa-float__btn" id="wa-float-btn" aria-label="Contactar por WhatsApp">
        <i class="ti ti-brand-whatsapp" aria-hidden="true"></i>
      </button>
    `;
  }

  /* ---- FOOTER ---- */
  const footerEl = document.getElementById('main-footer');
  if (footerEl) {
    footerEl.innerHTML = `
      <div class="footer">
        <div class="container">
          <div class="footer__inner">
            <div>
              <div class="footer__logo">Doctor<span>Láser</span></div>
              <p class="footer__tagline">Odontología con láser diodo en Bogotá. Tratamientos más precisos, menos dolor, recuperación más rápida.</p>
              <div style="margin-top:1.5rem;display:flex;gap:.75rem;">
                <a href="agenda.html" class="btn btn--teal btn--sm">Agendar cita</a>
              </div>
            </div>
            <div>
              <p class="footer__heading">Páginas</p>
              <div class="footer__links">
                ${navLinks.map(l => `<a href="${l.href}" class="footer__link">${l.label}</a>`).join('')}
                <a href="agenda.html" class="footer__link">Agenda</a>
              </div>
            </div>
            <div>
              <p class="footer__heading">Contacto</p>
              <div class="footer__links">
                <span class="footer__link">Bogotá, Colombia</span>
                <span class="footer__link">WhatsApp: [número]</span>
                <a href="mailto:info@doctoralaser.com" class="footer__link">info@doctoralaser.com</a>
              </div>
              <p class="footer__heading" style="margin-top:1.5rem;">Más sitios</p>
              <div class="footer__links">
                <a href="#" class="footer__link">Luminadent.co</a>
                <a href="#" class="footer__link">DraAnaVinasco.com</a>
              </div>
            </div>
          </div>
          <div class="footer__bottom">
            <p class="footer__copy">© 2025 DoctorLáser · Dra. Ana Vinasco. Todos los derechos reservados.</p>
            <p class="footer__copy">Bogotá, Colombia</p>
          </div>
        </div>
      </div>
    `;
  }

});
