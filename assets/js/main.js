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
        timer = setInterval(function () { len++; paint(); if (len >= word.length) { stop(); phase = 'done'; } }, 150);
      },
      onNameErase: function () {
        if (phase === 'idle' || phase === 'erasing') return;
        stop(); phase = 'erasing';
        timer = setInterval(function () { len--; paint(); if (len <= 0) { stop(); phase = 'idle'; } }, 100);
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
      // Calm pace: ~85 ms per character, each language held ~4 s so it can actually be read.
      await type(gt, l.greet, 80); await sleep(180);
      navSync.onNameStart();
      await type(nt, l.name, 85); await sleep(4000);
      navSync.onNameErase();
      await erase(nt, 40); await sleep(120); await erase(gt, 40);
      await sleep(650); i = (i + 1) % langs.length;
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

  /* ── Experience scroll timeline ──
     The line fills and each row lights up once it reaches 55% down the screen. Skipped under reduced motion
     (then the CSS shows everything fully lit). */
  var tl = document.querySelector('.rows.timeline');
  if (tl && !reduced) {
    var tlRows = Array.prototype.slice.call(tl.querySelectorAll('.row'));
    var tlTick = false;
    var tlUpdate = function () {
      tlTick = false;
      var mark = window.innerHeight * 0.55, box = tl.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (mark - box.top) / box.height));
      tl.style.setProperty('--tl', p.toFixed(4));
      var current = null;
      tlRows.forEach(function (row) {
        var on = row.getBoundingClientRect().top + 20 <= mark;
        row.classList.toggle('lit', on);
        if (on) current = row;
      });
      // the card that most recently crossed the mark is the one being read: border + lift
      // (cleared once the list has scrolled most of the way off the top)
      var reading = box.bottom > window.innerHeight * 0.2;
      tlRows.forEach(function (row) { row.classList.toggle('now', reading && row === current); });
    };
    var tlQueue = function () { if (!tlTick) { tlTick = true; requestAnimationFrame(tlUpdate); } };
    tl.classList.add('tl-on');
    tlUpdate();
    window.addEventListener('scroll', tlQueue, { passive: true });
    window.addEventListener('resize', tlQueue);
  }

  /* Escape closes the phone menu */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) menu(false);
  });
})();
