import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import classNames from 'classnames'
import useThemeMode from '../..//hooks/useThemeMode'
import useShareMessage from '../../hooks/useShareMessage'
import { Search } from '../../components/Search'
import useMenuButtonClientRect from '../../hooks/useMenuButtonClientRect'
import { NavigationHeader } from '../../components/NavigationBar'
import { PremiumFeatureGuard } from '../../components/PremiumFeatureGuard'
import { StorageKey } from '../../types/storage'

import './index.scss'

export default function LikePage() {

  const menuRect = useMenuButtonClientRect()

  useShareMessage()
  const [theme] = useThemeMode()


  return (
    <View className={classNames('search-page', theme)}>
      <NavigationHeader
        themeClass={theme}
        title="搜索"
      />
      <View
        style={{
          paddingTop: menuRect.bottom + 8 + 'px',
        }}
      >
        <PremiumFeatureGuard 
          themeClass={theme}
          featureKey={StorageKey.searchFeature} 
        />
        <Search
          themeClass={theme}
        />
      </View>
    </View>
  )
}
