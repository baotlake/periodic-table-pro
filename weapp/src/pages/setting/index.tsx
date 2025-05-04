import { View } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout, Setting } from '@packages/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@packages/components'
import './index.scss'

export default function SettingPage() {
  const [theme] = useAtom(themeModeState)

  return (
    <View className={classNames('setting-page', theme)}>
      <MenuPageLayout className={theme} title="设置">
        <Setting />
      </MenuPageLayout>
    </View>
  )
}
