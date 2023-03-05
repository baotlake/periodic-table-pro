import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import {
  Context,
  MenuPageLayout,
} from '@periodic-table-pro/components'
import useShareMessage from '../../hooks/useShareMessage'
import { useContext } from 'react'

import logoImg from '../../assets/images/logo.png'
import githubSvg from '../../assets/icons/github.svg'

import './index.scss'

const PLATFORM = process.env.PLATFORM

export default function AboutPage() {
  const { state: { theme: { mode: theme } } } = useContext(Context)

  useShareMessage()

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
          元素周期表Pro —— 高颜值的化学元素周期表工具小程序。
        </View>

        <View className='section'>
          元素周期表Pro是由「欢洋」独立开发的原创化学元素周期表工具小程序。
        </View>

        <View className='section'>
          <Image className='icon' src={githubSvg} />
          <Text userSelect className='text'>
            https://github.com/baotlake/periodic-table-pro
          </Text>
        </View>

        <View className='section'>
          如果我们的某些内容无意侵犯您了的合法权益，请您通过客服联系我们进行移除。
        </View>
        {
          ['weapp', 'h5'].includes(PLATFORM) &&
          <View className='section'>
            <View>公众号可自由关联「元素周期表Pro」</View>
            <Text userSelect>
              AppID: wx20e649abe5acb0bc
            </Text>
          </View>
        }
      </MenuPageLayout>
    </View>
  )
}
