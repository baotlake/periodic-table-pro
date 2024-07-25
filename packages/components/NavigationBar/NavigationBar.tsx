'use client'

import { PropsWithChildren, CSSProperties, useEffect } from 'react'
import classNames from 'classnames/bind'
import MenuButton from './MenuButton'
import { CustomWrapper } from '../compat'
import { useAtom } from 'jotai'
import { menuButtonClientRect } from '../recoil/atom'
import styles from './navigationBar.module.scss'

const cx = classNames.bind(styles)

const PLATFORM = process.env.PLATFORM

declare const my: any

type Props = PropsWithChildren<{
  className?: string
}>

export default function NavigationBar({ children, className }: Props) {
  const [rect] = useAtom(menuButtonClientRect)

  useEffect(() => {
    if (PLATFORM === 'alipay') {
      my.setNavigationBar({
        title: '',
      })
    }
  }, [])

  return (
    <CustomWrapper>
      <div
        className={cx('navigation-bar', className)}
        style={
          {
            paddingTop: rect.top + 'PX',
            paddingRight: rect.windowWidth - rect.left + 'PX',
            height: rect.height + 'PX',
            width: rect.left + 'PX',
            '--size': rect.height + 'PX',
            '--margin': rect.windowWidth - rect.right + 'PX',
          } as CSSProperties
        }
      >
        {children}
        {(PLATFORM == 'h5' || PLATFORM == 'next') && (
          <MenuButton
            style={{
              position: 'absolute',
              right: rect.windowWidth - rect.right + 'px',
              background: 'rgba(0,0,0,0.15)',
              width: rect.width + 'px',
              height: rect.height + 'px',
              borderRadius: rect.height / 2 + 'px',
            }}
          />
        )}
      </div>
    </CustomWrapper>
  )
}
