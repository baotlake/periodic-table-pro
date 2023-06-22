import type * as TaroNS from '@tarojs/taro'
import { isTaro, Taro } from './Taro'
import { render, unmountComponentAtNode } from 'react-dom'
import { useEffect } from 'react'
import { PreviewImage } from './PreviewImage'

const PLATFORM = process.env.PLATFORM

type PreviewImageOption = Parameters<typeof TaroNS.previewImage>[0]

export function previewImage(option: PreviewImageOption) {
  if (isTaro) {
    return Taro.previewImage(option)
  }

  const div = document.createElement('div')
  const id = 'preview-' + Date.now()
  div.id = id
  document.body.appendChild(div)

  const handleClose = () => {
    unmountComponentAtNode(div)
    setTimeout(() => {
      document.querySelector('#' + id)?.remove()
    }, 1)
  }

  render(<PreviewImage {...option} onClose={handleClose} />, div)
}

type Theme = 'dark' | 'light'
export function getAppBaseInfo() {
  if (PLATFORM == 'weapp') {
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
  if (isTaro && PLATFORM !== 'h5') {
    return Taro.onThemeChange?.(callback)
  }

  const colorScheme = matchMedia('(prefers-color-scheme: dark)')
  colorScheme.addEventListener('change', getListener(callback))
}

export function offThemeChange(callback: ThemeChangeCallback) {
  if (isTaro && PLATFORM !== 'h5') {
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

  if (PLATFORM == 'next') {
    const Router = require('next/router')
    Router.replace(url)
    return
  }

  window.location.href = url
}

export function navigateTo(url: string) {
  if (isTaro) {
    return Taro.navigateTo({ url: url })
  }

  if (PLATFORM == 'next') {
    const Router = require('next/router')
    Router.push(url)
    return
  }

  window.location.href = url
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
