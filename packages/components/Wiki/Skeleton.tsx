import classNames from "classnames/bind"

import styles from './skeleton.module.scss'

const cx = classNames.bind(styles)

type Props = {
    themeClass?: string
}
export function Skeleton({ themeClass }: Props) {

    return (
        <div className={cx('wiki-skeleton', themeClass)}>
            <div className={cx("heading")} />
            <div className={cx("tagline")} />
            <div className={cx("paragraph")} />
            <div className={cx("graph")}>
                <div className={cx("item")} />
                <div className={cx("item")} />
                <div className={cx("item")} />
            </div>
        </div>
    )
}
