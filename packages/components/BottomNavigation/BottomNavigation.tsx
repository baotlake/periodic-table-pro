'use client'

import classNames from 'classnames/bind'
import { useState } from 'react'
import { Navigator, Button, Image } from '../compat'
import { routes } from '../utils/routes'

import searchSvg from '../assets/icons/search.svg'
import toolsSvg from '../assets/icons/tools.svg'
import buildSvg from '../assets/icons/build.svg'
import tuneSvg from '../assets/icons/tune.svg'
import likeSvg from '../assets/icons/like_outlined.svg'
import shareSvg from '../assets/icons/share.svg'
import circleSvg from '../assets/icons/circle.svg'

import styles from './bottomNavigation.module.scss'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM

type Props = {
  themeClass?: string
  searchPath?: string
  toolsPath?: string
  settingPath?: string
  likePath?: string
  sharePath?: string
}

let timeoutId: number | NodeJS.Timeout

export function BottomNavigation({ themeClass }: Props) {
  const [collapse, setCollapse] = useState(false)

  const handleTouchStart = () => {
    if (collapse) {
      timeoutId = setTimeout(() => {
        setCollapse(false)
      }, 350)
    }
  }

  const handleShare = () => {
    if (PLATFORM === 'next') {
      try {
        navigator?.share({
          url: location.href,
          title: document.title,
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className={cx('bottom-navigation-wrapper', themeClass)}>
      <div
        className={cx('box', {
          collapse: collapse,
        })}
        // onTouchStart={handleTouchStart}
        // onTouchEnd={() => clearTimeout(timeoutId)}
        // onTouchCancel={() => clearTimeout(timeoutId)}
        onPointerDown={handleTouchStart}
        onPointerUp={() => clearTimeout(timeoutId)}
        onPointerCancel={() => clearTimeout(timeoutId)}
      >
        <Navigator
          className={cx('item')}
          href={routes.search}
          url={routes.search}
        >
          <Image className={cx('icon')} src={searchSvg} />
          <div className={cx('label')}>搜索</div>
        </Navigator>
        <Navigator
          className={cx('item')}
          href={routes.tools}
          url={routes.tools}
        >
          <Image className={cx('icon')} src={buildSvg} />
          <div className={cx('label')}>工具</div>
        </Navigator>
        <Navigator
          className={cx('item')}
          href={routes.setting}
          url={routes.setting}
        >
          <Image className={cx('icon')} src={tuneSvg} />
          <div className={cx('label')}>设置</div>
        </Navigator>
        <Navigator className={cx('item')} href={routes.like} url={routes.like}>
          <Image className={cx('icon')} src={likeSvg} />
          <div className={cx('label')}>喜欢</div>
        </Navigator>
        <div
          className={cx('item')}
          // href={sharePath || ''}
          // url={sharePath || ''}
          onClick={handleShare}
        >
          <Image className={cx('icon')} src={shareSvg} />
          <div className={cx('label')}>分享</div>
          <Button className={cx('wx-open-type-button')} openType="share" />
        </div>
        <div className={cx('item')} onClick={() => setCollapse(true)}>
          <Image className={cx('icon')} src={circleSvg} />
          <div className={cx('label')}>收起</div>
        </div>
      </div>
    </div>
  )
}
