import { PropsWithChildren, useEffect } from 'react'
// import { View } from "@tarojs/components";
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
}>

export default function Modal(props: Props) {
    const handleKeydown = (e: React.KeyboardEvent) => {
        if (e.key == 'Escape') {
            props?.onClose?.()
        }
    }

    // if (!props.visible) {
    //   return null
    // }

    return (
        // <CustomWrapper>
        <div
            role="dialog"
            className={cx(
                'modal-wrapper',
                props.wrapperClassName,
                {
                    visible: props.visible,
                    hidden: !props.visible,
                },
                props.themeClass
            )}
            hidden={!props.visible}
            tabIndex={0}
            onKeyDown={(e) => handleKeydown(e)}
            ref={(e) => e?.focus?.()}
        >
            <div className={cx('modal__mask')} onClick={props.onClose} />
            <div className={cx('modal__content', props.className)}>
                {props.children}
            </div>
        </div>
        // </CustomWrapper>
    )
}
