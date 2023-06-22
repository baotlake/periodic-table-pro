// import { View } from '@tarojs/components'
import { CustomWrapper, RichText } from '../compat'
import classNames from 'classnames/bind'
import type { WikiData } from '@periodic-table-pro/data'

import styles from './content.module.scss'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM
const BUCKET_HOST = process.env.BUCKET_HOST

function r(html: string) {
  return html.replace(/\$img_path\$/g, BUCKET_HOST + '/wiki')
}

type Props = {
  themeClass?: string
  data?: WikiData | null
}

export function Content({ data, themeClass }: Props) {
  return (
    <div className={cx('content', themeClass, PLATFORM) + ' content'}>
      {data &&
        data.content.map((section) => (
          <CustomWrapper>
            {section.heading && (
              <div className={cx('h2')}>
                <RichText nodes={r(section.heading)} />
              </div>
            )}
            <div className={cx('section')}>
              {section.content.map((block) => {
                switch (block.type) {
                  case 'div':
                    return (
                      <div className={cx('scroll-view')}>
                        <RichText
                          className={cx('block')}
                          nodes={r(block.html)}
                        />
                      </div>
                    )
                  default:
                    return (
                      <RichText className={cx('block')} nodes={r(block.html)} />
                    )
                }
              })}
            </div>
          </CustomWrapper>
        ))}
    </div>
  )
}
