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
- Analytics dashboard with category distribution chart
- Polling-based live refresh status
- Product table column customization

## Deployment

This folder includes `vercel.json` so client-side routes like `/products/12` rewrite to `index.html` on Vercel.
