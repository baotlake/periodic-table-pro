'use client'

import { useState, Fragment } from 'react'
import classNames from 'classnames/bind'
import {
  DetailData,
  propertiesLabel,
  propertiesGroupLabel,
  elementsCategories,
  Categories,
} from '@packages/data'
import ElectronsShell from './ElectronsShell'
import { Image, Navigator, redirectTo, RichText } from '../compat'
import { getDetailPath, getWikiPath } from '../utils/routes'
import { getDeepReadingWikipediaUrl } from '../utils/property'
import { HighlightTable } from '../PeriodicTable'
import { STATIC_BASE } from '../config'

import outlineImg from '../assets/icons/outline.svg'
import physicsImg from '../assets/icons/physics.svg'
import atomImg from '../assets/icons/atom.svg'
import timeImg from '../assets/icons/time.svg'
import otherImg from '../assets/icons/other.svg'
import earthImg from '../assets/icons/earth.svg'
import magnetImg from '../assets/icons/magnet.svg'
import cyclopediaImg from '../assets/icons/wikipedia_w.svg'
import deepReadingImg from '../assets/icons/deep-reading.svg'

import styles from './propsGroup.module.scss'

const cx = classNames.bind(styles)

const PLATFORM = process.env.PLATFORM

type Data = DetailData['properties'][keyof DetailData['properties']]

type Props = {
  id?: string
  themeClass?: string
  propsType: keyof DetailData['properties']
  symbol: string
  Z: number
  data: Data
}

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

const shellNameList = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']

const spectralLinesPath = STATIC_BASE + '/img/spectral-lines/'
const crystalStructurePath = STATIC_BASE + '/img/crystal-structure/'

export function PropsGroup({
  propsType,
  data,
  id,
  themeClass,
  symbol,
  Z,
}: Props) {
  const [isCollapse, setIsCollapse] = useState(false)

  const handleClickHighlightTable = (Z: number) => {
    redirectTo(getDetailPath(Z))
  }

  return (
    <div
      className={cx(
        'props-group',
        'landscape',
        'bg-card',
        themeClass,
        Categories[elementsCategories[Z - 1]]
      )}
      id={id}
    >
      <div
        className={cx('props-headline')}
        onClick={() => setIsCollapse(!isCollapse)}
      >
        <Image className={cx('props-icon')} src={icon[propsType]} />
        {propertiesGroupLabel[propsType]}
        <div
          className={cx('expand-icon', {
            collapse: isCollapse,
          })}
        />
      </div>
      <div
        className={cx('item-container', {
          collapse: isCollapse,
        })}
      >
        {Object.keys(data).map((key) => {
          let title = propertiesLabel[key]
          let value = data[key]
          if (!value) return

          switch (key) {
            case 'electronsPerShell':
              return (
                <div key={key} className={cx('props-item')}>
                  <div className={cx('item-title', 'center')}>{title}</div>
                  <ElectronsShell
                    className={cx('theme-filter')}
                    value={value}
                  />
                  <div className={cx('electrons-per-shell')}>
                    {value.split(',').map((n, i) => (
                      <Fragment key={i}>
                        <span className={cx('eps-name')}>
                          {shellNameList[i]}
                        </span>
                        <span className={cx('eps-number')}>{n + ' '}</span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              )
            case 'spectralLines':
              return (
                <div key={key} className={cx('props-item')}>
                  <div className={cx('item-title')}>{title}</div>
                  <Image
                    className={cx('spectral-lines')}
                    src={spectralLinesPath + value + '.png'}
                  />
                </div>
              )
            case 'ionCharge':
              const charges = value.split(',').filter((t) => t !== '')
              return (
                <div key={key} className={cx('props-item')}>
                  <div className={cx('item-title')}>{title}</div>
                  <div className={cx('item-value')}>
                    <RichText
                      nodes={charges
                        .map((c) => symbol + '<sup>' + c + '</sup>')
                        .join(', ')}
                    />
                    {charges.length == 0 && '--'}
                  </div>
                </div>
              )
            case 'wikipedia':
              return (
                <Navigator
                  key={key}
                  className={cx('props-item', 'wikipedia')}
                  url={getWikiPath(Z)}
                  href={getWikiPath(Z)}
                >
                  <RichText className={cx('item-value')} nodes={value} />
                  <div className={cx('wiki-more')}>阅读更多</div>
                </Navigator>
              )
            case 'deepReading':
              if (PLATFORM != 'next') return
              return (
                <a
                  key={key}
                  href={getDeepReadingWikipediaUrl(value.path)}
                  target="_blank"
                >
                  <div className={cx('props-item')}>
                    <Image className={cx('inline-icon')} src={deepReadingImg} />
                    {'  '}
                    {value.title} - 英文维基百科
                  </div>
                </a>
              )
            case 'highlightTable':
              return (
                <div key={key} className={cx('props-item', 'highlight-table')}>
                  {/* <div className={cx('item-title', 'center')}>{title}</div> */}
                  <HighlightTable
                    themeClass={themeClass}
                    highlights={[{ Z: Z, matching: 100 }]}
                    onClick={handleClickHighlightTable}
                  />
                </div>
              )
            case 'crystalStructure':
              return (
                <div key={key} className={cx('props-item')}>
                  <div className={cx('item-title')}>{title}</div>

                  <div className={cx('crystal-structure')}>
                    <Image
                      className={cx('crystal-structure-img')}
                      src={value.img ? crystalStructurePath + value.img : ''}
                    />
                    <span>{value.zh || '--'}</span>
                  </div>
                </div>
              )
            default:
              return (
                <div key={key} className={cx('props-item')}>
                  <div className={cx('item-title')}>{title}</div>
                  <RichText
                    className={cx('item-value')}
                    nodes={value || '--'}
                  />
                </div>
              )
          }
        })}
      </div>
    </div>
  )
}

export default PropsGroup
