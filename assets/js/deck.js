/* dvphnc: certification deck (index.html #certifications and certifications.html, stack view).
   In .cert-fan, clicking, tapping or tabbing to a back card swaps it with the front card instead of opening it;
   the front card opens its verify link. On touch screens the front card swipes. Each deck's height follows its
   tallest card; a hidden deck sizes itself when shown (it listens for a 'deck:show' event). */
(function () {
  /* ── Certification deck: in .cert-fan, clicking, tapping or tabbing to a back card swaps it with the front
     card instead of opening it; the front card opens its verify link. Each deck's height follows its tallest card. ── */
  Array.prototype.slice.call(document.querySelectorAll('.cert-fan')).forEach(function (fan) {
    var cards = Array.prototype.slice.call(fan.querySelectorAll('.fan-card'));
    var num = fan.querySelector('.fan-n'), hint = fan.querySelector('.fan-hint');
    if (hint) hint.textContent = window.matchMedia('(hover: none)').matches ? 'swipe a card' : 'click a card';
    var toFront = function (card) {
      var old = card.getAttribute('data-slot');
      if (old === '0') return;
      fan.querySelector('.fan-card[data-slot="0"]').setAttribute('data-slot', old);
      card.setAttribute('data-slot', '0');
      if (num) num.textContent = String(cards.indexOf(card) + 1);
    };
    // touch: swipe the front card sideways. It follows the finger; past 45px (or a quick flick) the next card
    // (swipe left) or the previous one (swipe right) comes to the front, otherwise it springs back. Vertical
    // drags stay page scrolls (touch-action: pan-y in CSS).
    var front = function () { return fan.querySelector('.fan-card[data-slot="0"]'); };
    var sw = null, swiped = false;
    fan.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { sw = null; return; }
      var t = e.touches[0];
      sw = { x: t.clientX, y: t.clientY, t: performance.now(), dx: 0, dir: null, card: front() };
    }, { passive: true });
    fan.addEventListener('touchmove', function (e) {
      if (!sw) return;
      var t = e.touches[0], dx = t.clientX - sw.x, dy = t.clientY - sw.y;
      if (!sw.dir && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) sw.dir = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (sw.dir !== 'x') return;
      if (e.cancelable) e.preventDefault();
      sw.dx = dx;
      sw.card.classList.add('is-drag');
      sw.card.style.setProperty('--dx', dx.toFixed(1) + 'px');
      sw.card.style.setProperty('--dr', (dx * 0.06).toFixed(2) + 'deg');
    }, { passive: false });
    var swEnd = function () {
      if (!sw) return;
      var s = sw; sw = null;
      if (s.dir !== 'x') return;
      swiped = true; setTimeout(function () { swiped = false; }, 350); // the tap that ends a swipe doesn't open the card
      s.card.classList.remove('is-drag');
      s.card.style.removeProperty('--dx'); s.card.style.removeProperty('--dr');
      var fast = Math.abs(s.dx) / Math.max(1, performance.now() - s.t) > 0.5;
      if (Math.abs(s.dx) < 45 && !fast) return;
      var i = cards.indexOf(s.card), n = cards.length;
      toFront(cards[(i + (s.dx < 0 ? 1 : n - 1)) % n]);
    };
    fan.addEventListener('touchend', swEnd);
    fan.addEventListener('touchcancel', swEnd);
    cards.forEach(function (c) {
      c.addEventListener('click', function (e) {
        if (swiped) { e.preventDefault(); return; }
        if (c.getAttribute('data-slot') !== '0') { e.preventDefault(); toFront(c); }
      });
      // keyboard only: a mouse click also focuses first, which would bring it forward and then open it in one go
      c.addEventListener('focus', function () { var kb = true; try { kb = c.matches(':focus-visible'); } catch (err) {} if (kb) toFront(c); });
    });
    var size = function () {
      var h = 0; cards.forEach(function (c) { h = Math.max(h, c.offsetHeight); });
      fan.style.height = (h + 100) + 'px'; // room for the peek on top, the tilt and the "n / N" line
    };
    size();
    window.addEventListener('resize', size);
    fan.addEventListener('deck:show', size);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(size);
  });
})();
