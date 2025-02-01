import React, { useState } from 'react'
import classNames from 'classnames/bind'
import { STATIC_BASE } from '../config'
import styles from './menuButton.module.scss'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM
const wxacodeImg = STATIC_BASE + '/img/ui/wxacode.jpg'

type Props = {
  style?: React.CSSProperties
  className?: string
}

export default function MenuButton({ style, className }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={cx(
        'menu-button',
        'absolute flex pointer-events-auto',
        className
      )}
      style={style}
    >
      <div
        className={cx(
          'more',
          'relative w-1/2 h-full flex justify-center items-center cursor-pointer'
        )}
        onClick={() => setVisible(visible ? false : true)}
      >
        <div className={cx('more-icon')} />
      </div>
      <div
        className={cx('dot', 'h-full flex items-center justify-center')}
        onClick={() => setVisible(visible ? false : true)}
      >
        <div
          className={cx(
            'other-icon',
            'relative text-white size-4 rounded-full'
          )}
        />
      </div>

      <div
        className={cx('dropdown', {
          visible,
        })}
      >
        <div className=""></div>
        <img className="w-full" src={wxacodeImg} />
      </div>
    </div>
  )
}
