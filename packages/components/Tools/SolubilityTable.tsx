
import { useState, CSSProperties } from 'react'
import classNames from 'classnames/bind'
import { RichText } from '../compat'
import {
    chartData,
    notes,
} from '@periodic-table-pro/data'

import styles from './solubilityTable.module.scss'
const cx = classNames.bind(styles)

const classMap = {
    'S': 'S',
    'sS': 'sS',
    'I': 'I',
    'X': 'X',
    'R': 'R',
    '?': 'unavailable',
}

type Props = {
    themeClass?: string
}

export function SolubilityTable({ themeClass }: Props) {

    const [zh, setZh] = useState(true)

    return (
        <div
            className={cx('solubility-table', themeClass)}
        // style={{
        //     paddingTop: rect.bottom + 8 + 'px',
        // }}
        >
            <div className={cx('table-wrapper')}>
                <div className={cx('table')}>
                    <div className={cx('head', 'top')}>
                        {
                            chartData.column.map((column, i) => (
                                <RichText className={cx('anion')} key={i} nodes={column} />
                            ))
                        }
                    </div>
                    <div className={cx('head', 'bottom')}>
                        {
                            chartData.column.map((column, i) => (
                                <RichText className={cx('anion')} key={i} nodes={column} />
                            ))
                        }
                    </div>
                    <div className={cx('head', 'left')}>
                        {
                            chartData.row.map((row, i) => (
                                <RichText className={cx('cation')} key={i} nodes={row} />
                            ))
                        }
                    </div>

                    <div
                        className={cx('content')}
                        style={{
                            '--columns': chartData.column.length + '',
                        } as CSSProperties}
                    >
                        {
                            chartData.content.map((rowList, i) => (
                                <>
                                    {
                                        rowList.map((item, j) => (
                                            <div
                                                key={i + '-' + j}
                                                className={cx('item', classMap[item])}
                                            >{zh ? notes[item].initial : item}</div>
                                        ))
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div>
                <div className={cx('key-table')}>
                    {
                        Object.keys(notes).map(key => (
                            <>
                                <div className={cx('cell', key)}>{zh ? notes[key].initial : key}</div>
                                <div className={cx('cell')}>{notes[key].value}</div>
                                <div className={cx('cell')}>{notes[key].detail}</div>
                            </>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SolubilityTable
