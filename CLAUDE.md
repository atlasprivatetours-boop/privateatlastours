# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See also `AGENTS.md`: this Next.js version (16.4, React 19, Tailwind v4) has breaking changes, so read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code.

## What this is

Marketing site for Atlas Private Tours (atlasprivatetours.com), a private Morocco tour operator. It is a migration of a legacy WordPress site into a Next.js App Router site with static JSON content. Palette comes from the logo: green `#132e17`, terracotta `#a64311`, gold `#c08030`.

## Commands

- `npm run dev`: dev server. Ports 3000 and 3100 are used by other apps on this machine.
- `npm run build` then `npm run start -- -p 3333`: production check on port 3333. Kill the old server first, or it serves stale chunks.
- `npm run lint`: ESLint. There is no test suite.
- `node scripts/check-redirects.mjs`: against a running server, checks the legacy URLs redirect in one hop (0 problems expected).
- `node scripts/check-seo.mjs [base]`: against a running server (default `http://localhost:3333`), crawls the sitemap and checks title, h1, description, canonical, JSON-LD and uniqueness.

## Architecture

**Content is static JSON, not a CMS.** `src/content/*.json` holds tours, day trips, posts, testimonials, gallery and the image map. `src/lib/content.ts` is the single access layer: it merges `tours.json` with `tours-added.json`, applies hand-written SEO titles and descriptions from `src/lib/seo.ts` (these override the imported ones), and exports typed `tours`, `dayTrips`, `posts` and getters. Other `src/lib` modules cover site constants (`site.ts`, contact details and brand facts), JSON-LD (`schema.ts`), destinations, filters, and OG image rendering (`og.tsx`).

**Content pipeline in `scripts/`** (plain `.mjs`, run from the repo root). `ingest.mjs` and `images.mjs` were one-off scrapes of the live WordPress site into `*.raw.json`. `build-content.mjs` cleans the raw files into the final JSON (text fixes and hero image choices live there, so fix content problems there, not only in the output JSON). `added-tours.mjs` generates `tours-added.json` (run `node scripts/added-tours.mjs`). `brand.mjs` and `sheet.mjs` are image utilities that import `sharp` (a devDependency).

**Draft tours.** Entries in `tours-added.json` with `draft: true` are owner-unapproved. They are excluded from pages, sitemap, filters and counts unless the build runs with `SHOW_DRAFT_TOURS=1`. To approve one, add `live: true` to its entry in `scripts/added-tours.mjs` and re-run it. Departure-city filters are derived from the visible tours. The target is six visible tours for each of Marrakech, Fes, Casablanca and Tangier (met).

**Hidden tours.** `src/content/hidden-tours.json` maps a live tour slug to a replacement slug. The tour is dropped from `content.ts`, and its old URLs redirect to the replacement.

**Legacy URL redirects** live in `next.config.ts` and are generated from the tour and post JSON (old root-level slugs move to `/tours/*` and `/blog/*`, plus aliases, WordPress archives, and `/wp-content/uploads` to `/images`). `skipTrailingSlashRedirect` is on and each rule matches both slash forms with `{/}?` so every redirect is a single hop. Literal file names must be escaped with `esc()`. Changing slugs or adding tours changes the redirect set, so re-run `check-redirects.mjs`.

**Routes** (`src/app`): `tours` (plus `tours/from/[city]`, departure-city landing pages built from `origins`), `day-trips`, `destinations`, `blog` with `[slug]` pages, plus `about`, `contact`, `gallery`, `testimonials`, `privacy`. Each route has its own `opengraph-image.tsx` and `twitter-image.tsx`. `sitemap.ts`, `robots.ts` and `llms.txt/route.ts` are generated. `api/enquiry/route.ts` handles the forms (honeypot field `website`) and returns 503 until `RESEND_API_KEY` (optional `ENQUIRY_TO`) is set on the host.

`next.config.ts` pins `turbopack.root` to the cwd (a stray lockfile in the home folder confused workspace detection) and routes CSS through `@tailwindcss/turbopack`.

## Content rules

Use only facts that exist on the original site. No invented prices, hotel names or claims. Flag any guess for the owner to approve. The privacy page text and the draft tours are awaiting owner review.

SEO plan and keyword data: `docs/seo-keyword-map.md`.
