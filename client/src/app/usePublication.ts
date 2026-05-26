import { useContext } from 'react'
import { PublicationContext } from './publicationContext'

export function usePublication() {
  const context = useContext(PublicationContext)

  if (!context) {
    throw new Error('usePublication must be used within PublicationProvider')
  }

  return context
}
