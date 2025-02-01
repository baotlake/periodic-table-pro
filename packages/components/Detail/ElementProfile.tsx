'use client'

import { useEffect, useRef } from 'react'
import { Image, previewImage } from '../compat'
import classNames from 'classnames/bind'
import previewImg from '../assets/icons/preview.svg'
import { MaskIcon } from '../Icon'
import { zhCNCategories, Categories } from '@periodic-table-pro/data'
import { chineseName } from '../utils/utils'
import { STATIC_BASE } from '../config'

import styles from './elementProfile.module.scss'

const cx = classNames.bind(styles)

type ChineseNameFunc = (name: string, Z?: number) => string | { url: string }
type ZhCNCategories = string[]

type Props = {
  symbol: string
  enName: string
  name: string
  atomicNumber: number
  atomicWeight: string | number
  category: number
  pinyin: string
}

export function ElementProfile({
  category,
  symbol,
  atomicNumber,
  atomicWeight,
  name,
  enName,
  pinyin,
}: Props) {
  // const menuRect = useMenuButtonClientRect()
  const viewRef = useRef<HTMLDivElement>(null)

  const imageUrl = STATIC_BASE + '/img/1920p/' + symbol + '.jpg'

  const handleViewImage = () => {
    previewImage({
      urls: [imageUrl],
      current: imageUrl,
    })
  }

  useEffect(() => {
    // console.log('viewRef', viewRef)
    if (viewRef.current) {
      const dataLayer = document.querySelector('.data-layer')
      // console.log('dataLayer', dataLayer)
    }
  }, [])

  const zhName = chineseName ? chineseName(name, atomicNumber) : name

  return (
    <div
      ref={viewRef}
      className={cx(
        'element-profile',
        'default',
        'landscape',
        Categories[category]
      )}
      onClick={handleViewImage}
    >
      <Image src={imageUrl} className={cx('image')} mode="aspectFill" />
      <div className={cx('data-layer')}>
        <div className={cx('category')}>{zhCNCategories[category]}</div>

        <div className={cx('basic-group')}>
          <div className={cx('symbol')}>{symbol}</div>
          <div className={cx('zh-name')}>
            {atomicNumber + ' '}
            {typeof zhName == 'string' ? (
              zhName
            ) : (
              <MaskIcon url={zhName.url} />
            )}{' '}
            {pinyin}
            {/* {atomicNumber + " " + name + " " + pinyin} */}
          </div>
          <div className={cx('en-name')}>{enName}</div>
          <div className={cx('weight')}>{atomicWeight}</div>
        </div>

        <Image className={cx('view-icon', 'white')} src={previewImg} />
      </div>
    </div>
  )
}

export default ElementProfile
