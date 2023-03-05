import { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import {
  Context,
  MenuPageLayout,
  DisplayPropertiesModal,
  SettingItem,
  setTheme,
} from '@periodic-table-pro/components'
import {
  propertiesLabels
} from '@periodic-table-pro/data'
import { DisplayProperty } from '../../types/element'
import { StorageKey } from '../../types/storage'
import { reportEvent } from '../../utils/analytics'
import { useContext } from 'react'

// import themeSwitchSvg from '../../assets/icons/theme-switch.svg'
import darkSvg from '../../assets/icons/dark.svg'
import elementBoxSvg from '../../assets/icons/element-box.svg'

import './index.scss'


const themeSwitchData = {
  'dark': 1,
  'light': 2,
  'auto': 3,
}

export default function Setting() {

  const {
    state: { theme: { mode: theme, followSystem } },
    dispatch
  } = useContext(Context)
  // const [theme, setTheme, followSystem, setFollowSystem] = useThemeMode()
  const [displayPropertyModalVisible, setDisplayPropertyModalVisible] = useState(false)
  const [displayProperty, setDisplayProperty] = useState<DisplayProperty>('atomicWeight')

  useEffect(() => {
    const property = Taro.getStorageSync(StorageKey.displayProperty)
    setDisplayProperty(property)
  }, [])

  const handleDisplayPropertyChange = (type: DisplayProperty) => {
    setDisplayPropertyModalVisible(false)
    setDisplayProperty(type)
    // Taro.setStorageSync(StorageKey.displayProperty, type)
    Taro.setStorage({
      key: StorageKey.displayProperty,
      data: type,
    })
    reportEvent("properties", {
      "name": type,
      "page": 'setting'
    })
  }

  const oneTermTheme = followSystem ? 'auto' : theme

  const handleThemeChange = (follow: boolean, mode: typeof theme) => {
    dispatch && dispatch(setTheme({ followSystem: follow, mode: mode }))
    // Taro.setStorageSync(StorageKey.themeMode, mode)
    // Taro.setStorageSync(StorageKey.followSystemTheme, follow)
    Taro.setStorage({
      key: StorageKey.themeMode,
      data: mode,
    })
    Taro.setStorage({
      key: StorageKey.followSystemTheme,
      data: follow,
    })
  }

  return (
    <View className={classNames('setting-page', theme)}>
      <MenuPageLayout
        themeClass={theme}
        title='设置'
      >
        <View>
          <SettingItem
            themeClass={theme}
            icon={darkSvg}
            title='主题模式'
          >
            <View
              className={classNames(
                'theme-switch',
                'i'.repeat(themeSwitchData[oneTermTheme])
              )}
            >
              <View
                className='item'
                onClick={() => {
                  handleThemeChange(false, 'dark')
                }}
              >
                深色
              </View>
              <View className='item'
                onClick={() => {
                  handleThemeChange(false, 'light')
                }}
              >
                浅色
              </View>
              <View className='item'
                onClick={() => {
                  handleThemeChange(true, theme)
                }}
              >
                自动
              </View>
            </View>
          </SettingItem>

          <SettingItem
            themeClass={theme}
            icon={elementBoxSvg}
            title='元素底部属性'
            value={propertiesLabels[displayProperty]}
            onClick={() => setDisplayPropertyModalVisible(true)}
          />
        </View>
        <DisplayPropertiesModal
          themeClass={theme}
          visible={displayPropertyModalVisible}
          setVisible={setDisplayPropertyModalVisible}
          displayProperty={displayProperty}
          onSelect={handleDisplayPropertyChange}
        />
        {/* 表格缩放值设置 */}
      </MenuPageLayout>
    </View>
  )
}
