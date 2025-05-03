'use client'

import classNames from 'classnames/bind'
import { isTaro, Image } from '../compat'
import { SettingItem } from './SettingItem'
import { AutoDisplayPropertiesModal, AutoZoomModal } from '../AutoModal'
import { propertiesLabels, DisplayProperty } from '@periodic-table-pro/data'
import { getStorage, setStorage } from '../utils/storage'
import { maxPtZoom, minPtZoom } from '../config'
import { useAtom } from 'jotai'
import {
  displayPropertiesModalVisible,
  periodicTableDisplayProperty,
  periodicTableZoom,
  themeFollowSystem,
  themeModeState,
  zoomModalVisible,
} from '../recoil/atom'

// import themeSwitchSvg from '../assets/icons/theme-switch.svg'
import darkSvg from '../assets/icons/dark.svg'
import elementBoxSvg from '../assets/icons/element-box.svg'
import panZoomSvg from '../assets/icons/pan_zoom.svg'
import addSvg from '../assets/icons/add.svg'
import minusSvg from '../assets/icons/remove.svg'

import styles from './setting.module.scss'

const cx = classNames.bind(styles)

const themeSwitchData = {
  dark: 1,
  light: 2,
  auto: 3,
}

type Props = {}

export function Setting({}: Props) {
  const [theme, setTheme] = useAtom(themeModeState)
  const [followSystem, setFollowSystem] = useAtom(themeFollowSystem)
  const [displayProperty] = useAtom(periodicTableDisplayProperty)
  const [zoom, setZoom] = useAtom(periodicTableZoom)
  const [displayPropertiesVisible, setDisplayPropertiesModalVisible] = useAtom(
    displayPropertiesModalVisible
  )
  const [zoomVisible, setZoomModalVisible] = useAtom(zoomModalVisible)

  const oneTermTheme = followSystem ? 'auto' : theme

  const handleThemeChange = (follow: boolean, mode: typeof theme) => {
    setTheme(mode)
    setFollowSystem(follow)
    setStorage({
      themeMode: mode,
      followSystemTheme: follow,
    })
  }

  const handleChangeZoom = (d: number) => {
    let z = Math.min(maxPtZoom, Math.max(minPtZoom, zoom + d))
    z = Math.round(z * 100) / 100
    setZoom(z)
    setStorage({ periodicTableZoom: z })
  }

  return (
    <div className={cx('setting', theme)}>
      <div>
        <SettingItem themeClass={theme} icon={darkSvg} title="主题模式">
          <div
            className={cx(
              'theme-switch',
              'i'.repeat(themeSwitchData[oneTermTheme]),
              'p-1 -my-1 bg-deeper rounded-lg before:bg-lighter before:rounded'
            )}
          >
            <div
              className={cx('item')}
              onClick={() => {
                handleThemeChange(false, 'dark')
              }}
            >
              深色
            </div>
            <div
              className={cx('item')}
              onClick={() => {
                handleThemeChange(false, 'light')
              }}
            >
              浅色
            </div>
            <div
              className={cx('item')}
              onClick={() => {
                handleThemeChange(true, theme)
              }}
            >
              自动
            </div>
          </div>
        </SettingItem>

        <SettingItem
          themeClass={theme}
          icon={elementBoxSvg}
          title="元素底部属性"
          value={propertiesLabels[displayProperty] || ''}
          onClick={() =>
            setDisplayPropertiesModalVisible(!displayPropertiesVisible)
          }
        />

        <SettingItem
          themeClass={theme}
          icon={panZoomSvg}
          title="周期表缩放比例"
        >
          <Image
            className={cx('icon', 'minus')}
            src={minusSvg}
            onClick={() => handleChangeZoom(-0.1)}
          />
          <div onClick={() => setZoomModalVisible(!zoomVisible)}>
            {Math.round(zoom * 100)}%
          </div>
          <Image
            className={cx('icon', 'add')}
            src={addSvg}
            onClick={() => handleChangeZoom(0.1)}
          />
        </SettingItem>
      </div>

      <AutoDisplayPropertiesModal />
      <AutoZoomModal />
    </div>
  )
}

export default Setting
