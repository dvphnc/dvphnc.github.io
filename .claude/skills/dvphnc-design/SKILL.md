---
name: dvphnc-design
description: The design system for this portfolio (dvphnc.github.io) — bryl-minimal's typography-first layout recoloured with Joana's navy/blue/red palette. Use it for ANY change to index.html, the SyberVault note pages in notes/, assets/css, or assets/js: adding a section, project, certification, workshop or note, restyling something, or building a new page for this site. It lists the tokens and component classes that already exist and the signature features that must never be removed.
---

# dvphnc design system

This site uses the **bryl-minimal** design language (Bryl Lim, MIT — see `LICENSE-bryl-minimal-design`) with one deliberate departure: **it is not monochrome**. The original rule "no accent color" is replaced by Joana's navy palette. Everything else — type roles, hairlines, numbered sections, halftone texture, motion — follows bryl-minimal.

Plain HTML/CSS/JS, no build step, no framework. Never add one.

**Cache-busting:** every page links CSS/JS as `assets/...?v=YYYYMMDD`. Whenever you change a file in `assets/css` or `assets/js`, bump that value on all pages (`index.html` and every `notes/*.html`) so returning visitors don't get stale styles with new markup.

## Never remove or replace

These are Joana's signature features. Keep them working after every change:

1. **Boot screen** — Tetris "dvphnc" drop on load (`#boot-screen`, `assets/js/boot.js`). It dispatches `bootDone`; the hero waits for it.
2. **Navy palette** — the tokens below. Don't collapse to black-and-white, don't introduce new hues.
3. **Skills globe** — Three.js wireframe globe with orbiting icons (`#globe-container`, `assets/js/globe.js`, three.js r128 from cdnjs).
4. **Name in different languages** — typewriter cycling 11 greetings incl. Korean/Japanese/Chinese (`langs` in `assets/js/main.js`); the sidebar "dvphnc" types/erases in sync (`navSync`).
5. **Fine-grain blue duotone headshot** — a 1-bit Floyd–Steinberg dither made at **2× the display size** (`assets/img/headshot-grain-480.png` for the 240 px desktop slot, `-272.png` for the 136 px phone slot, chosen by `<picture>`), scaled smoothly so the grain stays fine and the face reads clearly — Joana found the 1:1 chunky-dot version too textured. Coloured by SVG filters `#duo-light` / `#duo-dark` on two stacked copies cross-faded by `html.dark`. To regenerate from a new photo (ffmpeg): `scale=S:S:flags=lanczos,format=gray,curves=all='0/0 0.3/0.2 0.6/0.55 0.8/0.82 0.86/1 1/1',unsharp=5:5:0.5` → `paletteuse=dither=floyd_steinberg` against a 16×16 black/white palette → `format=monob`, for S = 480 and 272.
6. **Easter eggs** — Konami code opens the flag modal; the hidden HTML-comment flag `dvphnc{y0u_f0und_m3_g00d_r3c0n}`.

## Tokens (`assets/css/site.css`)

Colors are semantic tokens swapped wholesale by `html.dark`. Use the tokens, never raw hex, in new CSS.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#ffffff` | `#001a5e` | page background |
| `--ink` | `#003087` | `#ffffff` | body text, headings, inverted chips |
| `--g50` / `--g100` | `#f7f9fe` / `#eef3fc` | white 3.5% / 6% | faint fills (cards, code) |
| `--g200` | navy 12% | blue-white 16% | **all hairlines and borders** |
| `--g300` | navy 22% | blue-white 28% | strong borders, pills, scrollbar |
| `--g400` | navy 56% | 62% | micro-labels, meta — lightest allowed for text |
| `--g500` | navy 74% | 80% | secondary / muted text |
| `--accent` / `--accent-2` | `#0044cc` / `#4d9fff` | `#4d9fff` / `#80c0ff` | links on hover, code, focus, caret |
| `--red` | `#cc0000` | `#ff4d4d` | CWE / threat tags only |
| `--ok` | green | green | "live" pills, status dot |

Shadows: `--shadow` / `--shadow-hover` (soft, big negative spread). In dark mode they nearly vanish — borders carry the edges.

## Type — four roles

| Role | Font | Used for |
|---|---|---|
| UI / body | **Geist** (`--sans`), 15px base | paragraphs, card titles, buttons |
| Technical | **Geist Mono** (`--mono`) | micro-labels, dates, tags, nav, footer |
| Display | **Geist Pixel** (`--pixel`, jsDelivr `geist@1.9.0`) | hero name, `01 — section` labels, big stats |
| Long-form | **Source Serif 4** | note-page body, pull quotes, flashcard answers only |

