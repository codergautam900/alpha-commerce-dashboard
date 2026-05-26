import { HelpCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type Shortcut = {
  description: string
  key: string
}

const shortcuts: Shortcut[] = [
  { key: 'Cmd/Ctrl+K', description: 'Open command palette' },
  { key: '?', description: 'Show keyboard shortcuts' },
  { key: 'Home', description: 'Scroll to top' },
  { key: 'Escape', description: 'Close dialogs' },
]

function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return
      }

      if (event.key === '?') {
        event.preventDefault()
        setIsOpen((currentState) => !currentState)
        return
      }

      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close keyboard shortcuts"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 p-6">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50"
            >
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {shortcut.description}
              </span>
              <kbd className="rounded border border-slate-300 bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Press{' '}
          <kbd className="rounded border border-slate-300 bg-slate-100 px-1 dark:border-slate-600 dark:bg-slate-700">
            Escape
          </kbd>{' '}
          to close
        </div>
      </div>
    </div>
  )
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  const tagName = target.tagName.toLowerCase()

  return (
    tagName === 'input' ||
    tagName === 'select' ||
    tagName === 'textarea' ||
    target.isContentEditable
  )
}

export default KeyboardShortcuts
