<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Tailwind CSS — always group utilities by purpose

When writing Tailwind classes (inside `className`, `cn(...)`, `cva(...)`, etc.), split the string into multiple string arguments, one per purpose group, in this canonical order:

1. **Layout** — display (`flex`, `grid`, `block`, `inline-*`, `hidden`), alignment (`items-*`, `justify-*`), `gap-*`, sizing (`w-*`, `h-*`, `size-*`, `max-w-*`), positioning (`absolute`, `relative`, `sticky`, `top-*`, `z-*`), `overflow-*`
2. **Spacing** — padding and margin: `p-*`, `px-*`, `py-*`, `m-*`, `mx-auto`, `ml-auto`, `mt-*`, etc.
3. **Shape** — `rounded-*`, `border`, `border-*` (width only), `shadow-*`, `backdrop-blur`, `opacity-*`
4. **Typography** — `text-*` (size), `font-*`, `leading-*`, `tracking-*`, `uppercase`, `italic`
5. **Colors** — `bg-*`, `text-*` (color), `border-*` (color), `fill-*`, `stroke-*`
6. **Interaction** — `cursor-*`, `select-*`, `pointer-events-*`, `outline-none`
7. **Transitions** — `transition-*`, `duration-*`, `ease-*`, `animate-*`, `origin-*`
8. **Hover/focus states** — `hover:*`, `focus-visible:*`, `active:*`, `group-hover:*`, `group-focus-visible:*`
9. **Data/aria states** — `data-*:*`, `aria-*:*`, `data-starting-style:*`, `data-ending-style:*`

Rules:

- One string argument per group. Keep related utilities together in that string.
- **Do not add `// Layout` / `// Shape` etc. comments.** The grouping itself is the structure.
- Omit a group entirely if it has no classes.
- Responsive modifiers (`sm:*`, `md:*`) stay in their natural group — `hidden sm:flex` both live under Layout.
- Conditional strings (`active ? 'bg-muted' : '...'`) still belong to the correct group.
- Apply this to every new component and to any file you edit.

Example:

```tsx
className={cn(
  'inline-flex items-center gap-1',
  'px-3 py-2',
  'rounded-sm',
  'text-sm font-medium',
  'bg-transparent text-foreground',
  'cursor-pointer select-none outline-none',
  'transition-colors',
  'hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
  'data-open:bg-muted',
)}
```

# Naming — no single-letter identifiers

Use descriptive names for variables, parameters, and destructured aliases. Do not abbreviate just to save keystrokes: write `event`, `engine`, `angle`, `element`, `callback` — not `e`, `a`, `el`, `cb`.

Exceptions (allowed):

- Loop counters in tight `for` loops: `for (let i = 0; i < n; i++)`.
- Established math/physics vector components used as a pair: `dx`/`dy`, `gx`/`gy`, `cos`/`sin`. These are only acceptable when they clearly represent a single mathematical entity in a short scope — don't reuse the same name for two different concepts in the same function.

When a letter has multiple possible meanings in context (e.g. `a` could be "angle" or "acceleration"), always write the full word.
