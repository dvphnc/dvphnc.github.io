/* dvphnc: case study cover (projects/<slug>.html only). The mockup window turns to look at the cursor, like a
   Memoji following your face: the cursor's position relative to the cover's centre sets the tilt (anywhere on
   the page, so it keeps tracking while you scroll and read). Eased toward the target each frame, and the loop
   sleeps once it has settled. With no cursor (touch), it follows a finger while touching, then eases back to the
   resting tilt. Off under reduced motion: the CSS resting tilt stays. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cover = document.querySelector('.cs-cover.mock');
  if (!cover) return;
  var win = cover.querySelector('.mock-win').style;
  var REST = { rx: 9, ry: -13, rz: 2.5 };          // same as the CSS default
  var MAX_X = 16, MAX_Y = 22;                       // strongest tilt, in degrees
  var cur = { rx: REST.rx, ry: REST.ry, rz: REST.rz, sc: 1 }, tgt = { rx: REST.rx, ry: REST.ry, rz: REST.rz, sc: 1 };
  var running = false, px = null, py = null;

  function aim() {
    if (px === null) { tgt.rx = REST.rx; tgt.ry = REST.ry; tgt.rz = REST.rz; tgt.sc = 1; return; }
    var r = cover.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    // -1..1 across a span a bit wider than the screen, so the far edges don't snap to the maximum
    var nx = Math.max(-1, Math.min(1, (px - cx) / (window.innerWidth * 0.6)));
    var ny = Math.max(-1, Math.min(1, (py - cy) / (window.innerHeight * 0.6)));
    tgt.ry = nx * MAX_Y;          // cursor right → the window turns right
    tgt.rx = -ny * MAX_X;         // cursor above → the window tips back to look up
    tgt.rz = nx * 1.5;
    tgt.sc = 1.04;
  }
  function frame() {
    var settled = true;
    ['rx', 'ry', 'rz', 'sc'].forEach(function (k) {
      var d = tgt[k] - cur[k];
      cur[k] += d * 0.12;
      if (Math.abs(d) > (k === 'sc' ? 0.0005 : 0.02)) settled = false; else cur[k] = tgt[k];
    });
    win.setProperty('--rx', cur.rx.toFixed(2) + 'deg');
    win.setProperty('--ry', cur.ry.toFixed(2) + 'deg');
    win.setProperty('--rz', cur.rz.toFixed(2) + 'deg');
    win.setProperty('--sc', cur.sc.toFixed(3));
    if (settled) running = false; else requestAnimationFrame(frame);
  }
  function kick() { aim(); if (!running) { running = true; requestAnimationFrame(frame); } }

  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return; // touch is handled below
    px = e.clientX; py = e.clientY; kick();
  }, { passive: true });
  document.addEventListener('pointerleave', function () { px = py = null; kick(); });
  document.addEventListener('mouseleave', function () { px = py = null; kick(); });
  window.addEventListener('scroll', function () { if (px !== null) kick(); }, { passive: true }); // the cover moves under a still cursor
  window.addEventListener('touchstart', function (e) { var t = e.touches[0]; px = t.clientX; py = t.clientY; kick(); }, { passive: true });
  window.addEventListener('touchmove', function (e) { var t = e.touches[0]; px = t.clientX; py = t.clientY; kick(); }, { passive: true });
  window.addEventListener('touchend', function () { px = py = null; kick(); }, { passive: true });

  cover.classList.add('mock-follow');
})();