- **Micro-label register** (`.micro`): 9–11px mono, UPPERCASE, +1px tracking, `--g400`. Timestamps, tags, captions.
- **Section headers**: `<h2 class="sec-num">NN — name</h2>` in pixel font, lowercase, numbered in order. Homepage: 01 projects · 02 experience · 03 stack · 04 certifications · 05 notes · 06 contact.
- **Links**: text links get `class="tl"` (underline at 25% → 100% on hover). External links end in `↗`. Nav, cards and buttons are not underlined.

## Layout

- Fixed left **sidebar** 14rem at ≥1024px; below that a sticky blurred **topbar** + full-screen **overlay** menu.
- Content column `.wrap`: 56rem max (homepage), `.read` 42rem (note pages). Padding 1rem mobile / 1.5rem desktop.
- Sections `.sec` separated by 3.5rem rhythm and hairlines, not boxes or tinted backgrounds.
- Grids: `.grid-2`, `.grid-3` (2 cols small, 3 at ≥1024). Stat rows use `.cells` — the dividers are the design.

## Components already built — reuse, don't reinvent

- `.card` (16px radius, hairline, `--g50` → `--bg` fill, soft shadow; `a.card`/`.hoverable` lift 2px)
- `.pill` (rounded mono 9.5px uppercase; `.pill.inv` = the one loud inverted chip; `.pill.live`)
- `.chip` inline bio chips (`.chip.inv` = inverted emphasis, max one per view)
- `.rows` / `.row` timeline (experience) with `.row-logo` white logo tile or `.row-icon`
- `.cert` cards with `.cert-logo` (`.wide` for wordmarks, `.pair` for two logos) and `‹ verify ›`
- `.events` / `.event` list (date · logo · name/org · pill)
- `.notes` / `.note` list linking into `notes/`
- `.btn` / `.btn.primary` (ink fill), `.theme-seg` (light / system / dark), `.toast`, `.modal`
- Issuer logos live in `assets/logos/` and always sit on a **white tile** (several are dark and vanish on navy).

## Texture — halftone

Dots via `radial-gradient(var(--dot) 1px, transparent 1.3px)` on a 9px grid (6px for photo dissolves), always masked so they fade out. **At most two per page**: the hero corner (`.hero-dots`) and photo/cover bottom dissolves. Don't add more.

## Motion

- Entrance: `.enter` + `style="--d:NNms"` — fade up 12px over 700ms on `cubic-bezier(0.16,1,0.3,1)`, staggered 50 → ~330ms. Runs after `bootDone` (homepage) or on load (notes).
- Hovers: shadow ~350ms, transform ~420ms. Status dot pulses opacity over 1.8s.
- Theme: `assets/js/theme.js` — light / dark / system, persisted in `localStorage.theme` (absent = system), circular view-transition reveal from the click point (540ms).
- Everything is disabled under `prefers-reduced-motion`; the page must be complete when still.
- **Never hide content until scroll** (no scroll-triggered reveals). The old site broke this way.

## Note pages (`notes/*.html`)

Twelve SyberVault notes share `assets/css/note.css` + `assets/js/note.js`. Structure: sidebar (← all notes, "on this page" TOC, category, theme switch) → crumb `05 — notes / category` → title → serif italic subtitle → reading time → cover (`covers/*.webp`, halftone dissolve) → `.prose` (serif 17px / 1.75) → pull quote → `quick review` (`<details>` flashcards) → `key terms` (`<dl class="terms">`) → prev/next `.pager` cards.

To add a note: copy an existing note page, replace title, subtitle, category, cover, TOC (`<a href="#id">` matching each `<h2 id>`), prose, quote, flashcards and terms; then add it to the homepage `.notes` list, update the "NN notes" counts (stat cell + section header), and fix the prev/next links of its neighbours.

## Content rules

- Lead with **Data & AI**; security, web dev and leadership support it.
- Only claim what a credential page verifies. ISC2 is **CC official training (Coursera)**, not the CC certification. Oracle certs show "valid to" dates — update them on renewal.
- Keep counts honest (certifications, training programs, notes).
- Contact email: `dvphnc@gmail.com`. TryHackMe: `tryhackme.com/p/dvphnc`.

## Quality bar

Semantic landmarks (`aside`/`header`/`main`/`nav`/`article`), alt text on photos and logos (empty `alt=""` for decorative duplicates), visible focus rings, Escape closes overlays, no horizontal scroll at 375px, check both themes before shipping. If a screen feels empty, that is usually correct — stop before it gets busy.
