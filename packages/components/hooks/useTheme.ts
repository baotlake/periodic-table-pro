import { useEffect, Dispatch } from 'react'
import { Taro, isTaro, getAppBaseInfo, onThemeChange, offThemeChange } from '../compat'
import { State, Action, setTheme } from '../state'
import { defaultValue, getStorage, setStorage } from '../utils/storage'

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
            const { theme: oldTheme } = await getStorage('theme' as any) as any
            let { themeMode: storageTheme } = await getStorage('themeMode')
            const { followSystemTheme } = await getStorage('followSystemTheme')

            if (!storageTheme && oldTheme) {
                storageTheme = oldTheme
                setStorage({ theme: undefined } as any)
            }

            let systemTheme = 'dark'

            const { theme } = await getAppBaseInfo()
            systemTheme = theme || systemTheme

            const mode = followSystemTheme === true && systemTheme
                ? systemTheme : storageTheme
                    ? storageTheme : defaultValue.themeMode

            // console.log('getThemeSetting', storageTheme, followSystemTheme)
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

        if (PLATFORM == 'h5' || PLATFORM == 'next') {
            window.addEventListener('focus', setSetting)
        }

        return () => {
            if (PLATFORM == 'h5' || PLATFORM == 'next') {
                window.removeEventListener('focus', setSetting)
            }
        }
    }, [])

    useEffect(() => {
        const handleThemeChange: Taro.onThemeChange.Callback = (res) => {
            dispatch && dispatch(setTheme({ mode: res.theme }))
        }
        onThemeChange(handleThemeChange)


        if (initialized && followSystemTheme) {
            const { theme } = getAppBaseInfo()
            theme !== mode && dispatch && dispatch(setTheme({ mode: theme }))
        }

        setBackground(mode)

        return () => {
            offThemeChange(handleThemeChange)
        }
    }, [mode, followSystemTheme, initialized])
}