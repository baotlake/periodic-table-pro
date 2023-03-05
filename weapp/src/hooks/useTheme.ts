import { useEffect, Dispatch } from 'react'
import Taro from '@tarojs/taro'
import { State, Action, setTheme } from '../state'
import { StorageKey, StorageValue } from '../types/storage'
import { defaultValue } from '../utils/storage'

type ThemeMode = State['theme']['mode']
const PLATFORM = process.env.PLATFORM


export function useTheme(
    dispatch: Dispatch<Action> | null,
    mode: ThemeMode,
    followSystemTheme: boolean,
    initialized?: boolean,
) {
    const setBackground = (value: ThemeMode) => {
        if (PLATFORM !== 'weapp') return

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

    useEffect(() => {
        const getSetting = async () => {
            const { data: storageTheme } = await Taro.getStorage<StorageValue['themeMode']>({
                key: StorageKey.themeMode,
                fail: console.warn,
            }).catch(() => ({ data: defaultValue.themeMode }))

            const { data: followSystemTheme } = await Taro.getStorage<StorageValue['followSystemTheme']>({
                key: StorageKey.followSystemTheme,
                fail: console.warn,
            }).catch(() => ({ data: defaultValue.followSystemTheme }))

            const { theme: systemTheme } = await Taro.getSystemInfo()
            const mode = followSystemTheme === true && systemTheme
                ? systemTheme : storageTheme
                    ? storageTheme : defaultValue.themeMode

            console.log('getThemeSetting', storageTheme, followSystemTheme)
            return [mode, followSystemTheme] as [ThemeMode, boolean]
        }

        const setSetting = async () => {
            const [mode, followSystem] = await getSetting()
            dispatch && dispatch(setTheme({
                mode,
                followSystem,
                initialized: true,
            }))
        }
        setSetting()

        if (PLATFORM === 'h5') {
            window.addEventListener('focus', setSetting)
        }

        return () => {
            if (PLATFORM === 'h5') {
                window.removeEventListener('focus', setSetting)
            }
        }
    }, [])

    useEffect(() => {
        const handleThemeChange: Taro.onThemeChange.Callback = (res) => {
            dispatch && dispatch(setTheme({ mode: res.theme }))
        }
        let listenThemeChange = false

        if (['weapp'].includes(PLATFORM) && followSystemTheme) {
            listenThemeChange = true
            Taro.onThemeChange(handleThemeChange)
        }

        if (initialized && followSystemTheme) {
            const { theme } = Taro.getSystemInfoSync()
            theme !== mode && dispatch && dispatch(setTheme({ mode: theme }))
        }

        setBackground(mode)

        return () => {
            if (listenThemeChange) {
                Taro.offThemeChange(handleThemeChange)
            }
        }
    }, [mode, followSystemTheme, initialized])
}
