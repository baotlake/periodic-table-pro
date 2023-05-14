import { View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import classNames from "classnames"
import { reportEvent } from '../../utils/analytics'

import {
  BottomNavigation,
  ZoomablePT,
  PanPinch,
  PeriodicTable,
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

  return (
    <View className={classNames('index-page', theme)}>
      <MenuHomeLayout themeClass={theme}>
        <AddGuide themeClass={theme} />
        {/* <ZoomablePT /> */}
        <PanPinch
          value={1}
          min={0.75}
          max={20}
          themeClass={theme}
        >
          <PeriodicTable />
        </PanPinch>
        <BottomNavigation themeClass={theme} />
      </MenuHomeLayout>
    </View>
  )
}
