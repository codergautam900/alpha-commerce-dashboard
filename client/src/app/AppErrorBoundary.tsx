import { Component, type ErrorInfo, type ReactNode } from 'react'
import StatePanel from '../components/ui/StatePanel'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  hasError: boolean
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled application error:', error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center px-4 py-10">
          <div className="w-full max-w-2xl">
            <StatePanel
              title="Something went wrong"
              description="The dashboard hit an unexpected runtime error. Reload the app to restore a clean state."
              tone="error"
              action={
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Reload dashboard
                </button>
              }
            />
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
