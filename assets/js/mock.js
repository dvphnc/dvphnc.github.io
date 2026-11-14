/* dvphnc: project mockups turn to look at the cursor, like a Memoji following your face. Every .pj-shot.mock
   (homepage stack cards, projects.html rows, case study covers) aims at the pointer from its own centre, anywhere
   on the page, so it keeps tracking while you scroll and read. Each window eases toward its target every frame and
   the loop sleeps once all have settled; only mockups on screen are aimed (IntersectionObserver). With no cursor
   (touch), they follow a finger while touching, then ease back to the resting tilt. Off under reduced motion: the
   CSS resting tilt stays. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.pj-shot.mock'));
  if (!nodes.length) return;
  var REST = { rx: 9, ry: -13, rz: 2.5, sc: 1 };   // same as the CSS default
  var MAX_X = 16, MAX_Y = 22;                       // strongest tilt, in degrees
  var KEYS = ['rx', 'ry', 'rz', 'sc'];
  var mocks = nodes.map(function (el) {
    el.classList.add('mock-follow');
    return { el: el, win: el.querySelector('.mock-win').style, on: true,
      cur: { rx: REST.rx, ry: REST.ry, rz: REST.rz, sc: 1 }, tgt: { rx: REST.rx, ry: REST.ry, rz: REST.rz, sc: 1 } };
  });
  var running = false, px = null, py = null;

  function aim(m) {
    if (px === null || !m.on) { KEYS.forEach(function (k) { m.tgt[k] = REST[k]; }); return; }
    var r = m.el.getBoundingClientRect();
    // -1..1 across a span a bit wider than the screen, so the far edges don't snap to the maximum
    var nx = Math.max(-1, Math.min(1, (px - (r.left + r.width / 2)) / (window.innerWidth * 0.6)));
    var ny = Math.max(-1, Math.min(1, (py - (r.top + r.height / 2)) / (window.innerHeight * 0.6)));
    m.tgt.ry = nx * MAX_Y;     // cursor right → the window turns right
    m.tgt.rx = -ny * MAX_X;    // cursor above → the window tips back to look up
    m.tgt.rz = nx * 1.5;
    m.tgt.sc = 1.04;
  }
  function frame() {
    var settled = true;
    mocks.forEach(function (m) {
      var moved = false;
      KEYS.forEach(function (k) {
        var d = m.tgt[k] - m.cur[k];
        if (Math.abs(d) > (k === 'sc' ? 0.0005 : 0.02)) { m.cur[k] += d * 0.12; settled = false; moved = true; }
        else if (d !== 0) { m.cur[k] = m.tgt[k]; moved = true; }
      });
      if (moved) {
        m.win.setProperty('--rx', m.cur.rx.toFixed(2) + 'deg');
        m.win.setProperty('--ry', m.cur.ry.toFixed(2) + 'deg');
        m.win.setProperty('--rz', m.cur.rz.toFixed(2) + 'deg');
        m.win.setProperty('--sc', m.cur.sc.toFixed(3));
      }
    });
    if (settled) running = false; else requestAnimationFrame(frame);
  }
  function kick() { mocks.forEach(aim); if (!running) { running = true; requestAnimationFrame(frame); } }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { mocks.forEach(function (m) { if (m.el === en.target) m.on = en.isIntersecting; }); });
      kick();
    }, { rootMargin: '15% 0px' });
    mocks.forEach(function (m) { m.on = false; io.observe(m.el); });
  }

  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return; // touch is handled below
    px = e.clientX; py = e.clientY; kick();
  }, { passive: true });
  document.addEventListener('mouseleave', function () { px = py = null; kick(); });
  window.addEventListener('scroll', function () { if (px !== null) kick(); }, { passive: true }); // mockups move under a still cursor
  window.addEventListener('touchstart', function (e) { var t = e.touches[0]; px = t.clientX; py = t.clientY; kick(); }, { passive: true });
  window.addEventListener('touchmove', function (e) { var t = e.touches[0]; px = t.clientX; py = t.clientY; kick(); }, { passive: true });
  window.addEventListener('touchend', function () { px = py = null; kick(); }, { passive: true });
})();
