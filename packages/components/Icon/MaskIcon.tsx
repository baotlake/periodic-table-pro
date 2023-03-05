import { CSSProperties } from 'react'
import classNames from 'classnames/bind'

import styles from './maskIcon.module.scss'

const cx = classNames.bind(styles)

type Props = {
    url: string | { src: string }
    className?: string
}
export default function MaskIcon({ url, className }: Props) {
    if (typeof url == 'object') {
        url = url.src
    }
    return (
        <div className={cx(className, 'mask-icon')}>
            <div
                className={cx('mask-bg')}
                style={{
                    '--mask': 'url(' + url + ')',
                } as CSSProperties}
            />
        </div>
    )
}