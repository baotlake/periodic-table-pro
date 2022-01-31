
import { View, Image, Button } from "@tarojs/components"
import classNames from "classnames"
import { MenuPageLayout } from '../../components/Layout'
import useThemeMode from "../../hooks/useThemeMode"

import feedbackImg from '../../assets/images/feedback.png'

import './index.scss'

export default function FeedbackPage() {

  const [theme] = useThemeMode()

  return (
    <View className={classNames('feedback-page', theme)}>
      <MenuPageLayout
        themeClass={theme}
        title='意见反馈'
      >
        <View className='card'>
          <View className='top-container'>
            <Image className='image' src={feedbackImg} />
            <View className='text'>
              如果您在使用过程中发现了错误，或是您对我们有任何建议，您都可以在这里给我们提出反馈，我们非常愿意倾听您对「元素周期表PRO」的建议。
            </View>
          </View>
          <View className='bottom-container'>
            <Button openType='feedback' type='primary' className='button'>意见反馈</Button>
            <Button openType='contact' type='default' className='button'>联系客服</Button>
          </View>
        </View>
      </MenuPageLayout>
    </View>
  )
}
