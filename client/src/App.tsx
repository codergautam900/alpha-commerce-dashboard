import './App.css'
import { ComparisonProvider } from './app/ComparisonProvider'
import KeyboardShortcuts from './components/ui/KeyboardShortcuts'
import { AppRouter } from './app/AppRouter'

function App() {
  return (
    <ComparisonProvider>
      <div className="app-shell">
        <AppRouter />
        <KeyboardShortcuts />
      </div>
    </ComparisonProvider>
  )
}

export default App
