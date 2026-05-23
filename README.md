<div align="center">

# Alpha Dashboard

### Premium Product Operations Dashboard with Analytics & Catalog Workflows

A production-grade SaaS-style dashboard for product management and e-commerce operations. Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

[![React](https://img.shields.io/badge/React-19-0f172a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-0f172a?style=for-the-badge&logo=typescript&logoColor=3178c6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-0f172a?style=for-the-badge&logo=vite&logoColor=646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38b2ac)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-latest-0f172a?style=for-the-badge&logo=react-query&logoColor=ff4154)](https://tanstack.com/query/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f172a?style=for-the-badge)](./LICENSE)

**[Live Demo](https://alpha-commerce-dashboard.vercel.app/)** • **[GitHub](https://github.com/codergautam900/alpha-commerce-dashboard)**

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Feature Matrix](#feature-matrix)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Development](#development)
- [Deployment](#deployment)
- [What Sets It Apart](#what-sets-it-apart)
- [License](#license)

---

## Overview

**Alpha Dashboard** is a sophisticated frontend application designed to feel like a refined SaaS workspace rather than a basic assignment dashboard. It combines a premium landing experience, data-driven analytics, a filter-rich product catalog, and stock-aware purchasing workflows into one cohesive, production-quality interface.

The application integrates with the **DummyJSON Products API** and is optimized for:
- **Product Excellence** — Thoughtful UX with saved views, URL-synced filters, and export capabilities
- **Recruiter Appeal** — Feature-rich implementation showcasing full-stack frontend engineering
- **Production Standards** — Clear architecture, reusable components, comprehensive testing, and persistent state management

---

## Key Features

### 🛍️ Product Management
- **Advanced Filtering** — Multi-category, price range, and text search with URL synchronization
- **Sorting & Pagination** — Sort by name, price, or rating with configurable page size
- **Saved Views** — Persist and recall frequently used filter combinations
- **CSV Export** — Export filtered product lists directly to file
- **Column Customization** — Show, hide, and reorder table columns with persistence
- **Shareable URLs** — Copy filtered views for team walkthroughs and demos

### 📊 Analytics & Monitoring
- **Dashboard Overview** — Cards for catalog size, ratings trends, inventory value, and category health
- **Category Distribution** — Recharts-powered breakdown of product categories
- **Live Updates Feed** — Simulated product events showing real-time activity
- **Sync Status** — Refresh indicators and last-updated timestamps
- **Operations Insights** — Additional KPI summaries and performance storytelling

### 💳 Commerce Workflows
- **Rich Product Pages** — Gallery, metadata, tags, stock status, shipping, warranty details
- **Purchase Planner** — Quantity controls with automatic discount, shipping, tax, and total calculations
- **Shopping Cart** — Persistent cart drawer with item management and checkout summaries
- **Stock Intelligence** — Automatic availability checks and minimum order enforcement

### ✨ User Experience
- **Command Palette** — `Ctrl/Cmd + K` for quick navigation and preset shortcuts
- **Dark Mode** — Persistent theme switching optimized for long sessions
- **Responsive Design** — Full mobile support with preserved workspace aesthetic
- **Error Boundaries** — Graceful handling of loading, empty, and error states
- **Accessibility** — WCAG compliance with improved contrast in dark mode

---

## Feature Matrix

### Core Capabilities

| Feature | Status | Implementation |
|---------|--------|-----------------|
| **Product Search** | ✅ | URL-synced, debounced, with highlighting |
| **Advanced Filters** | ✅ | Category, price range, rating, tags |
| **Sorting** | ✅ | Name, price, rating with direction toggle |
| **Pagination** | ✅ | Configurable items per page (12 default) |
| **Saved Views** | ✅ | localStorage persistence with labeled filters |
| **CSV Export** | ✅ | Download active catalog view as file |
| **Column Controls** | ✅ | Drag-reorder and show/hide per column |
| **Category Analytics** | ✅ | Recharts distribution chart |
| **Purchase Planner** | ✅ | Full pricing breakdown with real-time calculations |
| **Shopping Cart** | ✅ | Persistent drawer with update/remove actions |
| **Dark Mode** | ✅ | System preference + manual toggle |
| **Mobile Responsive** | ✅ | Desktop-first with mobile-optimized layouts |

---

## Technology Stack

### Frontend Framework
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI component library | 19.x |
| **TypeScript** | Type-safe development | 5.x |
| **Vite** | Build tool and dev server | 8.x |
| **Tailwind CSS** | Utility-first styling | 3.x |

### Data & State Management
| Technology | Purpose |
|-----------|---------|
| **TanStack Query (React Query)** | Server state caching and synchronization |
| **Axios** | HTTP client for API requests |
| **localStorage** | Client-side persistence (cart, theme, filters) |
| **React Router** | Client-side routing |

### UI & Visualization
| Technology | Purpose |
|-----------|---------|
| **Recharts** | Data visualization and charts |
| **Lucide React** | Icon system |
| **Radix UI** | Accessible component primitives |

### Quality & Testing
| Technology | Purpose |
|-----------|---------|
| **ESLint** | Code quality and style enforcement |
| **TypeScript Strict Mode** | Enhanced type safety |
| **Node Test Runner** | Utility function testing |

---

## Project Structure

```
alpha-dashboard/
├── README.md
├── LICENSE
├── docs/
│   └── screenshots/           # Feature showcase images
│
└── client/                     # Frontend application root
    ├── public/                 # Static assets
    ├── src/
    │   ├── app/               # Application setup & context
    │   │   ├── AppRouter.tsx      # Route definitions
    │   │   ├── AppErrorBoundary.tsx
    │   │   ├── ThemeProvider.tsx   # Dark mode context
    │   │   ├── CartProvider.tsx    # Shopping cart context
    │   │   └── LiveUpdatesProvider.tsx
    │   │
    │   ├── components/        # Reusable UI components
    │   │   ├── analytics/     # Chart and metric components
    │   │   ├── layout/        # Navigation and shell
    │   │   ├── products/      # Product-specific components
    │   │   └── ui/            # Generic UI components
    │   │
    │   ├── pages/             # Route-level page components
    │   │   ├── DashboardPage.tsx
    │   │   ├── ProductsPage.tsx
    │   │   ├── ProductDetailsPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   └── WelcomePage.tsx
    │   │
    │   ├── hooks/             # Custom React hooks
    │   │   ├── useProductsCatalog.ts
    │   │   ├── useProductFilters.ts
    │   │   ├── useSavedProductViews.ts
    │   │   └── useDashboardAnalytics.ts
    │   │
    │   ├── services/          # API integration
    │   │   ├── http.ts        # Axios instance
    │   │   └── products.ts    # Product API calls
    │   │
    │   ├── types/             # TypeScript interfaces
    │   │   ├── product.ts
    │   │   ├── cart.ts
    │   │   └── liveUpdates.ts
    │   │
    │   └── utils/             # Helper functions
    │       ├── formatters.ts  # Date, price formatting
    │       ├── products.ts    # Product transformations
    │       ├── cart.ts        # Pricing calculations
    │       └── analytics.ts   # Analytics helpers
    │
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    └── vercel.json            # SPA routing config
```

### Architecture Highlights

- **Component Organization** — Feature-based grouping (analytics, layout, products, ui) for easy navigation
- **Custom Hooks** — Extract complex logic for reusability and testability
- **Service Layer** — Centralized API calls via `http.ts` and `products.ts`
- **Type Safety** — Comprehensive TypeScript interfaces in `types/` folder
- **Utility Functions** — Pure, testable helper functions for data transformations
- **Context API** — Global state for theme, cart, and live updates

---

## Getting Started

### Prerequisites
- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** 9+ (included with Node)

### Installation

1. **Clone and navigate**
   ```bash
   git clone https://github.com/codergautam900/alpha-commerce-dashboard.git
   cd alpha-dashboard
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Visit `http://localhost:5173`
   - Default API points to DummyJSON public endpoint

### Environment Configuration

Create a `.env` file in `client/` to customize the API endpoint:

```env
VITE_API_BASE_URL=https://dummyjson.com
VITE_APP_NAME=Alpha Dashboard
```

A template is available at `client/.env.example`.

---

## API Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Welcome landing page | Public |
| `/login` | Login screen | Public |
| `/dashboard` | Analytics overview | Private* |
| `/products` | Product catalog with filters | Private* |
| `/products/:productId` | Product detail and purchase | Private* |
| `/*` | 404 fallback | Public |

*Styled as private but accessible (no auth implementation)

---

## Development

### Available Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint checks
npm run lint

# Run unit tests
npm run test
```

### Code Quality Workflow

Before committing changes:

```bash
# Run all checks
npm run test
npm run lint
npm run build
```

### Key Implementation Details

- **State Management** — Query strings preserve filter state for shareable URLs
- **Data Caching** — TanStack Query handles server state and prevents unnecessary refetches
- **Persistence** — localStorage used for cart, theme, saved views, and column preferences
- **Responsive Design** — Tailwind's responsive utilities provide mobile-first layouts
- **Type Coverage** — No implicit `any` types; strict TypeScript mode enforced

---

## Deployment

### Vercel (Recommended)

The project is pre-configured for Vercel deployment:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import repository
   - Use these settings:
     - **Framework Preset:** Vite
     - **Root Directory:** `client`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Deploy**
   - Vercel automatically handles SPA routing via `vercel.json`
   - Routes like `/products/12` work seamlessly after deployment

### Manual Production Build

```bash
cd client
npm run build
npm run preview

# Output in: client/dist/
```

---

## What Sets It Apart

### Product Design
- Polished control-room aesthetic with soft gradients and premium spacing
- Intentional UX: saved views, shareable filters, export workflows
- Stock-aware purchasing with real-time calculations

### Engineering Quality
- Clear route structure and component hierarchy
- Reusable components across features
- Utility-level testing for critical functions
- Type-safe throughout with TypeScript strict mode
- Responsive design preserving visual character on mobile

### Portfolio Value
- Demonstrates full-stack frontend thinking (routing, state, API, styling, UX)
- Multiple areas for reviewer inspection: filters, cart math, analytics, persistence
- Production-grade code structure and documentation
- Ready-to-demo interface for technical interviews

---

## Performance Optimizations

- **Code Splitting** — Vite automatic chunk splitting for faster initial loads
- **Query Caching** — TanStack Query prevents duplicate API calls
- **Debounced Search** — Search input debouncing reduces unnecessary queries
- **Lazy Loading** — Route-based code splitting via React Router
- **CSS Optimization** — Tailwind PurgeCSS removes unused styles in production

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Contributing

For feature requests or bug reports, please open an issue on GitHub.

Contribution guidelines:
1. Create a feature branch
2. Keep commits focused and descriptive
3. Ensure all checks pass: `npm run test && npm run lint && npm run build`
4. Submit pull request with clear description

---

## Troubleshooting

### App won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build fails
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check lint errors
npm run lint
```

### API returns 404
- Verify `VITE_API_BASE_URL` is set correctly
- Check browser console for network errors
- Ensure DummyJSON API is accessible

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

You are free to use, modify, and distribute this project, even for commercial purposes.

---

<div align="center">

### Built by [Gautam Sagar](https://github.com/codergautam900)

📧 [gateaspirant8650@gmail.com](mailto:gateaspirant8650@gmail.com) • 📱 [7900503595](tel:7900503595)

---

⭐ If you found this helpful, please consider giving it a star on GitHub!

</div>
