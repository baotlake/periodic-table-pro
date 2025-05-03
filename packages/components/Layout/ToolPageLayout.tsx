'use client'

import { PropsWithChildren } from 'react'
import classnames from 'classnames/bind'
import { NavigationHeader } from '../NavigationBar'

import styles from './toolPageLayout.module.scss'
import { useAtom } from 'jotai'
import { menuButtonClientRect, themeModeState } from '../recoil/atom'

const cx = classnames.bind(styles)

type Props = PropsWithChildren<{
  title: string
}>

export function ToolPageLayout({ title, children }: Props) {
  const [rect] = useAtom(menuButtonClientRect)
  const [themeMode] = useAtom(themeModeState)

  return (
    <div
      className={cx('layout', 'bg-deeper min-h-screen', themeMode)}
      style={{
        paddingTop: rect.bottom + 8 + 'px',
      }}
    >
      <NavigationHeader background title={title} />

      {children}
    </div>
  )
}
