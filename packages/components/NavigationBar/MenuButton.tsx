import React, { useState } from 'react'
import classNames from 'classnames/bind'

import styles from "./menuButton.module.scss"

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM
const BUCKET_HOST = process.env.BUCKET_HOST
const host = BUCKET_HOST
const wxacodeImg = host + '/images/wxacode.jpg'

type Props = {
    style?: React.CSSProperties
    themeClass?: string
}

export default function MenuButton({ style, themeClass }: Props) {

    const [visible, setVisible] = useState(false)

    return (
        <div
            className={cx('menu-button', themeClass)}
            style={{
                ...style,
                '--radius': style?.borderRadius,
            } as React.CSSProperties}
        >
            <div
                className={cx('more')}
                onClick={() => setVisible(!visible)}
            >
                <div className={cx('more-icon')} />
            </div>
            <div
                className={cx('other')}
                onClick={() => setVisible(!visible)}
            >
                <div className={cx('other-icon')} />
            </div>

            <div className={cx('dropdown', {
                visible,
            })}>
                <img
                    className={cx('qr-img')}
                    src={wxacodeImg}
                />
            </div>
        </div>
    )
}
