import { useState, useEffect, useRef } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { StorageKey } from '../types/storage'

type Theme = 'dark' | 'light'

export default function useThemeMode(): [Theme, (theme: Theme) => void, boolean, (follow: boolean) => void] {
    const [theme, setTheme] = useState<Theme>('dark')
    const [followSystem, setFollowSystem] = useState(true)

    useDidShow(() => {
        const storageTheme: Theme = Taro.getStorageSync(StorageKey.themeMode)
        const followSystemTheme = Taro.getStorageSync(StorageKey.followSystemTheme)
        const { theme: systemTheme } = Taro.getSystemInfoSync()

        if (storageTheme && !followSystemTheme) {
            setTheme(storageTheme)
            setBackground(storageTheme)
        }
        if (followSystemTheme && systemTheme) {
            setTheme(systemTheme as Theme)
            setBackground(systemTheme as Theme)
        }

        setFollowSystem(followSystemTheme)
    })

    useEffect(() => {
        const handleThemeChange = (res) => {
            if (res?.theme) {
                setTheme(res.theme)
                setBackground(res.theme)
            }
            // console.log('system theme change: ', res)
        }

        const weapp = process.env.TARO_ENV === 'weapp'

        if (weapp && followSystem && Taro.onThemeChange)
            Taro.onThemeChange(handleThemeChange)

        return () => {
            if (weapp && followSystem && Taro.offThemeChange)
                Taro.offThemeChange(handleThemeChange)
        }
    }, [followSystem])

    const setBackground = (value: Theme) => {
        if (process.env.TARO_ENV !== 'weapp') return
        Taro.nextTick(() => {
            if (value === 'dark') {
                Taro.setBackgroundColor({
                    backgroundColor: '#242627',
                    success: console.log,
                    fail: console.error,
                })
                Taro.setBackgroundTextStyle({
                    textStyle: 'dark'
                })
            }

            if (value === 'light') {
                Taro.setBackgroundColor({
                    backgroundColor: '#ffffff',
                    success: console.log,
                    fail: console.error,
                })
                Taro.setBackgroundTextStyle({
                    textStyle: 'light'
                })
            }
        })
    }

    const saveTheme = (value: Theme) => {
        setTheme(value)
        Taro.setStorageSync(StorageKey.themeMode, value)
        const { theme: systemTheme } = Taro.getSystemInfoSync()
        setBackground(value)

        if (systemTheme !== value) {
            setFollowSystem(false)
            Taro.setStorageSync(StorageKey.followSystemTheme, false)
        }
    }

    const saveFollowSystem = (value: boolean) => {
        setFollowSystem(value)
        Taro.setStorageSync(StorageKey.followSystemTheme, value)
        if (value) {
            const { theme: systemTheme } = Taro.getSystemInfoSync()
            setTheme(systemTheme as Theme)
        } else {
            const storageTheme: Theme = Taro.getStorageSync(StorageKey.themeMode)
            setTheme(storageTheme)
        }
    }

    return [theme, saveTheme, followSystem, saveFollowSystem]
}