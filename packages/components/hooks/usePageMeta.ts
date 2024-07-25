'use client'
import { useEffect } from 'react'
import { Taro, isTaro, useDidShow, useReady } from '../compat'
import { useAtom } from 'jotai'
import { themeModeState } from '../recoil/atom'

export function usePageMeta() {
  if (!isTaro) {
    return
  }

  // Taro
  const [mode] = useAtom(themeModeState)

  useReady(() => {
    const { page } = Taro.getCurrentInstance()
    const bgColor = mode == 'dark' ? '#272829' : '#FFFFFF'
    page?.setData?.({
      pageMeta: {
        rootBackgroundColor: bgColor,
        backgroundColor: bgColor,
        pageOrientation: 'auto',
      },
    })
  })

  useEffect(() => {
    const { page } = Taro.getCurrentInstance()
    const bgColor = mode == 'dark' ? '#272829' : '#FFFFFF'
    page?.setData?.({
      pageMeta: {
        rootBackgroundColor: bgColor,
        backgroundColor: bgColor,
        pageOrientation: 'auto',
      },
    })
  }, [mode])
}
