'use client'

import { isTaro, Taro } from './Taro'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import { PreviewImage } from './PreviewImage'
import { router } from './Provider'

type PreviewImageOption = Parameters<typeof Taro.previewImage>[0]

export function previewImage(option: PreviewImageOption) {
  if (isTaro) {
    return Taro.previewImage(option)
  }

  const div = document.createElement('div')
  const id = 'preview-' + Date.now()
  div.id = id
  document.body.appendChild(div)
  const root = createRoot(div)

  const handleClose = () => {
    root.unmount()
    setTimeout(() => {
      document.querySelector('#' + id)?.remove()
    }, 1)
  }

  root.render(<PreviewImage {...option} onClose={handleClose} />)
}

type Theme = 'dark' | 'light'
export function getAppBaseInfo() {
  if (process.env.PLATFORM == 'weapp') {
    return Taro.getSystemInfoSync()
  }
  if (isTaro) {
    return Taro.getAppBaseInfo()
  }

  let theme: Theme = 'light'
  if (matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark'
  }

  return {
    language: '',
    theme: theme,
  }
}

type ThemeChangeResult = { theme: Theme }
type ThemeChangeCallback = (res: ThemeChangeResult) => void

const themeChangeListenerMap = new Map<
  ThemeChangeCallback,
  (e: MediaQueryListEvent) => void
>()

const getListener = (callback: ThemeChangeCallback) => {
  let listener = themeChangeListenerMap.get(callback)
  if (!listener) {
    listener = (e: MediaQueryListEvent) => {
      const result: ThemeChangeResult = {
        theme: !e.matches ? 'light' : 'dark',
      }
      callback(result)
    }
    themeChangeListenerMap.set(callback, listener)
  }

  return listener
}

export function onThemeChange(callback: ThemeChangeCallback) {
  if (isTaro && process.env.PLATFORM !== 'h5') {
    return Taro.onThemeChange?.(callback)
  }

  const colorScheme = matchMedia('(prefers-color-scheme: dark)')
  colorScheme.addEventListener('change', getListener(callback))
}

export function offThemeChange(callback: ThemeChangeCallback) {
  if (isTaro && process.env.PLATFORM !== 'h5') {
    return Taro.offThemeChange?.(callback)
  }

  const colorScheme = matchMedia('(prefers-color-scheme: dark)')
  colorScheme.removeEventListener('change', getListener(callback))
}

export function onWindowResize(callback: () => void) {
  if (isTaro) {
    return Taro.onWindowResize?.(callback)
  }

  return addEventListener('resize', callback)
}

export function offWindowResize(callback: () => void) {
  if (isTaro) {
    return Taro.offWindowResize(callback)
  }
  return removeEventListener('resize', callback)
}

export function redirectTo(url: string) {
  if (isTaro) {
    return Taro.redirectTo({ url: url })
  }

  if (router) {
    router.replace(url)
  } else {
    window.location.replace(url)
  }
}

export function navigateTo(url: string) {
  if (isTaro) {
    return Taro.navigateTo({ url: url })
  }

  if (router) {
    router.replace(url)
  } else {
    window.location.replace(url)
  }
}

export function useReady(callback: () => void) {
  if (isTaro) {
    return Taro.useReady(callback)
  }

  return useEffect(callback, [])
}

export function useDidShow(callback: () => void) {
  if (isTaro) {
    return Taro.useDidShow(callback)
  }

  return useEffect(callback, [])
}

const fallbackStore: Record<string, any> = {}

export async function setStorage<T extends Record<string, any>>(data: T) {
  try {
    if (isTaro) {
      for (let [key, value] of Object.entries(data)) {
        Taro.setStorage({
          key: key,
          data: value,
        })
      }
    } else {
      for (let [key, value] of Object.entries(data)) {
        localStorage.setItem(key, JSON.stringify(value))
      }
    }
  } catch (e) {
    console.error(e)

    for (let [key, value] of Object.entries(data)) {
      fallbackStore[key] = structuredClone(value)
    }
  }
}

export async function getStorage<T extends Record<string, any>>(
  keys: T
): Promise<T> {
  const data: Record<string, any> = {}
  if (isTaro) {
    for (let [key, defaultValue] of Object.entries(keys)) {
      data[key] = Taro.getStorageSync(key) ?? defaultValue
    }
    return data as T
  } else {
    try {
      for (let [key, defaultValue] of Object.entries(keys)) {
        const txt = localStorage.getItem(key)
        data[key] = JSON.parse(txt || 'null') ?? defaultValue
      }
      return data as T
    } catch (error) {
      console.error(error)
      for (let [key, defaultValue] of Object.entries(keys)) {
        data[key] = fallbackStore[key] ?? defaultValue
      }
      return data as T
    }
  }
}
