import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import {
  MenuHomeLayout,
  ZoomablePT,
  BottomNavigation,
  weappPath2Web,
} from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function Home() {
  const [theme] = useAtom(themeModeState)

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
        </MenuHomeLayout>
      </div>
    </>
  )
}
