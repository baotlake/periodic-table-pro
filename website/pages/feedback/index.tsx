import Head from 'next/head'
import { MenuPageLayout, Feedback } from '@periodic-table-pro/components'
import { useRecoilState } from 'recoil'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

export default function FeedbackPage() {
  const [themeMode] = useRecoilState(themeModeState)

  return (
    <>
      <Head>
        <title>意见反馈 - 元素周期表PRO 高颜值化学必备小工具</title>
      </Head>
      <div>
        <MenuPageLayout themeClass={themeMode} title="意见反馈">
          <Feedback themeClass={themeMode} />
        </MenuPageLayout>
      </div>
    </>
  )
}
