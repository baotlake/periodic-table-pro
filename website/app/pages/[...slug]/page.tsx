import { Metadata } from 'next'
import { Suspense } from 'react'
import classNames from 'classnames'
import {
  MenuHomeLayout,
  ZoomablePT,
  BottomNavigation,
  weappPath2Web,
  AutoDisplayPropertiesModal,
  AutoZoomModal,
} from '@periodic-table-pro/components'
import Redirect from './Redirect'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '元素周期表表PRO - 高颜值化学必备小工具',
    description:
      '元素周期表Pro —— 高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。',
    icons: '/favicon.ico',
    viewport: 'width=device-width, initial-scale=1',
  }
}

export async function generateStaticParams() {
  return [{ slug: ['index'] }]
}

// Only works with SSR
export default function Page() {
  return (
    <div className={classNames('index-page')}>
      <MenuHomeLayout>
        <ZoomablePT />
        <BottomNavigation />

        <AutoDisplayPropertiesModal />
        <AutoZoomModal />
      </MenuHomeLayout>

      <Suspense>
        <Redirect />
      </Suspense>
    </div>
  )
}
