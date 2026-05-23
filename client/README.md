# Alpha Dashboard Client

Alpha Dashboard Client is a React + TypeScript product operations dashboard built on top of the DummyJSON API. The project combines analytics, product catalog management, product detail browsing, a stock-aware cart flow, mock live updates, and a polished responsive admin UI in one frontend application.

## Screenshots

<p align="center">
  <img src="./public/Screenshot%202026-05-23%20181717.png" alt="Alpha Dashboard UI preview 1" width="48%" />
  <img src="./public/Screenshot%202026-05-23%20182134.png" alt="Alpha Dashboard UI preview 2" width="48%" />
</p>
<p align="center">
  <img src="./public/Screenshot%202026-05-23%20182204.png" alt="Alpha Dashboard UI preview 3" width="48%" />
  <img src="./public/Screenshot%202026-05-23%20182219.png" alt="Alpha Dashboard UI preview 4" width="48%" />
</p>
<p align="center">
  <img src="./public/Screenshot%202026-05-23%20183132.png" alt="Alpha Dashboard UI preview 5" width="48%" />
  <img src="./public/Screenshot%202026-05-23%20183139.png" alt="Alpha Dashboard UI preview 6" width="48%" />
</p>

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v3
- React Router DOM
- TanStack Query
- Axios
- Recharts
- Lucide React

## What This Project Does

This project acts like a premium admin dashboard for product operations teams.

- It shows a landing page and a branded login preview screen.
- It provides a dashboard page with analytics cards and category charts.
- It provides a products page with search, filters, sorting, pagination, saved views, column customization, CSV export, and shareable URLs.
- It provides a product details page with image gallery, pricing information, stock state, quantity planner, add-to-cart flow, and buy-now flow.
- It keeps a global cart in localStorage and recalculates totals live.
- It simulates live product updates and pushes those changes into the UI through React Query cache updates.

## Main Routes

- `/` and `/welcome`: marketing-style welcome page with CTA buttons and animated UI.
- `/login`: polished login preview screen for branded entry experience.
- `/dashboard`: analytics overview page.
- `/products`: catalog workspace with filters, views, export, and table customization.
- `/products/:productId`: product detail screen with purchase planner and gallery.
- `*`: 404 fallback page.

## Key Features

- Route-level lazy loading through `React.lazy()` and `Suspense` in `src/app/AppRouter.tsx`.
- Shared dashboard shell with sidebar, top navbar, command palette, and cart drawer.
- URL-synced search, categories, sorting, and pagination on the products page.
- Debounced search input for smoother typing experience.
- Saved filter views persisted in `localStorage`.
- Product table column show/hide and reorder preferences persisted in `localStorage`.
- Responsive catalog layout:
  - desktop uses a table
  - mobile uses cards
- CSV export for the current filtered product set.
- Copyable share link for the active filtered view.
- Mock live updates that modify stock, rating, and price in the cached catalog.
- Theme toggle with dark mode persistence.
- Error boundary plus friendly loading and error states.
- Utility tests for cart logic and product query-string behavior.

## Architecture Overview

### 1. App bootstrap

`src/main.tsx` is the main entry file.

- Creates the React root.
- Configures `QueryClient`.
- Sets React Query defaults like `staleTime`, `gcTime`, and retry rules.
- Wraps the app with:
  - `AppErrorBoundary`
  - `ThemeProvider`
  - `QueryClientProvider`
  - `LiveUpdatesProvider`
  - `CartProvider`
  - `BrowserRouter`

This is important in interview because it shows clean separation of concerns:

- server state is handled by React Query
- theme is handled by context
- live updates are handled by context plus cache mutation
- cart is handled by context plus persistence
- navigation is handled by React Router

### 2. Routing

`src/app/AppRouter.tsx` defines the route map.

- Uses `Suspense` fallback with `PageLoader`.
- Lazily loads heavy pages and layout so the first bundle stays lighter.
- Wraps dashboard pages inside `DashboardLayout`.

### 3. Layout

`src/layouts/DashboardLayout.tsx` builds the shell for authenticated-style pages.

- `SidebarNav` handles left navigation.
- `TopNavBar` handles theme toggle, cart open, command palette open, and mobile menu.
- `CommandPalette` supports quick page jumps with keyboard shortcut `Ctrl + K`.
- `CartDrawer` stays mounted globally so cart can open from multiple pages.
- Mobile sidebar locks background scroll when open.

## Data Flow

### API layer

`src/services/http.ts`

