import { Metadata } from 'next'
import Image from 'next/image'
import classNames from 'classnames/bind'
import {
  MenuHomeLayout,
  BottomNavigation,
  AutoDisplayPropertiesModal,
  AutoZoomModal,
} from '@periodic-table-pro/components'
import ZoomablePtTable from '@/components/ZoomablePtTable'

const cx = classNames.bind({})

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '元素周期表PRO - 高颜值化学必备工具',
    viewport: 'width=device-width, initial-scale=1',
  }
}

export default function Home() {
  return (
    <div className={cx('')}>
      <MenuHomeLayout>
        <ZoomablePtTable />
        <BottomNavigation />

        <AutoDisplayPropertiesModal />
        <AutoZoomModal />
      </MenuHomeLayout>
      {/* <RedirectModal /> */}
    </div>
  )
}
