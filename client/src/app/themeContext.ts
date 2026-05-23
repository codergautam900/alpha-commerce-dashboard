import { createContext } from 'react'

export type Theme = 'dark' | 'light'

export type ThemeContextValue = {
  isDarkMode: boolean
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
