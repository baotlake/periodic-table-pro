'use client'

import { useEffect } from 'react'
import {
  Taro,
  isTaro,
  getAppBaseInfo,
  onThemeChange,
  offThemeChange,
} from '../compat'
import { defaultValue, getStorage, setStorage } from '../utils/storage'
import { useAtom } from 'jotai'
import {
  themeFollowSystem,
  themeInitialized,
  themeModeState,
} from '../recoil/atom'
import { ThemeMode } from '../type'

const PLATFORM = process.env.PLATFORM

export function useTheme() {
  const [mode, setThemeMode] = useAtom(themeModeState)
  const [followSystemTheme, setFollowSystemTheme] = useAtom(themeFollowSystem)
  const [initialized, setInitialized] = useAtom(themeInitialized)

  const setBackground = (value: ThemeMode) => {
    if (PLATFORM !== 'weapp') return

    // Taro.nextTick(() => {
    //   if (value === 'dark') {
    //     Taro.setBackgroundColor({
    //       backgroundColor: '#242627',
    //       success: console.log,
    //       fail: console.error,
    //     })
    //     Taro.setBackgroundTextStyle({
    //       textStyle: 'dark',
    //     })
    //   }

    //   if (value === 'light') {
    //     Taro.setBackgroundColor({
    //       backgroundColor: '#ffffff',
    //       success: console.log,
    //       fail: console.error,
    //     })
    //     Taro.setBackgroundTextStyle({
    //       textStyle: 'light',
    //     })
    //   }
    // })
  }

  useEffect(() => {
    const getSetting = async () => {
      const { theme: oldTheme } = (await getStorage('theme' as any)) as any
      let { themeMode: storageTheme } = await getStorage('themeMode')
      const { followSystemTheme } = await getStorage('followSystemTheme')

      if (!storageTheme && oldTheme) {
        storageTheme = oldTheme
        setStorage({ theme: undefined } as any)
      }

      let systemTheme = 'dark'

      const { theme } = await getAppBaseInfo()
      systemTheme = theme || systemTheme

      const mode =
        followSystemTheme === true && systemTheme
          ? systemTheme
          : storageTheme
          ? storageTheme
          : defaultValue.themeMode

      return [mode, followSystemTheme] as [ThemeMode, boolean]
    }

    const setSetting = async () => {
      const [mode, followSystem] = await getSetting()
      setThemeMode(mode)
      setFollowSystemTheme(followSystem)
      setInitialized(true)
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
    const toggleTheme = (value: ThemeMode) => {
      if (PLATFORM == 'h5' || PLATFORM == 'next') {
        document.documentElement.classList.toggle('dark', value == 'dark')
      }
    }
    const handleThemeChange: Taro.onThemeChange.Callback = (res) => {
      setThemeMode(res.theme)
    }
    onThemeChange(handleThemeChange)

    if (initialized && followSystemTheme) {
      const { theme } = getAppBaseInfo()
      theme !== mode && theme && setThemeMode(theme)
    }

    setBackground(mode)
    toggleTheme(mode)

    return () => {
      offThemeChange(handleThemeChange)
    }
  }, [mode, followSystemTheme, initialized])

  return mode
}
