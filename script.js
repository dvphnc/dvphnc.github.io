/* ══ CURSOR ══ */
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

/* ══ CLOCK ══ */
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

/* ══ WAVE CANVAS — Edwin Le style ══ */
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
    const N = 55;
    for (let i = 0; i < N; i++) {
      const p    = i / (N - 1);
      const bell = Math.sin(p * Math.PI);
      const op   = 0.022 + 0.065 * bell;
      const yB   = H * (0.15 + p * 0.75);
      const amp  = H * (0.055 + 0.12 * bell);
      const ph   = t * 0.55 + p * 5.2;
      cx.beginPath();
      for (let px = 0; px <= W; px += 2) {
        const nx = px / W;
        const w  = Math.sin(nx * Math.PI * 2.5 + ph) * .58
                 + Math.sin(nx * Math.PI * 1.1 + ph * .5) * .42;
        const y  = yB + w * amp - nx * H * 0.28;
        px === 0 ? cx.moveTo(px, y) : cx.lineTo(px, y);
      }
      cx.strokeStyle = `rgba(190,195,210,${op})`;
      cx.lineWidth   = 0.4;
      cx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══ TYPEWRITER — multilingual full phrases ══ */
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
  "你好，我是达芙妮。",
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

/* ══ STACK STRIP ══ */
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

/* ══ SKILL GRID ══ */
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

/* ══ VAULT ══ */
const VAULT = [
  { id:'001', title:'Importance of Cyber Security',       link:'notes/Importance of Cyber Security.html',              tags:'CIA Triad · Fundamentals',  threat:'info',  g:['[INFO] scanning target...','No critical CVEs found','Status: SECURE \u2713'] },
  { id:'002', title:'Career in IT Security',              link:'notes/Career Opportunities in IT Security.html',       tags:'Red Team · Blue Team',       threat:'info',  g:['[INFO] profiling roles...','Red / blue team loaded','Threat model: ACTIVE'] },
  { id:'003', title:'Cloud & Virtualization',             link:'notes/Cloud and Virtualization Fundamentals.html',     tags:'Infrastructure · Cloud',     threat:'info',  g:['[INFO] probing cloud infra...','Virtual surfaces mapped','Attack surface: MEDIUM'] },
  { id:'004', title:'Path Traversal \u2014 CWE-35',       link:'notes/CWE-35 - Path Traversal.html',                   tags:'File System · Web',          threat:'high',  g:['[WARN] ../../etc/passwd','Directory traversal DETECTED','Severity: HIGH \u26a0'] },
  { id:'005', title:'SQL Injection \u2014 CWE-89',        link:'notes/CWE-89 - SQL Injection.html',                    tags:'Injection · Critical',       threat:'crit',  g:["[CRIT] ' OR 1=1--",'Database COMPROMISED','Severity: CRITICAL \u2620'] },
  { id:'006', title:'Burp Suite Fundamentals',            link:'notes/Burp Suite Introduction.html',                   tags:'Tools · Pentesting',         threat:'med',   g:['[INFO] proxy intercepting...','HTTP traffic captured','Burp Suite: RUNNING'] },
  { id:'007', title:'Email Security Fundamentals',        link:'notes/Email Security Fundamentals.html',               tags:'Encryption · Email',         threat:'info',  g:['[INFO] DKIM lookup...','SPF records validated','Mail server: HARDENED'] },
  { id:'008', title:'Cross-Site Scripting \u2014 CWE-79', link:'notes/CWE-79 - Cross-Site Scripting (XSS).html',      tags:'OWASP Top 10',               threat:'crit',  g:['[CRIT] XSS payload injected','DOM injection SUCCESSFUL','Severity: CRITICAL \u2620'] },
  { id:'009', title:'Encryption Fundamentals',            link:'notes/Encryption Fundamentals.html',                   tags:'Cryptography · Core',        threat:'info',  g:['[INFO] key exchange init...','AES-256 handshake OK','Encryption: ACTIVE \uD83D\uDD10'] },
  { id:'010', title:'Web App Security \u2014 Intro',      link:'notes/Introduction to Web Application Security.html',  tags:'OWASP · Fundamentals',       threat:'med',   g:['[SCAN] OWASP Top 10 check...','3 findings detected','Risk level: MEDIUM \u26a0'] },
  { id:'011', title:'OS Command Injection \u2014 CWE-78', link:'notes/CWE-78 - OS Command Injection.html',             tags:'RCE · Dangerous',            threat:'crit',  g:['[CRIT] ; cat /etc/shadow','Remote code EXECUTING','Severity: CRITICAL \u2620'] },
  { id:'012', title:'Network Traffic Analysis',           link:'notes/Network Traffic Analysis.html',                  tags:'Security · Network',         threat:'high',  g:['[WARN] anomaly detected...','Suspicious packets: 1,447','Alert: FLAGGED \u26a0'] },
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

/* ══ CONTACT SOCIAL CARDS ══ */
const SOCIALS = [
  { icon:'🐙', name:'GitHub',    handle:'@dvphnc',        url:'https://github.com/dvphnc' },
  { icon:'💼', name:'LinkedIn',  handle:'dvphnc',          url:'https://linkedin.com/in/dvphnc' },
  { icon:'🏴', name:'TryHackMe', handle:'joanadaphne.sy', url:'https://tryhackme.com/p/joanadaphne.sy' },
  { icon:'📦', name:'HackTheBox',handle:'Profile',         url:'https://account.hackthebox.com/HTB-350C996E4F' },
];
function buildContact() {
  const track = document.getElementById('contact-track');
  if (!track) return;
  const metricsCard = track.querySelector('.metrics-card');
  SOCIALS.forEach(s => {
    const a = document.createElement('a');
    a.href      = s.url;
    a.target    = '_blank';
    a.className = 'soc-card';
    a.innerHTML = `<span class="soc-icon">${s.icon}</span>
                   <div>
                     <div class="soc-name">${s.name}</div>
                     <div class="soc-handle">${s.handle}</div>
                   </div>
                   <span class="soc-arr">↗</span>`;
    track.insertBefore(a, metricsCard);
  });
}
buildContact();

/* ══ LOADER EXIT ══ */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  /* Hard failsafe — if something goes wrong, force-dismiss after 5s */
  const failsafe = setTimeout(() => {
    loader.style.display = 'none';
    const nav = document.getElementById('nav');
    if (nav) nav.classList.add('vis');
    typeWriter();
  }, 5000);

  setTimeout(() => {
    loader.classList.add('exit');
    setTimeout(() => {
      clearTimeout(failsafe);
      loader.style.display = 'none';

      const nav = document.getElementById('nav');
      if (nav) nav.classList.add('vis');

      const steps = [
        ['hero-ey',    'in',   0],
        ['hero-foot',  'in',  300],
        ['hero-stats', 'in',  480],
        ['scroll-pill','in',  660],
      ];
      steps.forEach(([id, cls, delay]) =>
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.classList.add(cls);
        }, delay)
      );

      setTimeout(typeWriter, 200);
    }, 600);
  }, 2400);
})();

/* ══ SCROLL REVEAL — looped ══ */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
    else                  e.target.classList.remove('in');
  });
}, { threshold: 0.06, rootMargin: '0px 0px -28px 0px' });
document.querySelectorAll('.sr').forEach(el => io.observe(el));

/* cert stagger */
function observeCerts() {
  const rows = document.querySelectorAll('.cr:not(.dim)');
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

window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('sc', window.scrollY > 50);
}, { passive: true });
