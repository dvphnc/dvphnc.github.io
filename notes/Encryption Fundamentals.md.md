<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Encryption Fundamentals • dvphnc SyberVault</title>
  <meta name="description" content="The beautiful truth about how the internet stays private">
  <style>
    :root {
      --bg: #000;
      --text: #f5f5f7;
      --muted: #aaaaaa;
      --grad: linear-gradient(120deg, #ffd700, #ffb84d, #ff6b6b, #ffd700);
      /* Gold → Warm Gold → Rose Gold → Gold */
    }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
      line-height: 1.78;
      font-size: 1.18rem;
    }
    .container { max-width: 860px; margin: 0 auto; padding: 2rem 1.5rem; }
    
    .back {
      position: fixed;
      top: 2.5rem;
      left: 2.5rem;
      color: #ff9d00;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      z-index: 100;
      opacity: 0.92;
      transition: opacity .3s;
    }
    .back:hover { opacity: 1; }

    header {
      text-align: center;
      padding: 7rem 0 4rem;
    }
    h1 {
      font-size: 5.9rem;
      font-weight: 800;
      background: var(--grad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.1;
      margin: 0 0 1.6rem 0;
    }
    .subtitle {
      font-size: 1.65rem;
      color: var(--muted);
      font-weight: 400;
    }

    .cover {
      width: 100%;
      max-width: 740px;
      margin: 5.5rem auto;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0 40px 110px rgba(0,0,0,0.9);
    }
    .cover img { width: 100%; display: block; }

    article { margin: 4rem 0; }
    h2 {
      font-size: 3.3rem;
      margin: 6rem 0 2rem;
      background: var(--grad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p { margin: 1.7rem 0; color: #e0e0e0; }
    ul { padding-left: 2rem; margin: 2rem 0; }
    li { margin: 1rem 0; font-size: 1.25rem; }

    blockquote {
      font-size: 2.1rem;
      font-style: italic;
      text-align: center;
      color: #ff9d00;
      padding: 5rem 2rem;
      margin: 7rem 0;
      line-height: 1.6;
    }

    .cta {
      text-align: center;
      margin: 9rem 0 7rem;
    }
    .cta a {
      background: var(--grad);
      color: #000;
      padding: 1.7rem 4.5rem;
      border-radius: 70px;
      font-size: 1.55rem;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 25px 60px rgba(255,215,0,0.3);
      display: inline-block;
      transition: transform .3s;
    }
    .cta a:hover { transform: scale(1.06); }
  </style>
</head>
<body>

  <a href="../index.html" class="back">Vault</a>

  <div class="container">

    <header>
      <h1>Encryption<br>Fundamentals</h1>
      <p class="subtitle">How the internet learned to keep a secret</p>
    </header>

    <picture class="cover">
      <img src="../covers/crypto.jpg" alt="Encryption Fundamentals">
    </picture>

    <article>
      <p><strong>Encryption</strong> converts readable information into <em>ciphertext</em>, which can only be turned back into plain text with the correct <em>key</em>. This single idea protects your messages, your money, and your identity every second you’re online.</p>

      <h2>Principles of Cryptography</h2>
      <p>Four pillars hold up the entire field:</p>
      <ul>
        <li><strong>Confidentiality</strong> — only the intended recipient can read it</li>
        <li><strong>Integrity</strong> — nobody changed it along the way</li>
        <li><strong>Authentication</strong> — you really are who you say you are</li>
        <li><strong>Non-repudiation</strong> — you can’t deny you sent it</li>
      </ul>

      <h2>Core Components</h2>
      <p>Everything in cryptography boils down to three building blocks:</p>
      <ul>
        <li><strong>Hash functions</strong> — one-way streets that turn data into unique fingerprints</li>
        <li><strong>Ciphers</strong> — reversible algorithms that scramble and unscramble with keys</li>
        <li><strong>Key exchange algorithms</strong> — the magic that lets two strangers agree on a secret over public airwaves</li>
      </ul>

      <h2>Cryptography in Internet Security</h2>
      <p>Every green padlock, every banking login, every Signal message — they all lean on the same mathematical foundations that have been battle-tested for decades.</p>

      <h2>End-to-End vs Transport Encryption</h2>
      <p>
        <strong>Transport encryption (TLS/HTTPS)</strong> protects data while it’s moving.<br>
        <strong>End-to-end encryption</strong> protects data even when it’s sitting on someone else’s server.
      </p>
      <p>Only the second one guarantees true privacy.</p>

      <h2>Certificate Authorities & Digital Trust</h2>
      <p>Certificate Authorities (CAs), Trusted Root CAs, and X.509 certificates form the invisible web of trust that lets your browser know “yes, this really is google.com and not a fake”.</p>

      <blockquote>
        Encryption not only hides information —<br>
        it builds the digital trust the modern world runs on.
      </blockquote>

      <div class="cta">
        <a href="https://en.wikipedia.org/wiki/Public-key_cryptography" target="_blank">
          Dive Deeper into Public-Key Cryptography
        </a>
      </div>
    </article>

  </div>
</body>
</html>
