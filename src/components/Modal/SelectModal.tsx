import { PropsWithChildren } from 'react'
import { View } from "@tarojs/components";
import classNames from "classnames";

import './selectModal.scss'


type Props = PropsWithChildren<{
  themeClass?: string
  className?: string
  visible: boolean
  onClose?: () => void
}>

export default function SelectModal(props: Props) {

  return (
    <View
      className={classNames('select-modal',
        props.className,
        {
          visible: props.visible,
          hidden: !props.visible,
        },
        props.themeClass)}
      hidden={!props.visible}
    >
      <View className='select-modal__mask' onClick={props.onClose} />
      <View className='select-modal__content'>
        {props.children}
      </View>
    </View>
  )
}
