import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './themeContext'

const STORAGE_KEY = 'alpha-dashboard:theme'
const DARK_THEME_COLOR = '#020617'
const LIGHT_THEME_COLOR = '#0f172a'

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const storedTheme = window.localStorage.getItem(STORAGE_KEY)

    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    const themeColorMeta = document.querySelector('meta[name="theme-color"]')

    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)

    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        'content',
        theme === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR,
      )
    }
  }, [theme])

  const value = useMemo(
    () => ({
      isDarkMode: theme === 'dark',
      theme,
      toggleTheme: () => {
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
