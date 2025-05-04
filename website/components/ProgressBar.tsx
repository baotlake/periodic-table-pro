'use client'

import { use, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { CompatContext } from '@packages/components'

NProgress.configure({
  showSpinner: false,
})
export default function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { routerEvents } = use(CompatContext)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a[href], a[href] *')) {
        NProgress.start()
      }
    }

    const handleRouterChange = () => {
      NProgress.start()
    }

    document.addEventListener('click', handleClick)
    routerEvents?.on('changeStart', handleRouterChange)
    return () => {
      document.removeEventListener('click', handleClick)
      routerEvents?.off('changeStart', handleRouterChange)
    }
  }, [routerEvents])

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])
  return null
}
