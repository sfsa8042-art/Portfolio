# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A single-page personal portfolio for **Artemiy Fomkin** (founder / student).
Stack: **React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion + GSAP**.
Dark theme only. Everything is one page with an animated loading screen and
project "profile" overlays.

## Commands

```bash
npm install      # install deps
npm run dev      # local dev server (usually http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

Node 18+ recommended.

## Where things live

```
src/
  data/content.ts        ← SINGLE SOURCE OF TRUTH for all content
  components/
    LoadingScreen.tsx    ← cinematic preloader (canvas aurora + masked name)
    Navbar.tsx           ← floating pill nav
    Hero.tsx             ← first screen, GSAP intro, gradient background
    Work.tsx             ← project grid (bento). Click a card → ProjectDetail
    ProjectDetail.tsx    ← full-screen project profile overlay (galleries, embeds)
    About.tsx            ← bio + interests + stats
    Contact.tsx          ← CTA, GSAP marquee, footer with socials
    Mockups.tsx          ← SVG product mockups (fallback when no real screenshot)
    Emphasis.tsx         ← helper: *word* → display-italic accent
  App.tsx                ← composition + loading/detail state
  index.css              ← design tokens, fonts, keyframes
public/
  shots/                 ← real screenshots & rendered materials (jpg)
  sites/                 ← standalone NFQ HTML sites (open/embed)
  docs/                  ← source PDFs (pitch deck, standard, business plan)
```

## Editing content

**Almost everything is in `src/data/content.ts`.** Do not hardcode copy in
components. Key exports:

- `profile` — name, rotating roles, tagline, email.
- `about` — bio paragraphs, interests, section copy.
- `projects` — array; **order = display order** (first card is the flagship).
  Each project has a `detail` object with `overview`, `features`, `metrics`,
  `shotGroups` (grouped galleries), `embeds` (buttons), `heroImage`, `cardImage`,
  and an optional `badge`.
- `stats` — the three numbers in the About section.
- `socials` — footer links.

### Common tasks

- **Reorder projects / change the flagship** → reorder the `projects` array.
  Card width is the `span` field (`md:col-span-7` wide, `md:col-span-5` narrow);
  the grid is 12 columns, so each row should sum to 12.
- **Add a screenshot** → drop the image in `public/shots/`, reference it as
  `/shots/name.jpg` in a `shotGroups[].shots[]` entry with a caption.
- **Add a document button** → put the PDF in `public/docs/`, add an entry to
  the project's `detail.embeds`.
- **Swap a mockup for a real screenshot** → set `cardImage` (grid) and/or
  `heroImage` (detail header) on the project.

## Conventions

- **All UI copy is in English.** Source materials (NFQ docs/slides) are Russian
  by nature; only their captions are English. Keep it that way.
- Accent gradient is `#89AACC → #4E85BF`, exposed as the `.accent-gradient`
  utility class in `index.css`. Prefer it over hardcoding the colors.
- Fonts: **Fraunces** (display, italic), **Inter** (body), **JetBrains Mono**
  (numbers/labels). Use the `font-display` / `font-mono` Tailwind classes.
- Respect `prefers-reduced-motion` — the loading screen already does.
- No browser storage (localStorage/sessionStorage) — not needed here.
- Keep components in prose-y, minimal-formatting style; match what's there.

## Deploy

Vercel auto-detects Vite. **No `vercel.json` needed** (a stray one caused a
build error before — don't re-add unless truly necessary).

- Build command: `npm run build`
- Output dir: `dist`
- **Root Directory must point at this folder** (the one with `package.json`).
  If deploying from a repo where this project sits in a subfolder, set
  Vercel's Root Directory to that subfolder.

## Gotchas

- The APEX live site may block being embedded in an `<iframe>` (X-Frame-Options).
  The detail page falls back to "open in new tab" buttons — this is expected.
- `public/sites/nfq-expert-os.html` is a CDN-dependent React SPA; it only fully
  renders online. That's fine — it's opened in a new tab, not screenshotted.
- Large PDFs live in `public/docs/` and are served as-is. They are NOT config
  files — never let tooling treat them as JSON.
