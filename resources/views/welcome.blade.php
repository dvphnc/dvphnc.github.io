<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="Joana Daphne Sy — Aspiring Tech VA, BSIT 3rd Year, Oracle Certified, CTF enthusiast.">
  <title>dvphnc — Joana Daphne Sy</title>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>

  {{-- NAV --}}
  <nav id="navbar">
    <span class="nav-logo">dvphnc_</span>
    <ul class="nav-links">
      <li><a href="#certifications">Certs</a></li>
      <li><a href="#stacks">Stacks</a></li>
      <li><a href="#vault">Vault</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button class="nav-menu-btn" id="menuBtn" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  {{-- MOBILE MENU --}}
  <div class="mobile-menu" id="mobileMenu">
    <a href="#certifications" class="mobile-link">Certs</a>
    <a href="#stacks" class="mobile-link">Stacks</a>
    <a href="#vault" class="mobile-link">Vault</a>
    <a href="#contact" class="mobile-link">Contact</a>
  </div>

  {{-- HERO --}}
  <section id="hero">
    <div class="hero-inner">
      <p class="hero-tag">Aspiring Tech Virtual Assistant · BS Information Technology · 3rd Year</p>
      <h1 class="hero-name">Joana<br>Daphne Sy</h1>
      <p class="hero-handle">@<span>dvphnc</span></p>
      <p class="hero-desc">
        Building at the crossroads of <strong>web development, cloud, and cybersecurity</strong>.
        Oracle-certified, CTF-curious, and learning every day — one room at a time.
      </p>
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

  {{-- CERTIFICATIONS --}}
  <section id="certifications">
    <p class="sec-label reveal">Certifications</p>
    <h2 class="sec-title reveal reveal-delay-1">Oracle Cloud Certified</h2>

    <div class="cert-grid">

      <div class="card cert-card reveal reveal-delay-1">
        <div class="cert-icon oracle">
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/></svg>
        </div>
        <div class="cert-info">
          <p class="cert-name">OCI AI Foundations Associate</p>
          <p class="cert-sub">Oracle Cloud Infrastructure</p>
          <p class="cert-issuer">Oracle University</p>
        </div>
        <span class="cert-year">2024</span>
      </div>

      <div class="card cert-card reveal reveal-delay-2">
        <div class="cert-icon oracle">
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>
        </div>
        <div class="cert-info">
          <p class="cert-name">OCI Foundations Associate</p>
          <p class="cert-sub">Oracle Cloud Infrastructure</p>
          <p class="cert-issuer">Oracle University</p>
        </div>
        <span class="cert-year">2024</span>
      </div>

      <div class="card cert-card reveal reveal-delay-3">
        <div class="cert-icon oracle">
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
        </div>
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

  {{-- STACKS --}}
  <section id="stacks">
    <p class="sec-label reveal">Tech Stacks</p>
    <h2 class="sec-title reveal reveal-delay-1">Tools &amp; Technologies</h2>

    <div class="stack-groups">

      <div class="card reveal reveal-delay-1">
        <p class="stack-group-title">Frontend</p>
        <div class="stack-pills">
          <span class="pill">HTML5</span>
          <span class="pill">CSS3</span>
          <span class="pill">JavaScript</span>
          <span class="pill">React</span>
          <span class="pill">Tailwind CSS</span>
        </div>
      </div>

      <div class="card reveal reveal-delay-2">
        <p class="stack-group-title">Backend</p>
        <div class="stack-pills">
          <span class="pill">Laravel</span>
          <span class="pill">PHP</span>
          <span class="pill">MySQL</span>
          <span class="pill">REST APIs</span>
          <span class="pill">Blade</span>
        </div>
      </div>

      <div class="card reveal reveal-delay-3">
        <p class="stack-group-title">Cloud &amp; Platform</p>
        <div class="stack-pills">
          <span class="pill">Oracle Cloud</span>
          <span class="pill">Git &amp; GitHub</span>
          <span class="pill">Linux</span>
          <span class="pill">VS Code</span>
        </div>
      </div>

      <div class="card reveal reveal-delay-4">
        <p class="stack-group-title">Security &amp; CTF</p>
        <div class="stack-pills">
          <span class="pill">TryHackMe</span>
          <span class="pill">HackTheBox</span>
          <span class="pill">Burp Suite</span>
          <span class="pill">Nmap</span>
          <span class="pill">Gobuster</span>
        </div>
      </div>

      <div class="card reveal reveal-delay-5">
        <p class="stack-group-title">VA &amp; Productivity</p>
        <div class="stack-pills">
          <span class="pill">Google Workspace</span>
          <span class="pill">Notion</span>
          <span class="pill">Trello</span>
          <span class="pill">Canva</span>
          <span class="pill">Figma</span>
        </div>
      </div>

      <div class="card reveal reveal-delay-6">
        <p class="stack-group-title">Currently Learning</p>
        <div class="stack-pills">
          <span class="pill learning">Python</span>
          <span class="pill learning">Docker</span>
          <span class="pill learning">Next.js</span>
        </div>
      </div>

    </div>
  </section>

  <div class="divider"></div>

  {{-- VAULT --}}
  <section id="vault">
    <p class="sec-label reveal">Vault</p>
    <h2 class="sec-title reveal reveal-delay-1">CTF Writeups</h2>

    <div class="vault-grid">

      <div class="card vault-card reveal reveal-delay-1">
        <div class="vault-header">
          <span class="vault-platform-badge thm">TryHackMe</span>
          <span class="vault-diff diff-easy">Easy</span>
        </div>
        <h3 class="vault-title">Pickle Rick</h3>
        <p class="vault-desc">Web enumeration, directory brute-forcing, and remote code execution to retrieve flags. Used Gobuster and crafted a reverse shell via the web command panel.</p>
        <div class="vault-footer">
          <div class="vault-tags">
            <span class="tag">RCE</span>
            <span class="tag">Gobuster</span>
            <span class="tag">PrivEsc</span>
          </div>
        </div>
      </div>

      <div class="card vault-card reveal reveal-delay-2">
        <div class="vault-header">
          <span class="vault-platform-badge thm">TryHackMe</span>
          <span class="vault-diff diff-easy">Easy</span>
        </div>
        <h3 class="vault-title">Basic Pentesting</h3>
        <p class="vault-desc">SMB enumeration, hash cracking, and SSH key exploitation. Discovered credentials via enum4linux and cracked a password hash using John the Ripper.</p>
        <div class="vault-footer">
          <div class="vault-tags">
            <span class="tag">SMB</span>
            <span class="tag">John</span>
            <span class="tag">SSH</span>
          </div>
        </div>
      </div>

      <div class="card vault-card reveal reveal-delay-3">
        <div class="vault-header">
          <span class="vault-platform-badge thm">TryHackMe</span>
          <span class="vault-diff diff-medium">Medium</span>
        </div>
        <h3 class="vault-title">Mr Robot CTF</h3>
        <p class="vault-desc">Three-flag challenge. WordPress exploitation, hidden wordlist in robots.txt, WPScan brute-force, and SUID binary abuse for root privilege escalation.</p>
        <div class="vault-footer">
          <div class="vault-tags">
            <span class="tag">WordPress</span>
            <span class="tag">SUID</span>
            <span class="tag">WPScan</span>
          </div>
        </div>
      </div>

      <div class="card vault-card reveal reveal-delay-4">
        <div class="vault-header">
          <span class="vault-platform-badge htb">HackTheBox</span>
          <span class="vault-diff diff-easy">Easy</span>
        </div>
        <h3 class="vault-title">Meow</h3>
        <p class="vault-desc">Starting Point machine. Telnet misconfiguration with unauthenticated root login — Nmap scan, service enumeration, and direct flag retrieval.</p>
        <div class="vault-footer">
          <div class="vault-tags">
            <span class="tag">Telnet</span>
            <span class="tag">Recon</span>
            <span class="tag">Nmap</span>
          </div>
        </div>
      </div>

      <div class="card vault-card reveal reveal-delay-5">
        <div class="vault-header">
          <span class="vault-platform-badge htb">HackTheBox</span>
          <span class="vault-diff diff-easy">Easy</span>
        </div>
        <h3 class="vault-title">Fawn</h3>
        <p class="vault-desc">Anonymous FTP login vulnerability. Enumerated FTP with Nmap scripts, connected with default anonymous credentials, and retrieved the flag.</p>
        <div class="vault-footer">
          <div class="vault-tags">
            <span class="tag">FTP</span>
            <span class="tag">Anonymous</span>
            <span class="tag">Nmap</span>
          </div>
        </div>
      </div>

      <div class="card vault-card reveal reveal-delay-6">
        <div class="vault-header">
          <span class="vault-platform-badge htb">HackTheBox</span>
          <span class="vault-diff diff-easy">Easy</span>
        </div>
        <h3 class="vault-title">Dancing</h3>
        <p class="vault-desc">SMB share enumeration without credentials. Used smbclient to list shares, accessed a misconfigured guest-readable share, and extracted the flag file.</p>
        <div class="vault-footer">
          <div class="vault-tags">
            <span class="tag">SMB</span>
            <span class="tag">smbclient</span>
            <span class="tag">Enum</span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <div class="divider"></div>

  {{-- CONTACT --}}
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
        <div class="contact-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </div>
        <div>
          <p class="contact-link-name">GitHub</p>
          <p class="contact-link-handle">github.com/dvphnc</p>
        </div>
      </a>

      <a href="https://linkedin.com/in/dvphnc" target="_blank" rel="noopener" class="card contact-link reveal reveal-delay-3">
        <div class="contact-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        <div>
          <p class="contact-link-name">LinkedIn</p>
          <p class="contact-link-handle">linkedin.com/in/dvphnc</p>
        </div>
      </a>

      <a href="https://tryhackme.com/p/dvphnc" target="_blank" rel="noopener" class="card contact-link reveal reveal-delay-4">
        <div class="contact-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M10.705 0C7.54 0 4.902 2.235 4.313 5.233a4.393 4.393 0 0 0-.673-.051C1.636 5.182 0 6.818 0 8.822s1.636 3.64 3.64 3.64h7.065V0zm1.59 0v12.462h7.065c2.004 0 3.64-1.636 3.64-3.64S22.364 5.182 20.36 5.182c-.228 0-.452.018-.673.051C19.098 2.235 16.46 0 13.295 0zM3.64 13.538C1.636 13.538 0 15.174 0 17.178s1.636 3.64 3.64 3.64h7.065v-7.28zm9.655 0v7.28h7.065c2.004 0 3.64-1.636 3.64-3.64s-1.636-3.64-3.64-3.64z"/>
          </svg>
        </div>
        <div>
          <p class="contact-link-name">TryHackMe</p>
          <p class="contact-link-handle">tryhackme.com/p/dvphnc</p>
        </div>
      </a>

      <a href="https://app.hackthebox.com/profile/dvphnc" target="_blank" rel="noopener" class="card contact-link reveal reveal-delay-5">
        <div class="contact-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M11.996 0L2 5.836V17.51L12 23.346l10-5.836V5.836zm0 1.734l8.275 4.83v2.352l-8.275 4.503-8.27-4.503V6.564zm-8.27 8.56l8.27 4.498 8.275-4.498v2.55l-8.276 4.83-8.27-4.83z"/>
          </svg>
        </div>
        <div>
          <p class="contact-link-name">HackTheBox</p>
          <p class="contact-link-handle">app.hackthebox.com/dvphnc</p>
        </div>
      </a>

    </div>
  </section>

  <footer>
    <p>© {{ date('Y') }} Joana Daphne Sy · dvphnc · BSIT 3rd Year</p>
  </footer>

</body>
</html>
