// Nova Event Service — interazioni statiche (Wix)
(function () {
  function init() {
    // Icone
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

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
