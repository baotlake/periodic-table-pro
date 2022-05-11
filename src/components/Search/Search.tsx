
import { useEffect, useState } from 'react'
import { View, Input, Image } from '@tarojs/components'
import classNames from 'classnames'
import { HighlightTable } from './HighlightTable'
import { ResultItem } from './ResultItem'
import { NoResult } from './NoResult'
import { search } from '../../utils/search'

import searchSvg from '../../assets/icons/search.svg'

import './search.scss'

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

        const id = window.setTimeout(autoSearch, 300)
        return () => {
            clearTimeout(id)
        }
    }, [input])

    return (
        <View
            className={classNames('search-paper', themeClass)}
        >
            <View className='container'>
                <HighlightTable highlight={list || []} />

                <View className='search-input-wrapper'>
                    <Input
                        className='input'
                        placeholder='搜索元素'
                        autoFocus
                        value={input}
                        maxlength={1000}
                        onInput={(e) => {
                            setInput(e.detail.value)
                            !list && setList([])
                        }}
                    />
                    {
                        input && (
                            <View
                                className='clean-button'
                                onClick={() => setInput('')}
                            >
                                <View className='css-icon' />
                            </View>
                        )
                    }
                    <View
                        className='search-button'
                        onClick={() => setList(search(input))}
                    >
                        <Image className='icon' src={searchSvg} />
                    </View>
                </View>

                {
                    list && list.map(v => (
                        <ResultItem key={v.Z} data={v} />
                    ))
                }

                {
                    input && !list && (
                        <NoResult />
                    )
                }
            </View>
        </View>
    )
}