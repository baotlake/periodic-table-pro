import {
  ElementBox,
  NavigationHeader,
  ToolPageLayout,
} from '@periodic-table-pro/components'
import {
  Categories,
  elementsCategories,
  shortAbridgedAtomicWeights,
  symbol,
} from '@periodic-table-pro/data'
import classNames from 'classnames/bind'
import styles from './_offline.module.scss'
import { useAtom } from 'jotai'
import {
  menuButtonClientRect,
  themeModeState,
} from '@periodic-table-pro/components/recoil/atom'
import { CSSProperties } from 'react'
import { Image } from '@periodic-table-pro/components/compat'

import wifiOffImg from '@periodic-table-pro/components/assets/icons/wifi_off.svg'
import { useRouter } from 'next/router'

const cx = classNames.bind(styles)

export default function OfflinePage() {
  const elements = [8, 9, 9, 3, 10]
  const [menuRect] = useAtom(menuButtonClientRect)
  const [themeMode] = useAtom(themeModeState)
  const router = useRouter()

  const handleRetry = () => {
    if (router.pathname == '/_offline') {
      router.replace('/')
    } else {
      router.reload()
    }
  }

  return (
    <div>
      <ToolPageLayout title="网络断开">
        <div
          className={cx(themeMode, 'flex flex-col')}
          style={{
            marginTop: menuRect.bottom + 8 + 'px',
          }}
        >
          <div
            className={cx(
              'network-disconnected',
              'flex flex-col items-center mt-20'
            )}
          >
            <Image className={cx('icon', 'w-24 h-24 mb-10')} src={wifiOffImg} />
            <div className={cx('flex text-4xl')}>网络连接已断开</div>

            <button
              className={cx(
                'retry-button',
                'w-24 h-8 text-sm bg-transparent mt-12 rounded-md border-solid border'
              )}
              onClick={handleRetry}
            >
              重试
            </button>
          </div>

          {/* <div className={cx('offline-elements', 'flex')}>
          {elements.map((Z) => (
            <ElementBox
              key={Z}
              className={cx(Categories[elementsCategories[Z]])}
              emphasize="symbol"
              atomicNumber={Z}
              symbol={symbol[Z - 1]}
              bc={shortAbridgedAtomicWeights[Z - 1]}
            />
          ))}
        </div> */}

          <div className="mx-auto mt-5 w-1/2">
            <div className="opacity-80 my-3">更多域名</div>
            <ul className="text-blue-600">
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://pt.ziziyi.com"
                >
                  pt.ziziyi.com
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://periodic-table-pro.netlify.app/"
                >
                  periodic-table-pro.netlify.app
                </a>
              </li>
              {/* <li>
                <a href="https://pt.ziziyi.com">pt.ziziyi.com</a>
              </li> */}
            </ul>
          </div>
        </div>
      </ToolPageLayout>
    </div>
  )
}
