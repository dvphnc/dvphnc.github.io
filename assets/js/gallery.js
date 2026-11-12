/* dvphnc — photo viewer: tap a photo (or a "‹ certificate ›" button) to enlarge, arrows / swipe to move, Escape to close.
   Sources:
   - gallery thumbnails: [data-gallery] button.shot  (full image in data-full, alt from the <img>)
   - [data-shot="N"]: opens gallery photo N (1-based)
   - [data-photos="a.webp|b.webp"] with optional data-alts="…|…": opens its own set of images */
(function () {
  var box = document.getElementById('lightbox');
  if (!box) return;

  var img = box.querySelector('.lb-img'), count = box.querySelector('.lb-count');
  var prev = box.querySelector('.lb-prev'), next = box.querySelector('.lb-next'), close = box.querySelector('.lb-close');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var list = [], i = 0, opener = null, hideT = null;

  var gallery = Array.prototype.slice.call(document.querySelectorAll('[data-gallery] button.shot')).map(function (s) {
    var t = s.querySelector('img');
    return { src: s.getAttribute('data-full') || t.src, alt: t ? t.alt : '' };
  });

  function single() { return list.length < 2; }
  function show(n) {
    i = (n + list.length) % list.length;
    img.src = list[i].src;
    img.alt = list[i].alt;
    count.textContent = (i + 1) + ' / ' + list.length;
    prev.hidden = next.hidden = single();
    count.hidden = single();
  }
  function open(items, n) {
    if (!items.length) return;
    list = items;
    opener = document.activeElement;
    show(n || 0);
    clearTimeout(hideT);
    box.hidden = false;
    void box.offsetWidth; // let the closed state paint so the fade/scale runs
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
    close.focus();
  }
  function shut() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    hideT = setTimeout(function () { box.hidden = true; }, still ? 0 : 200);
    if (opener) opener.focus();
  }

  document.querySelectorAll('[data-gallery] button.shot').forEach(function (s, n) {
    s.addEventListener('click', function () { open(gallery, n); });
  });
  document.querySelectorAll('[data-shot]').forEach(function (b) {
    b.addEventListener('click', function () { open(gallery, parseInt(b.getAttribute('data-shot'), 10) - 1); });
  });
  document.querySelectorAll('[data-photos]').forEach(function (b) {
    b.addEventListener('click', function () {
      var srcs = b.getAttribute('data-photos').split('|'), alts = (b.getAttribute('data-alts') || '').split('|');
      open(srcs.map(function (s, k) { return { src: s, alt: alts[k] || '' }; }), 0);
    });
  });

  prev.addEventListener('click', function () { show(i - 1); });
  next.addEventListener('click', function () { show(i + 1); });
  close.addEventListener('click', shut);
  box.addEventListener('click', function (e) { if (e.target === box) shut(); });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') shut();
    else if (e.key === 'ArrowLeft' && !single()) show(i - 1);
    else if (e.key === 'ArrowRight' && !single()) show(i + 1);
    else if (e.key === 'Tab') {
      // keep focus inside the viewer
      var f = [close, prev, next].filter(function (b) { return !b.hidden; });
      var k = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(k + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  // swipe on phones
  var x0 = null;
  box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (x0 === null || single()) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
  });
})();
