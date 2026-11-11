---
name: dvphnc-design
description: The design system for this portfolio (dvphnc.github.io) — bryl-minimal's typography-first layout recoloured with Joana's navy/blue/red palette. Use it for ANY change to index.html, the SyberVault note pages in notes/, assets/css, or assets/js: adding a section, project, certification, workshop or note, restyling something, or building a new page for this site. It lists the tokens and component classes that already exist and the signature features that must never be removed.
---

# dvphnc design system

This site uses the **bryl-minimal** design language (Bryl Lim, MIT — see `LICENSE-bryl-minimal-design`) with one deliberate departure: **it is not monochrome**. The original rule "no accent color" is replaced by Joana's navy palette. Everything else — type roles, hairlines, numbered sections, halftone texture, motion — follows bryl-minimal.

Plain HTML/CSS/JS, no build step, no framework. Never add one.

**Cache-busting:** every page links CSS/JS as `assets/...?v=YYYYMMDD`. Whenever you change a file in `assets/css` or `assets/js`, bump that value on all pages (`index.html`, every `notes/*.html` and every `events/*.html`) so returning visitors don't get stale styles with new markup.

## Never remove or replace

These are Joana's signature features. Keep them working after every change:

1. **Boot screen** — Tetris "dvphnc" drop on load (`#boot-screen`, `assets/js/boot.js`). It dispatches `bootDone`; the hero waits for it.
2. **Navy palette** — the tokens below. Don't collapse to black-and-white, don't introduce new hues.
3. **Skills globe** — Three.js wireframe globe with orbiting icons (`#globe-container`, `assets/js/globe.js`, three.js r128 from cdnjs). **The globe and the `.stack-list` rows must match the Tech Stack in Joana's GitHub profile README** (`github.com/dvphnc/dvphnc`, the `go-skill-icons` line): currently Python, Laravel, PHP, MySQL, SQLite, HTML, CSS, JavaScript, TypeScript, Vue, React, Next.js, Node.js, Canva, Git, GitHub, VS Code, Oracle, Docker, Vercel, Supabase. Re-check the README before changing either. Icons are official Simple Icons paths (VS Code, Canva and Oracle from v9.21.0, since later releases removed them); never hand-draw a logo. Python (added 12 Nov 2026, first in both) leads the `backend & data` row. The only extra is the labelled `learning` row (NumPy, Pandas, Matplotlib from the GCI World program), which supports the Data & AI headline.
4. **Name in different languages** — typewriter cycling 11 greetings incl. Korean/Japanese/Chinese (`langs` in `assets/js/main.js`); the sidebar "dvphnc" types/erases in sync (`navSync`).
5. **Fine-grain blue duotone headshot** — a 1-bit Floyd–Steinberg dither made at **2× the display size** (`assets/img/headshot-cutout-480.png` for the 240 px desktop slot, `-576.png` for the 288 px centred phone slot, chosen by `<picture>`), scaled smoothly so the grain stays fine and the face reads clearly — Joana found the 1:1 chunky-dot version too textured. Coloured by SVG filters `#duo-light` / `#duo-dark` on two stacked copies cross-faded by `html.dark`. **One cut-out image serves both themes** (`headshot-cutout-480/272.png`, gray + alpha): `knockout.mjs` (this folder) takes the light-mode dither and makes the studio backdrop **transparent** (backdrop found on the source photo by flood fill from the top/left/right edges, threshold 200, grown 1px); every subject pixel is copied unchanged, so both themes show identical dots and the crossfade only changes colour. The page itself is the background in both themes — no frame, fill or shadow on `.portrait`, only a bottom fade where the blazer is cut. Light maps navy on pale blue (`#duo-light`), dark maps black → page navy `#001a5e`, white → `#eaf2ff` (`#duo-dark`). **Never re-dither per theme** (dots jump on toggle) and **never invert the dither for dark mode** (film-negative: white hair, dark eyes). To regenerate from a new photo (ffmpeg): `scale=S:S:flags=lanczos,format=gray,curves=all='0/0 0.3/0.2 0.6/0.55 0.8/0.82 0.86/1 1/1',unsharp=5:5:0.5` → `paletteuse=dither=floyd_steinberg` against a 16×16 black/white palette → `format=monob`, for S = 480 and 576. Then make the cut-out: export that dither PNG and the source photo (`scale=S:S,format=gray`) as raw gray (`-f rawvideo -pix_fmt gray`), run `node knockout.mjs dither.gray source.gray cut.ya8 S 200`, and encode with `ffmpeg -f rawvideo -pix_fmt ya8 -s SxS -i cut.ya8 -pix_fmt ya8 headshot-cutout-S.png` — no re-dithering. Headshot `<img>` URLs carry `?v=` too; bump it whenever the images change.
6. **No easter eggs**: the Konami code, its flag pop-up and the hidden CTF-flag comment were all **removed at Joana's request** (they belonged to the old security positioning); don't add them back.

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
| Display | **Geist Pixel** (`--pixel`, jsDelivr `geist@1.9.0`) | hero name, `01 · section` labels, big stats, listing-page titles (`.page-title`) |
| Long-form | **Source Serif 4** | note-page body, pull quotes, flashcard answers only |

