import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageLoader from '../components/ui/PageLoader'

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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
