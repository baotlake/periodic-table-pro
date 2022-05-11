import { useState, useRef, useReducer, useEffect } from 'react'
import { View, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import classNames from "classnames"
import { reportEvent } from '../../utils/analytics'

import PeriodicTable, { initState, reducer, PeriodicTableContext } from '../../components/PeriodicTable'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import { BottomNavigation } from '../../components/BottomNavigation'
import { PersistentDrawer } from "../../components/MenuDrawer"
import { AddGuide } from "../../components/Guide"
import useMenuButtonClientRect from "../../hooks/useMenuButtonClientRect"
import useTouchZoom from "../../hooks/useTouchZoom"
import useThemeMode from '../../hooks/useThemeMode'
import useShareMessage from '../../hooks/useShareMessage'
import { StorageKey } from '../../types/storage'
import { getTrendData } from '../../utils/trend'

import './index.scss'

export default function Index() {

  const rect = useMenuButtonClientRect()
  const [theme,] = useThemeMode()
  useShareMessage({ theme })
  const [menuVisible, setMenuVisible] = useState(false)
  const scalableViewRef = useRef<HTMLElement>()
  const {
    zoomRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel
  } = useTouchZoom({ rate: 0.5, min: 0.5, max: 3 })

  useEffect(() => {
    zoomRef.scrollView = scalableViewRef.current
    zoomRef.onZoom = (zoom: number) => {
      const view = scalableViewRef.current
      if (view) {
        view.style.fontSize = 16 * zoom + 'px'

        const { startZoom, centreX, centreY, startScrollX, startScrollY } = zoomRef
        view.scrollLeft = startScrollX + (startScrollX + centreX) * (zoom - startZoom)
        view.scrollTop = startScrollY + (startScrollY + centreY) * (zoom - startZoom)
      }
    }
    zoomRef.onTouchEnd = (zoom: number) => {
      reportEvent("zoom", {
        "value": Math.round(zoom * 10)
      })
    }
  }, [zoomRef])

  const [state, dispatch] = useReducer(reducer, initState)

  useDidShow(() => {
    const displayProperty = Taro.getStorageSync(StorageKey.displayProperty)
    // console.log('displayProperty: ', displayProperty)
    dispatch({
      type: 'setDisplayProperty',
      payload: {
        displayProperty,
      }
    })
    const trendData = getTrendData(displayProperty)
    dispatch({
      type: 'setTrendData',
      payload: {
        trendData: trendData
      }
    })
  })

  return (
    <View className={classNames('index-page', theme)}>
      <NavigationBar>
        <View className='navigation-button-wrapper'>
          <Button
            className={classNames('nav-btn', {
              menu: !menuVisible,
              close: menuVisible
            })}
            onClick={() => {
              setMenuVisible(!menuVisible)
              !menuVisible && reportEvent("menu", {})
            }}
          />
        </View>
      </NavigationBar>

      <AddGuide themeClass={theme} />

      <PeriodicTableContext.Provider value={{ state: state, dispatch: dispatch }}>
        <View
          ref={scalableViewRef}
          className='pt-container'
          style={{
            paddingTop: rect.bottom + 8 + 'px',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <PeriodicTable themeClass={theme} />
        </View>
      </PeriodicTableContext.Provider>

      <PersistentDrawer
        themeClass={theme}
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <BottomNavigation  themeClass={theme} />
    </View>
  )
}