- **Micro-label register** (`.micro`): 9–11px mono, UPPERCASE, +1px tracking, `--g400`. Timestamps, tags, captions.
- **Section headers**: `<h2 class="sec-num">NN · name</h2>` in pixel font, lowercase, numbered in order (a middle dot, not an em dash). Homepage: 01 events & conferences · 02 experience · 03 projects · 04 stack · 05 certifications & training · 06 contact. Keep the sidebar and overlay nav lists in sync with these ids (`#events #experience #projects #stack #certifications #contact`).
- **No em dashes anywhere in site copy** (Joana's rule). Use a middle dot `·` for separators, a colon, a comma, or parentheses. (Older SyberVault note prose still contains some; fix them if you touch those pages.)
- **Say each fact once** (framing after bryllim.com). Experience rows are just year · role · organisation, no descriptions. Project cards are pills (status/role) · title · **one sentence** · links, no dates or stack lines. Events are date · logo · name · venue/org · role pill, with LinkedIn reflections as a "read reflection ↗" link on their event (there is no separate writing section). Team projects live in projects, not experience; programs (GCI World) live in experience, not training.
- **Links**: text links get `class="tl"` (underline at 25% → 100% on hover). External links end in `<span class="arr">↗</span>` (never a bare `↗`), so the arrow nudges 2px up-and-right on hover (`a .arr` in `site.css`). Nav, cards and buttons are not underlined.
- **Page titles**: listing/index pages (e.g. `notes/index.html`) title themselves with **one lowercase word in the pixel font** (`<h1 class="page-title">archive</h1>`, ~3rem, line-height 1). Article pages (notes, event stories) keep the sans `.read-title`, weight 600.

## Layout

- Fixed left **sidebar** 14rem at ≥1024px; below that a sticky blurred **topbar** + full-screen **overlay** menu.
- Content column `.wrap`: 56rem max (homepage), `.read` 42rem (note pages). Padding 1rem mobile / 1.5rem desktop.
- Sections `.sec` separated by 3.5rem rhythm and hairlines, not boxes or tinted backgrounds.
- Grids: `.grid-2`, `.grid-3` (2 cols small, 3 at ≥1024). Stat rows use `.cells` — the dividers are the design.
- **Phones (after bryllim.com's mobile layout):** the portrait leads, 288 px and centred; the three highlight cells stack as full-width rows while the three stat cells stay in one row of three; the top bar shows only the brand and menu button — the light/system/dark switch lives in the overlay menu's footer (`.overlay-foot`); the notes list collapses to one line per note (tag · truncated title · ↗, descriptions hidden). Note pages keep the switch in their top bar since they have no menu.

## Components already built — reuse, don't reinvent

- `.card` (16px radius, hairline, `--g50` → `--bg` fill, soft shadow; `a.card`/`.hoverable` lift 2px)
- `.pill` (rounded mono 9.5px uppercase; `.pill.inv` = the one loud inverted chip; `.pill.live`)
- Hero bio is **plain prose with `<strong>` highlights** (ink, weight 600), two short paragraphs. Joana preferred this to the inline `.chip` pills, so don't put chips back in the bio (the `.chip` class still exists but is unused).
- `.rows` / `.row` timeline (experience) with `.row-logo` (ink-drawn logo, no tile) or `.row-icon`
- `.cert` cards with `.cert-logo` (`.wide` for wordmarks, `.pair` for two logos) and `‹ verify ›`
- `.events` / `.event` list (date · logo · name/org · pill)
- `.notes` / `.note` list linking into `notes/`
- `.btn` / `.btn.primary` (ink fill), `.theme-seg` (light / system / dark), `.toast`, `.modal`
- Issuer logos live in `assets/logos/` and are drawn **in the theme ink — no tiles, no colour** (after bryllim.com). Give marks `class="logo"` (SVG filter `#ink`: a solid ink silhouette) and seals/crests `class="logo logo-seal"` (`#ink-line`: dark parts → ink, light parts → clear, so CHED / DICT / NEU keep their detail instead of becoming discs). Both filters live in the hidden `<svg>` right after `<body>` in `index.html` and are coloured by `.ink-flood { flood-color: var(--ink) }`. Inline SVG marks use `fill="currentColor"`. Never reintroduce white tiles.

## Recipes: the exact numbers (from bryl-minimal)

- **Radii ladder 16 / 12 / 8 / 6:** large cards, covers, viewer image 16px; medium cards, gallery thumbs, code blocks, tables 12px; buttons, theme switch, toast 8px; small buttons and inputs 6px; pills and chips fully rounded. Don't invent in-between values.
- **Shadows** are low-alpha with a big negative spread (ground contact, not elevation). Light: rest `0 8px 22px -14px` navy 28%, hover `0 18px 36px -20px` navy 42% with a 2px lift. Dark: nearly gone (`--shadow` / `--shadow-hover`), borders carry the edges. Modals/viewer: `0 40px 90px -20px` black 35%.
- **Modal / photo viewer** (`#lightbox`, `gallery.js`): overlay is ink at 30% (black 45% in dark mode, so photos aren't washed out) with a 16px backdrop blur; it fades in over 200ms while the image scales 95% → 100%, on `--ease`. Open = remove `hidden`, force a reflow, add `.open`; close = remove `.open`, set `hidden` after 200ms (0 under reduced motion). Escape closes, arrows/swipe move, focus stays inside and returns to the thumbnail.
- **Pills:** hairline `--g300` border, 9.5px uppercase mono, `--g500`, ~2px × 8px padding.
- **Scrollbars:** 6px, transparent track, `--g300` rounded thumb. **Selection** inverts (ink background, bg text).
- **Durations:** micro-interactions 200ms; card shadow 350ms / transform 420ms; entrance 700ms; theme crossfade 500ms; all on `cubic-bezier(0.16, 1, 0.3, 1)`.

## Texture — halftone

Dots via `radial-gradient(var(--dot) 1px, transparent 1.3px)` on a 13px grid for strips/fields (9px for clusters, 6px for photo dissolves), always masked so they fade out, at ~.5 opacity. Joana asked for the dots **throughout the page**, as bryllim.com does: the hero has two fields (`.hero-dots` top-right, `.hero-dots-bl` bottom-left); **every `.sec` opens with a dotted divider strip** (`.sec::before`); every other section has a round cluster blooming off the right end of that strip (`.sec:nth-of-type(odd)::after`, kept clear of headings and links); and `footer.foot::before` is a dotted band. Keep dots behind content, never over text.

## Motion

- Entrance: `.enter` + `style="--d:NNms"` — fade up 12px over 700ms on `cubic-bezier(0.16,1,0.3,1)`, staggered 50 → ~330ms. Runs after `bootDone` (homepage) or on load (notes).
- Hovers: shadow ~350ms, transform ~420ms. Status dot pulses opacity over 1.8s.
- Theme: `assets/js/theme.js` — light / dark / system, persisted in `localStorage.theme` (absent = system), circular view-transition reveal from the click point (540ms).
- Everything is disabled under `prefers-reduced-motion`; the page must be complete when still.
- **Never hide content until scroll** (no scroll-triggered reveals). The old site broke this way.

## Note pages (`notes/*.html`) — an archive, not a homepage section

Security is no longer part of the positioning, so the twelve SyberVault notes live at `notes/index.html` (the **notes archive**), linked once from the homepage footer ("security notes archive ↗"). Don't add them back to the homepage. Each note links to the archive (`index.html`), not to `../index.html#notes`. Notes share `assets/css/note.css` + `assets/js/note.js`. Structure: sidebar (← notes archive, "on this page" TOC, category, theme switch) → crumb `notes archive / category` → title → serif italic subtitle → reading time → cover (`covers/*.webp`, halftone dissolve) → `.prose` (serif 17px / 1.75) → pull quote → `quick review` (`<details>` flashcards) → `key terms` (`<dl class="terms">`) → prev/next `.pager` cards.

To add a note: copy an existing note page, replace title, subtitle, category, cover, TOC (`<a href="#id">` matching each `<h2 id>`), prose, quote, flashcards and terms; then add it to the archive list in `notes/index.html` (and its "12 notes" meta line), and fix the prev/next links of its neighbours.

## Content rules

- Lead with **data & AI** (Joana's choice, 12 Nov 2026, replacing the earlier "AI automation & youth leadership" framing): data & AI trainee at U-Tokyo GCI World, senior IT student, Python for data, Laravel and the cloud for building. Page title is "Joana Daphne Sy · Data & AI"; the sidebar status says "open to data & ai internships"; the GCI World cell comes first among the hero highlights. AI events, the AI Vision Challenge and student leadership (Youth Forum Organization) support it; the automation card sits last in projects; security is archive-only (the bio's "security notebook on the side").
- Only describe automation work that's on her LinkedIn (Youth Forum: automated registration, attendee tracking, AI-assisted agendas/minutes). Never invent tools or numbers — the "Event operations automation" card is a placeholder until she confirms the tools and time saved.
- Story pages link her exact LinkedIn posts (tracking query strings like `utm_*` and `rcm` stripped). Any other "read reflection ↗" link points at her activity page until she shares that post's URL.
- Keep the events count in the stat cell equal to featured cards + list rows in `01 · events & conferences`.
- Only claim what a credential page verifies. ISC2 is **CC official training (Coursera)**, not the CC certification. Oracle certs show "valid to" dates; update them on renewal.
- Keep counts honest (certifications, training programs, notes).
- Contact email: `dvphnc@gmail.com`. TryHackMe: `tryhackme.com/p/dvphnc`.

## Event stories (`events/*.html`), after bryllim.com's events

Her biggest events get a **featured photo card** at the top of `01 · events` (`.event-feature.grid-2` → `a.card.event-card`: `.event-cover` 16:10 photo, then date · venue micro-label, title, role pill, "read the story →") linking to a story page; the rest stay one-line `.event` rows. Don't list an event twice.

A story page reuses the note template (`note.css`, `note.js`) plus `gallery.js`: sidebar (← all events, on-this-page TOC, event date/venue, role) → crumb `events / slug` → title → serif subtitle → read time → `.story-cover` (3:2, full colour, **no duotone or dither on event photos**) → `.prose` her own LinkedIn reflection (em dashes and hashtags removed, short h2 chapters, the speaker quote as `.read-quote` with `<cite>`) → `#sec-photos` `.gallery` (2 cols phone, 3 desktop) → photo credit + event feature link → `.pager` between stories → `#lightbox` viewer (tap to enlarge, arrows/swipe, Escape, focus trapped).

**Photos:** `assets/img/events/<slug>/cover.webp` (long edge 1600) + `cover-800.webp` (homepage card), and per gallery photo `NN.webp` (long edge 1600, viewer) + `NN-thumb.webp` (short side 600, grid). ffmpeg `-c:v libwebp -quality 80 -compression_level 6 -map_metadata -1` (strips EXIF/GPS); keep each under ~300 KB. If a square crop cuts the subject, set `style="object-position:X% 50%"` on that thumb. Credit whoever took them ("photos by ai vision forum and me"). Empty slots show the dotted `.story-cover-empty` / `.shot-empty` placeholders; swap each for `<img>` (cover) or `<button class="shot" data-full="…"><img loading="lazy" alt="…"/></button>` (gallery) as the HTML comments in each page explain. Always credit the official photographer. Official photos that carry a caption banner along the bottom keep it in the full-size viewer image but have it cropped off the cover and thumbnails. When you replace an image under the same filename, add or bump `?v=N` on its URL so cached copies refresh.

## Quality bar

Semantic landmarks (`aside`/`header`/`main`/`nav`/`article`), alt text on photos and logos (empty `alt=""` for decorative duplicates), visible focus rings, Escape closes overlays, no horizontal scroll at 375px, check both themes before shipping. If a screen feels empty, that is usually correct — stop before it gets busy.

## Testing the skill (after bryl-minimal's `evals/`)

`evals/evals.json` in this folder holds test requests (add an event story, add a certification, add a project, restyle a section) with what a correct result must and must not contain. After changing this skill, or before trusting a big edit, run one of those requests and compare the result against its checklist; if the site drifts (an em dash slips in, a logo tile comes back, the globe stops matching the README, a count goes stale), tighten the rule here rather than fixing only the page.
