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

    const percent = value / (max - min) * 100

    const { handleRef, targetRef, } = useCapturePointer({
        onMove({ mx, target, down: { width } }) {
            let percent = parseFloat(target.dataset.percent || '0')
            percent += mx / width * 100
            percent = Math.min(100, Math.max(0, percent))
            target.style.setProperty('--value', percent + '%')
            const v = min! + (max! - min!) * percent / 100
            onChanging && onChanging({ detail: { value: v } })
        },
        onUp({ mx, width, target }) {
            let percent = parseFloat(target.dataset.percent || '0')
            percent += mx / width * 100
            percent = Math.min(100, Math.max(0, percent))
            target.dataset.percent = percent + ''
            const v = min! + (max! - min!) * percent / 100
            onChange && onChange({ detail: { value: v } })
            target.style.removeProperty('--value')
        }
    })

    return (
        <div className={cx('slider')} style={{ '--value': percent + '%' } as CSSProperties}>
            <div className={cx('bar')} ref={targetRef}>
                <div
                    ref={handleRef}
                    className={cx('handle')}
                />
            </div>
        </div>
    )
}
