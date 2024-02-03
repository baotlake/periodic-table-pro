import { View } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout, Setting } from '@periodic-table-pro/components'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'
import './index.scss'

export default function SettingPage() {
  const [theme] = useAtom(themeModeState)

  return (
    <View className={classNames('setting-page', theme)}>
      <MenuPageLayout themeClass={theme} title="设置">
        <Setting />
      </MenuPageLayout>
    </View>
  )
}
