import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout, About } from '@packages/components'
import useShareMessage from '../../hooks/useShareMessage'

import logoImg from '../../assets/images/logo.png'
import githubSvg from '../../assets/icons/github.svg'

import './index.scss'
import { useAtom } from 'jotai'
import { themeModeState } from '@packages/components'

const PLATFORM = process.env.PLATFORM

export default function AboutPage() {
  const [theme] = useAtom(themeModeState)

  useShareMessage()

  return (
    <View className={classNames('about-page', theme)}>
      <MenuPageLayout className={theme} title="关于">
        <About />
      </MenuPageLayout>
    </View>
  )
}
