import Head from 'next/head'
import Image from 'next/image'
import classNames from 'classnames'
import {
  MenuHomeLayout,
  PeriodicTable,
  BottomNavigation,
  PanPinch,
  AutoDisplayPropertiesModal,
  AutoZoomModal,
} from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import {
  periodicTableZoom,
  themeModeState,
} from '@periodic-table-pro/components/recoil/atom'
import { maxPtZoom, minPtZoom } from '@periodic-table-pro/components/config'
import { useEffect } from 'react'
import RedirectModal from '../components/RedirectModal'

export default function Home() {
  const [theme] = useAtom(themeModeState)
  const [zoom] = useAtom(periodicTableZoom)

  return (
    <>
      <Head>
        <title>元素周期表PRO - 高颜值化学必备工具</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={classNames('index-page', theme)}>
        <MenuHomeLayout themeClass={theme}>
          <PanPinch
            value={zoom}
            min={minPtZoom}
            max={maxPtZoom}
            themeClass={theme}
          >
            <PeriodicTable />
          </PanPinch>
          <BottomNavigation themeClass={theme} />

          <AutoDisplayPropertiesModal />
          <AutoZoomModal />
        </MenuHomeLayout>
        {/* <RedirectModal /> */}
      </div>
    </>
  )
}
