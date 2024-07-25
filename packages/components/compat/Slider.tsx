'use client'
import { PointerEvent, CSSProperties } from 'react'
import classNames from "classnames/bind"
import styles from './slider.module.scss'
import type { SliderProps } from "@tarojs/components"
import { useCapturePointer } from '../hooks'

const cx = classNames.bind(styles)

type Props = Omit<SliderProps, 'onChanging' | 'onChange'> & {
    onChanging?: (e: { detail: { value: number } }) => void
    onChange?: (e: { detail: { value: number } }) => void
}

export function Slider({ value, min, max, step, onChange, onChanging }: Props) {

    value = value && isFinite(value) ? value : 0
    min = min && isFinite(min) ? min : 0
    max = max && isFinite(max) ? max : 100

    const percent = (value - min) / (max - min) * 100

    const { targetRef } = useCapturePointer({
        onMove({ x, target, down: { width, left } }) {
            let percent = (x - left) / width * 100
            percent = Math.min(100, Math.max(0, percent))
            target.style.setProperty('--value', percent + '%')
            const v = min! + (max! - min!) * percent / 100
            onChanging && onChanging({ detail: { value: v } })
        },
        onUp({ x, width, left, target }) {
            let percent = (x - left) / width * 100
            percent = Math.min(100, Math.max(0, percent))
            const v = min! + (max! - min!) * percent / 100
            onChange && onChange({ detail: { value: v } })
            console.log('up', v, percent, arguments)
            target.style.removeProperty('--value')
        }
    })

    return (
        <div className={cx('slider')} style={{ '--value': percent + '%' } as CSSProperties}>
            <div className={cx('bar')} ref={targetRef}>
                <div
                    // ref={handleRef}
                    className={cx('handle')}
                />
            </div>
        </div>
    )
}
