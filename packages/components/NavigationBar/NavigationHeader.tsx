'use client'

import { CSSProperties, PropsWithChildren } from 'react'
import classNames from 'classnames/bind'
import NavigationBar from './NavigationBar'
import { Taro, isTaro } from '../compat'
import { routes } from '../utils/routes'
import { useAtom } from 'jotai'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

import styles from './navigationHeader.module.scss'

const cx = classNames.bind(styles)

type Props = PropsWithChildren<{
  theme?: string
  title?: string
  className?: string
  color?: string
  background?: boolean
}>

export default function NavigationHeader({
  theme,
  title,
  children,
  className,
  color,
  background,
}: Props) {
  const [themeMode] = useAtom(themeModeState)

  const handleBack = () => {
    if (isTaro) {
      const path = Taro.getCurrentPages()
      if (path.length > 1) {
        Taro.navigateBack()
      }
      if (path.length <= 1) {
        Taro.redirectTo({
          url: routes.home,
        })
      }
      return
    }
    history.back()
  }

  const backHome = () => {
    // console.log('back home')
    Taro.redirectTo({
      url: routes.home,
    })
  }

  return (
    <NavigationBar
      className={cx('nav-header', theme || themeMode, className, {
        background: background,
      })}
    >
      <div
        className={cx('header-wrapper')}
        style={
          {
            ...(color ? { '--color': color } : {}),
          } as CSSProperties
        }
      >
        <div role="button" className={cx('back-btn')} onClick={handleBack}>
          <div className={cx('back-icon')} />
          <div className={cx({ title: title })}>{title}</div>
        </div>
        {children}
      </div>
    </NavigationBar>
  )
}
