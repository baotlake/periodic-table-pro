import { View } from '@tarojs/components'
import classNames from 'classnames'
import {
  Context,
  MenuPageLayout,
  Setting,
} from '@periodic-table-pro/components'
import { useContext } from 'react'

import './index.scss'


export default function SettingPage() {

  const {
    state: { theme: { mode: theme, followSystem } },
    dispatch
  } = useContext(Context)

  return (
    <View className={classNames('setting-page', theme)}>
      <MenuPageLayout
        themeClass={theme}
        title='设置'
      >
        <Setting />
      </MenuPageLayout>
    </View>
  )
}
