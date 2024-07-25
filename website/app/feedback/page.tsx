'use client'

import { Metadata } from 'next'
import { MenuPageLayout, Feedback } from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export const metadata: Metadata = {
  title: '意见反馈 - 元素周期表PRO 高颜值化学必备小工具',
  description:
    '元素周期表Pro —— 高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。',
}
export default function FeedbackPage() {
  const [themeMode] = useAtom(themeModeState)

  return (
    <div>
      <MenuPageLayout themeClass={themeMode} title="意见反馈">
        <Feedback
          themeClass={themeMode}
          chatPage="https://tawk.to/periodictablepro"
        />
      </MenuPageLayout>
    </div>
  )
}
