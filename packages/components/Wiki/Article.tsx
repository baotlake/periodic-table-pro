'use client'

import classNames from 'classnames/bind'
import { Content } from './Content'
import {
  Categories,
  elementsCategories,
  WikiData,
} from '@periodic-table-pro/data'
import { CustomWrapper } from '../compat'
import { useAtom } from 'jotai'

import styles from './article.module.scss'
import { themeModeState } from '../recoil/atom'

const cx = classNames.bind(styles)

const videoAdId = process.env.AD_WIKI_VIDEO_ID

type Props = {
  theme?: string
  atomicNumber: number
  loading?: boolean
  heading?: string
  tagline?: string
  data?: WikiData | null
}

export function Article({
  theme,
  atomicNumber,
  loading,
  heading,
  tagline,
  data,
}: Props) {
  const [themeMode] = useAtom(themeModeState)
  return (
    <div
      className={cx(
        'article',
        'pt-32 px-8 pb-16 leading-loose mx-auto box-border',
        themeMode,
        Categories[elementsCategories[atomicNumber - 1]],
        { loading }
      )}
    >
      <div className={cx('heading')}>{heading}</div>

      <div className={cx('tagline')}>{tagline}</div>

      <CustomWrapper>
        <Content data={data} themeClass={themeMode} adId={videoAdId} />
      </CustomWrapper>

      {loading && (
        <>
          <div className={cx('paragraph')} />
          <div className={cx('graph')}>
            <div className={cx('item')} />
            <div className={cx('item')} />
            <div className={cx('item')} />
          </div>
        </>
      )}
    </div>
  )
}
