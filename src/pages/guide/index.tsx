import { View, Text, Button } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout } from '../../components/Layout'
import useThemeMode from '../../hooks/useThemeMode'
import useShareMessage from '../../hooks/useShareMessage'

import './index.scss'

export default function GuidePage() {

  const [theme] = useThemeMode()
  useShareMessage()

  return (
    <View className={classNames('guide-page', theme)}>
      <MenuPageLayout
        themeClass={theme}
        title='使用说明'
      >
        <View className='content'>
          <View className='paragraph'>
            <Text style={{ fontWeight: 'bold' }}>2022 </Text>
            新版「元素周期表PRO」来啦！
          </View>
          <View className='paragraph'>
            全新的设计，更好看的界面，更绚丽的配色，还有更强大的功能！
          </View>
          <View className='paragraph'>
            更好的屏幕适配，手机、平板iPad和桌面(Windows、Mac)都有更好的使用体验！
          </View>
          <View className='paragraph'>
            最重要的是，还有更多好用的功能在到来的路上，如果你喜欢「元素周期表PRO」，请帮助我们
            <Button
              size='mini'
              openType='share'
              style={{
                verticalAlign: '-1.5ex',
                padding: '0 0.6em',
                margin: '0 0.2em',
              }}
            >转发</Button>
            给更多需要的人。
          </View>
        </View>
      </MenuPageLayout>
    </View>
  )
}
