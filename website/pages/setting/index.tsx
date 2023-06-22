import Head from 'next/head'
import { MenuPageLayout, Setting } from '@periodic-table-pro/components'
import { useRecoilState } from 'recoil'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function ToolsPage() {
  const [themeMode] = useRecoilState(themeModeState)

  return (
    <>
      <Head>
        <title>设置 - 元素周期表PRO 高颜值化学必备小工具</title>
      </Head>
      <div>
        <MenuPageLayout themeClass={themeMode} title="设置">
          <Setting />
        </MenuPageLayout>
      </div>
    </>
  )
}
