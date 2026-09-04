# Portfolio — Irenikase Samuel Temitope

The built site, from the design canvas in [`../portfolio-design`](../portfolio-design).
Next.js (App Router) + TypeScript + Tailwind, with Framer Motion for the reveals
and GSAP for the drifting strip and the ambient background.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

Deploys to Vercel with no configuration — the one dynamic route is
`/api/geo`, which runs on the edge.

## Where the content lives

Everything the page says is in **`lib/content.ts`** — copy, projects, metrics,
links. Nothing is hardcoded in a component, so changing what the site claims
never means editing layout.

The rule that file follows: **every figure traces to a report committed in the
repository it belongs to.** Nothing is estimated or rounded up. If a number
cannot be pointed at in a repo, it does not appear on the site.

## Structure

| Section | File | Note |
|---|---|---|
| Hero | `components/hero.tsx` | Portrait is a placeholder silhouette |
| Evidence strip | `components/evidence-strip.tsx` | Two rows drifting on scroll |
| Work | `components/work.tsx` | Four case studies, problem → built → changed |
| Approach | `components/approach.tsx` | The inverted full-bleed section |
| About | `components/about.tsx` | |
| Contact | `components/contact.tsx` | Email, WhatsApp, socials, currency picker |

## Themes

Light is the base declaration in `app/globals.css` and dark is the override, so
no colour is ever defined only inside a media query. Two things are not simple
inversions:

- **The heading gradient.** The dark ramp (`#646973 → #BBCCD7`) disappears
  against white, so light has its own dark-to-mid ramp.
- **The section rhythm.** The Approach section is the bright break in dark
  mode and the dark one in light mode. It reads its colours from separate
  `--break-*` tokens for exactly that reason.

An inline script in `app/layout.tsx` applies the stored or preferred theme
before first paint, so the page never renders in the wrong theme and snaps.

## Motion

- **Framer Motion** — the one `Reveal` used everywhere, and the hero entrance.
- **GSAP** — the ambient phasing background and the evidence strip's drift.
  The strip is driven by a passive scroll listener feeding `gsap.quickTo`
  rather than a second scroll-animation engine, so it cannot fight Framer
  Motion elsewhere on the page.
- **`prefers-reduced-motion`** stops all of it: the background, the drift and
  the reveals, not just some.
- A `<noscript>` rule forces everything visible if JS never runs. The reveals
  start at `opacity: 0`, and without that failsafe a JS failure would leave a
  blank page rather than an unanimated one.

## Currency

Only figures genuinely denominated in a currency are converted — currently the
one catalogue price. `/api/geo` reads the country from the host's edge headers
(no third-party service, nothing stored) to pick a sensible default, and the
picker in the footer overrides it, because IP guesses wrong constantly.

The fraud project's costs are **deliberately not converted**: those amounts are
the dataset's own anonymised units, and the card says so. If the rate fetch or
the country lookup fails, everything falls back to naira and the picker hides
itself — a broken exchange rate must never become a wrong number on the page.

## Verified

Built and driven in Chromium before shipping: no horizontal overflow at 320,
390 or 1440 in either theme, reveals confirmed firing on real scroll, and the
44px tap-target floor held on every control.

## Still open

- The 3D portrait render, once a reference photo exists.
- The FastAPI live-demo widget, deferred to a later phase.
