import { View, Image, Button } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout } from '@packages/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@packages/components'
import feedbackImg from '../../assets/images/feedback.png'
import './index.scss'

const PLATFORM = process.env.PLATFORM

export default function FeedbackPage() {
  const [theme] = useAtom(themeModeState)

  return (
    <View className={classNames('feedback-page', theme)}>
      <MenuPageLayout className={theme} title="意见反馈">
        <View className="card">
          <View className="top-container">
            <Image className="image" src={feedbackImg} />
            <View className="text">
              如果您在使用过程中发现了错误，或是您对我们有任何建议，您都可以在这里给我们提出反馈，我们非常愿意倾听您对「元素周期表PRO」的建议。
            </View>
          </View>
          <View className="bottom-container">
            {['weapp', 'qq'].includes(PLATFORM) && (
              <Button openType="feedback" type="primary" className="button">
                意见反馈
              </Button>
            )}
            {['weapp'].includes(PLATFORM) && (
              <Button openType="contact" type="default" className="button">
                联系客服
              </Button>
            )}
            {['alipay'].includes(PLATFORM) && false}
          </View>
        </View>
      </MenuPageLayout>
    </View>
  )
}
