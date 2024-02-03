import Head from 'next/head'
import { MenuPageLayout, Tools } from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function ToolsPage() {
  const [themeMode] = useAtom(themeModeState)

  return (
    <>
      <Head>
        <title>工具栏 - 元素周期表PRO 高颜值化学必备小工具</title>
      </Head>
      <div>
        <MenuPageLayout themeClass={themeMode} title="工具栏">
          <Tools themeClass={themeMode} />
        </MenuPageLayout>
      </div>
    </>
  )
}
