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
      tlRows.forEach(function (row) { row.classList.toggle('lit', row.getBoundingClientRect().top + 20 <= mark); });
    };
    var tlQueue = function () { if (!tlTick) { tlTick = true; requestAnimationFrame(tlUpdate); } };
    tl.classList.add('tl-on');
    tlUpdate();
    window.addEventListener('scroll', tlQueue, { passive: true });
    window.addEventListener('resize', tlQueue);
  }

  /* ── Projects: stacked cards (fabwaseem.com "Selected work") ──
     The items are sticky in CSS; here each card shrinks a little (from its top edge) for every later card that
     slides over it, so the pile reads as depth. Not run under reduced motion (CSS makes it a plain list). */
  var stack = document.querySelector('.stack');
  if (stack && !reduced) {
    var sItems = Array.prototype.slice.call(stack.querySelectorAll('.stack-item'));
    var sTick = false;
    var sUpdate = function () {
      sTick = false;
      var rects = sItems.map(function (li) { return li.getBoundingClientRect(); });
      sItems.forEach(function (li, i) {
        var h = li.firstElementChild.offsetHeight, cover = 0;
        for (var j = i + 1; j < sItems.length; j++) cover += Math.min(1, Math.max(0, (rects[i].top + h - rects[j].top) / h));
        li.firstElementChild.style.setProperty('--s', (1 - 0.035 * Math.min(cover, 2.2)).toFixed(4));
      });
    };
    var sQueue = function () { if (!sTick) { sTick = true; requestAnimationFrame(sUpdate); } };
    sUpdate();
    window.addEventListener('scroll', sQueue, { passive: true });
    window.addEventListener('resize', sQueue);
  }

  /* ── Events strip: drifts left to right, loops seamlessly (rolex-esto.vercel.app style) ──
     The six cards are cloned once so the strip can wrap. Pauses while hovered, touched, focused, dragged, off screen
     or in a hidden tab. ‹ › scroll by one card; "view all" switches to a grid of the real cards. Under reduced
     motion there's no drift and no clones: it's a plain strip you scroll by hand. */
  var evSec = document.getElementById('events');
  var strip = evSec && evSec.querySelector('.ev-strip');
  if (strip) {
    var track = strip.querySelector('.ev-track');
    var originals = Array.prototype.slice.call(track.children);
    var loop = !reduced;
    // with only a couple of cards, repeat them until one "set" is wider than the strip, then add a second identical
    // set so the strip can wrap from one to the other invisibly
    var reps = 1;
    if (loop) {
      var one = track.scrollWidth + 14;
      reps = Math.max(1, Math.ceil((strip.clientWidth + 320) / one));
      for (var r = 1; r < reps * 2; r++) originals.forEach(function (c) {
        var k = c.cloneNode(true);
        k.setAttribute('data-clone', ''); k.setAttribute('aria-hidden', 'true');
        k.querySelectorAll('a, button').forEach(function (el) { el.setAttribute('tabindex', '-1'); });
        track.appendChild(k);
      });
    }
    // exact width of one set (cards + gaps), measured from the first card of set 2
    var half = function () { var k = track.children[originals.length * reps]; return k ? k.offsetLeft - track.children[0].offsetLeft : track.scrollWidth / 2; };
    // keep the scroll position inside one copy's width; both copies look identical, so the jump is invisible
    var wrap = function () { if (!loop || grid) return; var h = half(); if (strip.scrollLeft <= 1) strip.scrollLeft += h; else if (strip.scrollLeft >= h + 2) strip.scrollLeft -= h; };
    // pause state: plain flags plus a "resume after" time, so nothing can get stuck paused
    var hov = false, foc = false, dragging = false, resumeAt = 0, inView = false, grid = false, last = 0, acc = 0;
    var later = function (ms) { resumeAt = Math.max(resumeAt, performance.now() + ms); };
    var isPaused = function () { return hov || foc || dragging || performance.now() < resumeAt; };
    strip.addEventListener('mouseenter', function () { hov = true; });
    strip.addEventListener('mouseleave', function () { hov = false; later(800); });
    strip.addEventListener('focusin', function () { foc = true; });
    strip.addEventListener('focusout', function () { foc = false; later(800); });
    strip.addEventListener('touchstart', function () { later(2500); }, { passive: true });
    strip.addEventListener('touchmove', function () { later(2500); }, { passive: true });
    strip.addEventListener('scroll', function () { wrap(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { inView = es[0].isIntersecting; }).observe(strip); else inView = true;
    if (loop) {
      requestAnimationFrame(function () { strip.scrollLeft = half(); });
      var SPEED = 38; // px per second
      var frame = function (t) {
        var dt = last ? Math.min(64, t - last) : 0; last = t;
        if (!isPaused() && inView && !grid && !document.hidden) {
          acc += SPEED * dt / 1000;               // content moves left → right: scroll position decreases
          if (acc >= 1) { var step = Math.floor(acc); acc -= step; strip.scrollLeft -= step; wrap(); }
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }
    // drag with a mouse (touch already scrolls natively)
    var dragX = null, startLeft = 0, moved = false;
    strip.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' || grid) return; dragX = e.clientX; startLeft = strip.scrollLeft; moved = false; dragging = true; });
    window.addEventListener('pointermove', function (e) {
      if (dragX === null) return;
      var dx = e.clientX - dragX;
      if (Math.abs(dx) > 4) { moved = true; strip.classList.add('is-dragging'); }
      strip.scrollLeft = startLeft - dx; wrap();
    });
    window.addEventListener('pointerup', function () { if (dragX === null) return; dragX = null; dragging = false; later(1200); setTimeout(function () { strip.classList.remove('is-dragging'); }, 0); });
    strip.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    // ‹ › and view all
    var cardStep = function () { var c = track.children[0]; return c.getBoundingClientRect().width + 14; };
    evSec.querySelectorAll('[data-ev]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-ev');
        if (k === 'all') {
          grid = !grid; evSec.classList.toggle('ev-grid', grid); b.setAttribute('aria-pressed', String(grid));
          b.textContent = grid ? 'show strip' : 'view all';
          if (!grid && loop) strip.scrollLeft = half();
          return;
        }
        later(2500);
        strip.scrollBy({ left: (k === 'next' ? 1 : -1) * cardStep(), behavior: reduced ? 'auto' : 'smooth' });
      });
    });
  }

  /* ── Event card photos: each [data-slides] crossfades to its next photo every 4s, staggered per card, with a
     "n / N" counter. Pauses while that card is hovered or off screen; off under reduced motion. ── */
  if (!reduced) {
    Array.prototype.slice.call(document.querySelectorAll('[data-slides]')).forEach(function (cover, k) {
      var imgs = Array.prototype.slice.call(cover.querySelectorAll('img'));
      var count = cover.querySelector('.ev-count');
      if (imgs.length < 2) return;
      var i = 0, seen = false, hover = false;
      var card = cover.closest('.ev-card') || cover;
      var paint = function () {
        imgs.forEach(function (im, n) { im.classList.toggle('is-on', n === i); });
        if (count) count.textContent = (i + 1) + ' / ' + imgs.length;
      };
      paint();
      card.addEventListener('mouseenter', function () { hover = true; });
      card.addEventListener('mouseleave', function () { hover = false; });
      if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { seen = es[0].isIntersecting; }, { threshold: 0.35 }).observe(cover); else seen = true;
      setTimeout(function () {
        setInterval(function () { if (!seen || hover || document.hidden) return; i = (i + 1) % imgs.length; paint(); }, 4000);
      }, (k % 6) * 700);
    });
  }

  /* Escape closes the phone menu */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) menu(false);
  });
})();
