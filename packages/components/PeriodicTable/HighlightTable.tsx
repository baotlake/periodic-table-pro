import classNames from 'classnames/bind'
import {
    mediumLongForm,
    Categories,
    elementsCategories,
} from '@periodic-table-pro/data'

import styles from './highlightTable.module.scss'

const cx = classNames.bind(styles)

type Data = {
    Z: number
    matching: number
}

type Props = {
    themeClass?: string
    highlights: Data[]
    onClick?: (Z: number) => void
}

const { elements } = mediumLongForm

export function HighlightTable({ highlights, themeClass, onClick }: Props) {
    const map = highlights.reduce(
        (a, c) => ({ ...a, [c.Z]: c }),
        {} as Record<number, Data>
    )

    return (
        <div className={cx('highlight-table', themeClass)}>
            <div className={cx('table')}>
                {elements.map((Z, index) => {
                    if (!Z)
                        return (
                            <div className={cx('item', 'empty')} key={'empty-' + index} />
                        )
                    return (
                        <div
                            key={Z}
                            className={cx(
                                'item',
                                'element',
                                [Categories[elementsCategories[Z - 1]]],
                                {
                                    highlight: Z in map,
                                }
                            )}
                            onClick={() => onClick && onClick(Z)}
                        />
                    )
                })}
            </div>
        </div>
    )
}
