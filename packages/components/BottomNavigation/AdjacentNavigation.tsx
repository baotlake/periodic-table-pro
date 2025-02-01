'use client'

import { Button } from '../compat'
import classNames from 'classnames/bind'
import { DetailData } from '@periodic-table-pro/data'
import { getDetailPath } from '../utils/routes'
import { redirectTo } from '../compat'
import { useAtom } from 'jotai'
import { themeModeState } from '../recoil/atom'
import styles from './adjacentNavigation.module.scss'

const PLATFORM = process.env.PLATFORM
const cx = classNames.bind(styles)

type Props = {
  theme?: string
  previous: DetailData['previous']
  current: DetailData['previous']
  next: DetailData['next']
}

export function AdjacentNavigation({ theme, next, current, previous }: Props) {
  const [themeMode] = useAtom(themeModeState)

  const handleShare = () => {
    if (PLATFORM == 'h5' || PLATFORM == 'next') {
      navigator?.share({
        url: location.href,
        title: document.title,
      })
    }
  }

  const handleTapPrevious = () => {
    if (previous?.atomicNumber) {
      redirectTo(getDetailPath(previous.atomicNumber))
    }
  }

  const handleTapNext = () => {
    if (next?.atomicNumber) {
      redirectTo(getDetailPath(next.atomicNumber))
    }
  }

  return (
    <div className={cx('adjacent-navigation', theme || themeMode)}>
      <div className={cx('box')}>
        <div className={cx('item')} onClick={handleTapPrevious}>
          <div className={cx('title')}>{previous?.symbol || '--'}</div>
          <div className={cx('label')}>上一个</div>
        </div>
        <div className={cx('item', 'primary')} onClick={handleShare}>
          <div className={cx('title')}>{current?.symbol || '--'}</div>
          <div className={cx('label')}>分享</div>
          <Button className={cx('open-button')} openType="share" />
        </div>
        <div className={cx('item')} onClick={handleTapNext}>
          <div className={cx('title')}>{next?.symbol || '--'}</div>
          <div className={cx('label')}>下一个</div>
        </div>
      </div>
    </div>
  )
}
