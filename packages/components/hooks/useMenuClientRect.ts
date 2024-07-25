'use client'
import { useEffect } from 'react'
import { Taro, isTaro, onWindowResize, offWindowResize } from '../compat'
import { useAtom } from 'jotai'
import { menuButtonClientRect } from '../recoil/atom'

const PLATFORM = process.env.PLATFORM

export function useMenuClientRect() {
  const [menuRect, setMenuButtonClientRect] =
    useAtom(menuButtonClientRect)
  useEffect(() => {
    const getClientRect = async () => {
      if (isTaro && PLATFORM != 'h5') {
        const { windowWidth: ww, windowHeight: wh } = Taro.getSystemInfoSync()
        await new Promise<void>((resolve) => {
          Taro.nextTick(() => {
            resolve()
          })
        })
        const rect = Taro.getMenuButtonBoundingClientRect()
        return {
          ...rect,
          windowWidth: ww,
          windowHeight: wh,
        }
      }

      const [ww, wh] = [innerWidth, innerHeight]
      const rect = menuRect
      let mr = rect.windowWidth - rect.right
      mr = 12
      return {
        ...rect,
        right: ww - mr,
        left: ww - rect.width - mr,
        windowWidth: ww,
        windowHeight: wh,
      }
    }

    getClientRect().then((rect) => {
      setMenuButtonClientRect(rect)
    })

    const handleResize = () => {
      getClientRect().then((rect) => {
        setMenuButtonClientRect(rect)
      })
    }

    onWindowResize(handleResize)

    return () => {
      offWindowResize(handleResize)
    }
  }, [])
}

export default useMenuClientRect
