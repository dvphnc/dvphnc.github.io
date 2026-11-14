/* dvphnc: project mockups move with the scroll. Each .pj-shot.mock window starts tilted back as it enters from the
   bottom of the screen, settles flatter as it rises, and drifts up a little slower than the page (parallax).
   Only mockups on screen are updated (IntersectionObserver), one rAF per scroll. Off under reduced motion: the
   CSS resting tilt stays. Used on index.html, projects.html and projects/*.html. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var mocks = Array.prototype.slice.call(document.querySelectorAll('.pj-shot.mock'));
  if (!mocks.length) return;
  var live = new Set(), tick = false;

  function update() {
    tick = false;
    var vh = window.innerHeight;
    live.forEach(function (m) {
      var r = m.getBoundingClientRect();
      // p: 0 as the frame's top enters at the bottom of the screen, 1 when its bottom leaves at the top
      var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      var e = 1 - Math.pow(1 - Math.min(1, p * 1.25), 2); // ease out, spread over most of the screen
      var w = m.querySelector('.mock-win').style;
      w.setProperty('--rx', (16 - 12 * e).toFixed(2) + 'deg');   // 16deg → 4deg
      w.setProperty('--ry', (-22 + 15 * e).toFixed(2) + 'deg');  // -22deg → -7deg
      w.setProperty('--rz', (4 - 3 * e).toFixed(2) + 'deg');     // 4deg → 1deg
      w.setProperty('--ty', ((0.5 - p) * 40).toFixed(1) + 'px'); // +20px → -20px
    });
  }
  function queue() { if (!tick) { tick = true; requestAnimationFrame(update); } }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) live.add(en.target); else live.delete(en.target); });
      queue();
    }, { rootMargin: '10% 0px' });
    mocks.forEach(function (m) { io.observe(m); });
  } else {
    mocks.forEach(function (m) { live.add(m); });
  }
  mocks.forEach(function (m) { m.classList.add('mock-live'); });
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  queue();
})();
