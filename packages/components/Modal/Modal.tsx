import { PropsWithChildren, useEffect } from 'react'
import classNames from 'classnames/bind'

import styles from './modal.module.scss'
import { CustomWrapper } from '../compat'

const cx = classNames.bind(styles)

const PLATFORM = process.env.PLATFORM

type Props = PropsWithChildren<{
  themeClass?: string
  wrapperClassName?: string
  className?: string
  visible: boolean
  onClose?: () => void
  destroyOnClose?: boolean
}>

export default function Modal({
  themeClass,
  wrapperClassName,
  className,
  visible,
  onClose,
  destroyOnClose,
  children,
}: Props) {
  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key == 'Escape') {
      onClose?.()
    }
  }

  if (destroyOnClose && visible != true) {
    return null
  }

  return (
    // <CustomWrapper>
    <div
      role="dialog"
      className={cx(
        'modal-wrapper',
        wrapperClassName,
        visible ? ' visible' : 'hidden',
        themeClass
      )}
      hidden={visible ? false : true}
      tabIndex={0}
      onKeyDown={(e) => handleKeydown(e)}
      ref={(e) => e?.focus?.()}
    >
      <div className={cx('modal__mask')} onClick={onClose} />
      <div className={cx('modal__content', className)}>{children}</div>
    </div>
    // </CustomWrapper>
  )
}
