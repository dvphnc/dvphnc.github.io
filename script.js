/* ═══════════════════════════════
   CURSOR
═══════════════════════════════ */
const cur  = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx = -200, my = -200, rx = -200, ry = -200;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});
(function tick() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(tick);
})();

/* ═══════════════════════════════
   CLOCK
═══════════════════════════════ */
function tickClock() {
  const d = new Date();
  const el = document.getElementById('clock');
  if (el) el.textContent =
    String(d.getHours()).padStart(2,'0') + ':' +
    String(d.getMinutes()).padStart(2,'0') + ':' +
    String(d.getSeconds()).padStart(2,'0');
}
setInterval(tickClock, 1000);
tickClock();

/* ═══════════════════════════════
   WAVE CANVAS — Edwin Le style
=══════════════════════════════ */
(function () {
  const cv = document.getElementById('wave-canvas');
  if (!cv) return;
  const cx = cv.getContext('2d');
  let W, H, t = 0;
  function resize() {
    W = cv.width  = window.innerWidth;
    H = cv.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    t += 0.0025;
    cx.clearRect(0, 0, W, H);
    cx.fillStyle = '#000';
    cx.fillRect(0, 0, W, H);
    const N = 52;
    for (let i = 0; i < N; i++) {
      const p    = i / (N - 1);
      const bell = Math.sin(p * Math.PI);
      const op   = 0.018 + 0.06 * bell;
      const yB   = H * (0.15 + p * 0.75);
      const amp  = H * (0.05 + 0.11 * bell);
      const ph   = t * 0.55 + p * 5.2;
      cx.beginPath();
      for (let px = 0; px <= W; px += 2) {
        const nx = px / W;
        const w  = Math.sin(nx * Math.PI * 2.5 + ph) * .58
                 + Math.sin(nx * Math.PI * 1.1 + ph * .5) * .42;
        const y  = yB + w * amp - nx * H * 0.28;
        px === 0 ? cx.moveTo(px, y) : cx.lineTo(px, y);
      }
      cx.strokeStyle = `rgba(188,193,208,${op})`;
      cx.lineWidth   = 0.4;
      cx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════
   TYPEWRITER — multilingual
═══════════════════════════════ */
const PHRASES = [
  "Hi, I'm Daphne.",
  "Hola, soy Daphne.",
  "Ciao, sono Daphne.",
  "Salut, je suis Daphne.",
  "Hei, jeg er Daphne.",
  "こんにちは、ダフネです。",
  "안녕, 나는 다프네야.",
  "Merhaba, ben Daphne.",
  "Olá, sou a Daphne.",
  "Hallo, ich bin Daphne.",
  "你好，我是 Daphne。",
];
let twRunning = false;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function typeWriter() {
  const el = document.getElementById('tw-text');
  if (!el) return;
  twRunning = true;
  let pi = 0;
  while (twRunning) {
    const phrase = PHRASES[pi];
    for (let i = 0; i <= phrase.length; i++) {
      if (!twRunning) return;
      el.textContent = phrase.slice(0, i);
      const ch = phrase[i];
      const d  = (ch === '.' || ch === '。') ? 180
               : ch === ',' ? 110
               : ch === ' ' ? 55
               : 50 + Math.random() * 30;
      await sleep(d);
    }
    await sleep(2000);
    for (let i = phrase.length; i >= 0; i--) {
      if (!twRunning) return;
      el.textContent = phrase.slice(0, i);
      await sleep(26 + Math.random() * 18);
    }
    await sleep(340);
    pi = (pi + 1) % PHRASES.length;
  }
}

/* ═══════════════════════════════
   STACK STRIP
═══════════════════════════════ */
const STACK_ITEMS = [
  { icon: '⚛️',  name: 'React',         cat: 'Frontend' },
  { icon: '🌀',  name: 'TailwindCSS',   cat: 'Styling' },
  { icon: '🐘',  name: 'PHP / Laravel', cat: 'Backend' },
  { icon: '🗄️',  name: 'MySQL',          cat: 'Database' },
  { icon: '🎯',  name: 'Burp Suite',    cat: 'Security' },
  { icon: '🌐',  name: 'Wireshark',     cat: 'Networking' },
  { icon: '🐙',  name: 'Git / GitHub',  cat: 'Version Control' },
  { icon: '📬',  name: 'Postman',       cat: 'API Testing' },
  { icon: '🔒',  name: 'ISC2 CC',       cat: 'Certification' },
  { icon: '🏴',  name: 'TryHackMe',    cat: 'CTF Platform' },
  { icon: '📦',  name: 'HackTheBox',   cat: 'CTF Platform' },
  { icon: '☁️',  name: 'Oracle OCI',   cat: 'Cloud' },
  { icon: '💻',  name: 'VS Code',       cat: 'Editor' },
  { icon: '🔑',  name: 'Cryptography', cat: 'Security' },
  { icon: '🕸️',  name: 'HTML / CSS',    cat: 'Web' },
  { icon: '🐧',  name: 'Linux CLI',     cat: 'System' },
];

function buildStack() {
  const track = document.getElementById('stack-track');
  if (!track) return;
  const all = [...STACK_ITEMS, ...STACK_ITEMS];
  all.forEach(s => {
    const d = document.createElement('div');
    d.className = 'sk-card';
    d.innerHTML = `<div class="sk-ico">${s.icon}</div>
                   <div><div class="sk-name">${s.name}</div>
                   <div class="sk-cat">${s.cat}</div></div>`;
    track.appendChild(d);
  });
}
buildStack();

/* ═══════════════════════════════
   SKILL BENTO GRID
═══════════════════════════════ */
const SKILLS = [
  { n:'01', ico:'⚛️', name:'Front-end',       list:'React · JavaScript\nHTML · CSS\nTailwindCSS' },
  { n:'02', ico:'🐘', name:'Back-end',         list:'PHP · Laravel\nMySQL · REST API\nMVC Architecture' },
  { n:'03', ico:'🎯', name:'Pentesting',       list:'Burp Suite\nXSS · SQLi\nPath Traversal · RCE' },
  { n:'04', ico:'📡', name:'Networking',       list:'Wireshark\nTraffic Analysis\nEmail Security' },
  { n:'05', ico:'☁️', name:'Cloud',            list:'Oracle Cloud OCI\nVirtualization\nAI Foundations' },
  { n:'06', ico:'🔐', name:'Cryptography',     list:'Encryption Fundamentals\nSymmetric · Asymmetric\nHashing · PKI' },
  { n:'07', ico:'🏴', name:'CTF & Research',  list:'TryHackMe\nHackTheBox\nExploit Writeups' },
  { n:'08', ico:'🔧', name:'Dev Tools',        list:'Git · VS Code\nPostman\nChrome DevTools' },
];
function buildSkills() {
  const grid = document.getElementById('skill-grid');
  if (!grid) return;
  SKILLS.forEach(s => {
    const d = document.createElement('div');
    d.className = 'sg-cell';
    d.innerHTML = `<span class="sg-num">${s.n}</span>
                   <span class="sg-ico">${s.ico}</span>
                   <div class="sg-name">${s.name}</div>
                   <div class="sg-list">${s.list.replace(/\n/g,'<br>')}</div>`;
    grid.appendChild(d);
  });
}
buildSkills();

/* ═══════════════════════════════
   VAULT
═══════════════════════════════ */
const VAULT = [
  { id:'001', title:'Importance of Cyber Security',  link:'notes/Importance of Cyber Security.html',              tags:'CIA Triad · Fundamentals',  threat:'info',  g:['[INFO] scanning target...','No critical CVEs found','Status: SECURE \u2713'] },
  { id:'002', title:'Career in IT Security',          link:'notes/Career Opportunities in IT Security.html',      tags:'Red Team · Blue Team',       threat:'info',  g:['[INFO] profiling roles...','Red / blue team loaded','Threat model: ACTIVE'] },
  { id:'003', title:'Cloud & Virtualization',         link:'notes/Cloud and Virtualization Fundamentals.html',    tags:'Infrastructure · Cloud',     threat:'info',  g:['[INFO] probing cloud infra...','Virtual surfaces mapped','Attack surface: MEDIUM'] },
  { id:'004', title:'Path Traversal \u2014 CWE-35',  link:'notes/CWE-35 - Path Traversal.html',                  tags:'File System · Web',          threat:'high',  g:['[WARN] ../../etc/passwd','Directory traversal DETECTED','Severity: HIGH \u26a0'] },
  { id:'005', title:'SQL Injection \u2014 CWE-89',   link:'notes/CWE-89 - SQL Injection.html',                   tags:'Injection · Critical',       threat:'crit',  g:["[CRIT] ' OR 1=1--",'Database COMPROMISED','Severity: CRITICAL \u2620'] },
  { id:'006', title:'Burp Suite Fundamentals',        link:'notes/Burp Suite Introduction.html',                  tags:'Tools · Pentesting',         threat:'med',   g:['[INFO] proxy intercepting...','HTTP traffic captured','Burp Suite: RUNNING'] },
  { id:'007', title:'Email Security Fundamentals',    link:'notes/Email Security Fundamentals.html',              tags:'Encryption · Email',         threat:'info',  g:['[INFO] DKIM lookup...','SPF records validated','Mail server: HARDENED'] },
  { id:'008', title:'Cross-Site Scripting \u2014 CWE-79', link:'notes/CWE-79 - Cross-Site Scripting (XSS).html', tags:'OWASP Top 10',               threat:'crit',  g:['[CRIT] XSS payload injected','DOM injection SUCCESSFUL','Severity: CRITICAL \u2620'] },
  { id:'009', title:'Encryption Fundamentals',        link:'notes/Encryption Fundamentals.html',                  tags:'Cryptography · Core',        threat:'info',  g:['[INFO] key exchange init...','AES-256 handshake OK','Encryption: ACTIVE \uD83D\uDD10'] },
  { id:'010', title:'Web App Security \u2014 Intro', link:'notes/Introduction to Web Application Security.html', tags:'OWASP · Fundamentals',       threat:'med',   g:['[SCAN] OWASP Top 10 check...','3 findings detected','Risk level: MEDIUM \u26a0'] },
  { id:'011', title:'OS Command Injection \u2014 CWE-78', link:'notes/CWE-78 - OS Command Injection.html',       tags:'RCE · Dangerous',            threat:'crit',  g:['[CRIT] ; cat /etc/shadow','Remote code EXECUTING','Severity: CRITICAL \u2620'] },
  { id:'012', title:'Network Traffic Analysis',       link:'notes/Network Traffic Analysis.html',                 tags:'Security · Network',         threat:'high',  g:['[WARN] anomaly detected...','Suspicious packets: 1,447','Alert: FLAGGED \u26a0'] },
];
function buildVault() {
  const vg = document.getElementById('vault-grid');
  if (!vg) return;
  VAULT.forEach(n => {
    const a = document.createElement('a');
    a.href      = n.link;
    a.className = 'vc ' + n.threat;
    a.target    = '_blank';
    a.innerHTML = `<div class="vc-glitch">
        <span class="glitch-line">${n.g[0]}</span>
        <span class="glitch-line g2">${n.g[1]}</span>
        <span class="glitch-line g3">${n.g[2]}</span>
      </div>
      <div class="vc-id">${n.id}</div>
      <div class="vc-title">${n.title}</div>
      <div class="vc-tags">${n.tags}</div>`;
    vg.appendChild(a);
  });
}
buildVault();

/* ═══════════════════════════════
   LOADER EXIT
═══════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('exit');

    setTimeout(() => {
      loader.style.display = 'none';

      // reveal sidebar
      const sb = document.getElementById('sidebar');
      if (sb) sb.classList.add('vis');

      // hero cascade
      const steps = [
        ['home-tag',   'in',   0],
        ['hw-name',    'in',  100],
        ['home-blurb', 'in',  380],
        ['home-ctas',  'in',  520],
        ['home-bento', 'in',  680],
        ['scroll-pill','in',  860],
      ];
      steps.forEach(([id, cls, delay]) =>
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.classList.add(cls);
        }, delay)
      );

      setTimeout(typeWriter, 200);
    }, 600);

  }, 2400); // boot log ends ~1.75s, exit at 2.4s
});

/* ═══════════════════════════════
   SCROLL REVEAL (looped)
═══════════════════════════════ */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
    else                  e.target.classList.remove('in');
  });
}, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.sr').forEach(el => io.observe(el));

/* cert stagger-in */
function observeCerts() {
  const rows = document.querySelectorAll('.cert-row:not(.dim)');
  const cio  = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), i * 80);
        cio.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  rows.forEach(r => cio.observe(r));
}
observeCerts();

/* ═══════════════════════════════
   SIDEBAR ACTIVE LINK
   (tracks scroll position)
═══════════════════════════════ */
const sections  = document.querySelectorAll('.section');
const navLinks  = document.querySelectorAll('.sb-link');

const sio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.dataset.s === id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sio.observe(s));
