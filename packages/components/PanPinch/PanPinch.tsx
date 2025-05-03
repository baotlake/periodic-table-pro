'use client'

import { useRef, useEffect, PropsWithChildren } from 'react'
import classNames from 'classnames/bind'
import ZoomController from '../utils/zoom'
import {
  getBoundingClientRect,
  offWindowResize,
  onWindowResize,
  useDidShow,
} from '../compat'
import { useSetAtom } from 'jotai'
import { periodicTableZoom, ptZoomControler } from '../recoil/atom'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

type Props = PropsWithChildren<{
  className?: string
  min: number
  max: number
  value: number
  onChange?: (date: { scale: number }) => void
}>

export function PanPinch({
  children,
  className,
  min,
  max,
  value,
  onChange,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const setZoomControl = useSetAtom(ptZoomControler)
  const setZoom = useSetAtom(periodicTableZoom)

  const dataRef = useRef({
    controller: null as null | ZoomController,
    delat: 0,
    scale: 1,
    panningTimeoutId: -1,
    value: value,

    async handleTouchStart(e: React.TouchEvent | TouchEvent) {
      if (e.touches.length !== 2) {
        return
      }

      const self = dataRef.current

      const p1 = e.touches[0]
      const p2 = e.touches[1]

      const { clientX: x1, clientY: y1 } = p1
      const { clientX: x2, clientY: y2 } = p2

      const d1 = Math.hypot(x2 - x1, y2 - y1)
      self.controller?.start(d1, (x1 + x2) / 2, (y1 + y2) / 2)
    },
    handleTouchMove(e: React.TouchEvent | TouchEvent) {
      const self = dataRef.current
      if (e.touches.length < 2) {
        return
      }

      const p1 = e.touches[0]
      const p2 = e.touches[1]
      const { clientX: x1, clientY: y1 } = p1
      const { clientX: x2, clientY: y2 } = p2
      const d = Math.hypot(x2 - x1, y2 - y1)

      self.controller?.move(d)
    },
    handleTouchEnd(e: React.TouchEvent | TouchEvent) {
      const self = dataRef.current
      const data = self.controller?.end()
      if (data?.scale) {
        setZoom(data.scale)
      }
    },
    async handleWheel(e: React.WheelEvent | WheelEvent) {
      const { deltaY, clientX, clientY } = e
      const self = dataRef.current

      if (!e.ctrlKey || !self.controller) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      if (!self.controller.isPanning) {
        self.delat = 100
        self.controller.start(100, clientX, clientY)
      }

      let dy = -deltaY
      if (Math.abs(dy) > 120) {
        dy = Math.sign(dy) * 120
      }

      self.delat = self.delat + dy / 10
      self.controller.move(self.delat)

      clearTimeout(self.panningTimeoutId)
      self.panningTimeoutId = setTimeout(() => {
        const data = self.controller?.end()
        if (data?.scale) {
          setZoom(data.scale)
        }
      }, 300) as any
    },

    async scaleTo(value: number) {
      const self = dataRef.current
      const wrapper = wrapperRef.current
      const target = targetRef.current
      const wrapperRect = await getBoundingClientRect(wrapper!)
      const rect = await getBoundingClientRect(target!)

      if (!wrapperRect || !rect) {
        console.warn('Warning: scaleTo', wrapperRect, rect, wrapper, target)
        return
      }
      // const x = rect.width >= wrapperRect.width ? rect.left : (rect.width / 2 + rect.left)
      // const y = rect.height >= wrapperRect.height ? rect.top : (rect.height / 2 + rect.top)
      const x = rect.left
      const y = rect.top

      self.controller?.scaleTo(value, x, y)

      console.log('scaleTo', value, x, y, rect, wrapperRect)
    },
    handleMouseMove(e: React.MouseEvent | MouseEvent) {
      const wrapper = wrapperRef.current
      if (e.buttons == 1 && wrapper) {
        wrapper.scrollTo({
          left: wrapper.scrollLeft - e.movementX,
          top: wrapper.scrollTop - e.movementY,
        })
      }
    },
  })

  dataRef.current.value = value

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const { handleWheel } = dataRef.current

    const handleResize = () => {
      // 重新居中
      dataRef.current.scaleTo(dataRef.current.value)
    }
    wrapper.addEventListener('wheel', handleWheel, true)
    onWindowResize(handleResize)
    return () => {
      wrapper?.removeEventListener('wheel', handleWheel, true)
      offWindowResize(handleResize)
    }
  }, [])

  useEffect(() => {
    const self = dataRef.current
    const wrapper = wrapperRef.current
    const target = targetRef.current

    if (!self.controller && wrapper && target) {
      self.controller = new ZoomController({ wrapper, target })
      setZoomControl(self.controller)
    }

    const lastScale = self.controller?.scale ?? 0

    if (Math.abs(value - lastScale) > 0.001 && wrapper && target) {
      self.scaleTo(value)
    }
  }, [value])

  useDidShow(() => {
    // const { value } = dataRef.current
    // dataRef.current.scaleTo(value)
    // console.log('useDidShow', value)
  })

  return (
    <div
      ref={wrapperRef}
      className={cx('pan-pinch-wrapper', className)}
      onTouchStart={dataRef.current.handleTouchStart}
      onTouchMove={dataRef.current.handleTouchMove}
      onTouchEnd={dataRef.current.handleTouchEnd}
      onTouchCancel={dataRef.current.handleTouchEnd}
      onMouseMove={dataRef.current.handleMouseMove}
    >
      <div ref={targetRef} className={cx('pan-pinch')}>
        <div ref={innerRef}>{children}</div>
      </div>
    </div>
  )
}

export default PanPinch
