'use client'

import { createContext, PropsWithChildren } from 'react'

if (process.env.PLATFORM === 'next') {
  var { useRouter } =
    require('next/navigation') as typeof import('next/navigation')
}

export const CompatContext = createContext({
  router: null as ReturnType<typeof useRouter> | null,
})

export let router: ReturnType<typeof useRouter>

type Props = PropsWithChildren<{}>
export default function Provider({ children }: Props) {
  router = useRouter()

  return (
    <CompatContext.Provider value={{ router }}>
      {children}
    </CompatContext.Provider>
  )
}
