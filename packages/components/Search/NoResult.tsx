import classNames from 'classnames/bind'

import styles from './noResult.module.scss'

const cx = classNames.bind(styles)

export function NoResult() {

    return (
        <div className={cx("no-result")}>
            <div className={cx("title")} >没有找到任何结果</div>
            <div className={cx("des")}>
                可以搜索“元素符号”、“原子序数”、“元素名称”或“原子量”等。
            </div>
            <div className={cx("des")}>
                例如: "H", "氢", "1"
            </div>
        </div>
    )
}