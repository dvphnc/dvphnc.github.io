/* dvphnc — page behaviour: theme, nav, multilingual name, entrance, easter eggs. */
(function () {
  var root = document.documentElement;

  /* Theme switching lives in theme.js (shared with the note pages). */

  /* ── Mobile overlay menu ── */
  var overlay = document.getElementById('overlay');
  var openBtn = document.getElementById('menuOpen');
  var closeBtn = document.getElementById('menuClose');
  function menu(open) {
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeBtn.focus();
  }
  openBtn.addEventListener('click', function () { menu(true); });
  closeBtn.addEventListener('click', function () { menu(false); openBtn.focus(); });
  overlay.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });

  /* ── Active section in the sidebar ── */
  var links = Array.prototype.slice.call(document.querySelectorAll('.sidebar .side-nav a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  function markActive() {
    var y = window.scrollY + window.innerHeight * 0.3, current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1];
    links.forEach(function (a) { a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id); });
  }
  window.addEventListener('scroll', markActive, { passive: true });
  markActive();

  /* ── Toast + copy email ── */
  var toastEl = document.getElementById('toast'), toastT;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2000);
  }
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-copy');
      if (navigator.clipboard) navigator.clipboard.writeText(v).then(function () { toast('Email copied'); }, function () { toast(v); });
      else toast(v);
    });
  });

  /* ── Sidebar / top-bar brand types "dvphnc" in step with the hero name ── */
  var brands = Array.prototype.slice.call(document.querySelectorAll('[data-brand]'));
  var navSync = (function () {
    var word = 'dvphnc', timer = null, phase = 'idle', len = 0;
    function paint() { brands.forEach(function (el) { el.textContent = word.slice(0, len); }); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    return {
      onNameStart: function () {
        if (phase === 'typing' || phase === 'done') return;
        stop(); phase = 'typing';
        timer = setInterval(function () { len++; paint(); if (len >= word.length) { stop(); phase = 'done'; } }, 100);
      },
      onNameErase: function () {
        if (phase === 'idle' || phase === 'erasing') return;
        stop(); phase = 'erasing';
        timer = setInterval(function () { len--; paint(); if (len <= 0) { stop(); phase = 'idle'; } }, 70);
      }
    };
  })();

  /* ── Hero: name in different languages (retained) ── */
  var langs = [
    { greet: "Hi, I'm", name: 'Joana Daphne Sy' },
    { greet: 'Hola, soy', name: 'Joana Daphne Sy' },
    { greet: 'Bonjour, je suis', name: 'Joana Daphne Sy' },
    { greet: 'Ciao, sono', name: 'Joana Daphne Sy' },
    { greet: 'Kamusta, ako si', name: 'Joana Daphne Sy' },
    { greet: 'Olá, eu sou', name: 'Joana Daphne Sy' },
    { greet: 'Hallo, ich bin', name: 'Joana Daphne Sy' },
    { greet: 'Merhaba, ben', name: 'Joana Daphne Sy' },
    { greet: '안녕하세요, 저는', name: '호아나 다프네 시', font: "'Noto Sans KR', sans-serif" },
    { greet: 'こんにちは、私は', name: 'ホアナ ダフネ シー', font: "'Noto Sans JP', sans-serif" },
    { greet: '你好，我是', name: '胡安娜达芙妮施', font: "'Noto Sans SC', sans-serif" }
  ];
  var greetEl = document.getElementById('heroGreet');
  var nameEl = document.getElementById('heroName');
  var caret = nameEl.querySelector('.caret');
  var gt = document.createTextNode(''), nt = document.createTextNode('');
  greetEl.textContent = ''; greetEl.appendChild(gt);
  nameEl.insertBefore(nt, caret);
  nameEl.setAttribute('aria-label', 'Joana Daphne Sy');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  async function type(node, str, spd) { var b = ''; for (var ch of str) { b += ch; node.nodeValue = b; await sleep(spd + Math.random() * 14 - 7); } }
  async function erase(node, spd) { var b = node.nodeValue; while (b.length) { b = b.slice(0, -1); node.nodeValue = b; await sleep(spd); } }

  function staticName() {
    gt.nodeValue = "Hi, I'm"; nt.nodeValue = 'Joana Daphne Sy';
    brands.forEach(function (el) { el.textContent = 'dvphnc'; });
  }
  async function cycle() {
    // CJK fonts only when the cycle actually needs them
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&family=Noto+Sans+JP:wght@700&family=Noto+Sans+SC:wght@700&display=swap';
    document.head.appendChild(f);
    var i = 0;
    while (true) {
      var l = langs[i];
      nameEl.style.fontFamily = l.font || '';
      nameEl.style.fontWeight = l.font ? '700' : '';
      await type(gt, l.greet, 58); await sleep(110);
      navSync.onNameStart();
      await type(nt, l.name, 50); await sleep(2500);
      navSync.onNameErase();
      await erase(nt, 26); await sleep(80); await erase(gt, 26);
      await sleep(360); i = (i + 1) % langs.length;
    }
  }

  /* ── Start after the boot screen ── */
  var started = false;
  function start() {
    if (started) return; started = true;
    root.classList.add('ready');
    if (reduced) { staticName(); return; }
    setTimeout(function () { cycle().catch(staticName); }, 400);
  }
  if (document.getElementById('boot-screen')) {
    document.addEventListener('bootDone', start);
    setTimeout(start, 9000); // failsafe
  } else start();

  /* ── Easter eggs (retained): Konami code → flag ── */
  var modal = document.getElementById('flagModal');
  function closeModal() { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); }
  modal.addEventListener('click', function (e) { if (e.target === modal || e.target.hasAttribute('data-close')) closeModal(); });
  var ks = [], K = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeModal(); if (overlay.classList.contains('open')) menu(false); }
    ks.push(e.keyCode); ks = ks.slice(-10);
    if (ks.join(',') === K.join(',')) { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); }
  });
  document.body.insertAdjacentHTML('beforeend', '<!-- CTF FLAG: dvphnc{y0u_f0und_m3_g00d_r3c0n} -->');
})();
