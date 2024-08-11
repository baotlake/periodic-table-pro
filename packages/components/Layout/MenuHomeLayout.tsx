'use client'

import { useState } from 'react'
import { PersistentDrawer } from '../MenuDrawer'
import NavigationBar from '../NavigationBar'
import classNames from 'classnames/bind'

import styles from './menuHomeLayout.module.scss'

const cx = classNames.bind(styles)

type Props = React.PropsWithChildren<{
  className?: string
}>

export function MenuHomeLayout({ children, className }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={cx('menu-home-layout', 'bg-bg text-text', className)}>
      <NavigationBar>
        <div className="pointer-events-auto my-0 mx-[var(--margin)]">
          <div
            role="button"
            className={cx('nav-btn')}
            onClick={() => setVisible(visible ? false : true)}
          >
            <div className={cx('nav-icon', visible ? 'close' : 'menu')} />
          </div>
        </div>
      </NavigationBar>

      {children}

      <PersistentDrawer
        className={className}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>
  )
}

export default MenuHomeLayout
