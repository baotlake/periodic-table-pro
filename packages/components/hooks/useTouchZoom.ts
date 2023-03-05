import { useEffect, useRef } from "react";
import type { ITouchEvent } from '@tarojs/components'

const PLATFORM = process.env.PLATFORM

type TouchEvent = ITouchEvent | React.TouchEvent
const option = { rate: 1, min: 0.2, max: 10 }
export function useTouchZoom({ rate, min, max } = option) {

  const dataRef = useRef({
    scaling: false,
    scale: 1,
    startScale: 1,
    startDist: 0,
    centreX: 0,
    centreY: 0,
    calcDist: (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1),
    onZoom: (scale: number) => { },
    onTouchEnd: (scale: number) => { },
    scrollView: undefined as any,
    startScrollX: 0,
    startScrollY: 0,
  })

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      const data = dataRef.current
      if (e.ctrlKey) {
        e.preventDefault()
        e.stopImmediatePropagation()
        const { pageX, pageY, deltaY } = e
        let scale = data.scale - deltaY / 50
        scale = Math.min(max, Math.max(min, scale))
        data.scale = scale
        data.centreX = pageX
        data.centreY = pageY
        data.onZoom && data.onZoom(scale)
        data.startScale = scale
        if (data.scrollView) {
          const { scrollLeft, scrollTop } = data.scrollView
          data.startScrollX = scrollLeft
          data.startScrollY = scrollTop
        }
      }
    }

    if (PLATFORM === 'h5') {
      window.addEventListener('wheel', handleWheel, { passive: false })
    }
    return () => {
      if (PLATFORM === 'h5') {
        window.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  const functionRef = useRef({
    handleTouchStart(e: TouchEvent) {
      // console.log(e)
      if (e.touches.length === 2) {
        const data = dataRef.current
        data.scaling = true
        const touches = e.touches
        const [x1, y1] = [touches[0].pageX, touches[0].pageY]
        const [x2, y2] = [touches[1].pageX, touches[1].pageY]
        // const { touches: [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }] } = e
        data.startDist = data.calcDist(x1, y1, x2, y2)
        data.startScale = data.scale
        data.centreX = (x1 + x2) / 2
        data.centreY = (y1 + y2) / 2
        if (data.scrollView) {
          const { scrollLeft, scrollTop } = data.scrollView
          data.startScrollX = scrollLeft
          data.startScrollY = scrollTop
        }
      }
    },

    handleTouchMove(e: TouchEvent) {
      const data = dataRef.current
      const { scaling, startDist, startScale: startZoom, onZoom } = data
      if (scaling && e.touches.length >= 2) {
        const touches = e.touches
        const [x1, y1] = [touches[0].pageX, touches[0].pageY]
        const [x2, y2] = [touches[1].pageX, touches[1].pageY]
        // const { touches: [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }] } = e
        const dist = data.calcDist(x1, y1, x2, y2)
        const realScale = dist / startDist
        let zoom = 1 - (1 - realScale) * rate
        zoom = Math.min(max, Math.max(min, startZoom * zoom))
        data.scale = zoom
        onZoom && onZoom(zoom)
      }
    },

    handleTouchEnd() {
      const data = dataRef.current
      const { onTouchEnd, scale: zoom } = data
      data.scaling = false
      onTouchEnd && onTouchEnd(zoom)
    },

    handleTouchCancel() {
      const data = dataRef.current
      data.scaling = false
    },
  })

  return {
    zoom: dataRef.current,
    ...functionRef.current,
  }
}

export default useTouchZoom
