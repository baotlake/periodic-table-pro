import { Metadata } from 'next'
import { MenuPageLayout, Setting } from '@packages/components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '设置 - 元素周期表PRO 高颜值化学必备小工具',
  }
}

export default function ToolsPage() {
  return (
    <div>
      <MenuPageLayout title="设置">
        <Setting />
      </MenuPageLayout>
    </div>
  )
}
