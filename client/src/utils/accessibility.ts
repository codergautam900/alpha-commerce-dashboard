/**
 * Accessibility and keyboard navigation utilities
 */

// Keyboard shortcut types
export type KeyboardShortcut = {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  callback: () => void
  description: string
}

// Store active shortcuts
const shortcuts: Map<string, KeyboardShortcut> = new Map()

/**
 * Register a keyboard shortcut
 */
export function registerShortcut(shortcut: KeyboardShortcut) {
  const key = `${shortcut.ctrlKey ? 'ctrl+' : ''}${shortcut.shiftKey ? 'shift+' : ''}${shortcut.altKey ? 'alt+' : ''}${shortcut.metaKey ? 'meta+' : ''}${shortcut.key.toLowerCase()}`
  shortcuts.set(key, shortcut)
}

/**
 * Unregister a keyboard shortcut
 */
export function unregisterShortcut(key: string) {
  shortcuts.delete(key)
}

/**
 * Get all registered shortcuts
 */
export function getShortcuts() {
  return Array.from(shortcuts.values())
}

/**
 * Format shortcut key for display
 */
export function formatShortcutKey(shortcut: KeyboardShortcut): string {
  const parts = []
  if (shortcut.metaKey) parts.push('⌘')
  if (shortcut.ctrlKey) parts.push('Ctrl')
  if (shortcut.shiftKey) parts.push('Shift')
  if (shortcut.altKey) parts.push('Alt')
  parts.push(shortcut.key.toUpperCase())
  return parts.join(' + ')
}

/**
 * Add ARIA label to element
 */
export function setAriaLabel(element: HTMLElement, label: string) {
  element.setAttribute('aria-label', label)
}

/**
 * Make element keyboard accessible
 */
export function makeKeyboardAccessible(
  element: HTMLElement,
  onClick: (event: KeyboardEvent) => void,
) {
  if (!element.hasAttribute('role')) {
    element.setAttribute('role', 'button')
  }
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '0')
  }

  element.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick(event)
    }
  })
}

/**
 * Add tooltip accessibility
 */
export function addTooltipAccessibility(trigger: HTMLElement, tooltip: string) {
  trigger.setAttribute('aria-describedby', `tooltip-${Math.random()}`)
  const tooltipElement = document.createElement('span')
  tooltipElement.setAttribute('role', 'tooltip')
  tooltipElement.className = 'sr-only'
  tooltipElement.textContent = tooltip
  trigger.appendChild(tooltipElement)
}

/**
 * Focus management
 */
export function focusElement(element: HTMLElement, smooth = false) {
  if (smooth) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  element.focus()
}

/**
 * Get focusable elements within container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(container.querySelectorAll(selector))
}

/**
 * Trap focus within container
 */
export function trapFocus(container: HTMLElement) {
  const focusables = getFocusableElements(container)
  const firstFocusable = focusables[0]
  const lastFocusable = focusables[focusables.length - 1]

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        event.preventDefault()
        ;(lastFocusable as HTMLElement).focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        event.preventDefault()
        ;(firstFocusable as HTMLElement).focus()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
) {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    announcement.remove()
  }, 1000)
}

/**
 * Skip to main content link
 */
export function createSkipLink() {
  const link = document.createElement('a')
  link.href = '#main-content'
  link.textContent = 'Skip to main content'
  link.className = 'fixed left-0 top-0 -translate-y-full focus:translate-y-0 z-50 bg-slate-900 text-white px-4 py-2 rounded'
  document.body.prepend(link)
}
