import Head from 'next/head'
import Image from 'next/image'
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
import { useRecoilState } from 'recoil'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

// Only works with SSR
export default function Redirect() {
  const [theme] = useRecoilState(themeModeState)

  const router = useRouter()

  useEffect(() => {
    const path = weappPath2Web(location.href)
    router.replace(path)
  }, [router])

  return (
    <>
      <Head>
        <title>元素周期表表PRO - 高颜值化学必备小工具</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classNames('index-page', theme)}>
        <MenuHomeLayout themeClass={theme}>
          <ZoomablePT />
          <BottomNavigation themeClass={theme} />

          <AutoDisplayPropertiesModal />
          <AutoZoomModal />
        </MenuHomeLayout>
      </div>
    </>
  )
}
