'use client'

import { CSSProperties, PropsWithChildren } from 'react'
import classNames from 'classnames/bind'
import NavigationHeader from '../NavigationBar/NavigationHeader'
import { PermanentDrawer } from '../MenuDrawer'
import styles from './menuPageLayout.module.scss'
import { useAtom } from 'jotai'
import { menuButtonClientRect } from '../recoil/atom'

const cx = classNames.bind(styles)

type Props = PropsWithChildren<{
  className?: string
  title?: string
}>

export function MenuPageLayout({ className, children, title }: Props) {
  const [menuRect] = useAtom(menuButtonClientRect)

  return (
    <div>
      <NavigationHeader title={title} />
      <div
        className={cx(
          'layout',
          'bg-bg-deep text-text transition-colors',
          className
        )}
        style={
          {
            '--margin-left': menuRect.windowWidth - menuRect.right + 'px',
            '--margin-top': menuRect.bottom + 8 + 'px',
          } as CSSProperties
        }
      >
        <PermanentDrawer className={cx('layout-drawer')} />
        <div className={cx('layout-main', 'w-full h-full overflow-auto')}>
          <div className={cx('layout-content')}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default MenuPageLayout
