/* dvphnc: case study cover (projects/<slug>.html only). The mockup window starts at its resting tilt at the top of
   the page and, as you scroll down past the cover, straightens out flat and grows a little, as if it turns to face
   you. Scrolling back up tilts it again. One rAF per scroll. Off under reduced motion: the CSS resting tilt stays. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cover = document.querySelector('.cs-cover.mock');
  if (!cover) return;
  var win = cover.querySelector('.mock-win').style, tick = false;

  function update() {
    tick = false;
    var r = cover.getBoundingClientRect();
    // p: 0 with the page at the top, 1 once the cover's centre has risen to ~30% of the screen
    var start = r.top + window.scrollY - window.innerHeight * 0.55;   // scroll where the cover sits lower-middle
    var end = r.top + window.scrollY + r.height / 2 - window.innerHeight * 0.3;
    var p = Math.min(1, Math.max(0, (window.scrollY - Math.max(0, start)) / Math.max(1, end - Math.max(0, start))));
    var e = 1 - Math.pow(1 - p, 2); // ease out
    win.setProperty('--rx', (9 * (1 - e)).toFixed(2) + 'deg');      // 9deg → 0
    win.setProperty('--ry', (-13 * (1 - e)).toFixed(2) + 'deg');    // -13deg → 0
    win.setProperty('--rz', (2.5 * (1 - e)).toFixed(2) + 'deg');    // 2.5deg → 0
    win.setProperty('--sc', (1 + 0.14 * e).toFixed(3));             // 72% wide → ~82%
  }
  function queue() { if (!tick) { tick = true; requestAnimationFrame(update); } }

  cover.classList.add('mock-live');
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  queue();
})();
