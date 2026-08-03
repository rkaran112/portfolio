# R.Karan, portfolio

Single-page portfolio built with Next.js 16, React 19, Tailwind v4, motion and
lucide-react. Each project is written up the same way: the problem that made it
worth building, the approach taken, and what came out of it. The demos in the app
window run for real rather than being screenshots.

## Run it

```bash
npm install && npm run dev
```

## Deploy to Vercel

The project is a standard Next.js app, so Vercel needs no configuration beyond
pointing at the repo.

1. Push this folder to a GitHub repo. **The git repo root is `portfolio/`**, not
   the parent `projects/` folder. If you push the parent instead, set Vercel's
   **Root Directory** to `portfolio`.

   ```bash
   git add -A && git commit -m "Portfolio" && git push -u origin main
   ```

2. On [vercel.com/new](https://vercel.com/new), import the repo. Framework
   preset, build command and output directory are all detected automatically.

3. Add one environment variable so share cards resolve to absolute URLs:

   | Key | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | your deployed origin, for example `https://rkaran.vercel.app` |

   Without it the site still works; Open Graph tags just fall back to that
   default origin.

4. Deploy. Every route prerenders as static content, so there is nothing to
   configure for caching or regions.

Or straight from this directory:

```bash
npx vercel --prod
```

### Verified before shipping

`npm run build` succeeds and `npx next start` serves `/` at 200 and
`/opengraph-image` as a 1200x630 PNG. Typecheck and lint are clean.

## Values to check

Real content lives in [`src/lib/content.ts`](src/lib/content.ts).

| Value | Current | Note |
| --- | --- | --- |
| `EMAIL` | `karan237j@gmail.com` | Footer and both contact buttons. |
| `LINKEDIN_URL` | `linkedin.com/in/rkaran112` | Derived from the GitHub handle. **Not verified**, confirm it resolves. |
| `gig-scanner` | links to the repo | Swap in the live demo URL when there is one. |

Every GitHub link was checked and returns 200. Two display names differ from
their repo slugs on purpose: the page says **gaana-api** while linking
`gaana_api`, because that is the repo that exists.

`lattice`, `relay` and `resume-tailor` render a dashed **repo pending** pill
rather than a dead link. Change a project's `repo` field to
`{ kind: "public", url: "..." }` to flip it live.

## Structure

```
src/
  app/            layout (fonts, metadata), page (section order),
                  globals.css (tokens), opengraph-image.tsx (share card)
  components/
    sections/     page-level sections, add new ones here
    aura/         Backdrop (video, scrim, guide lines) and shared primitives
    instruments/  the live demos
    ui/           shadcn and registry components
  hooks/          useInView, useReducedMotion
  lib/content.ts  all copy, projects, experience, education
```

Section order in `src/app/page.tsx`:

Navbar, Hero, ProjectWindow, SelectedWork, BuiltWith, Background, AlsoBuilt,
FinalCTA, footer.

To add a section, drop a component in `components/sections/` and add it to
`page.tsx`. Sections own their own vertical padding, so nothing collides.

Components pasted from a registry land on-palette automatically: the shadcn
tokens (`--background`, `--card`, `--primary`, `--ring`) in `globals.css` are
mapped to this site's palette.

## Design

Dark cinematic treatment on `#0c0c0c`, with a fixed looping background video, a
shiny gradient headline, an app window carrying the live demos, and
`liquid-glass` panels throughout. **Inter** for everything, **Martian Mono** for
numerals only, because animated counters need tabular figures or they jitter.

Each project owns an accent colour that drives its picker dot, its chart and its
section wash: lattice `#00d2ff`, cacheopt `#4ade80`, relay `#f5b544`,
resume-tailor `#a4f4fd`.

### Notable decisions

- **No fabricated proof.** The source spec's testimonials, "Trusted by" logo
  cloud and pricing tiers assert things that are not true of one person. They
  became a "Built with" stack row and the projects themselves in the cinematic
  treatment.
- **A scrim sits over the video** (`bg-[#0c0c0c]/78` plus a vignette). The raw
  footage has bright passages that white body copy cannot survive.
- **`overflow-x-clip`, not `-hidden`,** on the root. `hidden` makes that element
  a scroll container, which breaks smooth scrolling and `scroll-margin`.
- **Buttons get `cursor: pointer` back.** Tailwind v4's Preflight sets them to
  `default`, which makes interactive controls read as static text.
- **The background video is hotlinked** from a CloudFront bucket this project
  does not own. If it disappears, the `#0c0c0c` canvas underneath is the
  fallback. Self-host it in `public/` to remove that dependency.
- **No brand glyphs**, because lucide v1 dropped them.

## Motion

`useReducedMotion` defaults to `true`, so the server renders the resolved state
and motion is opt-in after hydration. Under `prefers-reduced-motion: reduce`
counters print their final values, bars render at full width, the fence timeline
shows every step, and the row strip holds still. The strip also idles static
below 640px.

Nothing on the page reads or writes localStorage or sessionStorage.

## Unused

`src/components/ui/aurora-background.tsx` is installed but not mounted. Delete it
or use it elsewhere.
