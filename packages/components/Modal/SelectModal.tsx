import { PropsWithChildren } from 'react'
// import { View } from "@tarojs/components";
import classNames from "classnames/bind"

import styles from './selectModal.module.scss'

const cx = classNames.bind(styles)


type Props = PropsWithChildren<{
  themeClass?: string
  className?: string
  visible: boolean
  onClose?: () => void
}>

export default function SelectModal(props: Props) {

  return (
    <div
      className={cx('select-modal',
        props.className,
        {
          visible: props.visible,
          hidden: !props.visible,
        },
        props.themeClass)}
      hidden={!props.visible}
    >
      <div className={cx('select-modal__mask')} onClick={props.onClose} />
      <div className={cx('select-modal__content')}>
        {props.children}
      </div>
    </div>
  )
}
