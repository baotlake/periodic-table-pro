'use client'

import { Metadata } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import classNames from 'classnames'
// import styles from '../styles/Home.module.css'
import {
  MenuHomeLayout,
  ZoomablePT,
  BottomNavigation,
  weappPath2Web,
  AutoDisplayPropertiesModal,
  AutoZoomModal,
} from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '元素周期表表PRO - 高颜值化学必备小工具',
    description:
      '元素周期表Pro —— 高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。',
    icons: '/favicon.ico',
    viewport: 'width=device-width, initial-scale=1',
  }
}

// Only works with SSR
export default function Redirect() {
  const [theme] = useAtom(themeModeState)

  const router = useRouter()

  useEffect(() => {
    const path = weappPath2Web(location.href)
    router.replace(path)
  }, [router])

  return (
    <div className={classNames('index-page', theme)}>
      <MenuHomeLayout themeClass={theme}>
        <ZoomablePT />
        <BottomNavigation themeClass={theme} />

        <AutoDisplayPropertiesModal />
        <AutoZoomModal />
      </MenuHomeLayout>
    </div>
  )
}
