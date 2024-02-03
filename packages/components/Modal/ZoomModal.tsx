import { Slider } from '../compat'
import Modal from './Modal'
import classNames from 'classnames/bind'
import { useState, useRef } from 'react'
import { minPtZoom, maxPtZoom } from '../config'
import { setStorage } from '../utils/storage'
import { useAtom } from 'jotai'
import { periodicTableZoom, periodicTableZoomControl } from '../recoil/atom'
import { throttle } from 'lodash-es'
import styles from './zoomModal.module.scss'

const cx = classNames.bind(styles)

const PLATFORM = process.env.PLATFORM

type Props = {
  visible: boolean
  onClose?: () => void
  themeClass?: string
}

export default function ZoomModal({ visible, onClose, themeClass }: Props) {
  const [zoom, setZoom] = useAtom(periodicTableZoom)
  const [zoomControl, setZoomControl] = useAtom(periodicTableZoomControl)

  const [value, setValue] = useState<null | number>(null)
  const scale = typeof value === 'number' ? value : zoom
  const zoomControlRef = useRef(zoomControl)
  zoomControlRef.current = zoomControl

  const throttledSetValue = useRef(throttle(setValue, 240))

  const handleChanging = (value: number) => {
    const zoomControl = zoomControlRef.current
    if (zoomControl?.isPanning === false) {
      zoomControl?.start(1)
    }
    zoomControl?.moveTo(value)
    throttledSetValue.current(value)
  }

  const throttledChanging = useRef(throttle(handleChanging, 100))

  const handleChange = (value: number) => {
    const zoomControl = zoomControlRef.current
    zoomControl?.moveTo(value)
    zoomControl?.end()
    setZoom(value)
    setStorage({ periodicTableZoom: Math.round(value * 100) / 100 })
    setValue(null)
  }

  return (
    <Modal
      className={cx('modal', 'zoom-modal', themeClass)}
      visible={visible}
      onClose={onClose}
    >
      <div className={cx('zoom-content')}>
        <div className={cx('label')}>缩放 x{scale.toFixed(2)}</div>
        <Slider
          min={minPtZoom}
          max={maxPtZoom}
          step={0.01}
          value={scale}
          onChanging={(e) =>
            PLATFORM == 'weapp'
              ? throttledChanging.current(e.detail.value)
              : handleChanging(e.detail.value)
          }
          onChange={(e) => handleChange(e.detail.value)}
        />
      </div>
    </Modal>
  )
}
