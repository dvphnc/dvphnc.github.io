/**
 * scripts/export.js
 * Generates a static index.html for GitHub Pages deployment
 * Run: node scripts/export.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'docs'); // GitHub Pages reads from /docs

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const year = new Date().getFullYear();

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="Joana Daphne Sy — Aspiring Tech VA, BSIT 3rd Year, Oracle Certified, CTF enthusiast.">
  <meta property="og:title" content="dvphnc — Joana Daphne Sy">
  <meta property="og:description" content="Aspiring Tech VA · Oracle Cloud Certified · CTF Enthusiast · BSIT 3rd Year">
  <meta property="og:url" content="https://dvphnc.github.io">
  <title>dvphnc — Joana Daphne Sy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #f5f5f7; --surface: rgba(255,255,255,0.72); --surface-hover: rgba(255,255,255,0.92);
      --border: rgba(0,0,0,0.08); --text-primary: #1d1d1f; --text-secondary: #6e6e73;
      --text-tertiary: #aeaeb2; --accent: #0071e3; --accent-2: #5e5ce6;
      --oracle-red: #C74634; --mono: 'JetBrains Mono', monospace; --sans: 'Inter', -apple-system, sans-serif;
      --radius: 18px;
    }
    html { scroll-behavior: smooth; }
    body { font-family: var(--sans); background: var(--bg); color: var(--text-primary); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    body::before {
      content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background: radial-gradient(ellipse 80% 60% at 20% -10%, rgba(94,92,230,0.13) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 80% 110%, rgba(0,113,227,0.10) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 50% 50%, rgba(199,70,52,0.04) 0%, transparent 70%);
    }
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 44px; height: 52px;
      background: rgba(245,245,247,0.84);
      backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid var(--border); transition: box-shadow 0.3s;
    }
    nav.scrolled { box-shadow: 0 1px 20px rgba(0,0,0,0.06); }
    .nav-logo { font-family: var(--mono); font-size: 13px; font-weight: 500; color: var(--text-primary); letter-spacing: -0.01em; }
    .nav-links { display: flex; gap: 32px; list-style: none; }
    .nav-links a { font-size: 13px; font-weight: 400; color: var(--text-secondary); text-decoration: none; transition: color 0.2s; }
    .nav-links a:hover { color: var(--text-primary); }
    .nav-menu-btn { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
    .nav-menu-btn span { display: block; width: 20px; height: 1.5px; background: var(--text-primary); border-radius: 2px; transition: all 0.25s; }
    .mobile-menu { display: none; position: fixed; top: 52px; left: 0; right: 0; z-index: 99; background: rgba(245,245,247,0.96); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); flex-direction: column; padding: 12px 0; }
    .mobile-menu.open { display: flex; }
    .mobile-link { padding: 12px 44px; font-size: 15px; font-weight: 500; color: var(--text-primary); text-decoration: none; }
    .mobile-link:hover { background: rgba(0,0,0,0.04); }
    section { position: relative; z-index: 1; max-width: 980px; margin: 0 auto; padding: 120px 44px; }
    #hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding-top: 52px; position: relative; }
    .hero-inner { max-width: 600px; }
    .hero-tag { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 22px; opacity: 0; transform: translateY(12px); animation: fadeUp 0.6s 0.1s ease forwards; }
    .hero-name { font-size: clamp(52px, 7.5vw, 86px); font-weight: 700; letter-spacing: -0.045em; line-height: 1.0; background: linear-gradient(140deg, #1d1d1f 0%, #3d3d3f 35%, #5e5ce6 80%, #0071e3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 14px; opacity: 0; transform: translateY(18px); animation: fadeUp 0.7s 0.2s ease forwards; }
    .hero-handle { font-family: var(--mono); font-size: clamp(13px,1.8vw,17px); font-weight: 300; color: var(--text-tertiary); letter-spacing: 0.05em; margin-bottom: 38px; opacity: 0; transform: translateY(12px); animation: fadeUp 0.6s 0.35s ease forwards; }
    .hero-handle span { color: var(--accent-2); }
    .hero-desc { font-size: 18px; font-weight: 400; line-height: 1.72; color: var(--text-secondary); letter-spacing: -0.012em; opacity: 0; transform: translateY(12px); animation: fadeUp 0.6s 0.45s ease forwards; }
    .hero-desc strong { color: var(--text-primary); font-weight: 600; }
    .hero-cta { display: flex; gap: 12px; margin-top: 40px; opacity: 0; transform: translateY(12px); animation: fadeUp 0.6s 0.55s ease forwards; }
    .hero-scroll-hint { position: absolute; bottom: 40px; left: 44px; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0; animation: fadeUp 0.6s 1.2s ease forwards; }
    .scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, transparent, var(--text-tertiary)); animation: scrollPulse 2s 1.5s ease-in-out infinite; }
    .scroll-label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-tertiary); }
    @keyframes scrollPulse { 0%,100% { opacity:.4; } 50% { opacity:1; } }
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 22px; border-radius: 980px; font-size: 14px; font-weight: 500; letter-spacing: -0.01em; text-decoration: none; transition: all 0.22s ease; cursor: pointer; border: none; }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover { background: #0077ed; transform: scale(1.02); }
    .btn-ghost { background: rgba(0,0,0,0.05); color: var(--text-primary); }
    .btn-ghost:hover { background: rgba(0,0,0,0.09); transform: scale(1.02); }
    .sec-label { font-family: var(--mono); font-size: 10px; font-weight: 500; color: var(--accent); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 10px; }
    .sec-title { font-size: clamp(30px,4vw,42px); font-weight: 700; letter-spacing: -0.035em; line-height: 1.08; color: var(--text-primary); margin-bottom: 48px; }
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.68s cubic-bezier(0.16,1,0.3,1), transform 0.68s cubic-bezier(0.16,1,0.3,1); }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.07s; } .reveal-delay-2 { transition-delay: 0.14s; } .reveal-delay-3 { transition-delay: 0.21s; }
    .reveal-delay-4 { transition-delay: 0.28s; } .reveal-delay-5 { transition-delay: 0.35s; } .reveal-delay-6 { transition-delay: 0.42s; }
    .card { background: var(--surface); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; transition: transform 0.26s ease, box-shadow 0.26s ease, background 0.2s; }
    .card:hover { transform: translateY(-3px); box-shadow: 0 22px 64px rgba(0,0,0,0.08); background: var(--surface-hover); }
    .cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; }
    .cert-card { display: flex; align-items: flex-start; gap: 16px; position: relative; overflow: hidden; }
    .cert-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--oracle-red), #f4743b); transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease; }
    .cert-card:hover::after { transform: scaleX(1); }
    .cert-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .cert-icon.oracle { background: linear-gradient(135deg, #C74634, #f4743b); }
    .cert-info { flex: 1; }
    .cert-name { font-size: 13px; font-weight: 600; color: var(--text-primary); letter-spacing: -0.02em; margin-bottom: 2px; line-height: 1.4; }
    .cert-sub { font-size: 11px; color: var(--text-tertiary); margin-bottom: 3px; }
    .cert-issuer { font-family: var(--mono); font-size: 10px; color: var(--text-tertiary); }
    .cert-year { font-family: var(--mono); font-size: 10px; font-weight: 500; color: var(--oracle-red); background: rgba(199,70,52,0.08); padding: 2px 8px; border-radius: 20px; align-self: flex-start; white-space: nowrap; }
    .stack-groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 16px; }
    .stack-group-title { font-family: var(--mono); font-size: 10px; font-weight: 500; color: var(--text-tertiary); letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 16px; }
    .stack-pills { display: flex; flex-wrap: wrap; gap: 8px; }
    .pill { display: inline-flex; align-items: center; padding: 6px 13px; border-radius: 980px; font-family: var(--mono); font-size: 12px; background: rgba(0,0,0,0.04); color: var(--text-secondary); border: 1px solid rgba(0,0,0,0.06); transition: all 0.2s; cursor: default; }
    .pill:hover { background: rgba(0,113,227,0.08); border-color: rgba(0,113,227,0.18); color: var(--accent); }
    .pill.learning { background: rgba(94,92,230,0.06); border-color: rgba(94,92,230,0.14); color: var(--accent-2); }
    .vault-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px,1fr)); gap: 16px; }
    .vault-card { position: relative; overflow: hidden; }
    .vault-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent-2), var(--accent)); opacity: 0; transition: opacity 0.3s; }
    .vault-card:hover::before { opacity: 1; }
    .vault-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .vault-platform-badge { font-family: var(--mono); font-size: 10px; font-weight: 500; letter-spacing: 0.06em; padding: 2px 8px; border-radius: 4px; }
    .vault-platform-badge.thm { background: rgba(37,162,68,0.1); color: #25a244; }
    .vault-platform-badge.htb { background: rgba(159,239,0,0.12); color: #4a8a00; }
    .vault-diff { font-family: var(--mono); font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 4px; }
    .diff-easy { background: rgba(48,209,88,0.12); color: #25a244; }
    .diff-medium { background: rgba(255,159,10,0.12); color: #c47d00; }
    .vault-title { font-size: 16px; font-weight: 600; letter-spacing: -0.022em; color: var(--text-primary); margin-bottom: 8px; }
    .vault-desc { font-size: 13px; line-height: 1.62; color: var(--text-secondary); }
    .vault-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border); }
    .vault-tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag { font-family: var(--mono); font-size: 10px; padding: 2px 8px; border-radius: 4px; background: rgba(94,92,230,0.08); color: var(--accent-2); }
    #contact { padding-bottom: 160px; }
    .email-block { padding: 24px 28px; background: linear-gradient(135deg, rgba(0,113,227,0.06), rgba(94,92,230,0.07)); border: 1px solid rgba(0,113,227,0.12); border-radius: var(--radius); margin-bottom: 16px; }
    .email-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
    .email-addr { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: var(--text-primary); }
    .contact-links { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
    .contact-link { display: flex; align-items: center; gap: 14px; text-decoration: none; color: inherit; }
    .contact-link:hover .contact-link-name { color: var(--accent); }
    .contact-link:hover .contact-icon { border-color: rgba(0,113,227,0.2); background: rgba(0,113,227,0.05); }
    .contact-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid var(--border); background: rgba(255,255,255,0.6); transition: all 0.2s; }
    .contact-link-name { font-size: 14px; font-weight: 600; letter-spacing: -0.01em; color: var(--text-primary); transition: color 0.2s; }
    .contact-link-handle { font-family: var(--mono); font-size: 11px; color: var(--text-tertiary); margin-top: 2px; }
    .divider { width: 100%; height: 1px; background: var(--border); position: relative; z-index: 1; }
    footer { position: relative; z-index: 1; text-align: center; padding: 32px 44px; border-top: 1px solid var(--border); font-family: var(--mono); font-size: 11px; color: var(--text-tertiary); letter-spacing: 0.04em; }
    @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 3px; }
    @media (max-width: 640px) {
      nav { padding: 0 20px; } .nav-links { display: none; } .nav-menu-btn { display: flex; }
      section { padding: 80px 20px; } .hero-scroll-hint { left: 20px; }
      .contact-links { grid-template-columns: 1fr; } .mobile-link { padding: 12px 20px; }
    }
  </style>
</head>
<body>

  <nav id="navbar">
    <span class="nav-logo">dvphnc_</span>
    <ul class="nav-links">
      <li><a href="#certifications">Certs</a></li>
      <li><a href="#stacks">Stacks</a></li>
      <li><a href="#vault">Vault</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button class="nav-menu-btn" id="menuBtn" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu" id="mobileMenu">
    <a href="#certifications" class="mobile-link">Certs</a>
    <a href="#stacks" class="mobile-link">Stacks</a>
    <a href="#vault" class="mobile-link">Vault</a>
    <a href="#contact" class="mobile-link">Contact</a>
  </div>

  <section id="hero">
    <div class="hero-inner">
      <p class="hero-tag">Aspiring Tech Virtual Assistant · BS Information Technology · 3rd Year</p>
      <h1 class="hero-name">Joana<br>Daphne Sy</h1>
      <p class="hero-handle">@<span>dvphnc</span></p>
      <p class="hero-desc">Building at the crossroads of <strong>web development, cloud, and cybersecurity</strong>. Oracle-certified, CTF-curious, and learning every day — one room at a time.</p>
      <div class="hero-cta">
        <a href="#vault" class="btn btn-primary">View my vault →</a>
        <a href="#contact" class="btn btn-ghost">Get in touch</a>
      </div>
    </div>
    <div class="hero-scroll-hint">
      <span class="scroll-line"></span>
      <span class="scroll-label">scroll</span>
    </div>
  </section>

  <div class="divider"></div>

  <section id="certifications">
    <p class="sec-label reveal">Certifications</p>
    <h2 class="sec-title reveal reveal-delay-1">Oracle Cloud Certified</h2>
    <div class="cert-grid">
      <div class="card cert-card reveal reveal-delay-1">
        <div class="cert-icon oracle"><svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/></svg></div>
        <div class="cert-info">
          <p class="cert-name">OCI AI Foundations Associate</p>
          <p class="cert-sub">Oracle Cloud Infrastructure</p>
          <p class="cert-issuer">Oracle University</p>
        </div>
        <span class="cert-year">2024</span>
      </div>
      <div class="card cert-card reveal reveal-delay-2">
        <div class="cert-icon oracle"><svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg></div>
        <div class="cert-info">
          <p class="cert-name">OCI Foundations Associate</p>
          <p class="cert-sub">Oracle Cloud Infrastructure</p>
          <p class="cert-issuer">Oracle University</p>
        </div>
        <span class="cert-year">2024</span>
      </div>
      <div class="card cert-card reveal reveal-delay-3">
        <div class="cert-icon oracle"><svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg></div>
        <div class="cert-info">
          <p class="cert-name">OCI Data Foundations Associate</p>
          <p class="cert-sub">Oracle Cloud Data</p>
          <p class="cert-issuer">Oracle University</p>
        </div>
        <span class="cert-year">2024</span>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <section id="stacks">
    <p class="sec-label reveal">Tech Stacks</p>
    <h2 class="sec-title reveal reveal-delay-1">Tools &amp; Technologies</h2>
    <div class="stack-groups">
      <div class="card reveal reveal-delay-1"><p class="stack-group-title">Frontend</p><div class="stack-pills"><span class="pill">HTML5</span><span class="pill">CSS3</span><span class="pill">JavaScript</span><span class="pill">React</span><span class="pill">Tailwind CSS</span></div></div>
      <div class="card reveal reveal-delay-2"><p class="stack-group-title">Backend</p><div class="stack-pills"><span class="pill">Laravel</span><span class="pill">PHP</span><span class="pill">MySQL</span><span class="pill">REST APIs</span><span class="pill">Blade</span></div></div>
      <div class="card reveal reveal-delay-3"><p class="stack-group-title">Cloud &amp; Platform</p><div class="stack-pills"><span class="pill">Oracle Cloud</span><span class="pill">Git &amp; GitHub</span><span class="pill">Linux</span><span class="pill">VS Code</span></div></div>
      <div class="card reveal reveal-delay-4"><p class="stack-group-title">Security &amp; CTF</p><div class="stack-pills"><span class="pill">TryHackMe</span><span class="pill">HackTheBox</span><span class="pill">Burp Suite</span><span class="pill">Nmap</span><span class="pill">Gobuster</span></div></div>
      <div class="card reveal reveal-delay-5"><p class="stack-group-title">VA &amp; Productivity</p><div class="stack-pills"><span class="pill">Google Workspace</span><span class="pill">Notion</span><span class="pill">Trello</span><span class="pill">Canva</span><span class="pill">Figma</span></div></div>
      <div class="card reveal reveal-delay-6"><p class="stack-group-title">Currently Learning</p><div class="stack-pills"><span class="pill learning">Python</span><span class="pill learning">Docker</span><span class="pill learning">Next.js</span></div></div>
    </div>
  </section>

  <div class="divider"></div>

  <section id="vault">
    <p class="sec-label reveal">Vault</p>
    <h2 class="sec-title reveal reveal-delay-1">CTF Writeups</h2>
    <div class="vault-grid">
      <div class="card vault-card reveal reveal-delay-1"><div class="vault-header"><span class="vault-platform-badge thm">TryHackMe</span><span class="vault-diff diff-easy">Easy</span></div><h3 class="vault-title">Pickle Rick</h3><p class="vault-desc">Web enumeration, directory brute-forcing, and remote code execution to retrieve flags. Used Gobuster and crafted a reverse shell via the web command panel.</p><div class="vault-footer"><div class="vault-tags"><span class="tag">RCE</span><span class="tag">Gobuster</span><span class="tag">PrivEsc</span></div></div></div>
      <div class="card vault-card reveal reveal-delay-2"><div class="vault-header"><span class="vault-platform-badge thm">TryHackMe</span><span class="vault-diff diff-easy">Easy</span></div><h3 class="vault-title">Basic Pentesting</h3><p class="vault-desc">SMB enumeration, hash cracking, and SSH key exploitation. Discovered credentials via enum4linux and cracked a password hash using John the Ripper.</p><div class="vault-footer"><div class="vault-tags"><span class="tag">SMB</span><span class="tag">John</span><span class="tag">SSH</span></div></div></div>
      <div class="card vault-card reveal reveal-delay-3"><div class="vault-header"><span class="vault-platform-badge thm">TryHackMe</span><span class="vault-diff diff-medium">Medium</span></div><h3 class="vault-title">Mr Robot CTF</h3><p class="vault-desc">Three-flag challenge. WordPress exploitation, hidden wordlist in robots.txt, WPScan brute-force, and SUID binary abuse for root privilege escalation.</p><div class="vault-footer"><div class="vault-tags"><span class="tag">WordPress</span><span class="tag">SUID</span><span class="tag">WPScan</span></div></div></div>
      <div class="card vault-card reveal reveal-delay-4"><div class="vault-header"><span class="vault-platform-badge htb">HackTheBox</span><span class="vault-diff diff-easy">Easy</span></div><h3 class="vault-title">Meow</h3><p class="vault-desc">Starting Point machine. Telnet misconfiguration with unauthenticated root login — Nmap scan, service enumeration, and direct flag retrieval.</p><div class="vault-footer"><div class="vault-tags"><span class="tag">Telnet</span><span class="tag">Recon</span><span class="tag">Nmap</span></div></div></div>
      <div class="card vault-card reveal reveal-delay-5"><div class="vault-header"><span class="vault-platform-badge htb">HackTheBox</span><span class="vault-diff diff-easy">Easy</span></div><h3 class="vault-title">Fawn</h3><p class="vault-desc">Anonymous FTP login vulnerability. Enumerated FTP with Nmap scripts, connected with default anonymous credentials, and retrieved the flag.</p><div class="vault-footer"><div class="vault-tags"><span class="tag">FTP</span><span class="tag">Anonymous</span><span class="tag">Nmap</span></div></div></div>
      <div class="card vault-card reveal reveal-delay-6"><div class="vault-header"><span class="vault-platform-badge htb">HackTheBox</span><span class="vault-diff diff-easy">Easy</span></div><h3 class="vault-title">Dancing</h3><p class="vault-desc">SMB share enumeration without credentials. Used smbclient to list shares, accessed a misconfigured guest-readable share, and extracted the flag file.</p><div class="vault-footer"><div class="vault-tags"><span class="tag">SMB</span><span class="tag">smbclient</span><span class="tag">Enum</span></div></div></div>
    </div>
  </section>

  <div class="divider"></div>

  <section id="contact">
    <p class="sec-label reveal">Contact</p>
    <h2 class="sec-title reveal reveal-delay-1">Let's Connect</h2>
    <div class="reveal reveal-delay-2">
      <div class="email-block">
        <p class="email-label">Email</p>
        <p class="email-addr">joanadaphnesy@gmail.com</p>
      </div>
    </div>
    <div class="contact-links">
      <a href="https://github.com/dvphnc" target="_blank" rel="noopener" class="card contact-link reveal reveal-delay-2">
        <div class="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></div>
        <div><p class="contact-link-name">GitHub</p><p class="contact-link-handle">github.com/dvphnc</p></div>
      </a>
      <a href="https://linkedin.com/in/dvphnc" target="_blank" rel="noopener" class="card contact-link reveal reveal-delay-3">
        <div class="contact-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></div>
        <div><p class="contact-link-name">LinkedIn</p><p class="contact-link-handle">linkedin.com/in/dvphnc</p></div>
      </a>
      <a href="https://tryhackme.com/p/dvphnc" target="_blank" rel="noopener" class="card contact-link reveal reveal-delay-4">
        <div class="contact-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M10.705 0C7.54 0 4.902 2.235 4.313 5.233a4.393 4.393 0 0 0-.673-.051C1.636 5.182 0 6.818 0 8.822s1.636 3.64 3.64 3.64h7.065V0zm1.59 0v12.462h7.065c2.004 0 3.64-1.636 3.64-3.64S22.364 5.182 20.36 5.182c-.228 0-.452.018-.673.051C19.098 2.235 16.46 0 13.295 0zM3.64 13.538C1.636 13.538 0 15.174 0 17.178s1.636 3.64 3.64 3.64h7.065v-7.28zm9.655 0v7.28h7.065c2.004 0 3.64-1.636 3.64-3.64s-1.636-3.64-3.64-3.64z"/></svg></div>
        <div><p class="contact-link-name">TryHackMe</p><p class="contact-link-handle">tryhackme.com/p/dvphnc</p></div>
      </a>
      <a href="https://app.hackthebox.com/profile/dvphnc" target="_blank" rel="noopener" class="card contact-link reveal reveal-delay-5">
        <div class="contact-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M11.996 0L2 5.836V17.51L12 23.346l10-5.836V5.836zm0 1.734l8.275 4.83v2.352l-8.275 4.503-8.27-4.503V6.564zm-8.27 8.56l8.27 4.498 8.275-4.498v2.55l-8.276 4.83-8.27-4.83z"/></svg></div>
        <div><p class="contact-link-name">HackTheBox</p><p class="contact-link-handle">app.hackthebox.com/dvphnc</p></div>
      </a>
    </div>
  </section>

  <footer>
    <p>© ${year} Joana Daphne Sy · dvphnc · BSIT 3rd Year</p>
  </footer>

  <script>
    const obs = new IntersectionObserver(e => e.forEach(x => { if(x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10));
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));
  </script>
</body>
</html>`;

writeFileSync(join(outDir, 'index.html'), html);
console.log('✅ Static export generated → docs/index.html');
console.log('📁 Push the /docs folder to GitHub and enable Pages from Settings → Pages → Source: /docs');
