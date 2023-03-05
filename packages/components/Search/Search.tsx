
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Image, Input, Taro } from '../compat'
import { HighlightTable } from '../PeriodicTable'
import { ResultItem } from './ResultItem'
import { NoResult } from './NoResult'
import { search } from '../utils/search'
// import { navigateTo } from '../utils/compat'

import searchSvg from '../assets/icons/search.svg'

import styles from './search.module.scss'

const cx = classNames.bind(styles)

type ResultData = NonNullable<ReturnType<typeof search>>[0]

type Props = {
    themeClass?: string
}

export function Search({ themeClass }: Props) {
    const [input, setInput] = useState('')
    const [list, setList] = useState<ResultData[] | null>([])

    useEffect(() => {
        const autoSearch = () => {
            console.log('autoSearch', input)
            setList(search(input))
        }

        if (input.startsWith('/to:')) {
            Taro.navigateTo({
                url: input.slice(4,)
            })
        }

        if (input.startsWith('__wiki')) {
            Taro.navigateTo({
                url: '/pages/wiki/index'
            })
        }

        const id = window.setTimeout(autoSearch, 300)
        return () => {
            clearTimeout(id)
        }
    }, [input])

    return (
        <div
            className={cx('search-paper', themeClass)}
        >
            <div className={cx('container')}>
                <HighlightTable highlights={list || []} />

                <div className={cx('search-input-wrapper')}>
                    <Input
                        className={cx('input')}
                        placeholder='搜索元素'
                        autoFocus
                        value={input}
                        maxlength={1000}
                        onInput={(e) => {
                            const value = e?.detail?.value || e?.target?.value
                            setInput(value)
                            !list && setList([])
                        }}
                    />
                    {
                        input && (
                            <div
                                className={cx('clean-button')}
                                onClick={() => setInput('')}
                            >
                                <div className={cx('css-icon')} />
                            </div>
                        )
                    }
                    <div
                        className={cx('search-button')}
                        onClick={() => setList(search(input))}
                    >
                        <Image className={cx('search-icon')} src={searchSvg} />
                    </div>
                </div>

                {
                    list && list.map(v => (
                        <ResultItem
                            key={v.Z}
                            data={v}
                            themeClass={themeClass}
                        />
                    ))
                }

                {
                    input && !list && (
                        <NoResult />
                    )
                }
            </div>
        </div>
    )
}