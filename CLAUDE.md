# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server on localhost:3000
npm run dev:mobile   # Dev server on 0.0.0.0 (for testing on real device)
npm run build        # Production build
npm run lint         # ESLint
```

After build/content changes: delete `.next/` and restart the server to pick up changes to `public/` assets.

## Architecture

**Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + framer-motion.

**Routes:**
- `/` — Home (Nav + Hero carousel + Marquee + Work grid + About + Contact + Footer)
- `/proyecto/[slug]` — Project detail (static pre-rendered via `generateStaticParams`)

**Data flow — two sources merged at request time:**

1. **`lib/projects.ts`** — Static array of `Project` objects (baseline metadata + CDN image URLs)
2. **`public/projects/<slug>/`** — File-based CMS that overrides/enriches the static data:
   - `content.txt` → metadata, text blocks, stats, links (parsed by `lib/parse-content.ts`)
   - `*_hero.(png|jpg|…)` → project hero image
   - `*_thumb.(png|jpg|…)` → thumbnail
   - `NN_Section-Name/` subfolders → visual sections with titles
   - Image groups: `1.png` = single image; `1a.png + 1b.png` = fade slideshow
   - `*_hero.(mp4|webm|mov)` → project hero **video** (preferred over static image — renders as `<video autoPlay loop muted playsInline>`, no pixelation)
   - `*_phone.(mp4|jpg|png|…)` → media inside the CSS phone frame
   - `*_phone_bg.(png|jpg|…)` → background image behind the phone mockup

`lib/scan-project.ts` → `getEnrichedProjects()` merges both sources and auto-discovers new folders. Project pages use `dynamic = "force-dynamic"` so content.txt changes are visible on reload.

**GIF/WebP → MP4 conversion** (no ImageMagick; ffmpeg via npm global):
```bash
FFMPEG=/Users/anico/.npm-global/lib/node_modules/ffmpeg-static/ffmpeg
# Animated GIF or static input → MP4
$FFMPEG -i input.gif -vcodec libx264 -crf 22 -preset slow \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -pix_fmt yuv420p -an -movflags +faststart -y out.mp4
# Animated WebP (ffmpeg can't decode ANIM chunks directly — extract frames first):
python3 -c "
from PIL import Image; import os
img=Image.open('in.webp'); os.makedirs('/tmp/fr',exist_ok=True)
[img.seek(i) or img.convert('RGBA').save(f'/tmp/fr/{i:04d}.png') for i in range(img.n_frames)]
"
$FFMPEG -framerate 25 -i /tmp/fr/%04d.png -vcodec libx264 -crf 22 -preset slow \
  -pix_fmt yuv420p -an -movflags +faststart -y out.mp4
```

**Hero carousel:** `public/hero-imgs/` — files sorted alphabetically, support images (jpg/png/gif/webp/avif) and videos (mp4/webm/mov). Videos render as `<video autoPlay loop muted playsInline>`.

## Content editing

| What | Where |
|------|-------|
| Home/About/Contact copy | `lib/i18n.ts` |
| Site-wide copy (hero, about, marquee) | `public/profile.txt` |
| Project text (overview, challenge, etc.) | `public/projects/<slug>/content.txt` |
| Hero carousel | Add/remove files in `public/hero-imgs/` |
| Disable a project | Add slug to `DISABLED_PROJECT_SLUGS` in `lib/scan-project.ts` |

**content.txt metadata keys:** `name`, `subtitle`, `client`, `category`, `year`, `role`, `deliverables`, `tags`, `phonecolor` (black|white), `phoneratio` (e.g. 9/16)

**content.txt blocks:** `[overview]`, `[challenge]`, `[process]`, `[outcome]`, `[stats]` (one line = one stat box), `[links]` (Label | URL), `[button]` (Label https://...)

**Phone mockup** (`components/PhoneMockup.tsx`): renders an iPhone 8 CSS frame around a video or image. The frame uses `box-sizing: content-box` so its true size is **423×877px** (375+48 × 667+210). `ph-scaler` applies CSS `scale()` via `--ps` variable; `ph-wrap` reserves exact layout space. Background uses `aspect-[12/5]` (1920:800) so a 1920×800px bg image shows without cropping; the phone bleeds above/below via `py-32` on the wrapper. Screen stroke: `#bfbfc0` for white phones, `#3c3d3d` for black (`.iphone8.black .screen` override).

## UI conventions

- **Content width:** `max-w-6xl mx-auto` with `px-6 md:px-12`
- **Images:** always `object-cover`, never `object-contain`; use `aspect-[4/3]` or `aspect-[16/10]` ratios (no fixed px heights)
- **Mobile project images:** full-width with `w-screen relative left-1/2 -translate-x-1/2` wrapper; `md:relative md:left-0 md:translate-x-0 md:w-full`
- **Logo:** `public/anico_logo.svg` at `h-[22px] w-auto`; add `invert` on dark backgrounds
- **Theme tokens** (Tailwind v4 inline in `globals.css`): `background` #fff, `foreground`/`primary` #0a0a0a, `muted` #f5f5f5, `border` #e5e5e5
- **Locale:** hardcoded `"en"` in `context/AppContext.tsx` — the Spanish translations in `lib/i18n.ts` exist but are unused

## Deployment

Vercel project: `anico_portfolio2026` → domain `anico.design`. Push to `main` triggers auto-deploy.
