# dvphnc · Joana Daphne Sy

Personal portfolio: AI & data science trainee at GCI World (Matsuo-Iwasawa Lab, U-Tokyo) and senior IT student at New Era University.

Live at **https://dvphnc.github.io**

## Structure

```
index.html              the homepage (static HTML, no build step)
experience.html         full experience history (homepage "full history →")
events.html             every event by year, with stories and certificates (homepage "all events →")
events/                 event story pages with photo galleries
notes/                  SyberVault security notes archive (notes/index.html + 12 notes)
assets/css/site.css     layout, type, light/dark palette (shared)
assets/css/note.css     long-form styles for notes and event stories
assets/js/theme.js      light / dark / system theme + circular reveal (shared)
assets/js/boot.js       Tetris "dvphnc" boot screen
assets/js/main.js       nav, multilingual name typewriter
assets/js/globe.js      Three.js skills globe
assets/js/note.js       reading time, copy buttons, table of contents
assets/js/gallery.js    event photo viewer
assets/img/             duotone headshot cut-outs and event photos
assets/logos/           issuer and organiser logos
covers/                 note cover images
.claude/skills/dvphnc-design/   design-system skill (with test requests in evals/) so Claude keeps edits on-brand
```

## Editing

It's plain HTML/CSS/JS, so there's nothing to install or build:

- Open `index.html` directly, or serve the folder locally (e.g. `python -m http.server`).
- After changing anything in `assets/css` or `assets/js`, bump the `?v=` value on every page so returning visitors get the new files.
- Edit, commit, push to `main`; GitHub Pages republishes in a minute or two.

## Credits

- Layout and type system adapted from [bryl-minimal-design](https://github.com/bryllim/bryl-minimal-design) by Bryl Lim (MIT), recoloured with this site's navy palette.
- Fonts: Geist, Geist Mono and Geist Pixel by Vercel (SIL OFL); Source Serif 4 (SIL OFL).
- Issuer and organiser logos belong to their respective organizations and are used only to identify where each credential or event came from.
- Event photos: AI Vision Forum, Mr. Kio Antonio Magno (University of the Philippines, Diliman) and Joana.
