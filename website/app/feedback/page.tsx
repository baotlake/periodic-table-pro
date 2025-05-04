import { Metadata } from 'next'
import { MenuPageLayout, Feedback } from '@packages/components'

export const metadata: Metadata = {
  title: '意见反馈 - 元素周期表PRO 高颜值化学必备小工具',
  description:
    '元素周期表Pro —— 高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。',
}
export default function FeedbackPage() {
  return (
    <div>
      <MenuPageLayout title="意见反馈">
        <Feedback chatPage="https://tawk.to/periodictablepro" />
      </MenuPageLayout>
    </div>
  )
}
