import { useEffect, useRef } from "react";
import { ITouchEvent } from '@tarojs/components'

// type OnScale = (scale: number, x?: number, y?: number, timestamp?: number) => void

const option = { rate: 1, min: 0.2, max: 10 }
export default function useTouchZoom({ rate, min, max } = option) {

  const dataRef = useRef({
    scaling: false,
    zoom: 1,
    startZoom: 1,
    startDist: 0,
    centreX: 0,
    centreY: 0,
    calcDist: (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1),
    onZoom: (zoom: number) => { },
    onTouchEnd: (zoom: number) => { },
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
        let scale = data.zoom - deltaY / 50
        scale = Math.min(max, Math.max(min, scale))
        data.zoom = scale
        data.centreX = pageX
        data.centreY = pageY
        data.onZoom && data.onZoom(scale)
        data.startZoom = scale
        if (data.scrollView) {
          const { scrollLeft, scrollTop } = data.scrollView
          data.startScrollX = scrollLeft
          data.startScrollY = scrollTop
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const functionRef = useRef({
    handleTouchStart(e: ITouchEvent) {
      // console.log(e)
      if (e.touches.length === 2) {
        const data = dataRef.current
        data.scaling = true
        const { touches: [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }] } = e
        data.startDist = data.calcDist(x1, y1, x2, y2)
        data.startZoom = data.zoom
        data.centreX = (x1 + x2) / 2
        data.centreY = (y1 + y2) / 2
        if (data.scrollView) {
          const { scrollLeft, scrollTop } = data.scrollView
          data.startScrollX = scrollLeft
          data.startScrollY = scrollTop
        }
      }
    },

    handleTouchMove(e: ITouchEvent) {
      const data = dataRef.current
      const { scaling, startDist, startZoom, onZoom } = data
      if (scaling && e.touches.length >= 2) {
        const { touches: [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }] } = e
        const dist = data.calcDist(x1, y1, x2, y2)
        const realScale = dist / startDist
        let zoom = 1 - (1 - realScale) * rate
        zoom = Math.min(max, Math.max(min, startZoom * zoom))
        data.zoom = zoom
        onZoom && onZoom(zoom)
      }
    },

    handleTouchEnd() {
      const data = dataRef.current
      const { onTouchEnd, zoom } = data
      data.scaling = false
      onTouchEnd && onTouchEnd(zoom)
    },

    handleTouchCancel() {
      const data = dataRef.current
      data.scaling = false
    },
  })

  return {
    zoomRef: dataRef.current,
    ...functionRef.current,
  }
}
