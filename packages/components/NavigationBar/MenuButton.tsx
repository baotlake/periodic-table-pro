import { useState, type CSSProperties } from 'react'
import classNames from 'classnames/bind'
import { STATIC_BASE } from '../config'
import styles from './menuButton.module.scss'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM
const wxacodeImg = STATIC_BASE + '/img/ui/wxacode.jpg'
const qrcodeImg = STATIC_BASE + '/img/ui/pt.ziziyi.svg'

type Props = {
  style?: React.CSSProperties
  className?: string
}

export default function MenuButton({ style, className }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={cx(
        'menu-button',
        'absolute flex pointer-events-auto',
        className
      )}
      style={style}
    >
      <div
        className={cx(
          'more',
          'relative w-1s2 h-full flex justify-center items-center cursor-pointer'
        )}
        onClick={() => setVisible(visible ? false : true)}
      >
        <div className={cx('more-icon')} />
      </div>
      <div
        className={cx('dot', 'h-full flex items-center justify-center')}
        onClick={() => setVisible(visible ? false : true)}
      >
        <div
          className={cx(
            'other-icon',
            'relative text-white size-4 rounded-full'
          )}
        />
      </div>

      <div
        className={cx(
          'absolute top-[150%] right-0 w-64 p-4 bg-background-mute',
          'shadow-2xl rounded-xl',
          visible ? 'block' : 'hidden'
        )}
      >
        <div className="flex gap-3">
          <div className="w-1s2">
            <div className="w-full rounded-xl overflow-hidden">
              <img className="block w-full p-2 bg-white" src={wxacodeImg} />
            </div>
            <div className="text-center text-base mt-2 font-bold">
              微信扫码打开
            </div>
          </div>
          <div className="w-1s2">
            <div className="w-full rounded-xl overflow-hidden">
              <img className="block w-full p-2 bg-white" src={qrcodeImg} />
            </div>
            <div className="text-center text-base mt-2 font-bold">
              手机扫码打开
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
