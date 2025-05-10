import { View, Text, Button } from '@tarojs/components'
import classNames from 'classnames'
import { Guide, MenuPageLayout, VideoDemo } from '@packages/components'
import useShareMessage from '../../hooks/useShareMessage'
import { useAtom } from 'jotai'
import { STATIC_BASE, themeModeState } from '@packages/components'
import './index.scss'

export default function GuidePage() {
  const [theme] = useAtom(themeModeState)
  useShareMessage()

  return (
    <View className={classNames('guide-page', theme)}>
      <MenuPageLayout className={theme} title="使用说明">
        <Guide />
      </MenuPageLayout>
    </View>
  )
}
