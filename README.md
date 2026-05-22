# Alpha Dashboard

Alpha Dashboard is a frontend internship assignment project built as a responsive SaaS-style admin dashboard for product management and analytics.

## Project Structure

- `client/` - React, TypeScript, and Tailwind frontend application

## Features Covered

- Responsive dashboard layout with sidebar, top navigation, main content, and user profile section
- Product listing with image, name, category, price, stock status, rating, search, multi-category filters, sorting, and pagination
- Dedicated product details page with image gallery, description, category, price, stock, and rating
- Analytics dashboard with total products, average rating, total inventory value, and category distribution
- URL state synchronization for search, filters, sorting, and pagination
- Performance optimizations using debounced search, `useMemo`, lazy-loaded routes, and cached server state
- Bonus features: polling-based live refresh and product table column customization

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v3
- React Router DOM
- TanStack Query
- Axios
- Recharts

## Run Locally

```bash
cd client
npm install
npm run dev
```

## Quality Checks

```bash
cd client
npm run lint
npx tsc -b --pretty false
```

## Deployment Notes

- Recommended platform: Vercel
- Set the Vercel project root directory to `client`
- `client/vercel.json` is included so React Router routes work correctly after deployment

## Submission Checklist

- Push the repository to GitHub
- Deploy from the `client` folder on Vercel
- Add the deployed URL and GitHub repository URL in the assignment submission
