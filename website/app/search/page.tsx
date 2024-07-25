'use client'

import { Metadata } from 'next'
import { NavigationHeader, Search } from '@periodic-table-pro/components'
import { useRouter, usePathname } from 'next/navigation'
import classNames from 'classnames/bind'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '搜索 - 元素周期表PRO 高颜值化学必备小工具',
  }
}

export default function SearchPage() {
  const [themeMode] = useAtom(themeModeState)
  const router = useRouter()
  const pathname = usePathname()

  const handleSearchChange = (q: string) => {
    const u = new URL(pathname || '/search', location.origin)
    u.searchParams.set('q', q)
    router.replace(u.href)
  }

  return (
    <div className={cx('search-page', themeMode)}>
      <NavigationHeader title="搜索" />
      <Search themeClass={themeMode} onSearchChange={handleSearchChange} />
    </div>
  )
}
