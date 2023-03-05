import { useRef, useContext, useEffect } from 'react'
import { useTouchZoom } from "../hooks"
import classNames from 'classnames/bind'
import { Context } from '../state'

import styles from './zoomablePT.module.scss'
import PeriodicTable from "./PeriodicTable"

const cx = classNames.bind(styles)

export function ZoomablePT() {
    const { state: { theme: { mode: themeMode } } } = useContext(Context)
    const zoomViewRef = useRef<HTMLDivElement>(null)
    const {
        zoom,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleTouchCancel,
    } = useTouchZoom()

    useEffect(() => {
        zoom.onZoom = (scale: number) => {
            const view = zoomViewRef.current
            if (!view) return
            // console.log('scale: ', scale)
            view.style.fontSize = 16 * scale + 'px'
        }
    }, [])

    return (
        <div
            ref={zoomViewRef}
            className={cx('zoomable-pt', themeMode)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
        >
            <PeriodicTable />
        </div>
    )
}