/* dvphnc — event photo viewer: tap a photo to enlarge, arrows / swipe to move, Escape to close. */
(function () {
  var box = document.getElementById('lightbox');
  var shots = Array.prototype.slice.call(document.querySelectorAll('[data-gallery] button.shot'));
  if (!box || !shots.length) return;

  var img = box.querySelector('.lb-img'), count = box.querySelector('.lb-count');
  var prev = box.querySelector('.lb-prev'), next = box.querySelector('.lb-next'), close = box.querySelector('.lb-close');
  var i = 0, opener = null;

  function show(n) {
    i = (n + shots.length) % shots.length;
    var s = shots[i], t = s.querySelector('img');
    img.src = s.getAttribute('data-full') || t.src;
    img.alt = t ? t.alt : '';
    count.textContent = (i + 1) + ' / ' + shots.length;
  }
  function open(n) {
    opener = document.activeElement;
    show(n);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    close.focus();
  }
  function shut() {
    box.hidden = true;
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }

  var single = shots.length < 2;
  prev.hidden = next.hidden = single;

  shots.forEach(function (s, n) { s.addEventListener('click', function () { open(n); }); });
  prev.addEventListener('click', function () { show(i - 1); });
  next.addEventListener('click', function () { show(i + 1); });
  close.addEventListener('click', shut);
  box.addEventListener('click', function (e) { if (e.target === box) shut(); });

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') shut();
    else if (e.key === 'ArrowLeft' && !single) show(i - 1);
    else if (e.key === 'ArrowRight' && !single) show(i + 1);
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
    if (x0 === null || single) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
  });
})();
