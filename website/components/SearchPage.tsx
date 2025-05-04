'use client'

import { Search } from '@packages/components'
import { useRouter, usePathname } from 'next/navigation'

export default function SearchPage() {
  const router = useRouter()
  const pathname = usePathname()

  const handleSearchChange = (q: string) => {
    const u = new URL(pathname || '/search', location.origin)
    u.searchParams.set('q', q)
    router.replace(u.href)
  }

  return <Search onSearchChange={handleSearchChange} />
}