- Creates a shared Axios instance.
- Uses `VITE_API_BASE_URL` if provided, otherwise falls back to `https://dummyjson.com`.
- Adds timeout and friendly error normalization through response interceptors.

`src/services/products.ts`

- `fetchAllProducts()`: loads full catalog with `limit=0`.
- `fetchProductById()`: loads one product.
- `fetchCategories()`: loads category list.
- `productQueryKeys`: central query keys for cache consistency.

### Why full catalog is fetched once

The assignment needs search, multi-category filtering, sorting, pagination, insights, CSV export, and saved views to all work together on the same dataset. Because of that, the app fetches the full product catalog once and performs those operations client-side.

This is a strong interview point:

- server gives raw data
- frontend creates an interactive analytics workspace on top of that data

### React Query usage

`src/hooks/useProductsCatalog.ts`

- fetches products and categories
- polls the product catalog every 60 seconds
- exposes loading, error, refresh, and refetch helpers

`src/hooks/useDashboardAnalytics.ts`

- reuses catalog data
- passes products and categories into `buildDashboardAnalytics()`
- returns ready-to-render KPIs for the dashboard

## State Management

This project uses multiple state layers for the right reason instead of putting everything in one place.

### 1. Server state

Managed with TanStack Query.

- catalog data
- categories data
- product detail data

### 2. URL state

Managed by `useProductFilters()` with `useSearchParams()`.

- search text
- selected categories
- sort order
- current page

Why this is useful:

- filters are shareable through URL
- refresh does not lose state
- browser back and forward work naturally

### 3. Persistent local UI state

Managed through `localStorage`.

- cart items in `CartProvider`
- theme in `ThemeProvider`
- saved product views in `useSavedProductViews`
- visible columns and order in `useProductColumns`

### 4. Derived state

Calculated with utility functions and `useMemo()`.

- filtered products
- sorted products
- paginated products
- filtered insights
- dashboard analytics
- cart totals

## Important Pages

### Welcome Page

File: `src/pages/WelcomePage.tsx`

- entry landing page
- animated hero and feature sections
- CTA to dashboard
- premium presentation layer

### Login Page

File: `src/pages/LoginPage.tsx`

- branded preview auth screen
- currently UI-only
- no real authentication backend

If asked in interview, clearly say:

- this screen is for UI completeness and entry experience
- the main assignment focus is dashboard, catalog, analytics, and cart workflow

### Dashboard Page

File: `src/pages/DashboardPage.tsx`

- shows total products
- shows average rating
- shows inventory value
- shows active categories
- shows live refresh status
- shows category distribution chart through Recharts
- shows live event feed
- shows operational summary cards

### Products Page

File: `src/pages/ProductsPage.tsx`

This is the most feature-rich page.

- fetches catalog and categories
- applies debounced search
- applies multi-category OR filtering
- applies sorting
- applies pagination
- shows filtered insights like average price and rating
- supports copying current view link
- supports CSV export
- supports saved views
- supports column show/hide and reorder
- uses table on desktop and cards on mobile

### Product Details Page

File: `src/pages/ProductDetailsPage.tsx`

- loads product by id
- shows image gallery
- shows price, rating, discount, shipping, warranty, tags, SKU, brand
- shows stock badge
- shows quantity planner
- calculates subtotal, discount, shipping, tax, and grand total before adding to cart
- supports add to cart and buy now

## Shared UI Pieces

### `TopNavBar`

File: `src/components/layout/TopNavBar.tsx`

- opens command palette
- toggles theme
- shows live connection status
- opens cart drawer
- shows current cart count
- supports mobile menu open

### `SidebarNav`

File: `src/components/layout/SidebarNav.tsx`

- dashboard navigation
- active route highlighting
- mobile close behavior

### `CommandPalette`

File: `src/components/ui/CommandPalette.tsx`

- keyboard shortcut `Ctrl + K`
- quick navigation across routes
- quick shortcuts for top-rated products, highest-price products, reset filters

### `CartDrawer`

File: `src/components/ui/CartDrawer.tsx`

- global slide-over panel
- quantity update and remove actions
- full price summary
- checkout preview message
- free shipping guidance

### `LiveUpdatesFeed`

File: `src/components/ui/LiveUpdatesFeed.tsx`

- shows recent mock events
- reads data from `LiveUpdatesProvider`
- reacts instantly when query cache changes

## Hooks and What They Do

