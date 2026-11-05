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

  // fade the page in (timer, not rAF — rAF never fires in background tabs, which would leave content hidden)
  setTimeout(function () { root.classList.add('ready'); }, 30);
})();
