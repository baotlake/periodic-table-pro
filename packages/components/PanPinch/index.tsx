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
    onChange?: (value: number) => void
}>

export function PanPinch({ children, themeClass, className, min, max, value, onChange }: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const dataRef = useRef({
        panning: false,
        d1: 0,
        scrollX: 0,
        scrollY: 0,
        panningTimeoutId: -1,
        originOffsetX: 0,
        originOffsetY: 0,
        scale: 1,
        translateX: 0,
        translateY: 0,
        fontSize: 1,
    })

    dataRef.current.fontSize = value

    const handleTouchStart = useCallback(async (e: React.TouchEvent | TouchEvent) => {
        if (e.touches.length !== 2) return
        const data = dataRef.current
        const target = tableRef.current!
        const wrapper = wrapperRef.current!

        const t1 = e.touches[0], t2 = e.touches[1]
        const x1 = t1.clientX, y1 = t1.clientY
        const x2 = t2.clientX, y2 = t2.clientY

        const d1 = Math.hypot(x2 - x1, y2 - y1)
        const { x, y } = await getOriginOffset(target, (x1 + x2) / 2, (y1 + y2) / 2)
        const [scrollLeft, scrollTop] = await getScrollOffset(wrapper)

        data.panning = true
        data.d1 = d1
        data.scrollX = scrollLeft
        data.scrollY = scrollTop
        data.originOffsetX = x
        data.originOffsetY = y
    }, [])

    const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
        const data = dataRef.current
        if (!data.panning || e.touches.length < 2) return
        const { d1, originOffsetX, originOffsetY, fontSize } = data
        const target = tableRef.current!

        const t1 = e.touches[0], t2 = e.touches[1]
        const x1 = t1.clientX, y1 = t1.clientY
        const x2 = t2.clientX, y2 = t2.clientY

        const d = Math.hypot(x2 - x1, y2 - y1)
        let scale = d / d1
        if (scale * fontSize < min) {
            scale = min / fontSize
        }
        if (scale * fontSize > max) {
            scale = max / fontSize
        }
        const dx = originOffsetX * (scale - 1)
        const dy = originOffsetY * (scale - 1)

        target.style.transform = `translate(${-dx}px,${-dy}px) scale(${scale})`
        data.scale = scale
        data.translateX = dx
        data.translateY = dy
    }, [])

    const handleTouchEnd = useCallback((e: React.TouchEvent | TouchEvent) => {
        // dataRef.current.panning = false
        if (dataRef.current.panning) {
            handlePinchStop()
        }
    }, [])

    const handlePinchStop = useCallback(() => {
        const data = dataRef.current
        data.panning = false

        const target = tableRef.current!
        const wrapper = wrapperRef.current!
        let { scale, translateX, translateY, scrollX, scrollY, fontSize } = data

        fontSize = fontSize * scale
        data.fontSize = fontSize

        target.style.transform = ''
        target.style.fontSize = `${fontSize}em`

        wrapper.scrollTo(
            scrollX + translateX,
            scrollY + translateY,
        )

        onChange && onChange(fontSize)

        console.log('translate 2 scroll', translateX, translateY)
    }, [])

    const handleWheel = useCallback(async (e: React.WheelEvent | WheelEvent) => {
        if (!e.ctrlKey) return
        e.preventDefault()
        e.stopPropagation()

        const { deltaY, clientX, clientY } = e
        const data = dataRef.current
        let {
            scale, fontSize,
            scrollX, scrollY,
            panning, panningTimeoutId,
            originOffsetX, originOffsetY,
        } = data

        const target = tableRef.current!
        const wrapper = wrapperRef.current!
        const scrollLeft = wrapper.scrollLeft
        const scrollTop = wrapper.scrollTop

        if (!panning) {
            scrollX = scrollLeft
            scrollY = scrollTop
            scale = 1

            const { x, y } = await getOriginOffset(target, clientX, clientY)
            originOffsetX = x
            originOffsetY = y

            data.panning = true
            data.scale = scale
            data.scrollX = scrollX
            data.scrollY = scrollY
            data.originOffsetX = originOffsetX
            data.originOffsetY = originOffsetY
            data.panningTimeoutId = window.setTimeout(() => {
                handlePinchStop()
            }, 300)

        } else {
            clearTimeout(panningTimeoutId)
            data.panningTimeoutId = window.setTimeout(() => {
                handlePinchStop()
            }, 300)
        }

        const zoom = - deltaY / 200

        scale += zoom
        if (scale * fontSize < min) {
            scale = min / fontSize
        }
        if (scale * fontSize > max) {
            scale = max / fontSize
        }
        const dx = originOffsetX * (scale - 1)
        const dy = originOffsetY * (scale - 1)
        target.style.transform = `translate(${-dx}px,${-dy}px) scale(${scale})`
        data.scale = scale
        data.translateX = dx
        data.translateY = dy
    }, [])

    useEffect(() => {
        const wrapper = wrapperRef.current
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            <div
                ref={tableRef}
                className={cx('pan-pinch')}
                style={{ fontSize: value + 'em' }}
            >
                {children}
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