# Alpha Dashboard

Alpha Dashboard is a polished product operations dashboard built with React 19, TypeScript, Vite, and Tailwind CSS. It combines a marketing-style welcome page, live catalog analytics, a filterable products workspace, and stock-aware product details in a SaaS-style interface.

## Highlights

- Responsive welcome, dashboard, products, and product detail experiences
- URL-synced search, multi-category filtering, sorting, and pagination
- Live activity feed with simulated catalog updates
- Analytics cards and category distribution charts powered by Recharts
- Saved views, column customization, CSV export, and copyable filtered links
- Persistent cart drawer with quantity controls and checkout math
- Command palette for quick navigation and catalog shortcuts
- Dark mode, loading states, and friendly empty and error states
- Utility tests for cart and product logic

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- TanStack Query
- Axios
- Recharts
- Lucide React

## App Pages

- `/` and `/welcome` - landing page with product messaging and feature highlights
- `/login` - branded entry screen
- `/dashboard` - overview cards, category chart, live updates, and catalog health
- `/products` - searchable product workspace with filters, saved views, column controls, CSV export, and pagination
- `/products/:productId` - product detail page with gallery, metadata, and cart actions

## Local Development

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```

## Environment

Create a local `.env` inside `client/` if you want to override the default API base URL:

```bash
VITE_API_BASE_URL=https://dummyjson.com
```

An example file already exists at `client/.env.example`.

## Project Structure

```text
.
|-- README.md
`-- client
    |-- public
    |-- src
    |   |-- app
    |   |-- assets
    |   |-- components
    |   |   |-- analytics
    |   |   |-- layout
    |   |   |-- products
    |   |   `-- ui
    |   |-- data
    |   |-- hooks
    |   |-- layouts
    |   |-- pages
    |   |-- services
    |   |-- types
    |   `-- utils
    |-- package.json
    `-- vercel.json
```

## Product Experience Notes

- The catalog is fetched from the DummyJSON products API.
- Product filtering, sorting, and pagination are computed client-side so different controls work together cleanly.
- Query string state keeps product views shareable and reload-safe.
- `localStorage` is used for theme choice, cart state, saved views, and column preferences.
- The cart is reconciled against live catalog data so price and stock changes stay accurate.

## Quality Checks

Run these before pushing changes:

```bash
cd client
npm run test
npm run lint
npm run build
```

## Deployment

The project is set up for Vercel deployment.

Recommended settings:

- Framework preset: `Vite`
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`

`client/vercel.json` already includes a rewrite so routes like `/products/12` keep working after deployment.

## Repository

- GitHub: `https://github.com/codergautam900/alpha-commerce-dashboard`

## Next Step

- Add the final Vercel production URL once deployment is live
