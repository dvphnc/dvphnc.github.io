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

  /* ── Projects opener: a 3D fan of screenshot tiles (anujmagar.com.np, between its featured work and experience) ──
     The homepage mockups are copied into square tiles (the screenshots in turn, 18 tiles). Scroll
     progress t runs 0 → 1 as the fan's top travels from the bottom of the screen to near the top. Every tile flies
     forward on the same z track, each one 40px further back than the one before; once a tile is close enough it
     swings around its pivot (bottom centre) from -200° to its place in the fan (4° → about -74°, 4.6° apart) and turns a little
     in 3D, so the stack opens like pages. The position eases each frame. Under reduced motion it holds the finished
     fan. Decorative: the readable cards are the list below it. */
  var fan = document.querySelector('.pf');
  var fanShots = Array.prototype.slice.call(document.querySelectorAll('#projects .stack-shot.mock'));
  if (fan && fanShots.length) {
    var fPlane = fan.querySelector('.pf-plane'), fCards = [], fN = 18;
    for (var fi = 0; fi < fN; fi++) {
      var src = fanShots[fi % fanShots.length], tile = document.createElement('div');
      tile.className = 'pf-card';
      tile.setAttribute('style', src.getAttribute('style'));
      var im = document.createElement('img');
      im.src = src.querySelector('img').getAttribute('src'); im.alt = ''; im.loading = 'lazy'; im.decoding = 'async';
      tile.appendChild(im); fPlane.appendChild(tile); fCards.push(tile);
    }
    fan.classList.add('is-on');
    var fClamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
    var fEase = function (x) { return 1 - Math.pow(1 - x, 3); };
    // Smoothness: the fan's page position, its size and the screen height are measured once (and on resize),
    // so a frame only reads window.scrollY, never layout. The screen height is the layout viewport
    // (clientHeight), which doesn't jump when a phone's address bar slides away. The easing is time based, so
    // it feels the same at 60 and 120 Hz, and the loop runs only while the fan is near the screen.
    var fGoal = 1, fT = 1, fRun = false, fK = 1, fTop = 0, fW = 0, fH = 0, fVh = 1, fLast = 0, fNear = true, fEnd = 1.6; // fEnd: where the exit ends
    var fSize = function () {
      fK = (fCards[0].offsetWidth || 240) / 240;
      fTop = fan.getBoundingClientRect().top + window.scrollY;
      fW = fan.offsetWidth; fH = fan.offsetHeight;
      fVh = document.documentElement.clientHeight || window.innerHeight;
    };
    fSize();
    var fTarget = function () {
      if (reduced) return 1;
      return fClamp((fVh - (fTop - window.scrollY)) / (fVh * 0.8), 0, fEnd);
    };
    var fPaint = function () {
      // after it opens (t 1.08 → 1.6) the open fan stops coming closer and crosses to the top right instead,
      // swinging a little further up, so it leaves past the top-right corner as the page scrolls on
      var u = fEase(fClamp((fT - 1.08) / 0.52, 0, 1));
      fPlane.style.setProperty('--px', (u * fW * 0.34).toFixed(2) + 'px');
      fPlane.style.setProperty('--py', (-u * fH * 0.42).toFixed(2) + 'px');
      fCards.forEach(function (c, i) {
        var z = (-2600 + 2700 * Math.min(fT, 1.08) - 40 * i) * fK;      // flies forward with the scroll
        var e = fEase(fClamp((z / fK + 1900) / 2100, 0, 1));            // swings into the fan once close
        var rot = -200 * (1 - e) + (4 - 4.6 * i) * e + 16 * u;
        var ry = (-20 + 0.45 * i) * e;
        c.style.transform = 'translate3d(0,0,' + z.toFixed(2) + 'px) rotate(' + rot.toFixed(3) + 'deg) rotateY(' + ry.toFixed(3) + 'deg)';
        c.style.opacity = fClamp((z / fK + 2700) / 700, 0, 1).toFixed(3);
      });
    };
    var fFrame = function (now) {
      var dt = fLast ? Math.min(50, now - fLast) : 16.7; fLast = now;
      fGoal = fTarget();
      var d = fGoal - fT;
      if (Math.abs(d) < 0.0004) { fT = fGoal; fRun = false; fLast = 0; }
      else { fT += d * (1 - Math.pow(1 - 0.16, dt / 16.7)); requestAnimationFrame(fFrame); }
      fPaint();
    };
    var fKick = function () { if (!fNear || fRun) return; fRun = true; fLast = 0; requestAnimationFrame(fFrame); };
    fT = fGoal = fTarget(); fPaint();
    if (!reduced) {
      if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { fNear = es[0].isIntersecting; if (fNear) fKick(); }, { rootMargin: '50% 0px' }).observe(fan);
      window.addEventListener('scroll', fKick, { passive: true });
      var fRz = false;
      window.addEventListener('resize', function () { if (!fRz) { fRz = true; requestAnimationFrame(function () { fRz = false; fSize(); fKick(); }); } });
      window.addEventListener('load', function () { fSize(); fKick(); }); // images and fonts above can move the fan
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fSize(); fKick(); });
      if ('ResizeObserver' in window) new ResizeObserver(function () { fSize(); fKick(); }).observe(document.body); // anything above growing or shrinking
    }
  }

  /* ── Projects: stacked cards (fabwaseem.com "Selected work") ──
     The items are sticky in CSS; here each card shrinks a little (from its top edge) for every later card that
     slides over it, so the pile reads as depth. Only measured while the list is near the screen. Not run under
     reduced motion (CSS makes it a plain list). */
  var sList = document.querySelector('.proj-cards');
  if (sList && !reduced) {
    var sItems = Array.prototype.slice.call(sList.children).filter(function (li) { return li.tagName === 'LI'; });
    var sTick = false, sNear = true, sLastS = [];
    var sUpdate = function () {
      sTick = false;
      var rects = sItems.map(function (li) { return li.getBoundingClientRect(); });
      var hs = sItems.map(function (li) { return li.firstElementChild.offsetHeight; });
      sItems.forEach(function (li, i) {
        var h = hs[i], cover = 0;
        for (var j = i + 1; j < sItems.length; j++) cover += Math.min(1, Math.max(0, (rects[i].top + h - rects[j].top) / h));
        var s = (1 - 0.035 * Math.min(cover, 2.2)).toFixed(4);
        if (s !== sLastS[i]) { sLastS[i] = s; li.firstElementChild.style.setProperty('--s', s); }
      });
    };
    var sQueue = function () { if (sNear && !sTick) { sTick = true; requestAnimationFrame(sUpdate); } };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { sNear = es[0].isIntersecting; sQueue(); }, { rootMargin: '20% 0px' }).observe(sList);
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
    // tag each original's photo so its copies can mirror the same slideshow (see "Event card photos" below)
    originals.forEach(function (c, n) { var ph = c.querySelector('[data-slides]'); if (ph) ph.setAttribute('data-slide-id', String(n)); });
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

  /* ── Touch screens: every event photo stays textured (blue dither) until a finger touches its card. The touched
     card shows its photo in full colour (.is-color) and keeps it until another card is touched, a touch lands
     anywhere else on the page, or the card leaves the screen. (Joana, 17 Nov 2026: textured until touched.) ── */
  if (strip) {
    var evShown = null;
    var evSet = function (card) {
      if (evShown === card) return;
      if (evShown) evShown.classList.remove('is-color');
      evShown = card;
      if (card) card.classList.add('is-color');
    };
    document.addEventListener('touchstart', function (e) {
      var card = e.target.closest && e.target.closest('#events .ev-card');
      evSet(card || null);
    }, { passive: true });
    if ('IntersectionObserver' in window) {
      var evIO = new IntersectionObserver(function (es) { es.forEach(function (en) { if (!en.isIntersecting && en.target === evShown) evSet(null); }); });
      Array.prototype.forEach.call(strip.querySelectorAll('.ev-card'), function (c) { evIO.observe(c); });
    }
  }

  /* ── Event card photos: each event's [data-slides] crossfades to its next photo every 4s, staggered per event, with
     a "n / N" counter. Only the original card runs the timer; every looping copy of it ([data-clone], same
     data-slide-id) shows the same photo at the same moment, so it reads as one slideshow. Pauses while any copy is
     hovered or none is on screen; off under reduced motion. ── */
  if (!reduced) {
    Array.prototype.slice.call(document.querySelectorAll('[data-slides]')).filter(function (c) { return !c.closest('[data-clone]'); }).forEach(function (cover, k) {
      var id = cover.getAttribute('data-slide-id');
      var covers = id === null ? [cover] : Array.prototype.slice.call(document.querySelectorAll('[data-slides][data-slide-id="' + id + '"]'));
      var n = cover.querySelectorAll('.ev-slide').length;
      if (n < 2) return;
      var i = 0, seen = 0, hover = 0;
      var paint = function () {
        covers.forEach(function (cv) {
          cv.querySelectorAll('.ev-slide').forEach(function (sl, j) { sl.classList.toggle('is-on', j === i); });
          var count = cv.querySelector('.ev-count');
          if (count) count.textContent = (i + 1) + ' / ' + n;
        });
      };
      paint();
      covers.forEach(function (cv) {
        var card = cv.closest('.ev-card') || cv;
        card.addEventListener('mouseenter', function () { hover++; });
        card.addEventListener('mouseleave', function () { hover = Math.max(0, hover - 1); });
      });
      if ('IntersectionObserver' in window) {
        var vis = new Set();
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (en) { if (en.isIntersecting) vis.add(en.target); else vis.delete(en.target); });
          seen = vis.size;
        }, { threshold: 0.35 });
        covers.forEach(function (cv) { io.observe(cv); });
      } else seen = 1;
      setTimeout(function () {
        setInterval(function () { if (!seen || hover || document.hidden) return; i = (i + 1) % n; paint(); }, 4000);
      }, (k % 6) * 700);
    });
  }

  /* Certification deck: assets/js/deck.js (shared with certifications.html) */

  /* Escape closes the phone menu */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) menu(false);
  });
})();
