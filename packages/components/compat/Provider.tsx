'use client'

import { useMemo, createContext, PropsWithChildren } from 'react'
import Emiter from '../utils/emiter'

if (process.env.PLATFORM === 'next') {
  var { useRouter } =
    require('next/navigation') as typeof import('next/navigation')
}

type AppRouterInstance = ReturnType<typeof useRouter>

export let router: ReturnType<typeof useRouter>

export const CompatContext = createContext({
  router: null as AppRouterInstance | null,
  routerEvents: null as Emiter | null,
})

type Props = PropsWithChildren<{}>
export default function CompatProvider({ children }: Props) {
  const r = useRouter()
  const routerEvents = useMemo(() => new Emiter(), [])

  const wrapped: AppRouterInstance = useMemo(() => {
    return {
      ...r,
      push: (...args) => {
        routerEvents.dispatch('changeStart', ...args)
        return r?.push(...args)
      },
      replace: (...args) => {
        routerEvents.dispatch('changeStart', ...args)
        return r?.replace(...args)
      },
    }
  }, [r, routerEvents])

  router = wrapped

  return (
    <CompatContext.Provider value={{ router, routerEvents }}>
      {children}
    </CompatContext.Provider>
  )
}
