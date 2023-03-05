import classNames from 'classnames/bind'
import { Content } from "./Content"
import { Categories, elementsCategories, WikiData } from "@periodic-table-pro/data"

import styles from './article.module.scss'

const cx = classNames.bind(styles)

type Props = {
    themeClass?: string
    atomicNumber: number
    loading?: boolean
    heading?: string
    tagline?: string
    data?: WikiData | null
}

export function Article({
    themeClass,
    atomicNumber,
    loading,
    heading,
    tagline,
    data,
}: Props) {

    return (
        <div
            className={cx(
                'article',
                themeClass,
                Categories[elementsCategories[atomicNumber - 1]],
                { loading, }
            )}
        >
            <div className={cx('heading')}>
                {heading}
            </div>

            <div className={cx('tagline')}>
                {tagline}
            </div>

            <Content
                data={data}
                themeClass={themeClass}
            />

            {
                loading && (
                    <>
                        <div className={cx("paragraph")} />
                        <div className={cx("graph")}>
                            <div className={cx("item")} />
                            <div className={cx("item")} />
                            <div className={cx("item")} />
                        </div>
                    </>
                )
            }
        </div>
    )
}