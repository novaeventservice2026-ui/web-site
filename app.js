// Nova Event Service — interazioni statiche (Wix)
(function () {
  function init() {
    // Icone
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Menu mobile (hamburger)
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.nav-toggle');
    if (header && toggle) {
      toggle.addEventListener('click', function () {
        var open = header.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      header.querySelectorAll('nav a').forEach(function (a) {
        a.addEventListener('click', function () {
          header.classList.remove('nav-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Popup contatti: Email o WhatsApp (per i CTA principali)
    (function () {
      var mailSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>';
      var waSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.35c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.69 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.37-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z"/></svg>';
      var modal = document.createElement('div');
      modal.className = 'contact-modal';
      modal.hidden = true;
      modal.innerHTML =
        '<div class="cm-backdrop"></div>' +
        '<div class="cm-box" role="dialog" aria-modal="true" aria-label="Contattaci">' +
        '<button type="button" class="cm-close" aria-label="Chiudi">&times;</button>' +
        '<p class="cm-title">Come vuoi contattarci?</p>' +
        '<p class="cm-sub">Scegli il canale che preferisci, ti rispondiamo subito.</p>' +
        '<div class="cm-actions">' +
        '<a class="cm-btn cm-mail" href="mailto:novaeventservice2026@gmail.com">' + mailSvg + '<div><span>Email</span><small>novaeventservice2026@gmail.com</small></div></a>' +
        '<a class="cm-btn cm-wa" href="https://wa.me/393518942961" target="_blank" rel="noreferrer">' + waSvg + '<div><span>WhatsApp</span><small>351 894 2961</small></div></a>' +
        '<a class="cm-btn cm-wa" href="https://wa.me/393426201650" target="_blank" rel="noreferrer">' + waSvg + '<div><span>WhatsApp</span><small>342 620 1650</small></div></a>' +
        '</div></div>';
      document.body.appendChild(modal);
      function open() { modal.hidden = false; document.body.style.overflow = 'hidden'; }
      function close() { modal.hidden = true; document.body.style.overflow = ''; }
      modal.querySelector('.cm-backdrop').addEventListener('click', close);
      modal.querySelector('.cm-close').addEventListener('click', close);
      modal.querySelectorAll('.cm-btn').forEach(function (b) { b.addEventListener('click', function () { setTimeout(close, 60); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

      var triggers = document.querySelectorAll('a[href^="mailto:novaeventservice2026"], a[href$="#contatti"]');
      triggers.forEach(function (a) {
        if (a.closest('.contact-actions') || a.closest('.contact-modal')) return; // i pulsanti già-scelta (e quelli DENTRO il popup) restano diretti
        a.addEventListener('click', function (e) {
          e.preventDefault();
          if (header) header.classList.remove('nav-open');
          open();
        });
      });
    })();

    // Slider delle card DJ (4 pagine: Foto / Bio / Video / Social)
    document.querySelectorAll('.dj-card').forEach(function (card) {
      var track = card.querySelector('.dj-card-track');
      var pages = card.querySelectorAll('.dj-page');
      var dots = card.querySelectorAll('.dj-page-dots button');
      var prev = card.querySelector('.dj-nav-prev');
      var next = card.querySelector('.dj-nav-next');
      if (!track || !pages.length) return;
      var i = 0;
      var n = pages.length;
      function go(idx) {
        i = (idx + n) % n;
        track.style.transform = 'translateX(-' + i * 100 + '%)';
        dots.forEach(function (d, k) { d.classList.toggle('active', k === i); });
      }
      if (prev) prev.addEventListener('click', function () { go(i - 1); });
      if (next) next.addEventListener('click', function () { go(i + 1); });
      dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
      go(0);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
