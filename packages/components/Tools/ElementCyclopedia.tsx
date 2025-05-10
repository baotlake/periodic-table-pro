'use client'

import classNames from 'classnames/bind'
import { Taro, RichText, Image, Navigator } from '../compat'
import { Categories, getElementsCyclopedia } from '@packages/data'
import styles from './elementCyclopedia.module.scss'
import { getWikiPath } from '../utils/routes'
import { STATIC_BASE } from '../config'

const cx = classNames.bind(styles)

type Props = {
  className?: string
  openType?: 'navigate' | 'redirect'
}

export function ElementCyclopedia({ className, openType }: Props) {
  const itemList = getElementsCyclopedia()
  const imageDir = STATIC_BASE + '/img/1920p/'

  return (
    <div className={cx('elements-encyclopedia', className)}>
      {itemList.map((item) => (
        <Navigator
          className={cx('card-item', 'bg-card', Categories[item.category])}
          href={getWikiPath(item.Z)}
          url={getWikiPath(item.Z)}
          openType={openType}
        >
          <div className={cx('image-wrapper')}>
            <Image
              className={cx('image')}
              mode="aspectFill"
              src={imageDir + item.symbol + '.jpg'}
            />
          </div>
          <div className={cx('text-wrapper')}>
            <div className={cx('card-title')}>{item.title}</div>
            <div className={cx('card-summary')}>
              <RichText nodes={item.summary} />
            </div>
          </div>
        </Navigator>
      ))}
    </div>
  )
}

export default ElementCyclopedia
