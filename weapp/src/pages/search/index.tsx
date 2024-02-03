import { View } from '@tarojs/components'
import classNames from 'classnames'
import {
  NavigationHeader,
  Search,
  PremiumFeatureGuard,
} from '@periodic-table-pro/components'
import useShareMessage from '../../hooks/useShareMessage'
import { useAtom } from 'jotai'
import {
  menuButtonClientRect,
  themeModeState,
} from '@periodic-table-pro/components/recoil/atom'
import './index.scss'

export default function SearchPage() {
  useShareMessage()

  const [themeMode] = useAtom(themeModeState)
  const [menuRect] = useAtom(menuButtonClientRect)

  return (
    <View className={classNames('search-page', themeMode)}>
      <NavigationHeader themeClass={themeMode} title="搜索" />
      <View
        style={{
          paddingTop: menuRect.bottom + 8 + 'px',
        }}
      >
        {/* <PremiumFeatureGuard 
          themeClass={theme}
          featureKey={StorageKey.searchFeature} 
        /> */}
        <Search themeClass={themeMode} />
      </View>
    </View>
  )
}
