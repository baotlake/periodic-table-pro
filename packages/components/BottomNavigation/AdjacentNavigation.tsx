import { Button } from '../compat'
import classNames from 'classnames/bind'

import styles from './adjacentNavigation.module.scss'

const PLATFORM = process.env.PLATFORM
const cx = classNames.bind(styles)

type Props = {
  themeClass?: string
  next: React.ReactNode
  current: React.ReactNode
  previous: React.ReactNode
  onTapNext?: () => void
  onTapPrevious?: () => void
}

export function AdjacentNavigation({
  themeClass,
  next,
  current,
  previous,
  onTapNext,
  onTapPrevious,
}: Props) {
  const handleShare = () => {
    if (PLATFORM == 'h5' || PLATFORM == 'next') {
      navigator?.share({
        url: location.href,
        title: document.title,
      })
    }
  }

  return (
    <div className={cx('adjacent-navigation', themeClass)}>
      <div className={cx('box')}>
        <div className={cx('item')} onClick={onTapPrevious}>
          <div className={cx('title')}>{previous}</div>
          <div className={cx('label')}>上一个</div>
        </div>
        <div className={cx('item', 'primary')} onClick={handleShare}>
          <div className={cx('title')}>{current}</div>
          <div className={cx('label')}>分享</div>
          <Button className={cx('open-button')} openType="share" />
        </div>
        <div className={cx('item')} onClick={onTapNext}>
          <div className={cx('title')}>{next}</div>
          <div className={cx('label')}>下一个</div>
        </div>
      </div>
    </div>
  )
}
