import Head from 'next/head'
import { MenuPageLayout, About } from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function AboutPage() {
  const [themeMode] = useAtom(themeModeState)

  return (
    <>
      <Head>
        <title>关于 - 元素周期表PRO 高颜值化学必备小工具</title>
      </Head>
      <div>
        <MenuPageLayout themeClass={themeMode} title="关于">
          <About themeClass={themeMode} />
        </MenuPageLayout>
      </div>
    </>
  )
}
