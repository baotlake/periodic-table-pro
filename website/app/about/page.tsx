import { Metadata } from 'next'
import { MenuPageLayout, About } from '@packages/components'

export const metadata: Metadata = {
  title: '关于 - 元素周期表PRO 高颜值化学必备小工具',
  description:
    '元素周期表Pro —— 高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。',
}
export default function AboutPage() {
  return (
    <div>
      <MenuPageLayout title="关于">
        <About />
      </MenuPageLayout>
    </div>
  )
}
