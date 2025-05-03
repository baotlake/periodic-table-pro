'use client'

import classNames from 'classnames/bind'
import { useState } from 'react'
import { Navigator, Button, Image } from '../compat'
import { routes } from '../utils/routes'

import searchSvg from '../assets/icons/search.svg'
import toolsSvg from '../assets/icons/tools.svg'
import buildSvg from '../assets/icons/build.svg'
import rulerSvg from '../assets/icons/ruler.svg'
import tuneSvg from '../assets/icons/tune.svg'
import likeSvg from '../assets/icons/like_outlined.svg'
import shareSvg from '../assets/icons/share.svg'
import circleSvg from '../assets/icons/circle.svg'
import chevronsSvg from '../assets/icons/chevrons.svg'
import atomImg from '../assets/icons/atom_2.svg'

import styles from './bottomNavigation.module.scss'

const cx = classNames.bind(styles)
const PLATFORM = process.env.PLATFORM

type Props = {
  className?: string
  searchPath?: string
  toolsPath?: string
  settingPath?: string
  likePath?: string
  sharePath?: string
}

let timeoutId: number | NodeJS.Timeout

export function BottomNavigation({ className }: Props) {
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
    <div
      className={cx(
        'bottom-navigation-wrapper',
        'fixed w-screen left-0 right-0 bottom-0 h-0 z-50',
        className
      )}
    >
      <div
        className={cx(
          'box',
          'absolute text-base bottom-4 overflow-hidden transform-gpu transition',
          'h-14 shadow flex justify-between ',
          { collapse }
        )}
        onPointerDown={handleTouchStart}
        onPointerUp={() => clearTimeout(timeoutId)}
        onPointerCancel={() => clearTimeout(timeoutId)}
      >
        <Navigator
          className={cx('item', { 'flex-none flex': collapse })}
          href={routes.search}
          url={routes.search}
        >
          <Image
            className={cx('icon', { 'm-auto': collapse })}
            src={searchSvg}
          />
          <div className={cx('label', { hidden: collapse })}>搜索</div>
        </Navigator>
        <Navigator
          className={cx('item')}
          href={routes.tools}
          url={routes.tools}
        >
          <Image className={cx('icon')} src={rulerSvg} />
          <div className={cx('label')}>工具</div>
        </Navigator>
        <Navigator
          className={cx('item')}
          href={routes.elementsCyclopedia}
          url={routes.elementsCyclopedia}
        >
          <Image className={cx('icon')} src={atomImg} />
          <div className={cx('label')}>百科</div>
        </Navigator>
        <Navigator
          className={cx('item')}
          href={routes.setting}
          url={routes.setting}
        >
          <Image className={cx('icon')} src={tuneSvg} />
          <div className={cx('label')}>设置</div>
        </Navigator>
        {/* <Navigator className={cx('item')} href={routes.like} url={routes.like}>
          <Image className={cx('icon')} src={likeSvg} />
          <div className={cx('label')}>喜欢</div>
        </Navigator> */}
        <div className={cx('item')} onClick={handleShare}>
          <Image className={cx('icon')} src={shareSvg} />
          <div className={cx('label')}>分享</div>
          <Button
            className="absolute w-full h-full top-0 left-0 opacity-0"
            openType="share"
          />
        </div>
        <div className={cx('item')} onClick={() => setCollapse(true)}>
          <Image className={cx('icon')} src={chevronsSvg} />
          <div className={cx('label')}>收起</div>
        </div>
      </div>
    </div>
  )
}