| File | Responsibility |
| --- | --- |
| `src/hooks/useProductsCatalog.ts` | Fetches catalog and categories, handles polling and refresh state. |
| `src/hooks/useDashboardAnalytics.ts` | Builds dashboard KPIs from product data. |
| `src/hooks/useProductFilters.ts` | Keeps search, filters, sort, and page synced with URL. |
| `src/hooks/useSavedProductViews.ts` | Saves and deletes named filter views in `localStorage`. |
| `src/hooks/useProductColumns.ts` | Stores visible columns and order preferences. |
| `src/hooks/useDebounce.ts` | Delays updates from fast-changing inputs like search. |

## Utilities and What They Do

| File | Responsibility |
| --- | --- |
| `src/utils/products.ts` | Search, filter, sort, pagination, URL param parsing, stock label helpers. |
| `src/utils/cart.ts` | Cart totals, shipping, tax, quantity clamping, stock-aware purchase rules, cart reconciliation. |
| `src/utils/analytics.ts` | Builds dashboard cards and category chart data from raw products. |
| `src/utils/productExport.ts` | Converts current product view into downloadable CSV. |
| `src/utils/productColumns.ts` | Defines product table columns, default order, hide/show rules, reorder logic. |
| `src/utils/formatters.ts` | Currency, number, rating, label, and time formatting helpers. |

## Cart Logic

The cart is more than a simple array.

`src/app/CartProvider.tsx`

- reads cart from `localStorage`
- fetches catalog data when cart exists
- reconciles saved cart items with latest catalog data
- clamps quantities to available stock
- recalculates totals from live product price and discount
- opens cart automatically on buy now

This is a very good interview talking point because it shows business logic thinking:

- stale cart snapshots are corrected against current product data
- users cannot keep invalid quantities if stock has dropped
- pricing and discounts stay aligned with latest catalog data

## Live Updates Logic

`src/app/LiveUpdatesProvider.tsx`

- simulates socket connection
- marks connection status as connecting then connected
- every 18 seconds picks a random product
- changes either stock, rating, or price
- updates React Query cache directly with `queryClient.setQueryData()`
- stores last six events in memory

Why this is strong:

- components do not need separate live-update fetches
- once cache changes, all consumers re-render with fresh data automatically

## Testing

The project includes utility-level tests.

- `src/utils/cart.test.ts`
  - tests cart reconciliation
  - tests stock clamping
  - tests total calculation behavior
- `src/utils/products.test.ts`
  - tests stable saved-view query string generation
  - tests search and multi-category filtering behavior

## Project Structure

```text
client/
  public/                  # screenshot assets and public files
  src/
    app/                   # providers, contexts, router, app-level helpers
    assets/                # bundled static assets
    components/            # UI, layout, analytics, and products components
    data/                  # navigation config
    hooks/                 # reusable data and UI hooks
    layouts/               # dashboard shell
    pages/                 # route pages
    services/              # API client and API functions
    types/                 # TypeScript models
    utils/                 # business logic helpers and tests
```

## Interview Explanation

### 60-second answer

"This project is a React + TypeScript admin dashboard for product operations. It uses TanStack Query for API data, React Router for routing, Tailwind for UI, and localStorage for persistent user preferences like cart, theme, saved views, and column settings. The main pages are a dashboard analytics page, a products page with URL-synced filters and export features, and a product detail page with a stock-aware purchase planner. I also added mock live updates that directly update the React Query cache so the UI feels real-time."

### If interviewer asks why you used React Query

- because product and category data are server state
- caching, retries, loading states, and refetching become cleaner
- product list and product detail pages can share data patterns consistently

### If interviewer asks how filters work

- filters live in URL search params
- `useProductFilters()` reads and updates the URL
- actual filtering happens through utility functions on the full fetched catalog
- this makes the view shareable and refresh-safe

### If interviewer asks how live updates work

- no real socket server was available
- so I simulated live events in `LiveUpdatesProvider`
- every interval I mutate stock, price, or rating for a random product
- then I update the React Query cache
- dashboard and product pages reflect the new data automatically

### If interviewer asks what business logic you handled

- quantity clamping based on stock
- minimum order quantity handling
- free shipping threshold
- tax and discount calculation
- saved cart reconciliation against latest catalog values
- normalized saved-view query strings so the same filters map to one stable view

### If interviewer asks what makes the project polished

- lazy-loaded routes
- error boundary
- dedicated loading and error states
- responsive layout
- keyboard-driven command palette
- persisted preferences
- desktop table and mobile card adaptation

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
npm run preview
npm run test
```

## Deployment

This folder includes `vercel.json`.

- all routes rewrite to `index.html`
- useful for direct access to routes like `/products/12`
- also adds a few basic security headers
