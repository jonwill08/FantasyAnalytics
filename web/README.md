## Fantasy Analytics Web

Fantasy football evaluation platform scaffolded with Next.js 16 (App Router), Tailwind CSS v4, and React 19.

### Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS v4 with design tokens defined in `src/app/globals.css`
- @tanstack/react-query with devtools (`src/app/providers.tsx`)
- Recharts for data visualizations
- Zustand (reserved for future client state)

### Directory Highlights

- `src/app/(public)` – marketing, product, and placeholder feature routes
- `src/components/layout` – shared shell, header, footer
- `src/components/sections` – landing page sections (hero card, metrics, projections, onboarding)
- `src/lib/utils.ts` – `cn` helper powered by `clsx` + `tailwind-merge`
- `src/config/navigation.ts` – primary and secondary navigation config

### Getting Started

```bash
cd web
npm install
npm run lint
npm run dev
```

Visit `http://localhost:3000` to explore the scaffold. `npm run lint` and `npm run build` are available for QA.

Environment variables:

```bash
cp .env.local
# populate NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY
```

### Next Steps

- Wire data ingestion + API routes to replace placeholder sections
- Add authentication (Clerk/Auth0) and gated dashboard route group
- Stand up component tests (Playwright/RTL) once UI hardens
