import Head from "next/head"
import {
    NavigationHeader,
    Search
} from "@periodic-table-pro/components"

import classNames from "classnames/bind"
import styles from './index.module.scss'

const cx = classNames.bind(styles)

export default function SearchPage() {

    return (
        <>
            <Head>
                <title>搜索 - 元素周期表PRO 高颜值化学必备小工具</title>
            </Head>
            <div className={cx('search-page')}>
                <NavigationHeader
                    title="搜索"
                />
                <Search />
            </div>
        </>
    )
}
