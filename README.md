# JOSTECAHAAN MOTORS — Website

Official website for **JOSTECAHAAN MOTORS**, a premium car dealership in Nakuru, Kenya.
Developed by **NovaPixel Labs**.

## Tech stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (design tokens in `src/styles/index.css`)
- [React Router](https://reactrouter.com) (admin routes are lazy-loaded)
- [oxlint](https://oxc.rs) for linting, [Prettier](https://prettier.io) for formatting
- Supabase (database, auth, image storage) — _added in a later step_

## Getting started

Requires Node.js 20.19 or newer (see `.nvmrc`).

```bash
npm install
npm run dev        # start the development server
npm run build      # type-check and build for production into dist/
npm run preview    # serve the production build locally
npm run check      # type-check + lint + formatting check
npm run format     # auto-format all files
```

## Folder structure

```
public/                 static files served as-is (favicon, robots.txt)
src/
  app/                  App root and router (route definitions)
  pages/                one component per page
    admin/              admin pages (lazy-loaded, separate bundle)
  components/
    layout/             header, footer, page shells
    ui/                 small reusable building blocks (buttons, container, wordmark)
    contact/            WhatsApp / call enquiry buttons
    seo/                per-page <title> and meta tags
  features/             feature logic (vehicles, auth) — filled in later steps
  config/               business details (site.ts) and URL list (routes.ts)
  lib/                  small helpers (KSh formatting, WhatsApp links)
  styles/               global CSS and design tokens
  types/                shared TypeScript types (Supabase types later)
supabase/migrations/    SQL for tables and security rules — later step
```

## Updating business details

Phone, WhatsApp, address and opening hours live in `src/config/site.ts`.

## Security notes

- Never commit `.env` files. Only the Supabase **anon** key may be used in frontend code.
- The Supabase **service-role** key must never appear in this repository or the browser.
