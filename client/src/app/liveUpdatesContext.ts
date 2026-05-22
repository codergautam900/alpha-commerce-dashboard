import { createContext } from 'react'
import type { LiveUpdateEvent } from '../types/liveUpdates'

export type LiveUpdatesContextValue = {
  connectionStatus: 'connecting' | 'connected'
  lastEventAt: number
  recentEvents: LiveUpdateEvent[]
}

export const LiveUpdatesContext = createContext<LiveUpdatesContextValue | null>(
  null,
)
