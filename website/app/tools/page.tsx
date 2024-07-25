'use client'
import { Metadata } from 'next'
import { MenuPageLayout, Tools } from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '工具栏 - 元素周期表PRO 高颜值化学必备小工具',
  }
}

export default function ToolsPage() {
  const [themeMode] = useAtom(themeModeState)

  return (
    <div>
      <MenuPageLayout themeClass={themeMode} title="工具栏">
        <Tools themeClass={themeMode} />
      </MenuPageLayout>
    </div>
  )
}
