# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

Stramedia client site built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Commands

- `npm run dev` — Start dev server (localhost:3000) with hot reload
- `npm run build` — Production build
- `npm run start` — Run production server
- `npm run lint` — Run ESLint

## Architecture

- **Routing:** Next.js App Router (file-based routing in `src/app/`)
- **Rendering:** React Server Components by default, Client Components for animations
- **Styling:** Tailwind CSS via PostCSS; global styles + color variables in `src/app/globals.css`
- **Fonts:** Loaded via `next/font/google` in `src/lib/fonts.ts`, exposed as CSS variables
- **Site config:** All client info centralized in `src/lib/constants.ts`
- **Animations:** Framer Motion — shared variants in `src/lib/animations.ts`
- **Import alias:** `@/*` maps to `src/`

## Key Files

| File                                   | Purpose                                          |
| -------------------------------------- | ------------------------------------------------ |
| `src/lib/constants.ts`                 | Site name, contact, nav, CTA — MODIFY PER CLIENT |
| `src/app/globals.css`                  | Color CSS variables — MODIFY PER CLIENT          |
| `src/lib/fonts.ts`                     | Font config — MODIFY PER CLIENT if custom fonts  |
| `src/lib/animations.ts`                | Framer Motion shared variants                    |
| `src/lib/utils.ts`                     | `cn()` class merge utility                       |
| `src/components/ui/Button.tsx`         | Button with variants + magnetic hover            |
| `src/components/ui/SectionWrapper.tsx` | Animated section wrapper                         |

## Conventions

- TypeScript strict mode
- Mobile-first: code for 375px, then `sm:`, `md:`, `lg:`, `xl:`
- Use `next/image` for ALL images (never raw `<img>`)
- Use `SectionWrapper` for every page section
- Use `Button` component for all CTAs
- Client Components (`"use client"`) only for animated/interactive components
- **Before writing any code, read `brief.md` in full. All copy, CTAs,
  testimonials, services and SEO come from there. Never use lorem ipsum.**

## Design Reference

For design direction, aesthetic rules, and anti-patterns, read `frontend-design.md`
in full before generating any UI code. Reference it explicitly with
`@frontend-design.md` when starting a new page or component.
