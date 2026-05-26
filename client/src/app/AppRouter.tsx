import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import PageLoader from '../components/ui/PageLoader'
import WelcomePage from '../pages/WelcomePage'
import { RequireAuth, RequireRole } from './RouteGuards'

// Route-level lazy loading keeps the initial dashboard bundle lighter.
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const ProductDetailsPage = lazy(() => import('../pages/ProductDetailsPage'))
const ProductsPage = lazy(() => import('../pages/ProductsPage'))

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader message="Loading route..." />}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route
            path="/dashboard"
            element={
              <RequireRole role="admin">
                <DashboardPage />
              </RequireRole>
            }
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
