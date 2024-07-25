'use client'

import { useState } from 'react'
import { Button } from '../compat'
import { PersistentDrawer } from '../MenuDrawer'
import NavigationBar from '../NavigationBar'
import classNames from 'classnames/bind'

import styles from './menuHomeLayout.module.scss'

const cx = classNames.bind(styles)

type Props = React.PropsWithChildren<{
  themeClass?: string
}>

export function MenuHomeLayout({ children, themeClass }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={cx('menu-home-layout', themeClass)}>
      <NavigationBar>
        <div className={cx('nav-btn-wrapper')}>
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
        themeClass={themeClass}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>
  )
}

export default MenuHomeLayout
