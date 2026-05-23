# Alpha Dashboard Client

Frontend client for the Alpha admin dashboard assignment.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS v3
- React Router DOM
- TanStack Query
- Axios
- Recharts

## Local Setup

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Features

- Responsive admin dashboard layout
- Product listing with search, multi-category filters, sorting, and pagination
- URL-synced filters and search params
- Product details page with image gallery
- Quantity-aware cart flow with add-to-cart, buy-now, and live checkout totals
- Analytics dashboard with category distribution chart
- Command palette for quick page and catalog navigation
- Saved product views built on top of URL-synced filters
- CSV export and shareable links for the active catalog view
- Polling-based live refresh status
- Product table column customization and live activity stream

## Deployment

This folder includes `vercel.json` so client-side routes like `/products/12` rewrite to `index.html` on Vercel.
