import Head from 'next/head'
import { MenuPageLayout, Like } from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function ToolsPage() {
  const [themeMode] = useAtom(themeModeState)

  return (
    <>
      <Head>
        <title>支持 - 元素周期表PRO 高颜值化学必备小工具</title>
      </Head>
      <div>
        <MenuPageLayout themeClass={themeMode} title="支持">
          <Like themeClass={themeMode} />
        </MenuPageLayout>
      </div>
    </>
  )
}
