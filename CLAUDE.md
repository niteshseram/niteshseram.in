@AGENTS.md

# Project overview

Personal portfolio and blog at niteshseram.in. Built with Next.js 16 (App Router), React 19, TypeScript (strict), and Tailwind CSS v4. Blog posts are authored in MDX and processed by fumadocs-mdx.

# Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` / `pnpm lint:fix` — lint with oxlint
- `pnpm fmt` / `pnpm fmt:check` — format with oxfmt

# Architecture

## Routing

Next.js App Router with a `(app)` route group for main pages. Dynamic route at `/writing/[slug]` for blog posts. `params` is a `Promise` in Next.js 16 — always `await params` before accessing fields.

## Content pipeline

MDX files live in `src/content/writing/`. Fumadocs-mdx processes them via `source.config.ts` and generates types into `.source/`. The source loader in `src/lib/source.ts` exposes `writingSource`. Post helpers in `src/lib/writing.ts` handle fetching, sorting, and filtering (drafts excluded when `VERCEL_ENV === 'production'`).

### MDX frontmatter schema

```yaml
title: string (required)
summary: string (required)
publishedAt: date string (required, coerced to Date)
tags: string[] (default [])
draft: boolean (default false)
# readingTime is auto-calculated — do not set manually
```

## Styling

Tailwind CSS v4 with `@tailwindcss/postcss`. Theme colors use oklch() via CSS custom properties defined in `src/app/globals.css` (`:root` for light, `.dark` for dark). The dark variant is configured as `@custom-variant dark (&:where(.dark, .dark *))`.

### Design tokens (color names)

`background`, `foreground`, `card`, `card-foreground`, `muted`, `muted-foreground`, `surface`, `surface-foreground`, `popover`, `popover-foreground`, `border`, `input`, `ring`, `brand`, `brand-foreground`, `brand-muted`, `link`, `code`, `code-bar`, `code-foreground`, `code-number`, `code-highlight`, `selection`, `selection-foreground`

### Fonts

- `--font-sans` (DM Sans) — body text
- `--font-serif` (Instrument Serif) — headings
- `--font-mono` (JetBrains Mono) — code

### Class grouping (see AGENTS.md for full rules)

Group Tailwind classes by purpose in `cn()`: Layout > Spacing > Shape > Typography > Colors > Interaction > Transitions > Hover/focus > Data/aria. One string per group, no inline comments.

## Components

Components live in `src/components/` organized by domain: `ui/` (primitives), `home/`, `writing/`, `about/`.

Key patterns:

- Props are typed with `Readonly<{...}>`.
- `cn()` (clsx + tailwind-merge) for class composition — defined in `src/lib/utils.ts`.
- `cva()` (class-variance-authority) for variant-driven components (e.g., `Anchor`).
- `'use client'` only on components that need browser APIs or hooks. Server components are the default.
- Icons come from `react-icons/pi` (Phosphor Icons).

### Button

`src/components/ui/button.tsx` — renders as `<button>` or `<Anchor>` depending on whether `href` is passed. Variants: `brand`, `outline`, `ghost`. Sizes: `xs` through `xl`. Supports icon-only mode via `isLabelHidden`.

### Anchor

`src/components/ui/anchor.tsx` — renders Next.js `<Link>` for internal URLs, plain `<a>` for external. Variants: `default`, `brand`, `unstyled`. Automatically adds `rel="noreferrer noopener"` and `target="_blank"` for external links.

## SEO & metadata

- `pageMetadata()` in `src/lib/metadata.ts` generates consistent `Metadata` objects.
- JSON-LD structured data via `src/lib/jsonld.ts` (Person, WebSite, Blog, BlogPosting).
- Dynamic OG images generated per blog post at `opengraph-image.tsx`.
- Site constants in `src/config/site.ts` (`SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`, etc.).

## Data

Static data exports in `src/data/`: `projects.ts`, `experience.ts`, `tech-stack.tsx`, `talks.ts`, `social-links.ts`, `timeline.ts`. These are plain TypeScript — no database.

# Path aliases

- `@/*` → `./src/*`
- `@/.source/*` → `./.source/*`

# Code style

- TypeScript strict mode. No `any` — use proper types.
- oxlint for linting, oxfmt for formatting. No ESLint or Prettier.
- Prefer `toSorted()`, `findIndex()`, and other modern array methods.
- Use `Readonly<{...}>` for component prop types.
- Avoid `motion-safe:` prefix on animations — the user's system has Reduce Motion enabled, so those animations never play.

# Git workflow

- `develop` branch for active work.
- `main` branch for production / PR targets.
