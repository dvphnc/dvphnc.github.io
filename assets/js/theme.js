/* Theme: light / dark / system, persisted, with a circular view-transition reveal.
   The <head> snippet applies the saved choice before first paint; this file wires the controls. */
(function () {
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function saved() {
    try { var v = localStorage.getItem('theme'); return v === 'light' || v === 'dark' ? v : 'system'; }
    catch (e) { return 'system'; }
  }
  function isDark(mode) { return mode === 'dark' || (mode === 'system' && mq.matches); }

  function paint(mode) {
    root.classList.toggle('dark', isDark(mode));
    root.setAttribute('data-theme', mode);
    document.querySelectorAll('[data-theme-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-set') === mode));
    });
  }

  function choose(mode, x, y) {
    try { if (mode === 'system') localStorage.removeItem('theme'); else localStorage.setItem('theme', mode); } catch (e) {}
    var willChange = isDark(mode) !== root.classList.contains('dark');
    if (!willChange || !document.startViewTransition || reduce.matches) { paint(mode); return; }

    // Circular reveal from the click point (~540ms), CSS crossfades paused during the snapshot.
    var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add('theme-switching');
    var vt = document.startViewTransition(function () { paint(mode); });
    vt.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 540, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(function () {});
    var done = function () { root.classList.remove('theme-switching'); };
    vt.finished.then(done, done);
    setTimeout(done, 900); // fallback if the transition never settles (e.g. background tab)
  }

  document.querySelectorAll('[data-theme-set]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      var rect = b.getBoundingClientRect();
      var x = e.clientX || rect.left + rect.width / 2;
      var y = e.clientY || rect.top + rect.height / 2;
      choose(b.getAttribute('data-theme-set'), x, y);
    });
  });

  // Follow the OS while on "system"
  var onOS = function () { if (saved() === 'system') paint('system'); };
  if (mq.addEventListener) mq.addEventListener('change', onOS); else if (mq.addListener) mq.addListener(onOS);

  paint(saved());
})();
