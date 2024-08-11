'use client'

import {
  useRef,
  useEffect,
  useContext,
  PropsWithChildren,
  useState,
  CSSProperties,
} from 'react'
import classNames from 'classnames/bind'
import ZoomControl from '../utils/zoom'
import { isTaro, getBoundingClientRect, useDidShow } from '../compat'
import { useAtom, useSetAtom } from 'jotai'
import { periodicTableZoom, periodicTableZoomControl } from '../recoil/atom'
import styles from './index.module.scss'

const PLATFORM = process.env.PLATFORM

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

  const setZoomControl = useSetAtom(periodicTableZoomControl)
  const setZoom = useSetAtom(periodicTableZoom)

  const dataRef = useRef({
    zoom: null as null | ZoomControl,
    delat: 0,
    scale: 1,
    panningTimeoutId: -1,
    value: value,

    async handleTouchStart(e: React.TouchEvent | TouchEvent) {
      if (e.touches.length !== 2) {
        return
      }

      const self = dataRef.current

      const t1 = e.touches[0],
        t2 = e.touches[1]
      const x1 = t1.clientX,
        y1 = t1.clientY
      const x2 = t2.clientX,
        y2 = t2.clientY

      const d1 = Math.hypot(x2 - x1, y2 - y1)
      self.zoom?.start(d1, (x1 + x2) / 2, (y1 + y2) / 2)
    },
    handleTouchMove(e: React.TouchEvent | TouchEvent) {
      const self = dataRef.current
      if (e.touches.length < 2) {
        return
      }

      const p1 = e.touches[0],
        p2 = e.touches[1]
      const x1 = p1.clientX,
        y1 = p1.clientY
      const x2 = p2.clientX,
        y2 = p2.clientY
      const d = Math.hypot(x2 - x1, y2 - y1)

      self.zoom?.move(d)
    },
    handleTouchEnd(e: React.TouchEvent | TouchEvent) {
      const self = dataRef.current
      const data = self.zoom?.end()
      if (data?.scale) {
        setZoom(data.scale)
      }
    },
    async handleWheel(e: React.WheelEvent | WheelEvent) {
      const { deltaY, clientX, clientY } = e
      const self = dataRef.current

      if (!e.ctrlKey || !self.zoom) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      if (!self.zoom.isPanning) {
        self.delat = 100
        self.zoom.start(100, clientX, clientY)
      }

      let dy = -deltaY
      if (Math.abs(dy) > 120) {
        dy = Math.sign(dy) * 120
      }

      self.delat = self.delat + dy / 10
      self.zoom.move(self.delat)

      clearTimeout(self.panningTimeoutId)
      self.panningTimeoutId = setTimeout(() => {
        const data = self.zoom?.end()
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

      self.zoom?.scaleTo(value, x, y)
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
    const { handleWheel } = dataRef.current
    if (wrapper) {
      wrapper.addEventListener('wheel', handleWheel, true)
      return () => {
        wrapper?.removeEventListener('wheel', handleWheel, true)
      }
    }
  }, [])

  useEffect(() => {
    const self = dataRef.current
    const wrapper = wrapperRef.current
    const target = targetRef.current

    if (!self.zoom && wrapper && target) {
      self.zoom = new ZoomControl({ wrapper, target })
      setZoomControl(self.zoom)
      self.scaleTo(value)
    }

    const lastScale = self.zoom?.scale ?? 0

    if (Math.abs(value - lastScale) > 0.001 && wrapper && target) {
      self.scaleTo(value)
    }
  }, [value])

  useDidShow(() => {
    const { value } = dataRef.current
    dataRef.current.scaleTo(value)
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
