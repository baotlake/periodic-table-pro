import classNames from 'classnames/bind'
import { MaskInlineIcon } from '../Icon'
// import { zhCNCategories, Categories } from "../../data/classification"
import { chineseName } from '../utils/utils'
import { zhCNCategories, Categories } from '@periodic-table-pro/data'

import styles from './elementCard.module.scss'

const cx = classNames.bind(styles)

type Props = {
  themeClass?: string
  symbol: string
  enName: string
  name: string
  atomicNumber: number
  atomicWeight: string | number
  category: number
  pinyin: string
}

export function ElementCard({
  themeClass,
  symbol,
  enName,
  name,
  atomicNumber,
  atomicWeight,
  category,
  pinyin,
}: Props) {
  const zhName = chineseName(name, atomicNumber)

  return (
    <div
      className={cx(
        'element-card',
        'default',
        Categories[category],
        themeClass
      )}
    >
      <div className={cx('tag')}>{zhCNCategories[category]}</div>
      <div className={cx('name')}>{symbol}</div>
      <div className={cx('properties')}>
        <div className={cx('item')}>
          {atomicNumber + ' '}
          {typeof zhName == 'string' ? (
            zhName
          ) : (
            <MaskInlineIcon src={zhName.url} />
          )}{' '}
          {pinyin}
          {/* {atomicNumber + ' ' + name + ' ' + pinyin} */}
        </div>
        <div className={cx('item')}>{enName}</div>
        <div className={cx('item')}>{atomicWeight}</div>
      </div>
    </div>
  )
}

export default ElementCard
