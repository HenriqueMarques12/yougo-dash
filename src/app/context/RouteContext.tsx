'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { usePathname } from 'next/navigation'

// Define o tipo do valor do contexto
const RouteContext = createContext<string | undefined>(undefined)

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [currentRoute, setCurrentRoute] = useState('')

  useEffect(() => {
    setCurrentRoute(pathname)
  }, [pathname])

  return (
    <RouteContext.Provider value={currentRoute}>
      {children}
    </RouteContext.Provider>
  )
}

export const useRoute = () => {
  const context = useContext(RouteContext)
  if (context === undefined) {
    throw new Error('useRoute deve ser usado dentro de um RouteProvider')
  }
  return context
}
