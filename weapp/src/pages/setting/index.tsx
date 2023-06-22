import { View } from '@tarojs/components'
import classNames from 'classnames'
import { MenuPageLayout, Setting } from '@periodic-table-pro/components'
import { useRecoilState } from 'recoil'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'
import './index.scss'

export default function SettingPage() {
  const [theme] = useRecoilState(themeModeState)

  return (
    <View className={classNames('setting-page', theme)}>
      <MenuPageLayout themeClass={theme} title="设置">
        <Setting />
      </MenuPageLayout>
    </View>
  )
}
