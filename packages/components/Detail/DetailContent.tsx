'use client'

import { useState, Fragment } from 'react'
import classNames from 'classnames/bind'
import ElementCard from './ElementCard'
import ElementProfile from './ElementProfile'
import PropsGroup from './PropsGroup'
import { CustomWrapper, Image, ScrollView, isTaro } from '../compat'
import {
  elementsCategories,
  symbol,
  formalShortAtomicWeights,
  zhCNNames,
  pinyin,
  enName,
  getDetailData,
  propertiesGroupLabel,
  DetailData,
  Categories,
} from '@packages/data'
import { useAtom } from 'jotai'
import { menuButtonClientRect, themeModeState } from '../recoil/atom'
import { AdCustom } from '../compat/components'

import styles from './detailContent.module.scss'
import outlineImg from '../assets/icons/outline.svg'
import physicsImg from '../assets/icons/physics.svg'
import atomImg from '../assets/icons/atom.svg'
import timeImg from '../assets/icons/time.svg'
import otherImg from '../assets/icons/other.svg'
import earthImg from '../assets/icons/earth.svg'
import magnetImg from '../assets/icons/magnet.svg'
import cyclopediaImg from '../assets/icons/wikipedia_w.svg'

const cx = classNames.bind(styles)

const AD_LIGHT_ID = process.env.AD_DETAIL_LIGHT_ID
const AD_DARK_ID = process.env.AD_DETAIL_DARK_ID

const icon: Record<keyof DetailData['properties'], any> = {
  cyclopedia: cyclopediaImg,
  basic: outlineImg,
  physical: physicsImg,
  atomic: atomImg,
  other: otherImg,
  history: timeImg,
  abundance: earthImg,
  electromagnetic: magnetImg,
}

type Props = {
  detailData: DetailData
}

export function DetailContent({ detailData }: Props) {
  const Z = detailData.atomicNumber

  const [themeMode] = useAtom(themeModeState)
  const [rect] = useAtom(menuButtonClientRect)
  const [scrollInto, setScrollInto] = useState('')

  const category = elementsCategories[Z - 1]

  const adId = themeMode === 'dark' ? AD_DARK_ID : AD_LIGHT_ID

  const handleScrollInto = (key: string) => {
    setScrollInto(key)
    if (!isTaro) {
      const view = document.querySelector('#' + key)
      view?.scrollIntoView?.({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={cx(
        'detail-content',
        'bg-deeper',
        themeMode,
        Categories[category]
      )}
    >
      <div
        className={cx('drawer')}
        style={
          {
            '--margin-left': rect.windowWidth - rect.right + 'px',
            '--margin-top': rect.bottom + 8 + 'px',
          } as React.CSSProperties
        }
      >
        <CustomWrapper>
          <ElementCard
            themeClass={themeMode}
            atomicNumber={Z}
            category={category}
            symbol={symbol[Z - 1]}
            atomicWeight={formalShortAtomicWeights[Z - 1]}
            name={zhCNNames[Z - 1]}
            pinyin={pinyin[Z - 1]}
            enName={enName[Z - 1]}
          />
          {Object.keys(detailData.properties).map((key) => (
            <div
              key={key}
              className={cx('drawer-item', 'bg-card')}
              onClick={() => handleScrollInto(key)}
            >
              <Image className={cx('drawer-item-icon')} src={icon[key]} />
              {propertiesGroupLabel[key]}
            </div>
          ))}
        </CustomWrapper>
      </div>

      <ScrollView
        className={cx('scroll-view')}
        scrollIntoView={scrollInto}
        scrollY
        style={
          {
            '--margin-top': rect.bottom + 8 + 'px',
          } as React.CSSProperties
        }
      >
        <div className={cx('main')}>
          <ElementProfile
            key="profile"
            atomicNumber={Z}
            category={category}
            symbol={symbol[Z - 1]}
            atomicWeight={formalShortAtomicWeights[Z - 1]}
            name={zhCNNames[Z - 1]}
            pinyin={pinyin[Z - 1]}
            enName={enName[Z - 1]}
          />
          {Object.keys(detailData.properties).map((key) => (
            <Fragment key={key}>
              <PropsGroup
                id={key}
                key={key}
                propsType={key as any}
                themeClass={themeMode}
                symbol={detailData.symbol}
                Z={Z}
                data={detailData.properties[key]}
              />
              {key === 'cyclopedia' && adId && (
                <div key="ad-1" className={cx('ad-container')}>
                  <AdCustom unitId={adId} />
                </div>
              )}
            </Fragment>
          ))}
          {adId && (
            <div key="ad-2" className={cx('ad-container')}>
              <AdCustom unitId={adId} />
            </div>
          )}
        </div>
      </ScrollView>
    </div>
  )
}

export default DetailContent
