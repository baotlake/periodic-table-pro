'use client'

import { CustomWrapper, RichText } from '../compat'
import classNames from 'classnames/bind'
import type { WikiData } from '@packages/data'
import { STATIC_BASE } from '../config'

import styles from './content.module.scss'
import { Ad } from '../compat/components'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM

function r(html: string) {
  return html.replace(/\$img_path\$/g, STATIC_BASE + '/img/wiki')
}

type Props = {
  themeClass?: string
  data?: WikiData | null
  adId?: string
}

export function Content({ data, themeClass, adId }: Props) {
  let count = 0

  return (
    <div className={cx('content', themeClass, PLATFORM) + ' content'}>
      {data &&
        data.content.map((section, i) => (
          <CustomWrapper key={i}>
            {section.heading && (
              <div className={cx('h2')}>
                <RichText nodes={r(section.heading)} />
              </div>
            )}
            <div className={cx('section')}>
              {section.content.map((block, i) => {
                count += block.html?.length || 0
                switch (block.type) {
                  case 'div':
                    return (
                      <div key={i} className={cx('scroll-view')}>
                        <RichText
                          className={cx('block')}
                          nodes={r(block.html)}
                        />
                      </div>
                    )
                  default:
                    return (
                      <RichText
                        key={i}
                        className={cx('block')}
                        nodes={r(block.html)}
                      />
                    )
                }
              })}
            </div>
            {adId && count > 10000 && (count = 1) && (
              <div className={cx('ad-container')}>
                <Ad
                  unitId={adId}
                  adType="video"
                  adTheme={themeClass == 'dark' ? 'black' : 'white'}
                />
              </div>
            )}
          </CustomWrapper>
        ))}
    </div>
  )
}
