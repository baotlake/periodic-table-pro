import { useRef, useEffect, useCallback, PropsWithChildren } from 'react'
import classNames from 'classnames/bind'

import styles from './index.module.scss'

const PLATFORM = process.env.PLATFORM

const cx = classNames.bind(styles)

type Props = PropsWithChildren<{
    themeClass?: string
    className?: string
    min: number
    max: number
    value: number
    onChange?: (date: { scale: number }) => void
}>

export function PanPinch({ children, themeClass, className, min, max, value, onChange }: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const dataRef = useRef({
        panning: false,
        d1: 0,
        scrollX: 0,
        scrollY: 0,
        panningTimeoutId: -1,
        originOffsetX: 0,
        originOffsetY: 0,
        scale1: value,
        scale: 1,
        translateX: 0,
        translateY: 0,

        async handleTouchStart(e: React.TouchEvent | TouchEvent) {
            if (e.touches.length !== 2) {
                return
            }

            const target = targetRef.current!
            const wrapper = wrapperRef.current!
            const self = dataRef.current

            const t1 = e.touches[0], t2 = e.touches[1]
            const x1 = t1.clientX, y1 = t1.clientY
            const x2 = t2.clientX, y2 = t2.clientY

            const d1 = Math.hypot(x2 - x1, y2 - y1)
            const { x, y } = await getOriginOffset(target, (x1 + x2) / 2, (y1 + y2) / 2)
            const [scrollLeft, scrollTop] = await getScrollOffset(wrapper)

            self.panning = true
            self.d1 = d1
            self.scrollX = scrollLeft
            self.scrollY = scrollTop
            self.originOffsetX = x
            self.originOffsetY = y
        },
        handleTouchMove(e: React.TouchEvent | TouchEvent) {
            const self = dataRef.current
            if (!self.panning || e.touches.length < 2) {
                return
            }

            const { d1, originOffsetX, originOffsetY, scale1 } = self
            const target = targetRef.current!

            const p1 = e.touches[0], p2 = e.touches[1]
            const x1 = p1.clientX, y1 = p1.clientY
            const x2 = p2.clientX, y2 = p2.clientY

            const d = Math.hypot(x2 - x1, y2 - y1)
            let deltaScale = (d - d1) / d1
            let scale = scale1 + deltaScale

            if (scale < min) {
                scale = min
            }
            if (scale > max) {
                scale = max
            }

            const dx = originOffsetX / scale1 * (scale - scale1)
            const dy = originOffsetY / scale1 * (scale - scale1)

            target.style.fontSize = '1em'
            target.style.transformOrigin = '0% 0%'
            target.style.transform = `translate(${-dx}px,${-dy}px) scale(${scale})`
            self.scale = scale
            self.translateX = dx
            self.translateY = dy
        },
        handleTouchEnd(e: React.TouchEvent | TouchEvent) {
            const { panning, pinchStop } = dataRef.current
            if (panning) {
                pinchStop()
            }
        },
        async pinchStop() {
            const self = dataRef.current
            self.panning = false

            const target = targetRef.current!
            const wrapper = wrapperRef.current!
            const inner = innerRef.current!
            let { scale, translateX, translateY, scrollX, scrollY } = self

            self.scale1 = scale


            if (scale > 1) {
                target.style.transform = ''
                target.style.fontSize = `${scale}em`
                target.style.width = `auto`
                target.style.height = `auto`
            } else {

                const rect = await getBoundingClientRect(inner)
                target.style.fontSize = '1em'
                target.style.transform = `scale(${scale})`
                // target.style.width = `${rect.width}px`
                // target.style.height = `${rect.height}px`
            }


            wrapper.scrollTo(
                scrollX + translateX,
                scrollY + translateY,
            )

            onChange && onChange({ scale })

            console.log('translate 2 scroll', translateX, translateY)
        },
        async handleWheel(e: React.WheelEvent | WheelEvent) {
            if (!e.ctrlKey) return
            e.preventDefault()
            e.stopPropagation()

            const { deltaY, clientX, clientY } = e
            const self = dataRef.current
            let {
                scale1,
                scale,
                scrollX,
                scrollY,
                panning,
                panningTimeoutId,
                originOffsetX,
                originOffsetY,
            } = self

            const target = targetRef.current!
            const wrapper = wrapperRef.current!
            const scrollLeft = wrapper.scrollLeft
            const scrollTop = wrapper.scrollTop

            if (!panning) {
                scrollX = scrollLeft
                scrollY = scrollTop

                const { x, y } = await getOriginOffset(target, clientX, clientY)
                originOffsetX = x
                originOffsetY = y

                self.panning = true
                self.scrollX = scrollX
                self.scrollY = scrollY
                self.originOffsetX = originOffsetX
                self.originOffsetY = originOffsetY
                // target.style.width = 'auto'
                // target.style.height = 'auto'

                self.panningTimeoutId = window.setTimeout(() => {
                    self.pinchStop()
                }, 300)

            } else {
                clearTimeout(panningTimeoutId)
                self.panningTimeoutId = window.setTimeout(() => {
                    self.pinchStop()
                }, 300)
            }

            let deltaScale = - deltaY / 100
            if (Math.abs(deltaScale) > 0.3) {
                deltaScale = Math.sign(deltaScale) * 0.3
            }

            scale = scale + deltaScale
            if (scale < min) {
                scale = min
            }
            if (scale > max) {
                scale = max
            }
            const dx = originOffsetX / scale1 * (scale - scale1)
            const dy = originOffsetY / scale1 * (scale - scale1)
            target.style.fontSize = '1em'
            target.style.transformOrigin = '0% 0%'
            target.style.transform = `translate(${-dx}px,${-dy}px) scale(${scale})`
            self.scale = scale
            self.translateX = dx
            self.translateY = dy
        }
    })

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

    return (
        <div
            ref={wrapperRef}
            className={cx('pan-pinch-wrapper', themeClass, className)}
            onTouchStart={dataRef.current.handleTouchStart}
            onTouchMove={dataRef.current.handleTouchMove}
            onTouchEnd={dataRef.current.handleTouchEnd}
            onTouchCancel={dataRef.current.handleTouchEnd}
        >
            <div
                ref={targetRef}
                className={cx('pan-pinch')}
            // style={{ fontSize: value + 'em' }}
            >
                <div ref={innerRef}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PanPinch

async function getBoundingClientRect(element: any): Promise<DOMRect> {
    if (PLATFORM == 'h5' || PLATFORM == 'next') {
        return element.getBoundingClientRect()
    }

    return new Promise<DOMRect>((resolve, reject) => {
        element.getBoundingClientRect(resolve)
    })

}

async function getOriginOffset(element: HTMLDivElement, x: number, y: number) {
    const rect = await getBoundingClientRect(element)
    const cx = rect.left
    const cy = rect.top

    return {
        x: x - cx,
        y: y - cy,
    }
}

async function getScrollOffset(element: any): Promise<[number, number]> {
    if (PLATFORM == 'h5' || PLATFORM == 'next') {
        return [element.scrollLeft, element.scrollTop]
    }

    return new Promise<[number, number]>((resolve) => {
        element.scrollOffset((res) => {
            resolve([res.scrollLeft, res.scrollTop])
        })
    })
}