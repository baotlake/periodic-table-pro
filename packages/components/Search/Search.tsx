'use client'

import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Image, Input, redirectTo } from '../compat'
import { HighlightTable } from '../PeriodicTable'
import { ResultItem } from './ResultItem'
import { NoResult } from './NoResult'
import { search } from '../utils/search'
// import { navigateTo } from '../utils/compat'

import searchSvg from '../assets/icons/search.svg'
import styles from './search.module.scss'
import { useAtom } from 'jotai'
import { menuButtonClientRect } from '../recoil/atom'
import { MaskIcon } from '../Icon'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM

type ResultData = NonNullable<ReturnType<typeof search>>[0]

type Props = {
  themeClass?: string
  onSearchChange?: (value: string) => void
}

const love =
  '11-19-37-55-87-40-72-104-105-106-74-42-44-109-78-47-88-50-52-51-34-16-15-14-13-31-49-81-113-114-115-116-3-1-22-23-24-26-29-76'

export function Search({ themeClass, onSearchChange }: Props) {
  const [input, setInput] = useState('')
  const [list, setList] = useState<ResultData[] | null>([])
  const [light, setLight] = useState<number[] | null>(null)

  const [rect] = useAtom(menuButtonClientRect)

  useEffect(() => {
    const autoSearch = () => {
      console.log('autoSearch', input)
      setList(search(input))
      onSearchChange && onSearchChange(input)
    }

    if (input == '/love') {
      setInput(love)
    }

    if (input == '/light') {
      setInput('')
      setLight([])
    }

    const id = window.setTimeout(autoSearch, 300)
    return () => {
      clearTimeout(id)
    }
  }, [input])

  useEffect(() => {
    if (PLATFORM == 'next') {
      const a = new URLSearchParams(location.search)
      if (a.has('q')) {
        setInput(a.get('q') || '')
      }
    }
  }, [])

  useEffect(() => {
    if (light && onSearchChange) onSearchChange(light.join('-'))
  }, [light])

  return (
    <div
      className={cx('search-paper', themeClass)}
      style={{
        paddingTop: rect.bottom + 8 + 'px',
      }}
    >
      <div className={cx('container')}>
        <HighlightTable
          themeClass={themeClass}
          highlights={list || light?.map((v) => ({ Z: v, matching: 0 })) || []}
          onClick={(Z) => {
            light &&
              setLight(
                light.includes(Z) ? light.filter((v) => v != Z) : [...light, Z]
              )
          }}
        />

        <div className={cx('search-input-wrapper', 'bg-background-soft')}>
          <div
            className={cx('search-button')}
            onClick={() => setList(search(input))}
          >
            <MaskIcon className="size-6 text-foreground/60" src={searchSvg} />
          </div>

          <Input
            className={cx('input', 'text-foreground')}
            placeholder="搜索元素"
            autoFocus
            value={input}
            maxlength={1000}
            onInput={(e) => {
              const value = e?.detail?.value || e?.target?.value
              setInput(value)
              !list && setList([])
            }}
          />
          {input && (
            <div className={cx('clean-button')} onClick={() => setInput('')}>
              <div className={cx('css-icon')} />
            </div>
          )}
        </div>

        {list &&
          list.map((v) => (
            <ResultItem key={v.Z} data={v} themeClass={themeClass} />
          ))}

        {input && !list && <NoResult />}
      </div>
    </div>
  )
}
