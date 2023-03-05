import { View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import classNames from "classnames"
import { reportEvent } from '../../utils/analytics'

import {
  BottomNavigation,
  ZoomablePT,
  setDisplayProperty,
  setTrendData,
  Context,
  AddGuide,
  MenuHomeLayout,
} from '@periodic-table-pro/components'
import { usePageMeta } from '../../hooks'
import useShareMessage from '../../hooks/useShareMessage'
import { useContext } from 'react'
import { StorageKey } from '../../types/storage'
import { getTrendData } from '../../utils/trend'

import './index.scss'

export default function Index() {
  // usePageMeta()
  const {
    state: {
      theme: { mode: theme },
    },
    dispatch,
  } = useContext(Context)

  useShareMessage()

  useDidShow(() => {
    const displayProperty = Taro.getStorageSync(StorageKey.displayProperty)
    // console.log('displayProperty: ', displayProperty)
    dispatch && dispatch(setDisplayProperty(displayProperty))
    const trendData = getTrendData(displayProperty)
    dispatch && dispatch(setTrendData(trendData))
  })

  return (
    <View className={classNames('index-page', theme)}>
      <MenuHomeLayout themeClass={theme}>
        <AddGuide themeClass={theme} />
        <ZoomablePT />
        <BottomNavigation themeClass={theme} />
      </MenuHomeLayout>
    </View>
  )
}
