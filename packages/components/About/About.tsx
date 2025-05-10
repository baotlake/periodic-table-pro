'use client'
import classNames from 'classnames/bind'
import { Image } from '../compat'
import { MaskIcon } from '../Icon'

import logoImg from '../assets/images/logo.png'
import githubSvg from '../assets/icons/github.svg'
import styles from './about.module.scss'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM

type Props = {
  className?: string
}

export function About({ className }: Props) {
  return (
    <div className={cx('about', 'py-16 rounded-md', className)}>
      <div className="pb-5">
        <Image
          className="size-20 rounded-full m-auto block mb-6 border border-solid border-border"
          src={logoImg}
        />
        <div className="text-center text-lg font-bold">元素周期表 PRO</div>
      </div>

      <div className={cx('section')}>
        元素周期表Pro ——
        高颜值的化学元素周期表工具，提供全面的元素属性、图片和百科知识等。
      </div>

      <div className={cx('section')}>
        元素周期表Pro是由欢洋精心打造的原创化学元素周期表工具，采用全新的设计风格，
        支持Web（H5）、微信小程序、QQ小程序和支付宝小程序等多种平台，适配不同尺寸的屏幕设备。
      </div>

      <div className={cx('section')}>
        <a
          href="https://github.com/baotlake/periodic-table-pro"
          target="_blank"
        >
          <MaskIcon
            className="size-5 inline-block align-sub me-1"
            src={githubSvg}
          />
          <span className={cx('text')}>
            https://github.com/baotlake/periodic-table-pro
          </span>
        </a>
      </div>

      <div className={cx('section')}>
        如果我们的某些内容无意侵犯您了的合法权益，请您通过客服联系我们进行移除。
      </div>
      {['weapp', 'h5'].includes(PLATFORM) && (
        <div className={cx('section')}>
          <div>公众号可自由关联「元素周期表Pro」</div>
          <span>AppID: wx20e649abe5acb0bc</span>
        </div>
      )}
    </div>
  )
}

export default About
