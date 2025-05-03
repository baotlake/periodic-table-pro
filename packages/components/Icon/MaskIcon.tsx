import { CSSProperties } from 'react'
import classNames from 'classnames/bind'

import styles from './maskIcon.module.scss'

const cx = classNames.bind(styles)

type Props = {
  src: string | { src: string }
  className?: string
}
export function MaskInlineIcon({ src, className }: Props) {
  if (typeof src == 'object') {
    src = src.src
  }
  return (
    <div className={cx('inline-block', className)}>
      <div
        className={cx('mask-icon', 'inline-icon')}
        style={
          {
            '--mask': 'url(' + src + ')',
          } as CSSProperties
        }
      />
    </div>
  )
}

export function MaskIcon({ src, className }: Props) {
  if (typeof src == 'object') {
    src = src.src
  }
  return (
    <div
      className={cx('mask-icon', className)}
      style={
        {
          '--mask': 'url(' + src + ')',
        } as CSSProperties
      }
    />
  )
}
