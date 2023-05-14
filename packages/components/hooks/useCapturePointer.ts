import { useRef, useEffect } from 'react'

type Properties = ReturnType<typeof parseProperties>
type HTMLElement = HTMLDivElement

type DownData = Properties & {
    e: PointerEvent
    target: HTMLElement
    x: number
    y: number
}

type UpData = DownData & {
    mx: number
    my: number
}

type MoveData = {
    e: PointerEvent,
    target: HTMLElement
    down: Properties
    mx: number
    my: number
    v0: number
}

type Options = {
    onDown?: (data: DownData) => void | number
    onMove?: (data: MoveData) => void
    onUp?: (data: UpData) => void
}

export function useCapturePointer(options: Options) {
    const handleRef = useRef<HTMLElement | null>(null)
    const targetRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const handle = handleRef.current
        const target = targetRef.current || handle
        let x1 = 0, y1 = 0
        let x = 0, y = 0
        let downProperties: Properties
        let v0 = 0

        const handlePointerMove = (e: PointerEvent) => {
            x = e.clientX
            y = e.clientY
            e.preventDefault()
            e.stopPropagation()

            options.onMove && options.onMove({
                e: e,
                target: target!,
                down: downProperties,
                mx: x - x1,
                my: y - y1,
                v0: v0,
            })
        }

        const handlePointerDown = (e: PointerEvent) => {
            if (e.button == 2) return
            handle!.setPointerCapture(e.pointerId)
            e.preventDefault()
            e.stopPropagation()
            x1 = e.clientX
            y1 = e.clientY
            handle!.addEventListener('pointermove', handlePointerMove)
            downProperties = parseProperties(target!)
            if (options.onDown) {
                v0 = options.onDown({
                    e: e,
                    target: target!,
                    x: x1,
                    y: y1,
                    ...downProperties
                }) || v0
            }
        }

        const handlePointerUp = (e: PointerEvent) => {
            handle!.releasePointerCapture(e.pointerId)
            handle!.removeEventListener('pointermove', handlePointerMove)
            const properties = parseProperties(target!)
            options.onUp && options.onUp({
                e: e,
                target: target!,
                x: x,
                y: y,
                mx: x - x1,
                my: y - y1,
                ...properties,
            })
        }

        const handleTouch = (e: TouchEvent) => {
            e.preventDefault()
        }

        if (handle) {
            handle.addEventListener('pointerdown', handlePointerDown)
            handle.addEventListener('pointerup', handlePointerUp)
            handle.addEventListener('pointercancel', handlePointerUp)
            handle.addEventListener('touchstart', handleTouch, { passive: false })
            handle.addEventListener('touchmove', handleTouch, { passive: false })

            return () => {
                handle.removeEventListener('pointerdown', handlePointerDown)
                handle.removeEventListener('pointerup', handlePointerUp)
                handle.removeEventListener('pointercancel', handlePointerUp)
                handle.removeEventListener('touchstart', handleTouch)
                handle.removeEventListener('touchmove', handleTouch)
            }
        }
    }, [])

    return { handleRef, targetRef }
}

function parseProperties(element: HTMLElement) {
    const rect = element.getBoundingClientRect()
    const transform = parseTransform(element.style)
    const style = parseStyle(element.style)

    return {
        ...transform,
        ...style,
        ...({
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
        }),
    }
}

function parseTransform(style: CSSStyleDeclaration) {
    let dx = 0, dy = 0, dz = 0
    try {
        // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleValue
        // ❌ firefox
        // @ts-ignore
        const value = CSSStyleValue.parse('transform', style.transform || 'translate(0px,0px)')
        for (let i of value) {
            // @ts-ignore
            if (i instanceof CSSTranslate) {
                dx = i.x.to('px').value
                dy = i.y.to('px').value
                dz = i.z.to('px').value
            }
        }
    } catch (err) {
        console.error(err)
    }

    return { dx, dy, dz }
}

function parseStyle(style: CSSStyleDeclaration) {
    let w = 0, h = 0, l = 0, t = 0, r = 0, b = 0
    if (style.width) {
        w = parseFloat(style.width)
    }
    if (style.height) {
        h = parseFloat(style.height)
    }
    if (style.left) {
        l = parseFloat(style.left)
    }
    if (style.top) {
        t = parseFloat(style.top)
    }
    if (style.right) {
        r = parseFloat(style.right)
    }
    if (style.bottom) {
        b = parseFloat(style.bottom)
    }
    return {
        w, h, l, t, r, b,
    }
}

export default useCapturePointer