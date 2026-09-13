## niteshseram.in

Personal site and writing of [Nitesh Seram](https://niteshseram.in) — a frontend engineer based in Assam, India.

### Stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19
- [Tailwind CSS v4](https://tailwindcss.com)
- [Base UI](https://base-ui.com) for primitives
- [fumadocs-mdx](https://fumadocs.dev) for writing content
- [oxlint](https://oxc.rs) and [oxfmt](https://oxc.rs) for linting/formatting
- [pnpm](https://pnpm.io) for package management

### Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command          | Description                 |
| ---------------- | --------------------------- |
| `pnpm dev`       | Start the dev server        |
| `pnpm build`     | Build for production        |
| `pnpm start`     | Start the production server |
| `pnpm lint`      | Run oxlint                  |
| `pnpm lint:fix`  | Run oxlint with `--fix`     |
| `pnpm fmt`       | Format with oxfmt           |
| `pnpm fmt:check` | Check formatting            |
| `pnpm tc`        | Typecheck with tsgo         |

### Structure

- [src/app/](src/app/) — routes (home, about, writing, and Markdown endpoints)
- [src/components/](src/components/) — UI components
- [src/content/writing/](src/content/writing/) — MDX posts
- [src/config/site.ts](src/config/site.ts) — site metadata
- [src/data/](src/data/) — static data (about, projects, experience, talks, social links)
- [src/lib/](src/lib/) — fonts, JSON-LD, metadata, content helpers
- [src/utils/](src/utils/) — reusable hooks

### Conventions

Project-specific conventions (Tailwind class grouping, Next.js notes) live in [AGENTS.md](AGENTS.md).

### Content and controls

Published articles live in `src/content/writing/`; their MDX imports also power
the interactive examples. The Markdown endpoints (`/llms.txt`, `/llms-full.txt`,
`/about.md`, `/experience.md`, `/projects.md`, `/speaking.md`, and
`/writing/<slug>.mdx`) are active public routes, generated from shared content.
