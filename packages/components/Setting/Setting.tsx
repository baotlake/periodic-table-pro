import { useState, useEffect, useContext } from 'react'
import classNames from 'classnames/bind'
import { isTaro } from '../compat'
import { Context, setDisplayProperty, setTheme } from '../state'
import { SettingItem } from './SettingItem'
import { DisplayPropertiesModal } from '../Modal'
import {
    propertiesLabels,
    DisplayProperty,
} from '@periodic-table-pro/data'
import { reportEvent } from '../utils/analytics'
import { getStorage, setStorage } from '../utils/storage'

// import themeSwitchSvg from '../assets/icons/theme-switch.svg'
import darkSvg from '../assets/icons/dark.svg'
import elementBoxSvg from '../assets/icons/element-box.svg'
import styles from './setting.module.scss'

const cx = classNames.bind(styles)

const themeSwitchData = {
    'dark': 1,
    'light': 2,
    'auto': 3,
}

type Props = {

}

export function Setting({ }: Props) {

    const {
        state: { 
            theme: { mode: theme, followSystem },
            periodicTable: { displayProperty },
        },
        dispatch
    } = useContext(Context)
    const [displayPropertyModalVisible, setDisplayPropertyModalVisible] = useState(false)

    const handleDisplayPropertyChange = (type: DisplayProperty) => {
        setDisplayPropertyModalVisible(false)
        dispatch && dispatch(setDisplayProperty(type))
        setStorage({ displayProperty: type })
        reportEvent("properties", {
            "name": type,
            "page": 'setting'
        })
    }

    const oneTermTheme = followSystem ? 'auto' : theme

    const handleThemeChange = (follow: boolean, mode: typeof theme) => {
        dispatch && dispatch(setTheme({ followSystem: follow, mode: mode }))
        setStorage({
            themeMode: mode,
            followSystemTheme: follow,
        })
    }

    return (
        <div className={cx('setting', theme)}>
            <div>
                <SettingItem
                    themeClass={theme}
                    icon={darkSvg}
                    title='主题模式'
                >
                    <div
                        className={cx(
                            'theme-switch',
                            'i'.repeat(themeSwitchData[oneTermTheme])
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
                        <div className={cx('item')}
                            onClick={() => {
                                handleThemeChange(false, 'light')
                            }}
                        >
                            浅色
                        </div>
                        <div className={cx('item')}
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
                    title='元素底部属性'
                    value={propertiesLabels[displayProperty]}
                    onClick={() => setDisplayPropertyModalVisible(true)}
                />
            </div>
            <DisplayPropertiesModal
                themeClass={theme}
                visible={displayPropertyModalVisible}
                setVisible={setDisplayPropertyModalVisible}
                displayProperty={displayProperty}
                onSelect={handleDisplayPropertyChange}
            />
            {/* 表格缩放值设置 */}
        </div>
    )
}

export default Setting
