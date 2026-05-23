import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import App from './App.tsx'
import { AppErrorBoundary } from './app/AppErrorBoundary'
import { CartProvider } from './app/CartProvider'
import { LiveUpdatesProvider } from './app/LiveUpdatesProvider'
import { ScrollToTop } from './app/ScrollToTop'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
      retry: (failureCount, error) => {
        if (failureCount >= 2) {
          return false
        }

        if (!axios.isAxiosError(error)) {
          return true
        }

        if (!error.response) {
          return true
        }

        return error.response.status >= 500
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LiveUpdatesProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />
              <App />
            </BrowserRouter>
          </CartProvider>
        </LiveUpdatesProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  </StrictMode>,
)
