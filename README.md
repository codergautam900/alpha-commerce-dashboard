# Alpha Dashboard

Premium product operations dashboard built with React, TypeScript, Vite, and Tailwind CSS.

[Live Demo](https://alpha-commerce-dashboard.vercel.app/) | [GitHub Repository](https://github.com/codergautam900/alpha-commerce-dashboard)

## Project Status

This project is review-ready and covers a complete frontend dashboard workflow:

- Public landing page
- Demo login with role-based access
- Admin-only analytics dashboard
- Product catalog with filters, sorting, pagination, and saved views
- Product detail page with purchase planner
- Persistent shopping cart
- Responsive layouts, dark mode, and error/loading states

## HR Quick Review

If someone wants to review the project quickly, this is the easiest flow:

1. Open the live demo.
2. Click `Get Started` or go to `/login`.
3. Sign in as `Admin View` to test the full dashboard.
4. Check `/dashboard` for analytics cards, chart, live updates, and refresh state.
5. Open `/products` and test search, category filters, rating filter, sorting, pagination, saved views, CSV export, column controls, and copy-view-link.
6. Open any product detail page and test quantity controls, purchase calculations, add-to-cart, and buy-now flow.
7. Sign in as `User View` and confirm that only published products are visible.

## Demo Profiles

The app uses client-side demo entry so HR can review everything without backend setup.

| Role | Access |
| --- | --- |
| Admin View | Dashboard, full catalog, publish/hide controls |
| User View | Published products only |

Use the role buttons on the login screen to enter the app.

Note: a few products are intentionally hidden by default so the admin and user experiences differ immediately during review.

## What Is Implemented

### Core Product Workflow

- Product listing from DummyJSON API
- Search with debounced input
- Multi-category filtering
- Minimum rating filter
- Sorting by name, price, and rating
- Client-side pagination
- Saved views with localStorage persistence
- Shareable URL query state
- CSV export for the current filtered view
- Column show/hide and reorder controls

### Admin and User Experience

- Role-based route guards
- Admin-only analytics route
- Published-only catalog access for standard users
- Product visibility toggle for admins
- Login flow designed for recruiter/demo review

### Dashboard and Insights

- Overview cards for catalog metrics
- Category distribution chart
- Inventory value and rating insights
- Simulated live updates feed
- Manual refresh and sync status

### Product Detail and Commerce Flow

- Product gallery
- Detailed metadata, tags, shipping, and warranty info
- Stock-aware status badges
- Quantity selector with min/max rules
- Real-time pricing summary with discount, shipping, tax, and total
- Persistent cart drawer with update/remove actions

### UX and Quality

- Public landing page
- Dark mode with persistence
- Command palette shortcut
- Responsive desktop and mobile layouts
- Loading, empty, and error states
- Error boundary protection
- Utility-level automated tests for cart and product logic

## Screenshots

### Demo Login

This new screen helps HR instantly understand the two review modes.

![Demo login and role selection](docs/screenshots/login-demo-access-redacted.png)

### Dashboard Overview

![Dashboard overview](docs/screenshots/dashboard-overview.png)

### Product Catalog

![Product catalog workspace](docs/screenshots/products-table.png)

### Product Insights

![Product insights](docs/screenshots/products-insights.png)

### Cart Drawer

![Cart drawer](docs/screenshots/cart-drawer.png)

### Mobile Experience

![Mobile sidebar](docs/screenshots/mobile-sidebar.png)

![Mobile products](docs/screenshots/mobile-products.png)

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Server State | TanStack Query |
| HTTP | Axios |
| Charts | Recharts |
| Icons | Lucide React |
| Persistence | localStorage |
| Quality | ESLint, TypeScript strict mode, Node test runner |

## Architecture Summary

```text
alpha-dashboard/
|-- README.md
|-- LICENSE
|-- docs/
|   `-- screenshots/
`-- client/
    |-- public/
    |-- src/
    |   |-- app/          # providers, route guards, app setup
    |   |-- components/   # analytics, layout, products, shared UI
    |   |-- hooks/        # reusable state and data hooks
    |   |-- pages/        # route-level screens
    |   |-- services/     # API layer
    |   |-- types/        # TypeScript models
    |   `-- utils/        # pure helpers and tested logic
    |-- package.json
    |-- vite.config.ts
    `-- vercel.json
```

## Routes and Access

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Landing page | Public |
| `/welcome` | Landing page alias | Public |
| `/login` | Demo profile selection | Public |
| `/dashboard` | Analytics overview | Admin only |
| `/products` | Product catalog | Admin and User |
| `/products/:productId` | Product detail page | Admin and User |
| `*` | Not found page | Public |

## Local Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Run Locally

```bash
git clone https://github.com/codergautam900/alpha-commerce-dashboard.git
cd alpha-dashboard/client
npm install
npm run dev
```

Open `http://localhost:5173`.

### Environment

The project already includes [client/.env.example](client/.env.example).

```env
VITE_API_BASE_URL=https://dummyjson.com
```

## Available Scripts

Run these commands inside `client/`.

```bash
npm run dev
npm run test
npm run lint
npm run build
npm run preview
```

## Deployment

The project is configured for Vercel deployment from the `client` directory.

- SPA routing is handled through `vercel.json`
- Basic security headers are already configured
- Product detail routes such as `/products/12` work after deployment

## Notes for Reviewers

- No backend setup is required.
- Authentication is demo-mode and handled on the client for easy assessment review.
- Product data comes from the public DummyJSON API.
- Current automated tests focus on utility logic such as cart math and product filtering.

## License

This project is licensed under the [MIT License](LICENSE).
