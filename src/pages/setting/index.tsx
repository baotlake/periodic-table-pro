import { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import SettingItem from '../../components/SettingItem'
import { MenuPageLayout } from '../../components/Layout'
import useThemeMode from '../../hooks/useThemeMode'
import { DisplayPropertiesModal } from '../../components/Modal'
import { DisplayProperty } from '../../types/periodicTable'
import { StorageKey } from '../../types/storage'
import { propertiesLabels } from "../../data/displayProperties"
import { reportEvent } from '../../utils/analytics'

import themeSwitchSvg from '../../assets/icons/theme-switch.svg'
import darkSvg from '../../assets/icons/dark.svg'
import elementBoxSvg from '../../assets/icons/element-box.svg'

import './index.scss'



export default function Setting() {

  const [theme, setTheme, followSystem, setFollowSystem] = useThemeMode()
  const [displayPropertyModalVisible, setDisplayPropertyModalVisible] = useState(false)
  const [displayProperty, setDisplayProperty] = useState<DisplayProperty>('atomicWeight')

  useEffect(() => {
    const property = Taro.getStorageSync(StorageKey.displayProperty)
    setDisplayProperty(property)
  }, [])

  const handleDisplayPropertyChange = (type: DisplayProperty) => {
    setDisplayPropertyModalVisible(false)
    setDisplayProperty(type)
    Taro.setStorageSync(StorageKey.displayProperty, type)
    reportEvent("properties", {
      "name": type,
      "page": 'setting'
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
            icon={themeSwitchSvg}
            title='主题跟随系统'
            value={followSystem}
            onChange={(value) => {
              setFollowSystem(value as boolean)
            }}
          />
          <SettingItem
            themeClass={theme}
            icon={darkSvg}
            title='夜间模式'
            value={theme === 'dark'}
            onChange={(value) => {
              const name = value ? 'dark' : 'light'
              setTheme(name)
              reportEvent("theme", {
                "name": name
              })
            }}
          />
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
