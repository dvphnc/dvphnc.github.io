/* SyberVault note pages: reading time, copy buttons, table wrapping, active TOC item, entrance. */
(function () {
  var root = document.documentElement;
  var prose = document.getElementById('prose');

  // reading time
  var rt = document.getElementById('readTime');
  if (rt && prose) {
    var words = prose.innerText.trim().split(/\s+/).length;
    rt.textContent = Math.max(1, Math.round(words / 200)) + ' min read';
  }

  // wrap tables so wide ones scroll on phones
  document.querySelectorAll('.prose table').forEach(function (t) {
    var w = document.createElement('div'); w.className = 'tbl-wrap';
    t.parentNode.insertBefore(w, t); w.appendChild(t);
  });

  // copy buttons on code blocks
  document.querySelectorAll('.prose pre').forEach(function (pre) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'copy-btn'; b.textContent = 'copy';
    b.addEventListener('click', function () {
      var code = (pre.querySelector('code') || pre).innerText;
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(code).then(function () {
        b.textContent = 'copied'; setTimeout(function () { b.textContent = 'copy'; }, 1600);
      });
    });
    pre.appendChild(b);
  });

  // active item in "on this page"
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  var heads = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
  function mark() {
    var y = window.scrollY + 120, cur = null;
    heads.forEach(function (h) { if (h.offsetTop <= y) cur = h; });
    links.forEach(function (a) { a.classList.toggle('active', !!cur && a.getAttribute('href') === '#' + cur.id); });
  }
  if (heads.length) { window.addEventListener('scroll', mark, { passive: true }); mark(); }

  // experience.html: scroll timeline through the organisation badges (same behaviour as the homepage list)
  var xp = document.querySelector('.xp');
  if (xp) {
    var orgs = Array.prototype.slice.call(xp.querySelectorAll('.xp-org'));
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var tick = false;
    var centre = function (el) { var r = el.querySelector('.xp-badge').getBoundingClientRect(); return r.top + r.height / 2; };
    var update = function () {
      tick = false;
      var first = centre(orgs[0]), last = centre(orgs[orgs.length - 1]);
      var span = Math.max(0, last - first);
      xp.style.setProperty('--span', span + 'px');
      if (still) return; // reduced motion: full line, everything lit (no .tl-on)
      var mark = window.innerHeight * 0.55;
      var p = span ? Math.min(1, Math.max(0, (mark - first) / span)) : 1;
      xp.style.setProperty('--tl', p.toFixed(4));
      orgs.forEach(function (o) { o.classList.toggle('lit', centre(o) <= mark); });
    };
    var queue = function () { if (!tick) { tick = true; requestAnimationFrame(update); } };
    if (!still) xp.classList.add('tl-on');
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
  }

  // events.html: hover preview that follows the cursor (fine pointers only, not under reduced motion)
  var peek = document.querySelector('.ev-peek');
  if (peek && window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var pImg = peek.querySelector('img'), px = 0, py = 0, raf = 0;
    var place = function () {
      raf = 0;
      var w = peek.offsetWidth, h = peek.offsetHeight;
      var x = px + 24, y = py - h / 2;
      if (x + w > window.innerWidth - 12) x = px - w - 24;       // flip to the left near the right edge
      y = Math.max(20, Math.min(y, window.innerHeight - h - 20)); // 20px keeps the 1.04 grow-in on screen
      peek.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    };
    pImg.addEventListener('load', place); // its height is only known once the image arrives
    document.querySelectorAll('.ev-row[data-peek]').forEach(function (row) {
      row.addEventListener('mouseenter', function (e) {
        var src = row.getAttribute('data-peek');
        if (pImg.getAttribute('src') !== src) pImg.src = src;
        px = e.clientX; py = e.clientY; place(); peek.classList.add('is-on');
      });
      row.addEventListener('mousemove', function (e) { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(place); });
      row.addEventListener('mouseleave', function () { peek.classList.remove('is-on'); });
      row.addEventListener('click', function () { peek.classList.remove('is-on'); });
    });
    window.addEventListener('scroll', function () { peek.classList.remove('is-on'); }, { passive: true });
  }

  // fade the page in (timer, not rAF — rAF never fires in background tabs, which would leave content hidden)
  setTimeout(function () { root.classList.add('ready'); }, 30);
})();
