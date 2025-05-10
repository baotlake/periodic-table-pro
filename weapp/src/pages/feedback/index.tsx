import { View, Image, Button } from '@tarojs/components'
import classNames from 'classnames'
import { Feedback, MenuPageLayout } from '@packages/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@packages/components'
import './index.scss'

const PLATFORM = process.env.PLATFORM

export default function FeedbackPage() {
  const [theme] = useAtom(themeModeState)

  return (
    <View className={classNames('feedback-page', theme)}>
      <MenuPageLayout className={theme} title="意见反馈">
        <Feedback />
      </MenuPageLayout>
    </View>
  )
}
