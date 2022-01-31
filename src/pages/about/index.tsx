import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout } from '../../components/Layout'
import useThemeMode from '../../hooks/useThemeMode'
import logoImg from '../../assets/images/logo.png'
import useSHareMessage from '../../hooks/useShareMessage'

import './index.scss'


export default function AboutPage() {
  const [theme] = useThemeMode()

  useSHareMessage()

  return (
    <View className={classNames('about-page', theme)}>
      <MenuPageLayout
        themeClass={theme}
        title='关于'
      >
        <View className='profile'>
          <Image className='logo' src={logoImg}></Image>
          <View className='name'>元素周期表PRO</View>
        </View>

        <View className='section'>
          欢迎来寻找与探索有关化学的有趣知识。
        </View>

        <View className='section'>

        </View>

        <View className='section'>
          如果我们的某些内容无意侵犯您了的合法权益，请您通过客服联系我们进行移除。
        </View>

        <View className='section'>
          <View>关联「元素周期表PRO」</View>
          <Text userSelect>
            AppID: wx20e649abe5acb0bc
          </Text>
        </View>
      </MenuPageLayout>
    </View>
  )
}
