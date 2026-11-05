# dvphnc — Joana Daphne Sy

Personal portfolio: Data & AI trainee at GCI World (Matsuo-Iwasawa Lab, U-Tokyo) and senior IT student at New Era University.

Live at **https://dvphnc.github.io**

## Structure

```
index.html              the homepage (static HTML, no build step)
assets/css/site.css     layout, type, light/dark palette (shared)
assets/css/note.css     long-form styles for the note pages
assets/js/theme.js      light / dark / system theme + circular reveal (shared)
assets/js/boot.js       Tetris "dvphnc" boot screen
assets/js/main.js       nav, multilingual name, easter eggs
assets/js/globe.js      Three.js skills globe
assets/js/note.js       reading time, copy buttons, table of contents
assets/img/             headshot (480px + 960px WebP)
assets/logos/           issuer logos for certifications and events
notes/                  12 SyberVault security notes (one HTML page each)
covers/                 note cover images (*.webp is what the pages use)
.claude/skills/dvphnc-design/   design-system skill so Claude keeps edits on-brand
```

## Editing

It's plain HTML/CSS/JS, so there's nothing to install or build:

- Open `index.html` directly, or serve the folder locally (e.g. Laragon at `http://localhost/dvphnc.github.io/`).
- Edit, commit, push to `main` — GitHub Pages republishes in a minute or two.

## Credits

- Layout and type system adapted from [bryl-minimal-design](https://github.com/bryllim/bryl-minimal-design) by Bryl Lim (MIT), recoloured with this site's navy palette.
- Fonts: Geist, Geist Mono and Geist Pixel by Vercel (SIL OFL).
- Issuer logos belong to their respective organizations and are used only to identify where each credential came from.
