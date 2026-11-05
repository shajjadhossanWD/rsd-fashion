# RSD Fashion — Frontend

React 19 + Vite 8 + TypeScript storefront.

## Stack

| Concern       | Choice                                     |
| ------------- | ------------------------------------------ |
| Build / dev   | Vite 8                                     |
| UI            | React 19, TypeScript (strict)              |
| Styling       | Tailwind CSS v4 (tokens in `globals.css`)  |
| Routing       | React Router 7 (data router, lazy routes)  |
| Server state  | TanStack Query 5                           |
| Client state  | Zustand (persisted where needed)           |
| HTTP          | Axios instance with interceptors           |
| Testing       | Vitest + Testing Library + jsdom           |
| Lint / format | Oxlint + Prettier (Tailwind class sorting) |

## Getting started

```bash
cp .env.example .env.local   # then edit values
npm install
npm run dev                  # http://localhost:3000
```

## Scripts

| Script              | What it does                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| `npm run dev`       | Start dev server                                                                                    |
| `npm run build`     | Type-check and build for production                                                                 |
| `npm run preview`   | Serve the production build locally                                                                  |
| `npm run typecheck` | TypeScript only                                                                                     |
| `npm run lint`      | Oxlint (`lint:fix` to auto-fix)                                                                     |
| `npm run format`    | Prettier write (`format:check` in CI)                                                               |
| `npm test`          | Vitest in watch mode (`test:run` for one pass)                                                      |
| `npm run validate`  | Everything CI should run                                                                            |
| `npm run assets`    | Regenerate favicons + optimized thumbnails from `public/asset/` (see `scripts/generate-assets.mjs`) |

## Project structure

```
src/
├── app/                  # Application shell — wires everything together
│   ├── App.tsx
│   ├── layouts/          # RootLayout, Header, Footer
│   ├── providers/        # AppProviders (QueryClient, devtools, …)
│   └── router/           # Route tree (lazy, code-split pages)
├── pages/                # Route-level components. Thin: compose features.
│   ├── home/
│   ├── products/
│   └── not-found/
├── features/             # Business domains, self-contained
│   ├── products/
│   │   ├── api/          # *.api.ts (HTTP) + *.queries.ts (query keys/options)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── index.ts      # ← the feature's public API
│   └── cart/
│       ├── components/
│       ├── store/        # Zustand store + selectors
│       └── index.ts
├── components/           # Shared, domain-agnostic UI
│   ├── ui/               # Button, Container, Spinner, …
│   └── feedback/         # PageLoader, ErrorState, RouteErrorBoundary
├── config/               # env.ts, paths.ts, site.ts
├── hooks/                # Shared, domain-agnostic hooks
├── lib/                  # api-client, query-client, cn, formatters
├── styles/               # globals.css (Tailwind + design tokens)
├── types/                # Shared types
└── test/                 # Vitest setup + renderWithProviders
```

## Conventions

**Dependency direction** — imports flow one way only:

```
app → pages → features → components / hooks / lib / config / types
```

- `components/`, `lib/`, `hooks/` must never import from `features/` or `pages/`.
- Features import other features **only via their `index.ts`** (`@/features/products`), never deep paths.
- Circular imports are a lint error (`import/no-cycle`).

**State**

- Server data → TanStack Query. Add a `*.queries.ts` with a key factory per feature.
- Client-only/UI state → local `useState` first; Zustand only when shared across distant components.
- Never copy server data into Zustand.

**Routing**

- All URLs live in `config/paths.ts`; link with `paths.product(id)`, never string literals.
- Pages export `Component` and are lazy-loaded in `app/router/router.tsx`.
- Set page titles with React 19's native `<title>` inside the page.

**Config**

- Read env vars only through `config/env.ts`. New vars: add to `.env.example` and `src/vite-env.d.ts`.

**Styling**

- Tailwind utilities + design tokens from `@theme` (`bg-brand`, `text-muted`, `font-display`).
- Merge classes with `cn()`; style links as buttons with `buttonVariants()` (don't nest `<button>` in `<a>`).

**Responsive layout**

- Mobile-first. Tailwind breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536.
- Custom `short:` variant = landscape and ≤ 560px tall (phones on their side). Use it whenever
  something is sized by screen height.
- The header is fixed. Its height is the `--header-h` CSS variable (set per breakpoint in
  `globals.css`). Offset content with it, never with a hard-coded number. Standard pages get
  this for free from `PageContainer`.
- Prefer fluid sizing (`clamp()`, `min()`) over stacks of breakpoint classes for type and logos.
- Use `svh` (not `vh`/`dvh`) for full-screen sections so mobile browser bars don't cause jumps.
- Header: inline nav from `xl` up. Below that, a menu button (phone number shown from `md`).

**Imports** — use the `@/` alias for anything outside the current feature/folder.

**Tests** — co-locate as `*.test.ts(x)` next to the code; render with `renderWithProviders` from `@/test/test-utils`.

## Adding a feature

1. `src/features/<name>/` with `api/`, `components/`, `hooks/`, `types.ts`, `index.ts`.
2. Export only what other modules need from `index.ts`.
3. Add a page in `src/pages/<name>/`, a path in `config/paths.ts`, and a route in `app/router/router.tsx`.
