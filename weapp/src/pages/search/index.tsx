import { View } from '@tarojs/components'
import classNames from 'classnames'
import { useContext } from 'react'
import {
  Context,
  NavigationHeader,
  Search,
  PremiumFeatureGuard,
} from '@periodic-table-pro/components'
import useShareMessage from '../../hooks/useShareMessage'

import './index.scss'

export default function SearchPage() {

  useShareMessage()
  const {
    state: {
      theme: { mode: themeMode },
      menuButtonClientRect: menuRect,
    }
  } = useContext(Context)


  return (
    <View className={classNames('search-page', themeMode)}>
      <NavigationHeader
        themeClass={themeMode}
        title="搜索"
      />
      <View
        style={{
          paddingTop: menuRect.bottom + 8 + 'px',
        }}
      >
        {/* <PremiumFeatureGuard 
          themeClass={theme}
          featureKey={StorageKey.searchFeature} 
        /> */}
        <Search
          themeClass={themeMode}
        />
      </View>
    </View>
  )
}
