import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout } from '../../components/Layout'
import useThemeMode from '../../hooks/useThemeMode'
import useSHareMessage from '../../hooks/useShareMessage'

import logoImg from '../../assets/images/logo.png'
import githubSvg from '../../assets/icons/github.svg'

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
          来元素周期表Pro，
          寻找与探索有关化学的有趣知识。
        </View>

        <View className='section'>
          元素周期表Pro是一款由欢洋个人主导开发的原创的化学元素周期表工具小程序。
        </View>

        <View className='section'>
          <Image className='icon' src={githubSvg} />
          <Text userSelect className='text'>
            https://github.com/BaotLake/periodic-table-pro
          </Text>
        </View>

        <View className='section'>
          如果我们的某些内容无意侵犯您了的合法权益，请您通过客服联系我们进行移除。
        </View>

        <View className='section'>
          <View>公众号可自由关联「元素周期表Pro」</View>
          <Text userSelect>
            AppID: wx20e649abe5acb0bc
          </Text>
        </View>
      </MenuPageLayout>
    </View>
  )
}
